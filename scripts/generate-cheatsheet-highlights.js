import { createHighlighter } from 'shiki';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cheatsheetDir = path.resolve(__dirname, '../src/data/cheatsheets');
const processedFlagDir = path.resolve(__dirname, '../.cache/cheatsheet-flags');

// 语言映射（根据模块名推断 Shiki 语言）
const langMap = {
  mysql: 'sql',
  postgresql: 'sql',
  sqlite: 'sql',
  mongodb: 'javascript',
  redis: 'bash',
  git: 'bash',
  linux: 'bash',
  docker: 'bash',
  python: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  vue3: 'vue',
  react: 'jsx',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  go: 'go',
  rust: 'rust',
  csharp: 'csharp',
  kotlin: 'kotlin',
  html5: 'html',
  css: 'css',
};

// 确保缓存目录存在
if (!fs.existsSync(processedFlagDir)) {
  fs.mkdirSync(processedFlagDir, { recursive: true });
}

function getFileMtime(filePath) {
  return fs.statSync(filePath).mtimeMs;
}

function shouldProcess(filePath, moduleName) {
  const flagPath = path.join(processedFlagDir, `${moduleName}.json`);
  if (!fs.existsSync(flagPath)) return true;
  const flag = JSON.parse(fs.readFileSync(flagPath, 'utf-8'));
  const currentMtime = getFileMtime(filePath);
  return currentMtime > flag.lastProcessed;
}

function markProcessed(filePath, moduleName) {
  const flagPath = path.join(processedFlagDir, `${moduleName}.json`);
  fs.writeFileSync(
    flagPath,
    JSON.stringify({
      lastProcessed: getFileMtime(filePath),
    })
  );
}

async function main() {
  // 检查速查表目录是否存在
  if (!fs.existsSync(cheatsheetDir)) {
    console.log('速查表目录不存在，跳过高亮生成');
    return;
  }

  // 收集所有需要的语言
  const files = fs.readdirSync(cheatsheetDir).filter((f) => f.endsWith('.json'));

  if (files.length === 0) {
    console.log('未找到速查表 JSON 文件');
    return;
  }

  const neededLangs = [
    ...new Set(files.map((f) => langMap[f.replace('.json', '').toLowerCase()] || 'bash')),
  ];
  const highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: neededLangs,
  });

  for (const file of files) {
    const filePath = path.join(cheatsheetDir, file);
    const moduleName = file.replace('.json', '').toLowerCase();
    if (!shouldProcess(filePath, moduleName)) {
      console.log(`跳过未修改的速查表: ${file}`);
      continue;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    const lang = langMap[moduleName] || 'bash';
    let modified = false;

    for (const group of data.分组) {
      for (const item of group.条目) {
        if (item.代码 && !item.高亮代码) {
          try {
            item.高亮代码 = highlighter.codeToHtml(item.代码, { lang, theme: 'github-light' });
            modified = true;
          } catch (err) {
            console.warn(`高亮失败 [${file}] [${item.描述}]: ${err.message}`);
            item.高亮代码 = '';
            modified = true;
          }
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`已生成高亮: ${file}`);
    } else {
      console.log(`无需更新: ${file}`);
    }
    markProcessed(filePath, moduleName);
  }
}

main().catch(console.error);

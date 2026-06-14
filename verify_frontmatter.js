import fs from 'fs';
import path from 'path';

const dirs = [
  'ai-engineering',
  'computer-vision',
  'nlp',
  'llm',
  'generative-ai',
  'multimodal',
  'ai-ethics',
  'agent',
  'machine-learning',
  'deep-learning',
];

const baseDir = 'c:\\Atian\\Project\\Trae\\FANDEX-vue\\src\\content\\docs';
let issues = [];

for (const dir of dirs) {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) continue;

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const fmMatch = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);

      if (!fmMatch) {
        issues.push(`${dir}/${file} | no frontmatter`);
        continue;
      }

      const fm = fmMatch[1];
      const hasTitle = /^title\s*:/m.test(fm);
      const hasModule = /^module\s*:/m.test(fm);
      const hasDesc = /^description\s*:/m.test(fm);
      const hasSlug = /^slug\s*:/m.test(fm);

      const fileIssues = [];
      if (!hasTitle) fileIssues.push('missing title');
      if (!hasModule) fileIssues.push('missing module');
      if (!hasDesc) fileIssues.push('missing description');
      if (hasSlug) fileIssues.push('has slug');

      if (fileIssues.length > 0) {
        issues.push(`${dir}/${file} | ${fileIssues.join(', ')}`);
      }
    } catch (err) {
      issues.push(`${dir}/${file} | ERROR: ${err.message}`);
    }
  }
}

if (issues.length === 0) {
  console.log('All files pass frontmatter validation!');
} else {
  console.log(`Found ${issues.length} issues:`);
  issues.forEach((i) => console.log(i));
}

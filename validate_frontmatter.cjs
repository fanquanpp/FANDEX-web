const fs = require('fs');
const path = require('path');

// Simple YAML parser for frontmatter validation
function parseYAML(text) {
  const result = {};
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Try to match key: value
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.substring(0, colonIdx).trim();
    let value = trimmed.substring(colonIdx + 1).trim();

    // Handle quoted strings
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.substring(1, value.length - 1);
    }

    result[key] = value;
  }
  return result;
}

function validateFrontmatter(content, filePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return { file: filePath, error: 'No frontmatter found' };
  }

  const frontmatter = match[1];
  const lines = frontmatter.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for double-quoted strings with unescaped double quotes inside
    if (line.match(/^\w+:\s*"/)) {
      // Value starts with double quote
      const valuePart = line.replace(/^\w+:\s*/, '');
      if (valuePart.startsWith('"')) {
        // Find the closing quote
        let foundClose = false;
        for (let j = 1; j < valuePart.length; j++) {
          if (valuePart[j] === '"' && valuePart[j - 1] !== '\\') {
            if (j === valuePart.length - 1) {
              foundClose = true;
            } else {
              // There's content after the closing quote - unescaped quote inside
              return {
                file: filePath,
                line: i + 2,
                error: `Unescaped double quote inside double-quoted string: ${line}`,
              };
            }
            break;
          }
        }
        if (!foundClose) {
          return {
            file: filePath,
            line: i + 2,
            error: `Unclosed double-quoted string: ${line}`,
          };
        }
      }
    }

    // Check for unquoted values with colons that might cause issues
    const kvMatch = line.match(/^(\w+):\s*(.+)$/);
    if (kvMatch) {
      const val = kvMatch[2].trim();
      // If value is not quoted and contains a colon followed by space, it could be an issue
      if (
        !val.startsWith('"') &&
        !val.startsWith("'") &&
        !val.startsWith('|') &&
        !val.startsWith('>') &&
        val.includes(': ')
      ) {
        // This might be a problem - a colon in an unquoted value
        // But some values like dates are fine
        if (!val.match(/^\d{4}-\d{2}-\d{2}/) && !val.match(/^\[/) && !val.match(/^\{/)) {
          return {
            file: filePath,
            line: i + 2,
            error: `Possible unquoted value with colon: ${line}`,
          };
        }
      }
    }
  }

  return null;
}

const dirs = [
  'src/content/docs/agent',
  'src/content/docs/ai-engineering',
  'src/content/docs/computer-vision',
  'src/content/docs/nlp',
  'src/content/docs/llm',
  'src/content/docs/generative-ai',
  'src/content/docs/multimodal',
  'src/content/docs/ai-ethics',
  'src/content/docs/machine-learning',
  'src/content/docs/deep-learning',
];

let errors = [];
let totalFiles = 0;

for (const dir of dirs) {
  const fullDir = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullDir)) continue;
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith('.md'));
  totalFiles += files.length;
  for (const file of files) {
    const filePath = path.join(fullDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const result = validateFrontmatter(content, path.join(dir, file));
    if (result) {
      errors.push(result);
    }
  }
}

console.log(`Scanned ${totalFiles} files.`);
console.log(`Issues found: ${errors.length}`);
for (const e of errors) {
  console.log(`\n=== ${e.file} (line ${e.line || '?'}) ===`);
  console.log(`Error: ${e.error}`);
}

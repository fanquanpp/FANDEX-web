const fs = require('fs');
const path = require('path');

// Use js-yaml if available, otherwise do a basic check
let yaml;
try {
  yaml = require('js-yaml');
} catch (e) {
  console.log('js-yaml not available, using basic validation');
  yaml = null;
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
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) {
      errors.push({ file: path.join(dir, file), error: 'No frontmatter found' });
      continue;
    }
    const frontmatter = match[1];
    if (yaml) {
      try {
        yaml.load(frontmatter);
      } catch (e) {
        errors.push({ file: path.join(dir, file), error: e.message, frontmatter: frontmatter });
      }
    }
  }
}

console.log(`Scanned ${totalFiles} files with ${yaml ? 'js-yaml' : 'basic'} parser.`);
console.log(`Issues found: ${errors.length}`);
for (const e of errors) {
  console.log(`\n=== ${e.file} ===`);
  console.log(`Error: ${e.error}`);
  if (e.frontmatter) console.log(`Frontmatter:\n${e.frontmatter}`);
}

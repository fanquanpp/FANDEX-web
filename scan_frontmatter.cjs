const fs = require('fs');
const path = require('path');

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

for (const dir of dirs) {
  const fullDir = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullDir)) continue;
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(fullDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) {
      errors.push({ file: path.join(dir, file), error: 'No frontmatter found' });
      continue;
    }
    const frontmatter = match[1];
    const lines = frontmatter.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Check for double-quoted strings with unescaped double quotes inside
      const dqMatch = line.match(/^(\w+):\s*"(.*)"/);
      if (dqMatch) {
        const value = dqMatch[2];
        let unescaped = 0;
        for (let j = 0; j < value.length; j++) {
          if (value[j] === '"' && (j === 0 || value[j - 1] !== '\\')) {
            unescaped++;
          }
        }
        if (unescaped > 0) {
          errors.push({
            file: path.join(dir, file),
            line: i + 2,
            error: `Unescaped double quotes in value`,
            frontmatter: frontmatter,
          });
          break;
        }
      }
      // Check for multi-line description without proper block indicator
      const descCheck = line.match(/^description:\s*"/);
      if (descCheck && !line.endsWith('"')) {
        errors.push({
          file: path.join(dir, file),
          line: i + 2,
          error: `Multi-line description without proper block indicator`,
          frontmatter: frontmatter,
        });
        break;
      }
    }
  }
}

console.log('Total issues found: ' + errors.length);
for (const e of errors) {
  console.log('\n=== ' + e.file + ' (line ' + e.line + ') ===');
  console.log('Error: ' + e.error);
  if (e.frontmatter) console.log('Frontmatter:\n' + e.frontmatter);
}

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
    // Simple YAML validation - check for common issues
    const lines = frontmatter.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Check for double-quoted strings with unescaped double quotes inside
      const dqMatch = line.match(/^(\w+):\s*"(.*)"/);
      if (dqMatch) {
        const value = dqMatch[2];
        // Count unescaped double quotes
        let unescaped = 0;
        for (let j = 0; j < value.length; j++) {
          if (value[j] === '"' && (j === 0 || value[j - 1] !== '\\')) {
            unescaped++;
          }
        }
        if (unescaped > 0) {
          errors.push({
            file: path.join(dir, file),
            line: i + 2, // +2 because frontmatter starts after --- which is line 1
            error: `Unescaped double quotes in value: ${line}`,
            frontmatter: frontmatter,
          });
          break;
        }
      }
      // Check for unquoted colons in values
      const colonMatch = line.match(/^(\w+):\s*([^"'\[].*:.*)/);
      if (colonMatch && !line.includes('"') && !line.includes("'")) {
        // Value has colon but not quoted - could be an issue
        // But dates like 2024-01-01 are fine, so only flag if it looks problematic
      }
    }

    // Try to parse with a simple check
    // Check if description has multi-line content without proper block indicator
    const descMatch = frontmatter.match(/description:\s*(.+)/);
    if (descMatch) {
      const descLine = descMatch[1];
      // If description starts with " and doesn't end with " on the same line
      if (descLine.startsWith('"') && !descLine.endsWith('"')) {
        errors.push({
          file: path.join(dir, file),
          line: -1,
          error: `Multi-line description without proper block indicator: ${descLine}`,
          frontmatter: frontmatter,
        });
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

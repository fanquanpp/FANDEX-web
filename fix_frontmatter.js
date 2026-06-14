import fs from 'fs';
import path from 'path';

const baseDir = 'c:\\Atian\\Project\\Trae\\FANDEX-vue\\src\\content\\docs\\agent';
const files = fs.readdirSync(baseDir).filter((f) => f.endsWith('.md'));

let fixedCount = 0;
let skipCount = 0;

for (const file of files) {
  const filePath = path.join(baseDir, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fmMatch = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);

    if (!fmMatch) {
      // No frontmatter at all - need to add it
      // Try to extract title from first heading
      const headingMatch = content.match(/^#\s+(.+)$/m);
      const title = headingMatch ? headingMatch[1].trim() : file.replace('.md', '');

      // Extract description from blockquote
      let desc = '';
      const bqMatch = content.match(/^>\s+(.+?)(?:\r?\n\r?\n|\r?\n$)/m);
      if (bqMatch) {
        desc = bqMatch[1]
          .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
          .replace(/\*\*([^*]+)\*\*/g, '$1')
          .replace(/`([^`]+)`/g, '$1');
        if (desc.length > 150) {
          desc = desc.substring(0, 147) + '...';
        }
      }

      const newFm = `---\ntitle: ${title}\ndescription: "${desc}"\nmodule: agent\n---\n`;
      const newContent = newFm + '\n' + content;
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`ADDED frontmatter: ${file}`);
      fixedCount++;
      continue;
    }

    const fm = fmMatch[1];
    const hasTitle = /^title\s*:/m.test(fm);
    const hasModule = /^module\s*:/m.test(fm);
    const hasDesc = /^description\s*:/m.test(fm);
    const hasSlug = /^slug\s*:/m.test(fm);

    if (hasModule && hasDesc && !hasSlug) {
      skipCount++;
      continue;
    }

    let newContent = content;

    // Replace slug with module
    if (hasSlug) {
      newContent = newContent.replace(/^slug:.*\r?\n/gm, 'module: agent\n');
    }

    // Add module if missing and no slug
    if (!hasModule && !hasSlug) {
      newContent = newContent.replace(/^(title:.*)$/m, '$1\nmodule: agent');
    }

    // Add description if missing
    if (!hasDesc) {
      let desc = '';
      const bqMatch = content.match(/^>\s+(.+?)(?:\r?\n\r?\n|\r?\n$)/m);
      if (bqMatch) {
        desc = bqMatch[1]
          .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
          .replace(/\*\*([^*]+)\*\*/g, '$1')
          .replace(/`([^`]+)`/g, '$1');
        if (desc.length > 150) {
          desc = desc.substring(0, 147) + '...';
        }
      }
      newContent = newContent.replace(/^(title:.*)$/m, '$1\ndescription: "' + desc + '"');
    }

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`FIXED: ${file}`);
    fixedCount++;
  } catch (err) {
    console.error(`ERROR: ${file} - ${err.message}`);
  }
}

console.log(`\nDone! Fixed: ${fixedCount}, Skipped (OK): ${skipCount}`);

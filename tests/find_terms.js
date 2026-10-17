const fs = require('fs');
const path = require('path');

function searchInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'replica_screenshots' || file === 'brand_screenshots') continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchInDir(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      ['space to live', 'the space', 'royal', 'kalpi', 'bridge', 'heritage & comfort', '6262621454'].forEach(term => {
        if (content.toLowerCase().includes(term.toLowerCase())) {
          console.log(`Found "${term}" in ${fullPath}`);
        }
      });
    }
  }
}
searchInDir('.');

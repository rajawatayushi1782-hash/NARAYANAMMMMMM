const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const filesToClean = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'apartments.html'),
  path.join(rootDir, 'contact.html')
];

const pagesDir = path.join(rootDir, 'apartments_pages');
fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')).forEach(f => {
  filesToClean.push(path.join(pagesDir, f));
});

filesToClean.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove all <source> tags pointing to assets.era-residence.com
  content = content.replace(/\s*<source\s+src="https:\/\/assets\.era-residence\.com\/[^"]*"[^>]*>/gi, '');

  // 2. Remove og:video pointing to era-residence.com
  content = content.replace(/\s*<meta\s+property="og:video[^"]*"\s+content="https:\/\/assets\.era-residence\.com\/[^"]*">/gi, '');

  // 3. Update data-wf-domain
  content = content.replace(/data-wf-domain="www\.era-residence\.com"/gi, 'data-wf-domain="narayanamhotel.com"');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`Cleaned all external ERA Residence domain links across ${filesToClean.length} files!`);

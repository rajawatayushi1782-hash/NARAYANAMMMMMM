const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = ['index.html', 'apartments.html', 'contact.html'];
const apartDir = path.join(rootDir, 'apartments_pages');
fs.readdirSync(apartDir).filter(f => f.endsWith('.html')).forEach(f => files.push(path.join('apartments_pages', f)));

const suspiciousPatterns = [
  { name: 'Unreal Engine', regex: /unreal/i },
  { name: 'Swiss Technology', regex: /swiss/i },
  { name: 'Spain country reference', regex: /\bspain\b/i },
  { name: 'Spanish Phone (+34)', regex: /\+34/i },
  { name: 'Old ERA email', regex: /info@era-residence\.com/i }
];

let issues = 0;
files.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  suspiciousPatterns.forEach(({ name, regex }) => {
    const match = content.match(regex);
    if (match) {
      console.log(`[${file}] Found suspicious token "${match[0]}" (${name})`);
      issues++;
    }
  });
});

console.log(`Deep text check finished with ${issues} issues.`);

// Now verify all local asset references to /assets/narayanam/...
const narayanamRegex = /\/assets\/narayanam\/[a-zA-Z0-9_\-\.\/]+/g;
const missingAssets = new Set();
let checkedCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  let m;
  while ((m = narayanamRegex.exec(content)) !== null) {
    checkedCount++;
    const assetRelPath = m[0].replace(/^\//, ''); // e.g. "assets/narayanam/rooms/royal-suite.jpg"
    // In our express server, public folder serves /assets or root serves public
    // Let's check public/assets/...
    const fullDiskPath = path.join(rootDir, 'public', assetRelPath);
    if (!fs.existsSync(fullDiskPath)) {
      missingAssets.add(m[0]);
    }
  }
});

console.log(`Checked ${checkedCount} Narayanam asset links.`);
if (missingAssets.size > 0) {
  console.log('MISSING ASSETS ON DISK:');
  missingAssets.forEach(a => console.log(' - ' + a));
} else {
  console.log('ALL referenced Narayanam assets exist on disk!');
}

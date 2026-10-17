const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = ['index.html', 'apartments.html', 'contact.html'];
const apartDir = path.join(rootDir, 'apartments_pages');
fs.readdirSync(apartDir).filter(f => f.endsWith('.html')).forEach(f => files.push(path.join('apartments_pages', f)));

const patterns = [/era\s*residence/i, /estepona/i, /m[áa]laga/i, /costa\s*del\s*sol/i];

let totalMatches = 0;
files.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  patterns.forEach(regex => {
    const matches = content.match(regex);
    if (matches) {
      console.log('Match in ' + file + ' for pattern ' + regex + ': ' + matches[0]);
      totalMatches++;
    }
  });
});

console.log('--- Check Results ---');
console.log('Total leftover matches across all ' + files.length + ' files: ' + totalMatches);

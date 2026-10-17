const fs = require('fs');

function checkThemeElements(filename) {
  const content = fs.readFileSync(filename, 'utf-8');
  console.log(`=== ${filename} ===`);
  const regex = /<([a-zA-Z0-9_-]+)[^>]*\bdata-theme\b[^>]*>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(match[0].slice(0, 150));
  }
}

checkThemeElements('index.html');
checkThemeElements('apartments.html');

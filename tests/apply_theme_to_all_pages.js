const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = ['index.html', 'apartments.html', 'contact.html'];
const apartDir = path.join(rootDir, 'apartments_pages');
fs.readdirSync(apartDir).filter(f => f.endsWith('.html')).forEach(f => files.push(path.join('apartments_pages', f)));

const fontAndThemeLinks = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet"><link href="/css/narayanam-theme.css" rel="stylesheet" type="text/css">`;

let updatedCount = 0;
files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // Avoid duplicate injection
  if (!html.includes('/css/narayanam-theme.css')) {
    // Match either <link href="/css/era-residence.min.css" rel="stylesheet" type="text/css"/> or without closing slash
    html = html.replace(
      /(<link href="\/css\/era-residence\.min\.css"[^>]*>)/,
      `$1${fontAndThemeLinks}`
    );
    fs.writeFileSync(filePath, html, 'utf-8');
    updatedCount++;
    console.log(`Linked theme in ${file}`);
  } else {
    console.log(`Theme already linked in ${file}`);
  }
});

console.log(`Finished linking theme across all ${updatedCount} files!`);

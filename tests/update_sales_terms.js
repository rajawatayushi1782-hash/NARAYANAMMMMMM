const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = ['index.html', 'apartments.html', 'contact.html'];
const apartDir = path.join(rootDir, 'apartments_pages');
fs.readdirSync(apartDir).filter(f => f.endsWith('.html')).forEach(f => files.push(path.join('apartments_pages', f)));

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  let changed = false;
  if (/Sales Office/i.test(html)) {
    html = html.replace(/<h3 class="l1 reg a-center">Sales Office<\/h3>/g, '<h3 class="l1 reg a-center">Hotel &amp; Front Desk</h3>');
    html = html.replace(/Sales Office/gi, 'Front Desk');
    changed = true;
  }

  if (/sales manager/i.test(html)) {
    html = html.replace(/Our sales manager will review your message and respond personally\./gi, 'Our reservations team will review your message and respond promptly.');
    html = html.replace(/sales manager/gi, 'reservations team');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`Updated sales office / sales manager in ${file}`);
  }
});

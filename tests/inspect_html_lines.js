const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

const lines = html.split('\n');
lines.forEach((line, i) => {
  if (line.includes('theme_on') || line.includes('header-logo') || line.includes('s-bar-w') || line.includes('s-down')) {
    console.log(`L${i+1}: ${line.trim().slice(0, 120)}`);
  }
});

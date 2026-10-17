const fs = require('fs');
const css = fs.readFileSync('public/css/narayanam-theme.css', 'utf-8');

const lines = css.split('\n');
lines.forEach((line, i) => {
  if (line.includes('background') && !line.includes('--')) {
    console.log(`L${i+1}: ${line.trim()}`);
  }
});

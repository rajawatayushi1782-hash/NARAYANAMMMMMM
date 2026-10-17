const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf-8');
const lines = indexHtml.split('\n');
lines.forEach((line, i) => {
  if (line.includes('bougainvillea')) {
    console.log(`L${i+1}: ${line.trim().slice(0, 150)}`);
  }
});

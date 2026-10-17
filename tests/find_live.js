const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

let idx = 0;
while ((idx = html.indexOf('Live', idx)) !== -1) {
  console.log(`L${html.substring(0, idx).split('\n').length}: ${html.substring(idx - 100, idx + 150).replace(/\n/g, ' ')}`);
  idx += 4;
}
while ((idx = html.indexOf('live', idx)) !== -1) {
  console.log(`L${html.substring(0, idx).split('\n').length}: ${html.substring(idx - 100, idx + 150).replace(/\n/g, ' ')}`);
  idx += 4;
}

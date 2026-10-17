const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

const startIdx = html.indexOf('<div class="loc-w_over-grad">');
const endIdx = html.indexOf('<div class="loc-s">');
console.log('Start index:', startIdx, 'End index:', endIdx);
console.log('Length of cloud block:', endIdx - startIdx);
console.log(html.substring(startIdx - 50, startIdx + 300));
console.log('...');
console.log(html.substring(endIdx - 200, endIdx + 100));

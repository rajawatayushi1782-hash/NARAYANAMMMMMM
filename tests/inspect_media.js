const fs = require('fs');
const html = fs.readFileSync('apartments_pages/011.html', 'utf-8');

const regex = /class="[^"]*lot-s_media[^"]*"/g;
let m;
while ((m = regex.exec(html)) !== null) {
  const start = Math.max(0, m.index - 50);
  const end = Math.min(html.length, m.index + 200);
  console.log(html.substring(start, end).replace(/\n/g, ' '));
}

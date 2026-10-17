const fs = require('fs');
const html = fs.readFileSync('apartments.html', 'utf-8');
const idx = html.indexOf('apart-card_img_prim');
console.log(html.substring(idx, idx + 900));

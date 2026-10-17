const fs = require('fs');
const html = fs.readFileSync('apartments.html', 'utf-8');

const regex = /<div class="apart-card_img_prim"><img src="[^"]*"([^>]*)>/g;
const matches = html.match(regex);
console.log('Matches count:', matches ? matches.length : 0);
if (matches) {
  console.log('Sample match 0:', matches[0]);
  console.log('Sample match 1:', matches[1]);
}

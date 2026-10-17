const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

const deskMatch = html.match(/<div class="header-logo_bg b-desk w-embed">([\s\S]*?)<\/div>/);
if (deskMatch) {
  console.log('--- b-desk SVG length:', deskMatch[1].length);
  console.log(deskMatch[1].substring(0, 300) + '...' + deskMatch[1].substring(deskMatch[1].length - 100));
}

const mobMatch = html.match(/<div class="header-logo_bg b-mob w-embed">([\s\S]*?)<\/div>/);
if (mobMatch) {
  console.log('--- b-mob SVG length:', mobMatch[1].length);
  console.log(mobMatch[1].substring(0, 300) + '...' + mobMatch[1].substring(mobMatch[1].length - 100));
}

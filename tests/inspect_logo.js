const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');
const idx = html.indexOf('class="header-logo_bg b-desk w-embed"');
if (idx !== -1) {
  console.log(html.substring(idx, idx + 1000));
}

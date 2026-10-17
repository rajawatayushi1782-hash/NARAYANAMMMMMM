const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

const idx = html.indexOf('/assets/narayanam/facilities/hotel-entrance.jpg');
if (idx !== -1) {
  const start = html.lastIndexOf('<section', idx);
  const end = html.indexOf('</section>', idx) + 10;
  console.log('=== SECTION WITH RECEPTION PHOTO ===');
  console.log(html.substring(start, end));
}

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'apartments_pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Bathroom srcset -> room-7.jpg
  html = html.replace(
    /srcset="https:\/\/cdn\.prod\.website-files\.com\/[^"]*era-residence-bathroom[^"]*"/g,
    'srcset="/assets/narayanam/rooms/room-7.jpg 1920w"'
  );

  // 2. Ground-floor srcset -> room-8.jpg
  html = html.replace(
    /srcset="https:\/\/cdn\.prod\.website-files\.com\/[^"]*era-residence-ground-floor-p[^"]*"/g,
    'srcset="/assets/narayanam/rooms/room-8.jpg 1920w"'
  );

  // 3. Kitchen srcset -> naivedyam-restaurant.jpg
  html = html.replace(
    /srcset="https:\/\/cdn\.prod\.website-files\.com\/[^"]*era-residence-kitchen[^"]*"/g,
    'srcset="/assets/narayanam/dining/naivedyam-restaurant.jpg 1920w"'
  );

  fs.writeFileSync(filePath, html, 'utf8');
});

console.log(`Cleaned all 25 room pages of residual gallery srcsets!`);

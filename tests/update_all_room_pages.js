const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const dirPath = path.join(rootDir, 'apartments_pages');
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

const roomConfig = {
  royal: ['011', '012', '031', '032', '033', '034'],
  premium: ['111', '112', '113', '114', '121', '122', '123', '124'],
  executive: ['131', '132', '133', '134', '211', '212', '213'],
  deluxe: ['221', '222', '223', '224']
};

const roomPhotos = [
  '/assets/narayanam/rooms/royal-suite.jpg',
  '/assets/narayanam/rooms/premium-suite.jpeg',
  '/assets/narayanam/rooms/executive-room.jpg',
  '/assets/narayanam/rooms/room-6.jpg',
  '/assets/narayanam/rooms/room-7.jpg',
  '/assets/narayanam/rooms/room-8.jpg',
  '/assets/narayanam/rooms/room-9.jpg',
  '/assets/narayanam/rooms/room-13.jpg',
  '/assets/narayanam/rooms/room-18.jpg',
  '/assets/narayanam/rooms/room-19.jpg',
  '/assets/narayanam/rooms/room-20.jpg',
  '/assets/narayanam/rooms/room-21.jpg',
  '/assets/narayanam/rooms/room-22.jpg',
  '/assets/narayanam/facilities/hotel-exterior-1.webp'
];

files.forEach(file => {
  const slug = file.replace('.html', '');
  const fullPath = path.join(dirPath, file);
  let html = fs.readFileSync(fullPath, 'utf-8');

  let roomType = 'Executive Room';
  let mainImg = '/assets/narayanam/rooms/executive-room.jpg';

  if (roomConfig.royal.includes(slug)) {
    roomType = 'Royal Suite with Jacuzzi';
    mainImg = '/assets/narayanam/rooms/royal-suite.jpg';
  } else if (roomConfig.premium.includes(slug)) {
    roomType = 'Premium Suite';
    mainImg = '/assets/narayanam/rooms/premium-suite.jpeg';
  } else if (roomConfig.deluxe.includes(slug)) {
    roomType = 'Deluxe Room';
    mainImg = '/assets/narayanam/rooms/room-6.jpg';
  }

  // 1. Header & Navigation "Select an Apartment" -> "Rooms & Suites"
  html = html.replace(/Select\s*<br\s*\/?>\s*an Apartment/gi, 'Rooms &amp;<br/>Suites');
  html = html.replace(/Select\s+an\s+Apartment/gi, 'Rooms &amp; Suites');
  html = html.replace(/aria-label="Select\s+an\s+Apartment"/gi, 'aria-label="Rooms &amp; Suites"');
  html = html.replace(/aria-label="Select\s+an Apartment"/gi, 'aria-label="Rooms &amp; Suites"');

  // 2. Desktop main media layout image
  html = html.replace(
    /(<div hover-pin-trigger="" hover-media-item="" class="lot-s_media_layout_img-prim theme_on-color">)<img src="[^"]*"[^>]*>/,
    `$1<img src="${mainImg}" loading="eager" data-lightbox="" alt="${roomType}" sizes="100vw" srcset="${mainImg} 1200w" class="img contain" style="object-fit: cover; width: 100%; height: 100%; border-radius: 4px;"/>`
  );

  // 3. Mobile main media layout image
  html = html.replace(
    /(<div class="lot-s_media_layout_img-prim theme_on-color">)<img src="[^"]*"[^>]*>/,
    `$1<img src="${mainImg}" loading="eager" alt="${roomType}" sizes="100vw" srcset="${mainImg} 1200w" class="img contain" style="object-fit: cover; width: 100%; height: 100%; border-radius: 4px;"/>`
  );

  // 4. Schema updates
  html = html.replace(/"image":\s*"\/assets\/[^"]*"/, `"image": "${mainImg}"`);
  html = html.replace(/"value":\s*"\/assets\/6a345[^"]*"/, `"value": "${mainImg}"`);
  html = html.replace(/"value":\s*"4Q 2026"/, `"value": "Instant Confirmation"`);

  // 5. Bottom card images
  let cardCount = 0;
  html = html.replace(/<div class="apart-card_img_prim"><img src="[^"]*"([^>]*)>/g, () => {
    const photo = roomPhotos[cardCount % roomPhotos.length];
    cardCount++;
    return `<div class="apart-card_img_prim"><img src="${photo}" loading="eager" alt="Narayanam Hotel Luxury Room" class="img contain" style="object-fit: cover; width: 100%; height: 100%; border-radius: 4px;">`;
  });

  fs.writeFileSync(fullPath, html, 'utf-8');
});

console.log(`Updated all ${files.length} room pages with perfected images & navigation labels!`);

const fs = require('fs');
const path = require('path');

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

const filePath = path.join(__dirname, '..', 'apartments.html');
let html = fs.readFileSync(filePath, 'utf-8');

let count = 0;
html = html.replace(/<div class="apart-card_img_prim"><img src="[^"]*"([^>]*)>/g, (match) => {
  const photo = roomPhotos[count % roomPhotos.length];
  count++;
  return `<div class="apart-card_img_prim"><img src="${photo}" loading="eager" alt="Narayanam Hotel Luxury Room" class="img contain" style="object-fit: cover; width: 100%; height: 100%; border-radius: 4px;">`;
});

fs.writeFileSync(filePath, html, 'utf-8');
console.log(`Replaced all ${count} card images in apartments.html safely!`);

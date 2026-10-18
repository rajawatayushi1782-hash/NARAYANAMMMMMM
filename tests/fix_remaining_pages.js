const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// ==========================================
// 1. FIX APARTMENTS.HTML
// ==========================================
console.log('--- Fixing apartments.html ---');
const aptPath = path.join(rootDir, 'apartments.html');
let aptHtml = fs.readFileSync(aptPath, 'utf8');

// Replace pre-footer CTA image tag (era-residence-garden-2)
aptHtml = aptHtml.replace(
  /<img\s+data-parallax="img"\s+loading="eager"\s+alt="[^"]*"\s+src="\/assets\/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2\.webp"[^>]*>/g,
  '<img data-parallax="img" loading="eager" alt="Narayanam Hotel Gwalior" src="/assets/narayanam/facilities/hotel-front-view.jpg" sizes="(max-width: 1920px) 100vw, 1920px" srcset="/assets/narayanam/facilities/hotel-front-view.jpg 1920w" class="img-p" style="translate: none; rotate: none; scale: none; transform: translate(0%, -15%) translate3d(0px, 0px, 10px);">'
);

fs.writeFileSync(aptPath, aptHtml, 'utf8');
console.log('apartments.html fixed!');

// ==========================================
// 2. FIX CONTACT.HTML
// ==========================================
console.log('--- Fixing contact.html ---');
const contactPath = path.join(rootDir, 'contact.html');
let contactHtml = fs.readFileSync(contactPath, 'utf8');

// Replace pre-footer CTA image tag (img_cam_09)
contactHtml = contactHtml.replace(
  /<img\s+data-parallax="img"\s+loading="eager"\s+alt="[^"]*"\s+src="\/assets\/6a1507d9c527d247564a1cd7_img_cam_09\.webp"[^>]*>/g,
  '<img data-parallax="img" loading="eager" alt="Narayanam Hotel Gwalior" src="/assets/narayanam/facilities/hotel-front-view.jpg" sizes="(max-width: 1920px) 100vw, 1920px" srcset="/assets/narayanam/facilities/hotel-front-view.jpg 1920w" class="img-p" style="translate: none; rotate: none; scale: none; transform: translate(0%, -15%) translate3d(0px, 0px, 10px);">'
);

fs.writeFileSync(contactPath, contactHtml, 'utf8');
console.log('contact.html fixed!');

// ==========================================
// 3. FIX APARTMENTS_PAGES/*.HTML
// ==========================================
console.log('--- Fixing apartments_pages/*.html ---');
const pagesDir = path.join(rootDir, 'apartments_pages');
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

pageFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Fix gallery image 1: room-7.jpg (remove ERA bathroom srcset)
  html = html.replace(
    /<img\s+src="\/assets\/narayanam\/rooms\/room-7\.jpg"\s+loading="eager"\s+data-lightbox=""\s+alt="[^"]*"\s+sizes="100vw"\s+srcset="https:\/\/cdn\.prod\.website-files\.com\/[^"]*era-residence-bathroom[^"]*"\s+class="img h-auto"\s*\/?>/g,
    '<img src="/assets/narayanam/rooms/room-7.jpg" loading="eager" data-lightbox="" alt="Narayanam Hotel Luxury Room" sizes="100vw" srcset="/assets/narayanam/rooms/room-7.jpg 1920w" class="img h-auto" />'
  );

  // Fix gallery image 2: room-8.jpg (remove ERA ground-floor srcset)
  html = html.replace(
    /<img\s+src="\/assets\/narayanam\/rooms\/room-8\.jpg"\s+loading="eager"\s+data-lightbox=""\s+alt="[^"]*"\s+sizes="100vw"\s+srcset="https:\/\/cdn\.prod\.website-files\.com\/[^"]*era-residence-ground-floor[^"]*"\s+class="img h-auto"\s*\/?>/g,
    '<img src="/assets/narayanam/rooms/room-8.jpg" loading="eager" data-lightbox="" alt="Narayanam Hotel Suite" sizes="100vw" srcset="/assets/narayanam/rooms/room-8.jpg 1920w" class="img h-auto" />'
  );

  // Fix gallery image 3: naivedyam-restaurant.jpg (remove ERA kitchen srcset)
  html = html.replace(
    /<img\s+src="\/assets\/narayanam\/dining\/naivedyam-restaurant\.jpg"\s+loading="eager"\s+data-lightbox=""\s+alt="[^"]*"\s+sizes="100vw"\s+srcset="https:\/\/cdn\.prod\.website-files\.com\/[^"]*era-residence-kitchen[^"]*"\s+class="img h-auto"\s*\/?>/g,
    '<img src="/assets/narayanam/dining/naivedyam-restaurant.jpg" loading="eager" data-lightbox="" alt="Naivedyam Pure Veg Restaurant" sizes="100vw" srcset="/assets/narayanam/dining/naivedyam-restaurant.jpg 1920w" class="img h-auto" />'
  );

  // Fix pre-footer CTA image tag (era-residence-ground-floor-2)
  html = html.replace(
    /<img\s+data-parallax="img"\s+loading="eager"\s+alt="[^"]*"\s+src="https:\/\/cdn\.prod\.website-files\.com\/6a068da7ad91b057365bf967\/6a24918d32632ad41e5ee7c8_era-residence-ground-floor-2\.webp"[^>]*>/g,
    '<img data-parallax="img" loading="eager" alt="Narayanam Hotel Gwalior" src="/assets/narayanam/facilities/hotel-front-view.jpg" sizes="(max-width: 1920px) 100vw, 1920px" srcset="/assets/narayanam/facilities/hotel-front-view.jpg 1920w" class="img-p" />'
  );

  fs.writeFileSync(filePath, html, 'utf8');
});

console.log(`Updated all ${pageFiles.length} room pages!`);

const https = require('https');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public', 'assets', 'narayanam');
const dirs = ['logo', 'hero', 'rooms', 'dining', 'facilities', 'gallery'];
dirs.forEach(d => fs.mkdirSync(path.join(baseDir, d), { recursive: true }));

const images = [
  // Logo
  { url: 'https://www.narayanamhotel.com/img/logo.webp', dest: 'logo/logo.webp' },
  { url: 'https://www.narayanamhotel.com/img/logo_white.png', dest: 'logo/logo_white.png' },
  { url: 'https://www.narayanamhotel.com/img/favicon.png', dest: 'logo/favicon.png' },
  
  // Hero banners
  { url: 'https://www.narayanamhotel.com/img/banners/banner-1.webp', dest: 'hero/banner-1.webp' },
  { url: 'https://www.narayanamhotel.com/img/banners/banner-2.webp', dest: 'hero/banner-2.webp' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/19-1.jpg', dest: 'hero/hero-night.jpg' },
  
  // Rooms
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/10.jpg', dest: 'rooms/royal-suite.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/11.jpg', dest: 'rooms/executive-room.jpg' },
  { url: 'https://www.narayanamhotel.com/img/service/2024/suite.jpeg', dest: 'rooms/premium-suite.jpeg' },
  { url: 'https://www.narayanamhotel.com/img/packages/4.webp', dest: 'rooms/royal-suite-alt.webp' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/6.jpg', dest: 'rooms/room-6.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/7.jpg', dest: 'rooms/room-7.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/8.jpg', dest: 'rooms/room-8.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/9.jpg', dest: 'rooms/room-9.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/13.jpg', dest: 'rooms/room-13.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/18.jpg', dest: 'rooms/room-18.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/19.jpg', dest: 'rooms/room-19.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/20.jpg', dest: 'rooms/room-20.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/21.jpg', dest: 'rooms/room-21.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/rooms/22.jpg', dest: 'rooms/room-22.jpg' },

  // Dining & Bars
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/resturant/33.jpg', dest: 'dining/naivedyam-restaurant.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/resturant/34.jpg', dest: 'dining/restaurant-interior.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/resturant/35.jpg', dest: 'dining/dining-spread.jpg' },
  { url: 'https://www.narayanamhotel.com/img/packages/1.webp', dest: 'dining/nishabd-coffee-shop.webp' },
  { url: 'https://www.narayanamhotel.com/img/packages/6.webp', dest: 'dining/naivedyam-cuisine.webp' },

  // Facilities & Banquets
  { url: 'https://www.narayanamhotel.com/img/packages/spa.webp', dest: 'facilities/nirvana-gym.webp' },
  { url: 'https://www.narayanamhotel.com/img/packages/2-1.webp', dest: 'facilities/navras-banquet.webp' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/party/23.jpg', dest: 'facilities/navrang-banquet-hall.jpg' },
  { url: 'https://www.narayanamhotel.com/img/hotel-pic/1.webp', dest: 'facilities/hotel-exterior-1.webp' },
  { url: 'https://www.narayanamhotel.com/img/hotel-pic/2.webp', dest: 'facilities/hotel-exterior-2.webp' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/entrance/1.jpg', dest: 'facilities/hotel-front-view.jpg' },
  { url: 'https://www.narayanamhotel.com/img/gallery-pic/prettyPhoto/ent/2.jpg', dest: 'facilities/hotel-entrance.jpg' }
];

async function downloadAll() {
  console.log('Downloading Narayanam Hotel assets...');
  let completed = 0;
  for (const item of images) {
    const fullPath = path.join(baseDir, item.dest);
    try {
      await new Promise((resolve, reject) => {
        const req = https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, res => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            https.get(res.headers.location, r2 => {
              const fileStream = fs.createWriteStream(fullPath);
              r2.pipe(fileStream);
              fileStream.on('finish', () => { fileStream.close(); resolve(); });
            }).on('error', reject);
            return;
          }
          if (res.statusCode !== 200) {
            reject(new Error('Status ' + res.statusCode));
            return;
          }
          const fileStream = fs.createWriteStream(fullPath);
          res.pipe(fileStream);
          fileStream.on('finish', () => { fileStream.close(); resolve(); });
        });
        req.on('error', reject);
      });
      completed++;
      console.log('✓ Downloaded: ' + item.dest);
    } catch (e) {
      console.warn('✗ Failed to download: ' + item.url + ' (' + e.message + ')');
    }
  }
  console.log('Finished downloading ' + completed + '/' + images.length + ' assets.');
}

downloadAll();

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// ==========================================
// 1. FIX INDEX.HTML
// ==========================================
console.log('--- Updating index.html ---');
const indexPath = path.join(rootDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// (a) Day hero banner (Line ~1670)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a25da81dce540a251389928_era-residence_gated-community_day[^"]*"/g,
  'srcset="/assets/narayanam/hero/banner-1.webp 1920w"'
);

// (b) Night hero banner (Line ~1676)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/file_mlb77 500w, \/assets\/file_71p59e 800w, \/assets\/file_vmhizb 1080w, \/assets\/file_eagw2 1600w, \/assets\/narayanam\/hero\/hero-night\.jpg 1920w"/g,
  'srcset="/assets/narayanam/hero/hero-night.jpg 1920w"'
);

// (c) Quote background (Line ~2025)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a0f8c07861fe831459ff0d9_img_cam_05_alpha-p-500\.png 500w, \/assets\/6a0f8c07861fe831459ff0d9_img_cam_05_alpha-p-800\.png 800w, \/assets\/6a0f8c07861fe831459ff0d9_img_cam_05_alpha-p-1080\.png 1080w, \/assets\/narayanam\/rooms\/premium-suite\.jpeg 1920w"\s+alt="Modern building with flowering vines beside a rectangular swimming pool and palm trees\."/g,
  'srcset="/assets/narayanam/rooms/premium-suite.jpeg 1920w" alt="Narayanam Hotel Premium Suite"'
);

// (d) Reception / Entrance (Line ~2357)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a15185e6803ae588479d12b_era-residence-master-plan-p-500\.png 500w, \/assets\/6a15185e6803ae588479d12b_era-residence-master-plan-p-800\.png 800w, \/assets\/6a15185e6803ae588479d12b_era-residence-master-plan-p-1080\.png 1080w, \/assets\/narayanam\/facilities\/hotel-entrance\.jpg 1920w"/g,
  'srcset="/assets/narayanam/facilities/hotel-entrance.jpg 1920w"'
);

// (e) Royal Suite room slider (Line ~2432)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/file_snb32v 500w, \/assets\/file_rgw1qq 800w, \/assets\/file_moi2db 1080w, \/assets\/file_o02p9q 1600w, \/assets\/narayanam\/rooms\/royal-suite\.jpg 1920w"/g,
  'srcset="/assets/narayanam/rooms/royal-suite.jpg 1920w"'
);

// (f) Premium Suite room slider (Line ~2493)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a1575f46655e8c4e795ec64_era-residence-landscaping-p-500\.webp 500w, \/assets\/6a1575f46655e8c4e795ec64_era-residence-landscaping-p-800\.webp 800w, \/assets\/6a1575f46655e8c4e795ec64_era-residence-landscaping-p-1080\.webp 1080w, \/assets\/6a1575f46655e8c4e795ec64_era-residence-landscaping-p-1600\.webp 1600w, \/assets\/narayanam\/rooms\/premium-suite\.jpeg 1920w"/g,
  'srcset="/assets/narayanam/rooms/premium-suite.jpeg 1920w"'
);

// (g) Executive Room room slider (Line ~2554)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a15153b797c328a9f2f5964_era-residence-terrace-p-500\.png 500w, \/assets\/6a15153b797c328a9f2f5964_era-residence-terrace-p-800\.png 800w, \/assets\/6a15153b797c328a9f2f5964_era-residence-terrace-p-1080\.png 1080w, \/assets\/narayanam\/rooms\/executive-room\.jpg 1920w"/g,
  'srcset="/assets/narayanam/rooms/executive-room.jpg 1920w"'
);

// (h) Dining / Naivedyam restaurant (Line ~2704)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a1512e5b24991c76981118b_era-residence-gated-community-p-500\.webp 500w, \/assets\/6a1512e5b24991c76981118b_era-residence-gated-community-p-800\.webp 800w, \/assets\/6a1512e5b24991c76981118b_era-residence-gated-community-p-1080\.webp 1080w, \/assets\/6a1512e5b24991c76981118b_era-residence-gated-community-p-1600\.webp 1600w, \/assets\/narayanam\/dining\/naivedyam-restaurant\.jpg 1920w"/g,
  'srcset="/assets/narayanam/dining/naivedyam-restaurant.jpg 1920w"'
);

// (i) Nishabd coffee shop (Line ~2733)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a151264dc1dcca76fda17d9_era-residence-pool-p-500\.webp 500w, \/assets\/6a151264dc1dcca76fda17d9_era-residence-pool-p-800\.webp 800w, \/assets\/6a151264dc1dcca76fda17d9_era-residence-pool-p-1080\.webp 1080w, \/assets\/6a151264dc1dcca76fda17d9_era-residence-pool-p-1600\.webp 1600w, \/assets\/narayanam\/dining\/nishabd-coffee-shop\.webp 1920w"/g,
  'srcset="/assets/narayanam/dining/nishabd-coffee-shop.webp 1920w"'
);

// (j) Navrang banquet hall (Line ~2762)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a1573fc640c344ee0705819_era-residence-parking-p-500\.png 500w, \/assets\/6a1573fc640c344ee0705819_era-residence-parking-p-800\.png 800w, \/assets\/narayanam\/facilities\/navrang-banquet-hall\.jpg 1920w"/g,
  'srcset="/assets/narayanam/facilities/navrang-banquet-hall.jpg 1920w"'
);

// (k) Nirvana gym (Line ~2791)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a15132fe66907986a254201_era-residence-spa-_26-gym-p-500\.webp 500w, \/assets\/6a15132fe66907986a254201_era-residence-spa-_26-gym-p-800\.webp 800w, \/assets\/6a15132fe66907986a254201_era-residence-spa-_26-gym-p-1080\.webp 1080w, \/assets\/6a15132fe66907986a254201_era-residence-spa-_26-gym-p-1600\.webp 1600w, \/assets\/narayanam\/facilities\/nirvana-gym\.webp 1920w"/g,
  'srcset="/assets/narayanam/facilities/nirvana-gym.webp 1920w"'
);

// (l) Restaurant interior (Line ~2821)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a151382fb101ce2ca9db288_era-residence-landscaping-p-500\.png 500w, \/assets\/6a151382fb101ce2ca9db288_era-residence-landscaping-p-800\.png 800w, \/assets\/6a151382fb101ce2ca9db288_era-residence-landscaping-p-1080\.png 1080w, \/assets\/narayanam\/dining\/restaurant-interior\.jpg 1920w"/g,
  'srcset="/assets/narayanam/dining/restaurant-interior.jpg 1920w"'
);

// (m) Space to live in - Left Image (Line ~2932) -> replace src, srcset, alt
indexHtml = indexHtml.replace(
  /src="\/assets\/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2\.webp"\s+loading="eager"\s+sizes="\([^"]*\)"\s+srcset="\/assets\/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2-p-500\.png 500w, \/assets\/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2-p-800\.png 800w, \/assets\/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2\.webp 1920w"\s+alt="Outdoor seating with modern chair[^"]*"/g,
  'src="/assets/narayanam/rooms/royal-suite-alt.webp" loading="eager" sizes="(max-width: 1920px) 100vw, 1920px" srcset="/assets/narayanam/rooms/royal-suite-alt.webp 1920w" alt="Narayanam Hotel Luxurious Living Suite"'
);

// (n) Space to live in - Right Image (Line ~2960)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a15723f346e4b3a6c0af26a_era-residence-terrace-p-500\.png 500w, \/assets\/6a15723f346e4b3a6c0af26a_era-residence-terrace-p-800\.png 800w, \/assets\/6a15723f346e4b3a6c0af26a_era-residence-terrace-p-1080\.png 1080w, \/assets\/narayanam\/facilities\/hotel-front-view\.jpg 1920w"\s+alt="Sunlit terrace with cushioned seating[^"]*"/g,
  'srcset="/assets/narayanam/facilities/hotel-front-view.jpg 1920w" alt="Narayanam Hotel Architecture and Facade"'
);

// (o) Gallery 1 (Line ~3017)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a1507fddb26e71ff717c30c_img_cam_03-p-500\.webp 500w, \/assets\/6a1507fddb26e71ff717c30c_img_cam_03-p-800\.webp 800w, \/assets\/6a1507fddb26e71ff717c30c_img_cam_03-p-1080\.webp 1080w, \/assets\/6a1507fddb26e71ff717c30c_img_cam_03-p-1600\.webp 1600w, \/assets\/narayanam\/rooms\/room-6\.jpg 1920w"/g,
  'srcset="/assets/narayanam/rooms/room-6.jpg 1920w"'
);

// (p) Gallery 2 (Line ~3026)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a15080748155bc8e151f5ff_img_cam_07-p-500\.webp 500w, \/assets\/6a15080748155bc8e151f5ff_img_cam_07-p-800\.webp 800w, \/assets\/6a15080748155bc8e151f5ff_img_cam_07-p-1080\.webp 1080w, \/assets\/6a15080748155bc8e151f5ff_img_cam_07-p-1600\.webp 1600w, \/assets\/narayanam\/rooms\/room-7\.jpg 1920w"/g,
  'srcset="/assets/narayanam/rooms/room-7.jpg 1920w"'
);

// (q) Gallery 3 (Line ~3035)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a150812aefa2e544369d4a6_img_cam_09-p-500\.webp 500w, \/assets\/6a150812aefa2e544369d4a6_img_cam_09-p-800\.webp 800w, \/assets\/6a150812aefa2e544369d4a6_img_cam_09-p-1080\.webp 1080w, \/assets\/6a150812aefa2e544369d4a6_img_cam_09-p-1600\.webp 1600w, \/assets\/narayanam\/rooms\/room-8\.jpg 1920w"/g,
  'srcset="/assets/narayanam/rooms/room-8.jpg 1920w"'
);

// (r) Gallery 4 (Line ~3044)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a1575180f248400b7124a46_era-residence-kitchen-p-500\.webp 500w, \/assets\/6a1575180f248400b7124a46_era-residence-kitchen-p-800\.webp 800w, \/assets\/6a1575180f248400b7124a46_era-residence-kitchen-p-1080\.webp 1080w, \/assets\/6a1575180f248400b7124a46_era-residence-kitchen-p-1600\.webp 1600w, \/assets\/narayanam\/dining\/dining-spread\.jpg 1920w"/g,
  'srcset="/assets/narayanam/dining/dining-spread.jpg 1920w"'
);

// (s) Mobile exterior view (Line ~3189)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a0f8994091fd12c24e79c8a_img_cam_02-p-500\.png 500w, \/assets\/6a0f8994091fd12c24e79c8a_img_cam_02-p-800\.png 800w, \/assets\/6a0f8994091fd12c24e79c8a_img_cam_02-p-1080\.png 1080w, \/assets\/narayanam\/facilities\/hotel-exterior-2\.webp 1920w"\s+alt="Modern terrace apartments with green plants[^"]*"/g,
  'srcset="/assets/narayanam/facilities/hotel-exterior-2.webp 1920w" alt="Narayanam Hotel Royal Facade"'
);

// (t) Pre-footer CTA background (Line ~3431)
indexHtml = indexHtml.replace(
  /srcset="\/assets\/6a0f88f3b81e88aabf6874e7_img_cta_1920-p-500\.png 500w, \/assets\/6a0f88f3b81e88aabf6874e7_img_cta_1920-p-800\.png 800w, \/assets\/6a0f88f3b81e88aabf6874e7_img_cta_1920-p-1080\.png 1080w, \/assets\/6a0f88f3b81e88aabf6874e7_img_cta_1920-p-1600\.png 1600w, \/assets\/narayanam\/facilities\/hotel-front-view\.jpg 1920w"/g,
  'srcset="/assets/narayanam/facilities/hotel-front-view.jpg 1920w"'
);

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('index.html updated successfully!');

// ==========================================
// 2. FIX APARTMENTS.HTML
// ==========================================
console.log('\n--- Updating apartments.html ---');
const aptPath = path.join(rootDir, 'apartments.html');
let aptHtml = fs.readFileSync(aptPath, 'utf8');

// (a) Benefit card 1 image & text
aptHtml = aptHtml.replace(
  /<h3 data-scroll-reveal="p" class="h5">Boutique concept<\/h3>\s*<div class="u-12"><\/div>\s*<p data-scroll-reveal="p" class="p1">A boutique gated community of 25 residences on Gwalior,\s*designed around privacy,wellbeing and timeless Mediterranean living\.<\/p>\s*<\/div>\s*<div class="benefit-card_bg">\s*<div data-parallax="w" class="img-w"><img\s+src="\/assets\/6a54e888e523b4fb585095c4_exterior_201\.jpg"[^>]*>/g,
  `<h3 data-scroll-reveal="p" class="h5">Boutique Luxury</h3>
                            <div class="u-12"></div>
                            <p data-scroll-reveal="p" class="p1">A premier luxury hotel in the heart of Gwalior, offering warm hospitality, refined comfort, and timeless elegance.</p>
                          </div>
                          <div class="benefit-card_bg">
                            <div data-parallax="w" class="img-w"><img
                                src="/assets/narayanam/facilities/hotel-exterior-1.webp" loading="eager"
                                data-parallax="img" alt="Narayanam Hotel Boutique Luxury" class="img-p"
                                style="translate: none; rotate: none; scale: none; transform: translate(0%, -15%) translate3d(0px, 0px, 10px);">`
);

// (b) Benefit card 2 image & text
aptHtml = aptHtml.replace(
  /<h3 data-scroll-reveal="p" class="h5">Built to stay<\/h3>\s*<div class="u-12"><\/div>\s*<p data-scroll-reveal="p" class="p1">Drawing on the spirit of Marbella's golden age[^<]*<\/p>\s*<\/div>\s*<div class="benefit-card_bg">\s*<div data-parallax="w" class="img-w"><img\s+src="\/assets\/6a54e86a8a1cf6dc64ae6420_terrace_20view_202\.jpg"[^>]*>/g,
  `<h3 data-scroll-reveal="p" class="h5">Royal Living</h3>
                            <div class="u-12"></div>
                            <p data-scroll-reveal="p" class="p1">Immerse yourself in regal accommodations featuring lavish furnishings, hand-carved accents, and modern luxury amenities.</p>
                          </div>
                          <div class="benefit-card_bg">
                            <div data-parallax="w" class="img-w"><img
                                src="/assets/narayanam/facilities/hotel-front-view.jpg" loading="eager"
                                data-parallax="img" alt="Narayanam Hotel Royal Living" class="img-p"
                                style="translate: none; rotate: none; scale: none; transform: translate(0%, -15%) translate3d(0px, 0px, 10px);">`
);

// (c) Benefit card 3 image & text
aptHtml = aptHtml.replace(
  /<h3 data-scroll-reveal="p" class="h5">Industrial finishing<\/h3>\s*<div class="u-12"><\/div>\s*<p data-scroll-reveal="p" class="p1">Instead of corridors, walking paths connect the[^<]*<\/p>\s*<\/div>\s*<div class="benefit-card_bg">\s*<div data-parallax="w" class="img-w"><img\s+src="\/assets\/6a38473e1051ca440012729b_era-residence-ground-floor-2\.webp"[^>]*>/g,
  `<h3 data-scroll-reveal="p" class="h5">World-Class Amenities</h3>
                            <div class="u-12"></div>
                            <p data-scroll-reveal="p" class="p1">Featuring fine dining at Naivedyam, state-of-the-art wellness at Nirvana Gym, and grand banquet venues for your celebrations.</p>
                          </div>
                          <div class="benefit-card_bg">
                            <div data-parallax="w" class="img-w"><img
                                src="/assets/narayanam/facilities/hotel-entrance.jpg" loading="eager"
                                data-parallax="img" alt="Narayanam Hotel Grand Entrance" class="img-p"
                                style="translate: none; rotate: none; scale: none; transform: translate(0%, -15%) translate3d(0px, 0px, 10px);">`
);

// (d) Pre-footer CTA background (Line ~4575)
aptHtml = aptHtml.replace(
  /src="\/assets\/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2\.webp"\s+sizes="\([^"]*\)"\s+srcset="\/assets\/6a1571e51d50c8bcf5f4bb3d_era-residence-garden-2[^"]*"/g,
  'src="/assets/narayanam/facilities/hotel-front-view.jpg" sizes="(max-width: 1920px) 100vw, 1920px" srcset="/assets/narayanam/facilities/hotel-front-view.jpg 1920w" alt="Narayanam Hotel Gwalior"'
);

fs.writeFileSync(aptPath, aptHtml, 'utf8');
console.log('apartments.html updated successfully!');

// ==========================================
// 3. FIX CONTACT.HTML
// ==========================================
console.log('\n--- Updating contact.html ---');
const contactPath = path.join(rootDir, 'contact.html');
let contactHtml = fs.readFileSync(contactPath, 'utf8');

// (a) Pre-footer CTA background (Line ~1645)
contactHtml = contactHtml.replace(
  /src="\/assets\/6a1507d9c527d247564a1cd7_img_cam_09\.webp"\s+sizes="\([^"]*\)"\s+srcset="\/assets\/6a1507d9c527d247564a1cd7_img_cam_09[^"]*"/g,
  'src="/assets/narayanam/facilities/hotel-front-view.jpg" sizes="(max-width: 1920px) 100vw, 1920px" srcset="/assets/narayanam/facilities/hotel-front-view.jpg 1920w" alt="Narayanam Hotel Gwalior"'
);

fs.writeFileSync(contactPath, contactHtml, 'utf8');
console.log('contact.html updated successfully!');

// ==========================================
// 4. FIX APARTMENTS_PAGES/*.HTML
// ==========================================
console.log('\n--- Updating apartments_pages/*.html ---');
const pagesDir = path.join(rootDir, 'apartments_pages');
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

pageFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Amenity 1: Gated community -> Naivedyam Restaurant
  html = html.replace(
    /src="\/assets\/6a1512e5b24991c76981118b_era-residence-gated-community\.webp"[^>]*sizes="100vw"[^>]*srcset="[^"]*"/g,
    'src="/assets/narayanam/dining/naivedyam-restaurant.jpg" sizes="100vw" srcset="/assets/narayanam/dining/naivedyam-restaurant.jpg 1920w" alt="Naivedyam Restaurant"'
  );
  html = html.replace(/<h3 data-scroll-reveal="p" data-tab="p" class="l1">Gated community<\/h3>/g, '<h3 data-scroll-reveal="p" data-tab="p" class="l1">Naivedyam Restaurant</h3>');
  html = html.replace(/<h4 data-scroll-reveal="p" data-tab="p" class="h5">Controlled access with 24\/7 security\.\s*Perimeter barrier and surveillance system\.<\/h4>/g, '<h4 data-scroll-reveal="p" data-tab="p" class="h5">Pure vegetarian fine dining offering exquisite Indian and international culinary delicacies.</h4>');

  // Amenity 2: Swimming Pool -> Nishabd Coffee Shop
  html = html.replace(
    /src="\/assets\/6a151264dc1dcca76fda17d9_era-residence-pool\.webp"[^>]*sizes="100vw"[^>]*srcset="[^"]*"/g,
    'src="/assets/narayanam/dining/nishabd-coffee-shop.webp" sizes="100vw" srcset="/assets/narayanam/dining/nishabd-coffee-shop.webp 1920w" alt="Nishabd Coffee Shop"'
  );
  html = html.replace(/<h3 data-scroll-reveal="p" data-tab="p" class="l1">Swimming Pool<\/h3>/g, '<h3 data-scroll-reveal="p" data-tab="p" class="l1">Nishabd Coffee Shop</h3>');
  html = html.replace(/<h4 data-scroll-reveal="p" data-tab="p" class="h5">Saltwater swimming pool, Children’s\s*pool, Sauna, jacuzzi and wellness shower<\/h4>/g, '<h4 data-scroll-reveal="p" data-tab="p" class="h5">Relaxing café and lounge serving fresh brews, delicate pastries, and artisanal refreshments.</h4>');

  // Amenity 3: Parking area -> Navrang Banquet Hall
  html = html.replace(
    /src="\/assets\/6a1573fc640c344ee0705819_era-residence-parking\.webp"[^>]*sizes="100vw"[^>]*srcset="[^"]*"/g,
    'src="/assets/narayanam/facilities/navrang-banquet-hall.jpg" sizes="100vw" srcset="/assets/narayanam/facilities/navrang-banquet-hall.jpg 1920w" alt="Navrang Banquet Hall"'
  );
  html = html.replace(/<h3 data-scroll-reveal="p" data-tab="p" class="l1">Parking area<\/h3>/g, '<h3 data-scroll-reveal="p" data-tab="p" class="l1">Navrang Banquet Hall</h3>');
  html = html.replace(/<h4 data-scroll-reveal="p" data-tab="p" class="h5">Each parking space includes\s*pre-installation for optional EV charging\.<\/h4>/g, '<h4 data-scroll-reveal="p" data-tab="p" class="h5">Opulent celebration hall designed for grand weddings, executive conferences, and private banquets.</h4>');

  // Amenity 4: Spa & Gym -> Nirvana Fitness Center
  html = html.replace(
    /src="\/assets\/6a15132fe66907986a254201_era-residence-spa-_26-gym\.webp"[^>]*sizes="100vw"[^>]*srcset="[^"]*"/g,
    'src="/assets/narayanam/facilities/nirvana-gym.webp" sizes="100vw" srcset="/assets/narayanam/facilities/nirvana-gym.webp 1920w" alt="Nirvana Fitness Center"'
  );
  html = html.replace(/<h3 data-scroll-reveal="p" data-tab="p" class="l1">SPA &amp; Gym<\/h3>/g, '<h3 data-scroll-reveal="p" data-tab="p" class="l1">Nirvana Gym</h3>');
  html = html.replace(/<h4 data-scroll-reveal="p" data-tab="p" class="h5">Gymnasium, yoga, pilates,\s*hydrotherapy and massage room<\/h4>/g, '<h4 data-scroll-reveal="p" data-tab="p" class="h5">State-of-the-art gymnasium equipped with premium cardio and strength training equipment.</h4>');

  // Amenity 5: Landscaping -> Luxury Dining Experience
  html = html.replace(
    /src="\/assets\/6a151382fb101ce2ca9db288_era-residence-landscaping\.webp"[^>]*sizes="100vw"[^>]*srcset="[^"]*"/g,
    'src="/assets/narayanam/dining/restaurant-interior.jpg" sizes="100vw" srcset="/assets/narayanam/dining/restaurant-interior.jpg 1920w" alt="Luxury Dining"'
  );
  html = html.replace(/<h3 data-scroll-reveal="p" data-tab="p" class="l1">Landscaping<\/h3>/g, '<h3 data-scroll-reveal="p" data-tab="p" class="l1">Luxury Dining</h3>');
  html = html.replace(/<h4 data-scroll-reveal="p" data-tab="p" class="h5">Over 7,000 m2 of landscaped\s*green areas, designed by a prestigious landscape studio\.<\/h4>/g, '<h4 data-scroll-reveal="p" data-tab="p" class="h5">Elegantly curated ambiance offering personalized hospitality and unforgettable dining moments.</h4>');

  // Pre-footer CTA background
  html = html.replace(
    /src="https:\/\/cdn\.prod\.website-files\.com\/6a068da7ad91b057365bf967\/6a24918d32632ad41e5ee7c8_era-residence-ground-floor-2\.webp"\s+sizes="\([^"]*\)"\s+srcset="[^"]*"/g,
    'src="/assets/narayanam/facilities/hotel-front-view.jpg" sizes="(max-width: 1920px) 100vw, 1920px" srcset="/assets/narayanam/facilities/hotel-front-view.jpg 1920w" alt="Narayanam Hotel Gwalior"'
  );

  fs.writeFileSync(filePath, html, 'utf8');
});
console.log(`Updated all ${pageFiles.length} room pages with Narayanam Hotel amenities and imagery!`);

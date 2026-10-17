const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// ==========================================
// 1. TRANSFORM APARTMENTS.HTML
// ==========================================
function transformApartments() {
  const filePath = path.join(rootDir, 'apartments.html');
  let html = fs.readFileSync(filePath, 'utf-8');
  console.log('[apartments.html] Original length:', html.length);

  // Meta & Title
  html = html.replace(/<title>.*?<\/title>/, '<title>Luxury Rooms &amp; Suites — Narayanam Hotel Gwalior</title>');
  html = html.replace(
    /<meta content="Explore ground floor residences, duplexes and penthouses designed for contemporary Mediterranean living on Costa del Sol\." name="description">/,
    '<meta content="Explore our luxurious Royal Suites with Jacuzzi, Premium Suites, Executive Rooms, and Deluxe accommodations at Narayanam Hotel, Morar, Gwalior." name="description">'
  );
  html = html.replace(
    /<meta content="Apartments — ERA Residence Estepona" property="og:title">/,
    '<meta content="Luxury Rooms &amp; Suites — Narayanam Hotel Gwalior" property="og:title">'
  );
  html = html.replace(
    /<meta content="Explore ground floor residences, duplexes and penthouses designed for contemporary Mediterranean living on Costa del Sol\." property="og:description">/,
    '<meta content="Explore our luxurious Royal Suites with Jacuzzi, Premium Suites, Executive Rooms, and Deluxe accommodations at Narayanam Hotel, Morar, Gwalior." property="og:description">'
  );
  html = html.replace(
    /<meta content="Apartments — ERA Residence Estepona" name="twitter:title">/,
    '<meta content="Luxury Rooms &amp; Suites — Narayanam Hotel Gwalior" name="twitter:title">'
  );
  html = html.replace(
    /<meta content="Explore ground floor residences, duplexes and penthouses designed for contemporary Mediterranean living on Costa del Sol\." name="twitter:description">/,
    '<meta content="Explore our luxurious Royal Suites with Jacuzzi, Premium Suites, Executive Rooms, and Deluxe accommodations at Narayanam Hotel, Morar, Gwalior." name="twitter:description">'
  );

  // Favicons
  html = html.replace(/\/assets\/6a068e9190b0417295a747e4_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
  html = html.replace(/\/assets\/6a068e91bb279e3f7fc5b425_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
  html = html.replace(/\/assets\/6a068e918b1760d249c9955e_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
  html = html.replace(/\/assets\/6a068e91270853940feb77b8_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
  html = html.replace(/\/assets\/6a068e912ba75edec03d31d4_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');

  // Schema LD+JSON
  html = html.replace(/"@type": "ApartmentComplex"[\s\S]*?"numberOfAccommodationUnits": 25/m, 
`"@type": "Hotel",
    "name": "Narayanam Hotel Gwalior",
    "description": "Premier 3-star luxury hotel in Morar, Gwalior featuring Royal Suites with Jacuzzi, fine dining, and banqueting.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B-33, 34 River View Colony, Near Kalpi Bridge, Morar",
      "addressLocality": "Gwalior",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "474006",
      "addressCountry": "IN"
    },
    "telephone": "+916262621454",
    "priceRange": "₹3,350 - ₹12,000",
    "numberOfAccommodationUnits": 25`);

  // Preloader text
  html = html.replace(/<div data-part="h" class="c1 a-center".*?>Costa<\/div>/g, '<div data-part="h" class="c1 a-center">Gwalior</div>');
  html = html.replace(/<div data-part="h" class="h3 a-center".*?>Era<br>Residence<\/div>/g, '<div data-part="h" class="h3 a-center">Narayanam<br>Hotel</div>');
  html = html.replace(/<div data-part="a" class="a2 preloader_a a-center".*?>Estepona<\/div>/g, '<div data-part="a" class="a2 preloader_a a-center">Heritage &amp; Comfort</div>');
  html = html.replace(/<div data-part="h" class="c1 a-center".*?>del Sol<\/div>/g, '<div data-part="h" class="c1 a-center">Morar</div>');
  html = html.replace(/Era ResidenceA place to return to\./g, 'Narayanam Hotel Experience Royal Comfort & Luxury.');

  // Header Nav & Breadcrumbs
  html = html.replace(/<div hover="text" class="h6">Select <br>an Apartment<\/div>/g, '<div hover="text" class="h6">Rooms &amp; <br>Suites</div>');
  html = html.replace(/<div hover="text" class="l2">Select an Apartment<\/div>/g, '<div hover="text" class="l2">Rooms &amp; Suites</div>');
  html = html.replace(/<div hover="text" class="l2">Book a call<\/div>/g, '<div hover="text" class="l2">Book Stay</div>');

  // Main Page Title
  html = html.replace(
    /<h1 data-prevent-flicker="" data-scroll-reveal="h" class="h1 a-center mob_a-left">Apartments<\/h1>/,
    '<h1 data-prevent-flicker="" data-scroll-reveal="h" class="h1 a-center mob_a-left">Rooms &amp; Suites</h1>'
  );

  // Filters
  html = html.replace(
    /<div data-select="item" data-filter-group="type" data-filter-trigger="ground-floor-basement" hover-select-item="" class="filter_select_drop-down_list_item"><div hover="text" class="l1">Ground floor \+ basement<\/div><\/div>/,
    '<div data-select="item" data-filter-group="type" data-filter-trigger="ground-floor-basement" hover-select-item="" class="filter_select_drop-down_list_item"><div hover="text" class="l1">Royal Suite (with Jacuzzi)</div></div>'
  );
  html = html.replace(
    /<div data-select="item" data-filter-group="type" data-filter-trigger="ground-floor" hover-select-item="" class="filter_select_drop-down_list_item"><div hover="text" class="l1">Ground Floor<\/div><\/div>/,
    '<div data-select="item" data-filter-group="type" data-filter-trigger="ground-floor" hover-select-item="" class="filter_select_drop-down_list_item"><div hover="text" class="l1">Premium Suite</div></div>'
  );
  html = html.replace(
    /<div data-select="item" data-filter-group="type" data-filter-trigger="penthouse-duplex" hover-select-item="" class="filter_select_drop-down_list_item"><div hover="text" class="l1">Penthouse duplex<\/div><\/div>/,
    '<div data-select="item" data-filter-group="type" data-filter-trigger="penthouse-duplex" hover-select-item="" class="filter_select_drop-down_list_item"><div hover="text" class="l1">Executive Room</div></div>'
  );

  // Global replacements for names and branding
  html = html.replace(/data-type="ground-floor-basement" class="l2 a-center">Ground floor \+ basement/g, 'data-type="ground-floor-basement" class="l2 a-center">Royal Suite with Jacuzzi');
  html = html.replace(/data-type="ground-floor" class="l2 a-center">Ground Floor/g, 'data-type="ground-floor" class="l2 a-center">Premium Suite');
  html = html.replace(/data-type="penthouse-duplex" class="l2 a-center">Penthouse duplex/g, 'data-type="penthouse-duplex" class="l2 a-center">Executive Room');

  html = html.replace(/<span>Completion: <\/span><span>4Q 2026<\/span>/g, '<span>Best Rate: </span><span>Instant Booking</span>');
  html = html.replace(/<span>Block <\/span><span>B\d+<\/span>/g, '<span>Wing </span><span>Royal</span>');
  html = html.replace(/<span>\+ <\/span><span>\d+ M²<\/span><span>&nbsp;<\/span><span>Terrace<\/span>/g, '<span>Includes Breakfast &amp; Wi-Fi</span>');
  html = html.replace(/<span>\+ <\/span><span>\d+ M²<\/span><span>&nbsp;<\/span><span>Garden<\/span>/g, '<span>Complimentary Amenities</span>');
  html = html.replace(/<span>\+ <\/span><span>\d+ M²<\/span><span>&nbsp;<\/span><span>Solarium<\/span>/g, '<span>24/7 Room Service</span>');

  // Contact in footer
  html = html.replace(/\+34 \(655\) 408-648/g, '+91 6262621454');
  html = html.replace(/tel:\+34655408648/g, 'tel:+916262621454');
  html = html.replace(/Avenida Litoral, 29680 Estepona, Málaga, Spain/g, 'B-33, 34 River View Colony, Near Kalpi Bridge, Morar, Gwalior (M.P.)');
  html = html.replace(/https:\/\/maps\.app\.goo\.gl\/EzyfT2M6vR5aBdMu9/g, 'https://maps.google.com/?q=Narayanam+Hotel+Morar+Gwalior');
  html = html.replace(/Era Residence\./g, 'Narayanam Hotel.');

  // Modal links
  html = html.replace(/https:\/\/www\.linkedin\.com\/company\/eraresidenceestepona\/\?viewAsMember=true/g, 'https://www.linkedin.com/');
  html = html.replace(/https:\/\/www\.facebook\.com\/era\.residence\.estepona/g, 'https://www.facebook.com/narayanamhotel');
  html = html.replace(/https:\/\/www\.instagram\.com\/era\.residence\.estepona/g, 'https://www.instagram.com/narayanamhotel/');
  html = html.replace(/\/assets\/6a1576532e78ed7645599d9b_politica_privacidad_era_residence\.pdf/g, '#');
  html = html.replace(/\/assets\/6a1576732e78ed764559c153_terms_of_use_era_residence_20_1_\.pdf/g, '#');

  // Update card images to authentic Narayanam photos
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

  // Replace each apart-card image src & srcset
  let imgIndex = 0;
  html = html.replace(/<div class="apart-card_img_prim"><img src="[^"]*"[^>]*>/g, (match) => {
    const photo = roomPhotos[imgIndex % roomPhotos.length];
    imgIndex++;
    return `<div class="apart-card_img_prim"><img src="${photo}" loading="eager" alt="Narayanam Hotel Luxury Room" sizes="100vw" srcset="${photo} 1200w" class="img contain" style="object-fit: cover; width: 100%; height: 100%;"></div>`;
  });

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log('[apartments.html] Transformed successfully! New length:', html.length);
}

// ==========================================
// 2. TRANSFORM CONTACT.HTML
// ==========================================
function transformContact() {
  const filePath = path.join(rootDir, 'contact.html');
  let html = fs.readFileSync(filePath, 'utf-8');
  console.log('[contact.html] Original length:', html.length);

  // Meta & Title
  html = html.replace(/<title>.*?<\/title>/, '<title>Contact &amp; Reservations — Narayanam Hotel Gwalior</title>');
  html = html.replace(
    /<meta content="Request availability, pricing and additional information about ERA Residence in Estepona\." name="description">/,
    '<meta content="Contact Narayanam Hotel in Morar, Gwalior for room bookings, wedding banquets, dining reservations, and general inquiries." name="description">'
  );
  html = html.replace(
    /<meta content="Contact — ERA Residence" property="og:title">/,
    '<meta content="Contact &amp; Reservations — Narayanam Hotel Gwalior" property="og:title">'
  );
  html = html.replace(
    /<meta content="Request availability, pricing and additional information about ERA Residence in Estepona\." property="og:description">/,
    '<meta content="Contact Narayanam Hotel in Morar, Gwalior for room bookings, wedding banquets, dining reservations, and general inquiries." property="og:description">'
  );
  html = html.replace(
    /<meta content="Contact — ERA Residence" name="twitter:title">/,
    '<meta content="Contact &amp; Reservations — Narayanam Hotel Gwalior" name="twitter:title">'
  );
  html = html.replace(
    /<meta content="Request availability, pricing and additional information about ERA Residence in Estepona\." name="twitter:description">/,
    '<meta content="Contact Narayanam Hotel in Morar, Gwalior for room bookings, wedding banquets, dining reservations, and general inquiries." name="twitter:description">'
  );

  // Favicons
  html = html.replace(/\/assets\/6a068e9190b0417295a747e4_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
  html = html.replace(/\/assets\/6a068e91bb279e3f7fc5b425_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
  html = html.replace(/\/assets\/6a068e918b1760d249c9955e_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
  html = html.replace(/\/assets\/6a068e91270853940feb77b8_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
  html = html.replace(/\/assets\/6a068e912ba75edec03d31d4_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');

  // Schema LD+JSON
  html = html.replace(/"@type": "RealEstateAgent"[\s\S]*?"areaServed": \{[\s\S]*?\}/m,
`"@type": "Hotel",
    "name": "Narayanam Hotel",
    "email": "info@narayanamhotel.com",
    "telephone": "+916262621454",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B-33, 34 River View Colony, Near Kalpi Bridge, 7 No. Chouraha, Morar",
      "addressLocality": "Gwalior",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "474006",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 00:00-24:00",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+916262621454",
      "contactType": "reservations",
      "availableLanguage": ["en", "hi"]
    }`);

  // Preloader
  html = html.replace(/<div data-part="h" class="c1 a-center".*?>Costa<\/div>/g, '<div data-part="h" class="c1 a-center">Gwalior</div>');
  html = html.replace(/<div data-part="h" class="h3 a-center".*?>Era<br>Residence<\/div>/g, '<div data-part="h" class="h3 a-center">Narayanam<br>Hotel</div>');
  html = html.replace(/<div data-part="a" class="a2 preloader_a a-center".*?>Estepona<\/div>/g, '<div data-part="a" class="a2 preloader_a a-center">Heritage &amp; Comfort</div>');
  html = html.replace(/<div data-part="h" class="c1 a-center".*?>del Sol<\/div>/g, '<div data-part="h" class="c1 a-center">Morar</div>');

  // Header Nav
  html = html.replace(/<div hover="text" class="h6">Select <br>an Apartment<\/div>/g, '<div hover="text" class="h6">Rooms &amp; <br>Suites</div>');
  html = html.replace(/<div hover="text" class="l2">Book a call<\/div>/g, '<div hover="text" class="l2">Book Stay</div>');

  // Contact Details
  html = html.replace(/info@era-residence\.com/g, 'info@narayanamhotel.com');
  html = html.replace(/\+34 \(655\) 408-648/g, '+91 6262621454');
  html = html.replace(/tel:\+34655408648/g, 'tel:+916262621454');
  html = html.replace(/https:\/\/wa\.me\/34655408648/g, 'https://wa.me/916262621454');

  html = html.replace(
    /Avenida Litoral, 29680 Estepona, Málaga, Spain/g,
    'B-33, 34 River View Colony, Near Kalpi Bridge, Morar, Gwalior (M.P.)'
  );
  html = html.replace(
    /New Golden Mile, Estepona Costa del Sol, Spain/g,
    '7 No. Chouraha, Morar, Gwalior, Madhya Pradesh 474006'
  );

  html = html.replace(/https:\/\/maps\.app\.goo\.gl\/EzyfT2M6vR5aBdMu9/g, 'https://maps.google.com/?q=Narayanam+Hotel+Morar+Gwalior');
  html = html.replace(/https:\/\/maps\.app\.goo\.gl\/5FY2BUESnAmcybFe8/g, 'https://maps.google.com/?q=Narayanam+Hotel+Morar+Gwalior');

  // Pin details
  html = html.replace(/<strong>sales office<\/strong>/g, '<strong>Front Desk &amp; Concierge</strong>');
  html = html.replace(/Daily 09:00 – 21:00/g, 'Open 24 Hours / 7 Days');

  // Map image to Narayanam front/exterior
  html = html.replace(
    /\/assets\/6a258c1f74c3435f82f4f129_map_sales-office\.svg/g,
    '/assets/narayanam/facilities/hotel-front-view.jpg'
  );

  // Social Links
  html = html.replace(/https:\/\/www\.linkedin\.com\/company\/eraresidenceestepona\/\?viewAsMember=true/g, 'https://www.linkedin.com/');
  html = html.replace(/https:\/\/www\.facebook\.com\/era\.residence\.estepona/g, 'https://www.facebook.com/narayanamhotel');
  html = html.replace(/https:\/\/www\.instagram\.com\/era\.residence\.estepona/g, 'https://www.instagram.com/narayanamhotel/');
  html = html.replace(/Era Residence\./g, 'Narayanam Hotel.');

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log('[contact.html] Transformed successfully! New length:', html.length);
}

// ==========================================
// 3. TRANSFORM APARTMENTS_PAGES (*.html)
// ==========================================
function transformApartmentPages() {
  const dirPath = path.join(rootDir, 'apartments_pages');
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

  const roomConfig = {
    // 011-034: Royal Suites with Jacuzzi
    royal: ['011', '012', '031', '032', '033', '034'],
    // 111-124: Premium Suites
    premium: ['111', '112', '113', '114', '121', '122', '123', '124'],
    // 131-213: Executive Rooms
    executive: ['131', '132', '133', '134', '211', '212', '213'],
    // 221-224: Deluxe Rooms
    deluxe: ['221', '222', '223', '224']
  };

  files.forEach(file => {
    const slug = file.replace('.html', '');
    const fullPath = path.join(dirPath, file);
    let html = fs.readFileSync(fullPath, 'utf-8');

    let roomType = 'Executive Room';
    let roomCategory = 'Executive Room';
    let startingRate = '₹3,850 / night';
    let bedType = 'Queen / Twin Bed';
    let mainImg = '/assets/narayanam/rooms/executive-room.jpg';
    let desc = 'Comfortable modern room with work desk, high-speed Wi-Fi, LED television, ensuite bathroom and 24/7 room service.';

    if (roomConfig.royal.includes(slug)) {
      roomType = 'Royal Suite with Jacuzzi';
      roomCategory = 'Royal Suite';
      startingRate = '₹7,500 / night';
      bedType = 'Master King Bed';
      mainImg = '/assets/narayanam/rooms/royal-suite.jpg';
      desc = 'Opulent presidential suite featuring a private in-room Jacuzzi, master king bed, plush sitting lounge, and dedicated butler service.';
    } else if (roomConfig.premium.includes(slug)) {
      roomType = 'Premium Suite';
      roomCategory = 'Premium Suite';
      startingRate = '₹5,200 / night';
      bedType = 'King Bed';
      mainImg = '/assets/narayanam/rooms/premium-suite.jpeg';
      desc = 'Elegantly appointed suite with dedicated living area, deluxe king bed, executive work desk, and luxury bathroom amenities.';
    } else if (roomConfig.deluxe.includes(slug)) {
      roomType = 'Deluxe Room';
      roomCategory = 'Deluxe Room';
      startingRate = '₹3,350 / night';
      bedType = 'Double Bed';
      mainImg = '/assets/narayanam/rooms/room-6.jpg';
      desc = 'Charming, well-appointed guest room with warm ambient lighting, tea/coffee maker, premium linens, and immaculate comforts.';
    }

    // Meta & Title
    html = html.replace(/<title>.*?<\/title>/, `<title>${roomType} №${slug} — Narayanam Hotel Gwalior</title>`);
    html = html.replace(/<meta content="[^"]*" name="description"\/>/, `<meta content="${desc}" name="description"/>`);
    html = html.replace(/<meta content="[^"]*" property="og:title"\/>/, `<meta content="${roomType} №${slug} — Narayanam Hotel Gwalior" property="og:title"/>`);
    html = html.replace(/<meta content="[^"]*" property="og:description"\/>/, `<meta content="${desc}" property="og:description"/>`);
    html = html.replace(/<meta content="[^"]*" name="twitter:title"\/>/, `<meta content="${roomType} №${slug} — Narayanam Hotel Gwalior" name="twitter:title"/>`);
    html = html.replace(/<meta content="[^"]*" name="twitter:description"\/>/, `<meta content="${desc}" name="twitter:description"/>`);

    // Favicons
    html = html.replace(/\/assets\/6a068e9190b0417295a747e4_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
    html = html.replace(/\/assets\/6a068e91bb279e3f7fc5b425_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
    html = html.replace(/\/assets\/6a068e918b1760d249c9955e_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
    html = html.replace(/\/assets\/6a068e91270853940feb77b8_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');
    html = html.replace(/\/assets\/6a068e912ba75edec03d31d4_fav_512x512\.png/g, '/assets/narayanam/logo/favicon.png');

    // Schema Product
    html = html.replace(/"name": "Apartment №\d+"/, `"name": "${roomType} №${slug}"`);
    html = html.replace(/"name": "ERA Residence Estepona"/, `"name": "Narayanam Hotel Gwalior"`);

    // Preloader
    html = html.replace(/<div data-part="h" class="c1 a-center".*?>Costa<\/div>/g, '<div data-part="h" class="c1 a-center">Gwalior</div>');
    html = html.replace(/<div data-part="h" class="h3 a-center".*?>Era<br>Residence<\/div>/g, '<div data-part="h" class="h3 a-center">Narayanam<br>Hotel</div>');
    html = html.replace(/<div data-part="a" class="a2 preloader_a a-center".*?>Estepona<\/div>/g, '<div data-part="a" class="a2 preloader_a a-center">Heritage &amp; Comfort</div>');
    html = html.replace(/<div data-part="h" class="c1 a-center".*?>del Sol<\/div>/g, '<div data-part="h" class="c1 a-center">Morar</div>');

    // Header Nav
    html = html.replace(/<div hover="text" class="h6">Select <br>an Apartment<\/div>/g, '<div hover="text" class="h6">Rooms &amp; <br>Suites</div>');
    html = html.replace(/<div hover="text" class="l2">Book a call<\/div>/g, '<div hover="text" class="l2">Book Stay</div>');

    // Main Room Header
    html = html.replace(/<h2 data-type="[^"]*" class="l2">[^<]*<\/h2>/, `<h2 data-type="${roomCategory.toLowerCase().replace(/\s+/g, '-')}" class="l2">${roomType}</h2>`);
    html = html.replace(/<h3 id="" class="l2 reg"><span>Completion: <\/span><span>4Q 2026<\/span><\/h3>/, `<h3 id="" class="l2 reg"><span>Starting: </span><span>${startingRate}</span></h3>`);

    // Main Layout Image -> Authentic Room Photo
    html = html.replace(/<div class="lot-s_media_layout_img-prim[^"]*"><img src="[^"]*"[^>]*>/,
      `<div class="lot-s_media_layout_img-prim theme_on-color"><img src="${mainImg}" loading="eager" alt="${roomType}" sizes="100vw" srcset="${mainImg} 1200w" class="img contain" style="object-fit: cover; width: 100%; height: 100%;">`
    );

    // Media Gallery thumbnails
    html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/6a0853d5dab31b18f0677081\/6a1e3e018e13335cdfe5bffc_era-residence-bathroom\.webp/g, '/assets/narayanam/rooms/room-7.jpg');
    html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/6a0853d5dab31b18f0677081\/6a1e3e0735b657ba4b1313cc_era-residence-ground-floor\.webp/g, '/assets/narayanam/rooms/room-8.jpg');
    html = html.replace(/https:\/\/cdn\.prod\.website-files\.com\/6a0853d5dab31b18f0677081\/6a1e3e0cf0513cfd006653b6_era-residence-kitchen\.webp/g, '/assets/narayanam/dining/naivedyam-restaurant.jpg');

    // Specifications
    html = html.replace(/<div class="data-item"><h4 class="l1 reg">Bedrooms<\/h4><div class="u-8"><\/div><h5 class="h5">\d+<\/h5><\/div>/,
      `<div class="data-item"><h4 class="l1 reg">Bed Type</h4><div class="u-8"></div><h5 class="h5">${bedType}</h5></div>`
    );
    html = html.replace(/<div class="data-item"><h4 class="l1 reg">Interior area<\/h4><div class="u-8"><\/div><h5 class="h5">[^<]*<\/h5><\/div>/,
      `<div class="data-item"><h4 class="l1 reg">Rate</h4><div class="u-8"></div><h5 class="h5">${startingRate}</h5></div>`
    );
    html = html.replace(/<div class="data-item"><h4 class="l1 reg">Terrace<\/h4><div class="u-8"><\/div><h5 class="h5">[^<]*<\/h5><\/div>/,
      `<div class="data-item"><h4 class="l1 reg">Dining</h4><div class="u-8"></div><h5 class="h5">Pure Veg</h5></div>`
    );
    html = html.replace(/<div class="data-item"><h4 class="l1 reg">Garden<\/h4><div class="u-8"><\/div><h5 class="h5">[^<]*<\/h5><\/div>/,
      `<div class="data-item"><h4 class="l1 reg">Wi-Fi</h4><div class="u-8"></div><h5 class="h5">Complimentary</h5></div>`
    );

    // Description text
    html = html.replace(/<p data-tab="p" class="p1">Three bedrooms, open-plan living, and a large terrace that connects directly to the communal garden and pool area\.<\/p>/,
      `<p data-tab="p" class="p1">${desc}</p>`
    );
    html = html.replace(/<p data-tab="p" class="p1">Two bedrooms, open-plan living, and a large terrace that connects directly to the communal garden and pool area\.<\/p>/,
      `<p data-tab="p" class="p1">${desc}</p>`
    );

    // Benefits tags
    html = html.replace(/<h4 class="p2">Pool &amp; gym<\/h4>/, '<h4 class="p2">Nirvana Gym</h4>');
    html = html.replace(/<h4 class="p2">Storage<\/h4>/, '<h4 class="p2">In-Room Jacuzzi</h4>');
    html = html.replace(/<h4 class="p2">Energy B<\/h4>/, '<h4 class="p2">Naivedyam Pure Veg</h4>');
    html = html.replace(/<h4 class="p2">Parking<\/h4>/, '<h4 class="p2">Free Valet Parking</h4>');
    html = html.replace(/<h4 class="p2">Aerothermal<\/h4>/, '<h4 class="p2">24/7 Room Service</h4>');
    html = html.replace(/<h4 class="p2">Stone floors<\/h4>/, '<h4 class="p2">High-Speed Wi-Fi</h4>');
    html = html.replace(/<h4 class="p2">Villeroy &amp; Boch<\/h4>/, '<h4 class="p2">Doctor on Call</h4>');
    html = html.replace(/<h4 class="p2">Underfloor heating<\/h4>/, '<h4 class="p2">Climate Control</h4>');

    // Buttons
    html = html.replace(/<div hover="text" class="l1">Submit a request<\/div>/g, '<div hover="text" class="l1">Book This Room</div>');
    html = html.replace(/<div hover="text" class="l1">pdf<\/div>/g, '<div hover="text" class="l1">Brochure</div>');

    // Footer & Contacts
    html = html.replace(/\+34 \(655\) 408-648/g, '+91 6262621454');
    html = html.replace(/tel:\+34655408648/g, 'tel:+916262621454');
    html = html.replace(/Avenida Litoral, 29680 Estepona, Málaga, Spain/g, 'B-33, 34 River View Colony, Near Kalpi Bridge, Morar, Gwalior (M.P.)');
    html = html.replace(/https:\/\/maps\.app\.goo\.gl\/EzyfT2M6vR5aBdMu9/g, 'https://maps.google.com/?q=Narayanam+Hotel+Morar+Gwalior');
    html = html.replace(/Era Residence\./g, 'Narayanam Hotel.');

    // Social & Modal links
    html = html.replace(/https:\/\/www\.linkedin\.com\/company\/eraresidenceestepona\/\?viewAsMember=true/g, 'https://www.linkedin.com/');
    html = html.replace(/https:\/\/www\.facebook\.com\/era\.residence\.estepona/g, 'https://www.facebook.com/narayanamhotel');
    html = html.replace(/https:\/\/www\.instagram\.com\/era\.residence\.estepona/g, 'https://www.instagram.com/narayanamhotel/');
    html = html.replace(/\/assets\/6a1576532e78ed7645599d9b_politica_privacidad_era_residence\.pdf/g, '#');
    html = html.replace(/\/assets\/6a1576732e78ed764559c153_terms_of_use_era_residence_20_1_\.pdf/g, '#');

    fs.writeFileSync(fullPath, html, 'utf-8');
  });

  console.log(`[apartments_pages] Transformed all ${files.length} room detail pages successfully!`);
}

// Execute all transformations
console.log('--- Starting Complete Website Transformation ---');
transformApartments();
transformContact();
transformApartmentPages();
console.log('--- Complete Website Transformation Finished! ---');

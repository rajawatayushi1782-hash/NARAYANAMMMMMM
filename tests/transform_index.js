const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

console.log('Original index.html size:', html.length);

const replacements = [
  // 1. Title & Meta
  [
    '<title>ERA Residence — Contemporary Mediterranean Residences in Estepona</title>',
    '<title>Narayanam Hotel — Best 3-Star Luxury Hotel in Gwalior | Near Kalpi Bridge</title>'
  ],
  [
    '<meta content="Boutique residences on the New Golden Mile combining contemporary architecture, natural materials and resort-style living near Marbella and Estepona." name="description">',
    '<meta content="Experience royal comfort, modern amenities, pure vegetarian fine dining at Naivedyam, and bespoke hospitality at Narayanam Hotel, near Kalpi Bridge, Morar, Gwalior." name="description">'
  ],
  [
    '<meta content="ERA Residence — Contemporary Mediterranean Residences in Estepona" property="og:title">',
    '<meta content="Narayanam Hotel — Best 3-Star Luxury Hotel in Gwalior" property="og:title">'
  ],
  [
    '<meta content="Boutique residences on the New Golden Mile combining contemporary architecture, natural materials and resort-style living near Marbella and Estepona." property="og:description">',
    '<meta content="Experience royal comfort, modern amenities, pure vegetarian fine dining at Naivedyam, and bespoke hospitality at Narayanam Hotel, near Kalpi Bridge, Morar, Gwalior." property="og:description">'
  ],
  [
    '<meta content="https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/6a39f0aba46d0d055c0476ff_open-graph.webp" property="og:image">',
    '<meta content="/assets/narayanam/hero/banner-1.webp" property="og:image">'
  ],
  [
    '<meta content="ERA Residence — Contemporary Mediterranean Residences in Estepona" name="twitter:title">',
    '<meta content="Narayanam Hotel — Best 3-Star Luxury Hotel in Gwalior" name="twitter:title">'
  ],
  [
    '<meta content="Boutique residences on the New Golden Mile combining contemporary architecture, natural materials and resort-style living near Marbella and Estepona." name="twitter:description">',
    '<meta content="Experience royal comfort, modern amenities, pure vegetarian fine dining at Naivedyam, and bespoke hospitality at Narayanam Hotel, near Kalpi Bridge, Morar, Gwalior." name="twitter:description">'
  ],
  [
    '<meta content="https://cdn.prod.website-files.com/6a068da7ad91b057365bf967/6a39f0aba46d0d055c0476ff_open-graph.webp" name="twitter:image">',
    '<meta content="/assets/narayanam/hero/banner-1.webp" name="twitter:image">'
  ],

  // Favicons
  [
    '/assets/6a068e9190b0417295a747e4_fav_512x512.png',
    '/assets/narayanam/logo/favicon.png'
  ],
  [
    '/assets/6a068e91bb279e3f7fc5b425_fav_512x512.png',
    '/assets/narayanam/logo/favicon.png'
  ],
  [
    '/assets/6a068e918b1760d249c9955e_fav_512x512.png',
    '/assets/narayanam/logo/favicon.png'
  ],
  [
    '/assets/6a068e91270853940feb77b8_fav_512x512.png',
    '/assets/narayanam/logo/favicon.png'
  ],
  [
    '/assets/6a068e912ba75edec03d31d4_fav_512x512.png',
    '/assets/narayanam/logo/favicon.png'
  ],

  // Schema LD+JSON Hotel Schema
  [
    `"name": "ERA Residence — Contemporary Mediterranean Residences in Estepona",
  "description": "Boutique residences on the New Golden Mile combining contemporary architecture, natural materials and resort-style living near Marbella and Estepona.",
  "url": "/",
  "inLanguage": "en",
  "mainEntity": {
    "@type": "ApartmentComplex",
    "name": "ERA Residence",
    "description": "A boutique gated community of 25 residences on Costa del Sol, designed around privacy, wellbeing and timeless Mediterranean living.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenida Litoral",
      "addressLocality": "Estepona",
      "addressRegion": "Málaga",
      "postalCode": "29680",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "Place",
      "name": "New Golden Mile, Estepona"
    },
    "numberOfAccommodationUnits": 25,
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Saltwater Swimming Pool",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Children's Pool",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Sauna",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Jacuzzi",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Wellness Shower",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Spa & Gym",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Gated Community",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Parking with EV Charging Pre-installation",
        "value": true
      }
    ],
    "containsPlace": [
      {
        "@type": "Accommodation",
        "name": "Ground Floor + Basement",
        "numberOfRooms": 3,
        "floorSize": {
          "@type": "QuantitativeValue",
          "minValue": 178,
          "maxValue": 202,
          "unitCode": "MTK"
        }
      },
      {
        "@type": "Accommodation",
        "name": "Ground Floor",
        "numberOfRooms": 2,
        "floorSize": {
          "@type": "QuantitativeValue",
          "minValue": 97,
          "maxValue": 104,
          "unitCode": "MTK"
        }
      },
      {
        "@type": "Accommodation",
        "name": "Penthouse Duplex",
        "numberOfRooms": {
          "@type": "QuantitativeValue",
          "minValue": 2,
          "maxValue": 3
        },
        "floorSize": {
          "@type": "QuantitativeValue",
          "minValue": 124,
          "maxValue": 243,
          "unitCode": "MTK"
        }
      }
    ],
    "telephone": "+34655408648",
    "image": [
      "/assets/6a25da81dce540a251389928_era-residence_gated-community_day.webp",
      "/assets/6a150affaf1d8cc969d57dd0_img_cam_02.webp",
      "/assets/6a150bbc2a39862be04f2cd5_era-residence-terrace.webp",
      "/assets/6a0f8c07861fe831459ff0d9_img_cam_05_alpha.webp"
    ]
  }`,
    `"name": "Narayanam Hotel — Best 3-Star Luxury Hotel in Gwalior",
  "description": "Experience royal comfort, modern amenities, pure vegetarian fine dining at Naivedyam, and bespoke hospitality at Narayanam Hotel, near Kalpi Bridge, Morar, Gwalior.",
  "url": "/",
  "inLanguage": "en",
  "mainEntity": {
    "@type": "Hotel",
    "name": "Narayanam Hotel",
    "description": "Premier 3-star luxury hotel in Morar, Gwalior featuring opulent suites with Jacuzzi, 24/7 dining, coffee shop, and banquet facilities.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B-33, 34 River View Colony, Near Kalpi Bridge, 7 No. Chouraha, Morar",
      "addressLocality": "Gwalior",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "474006",
      "addressCountry": "IN"
    },
    "telephone": "+916262621454",
    "email": "info@narayanamhotel.com",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "3"
    },
    "priceRange": "₹3,350 - ₹12,000",
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Naivedyam Pure Veg Restaurant", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Nishabd Coffee Shop", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Nirvana Fitness Gym", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Navrang & Navras Banquet Halls", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Royal Suite with Jacuzzi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Valet Parking & High Speed Wi-Fi", "value": true }
    ],
    "image": [
      "/assets/narayanam/hero/banner-1.webp",
      "/assets/narayanam/rooms/royal-suite.jpg",
      "/assets/narayanam/dining/naivedyam-restaurant.jpg",
      "/assets/narayanam/facilities/hotel-front-view.jpg"
    ]
  }`
  ],

  // Preloader
  [
    `<div class="preloader_title-l"><div data-part="h" class="c1 a-center">Costa</div></div><div class="preloader_logo"><div data-part="h" class="h3 a-center">Era<br>Residence</div><div class="preloader_logo_a"><div data-part="a" class="a2 preloader_a a-center">Estepona</div></div></div><div class="preloader_title-r"><div data-part="h" class="c1 a-center">del Sol</div></div>`,
    `<div class="preloader_title-l"><div data-part="h" class="c1 a-center">Gwalior</div></div><div class="preloader_logo"><div data-part="h" class="h3 a-center">Narayanam<br>Hotel</div><div class="preloader_logo_a"><div data-part="a" class="a2 preloader_a a-center">Heritage &amp; Comfort</div></div></div><div class="preloader_title-r"><div data-part="h" class="c1 a-center">Morar</div></div>`
  ],
  [
    `<p data-part="p" class="l1 a-center">Era Residence<br>A place to return to.</p>`,
    `<p data-part="p" class="l1 a-center">Narayanam Hotel<br>Experience Royal Comfort &amp; Luxury.</p>`
  ],

  // Header Nav Links
  [
    `<div hover="text" class="h6">Select <br>an Apartment</div>`,
    `<div hover="text" class="h6">Rooms &amp; <br>Suites</div>`
  ],
  [
    `<div hover="text" class="h6">Select <br>an Apartment</div>`,
    `<div hover="text" class="h6">Rooms &amp; <br>Suites</div>`
  ],
  [
    `<div hover="text" class="l2">Book a call</div>`,
    `<div hover="text" class="l2">Book Stay</div>`
  ],
  [
    `<div hover="text" class="l2">Book a call</div>`,
    `<div hover="text" class="l2">Book Stay</div>`
  ],

  // Hero section
  [
    `<h1 data-prevent-flicker="" data-scroll-reveal="h" class="h1 a-center">Era <br>Residence</h1><div class="hero-s_logo_a"><h2 data-prevent-flicker="" data-scroll-reveal="a" class="a2">Estepona</h2></div>`,
    `<h1 data-prevent-flicker="" data-scroll-reveal="h" class="h1 a-center">Narayanam <br>Hotel</h1><div class="hero-s_logo_a"><h2 data-prevent-flicker="" data-scroll-reveal="a" class="a2">Gwalior</h2></div>`
  ],
  [
    `<span data-scroll-reveal="h" data-prevent-flicker="" class="a-left"><div class="span">A place </div></span><div data-prevent-flicker="" data-scroll-reveal="ctn" class="hero-s_tabs"><a hover-tab="" aria-label="by day" hover-nav-item-l2="" data-tab-trigger="day" href="#" class="nav-item w-inline-block"><div class="nav-item_label"><div hover="text" class="nav-item_label_text"><div class="l2">by day</div></div><div hover="text" class="nav-item_label_text is-2"><div class="l2">by day</div></div></div></a><div class="hero-s_tabs_divider"></div><a hover-tab="" aria-label="by night" hover-nav-item-l2="" data-tab-trigger="night" href="#" class="nav-item w-inline-block"><div class="nav-item_label"><div hover="text" class="nav-item_label_text"><div class="l2">by night</div></div><div hover="text" class="nav-item_label_text is-2"><div class="l2">by night</div></div></div></a></div><span data-scroll-reveal="h" data-prevent-flicker="" class="a-right"><div class="span">to return to</div></span>`,
    `<span data-scroll-reveal="h" data-prevent-flicker="" class="a-left"><div class="span">A stay </div></span><div data-prevent-flicker="" data-scroll-reveal="ctn" class="hero-s_tabs"><a hover-tab="" aria-label="by day" hover-nav-item-l2="" data-tab-trigger="day" href="#" class="nav-item w-inline-block"><div class="nav-item_label"><div hover="text" class="nav-item_label_text"><div class="l2">by day</div></div><div hover="text" class="nav-item_label_text is-2"><div class="l2">by day</div></div></div></a><div class="hero-s_tabs_divider"></div><a hover-tab="" aria-label="by night" hover-nav-item-l2="" data-tab-trigger="night" href="#" class="nav-item w-inline-block"><div class="nav-item_label"><div hover="text" class="nav-item_label_text"><div class="l2">by night</div></div><div hover="text" class="nav-item_label_text is-2"><div class="l2">by night</div></div></div></a></div><span data-scroll-reveal="h" data-prevent-flicker="" class="a-right"><div class="span">to remember</div></span>`
  ],

  // Hero Day Image
  [
    `/assets/6a25da81dce540a251389928_era-residence_gated-community_day.webp`,
    `/assets/narayanam/hero/banner-1.webp`
  ],
  [
    `srcset="/assets/6a25da81dce540a251389928_era-residence_gated-community_day-p-500.webp 500w, /assets/6a25da81dce540a251389928_era-residence_gated-community_day-p-800.webp 800w, /assets/6a25da81dce540a251389928_era-residence_gated-community_day-p-1080.webp 1080w, /assets/6a25da81dce540a251389928_era-residence_gated-community_day-p-1600.webp 1600w, /assets/6a25da81dce540a251389928_era-residence_gated-community_day.webp 1920w"`,
    `srcset="/assets/narayanam/hero/banner-1.webp 1920w"`
  ],

  // Hero Night Image
  [
    `/assets/6a25da802c253b9e5e3d44f5_era-residence_gated-community_night.webp`,
    `/assets/narayanam/hero/hero-night.jpg`
  ],
  [
    `srcset="/assets/file_mlb77 500w, /assets/file_71p59e 800w, /assets/file_vmhizb 1080w, /assets/file_eagw2 1600w, /assets/6a25da802c253b9e5e3d44f5_era-residence_gated-community_night.webp 1920w"`,
    `srcset="/assets/narayanam/hero/hero-night.jpg 1920w"`
  ],

  // Hero Button Label
  [
    `<div hover="text" class="l1">View available apartments</div>`,
    `<div hover="text" class="l1">View Luxury Rooms</div>`
  ],
  [
    `<div hover="text" class="l1">View available apartments</div>`,
    `<div hover="text" class="l1">View Luxury Rooms</div>`
  ],

  // Benefits Intro Section
  [
    `<div class="info-s_logo_l"><div data-scroll-reveal="p" class="l1 a-center">Costa</div></div><div data-scroll-reveal="ctn" class="logo_symbol ico-48">`,
    `<div class="info-s_logo_l"><div data-scroll-reveal="p" class="l1 a-center">Royal</div></div><div data-scroll-reveal="ctn" class="logo_symbol ico-48">`
  ],
  [
    `<div class="info-s_logo_r"><div data-scroll-reveal="p" class="l1 a-center">del Sol</div></div>`,
    `<div class="info-s_logo_r"><div data-scroll-reveal="p" class="l1 a-center">Gwalior</div></div>`
  ],
  [
    `<p data-scroll-reveal="p" class="l1 a-center">A place to live — to return year after year</p>`,
    `<p data-scroll-reveal="p" class="l1 a-center">A stay of elegance — comfort to return year after year</p>`
  ],
  [
    `<textPath href="#circle-desk" startOffset="25%">Three reasons to choose Era</textPath>`,
    `<textPath href="#circle-desk" startOffset="25%">Three reasons to choose Narayanam</textPath>`
  ],
  [
    `<textPath href="#circle-mob" startOffset="25%">Three reasons to choose Era</textPath>`,
    `<textPath href="#circle-mob" startOffset="25%">Three reasons to choose Narayanam</textPath>`
  ],

  // Slide 1: Prime Location
  [
    `<h3 data-scroll-reveal="h" data-slider="h" class="h1 a-center b-desk">Real-Life Location</h3><div data-scroll-reveal="h" data-slider="h" class="h2 a-center b-mob">Real-Life Location</div>`,
    `<h3 data-scroll-reveal="h" data-slider="h" class="h1 a-center b-desk">Central Location</h3><div data-scroll-reveal="h" data-slider="h" class="h2 a-center b-mob">Central Location</div>`
  ],
  [
    `<img src="/assets/6a150affaf1d8cc969d57dd0_img_cam_02.webp" loading="eager" alt="" sizes="100vw" srcset="/assets/6a150affaf1d8cc969d57dd0_img_cam_02-p-500.webp 500w, /assets/6a150affaf1d8cc969d57dd0_img_cam_02-p-800.webp 800w, /assets/6a150affaf1d8cc969d57dd0_img_cam_02-p-1080.webp 1080w, /assets/6a150affaf1d8cc969d57dd0_img_cam_02-p-1600.webp 1600w, /assets/6a150affaf1d8cc969d57dd0_img_cam_02.webp 1920w" class="img">`,
    `<img src="/assets/narayanam/facilities/hotel-exterior-1.webp" loading="eager" alt="Narayanam Hotel Gwalior" sizes="100vw" srcset="/assets/narayanam/facilities/hotel-exterior-1.webp 1920w" class="img">`
  ],
  [
    `<p data-scroll-reveal="p" data-slider="p" class="p1 a-center">Nestled between pristine beaches, world-class golf courses and exclusive wellness clubs, Era Residence offers a rare balance of seclusion and seamless access to the finest Mediterranean lifestyle.</p>`,
    `<p data-scroll-reveal="p" data-slider="p" class="p1 a-center">Nestled in Morar near Kalpi Bridge, Narayanam Hotel offers unmatched convenience — just minutes from Gwalior Railway Station, the legendary Gwalior Fort, and vibrant commercial centers.</p>`
  ],
  [
    `<p data-scroll-reveal="p" data-slider="p" class="l1 a-center">Designed as a community, not a complex</p>`,
    `<p data-scroll-reveal="p" data-slider="p" class="l1 a-center">At the heart of heritage Gwalior</p>`
  ],

  // Slide 2: Royal Suites
  [
    `<h3 data-scroll-reveal="h" data-slider="h" class="h1 a-center b-desk">Built to stay</h3><div data-scroll-reveal="h" data-slider="h" class="h2 a-center b-mob">Built to stay</div>`,
    `<h3 data-scroll-reveal="h" data-slider="h" class="h1 a-center b-desk">Royal Suites</h3><div data-scroll-reveal="h" data-slider="h" class="h2 a-center b-mob">Royal Suites</div>`
  ],
  [
    `<img src="/assets/6a150bbc2a39862be04f2cd5_era-residence-terrace.webp" loading="eager" alt="" sizes="100vw" srcset="/assets/6a150bbc2a39862be04f2cd5_era-residence-terrace-p-500.webp 500w, /assets/6a150bbc2a39862be04f2cd5_era-residence-terrace-p-800.webp 800w, /assets/6a150bbc2a39862be04f2cd5_era-residence-terrace-p-1080.webp 1080w, /assets/6a150bbc2a39862be04f2cd5_era-residence-terrace-p-1600.webp 1600w, /assets/6a150bbc2a39862be04f2cd5_era-residence-terrace.webp 1920w" class="img">`,
    `<img src="/assets/narayanam/rooms/royal-suite.jpg" loading="eager" alt="Narayanam Hotel Royal Suite" sizes="100vw" srcset="/assets/narayanam/rooms/royal-suite.jpg 1920w" class="img">`
  ],
  [
    `<p data-scroll-reveal="p" data-slider="p" class="p1 a-center">Drawing on the spirit of Marbella's golden age, the design blends modern architecture with natural materials, lush landscaping and thoughtfully crafted spaces.</p>`,
    `<p data-scroll-reveal="p" data-slider="p" class="p1 a-center">From our premier Royal Suite with in-room Jacuzzi to beautifully styled Premium and Executive rooms, each space is crafted for supreme rest, privacy, and serene relaxation.</p>`
  ],
  [
    `<p data-scroll-reveal="p" data-slider="p" class="l1 a-center">Designed as a community, not a complex</p>`,
    `<p data-scroll-reveal="p" data-slider="p" class="l1 a-center">Designed for luxury and true comfort</p>`
  ],

  // Slide 3: Dining & Banqueting
  [
    `<h3 data-scroll-reveal="h" data-slider="h" class="h1 a-center b-desk">Boutique concept</h3><div data-scroll-reveal="h" data-slider="h" class="h2 a-center b-mob">Boutique concept</div>`,
    `<h3 data-scroll-reveal="h" data-slider="h" class="h1 a-center b-desk">Pure Dining</h3><div data-scroll-reveal="h" data-slider="h" class="h2 a-center b-mob">Pure Dining</div>`
  ],
  [
    `<img src="/assets/6a150cc2f810e37eec2ea963_era-residence-garden.webp" loading="eager" alt="" sizes="100vw" srcset="/assets/6a150cc2f810e37eec2ea963_era-residence-garden-p-500.png 500w, /assets/6a150cc2f810e37eec2ea963_era-residence-garden-p-800.png 800w, /assets/6a150cc2f810e37eec2ea963_era-residence-garden.webp 1920w" class="img">`,
    `<img src="/assets/narayanam/dining/naivedyam-restaurant.jpg" loading="eager" alt="Naivedyam Restaurant Narayanam Hotel" sizes="100vw" srcset="/assets/narayanam/dining/naivedyam-restaurant.jpg 1920w" class="img">`
  ],
  [
    `<p data-scroll-reveal="p" data-slider="p" class="p1 a-center">A boutique gated community of 25 residences on Costa del Sol, designed around privacy, wellbeing and timeless Mediterranean living.</p>`,
    `<p data-scroll-reveal="p" data-slider="p" class="p1 a-center">Delight in pure vegetarian gourmet dining at Naivedyam, fresh specialty coffees at 24/7 Nishabd Café, and memorable celebrations in grand Navrang &amp; Navras banquets.</p>`
  ],
  [
    `<p data-scroll-reveal="p" data-slider="p" class="l1 a-center">Designed as a community, not a complex</p>`,
    `<p data-scroll-reveal="p" data-slider="p" class="l1 a-center">Hospitality that touches the soul</p>`
  ],

  // Quote Section
  [
    `<h4 data-scroll-reveal="p" data-tab="p" class="h5">Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard</h4>`,
    `<h4 data-scroll-reveal="p" data-tab="p" class="h5">From opulent suites with private jacuzzis to exquisite pure vegetarian dining at Naivedyam, Narayanam Hotel offers an oasis of hospitality and tranquility in the heart of Gwalior</h4>`
  ],
  [
    `<div class="quote-s_author"><div data-scroll-reveal="p" class="l1">Architecture Team</div><div data-scroll-reveal="p" class="l1 reg">Era Residence</div></div>`,
    `<div class="quote-s_author"><div data-scroll-reveal="p" class="l1">Hospitality Team</div><div data-scroll-reveal="p" class="l1 reg">Narayanam Hotel Gwalior</div></div>`
  ],
  [
    `/assets/6a0f8c07861fe831459ff0d9_img_cam_05_alpha.webp`,
    `/assets/narayanam/rooms/premium-suite.jpeg`
  ],
  [
    `srcset="/assets/6a0f8c07861fe831459ff0d9_img_cam_05_alpha-p-500.png 500w, /assets/6a0f8c07861fe831459ff0d9_img_cam_05_alpha-p-800.png 800w, /assets/6a0f8c07861fe831459ff0d9_img_cam_05_alpha-p-1080.png 1080w, /assets/6a0f8c07861fe831459ff0d9_img_cam_05_alpha.webp 1920w"`,
    `srcset="/assets/narayanam/rooms/premium-suite.jpeg 1920w"`
  ],

  // Concept Section
  [
    `<h3 data-part="p" class="h4 a-center">ERA Residences is a boutique gated community of only 25 residences, designed around privacy, wellbeing and timeless Mediterranean living</h3>`,
    `<h3 data-part="p" class="h4 a-center">Narayanam Hotel is Gwalior’s premier 3-star luxury haven, designed around authentic Indian hospitality, refined comfort and memorable stays</h3>`
  ],
  [
    `<p data-part="p" class="p1 a-center">Inspired by the atmosphere of Marbella’s golden era, the project combines contemporary architecture with warm materials, natural landscaping and carefully curated spaces.</p>`,
    `<p data-part="p" class="p1 a-center">Strategically located near Kalpi Bridge in Morar, the hotel blends regal elegance with modern conveniences, gourmet pure vegetarian dining, and versatile event venues.</p>`
  ],

  // Location Intro (Spain -> India / Gwalior)
  [
    `<h4 data-scroll-reveal="h" class="c1 a-center">Spain</h4>`,
    `<h4 data-scroll-reveal="h" class="c1 a-center">Madhya Pradesh</h4>`
  ],
  [
    `<h3 data-scroll-reveal="h" class="h1"><span class="loc-intro-s_title_line is-1">New </span><span class="loc-intro-s_title_line is-2 mob_a-right">Golden </span><span class="loc-intro-s_title_line">Mile</span></h3>`,
    `<h3 data-scroll-reveal="h" class="h1"><span class="loc-intro-s_title_line is-1">Royal </span><span class="loc-intro-s_title_line is-2 mob_a-right">Gwalior </span><span class="loc-intro-s_title_line">City</span></h3>`
  ],
  [
    `<h3 data-scroll-reveal="p" class="h5">Between Marbella and Estepona</h3>`,
    `<h3 data-scroll-reveal="p" class="h5">Morar, Near Kalpi Bridge</h3>`
  ],
  [
    `<p data-scroll-reveal="p" class="p1">Surrounded by beaches, golf courses, wellness clubs and established lifestyle destinations, the project combines privacy with effortless connectivity to everything essential for Mediterranean living. A location designed not around movement — but around returning.</p>`,
    `<p data-scroll-reveal="p" class="p1">Surrounded by heritage sights, business hubs, and premier shopping areas, Narayanam Hotel offers serene comfort with seamless connectivity to Gwalior Railway Station and the majestic Gwalior Fort. A location designed around heartfelt hospitality.</p>`
  ],
  [
    `/assets/6a15723f346e4b3a6c0af26a_era-residence-terrace.webp`,
    `/assets/narayanam/facilities/hotel-front-view.jpg`
  ],
  [
    `srcset="/assets/6a15723f346e4b3a6c0af26a_era-residence-terrace-p-500.png 500w, /assets/6a15723f346e4b3a6c0af26a_era-residence-terrace-p-800.png 800w, /assets/6a15723f346e4b3a6c0af26a_era-residence-terrace-p-1080.png 1080w, /assets/6a15723f346e4b3a6c0af26a_era-residence-terrace-p-1600.png 1600w, /assets/6a15723f346e4b3a6c0af26a_era-residence-terrace.webp 1920w"`,
    `srcset="/assets/narayanam/facilities/hotel-front-view.jpg 1920w"`
  ],
  [
    `<span data-scroll-reveal="h" class="loc-path-s_title_line">The coast you wanted </span><span data-scroll-reveal="a" class="loc-path-s_title_a a2">yours </span><span data-scroll-reveal="h" class="loc-path-s_title_line">this year</span>`,
    `<span data-scroll-reveal="h" class="loc-path-s_title_line">The stay you desired </span><span data-scroll-reveal="a" class="loc-path-s_title_a a2">yours </span><span data-scroll-reveal="h" class="loc-path-s_title_line">this season</span>`
  ],
  [
    `<h3 data-scroll-reveal="p" class="l1">New Golden Mile, Estepona</h3><div class="u-32"></div><h4 data-scroll-reveal="p" class="p1">Costa del Sol</h4><div class="u-32"></div><h5 data-scroll-reveal="p" class="p1">Spain</h5>`,
    `<h3 data-scroll-reveal="p" class="l1">River View Colony, Morar</h3><div class="u-32"></div><h4 data-scroll-reveal="p" class="p1">Gwalior, Madhya Pradesh</h4><div class="u-32"></div><h5 data-scroll-reveal="p" class="p1">India</h5>`
  ],
  [
    `/assets/6a15185e6803ae588479d12b_era-residence-master-plan.webp`,
    `/assets/narayanam/facilities/hotel-entrance.jpg`
  ],
  [
    `srcset="/assets/6a15185e6803ae588479d12b_era-residence-master-plan-p-500.png 500w, /assets/6a15185e6803ae588479d12b_era-residence-master-plan-p-800.png 800w, /assets/6a15185e6803ae588479d12b_era-residence-master-plan-p-1080.png 1080w, /assets/6a15185e6803ae588479d12b_era-residence-master-plan.webp 1920w"`,
    `srcset="/assets/narayanam/facilities/hotel-entrance.jpg 1920w"`
  ],

  // Room Types Carousel
  // Type 1: Ground floor + basement -> Royal Suite
  [
    `<h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Bedrooms</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">3</h5></div><div class="data-item"><h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Area up to</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">178 — 202 m²</h5>`,
    `<h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Bed Type</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">King</h5></div><div class="data-item"><h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Signature Feature</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">In-Room Jacuzzi</h5>`
  ],
  [
    `<p data-scroll-reveal="p" data-slider="p" class="p1 mob_a-center">Private basement, direct outdoor access and a dedicated lower level.</p>`,
    `<p data-scroll-reveal="p" data-slider="p" class="p1 mob_a-center">Our flagship suite featuring a private Jacuzzi, expansive living lounge, master bedroom, and bespoke VIP amenities.</p>`
  ],
  [
    `href="/apartments?type=ground-floor-basement"`,
    `href="/apartments?type=royal-suite"`
  ],
  [
    `<div hover="text" class="l1">Explore Ground + basement</div>`,
    `<div hover="text" class="l1">Explore Royal Suite</div>`
  ],
  [
    `<div hover="text" class="l1">Explore Ground + basement</div>`,
    `<div hover="text" class="l1">Explore Royal Suite</div>`
  ],
  [
    `<h3 data-scroll-reveal="h" data-slider="h" class="h2 a-center">Ground floor + basement</h3>`,
    `<h3 data-scroll-reveal="h" data-slider="h" class="h2 a-center">Royal Suite</h3>`
  ],
  [
    `/assets/6a1514d7c27920c70252da1f_era-residence-ground-floor-basement.webp`,
    `/assets/narayanam/rooms/royal-suite.jpg`
  ],
  [
    `srcset="/assets/file_snb32v 500w, /assets/file_rgw1qq 800w, /assets/file_moi2db 1080w, /assets/file_o02p9q 1600w, /assets/6a1514d7c27920c70252da1f_era-residence-ground-floor-basement.webp 1920w"`,
    `srcset="/assets/narayanam/rooms/royal-suite.jpg 1920w"`
  ],

  // Type 2: Ground floor -> Premium Suite
  [
    `<h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Bedrooms</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">2</h5></div><div class="data-item"><h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Area up to</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">97 — 104 m²</h5>`,
    `<h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Bed Type</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">King Bed</h5></div><div class="data-item"><h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Room Class</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">Executive Living</h5>`
  ],
  [
    `<p data-scroll-reveal="p" data-slider="p" class="p1 mob_a-center">Step directly onto your terrace and into the communal gardens, blending indoor comfort with outdoor living.</p>`,
    `<p data-scroll-reveal="p" data-slider="p" class="p1 mob_a-center">Elegantly appointed suite offering plush living room seating, deluxe bedding, high-speed Wi-Fi, and refined interiors.</p>`
  ],
  [
    `href="/apartments?type=ground-floor"`,
    `href="/apartments?type=premium-suite"`
  ],
  [
    `<div hover="text" class="l1">Explore Ground floor</div>`,
    `<div hover="text" class="l1">Explore Premium Suite</div>`
  ],
  [
    `<div hover="text" class="l1">Explore Ground floor</div>`,
    `<div hover="text" class="l1">Explore Premium Suite</div>`
  ],
  [
    `<h3 data-scroll-reveal="h" data-slider="h" class="h2 a-center">Ground Floor</h3>`,
    `<h3 data-scroll-reveal="h" data-slider="h" class="h2 a-center">Premium Suite</h3>`
  ],
  [
    `/assets/6a1575f46655e8c4e795ec64_era-residence-landscaping.webp`,
    `/assets/narayanam/rooms/premium-suite.jpeg`
  ],
  [
    `srcset="/assets/6a1575f46655e8c4e795ec64_era-residence-landscaping-p-500.webp 500w, /assets/6a1575f46655e8c4e795ec64_era-residence-landscaping-p-800.webp 800w, /assets/6a1575f46655e8c4e795ec64_era-residence-landscaping-p-1080.webp 1080w, /assets/6a1575f46655e8c4e795ec64_era-residence-landscaping-p-1600.webp 1600w, /assets/6a1575f46655e8c4e795ec64_era-residence-landscaping.webp 1920w"`,
    `srcset="/assets/narayanam/rooms/premium-suite.jpeg 1920w"`
  ],

  // Type 3: Penthouse duplex -> Executive Room
  [
    `<h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Bedrooms</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">2-3</h5></div><div class="data-item"><h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Area up to</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">124 — 243 m²</h5>`,
    `<h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Bed Type</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">Queen / Twin</h5></div><div class="data-item"><h4 data-scroll-reveal="p" data-slider="p" class="l1 reg">Starting From</h4><div class="u-8"></div><h5 data-scroll-reveal="p" data-slider="p" class="h5">₹3,350 / night</h5>`
  ],
  [
    `<p data-scroll-reveal="p" data-slider="p" class="p1 mob_a-center">Two floors crowned with panoramic views and a private rooftop solarium — the ultimate expression of luxury living.</p>`,
    `<p data-scroll-reveal="p" data-slider="p" class="p1 mob_a-center">Sleek, well-appointed room featuring ergonomic work desk, 24/7 room service, LED TV, and premium modern bath amenities.</p>`
  ],
  [
    `href="/apartments?type=penthouse-duplex"`,
    `href="/apartments?type=executive-room"`
  ],
  [
    `<div hover="text" class="l1">Explore Penthouses</div>`,
    `<div hover="text" class="l1">Explore Executive Room</div>`
  ],
  [
    `<div hover="text" class="l1">Explore Penthouses</div>`,
    `<div hover="text" class="l1">Explore Executive Room</div>`
  ],
  [
    `<h3 data-scroll-reveal="h" data-slider="h" class="h2 a-center">Penthouse duplex</h3>`,
    `<h3 data-scroll-reveal="h" data-slider="h" class="h2 a-center">Executive Room</h3>`
  ],
  [
    `/assets/6a15153b797c328a9f2f5964_era-residence-terrace.webp`,
    `/assets/narayanam/rooms/executive-room.jpg`
  ],
  [
    `srcset="/assets/6a15153b797c328a9f2f5964_era-residence-terrace-p-500.png 500w, /assets/6a15153b797c328a9f2f5964_era-residence-terrace-p-800.png 800w, /assets/6a15153b797c328a9f2f5964_era-residence-terrace-p-1080.png 1080w, /assets/6a15153b797c328a9f2f5964_era-residence-terrace.webp 1920w"`,
    `srcset="/assets/narayanam/rooms/executive-room.jpg 1920w"`
  ],

  // Apart-info lead
  [
    `<h3 data-scroll-reveal="p" class="h4 a-center">Residences range from 104 to 244 sq.m., offering spacious single level and duplex layouts with generous terraces and rooftop solariums.</h3>`,
    `<h3 data-scroll-reveal="p" class="h4 a-center">Accommodations range from thoughtfully designed Executive Rooms to sprawling Royal Suites with private Jacuzzis and 24/7 dining.</h3>`
  ],

  // Amenities Tabs
  // Tab 1: Gated community -> Naivedyam Restaurant
  [
    `<h3 data-scroll-reveal="p" data-tab="p" class="l1">Gated community</h3><div class="u-32"></div></div><div class="amen-slide_desc w-clearfix"><div class="red-line"></div><h4 data-scroll-reveal="p" data-tab="p" class="h5">Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard</h4>`,
    `<h3 data-scroll-reveal="p" data-tab="p" class="l1">Naivedyam Restaurant</h3><div class="u-32"></div></div><div class="amen-slide_desc w-clearfix"><div class="red-line"></div><h4 data-scroll-reveal="p" data-tab="p" class="h5">Pure vegetarian fine dining serving authentic North Indian, South Indian, Tandoori, and Continental specialties</h4>`
  ],
  [
    `/assets/6a1512e5b24991c76981118b_era-residence-gated-community.webp`,
    `/assets/narayanam/dining/naivedyam-restaurant.jpg`
  ],
  [
    `srcset="/assets/6a1512e5b24991c76981118b_era-residence-gated-community-p-500.webp 500w, /assets/6a1512e5b24991c76981118b_era-residence-gated-community-p-800.webp 800w, /assets/6a1512e5b24991c76981118b_era-residence-gated-community-p-1080.webp 1080w, /assets/6a1512e5b24991c76981118b_era-residence-gated-community-p-1600.webp 1600w, /assets/6a1512e5b24991c76981118b_era-residence-gated-community.webp 1920w"`,
    `srcset="/assets/narayanam/dining/naivedyam-restaurant.jpg 1920w"`
  ],

  // Tab 2: Swimming Pool -> 24/7 Nishabd Cafe
  [
    `<h3 data-scroll-reveal="p" data-tab="p" class="l1">Swimming Pool</h3><div class="u-32"></div></div><div class="amen-slide_desc w-clearfix"><div class="red-line"></div><h4 data-scroll-reveal="p" data-tab="p" class="h5">Saltwater swimming pool, Children’s pool, Sauna, jacuzzi and wellness shower</h4>`,
    `<h3 data-scroll-reveal="p" data-tab="p" class="l1">24/7 Nishabd Cafe</h3><div class="u-32"></div></div><div class="amen-slide_desc w-clearfix"><div class="red-line"></div><h4 data-scroll-reveal="p" data-tab="p" class="h5">Round-the-clock coffee shop with artisan espresso, gourmet snacks, and relaxed ambient atmosphere</h4>`
  ],
  [
    `/assets/6a151264dc1dcca76fda17d9_era-residence-pool.webp`,
    `/assets/narayanam/dining/nishabd-coffee-shop.webp`
  ],
  [
    `srcset="/assets/6a151264dc1dcca76fda17d9_era-residence-pool-p-500.webp 500w, /assets/6a151264dc1dcca76fda17d9_era-residence-pool-p-800.webp 800w, /assets/6a151264dc1dcca76fda17d9_era-residence-pool-p-1080.webp 1080w, /assets/6a151264dc1dcca76fda17d9_era-residence-pool-p-1600.webp 1600w, /assets/6a151264dc1dcca76fda17d9_era-residence-pool.webp 1920w"`,
    `srcset="/assets/narayanam/dining/nishabd-coffee-shop.webp 1920w"`
  ],

  // Tab 3: Parking area -> Navrang Banquet
  [
    `<h3 data-scroll-reveal="p" data-tab="p" class="l1">Parking area</h3><div class="u-32"></div></div><div class="amen-slide_desc w-clearfix"><div class="red-line"></div><h4 data-scroll-reveal="p" data-tab="p" class="h5">Each parking space includes pre-installation for optional EV charging.</h4>`,
    `<h3 data-scroll-reveal="p" data-tab="p" class="l1">Navrang Banquet</h3><div class="u-32"></div></div><div class="amen-slide_desc w-clearfix"><div class="red-line"></div><h4 data-scroll-reveal="p" data-tab="p" class="h5">Grand pillarless celebration venue accommodating 350 to 500 guests for weddings, gala events and conferences.</h4>`
  ],
  [
    `/assets/6a1573fc640c344ee0705819_era-residence-parking.webp`,
    `/assets/narayanam/facilities/navrang-banquet-hall.jpg`
  ],
  [
    `srcset="/assets/6a1573fc640c344ee0705819_era-residence-parking-p-500.png 500w, /assets/6a1573fc640c344ee0705819_era-residence-parking-p-800.png 800w, /assets/6a1573fc640c344ee0705819_era-residence-parking.webp 1920w"`,
    `srcset="/assets/narayanam/facilities/navrang-banquet-hall.jpg 1920w"`
  ],

  // Tab 4: Spa & gym -> Nirvana Gym
  [
    `<h3 data-scroll-reveal="p" data-tab="p" class="l1">Spa &amp; gym</h3><div class="u-32"></div></div><div class="amen-slide_desc w-clearfix"><div class="red-line"></div><h4 data-scroll-reveal="p" data-tab="p" class="h5">Designed exclusively for residents and their guests, the amenities at ERA encourage a slower and more balanced Mediterranean lifestyle</h4>`,
    `<h3 data-scroll-reveal="p" data-tab="p" class="l1">Nirvana Gym</h3><div class="u-32"></div></div><div class="amen-slide_desc w-clearfix"><div class="red-line"></div><h4 data-scroll-reveal="p" data-tab="p" class="h5">State-of-the-art fitness center equipped with advanced cardio machines, strength stations and free weights</h4>`
  ],
  [
    `/assets/6a15132fe66907986a254201_era-residence-spa-_26-gym.webp`,
    `/assets/narayanam/facilities/nirvana-gym.webp`
  ],
  [
    `srcset="/assets/6a15132fe66907986a254201_era-residence-spa-_26-gym-p-500.webp 500w, /assets/6a15132fe66907986a254201_era-residence-spa-_26-gym-p-800.webp 800w, /assets/6a15132fe66907986a254201_era-residence-spa-_26-gym-p-1080.webp 1080w, /assets/6a15132fe66907986a254201_era-residence-spa-_26-gym-p-1600.webp 1600w, /assets/6a15132fe66907986a254201_era-residence-spa-_26-gym.webp 1920w"`,
    `srcset="/assets/narayanam/facilities/nirvana-gym.webp 1920w"`
  ],

  // Tab 5: Landscaping -> Nirjhara Bar
  [
    `<h3 data-scroll-reveal="p" data-tab="p" class="l1">Landscaping</h3><div class="u-32"></div></div><div class="amen-slide_desc w-clearfix"><div class="red-line"></div><h4 data-scroll-reveal="p" data-tab="p" class="h5">The landscaping concept was designed to soften the architecture and strengthen the connection between the residences and the Mediterranean environment.</h4>`,
    `<h3 data-scroll-reveal="p" data-tab="p" class="l1">Nirjhara Lounge</h3><div class="u-32"></div></div><div class="amen-slide_desc w-clearfix"><div class="red-line"></div><h4 data-scroll-reveal="p" data-tab="p" class="h5">Sophisticated evening venue offering curated mocktails, signature drinks, vibrant music, and stylish discotheque vibes.</h4>`
  ],
  [
    `/assets/6a151382fb101ce2ca9db288_era-residence-landscaping.webp`,
    `/assets/narayanam/dining/restaurant-interior.jpg`
  ],
  [
    `srcset="/assets/6a151382fb101ce2ca9db288_era-residence-landscaping-p-500.png 500w, /assets/6a151382fb101ce2ca9db288_era-residence-landscaping-p-800.png 800w, /assets/6a151382fb101ce2ca9db288_era-residence-landscaping-p-1080.png 1080w, /assets/6a151382fb101ce2ca9db288_era-residence-landscaping.webp 1920w"`,
    `srcset="/assets/narayanam/dining/restaurant-interior.jpg 1920w"`
  ],

  // Amenity tab titles
  [
    `<div data-scroll-reveal="p" class="h5">Gated community</div>`,
    `<div data-scroll-reveal="p" class="h5">Naivedyam Dining</div>`
  ],
  [
    `<div data-scroll-reveal="p" class="h5">Swimming Pool</div>`,
    `<div data-scroll-reveal="p" class="h5">24/7 Nishabd Cafe</div>`
  ],
  [
    `<div data-scroll-reveal="p" class="h5">Parking area</div>`,
    `<div data-scroll-reveal="p" class="h5">Navrang Banquet</div>`
  ],
  [
    `<div data-scroll-reveal="p" class="h5">Spa &amp; gym</div>`,
    `<div data-scroll-reveal="p" class="h5">Nirvana Gym</div>`
  ],
  [
    `<div data-scroll-reveal="p" class="h5">Landscaping</div>`,
    `<div data-scroll-reveal="p" class="h5">Nirjhara Lounge</div>`
  ],

  // Interior Section
  [
    `<h4 data-scroll-reveal="p" class="l1">Optional upgrades are available: <br>• Private jacuzzi <br>• EV charging point installation <br>• Photovoltaic panels</h4>`,
    `<h4 data-scroll-reveal="p" class="l1">Premium amenities included: <br>• In-room Jacuzzi in Royal Suites <br>• 24/7 Room Service &amp; Free Wi-Fi <br>• Valet Parking &amp; Travel Assistance</h4>`
  ],
  [
    `<h4 data-scroll-reveal="p" class="h5">Every detail was selected to create homes that feel elegant, intuitive and effortless to live in</h4>`,
    `<h4 data-scroll-reveal="p" class="h5">Every detail was selected to deliver an experience that feels opulent, welcoming, and effortless to enjoy</h4>`
  ],
  [
    `<p data-scroll-reveal="p" class="p1">Underfloor heating throughout the property. Climate automation systems. Smart lock access systems. Electrically adjustable aluminium shutters. Schneider Electric DLIFE switches and mechanisms .</p>`,
    `<p data-scroll-reveal="p" class="p1">Individual climate control. High-definition LED televisions. Luxury bedding and plush pillows. High-speed optical Wi-Fi. 24-hour concierge and in-room dining services.</p>`
  ],

  // Gallery Images
  [
    `/assets/6a1507fddb26e71ff717c30c_img_cam_03.webp`,
    `/assets/narayanam/rooms/room-6.jpg`
  ],
  [
    `srcset="/assets/6a1507fddb26e71ff717c30c_img_cam_03-p-500.webp 500w, /assets/6a1507fddb26e71ff717c30c_img_cam_03-p-800.webp 800w, /assets/6a1507fddb26e71ff717c30c_img_cam_03-p-1080.webp 1080w, /assets/6a1507fddb26e71ff717c30c_img_cam_03-p-1600.webp 1600w, /assets/6a1507fddb26e71ff717c30c_img_cam_03.webp 1920w"`,
    `srcset="/assets/narayanam/rooms/room-6.jpg 1920w"`
  ],
  [
    `/assets/6a15080748155bc8e151f5ff_img_cam_07.webp`,
    `/assets/narayanam/rooms/room-7.jpg`
  ],
  [
    `srcset="/assets/6a15080748155bc8e151f5ff_img_cam_07-p-500.webp 500w, /assets/6a15080748155bc8e151f5ff_img_cam_07-p-800.webp 800w, /assets/6a15080748155bc8e151f5ff_img_cam_07-p-1080.webp 1080w, /assets/6a15080748155bc8e151f5ff_img_cam_07-p-1600.webp 1600w, /assets/6a15080748155bc8e151f5ff_img_cam_07.webp 1920w"`,
    `srcset="/assets/narayanam/rooms/room-7.jpg 1920w"`
  ],
  [
    `/assets/6a150812aefa2e544369d4a6_img_cam_09.webp`,
    `/assets/narayanam/rooms/room-8.jpg`
  ],
  [
    `srcset="/assets/6a150812aefa2e544369d4a6_img_cam_09-p-500.webp 500w, /assets/6a150812aefa2e544369d4a6_img_cam_09-p-800.webp 800w, /assets/6a150812aefa2e544369d4a6_img_cam_09-p-1080.webp 1080w, /assets/6a150812aefa2e544369d4a6_img_cam_09-p-1600.webp 1600w, /assets/6a150812aefa2e544369d4a6_img_cam_09.webp 1920w"`,
    `srcset="/assets/narayanam/rooms/room-8.jpg 1920w"`
  ],
  [
    `/assets/6a1575180f248400b7124a46_era-residence-kitchen.webp`,
    `/assets/narayanam/dining/dining-spread.jpg`
  ],
  [
    `srcset="/assets/6a1575180f248400b7124a46_era-residence-kitchen-p-500.webp 500w, /assets/6a1575180f248400b7124a46_era-residence-kitchen-p-800.webp 800w, /assets/6a1575180f248400b7124a46_era-residence-kitchen-p-1080.webp 1080w, /assets/6a1575180f248400b7124a46_era-residence-kitchen-p-1600.webp 1600w, /assets/6a1575180f248400b7124a46_era-residence-kitchen.webp 1920w"`,
    `srcset="/assets/narayanam/dining/dining-spread.jpg 1920w"`
  ],

  // Architecture Section -> Hospitality
  [
    `<h2 data-text="h" data-fit-text="" class="h1 a-center">Architecture</h2>`,
    `<h2 data-text="h" data-fit-text="" class="h1 a-center">Hospitality</h2>`
  ],
  [
    `<h3 data-part="p" class="h5">The architecture of ERA Residences balances clean contemporary lines with Mediterranean warmth and texture</h3>`,
    `<h3 data-part="p" class="h5">Narayanam Hotel harmonizes contemporary Indian luxury with the rich cultural grandeur and warm hospitality of Gwalior</h3>`
  ],
  [
    `<div class="arch-s_author"><div data-part="p" class="l1">By Schiemann Weyers</div><div data-part="p" class="l1 reg">Architects OCWA Architects</div></div>`,
    `<div class="arch-s_author"><div data-part="p" class="l1">General Manager</div><div data-part="p" class="l1 reg">Narayanam Hotel Gwalior</div></div>`
  ],
  [
    `/assets/6a0f8994091fd12c24e79c8a_img_cam_02.webp`,
    `/assets/narayanam/facilities/hotel-exterior-2.webp`
  ],
  [
    `srcset="/assets/6a0f8994091fd12c24e79c8a_img_cam_02-p-500.png 500w, /assets/6a0f8994091fd12c24e79c8a_img_cam_02-p-800.png 800w, /assets/6a0f8994091fd12c24e79c8a_img_cam_02-p-1080.png 1080w, /assets/6a0f8994091fd12c24e79c8a_img_cam_02.webp 1920w"`,
    `srcset="/assets/narayanam/facilities/hotel-exterior-2.webp 1920w"`
  ],

  // Accordions
  [
    `<h4 data-scroll-reveal="h" class="h3 a-center">Developer</h4>`,
    `<h4 data-scroll-reveal="h" class="h3 a-center">Strategic Location</h4>`
  ],
  [
    `<p data-accordion-card="p" class="p1 a-center">Swiss Technology S.L.</p>`,
    `<p data-accordion-card="p" class="p1 a-center">Situated in River View Colony, Morar, just 4.5 km from Gwalior Railway Station and 6 km from Gwalior Fort.</p>`
  ],
  [
    `<h4 data-scroll-reveal="h" class="h3 a-center">Sales &amp; Marketing</h4>`,
    `<h4 data-scroll-reveal="h" class="h3 a-center">Pure Veg Dining</h4>`
  ],
  [
    `<p data-accordion-card="p" class="p1 a-center">Unreal Estate Group</p>`,
    `<p data-accordion-card="p" class="p1 a-center">Naivedyam Restaurant and 24/7 Nishabd Coffee Shop serve 100% pure vegetarian culinary preparations.</p>`
  ],
  [
    `<h4 data-scroll-reveal="h" class="h3 a-center">License obtained</h4>`,
    `<h4 data-scroll-reveal="h" class="h3 a-center">Grand Banquets</h4>`
  ],
  [
    `<p data-accordion-card="p" class="p1 a-center">The project holds all required permits and an active construction license. All documentation is publicly available. Construction is already underway — visit the site in person or follow progress via our live online stream.</p>`,
    `<p data-accordion-card="p" class="p1 a-center">Navras and Navrang Banquet Halls accommodate 350 to 500 guests with complete event planning, catering and sound arrangements.</p>`
  ],
  [
    `<h4 data-scroll-reveal="h" class="h3 a-center">2026</h4>`,
    `<h4 data-scroll-reveal="h" class="h3 a-center">Guest Services</h4>`
  ],
  [
    `<p data-accordion-card="p" class="p1 a-center">Currently under construction. The first phase of construction is underway, with ongoing development of the apartments and communal areas. Potential buyers can anticipate a modern living space upon completion of the build.</p>`,
    `<p data-accordion-card="p" class="p1 a-center">Check-in: 12:00 PM | Check-out: 11:00 AM. 24-hour front desk, express check-in, laundry, free valet parking, and airport transfers.</p>`
  ],

  // CTA Section
  [
    `<p data-scroll-reveal="p" class="l1 a-center">A short conversation is enough to understand which apartment fits your use case — whether it is a family second home, a longer stay, or a place to return to year after year.</p>`,
    `<p data-scroll-reveal="p" class="l1 a-center">Whether you are visiting Gwalior for leisure, weddings, or business, our dedicated reservations team ensures your stay is seamless, comfortable, and truly memorable.</p>`
  ],
  [
    `<h2 data-scroll-reveal="h" class="h1 a-center">Perfect <br>sea views</h2><div class="u-32"></div><h3 data-scroll-reveal="h" class="c1 a-center">From rooftop terraces</h3>`,
    `<h2 data-scroll-reveal="h" class="h1 a-center">Reserve <br>Your Stay</h2><div class="u-32"></div><h3 data-scroll-reveal="h" class="c1 a-center">Best Rates Guaranteed</h3>`
  ],
  [
    `/assets/6a0f88f3b81e88aabf6874e7_img_cta_1920.webp`,
    `/assets/narayanam/facilities/hotel-front-view.jpg`
  ],
  [
    `srcset="/assets/6a0f88f3b81e88aabf6874e7_img_cta_1920-p-500.png 500w, /assets/6a0f88f3b81e88aabf6874e7_img_cta_1920-p-800.png 800w, /assets/6a0f88f3b81e88aabf6874e7_img_cta_1920-p-1080.png 1080w, /assets/6a0f88f3b81e88aabf6874e7_img_cta_1920-p-1600.png 1600w, /assets/6a0f88f3b81e88aabf6874e7_img_cta_1920.webp 1920w"`,
    `srcset="/assets/narayanam/facilities/hotel-front-view.jpg 1920w"`
  ],

  // Footer Contacts
  [
    `<a href="tel:+34655408648" target="_blank" class="nav-item w-inline-block"><div data-text="h" class="h2 a-center">+34 (655) 408-648</div></a>`,
    `<a href="tel:+916262621454" target="_blank" class="nav-item w-inline-block"><div data-text="h" class="h2 a-center">+91 6262621454</div></a>`
  ],
  [
    `<h3 class="l1 reg a-center">Sales Office</h3><div class="u-4"></div><a hover-nav-item="" aria-label="Avenida Litoral, 29680 Estepona, Málaga, Spain" href="https://maps.app.goo.gl/EzyfT2M6vR5aBdMu9" class="nav-item w-inline-block"><div class="nav-item_label"><div class="nav-item_label_text"><div hover="text" class="l1">Avenida Litoral, 29680 Estepona, Málaga, Spain</div></div><div class="nav-item_label_text is-2"><div hover="text" class="l1">Avenida Litoral, 29680 Estepona, Málaga, Spain</div></div></div></a>`,
    `<h3 class="l1 reg a-center">Hotel Address</h3><div class="u-4"></div><a hover-nav-item="" aria-label="B-33, 34 River View Colony, Near Kalpi Bridge, Morar, Gwalior" href="https://maps.google.com/?q=Narayanam+Hotel+Morar+Gwalior" target="_blank" class="nav-item w-inline-block"><div class="nav-item_label"><div class="nav-item_label_text"><div hover="text" class="l1">B-33, 34 River View Colony, Near Kalpi Bridge, Morar, Gwalior (M.P.)</div></div><div class="nav-item_label_text is-2"><div hover="text" class="l1">B-33, 34 River View Colony, Near Kalpi Bridge, Morar, Gwalior (M.P.)</div></div></div></a>`
  ],
  [
    `<div data-text="p" class="l1">Era Residence.</div><div data-text="p" class="l1 reg no-wrap">©<span class="year">2026</span> All rights reserved</div>`,
    `<div data-text="p" class="l1">Narayanam Hotel.</div><div data-text="p" class="l1 reg no-wrap">©<span class="year">2026</span> All rights reserved</div>`
  ],

  // Floating Tips
  [
    `<h1 class="h5">Crafted to Endure</h1></div><div class="floating-tip-card_b"><p class="p1">Noble materials, contemporary architecture and natural light shape spaces designed to age gracefully over time.</p>`,
    `<h1 class="h5">Royal Jacuzzi Suite</h1></div><div class="floating-tip-card_b"><p class="p1">Signature luxury suite featuring a private in-room Jacuzzi, plush king bed, and dedicated butler service.</p>`
  ],
  [
    `<h1 class="h5">Light &amp; Flow</h1></div><div class="floating-tip-card_b"><p class="p1">Terraces, rooftop solariums and expansive openings maximize natural light while creating a seamless indoor outdoor lifestyle.</p>`,
    `<h1 class="h5">Naivedyam Pure Veg</h1></div><div class="floating-tip-card_b"><p class="p1">Fine dining restaurant serving exquisite vegetarian culinary creations crafted by master chefs.</p>`
  ],
  [
    `<h1 class="h5">Your Private Sanctuary</h1></div><div class="floating-tip-card_b"><p class="p1">Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard apartment building.</p>`,
    `<h1 class="h5">24/7 Nishabd Cafe</h1></div><div class="floating-tip-card_b"><p class="p1">Round-the-clock coffee shop offering specialty brews, gourmet delicacies, and cozy midnight conversations.</p>`
  ],

  // Book a call modal
  [
    `<h1 class="a2 b-desk">Book a call</h1><div class="a1 b-mob">Book a call</div>`,
    `<h1 class="a2 b-desk">Reserve Stay</h1><div class="a1 b-mob">Reserve Stay</div>`
  ],
  [
    `<p class="l1 mob_a-center">Leave your details and we will get back to you within 24 hours.</p>`,
    `<p class="l1 mob_a-center">Leave your booking details and our reservations desk will confirm your room within minutes.</p>`
  ]
];

let replacedCount = 0;
for (const [target, replacement] of replacements) {
  if (html.includes(target)) {
    html = html.split(target).join(replacement);
    replacedCount++;
  } else {
    console.warn('Target not found in HTML:', target.substring(0, 60) + '...');
  }
}

console.log(`Replaced ${replacedCount} / ${replacements.length} target patterns.`);

// Also replace any remaining ERA Residence occurrences in visible text if any
html = html.replace(/Era Residence/g, 'Narayanam Hotel');
html = html.replace(/ERA Residence/g, 'Narayanam Hotel');
html = html.replace(/ERA Residences/g, 'Narayanam Hotel');

fs.writeFileSync(indexPath, html, 'utf-8');
console.log('Successfully updated index.html! New size:', html.length);

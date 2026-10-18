const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fs = require('fs');
const path = require('path');

const viewports = [
  { name: '1440x900_desktop', width: 1440, height: 900 },
  { name: '1280x800_laptop', width: 1280, height: 800 },
  { name: '768x1024_tablet', width: 768, height: 1024 },
  { name: '430x932_mobile_large', width: 430, height: 932 },
  { name: '390x844_mobile_med', width: 390, height: 844 },
  { name: '375x812_mobile_small', width: 375, height: 812 }
];

const screenshotsDir = path.join(__dirname, 'responsive_screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  console.log('=== DEEP RESPONSIVE & LAYOUT INSPECTION ===\n');

  const results = {};

  for (const vp of viewports) {
    console.log(`\n----------------- Testing ${vp.name} (${vp.width}x${vp.height}) -----------------`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    const failedRequests = [];
    page.on('requestfailed', req => {
      failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
    });

    await page.addInitScript(() => {
      sessionStorage.setItem('hasVisited', 'true');
      localStorage.setItem('cookies', 'accepted');
    });

    await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const p = document.querySelector('[data-preloader]');
      if (p) p.style.display = 'none';
    });
    await page.waitForTimeout(1000);

    // Check 1: Horizontal Overflow across scroll
    let hasHorizontalOverflow = false;
    let maxScrollWidth = 0;
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    
    for (let y = 0; y <= scrollHeight - vp.height; y += 500) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await page.waitForTimeout(40);
      const overflow = await page.evaluate((expectedWidth) => {
        const sw = document.documentElement.scrollWidth;
        const bw = document.body.scrollWidth;
        const actual = Math.max(sw, bw);
        return {
          overflows: actual > expectedWidth + 1, // allow 1px subpixel
          actualWidth: actual
        };
      }, vp.width);

      if (overflow.overflows) {
        hasHorizontalOverflow = true;
        maxScrollWidth = Math.max(maxScrollWidth, overflow.actualWidth);
      }
    }

    // Check 2: Header logo and navigation usability
    const headerInfo = await page.evaluate(() => {
      const logo = document.querySelector('.header_logo, .logo, [class*="logo"]');
      const navBtn = document.querySelector('[data-nav-toggle], .nav-btn, .burger, [class*="menu-btn"]');
      const logoRect = logo ? logo.getBoundingClientRect() : null;
      return {
        hasLogo: !!logo,
        logoVisible: logo ? logoRect.width > 0 && logoRect.height > 0 : false,
        logoWidth: logoRect ? logoRect.width : 0,
        logoHeight: logoRect ? logoRect.height : 0
      };
    });

    // Check 3: Hero section text visibility and overlap
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const heroCheck = await page.evaluate(() => {
      const gwaliorTitle = document.querySelector('.loc-intro-title, .loc-intro_l, h1, .h1');
      const heroImage = document.querySelector('.hero-img, .hero-w_bg_master_img_day, .loc-intro_bg');
      const tRect = gwaliorTitle ? gwaliorTitle.getBoundingClientRect() : null;
      const iRect = heroImage ? heroImage.getBoundingClientRect() : null;
      return {
        titleFound: !!gwaliorTitle,
        titleText: gwaliorTitle ? gwaliorTitle.textContent.trim().slice(0, 50) : '',
        titleRect: tRect,
        imageRect: iRect
      };
    });

    // Capture Hero Screenshot
    const heroShotPath = path.join(screenshotsDir, `hero_${vp.name}.png`);
    await page.screenshot({ path: heroShotPath, fullPage: false });

    // Scroll to Amenities / Rooms and capture
    await page.evaluate(() => {
      const sec = document.querySelector('.section-interior-arch, .apart-s, [class*="amen-"]');
      if (sec) sec.scrollIntoView();
    });
    await page.waitForTimeout(600);
    const midShotPath = path.join(screenshotsDir, `amenities_${vp.name}.png`);
    await page.screenshot({ path: midShotPath, fullPage: false });

    results[vp.name] = {
      hasHorizontalOverflow,
      maxScrollWidth,
      expectedWidth: vp.width,
      headerInfo,
      heroCheck,
      consoleErrorsCount: consoleErrors.length,
      failedRequestsCount: failedRequests.length,
      consoleErrors: consoleErrors.slice(0, 5),
      failedRequests: failedRequests.slice(0, 5)
    };

    console.log(`Horizontal Overflow: ${hasHorizontalOverflow ? `YES (${maxScrollWidth}px vs ${vp.width}px)` : 'NO (Clean!)'}`);
    console.log(`Logo: ${headerInfo.hasLogo ? `Visible (${Math.round(headerInfo.logoWidth)}x${Math.round(headerInfo.logoHeight)}px)` : 'Missing'}`);
    console.log(`Console Errors: ${consoleErrors.length}`);
    console.log(`Failed Requests: ${failedRequests.length}`);

    await page.close();
  }

  fs.writeFileSync(path.join(__dirname, 'responsive_results.json'), JSON.stringify(results, null, 2));
  console.log('\nSaved responsive_results.json and screenshots!');
  await browser.close();
})();

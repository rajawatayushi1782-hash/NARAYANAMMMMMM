const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(__dirname, 'final_verification_screenshots');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const requiredViewports = [
  { name: '1440x900', width: 1440, height: 900, category: 'Desktop' },
  { name: '1280x800', width: 1280, height: 800, category: 'Laptop' },
  { name: '768x1024', width: 768, height: 1024, category: 'Tablet' },
  { name: '430x932', width: 430, height: 932, category: 'Mobile Large' },
  { name: '390x844', width: 390, height: 844, category: 'Mobile Medium' },
  { name: '375x812', width: 375, height: 812, category: 'Mobile Compact' }
];

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Rooms_and_Suites', path: '/apartments' },
  { name: 'Room_Detail_011', path: '/apartments/011' },
  { name: 'Contact', path: '/contact' }
];

(async () => {
  console.log('================================================================');
  console.log('NARAYANAM HOTEL: FULL PLAYWRIGHT SUITE - 6 VIEWPORTS x 4 ROUTES');
  console.log('================================================================\n');

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const fullReport = {
    timestamp: new Date().toISOString(),
    viewportsTested: requiredViewports.length,
    routesTested: routes.length,
    viewportResults: {},
    allEraImagesFound: 0,
    allEraRequestsCount: 0,
    overflowViolations: 0,
    interactions: []
  };

  for (const vp of requiredViewports) {
    console.log(`\n================================================================`);
    console.log(`VIEWPORT: ${vp.name} (${vp.category} - ${vp.width}x${vp.height})`);
    console.log(`================================================================`);

    fullReport.viewportResults[vp.name] = {
      category: vp.category,
      routes: {}
    };

    for (const r of routes) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.addInitScript(() => {
        sessionStorage.setItem('hasVisited', 'true');
        localStorage.setItem('cookies', 'accepted');
      });

      const eraNetworkHits = [];
      page.on('request', req => {
        const url = req.url();
        if (url.match(/\.(png|jpg|jpeg|webp|avif|gif|svg)/i)) {
          if (url.includes('era-residence') || url.includes('6a15') || url.includes('6a0f') || url.includes('6a25') || url.includes('6a34') || url.includes('6a54') || url.includes('6a38') || url.includes('file_mlb') || url.includes('file_snb')) {
            eraNetworkHits.push(url);
          }
        }
      });

      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await page.goto(`http://127.0.0.1:3000${r.path}`, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => {
        const p = document.querySelector('[data-preloader]');
        if (p) p.style.display = 'none';
      });
      await page.waitForTimeout(500);

      // Measure horizontal overflow across full scroll
      let hasHorizontalOverflow = false;
      let maxScrollWidth = 0;
      const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= scrollHeight - vp.height; y += 450) {
        await page.evaluate(pos => window.scrollTo(0, pos), y);
        await page.waitForTimeout(30);
        const w = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth));
        if (w > vp.width + 1) {
          hasHorizontalOverflow = true;
          maxScrollWidth = Math.max(maxScrollWidth, w);
        }
      }

      if (hasHorizontalOverflow) fullReport.overflowViolations++;

      // Return to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      // Inspect all images in DOM
      const domImages = await page.evaluate(() => {
        const imgs = [];
        document.querySelectorAll('img').forEach((img, i) => {
          const src = img.getAttribute('src') || '';
          const srcset = img.getAttribute('srcset') || '';
          const currentSrc = img.currentSrc || '';
          const alt = img.getAttribute('alt') || '';
          const isEra = (src + ' ' + srcset + ' ' + currentSrc).includes('era-residence') ||
                        (src + ' ' + srcset + ' ' + currentSrc).includes('6a15') ||
                        (src + ' ' + srcset + ' ' + currentSrc).includes('6a0f') ||
                        (src + ' ' + srcset + ' ' + currentSrc).includes('6a25') ||
                        (src + ' ' + srcset + ' ' + currentSrc).includes('6a34') ||
                        (src + ' ' + srcset + ' ' + currentSrc).includes('6a54') ||
                        (src + ' ' + srcset + ' ' + currentSrc).includes('6a38') ||
                        (src + ' ' + srcset + ' ' + currentSrc).includes('file_mlb') ||
                        (src + ' ' + srcset + ' ' + currentSrc).includes('file_snb');
          imgs.push({
            index: i,
            src,
            currentSrc,
            alt,
            isEra
          });
        });
        return imgs;
      });

      const eraInDom = domImages.filter(i => i.isEra);
      fullReport.allEraImagesFound += eraInDom.length;
      fullReport.allEraRequestsCount += eraNetworkHits.length;

      // Capture screenshot for visual validation
      const shotName = `${r.name}_${vp.name}.png`;
      const shotPath = path.join(OUTPUT_DIR, shotName);
      await page.screenshot({ path: shotPath, fullPage: false });

      fullReport.viewportResults[vp.name].routes[r.name] = {
        totalImages: domImages.length,
        eraImagesInDom: eraInDom.length,
        eraRequests: eraNetworkHits.length,
        horizontalOverflow: hasHorizontalOverflow,
        maxScrollWidth: hasHorizontalOverflow ? maxScrollWidth : vp.width,
        consoleErrors: consoleErrors.length
      };

      console.log(`[${r.name}] Images: ${domImages.length} | ERA DOM: ${eraInDom.length} | ERA Req: ${eraNetworkHits.length} | H-Overflow: ${hasHorizontalOverflow ? `YES (${maxScrollWidth}px)` : 'NO (Clean!)'}`);

      // Special interaction tests on Home page for desktop & mobile
      if (r.path === '/' && (vp.name === '1440x900' || vp.name === '390x844')) {
        // 1. Test Day/Night switcher
        try {
          const nightTab = await page.$('[data-tab="night"], text="by night"');
          if (nightTab) {
            await nightTab.click();
            await page.waitForTimeout(600);
            const nightImg = await page.evaluate(() => {
              const el = document.querySelector('.hero-w_bg_master_img_night img');
              return el ? { src: el.getAttribute('src'), currentSrc: el.currentSrc } : null;
            });
            console.log(`   -> Night mode tested on ${vp.name}:`, nightImg);
            fullReport.interactions.push({ name: `Night Switcher (${vp.name})`, result: nightImg });
          }
        } catch (e) {}

        // 2. Test interactive hotspot pin click
        try {
          const pin = await page.$('.pin, [hover-pin=""]');
          if (pin) {
            await pin.click();
            await page.waitForTimeout(600);
            console.log(`   -> Hotspot pin clicked on ${vp.name}`);
            fullReport.interactions.push({ name: `Hotspot Pin Click (${vp.name})`, passed: true });
          }
        } catch (e) {}
      }

      await page.close();
    }
  }

  await browser.close();

  fs.writeFileSync(path.join(__dirname, 'final_verification_report.json'), JSON.stringify(fullReport, null, 2));

  console.log('\n================================================================');
  console.log('FINAL VALIDATION AUDIT SUMMARY:');
  console.log(`- Total Viewports Tested: ${fullReport.viewportsTested}`);
  console.log(`- Total Routes Tested:    ${fullReport.routesTested}`);
  console.log(`- Total ERA Images in DOM:        ${fullReport.allEraImagesFound}`);
  console.log(`- Total ERA Network Requests:     ${fullReport.allEraRequestsCount}`);
  console.log(`- Total Horizontal Overflows:     ${fullReport.overflowViolations}`);
  console.log(`- Screenshots Saved to:           tests/final_verification_screenshots/`);
  console.log('================================================================\n');

  if (fullReport.allEraImagesFound === 0 && fullReport.allEraRequestsCount === 0 && fullReport.overflowViolations === 0) {
    console.log('>>> ALL ACCEPTANCE CRITERIA MET WITH 100% SUCCESS! <<<');
  } else {
    console.log('>>> ATTENTION: SOME VIOLATIONS REMAIN - CHECK REPORT <<<');
  }
})();

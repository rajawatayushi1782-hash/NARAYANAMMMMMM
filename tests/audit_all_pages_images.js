const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = ['/', '/apartments', '/contact', '/apartments/011'];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  console.log('=== MULTI-ROUTE AUDIT FOR RESIDUAL ERA IMAGES ===\n');

  let totalViolations = 0;

  for (const route of routes) {
    console.log(`\n================ ROUTE: ${route} ================`);
    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.addInitScript(() => {
        sessionStorage.setItem('hasVisited', 'true');
        localStorage.setItem('cookies', 'accepted');
      });

      const eraRequests = [];
      page.on('request', req => {
        const url = req.url();
        if (url.match(/\.(png|jpg|jpeg|webp|avif|gif)/i)) {
          if (url.includes('era-residence') || url.includes('6a15') || url.includes('6a0f') || url.includes('6a25') || url.includes('6a34') || url.includes('6a54') || url.includes('6a38') || url.includes('file_mlb') || url.includes('file_snb')) {
            eraRequests.push(url);
          }
        }
      });

      await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => {
        const p = document.querySelector('[data-preloader]');
        if (p) p.style.display = 'none';
      });
      await page.waitForTimeout(500);

      // Scroll through page
      const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
      for (let y = 0; y <= maxScroll; y += 400) {
        await page.evaluate((pos) => window.scrollTo(0, pos), y);
        await page.waitForTimeout(20);
      }
      await page.waitForTimeout(500);

      const eraInDom = await page.evaluate(() => {
        const found = [];
        document.querySelectorAll('img').forEach(img => {
          const src = img.getAttribute('src') || '';
          const srcset = img.getAttribute('srcset') || '';
          const currentSrc = img.currentSrc || '';
          const str = (src + ' ' + srcset + ' ' + currentSrc).toLowerCase();
          if (str.includes('era-residence') || str.includes('6a15') || str.includes('6a0f') || str.includes('6a25') || str.includes('6a34') || str.includes('6a54') || str.includes('6a38') || str.includes('file_mlb') || str.includes('file_snb')) {
            found.push({
              src,
              currentSrc,
              srcset: srcset.slice(0, 80),
              alt: img.getAttribute('alt')
            });
          }
        });
        return found;
      });

      console.log(`[${vp.name.toUpperCase()}] DOM Violations: ${eraInDom.length} | Network Requests to ERA: ${eraRequests.length}`);
      if (eraInDom.length > 0) {
        eraInDom.forEach(v => console.log('   DOM:', v));
        totalViolations += eraInDom.length;
      }
      if (eraRequests.length > 0) {
        eraRequests.forEach(r => console.log('   REQ:', r));
        totalViolations += eraRequests.length;
      }

      await page.close();
    }
  }

  console.log(`\n================ SUMMARY ================`);
  console.log(`Total remaining ERA image violations: ${totalViolations}`);
  await browser.close();
})();

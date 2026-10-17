const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fs = require('fs');
const path = require('path');

const viewports = [
  { name: '1440x900_desktop', width: 1440, height: 900 },
  { name: '1280x800_laptop', width: 1280, height: 800 },
  { name: '768x1024_tablet', width: 768, height: 1024 },
  { name: '390x844_mobile', width: 390, height: 844 }
];

const outDir = path.join(__dirname, 'verification_results');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });

  for (const vp of viewports) {
    try {
      console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();

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

      // Check horizontal overflow
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      console.log(`Horizontal overflow: ${hasHorizontalOverflow ? 'FAILED (has overflow)' : 'PASSED (no overflow)'}`);

      // Find interior heading location
      const info = await page.evaluate(() => {
        const title = document.querySelector('.interior-s_title');
        const section = document.querySelector('.section-interior-arch');
        if (!title) return null;
        const tr = title.getBoundingClientRect();
        return {
          titleTop: tr.top + window.scrollY,
          titleWidth: tr.width,
          viewportWidth: window.innerWidth
        };
      });

      console.log('Title info:', info);

      if (info) {
        // Scroll target 1: Arch entry
        const y1 = Math.max(0, Math.round(info.titleTop - vp.height * 0.65));
        await page.evaluate((y) => window.scrollTo(0, y), y1);
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(outDir, `${vp.name}_entry.png`) });
        console.log(`Saved ${vp.name}_entry.png`);

        // Scroll target 2: Heading centered
        const y2 = Math.max(0, Math.round(info.titleTop - vp.height * 0.4));
        await page.evaluate((y) => window.scrollTo(0, y), y2);
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(outDir, `${vp.name}_centered.png`) });
        console.log(`Saved ${vp.name}_centered.png`);

        // Inspect metrics
        const metrics = await page.evaluate(() => {
          const title = document.querySelector('.interior-s_title');
          const line = title.querySelector('.interior-line');
          const h3 = title.querySelector('h3');
          const section = document.querySelector('.section-interior-arch');

          const tr = title.getBoundingClientRect();
          const lr = line ? line.getBoundingClientRect() : null;
          const hr = h3 ? h3.getBoundingClientRect() : null;

          return {
            titleWidth: tr.width,
            titleLeft: tr.left,
            lineText: line ? line.innerText : '',
            lineWidth: lr ? lr.width : 0,
            h3Text: h3 ? h3.innerText : '',
            h3Width: hr ? hr.width : 0,
            isCentered: Math.abs((tr.left + tr.width / 2) - window.innerWidth / 2) < 25,
            isInside: tr.left >= 0 && tr.right <= window.innerWidth
          };
        });
        console.log('Metrics:', metrics);
      }

      await context.close();
    } catch (err) {
      console.error(`Error on ${vp.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('\nAll viewports done!');
})();

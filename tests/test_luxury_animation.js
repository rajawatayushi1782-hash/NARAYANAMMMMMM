const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 390, height: 844 }
  ];

  const outDir = path.join(__dirname, 'luxury_animation_screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const results = [];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    
    // Catch console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
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

    // Scroll to the editorial section (.loc-info-w)
    await page.evaluate(() => {
      const el = document.querySelector('.loc-info-w');
      if (el) el.scrollIntoView();
    });
    await page.waitForTimeout(1200);

    // Screenshot of the editorial section in viewport
    const screenshotPath = path.join(outDir, `editorial_${vp.name}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`Saved ${screenshotPath}`);

    // Verify DOM and visibility states
    const evalResult = await page.evaluate(() => {
      const flowerVideos = Array.from(document.querySelectorAll('.flower video'));
      const visibleFlowers = flowerVideos.filter(v => {
        const cs = window.getComputedStyle(v);
        const rect = v.getBoundingClientRect();
        return cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0' && rect.width > 0 && rect.height > 0;
      });

      const luxuryContainer = document.querySelector('.editorial-luxury-fx');
      const particles = Array.from(document.querySelectorAll('.gold-particle'));
      const sunlight = document.querySelector('.sunlight-caustic');
      const shadow = document.querySelector('.shadow-breeze');
      const heading = document.querySelector('.info-s_lead h3');

      return {
        visibleFlowerCount: visibleFlowers.length,
        hasLuxuryContainer: !!luxuryContainer,
        particleCount: particles.length,
        sunlightActive: !!sunlight && window.getComputedStyle(sunlight).display !== 'none',
        shadowActive: !!shadow && window.getComputedStyle(shadow).display !== 'none',
        headingVisible: !!heading && window.getComputedStyle(heading).display !== 'none',
        headingText: heading ? heading.textContent.trim().slice(0, 50) : ''
      };
    });

    results.push({
      viewport: vp.name,
      evalResult,
      consoleErrors
    });

    await page.close();
  }

  console.log('Test Results:\n', JSON.stringify(results, null, 2));

  await browser.close();
})();

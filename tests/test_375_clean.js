const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });

  await page.addInitScript(() => {
    sessionStorage.setItem('hasVisited', 'true');
    localStorage.setItem('cookies', 'accepted');
  });

  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const p = document.querySelector('[data-preloader]');
    if (p) p.style.display = 'none';
  });
  await page.waitForTimeout(500);

  const res = await page.evaluate(() => {
    const sw = document.documentElement.scrollWidth;
    const bw = document.body.scrollWidth;
    const maxW = Math.max(sw, bw);
    return {
      scrollWidth: sw,
      bodyScrollWidth: bw,
      innerWidth: window.innerWidth,
      overflowing: maxW > window.innerWidth
    };
  });

  console.log('375px Viewport Width Check:', res);

  // Scroll down full page to ensure no overflow at any scroll position
  let scrolledOverflow = false;
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  for (let y = 0; y <= maxScroll; y += 400) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(30);
    const check = await page.evaluate(() => {
      const w = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
      return w > window.innerWidth;
    });
    if (check) scrolledOverflow = true;
  }

  console.log('Any horizontal overflow during scrolling:', scrolledOverflow ? 'YES' : 'NO (Perfect!)');

  await page.screenshot({ path: 'tests/screenshot_375_clean.png' });
  console.log('Saved screenshot_375_clean.png');

  await browser.close();
})();

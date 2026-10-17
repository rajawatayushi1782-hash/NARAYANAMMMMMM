const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    sessionStorage.setItem('hasVisited', 'true');
    localStorage.setItem('cookies', 'accepted');
  });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  const res = await page.evaluate(() => {
    const list = Array.from(document.querySelectorAll('[data-scroll-reveal="h"]')).map(el => ({
      tag: el.tagName,
      className: el.className,
      text: el.textContent.trim().substring(0, 30),
      hasSplit: !!el._split
    }));
    return list;
  });
  console.log('Reveal H elements:', res);
  await browser.close();
})();

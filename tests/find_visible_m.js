const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    sessionStorage.setItem('hasVisited', 'true');
    localStorage.setItem('cookies', 'accepted');
  });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  const mElements = await page.evaluate(() => {
    window.scrollTo(0, 6181);
    const visibleM = [];
    document.querySelectorAll('*').forEach(el => {
      if (el.children.length === 0 && el.textContent.trim() === 'M') {
        const r = el.getBoundingClientRect();
        // check if visible within viewport (0 to 1440, 0 to 900)
        if (r.right > 0 && r.left < 1440 && r.bottom > 0 && r.top < 900) {
          visibleM.push({
            tagName: el.tagName,
            className: el.className,
            text: el.textContent,
            rect: { x: r.x, y: r.y, width: r.width, height: r.height },
            outerHTML: el.outerHTML,
            parentHTML: el.parentElement ? el.parentElement.outerHTML : ''
          });
        }
      }
    });
    return visibleM;
  });

  console.log('Visible M elements at 6181:', JSON.stringify(mElements, null, 2));
  await browser.close();
})();

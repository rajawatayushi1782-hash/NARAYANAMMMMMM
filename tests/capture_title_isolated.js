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
  await page.waitForTimeout(2000);

  // Reveal all split chars in loc-intro-s
  await page.evaluate(() => {
    const title = document.querySelector('.loc-intro-s_title');
    if (title) {
      title.querySelectorAll('*').forEach(el => {
        if (el._split && el._split.chars) {
          gsap.set(el._split.chars, { opacity: 1, yPercent: 0, rotateY: 0, x: 0 });
        }
      });
      const lines = title.querySelectorAll('.loc-intro-s_title_line');
      lines.forEach(l => {
        gsap.set(l, { opacity: 1, visibility: 'visible' });
      });
    }

    const desc = document.querySelector('.loc-intro-s_desc');
    if (desc) {
      desc.querySelectorAll('*').forEach(el => {
        if (el._split && el._split.lines) {
          gsap.set(el._split.lines, { opacity: 1, yPercent: 0 });
        }
      });
    }
  });

  const titleHandle = await page.$('.loc-intro-s_title');
  if (titleHandle) {
    await titleHandle.screenshot({ path: 'tests/exact_check_screenshots/02_desktop_royal_gwalior_title_isolated.png' });
    console.log('Saved 02_desktop_royal_gwalior_title_isolated.png');
  }

  const descHandle = await page.$('.loc-intro-s_desc');
  if (descHandle) {
    await descHandle.screenshot({ path: 'tests/exact_check_screenshots/02_desktop_kalpi_bridge_desc.png' });
    console.log('Saved 02_desktop_kalpi_bridge_desc.png');
  }
  await browser.close();
})();

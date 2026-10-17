const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.addInitScript(() => {
    sessionStorage.setItem('hasVisited', 'true');
    localStorage.setItem('cookies', 'accepted');
  });

  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
  
  // Wait for preloader to dismiss
  try {
    await page.waitForFunction(() => {
      const p = document.querySelector('[data-preloader]');
      return !p || getComputedStyle(p).display === 'none';
    }, { timeout: 8000 });
  } catch (e) {
    await page.evaluate(() => {
      const p = document.querySelector('[data-preloader]');
      if (p) p.style.display = 'none';
    });
  }
  
  await page.waitForTimeout(1500);

  // Take screenshot of hero/top viewport
  const screenshotDir = path.join(__dirname, 'white_boxes_investigation');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  await page.screenshot({ path: path.join(screenshotDir, '01_initial_desktop.png') });
  console.log('Saved 01_initial_desktop.png');

  // Let's inspect the DOM elements matching the description:
  // 1. Logo at top-left
  // 2. Page number and vertical progress indicator
  // 3. SCROLL label and downward arrow
  // 4. ROOMS & SUITES, BOOK STAY, CONTACT
  const elementsInfo = await page.evaluate(() => {
    function getDetails(el) {
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const parent = el.parentElement;
      const parentCs = parent ? window.getComputedStyle(parent) : null;
      return {
        tag: el.tagName,
        className: el.className,
        id: el.id,
        text: el.innerText ? el.innerText.trim().slice(0, 50) : '',
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        bg: cs.backgroundColor,
        bgImg: cs.backgroundImage,
        boxShadow: cs.boxShadow,
        border: cs.border,
        parentBg: parentCs ? parentCs.backgroundColor : null,
        parentClass: parent ? parent.className : null
      };
    }

    // Find candidates
    const all = Array.from(document.querySelectorAll('*'));
    
    // Find elements with white background rgb(255, 255, 255) or #fff or rgba(255,255,255,...)
    const whiteBgEls = all.filter(el => {
      const cs = window.getComputedStyle(el);
      const bg = cs.backgroundColor;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;
      // Check if bg is white or near white
      const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (m) {
        const r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3]), a = m[4] !== undefined ? parseFloat(m[4]) : 1;
        if (r > 240 && g > 240 && b > 240 && a > 0.1) {
          return true;
        }
      }
      return false;
    }).map(el => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        className: el.className,
        bg: cs.backgroundColor,
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(rect.width), h: Math.round(rect.height) },
        text: (el.innerText || '').slice(0, 40).replace(/\n/g, ' ')
      };
    });

    // Also look for nav, logo, scroll, progress specifically
    const header = document.querySelector('header') || document.querySelector('.header') || document.querySelector('[data-header]');
    const logo = document.querySelector('[class*="logo"]') || document.querySelector('a[href="/"]');
    const scroll = document.querySelector('[class*="scroll"]');
    const nav = document.querySelector('nav') || document.querySelector('[class*="nav"]');

    return {
      whiteBgEls: whiteBgEls.slice(0, 30),
      headerDetails: getDetails(header),
      logoDetails: getDetails(logo)
    };
  });

  console.log('Inspection result:', JSON.stringify(elementsInfo, null, 2));

  await browser.close();
})();

const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspect() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const urls = [
    'http://localhost:3000/',
    'http://localhost:3000/apartments',
    'http://localhost:3000/apartments/011'
  ];

  for (const url of urls) {
    console.log(`\n========================================\nINSPECTING: ${url}`);
    const page = await browser.newPage();
    page.on('console', msg => console.log(`[Browser ${url}] ${msg.type()}: ${msg.text()}`));
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const info = await page.evaluate(() => {
      const pins = Array.from(document.querySelectorAll('.pin, [hover-pin], [data-pin], .contact-s_map_pin_c, [data-modal-tip-btn]')).map(el => ({
        tag: el.tagName,
        className: el.className,
        parentClass: el.parentElement ? el.parentElement.className : '',
        attributes: Array.from(el.attributes).map(a => `${a.name}="${a.value}"`).join(' '),
        text: el.innerText.trim().slice(0, 50),
        rect: el.getBoundingClientRect()
      }));

      const modalTips = Array.from(document.querySelectorAll('[data-modal-tip], [floating-tip], .floating-tip-card, .modal')).map(el => ({
        tag: el.tagName,
        className: el.className,
        attributes: Array.from(el.attributes).map(a => `${a.name}="${a.value}"`).join(' '),
        html: el.innerHTML.slice(0, 200),
        rect: el.getBoundingClientRect(),
        hasImg: el.querySelectorAll('img').length,
        imgs: Array.from(el.querySelectorAll('img')).map(i => ({
          src: i.src,
          className: i.className,
          naturalWidth: i.naturalWidth,
          naturalHeight: i.naturalHeight,
          width: i.width,
          height: i.height,
          display: window.getComputedStyle(i).display,
          visibility: window.getComputedStyle(i).visibility
        }))
      }));

      return { pins, modalTips };
    });

    console.log(`Found ${info.pins.length} pin elements:`);
    info.pins.forEach((p, idx) => {
      console.log(`  [Pin ${idx+1}] ${p.className} | Attrs: ${p.attributes} | Pos: (${Math.round(p.rect.x)}, ${Math.round(p.rect.y)}, w:${Math.round(p.rect.width)}, h:${Math.round(p.rect.height)})`);
    });

    console.log(`Found ${info.modalTips.length} modal/floating tip elements:`);
    info.modalTips.forEach((m, idx) => {
      console.log(`  [Tip/Modal ${idx+1}] ${m.className} | Attrs: ${m.attributes} | imgs: ${m.hasImg}`);
      if (m.imgs.length > 0) {
        console.log('    imgs:', JSON.stringify(m.imgs));
      }
    });

    await page.close();
  }

  await browser.close();
}

inspect().catch(err => {
  console.error(err);
  process.exit(1);
});

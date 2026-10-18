const fs = require('fs');
const r = JSON.parse(fs.readFileSync('tests/audit_report.json', 'utf8'));

console.log('=== DESKTOP VS MOBILE ERA IMAGES COMPARISON ===\n');

['desktop', 'mobile'].forEach(mode => {
  console.log(`\n================== ${mode.toUpperCase()} ==================`);
  r[mode].eraImagesInDom.forEach((item, idx) => {
    console.log(`\n[${idx+1}] Type: ${item.type} | Parent: ${item.parentClass || item.className}`);
    if (item.type === 'img') {
      console.log(`     src:        ${item.src}`);
      console.log(`     currentSrc: ${item.currentSrc}`);
      console.log(`     srcset:     ${item.srcset ? item.srcset.slice(0, 120) + '...' : 'none'}`);
      console.log(`     visible:    ${item.visible}`);
    } else {
      console.log(`     bg: ${item.backgroundImage}`);
    }
  });

  console.log(`\n--- Network Requests (${mode}): ---`);
  r[mode].eraRequests.forEach(req => console.log('  ', req));
});

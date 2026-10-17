const fs = require('fs');

const slater = fs.readFileSync('public/js/slater.js', 'utf-8');

function findOccurrences(term) {
  let idx = 0;
  console.log(`=== References to "${term}" in slater.js ===`);
  while ((idx = slater.indexOf(term, idx)) !== -1) {
    const start = Math.max(0, idx - 80);
    const end = Math.min(slater.length, idx + 80);
    console.log(slater.substring(start, end).replace(/\n/g, ' '));
    idx += term.length;
  }
}

findOccurrences('flower');
findOccurrences('loc-info');
findOccurrences('ctn-down');

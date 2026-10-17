const fs = require('fs');

const slater = fs.readFileSync('public/js/slater.js', 'utf-8');

function findRefs(term) {
  let idx = 0;
  console.log(`=== References to "${term}" in slater.js ===`);
  while ((idx = slater.indexOf(term, idx)) !== -1) {
    const start = Math.max(0, idx - 100);
    const end = Math.min(slater.length, idx + 100);
    console.log(slater.substring(start, end).replace(/\n/g, ' '));
    idx += term.length;
  }
}

findRefs('arch');
findRefs('interior-w');
findRefs('interior');
findRefs('borderRadius');
findRefs('borderTop');

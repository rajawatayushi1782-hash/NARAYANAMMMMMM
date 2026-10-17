const fs = require('fs');

function searchAll(term) {
  console.log(`=== Searching for "${term}" in all test and code files ===`);
  const files = ['public/css/era-residence.min.css', 'public/css/narayanam-theme.css', 'public/js/slater.js', 'index.html'];
  files.forEach(f => {
    const c = fs.readFileSync(f, 'utf-8');
    const count = (c.match(new RegExp(term, 'gi')) || []).length;
    if (count > 0) console.log(`  ${f}: ${count} occurrences`);
  });
}

searchAll('section.arch');
searchAll('border-top-left-radius');
searchAll('interior-w');
searchAll('interior-s');

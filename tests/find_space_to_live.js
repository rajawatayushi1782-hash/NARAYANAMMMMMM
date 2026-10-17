const fs = require('fs');

function searchContent(filename, query) {
  const content = fs.readFileSync(filename, 'utf-8');
  let idx = 0;
  console.log(`=== Searching for "${query}" in ${filename} ===`);
  while ((idx = content.toLowerCase().indexOf(query.toLowerCase(), idx)) !== -1) {
    const start = Math.max(0, idx - 150);
    const end = Math.min(content.length, idx + 250);
    console.log(`Match at ${idx}:`);
    console.log(content.substring(start, end).replace(/\n/g, ' '));
    idx += query.length;
  }
}

searchContent('index.html', 'THE SPACE TO');
searchContent('public/js/slater.js', 'space to');
searchContent('public/css/era-residence.min.css', 'arch');

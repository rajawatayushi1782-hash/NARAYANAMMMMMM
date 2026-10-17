const fs = require('fs');
const path = require('path');

function searchBougainvillea(file) {
  const content = fs.readFileSync(file, 'utf-8');
  const count = (content.match(/bougainvillea/gi) || []).length;
  if (count > 0) {
    console.log(`${file}: ${count} occurrences`);
  }
}

searchBougainvillea('index.html');
searchBougainvillea('apartments.html');
searchBougainvillea('contact.html');

const pagesDir = 'apartments_pages';
if (fs.existsSync(pagesDir)) {
  fs.readdirSync(pagesDir).forEach(f => searchBougainvillea(path.join(pagesDir, f)));
}

const fs = require('fs');
const path = require('path');

// Search index.html for flower images or decor elements around "THE CONCEPT"
const indexHtml = fs.readFileSync('index.html', 'utf-8');

// Find section with "THE CONCEPT"
const conceptIdx = indexHtml.indexOf('THE CONCEPT');
if (conceptIdx !== -1) {
  const start = Math.max(0, conceptIdx - 1500);
  const end = Math.min(indexHtml.length, conceptIdx + 2500);
  console.log('=== CONTEXT AROUND "THE CONCEPT" ===');
  console.log(indexHtml.substring(start, end));
}

// Search for flower / decor / bougainvillea / img in assets
const assetDir = path.join(__dirname, '../public/assets');
function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      searchDir(full);
    } else {
      if (f.toLowerCase().includes('flower') || f.toLowerCase().includes('petal') || f.toLowerCase().includes('bougain') || f.toLowerCase().includes('decor')) {
        console.log('Found asset:', full);
      }
    }
  }
}
searchDir(assetDir);

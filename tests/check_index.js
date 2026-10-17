const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
const lines = html.split('\n');

const words = ['Estepona', 'era-residence', 'era_residence', 'Swiss Technology', 'Unreal'];

for (const w of words) {
  console.log(`\n=== Matches for: ${w} ===`);
  lines.forEach((line, idx) => {
    if (line.toLowerCase().includes(w.toLowerCase())) {
      console.log(`Line ${idx + 1}: ${line.trim().substring(0, 140)}...`);
    }
  });
}

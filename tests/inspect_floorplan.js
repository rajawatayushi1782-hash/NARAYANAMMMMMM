const fs = require('fs');
const html = fs.readFileSync('apartments_pages/011.html', 'utf-8');

let pos = 0;
while ((pos = html.indexOf('6a345dcc', pos)) !== -1) {
  const start = Math.max(0, pos - 100);
  const end = Math.min(html.length, pos + 250);
  console.log(`Found 6a345dcc at ${pos}:`);
  console.log(html.substring(start, end));
  pos += 8;
}

// Also search for SELECT AN APARTMENT
pos = 0;
while ((pos = html.indexOf('Select', pos)) !== -1) {
  const start = Math.max(0, pos - 40);
  const end = Math.min(html.length, pos + 120);
  console.log(`Found Select at ${pos}: ${html.substring(start, end).replace(/\n/g, ' ')}`);
  pos += 6;
}

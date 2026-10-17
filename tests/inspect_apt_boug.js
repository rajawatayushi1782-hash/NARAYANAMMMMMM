const fs = require('fs');

const apt = fs.readFileSync('apartments.html', 'utf-8');
apt.split('\n').forEach((line, i) => {
  if (line.includes('bougainvillea')) {
    console.log(`apartments.html L${i+1}: ${line.trim().slice(0, 150)}`);
  }
});

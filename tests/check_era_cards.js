const https = require('https');

https.get('https://www.era-residence.com/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    let idx = 0;
    while ((idx = data.indexOf('floating-tip-card', idx)) !== -1) {
      console.log('--- FOUND floating-tip-card at ' + idx + ' ---');
      console.log(data.slice(Math.max(0, idx - 100), Math.min(data.length, idx + 1200)));
      idx += 20;
    }
  });
}).on('error', err => console.error(err));

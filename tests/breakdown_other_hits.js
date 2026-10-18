const fs = require('fs');
const audit = JSON.parse(fs.readFileSync('tests/full_repo_era_audit.json', 'utf8'));

['apartments.html', 'contact.html', 'public/css/narayanam-theme.css'].forEach(file => {
  console.log(`\n=================== ${file} ===================`);
  const hits = audit[file] || [];
  hits.forEach((h, i) => {
    console.log(`[${i+1}] ${h.match}: ${h.snippet}`);
  });
});

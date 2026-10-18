const fs = require('fs');
const audit = JSON.parse(fs.readFileSync('tests/full_repo_era_audit.json', 'utf8'));

console.log('=== BREAKDOWN OF INDEX.HTML OCCURRENCES ===\n');
const indexHits = audit['index.html'] || [];
const grouped = {};

indexHits.forEach(hit => {
  const key = hit.match;
  if (!grouped[key]) grouped[key] = [];
  grouped[key].push(hit.snippet);
});

for (const [match, snippets] of Object.entries(grouped)) {
  console.log(`\nMatch: "${match}" (${snippets.length} times)`);
  console.log(`Example: ${snippets[0]}`);
}

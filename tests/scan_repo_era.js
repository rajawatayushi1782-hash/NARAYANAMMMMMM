const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const extensions = ['.html', '.js', '.css'];

const patterns = [
  /era-residence/gi,
  /6a0f[a-z0-9_.-]+/gi,
  /6a15[a-z0-9_.-]+/gi,
  /6a25[a-z0-9_.-]+/gi,
  /6a34[a-z0-9_.-]+/gi,
  /6a38[a-z0-9_.-]+/gi,
  /6a54[a-z0-9_.-]+/gi,
  /bougainvillea/gi,
  /Estepona/gi,
  /Málaga/gi,
  /Costa del Sol/gi
];

function scanDir(dir, results = {}) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === 'tests') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full, results);
    } else if (extensions.includes(path.extname(f))) {
      const content = fs.readFileSync(full, 'utf8');
      const fileHits = [];
      patterns.forEach(pat => {
        let m;
        while ((m = pat.exec(content)) !== null) {
          fileHits.push({
            pattern: pat.source,
            match: m[0],
            index: m.index,
            snippet: content.slice(Math.max(0, m.index - 60), Math.min(content.length, m.index + 80)).replace(/\n/g, ' ')
          });
        }
      });
      if (fileHits.length > 0) {
        results[path.relative(rootDir, full)] = fileHits;
      }
    }
  }
  return results;
}

const audit = scanDir(rootDir);
console.log('=== FILES WITH ERA / UNTRANSFORMED REFERENCES ===\n');
for (const [file, hits] of Object.entries(audit)) {
  console.log(`${file}: ${hits.length} occurrences`);
}

fs.writeFileSync(path.join(__dirname, 'full_repo_era_audit.json'), JSON.stringify(audit, null, 2));
console.log('\nSaved full_repo_era_audit.json');

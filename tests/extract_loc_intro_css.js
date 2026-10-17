const fs = require('fs');

const cssFiles = [
  'public/css/era-residence.min.css',
  'public/css/narayanam-theme.css'
];

cssFiles.forEach(file => {
  console.log(`\n=================== ${file} ===================`);
  const content = fs.readFileSync(file, 'utf8');

  // Match media queries and rules inside
  const regex = /(@media[^{]+)\{([\s\S]+?\}\s*\})/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const mq = match[1];
    const body = match[2];
    if (body.includes('loc-intro')) {
      console.log(`\n--- Media Query: ${mq} ---`);
      // Find rules with loc-intro
      const ruleRegex = /([^{}]+)\{([^{}]+)\}/g;
      let rMatch;
      while ((rMatch = ruleRegex.exec(body)) !== null) {
        if (rMatch[1].includes('loc-intro')) {
          console.log(`${rMatch[1].trim()} { ${rMatch[2].trim()} }`);
        }
      }
    }
  }

  // Also base rules (outside @media)
  console.log(`\n--- Base Rules (No Media Query) ---`);
  const baseRegex = /([^{}]+)\{([^{}]+)\}/g;
  let bMatch;
  while ((bMatch = baseRegex.exec(content)) !== null) {
    if (bMatch[1].includes('loc-intro') && !bMatch[1].includes('@media')) {
      console.log(`${bMatch[1].trim()} { ${bMatch[2].trim()} }`);
    }
  }
});

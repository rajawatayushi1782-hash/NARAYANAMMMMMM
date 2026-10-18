const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

const imgRegex = /<img\b([^>]*)>/gi;
let match;
const images = [];

while ((match = imgRegex.exec(content)) !== null) {
  const fullTag = match[0];
  const attrs = match[1];
  const charIndex = match.index;
  // Calculate line number
  const lineNo = content.slice(0, charIndex).split('\n').length;

  const srcMatch = attrs.match(/src="([^"]*)"/i);
  const srcsetMatch = attrs.match(/srcset="([^"]*)"/i);
  const altMatch = attrs.match(/alt="([^"]*)"/i);
  const classMatch = attrs.match(/class="([^"]*)"/i);

  // Look backwards for closest section or div class
  const preceding = content.slice(Math.max(0, charIndex - 600), charIndex);
  const sectionMatch = preceding.match(/<(?:section|div)[^>]*(?:class|id)="([^"]*)"[^>]*>[^<]*$/i) ||
                       preceding.match(/class="([^"]*(?:hero|intro|concept|quote|facility|apart|gallery|arch|contact|footer|lot|slider)[^"]*)"/i);

  images.push({
    lineNo,
    sectionContext: sectionMatch ? sectionMatch[1] : 'unknown',
    src: srcMatch ? srcMatch[1] : null,
    srcset: srcsetMatch ? srcsetMatch[1] : null,
    alt: altMatch ? altMatch[1] : null,
    className: classMatch ? classMatch[1] : null
  });
}

console.log(`Found ${images.length} <img> tags in index.html:\n`);
images.forEach((img, i) => {
  console.log(`[${i + 1}] Line ${img.lineNo} | Context: "${img.sectionContext}"`);
  console.log(`     src:    ${img.src}`);
  console.log(`     srcset: ${img.srcset ? (img.srcset.includes('6a') || img.srcset.includes('era') ? 'HAS ERA ASSETS: ' + img.srcset.slice(0, 80) + '...' : 'Clean') : 'none'}`);
  console.log(`     alt:    ${img.alt ? img.alt.slice(0, 60) : 'none'}`);
  console.log('');
});

fs.writeFileSync('tests/index_images_mapped.json', JSON.stringify(images, null, 2));

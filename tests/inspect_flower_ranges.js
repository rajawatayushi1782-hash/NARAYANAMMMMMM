const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const lines = html.split('\n');

function inspectRange(start, end, label) {
  console.log(`\n=================== ${label} (Lines ${start}-${end}) ===================`);
  console.log(lines.slice(start - 1, end).join('\n'));
}

inspectRange(2095, 2150, 'FLOWER 1');
inspectRange(2175, 2210, 'FLOWER 2');
inspectRange(2215, 2245, 'FLOWER 3');
inspectRange(2605, 2635, 'FLOWER 4');
inspectRange(2885, 2915, 'FLOWER 6');
inspectRange(3055, 3090, 'FLOWER 5 & 7');
inspectRange(3315, 3345, 'FLOWER 7 (repeat)');

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/screens/Newsroom/Newsroom.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// The correct replacement block — plain strings only
const replacement = `          setPodcasts([
            {
              ep: "EP. 12",
              title: "Bâtir l'Afrique : conversation avec les architectes du continent",
              sub: "Diébédo Francis Kéré · Pierre Goudiaby Atepa",
              time: "48 min",
              img: "https://cdn.sanity.io/images/d4jrc26i/production/32a05929e0c85e9f6f605fef2a18c2735e99e88f-519x779.jpg",
            },
            {
              ep: "EP. 11",
              title: "Diaspora & capital : structurer les flux d'investissement vers l'Afrique",
              sub: "Acha Leke · Mossadeck Bally",
              time: "52 min",
              img: "https://cdn.sanity.io/images/d4jrc26i/production/1683d30a74ec909b4c7110be972c49bb03bad187-666x999.jpg",
            },
            {
              ep: "EP. 10",
              title: "Sport & industries créatives : l'Afrique comme puissance d'influence",
              sub: "Mamadou Gaye · Aliou Cissé",
              time: "41 min",
              img: "https://cdn.sanity.io/images/d4jrc26i/production/2885c31225d904fdbd82a2188d5890950b970ce4-562x999.jpg",
            },
          ]);`;

// Match the broken setPodcasts block
const pattern = /setPodcasts\(\[[\s\S]*?\]\);/;

if (pattern.test(content)) {
  content = content.replace(pattern, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('SUCCESS: File fixed!');
} else {
  console.log('Pattern not found.');
}

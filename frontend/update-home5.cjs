const fs = require('fs');
let content = fs.readFileSync('C:/lawfirm/frontend/src/pages/Home.jsx', 'utf8');
content = content.replace('<div className="section-head center reveal">', '<div className="section-head reveal">');
fs.writeFileSync('C:/lawfirm/frontend/src/pages/Home.jsx', content);

const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
function copy(src, dst) {
  if (!fs.existsSync(src)) return;
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const name of fs.readdirSync(src)) copy(path.join(src, name), path.join(dst, name));
  } else {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}
// Static files required by rewritten Vercel routes.
copy(path.join(root, 'admin'), path.join(out, 'admin'));
copy(path.join(root, 'client', 'access.html'), path.join(out, 'access.html'));
copy(path.join(root, 'client', 'style.css'), path.join(out, 'client', 'style.css'));
copy(path.join(root, 'client', 'javascript.js'), path.join(out, 'client', 'javascript.js'));
copy(path.join(root, 'client', 'album.html'), path.join(out, 'album.html'));
copy(path.join(root, 'client', 'album.css'), path.join(out, 'album.css'));
copy(path.join(root, 'client', 'album.js'), path.join(out, 'album.js'));
copy(path.join(root, 'public', 'asset'), path.join(out, 'asset'));
console.log('Vercel static output prepared at dist/.');

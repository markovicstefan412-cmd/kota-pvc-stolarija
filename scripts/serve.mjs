// Mali lokalni server za pregled sajta iz foldera docs/.
// Pokretanje: npm run serve, pa otvorite adresu koju ispiše.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sajt } from '../src/firma.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const PUB = join(root, 'docs');
const BASE = sajt.osnova || '';
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon'
};

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  // Isto kao na GitHub Pages: sajt živi ispod osnove (npr. /kota-pvc-stolarija/).
  if (BASE && (path === '/' || path === BASE)) { res.writeHead(302, { Location: BASE + '/' }).end(); return; }
  if (BASE && path.startsWith(BASE + '/')) path = path.slice(BASE.length);
  const file = normalize(join(PUB, path));
  if (!file.startsWith(PUB)) { res.writeHead(403).end(); return; }
  try {
    const f = (await stat(file)).isDirectory() ? join(file, 'index.html') : file;
    const body = await readFile(f);
    res.writeHead(200, { 'Content-Type': TYPES[extname(f)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    const body = await readFile(join(PUB, '404.html')).catch(() => 'Nije pronađeno');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(body);
  }
}).listen(PORT, () => console.log(`Sajt radi na http://localhost:${PORT}${BASE}/`));

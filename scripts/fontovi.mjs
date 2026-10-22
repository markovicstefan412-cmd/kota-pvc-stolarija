// Preuzima fontove sa Google Fonts (samo latin i latin-ext, dovoljno za srpsku latinicu)
// u docs/assets/fonts i pravi src/generated/fontovi.css sa lokalnim putanjama.
// Pokretanje: npm run fontovi (jednom, rezultat se čuva).
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(root, 'docs', 'assets', 'fonts');
const GEN = join(root, 'src', 'generated');
mkdirSync(OUT, { recursive: true });
mkdirSync(GEN, { recursive: true });

const CSS_URL = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..800&family=Instrument+Sans:wght@400..600&family=JetBrains+Mono:wght@400..500&display=swap';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

const css = await (await fetch(CSS_URL, { headers: { 'User-Agent': UA } })).text();
const blocks = css.split('/* ').slice(1);
let out = '';
const files = [];
for (const b of blocks) {
  const subset = b.slice(0, b.indexOf(' */'));
  if (subset !== 'latin' && subset !== 'latin-ext') continue;
  const face = b.slice(b.indexOf('@font-face'));
  const family = face.match(/font-family: '([^']+)'/)[1];
  const url = face.match(/url\((https:[^)]+)\)/)[1];
  const name = `${family.toLowerCase().replace(/\s+/g, '-')}-${subset}.woff2`;
  if (!files.includes(name)) {
    const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
    writeFileSync(join(OUT, name), buf);
    files.push(name);
    console.log(`${name}: ${Math.round(buf.length / 1024)} KB`);
  }
  out += `/* ${subset} */\n` + face.replace(url, `/assets/fonts/${name}`).trim() + '\n';
}
writeFileSync(join(GEN, 'fontovi.css'), out);
console.log('Gotovo.');

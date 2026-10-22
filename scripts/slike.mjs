// Pravi optimizovane WebP verzije svih slika iz izvor/slike u docs/assets/img
// i upisuje src/generated/slike.json (dimenzije i dostupne širine za srcset).
// Pokretanje: npm run slike (treba ffmpeg u PATH-u).
import { execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(root, 'izvor', 'slike');
const OUT = join(root, 'docs', 'assets', 'img');
const GEN = join(root, 'src', 'generated');
mkdirSync(OUT, { recursive: true });
mkdirSync(GEN, { recursive: true });

const STEPS = [480, 800, 1200, 1600];

function probe(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file]).toString().trim();
  const [w, h] = out.split(',').map(Number);
  return { w, h };
}

function ff(args) {
  execFileSync('ffmpeg', ['-y', '-v', 'error', ...args], { stdio: 'inherit' });
}

const manifest = {};
for (const name of readdirSync(SRC).sort()) {
  const { name: slug, ext } = parse(name);
  const file = join(SRC, name);
  const { w, h } = probe(file);
  const entry = { w, h, widths: [] };

  if (ext === '.png') {
    // Providni delovi hero prozora: jedna veličina, WebP sa alfa kanalom.
    const out = join(OUT, `${slug}-${w}.webp`);
    if (!existsSync(out)) ff(['-i', file, '-c:v', 'libwebp', '-pix_fmt', 'yuva420p', '-quality', '90', '-compression_level', '6', out]);
    entry.widths = [w];
  } else if (ext === '.webp' && w <= 600) {
    // Male fotografije proizvoda su već optimizovane, samo ih kopiramo.
    const out = join(OUT, `${slug}-${w}.webp`);
    if (!existsSync(out)) copyFileSync(file, out);
    entry.widths = [w];
  } else {
    const widths = STEPS.filter((s) => s < w);
    widths.push(Math.min(w, 1920));
    for (const tw of widths) {
      const out = join(OUT, `${slug}-${tw}.webp`);
      if (!existsSync(out)) ff(['-i', file, '-vf', `scale=${tw}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '76', '-compression_level', '6', out]);
    }
    entry.widths = widths;
  }
  manifest[slug] = entry;
  console.log(`${slug}: ${entry.widths.join(', ')}`);
}

// Slika za deljenje na mrežama (Open Graph), 1200x630 JPEG.
const og = join(OUT, 'og-kota-stolarija.jpg');
if (!existsSync(og)) ff(['-i', join(SRC, 'hero-spavaca-soba-pogled-na-jezero.jpg'), '-vf', 'scale=1200:-2:flags=lanczos,crop=1200:630', '-q:v', '3', og]);

writeFileSync(join(GEN, 'slike.json'), JSON.stringify(manifest, null, 2));
console.log(`Gotovo: ${Object.keys(manifest).length} slika.`);

// Generiše ceo sajt u folder docs/: sve HTML stranice, CSS, JS, sitemap.xml,
// robots.txt, manifest, favicon i .htaccess. Pokretanje: npm run build
// (docs/ je folder koji GitHub Pages objavljuje; isti folder ide i na običan hosting.)
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { firma, sajt } from './firma.mjs';
import { KATEGORIJE, MODELI, urlKategorije, urlModela } from './katalog.mjs';
import { pocetna } from './stranice/pocetna.mjs';
import { kategorijaStranica } from './stranice/kategorija.mjs';
import { proizvodStranica } from './stranice/proizvod.mjs';
import { kontaktStranica, greskaStranica } from './stranice/kontakt.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const PUB = join(root, 'docs');
const SRC = join(root, 'src');
const B = sajt.osnova || '';

// Kada sajt nije na korenu domena, svim internim putanjama dodaje se osnova.
const saOsnovom = (html) => (!B ? html : html
  .replace(/(href|src|action)="\/(?!\/)/g, `$1="${B}/`)
  .replace(/(["\s,])\/assets\//g, `$1${B}/assets/`));

if (!existsSync(join(SRC, 'generated', 'slike.json'))) throw new Error('Prvo pokrenite: npm run slike');
if (!existsSync(join(SRC, 'generated', 'fontovi.css'))) throw new Error('Prvo pokrenite: npm run fontovi');

const pisi = (rel, sadrzaj) => {
  const f = join(PUB, rel);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, sadrzaj);
};

// ---------- CSS i JS ----------
const css = (readFileSync(join(SRC, 'generated', 'fontovi.css'), 'utf8') + '\n' + readFileSync(join(SRC, 'assets', 'main.css'), 'utf8')).replace(/url\(\/assets\//g, `url(${B}/assets/`);
const js = readFileSync(join(SRC, 'assets', 'main.js'), 'utf8');
const verzija = createHash('sha1').update(css + js).digest('hex').slice(0, 8);
pisi('assets/css/main.css', css);
pisi('assets/js/main.js', js);

// ---------- Stranice ----------
const stranice = [];
const dodaj = (url, html, prioritet) => {
  const rel = url === '/' ? 'index.html' : url.replace(/^\//, '') + (url.endsWith('/') ? 'index.html' : '');
  pisi(rel, saOsnovom(html));
  if (prioritet) stranice.push({ url, prioritet });
};

for (const k of KATEGORIJE) rmSync(join(PUB, k.slug), { recursive: true, force: true });
dodaj('/', pocetna(verzija), '1.0');
for (const k of KATEGORIJE) dodaj(urlKategorije(k), kategorijaStranica(k, verzija), '0.9');
for (const m of MODELI) dodaj(urlModela(m), proizvodStranica(m, verzija), '0.7');
dodaj('/kontakt/', kontaktStranica(verzija), '0.8');
dodaj('/404.html', greskaStranica(verzija));

// ---------- sitemap.xml i robots.txt ----------
const danas = new Date().toISOString().slice(0, 10);
pisi('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${stranice.map((s) => `  <url><loc>${sajt.url}${s.url}</loc><lastmod>${danas}</lastmod><priority>${s.prioritet}</priority></url>`).join('\n')}
</urlset>
`);
pisi('robots.txt', sajt.indeksiraj
  ? `User-agent: *\nAllow: /\n\nSitemap: ${sajt.url}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n');

// ---------- Favicon, ikonice i manifest ----------
pisi('favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><rect width="30" height="30" rx="7" fill="#EDF0F1"/><rect x="5" y="9" width="20" height="18" fill="none" stroke="#141C24" stroke-width="2.4"/><line x1="15" y1="9" x2="15" y2="27" stroke="#141C24" stroke-width="2.4"/><line x1="5" y1="4" x2="25" y2="4" stroke="#F26A1B" stroke-width="1.6"/><line x1="3.5" y1="2" x2="6.5" y2="6" stroke="#F26A1B" stroke-width="1.6"/><line x1="23.5" y1="2" x2="26.5" y2="6" stroke="#F26A1B" stroke-width="1.6"/></svg>
`);
const ikona180 = join(PUB, 'apple-touch-icon.png');
if (!existsSync(ikona180)) {
  // PNG verzija znaka (ram prozora i kota) za iOS i starije pregledače.
  const crtez = [
    'drawbox=x=34:y=54:w=112:h=97:t=12:color=0x141C24',
    'drawbox=x=84:y=54:w=12:h=97:t=fill:color=0x141C24',
    'drawbox=x=40:y=31:w=100:h=8:t=fill:color=0xF26A1B',
    'drawbox=x=36:y=23:w=8:h=24:t=fill:color=0xF26A1B',
    'drawbox=x=136:y=23:w=8:h=24:t=fill:color=0xF26A1B'
  ].join(',');
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'lavfi', '-i', 'color=c=0xEDF0F1:s=180x180', '-vf', crtez, '-frames:v', '1', ikona180]);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', ikona180, '-vf', 'scale=32:32:flags=lanczos', join(PUB, 'favicon-32.png')]);
}
pisi('site.webmanifest', JSON.stringify({
  name: firma.ime,
  short_name: firma.kratkoIme,
  lang: sajt.jezik,
  start_url: `${B}/`,
  display: 'browser',
  background_color: '#EDF0F1',
  theme_color: '#EDF0F1',
  icons: [
    { src: `${B}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
    { src: `${B}/favicon.svg`, sizes: 'any', type: 'image/svg+xml' }
  ]
}, null, 2));
// GitHub Pages: bez Jekyll obrade, fajlovi se objavljuju takvi kakvi su.
pisi('.nojekyll', '');

// ---------- .htaccess (Apache / LiteSpeed, npr. Hostinger) ----------
pisi('.htaccess', `# Greška 404
ErrorDocument 404 ${B}/404.html

# HTTPS (otkomentarišite kada sajt ima SSL sertifikat)
# RewriteEngine On
# RewriteCond %{HTTPS} off
# RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Kompresija
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml application/xml text/plain application/manifest+json
</IfModule>

# Keširanje: CSS i JS imaju ?v= verziju, slike i fontovi se retko menjaju
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 6 months"
  ExpiresByType image/jpeg "access plus 6 months"
  ExpiresByType image/png "access plus 6 months"
  ExpiresByType image/svg+xml "access plus 6 months"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>
<IfModule mod_headers.c>
  <FilesMatch "\\.(woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`);

console.log(`Gotovo: ${stranice.length + 1} stranica, verzija ${verzija}.`);

// Zajednički delovi svih stranica: <head> sa SEO tagovima, header, footer, ikonice i slike.
import { readFileSync } from 'node:fs';
import { firma, sajt, popunjeno } from './firma.mjs';
import { KATEGORIJE, urlKategorije } from './katalog.mjs';

const SLIKE = JSON.parse(readFileSync(new URL('./generated/slike.json', import.meta.url), 'utf8'));

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const abs = (path) => sajt.url + path;

// ---------- Slike ----------
// Vraća <img> sa srcset-om iz optimizovanih WebP verzija.
export function slika(ime, { alt = '', sizes = '100vw', cls = '', eager = false, prioritet = false, stil = '' } = {}) {
  const s = SLIKE[ime];
  if (!s) throw new Error(`Nepoznata slika: ${ime}`);
  const w = s.widths;
  const najveca = w[w.length - 1];
  const srcset = w.length > 1 ? ` srcset="${w.map((x) => `/assets/img/${ime}-${x}.webp ${x}w`).join(', ')}" sizes="${sizes}"` : '';
  const src = `/assets/img/${ime}-${w.find((x) => x >= 800) || najveca}.webp`;
  return `<img src="${src}"${srcset} width="${s.w}" height="${s.h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''}${stil ? ` style="${stil}"` : ''} ${eager ? '' : 'loading="lazy" '}decoding="async"${prioritet ? ' fetchpriority="high"' : ''}>`;
}
export const urlSlike = (ime, min = 800) => {
  const w = SLIKE[ime].widths;
  return `/assets/img/${ime}-${w.find((x) => x >= min) || w[w.length - 1]}.webp`;
};
export const srcsetSlike = (ime) => SLIKE[ime].widths.map((x) => `/assets/img/${ime}-${x}.webp ${x}w`).join(', ');

// ---------- Ikonice (inline SVG, boje preko currentColor) ----------
export const ikona = {
  logo: (cls = '') => `<svg class="logo-mark ${cls}" viewBox="0 0 30 30" aria-hidden="true"><rect x="5" y="9" width="20" height="18" fill="none" stroke="currentColor" stroke-width="2.4"/><line x1="15" y1="9" x2="15" y2="27" stroke="currentColor" stroke-width="2.4"/><line x1="5" y1="4" x2="25" y2="4" stroke="#F26A1B" stroke-width="1.6"/><line x1="3.5" y1="2" x2="6.5" y2="6" stroke="#F26A1B" stroke-width="1.6"/><line x1="23.5" y1="2" x2="26.5" y2="6" stroke="#F26A1B" stroke-width="1.6"/></svg>`,
  telefon: (v = 16) => `<svg width="${v}" height="${v}" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.2 1.8h2.6l1.3 3.3-1.7 1.1a8 8 0 0 0 4.4 4.4l1.1-1.7 3.3 1.3v2.6a1.4 1.4 0 0 1-1.5 1.4A12.6 12.6 0 0 1 1.8 3.3a1.4 1.4 0 0 1 1.4-1.5z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  strelica: (v = 14, boja = 'currentColor', debljina = 1.7) => `<svg width="${v}" height="${v}" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7h9M7.8 3.2L11.5 7l-3.7 3.8" fill="none" stroke="${boja}" stroke-width="${debljina}" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  stiklir: (v = 16) => `<svg width="${v}" height="${v}" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3 3 7-7" fill="none" stroke="#B4460C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  preuzmi: () => `<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v8M4.5 6.8L8 10.3l3.5-3.5M2.5 13.5h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  otpremi: () => `<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M11 15V4M6.5 8.5L11 4l4.5 4.5M3.5 15.5v2.5h15v-2.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  filteri: () => `<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 4h12M4.5 8h7M7 12h2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  zvezda: () => `<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M9 1.8l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L1.8 7.1l5-.7z" fill="none" stroke="#B4460C" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  meni: () => `<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path class="i-open" d="M2.5 5.5h13M2.5 12.5h13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path class="i-close" d="M4 4l10 10M14 4L4 14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`
};

// Kota (linija mere), potpisni element brenda.
export const kota = (tekst, cls = '') => `<div class="dim ${cls}" aria-hidden="true"><i class="dt"></i><i class="dl"></i><span>${tekst}</span><i class="dl"></i><i class="dt"></i></div>`;
export const nadnaslov = (tekst, cls = '') => `<p class="kicker ${cls}">${tekst}</p>`;

// ---------- Kontakt podaci ----------
export const telLink = () => (popunjeno(firma.telefon) ? `tel:${firma.telefon.replace(/[^\d+]/g, '')}` : '/kontakt/');
export const mailLink = () => (popunjeno(firma.email) ? `mailto:${firma.email}` : '/kontakt/');

// ---------- Strukturirani podaci (schema.org) ----------
export function schemaFirme() {
  const o = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': abs('/#firma'),
    name: firma.ime,
    description: firma.opis,
    url: abs('/'),
    logo: abs('/favicon.svg'),
    image: abs('/assets/img/og-kota-stolarija.jpg'),
    makesOffer: KATEGORIJE.map((k) => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name: k.ime, url: abs(urlKategorije(k)) } }))
  };
  if (popunjeno(firma.telefon)) o.telephone = firma.telefon;
  if (popunjeno(firma.email)) o.email = firma.email;
  if (popunjeno(firma.adresa) && popunjeno(firma.mesto)) {
    o.address = { '@type': 'PostalAddress', streetAddress: firma.adresa, addressLocality: firma.mesto, addressCountry: 'RS' };
    if (popunjeno(firma.postanskiBroj)) o.address.postalCode = firma.postanskiBroj;
  }
  if (popunjeno(firma.oblastRada)) o.areaServed = firma.oblastRada;
  return o;
}
export function schemaPutanje(stavke) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: stavke.map(([ime, url], i) => ({ '@type': 'ListItem', position: i + 1, name: ime, item: abs(url) }))
  };
}
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

// ---------- Putanja (breadcrumb) ----------
export function putanja(stavke, cls = '') {
  const li = stavke.map(([ime, url], i) => {
    const poslednja = i === stavke.length - 1;
    return poslednja
      ? `<li><span aria-current="page">${esc(ime)}</span></li>`
      : `<li>${url ? `<a class="k-link" href="${url}">${esc(ime)}</a>` : `<span>${esc(ime)}</span>`}</li>`;
  }).join('');
  return `<nav class="crumbs ${cls}" aria-label="Putanja"><ol>${li}</ol></nav>`;
}

// ---------- <head> i okvir stranice ----------
export function stranica({ putanja: path, naslov, opis, telo, aktivno = '', schema = [], head = '', klasa = '', mobilnaTraka = 'merenje', verzija, noindex = false }) {
  const url = abs(path);
  const indeks = sajt.indeksiraj && !noindex;
  const punNaslov = naslov.includes(firma.ime) ? naslov : `${naslov} | ${firma.ime}`;
  const og = abs('/assets/img/og-kota-stolarija.jpg');
  return `<!doctype html>
<html lang="${sajt.jezik}" data-base="${sajt.osnova || ''}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(punNaslov)}</title>
<meta name="description" content="${esc(opis)}">
${noindex ? '' : `<link rel="canonical" href="${url}">\n`}${indeks ? '<meta name="robots" content="index, follow, max-image-preview:large">' : '<meta name="robots" content="noindex, follow">'}
<meta name="theme-color" content="#EDF0F1">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(firma.ime)}">
<meta property="og:locale" content="${sajt.lokal}">
<meta property="og:title" content="${esc(punNaslov)}">
<meta property="og:description" content="${esc(opis)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Spavaća soba sa velikim prozorima i pogledom na jezero">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
${head}<link rel="stylesheet" href="/assets/css/main.css?v=${verzija}">
<script>document.documentElement.classList.add('js')</script>
<script src="/assets/js/main.js?v=${verzija}" defer></script>
${[schemaFirme(), ...schema].map(ld).join('\n')}
</head>
<body class="${klasa}">
<a class="skip" href="#main">Preskočite na sadržaj</a>
<div class="env" aria-hidden="true"></div>
${zaglavlje(aktivno)}
${telo}
${podnozje()}
${mobilnaTraka ? traka(mobilnaTraka) : ''}
</body>
</html>
`;
}

const NAV = [
  { id: 'proizvodi', ime: 'Proizvodi', url: '/pvc-prozori/' },
  { id: 'realizacije', ime: 'Realizacije', url: '/#realizacije' },
  { id: 'proces', ime: 'Kako radimo', url: '/#proces' },
  { id: 'kontakt', ime: 'Kontakt', url: '/kontakt/' }
];

function zaglavlje(aktivno) {
  const linkovi = NAV.map((l, i) => `<li><a class="nav-link" href="${l.url}"${l.id === aktivno ? ' aria-current="page"' : ''}>${l.ime}<span class="nav-n" aria-hidden="true">0${i + 1}</span></a></li>`).join('');
  return `<header class="site-header" data-header>
<nav class="nav" aria-label="Glavna navigacija">
<a class="brand" href="/" aria-label="${esc(firma.ime)}, početna">${ikona.logo()}<span class="brand-txt"><span class="brand-name">${firma.kratkoIme}</span><span class="brand-tag">${firma.slogan}</span></span></a>
<div class="nav-panel" id="glavni-meni">
<ul class="nav-links">${linkovi}</ul>
<p class="nav-info">${esc(firma.telefon)} · ${esc(firma.radnoVreme)}</p>
</div>
<a class="nav-phone k-link" href="${telLink()}">${ikona.telefon()}<span>${esc(firma.telefon)}</span></a>
<a class="btn btn-dark nav-cta" href="/kontakt/">Zakažite merenje</a>
<a class="nav-ico nav-ico-tel" href="${telLink()}" aria-label="Pozovite ${esc(firma.telefon)}">${ikona.telefon(17)}</a>
<button class="nav-ico nav-burger" type="button" aria-expanded="false" aria-controls="glavni-meni" aria-label="Otvorite meni" data-menu>${ikona.meni()}</button>
</nav>
</header>`;
}

function podnozje() {
  return `<footer class="site-footer">
<div class="wrap foot">
<div class="foot-cols">
<div class="foot-brand">
<a class="foot-logo" href="/" aria-label="${esc(firma.ime)}, početna">${ikona.logo()}<span>${firma.kratkoIme}</span></a>
<p>${esc(firma.opis)}</p>
</div>
<nav class="foot-col" aria-label="Proizvodi">
<p class="foot-h">Proizvodi</p>
${KATEGORIJE.map((k) => `<a class="k-link" href="${urlKategorije(k)}">${k.imeNaPocetnoj}</a>`).join('\n')}
</nav>
<nav class="foot-col foot-firma" aria-label="Firma">
<p class="foot-h">Firma</p>
<a class="k-link" href="/#proces">Kako radimo</a>
<a class="k-link" href="/#realizacije">Realizacije</a>
<a class="k-link" href="/kontakt/">Kontakt</a>
</nav>
<address class="foot-col foot-salon">
<p class="foot-h">Salon</p>
<span>${esc(firma.adresa)}</span>
<a class="k-link" href="${telLink()}">${esc(firma.telefon)}</a>
<a class="k-link" href="${mailLink()}">${esc(firma.email)}</a>
<span>${esc(firma.radnoVreme)}</span>
</address>
</div>
<div class="foot-bottom">
<span>© ${sajt.godina} ${esc(firma.ime)}.${sajt.demo ? ' KOTA je izmišljen brend napravljen za demo dizajn.' : ''} Fotografije: Unsplash i mondlinepro.rs.</span>
<span>Dizajn: Vektor Code</span>
</div>
</div>
</footer>`;
}

function traka(vrsta) {
  const cta = vrsta === 'ponuda' ? 'Zatražite ponudu' : 'Zakažite merenje';
  return `<div class="m-bar">
<a class="btn btn-ghost" href="${telLink()}">${ikona.telefon()}Pozovite</a>
<a class="btn btn-dark" href="/kontakt/">${cta}${ikona.strelica(13, '#F26A1B', 1.8)}</a>
</div>`;
}

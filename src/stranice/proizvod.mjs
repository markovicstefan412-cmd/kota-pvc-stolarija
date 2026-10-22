// Stranica modela. KOTA 76 Termo ima pun prikaz iz dizajna (prikazi, tačke na slici, presek),
// ostali modeli koriste isti šablon sa svojim podacima.
import { firma } from '../firma.mjs';
import { KATEGORIJE, MODELI, BOJE, PROFILI, kategorija, urlKategorije, urlModela } from '../katalog.mjs';
import { esc, slika, urlSlike, srcsetSlike, ikona, nadnaslov, putanja, stranica, schemaPutanje, abs } from '../sablon.mjs';

const SVI = { prozori: 'Svi PVC prozori', balkon: 'Sva balkonska vrata', klizni: 'Svi klizni sistemi', vrata: 'Sva ulazna vrata', oprema: 'Sve roletne i oprema' };
import { pozivTraka } from './kategorija.mjs';

const TERMO = {
  prikazi: [
    { ime: 'Zatvoren', img: 'kota-76-termo-zatvoren', fit: 'contain', alt: 'KOTA 76 Termo, beli dvokrilni prozor, zatvoren' },
    { ime: 'Krilo otvoreno', img: 'kota-76-termo-krilo-otvoreno', fit: 'contain', alt: 'KOTA 76 Termo sa oba krila odškrinuta' },
    { ime: 'Potpuno otvoren', img: 'kota-76-termo-potpuno-otvoren', fit: 'contain', alt: 'KOTA 76 Termo sa oba krila potpuno otvorena' },
    { ime: 'U enterijeru', img: 'beli-pvc-prozor-na-kip-jesen', fit: 'cover', alt: 'Beli prozor otvoren na kip u sobi' }
  ],
  boje: [
    { id: 'bela', ime: 'Bela', fill: '#FFFFFF' },
    { id: 'antracit', ime: 'Antracit RAL 7016', fill: '#3B4247', img: 'kota-76-antracit', alt: 'Prozor u antracit boji, sličan model', nota: 'Boja na sličnom modelu' },
    { id: 'hrast', ime: 'Zlatni hrast', fill: 'linear-gradient(135deg, #C08A50, #9A6534)', img: 'kota-76-zlatni-hrast', alt: 'Prozor u dekoru drveta, sličan model', nota: 'Dekor na sličnom modelu' },
    { id: 'orah', ime: 'Orah', fill: 'linear-gradient(135deg, #7A4E30, #523220)', img: 'kota-76-zlatni-hrast', alt: 'Prozor u dekoru drveta, sličan model', nota: 'Dekor na sličnom modelu' }
  ],
  tacke: [
    { n: '1', x: '47.4%', y: '53%', k: 'Okov', t: 'Krilno-kip sa mikroventilacijom', d: 'Kvaka u položaju između kipa i zatvorenog ostavlja procep od par milimetara. Soba se provetri, a toplota ostane.' },
    { n: '2', x: '30%', y: '30%', k: 'Staklo', t: 'Troslojno, 48 mm, sa argonom', d: 'Low-E sloj vraća toplotu u sobu, a topla distancer lajsna sprečava da ivica stakla rosi.' },
    { n: '3', x: '8.6%', y: '74%', k: 'Ram', t: '76 mm, 6 komora i čelik', d: 'Komore usporavaju prolaz toplote kroz profil, a pocinkovana armatura drži ram ravnim i posle mnogo godina.' },
    { n: '4', x: '84.6%', y: '17.5%', k: 'Zaptivke', t: 'Tri zaptivke po obimu krila', d: 'Spoljna, srednja i unutrašnja. Vetar ne prolazi ni kad duva košava.' }
  ]
};

const MERE = { prozori: [1460, 1230], balkon: [900, 2200], klizni: [2400, 2200], vrata: [1000, 2100], oprema: [1400, 1400] };

const presekDesktop = `<svg class="presek presek-d" viewBox="0 0 560 440" width="100%" role="img" aria-label="Presek profila KOTA 76: šest komora u ramu, čelična armatura, tri zaptivke i troslojno staklo">
<g stroke="#3A4753" stroke-width="1"><line x1="0" y1="40" x2="560" y2="40"/><line x1="0" y1="120" x2="560" y2="120"/><line x1="0" y1="200" x2="560" y2="200"/><line x1="0" y1="280" x2="560" y2="280"/><line x1="0" y1="360" x2="560" y2="360"/><line x1="80" y1="0" x2="80" y2="440"/><line x1="200" y1="0" x2="200" y2="440"/><line x1="320" y1="0" x2="320" y2="440"/><line x1="440" y1="0" x2="440" y2="440"/></g>
<rect x="196" y="22" width="7" height="176" fill="#9FC3D3" opacity="0.85"/><rect x="219" y="22" width="7" height="176" fill="#9FC3D3" opacity="0.85"/><rect x="242" y="22" width="7" height="176" fill="#9FC3D3" opacity="0.85"/>
<rect x="203" y="186" width="16" height="10" fill="#5E6B75"/><rect x="226" y="186" width="16" height="10" fill="#5E6B75"/>
<path d="M150 196 H340 Q348 196 348 204 V268 H150 Q142 268 142 260 V204 Q142 196 150 196 Z" fill="#E9EDF0" stroke="#F4F6F7" stroke-width="1.5"/>
<g fill="none" stroke="#9AA4AB" stroke-width="1.5"><line x1="182" y1="200" x2="182" y2="264"/><line x1="260" y1="200" x2="260" y2="264"/><line x1="306" y1="200" x2="306" y2="264"/><line x1="182" y1="232" x2="260" y2="232"/></g>
<path d="M118 276 H330 Q338 276 338 284 V372 Q338 380 330 380 H118 Q110 380 110 372 V284 Q110 276 118 276 Z" fill="#F4F6F7" stroke="#F4F6F7" stroke-width="1.5"/>
<g fill="none" stroke="#9AA4AB" stroke-width="1.5"><line x1="140" y1="280" x2="140" y2="376"/><line x1="190" y1="280" x2="190" y2="376"/><line x1="250" y1="280" x2="250" y2="376"/><line x1="290" y1="280" x2="290" y2="376"/><line x1="320" y1="280" x2="320" y2="376"/></g>
<path class="draw" pathLength="1" d="M200 296 V360 H240 V296" fill="none" stroke="#F26A1B" stroke-width="4"/>
<g fill="#5E6B75" font-family="JetBrains Mono, monospace" font-size="12"><text x="121" y="332">1</text><text x="161" y="332">2</text><text x="216" y="332">3</text><text x="266" y="332">4</text><text x="301" y="332">5</text><text x="325" y="332">6</text></g>
<g fill="#141C24"><rect x="112" y="268" width="14" height="9" rx="4"/><rect x="226" y="266" width="14" height="10" rx="4"/><rect x="326" y="268" width="14" height="9" rx="4"/></g>
<g class="draw-g" stroke="#F7A26B" stroke-width="1" fill="none"><polyline pathLength="1" points="349,230 400,230 410,212"/><polyline pathLength="1" points="240,330 420,330 430,312"/><polyline pathLength="1" points="333,272 400,272 410,262"/><polyline pathLength="1" points="250,110 400,110 410,92"/></g>
<g fill="#F4F6F7" font-family="JetBrains Mono, monospace" font-size="12" letter-spacing="1"><text x="414" y="90">TROSLOJNO STAKLO</text><text x="414" y="106" fill="#A9B4BC">48 MM · ARGON</text><text x="414" y="210">KRILO</text><text x="414" y="226" fill="#A9B4BC">5 KOMORA</text><text x="414" y="260">3 ZAPTIVKE</text><text x="414" y="310">ČELIČNA ARMATURA</text><text x="414" y="326" fill="#A9B4BC">1,5 MM · RAM 6 KOMORA</text></g>
<g stroke="#F26A1B" stroke-width="1.2"><line x1="110" y1="408" x2="338" y2="408"/><line x1="104" y1="402" x2="116" y2="414"/><line x1="332" y1="402" x2="344" y2="414"/><line x1="110" y1="386" x2="110" y2="416"/><line x1="338" y1="386" x2="338" y2="416"/></g>
<text x="224" y="432" text-anchor="middle" fill="#F7A26B" font-family="JetBrains Mono, monospace" font-size="12" letter-spacing="1.5">76 MM</text>
<g fill="#A9B4BC" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="1.5"><text x="20" y="300">SPOLJA</text><text x="20" y="316" fill="#5E6B75">← HLADNO</text><text x="20" y="20">UNUTRA →</text></g>
</svg>`;

const presekMobilni = `<svg class="presek presek-m" viewBox="80 0 480 440" width="100%" role="img" aria-label="Presek profila KOTA 76: šest komora u ramu, čelična armatura, tri zaptivke i troslojno staklo">
<rect x="196" y="22" width="7" height="176" fill="#9FC3D3" opacity="0.85"/><rect x="219" y="22" width="7" height="176" fill="#9FC3D3" opacity="0.85"/><rect x="242" y="22" width="7" height="176" fill="#9FC3D3" opacity="0.85"/>
<rect x="203" y="186" width="16" height="10" fill="#5E6B75"/><rect x="226" y="186" width="16" height="10" fill="#5E6B75"/>
<path d="M150 196 H340 Q348 196 348 204 V268 H150 Q142 268 142 260 V204 Q142 196 150 196 Z" fill="#E9EDF0" stroke="#F4F6F7" stroke-width="1.5"/>
<g fill="none" stroke="#9AA4AB" stroke-width="1.5"><line x1="182" y1="200" x2="182" y2="264"/><line x1="260" y1="200" x2="260" y2="264"/><line x1="306" y1="200" x2="306" y2="264"/><line x1="182" y1="232" x2="260" y2="232"/></g>
<path d="M118 276 H330 Q338 276 338 284 V372 Q338 380 330 380 H118 Q110 380 110 372 V284 Q110 276 118 276 Z" fill="#F4F6F7" stroke="#F4F6F7" stroke-width="1.5"/>
<g fill="none" stroke="#9AA4AB" stroke-width="1.5"><line x1="140" y1="280" x2="140" y2="376"/><line x1="190" y1="280" x2="190" y2="376"/><line x1="250" y1="280" x2="250" y2="376"/><line x1="290" y1="280" x2="290" y2="376"/><line x1="320" y1="280" x2="320" y2="376"/></g>
<path class="draw" pathLength="1" d="M200 296 V360 H240 V296" fill="none" stroke="#F26A1B" stroke-width="4"/>
<g fill="#5E6B75" font-family="JetBrains Mono, monospace" font-size="12"><text x="121" y="332">1</text><text x="161" y="332">2</text><text x="216" y="332">3</text><text x="266" y="332">4</text><text x="301" y="332">5</text><text x="325" y="332">6</text></g>
<g fill="#141C24"><rect x="112" y="268" width="14" height="9" rx="4"/><rect x="226" y="266" width="14" height="10" rx="4"/><rect x="326" y="268" width="14" height="9" rx="4"/></g>
<g class="draw-g" stroke="#F7A26B" stroke-width="1" fill="none"><polyline pathLength="1" points="349,230 400,230 410,212"/><polyline pathLength="1" points="240,330 420,330 430,312"/><polyline pathLength="1" points="333,272 400,272 410,262"/><polyline pathLength="1" points="250,110 400,110 410,92"/></g>
<g fill="#F4F6F7" font-family="JetBrains Mono, monospace" font-size="13" letter-spacing="1"><text x="414" y="90">STAKLO</text><text x="414" y="107" fill="#A9B4BC">48 MM</text><text x="414" y="210">KRILO</text><text x="414" y="260">3 ZAPTIVKE</text><text x="414" y="310">ČELIK</text><text x="414" y="327" fill="#A9B4BC">1,5 MM</text></g>
<g stroke="#F26A1B" stroke-width="1.2"><line x1="110" y1="408" x2="338" y2="408"/><line x1="104" y1="402" x2="116" y2="414"/><line x1="332" y1="402" x2="344" y2="414"/></g>
<text x="224" y="432" text-anchor="middle" fill="#F7A26B" font-family="JetBrains Mono, monospace" font-size="13" letter-spacing="1.5">76 MM</text>
</svg>`;

function slicni(m) {
  if (m.slug === 'kota-76-termo') return ['kota-70-klasik', 'kota-82-premium', 'kota-76-antracit'].map((s) => MODELI.find((x) => x.slug === s));
  const ista = MODELI.filter((x) => x.kat === m.kat && x.id !== m.id);
  const ostali = MODELI.filter((x) => x.kat !== m.kat && x.kat === (m.kat === 'prozori' ? 'balkon' : 'prozori'));
  return [...ista, ...ostali].slice(0, 3);
}

function tehnickiPodaci(m, p) {
  const redovi = [
    ['Dubina profila', `${p.dubina} mm`],
    [m.profil === 76 ? 'Komore u ramu i krilu' : 'Broj komora', m.profil === 76 ? '6 i 5' : p.komore],
    ['Armatura', 'Pocinkovani čelik, 1,5 mm'],
    ['Zaptivke', `${p.zaptivke}, EPDM`],
    ['Staklo', m.profil === 76 ? '4/16/4/16/4, Low-E, argon' : `do ${p.staklo}`],
    ...(m.profil === 76 ? [['Ug stakla', '0,5 W/m²K']] : []),
    ['Uw prozora', `do ${p.uw} W/m²K`, true],
    ['Okov', 'Krilno-kip, mikroventilacija'],
    ['Boje', m.boje.map((b) => BOJE[b].ime).join(', ')]
  ];
  return `<dl class="tech">${redovi.map(([k, v, acc]) => `<div${acc ? ' class="is-acc"' : ''}><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
}

export function proizvodStranica(m, verzija) {
  const k = kategorija(m.kat);
  const termo = m.slug === 'kota-76-termo';
  const prozor = m.kat === 'prozori';
  const p = m.profil ? PROFILI[m.profil] : null;
  const [w0, h0] = MERE[m.kat];

  const glavna = termo ? TERMO.prikazi[0] : { img: m.slika, fit: m.fit, alt: m.alt };
  const boje = termo ? TERMO.boje : m.boje.map((b) => ({ id: b, ime: BOJE[b].ime, fill: BOJE[b].hex }));
  const stavke = prozor
    ? null
    : [...k.pocetna.stavke, ...m.spec.split(' · ')].filter((v, i, a) => a.indexOf(v) === i);

  const galerija = `<div class="pg">
<div class="pg-wrap">
<div class="pg-stage${glavna.fit === 'contain' ? ' is-contain' : ''}" data-stage-img>
${slika(glavna.img, { alt: glavna.alt, sizes: '(max-width: 767px) 94vw, 55vw', eager: true, prioritet: true, cls: 'pg-main' })}
${termo ? TERMO.tacke.map((t, i) => `<button class="hot" type="button" style="left:${t.x};top:${t.y}" aria-pressed="${i === 0}" aria-label="${t.k}: ${t.t}" data-hot="${i}"><i class="k-ring" aria-hidden="true"></i><span aria-hidden="true">${t.n}</span></button>`).join('') : ''}
${termo ? '<span class="pg-note" data-note>Prikaz 1 / 4</span>' : ''}
</div>
${termo ? `<div class="hot-card" role="status" data-hot-card><span class="hc-k"><span class="m-only">1 · </span>${TERMO.tacke[0].k}</span><span class="hc-t">${TERMO.tacke[0].t}</span><span class="hc-d">${TERMO.tacke[0].d}</span></div>` : ''}
</div>
${termo ? `<div class="pg-thumbs" role="group" aria-label="Prikazi proizvoda">
${TERMO.prikazi.map((v, i) => `<button type="button" aria-pressed="${i === 0}" aria-label="${v.ime}" data-view="${i}"><span class="th-img${v.fit === 'contain' ? ' is-contain' : ''}">${slika(v.img, { alt: '', sizes: '160px' })}</span><span class="th-n d-only">${v.ime}</span></button>`).join('\n')}
</div>` : ''}
</div>`;

  const statovi = p ? `<div class="stats">
<div><b>${p.komore}</b><span>komora</span></div>
<div><b>${p.dubina}<span class="m-only">&nbsp;mm</span></b><span><span class="d-only">mm profil</span><span class="m-only">dubina profila</span></span></div>
<div><b>${p.uw}</b><span>Uw W/m²K</span></div>
<div><b>${p.zaptivke}</b><span>zaptivke</span></div>
</div>` : `<ul class="specs specs-prod">${stavke.map((s) => `<li>${s}</li>`).join('')}</ul>`;

  const info = `<div class="prod-info">
<div class="pi-head">
<div class="pi-tags">${m.tag ? `<span class="tag">${m.tag}</span>` : ''}<span class="pi-kat">${prozor ? `PVC prozor · profil ${m.profil}` : k.ime}</span></div>
<h1 id="h-prod" class="h1 h1-prod">${m.ime}</h1>
<p>${m.opis}</p>
</div>
${statovi}
<div class="opt">
<span class="opt-l">Boja · <span data-color-name>${boje[0].ime}</span></span>
<div class="swatch-btns" role="group" aria-label="Boja">
${boje.map((b, i) => `<button type="button" aria-pressed="${i === 0}" aria-label="${b.ime}" data-color="${b.id}" data-name="${esc(b.ime)}"><span style="background:${b.fill}"></span></button>`).join('')}
</div>
</div>
${prozor ? `<div class="opt">
<span class="opt-l">Otvaranje</span>
<div class="seg seg-full" role="group" aria-label="Otvaranje">
<button type="button" aria-pressed="true" data-otv="Krilno-kip">Krilno-kip</button><button type="button" aria-pressed="false" data-otv="Krilno">Krilno</button><button type="button" aria-pressed="false" data-otv="Fiksni">Fiksni</button>
</div>
</div>` : ''}
<div class="dims">
<label class="fld"><span>Širina, mm</span><input type="number" inputmode="numeric" min="300" max="6000" step="10" value="${w0}" data-dim="w"></label>
<label class="fld"><span>Visina, mm</span><input type="number" inputmode="numeric" min="300" max="6000" step="10" value="${h0}" data-dim="h"></label>
<div class="fld fld-qty"><span>Komada</span>
<div class="qty qty-box"><button type="button" aria-label="Manje komada" data-qty="-1">−</button><span data-out="qty" aria-live="polite">1</span><button type="button" aria-label="Više komada" data-qty="1">+</button></div>
</div>
</div>
<div class="sum-bar"><span data-out="sum">${w0} × ${h0} mm · 1 kom${prozor ? ' · Krilno-kip' : ''}</span><b><span data-out="area">${((w0 * h0) / 1e6).toFixed(2).replace('.', ',')}</span> m²</b></div>
<div class="pi-ctas">
<a class="btn btn-dark btn-xl pi-main" href="/kontakt/?model=${m.slug}" data-quote>Zatražite ponudu${prozor ? ' za ovaj prozor' : ''}${ikona.strelica(14, '#F26A1B', 1.8)}</a>
<a class="btn btn-ghost btn-xl pi-sheet d-only" href="/kontakt/?model=${m.slug}">${ikona.preuzmi()}Tehnički list</a>
</div>
<ul class="checks">
<li>${ikona.stiklir()}Cena se računa posle merenja na adresi</li>
<li>${ikona.stiklir()}Spoj sa zidom zaptivamo trakama, ne samo penom</li>
<li>${ikona.stiklir()}Ponuda po stavkama, za svaki otvor posebno</li>
</ul>
</div>`;

  const presek = !p ? '' : `<section class="sec sec-presek" aria-labelledby="h-presek">
<div class="wrap">
<div class="presek-box rv">
<div class="pb-l">
${nadnaslov(m.profil === 76 ? 'Presek profila' : 'Tehnički podaci', 'kicker-dark')}
<h2 id="h-presek" class="h2 h2-sm">${m.profil === 76 ? 'Šta je unutra, kad ga presečemo.' : `Profil KOTA ${m.profil}, stavku po stavku.`}</h2>
${m.profil === 76 ? `<figure class="presek-fig">${presekDesktop}${presekMobilni}</figure>` : `<p class="pb-p">Za ${p.za.toLowerCase()}. ${p.komore} komora u ramu, ${p.zaptivke} zaptivke po obimu krila i staklo do ${p.staklo}.</p>`}
</div>
<div class="pb-r">${tehnickiPodaci(m, p)}</div>
</div>
</div>
</section>`;

  const uProstoru = !termo ? '' : `<section class="sec sec-gde" aria-labelledby="h-gde">
<div class="wrap">
<div class="sec-head rv">
<div class="sec-head-l">${nadnaslov('U prostoru')}<h2 id="h-gde" class="h2 h2-sm">Kako izgleda kad je ugrađen.</h2></div>
<p class="sec-head-p">Uski profil krila ostavlja više stakla, pa soba dobija više svetla iz istog otvora.</p>
</div>
</div>
<div class="gde-grid k-scroll rv">
<figure class="k-card real g-big">${slika('beli-pvc-prozor-na-kip-jesen', { alt: 'Beli prozor otvoren na kip, pogled na jesenje dvorište', sizes: '(max-width: 767px) 270px, 45vw', cls: 'k-zoom' })}<figcaption>Na kip · mikroventilacija</figcaption></figure>
<figure class="k-card real">${slika('beli-prozor-tamni-zid-zelenilo', { alt: 'Beli prozor u tamnom zidu sa pogledom na zelenilo', sizes: '(max-width: 767px) 270px, 30vw', cls: 'k-zoom' })}<figcaption>Spavaća soba</figcaption></figure>
<figure class="k-card real">${slika('siroki-beli-prozor-basta', { alt: 'Široki beli prozor sa više polja ka bašti', sizes: '(max-width: 767px) 270px, 30vw', cls: 'k-zoom' })}<figcaption>Kuća · pogled na baštu</figcaption></figure>
</div>
</section>`;

  const slicniModeli = slicni(m);
  const slicniSek = `<section class="sec sec-slicni" aria-labelledby="h-slicni">
<div class="wrap">
<div class="sec-head sec-head-tight rv">
<h2 id="h-slicni" class="h2 h2-xs">Slični modeli</h2>
<a class="link-u" href="${urlKategorije(k)}">${SVI[k.id]}</a>
</div>
</div>
<div class="slicni-grid k-scroll rv">
${slicniModeli.map((s) => `<article class="k-prod k-prod-s">
<a class="kps-img${s.fit === 'contain' ? ' is-contain' : ''}" href="${urlModela(s)}" tabindex="-1" aria-hidden="true">${slika(s.slika, { alt: '', sizes: '(max-width: 767px) 230px, 30vw' })}</a>
<div class="kps-body"><div><h3><a class="k-link" href="${urlModela(s)}">${s.ime}</a></h3><span class="kp-spec">${s.spec}</span></div>${ikona.strelica(16, '#F26A1B', 1.8)}</div>
</article>`).join('\n')}
</div>
</section>`;

  const podaci = termo ? `<script type="application/json" id="prod-data">${JSON.stringify({
    prikazi: TERMO.prikazi.map((v) => ({ ime: v.ime, src: urlSlike(v.img), set: srcsetSlike(v.img), fit: v.fit, alt: v.alt })),
    boje: TERMO.boje.map((b) => (b.img ? { id: b.id, src: urlSlike(b.img), set: srcsetSlike(b.img), alt: b.alt, nota: b.nota, fit: 'contain' } : { id: b.id })),
    tacke: TERMO.tacke
  })}</script>` : '';

  const schemaProizvoda = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: m.ime,
    description: m.opis,
    image: [abs(urlSlike(m.slika))],
    url: abs(urlModela(m)),
    category: k.ime,
    brand: { '@type': 'Brand', name: firma.kratkoIme },
    color: m.boje.map((b) => BOJE[b].ime).join(', '),
    ...(p ? { additionalProperty: [
      { '@type': 'PropertyValue', name: 'Broj komora', value: p.komore },
      { '@type': 'PropertyValue', name: 'Dubina profila', value: p.dubina, unitCode: 'MMT' },
      { '@type': 'PropertyValue', name: 'Uw prozora', value: p.uw.replace(',', '.'), unitText: 'W/m²K' },
      { '@type': 'PropertyValue', name: 'Zaptivke po obimu krila', value: p.zaptivke }
    ] } : {})
  };

  const metaOpis = `${m.opis} Merenje na adresi, ponuda po stavkama i ugradnja.`.slice(0, 160).replace(/\s+\S*$/, '').replace(/[,.]?$/, '.');

  return stranica({
    putanja: urlModela(m),
    naslov: `${m.ime}: ${prozor ? `PVC prozor, ${p.komore} komora` : k.ime.toLowerCase()}`,
    opis: metaOpis,
    aktivno: 'proizvodi',
    klasa: `p-prod${termo ? ' p-termo' : ''}`,
    mobilnaTraka: 'ponuda',
    verzija,
    schema: [schemaPutanje([['Početna', '/'], [k.ime, urlKategorije(k)], [m.ime, urlModela(m)]]), schemaProizvoda],
    telo: `<main id="main" tabindex="-1">
<section class="prod-top" aria-labelledby="h-prod">
<div class="wrap">
${putanja([['Početna', '/'], [k.ime, urlKategorije(k)], [m.ime, urlModela(m)]], 'crumbs-prod')}
<div class="prod" data-prod data-model="${m.slug}" data-otv-on="${prozor}">
${galerija}
${info}
</div>
</div>
</section>
${presek}
${uProstoru}
${slicniSek}
${termo ? '' : pozivTraka()}
</main>
${podaci}`
  });
}

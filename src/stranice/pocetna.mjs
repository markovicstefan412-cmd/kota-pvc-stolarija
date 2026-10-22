// Početna stranica: hero sa 3D prozorom koji se otvara na skrol, pa sekcije sajta.
import { firma, sajt, popunjeno } from '../firma.mjs';
import { KATEGORIJE, urlKategorije, urlModela, MODELI } from '../katalog.mjs';
import { esc, slika, srcsetSlike, urlSlike, ikona, kota, nadnaslov, telLink, stranica, abs } from '../sablon.mjs';

const HERO_MOB = '(max-width: 899px), (orientation: portrait) and (max-width: 1199px)';

export const PITANJA = [
  { q: 'Koliko traje ugradnja jednog stana?', a: 'Zavisi od broja otvora i stanja zida. Plan ugradnje po danima dobijate uz ponudu, pre nego što bilo šta platite.' },
  { q: 'Da li se ugradnja radi uz štemovanje?', a: 'Ne, osim ako to sami ne tražite. Stari ram se seče i vadi, a novi ide u isti otvor, uz zaptivanje trakama i penom.' },
  { q: 'Koliko komora mi treba, 5 ili 6?', a: 'Za stan u gradu je 5 komora sa troslojnim staklom dovoljno. Za kuću, potkrovlje i prometnu ulicu preporučujemo 6 ili 7 komora. Na merenju kažemo šta ima smisla za vaš zid.' },
  { q: 'Kako se plaća?', a: firma.uslovPlacanja }
];

const KORACI = [
  ['Merenje', 'Dolazimo na adresu, merimo svaki otvor i gledamo kako je zid zidan. Mere i fotografije ostaju u vašoj ponudi.'],
  ['Ponuda', 'Ponuda po stavkama, sa profilom, staklom i okovom za svaki prozor. Tačno znate šta plaćate i za koji otvor.'],
  ['Izrada', 'Prozori se prave po vašim merama, sa ugrađenom armaturom i okovom. Javljamo vam dan ugradnje čim su spremni.'],
  ['Ugradnja', 'Stari prozori izlaze, novi ulaze, spoj sa zidom se zaptiva trakama. Odlazimo kad je pod čist, a staru stolariju nosimo mi.']
];

const REALIZACIJE = [
  ['realizacija-porodicna-kuca-antracit', 'Moderna porodična kuća sa velikim tamnim prozorima', 'Porodična kuća · PVC antracit', 'r-big'],
  ['realizacija-terasa-klizni-sistem', 'Natkrivena terasa sa nizom staklenih vrata', 'Terasa · klizni sistem', 'r-half'],
  ['realizacija-ugaono-zastakljenje-zlatni-hrast', 'Ugaono zastakljenje u dekoru drveta na kući', 'Kuća · dekor zlatni hrast', 'r-half'],
  ['realizacija-klizna-vrata-dvoriste', 'Bela klizna vrata otvorena ka dvorištu', 'Dvorište · klizna vrata', 'r-sm'],
  ['realizacija-dnevna-soba-panorama', 'Dnevna soba sa panoramskim prozorom u dekoru drveta', 'Dnevna soba · panorama', 'r-sm'],
  ['realizacija-stan-visoki-prozori', 'Svetla dnevna soba sa visokim belim prozorima', 'Stan · visoki prozori', 'r-sm']
];

const TIPOVI = [['jedno', 'Jednokrilni'], ['dvo', 'Dvokrilni'], ['balkon', 'Balkonska vrata'], ['fix', 'Fiksni']];
const PROFILI_KONF = [['70', 'KOTA 70', '5 komora, stan u gradu'], ['76', 'KOTA 76', '6 komora, kuća i stan'], ['82', 'KOTA 82', '7 komora, potkrovlje i buka']];

function hero() {
  const chip = (t) => `<span class="chip"><i class="k-pulse"></i>${t}</span>`;
  const krilo = (strana) => `<div class="wing wing-${strana}">
<img class="wing-f" src="/assets/img/hero-krilo-${strana === 'l' ? 'levo' : 'desno'}-346.webp" width="346" height="574" alt="" decoding="async">
<img class="wing-b" src="/assets/img/hero-krilo-${strana === 'l' ? 'levo' : 'desno'}-unutra-346.webp" width="346" height="574" alt="" decoding="async" fetchpriority="low">
<i class="wing-e"></i><i class="wing-t"></i><i class="wing-u"></i>
</div>`;
  return `<section class="hero" aria-labelledby="h-hero" data-hero>
<div class="hero-stage" data-stage data-a="on" data-c="off">
<picture>
<source media="${HERO_MOB}" srcset="${srcsetSlike('hero-dnevna-soba')}" sizes="100vw">
<img class="hero-scene" src="${urlSlike('hero-spavaca-soba-pogled-na-jezero', 1200)}" srcset="${srcsetSlike('hero-spavaca-soba-pogled-na-jezero')}" sizes="100vw" width="1800" height="1013" alt="" fetchpriority="high" decoding="async">
</picture>
<div class="hero-win" aria-hidden="true">
<div class="hw-mask"></div>
<div class="hw-inner"></div>
<img class="hw-frame" src="/assets/img/hero-ram-prozora-738.webp" width="738" height="618" alt="" fetchpriority="high" decoding="async">
<div class="hw-dim hw-dim-top"><i class="dt"></i><i class="dl"></i><span>1460 MM</span><i class="dl"></i><i class="dt"></i></div>
<div class="hw-dim hw-dim-right"><i class="dt"></i><i class="dl"></i><span>1230 MM</span><i class="dl"></i><i class="dt"></i></div>
<div class="hw-chip hw-chip-l">${chip('RAM 76 MM · 6 KOMORA')}<i class="chip-stem"></i></div>
<div class="hw-chip hw-chip-r">${chip('TROSLOJNO STAKLO · ARGON')}<i class="chip-stem"></i></div>
<div class="hw-chip hw-chip-b"><i class="chip-stem"></i>${chip('TRI ZAPTIVKE PO OBIMU KRILA')}</div>
<div class="hw-chip hw-chip-bm"><i class="chip-stem"></i>${chip('TROSLOJNO STAKLO · 3 ZAPTIVKE')}</div>
${krilo('l')}
${krilo('r')}
</div>
<div class="hero-glare" aria-hidden="true"></div>
<div class="hero-a" data-band-a>
<h1 id="h-hero"><span class="kicker">PVC prozori i vrata po meri</span><span class="hero-h1">Otvorite dom svetlu.</span></h1>
<p class="hero-lead">Prozori i vrata izmereni na milimetar i ugrađeni tako da zimi ne duva, staklo ne rosi i ulica se ne čuje.</p>
<div class="hero-ctas">
<a class="btn btn-dark btn-xl btn-ico" href="/kontakt/">Zakažite merenje<span class="ico-dot">${ikona.strelica(14, '#141C24')}</span></a>
<a class="btn btn-ghost btn-xl" href="${urlKategorije(KATEGORIJE[0])}">Pogledajte proizvode</a>
</div>
<ul class="hero-trust">
<li>Merenje na adresi</li>
<li>Ponuda po stavkama</li>
<li>Odnosimo stare prozore</li>
</ul>
</div>
<div class="hero-cue" aria-hidden="true"><span class="cue-line"><span class="k-cue"></span></span>Skrolujte i otvorite prozor</div>
<div class="hero-c" data-band-c>
<div class="hero-c-shade" aria-hidden="true"></div>
<div class="hero-c-in">
<p class="kicker kicker-dark">Ono što se ne vidi</p>
<h2>Toplo zimi.<br>Tiho uvek.</h2>
<p>Profil, staklo i zaptivanje se ne vide kad je prozor zatvoren. Osetite ih prve zime<span class="d-only">, na računu za grejanje i u tišini sobe</span>.</p>
<a class="btn btn-light btn-lg" href="${urlModela(MODELI[1])}">Upoznajte KOTA 76${ikona.strelica(14, '#141C24')}</a>
</div>
</div>
</div>
</section>`;
}

function proizvodi() {
  const tabovi = KATEGORIJE.map((k, i) => `<button class="k-tab" type="button" role="tab" id="tab-${k.id}" aria-controls="panel-${k.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="pt-n">${k.n}</span><span class="pt-name">${k.imeNaPocetnoj}</span>${ikona.strelica()}</button>`).join('\n');
  const paneli = KATEGORIJE.map((k, i) => {
    const p = k.pocetna;
    return `<div class="pro-panel" role="tabpanel" id="panel-${k.id}" aria-labelledby="tab-${k.id}"${i ? ' hidden' : ''}>
<div class="pro-gal">
<div class="k-card pg-a">${slika(p.a, { alt: p.altA, sizes: '(max-width: 767px) 100vw, 50vw', cls: 'k-zoom' })}</div>
<div class="pg-side">
<div class="k-card pg-b">${slika(p.b, { alt: p.altB, sizes: '(max-width: 767px) 50vw, 30vw', cls: 'k-zoom' })}</div>
<div class="k-card pg-c${p.fitC === 'contain' ? ' is-contain' : ''}">${slika(p.c, { alt: p.altC, sizes: '(max-width: 767px) 50vw, 30vw', cls: 'k-zoom' })}</div>
</div>
</div>
<div class="pro-info">
<div class="pi-l"><h3>${k.imeNaPocetnoj}</h3><p>${p.opis}</p></div>
<div class="pi-r">
<ul class="specs">${p.stavke.map((s) => `<li>${s}</li>`).join('')}</ul>
<a class="btn btn-dark btn-md" href="${urlKategorije(k)}">Pogledajte modele${ikona.strelica(13, '#F26A1B', 1.8)}</a>
</div>
</div>
</div>`;
  }).join('\n');
  return `<section id="proizvodi" class="sec sec-pro" aria-labelledby="h-proizvodi">
<div class="wrap">
<div class="sec-head rv">
<div class="sec-head-l">${nadnaslov('01 · Proizvodi')}<h2 id="h-proizvodi" class="h2">Od prozora do roletne, sve po istoj meri.</h2></div>
<div class="sec-head-r"><p>Jedan merač, jedna ponuda i jedna ekipa za ugradnju. Sve što zatvara kuću dobija istu boju, isti okov i isti rok.</p><a class="link-u d-only" href="${urlKategorije(KATEGORIJE[0])}">Ceo katalog${ikona.strelica()}</a></div>
</div>
<div class="pro-body rv" data-tabs>
<div class="pro-tabs k-scroll" role="tablist" aria-label="Kategorije proizvoda">
${tabovi}
</div>
<div class="pro-panels">
${paneli}
</div>
</div>
</div>
</section>`;
}

function zima() {
  const stavke = [
    ['Ne duva pored prozora.', 'Tri zaptivke po obimu krila i trake oko rama zatvaraju put vazduhu. Plamen sveće na prozorskoj dasci više ne treperi.'],
    ['Staklo ne rosi.', 'Troslojno staklo sa toplom distancer lajsnom drži unutrašnje staklo toplim. Vlaga se ne hvata u uglovima i nema buđi oko rama.'],
    ['Ulica ostaje napolju.', 'Teže staklo i krilo koje dobro naleže spuštaju buku saobraćaja. Spava se uz zatvoren prozor, i leti.']
  ];
  return `<section class="sec sec-zima" aria-labelledby="h-zima">
<div class="wrap zima">
<div class="zima-media rv">
<div class="zm-a">${slika('dnevna-soba-dva-velika-prozora', { alt: 'Dnevna soba sa dva velika prozora i pogledom na zeleno brdo', sizes: '(max-width: 767px) 90vw, 45vw' })}</div>
<div class="zm-b">${slika('kvaka-belo-pvc-krilo-detalj', { alt: 'Kvaka na belom PVC krilu, detalj', sizes: '(max-width: 767px) 140px, 240px' })}</div>
${kota('MERENO NA ADRESI', 'zm-dim')}
</div>
<div class="zima-txt">
<div class="rv">${nadnaslov('Prve zime')}<h2 id="h-zima" class="h2">Tri stvari koje primetite odmah.</h2></div>
<ol class="num-list rv">
${stavke.map(([t, d], i) => `<li><span class="nl-n">0${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('\n')}
</ol>
</div>
</div>
</section>`;
}

function mere() {
  const w = 1400, h = 1400;
  return `<section id="mere" class="sec sec-mere" aria-labelledby="h-mere">
<div class="wrap">
<div class="mere rv" data-config>
<div class="mere-l">
<div class="mere-head">
${nadnaslov('02 · Vaše mere')}
<h2 id="h-mere" class="h2 h2-sm">Unesite mere, nacrtaćemo vam prozor.</h2>
<p>Pomerite klizače na mere otvora u zidu. Tačnu ponudu dobijate posle merenja na adresi, a ove mere nam štede jedan poziv.</p>
</div>
<div class="mere-types" role="group" aria-label="Tip otvaranja">
${TIPOVI.map(([id, ime]) => `<button class="btn tgl" type="button" data-type="${id}" aria-pressed="${id === 'dvo'}">${ime}</button>`).join('\n')}
</div>
<div class="mere-sliders">
<label class="rng"><span class="rng-l">Širina otvora<output data-out="w">${w} mm</output></span><input type="range" min="400" max="2600" step="10" value="${w}" data-in="w"></label>
<label class="rng"><span class="rng-l">Visina otvora<output data-out="h">${h} mm</output></span><input type="range" min="400" max="2600" step="10" value="${h}" data-in="h"></label>
<div class="qty-row"><span class="rng-l">Broj komada</span>
<div class="qty"><button type="button" aria-label="Manje komada" data-qty="-1">−</button><span data-out="qty" aria-live="polite">1</span><button type="button" aria-label="Više komada" data-qty="1">+</button></div>
</div>
</div>
<div class="mere-profs" role="group" aria-label="Profil">
${PROFILI_KONF.map(([id, ime, sub]) => `<button class="prof" type="button" data-prof="${id}" aria-pressed="${id === '76'}"><span class="prof-n">${ime}</span><span class="prof-s">${sub}</span></button>`).join('\n')}
</div>
</div>
<div class="mere-r">
<div class="mere-draw">
<div class="md-box" data-box style="width:430px;height:430px">
<div class="md-dim-w" aria-hidden="true"><i class="dt"></i><i class="dl"></i><span data-out="dw">${w} mm</span><i class="dl"></i><i class="dt"></i></div>
<div class="md-dim-h" aria-hidden="true"><i class="dt"></i><i class="dl"></i><span data-out="dh">${h} mm</span><i class="dl"></i><i class="dt"></i></div>
<div class="md-win" role="img" aria-label="Dvokrilni prozor, ${w} puta ${h} milimetara" data-win></div>
</div>
</div>
<div class="mere-sum">
<div class="ms-txt"><span class="ms-l" data-out="sum">KOTA 76 · Dvokrilni · ${w} × ${h} mm · 1 kom</span><span class="ms-a"><span data-out="area">1,96</span> m² <small>ukupno</small></span></div>
<a class="btn btn-light btn-md" href="/kontakt/" data-send>Pošaljite ove mere${ikona.strelica(13, '#141C24', 1.8)}</a>
</div>
</div>
</div>
</div>
</section>`;
}

function proces() {
  return `<section id="proces" class="sec sec-proces" aria-labelledby="h-proces">
<div class="wrap">
<div class="sec-head rv">
<div class="sec-head-l">${nadnaslov('03 · Kako radimo', 'kicker-dark')}<h2 id="h-proces" class="h2">Od prvog poziva do poslednjeg silikona.</h2></div>
<p class="sec-head-p">Loša ugradnja pokvari i najbolji profil. Zato isti ljudi mere, prate izradu i ugrađuju.</p>
</div>
<div class="steps-wrap rv">
<i class="steps-line" aria-hidden="true"></i>
<ol class="steps">
${KORACI.map(([t, d], i) => `<li><i class="st-dot${i === 3 ? ' is-last' : ''}" aria-hidden="true"></i><span class="st-n">KORAK 0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('\n')}
</ol>
</div>
</div>
</section>`;
}

function realizacije() {
  const fig = ([img, alt, cap, cls]) => `<figure class="k-card real ${cls}">${slika(img, { alt, sizes: cls === 'r-big' ? '(max-width: 767px) 280px, 55vw' : '(max-width: 767px) 280px, 33vw', cls: 'k-zoom' })}<figcaption>${cap}</figcaption></figure>`;
  return `<section id="realizacije" class="sec sec-real" aria-labelledby="h-real">
<div class="wrap">
<div class="sec-head rv">
<div class="sec-head-l">${nadnaslov('04 · Realizacije')}<h2 id="h-real" class="h2">Primeri ugradnje.</h2></div>
<a class="btn btn-ghost btn-md d-only" href="${urlKategorije(KATEGORIJE[0])}">Sve realizacije</a>
</div>
</div>
<div class="real-grid k-scroll rv">
${fig(REALIZACIJE[0])}
<div class="r-col">${fig(REALIZACIJE[1])}${fig(REALIZACIJE[2])}</div>
${REALIZACIJE.slice(3).map(fig).join('\n')}
</div>
<div class="wrap m-only">${kota('PREVUCITE', 'real-dim')}</div>
</section>`;
}

function iskustva() {
  const pitanja = PITANJA.map((f, i) => `<div class="acc-item${i === 0 ? ' is-open' : ''}">
<h3 class="acc-h"><button class="acc-btn" type="button" id="faq-b-${i}" aria-expanded="${i === 0}" aria-controls="faq-${i}">${f.q}<span class="acc-sign" aria-hidden="true"></span></button></h3>
<div class="acc-p" id="faq-${i}" role="region" aria-labelledby="faq-b-${i}"${i === 0 ? '' : ' inert'}><div><p>${esc(f.a)}</p></div></div>
</div>`).join('\n');
  return `<section class="sec sec-faq" aria-labelledby="h-faq">
<div class="wrap faq">
<div class="faq-l">
<div class="rv">${nadnaslov('05 · Iskustva')}<h2 class="h2 h2-faq d-only">Šta kažu ljudi kod kojih smo bili.</h2></div>
<figure class="review rv">
<div class="stars" role="img" aria-label="Ocena: [X] od 5">${ikona.zvezda().repeat(5)}</div>
<blockquote>[Ovde ide prava recenzija klijenta sa Google profila firme.]</blockquote>
<figcaption>[Ime klijenta] · [Opština]</figcaption>
</figure>
<figure class="review review-2 rv d-only">
<blockquote>[Druga recenzija sa Google profila.]</blockquote>
<figcaption>[Ime klijenta] · [Opština]</figcaption>
</figure>
</div>
<div class="faq-r rv">
<h2 id="h-faq" class="h-faq">Pitanja koja dobijamo na svakom merenju</h2>
<div class="acc" data-acc>
${pitanja}
</div>
</div>
</div>
</section>`;
}

function ponuda() {
  return `<section id="ponuda" class="sec sec-ponuda" aria-labelledby="h-ponuda">
<div class="wrap">
<div class="ponuda rv">
<div class="pon-txt">
${nadnaslov('Merenje', 'kicker-dark')}
<h2 id="h-ponuda" class="h2 h2-sm">Ostavite broj, mi dolazimo sa metrom.</h2>
<form class="pon-form" action="#ponuda" method="post" data-demo-form novalidate>
<div class="f-row">
<label class="fld fld-dark"><span>Ime i prezime</span><input name="ime" required autocomplete="name" placeholder="Petar Petrović"></label>
<label class="fld fld-dark"><span>Telefon</span><input name="telefon" type="tel" required autocomplete="tel" placeholder="06x xxx xxxx"></label>
</div>
<label class="fld fld-dark"><span>Opština</span><input name="opstina" autocomplete="address-level2" placeholder="Npr. Voždovac"></label>
<div class="pon-actions">
<button class="btn btn-light btn-lg" type="submit">Zakažite merenje</button>
<span class="pon-or">Ili pozovite <a href="${telLink()}">${esc(firma.telefon)}</a></span>
</div>
<p class="f-note">Zovemo vas da dogovorimo termin. Broj koristimo samo za ovaj upit.</p>
</form>
<div class="pon-ok" role="status" hidden>
<span class="ok-k">Upit je primljen</span>
<p>Hvala. Zovemo vas da dogovorimo dan merenja.</p>
${sajt.demo ? '<p class="f-note">Demo forma: podaci se nigde ne šalju.</p>' : ''}
</div>
</div>
<div class="pon-img">${slika('beli-pvc-prozor-na-kip-jesen', { alt: 'Beli PVC prozor otvoren na kip, pogled na jesenje dvorište', sizes: '(max-width: 767px) 100vw, 45vw' })}</div>
</div>
</div>
</section>`;
}

export function pocetna(verzija) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PITANJA.filter((f) => popunjeno(f.a)).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  };
  const webSite = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': abs('/#sajt'), name: firma.ime, url: abs('/'), inLanguage: sajt.jezik, publisher: { '@id': abs('/#firma') } };
  return stranica({
    putanja: '/',
    naslov: `PVC prozori i vrata po meri | ${firma.ime}`,
    opis: 'PVC prozori, balkonska i ulazna vrata, klizni sistemi i roletne po meri. Merenje na adresi, ponuda po stavkama i ugradnja bez nereda.',
    klasa: 'p-home',
    verzija,
    schema: [webSite, faqSchema],
    head: `<link rel="preload" as="image" href="/assets/img/hero-ram-prozora-738.webp" fetchpriority="high">
<link rel="preload" as="image" href="/assets/img/hero-krilo-levo-346.webp">
<link rel="preload" as="image" href="/assets/img/hero-krilo-desno-346.webp">
`,
    telo: `${hero()}
<main id="main" tabindex="-1">
${proizvodi()}
${zima()}
${mere()}
${proces()}
${realizacije()}
${iskustva()}
${ponuda()}
</main>`
  });
}

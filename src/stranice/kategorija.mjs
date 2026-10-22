// Stranica kategorije (katalog). Svaka kategorija ima svoj URL; modeli su u HTML-u,
// a JavaScript samo filtrira i sortira već prikazane kartice.
import { firma } from '../firma.mjs';
import { KATEGORIJE, BOJE, PROFILI, urlKategorije, urlModela, modeliKategorije, modela } from '../katalog.mjs';
import { esc, slika, ikona, kota, nadnaslov, putanja, stranica, schemaPutanje, abs } from '../sablon.mjs';

const GRUPE = [
  ['komore', 'Broj komora', [['5', '5 komora'], ['6', '6 komora'], ['7', '7 komora']]],
  ['boja', 'Boja', [['bela', 'Bela'], ['antracit', 'Antracit'], ['drvo', 'Dekor drveta']]],
  ['otv', 'Otvaranje', [['jedno', 'Jednokrilni'], ['dvo', 'Dvokrilni'], ['kombi', 'Kombinovani']]]
];
const SORT = [['prep', 'Preporučeno'], ['topli', 'Najtopliji'], ['komore', 'Broj komora']];

export function boje(lista, cls = 'swatches') {
  const imena = lista.map((b) => BOJE[b].ime).join(', ');
  return `<span class="${cls}" role="img" aria-label="Dostupne boje: ${imena}">${lista.map((b) => `<i style="background:${BOJE[b].hex}"></i>`).join('')}</span>`;
}

export function kartica(m, { uporedi = false, nivo = 'h2' } = {}) {
  const p = m.profil ? PROFILI[m.profil] : null;
  const data = p ? ` data-komore="${p.komore}" data-uw="${p.uw.replace(',', '.')}" data-boja="${m.boja}" data-otv="${m.otv}"` : '';
  return `<article class="k-prod"${data} data-i="${m.id}">
<div class="kp-img${m.fit === 'contain' ? ' is-contain' : ''}">
${slika(m.slika, { alt: m.alt, sizes: '(max-width: 767px) 92vw, (max-width: 1100px) 45vw, 300px', cls: 'k-zoom' })}
${m.tag ? `<span class="tag">${m.tag}</span>` : ''}
${uporedi ? `<button class="kp-cmp d-only" type="button" aria-pressed="false" data-cmp="${m.id}">+ Uporedi</button>` : ''}
</div>
<div class="kp-body">
<${nivo} class="kp-name"><a class="k-link" href="${urlModela(m)}">${m.ime}</a></${nivo}>
<span class="kp-spec">${m.spec}</span>
${boje(m.boje, 'swatches kp-colors')}
<a class="kp-more k-link" href="${urlModela(m)}" tabindex="-1" aria-hidden="true"><span>Detalji<span class="m-only">&nbsp;i mere</span></span>${ikona.strelica(13, '#F26A1B', 1.8)}</a>
</div>
</article>`;
}

export function poredjenje() {
  const red = (naziv, vr, poslednji = false) => `<tr${poslednji ? ' class="last"' : ''}><th scope="row">${naziv}</th>${vr.map((v, i) => `<td${i === 1 ? ' class="rec"' : ''}>${v}</td>`).join('')}</tr>`;
  const P = [PROFILI[70], PROFILI[76], PROFILI[82]];
  return `<section id="poredjenje" class="sec sec-por" aria-labelledby="h-por">
<div class="wrap">
<div class="sec-head rv">
<div class="sec-head-l">${nadnaslov('Tri profila')}<h2 id="h-por" class="h2 h2-sm">Koji profil za koji zid.</h2></div>
<p class="sec-head-p">Više komora znači manje toplote kroz ram. Razlika se najviše oseti na velikim prozorima i na severnoj strani.</p>
</div>
<div class="tbl-wrap k-scroll rv">
<table class="tbl">
<caption class="sr-only">Poređenje profila KOTA 70, KOTA 76 i KOTA 82</caption>
<thead><tr><th scope="col">Svojstvo</th><th scope="col">KOTA 70</th><th scope="col" class="rec"><span class="rec-k">Preporuka</span>KOTA 76</th><th scope="col">KOTA 82</th></tr></thead>
<tbody>
${red('Broj komora', P.map((p) => p.komore))}
${red('Dubina profila', P.map((p) => `${p.dubina} mm`))}
${red('Zaptivke po obimu', P.map((p) => p.zaptivke))}
${red('Staklo do', P.map((p) => p.staklo))}
${red('Uw prozora do', P.map((p) => `${p.uw} W/m²K`))}
${red('Najčešće za', P.map((p) => p.za), true)}
</tbody>
</table>
</div>
</div>
</section>`;
}

export function pozivTraka(naslov = 'Mere uzimamo mi. Vi samo izaberete.', tekst = 'Ponesemo uzorke profila, boja i kvaka, pa birate kod kuće, uz pravo svetlo.') {
  return `<section class="sec sec-poziv" aria-labelledby="h-poziv">
<div class="wrap">
<div class="poziv rv">
<div><h2 id="h-poziv">${naslov}</h2><p>${tekst}</p></div>
<a class="btn btn-light btn-lg" href="/kontakt/">Zakažite merenje${ikona.strelica(13, '#141C24', 1.8)}</a>
</div>
</div>
</section>`;
}

export function kategorijaStranica(k, verzija) {
  const modeli = modeliKategorije(k.id);
  const prozori = k.id === 'prozori';
  const n = modeli.length;
  const cipovi = KATEGORIJE.map((c) => `<a class="chip-l" href="${urlKategorije(c)}"${c.id === k.id ? ' aria-current="page"' : ''}>${c.ime}<span>${modeliKategorije(c.id).length}</span></a>`).join('\n');
  const filteri = prozori
    ? `${GRUPE.map(([key, label, opts]) => `<fieldset class="fgroup"><legend>${label}</legend><div class="fopts">${opts.map(([v, ime]) => `<button class="fopt" type="button" aria-pressed="false" data-f="${key}" data-v="${v}"><i aria-hidden="true"></i>${ime}</button>`).join('')}</div></fieldset>`).join('\n')}
<div class="f-apply m-only"><button class="btn btn-ghost btn-sm" type="button" data-reset>Poništi</button><button class="btn btn-dark btn-sm" type="button" data-close-f>Prikaži <span data-count-n>${n}</span> ${modela(n)}</button></div>`
    : '<p class="f-none">U ovoj kategoriji biramo zajedno na merenju, prema otvoru i strani sveta.</p>';

  const lista = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: k.ime,
    numberOfItems: n,
    itemListElement: modeli.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(urlModela(m)), name: m.ime }))
  };

  return stranica({
    putanja: urlKategorije(k),
    naslov: k.naslov,
    opis: k.metaOpis,
    aktivno: 'proizvodi',
    klasa: 'p-kat',
    verzija,
    schema: [schemaPutanje([['Početna', '/'], [k.ime, urlKategorije(k)]]), lista],
    telo: `<main id="main" tabindex="-1">
<section class="kat-top" aria-labelledby="h-kat">
<div class="wrap">
${putanja([['Početna', '/'], ['Proizvodi', ''], [k.ime, urlKategorije(k)]])}
<div class="kat-head">
<div class="kat-head-l">
<h1 id="h-kat" class="h1">${k.ime}</h1>
<p>${k.intro}</p>
</div>
<div class="kat-head-r">
${kota(`${n} ${modela(n).toUpperCase()}`)}
<p class="d-only">Svaki model pravimo po meri otvora. Cena se računa posle merenja na adresi.</p>
</div>
</div>
<nav class="kat-chips k-scroll" aria-label="Kategorije proizvoda">
${cipovi}
</nav>
</div>
</section>

<section class="kat-list" aria-label="Modeli" data-katalog>
${prozori ? `<div class="kat-mbar m-only">
<button class="btn btn-ghost btn-sm" type="button" aria-expanded="false" aria-controls="filteri" data-open-f>${ikona.filteri()}<span data-f-label>Filteri</span></button>
<button class="btn sort-cycle" type="button" data-sort-cycle><span class="sc-k">Sort</span><span data-sort-name>Preporučeno</span></button>
</div>` : ''}
<div class="wrap kat-layout">
<aside class="kat-aside" aria-label="Filteri">
<div class="kat-filters${prozori ? '' : ' is-static'}" id="filteri">
<div class="kf-head"><span>Filteri</span>${prozori ? '<button type="button" class="kf-reset" data-reset>Poništi</button>' : ''}</div>
${filteri}
</div>
<div class="kat-help d-only">
<span class="kh-k">Ne znate šta birate</span>
<p>Na merenju vam kažemo koji profil ima smisla za vaš zid i vaš račun.</p>
<a class="btn btn-light btn-sm" href="/kontakt/">Zakažite merenje</a>
</div>
</aside>
<div class="kat-main">
<div class="kat-tools">
<span class="kat-count" role="status" data-count>Prikazano: ${n} ${modela(n)}</span>
${prozori ? `<div class="seg d-only" role="group" aria-label="Sortiranje">${SORT.map(([id, ime]) => `<button type="button" data-sort="${id}" aria-pressed="${id === 'prep'}">${ime}</button>`).join('')}</div>` : ''}
</div>
<div class="kat-grid" data-grid>
${modeli.map((m) => kartica(m, { uporedi: prozori })).join('\n')}
</div>
<div class="kat-empty" data-empty hidden>
<span>Nema modela sa ovim filterima.</span>
<p>Probajte drugu kombinaciju ili nas pitajte. Neke boje radimo i po narudžbini.</p>
<button class="btn btn-ghost btn-sm" type="button" data-reset>Poništi filtere</button>
</div>
${prozori ? `<div class="cmp-tray" role="status" data-tray hidden>
<span data-tray-label>U poređenju: 0 od 3</span>
<div><button type="button" class="btn btn-sm cmp-clear" data-cmp-clear>Očisti</button><a class="btn btn-light btn-sm" href="#poredjenje">Uporedite profile</a></div>
</div>` : ''}
</div>
</div>
</section>
${prozori ? poredjenje() : ''}
${pozivTraka()}
</main>`
  });
}

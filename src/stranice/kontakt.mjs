// Kontakt: forma za upit sa merama otvora. Mere i model se popunjavaju sami
// kada posetilac dođe sa konfiguratora ili stranice proizvoda.
import { firma, sajt } from '../firma.mjs';
import { MODELI, kategorija } from '../katalog.mjs';
import { esc, ikona, putanja, stranica, schemaPutanje, telLink, mailLink, abs } from '../sablon.mjs';

const POTREBE = ['PVC prozori', 'Balkonska vrata', 'Klizni sistem', 'Ulazna vrata', 'Roletne', 'Komarnici'];
const POTREBA_KAT = { prozori: 'PVC prozori', balkon: 'Balkonska vrata', klizni: 'Klizni sistem', vrata: 'Ulazna vrata', oprema: 'Roletne' };

const red = (i) => `<div class="mrow" data-row>
<span class="mrow-n" aria-hidden="true">${String(i).padStart(2, '0')}</span>
<span class="mrow-t m-only">Otvor <span data-row-n>${String(i).padStart(2, '0')}</span></span>
<label class="fld"><span class="mrow-l">Širina<span class="d-only">, mm</span></span><input class="k-in" type="number" inputmode="numeric" placeholder="1400" min="300" max="6000" name="sirina[]"></label>
<label class="fld"><span class="mrow-l">Visina<span class="d-only">, mm</span></span><input class="k-in" type="number" inputmode="numeric" placeholder="1400" min="300" max="6000" name="visina[]"></label>
<label class="fld"><span class="mrow-l">Kom<span class="d-only">ada</span></span><input class="k-in" type="number" inputmode="numeric" placeholder="1" min="1" max="99" name="komada[]"></label>
<button class="mrow-x" type="button" aria-label="Uklonite otvor ${i}" data-row-x>×</button>
</div>`;

export function kontaktStranica(verzija) {
  const modeli = Object.fromEntries(MODELI.map((m) => [m.slug, { ime: m.ime, potreba: m.slug === 'rolo-komarnik' ? 'Komarnici' : POTREBA_KAT[m.kat] }]));
  const kontaktSchema = { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Zatražite ponudu', url: abs('/kontakt/'), about: { '@id': abs('/#firma') } };
  return stranica({
    putanja: '/kontakt/',
    naslov: 'Kontakt i zakazivanje merenja',
    opis: 'Zakažite merenje na adresi ili zatražite ponudu za PVC prozore i vrata. Pošaljite mere otvora ili samo broj telefona, a ponudu dobijate po stavkama.',
    aktivno: 'kontakt',
    klasa: 'p-kontakt',
    mobilnaTraka: '',
    verzija,
    schema: [schemaPutanje([['Početna', '/'], ['Kontakt', '/kontakt/']]), kontaktSchema],
    telo: `<main id="main" tabindex="-1">
<section class="kon-top" aria-labelledby="h-kontakt">
<div class="wrap">
${putanja([['Početna', '/'], ['Kontakt', '/kontakt/']], 'd-only')}
<div class="kon-head">
<div class="kon-head-l">
<h1 id="h-kontakt" class="h1">Zatražite ponudu.</h1>
<p>Pošaljite mere ili samo broj telefona. Na merenje dolazimo sa uzorcima, a ponudu dobijate po stavkama, za svaki otvor posebno.</p>
</div>
<ol class="kon-steps" aria-label="Šta sledi">
<li><i class="ks-t" aria-hidden="true"></i><span class="ks-n">01</span><span class="ks-l">Pošaljete upit</span></li>
<li><i class="ks-t" aria-hidden="true"></i><span class="ks-n">02</span><span class="ks-l">Dogovaramo merenje</span></li>
<li><i class="ks-t" aria-hidden="true"></i><i class="ks-t ks-end" aria-hidden="true"></i><span class="ks-n">03</span><span class="ks-l">Dobijate ponudu</span></li>
</ol>
</div>
</div>
</section>

<section id="forma" class="kon-body" aria-label="Forma za upit">
<div class="wrap kon-layout">
<div class="kon-card rv">
<form class="kon-form" action="#forma" method="post" data-kontakt-form novalidate>
<fieldset class="kf-set">
<legend><span class="lg-n">01</span><span class="lg-t">Šta vam treba</span></legend>
<div class="needs">
${POTREBE.map((n, i) => `<button class="need k-chip" type="button" aria-pressed="${i === 0}" data-need="${n}"><i aria-hidden="true"></i>${n}</button>`).join('\n')}
</div>
</fieldset>

<fieldset class="kf-set">
<legend><span class="lg-n">02</span><span class="lg-t">Mere otvora</span></legend>
<button class="switch" type="button" role="switch" aria-checked="false" data-visit><span class="sw-track" aria-hidden="true"><span class="sw-knob"></span></span>Ne znam mere, dođite da izmerite</button>
<div class="mrows" data-rows>
<div class="mrow-head d-only" aria-hidden="true"><span></span><span>Širina, mm</span><span>Visina, mm</span><span>Komada</span><span></span></div>
<div data-row-list>
${red(1)}
${red(2)}
</div>
<button class="btn btn-add" type="button" data-row-add><span aria-hidden="true">+</span>Dodajte otvor</button>
</div>
<p class="visit-note" data-visit-note hidden>U redu. Merimo sve otvore na adresi i ponesemo uzorke profila i boja.</p>
</fieldset>

<fieldset class="kf-set">
<legend><span class="lg-n">03</span><span class="lg-t">Kontakt</span></legend>
<div class="kf-grid">
<label class="fld"><span>Ime i prezime *</span><input class="k-in" name="ime" required autocomplete="name" placeholder="Petar Petrović"></label>
<label class="fld"><span>Telefon *</span><input class="k-in" name="telefon" type="tel" required autocomplete="tel" placeholder="06x xxx xxxx"></label>
<label class="fld"><span>Email</span><input class="k-in" name="email" type="email" autocomplete="email" placeholder="ime@primer.rs"></label>
<label class="fld"><span>Opština ili mesto *</span><input class="k-in" name="mesto" required autocomplete="address-level2" placeholder="Npr. Voždovac"></label>
</div>
<div class="places" role="group" aria-label="Tip objekta">
<span class="pl-l d-only">Objekat</span>
${['Stan', 'Kuća', 'Poslovni prostor'].map((p, i) => `<button class="place k-chip" type="button" aria-pressed="${i === 0}" data-place="${p}">${p}</button>`).join('\n')}
</div>
<label class="fld"><span>Napomena</span><textarea class="k-in" name="napomena" rows="4" placeholder="Sprat, da li ima lifta, kada vam odgovara da dođemo..." data-note></textarea></label>
<label class="file">${ikona.otpremi()}<span class="file-t"><span class="file-h"><span class="d-only">Dodajte fotografije ili skicu</span><span class="m-only">Slikajte postojeće prozore</span></span><span class="file-s" data-file-label>Slika postojećih prozora nam pomaže da ponesemo pravi alat.</span></span><input type="file" multiple accept="image/*,.pdf" data-file></label>
</fieldset>

<div class="kf-end">
<label class="consent"><input type="checkbox" required name="saglasnost">Slažem se da me kontaktirate povodom ovog upita. Podatke ne delimo dalje.</label>
<div class="kf-submit">
<button class="btn btn-dark btn-xl btn-ico" type="submit">Pošaljite upit<span class="ico-dot">${ikona.strelica(14, '#141C24')}</span></button>
<span class="kf-sum" data-sum>PVC PROZORI · STAN · 2 OTVORA</span>
</div>
<p class="f-err" data-err role="alert" hidden></p>
</div>
</form>
<div class="kon-ok" role="status" data-ok hidden tabindex="-1">
<span class="ok-ico">${ikona.stiklir(28)}</span>
<h2>Upit je primljen.</h2>
<p>Zovemo vas da dogovorimo dan merenja. Ako ste dodali mere, ponesemo i okvirnu računicu.</p>
<span class="ok-sum" data-ok-sum></span>
${sajt.demo ? '<p class="f-note">Demo forma: podaci se nigde ne šalju.</p>' : ''}
<button class="btn btn-ghost btn-md" type="button" data-again>Pošaljite novi upit</button>
</div>
</div>

<aside class="kon-aside" aria-label="Salon i kontakt">
<div class="salon rv">
<span class="salon-k">Salon i telefon</span>
<a class="salon-tel" href="${telLink()}">${esc(firma.telefon)}</a>
<dl>
<div><dt>Adresa</dt><dd>${esc(firma.adresa)}</dd></div>
<div><dt>Email</dt><dd><a href="${mailLink()}">${esc(firma.email)}</a></dd></div>
<div><dt>Radno vreme</dt><dd>${esc(firma.radnoVreme)}</dd></div>
</dl>
</div>
<figure class="map rv">
<svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<rect width="400" height="300" fill="#E6EBED"/>
<g fill="#D7DEE2"><rect x="20" y="20" width="90" height="70" rx="6"/><rect x="130" y="20" width="120" height="70" rx="6"/><rect x="270" y="20" width="110" height="70" rx="6"/><rect x="20" y="110" width="90" height="80" rx="6"/><rect x="270" y="110" width="110" height="80" rx="6"/><rect x="20" y="210" width="90" height="70" rx="6"/><rect x="130" y="210" width="120" height="70" rx="6"/><rect x="270" y="210" width="110" height="70" rx="6"/></g>
<rect x="130" y="110" width="120" height="80" rx="6" fill="#CFE1D3"/>
<g stroke="#FFFFFF" stroke-width="10" fill="none"><line x1="0" y1="100" x2="400" y2="100"/><line x1="0" y1="200" x2="400" y2="200"/><line x1="120" y1="0" x2="120" y2="300"/><line x1="260" y1="0" x2="260" y2="300"/></g>
<path d="M0 286 C120 250 220 300 400 240" stroke="#F7C9A8" stroke-width="14" fill="none"/>
</svg>
<span class="pin" aria-hidden="true"><i class="k-pin"></i><b></b></span>
<figcaption>[Mapa lokacije salona]</figcaption>
</figure>
<div class="bring d-only rv">
<span class="bring-k">Na merenje donosimo</span>
<ul>
<li>Preseke profila KOTA 70, 76 i 82</li>
<li>Uzorke boja i dekora drveta</li>
<li>Kvake, da ih probate u ruci</li>
</ul>
</div>
</aside>
</div>
</section>
</main>
<script type="application/json" id="modeli-data">${JSON.stringify(modeli)}</script>`
  });
}

export function greskaStranica(verzija) {
  return stranica({
    putanja: '/404.html',
    naslov: 'Stranica nije pronađena',
    opis: 'Stranica koju tražite ne postoji ili je premeštena.',
    klasa: 'p-404',
    verzija,
    noindex: true,
    telo: `<main id="main" tabindex="-1">
<section class="e404">
<div class="wrap">
<div class="dim e404-dim" aria-hidden="true"><i class="dt"></i><i class="dl"></i><span>404 MM</span><i class="dl"></i><i class="dt"></i></div>
<h1 class="h1">Ovaj otvor nismo izmerili.</h1>
<p>Stranica koju tražite ne postoji ili je premeštena. Probajte neku od ovih:</p>
<div class="e404-links">
<a class="btn btn-dark btn-lg" href="/">Početna</a>
<a class="btn btn-ghost btn-lg" href="/pvc-prozori/">PVC prozori</a>
<a class="btn btn-ghost btn-lg" href="/kontakt/">Kontakt</a>
</div>
</div>
</section>
</main>`
  });
}

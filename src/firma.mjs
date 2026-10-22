// PODACI FIRME: sve na jednom mestu.
// Kada budete imali prave podatke, zamenite vrednosti u uglastim zagradama
// i pokrenite `npm run build`. Polja koja ostanu u [ZAGRADAMA] se ne upisuju
// u podatke za Google (schema.org), a na sajtu se prikazuju kao placeholder.

export const firma = {
  ime: 'KOTA stolarija',
  kratkoIme: 'KOTA',
  slogan: 'Stolarija po meri',
  opis: 'PVC prozori, vrata, klizni sistemi i roletne. Mereno na adresi, napravljeno po meri, ugrađeno bez nereda.',
  telefon: '[TELEFON]', // npr. '+381 60 123 4567'
  email: '[EMAIL]', // npr. 'info@kota-stolarija.rs'
  adresa: '[ADRESA SALONA]', // npr. 'Bulevar oslobođenja 12'
  mesto: '[MESTO]', // npr. 'Beograd'
  postanskiBroj: '[POŠTANSKI BROJ]',
  radnoVreme: '[RADNO VREME]', // npr. 'Pon–pet 8–18, sub 9–14'
  oblastRada: '[OBLAST RADA]', // npr. 'Beograd i okolina'
  uslovPlacanja: '[Uslovi plaćanja firme, na primer avans pri potpisivanju i ostatak na dan ugradnje.]'
};

export const sajt = {
  // Puna adresa sajta (bez kose crte na kraju). Koristi se za canonical linkove,
  // sitemap.xml i slike za deljenje na mrežama. Za pravi domen: 'https://www.domen.rs'.
  url: 'https://markovicstefan412-cmd.github.io/kota-pvc-stolarija',
  // Putanja sajta kada nije na korenu domena (GitHub Pages projekat).
  // Za pravi domen ostavite prazno: ''.
  osnova: '/kota-pvc-stolarija',
  jezik: 'sr-Latn',
  lokal: 'sr_RS',
  // true: u footeru piše da je brend izmišljen i forme samo prikazuju potvrdu.
  demo: true,
  // false: dodaje noindex na sve stranice (npr. dok je sajt u izradi na javnoj adresi).
  // Demo na GitHub Pages se ne indeksira; za pravi sajt sa domenom stavite true.
  indeksiraj: false,
  godina: 2026
};

// Da li je polje popunjeno pravim podatkom (a ne placeholderom u [zagradama]).
export const popunjeno = (v) => typeof v === 'string' && v.trim() !== '' && !v.trim().startsWith('[');

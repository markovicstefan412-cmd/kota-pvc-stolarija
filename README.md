# KOTA stolarija: sajt

Statički sajt (HTML, CSS i JavaScript, bez frejmvorka), napravljen po dizajnu iz Claude Design artifakta.
Gotov sajt je u folderu **`docs/`**. GitHub Pages objavljuje taj folder, a isti folder ide i na običan hosting.

Demo online: https://markovicstefan412-cmd.github.io/kota-pvc-stolarija/

## Pregled na računaru

```
npm run start
```

Zatim otvorite adresu koju ispiše (http://localhost:4173/kota-pvc-stolarija/).

## Kako se menjaju podaci firme

Svi podaci (ime, telefon, email, adresa, mesto, radno vreme, domen) su u jednom fajlu:
**`src/firma.mjs`**. Zamenite vrednosti u [UGLASTIM ZAGRADAMA] i pokrenite:

```
npm run build
```

Polja koja ostanu u zagradama ne ulaze u podatke za Google.

## Prelazak sa GitHub Pages na pravi domen

U `src/firma.mjs`:

1. `url`: pravi domen, npr. `'https://www.domen.rs'`
2. `osnova`: `''` (prazno, sajt je na korenu domena)
3. `indeksiraj`: `true` (da Google indeksira sajt)

Pa `npm run build` i postavite sadržaj foldera `docs/` na hosting.

## Struktura

| Folder / fajl | Šta je |
| --- | --- |
| `src/firma.mjs` | Podaci firme, domen i putanja sajta |
| `src/katalog.mjs` | Kategorije, modeli, profili (tekstovi i specifikacije) |
| `src/stranice/` | Šabloni stranica: početna, kategorija, proizvod, kontakt |
| `src/assets/main.css`, `main.js` | Izgled i animacije |
| `izvor/slike/` | Originalne slike iz dizajna (sa SEO imenima) |
| `scripts/` | Optimizacija slika, preuzimanje fontova, lokalni server |
| `docs/` | Generisan sajt (GitHub Pages / hosting) |

Nove slike: stavite ih u `izvor/slike/`, pa `npm run slike` i `npm run build` (treba ffmpeg).

## Stranice (23)

- početna sa 3D prozorom koji se otvara na skrol
- 5 kategorija: `pvc-prozori/`, `balkonska-vrata/`, `klizni-sistemi/`, `ulazna-vrata/`, `roletne-i-oprema/`
- 15 modela, npr. `pvc-prozori/kota-76-termo/`
- `kontakt/` i `404.html`

## SEO: šta je urađeno

- Svaka stranica ima svoj naslov, opis, canonical link i Open Graph sliku za deljenje
- Strukturirani podaci (schema.org): firma, FAQ, putanja (breadcrumb), lista modela, proizvod
- `sitemap.xml` i `robots.txt` se prave automatski
- Sav tekst je u HTML-u (Google ga čita bez JavaScript-a), jedan H1 po stranici
- Slike u WebP formatu sa više veličina (srcset), lenjo učitavanje ispod prvog ekrana
- Fontovi su lokalni (bez poziva ka Google Fonts), CSS i JS imaju verziju za keširanje
- `.htaccess` sa kompresijom i keširanjem za Apache/LiteSpeed hosting (npr. Hostinger)

Demo na GitHub Pages ima `noindex` (Google ga ne prikazuje u pretrazi), da se demo sa izmišljenim
brendom ne bi takmičio sa pravim sajtom kasnije.

## Pre objavljivanja pravog sajta

1. U `src/firma.mjs` upišite pravi domen i prave podatke firme, pa `npm run build`.
2. Forme su trenutno demo (`demo: true`): prikazuju potvrdu, ali se podaci nigde ne šalju.
3. Posle objave: prijavite sajt u Google Search Console i pošaljite `sitemap.xml`.
4. Najveći uticaj na lokalni Google: Google Business profil firme sa pravom adresom i recenzijama.

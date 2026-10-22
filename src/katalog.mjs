// Kategorije, modeli i profili. Tekstovi su iz dizajna; svaka kategorija i svaki model
// dobijaju svoju stranicu sa sopstvenim URL-om, naslovom i opisom za Google.

export const BOJE = {
  bela: { ime: 'Bela', hex: '#FFFFFF' },
  antracit: { ime: 'Antracit', hex: '#3B4247' },
  hrast: { ime: 'Zlatni hrast', hex: '#B07A45' },
  siva: { ime: 'Siva', hex: '#9AA2A8' }
};

export const PROFILI = {
  70: { komore: 5, dubina: 70, zaptivke: 2, staklo: '40 mm, dvoslojno', uw: '1,1', za: 'Stan u gradu' },
  76: { komore: 6, dubina: 76, zaptivke: 3, staklo: '48 mm, troslojno', uw: '0,9', za: 'Kuću i stan' },
  82: { komore: 7, dubina: 82, zaptivke: 3, staklo: '52 mm, troslojno', uw: '0,8', za: 'Potkrovlje i prometnu ulicu' }
};

export const KATEGORIJE = [
  {
    id: 'prozori', slug: 'pvc-prozori', n: '01', ime: 'PVC prozori', imeNaPocetnoj: 'PVC prozori',
    intro: 'Šest modela na tri profila. Svi imaju okov sa mikroventilacijom i krilo koje se otvara krilno i na kip.',
    naslov: 'PVC prozori po meri: 5, 6 i 7 komora',
    metaOpis: 'PVC prozori po meri na profilima od 70, 76 i 82 mm. Dvoslojno ili troslojno staklo, bela, antracit i dekor drveta. Merenje na adresi i ugradnja bez nereda.',
    pocetna: {
      a: 'beli-pvc-prozor-na-kip-jesen', b: 'beli-prozor-tamni-zid-zelenilo', c: 'siroki-beli-prozor-basta', fitC: 'cover',
      altA: 'Beli PVC prozor otvoren na kip, pogled na jesenje dvorište', altB: 'Beli prozor u tamnom zidu sa pogledom na zelenilo', altC: 'Široki beli prozor sa više polja ka bašti',
      opis: 'Jednokrilni, dvokrilni i fiksni, sa okovom koji otvara krilo na dva načina, krilno i na kip. Profil biramo prema tome koliko je hladno i koliko je bučno ispod prozora.',
      stavke: ['5, 6 ili 7 komora', 'Dvoslojno ili troslojno staklo', 'Bela, antracit i dekor drveta']
    }
  },
  {
    id: 'balkon', slug: 'balkonska-vrata', n: '02', ime: 'Balkonska vrata', imeNaPocetnoj: 'Balkonska vrata',
    intro: 'Vrata za izlaz na terasu i balkon, sa niskim pragom i kvakom sa obe strane.',
    naslov: 'PVC balkonska vrata sa niskim pragom',
    metaOpis: 'PVC balkonska vrata po meri, jednokrilna i dvokrilna, sa niskim aluminijumskim pragom i kvakom sa obe strane. Merenje na adresi i ugradnja.',
    pocetna: {
      a: 'bela-balkonska-vrata-kuhinja', b: 'otvorena-vrata-ka-basti', c: 'visoka-bela-balkonska-vrata', fitC: 'cover',
      altA: 'Bela balkonska vrata u kuhinji', altB: 'Otvorena vrata ka bašti, sunce na podu', altC: 'Visoka bela balkonska vrata u enterijeru',
      opis: 'Široko krilo, nizak prag i kvaka sa obe strane. Vrata kroz koja se izlazi bez podizanja noge i koja se zatvaraju bez promaje.',
      stavke: ['Niski prag od aluminijuma', 'Kvaka sa obe strane', 'Opcija sa ključem']
    }
  },
  {
    id: 'klizni', slug: 'klizni-sistemi', n: '03', ime: 'Klizni sistemi', imeNaPocetnoj: 'Klizni sistemi',
    intro: 'Kad otvoreno krilo ne sme da zauzme prostor u sobi. Za terase, dnevne sobe i zimske bašte.',
    naslov: 'Klizni sistemi za terase i dnevne sobe',
    metaOpis: 'Paralelno klizni i sklopivi sistemi za terase, dnevne sobe i zimske bašte. Velike staklene površine i krilo koje ne zauzima prostor u sobi.',
    pocetna: {
      a: 'klizni-stakleni-zid-dnevna-soba', b: 'sklopiva-harmonika-vrata-terasa', c: 'klizna-vrata-unutrasnje-dvoriste', fitC: 'cover',
      altA: 'Svetla dnevna soba sa kliznim staklenim zidom', altB: 'Sklopiva staklena vrata otvorena ka terasi', altC: 'Klizna vrata ka unutrašnjem dvorištu sa biljkama',
      opis: 'Za terase i dnevne sobe gde otvoreno krilo ne sme da zauzme prostor. Krilo se podigne, klizne u stranu i spusti nazad na zaptivku.',
      stavke: ['Podizno klizni i paralelno klizni', 'Velike staklene površine', 'Meko zaustavljanje krila']
    }
  },
  {
    id: 'vrata', slug: 'ulazna-vrata', n: '04', ime: 'Ulazna vrata', imeNaPocetnoj: 'Ulazna vrata',
    intro: 'Ulazna vrata od PVC-a i aluminijuma, sa zaključavanjem u više tačaka i pragom koji ne propušta vetar.',
    naslov: 'Ulazna vrata od PVC-a i aluminijuma',
    metaOpis: 'Ulazna vrata od PVC-a i aluminijuma po meri, sa zaključavanjem u više tačaka, punom ispunom ili staklom i pragom koji ne propušta vetar.',
    pocetna: {
      a: 'moderna-crna-ulazna-vrata', b: 'ulaz-porodicna-kuca-drvena-vrata', c: 'bela-ulazna-vrata-hodnik', fitC: 'cover',
      altA: 'Moderna crna ulazna vrata sa staklenim poljima', altB: 'Ulaz u porodičnu kuću sa drvenim vratima', altC: 'Bela ulazna vrata u svetlom hodniku',
      opis: 'Ispuna po izboru, brava koja zaključava u više tačaka i prag koji ne propušta vetar ispod vrata.',
      stavke: ['Zaključavanje u više tačaka', 'Pune ispune ili sa staklom', 'PVC ili aluminijum']
    }
  },
  {
    id: 'oprema', slug: 'roletne-i-oprema', n: '05', ime: 'Roletne i oprema', imeNaPocetnoj: 'Roletne i komarnici',
    intro: 'Roletne, komarnici i okapnice koje se naručuju uz prozore, u istoj boji i sa istom ekipom.',
    naslov: 'Roletne, komarnici i okapnice',
    metaOpis: 'Spoljne roletne na ručni ili motorni pogon, rolo komarnici bez bušenja rama i aluminijumske okapnice po meri, u boji stolarije.',
    pocetna: {
      a: 'bele-spoljne-roletne', b: 'siva-roletna-na-prozoru', c: 'presek-kutije-roletne', fitC: 'contain',
      altA: 'Bele spoljne roletne na tri prozora', altB: 'Spuštena siva roletna na prozoru', altC: 'Presek kutije za roletnu',
      opis: 'Spoljne roletne sa kutijom u boji prozora i komarnici koji se montiraju bez bušenja ramova.',
      stavke: ['Ručni ili motorni pogon', 'Komarnici fiksni, rolo i plise', 'Kutija u boji stolarije']
    }
  }
];

// Modeli. `profil` vezuje prozor za tehničke podatke iz PROFILI.
export const MODELI = [
  { id: 1, kat: 'prozori', slug: 'kota-70-klasik', ime: 'KOTA 70 Klasik', tag: 'Za stan', slika: 'kota-70-klasik', fit: 'contain', alt: 'Beli jednokrilni PVC prozor otvoren', profil: 70, boja: 'bela', otv: 'jedno', spec: '5 komora · 70 mm · Uw 1,1', boje: ['bela'],
    opis: 'Petokomorni prozor za stan u gradu. Dvoslojno staklo do 40 mm i dve zaptivke po obimu krila, a okov otvara krilo krilno i na kip, uz mikroventilaciju.' },
  { id: 2, kat: 'prozori', slug: 'kota-76-termo', ime: 'KOTA 76 Termo', tag: 'Preporuka', slika: 'kota-76-termo-zatvoren', fit: 'contain', alt: 'Beli dvokrilni PVC prozor sa dve kvake', profil: 76, boja: 'bela', otv: 'dvo', spec: '6 komora · 76 mm · Uw 0,9', boje: ['bela', 'antracit', 'hrast'],
    opis: 'Šestokomorni prozor za kuću i stan. Troslojno staklo i tri zaptivke drže toplotu unutra, a okov otvara krilo krilno i na kip, uz mikroventilaciju.' },
  { id: 3, kat: 'prozori', slug: 'kota-76-kombi', ime: 'KOTA 76 Kombi', tag: '', slika: 'kota-76-kombi', fit: 'contain', alt: 'Kombinacija jednokrilnog i dvokrilnog belog prozora', profil: 76, boja: 'bela', otv: 'kombi', spec: '6 komora · 76 mm · Uw 0,9', boje: ['bela', 'antracit'],
    opis: 'Jednokrilni i dvokrilni prozor u jednom ramu, na profilu od 76 mm. Šest komora, troslojno staklo i tri zaptivke, za široke otvore u kući i stanu.' },
  { id: 4, kat: 'prozori', slug: 'kota-82-premium', ime: 'KOTA 82 Premium', tag: 'Najtopliji', slika: 'kota-82-premium', fit: 'contain', alt: 'Dva prozora u sivoj i antracit boji', profil: 82, boja: 'antracit', otv: 'kombi', spec: '7 komora · 82 mm · Uw 0,8', boje: ['antracit', 'siva', 'bela'],
    opis: 'Sedmokomorni prozor za potkrovlje i prometnu ulicu. Troslojno staklo do 52 mm i tri zaptivke daju najniži Uw u ponudi, do 0,8 W/m²K.' },
  { id: 5, kat: 'prozori', slug: 'kota-76-antracit', ime: 'KOTA 76 Antracit', tag: '', slika: 'kota-76-antracit', fit: 'contain', alt: 'Antracit prozor otvoren na kip', profil: 76, boja: 'antracit', otv: 'dvo', spec: '6 komora · 76 mm · RAL 7016', boje: ['antracit'],
    opis: 'KOTA 76 u antracit boji RAL 7016. Šest komora, troslojno staklo i tri zaptivke, sa okovom krilno-kip i mikroventilacijom.' },
  { id: 6, kat: 'prozori', slug: 'kota-76-zlatni-hrast', ime: 'KOTA 76 Zlatni hrast', tag: '', slika: 'kota-76-zlatni-hrast', fit: 'contain', alt: 'Prozor u dekoru zlatnog hrasta', profil: 76, boja: 'drvo', otv: 'jedno', spec: '6 komora · 76 mm · dekor drveta', boje: ['hrast'],
    opis: 'KOTA 76 u dekoru zlatnog hrasta, za kuće gde prozor treba da izgleda kao drvo. Šest komora, troslojno staklo i tri zaptivke.' },
  { id: 7, kat: 'balkon', slug: 'kota-76-balkon', ime: 'KOTA 76 Balkon', tag: '', slika: 'bela-balkonska-vrata-kuhinja', fit: 'cover', alt: 'Bela balkonska vrata u kuhinji', spec: 'Niski prag · kvaka sa obe strane', boje: ['bela', 'antracit'],
    opis: 'Balkonska vrata sa niskim pragom od aluminijuma i kvakom sa obe strane. Izlazi se bez podizanja noge, a vrata se zatvaraju bez promaje.' },
  { id: 8, kat: 'balkon', slug: 'kota-76-balkon-dvokrilni', ime: 'KOTA 76 Balkon dvokrilni', tag: '', slika: 'visoka-bela-balkonska-vrata', fit: 'cover', alt: 'Visoka dvokrilna balkonska vrata', spec: 'Dva krila · bez srednjeg stuba', boje: ['bela'],
    opis: 'Dvokrilna balkonska vrata bez srednjeg stuba, pa otvoren prolaz ostaje pun. Nizak prag i kvaka sa obe strane.' },
  { id: 9, kat: 'klizni', slug: 'kota-psk', ime: 'KOTA PSK', tag: '', slika: 'kota-psk-paralelno-klizni', fit: 'contain', alt: 'Paralelno klizni sistem sa dva krila', spec: 'Paralelno klizni · krilo na kip', boje: ['siva', 'bela'],
    opis: 'Paralelno klizni sistem: krilo se odmakne, klizne u stranu i ne zauzima prostor u sobi. Kad treba samo provetriti, otvara se na kip.' },
  { id: 10, kat: 'klizni', slug: 'kota-harmonika', ime: 'KOTA Harmonika', tag: '', slika: 'sklopiva-harmonika-vrata-terasa', fit: 'cover', alt: 'Sklopiva staklena vrata ka terasi', spec: 'Sklopivi sistem · do 6 krila', boje: ['siva', 'antracit'],
    opis: 'Sklopivi sistem do 6 krila koji otvara ceo zid ka terasi. Krila se slažu u stranu jedno uz drugo.' },
  { id: 11, kat: 'vrata', slug: 'kota-linea', ime: 'KOTA Linea', tag: '', slika: 'kota-linea-ulazna-vrata', fit: 'contain', alt: 'Antracit ulazna vrata sa drvenim detaljem i staklom', spec: 'Aluminijum · zaključavanje u 5 tačaka', boje: ['antracit', 'hrast'],
    opis: 'Aluminijumska ulazna vrata u antracitu, sa drvenim detaljem i staklom, i bravom koja zaključava u 5 tačaka.' },
  { id: 12, kat: 'vrata', slug: 'kota-bela', ime: 'KOTA Bela', tag: '', slika: 'kota-bela-ulazna-vrata', fit: 'contain', alt: 'Bela PVC ulazna vrata sa staklenim prorezima', spec: 'PVC · zaključavanje u 3 tačke', boje: ['bela'],
    opis: 'Bela PVC ulazna vrata sa staklenim prorezima i zaključavanjem u 3 tačke. Prag ne propušta vetar ispod vrata.' },
  { id: 13, kat: 'oprema', slug: 'spoljna-roletna', ime: 'Spoljna roletna', tag: '', slika: 'presek-kutije-roletne', fit: 'contain', alt: 'Presek kutije spoljne roletne', spec: 'Ručni ili motorni pogon', boje: ['bela', 'antracit', 'siva'],
    opis: 'Spoljna roletna sa kutijom u boji prozora, na ručni ili motorni pogon. Naručuje se uz prozore, a ugrađuje je ista ekipa.' },
  { id: 14, kat: 'oprema', slug: 'rolo-komarnik', ime: 'Rolo komarnik', tag: '', slika: 'rolo-komarnik', fit: 'contain', alt: 'Rolo komarnik na prozoru', spec: 'Montaža bez bušenja rama', boje: ['bela', 'antracit'],
    opis: 'Rolo komarnik koji se montira bez bušenja rama. Kad ne treba, mreža se namota u kutiju iznad prozora.' },
  { id: 15, kat: 'oprema', slug: 'spoljna-okapnica', ime: 'Spoljna okapnica', tag: '', slika: 'spoljna-okapnica', fit: 'contain', alt: 'Aluminijumska spoljna okapnica', spec: 'Aluminijum · po meri zida', boje: ['bela', 'antracit', 'siva'],
    opis: 'Aluminijumska spoljna okapnica sečena po meri zida, u boji stolarije. Odvodi vodu sa prozora dalje od fasade.' }
];

export const kategorija = (id) => KATEGORIJE.find((k) => k.id === id);
export const urlKategorije = (k) => `/${k.slug}/`;
export const urlModela = (m) => `/${kategorija(m.kat).slug}/${m.slug}/`;
export const modeliKategorije = (id) => MODELI.filter((m) => m.kat === id);

// Srpska množina za "model".
export const modela = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'model' : 'modela');

/* KOTA stolarija: interakcije sajta. Bez biblioteka; svaki deo se pokreće
   samo ako na stranici postoji njegov element. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqMob = matchMedia('(max-width: 767px)');
  const broj = (n) => n.toFixed(2).replace('.', ',');
  const modela = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'model' : 'modela');
  const pritisnut = (el, on) => el.setAttribute('aria-pressed', String(on));
  // Putanja sajta kada nije na korenu domena (npr. GitHub Pages).
  const BASE = document.documentElement.dataset.base || '';

  /* ---------- Meni na telefonu i tabletu ---------- */
  function meni() {
    const header = $('[data-header]');
    const dugme = header && $('[data-menu]', header);
    if (!dugme) return;
    const postavi = (otvoren) => {
      header.classList.toggle('is-open', otvoren);
      dugme.setAttribute('aria-expanded', String(otvoren));
      dugme.setAttribute('aria-label', otvoren ? 'Zatvorite meni' : 'Otvorite meni');
    };
    dugme.addEventListener('click', () => postavi(!header.classList.contains('is-open')));
    $$('.nav-link', header).forEach((a) => a.addEventListener('click', () => postavi(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('is-open')) { postavi(false); dugme.focus(); }
    });
    document.addEventListener('click', (e) => { if (!header.contains(e.target)) postavi(false); });
    matchMedia('(min-width: 1100px)').addEventListener('change', () => postavi(false));
  }

  /* ---------- Ulazne animacije sekcija ---------- */
  function ulazi() {
    const el = $$('.rv');
    if (!('IntersectionObserver' in window) || mqReduce.matches) { el.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((unosi) => {
      let i = 0;
      unosi.forEach((u) => {
        if (!u.isIntersecting) return;
        const t = u.target;
        const kasnjenje = i++ * 90;
        t.style.transitionDelay = kasnjenje + 'ms';
        t.classList.add('in');
        io.unobserve(t);
        setTimeout(() => { t.style.transitionDelay = ''; }, 1300 + kasnjenje);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    el.forEach((e) => io.observe(e));
  }

  /* Petlje se pauziraju kada tab nije vidljiv */
  document.addEventListener('visibilitychange', () => document.body.classList.toggle('paused', document.hidden));

  /* ---------- Hero: prozor se otvara, pa kamera prolazi kroz njega ---------- */
  function hero() {
    const sekcija = $('[data-hero]');
    if (!sekcija) return;
    const scena = $('[data-stage]', sekcija);
    const trakaA = $('[data-band-a]', scena);
    const trakaC = $('[data-band-c]', scena);
    // Isti uslov kao u CSS-u za mobilnu kompoziciju hero sekcije.
    const mqHero = matchMedia('(max-width: 899px), (orientation: portrait) and (max-width: 1199px)');
    const kes = {};
    let mob = false, skrol = false, visina = 900, cilj = 0, prikazano = 0, raf = null, posl = 0, sirinaPre = 0, visinaPre = 0;

    const cl = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const vrednosti = (p) => ({
      open: ease(cl((p - 0.03) / 0.42)),
      ta: mob ? cl((p - 0.02) / 0.12) : cl((p - 0.03) / 0.13),
      tb: cl((p - 0.30) / 0.08) * (1 - cl((p - 0.55) / 0.06)),
      push: ease(cl((p - 0.56) / 0.28)),
      tc: cl((p - 0.80) / 0.07)
    });

    // U DOM se piše samo kad se vrednost promeni.
    function primeni(p) {
      const v = vrednosti(p);
      for (const k in v) {
        const s = v[k].toFixed(4);
        if (kes[k] !== s) { kes[k] = s; scena.style.setProperty('--' + k, s); }
      }
      const a = v.ta > 0.6 ? 'off' : 'on';
      const c = v.tc > 0.4 ? 'on' : 'off';
      if (kes.a !== a) { kes.a = a; scena.setAttribute('data-a', a); trakaA.inert = a === 'off'; }
      if (kes.c !== c) { kes.c = c; scena.setAttribute('data-c', c); trakaC.inert = c === 'off'; }
    }

    function napredak() {
      const r = sekcija.getBoundingClientRect();
      const opseg = r.height - visina;
      return opseg <= 0 ? 0 : cl(-r.top / opseg);
    }

    function izmeri(sila) {
      const vh = window.innerHeight;
      const W = scena.clientWidth || document.documentElement.clientWidth;
      // Na telefonu traka sa adresom menja visinu ekrana; male promene ignorišemo.
      if (!sila && W === sirinaPre && visinaPre && Math.abs(vh - visinaPre) < 120) return;
      sirinaPre = W; visinaPre = vh;
      mob = mqHero.matches;
      skrol = vh <= 1400 && !mqReduce.matches;
      const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav')) || 76;
      visina = skrol ? (mob ? Math.max(560, vh) : vh) : (mob ? 780 : 900);
      const ukupno = skrol ? Math.round(mob ? visina * 4.2 : vh * 4.6) : visina;
      const B = mob ? Math.min(W - 56, (visina - 300) * 0.92 * 738 / 618, 620) : Math.max(260, Math.min(W * 0.4, (visina - nav) * 0.62 * 738 / 618));
      const Bh = B * 618 / 738;
      const S = Math.max(W / (0.866 * B), visina / (0.84 * Bh)) * 1.06;
      scena.style.setProperty('--sw', W + 'px');
      scena.style.setProperty('--stage-h', visina + 'px');
      scena.style.setProperty('--sm1', (S - 1).toFixed(3));
      sekcija.style.setProperty('--hero-h', ukupno + 'px');
      cilj = skrol ? napredak() : 0;
      prikazano = cilj;
      for (const k in kes) delete kes[k];
      primeni(prikazano);
    }

    // Prikazana vrednost klizi ka cilju; petlja staje kad se izjednače.
    function tik(sad) {
      const dt = Math.min(100, sad - (posl || sad));
      posl = sad;
      const k = mob ? 0.16 : 0.14;
      prikazano += (cilj - prikazano) * (1 - Math.pow(1 - k, dt / 16.667));
      if (Math.abs(cilj - prikazano) < 0.0004) { prikazano = cilj; raf = null; posl = 0; }
      else raf = requestAnimationFrame(tik);
      primeni(prikazano);
    }

    window.addEventListener('scroll', () => {
      if (!skrol) return;
      cilj = napredak();
      if (raf === null) raf = requestAnimationFrame(tik);
    }, { passive: true });
    window.addEventListener('resize', () => izmeri(false));
    mqHero.addEventListener('change', () => izmeri(true));
    mqReduce.addEventListener('change', () => izmeri(true));
    izmeri(true);
  }

  /* ---------- Tabovi proizvoda na početnoj ---------- */
  function tabovi() {
    $$('[data-tabs]').forEach((koren) => {
      const tabs = $$('[role="tab"]', koren);
      const lista = $('[role="tablist"]', koren);
      const izaberi = (t, fokus) => {
        tabs.forEach((x) => {
          const on = x === t;
          x.setAttribute('aria-selected', String(on));
          x.tabIndex = on ? 0 : -1;
          const panel = document.getElementById(x.getAttribute('aria-controls'));
          if (on && panel.hidden) {
            panel.hidden = false;
            panel.classList.remove('is-in');
            void panel.offsetWidth;
            panel.classList.add('is-in');
          } else if (!on) panel.hidden = true;
        });
        if (fokus) t.focus();
        if (lista.scrollWidth > lista.clientWidth) {
          lista.scrollTo({ left: t.offsetLeft - 20, behavior: mqReduce.matches ? 'auto' : 'smooth' });
        }
      };
      tabs.forEach((t, i) => {
        t.addEventListener('click', () => izaberi(t));
        t.addEventListener('keydown', (e) => {
          const pomak = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
          if (pomak) { e.preventDefault(); izaberi(tabs[(i + pomak + tabs.length) % tabs.length], true); }
          if (e.key === 'Home') { e.preventDefault(); izaberi(tabs[0], true); }
          if (e.key === 'End') { e.preventDefault(); izaberi(tabs[tabs.length - 1], true); }
        });
      });
    });
  }

  /* ---------- Konfigurator mera na početnoj ---------- */
  function konfigurator() {
    const k = $('[data-config]');
    if (!k) return;
    const TIP = { jedno: 'Jednokrilni', dvo: 'Dvokrilni', balkon: 'Balkonska vrata', fix: 'Fiksni' };
    const s = { tip: 'dvo', w: 1400, h: 1400, kom: 1, prof: '76' };
    const inW = $('[data-in="w"]', k), inH = $('[data-in="h"]', k);
    const kutija = $('[data-box]', k), prozor = $('[data-win]', k), posalji = $('[data-send]', k);
    const out = (ime, v) => { const o = $(`[data-out="${ime}"]`, k); if (o) o.textContent = v; };
    const krilo = (strana) => (strana === 'L' ? '100,0 0,50 100,100' : '0,0 100,50 0,100');
    const kip = '0,0 50,100 100,0';
    const okno = (k1, k2, rucka, x, fix) => `<div class="pane"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="${k1}"></polyline><polyline points="${k2}"></polyline></svg>${rucka ? `<span class="handle" style="left:${x}"></span>` : ''}${fix ? '<span class="fix-l">FIX</span>' : ''}</div>`;

    function crtajOkna() {
      if (s.tip === 'dvo') prozor.innerHTML = okno(krilo('L'), kip, true, '88%') + okno(krilo('R'), '', false);
      else if (s.tip === 'fix') prozor.innerHTML = okno('', '', false, '', true);
      else prozor.innerHTML = okno(krilo('L'), s.tip === 'balkon' ? '' : kip, true, '90%');
    }
    function prikazi() {
      const [mw, mh] = mqMob.matches ? [250, 240] : [430, 400];
      const sc = Math.min(mw / s.w, mh / s.h);
      kutija.style.width = Math.round(s.w * sc) + 'px';
      kutija.style.height = Math.round(s.h * sc) + 'px';
      out('w', s.w + ' mm'); out('h', s.h + ' mm');
      out('dw', mqMob.matches ? String(s.w) : s.w + ' mm');
      out('dh', mqMob.matches ? String(s.h) : s.h + ' mm');
      out('qty', String(s.kom));
      out('sum', `KOTA ${s.prof} · ${TIP[s.tip]} · ${s.w} × ${s.h} mm · ${s.kom} kom`);
      out('area', broj((s.w * s.h) / 1e6 * s.kom));
      prozor.setAttribute('aria-label', `${TIP[s.tip]} prozor, ${s.w} puta ${s.h} milimetara`);
      $$('[data-type]', k).forEach((b) => pritisnut(b, b.dataset.type === s.tip));
      $$('[data-prof]', k).forEach((b) => pritisnut(b, b.dataset.prof === s.prof));
      inW.value = s.w; inH.value = s.h;
      posalji.href = `${BASE}/kontakt/?tip=${s.tip}&sirina=${s.w}&visina=${s.h}&kom=${s.kom}&profil=${s.prof}`;
    }
    $$('[data-type]', k).forEach((b) => b.addEventListener('click', () => {
      s.tip = b.dataset.type;
      if (s.tip === 'balkon' && s.h < 1900) { s.h = 2200; s.w = Math.min(s.w, 1000); }
      if (s.tip !== 'balkon' && s.h > 1900) s.h = 1400;
      crtajOkna(); prikazi();
    }));
    $$('[data-prof]', k).forEach((b) => b.addEventListener('click', () => { s.prof = b.dataset.prof; prikazi(); }));
    inW.addEventListener('input', () => { s.w = Number(inW.value); prikazi(); });
    inH.addEventListener('input', () => { s.h = Number(inH.value); prikazi(); });
    $$('[data-qty]', k).forEach((b) => b.addEventListener('click', () => { s.kom = Math.max(1, Math.min(40, s.kom + Number(b.dataset.qty))); prikazi(); }));
    mqMob.addEventListener('change', prikazi);
    crtajOkna(); prikazi();
  }

  /* ---------- Česta pitanja ---------- */
  function pitanja() {
    $$('[data-acc]').forEach((acc) => {
      const stavke = $$('.acc-item', acc);
      const postavi = (st, on) => {
        st.classList.toggle('is-open', on);
        $('.acc-btn', st).setAttribute('aria-expanded', String(on));
        $('.acc-p', st).inert = !on;
      };
      stavke.forEach((st) => $('.acc-btn', st).addEventListener('click', () => {
        const otvori = !st.classList.contains('is-open');
        stavke.forEach((x) => postavi(x, x === st && otvori));
      }));
    });
  }

  /* ---------- Kratka forma (demo) ---------- */
  function demoForme() {
    $$('[data-demo-form]').forEach((f) => {
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!f.checkValidity()) { f.reportValidity(); return; }
        const ok = f.nextElementSibling;
        f.hidden = true;
        ok.hidden = false;
        ok.tabIndex = -1;
        ok.focus();
      });
    });
  }

  /* ---------- Katalog: filteri, sortiranje, poređenje ---------- */
  function katalog() {
    const k = $('[data-katalog]');
    if (!k) return;
    const mreza = $('[data-grid]', k);
    const kartice = $$('.k-prod', mreza);
    const SORT = { prep: 'Preporučeno', topli: 'Najtopliji', komore: 'Broj komora' };
    const s = { f: { komore: [], boja: [], otv: [] }, sort: 'prep', cmp: [] };
    const filteri = $('#filteri');
    const otvoriF = $('[data-open-f]', k);

    function primeni() {
      const vidljive = kartice.filter((c) =>
        (!s.f.komore.length || s.f.komore.includes(c.dataset.komore)) &&
        (!s.f.boja.length || s.f.boja.includes(c.dataset.boja)) &&
        (!s.f.otv.length || s.f.otv.includes(c.dataset.otv)));
      const red = vidljive.slice().sort((a, b) => {
        if (s.sort === 'topli') return a.dataset.uw - b.dataset.uw || a.dataset.i - b.dataset.i;
        if (s.sort === 'komore') return b.dataset.komore - a.dataset.komore || a.dataset.i - b.dataset.i;
        return a.dataset.i - b.dataset.i;
      });
      kartice.forEach((c) => {
        const vid = vidljive.includes(c);
        if (vid && c.hidden) { c.classList.remove('is-show'); void c.offsetWidth; c.classList.add('is-show'); }
        c.hidden = !vid;
      });
      red.forEach((c) => mreza.appendChild(c));
      const n = vidljive.length;
      const brojac = $('[data-count]', k);
      if (brojac) brojac.textContent = `Prikazano: ${n} ${modela(n)}`;
      $$('[data-count-n]', k).forEach((e) => { e.textContent = n; e.nextSibling.textContent = ' ' + modela(n); });
      const prazno = $('[data-empty]', k);
      if (prazno) prazno.hidden = n > 0;
      const aktivno = s.f.komore.length + s.f.boja.length + s.f.otv.length;
      const lbl = $('[data-f-label]', k);
      if (lbl) lbl.textContent = aktivno ? `Filteri · ${aktivno}` : 'Filteri';
      $$('[data-f]', k).forEach((b) => pritisnut(b, s.f[b.dataset.f].includes(b.dataset.v)));
      $$('[data-sort]', k).forEach((b) => pritisnut(b, b.dataset.sort === s.sort));
      const ime = $('[data-sort-name]', k);
      if (ime) ime.textContent = SORT[s.sort];
    }

    $$('[data-f]', k).forEach((b) => b.addEventListener('click', () => {
      const lista = s.f[b.dataset.f];
      const i = lista.indexOf(b.dataset.v);
      if (i >= 0) lista.splice(i, 1); else lista.push(b.dataset.v);
      primeni();
    }));
    $$('[data-reset]', k).forEach((b) => b.addEventListener('click', () => {
      s.f = { komore: [], boja: [], otv: [] }; s.sort = 'prep'; primeni();
    }));
    $$('[data-sort]', k).forEach((b) => b.addEventListener('click', () => { s.sort = b.dataset.sort; primeni(); }));
    const ciklus = $('[data-sort-cycle]', k);
    if (ciklus) ciklus.addEventListener('click', () => {
      const red = Object.keys(SORT);
      s.sort = red[(red.indexOf(s.sort) + 1) % red.length];
      primeni();
    });
    const postaviF = (on) => {
      if (!filteri || !otvoriF) return;
      filteri.classList.toggle('is-open', on);
      otvoriF.setAttribute('aria-expanded', String(on));
    };
    if (otvoriF) otvoriF.addEventListener('click', () => postaviF(!filteri.classList.contains('is-open')));
    const zatvoriF = $('[data-close-f]', k);
    if (zatvoriF) zatvoriF.addEventListener('click', () => {
      postaviF(false);
      mreza.scrollIntoView({ behavior: mqReduce.matches ? 'auto' : 'smooth', block: 'start' });
    });

    // Poređenje (do 3 modela)
    const tray = $('[data-tray]', k);
    const crtajCmp = () => {
      $$('[data-cmp]', k).forEach((b) => {
        const on = s.cmp.includes(b.dataset.cmp);
        pritisnut(b, on);
        b.textContent = on ? '✓ Poredim' : '+ Uporedi';
      });
      if (!tray) return;
      tray.hidden = !s.cmp.length;
      $('[data-tray-label]', tray).textContent = `U poređenju: ${s.cmp.length} od 3`;
    };
    $$('[data-cmp]', k).forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.cmp;
      s.cmp = s.cmp.includes(id) ? s.cmp.filter((x) => x !== id) : s.cmp.concat(id).slice(-3);
      crtajCmp();
    }));
    const ocisti = $('[data-cmp-clear]', k);
    if (ocisti) ocisti.addEventListener('click', () => { s.cmp = []; crtajCmp(); });
    primeni();
  }

  /* ---------- Stranica proizvoda ---------- */
  function proizvod() {
    const p = $('[data-prod]');
    if (!p) return;
    const izvor = $('#prod-data');
    const d = izvor ? JSON.parse(izvor.textContent) : null;
    const otvOn = p.dataset.otvOn === 'true';
    const s = { pogled: 0, boja: $('[data-color]', p).dataset.color, otv: 'Krilno-kip', kom: 1, tacka: 0 };
    const pozornica = $('[data-stage-img]', p);
    const glavna = $('.pg-main', p);
    const kartica = $('[data-hot-card]', p);
    const nota = $('[data-note]', p);
    const inW = $('[data-dim="w"]', p), inH = $('[data-dim="h"]', p);
    const out = (ime, v) => { const o = $(`[data-out="${ime}"]`, p); if (o) o.textContent = v; };

    function zameni(src) {
      if (glavna.getAttribute('src') === src.src) return;
      glavna.classList.add('is-swap');
      setTimeout(() => {
        glavna.onload = () => glavna.classList.remove('is-swap');
        glavna.srcset = src.set;
        glavna.src = src.src;
        glavna.alt = src.alt;
        if (glavna.complete) glavna.classList.remove('is-swap');
      }, mqReduce.matches ? 0 : 160);
    }
    function prikaz() {
      if (!d) return;
      let m = d.prikazi[s.pogled];
      let tekst = `Prikaz ${s.pogled + 1} / 4`;
      if (s.pogled === 0 && s.boja !== 'bela') {
        const b = d.boje.find((x) => x.id === s.boja);
        if (b && b.src) { m = b; tekst = b.nota; }
      }
      zameni(m);
      pozornica.classList.toggle('is-contain', m.fit === 'contain');
      if (nota) nota.textContent = tekst;
      const tacke = s.pogled === 0 && s.boja === 'bela';
      pozornica.classList.toggle('no-hots', !tacke);
      $$('[data-hot]', p).forEach((b) => { b.tabIndex = tacke ? 0 : -1; });
      if (kartica) kartica.classList.toggle('is-off', !tacke);
      $$('[data-view]', p).forEach((b) => pritisnut(b, Number(b.dataset.view) === s.pogled));
    }
    function tacka() {
      if (!d) return;
      const t = d.tacke[s.tacka];
      $$('[data-hot]', p).forEach((b) => pritisnut(b, Number(b.dataset.hot) === s.tacka));
      $('.hc-k', kartica).innerHTML = `<span class="m-only">${t.n} · </span>${t.k}`;
      $('.hc-t', kartica).textContent = t.t;
      $('.hc-d', kartica).textContent = t.d;
      kartica.classList.remove('is-swap'); void kartica.offsetWidth; kartica.classList.add('is-swap');
    }
    function zbir() {
      const w = Number(inW.value) || 0, h = Number(inH.value) || 0;
      out('qty', String(s.kom));
      out('sum', `${w} × ${h} mm · ${s.kom} kom${otvOn ? ' · ' + s.otv : ''}`);
      out('area', broj((w * h) / 1e6 * s.kom));
      const q = new URLSearchParams({ model: p.dataset.model, sirina: w, visina: h, kom: s.kom, boja: $('[data-color-name]', p).textContent });
      if (otvOn) q.set('otvaranje', s.otv);
      $$('[data-quote]', p).forEach((a) => { a.href = BASE + '/kontakt/?' + q.toString(); });
    }

    $$('[data-view]', p).forEach((b) => b.addEventListener('click', () => { s.pogled = Number(b.dataset.view); prikaz(); }));
    $$('[data-hot]', p).forEach((b) => b.addEventListener('click', () => { s.tacka = Number(b.dataset.hot); tacka(); }));
    $$('[data-color]', p).forEach((b) => b.addEventListener('click', () => {
      s.boja = b.dataset.color;
      $$('[data-color]', p).forEach((x) => pritisnut(x, x === b));
      $('[data-color-name]', p).textContent = b.dataset.name;
      prikaz(); zbir();
    }));
    $$('[data-otv]', p).forEach((b) => b.addEventListener('click', () => {
      s.otv = b.dataset.otv;
      $$('[data-otv]', p).forEach((x) => pritisnut(x, x === b));
      zbir();
    }));
    [inW, inH].forEach((inp) => {
      inp.addEventListener('input', zbir);
      inp.addEventListener('change', () => { inp.value = Math.max(300, Math.min(6000, Math.round(Number(inp.value) || 0))); zbir(); });
    });
    $$('[data-qty]', p).forEach((b) => b.addEventListener('click', () => { s.kom = Math.max(1, Math.min(40, s.kom + Number(b.dataset.qty))); zbir(); }));
    zbir();
  }

  /* ---------- Kontakt forma ---------- */
  function kontakt() {
    const f = $('[data-kontakt-form]');
    if (!f) return;
    const ok = $('[data-ok]');
    const lista = $('[data-row-list]', f);
    const redovi = $('[data-rows]', f);
    const poseta = $('[data-visit]', f);
    const notaPoseta = $('[data-visit-note]', f);
    const zbirEl = $('[data-sum]', f);
    const greska = $('[data-err]', f);
    const sablon = lista.firstElementChild.cloneNode(true);
    $$('input', sablon).forEach((i) => { i.value = ''; });
    const s = { potrebe: $$('[data-need][aria-pressed="true"]', f).map((b) => b.dataset.need), poseta: false, objekat: 'Stan' };

    const nn = (i) => String(i).padStart(2, '0');
    function prenumerisi() {
      $$('[data-row]', lista).forEach((r, i) => {
        $('.mrow-n', r).textContent = nn(i + 1);
        $('[data-row-n]', r).textContent = nn(i + 1);
        $('[data-row-x]', r).setAttribute('aria-label', `Uklonite otvor ${i + 1}`);
      });
    }
    function zbir() {
      const n = $$('[data-row]', lista).length;
      const otvori = s.poseta ? 'merenje na adresi' : n + (n === 1 ? ' otvor' : ' otvora');
      const t = `${s.potrebe.length ? s.potrebe.join(', ') : 'Ništa izabrano'} · ${s.objekat} · ${otvori}`.toUpperCase();
      zbirEl.textContent = t;
      return t;
    }
    function dodajRed(anim = true) {
      const r = sablon.cloneNode(true);
      if (anim) r.classList.add('is-new');
      lista.appendChild(r);
      prenumerisi(); zbir();
      return r;
    }

    $$('[data-need]', f).forEach((b) => b.addEventListener('click', () => {
      const i = s.potrebe.indexOf(b.dataset.need);
      if (i >= 0) s.potrebe.splice(i, 1); else s.potrebe.push(b.dataset.need);
      pritisnut(b, i < 0); zbir();
    }));
    poseta.addEventListener('click', () => {
      s.poseta = !s.poseta;
      poseta.setAttribute('aria-checked', String(s.poseta));
      redovi.hidden = s.poseta;
      notaPoseta.hidden = !s.poseta;
      zbir();
    });
    $('[data-row-add]', f).addEventListener('click', () => { const r = dodajRed(); $('input', r).focus(); });
    lista.addEventListener('click', (e) => {
      const x = e.target.closest('[data-row-x]');
      if (!x || $$('[data-row]', lista).length < 2) return;
      x.closest('[data-row]').remove();
      prenumerisi(); zbir();
    });
    $$('[data-place]', f).forEach((b) => b.addEventListener('click', () => {
      s.objekat = b.dataset.place;
      $$('[data-place]', f).forEach((x) => pritisnut(x, x === b));
      zbir();
    }));
    const fajl = $('[data-file]', f);
    const fajlTekst = $('[data-file-label]', f);
    const fajlPocetni = fajlTekst.textContent;
    fajl.addEventListener('change', () => {
      const n = fajl.files.length;
      fajlTekst.textContent = n ? `Izabrano: ${n} ${n === 1 ? 'fajl' : 'fajla'}` : fajlPocetni;
    });

    // Popunjavanje iz konfiguratora ili sa stranice proizvoda
    const q = new URLSearchParams(location.search);
    const modeli = JSON.parse($('#modeli-data').textContent);
    const TIP = { jedno: 'Jednokrilni', dvo: 'Dvokrilni', balkon: 'Balkonska vrata', fix: 'Fiksni' };
    const napomena = [];
    let potreba = null;
    if (q.get('model') && modeli[q.get('model')]) {
      const m = modeli[q.get('model')];
      potreba = m.potreba;
      napomena.push(`Model: ${m.ime}`);
      if (q.get('boja')) napomena.push(`boja: ${q.get('boja')}`);
      if (q.get('otvaranje')) napomena.push(`otvaranje: ${q.get('otvaranje')}`);
    } else if (q.get('tip') && TIP[q.get('tip')]) {
      potreba = q.get('tip') === 'balkon' ? 'Balkonska vrata' : 'PVC prozori';
      napomena.push(`Sa konfiguratora: KOTA ${q.get('profil') || '76'}, ${TIP[q.get('tip')].toLowerCase()}`);
    }
    if (potreba) {
      s.potrebe = [potreba];
      $$('[data-need]', f).forEach((b) => pritisnut(b, b.dataset.need === potreba));
    }
    if (q.get('sirina') || q.get('visina')) {
      const r = $$('[data-row]', lista);
      const [w, h, kom] = $$('input', r[0]);
      w.value = q.get('sirina') || '';
      h.value = q.get('visina') || '';
      kom.value = q.get('kom') || '1';
      if (r[1]) r[1].remove();
      prenumerisi();
    }
    if (napomena.length) $('[data-note]', f).value = napomena.join(', ') + '. ';
    zbir();

    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const obavezna = $$('[required]', f);
      const prvo = obavezna.find((i) => !i.checkValidity());
      obavezna.forEach((i) => i.setAttribute('aria-invalid', String(!i.checkValidity())));
      if (prvo) {
        greska.hidden = false;
        greska.textContent = prvo.type === 'checkbox' ? 'Potvrdite saglasnost da bismo vas kontaktirali.' : 'Popunite obavezna polja označena zvezdicom.';
        prvo.focus();
        return;
      }
      greska.hidden = true;
      $('[data-ok-sum]', ok).textContent = zbir();
      f.hidden = true;
      ok.hidden = false;
      ok.focus();
    });
    $('[data-again]', ok).addEventListener('click', () => {
      f.reset();
      $$('[aria-invalid]', f).forEach((i) => i.removeAttribute('aria-invalid'));
      fajlTekst.textContent = fajlPocetni;
      ok.hidden = true;
      f.hidden = false;
      $('input[name="ime"]', f).focus();
    });
  }

  const start = () => { meni(); hero(); tabovi(); konfigurator(); pitanja(); demoForme(); katalog(); proizvod(); kontakt(); ulazi(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

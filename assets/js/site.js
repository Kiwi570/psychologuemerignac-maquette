/* Effets du Cabinet de la Forêt. Le socle gère l'ouverture, les transitions, l'en-tête, le menu, les boucles,
   les mesures et la bibliothèque d'effets (posés par attributs dans les pages). Ici, seulement ce qui est propre au client :
   papillon (intro tracée au pinceau, battement), feuillage, portes, allumer, ruban, envol, lin, bandeau, mosaique, pose,
   l'estimateur des formations et les deux parcours du formulaire. Chaque effet propre porte data-effet="nom". */
import { demarrer, boucle, etat, versObjet, quand } from './socle/index.js?v=2';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const telephone = () => window.matchMedia('(max-width: 760px)').matches;

/* ── Papillon : battement des ailes (échelle horizontale depuis le corps) ── */
function battement(svg, t, periode = 4.2, decalage = 0) {
  const ph = (t + decalage) % periode;
  const s = ph < 0.62 ? Math.abs(Math.sin((ph / 0.62) * Math.PI * 2)) * 0.5 : 0;
  $$('.aile', svg).forEach((a) => { a.style.transform = `scaleX(${(1 - s).toFixed(3)})`; });
}

let volAccueil = 0;
function papillonOuverture() {
  const svg = $('.papillon-ouv');
  if (!svg) return;
  boucle(svg, (dt, t) => {
    if (performance.now() < volAccueil) battement(svg, t, 0.24); else battement(svg, t, 4.6, 1.2);
    svg.style.transform = `translate3d(0, ${(Math.sin(t * 1.3) * 3).toFixed(2)}px, 0) rotate(${(Math.sin(t * 0.7) * 2).toFixed(2)}deg)`;
  });
  if (gsap && ST) {
    gsap.fromTo('.ouv-papillon', { y: 0, rotate: 0 }, { y: -36, rotate: -10, ease: 'none', scrollTrigger: { trigger: '.ouv', start: 'top top', end: 'bottom top', scrub: true } });
  }
  /* Effet signature : au survol il bat des ailes, au clic (ou au toucher) il s'envole autour des portes et revient. */
  const bouton = $('.ouv-papillon'), vol = $('.ouv-vol');
  if (!bouton || !vol || !gsap) return;
  bouton.addEventListener('pointerenter', () => { volAccueil = Math.max(volAccueil, performance.now() + 700); });
  let enVol = null;
  bouton.addEventListener('click', () => {
    if (enVol && enVol.isActive()) return;
    const L = Math.min(window.innerWidth * 0.32, 420), H = Math.min(window.innerHeight * 0.22, 190);
    volAccueil = performance.now() + 2600;
    enVol = gsap.timeline({ defaults: { ease: 'sine.inOut' } })
      .to(vol, { x: L * 0.55, y: -H, rotate: 18, scale: 0.8, duration: 0.55 })
      .to(vol, { x: L, y: -H * 0.2, rotate: 40, scale: 0.7, duration: 0.5 })
      .to(vol, { x: L * 0.2, y: H * 0.35, rotate: -30, scale: 0.75, duration: 0.6 })
      .to(vol, { x: -L * 0.7, y: -H * 0.4, rotate: -20, scale: 0.8, duration: 0.55 })
      .to(vol, { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.6, ease: 'power3.out' });
  });
}

/* ── Feuillage : ombres de feuilles qui dérivent lentement sur le lin ── */
function feuillage() {
  const zone = $('.ouv-feuillage');
  const el = zone && $('picture', zone);
  if (!el) return;
  boucle(zone, (dt, t) => {
    const defil = Math.min(window.scrollY, 900) * 0.12;
    const x = Math.sin(t * 0.17) * 1.6, y = Math.cos(t * 0.13) * 1.2;
    el.style.transform = `translate3d(${x.toFixed(3)}%, calc(${y.toFixed(3)}% + ${defil.toFixed(1)}px), 0) rotate(${(Math.sin(t * 0.09) * 0.8).toFixed(3)}deg) scale(1.04)`;
  });
}

/* ── Portes : elles s'écartent doucement quand on descend ── */
function portes() {
  if (!gsap || !ST || !$('.portes')) return;
  const opts = { ease: 'none', scrollTrigger: { trigger: '.ouv', start: 'top top', end: 'bottom top', scrub: true } };
  gsap.fromTo('.porte--g', { xPercent: 0, rotate: 0 }, { xPercent: -3, rotate: -1.2, ...opts });
  gsap.fromTo('.porte--d', { xPercent: 0, rotate: 0 }, { xPercent: 3, rotate: 1.2, ...opts });
}

/* ── Allumer : la phrase de Françoise s'éclaire mot après mot, une fois ── */
function allumer() {
  const q = $('.citation');
  if (!q) return;
  $$('.mot', q).forEach((m, i) => m.style.setProperty('transition-delay', `${i * 70}ms`));
  if (!gsap || !ST) { q.classList.add('allumee'); return; }
  gsap.fromTo(q.closest('.citation-bloc'), { y: 36 }, { y: -18, ease: 'none', scrollTrigger: { trigger: '.manifeste', start: 'top bottom', end: 'bottom top', scrub: true } });
  ST.create({ trigger: q, start: 'top 78%', once: true, onEnter: () => q.classList.add('allumee') });
}

/* ── Ruban : motifs et références qui glissent avec le défilement ── */
function rubans() {
  if (!gsap || !ST) return;
  $$('[data-effet="ruban"]').forEach((ul) => {
    const sens = +ul.dataset.sens || -1;
    const course = () => Math.max(0, ul.scrollWidth - window.innerWidth) * 0.55;
    gsap.fromTo(ul, { x: () => (sens > 0 ? -course() : 0) }, {
      x: () => (sens > 0 ? 0 : -course()), ease: 'none',
      scrollTrigger: { trigger: ul.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
    });
  });
}

/* ── Envol : un petit papillon traverse l'appel final et se pose près du titre ── */
function envol() {
  $$('[data-effet="envol"]').forEach((svg) => {
    boucle(svg, (dt, t) => battement(svg, t, 0.9));
    const zone = svg.closest('.fin-foret');
    if (!zone || !gsap || !ST) return;
    const L = () => zone.clientWidth, H = () => zone.clientHeight;
    gsap.timeline({ scrollTrigger: { trigger: zone, start: 'top bottom', end: 'center center', scrub: 0.8, invalidateOnRefresh: true } })
      .fromTo(svg, { x: () => L() * 0.86, y: () => H() * 0.78, rotate: -18 }, { x: () => L() * 0.62, y: () => H() * 0.3, rotate: 10, ease: 'sine.inOut', duration: 1 })
      .to(svg, { x: () => L() * 0.4, y: () => H() * 0.46, rotate: -8, ease: 'sine.inOut', duration: 1 })
      .to(svg, { x: () => Math.min(L() * 0.36, 560), y: () => H() * 0.14, rotate: 4, ease: 'sine.out', duration: 1 });
  });
}

/* ── Lin (Thérapies) : l'image se dévoile, puis glisse au défilement ── */
function lin() {
  const el = $('.tete-image');
  if (!el || !gsap || !ST) return;
  gsap.fromTo('.tete-media', { y: 0, scale: 1 }, { y: 60, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.tete-scindee', start: 'top top', end: 'bottom top', scrub: true } });
}

/* ── Bandeau (Formations) : la photo s'élargit jusqu'aux bords ── */
function bandeau() {
  const el = $('.bandeau');
  if (!el || !gsap || !ST) return;
  const st = { trigger: '.tete-forma', start: 'top top', end: 'bottom top', scrub: true };
  gsap.fromTo('.bandeau-1', { xPercent: 0, rotate: 0 }, { xPercent: -4, rotate: -1.5, ease: 'none', scrollTrigger: st });
  gsap.fromTo('.bandeau-2', { xPercent: 0, yPercent: 0, rotate: 0 }, { xPercent: 4, yPercent: -10, rotate: 2, ease: 'none', scrollTrigger: { ...st } });
  gsap.fromTo('.bandeau-media img', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { ...st } });
}

/* ── Mosaïque (Le cabinet) : les photos se rassemblent, puis glissent à des vitesses différentes ── */
function mosaique() {
  if (!$('.mosaique') || !gsap || !ST) return;
  const st = { trigger: '.tete-mosaique', start: 'top top', end: 'bottom top', scrub: true };
  gsap.fromTo('.mos-2', { yPercent: 0 }, { yPercent: -10, ease: 'none', scrollTrigger: st });
  gsap.fromTo('.mos-3', { yPercent: 0 }, { yPercent: -22, ease: 'none', scrollTrigger: { ...st } });
}

/* ── Pose (Contact) : le papillon se pose sur le titre et bat des ailes ── */
function pose() {
  const svg = $('[data-effet="pose"]');
  if (!svg) return;
  boucle(svg, (dt, t) => {
    battement(svg, t, 3.4);
    svg.style.transform = `translate3d(0, ${(Math.sin(t * 1.6) * 2.5).toFixed(2)}px, 0) rotate(${(8 + Math.sin(t * 0.8) * 3).toFixed(2)}deg)`;
  });
}

/* ── Estimateur des formations ── */
const euros = (n) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n)).replace(/[  ]/g, ' ') + ' €';
const nombre = (n) => String(n).replace('.', ',');
function estimateur() {
  const f = $('[data-estimateur]');
  if (!f) return;
  const total = $('[data-total]', f), parPers = $('[data-par-personne]', f), lien = $('[data-lien-devis]', f);
  const blocJour = $('.estim-jour', f), blocApp = $('.estim-app', f);
  const sortie = (n, v) => { const o = $(`[data-sortie="${n}"]`, f); if (o) o.textContent = v; };
  const calc = () => {
    const type = f.type.value;
    blocJour.hidden = type !== 'jour';
    blocApp.hidden = type !== 'app';
    if (type === 'jour') {
      const j = +f.jours.value, p = +f.personnes.value;
      sortie('jours', nombre(j)); sortie('personnes', p);
      const t = (p >= 6 ? 3400 : 1475) * j;
      total.textContent = euros(t);
      parPers.textContent = `${euros(t / p)} par stagiaire`;
      if (lien) lien.search = `?sujet=formation&effectif=${p}`;
    } else {
      const s = +f.seances.value, d = +f.duree.value;
      sortie('seances', s); sortie('duree', `${Math.floor(d)} h${d % 1 ? ' 30' : ''}`);
      const t = 160 * s * d;
      total.textContent = euros(t);
      parPers.textContent = `${s} séance${s > 1 ? 's' : ''} à 160 € de l'heure`;
      if (lien) lien.search = '?sujet=formation&programme=app';
    }
  };
  f.addEventListener('input', calc);
  f.addEventListener('change', calc);
  f.addEventListener('submit', (e) => e.preventDefault());
  calc();
}

/* ── Formulaire de contact : deux parcours ── */
function parcoursFormulaire() {
  const f = $('[data-formulaire]');
  if (!f || !$('[data-onglets]', f)) return;
  const maj = () => {
    const v = (f.querySelector('[name="sujet"]:checked') || {}).value || 'consultation';
    $$('[data-parcours]', f).forEach((b) => { b.hidden = b.dataset.parcours !== v; });
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  };
  f.addEventListener('change', (e) => { if (e.target.name === 'sujet') maj(); });
  /* Un programme ou un effectif dans l'adresse ouvre le parcours « Former une équipe ». */
  const p = new URLSearchParams(location.search);
  if (p.get('programme') || p.get('effectif')) { const r = f.querySelector('[name="sujet"][value="formation"]'); if (r) r.checked = true; }
  maj();
}


/* ── Pinceau : un trait orange, comme celui du logo, se trace sous le mot fort d'un titre ──
   Le SVG est posé à côté du titre (dans son parent), jamais dedans : la boîte du texte ne change pas. */
const NS = 'http://www.w3.org/2000/svg';
const pinceaux = [];
function preparerPinceaux() {
  $$('[data-pinceau]').forEach((em) => {
    const titre = em.closest('h1, h2');
    if (!titre || !titre.parentElement) return;
    const hote = titre.parentElement;
    hote.classList.add('pinceau-hote');
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'pinceau');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('data-audit-ignorer', '');
    svg.setAttribute('data-superpose', '');
    hote.insertBefore(svg, hote.firstChild);
    /* Le titre peut être redécoupé (apparition en lignes) : le mot est retrouvé à chaque mesure. */
    pinceaux.push({ titre, get em() { return titre.querySelector('[data-pinceau]') || em; }, hote, svg, trace: false, haut: !!em.closest('#debut') });
  });
}
function dessinerPinceau(p) {
  const hr = p.hote.getBoundingClientRect();
  const rects = [...p.em.getClientRects()].filter((r) => r.width > 6);
  if (!rects.length || !hr.width) return;
  const fs = parseFloat(getComputedStyle(p.em).fontSize) || 40;
  p.svg.setAttribute('viewBox', `0 0 ${hr.width.toFixed(1)} ${hr.height.toFixed(1)}`);
  let d = '';
  rects.forEach((r) => {
    const x0 = r.left - hr.left + fs * 0.02, x1 = r.right - hr.left - fs * 0.03, y = r.bottom - hr.top - fs * 0.15, L = x1 - x0;
    const f = (n) => n.toFixed(1);
    d += `<path pathLength="1" stroke-width="${f(fs * 0.075)}" d="M${f(x0)} ${f(y + fs * 0.04)} C${f(x0 + L * 0.3)} ${f(y - fs * 0.05)} ${f(x0 + L * 0.65)} ${f(y + fs * 0.07)} ${f(x1)} ${f(y - fs * 0.03)}"/>`;
    d += `<path pathLength="1" stroke-width="${f(fs * 0.03)}" d="M${f(x0 + L * 0.08)} ${f(y + fs * 0.11)} C${f(x0 + L * 0.4)} ${f(y + fs * 0.04)} ${f(x0 + L * 0.7)} ${f(y + fs * 0.12)} ${f(x1 - L * 0.05)} ${f(y + fs * 0.06)}"/>`;
  });
  p.svg.innerHTML = d;
  gsap.set($$('path', p.svg), { strokeDasharray: 1, strokeDashoffset: p.trace ? 0 : 1 });
}
function tracerPinceau(p, delai = 0) {
  dessinerPinceau(p);
  p.trace = true;
  gsap.to($$('path', p.svg), { strokeDashoffset: 0, duration: 0.85, stagger: 0.12, ease: 'power2.inOut', delay: delai });
}
function pinceauxPret(mode) {
  if (!gsap || !pinceaux.length) return;
  pinceaux.forEach((p) => {
    if (mode === 'retour' || mode === 'secours') { p.trace = true; dessinerPinceau(p); return; }
    if (p.haut) { setTimeout(() => tracerPinceau(p, 0.05), mode === 'voile' ? 950 : 150); return; }
    /* Titre qui apparaît au défilement (data-anime) : le trait part une fois ses lignes en place. */
    const titre = p.em.closest('h1, h2');
    /* On attend que les lignes du titre soient à leur place (plus aucune transformation) avant de mesurer. */
    const immobile = () => [p.em, ...(function* () { for (let x = p.em.parentElement; x && x !== titre.parentElement; x = x.parentElement) yield x; })()]
      .every((x) => { const tr = getComputedStyle(x).transform; return tr === 'none' || tr === 'matrix(1, 0, 0, 1, 0, 0)'; });
    const lancer = () => { let n = 0; const essai = () => { if (immobile() || n++ > 30) tracerPinceau(p); else setTimeout(essai, 120); }; setTimeout(essai, 500); };
    if (titre && titre.hasAttribute('data-anime') && titre.getAttribute('data-anime') !== 'gsap') {
      if (titre.classList.contains('vu')) lancer();
      else { const mo = new MutationObserver(() => { if (titre.classList.contains('vu')) { mo.disconnect(); lancer(); } }); mo.observe(titre, { attributes: true, attributeFilter: ['class'] }); }
    } else if (ST) ST.create({ trigger: p.em, start: 'top 82%', once: true, onEnter: () => setTimeout(() => tracerPinceau(p), 200) });
    else { p.trace = true; dessinerPinceau(p); }
  });
  if (ST) ST.addEventListener('refresh', () => pinceaux.forEach((p) => { if (p.trace) dessinerPinceau(p); }));
}

/* ── Guide : le papillon du logo accompagne la lecture et se pose à côté du surtitre de la section en cours ──
   Positions mesurées au chargement et au recalcul (jamais pendant le défilement), sauf la cible qui change,
   remesurée une fois. Il s'efface quand sa cible sort de l'écran. */
function guide() {
  const g = $('.guide');
  if (!g || !gsap) return;
  const svg = $('svg', g);
  let cibles = [], actif = -2, depart = null;
  const pos = { x: 0, y: 0, o: 0 }, off = { x: 0, y: 0 };
  const taille = () => g.offsetWidth || 40;
  const mesurerUne = (el) => {
    const r = document.createRange(); r.selectNodeContents(el);
    const rs = [...r.getClientRects()].filter((x) => x.width > 2);
    const b = rs[0] || el.getBoundingClientRect();
    const premiere = rs.length ? rs.filter((x) => Math.abs(x.top - b.top) < 3) : [b];
    const fin = Math.max(...premiere.map((x) => x.right));
    return { el, x: fin + 12 + window.scrollX, y: b.top + window.scrollY + b.height / 2 };
  };
  const mesurer = () => {
    cibles = $$('main section .surtitre:not(.ouv-anim)').filter((el) => el.offsetParent !== null).map(mesurerUne).sort((a, b) => a.y - b.y);
    const o = $('.papillon-ouv') || $('.entete-papillon');
    if (o) { const r = o.getBoundingClientRect(); depart = { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY }; }
  };
  quand('pret', () => { mesurer(); });
  if (ST) ST.addEventListener('refresh', mesurer);
  window.addEventListener('resize', () => { actif = -2; });
  /* La boucle suit le document (toujours à l'écran) : le guide, fixe et parfois hors cadre, ne l'arrête jamais. */
  boucle(document.body, (dt, t) => {
    if (!cibles.length) return;
    const sy = window.scrollY, vh = window.innerHeight, vw = window.innerWidth, s = taille();
    const ref = sy + vh * 0.62;
    let k = -1;
    for (let i = 0; i < cibles.length; i++) if (cibles[i].y < ref) k = i;
    if (k !== actif) {
      const avant = { x: pos.x, y: pos.y };
      if (k >= 0) cibles[k] = mesurerUne(cibles[k].el);
      const c = k >= 0 ? cibles[k] : null;
      if (c) {
        const tx = Math.min(c.x, vw - s - 8), ty = c.y - s * 0.62;
        /* Premier envol : depuis le papillon de l'accueil, ou celui de l'en-tête. */
        if (actif === -2 || pos.o < 0.05) { const d = depart || { x: vw - 40, y: sy + vh }; off.x = d.x - s / 2 - tx; off.y = d.y - s / 2 - ty; if (pos.o < 0.05 && actif !== -2) { off.x = (vw + 20) - (tx - window.scrollX); off.y = vh * 0.3; } }
        else { off.x = avant.x - (tx - window.scrollX); off.y = avant.y - (ty - sy); }
      }
      actif = k;
    }
    const c = actif >= 0 ? cibles[actif] : null;
    if (!c) { pos.o += (0 - pos.o) * Math.min(1, dt * 6); g.style.opacity = pos.o.toFixed(3); return; }
    const tx = Math.min(c.x, vw - s - 8) - window.scrollX, ty = c.y - s * 0.62 - sy;
    const amort = Math.exp(-dt * 2.6);
    off.x *= amort; off.y *= amort;
    const dist = Math.hypot(off.x, off.y);
    const arc = Math.sin(t * 5) * Math.min(1, dist / 160) * 10;
    pos.x = tx + off.x; pos.y = ty + off.y + arc;
    const visible = ty > (vh * 0.06) && ty < vh - s;
    pos.o += ((visible ? 1 : 0) - pos.o) * Math.min(1, dt * 5);
    const vole = dist > 3;
    if (vole) battement(svg, t, 0.26); else battement(svg, t, 3.8, 0.6);
    const rot = Math.max(-28, Math.min(28, -off.x * 0.06)) + (vole ? 0 : Math.sin(t * 0.9) * 4);
    g.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg)`;
    g.style.opacity = pos.o.toFixed(3);
  });
}

/* ── Éclosion : un grand papillon se dessine au pinceau à côté de la citation, puis respire ── */
function eclosion() {
  const svg = $('.papillon-eclosion');
  if (!svg || !gsap) return;
  const traits = (k) => $$(`.pap-trace[data-trait="${k}"]`, svg);
  gsap.set($$('.pap-trace', svg), { strokeDasharray: 1, strokeDashoffset: 1 });
  if (ST) {
    gsap.timeline({ scrollTrigger: { trigger: '.manifeste', start: 'top 85%', end: 'top 15%', scrub: 0.6 } })
      .to(traits('gauche'), { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0)
      .to(traits('petit'), { strokeDashoffset: 0, duration: 0.35, ease: 'none' }, 0.6)
      .to(traits('droite'), { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0.35)
      .to(traits('vert'), { strokeDashoffset: 0, duration: 0.3, ease: 'none' }, 1.05)
      .to(traits('bleu'), { strokeDashoffset: 0, duration: 0.3, ease: 'none' }, 1.2);
  } else gsap.set($$('.pap-trace', svg), { strokeDashoffset: 0 });
  boucle(svg, (dt, t) => {
    $$('.aile', svg).forEach((a) => { a.style.transform = `scaleX(${(1 - (0.5 + 0.5 * Math.sin(t * 1.1)) * 0.12).toFixed(3)})`; });
    svg.style.transform = `translate3d(0, ${(Math.sin(t * 0.8) * 6).toFixed(1)}px, 0) rotate(${(Math.sin(t * 0.5) * 2.5).toFixed(2)}deg)`;
  });
}

/* ── Envol à l'envoi du formulaire : un papillon part du bouton ── */
function envolEnvoi() {
  const f = $('[data-formulaire]');
  if (!f || !gsap) return;
  f.addEventListener('submit', () => {
    setTimeout(() => {
      const msg = $('[data-message-envoi]', f), btn = $('[type="submit"]', f);
      if (!msg || msg.hidden || !btn) return;
      const r = btn.getBoundingClientRect();
      const g = document.createElement('div');
      g.className = 'envol-envoi'; g.setAttribute('aria-hidden', 'true'); g.setAttribute('data-audit-ignorer', '');
      g.innerHTML = ($('.guide') || $('.entete-logo')).querySelector('svg').outerHTML;
      document.body.appendChild(g);
      const svg = $('svg', g);
      const fin = boucle(g, (dt, t) => battement(svg, t, 0.22));
      gsap.timeline({ onComplete: () => { fin.arreter(); g.remove(); } })
        .fromTo(g, { x: r.left + r.width / 2 - 23, y: r.top - 10, scale: 0.4, opacity: 0, rotate: 0 }, { scale: 1, opacity: 1, y: r.top - 70, rotate: -12, duration: 0.45, ease: 'power2.out' })
        .to(g, { x: r.left + r.width / 2 + 160, y: r.top - 260, rotate: 20, duration: 0.8, ease: 'sine.inOut' })
        .to(g, { x: window.innerWidth + 60, y: -80, rotate: 35, opacity: 0.2, duration: 0.9, ease: 'power1.in' });
    }, 30);
  });
}

/* ── Ouverture de chaque page : titre, éléments .ouv-anim, objet propre à la page ── */
function animerOuverture(tl, t0) {
  const h1 = $('main h1[data-anime="gsap"]');
  if (h1) tl.set(h1, { opacity: 1 }, t0);
  if ($('.ouv-l')) tl.fromTo('.ouv-l', { yPercent: 112, y: 0 }, { yPercent: 0, y: 0, duration: 0.95, stagger: 0.11, ease: 'power4.out' }, t0);
  if ($('.ouv-anim')) tl.fromTo('.ouv-anim', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' }, t0 + 0.12);
  if ($('.porte-media img')) tl.fromTo('.porte-media img', { scale: 1.14 }, { scale: 1, duration: 1.3, ease: 'power3.out' }, t0 - 0.3);
  if ($('.tete-image')) tl.fromTo('.tete-image', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: 'power4.inOut' }, t0 - 0.2);
  if ($('.bandeau-media')) {
    tl.fromTo('.bandeau-1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, t0 - 0.15)
      .fromTo('.bandeau-2', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, t0);
  }
  if ($('.mos')) {
    tl.fromTo('.mos-1', { opacity: 0, x: -30, y: 24 }, { opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out' }, t0 - 0.2)
      .fromTo('.mos-2', { opacity: 0, x: 40, y: -30 }, { opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out' }, t0 - 0.05)
      .fromTo('.mos-3', { opacity: 0, x: 40, y: 40 }, { opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out' }, t0 + 0.05);
  }
  const pose = $('[data-effet="pose"]');
  if (pose) tl.fromTo('.contact-papillon', { x: 120, y: -60, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }, t0);
  return tl;
}

/* Le papillon de l'accueil se trace au pinceau (arrivée par le voile). */
function tracer(tl, racine, t0, vitesse = 1) {
  const traits = (k) => $$(`.pap-trace[data-trait="${k}"]`, racine);
  const d = (x) => x / vitesse;
  tl.set($$('.pap-trace', racine), { strokeDasharray: 1, strokeDashoffset: 1 }, 0)
    .to(traits('gauche'), { strokeDashoffset: 0, duration: d(0.55), ease: 'power2.inOut' }, t0)
    .to(traits('petit'), { strokeDashoffset: 0, duration: d(0.2), ease: 'power2.out' }, t0 + d(0.3))
    .to(traits('droite'), { strokeDashoffset: 0, duration: d(0.55), ease: 'power2.inOut' }, t0 + d(0.22))
    .to(traits('vert'), { strokeDashoffset: 0, duration: d(0.18), ease: 'power2.out' }, t0 + d(0.55))
    .to(traits('bleu'), { strokeDashoffset: 0, duration: d(0.18), ease: 'power2.out' }, t0 + d(0.68));
  return tl;
}

function etatFinalOuverture() {
  if (!gsap) return;
  const h1 = $('main h1[data-anime="gsap"]');
  if (h1) gsap.set(h1, { opacity: 1 });
  gsap.set('.ouv-l', { yPercent: 0, y: 0 });
  gsap.set('.ouv-anim', { opacity: 1, y: 0 });
  gsap.set('.porte-media img', { scale: 1 });
  gsap.set('.tete-image', { clipPath: 'inset(0% 0% 0% 0%)' });
  gsap.set('.mos', { opacity: 1, x: 0, y: 0 });
  gsap.set('.bandeau-media', { opacity: 1, y: 0 });
  gsap.set('.contact-papillon', { opacity: 1, x: 0, y: 0 });
  gsap.set('main .pap-trace', { strokeDashoffset: 0 });
  const q = $('.citation'); if (q) q.classList.add('allumee');
}

demarrer({
  preparer() {
    feuillage();
    papillonOuverture();
    portes();
    allumer();
    rubans();
    envol();
    lin();
    bandeau();
    mosaique();
    pose();
    estimateur();
    parcoursFormulaire();
    preparerPinceaux();
    guide();
    eclosion();
    envolEnvoi();
    quand('pret', ({ mode }) => pinceauxPret(mode));
  },
  /* Intro (moins de 3 s) : le papillon du logo se trace au pinceau, bat des ailes une fois, puis glisse jusqu'à
     l'objet d'ouverture de la page ; le panneau s'ouvre en cercle depuis lui et la page monte. */
  jouer() {
    if (!gsap) return null;
    const panneau = $('[data-ouverture]');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tracer(tl, panneau, 0.2);
    tl.fromTo('.ouverture-nom, .ouverture-ligne', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.35)
      .to($$('.aile', panneau), { scaleX: 0.5, duration: 0.15, ease: 'power2.in', yoyo: true, repeat: 1 }, 0.98)
      .to('.ouverture-nom, .ouverture-ligne', { opacity: 0, y: -6, duration: 0.25 }, 1.12);
    /* Sur l'accueil, le papillon de l'intro devient exactement celui de la page (même taille). */
    const cible = $('.papillon-ouv'), objet = $('.ouverture-papillon');
    const o = { a: 1.3, duree: 0.5, ouverture: 0.75 };
    if (cible && objet) {
      const e = cible.getBoundingClientRect().width / Math.max(1, objet.getBoundingClientRect().width);
      o.echelleMin = e; o.echelleMax = e;
    }
    versObjet(tl, o);
    animerOuverture(tl, 1.8);
    return tl;
  },
  etatFinal() { etatFinalOuverture(); },
  /* Arrivée par le voile : la page monte pendant que le voile se retire ; le papillon de l'accueil se trace. */
  arrivee() {
    if (!gsap) return;
    const tl = gsap.timeline({ delay: 0.1 });
    animerOuverture(tl, 0);
    const ouv = $('.papillon-ouv');
    if (ouv) tracer(tl, ouv, 0.15, 1.2);
  },
});

/* Effets du Cabinet de la Forêt. Le socle gère l'ouverture, les transitions, l'en-tête, le menu, les boucles,
   les mesures et la bibliothèque d'effets (posés par attributs dans les pages). Ici, seulement ce qui est propre au client :
   papillon (intro tracée au pinceau, battement), feuillage, portes, allumer, ruban, envol, lin, bandeau, mosaique, pose,
   l'estimateur des formations et les deux parcours du formulaire. Chaque effet propre porte data-effet="nom". */
import { demarrer, boucle, etat, versObjet, quand } from './socle/index.js?v=1';

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

function papillonOuverture() {
  const svg = $('.papillon-ouv');
  if (!svg) return;
  boucle(svg, (dt, t) => {
    battement(svg, t, 4.6, 1.2);
    svg.style.transform = `translate3d(0, ${(Math.sin(t * 1.3) * 3).toFixed(2)}px, 0) rotate(${(Math.sin(t * 0.7) * 2).toFixed(2)}deg)`;
  });
  if (gsap && ST) {
    gsap.fromTo('.ouv-papillon', { y: 0, rotate: 0 }, { y: -36, rotate: -10, ease: 'none', scrollTrigger: { trigger: '.ouv', start: 'top top', end: 'bottom top', scrub: true } });
  }
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

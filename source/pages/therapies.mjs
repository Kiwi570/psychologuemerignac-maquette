/* Thérapies : ouverture scindée (texte, rideau de lin), sommaire collant, trois chapitres, questions. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: 'therapies', fichier: 'therapies', imagePartage: 'grok/rideau-lumiere-1280.webp' };

const liste = (s) => s.split(' · ');

export default (c) => html`
<section class="tete-scindee conteneur" id="debut">
  <div class="tete-texte">
    <p class="surtitre ouv-anim">${c.t('therapies.ouv.surtitre')}</p>
    <h1 class="tete-titre" data-anime="gsap" data-grille="typo"><span class="ouv-ligne"><span class="ouv-l">${c.t('therapies.ouv.titre1')}</span></span><span class="ouv-ligne"><span class="ouv-l"><em data-pinceau>${c.t('therapies.ouv.titre2')}</em></span></span></h1>
    <p class="ouv-anim masque-ecran-tres-bas">${c.t('therapies.ouv.texte')}</p>
    <p class="ouv-anim">${c.lien('contact', { ancre: 'formulaire', classe: 'bouton', texte: c.t('therapies.ouv.action'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
    <p class="ouv-info ouv-anim" data-info-cle>${c.t('therapies.ouv.info')}</p>
  </div>
  <div class="tete-image" data-effet="lin" data-iris-centre>
    ${c.media({ nom: 'grok/rideau-lumiere', alt: c.s('therapies.ouv.alt'), classe: 'tete-media', priorite: true, sizes: '(max-width: 760px) 100vw, 45vw' })}
  </div>
</section>

<nav class="sommaire-collant" data-sommaire aria-label="${c.s('therapies.sommaire')}">
  <ul class="conteneur">
    <li><a href="#adulte" data-sans-transition>${c.t('therapies.s1')}</a></li>
    <li><a href="#couple" data-sans-transition>${c.t('therapies.s2')}</a></li>
    <li><a href="#enfant" data-sans-transition>${c.t('therapies.s3')}</a></li>
    <li><a href="#questions" data-sans-transition>${c.t('therapies.s4')}</a></li>
  </ul>
</nav>

<section class="chapitre conteneur" id="adulte">
  <div class="chapitre-tete">
    <p class="surtitre" data-anime>${c.t('therapies.adulte.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('therapies.adulte.titre')}</h2>
    <p class="chapitre-intro" data-anime>${c.t('therapies.adulte.texte')}</p>
  </div>
  <div class="chapitre-grille">
    ${c.media({ nom: 'salle-adulte', alt: 'La salle de psychothérapie adulte : deux fauteuils en cuir, une lampe et une bibliothèque', classe: 'chapitre-media', ratio: '4 / 3', sizes: '(max-width: 760px) 100vw, 48vw', attrs: 'data-anime="rideau"' })}
    <div>
      <h3 data-anime>${c.t('therapies.adulte.deroule')}</h3>
      <ol class="etapes" data-anime="cascade">
        <li>${c.t('therapies.adulte.d1')}</li><li>${c.t('therapies.adulte.d2')}</li><li>${c.t('therapies.adulte.d3')}</li>
      </ol>
    </div>
  </div>
  <h3 class="pastilles-titre" data-anime>${c.t('therapies.adulte.travailTitre')}</h3>
  <ul class="pastilles" data-anime="cascade">${liste(c.s('therapies.adulte.travail')).map((m) => html`<li>${m}</li>`)}</ul>
</section>

<section class="chapitre chapitre--couple fond-menthe" id="couple">
  <div class="conteneur">
    <div class="chapitre-tete">
      <p class="surtitre" data-anime>${c.t('therapies.couple.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('therapies.couple.titre')}</h2>
      <p class="chapitre-intro" data-anime>${c.t('therapies.couple.texte')}</p>
    </div>
    <h3 data-anime>${c.t('therapies.couple.axesTitre')}</h3>
    <div class="axes">
      <article class="axe">
        <svg class="genogramme" viewBox="0 0 320 180" role="img" aria-label="${c.s('therapies.couple.genoAlt')}" data-fx="trace">
          <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path data-fx-trait d="M40 30 H100 M70 30 V70 M70 70 H130 M130 70 V110"/>
            <path data-fx-trait d="M220 30 H280 M250 30 V70 M250 70 H190 M190 70 V110"/>
            <path data-fx-trait d="M130 110 H190"/>
            <path data-fx-trait d="M160 110 V150 M135 150 H185 M135 150 V160 M185 150 V160"/>
            <rect data-fx-trait x="28" y="20" width="22" height="22"/><circle data-fx-trait cx="100" cy="31" r="11"/>
            <rect data-fx-trait x="208" y="20" width="22" height="22"/><circle data-fx-trait cx="280" cy="31" r="11"/>
          </g>
          <g class="geno-couple"><rect x="119" y="99" width="22" height="22" rx="2"/><circle cx="190" cy="110" r="11"/></g>
          <g class="geno-enfants"><circle cx="135" cy="166" r="7"/><rect x="178" y="159" width="14" height="14" rx="2"/></g>
        </svg>
        <h4 data-anime>${c.t('therapies.couple.axe1')}</h4>
        <p data-anime>${c.t('therapies.couple.axe1t')}</p>
      </article>
      <article class="axe">
        ${c.media({ nom: 'salle-couple', alt: 'Le salon de thérapie de couple : trois sièges en cercle autour d\'une petite table', classe: 'axe-media', ratio: '16 / 10', cadrage: '60% 66%', sizes: '(max-width: 760px) 100vw, 45vw', attrs: 'data-fx="zoom"' })}
        <h4 data-anime>${c.t('therapies.couple.axe2')}</h4>
        <p data-anime>${c.t('therapies.couple.axe2t')}</p>
      </article>
    </div>
    <h3 data-anime>${c.t('therapies.couple.attendreTitre')}</h3>
    <ol class="attendre" data-anime="cascade">
      ${[1, 2, 3, 4, 5, 6, 7, 8].map((i) => html`<li><span class="attendre-num">${String(i).padStart(2, '0')}</span>${c.t('therapies.couple.a' + i)}</li>`)}
    </ol>
    <p class="note" data-anime>${c.t('therapies.couple.note')}</p>
  </div>
</section>

<section class="chapitre conteneur" id="enfant">
  <div class="chapitre-tete">
    <p class="surtitre" data-anime>${c.t('therapies.enfant.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('therapies.enfant.titre')}</h2>
    <p class="chapitre-intro" data-anime>${c.t('therapies.enfant.texte')}</p>
  </div>
  ${c.media({ nom: 'grok/crayons', alt: 'Feuille blanche, crayons de couleur et pâte à modeler sur une table', classe: 'enfant-bandeau', ratio: '16 / 7', sizes: '100vw', attrs: 'data-fx="parallaxe"' })}
  <div class="chapitre-grille chapitre-grille--enfant">
    <div>
      <h3 data-anime>${c.t('therapies.enfant.motifsTitre')}</h3>
      <ul class="pastilles" data-anime="cascade">${liste(c.s('therapies.enfant.motifs')).map((m) => html`<li>${m}</li>`)}</ul>
      <h3 data-anime>${c.t('therapies.enfant.seancesTitre')}</h3>
      <p data-anime>${c.t('therapies.enfant.seances')}</p>
      <ul class="mediations" data-anime="cascade">
        ${[1, 2, 3, 4, 5, 6].map((i) => html`<li>${c.t('therapies.enfant.m' + i)}</li>`)}
      </ul>
    </div>
    <div class="enfant-cote">
      ${c.media({ nom: 'salle-enfant', alt: 'Le coin des enfants : jouets, livres, crayons et petit tabouret', classe: 'chapitre-media', ratio: '4 / 3', cadrage: '35% 50%', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-anime="rideau"' })}
      <div class="encart" data-anime>
        <h3>${c.t('therapies.enfant.parentsTitre')}</h3>
        <p>${c.t('therapies.enfant.parents')}</p>
        <h3>${c.t('therapies.enfant.cadreTitre')}</h3>
        <p>${c.t('therapies.enfant.cadre')}</p>
        <p class="note">${c.t('therapies.enfant.orientation')}</p>
      </div>
    </div>
  </div>
  <p class="objectifs" data-anime="mots">${c.t('therapies.enfant.objectifs')}</p>
</section>

<section class="faq-section fond-menthe" id="questions">
  <div class="conteneur faq-grille">
    <h2 data-anime="lignes">${c.t('therapies.faq.titre')}</h2>
    <div data-anime="cascade">
      ${c.donnees.faq.therapies.map((f) => html`<details class="faq-item"><summary>${f.q}</summary><p>${f.r}</p></details>`)}
    </div>
  </div>
</section>

<section class="appel conteneur" id="rendez-vous">
  <svg class="appel-trait" viewBox="0 0 400 120" aria-hidden="true" data-fx="trace"><path d="M4 100 C 80 20, 140 110, 210 60 S 330 10, 396 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
  <h2 data-anime="lignes">${c.t('therapies.fin.titre')}</h2>
  <p data-anime>${c.t('therapies.fin.texte')} <a class="appel-tel" href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a></p>
  <p class="actions" data-anime="cascade">
    ${c.lien('contact', { params: 'motif=adulte', ancre: 'formulaire', classe: 'bouton', texte: c.t('therapies.fin.moi') })}
    ${c.lien('contact', { params: 'motif=couple', ancre: 'formulaire', classe: 'bouton', texte: c.t('therapies.fin.couple') })}
    ${c.lien('contact', { params: 'motif=enfant', ancre: 'formulaire', classe: 'bouton', texte: c.t('therapies.fin.enfant') })}
  </p>
</section>
`;

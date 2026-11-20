/* Le cabinet et Françoise Gady : mosaïque de trois vraies photos qui se rassemblent, parcours, cadre théorique,
   déontologie, ressources et numéros d'urgence. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: 'cabinet', fichier: 'cabinet', imagePartage: 'salle-couple-1280.webp' };

export default (c) => html`
<section class="tete-mosaique conteneur" id="debut">
  <div class="tete-texte">
    <p class="surtitre ouv-anim">${c.t('cabinet.ouv.surtitre')}</p>
    <h1 class="tete-titre" data-anime="gsap"><span class="ouv-ligne"><span class="ouv-l">${c.t('cabinet.ouv.titre1')}</span></span><span class="ouv-ligne"><span class="ouv-l"><em>${c.t('cabinet.ouv.titreMot')}</em></span></span></h1>
    <p class="ouv-anim masque-ecran-tres-bas">${c.t('cabinet.ouv.texte')}</p>
    <p class="ouv-anim">${c.lien('contact', { ancre: 'formulaire', classe: 'bouton', texte: c.t('cabinet.ouv.action'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
    <p class="ouv-info ouv-anim" data-info-cle>${c.t('cabinet.ouv.info')}</p>
  </div>
  <div class="mosaique">
    ${c.media({ nom: 'salon', alt: 'Le salon du cabinet : fauteuils moutarde autour d\'une petite table menthe', classe: 'mos mos-1', priorite: true, cadrage: '60% 55%', sizes: '(max-width: 760px) 70vw, 30vw', attrs: 'data-iris-centre' })}
    ${c.media({ nom: 'salle-adulte', alt: 'La salle de psychothérapie adulte, lampe et bibliothèque', classe: 'mos mos-2', cadrage: '40% 55%', sizes: '(max-width: 760px) 45vw, 20vw', attrs: 'data-effet="mosaique"' })}
    ${c.media({ nom: 'bureau', alt: 'Le bureau en bois du cabinet', classe: 'mos mos-3', cadrage: '45% 60%', sizes: '(max-width: 760px) 40vw, 16vw', attrs: 'data-effet="mosaique"' })}
  </div>
</section>

<section class="parcours fond-menthe" id="francoise">
  <div class="conteneur parcours-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('cabinet.francoise.surtitre')}</p>
      <h2 class="francoise-nom" data-anime="lettres">${c.t('cabinet.francoise.titre')}</h2>
      <p class="francoise-role" data-anime>${c.t('cabinet.francoise.role')}</p>
      <p data-anime>${c.t('cabinet.francoise.texte')}</p>
      <div class="livre" data-anime>
        ${c.media({ nom: 'livre', alt: c.s('cabinet.francoise.livreAlt'), classe: 'livre-media', ratio: '3 / 4', cadrage: '76% 50%', sizes: '120px' })}
        <p>${c.t('cabinet.francoise.livre')}</p>
      </div>
    </div>
    <div class="frise">
      <h3 data-anime>${c.t('cabinet.francoise.parcours')}</h3>
      <svg class="frise-trait" viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden="true" data-fx="trace"><path d="M2 0 V100" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>
      <ol class="frise-liste" data-anime="cascade">
        ${c.donnees.parcours.map((p) => html`<li><span class="frise-date">${p.date}</span><strong>${p.titre}</strong><span>${p.lieu}</span></li>`)}
      </ol>
    </div>
  </div>
</section>

<section class="cadre conteneur" id="cadre">
  <div class="cadre-tete">
    <div>
      <p class="surtitre" data-anime>${c.t('cabinet.cadre.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('cabinet.cadre.titre')}</h2>
      <p data-anime>${c.t('cabinet.cadre.texte')}</p>
    </div>
    ${c.media({ nom: 'grok/feuille', alt: 'Feuille de chêne en contre-jour, nervures visibles', classe: 'cadre-media', ratio: '4 / 3', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-fx="zoom"' })}
  </div>
  <ol class="voies voies--trois" data-anime="cascade">
    <li><span class="voie-num">01</span><h3>${c.t('cabinet.cadre.c1')}</h3><p>${c.t('cabinet.cadre.c1t')}</p></li>
    <li><span class="voie-num">02</span><h3>${c.t('cabinet.cadre.c2')}</h3><p>${c.t('cabinet.cadre.c2t')}</p></li>
    <li><span class="voie-num">03</span><h3>${c.t('cabinet.cadre.c3')}</h3><p>${c.t('cabinet.cadre.c3t')}</p></li>
  </ol>
  <div class="mur">
    <p class="mur-titre" data-anime>${c.t('cabinet.cadre.murTitre')}</p>
    <p class="mur-noms" data-anime="mots">${c.t('cabinet.cadre.mur')}</p>
  </div>
</section>

<section class="deonto fond-sapin" id="deontologie">
  <div class="conteneur deonto-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('cabinet.deonto.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('cabinet.deonto.titre')}</h2>
      <p class="deonto-ids" data-anime><span>${c.t('cabinet.deonto.rpps')}</span><span>${c.t('cabinet.deonto.siret')}</span></p>
    </div>
    <ol class="etapes etapes--clair" data-anime="cascade">
      <li>${c.t('cabinet.deonto.d1')}</li><li>${c.t('cabinet.deonto.d2')}</li><li>${c.t('cabinet.deonto.d3')}</li>
    </ol>
  </div>
</section>

<section class="ressources conteneur" id="ressources">
  <div class="tete-section">
    <p class="surtitre" data-anime>${c.t('cabinet.ressources.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('cabinet.ressources.titre')}</h2>
    <p data-anime>${c.t('cabinet.ressources.texte')}</p>
  </div>
  <ul class="urgences" data-anime="cascade">
    ${c.donnees.urgences.map((u) => html`<li><a href="tel:${u.lien}"><strong>${u.tel}</strong><span>${u.nom}</span><small>${u.detail}</small></a></li>`)}
  </ul>
  <h3 data-anime>${c.t('cabinet.ressources.partenairesTitre')}</h3>
  <p class="partenaires" data-anime="mots">${c.t('cabinet.ressources.partenaires')}</p>
</section>

<section class="appel conteneur" id="venir">
  <svg class="appel-trait" viewBox="0 0 400 120" aria-hidden="true" data-fx="trace"><path d="M4 90 C 90 10, 150 120, 220 50 S 330 30, 396 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
  <h2 data-anime="lignes">${c.t('cabinet.fin.titre')}</h2>
  <p data-anime>${c.t('cabinet.fin.texte')}</p>
  <p class="actions" data-anime>
    ${c.lien('contact', { ancre: 'formulaire', classe: 'bouton', texte: c.t('cabinet.fin.action'), attrs: 'data-survol="magnetique"' })}
    ${c.lien('contact', { ancre: 'acces', classe: 'bouton bouton--contour', texte: c.t('commun.itineraire') })}
  </p>
</section>
`;

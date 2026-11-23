/* Formations : grand titre et chiffres sur fond sapin, puis la vraie photo de formation qui s'élargit ;
   programmes, tarifs avec estimateur, modalités, références, qualité, questions. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: 'formations', fichier: 'formations', imagePartage: 'formation-groupe-1225.webp' };

export default (c) => html`
<section class="tete-forma fond-sapin" id="debut">
  <div class="conteneur tete-forma-grille">
    <div class="tete-forma-texte">
      <p class="surtitre ouv-anim">${c.t('formations.ouv.surtitre')}</p>
      <h1 class="tete-titre" data-anime="gsap" data-grille="typo"><span class="ouv-ligne"><span class="ouv-l">${c.t('formations.ouv.titre1')}</span></span><span class="ouv-ligne"><span class="ouv-l">${c.t('formations.ouv.titre2')} <em data-pinceau>${c.t('formations.ouv.titreMot')}</em></span></span></h1>
      <p class="ouv-anim masque-ecran-bas">${c.t('formations.ouv.texte')}</p>
      <p class="actions ouv-anim">
        ${c.lien('contact', { params: 'sujet=formation', ancre: 'formulaire', classe: 'bouton bouton--clair', texte: c.t('formations.ouv.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        <a class="bouton bouton--contour masque-ecran-tres-bas" href="#programmes" data-sans-transition>${c.t('formations.ouv.action2')}</a>
      </p>
      <p class="ouv-info ouv-anim" data-info-cle>${c.t('formations.ouv.info')}</p>
    </div>
    <ul class="tete-forma-chiffres ouv-anim">
      <li><strong>94,5 %</strong><span>${c.t('formations.ouv.c1')}</span></li>
      <li><strong>47</strong><span>${c.t('formations.ouv.c2')}</span></li>
    </ul>
  </div>
  <div class="bandeau conteneur" data-effet="bandeau" data-iris-centre>
    ${c.media({ nom: 'formation-groupe', alt: 'Françoise Gady avec les intervenantes d\'Auxiléo Services, en formation au Bouscat en 2026', classe: 'bandeau-media bandeau-1', cadrage: '55% 62%', priorite: true, sizes: '(max-width: 760px) 55vw, 45vw', legende: c.s('formations.ouv.legende') })}
    ${c.media({ nom: 'app-canopee', alt: 'Séance d\'analyse des pratiques avec l\'équipe soignante de l\'EHPAD La Canopée', classe: 'bandeau-media bandeau-2', cadrage: '50% 60%', sizes: '(max-width: 760px) 45vw, 35vw', legende: c.s('formations.references.legende') })}
  </div>
</section>

<section class="programmes conteneur" id="programmes">
  <div class="tete-section">
    <p class="surtitre" data-anime>${c.t('formations.programmes.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('formations.programmes.titre')}</h2>
  </div>
  <div class="programmes-liste">
    ${c.donnees.formations.map((f) => html`<article class="programme" id="programme-${f.cle}" data-fx="vitesse" data-fx-force="1.5">
      <header class="programme-tete">
        <span class="programme-numero">${f.numero}</span>
        <div>
          <h3>${f.titre}</h3>
          <p class="programme-sous">${f.sous}</p>
        </div>
      </header>
      <dl class="programme-infos">
        <div><dt>${c.t('formations.programmes.duree')}</dt><dd><strong>${f.duree}</strong><br>${f.dureeNote}</dd></div>
        <div><dt>${c.t('formations.programmes.public')}</dt><dd>${f.public}</dd></div>
      </dl>
      <details class="programme-details">
        <summary>${c.t('formations.programmes.objectifs')}</summary>
        <ul>${f.objectifs.map((o) => html`<li>${o}</li>`)}</ul>
        <p class="note">${f.resultat}</p>
      </details>
      <p class="programme-actions">${c.lien('contact', { params: 'sujet=formation&programme=' + f.cle, ancre: 'formulaire', classe: 'lien-fleche', texte: c.t('formations.programmes.devis') })}</p>
    </article>`)}
  </div>
</section>

<section class="tarifs fond-menthe" id="tarifs">
  <div class="conteneur tarifs-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('formations.tarifs.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('formations.tarifs.titre')}</h2>
      <ul class="tarifs-liste" data-anime="cascade">
        <li><span class="tarif-nom">${c.t('formations.tarifs.l1')}</span><strong class="tarif-prix" data-prix>${c.t('formations.tarifs.l1p')}</strong><span class="tarif-unite">${c.t('formations.tarifs.l1u')}</span><small>${c.t('formations.tarifs.l1n')}</small></li>
        <li><span class="tarif-nom">${c.t('formations.tarifs.l2')}</span><strong class="tarif-prix" data-prix>${c.t('formations.tarifs.l2p')}</strong><span class="tarif-unite">${c.t('formations.tarifs.l2u')}</span><small>${c.t('formations.tarifs.l2n')}</small></li>
        <li><span class="tarif-nom">${c.t('formations.tarifs.l3')}</span><strong class="tarif-prix" data-prix>${c.t('formations.tarifs.l3p')}</strong><span class="tarif-unite">${c.t('formations.tarifs.l3u')}</span><small>${c.t('formations.tarifs.l3n')}</small></li>
      </ul>
      <p class="note" data-anime>${c.t('formations.tarifs.texte')}</p>
    </div>
    <form class="estimateur" data-estimateur data-anime novalidate aria-labelledby="estim-titre">
      <h3 id="estim-titre">${c.t('formations.tarifs.estimTitre')}</h3>
      <fieldset class="choix">
        <legend>${c.t('formations.tarifs.estimType')}</legend>
        <label><input type="radio" name="type" value="jour" checked> ${c.t('formations.tarifs.estimJour')}</label>
        <label><input type="radio" name="type" value="app"> ${c.t('formations.tarifs.estimApp')}</label>
      </fieldset>
      <div class="estim-jour">
        <div class="champ"><label for="e-jours">${c.t('formations.tarifs.estimJours')} <output for="e-jours" data-sortie="jours">2,5</output></label><input id="e-jours" name="jours" type="range" min="1" max="3" step="0.5" value="2.5"></div>
        <div class="champ"><label for="e-personnes">${c.t('formations.tarifs.estimPersonnes')} <output for="e-personnes" data-sortie="personnes">12</output></label><input id="e-personnes" name="personnes" type="range" min="1" max="12" step="1" value="12"></div>
      </div>
      <div class="estim-app" hidden>
        <div class="champ"><label for="e-seances">${c.t('formations.tarifs.estimSeances')} <output for="e-seances" data-sortie="seances">10</output></label><input id="e-seances" name="seances" type="range" min="1" max="24" step="1" value="10"></div>
        <div class="champ"><label for="e-duree">${c.t('formations.tarifs.estimDuree')} <output for="e-duree" data-sortie="duree">2 h</output></label><input id="e-duree" name="duree" type="range" min="1.5" max="3.5" step="0.5" value="2"></div>
      </div>
      <div class="estim-total" aria-live="polite">
        <span>${c.t('formations.tarifs.estimTotal')}</span>
        <strong data-prix data-total>8 500 €</strong>
        <small data-par-personne>708 € ${c.t('formations.tarifs.estimParPersonne')}</small>
      </div>
      <p class="note">${c.t('formations.tarifs.estimNote')}</p>
      <p>${c.lien('contact', { params: 'sujet=formation', ancre: 'formulaire', classe: 'bouton', texte: c.t('formations.tarifs.estimDevis'), attrs: 'data-lien-devis' })}</p>
    </form>
  </div>
</section>

<section class="modalites conteneur" id="modalites">
  ${c.media({ nom: 'grok/table-formation', alt: 'Salle préparée pour une formation : carnets, tasses et pense-bêtes sur une table', classe: 'modalites-media', ratio: '16 / 10', sizes: '(max-width: 760px) 100vw, 45vw', attrs: 'data-fx="parallaxe"' })}
  <div>
    <p class="surtitre" data-anime>${c.t('formations.modalites.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('formations.modalites.titre')}</h2>
    <p data-anime>${c.t('formations.modalites.texte')}</p>
    <ul class="puces" data-anime="cascade">
      ${[1, 2, 3, 4, 5, 6].map((i) => html`<li>${c.t('formations.modalites.m' + i)}</li>`)}
    </ul>
  </div>
</section>

<section class="references fond-sapin" id="references">
  <div class="conteneur">
    <div class="references-tete">
      <div>
        <p class="surtitre" data-anime>${c.t('formations.references.surtitre')}</p>
        <h2 data-anime="lignes">${c.t('formations.references.titre')}</h2>
      </div>
      ${c.media({ nom: 'formation-groupe-2', alt: 'Françoise Gady et les intervenantes d\'Auxiléo Services autour de la table de formation', classe: 'references-media', ratio: '4 / 3', cadrage: '50% 62%', sizes: '(max-width: 760px) 100vw, 30vw', legende: c.s('formations.ouv.legende'), attrs: 'data-anime="rideau"' })}
    </div>
    <div class="references-groupes" data-anime="cascade">
      ${c.donnees.references.groupes.map((g) => html`<div class="ref-groupe">
        <h3>${g.titre}</h3>
        <ul>${g.lignes.map((l) => html`<li><strong data-typo-ignorer>${l.nom}</strong><span>${l.detail}</span>${l.annees ? html`<em>${l.annees}</em>` : ''}</li>`)}</ul>
      </div>`)}
    </div>
  </div>
</section>

<section class="qualite-faq conteneur" id="questions">
  <div class="qualite">
    <h2 data-anime="lignes">${c.t('formations.qualite.titre')}</h2>
    <p data-anime>${c.t('formations.qualite.texte')}</p>
    ${c.media({ nom: 'qualiopi', alt: 'Marque Qualiopi, processus certifié, République française', classe: 'qualiopi', ratio: '633 / 338', sizes: '240px', attrs: 'data-anime="rideau"' })}
  </div>
  <div>
    <h2 data-anime="lignes">${c.t('formations.faq.titre')}</h2>
    <div data-anime="cascade">
      ${c.donnees.faq.formations.map((f) => html`<details class="faq-item"><summary>${f.q}</summary><p>${f.r}</p></details>`)}
    </div>
  </div>
</section>

<section class="appel appel--bloc fond-menthe" id="devis">
  <div class="conteneur">
    <svg class="appel-trait" viewBox="0 0 400 120" aria-hidden="true" data-fx="trace"><path d="M4 60 C 70 10, 130 110, 200 60 S 320 10, 396 70" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
    <h2 data-anime="lignes">${c.t('formations.fin.titre')}</h2>
    <p data-anime>${c.t('formations.fin.texte')}</p>
    <p class="actions" data-anime>
      ${c.lien('contact', { params: 'sujet=formation', ancre: 'formulaire', classe: 'bouton', texte: c.t('formations.fin.action'), attrs: 'data-survol="magnetique"' })}
      <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.t('commun.appeler')} le ${c.site.contact.telephone}</a>
    </p>
  </div>
</section>
`;

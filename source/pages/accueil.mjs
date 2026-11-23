/* Accueil du Cabinet de la Forêt : deux portes (consulter, former), papillon du logo au centre. */
import { html, brut } from '../../outils/gabarit.mjs';
import { papillon } from '../gabarits/papillon.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'salon-1280.webp' };

const fmt = (n) => new Intl.NumberFormat('fr-FR').format(n).replace(/[  ]/g, ' ');

export default (c) => html`
<section class="ouv ecran" id="debut">
  <div class="ouv-feuillage" data-effet="feuillage" aria-hidden="true">
    ${c.media({ nom: 'grok/feuillage', alt: '', classe: 'ouv-feuillage-media', sizes: '100vw' })}
  </div>
  <div class="ouv-haut conteneur">
    <div class="ouv-titre-bloc">
      <p class="surtitre ouv-anim">${c.t('accueil.ouv.surtitre')}</p>
      <h1 class="ouv-titre" data-anime="gsap" data-grille="typo"><span class="ouv-ligne"><span class="ouv-l">${c.t('accueil.ouv.titre1')} <em data-pinceau>${c.t('accueil.ouv.titreMot')}</em></span></span><span class="ouv-ligne"><span class="ouv-l">${c.t('accueil.ouv.titre2')}</span></span></h1>
    </div>
    <div class="ouv-cote ouv-anim">
      <p class="ouv-texte masque-ecran-bas">${c.t('accueil.ouv.texte')}</p>
      <p class="ouv-actions">${c.lien('contact', { classe: 'bouton', texte: c.t('accueil.ouv.action'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
      <p class="ouv-info" data-info-cle>${c.t('accueil.ouv.info')}</p>
    </div>
  </div>
  <div class="portes">
    <a class="porte porte--g" data-effet="portes" href="${c.url('therapies')}" data-libelle="${c.libelle('therapies')}">
      ${c.media({ nom: 'salon', alt: 'Le salon du cabinet : fauteuils moutarde autour d\'une petite table menthe', classe: 'porte-media', cadrage: '58% 55%', priorite: true, sizes: '(max-width: 760px) 100vw, 50vw' })}
      <span class="porte-etiquette"><strong>${c.t('accueil.ouv.porteG')}</strong><small>${c.t('accueil.ouv.porteGSous')}</small></span>
    </a>
    <a class="porte porte--d" data-effet="portes" href="${c.url('formations')}" data-libelle="${c.libelle('formations')}">
      ${c.media({ nom: 'formation-groupe', alt: 'Françoise Gady avec les intervenantes d\'un service d\'aide à domicile, en formation', classe: 'porte-media', cadrage: '60% 62%', sizes: '(max-width: 760px) 100vw, 50vw' })}
      <span class="porte-etiquette"><strong>${c.t('accueil.ouv.porteD')}</strong><small>${c.t('accueil.ouv.porteDSous')}</small></span>
    </a>
    <button type="button" class="ouv-papillon" data-iris-centre="disque" data-grille="manipuler" aria-label="${c.s('accueil.ouv.papillon')}"><span class="ouv-vol">${papillon('pap-ouv', { trace: true, classe: 'papillon-ouv', attrs: 'data-effet="papillon"' })}</span></button>
  </div>
</section>

<section class="manifeste" id="manifeste">
  <div class="conteneur">
    <div class="eclosion" data-visuel aria-hidden="true">${papillon('pap-eclosion', { trace: true, classe: 'papillon-eclosion', attrs: 'data-effet="eclosion"' })}</div>
    <figure class="citation-bloc" data-effet="allumer">
      <blockquote class="citation"><p>${c.s('accueil.manifeste.citation').split(' ').map((m, i) => html`${i ? ' ' : ''}<span class="mot">${m}</span>`)}</p></blockquote>
      <figcaption data-anime>— ${c.t('accueil.manifeste.auteur')}</figcaption>
    </figure>
    <p class="manifeste-texte" data-anime="mots">${c.t('accueil.manifeste.texte')}</p>
  </div>
  <div class="motifs" role="region" aria-label="${c.s('accueil.manifeste.motifsRegion')}">
    <h2 class="motifs-titre conteneur" data-anime="lignes">${c.t('accueil.manifeste.motifsTitre')}</h2>
    ${c.donnees.motifs.map((rangee, i) => html`<ul class="ruban-rangee" data-ruban data-effet="ruban" data-sens="${i % 2 ? '1' : '-1'}">${[...rangee, ...rangee].map((m, j) => html`<li${j >= rangee.length ? brut(' aria-hidden="true"') : ''}>${m}</li>`)}</ul>`)}
  </div>
</section>

<section class="accomp fond-menthe" id="therapies">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('accueil.accomp.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('accueil.accomp.titre')}</h2>
    </div>
    <ul class="accomp-liste" data-anime="cascade">
      ${c.donnees.accompagnements.map((a) => html`<li class="accomp-carte">
        <a href="${c.url('therapies', a.cle)}" data-libelle="${c.libelle('therapies')}" class="accomp-lien">
          ${c.media({ nom: a.image, alt: a.alt, classe: 'accomp-media', ratio: '4 / 3', sizes: '(max-width: 760px) 100vw, 33vw', attrs: 'data-fx="zoom"' })}
          <span class="accomp-sous">${a.sous}</span>
          <span class="accomp-titre">${a.titre}</span>
          <span class="accomp-texte">${a.texte}</span>
          <span class="lien-fleche">${c.t('accueil.accomp.lien')}</span>
        </a>
      </li>`)}
    </ul>
  </div>
</section>

<section class="lieu conteneur" id="cabinet">
  <div class="lieu-texte">
    <p class="surtitre" data-anime>${c.t('accueil.cabinet.surtitre')}</p>
    <h2 data-anime="lignes">${c.t('accueil.cabinet.titre')}</h2>
    <p data-anime>${c.t('accueil.cabinet.texte')}</p>
    <p data-anime>${c.lien('cabinet', { classe: 'lien-fleche', texte: c.t('accueil.cabinet.lien') })}</p>
  </div>
  <div class="lieu-images">
    ${c.media({ nom: 'bureau', alt: 'Le bureau en bois du cabinet, sous des cadres noir et blanc', classe: 'lieu-bureau', ratio: '3 / 4', sizes: '(max-width: 760px) 70vw, 30vw', attrs: 'data-fx="parallaxe"' })}
    ${c.media({ nom: 'facade', alt: 'L\'entrée du Cabinet de la Forêt, avenue de la Forêt, dans la verdure', classe: 'lieu-facade', ratio: '4 / 3', cadrage: '70% 45%', sizes: '(max-width: 760px) 45vw, 16vw', attrs: 'data-fx="vitesse"' })}
  </div>
  <ul class="reperes" data-anime="cascade">
    ${[1, 2, 3, 4].map((i) => html`<li><strong>${c.t('accueil.cabinet.r' + i + 'v')}</strong><span>${c.t('accueil.cabinet.r' + i + 't')}</span></li>`)}
  </ul>
</section>

<section class="approche" id="approche">
  <div class="conteneur approche-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('accueil.approche.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('accueil.approche.titre')}</h2>
      <p data-anime>${c.t('accueil.approche.texte')}</p>
      ${c.media({ nom: 'grok/feuille', alt: 'Feuille de chêne en contre-jour, nervures visibles', classe: 'approche-media', ratio: '4 / 3', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-anime="rideau"' })}
    </div>
    <div class="approche-voies">
      <svg class="approche-trait" viewBox="0 0 40 600" preserveAspectRatio="none" aria-hidden="true" data-fx="trace"><path d="M20 4 C 38 120, 2 220, 20 300 S 36 480, 20 596" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
      <ol class="voies" data-anime="cascade">
        <li><span class="voie-num">01</span><h3>${c.t('accueil.approche.a1')}</h3><p>${c.t('accueil.approche.a1t')}</p></li>
        <li><span class="voie-num">02</span><h3>${c.t('accueil.approche.a2')}</h3><p>${c.t('accueil.approche.a2t')}</p></li>
        <li><span class="voie-num">03</span><h3>${c.t('accueil.approche.a3')}</h3><p>${c.t('accueil.approche.a3t')}</p></li>
      </ol>
      <p data-anime>${c.lien('cabinet', { ancre: 'cadre', classe: 'lien-fleche', texte: c.t('accueil.approche.lien') })}</p>
    </div>
  </div>
</section>

<section class="forma fond-sapin" id="formations">
  <div class="conteneur">
    <div class="forma-tete">
      <div>
        <p class="surtitre" data-anime>${c.t('accueil.formations.surtitre')}</p>
        <h2 data-anime="lignes">${c.t('accueil.formations.titre')}</h2>
        <p data-anime>${c.t('accueil.formations.texte')}</p>
        <p class="actions" data-anime>
          ${c.lien('formations', { classe: 'bouton bouton--clair', texte: c.t('accueil.formations.lienCatalogue'), attrs: 'data-survol="magnetique"' })}
          ${c.lien('contact', { params: 'sujet=formation', ancre: 'formulaire', classe: 'bouton bouton--contour', texte: c.t('accueil.formations.lienDevis') })}
        </p>
      </div>
      ${c.media({ nom: 'formation-groupe-2', alt: 'Françoise Gady et les intervenantes d\'Auxiléo Services autour de la table de formation, au Bouscat en 2026', classe: 'forma-media', ratio: '4 / 3', cadrage: '50% 62%', sizes: '(max-width: 760px) 100vw, 45vw', legende: c.s('accueil.formations.legende'), attrs: 'data-anime="rideau"' })}
    </div>
    <ul class="chiffres forma-chiffres" data-anime="cascade">
      <li><strong data-compteur="47">47</strong><span>${c.t('accueil.formations.c1')}</span></li>
      <li><strong><span data-compteur="94.5" data-decimales="1">94,5</span> %</strong><span>${c.t('accueil.formations.c2')}</span></li>
      <li><strong><span data-compteur="96">96</span> %</strong><span>${c.t('accueil.formations.c3')}</span></li>
      <li><strong data-compteur="4">4</strong><span>${c.t('accueil.formations.c4')}</span></li>
    </ul>
    <h3 class="forma-sous" data-anime>${c.t('accueil.formations.programmes')}</h3>
    <ol class="forma-programmes" data-anime="cascade">
      ${c.donnees.formations.map((f) => html`<li>${c.lien('formations', { ancre: 'programme-' + f.cle, classe: 'programme-lien', texte: html`<span class="programme-num">${f.numero}</span><span class="programme-nom">${f.court}</span><span class="programme-duree">${f.duree}</span>` })}</li>`)}
    </ol>
  </div>
  <div class="references-ruban" aria-label="${c.s('accueil.formations.references')}" role="region">
    <p class="conteneur forma-sous" data-anime>${c.t('accueil.formations.references')}</p>
    <ul class="ruban-rangee ruban-rangee--refs" data-ruban data-typo-ignorer data-effet="ruban" data-sens="-1">${[...c.donnees.references.ruban, ...c.donnees.references.ruban].map((m, j) => html`<li${j >= c.donnees.references.ruban.length ? brut(' aria-hidden="true"') : ''}>${m}</li>`)}</ul>
  </div>
</section>

<section class="francoise conteneur" id="francoise">
  <div class="francoise-images">
    ${c.media({ nom: 'app-canopee', alt: 'Françoise Gady en séance d\'analyse des pratiques avec une équipe soignante', classe: 'francoise-photo', ratio: '4 / 3', sizes: '(max-width: 760px) 100vw, 36vw', legende: c.s('accueil.francoise.legende'), attrs: 'data-fx="parallaxe" data-fx-force="6"' })}
    ${c.media({ nom: 'livre', alt: 'Couverture du livre de Françoise Gady', classe: 'francoise-livre', ratio: '4 / 3', cadrage: '76% 50%', sizes: '(max-width: 760px) 40vw, 14vw', attrs: 'data-fx="vitesse"' })}
  </div>
  <div>
    <p class="surtitre" data-anime>${c.t('accueil.francoise.surtitre')}</p>
    <h2 class="francoise-nom" data-anime="lettres">${c.t('accueil.francoise.titre')}</h2>
    <p class="francoise-role" data-anime>${c.t('accueil.francoise.role')}</p>
    <p data-anime>${c.t('accueil.francoise.texte')}</p>
    <p class="francoise-livre-texte" data-anime>${c.t('accueil.francoise.livre')}</p>
    <p data-anime>${c.lien('cabinet', { ancre: 'francoise', classe: 'lien-fleche', texte: c.t('accueil.francoise.lien') })}</p>
  </div>
</section>

<section class="fin-foret" id="rendez-vous">
  ${c.media({ nom: 'grok/foret', alt: 'Chemin de sable entre les pins, dans la lumière du matin', classe: 'fin-foret-media', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  <div class="fin-foret-contenu conteneur">
    <div class="fin-envol" aria-hidden="true" data-superpose>${papillon('pap-envol', { classe: 'papillon-envol', attrs: 'data-effet="envol"' })}</div>
    <h2 class="fin-titre" data-anime="lignes">${c.t('accueil.fin.titre1')} <em data-pinceau>${c.t('accueil.fin.titreMot')}</em></h2>
    <p data-anime>${c.t('accueil.fin.texte')}</p>
    <p class="fin-tel" data-anime><a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a></p>
    <p class="fin-choix" data-anime="cascade">
      ${c.lien('contact', { params: 'motif=adulte', ancre: 'formulaire', classe: 'bouton bouton--clair', texte: c.t('accueil.fin.moi') })}
      ${c.lien('contact', { params: 'motif=couple', ancre: 'formulaire', classe: 'bouton bouton--clair', texte: c.t('accueil.fin.couple') })}
      ${c.lien('contact', { params: 'motif=enfant', ancre: 'formulaire', classe: 'bouton bouton--clair', texte: c.t('accueil.fin.enfant') })}
      ${c.lien('contact', { params: 'sujet=formation', ancre: 'formulaire', classe: 'bouton bouton--contour', texte: c.t('accueil.fin.equipe') })}
    </p>
  </div>
</section>
`;

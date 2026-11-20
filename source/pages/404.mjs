/* Page 404 aux couleurs du cabinet : fenêtre ouverte sur les pins, le papillon s'est envolé. */
import { html } from '../../outils/gabarit.mjs';
import { papillon } from '../gabarits/papillon.mjs';

export const page = { cle: '404', fichier: '404', langues: ['fr'], partage: false };

export default (c) => html`
<section class="introuvable" id="debut">
  ${c.media({ nom: 'grok/fenetre', alt: c.s('introuvable.alt'), priorite: true, classe: 'introuvable-media', sizes: '100vw', attrs: 'data-fx="zoom"' })}
  <div class="introuvable-contenu conteneur">
    <div class="introuvable-papillon" data-iris-centre aria-hidden="true">${papillon('pap-404', { classe: 'papillon-envol', attrs: 'data-effet="envol"' })}</div>
    <h1 class="tete-titre" data-anime="gsap"><span class="ouv-ligne"><span class="ouv-l">${c.t('introuvable.titre')}</span></span></h1>
    <p class="ouv-anim">${c.t('introuvable.texte')}</p>
    <p class="ouv-anim">${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })}</p>
    <p class="ouv-info ouv-anim" data-info-cle>${c.t('commun.horaires')} · ${c.site.contact.telephone}</p>
  </div>
</section>
`;

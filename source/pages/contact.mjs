/* Contact et rendez-vous : le téléphone d'abord, un formulaire simulé à deux parcours (consulter, former une équipe),
   l'accès et les numéros d'urgence. */
import { html } from '../../outils/gabarit.mjs';
import { papillon } from '../gabarits/papillon.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'grok/fenetre-1280.webp' };

export default (c) => html`
<section class="tete-contact conteneur" id="debut">
  <div class="tete-texte">
    <p class="surtitre ouv-anim">${c.t('contact.ouv.surtitre')}</p>
    <div class="contact-titre">
      <h1 class="tete-titre" data-anime="gsap" data-grille="typo"><span class="ouv-ligne"><span class="ouv-l">${c.t('contact.ouv.titre')}</span></span><span class="ouv-ligne"><span class="ouv-l"><em data-pinceau>${c.t('contact.ouv.titreMot')}</em></span></span></h1>
      <div class="contact-papillon" data-iris-centre aria-hidden="true">${papillon('pap-contact', { classe: 'papillon-pose', attrs: 'data-effet="pose"' })}</div>
    </div>
    <p class="ouv-anim">${c.t('contact.ouv.texte')}</p>
    <p class="ouv-anim"><a class="bouton bouton--grand" href="tel:${c.site.contact.telephoneLien}" data-action-principale data-survol="magnetique">${c.t('contact.ouv.action')}</a></p>
    <p class="ouv-info ouv-anim" data-info-cle>${c.t('contact.ouv.info')}</p>
    <p class="contact-email ouv-anim"><span>${c.t('contact.ouv.emailTitre')}</span> <a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
  </div>
  <form class="formulaire" id="formulaire" data-formulaire action="#" novalidate>
    <h2 class="formulaire-titre">${c.t('contact.form.titre')}</h2>
    <fieldset class="onglets" data-onglets>
      <legend class="visuellement-cache">${c.t('contact.form.titre')}</legend>
      <label><input type="radio" name="sujet" value="consultation" checked><span>${c.t('contact.form.onglet1')}</span></label>
      <label><input type="radio" name="sujet" value="formation"><span>${c.t('contact.form.onglet2')}</span></label>
    </fieldset>
    <div class="parcours-consulter" data-parcours="consultation">
      <div class="champ"><label for="f-motif">${c.t('contact.form.motif')}</label>
        <select id="f-motif" name="motif">
          <option value="adulte">${c.t('contact.form.motifAdulte')}</option>
          <option value="couple">${c.t('contact.form.motifCouple')}</option>
          <option value="enfant">${c.t('contact.form.motifEnfant')}</option>
        </select></div>
      <div class="champ"><label for="f-creneau">${c.t('contact.form.creneau')}</label>
        <select id="f-creneau" name="creneau">
          <option value="matin">${c.t('contact.form.creneauMatin')}</option>
          <option value="apres-midi">${c.t('contact.form.creneauAprem')}</option>
          <option value="soir">${c.t('contact.form.creneauSoir')}</option>
        </select></div>
    </div>
    <div class="parcours-former" data-parcours="formation" hidden>
      <div class="champ"><label for="f-structure">${c.t('contact.form.structure')}</label><input id="f-structure" name="structure" autocomplete="organization"></div>
      <div class="champ-ligne">
        <div class="champ"><label for="f-programme">${c.t('contact.form.programme')}</label>
          <select id="f-programme" name="programme">
            ${c.donnees.formations.map((f) => html`<option value="${f.cle}">${f.court}</option>`)}
            <option value="sur-mesure">${c.t('contact.form.programmeMesure')}</option>
          </select></div>
        <div class="champ"><label for="f-effectif">${c.t('contact.form.effectif')}</label><input id="f-effectif" name="effectif" type="number" inputmode="numeric" min="1" max="60"></div>
      </div>
      <div class="champ"><label for="f-periode">${c.t('contact.form.periode')}</label><input id="f-periode" name="periode"></div>
    </div>
    <div class="champ-ligne">
      <div class="champ"><label for="f-nom">${c.t('contact.form.nom')}</label><input id="f-nom" name="nom" autocomplete="name" required></div>
      <div class="champ"><label for="f-tel">${c.t('contact.form.tel')}</label><input id="f-tel" name="tel" type="tel" autocomplete="tel" required></div>
    </div>
    <div class="champ"><label for="f-email">${c.t('contact.form.email')}</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
    <div class="champ"><label for="f-message">${c.t('contact.form.message')}</label><textarea id="f-message" name="message" rows="4" aria-describedby="f-message-aide"></textarea><p class="aide" id="f-message-aide">${c.t('contact.form.messageAide')}</p></div>
    <p class="mention-donnees">${c.t('contact.form.donnees')}</p>
    <button type="submit" class="bouton" data-grille="retour">${c.t('contact.form.envoyer')}</button>
    <p data-message-envoi data-texte="${c.s('contact.form.simule')}" role="status" tabindex="-1" hidden></p>
  </form>
</section>

<section class="acces fond-menthe" id="acces">
  <div class="conteneur acces-grille">
    <div class="acces-images">
      ${c.media({ nom: 'facade', alt: 'L\'entrée du Cabinet de la Forêt, avenue de la Forêt, dans la verdure', classe: 'acces-facade', ratio: '4 / 3', cadrage: '72% 45%', sizes: '(max-width: 760px) 60vw, 22vw', attrs: 'data-fx="vitesse"' })}
      ${c.media({ nom: 'salle-couple', alt: 'Le salon du cabinet, trois sièges autour d\'une petite table', classe: 'acces-salon', ratio: '4 / 5', cadrage: '60% 62%', sizes: '(max-width: 760px) 70vw, 28vw', attrs: 'data-fx="parallaxe"' })}
    </div>
    <div>
      <p class="surtitre" data-anime>${c.t('contact.acces.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('contact.acces.titre')}</h2>
      <p data-anime>${c.t('contact.acces.texte')}</p>
      <p class="acces-adresse" data-anime>${c.site.contact.adresse}<br>${c.t('contact.acces.horaires')}</p>
      <p data-anime><a class="bouton bouton--contour" href="https://www.google.com/maps/search/?api=1&amp;query=21%20avenue%20de%20la%20For%C3%AAt%2033700%20M%C3%A9rignac" target="_blank" rel="noopener">${c.t('contact.acces.itineraire')}</a></p>
    </div>
  </div>
</section>

<section class="urgences-section conteneur" id="urgences">
  <h2 data-anime="lignes">${c.t('contact.urgences.titre')}</h2>
  <p data-anime>${c.t('contact.urgences.texte')}</p>
  <ul class="urgences" data-anime="cascade">
    ${c.donnees.urgences.map((u) => html`<li><a href="tel:${u.lien}"><strong>${u.tel}</strong><span>${u.nom}</span><small>${u.detail}</small></a></li>`)}
  </ul>
</section>
`;

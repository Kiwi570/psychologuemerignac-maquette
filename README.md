# Cabinet de la Forêt — maquette

Maquette du futur site de **Françoise Gady**, psychologue clinicienne, cadre de santé et formatrice, au Cabinet de la Forêt (21 avenue de la Forêt, 33700 Mérignac). Site actuel : www.psychologuemerignac.com (Wix).

- En ligne : https://psychologuemerignac-maquette.vercel.app
- Direction « Halte » : lin, menthe, sapin, orange du papillon du logo, moutarde des fauteuils du cabinet. Titres Fraunces, texte Figtree.
- Pages : accueil, Thérapies, Formations, Le cabinet, Contact, 404.
- Base technique : socle des maquettes (documentation dans `_suivi/socle-README.md`), audit dans `_audit/`, suivi du projet dans `_suivi/`.

## Fiche : ce que le client doit fournir

À compléter avant la mise en ligne définitive :

| Élément | Où | État |
|---|---|---|
| Mentions légales (éditeur, directrice de publication, hébergeur) | pied de page de toutes les pages | à compléter |
| Hébergeur : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis | mentions légales | adresse vérifiée le 20 novembre 2026 (conditions de Vercel) |
| Politique de confidentialité (formulaire de contact) | pied de page, formulaire de Contact | à compléter |
| SIRET 502 600 984 00038, RPPS 10009596668, n° d'organisme de formation 75331173733 | pied de page | repris du site actuel, à confirmer |
| Certificat Qualiopi, politique qualité, procédure de réclamation (PDF) | page Formations, section Qualité | à fournir pour les relier |
| Crédits des illustrations générées (Grok) | mentions légales | à reporter : toutes les images du dossier `assets/images/grok/` |

### Retiré ou remplacé faute d'information

| Information | Page | Ce qui est affiché à la place |
|---|---|---|
| Tarif des consultations | Accueil, Thérapies (questions) | « Le tarif vous est communiqué lors du premier échange » (phrase du site actuel) |
| Jours d'ouverture | partout | « Sur rendez-vous, de 9 h à 20 h 30 » ; pas de statut « ouvert maintenant » sans les jours |
| Portrait de Françoise Gady | Accueil, Le cabinet | présentation par son parcours, son livre et une vraie photo d'analyse des pratiques |
| Témoignages | — | aucun (le site actuel n'en publie pas) |
| Indicateurs propres aux formations CNV et santé mentale | Formations | non affichés (le site annonce qu'ils viendront après les premières sessions) |
| Numéros des CMP de Mérignac et des partenaires | Le cabinet | noms seuls |

### Incohérences du site actuel à signaler au client

- Deux numéros de téléphone : 06 72 99 10 59 (pied de page, contact, plaque de la façade) et 06 70 99 10 59 (métadonnées de la page Psychothérapie adulte). La maquette utilise le 06 72 99 10 59.
- Qualiopi : la page APP dit à la fois « certifié Qualiopi » et « en cours de certification Qualiopi 2025 ».
- Coquilles : « paillon » (texte alternatif du logo), « handucaps », « Lutherking ».

## À la mise en ligne définitive

- Retirer : la consigne `noindex` (balise robots dans `source/gabarits/commun.mjs`, en-tête X-Robots-Tag dans `vercel.json`), le formulaire simulé (le relier à un vrai envoi), la mention « Maquette de démonstration » du pied de page, les « à compléter » du pied de page une fois les pages légales écrites.
- Garder : la mention « Illustration générée » sur chaque image créée par IA.
- Régénérer les pages après toute modification des textes : `node outils/generer.mjs`.

## Commandes

```
node outils/generer.mjs          pages HTML depuis donnees/ et source/
node _audit/audit.mjs            audit standard
```

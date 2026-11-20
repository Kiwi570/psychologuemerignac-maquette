/* Papillon du logo du Cabinet de la Forêt (traits vectorisés depuis le logo du site actuel).
   papillon(id, { trace }) : avec trace, chaque trait est révélé par un masque qui suit sa ligne centrale
   (tracé au pinceau, animé par site.js sur .pap-trace) ; sans trace, les traits sont pleins.
   Deux ailes (.aile-g, .aile-d) pour le battement. viewBox calée sur le logo. */
import { brut } from '../../outils/gabarit.mjs';
import { PAPILLON as P } from './papillon-donnees.mjs';

const COUL = { gauche: 'var(--pap-orange, #E8641C)', petit: 'var(--pap-orange, #E8641C)', droite: 'var(--pap-orange, #E8641C)', bleu: 'var(--pap-bleu, #2E9BE0)', vert: 'var(--pap-vert, #1FA055)' };
const EPAIS = { gauche: 26, petit: 22, droite: 26, bleu: 18, vert: 18 };
const ORDRE = ['gauche', 'petit', 'vert', 'droite', 'bleu'];

export function svgPapillon(id, { trace = false, classe = '', attrs = '' } = {}) {
  const forme = (k) => `<path class="pap-forme pap-${k}" d="${P[k].d}" fill="${COUL[k]}"${trace ? ` mask="url(#${id}-${k})"` : ''}/>`;
  const masques = trace
    ? `<defs>${ORDRE.map((k) => `<mask id="${id}-${k}" maskUnits="userSpaceOnUse" x="0" y="-30" width="500" height="380"><path class="pap-trace" data-trait="${k}" d="${P[k].trace}" pathLength="1" fill="none" stroke="#fff" stroke-width="${EPAIS[k]}" stroke-linecap="round" stroke-linejoin="round"/></mask>`).join('')}</defs>`
    : '';
  return `<svg class="papillon ${classe}" viewBox="28 -6 440 330" aria-hidden="true" focusable="false"${attrs ? ' ' + attrs : ''}>${masques}<g class="aile aile-g">${forme('gauche')}${forme('petit')}${forme('vert')}</g><g class="aile aile-d">${forme('droite')}${forme('bleu')}</g></svg>`;
}

export const papillon = (id, o) => brut(svgPapillon(id, o));

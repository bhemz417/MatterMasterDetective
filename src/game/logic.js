import { BADGE_IDS } from './content.js';
export const BONUS_POINTS = { simulation: 50, boss: 200 };
export const POINTS_PER_BADGE = 100;
export const MAX_SCORE = BADGE_IDS.length * POINTS_PER_BADGE + BONUS_POINTS.simulation + BONUS_POINTS.boss;
export function matterState(temp) {
  if (temp < 0) return 'solid';
  if (temp >= 100) return 'gas';
  return 'liquid';
}
export function calculateScore(completed = []) {
  const unique = new Set(completed);
  const badgePoints = BADGE_IDS.filter(id => unique.has(id)).length * POINTS_PER_BADGE;
  return badgePoints + (unique.has('simulation') ? BONUS_POINTS.simulation : 0) + (unique.has('boss') ? BONUS_POINTS.boss : 0);
}
export function earnedBadges(completed = []) {
  const all = new Set(completed);
  return BADGE_IDS.filter(id => all.has(id));
}
export function allBadgesEarned(completed = []) {
  return earnedBadges(completed).length === BADGE_IDS.length;
}
export function canGetCertificate(completed = []) {
  return allBadgesEarned(completed) && completed.includes('boss');
}
export function normalizeSave(raw) {
  if (!raw || typeof raw !== 'object') return { completed: [], name: '', sound: true };
  const valid = new Set([...BADGE_IDS, 'simulation', 'boss']);
  return {
    completed: Array.isArray(raw.completed) ? [...new Set(raw.completed.filter(id => typeof id === 'string' && valid.has(id)))] : [],
    name: typeof raw.name === 'string' ? raw.name.slice(0, 48) : '',
    sound: typeof raw.sound === 'boolean' ? raw.sound : true
  };
}
export function escapeXml(text) {
  return String(text).replace(/[<>&"']/g, ch => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[ch]);
}
export function generateCertificateSvg({ name, score, date }) {
  const safeName = escapeXml((name || 'Science City Detective').trim());
  const safeDate = escapeXml(date);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850" role="img" aria-label="Master Matter Detective certificate"><rect width="1200" height="850" fill="#f5f0e5"/><rect x="34" y="34" width="1132" height="782" rx="28" fill="none" stroke="#232d4c" stroke-width="8"/><rect x="54" y="54" width="1092" height="742" rx="20" fill="none" stroke="#ba9a5c" stroke-width="3"/><circle cx="600" cy="170" r="64" fill="#fbe8ae" stroke="#232d4c" stroke-width="6"/><text x="600" y="189" text-anchor="middle" font-size="68">🏅</text><text x="600" y="292" font-size="31" fill="#59607a" font-family="Arial,sans-serif" text-anchor="middle" letter-spacing="6">SCIENCE CITY ACADEMY</text><text x="600" y="385" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-size="65" fill="#232d4c">MASTER MATTER DETECTIVE</text><text x="600" y="450" text-anchor="middle" font-family="Arial,sans-serif" font-size="27" fill="#59607a">This certificate is proudly awarded to</text><text x="600" y="538" text-anchor="middle" font-family="Georgia,serif" font-size="59" fill="#6c4fe4">${safeName}</text><line x1="235" x2="965" y1="562" y2="562" stroke="#bead83" stroke-width="2"/><text x="600" y="614" text-anchor="middle" font-family="Arial,sans-serif" font-size="25" fill="#232d4c">For solving all five mysteries and defeating Dr Chaos!</text><text x="600" y="662" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" fill="#59607a">Score: ${score} / ${MAX_SCORE} Detective Points  •  ${safeDate}</text><text x="600" y="740" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" fill="#59607a">Matter Detective •  Open Educational Resource</text></svg>`;
}

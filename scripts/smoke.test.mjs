import test from 'node:test';
import assert from 'node:assert/strict';
import { BADGE_IDS, MISSION_MAP, MISSION_BADGES, MISSION_BRIEFING, SOURCES } from '../src/game/content.js';
import { matterState, calculateScore, allBadgesEarned, canGetCertificate, earnedBadges, normalizeSave, generateCertificateSvg, MAX_SCORE } from '../src/game/logic.js';

test('the OER starts with an accurate Mission Briefing and five unique mission badges', () => {
  assert.equal(MISSION_BRIEFING.title, 'Welcome, Detective!');
  assert.equal(MISSION_BRIEFING.rank, 'MASTER MATTER DETECTIVE');
  assert.equal(BADGE_IDS.length, 5);
  assert.equal(new Set(BADGE_IDS).size, 5);
  assert.deepEqual(BADGE_IDS, MISSION_MAP.map(m => m.id));
  assert.equal(MISSION_BADGES.length, 5);
});
test('states of matter switch at water model boundaries', () => {
  assert.equal(matterState(-25), 'solid');
  assert.equal(matterState(-0.1), 'solid');
  assert.equal(matterState(0), 'liquid');
  assert.equal(matterState(99.9), 'liquid');
  assert.equal(matterState(100), 'gas');
  assert.equal(matterState(120), 'gas');
});
test('five badges grant five hundred points without duplication', () => {
  assert.equal(calculateScore([...BADGE_IDS, BADGE_IDS[0]]), 500);
  assert.deepEqual(earnedBadges([...BADGE_IDS, BADGE_IDS[1]]), BADGE_IDS);
  assert.equal(allBadgesEarned(BADGE_IDS), true);
  assert.equal(canGetCertificate(BADGE_IDS), false);
});
test('boss and simulation bonuses unlock only after completing challenges', () => {
  assert.equal(calculateScore([...BADGE_IDS, 'simulation', 'boss']), MAX_SCORE);
  assert.equal(MAX_SCORE, 750);
  assert.equal(canGetCertificate([...BADGE_IDS, 'boss']), true);
  assert.equal(canGetCertificate(['simulation','boss']), false);
});
test('local progress ignores unknown or malicious completion IDs', () => {
  const saved = normalizeSave({completed: ['particle','particle','fake-key','boss'],name:'Learner',sound:false});
  assert.deepEqual(saved.completed,['particle','boss']);
  assert.equal(saved.name,'Learner');
  assert.equal(saved.sound,false);
});
test('certificate escapes learner name and keeps score', () => {
  const svg = generateCertificateSvg({name:'<Alex & Chris>',score:750,date:'18 October 2026'});
  assert.ok(svg.includes('&lt;Alex &amp; Chris&gt;'));
  assert.equal(svg.includes('<Alex & Chris>'),false);
  assert.ok(svg.includes('750 / 750'));
});
test('both requested educational sources are linked rather than bundled', () => {
  assert.equal(SOURCES.length, 2);
  assert.ok(SOURCES.some(s => s.url === 'https://teachersinstitute.yale.edu'));
  assert.ok(SOURCES.some(s => s.url === 'https://phet.colorado.edu'));
});

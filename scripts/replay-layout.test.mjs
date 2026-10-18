import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calculateScore, earnedBadges } from '../src/game/logic.js';
import { BADGE_IDS } from '../src/game/content.js';
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const missions = readFileSync(new URL('../src/pages/Missions.jsx', import.meta.url), 'utf8');
const sim = readFileSync(new URL('../src/components/SimulationPage.jsx', import.meta.url), 'utf8');
const ui = readFileSync(new URL('../src/components/UI.jsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/replay-and-space.css', import.meta.url), 'utf8');

test('all original missions and the boss expose replay instead of locking completed questions', () => {
  for (const id of [...BADGE_IDS, 'boss']) {
    assert.match(missions, new RegExp(`completed\\.includes\\('${id}'\\) && replaying !== '${id}'`));
    assert.match(missions, new RegExp(`onReplay=\\{\\(\\) => onReplay\\('${id}'\\)\\}`));
  }
});

test('replaying a completed challenge does not add points or remove badges', () => {
  const awarded = [...BADGE_IDS, 'simulation', 'boss'];
  const scoreBefore = calculateScore(awarded);
  const earnedBefore = earnedBadges(awarded);
  assert.equal(scoreBefore, 750);
  assert.equal(calculateScore([...awarded, ...awarded]), scoreBefore);
  assert.deepEqual(earnedBadges([...awarded, ...awarded]), earnedBefore);
  assert.match(app, /if \(completed\.includes\(id\)\) \{/);
  assert.match(app, /if \(replaying === id\) \{/);
  assert.match(app, /setReplaying\(null\)/);
});

test('new adventure resets score and badges while preserving sound setting', () => {
  assert.match(app, /setSaved\(\{ completed: \[\], name: '', sound: saved\.sound \}\)/);
  assert.equal(calculateScore([]), 0);
  assert.deepEqual(earnedBadges([]), []);
  assert.match(missions, /Start a brand-new adventure/);
  assert.match(missions, /Start a new adventure/);
});

test('replay controls exist on certificate, solved screens and in simulation quick check', () => {
  assert.match(ui, /Play this mission again/);
  assert.match(missions, /Replay Final Boss/);
  assert.match(sim, /Try this question again/);
  assert.match(sim, /disabled=\{false\}/);
  assert.match(app, /key=\{`\$\{screen\}-\$\{playSession\}`\}/);
});

test('simulation takes entire width and info notes wrap below canvas; mobile layout is specified', () => {
  assert.match(css, /\.sim-page \.sim-layout\{display:grid;grid-template-columns:minmax\(0,1fr\)/);
  assert.match(css, /\.sim-page \.sim-info-column\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /\.sim-page \.particle-canvas-wrap:not\(\.is-compact\)/);
  assert.match(css, /@media\(max-width:600px\)/);
});

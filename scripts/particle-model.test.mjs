import test from 'node:test';
import assert from 'node:assert/strict';
import { PARTICLE_COUNT, PARTICLE_FACTS, PARTICLE_BOX, PARTICLE_RADIUS, SOLID_LATTICE, makeParticles, advanceParticles } from '../src/game/particle-model.js';
import { FINAL_QUESTIONS } from '../src/game/content.js';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/Missions.jsx', import.meta.url), 'utf8');

function spread(particles) {
  const xs = particles.map(p => p.x);
  const ys = particles.map(p => p.y);
  return { x: Math.max(...xs) - Math.min(...xs), y: Math.max(...ys) - Math.min(...ys) };
}

test('all three phases contain the same 30 same-size particles', () => {
  for (const phase of ['solid', 'liquid', 'gas']) {
    const particles = makeParticles(phase);
    assert.equal(particles.length, 30);
    assert.equal(particles.length, PARTICLE_COUNT);
    assert.equal(new Set(particles.map(p => p.id)).size, 30);
  }
  assert.equal(PARTICLE_RADIUS, 9.5);
});

test('solid particles pack tightly; liquid is pooled; gas fills the container', () => {
  const solid = spread(makeParticles('solid'));
  const liquid = spread(makeParticles('liquid'));
  const gas = spread(makeParticles('gas'));
  assert.ok(solid.x < liquid.x, 'solid remains in a fixed-shaped cluster');
  assert.ok(liquid.y < solid.y, 'liquid occupies a lower, flowing band');
  assert.ok(gas.y > solid.y && gas.y > liquid.y, 'gas extends through most container height');
  assert.ok(gas.x > solid.x, 'gas uses more of the container width');
});

test('solid particles remain anchored during temperature-model playback', () => {
  const particles = makeParticles('solid');
  const before = particles.map(p => [p.x, p.y]);
  for (let i = 0; i < 100; i++) advanceParticles(particles, 'solid', -10, 1);
  assert.deepEqual(particles.map(p => [p.x, p.y]), before);
});

test('liquid and gas particles move, stay inside chamber, and are conserved', () => {
  for (const phase of ['liquid', 'gas']) {
    const particles = makeParticles(phase);
    const starting = particles.map(p => [p.x, p.y]);
    for (let t = 0; t < 180; t++) advanceParticles(particles, phase, phase === 'gas' ? 110 : 25, 1);
    assert.ok(particles.some((p, i) => p.x !== starting[i][0] || p.y !== starting[i][1]));
    assert.equal(particles.length, 30);
    for (const p of particles) {
      assert.ok(p.x >= PARTICLE_BOX.left + PARTICLE_RADIUS - .01 && p.x <= PARTICLE_BOX.right - PARTICLE_RADIUS + .01);
      assert.ok(p.y >= PARTICLE_BOX.top + PARTICLE_RADIUS - .01 && p.y <= PARTICLE_BOX.bottom - PARTICLE_RADIUS + .01);
      assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y));
    }
  }
});

test('grade-six science descriptions distinguish vibration, sliding and free motion', () => {
  assert.match(PARTICLE_FACTS.solid.motion, /Vibrating/);
  assert.match(PARTICLE_FACTS.liquid.motion, /Sliding/);
  assert.match(PARTICLE_FACTS.gas.motion, /freely/);
});

test('original specimen, ice and balloon questions stay unchanged; puddle question is improved', () => {
  const originalQuestions = [
    "['Solid', 'Liquid', 'Gas']",
    "['Heat made water particles move more freely', 'The ice disappeared and stopped existing', 'Cold changed the ice into gas']",
    "['The particles vanish from the balloon', 'Warm gas particles move faster and can push the balloon outward', 'Heating makes the gas solid']"
  ];
  for (const options of originalQuestions) assert.ok(source.includes(`<AnswerChoices options={${options}}`), `Original choices missing: ${options}`);
  assert.ok(source.includes('What kind of matter is this?'));
  assert.ok(source.includes('Which change of state made the puddle smaller?'));
  assert.ok(source.includes("['Freezing — liquid water turns into ice', 'Evaporation — liquid water becomes water vapour', 'Condensation — water vapour turns into liquid drops']"));
  assert.ok(source.includes("if (i === 1) onComplete('puddle')"));
  assert.doesNotMatch(source, /The water ceased to exist/);
});

test('new solid positions pack more closely while remaining separate', () => {
  assert.equal(SOLID_LATTICE.spacing, 20.5);
  assert.ok(SOLID_LATTICE.spacing > PARTICLE_RADIUS * 2);
  assert.ok(SOLID_LATTICE.spacing < 23);
  const dots = makeParticles('solid');
  for (let i = 0; i < dots.length; i++) {
    assert.ok(dots[i].x >= PARTICLE_BOX.left + PARTICLE_RADIUS && dots[i].x <= PARTICLE_BOX.right - PARTICLE_RADIUS);
    assert.ok(dots[i].y >= PARTICLE_BOX.top + PARTICLE_RADIUS && dots[i].y <= PARTICLE_BOX.bottom - PARTICLE_RADIUS);
    for (let j = i + 1; j < dots.length; j++) {
      assert.ok(Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y) >= PARTICLE_RADIUS * 2, 'solid particle circles must not overlap at rest');
    }
  }
});

test('the five original final boss questions and correct answers remain unchanged', () => {
  assert.deepEqual(FINAL_QUESTIONS.map(q => q.correct), [1, 0, 0, 1, 2]);
  assert.deepEqual(FINAL_QUESTIONS.map(q => q.question), [
    'Which statement about a solid is correct?',
    'What happens to ice when it absorbs enough heat to reach its melting point?',
    'A puddle shrinks on a warm, windy day. Where has most of the missing water gone?',
    'Why might a flexible balloon become bigger when the gas inside is warmed?',
    'Which change of state happens when water vapour cools into drops of liquid water?'
  ]);
});

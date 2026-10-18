/**
 * Teaching model: equal number of equally sized WATER particles in each state.
 * The dots represent whole water molecules (H2O), not atoms, and are not to scale.
 * This is a conceptual model, not a molecular-dynamics simulator.
 */
export const PARTICLE_COUNT = 30;
export const PARTICLE_RADIUS = 9.5;
export const PARTICLE_BOX = Object.freeze({ left: 74, right: 546, top: 63, bottom: 282 });
// The solid dots sit just a little more than one diameter apart. Their centres
// remain fixed; a small visual wobble is drawn by MatterCanvas.
export const SOLID_LATTICE = Object.freeze({ columns: 6, x: 258.75, y: 174, spacing: 20.5 });

export const PARTICLE_FACTS = Object.freeze({
  solid: { label: 'SOLID', emoji: '🧊', short: 'Packed closely • vibrate in place', motion: 'Vibrating in fixed positions', shape: 'Keeps its shape and volume', clue: 'The dots stay next to the same neighbours.' },
  liquid: { label: 'LIQUID', emoji: '💧', short: 'Close together • slide around', motion: 'Sliding past neighbours', shape: 'Flows; fixed volume', clue: 'The dots stay close and change neighbours.' },
  gas: { label: 'GAS', emoji: '☁️', short: 'Far apart • move freely', motion: 'Moving freely through the container', shape: 'Fills the available space', clue: 'The dots explore the whole container.' }
});

function unitVector(i) {
  const angle = (i * 2.39996323) % (Math.PI * 2);
  return { vx: Math.cos(angle), vy: Math.sin(angle) };
}
export function makeParticles(phase) {
  if (!Object.hasOwn(PARTICLE_FACTS, phase)) throw new Error(`Unknown phase: ${phase}`);
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const { vx, vy } = unitVector(i);
    if (phase === 'solid') {
      const x = SOLID_LATTICE.x + (i % SOLID_LATTICE.columns) * SOLID_LATTICE.spacing;
      const y = SOLID_LATTICE.y + Math.floor(i / SOLID_LATTICE.columns) * SOLID_LATTICE.spacing;
      return { x, y, ax: x, ay: y, vx: 0, vy: 0, id: i };
    }
    if (phase === 'liquid') return { x: 92 + (i % 15) * 30.5, y: 235 + Math.floor(i / 15) * 28, vx: vx * .78, vy: vy * .78, id: i };
    const col = i % 6; const row = Math.floor(i / 6);
    return { x: 105 + col * 81 + (row % 2) * 7, y: 77 + row * 45, vx: vx * 2, vy: vy * 2, id: i };
  });
}

/** One animation step. Mutable particle objects for efficient canvas rendering. */
export function advanceParticles(particles, phase, temperature = 20, dt = 1) {
  if (phase === 'solid') return;
  const speedScale = Math.sqrt(Math.max(1, temperature + 273.15) / 293.15);
  const speed = (phase === 'gas' ? 2.05 : .96) * speedScale;
  const bottom = PARTICLE_BOX.bottom - PARTICLE_RADIUS;
  const top = phase === 'liquid' ? 221 : PARTICLE_BOX.top + PARTICLE_RADIUS;
  const left = PARTICLE_BOX.left + PARTICLE_RADIUS;
  const right = PARTICLE_BOX.right - PARTICLE_RADIUS;
  const step = Math.min(Math.max(dt, 0), 2);
  for (const p of particles) {
    p.x += p.vx * speed * step;
    p.y += p.vy * speed * step;
    if (p.x < left || p.x > right) { p.x = Math.min(right, Math.max(left, p.x)); p.vx *= -1; }
    if (p.y < top || p.y > bottom) { p.y = Math.min(bottom, Math.max(top, p.y)); p.vy *= -1; }
  }
  // Particles cannot occupy the same place. Pair repulsion is intentionally
  // simplified: it keeps the diagram legible, without claiming true chemistry.
  const minDist = PARTICLE_RADIUS * 2 + 1;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i]; const b = particles[j];
      let dx = b.x - a.x; let dy = b.y - a.y;
      let distance = Math.hypot(dx, dy);
      if (distance >= minDist) continue;
      if (distance < .001) { dx = 1; dy = 0; distance = 1; }
      const nx = dx / distance; const ny = dy / distance;
      const overlap = (minDist - distance) / 2;
      a.x -= nx * overlap; a.y -= ny * overlap;
      b.x += nx * overlap; b.y += ny * overlap;
      // Exchange the normal part of the velocity to suggest bouncing.
      const approach = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
      if (approach > 0) {
        a.vx -= approach * nx; a.vy -= approach * ny;
        b.vx += approach * nx; b.vy += approach * ny;
      }
    }
  }
  for (const p of particles) {
    p.x = Math.min(right, Math.max(left, p.x));
    p.y = Math.min(bottom, Math.max(top, p.y));
  }
}

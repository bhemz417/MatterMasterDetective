import { useEffect, useRef } from 'react';
import { PARTICLE_BOX, PARTICLE_COUNT, PARTICLE_FACTS, PARTICLE_RADIUS, SOLID_LATTICE, makeParticles, advanceParticles } from '../game/particle-model.js';

const WIDTH = 620;
const HEIGHT = 340;

export default function MatterCanvas({ phase = 'solid', temperature = 24, paused = false, compact = false, unknown = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    const particles = makeParticles(phase);
    let frame = 0; let raf; let previous = null;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(Math.max(bounds.width, 1) * ratio);
      canvas.height = Math.round(Math.max(bounds.height, 1) * ratio);
      ctx.setTransform(canvas.width / WIDTH, 0, 0, canvas.height / HEIGHT, 0, 0);
    };
    resize();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(canvas);
    function draw(now) {
      const dt = previous === null ? 0 : Math.min((now - previous) / 16.667, 2);
      previous = now;
      if (!paused) {
        frame += dt;
        advanceParticles(particles, phase, temperature, dt);
      }
      const background = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
      background.addColorStop(0, '#eafaff'); background.addColorStop(1, '#fff8e7');
      ctx.fillStyle = background; ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = '#ffffff'; ctx.globalAlpha = .5;
      for (let x = 20; x < WIDTH; x += 36) {
        for (let y = 22; y < HEIGHT; y += 36) {
          ctx.beginPath(); ctx.arc(x, y, 2.1, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      // The same transparent container appears in all three states.
      ctx.fillStyle = '#ffffffaf'; ctx.fillRect(PARTICLE_BOX.left, PARTICLE_BOX.top, PARTICLE_BOX.right - PARTICLE_BOX.left, PARTICLE_BOX.bottom - PARTICLE_BOX.top);
      if (phase === 'liquid') {
        ctx.fillStyle = '#c5f3ffaf'; ctx.fillRect(PARTICLE_BOX.left + 2, 215, PARTICLE_BOX.right - PARTICLE_BOX.left - 4, 67);
        ctx.beginPath(); ctx.moveTo(PARTICLE_BOX.left + 2, 215);
        for (let x = PARTICLE_BOX.left + 2; x <= PARTICLE_BOX.right - 2; x += 5) ctx.lineTo(x, 215 + Math.sin(x / 31 + frame * .016) * 2.3);
        ctx.strokeStyle = '#55bbdf'; ctx.lineWidth = 2.5; ctx.stroke();
      }
      if (phase === 'solid') {
        ctx.fillStyle = '#b4c9ff44'; ctx.strokeStyle = '#8d9be6aa'; ctx.lineWidth = 2;
        const padding = PARTICLE_RADIUS + 5;
        const rows = Math.ceil(PARTICLE_COUNT / SOLID_LATTICE.columns);
        ctx.beginPath();
        ctx.roundRect(
          SOLID_LATTICE.x - padding, SOLID_LATTICE.y - padding,
          (SOLID_LATTICE.columns - 1) * SOLID_LATTICE.spacing + padding * 2,
          (rows - 1) * SOLID_LATTICE.spacing + padding * 2,
          13
        );
        ctx.fill(); ctx.stroke();
      }
      ctx.strokeStyle = '#5781b4'; ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(PARTICLE_BOX.left, PARTICLE_BOX.top); ctx.lineTo(PARTICLE_BOX.left, PARTICLE_BOX.bottom); ctx.lineTo(PARTICLE_BOX.right, PARTICLE_BOX.bottom); ctx.lineTo(PARTICLE_BOX.right, PARTICLE_BOX.top); ctx.stroke();
      ctx.fillStyle = '#5684b7'; ctx.beginPath(); ctx.roundRect(PARTICLE_BOX.left - 10, PARTICLE_BOX.top - 3, 22, 6, 3); ctx.roundRect(PARTICLE_BOX.right - 12, PARTICLE_BOX.top - 3, 22, 6, 3); ctx.fill();
      // All particles represent identical water molecules; their colours and size
      // remain unchanged across phase changes. Only arrangement/motion differ.
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const vibrate = phase === 'solid' && !paused ? Math.min(0.65, 0.45 + Math.max(0, temperature + 15) * .008) : 0;
        const x = p.x + Math.sin(frame * .12 + i * 2.1) * vibrate;
        const y = p.y + Math.cos(frame * .16 + i * 1.6) * vibrate;
        const grd = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, PARTICLE_RADIUS);
        grd.addColorStop(0, '#fff'); grd.addColorStop(.18, '#99efff'); grd.addColorStop(1, '#269edc');
        ctx.fillStyle = grd; ctx.strokeStyle = '#2477b9'; ctx.lineWidth = 1.15;
        ctx.beginPath(); ctx.arc(x, y, PARTICLE_RADIUS, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      ctx.textAlign = 'left'; ctx.fillStyle = '#215b82'; ctx.font = 'bold 13px Arial,sans-serif';
      ctx.fillText(unknown ? '🔎 MYSTERY MICROSCOPE' : '🔬 OUR WATER PARTICLE MODEL', 24, 29);
      ctx.font = 'bold 12px Arial,sans-serif'; ctx.fillStyle = '#276f8b';
      ctx.textAlign = 'right'; ctx.fillText(`${PARTICLE_COUNT} SAME PARTICLES`, WIDTH - 18, 29);
      ctx.textAlign = 'center'; ctx.font = 'bold 13px Arial,sans-serif';
      ctx.fillStyle = '#2f5c85';
      ctx.fillText(PARTICLE_FACTS[phase].short, WIDTH / 2, HEIGHT - 25);
      ctx.font = '11px Arial,sans-serif'; ctx.fillStyle = '#71859b';
      ctx.fillText('A simple science model • not to scale', WIDTH / 2, HEIGHT - 9);
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); observer?.disconnect(); };
  }, [phase, paused, temperature, unknown]);
  const description = `${PARTICLE_FACTS[phase].label}: ${PARTICLE_FACTS[phase].short}. There are exactly ${PARTICLE_COUNT} water particles in the container, like in each other state.`;
  return <div className={`particle-canvas-wrap ${compact ? 'is-compact' : ''}`}>
    <canvas ref={ref} role="img" aria-label={description} className="matter-canvas" />
    <span className="sr-only">{description}</span>
  </div>;
}

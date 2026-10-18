import { describe, it, expect } from 'vitest';
import { matterState, calculateScore, earnedBadges, allBadgesEarned, canGetCertificate, normalizeSave, MAX_SCORE, generateCertificateSvg } from './logic.js';
const five = ['particle', 'melting', 'puddle', 'balloon', 'escape'];
describe('water particle states', () => {
  it('handles 0°C and 100°C state boundaries at standard pressure', () => {
    expect(matterState(-1)).toBe('solid');
    expect(matterState(0)).toBe('liquid');
    expect(matterState(99)).toBe('liquid');
    expect(matterState(100)).toBe('gas');
  });
});
describe('game progression', () => {
  it('awards one badge each and cannot double-count duplicates', () => {
    expect(earnedBadges(['particle', 'particle', 'puddle'])).toEqual(['particle', 'puddle']);
    expect(calculateScore(['particle', 'particle', 'puddle'])).toBe(200);
  });
  it('requires all five badges and boss for certificate', () => {
    expect(allBadgesEarned(five)).toBe(true);
    expect(canGetCertificate(five)).toBe(false);
    expect(canGetCertificate([...five, 'boss'])).toBe(true);
    expect(calculateScore([...five, 'boss', 'simulation'])).toBe(MAX_SCORE);
  });
  it('handles malformed saved progress without crashing', () => {
    expect(normalizeSave({ completed: ['particle', 'fake', 'particle'], name: 33, sound: null })).toEqual({ completed: ['particle'], name: '', sound: true });
  });
  it('escapes certificate name to avoid markup injection', () => {
    const xml = generateCertificateSvg({ name: '<script>alert(1)</script>', score: 100, date: '18 October 2026' });
    expect(xml).toContain('&lt;script&gt;');
    expect(xml).not.toContain('<script>');
  });
});

export const MISSION_BRIEFING = {
  title: 'Welcome, Detective!',
  paragraphs: [
    'A strange scientist called Dr Chaos has mixed up all the matter in Science City. Solids are acting like liquids. Liquids are disappearing. Gases are escaping everywhere.',
    'Your mission is to investigate clues, complete experiments and solve mysteries to restore order.',
    'Each completed challenge earns Detective Points. Collect all 5 badges to become a:'
  ],
  rank: 'MASTER MATTER DETECTIVE'
};

export const MISSION_BADGES = [
  { id: 'particle', title: 'Particle Pro', emoji: '⚛️', color: 'violet', subtitle: 'Decode how particles behave' },
  { id: 'melting', title: 'Ice Investigator', emoji: '🧊', color: 'blue', subtitle: 'Solve the melting mystery' },
  { id: 'puddle', title: 'Vapour Tracker', emoji: '💧', color: 'cyan', subtitle: 'Follow water into the air' },
  { id: 'balloon', title: 'Gas Genius', emoji: '🎈', color: 'orange', subtitle: 'Investigate expanding gas' },
  { id: 'escape', title: 'Code Cracker', emoji: '🔐', color: 'pink', subtitle: 'Escape Dr Chaos’s laboratory' }
];
export const MISSION_MAP = [
  { id: 'particle', number: '01', title: 'Particle Lab', type: 'EXPERIMENT', detail: 'Examine particles and classify three samples.', duration: '3 min', badge: 'Particle Pro', accent: 'violet' },
  { id: 'melting', number: '02', title: 'Melting Ice Mystery', type: 'MYSTERY', detail: 'Find out what changes ice into liquid water.', duration: '3 min', badge: 'Ice Investigator', accent: 'blue' },
  { id: 'puddle', number: '03', title: 'Vanishing Puddle', type: 'MYSTERY', detail: 'Discover where puddle water really goes.', duration: '3 min', badge: 'Vapour Tracker', accent: 'cyan' },
  { id: 'balloon', number: '04', title: 'Gas Balloon Mystery', type: 'MYSTERY', detail: 'Watch what happens to a gas when warmed.', duration: '3 min', badge: 'Gas Genius', accent: 'orange' },
  { id: 'escape', number: '05', title: 'Escape Room Puzzle', type: 'PUZZLE', detail: 'Solve three clues and unlock the lab door.', duration: '5 min', badge: 'Code Cracker', accent: 'pink' }
];
export const FINAL_QUESTIONS = [
  { question: 'Which statement about a solid is correct?', options: ['It fills any container', 'It keeps its own shape', 'Its particles are far apart'], correct: 1, explanation: 'In a solid, particles vibrate in fixed positions, so the solid keeps its shape.' },
  { question: 'What happens to ice when it absorbs enough heat to reach its melting point?', options: ['It melts into liquid water', 'It vanishes forever', 'It becomes a new substance'], correct: 0, explanation: 'Melting is a change of state. The substance is still water.' },
  { question: 'A puddle shrinks on a warm, windy day. Where has most of the missing water gone?', options: ['Into the air as water vapour', 'It stopped existing', 'It turned into tiny rocks'], correct: 0, explanation: 'Liquid water evaporates into water vapour, which mixes with air.' },
  { question: 'Why might a flexible balloon become bigger when the gas inside is warmed?', options: ['Its particles disappear', 'Gas particles move faster and can push the balloon outward', 'The gas changes into a solid'], correct: 1, explanation: 'Heating causes gas particles to move faster. A flexible balloon can expand.' },
  { question: 'Which change of state happens when water vapour cools into drops of liquid water?', options: ['Freezing', 'Melting', 'Condensation'], correct: 2, explanation: 'Condensation changes a gas into a liquid, such as droplets on a cold glass.' }
];
export const SOURCES = [
  { name: 'Yale-New Haven Teachers Institute', url: 'https://teachersinstitute.yale.edu', terms: 'https://teachersinstitute.yale.edu/terms.html', detail: 'Educator curriculum resource; external link only.' },
  { name: 'PhET Interactive Simulations, University of Colorado Boulder', url: 'https://phet.colorado.edu', terms: 'https://phet.colorado.edu/en/licensing', detail: 'Interactive simulations and research-based science resources; external link only.' }
];
export const BADGE_IDS = MISSION_BADGES.map(badge => badge.id);

import React, { useState } from 'react';
import { Atom, Flame, Snowflake, Pause, Play, Thermometer, Sparkles, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import MatterCanvas from './MatterCanvas.jsx';
import DetectiveBuddy from './DetectiveBuddy.jsx';
import { PageHeading, ActionButton, Feedback, LearnCard } from './UI.jsx';
import { matterState } from '../game/logic.js';

const FACTS = {
  solid: { name: 'SOLID', colour: 'solid', description: 'Particles are tightly packed. They vibrate in fixed positions. A solid keeps its own shape and volume.', micro: 'Packed + vibrating', property: 'Fixed shape and fixed volume', example: 'Ice cube' },
  liquid: { name: 'LIQUID', colour: 'liquid', description: 'Particles stay close but move and slide past one another. A liquid flows, taking the shape of its container.', micro: 'Close + sliding', property: 'Takes container shape, fixed volume', example: 'Liquid water' },
  gas: { name: 'GAS', colour: 'gas', description: 'Particles are far apart and move freely. A gas spreads out to fill the available space.', micro: 'Spread out + moving', property: 'No fixed shape or volume', example: 'Invisible water vapour' }
};

export default function SimulationPage({ completed, onComplete, go }) {
  const [temp, setTemp] = useState(-12);
  const [paused, setPaused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [choice, setChoice] = useState(null);
  const state = matterState(temp);
  const info = FACTS[state];
  const changeTemp = val => { setTemp(Math.min(120, Math.max(-25, val))); setTouched(true); };
  const solved = completed.includes('simulation');
  return <div className="page-enter sim-page">
    <section className="kid-welcome" aria-label="Welcome to the science adventure">
      <div className="kid-welcome-copy"><span className="kid-welcome-label">👋 HELLO, YOUNG SCIENTIST!</span>
        <h2>Welcome to <span>Science City!</span></h2>
        <p>I'm Pip, your detective buddy! 🔎 Let's play with ice, water and gas. Then we'll solve Dr Chaos's mysteries together!</p>
        <div className="kid-welcome-stickers" aria-label="Three states to explore"><span>🧊 Solids</span><span>💧 Liquids</span><span>☁️ Gases</span></div>
      </div>
      <DetectiveBuddy className="kid-welcome-mascot" size={200}/>
    </section>
    <div className="sim-intro-banner"><span><Sparkles size={16}/> STEP 1 · PLAY IN THE LAB</span><strong>First, explore how matter changes. Then unlock the detective adventure!</strong></div>
    <PageHeading tag="LET'S EXPERIMENT!" title={<>The <em>States of Matter</em> Lab</>} description="Turn up the heat, cool things down, and watch how tiny particles behave in solids, liquids and gases." icon={Atom}/>
    <div className="sim-layout">
      <section className="sim-lab panel"><div className="panel-header"><div><span className="live-dot"/> LIVE EXPERIMENT 🧪 <strong>Can you spot the difference?</strong></div><span className="tag-soft">H₂O</span></div>
        <div className="phase-tabs" role="group" aria-label="Matter state presets">{[
          { id: 'solid', label: 'Solid · Ice', temp: -12, icon: '🧊' },
          { id: 'liquid', label: 'Liquid · Water', temp: 25, icon: '💧' },
          { id: 'gas', label: 'Gas · Vapour', temp: 110, icon: '💨' }
        ].map(tab => <button type="button" className={`phase-tab ${state === tab.id ? 'active' : ''}`} key={tab.id} onClick={() => changeTemp(tab.temp)}><span>{tab.icon}</span>{tab.label}</button>)}</div>
        <MatterCanvas phase={state} temperature={temp} paused={paused}/><div className="same-particles-note"><span>✅ 30 particles every time!</span><p>Ice, liquid water and water vapour are all H₂O. <strong>No particles appear or disappear.</strong></p></div>
        <div className="canvas-controls"><div className="now-observing"><span className={`phase-dot ${info.colour}`}/><span>NOW OBSERVING</span><strong>{info.name}</strong></div><div className="sim-control-buttons"><button type="button" onClick={() => { changeTemp(-12); setPaused(false); }} className="small-outline-btn"><RotateCcw size={15}/> Reset</button><button type="button" onClick={() => setPaused(p => !p)} className="small-outline-btn">{paused ? <Play size={15}/> : <Pause size={15}/>} {paused ? 'Play' : 'Pause'} particles</button></div></div>
        <div className="temperature-board"><div className="temperature-label"><span><Thermometer size={18}/> Temperature control</span><strong>{temp}°C</strong></div><div className="temp-slider-row"><button className="temp-round cold" type="button" onClick={() => changeTemp(temp - 10)} aria-label="Decrease temperature by ten degrees"><Snowflake size={20}/></button><input type="range" className="temp-range" min="-25" max="120" step="1" value={temp} onChange={e => changeTemp(Number(e.target.value))} aria-label="Water temperature in degrees Celsius"/><button className="temp-round hot" type="button" onClick={() => changeTemp(temp + 10)} aria-label="Increase temperature by ten degrees"><Flame size={20}/></button></div><div className="temp-labels"><span>−25°C · COLD</span><span>0°C MELTS</span><span>100°C BOILS*</span><span>120°C · HOT</span></div><p className="phase-boundary-note">{temp === 0 ? '🧊💧 At 0°C, ice and liquid water can exist together while melting.' : temp === 100 ? '💧💨 At 100°C, liquid water and water vapour can exist together while boiling.' : 'This model shows one state at a time to help you compare particles.'}</p></div>
      </section>
      <aside className="sim-info-column"><div className={`state-info panel state-${info.colour}`}><div className="info-kicker">YOUR OBSERVATION</div><div className="phase-title"><span className="phase-emoji">{state === 'solid' ? '🧊' : state === 'liquid' ? '💧' : '💨'}</span><h2>{info.name.toLowerCase()}</h2></div><p>{info.description}</p><div className="info-separator"/><div className="fact-row"><span>Particle motion</span><strong>{info.micro}</strong></div><div className="fact-row"><span>Shape / volume</span><strong>{info.property}</strong></div><div className="fact-row"><span>Real-world example</span><strong>{info.example}</strong></div></div>
        <div className="lab-notes panel"><span className="handwritten-label">✎ LAB NOTES</span><h3>Did you notice?</h3><p>Heating adds energy and can cause a change of state. Cooling removes energy and may reverse it.</p><div className="state-process"><span>🧊 Ice</span><span>→</span><span>💧 Water</span><span>→</span><span>☁️ Vapour</span></div><small>*For pure water at normal atmospheric pressure. This simplified model swaps between states; real melting and boiling take time and can involve two states at once. Water vapour is invisible.</small></div>
      </aside>
    </div>
    <section className="simulation-comparison" aria-label="Compare all three states of matter"><div className="comparison-heading"><div><span className="eyebrow">COMPARE THE EVIDENCE</span><h2>Same matter. Three different states.</h2><p>Tap a colourful card to compare how exactly 30 water particles behave.</p></div><span className="compare-explore">TAP TO EXPLORE <ArrowRight size={16}/></span></div><div className="comparison-grid">{[
      { state: 'solid', label: 'Solid', icon: '🧊', temperature: -12, summary: 'Fixed shape and volume', particles: 'Particles vibrate in place' },
      { state: 'liquid', label: 'Liquid', icon: '💧', temperature: 25, summary: 'Flows, fixed volume', particles: 'Particles slide past each other' },
      { state: 'gas', label: 'Gas', icon: '💨', temperature: 110, summary: 'Fills its container', particles: 'Particles move freely' }
    ].map(item => <button type="button" key={item.state} onClick={() => { changeTemp(item.temperature); window.scrollTo?.({top:0,behavior:'smooth'}); }} className={`comparison-card compare-${item.state} ${state === item.state ? 'is-selected' : ''}`} aria-pressed={state === item.state}><span className="comparison-emblem">{item.icon}</span><span className="comparison-info"><strong>{item.label}</strong><span>{item.summary}</span><small>{item.particles}</small></span><ArrowRight size={18}/></button>)}</div></section>
    <section className="knowledge-check panel"><div className="quiz-top"><div><span className="eyebrow">QUICK SCIENCE CHECK</span><h2>One clue before you go...</h2><p>Which state of matter spreads out to fill the available space?</p></div><span className="quiz-reward">+50 POINTS</span></div>
      <div className="quick-answers">{['Solid', 'Liquid', 'Gas'].map((answer, idx) => <button type="button" key={answer} disabled={false} className={`quick-option ${choice === idx ? (idx === 2 ? 'correct' : 'wrong') : ''} ${solved && idx === 2 ? 'correct' : ''}`} onClick={() => { setChoice(idx); if (idx === 2) onComplete('simulation'); }}>{answer}{(choice === idx && idx === 2 || solved && idx === 2) && <CheckCircle2 size={18}/>}</button>)}</div>
      {choice !== null && (choice === 2 ? <Feedback kind="success">Exactly! Gas particles spread out and fill the space available. {solved ? 'You have already earned your 50 points — great practice!' : '50 points earned!'}</Feedback> : <Feedback kind="error">Not quite. Think about which particles are far apart and move freely.</Feedback>)}{choice !== null && <button type="button" className="replay-question" onClick={() => setChoice(null)}>🔁 Try this question again</button>}
      {!touched && <p className="under-quiz">Try the temperature slider above to see the particles change!</p>}
      <div className="quiz-bottom"><span>{solved ? '✓ Simulation clue secured' : 'Ready for the detective story?'}</span><ActionButton onClick={() => go('briefing')}>Enter Science City</ActionButton></div>
    </section>
    <LearnCard title="Scientific accuracy">These are simplified particle models. Real phase changes occur over a transition rather than instantaneously, and boiling/melting temperatures depend on conditions.</LearnCard>
  </div>;
}

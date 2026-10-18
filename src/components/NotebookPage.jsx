import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, ClipboardList, Eraser, Lightbulb, PencilLine, Sparkles } from 'lucide-react';
import { PageHeading, LearnCard, ActionButton } from './UI.jsx';

const KEY = 'science-city-detective-notebook-v2';
const STATES = [
  { id: 'solid', label: 'SOLID', emoji: '🧊', subtitle: 'Packed and vibrating', shape: 'Fixed shape', volume: 'Fixed volume', motion: 'Vibrate in place', example: 'An ice cube', color: 'violet', question: 'Where would you see a solid in your classroom?' },
  { id: 'liquid', label: 'LIQUID', emoji: '💧', subtitle: 'Close and sliding', shape: 'Takes the container shape', volume: 'Fixed volume', motion: 'Slide past one another', example: 'Water in a glass', color: 'cyan', question: 'How could you prove that a liquid changes its shape?' },
  { id: 'gas', label: 'GAS', emoji: '☁️', subtitle: 'Far apart and moving', shape: 'No fixed shape', volume: 'Fills available space', motion: 'Move freely', example: 'Water vapour', color: 'amber', question: 'What would happen if gas enters a larger container?' }
];
const TERMS = [
  { term: 'Melting', meaning: 'A solid changes to a liquid when it gains enough heat energy.' },
  { term: 'Freezing', meaning: 'A liquid changes to a solid as heat is removed.' },
  { term: 'Evaporation', meaning: 'Particles escape from the surface of a liquid and become gas. This can happen below boiling point.' },
  { term: 'Condensation', meaning: 'A gas cools and changes into a liquid.' },
  { term: 'Boiling', meaning: 'A liquid changes into gas throughout the liquid at its boiling point.' }
];
function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      return Object.fromEntries(STATES.map(s => [s.id, typeof saved[s.id] === 'string' ? saved[s.id].slice(0, 500) : '']));
    }
  } catch { /* Browsers may block storage. */ }
  return { solid: '', liquid: '', gas: '' };
}
export default function NotebookPage({ go }) {
  const [notes, setNotes] = useState(loadNotes);
  const [active, setActive] = useState('solid');
  const [showGlossary, setShowGlossary] = useState(false);
  const [savedIndicator, setSavedIndicator] = useState(false);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch { /* Note editing works without storage too. */ }
    setSavedIndicator(true);
  }, [notes]);
  const activeState = STATES.find(s => s.id === active);
  const filled = STATES.filter(s => notes[s.id].trim()).length;
  function clearNotes() {
    if (window.confirm('Clear all three notebook entries on this device?')) setNotes({ solid: '', liquid: '', gas: '' });
  }
  return <div className="page-enter notebook-page">
    <PageHeading tag="DETECTIVE TOOLS · PERSONAL WORKSPACE" title={<>Your <em>Evidence Notebook</em></>} description="Observe, compare and record what you discover. Your notes are saved in this browser on this device." icon={BookOpen} accent="blue"/>
    <div className="notebook-intro"><div className="notebook-intro-icon"><PencilLine size={26}/></div><div><strong>Good detectives record their evidence.</strong><p>Compare the three states of matter, then write an observation in your own words.</p></div><span className="note-count"><CheckCircle2 size={17}/> {filled} / 3 notes</span></div>
    <div className="notebook-grid"><section className="panel notebook-workbench"><div className="notebook-tabs" role="tablist" aria-label="Select matter state">{STATES.map(s => <button type="button" role="tab" aria-selected={active === s.id} key={s.id} className={`notebook-tab ${s.color} ${active === s.id ? 'selected' : ''}`} onClick={() => setActive(s.id)}><span>{s.emoji}</span>{s.label}{notes[s.id].trim() && <CheckCircle2 size={14}/>}</button>)}</div>
      <div className={`notebook-state-card ${activeState.color}`}><div className="notebook-state-emoji" aria-hidden="true">{activeState.emoji}</div><div><span className="eyebrow">SPECIMEN PROFILE</span><h2>{activeState.label.toLowerCase()}</h2><p>{activeState.subtitle}</p></div></div>
      <dl className="notebook-facts"><div><dt>Shape</dt><dd>{activeState.shape}</dd></div><div><dt>Volume</dt><dd>{activeState.volume}</dd></div><div><dt>Particle movement</dt><dd>{activeState.motion}</dd></div><div><dt>Example</dt><dd>{activeState.example}</dd></div></dl>
      <label className="notebook-prompt" htmlFor="evidence-note"><Lightbulb size={19}/> Detective question: {activeState.question}</label>
      <textarea id="evidence-note" maxLength="500" rows="5" value={notes[active]} onChange={e => { setNotes(prev => ({ ...prev, [active]: e.target.value })); setSavedIndicator(false); }} placeholder="My observation is..." aria-label={`Evidence notes for ${activeState.label.toLowerCase()}`}/>
      <div className="notebook-actions"><span><CheckCircle2 size={16}/> {savedIndicator ? 'Saved on this device' : 'Saving...'} · {notes[active].length}/500</span><button type="button" onClick={clearNotes}><Eraser size={16}/> Clear notebook</button></div>
      </section><aside className="notebook-side"><div className="panel quick-reference"><span className="eyebrow">QUICK REFERENCE</span><h2>Compare at a glance</h2><div className="reference-table"><div><strong>State</strong><strong>Particle spacing</strong><strong>Movement</strong></div><div><span>🧊 Solid</span><span>Very close</span><span>Vibrating</span></div><div><span>💧 Liquid</span><span>Close</span><span>Sliding</span></div><div><span>☁️ Gas</span><span>Far apart</span><span>Moving freely</span></div></div></div>
        <div className="panel glossary-panel"><button type="button" className="glossary-toggle" onClick={() => setShowGlossary(v => !v)} aria-expanded={showGlossary}><span><ClipboardList size={20}/> Science glossary</span><span>{showGlossary ? '−' : '+'}</span></button>{showGlossary && <dl>{TERMS.map(item => <div key={item.term}><dt>{item.term}</dt><dd>{item.meaning}</dd></div>)}</dl>}<p>{showGlossary ? 'Keep these words handy as you solve each case.' : 'Open five useful science definitions.'}</p></div>
        <div className="notebook-next"><Sparkles size={23}/><strong>Ready to investigate?</strong><p>Apply your observations in the detective missions.</p><ActionButton onClick={() => go('dashboard')}>Open mission map</ActionButton></div>
      </aside></div>
    <LearnCard title="Privacy note">Your notebook is stored only in this browser. It is not uploaded to the server. Avoid typing sensitive personal information, and save important notes separately before clearing browser data.</LearnCard>
  </div>;
}

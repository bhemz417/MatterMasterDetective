import React, { useCallback, useEffect, useState } from 'react';
import { Award, BookOpen, Check, ChevronRight, CircleHelp, ClipboardList, FlaskConical, GraduationCap, Home, LockKeyhole, Map, Menu, Microscope, Snowflake, ShieldCheck, Sparkles, Star, Trophy, Volume2, VolumeX, X } from 'lucide-react';
import { DetectiveMark } from './components/Illustrations.jsx';
import SimulationPage from './components/SimulationPage.jsx';
import NotebookPage from './components/NotebookPage.jsx';
import { BalloonPage, BossPage, BriefingPage, CertificatePage, CreditsPage, DashboardPage, EscapePage, MeltingPage, ParticleLabPage, PuddlePage } from './pages/Missions.jsx';
import { MISSION_BRIEFING } from './game/content.js';
import { allBadgesEarned, calculateScore, canGetCertificate, earnedBadges, normalizeSave } from './game/logic.js';

const STORAGE_KEY = 'science-city-matter-detective-v1';
const NAV_SECTIONS = [
  { id: 'simulation', label: 'Explore the Matter Lab', icon: Microscope },
  { id: 'briefing', label: 'Your Secret Mission', icon: BookOpen },
  { id: 'dashboard', label: 'Adventure Map', icon: Map },
  { id: 'notebook', label: 'My Science Notebook', icon: ClipboardList },
  { id: 'particle', label: 'Particle Lab', icon: FlaskConical, number: '01' },
  { id: 'melting', label: 'Melting Ice Mystery', icon: Snowflake, number: '02' },
  { id: 'puddle', label: 'Vanishing Puddle', icon: CircleHelp, number: '03' },
  { id: 'balloon', label: 'Gas Balloon Mystery', icon: Sparkles, number: '04' },
  { id: 'escape', label: 'Escape Room Puzzle', icon: LockKeyhole, number: '05' },
  { id: 'boss', label: 'Final Boss Challenge', icon: Trophy },
  { id: 'certificate', label: 'Score Certificate', icon: Award }
];
const SCREEN_TITLES = Object.fromEntries(NAV_SECTIONS.map(s => [s.id, s.label]));
SCREEN_TITLES.credits = 'Credits & Licensing';

function loadSaved() {
  try { return normalizeSave(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')); }
  catch { return normalizeSave(null); }
}

function playTone(type = 'click') {
  try {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    const context = new Context();
    if (context.state === 'suspended') context.resume();
    const notes = type === 'award' ? [523, 659, 784, 1047] : type === 'win' ? [392, 523, 659, 784, 1047] : [490];
    const now = context.currentTime;
    notes.forEach((frequency, idx) => {
      const oscillator = context.createOscillator(); const gain = context.createGain();
      oscillator.type = type === 'click' ? 'sine' : 'triangle'; oscillator.frequency.setValueAtTime(frequency, now + idx * .09);
      gain.gain.setValueAtTime(.0001, now + idx * .09);
      gain.gain.exponentialRampToValueAtTime(.065, now + idx * .09 + .016);
      gain.gain.exponentialRampToValueAtTime(.0001, now + idx * .09 + .19);
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.start(now + idx * .09); oscillator.stop(now + idx * .09 + .2);
    });
    setTimeout(() => context.close().catch(() => {}), 1150);
  } catch { /* Web Audio optional in restricted browsers. */ }
}

export default function App() {
  const [saved, setSaved] = useState(loadSaved);
  const [screen, setScreen] = useState('simulation');
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState('');
  const [briefing, setBriefing] = useState(MISSION_BRIEFING);
  const [celebrate, setCelebrate] = useState(false);
  const [replaying, setReplaying] = useState(null);
  const [playSession, setPlaySession] = useState(0);
  const completed = saved.completed;
  const score = calculateScore(completed);
  const badges = earnedBadges(completed);
  const bossReady = allBadgesEarned(completed);
  const certificateReady = canGetCertificate(completed);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch { /* Private browsing mode may block local storage. */ }
  }, [saved]);
  useEffect(() => { document.title = `${SCREEN_TITLES[screen] || 'Science City'} · Matter Detective`; }, [screen]);
  useEffect(() => {
    let alive = true;
    fetch('/api/briefing').then(r => { if (!r.ok) throw new Error('Unreachable'); return r.json(); }).then(info => {
      if (alive && info.title && Array.isArray(info.paragraphs) && info.rank) setBriefing(info);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);
  useEffect(() => {
    if (!celebrate) return undefined;
    const timer = setTimeout(() => setCelebrate(false), 1650);
    return () => clearTimeout(timer);
  }, [celebrate]);
  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(''), 3300);
    return () => clearTimeout(id);
  }, [toast]);

  const go = useCallback(id => {
    if (id === 'boss' && !bossReady) { setToast('Collect all five badges to unlock the final boss.'); return; }
    if (id === 'certificate' && !certificateReady) { setToast('Complete the final boss to unlock your certificate.'); return; }
    setScreen(id); setReplaying(null); setMobileNav(false);
    window.scrollTo?.({ top: 0, behavior: 'instant' });
    if (saved.sound) playTone();
  }, [saved.sound, bossReady, certificateReady]);
  useEffect(() => {
    const closeOnEscape = event => { if (event.key === 'Escape') setMobileNav(false); };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const onComplete = useCallback(id => {
    if (completed.includes(id)) {
      if (replaying === id) {
        setReplaying(null);
        setCelebrate(true);
        setToast('🌟 Great practice! Your badges and points are safe.');
        if (saved.sound) playTone('award');
      }
      return;
    }
    setSaved(prev => ({ ...prev, completed: [...new Set([...prev.completed, id])] }));
    setReplaying(null);
    setCelebrate(true);
    setToast(id === 'boss' ? '🏆 Dr Chaos defeated! Certificate unlocked.' : id === 'simulation' ? '⭐ +50 Detective Points earned!' : '🏅 +100 points! New detective badge unlocked.');
    if (saved.sound) playTone(id === 'boss' ? 'win' : 'award');
  }, [completed, replaying, saved.sound]);

  function replayMission(id) {
    if (id === 'boss' && !bossReady) return;
    setReplaying(id);
    setPlaySession(n => n + 1); // Fresh local question and experiment state, even on the same screen.
    setScreen(id);
    setToast('🔁 Practice time! Replay freely; points and badges will not be counted twice.');
    window.scrollTo?.({ top: 0, behavior: 'instant' });
    if (saved.sound) playTone();
  }


  function resetProgress() {
    if (window.confirm('Start a new Science City investigation? This will erase your badges, score and saved detective name on this device.')) {
      setSaved({ completed: [], name: '', sound: saved.sound });
      setReplaying(null);
      setPlaySession(n => n + 1);
      setScreen('simulation');
      setToast('Your new investigation is ready!');
    }
  }
  function toggleSound() { setSaved(prev => ({ ...prev, sound: !prev.sound })); if (!saved.sound) playTone(); }
  const props = { completed, score, go, onComplete, replaying, onReplay: replayMission };
  const page = {
    simulation: <SimulationPage {...props}/>,
    briefing: <BriefingPage go={go} briefing={briefing}/>,
    dashboard: <DashboardPage {...props} onReset={resetProgress}/>,
    notebook: <NotebookPage go={go}/>,
    particle: <ParticleLabPage {...props}/>,
    melting: <MeltingPage {...props}/>,
    puddle: <PuddlePage {...props}/>,
    balloon: <BalloonPage {...props}/>,
    escape: <EscapePage {...props}/>,
    boss: <BossPage {...props}/>,
    certificate: <CertificatePage {...props} onReset={resetProgress} name={saved.name} setName={name => setSaved(s => ({ ...s, name }))}/>,
    credits: <CreditsPage/>
  }[screen];

  return <div className="app-root">
    <a className="skip-link" href="#main-content">Skip to learning content</a>
    {mobileNav && <button type="button" className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)}/>}
    <aside className={`sidebar ${mobileNav ? 'show-sidebar' : ''}`} aria-label="Main navigation">
      <div className="sidebar-head"><button className="brand" type="button" onClick={() => go('simulation')}><DetectiveMark/><span><strong>MATTER<span className="brand-accent">!</span></strong><small>SCIENCE CITY ADVENTURE</small></span></button><button className="side-close" aria-label="Close navigation" type="button" onClick={() => setMobileNav(false)}><X size={22}/></button></div>
      <div className="side-profile"><span className="profile-avatar">🔎</span><div><span>YOUR DETECTIVE RANK</span><strong>{completed.includes('boss') ? 'Master Detective!' : 'Rising Science Star'}</strong></div><span className="online-indicator"/></div>
      <div className="side-nav-scroll"><p className="nav-section-label">START YOUR ADVENTURE</p><nav>{NAV_SECTIONS.slice(0, 4).map(link => <NavButton key={link.id} link={link} screen={screen} completed={completed} go={go}/>)}</nav><p className="nav-section-label nav-separator">SOLVE THE MYSTERIES</p><nav>{NAV_SECTIONS.slice(4, 9).map(link => <NavButton key={link.id} link={link} screen={screen} completed={completed} go={go}/>)}</nav><p className="nav-section-label nav-separator">YOU EARNED IT!</p><nav>{NAV_SECTIONS.slice(9).map(link => <NavButton key={link.id} link={link} screen={screen} completed={completed} go={go} locked={link.id === 'boss' && !bossReady || link.id === 'certificate' && !certificateReady}/>)}</nav></div>
      <div className="side-bottom"><div className="side-score"><div><Star size={18} fill="currentColor"/><strong>{score}</strong><span>POINTS ⭐</span></div><div><Award size={18}/><strong>{badges.length}<small>/5</small></strong><span>BADGES 🏅</span></div></div><button type="button" className={`credits-nav ${screen === 'credits' ? 'active' : ''}`} onClick={() => go('credits')}><BookOpen size={17}/> Credits & licensing <ChevronRight size={15}/></button></div>
    </aside>
    <div className="main-area"><header className="topbar"><div className="topbar-left"><button type="button" className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Menu size={24}/></button><div className="crumb"><Home size={16}/><ChevronRight size={15}/><strong>{SCREEN_TITLES[screen] || 'Science City'}</strong></div></div><div className="topbar-right"><span className="grade-pill"><GraduationCap size={16}/>ADVENTURE</span><div className="top-points"><Star size={16} fill="currentColor"/>{score} <span>pts</span></div><button type="button" className="sound-toggle" onClick={toggleSound} aria-label={saved.sound ? 'Mute sound effects' : 'Enable sound effects'} title={saved.sound ? 'Mute sound effects' : 'Enable sound effects'}>{saved.sound ? <Volume2 size={20}/> : <VolumeX size={20}/>}</button><button type="button" className="header-avatar" aria-label="Go to your adventure map" onClick={() => go('dashboard')}>🧑‍🔬</button></div></header>
      <main id="main-content" key={`${screen}-${playSession}`} tabIndex={-1} className="main-content">{replaying === screen && <div className="practice-banner" role="status"><span>🔁 <strong>Practice Mode</strong> — Try the questions again! Your points and badges stay saved.</span><button type="button" onClick={() => go('dashboard')}>Finish practising ×</button></div>}{page}</main><footer className="site-footer"><span>© 2026 Matter Detective · An original  open educational resource</span><button type="button" onClick={() => go('credits')}>Credits & licences ↗</button></footer>
    </div>
    <nav className="mobile-dock" aria-label="Quick navigation">{[{id:'simulation',label:'Explore',icon:Microscope},{id:'dashboard',label:'Missions',icon:Map},{id:'notebook',label:'Notes',icon:ClipboardList},{id:'certificate',label:'Award',icon:Award}].map(item => <button key={item.id} type="button" className={screen === item.id ? 'active' : ''} onClick={() => go(item.id)} aria-current={screen === item.id ? 'page' : undefined}><item.icon size={20}/><span>{item.label}</span></button>)}</nav>
    {celebrate && <div className="award-confetti" aria-hidden="true">{Array.from({length: 26}, (_, i) => <span key={i} style={{ '--i': i, '--dx': `${(i % 2 ? 1 : -1) * (55 + i * 13)}px`, '--dy': `${-95 - (i % 7) * 35}px`, '--rotation': `${i * 51}deg` }}/>)}</div>}
    {toast && <div className="toast" role="status"><Sparkles size={21}/><span>{toast}</span><button type="button" aria-label="Dismiss notice" onClick={() => setToast('')}><X size={17}/></button></div>}
  </div>;
}

function NavButton({ link, screen, completed, go, locked = false }) {
  const Icon = link.icon;
  return <button className={`nav-button ${screen === link.id ? 'nav-active' : ''}`} type="button" onClick={() => go(link.id)} aria-current={screen === link.id ? 'page' : undefined} aria-disabled={locked}><Icon size={18} strokeWidth={1.9}/><span>{link.label}</span>{completed.includes(link.id) ? <Check size={15} className="nav-done"/> : locked ? <LockKeyhole size={14} className="nav-locked"/> : link.number ? <small>{link.number}</small> : null}</button>;
}

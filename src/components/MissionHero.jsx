import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Star } from 'lucide-react';
import DetectiveBuddy from './DetectiveBuddy.jsx';
import { MISSION_MAP } from '../game/content.js';

export default function MissionHero({ completed, score, go }) {
  const doneCount = MISSION_MAP.filter(m => completed.includes(m.id)).length;
  const next = MISSION_MAP.find(m => !completed.includes(m.id));
  const bossCleared = completed.includes('boss');
  const target = next?.id ?? (bossCleared ? 'certificate' : 'boss');
  const buttonLabel = next ? `Let's solve case ${next.number}!` : bossCleared ? 'See my certificate!' : 'Challenge Dr Chaos!';
  return <section className="hq-hero" aria-label="Your Science City adventure">
    <div className="hq-noise" aria-hidden="true"/><div className="hq-hero-orbit orbit-one"/><div className="hq-hero-orbit orbit-two"/>
    <div className="hq-hero-copy"><span className="hq-overline"><Sparkles size={18}/> YOUR ADVENTURE STARTS HERE!</span>
      <h2>{bossCleared ? <>Hooray! <em>Science City is safe!</em></> : <>Hey, Science Detective! <em>Let's solve a mystery!</em></>}</h2>
      <p>{bossCleared ? 'You cracked every case and saved the city! Your shiny detective certificate is ready.' : 'Dr Chaos has mixed up solids, liquids and gases! Follow the clues, try cool experiments and collect five amazing badges.'}</p>
      <button className="hq-hero-cta" type="button" onClick={() => go(target)}>{buttonLabel} <ArrowRight size={20}/></button>
    </div>
    <div className="hq-hero-visual" aria-hidden="true"><span className="hero-evidence-stamp">MEET PIP, YOUR LAB BUDDY!</span><DetectiveBuddy size={240}/><span className="hero-target target-one">✦</span><span className="hero-target target-two">✧</span><span className="hero-wanted">🧊 SOLID &nbsp; 💧 LIQUID &nbsp; ☁️ GAS</span></div>
    <div className="hq-hero-bottom"><div className="hero-status-copy"><ShieldCheck size={19}/><span>YOUR BADGE QUEST</span><strong>{bossCleared ? 'YOU DID IT!' : 'KEEP GOING!'}</strong></div>
      <div className="hero-meter" role="progressbar" aria-valuenow={doneCount} aria-valuemin={0} aria-valuemax={5} aria-label="Detective badges collected"><div style={{width:`${doneCount * 20}%`}}/></div>
      <span className="hero-meter-value">{doneCount} / 5 badges</span><div className="hero-score"><Star size={18} fill="currentColor"/> {score} points</div></div>
  </section>;
}

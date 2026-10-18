import React from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Lightbulb, Star, CircleHelp } from 'lucide-react';

export function Eyebrow({ children, dark = false }) { return <span className={`eyebrow ${dark ? 'eyebrow-dark' : ''}`}>{children}</span>; }
export function PageHeading({ tag, title, description, icon: Icon, accent = 'violet' }) {
  return <div className="page-heading"><div className="heading-copy"><Eyebrow>{tag}</Eyebrow><h1>{title}</h1><p>{description}</p></div>{Icon && <div className={`heading-icon accent-${accent}`}><Icon size={38} strokeWidth={1.8}/></div>}</div>;
}
export function ActionButton({ children, onClick, variant = 'primary', disabled = false, icon = true, type = 'button', className = '' }) {
  return <button type={type} disabled={disabled} className={`action-btn btn-${variant} ${className}`} onClick={onClick}>{children}{icon && <ArrowRight size={18}/>}</button>;
}
export function BackButton({ onClick, label = 'Back to mission map' }) {
  return <button className="back-button" type="button" onClick={onClick}><ArrowLeft size={16}/>{label}</button>;
}
export function AnswerChoices({ options, selected, correct, onSelect, disabled = false }) {
  return <div className="choice-list">{options.map((option, i) => {
    const isSelected = selected === i;
    const success = isSelected && correct === i;
    const incorrect = isSelected && correct !== i;
    return <button key={option} disabled={disabled || (selected === correct && selected !== null)} type="button" className={`choice-btn ${success ? 'is-correct' : ''} ${incorrect ? 'is-incorrect' : ''}`} onClick={() => onSelect(i)}><span className="choice-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span>{success && <CheckCircle2 size={20} className="choice-icon"/>}</button>;
  })}</div>;
}
export function Feedback({ kind = 'hint', children }) {
  return <div role="status" aria-live="polite" className={`feedback feedback-${kind}`}>{kind === 'success' ? <CheckCircle2 size={20}/> : kind === 'error' ? <CircleHelp size={20}/> : <Lightbulb size={20}/>}<span>{children}</span></div>;
}
export function FinishPanel({ emoji, title, text, onNext, onReplay, nextLabel = 'Continue case', points = 100 }) {
  return <div className="finish-panel"><span className="confetti-spark">✦</span><div className="finish-emoji" aria-hidden="true">{emoji}</div><Eyebrow dark>CASE SOLVED</Eyebrow><h2>{title}</h2><p>{text}</p><div className="finish-points"><Star size={18} fill="currentColor"/>{points} Detective Points already earned 🏅</div><div className="finish-actions"><ActionButton onClick={onNext}>{nextLabel}</ActionButton>{onReplay && <button type="button" className="replay-action" onClick={onReplay}>🔁 Play this mission again</button>}</div><p className="replay-fine-print">Replay the same questions whenever you want. You keep your points and badges!</p></div>;
}
export function LearnCard({ title = 'Science clue', children }) {
  return <aside className="learn-card"><Lightbulb size={21}/><div><strong>{title}</strong><p>{children}</p></div></aside>;
}

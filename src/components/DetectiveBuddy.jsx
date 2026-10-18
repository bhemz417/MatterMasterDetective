import React from 'react';

/** Original, classroom-friendly vector mascot. No external artwork or fonts. */
export default function DetectiveBuddy({ size = 230, className = '' }) {
  return <svg className={`detective-buddy ${className}`} width={size} height={size} viewBox="0 0 280 300" role="img" aria-label="Pip the friendly science detective holding a magnifying glass">
    <defs>
      <linearGradient id="buddy-coat" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#40cfc8"/><stop offset="1" stopColor="#139bca"/></linearGradient>
      <linearGradient id="buddy-hat" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8a74fa"/><stop offset="1" stopColor="#6752d9"/></linearGradient>
      <linearGradient id="buddy-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e6fbff" stopOpacity=".92"/><stop offset="1" stopColor="#89e9ff" stopOpacity=".5"/></linearGradient>
    </defs>
    <ellipse cx="133" cy="277" rx="90" ry="14" fill="#8876ad" opacity=".17"/>
    <path d="M78 250c-13 20-28 23-37 15M168 253c9 16 25 21 34 10" stroke="#3c4474" strokeWidth="13" strokeLinecap="round"/>
    <path d="M71 171c-21 18-24 69-19 78 6 14 135 19 150 0 5-10-6-70-26-80Z" fill="url(#buddy-coat)" stroke="#384071" strokeWidth="7" strokeLinejoin="round"/>
    <path d="m113 169 21 34 19-34" fill="#fff" stroke="#384071" strokeWidth="5" strokeLinejoin="round"/>
    <path d="m129 200-8 27 13 13 14-13-9-27" fill="#ffbc68"/>
    <path d="M67 179q-26 18-23 54" stroke="#384071" strokeWidth="14" strokeLinecap="round"/><circle cx="42" cy="234" r="13" fill="#ffd5af" stroke="#384071" strokeWidth="5"/>
    <path d="M192 185q24 12 30 38" stroke="#384071" strokeWidth="14" strokeLinecap="round"/><circle cx="223" cy="227" r="12" fill="#ffd5af" stroke="#384071" strokeWidth="5"/>
    <ellipse cx="130" cy="127" rx="67" ry="71" fill="#ffd9b6" stroke="#384071" strokeWidth="6"/>
    <path d="M64 110Q72 64 103 61q23 37 45 0 44 15 47 53" fill="#593f9a" stroke="#384071" strokeWidth="6"/>
    <path d="M88 143q15 18 32 1" stroke="#384071" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".14"/>
    <ellipse cx="102" cy="134" rx="15" ry="20" fill="#fff"/><ellipse cx="154" cy="134" rx="15" ry="20" fill="#fff"/>
    <circle cx="107" cy="135" r="8" fill="#394177"/><circle cx="159" cy="135" r="8" fill="#394177"/>
    <circle cx="110" cy="131" r="3" fill="#fff"/><circle cx="162" cy="131" r="3" fill="#fff"/>
    <ellipse cx="78" cy="158" rx="10" ry="6" fill="#ffa7a1" opacity=".7"/><ellipse cx="177" cy="158" rx="10" ry="6" fill="#ffa7a1" opacity=".7"/>
    <path d="M116 164q17 18 35-1" stroke="#8e4f66" strokeWidth="5" strokeLinecap="round" fill="none"/>
    <path d="m61 87 25-51 49 6 53-9 14 60q-63-25-141-6Z" fill="url(#buddy-hat)" stroke="#384071" strokeWidth="6" strokeLinejoin="round"/>
    <path d="M50 89q72-27 158 3" stroke="#384071" strokeWidth="11" strokeLinecap="round"/>
    <path d="M117 59l11 10 13-10" stroke="#ffe49a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M222 223 248 266" stroke="#384071" strokeWidth="17" strokeLinecap="round"/>
    <path d="M222 223 248 266" stroke="#ffc95c" strokeWidth="10" strokeLinecap="round"/>
    <circle cx="200" cy="187" r="47" fill="url(#buddy-glass)" stroke="#384071" strokeWidth="11"/>
    <circle cx="200" cy="187" r="36" fill="none" stroke="#fff" strokeWidth="5" opacity=".9"/>
    <path d="M176 175q11-19 27-17" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round"/>
    <path d="m241 85 6 13 14 5-14 4-6 13-5-13-14-4 14-5Z" fill="#ffcd65"/>
    <path d="m24 113 4 10 11 4-11 4-4 10-4-10-11-4 11-4Z" fill="#8d80f0"/>
    <circle cx="225" cy="54" r="8" fill="#ff9ab6"/><circle cx="29" cy="175" r="7" fill="#6ed9e4"/>
  </svg>;
}

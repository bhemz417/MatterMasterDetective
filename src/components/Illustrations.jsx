import React from 'react';

export function DetectiveMark({ size = 46 }) {
  return <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect width="64" height="64" rx="19" fill="#7867E9"/>
    <path d="M13 27c6-2 11-3 19-3s13 1 19 3l-4-8-5-11-10 5-10-5-5 11-4 8Z" fill="#F8DD91" stroke="#252A4D" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M10 28c13-5 31-5 44 0" stroke="#252A4D" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="27" cy="39" r="8" stroke="#fff" strokeWidth="3"/><circle cx="41" cy="39" r="8" stroke="#fff" strokeWidth="3"/><path d="M35 39h-1" stroke="#fff" strokeWidth="3"/><path d="M47 45l8 10" stroke="#F8DD91" strokeWidth="5" strokeLinecap="round"/>
  </svg>;
}

export function HeroIllustration() {
  return <svg className="hero-illustration" viewBox="0 0 600 410" role="img" aria-label="Detective laboratory with colourful flasks, floating particles and Science City skyline">
    <defs><linearGradient id="sceneGrad" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a79fff"/><stop offset="1" stopColor="#6453d0"/></linearGradient><linearGradient id="sceneLiquid" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#58D9E1"/><stop offset="1" stopColor="#3A99E6"/></linearGradient></defs>
    <circle cx="298" cy="205" r="178" fill="url(#sceneGrad)" opacity=".27"/><circle cx="298" cy="205" r="136" fill="none" stroke="#b6abff" opacity=".3" strokeWidth="3" strokeDasharray="9 12"/>
    <g opacity=".34" fill="#322B83"><rect x="92" y="207" width="39" height="118" rx="5"/><rect x="130" y="170" width="57" height="155" rx="4"/><rect x="433" y="193" width="47" height="132" rx="5"/><rect x="475" y="234" width="49" height="91" rx="4"/><path d="M254 325V203l30-27 30 27v122Z"/></g>
    <g fill="#D6D0FF" opacity=".65"><rect x="141" y="193" width="9" height="11" rx="2"/><rect x="159" y="193" width="9" height="11" rx="2"/><rect x="141" y="215" width="9" height="11" rx="2"/><rect x="443" y="208" width="9" height="11" rx="2"/><rect x="461" y="208" width="9" height="11" rx="2"/></g>
    <ellipse cx="303" cy="341" rx="225" ry="23" fill="#3c347f" opacity=".3"/>
    <g transform="translate(185 69) rotate(-8 100 140)"><path d="M92 53V23h29v30l59 163c10 27-8 49-35 49H69c-27 0-45-22-35-49Z" fill="#E9F3FF" stroke="#222F65" strokeWidth="8" strokeLinejoin="round"/><path d="M56 181c28 8 75-18 105 1l18 48c5 18-8 32-30 32H71c-22 0-34-15-28-31Z" fill="url(#sceneLiquid)"/><path d="M94 24h25" stroke="#222F65" strokeWidth="9" strokeLinecap="round"/><circle cx="75" cy="210" r="8" fill="#c6f5fd"/><circle cx="126" cy="235" r="12" fill="#a5f0f5"/><circle cx="144" cy="207" r="6" fill="#c6f5fd"/></g>
    <g transform="translate(335 128)"><path d="M25 20v93l-28 60a25 25 0 0 0 22 37h90a25 25 0 0 0 23-37l-28-60V20" fill="#fff1f0" stroke="#2D326C" strokeWidth="7" strokeLinejoin="round"/><path d="M21 20h88" stroke="#2D326C" strokeWidth="9" strokeLinecap="round"/><path d="M18 159h100l14 31c5 11-5 20-19 20H17c-13 0-22-10-18-20Z" fill="#FF978B"/><circle cx="35" cy="174" r="7" fill="#ffd9d6"/><circle cx="95" cy="186" r="9" fill="#ffd9d6"/></g>
    <g className="floater-a"><circle cx="184" cy="65" r="13" fill="#F9D988"/><circle cx="184" cy="65" r="5" fill="#FFFCF0"/></g><g className="floater-b"><circle cx="437" cy="81" r="16" fill="#6DE1D4"/><circle cx="437" cy="81" r="6" fill="#CFFFF8"/></g><g className="floater-c"><circle cx="484" cy="122" r="9" fill="#FC9DA5"/></g>
    <g transform="translate(90 90) rotate(-22)"><circle cx="34" cy="34" r="30" fill="none" stroke="#FFF0B8" strokeWidth="10"/><path d="M57 59l35 35" stroke="#FFF0B8" strokeWidth="14" strokeLinecap="round"/><path d="M21 20c8-7 17-7 26-4" stroke="#fff" strokeWidth="5" strokeLinecap="round"/></g>
    <path d="M496 35l5 14 14 5-14 5-5 14-5-14-14-5 14-5Z" fill="#f9d988"/><path d="M98 167l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="#7fe8e4"/>
    <g transform="translate(252 36)"><rect width="128" height="36" rx="18" fill="#1E285C" stroke="#F2E0A8" strokeWidth="2"/><circle cx="20" cy="18" r="7" fill="#6DE1D4"/><text x="37" y="24" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="13" fill="#fff">SCIENCE LAB</text></g>
  </svg>;
}

export function ChaosArt() {
  return <svg viewBox="0 0 240 225" className="chaos-art" role="img" aria-label="Cartoon Dr Chaos with wild hair, laboratory goggles and purple coat">
    <circle cx="120" cy="113" r="96" fill="#EAE6FF"/>
    <path d="M53 96 35 70l32 9 6-34 24 24 18-39 13 38 29-26 4 33 34-19-14 43" fill="#6D64D9" stroke="#252650" strokeWidth="5" strokeLinejoin="round"/>
    <ellipse cx="120" cy="114" rx="61" ry="63" fill="#FFD7AD" stroke="#252650" strokeWidth="5"/>
    <circle cx="97" cy="109" r="20" fill="#EAF9FF" stroke="#2E335C" strokeWidth="6"/><circle cx="143" cy="109" r="20" fill="#EAF9FF" stroke="#2E335C" strokeWidth="6"/><path d="M117 105h6" stroke="#2E335C" strokeWidth="5"/><circle cx="100" cy="111" r="6" fill="#2E335C"/><circle cx="145" cy="111" r="6" fill="#2E335C"/><path d="M107 146q14 13 28-1" stroke="#B55663" strokeWidth="5" strokeLinecap="round"/>
    <path d="M44 217q5-49 45-55l31 18 31-18q38 8 45 55" fill="#a594f3" stroke="#252650" strokeWidth="5"/><path d="m91 165 29 26 31-26-9 51h-44Z" fill="#fff"/><path d="m118 194-8 14 10 12 11-12-9-14" fill="#f68b90"/>
    <path d="m190 180 25-32" stroke="#252650" strokeWidth="8" strokeLinecap="round"/><path d="M215 147v-14" stroke="#F4BD72" strokeWidth="5" strokeLinecap="round"/>
  </svg>;
}

export function LockArt({ open = false }) {
  return <svg viewBox="0 0 180 195" className="lock-art" role="img" aria-label={open ? 'Unlocked laboratory padlock' : 'Locked laboratory padlock'}>
    <path d={open ? 'M57 86V56C57 15 120 15 120 56' : 'M46 86V56C46 7 134 7 134 56v30'} fill="none" stroke="#8c8ce2" strokeWidth="23" strokeLinecap="round"/>
    <rect x="22" y="74" width="136" height="109" rx="24" fill={open ? '#5CCBAA' : '#FFBC70'} stroke="#33345F" strokeWidth="7"/>
    <circle cx="90" cy="122" r="14" fill="#33345F"/><path d="M90 131v21" stroke="#33345F" strokeWidth="10" strokeLinecap="round"/>
    <path d="m24 94 17-9" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".5"/>
  </svg>;
}

export function MedalArt() {
  return <svg viewBox="0 0 120 140" className="medal-art" role="img" aria-label="Gold detective achievement medal">
    <path d="M32 9h27L75 70H49Z" fill="#6D60E3"/><path d="M62 9h27L72 70H48Z" fill="#EB88AA"/><circle cx="61" cy="86" r="45" fill="#F9D680" stroke="#B98637" strokeWidth="6"/><circle cx="61" cy="86" r="33" fill="none" stroke="#fff0bf" strokeWidth="3" strokeDasharray="4 6"/><path d="m61 59 8 16 17 3-13 12 4 19-16-9-16 9 4-19-13-12 17-3Z" fill="#fff5c3"/>
  </svg>;
}

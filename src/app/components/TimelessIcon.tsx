interface TimelessIconProps {
  size?: number;
  className?: string;
  showBackground?: boolean;
}

export function TimelessIcon({ size = 128, className = "", showBackground = true }: TimelessIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      {showBackground && <rect width="128" height="128" rx="28" fill="#fef3c7" />}
      
      {/* Character body - red/orange shirt */}
      <ellipse cx="64" cy="100" rx="28" ry="20" fill="#dc2626" stroke="#1c1917" strokeWidth="3" />
      
      {/* Left arm down */}
      <ellipse cx="44" cy="95" rx="8" ry="14" fill="#fbbf24" stroke="#1c1917" strokeWidth="2.5" transform="rotate(20 44 95)" />
      <circle cx="42" cy="105" r="6" fill="#fbbf24" stroke="#1c1917" strokeWidth="2.5" />
      
      {/* Head - big round face */}
      <circle cx="64" cy="64" r="32" fill="#fbbf24" stroke="#1c1917" strokeWidth="3.5" />
      
      {/* Right arm holding dumbbell - raised up */}
      <g>
        {/* Upper arm */}
        <ellipse cx="88" cy="58" rx="9" ry="18" fill="#fbbf24" stroke="#1c1917" strokeWidth="2.5" transform="rotate(-30 88 58)" />
        
        {/* Forearm */}
        <ellipse cx="98" cy="38" rx="8" ry="16" fill="#fbbf24" stroke="#1c1917" strokeWidth="2.5" transform="rotate(-25 98 38)" />
        
        {/* Hand/fist */}
        <ellipse cx="102" cy="22" rx="6" ry="7" fill="#fbbf24" stroke="#1c1917" strokeWidth="2.5" transform="rotate(-20 102 22)" />
      </g>
      
      {/* Dumbbell */}
      <g>
        {/* Bar */}
        <rect x="98" y="16" width="3" height="16" rx="1.5" fill="#64748b" stroke="#1c1917" strokeWidth="2" transform="rotate(-20 100 24)" />
        
        {/* Top weight */}
        <ellipse cx="104" cy="12" rx="8" ry="10" fill="#64748b" stroke="#1c1917" strokeWidth="2.5" transform="rotate(-20 104 12)" />
        <ellipse cx="104" cy="12" rx="5" ry="7" fill="#94a3b8" transform="rotate(-20 104 12)" />
        
        {/* Bottom weight */}
        <ellipse cx="96" cy="32" rx="8" ry="10" fill="#64748b" stroke="#1c1917" strokeWidth="2.5" transform="rotate(-20 96 32)" />
        <ellipse cx="96" cy="32" rx="5" ry="7" fill="#94a3b8" transform="rotate(-20 96 32)" />
      </g>
      
      {/* Face - struggling expression */}
      {/* Eyebrows - angry/determined */}
      <path d="M 50 54 Q 48 52 46 54" stroke="#1c1917" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 78 54 Q 80 52 82 54" stroke="#1c1917" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      
      {/* Eyes - closed tight */}
      <path d="M 46 60 Q 50 58 54 60" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 74 60 Q 78 58 82 60" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
      
      {/* Extra lines under eyes for strain */}
      <path d="M 48 62 Q 50 61 52 62" stroke="#1c1917" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 76 62 Q 78 61 80 62" stroke="#1c1917" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      
      {/* Nose */}
      <ellipse cx="64" cy="68" rx="3" ry="2" fill="#ea580c" />
      
      {/* Mouth - gritting teeth */}
      <path d="M 52 78 Q 64 82 76 78" stroke="#1c1917" strokeWidth="3" fill="none" />
      <path d="M 52 78 Q 64 75 76 78" stroke="#1c1917" strokeWidth="3" fill="white" />
      
      {/* Teeth lines */}
      <line x1="58" y1="76" x2="58" y2="80" stroke="#1c1917" strokeWidth="2" />
      <line x1="64" y1="75" x2="64" y2="80" stroke="#1c1917" strokeWidth="2" />
      <line x1="70" y1="76" x2="70" y2="80" stroke="#1c1917" strokeWidth="2" />
      
      {/* Sweat drops */}
      <g>
        {/* Left side */}
        <path d="M 42 54 Q 40 56 40 59 Q 40 61 42 61 Q 44 61 44 59 Q 44 56 42 54 Z" fill="#60a5fa" stroke="#1c1917" strokeWidth="1.5" />
        
        {/* Right side */}
        <path d="M 86 54 Q 84 56 84 59 Q 84 61 86 61 Q 88 61 88 59 Q 88 56 86 54 Z" fill="#60a5fa" stroke="#1c1917" strokeWidth="1.5" />
        
        {/* Forehead */}
        <path d="M 56 46 Q 54 48 54 51 Q 54 53 56 53 Q 58 53 58 51 Q 58 48 56 46 Z" fill="#60a5fa" stroke="#1c1917" strokeWidth="1.5" />
      </g>
      
      {/* Cheek blush - effort */}
      <ellipse cx="46" cy="72" rx="6" ry="4" fill="#f87171" opacity="0.4" />
      <ellipse cx="82" cy="72" rx="6" ry="4" fill="#f87171" opacity="0.4" />
    </svg>
  );
}

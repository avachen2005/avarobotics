interface FitnessIconProps {
  size?: number;
  className?: string;
}

export function FitnessIcon({ size = 180 }: FitnessIconProps) {
  const scale = size / 180;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* 科技感漸層背景 */}
      <defs>
        <linearGradient id="techBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6d28d9', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#5b21b6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3b0764', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* 霓虹愛心漸層 */}
        <linearGradient id="neonHeart" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e879f9', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#d946ef', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#c026d3', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* 電光藍圓環 */}
        <linearGradient id="neonRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* 霓虹發光效果 */}
        <filter id="neonGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* 科技感背景 */}
      <rect width="180" height="180" rx="40" fill="url(#techBg)" />
      
      {/* Running figure - dynamic pose */}
      <g>
        {/* Head */}
        <circle cx="52" cy="38" r="12" fill="url(#figureGradient)" />
        
        {/* Body/torso */}
        <ellipse cx="56" cy="60" rx="10" ry="16" fill="url(#figureGradient)" transform="rotate(10 56 60)" />
        
        {/* Left arm (back) - swinging back */}
        <path d="M 50 52 Q 42 58 38 68" stroke="url(#figureGradient)" strokeWidth="6" strokeLinecap="round" fill="none" />
        
        {/* Right arm (front) - swinging forward */}
        <path d="M 60 54 Q 70 60 76 52" stroke="url(#figureGradient)" strokeWidth="6" strokeLinecap="round" fill="none" />
        
        {/* Left leg (front) - lifted high */}
        <path d="M 54 72 Q 58 82 62 92" stroke="url(#figureGradient)" strokeWidth="7" strokeLinecap="round" fill="none" />
        
        {/* Right leg (back) - extended back */}
        <path d="M 56 72 Q 50 82 46 88" stroke="url(#figureGradient)" strokeWidth="7" strokeLinecap="round" fill="none" />
        
        {/* Left foot */}
        <ellipse cx="62" cy="94" rx="5" ry="3" fill="url(#figureGradient)" />
        
        {/* Right foot */}
        <ellipse cx="44" cy="89" rx="5" ry="3" fill="url(#figureGradient)" transform="rotate(-20 44 89)" />
      </g>
      
      {/* Motion lines for speed effect */}
      <g opacity="0.6">
        <path d="M 30 45 L 20 45" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M 28 55 L 16 55" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M 32 65 L 22 65" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      
      {/* 活動圓環 - 電光藍 */}
      <circle
        cx="90"
        cy="90"
        r="50"
        fill="none"
        stroke="url(#neonRing)"
        strokeWidth={6 * scale}
        strokeDasharray="220 314"
        strokeDashoffset="0"
        strokeLinecap="round"
        transform="rotate(-90 90 90)"
        filter="url(#neonGlow)"
      />
      
      {/* Heart rate pulse line */}
      <path 
        d="M 70 100 L 75 100 L 78 94 L 82 106 L 86 100 L 108 100" 
        stroke="white" 
        strokeWidth="3" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        opacity="0.8"
      />
      
      {/* 愛心 - 霓虹漸層 */}
      <g transform={`translate(${125 * scale}, ${35 * scale}) scale(${0.5 * scale})`} filter="url(#neonGlow)">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="url(#neonHeart)"
        />
      </g>
    </svg>
  );
}
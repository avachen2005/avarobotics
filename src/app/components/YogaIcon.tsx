interface YogaIconProps {
  size?: number;
  className?: string;
}

export function YogaIcon({ size = 128, className = "" }: YogaIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="figureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>
        <linearGradient id="silkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Background with rounded square */}
      <rect width="128" height="128" rx="28" fill="url(#bgGradient)" />
      
      {/* Decorative stars - peaceful atmosphere */}
      <circle cx="25" cy="25" r="2" fill="white" opacity="0.6" />
      <circle cx="102" cy="30" r="2.5" fill="white" opacity="0.5" />
      <circle cx="15" cy="50" r="1.5" fill="white" opacity="0.4" />
      <circle cx="110" cy="70" r="2" fill="white" opacity="0.5" />
      <circle cx="20" cy="100" r="1.8" fill="white" opacity="0.45" />
      
      {/* Aerial silk/hammock - left side */}
      <path 
        d="M 45 10 Q 42 15 42 55" 
        stroke="url(#silkGradient)" 
        strokeWidth="8" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Aerial silk/hammock - right side */}
      <path 
        d="M 83 10 Q 86 15 86 55" 
        stroke="url(#silkGradient)" 
        strokeWidth="8" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Silk fabric connecting piece */}
      <ellipse 
        cx="64" 
        cy="50" 
        rx="22" 
        ry="8" 
        fill="url(#silkGradient)" 
        opacity="0.8"
      />
      
      {/* Top attachment points */}
      <circle cx="45" cy="10" r="4" fill="#8b5cf6" opacity="0.7" />
      <circle cx="83" cy="10" r="4" fill="#8b5cf6" opacity="0.7" />
      
      {/* Yoga figure - inverted/upside down pose */}
      <g>
        {/* Head - at bottom since inverted */}
        <circle cx="64" cy="95" r="10" fill="url(#figureGradient)" />
        
        {/* Hair flowing down */}
        <path 
          d="M 58 100 Q 55 108 54 115" 
          stroke="url(#figureGradient)" 
          strokeWidth="4" 
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M 64 100 Q 64 110 64 118" 
          stroke="url(#figureGradient)" 
          strokeWidth="4" 
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M 70 100 Q 73 108 74 115" 
          stroke="url(#figureGradient)" 
          strokeWidth="4" 
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Body/torso - hanging upside down */}
        <ellipse cx="64" cy="70" rx="12" ry="18" fill="url(#figureGradient)" />
        
        {/* Legs wrapped in silk - bent position */}
        {/* Left leg */}
        <path 
          d="M 58 56 Q 48 52 44 48" 
          stroke="url(#figureGradient)" 
          strokeWidth="7" 
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Right leg */}
        <path 
          d="M 70 56 Q 80 52 84 48" 
          stroke="url(#figureGradient)" 
          strokeWidth="7" 
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Arms extended gracefully - reaching down */}
        {/* Left arm */}
        <path 
          d="M 56 75 Q 45 82 40 90" 
          stroke="url(#figureGradient)" 
          strokeWidth="6" 
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="38" cy="92" rx="4" ry="5" fill="url(#figureGradient)" transform="rotate(30 38 92)" />
        
        {/* Right arm */}
        <path 
          d="M 72 75 Q 83 82 88 90" 
          stroke="url(#figureGradient)" 
          strokeWidth="6" 
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="90" cy="92" rx="4" ry="5" fill="url(#figureGradient)" transform="rotate(-30 90 92)" />
      </g>
      
      {/* Glow/aura effect around figure */}
      <ellipse 
        cx="64" 
        cy="75" 
        rx="35" 
        ry="45" 
        fill="none" 
        stroke="white" 
        strokeWidth="1.5" 
        opacity="0.15"
      />
      
      {/* Flow lines - movement/grace */}
      <g opacity="0.25">
        <path d="M 30 65 Q 25 70 22 75" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 98 65 Q 103 70 106 75" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
      
      {/* Small lotus/zen symbol at top */}
      <g transform="translate(64, 22)" opacity="0.7">
        <circle cx="0" cy="0" r="3" fill="white" opacity="0.6" />
        <circle cx="0" cy="0" r="5" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
      </g>
    </svg>
  );
}

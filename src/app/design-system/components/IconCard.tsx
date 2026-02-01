import { ReactNode } from 'react';
import { tokens } from '../tokens';

interface IconCardProps {
  children: ReactNode;
  size?: number;
  variant?: 'ios' | 'android';
  label?: string;
  sublabel?: string;
  downloadable?: boolean;
  className?: string;
}

export function IconCard({ 
  children, 
  size = 120, 
  variant = 'ios',
  label,
  sublabel,
  downloadable = true,
  className = ''
}: IconCardProps) {
  const borderRadius = variant === 'ios' ? '22%' : '50%';
  
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div 
        className="overflow-hidden shadow-md bg-white flex items-center justify-center group relative"
        style={{ 
          borderRadius,
          width: size,
          height: size,
        }}
      >
        {children}
        
        {downloadable && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm">右鍵保存</span>
          </div>
        )}
      </div>
      
      {(label || sublabel) && (
        <div className="text-center">
          {label && <div className="text-slate-700">{label}</div>}
          {sublabel && <div className="text-slate-500 text-sm">{sublabel}</div>}
        </div>
      )}
    </div>
  );
}

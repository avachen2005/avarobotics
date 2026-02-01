import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, title, className = '', padding = 'md' }: CardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div className={`bg-white rounded-2xl shadow-lg ${paddings[padding]} ${className}`}>
      {title && <h3 className="text-slate-800 mb-4">{title}</h3>}
      {children}
    </div>
  );
}
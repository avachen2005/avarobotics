import { ReactNode } from 'react';
import { tokens } from '../tokens';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = 'rounded-full font-medium transition-all duration-200 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-violet-600 text-white hover:bg-violet-700 shadow-md hover:shadow-lg',
    secondary: 'bg-pink-500 text-white hover:bg-pink-600 shadow-md hover:shadow-lg',
    outline: 'border-2 border-violet-600 text-violet-600 hover:bg-violet-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

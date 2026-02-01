interface GradientSwatchProps {
  gradient: string;
  name: string;
}

export function GradientSwatch({ gradient, name }: GradientSwatchProps) {
  return (
    <div className="space-y-2">
      <div 
        className="w-full h-24 rounded-xl shadow-lg"
        style={{ 
          background: gradient,
          boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)'
        }}
      />
      <div className="text-slate-800">{name}</div>
      <div className="text-slate-500 text-xs font-mono break-all">{gradient}</div>
      <button
        onClick={() => navigator.clipboard.writeText(gradient)}
        className="text-violet-600 hover:text-violet-700 text-sm"
      >
        複製 CSS
      </button>
    </div>
  );
}
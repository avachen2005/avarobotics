interface ColorSwatchProps {
  color: string;
  name: string;
  value: string;
}

export function ColorSwatch({ color, name, value }: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-violet-50 transition-colors">
      <div 
        className="w-12 h-12 rounded-lg shadow-md border border-slate-200"
        style={{ 
          backgroundColor: color,
          boxShadow: `0 4px 12px ${color}40`
        }}
      />
      <div className="flex-1">
        <div className="text-slate-800">{name}</div>
        <div className="text-slate-500 text-sm font-mono">{value}</div>
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(color)}
        className="text-slate-500 hover:text-violet-600 text-sm px-2 py-1 rounded hover:bg-violet-50"
      >
        複製
      </button>
    </div>
  );
}
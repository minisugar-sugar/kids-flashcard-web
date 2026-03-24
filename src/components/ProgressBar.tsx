interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="w-full px-4 py-2">
      <div className="flex justify-between text-sm font-bold mb-1" style={{ color: '#2D2D2D' }}>
        <span>{current} / {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-3 rounded-full" style={{ backgroundColor: '#E5E7EB' }}>
        <div
          className="h-3 rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: '#4ECDC4' }}
        />
      </div>
    </div>
  );
}

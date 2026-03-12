import React from 'react';

interface ScoreBadgeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreBadge({ score, label = 'Trend Score', size = 'md' }: ScoreBadgeProps) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-emerald-600 bg-emerald-50 ring-emerald-600/20';
    if (s >= 50) return 'text-indigo-600 bg-indigo-50 ring-indigo-600/20';
    return 'text-amber-600 bg-amber-50 ring-amber-600/20';
  };

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const labelSizeClasses = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  return (
    <div className="flex flex-col items-end">
      <span className={`inline-flex items-center font-bold rounded-full ring-1 ring-inset ${getScoreColor(score)} ${sizeClasses[size]}`}>
        {score}
      </span>
      {label && (
        <span className={`mt-1 uppercase tracking-wider text-slate-400 font-bold ${labelSizeClasses[size]}`}>
          {label}
        </span>
      )}
    </div>
  );
}

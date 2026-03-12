import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ScoreBadge } from './ScoreBadge';

interface TrendCardProps {
  trend: {
    id: string;
    title: string;
    category: string;
    source: string;
    trendScore: number;
  };
}

export function TrendCard({ trend }: TrendCardProps) {
  return (
    <div className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
          {trend.category}
        </span>
        <ScoreBadge score={trend.trendScore} />
      </div>
      
      <h3 className="mt-4 text-lg font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
        {trend.title}
      </h3>
      
      <div className="mt-auto pt-6 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
          {trend.source.replace('_', ' ')}
        </span>
        <Link 
          href={`/trends/${trend.id}`}
          className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Ver ideias
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}

import React from 'react';
import { Zap, Lightbulb, Target, Sparkles, Tag } from 'lucide-react';

interface IdeaItem {
  id: string;
  title: string;
  hook: string;
  summary: string;
  targetAudience: string;
  estimatedViralityReason: string;
  keywords: string[];
}

interface IdeaCardProps {
  idea: IdeaItem;
  index: number;
}

export function IdeaCard({ idea, index }: IdeaCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-bold shadow-sm shadow-indigo-200">
          {index + 1}
        </span>
        <h4 className="text-lg font-bold text-slate-900">{idea.title}</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              <Zap size={14} className="text-amber-500" /> Hook (Gancho Inicial)
            </span>
            <p className="text-sm text-slate-700 italic leading-relaxed border-l-2 border-amber-200 pl-3">
              "{idea.hook}"
            </p>
          </div>
          <div>
            <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              <Lightbulb size={14} className="text-indigo-500" /> Resumo do Conteúdo
            </span>
            <p className="text-sm text-slate-600 leading-relaxed">{idea.summary}</p>
          </div>
        </div>
        
        <div className="space-y-5">
          <div>
            <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              <Target size={14} className="text-rose-500" /> Público Alvo
            </span>
            <p className="text-sm text-slate-600 leading-relaxed">{idea.targetAudience}</p>
          </div>
          <div>
            <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              <Sparkles size={14} className="text-indigo-500" /> Por que pode viralizar?
            </span>
            <p className="text-sm text-slate-600 leading-relaxed">{idea.estimatedViralityReason}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 pt-5 border-t border-slate-100">
        {idea.keywords.map((kw, i) => (
          <span key={i} className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-tight border border-slate-100">
            <Tag size={10} className="text-slate-400" /> {kw}
          </span>
        ))}
      </div>
    </div>
  );
}

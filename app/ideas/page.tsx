"use client";

import { useEffect, useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { PageContainer } from '@/components/ui/PageContainer';
import { IdeaCard } from '@/components/ui/IdeaCard';

interface IdeaItem {
  id: string;
  title: string;
  hook: string;
  summary: string;
  targetAudience: string;
  estimatedViralityReason: string;
  keywords: string[];
}

interface Generation {
  id: string;
  trend: { title: string };
  createdAt: string;
  items: IdeaItem[];
}

export default function IdeasHistoryPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGen, setExpandedGen] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch('/api/ideas');
        const data = await res.json();
        setGenerations(data);
        if (data.length > 0) setExpandedGen(data[0].id);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  if (loading) return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center py-32">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 font-bold text-slate-600">Carregando seu histórico criativo...</p>
      </div>
    </PageContainer>
  );

  return (
    <PageContainer 
      title="Histórico de Ideias" 
      description="Todas as ideias geradas pela IA para suas tendências favoritas."
      maxWidth="lg"
    >
      {generations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 mb-6">
            <Lightbulb size={48} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Você ainda não gerou nenhuma ideia</h3>
          <p className="mt-2 text-slate-500 max-w-xs mx-auto">Vá até o dashboard, escolha uma tendência e peça para a IA criar roteiros para você.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {generations.map((gen) => (
            <div key={gen.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
              <button 
                onClick={() => setExpandedGen(expandedGen === gen.id ? null : gen.id)}
                className={`flex w-full items-center justify-between p-8 transition-colors ${expandedGen === gen.id ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">Tendência Analisada</span>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">{gen.trend.title}</h3>
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-400">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5">{new Date(gen.createdAt).toLocaleDateString('pt-BR')}</span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5">{new Date(gen.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition-all ${expandedGen === gen.id ? 'rotate-180 text-indigo-600 border-indigo-100 shadow-sm' : ''}`}>
                  <ChevronDown size={24} />
                </div>
              </button>

              {expandedGen === gen.id && (
                <div className="border-t border-slate-100 p-8 bg-slate-50/30">
                  <div className="grid grid-cols-1 gap-8">
                    {gen.items.map((item, idx) => (
                      <IdeaCard key={item.id} idea={item} index={idx} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

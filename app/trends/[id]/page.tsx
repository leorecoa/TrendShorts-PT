"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sparkles, ArrowLeft, Calendar, BarChart2, Tag as TagIcon } from 'lucide-react';
import { PageContainer } from '@/components/ui/PageContainer';
import { ScoreBadge } from '@/components/ui/ScoreBadge';

interface Trend {
  id: string;
  title: string;
  category: string;
  source: string;
  trendScore: number;
  baselineScore: number;
  velocityScore: number;
  freshnessScore: number;
  sampleKeywords: string[];
  updatedAt: string;
}

export default function TrendDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [trend, setTrend] = useState<Trend | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await fetch(`/api/trends/${id}`);
        const data = await res.json();
        setTrend(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrend();
  }, [id]);

  const handleGenerateIdeas = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/ideas/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trendId: id }),
      });
      const data = await res.json();
      if (data.generationId) {
        router.push('/ideas');
      }
    } catch (error) {
      console.error('Error generating ideas:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center py-32">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 font-bold text-slate-600">Analisando tendência...</p>
      </div>
    </PageContainer>
  );

  if (!trend) return (
    <PageContainer>
      <div className="text-center py-32">
        <h2 className="text-2xl font-bold text-slate-900">Tendência não encontrada</h2>
        <button onClick={() => router.push('/dashboard')} className="mt-4 text-indigo-600 font-bold underline">Voltar ao Dashboard</button>
      </div>
    </PageContainer>
  );

  return (
    <PageContainer maxWidth="lg">
      <button 
        onClick={() => router.back()}
        className="mb-8 group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para o Dashboard
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                {trend.category}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{trend.source.replace('_', ' ')}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              {trend.title}
            </h1>
            
            <div className="mt-8 flex flex-wrap gap-2">
              {trend.sampleKeywords.map((kw, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-xl bg-slate-50 border border-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 uppercase tracking-tight">
                  <TagIcon size={12} className="text-slate-400" /> {kw}
                </span>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-slate-100">
              <button
                onClick={handleGenerateIdeas}
                disabled={generating}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-5 text-xl font-black text-white shadow-xl shadow-indigo-200 hover:bg-indigo-500 disabled:opacity-50 transition-all active:scale-[0.98]"
              >
                <Sparkles size={24} className={generating ? 'animate-pulse' : ''} />
                {generating ? 'Gerando ideias com IA...' : 'Gerar 10 Ideias de Shorts'}
              </button>
              <p className="mt-6 text-center text-sm font-medium text-slate-500">
                Nosso motor de IA Gemini analisará esta tendência para criar <span className="text-indigo-600 font-bold">roteiros virais</span> otimizados para o algoritmo.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Métricas de Viralização</h3>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-600">Trend Score</span>
                <ScoreBadge score={trend.trendScore} size="lg" label="" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-indigo-600 shadow-sm" style={{ width: `${trend.trendScore}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase text-right">Potencial de Viralização</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Velocidade</span>
                  <p className="mt-1 text-2xl font-black text-slate-900">{trend.velocityScore}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recência</span>
                  <p className="mt-1 text-2xl font-black text-slate-900">{trend.freshnessScore}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Informações Adicionais</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                  <Calendar size={18} />
                </div>
                <span>{new Date(trend.updatedAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                  <BarChart2 size={18} />
                </div>
                <span>Base Score: {trend.baselineScore}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

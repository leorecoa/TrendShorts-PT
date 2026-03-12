"use client";

import { useEffect, useState } from 'react';
import { RefreshCw, Search, Filter } from 'lucide-react';
import { PageContainer } from '@/components/ui/PageContainer';
import { TrendCard } from '@/components/ui/TrendCard';

interface Trend {
  id: string;
  title: string;
  category: string;
  source: string;
  trendScore: number;
  updatedAt: string;
}

export default function DashboardPage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/trends');
      const data = await res.json();
      setTrends(data);
    } catch (error) {
      console.error('Error fetching trends:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await fetch('/api/trends/sync', { method: 'POST' });
      await fetchTrends();
    } catch (error) {
      console.error('Error syncing:', error);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const actions = (
    <button
      onClick={handleSync}
      disabled={syncing}
      className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-500 disabled:opacity-50 transition-all active:scale-95"
    >
      <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
      {syncing ? 'Sincronizando...' : 'Sincronizar Agora'}
    </button>
  );

  return (
    <PageContainer 
      title="Tendências de YouTube Shorts no Brasil" 
      description="Descubra o que está em alta agora e saia na frente da concorrência."
      actions={actions}
    >
      <div className="flex flex-col gap-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar tendências virais..." 
              className="w-full rounded-xl border border-slate-100 bg-slate-50 py-3 pl-12 pr-4 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 border border-slate-100">
              <Filter size={18} />
            </div>
            <select className="h-10 rounded-xl border border-slate-100 bg-slate-50 px-4 text-sm font-bold text-slate-600 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer">
              <option>Todas as Categorias</option>
              <option>Tecnologia</option>
              <option>Finanças</option>
              <option>Entretenimento</option>
            </select>
          </div>
        </div>

        {/* Trends Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-slate-200/60"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trends.map((trend) => (
              <TrendCard key={trend.id} trend={trend} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && trends.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 mb-6">
              <Search size={48} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Nenhuma tendência encontrada</h3>
            <p className="mt-2 text-slate-500 max-w-xs mx-auto">Tente sincronizar os dados ou ajustar seus filtros para ver as novidades.</p>
            <button 
              onClick={handleSync}
              className="mt-8 text-sm font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
            >
              Sincronizar agora
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

"use client";

import { Globe, Cpu, Info } from 'lucide-react';
import { PageContainer } from '@/components/ui/PageContainer';

export default function SettingsPage() {
  return (
    <PageContainer 
      title="Configurações" 
      description="Personalize sua experiência no TrendShorts PT."
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Region & Language */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Região e Idioma</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Região de Busca</label>
              <div className="relative">
                <select disabled className="w-full rounded-xl border border-slate-100 bg-slate-50 py-3 px-4 text-sm font-bold text-slate-400 cursor-not-allowed appearance-none">
                  <option>Brasil (BR)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Globe size={14} className="text-slate-300" />
                </div>
              </div>
              <p className="text-[10px] font-bold text-indigo-600/60">Bloqueado para o MVP.</p>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Idioma de Geração</label>
              <div className="relative">
                <select disabled className="w-full rounded-xl border border-slate-100 bg-slate-50 py-3 px-4 text-sm font-bold text-slate-400 cursor-not-allowed appearance-none">
                  <option>Português (PT-BR)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Globe size={14} className="text-slate-300" />
                </div>
              </div>
              <p className="text-[10px] font-bold text-indigo-600/60">Bloqueado para o MVP.</p>
            </div>
          </div>
        </div>

        {/* AI Model */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900">Modelo de IA</h3>
          </div>
          
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Modelo Ativo</label>
            <div className="flex items-center justify-between rounded-2xl border border-indigo-100 bg-indigo-50/30 p-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
                  <div className="absolute inset-0 h-3 w-3 rounded-full bg-indigo-600 animate-ping opacity-75"></div>
                </div>
                <span className="text-sm font-bold text-indigo-900">Gemini 3 Flash Preview</span>
              </div>
              <span className="rounded-lg bg-indigo-600 px-2 py-1 text-[10px] font-black text-white uppercase tracking-wider">Ativo</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-10 text-white shadow-xl shadow-slate-200">
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-indigo-400">
              <Info size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black">Sobre o MVP</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed font-medium">
                O TrendShorts PT é uma ferramenta experimental para criadores de conteúdo. No momento, estamos focados em validar a qualidade das tendências e das ideias geradas. Em breve, permitiremos a personalização de prompts e integração direta com o YouTube Studio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

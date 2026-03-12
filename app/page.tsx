import Link from 'next/link';
import { ArrowRight, Zap, BarChart3, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative isolate overflow-hidden bg-slate-50">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-200 to-violet-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <div className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                Versão MVP 1.0
              </span>
            </div>
          </div>
          <h1 className="mt-10 text-5xl font-black tracking-tight text-slate-900 sm:text-7xl leading-[0.9]">
            Domine o <br />
            <span className="text-indigo-600">YouTube Shorts</span> <br />
            com IA
          </h1>
          <p className="mt-8 text-lg font-medium leading-8 text-slate-600 max-w-md">
            Descubra o que está bombando no Brasil agora e gere roteiros e ideias de Shorts em segundos. Pare de adivinhar e comece a viralizar.
          </p>
          <div className="mt-12 flex items-center gap-x-6">
            <Link
              href="/dashboard"
              className="rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-black text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95"
            >
              Começar Agora
            </Link>
            <Link href="#features" className="group flex items-center gap-2 text-sm font-black leading-6 text-slate-900 uppercase tracking-wider">
              Ver como funciona 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="rounded-3xl bg-slate-900/5 p-3 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-[40px] lg:p-6">
              <div className="relative w-full lg:w-[600px] aspect-video bg-white rounded-2xl lg:rounded-[32px] shadow-2xl flex items-center justify-center border border-slate-200 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white opacity-50"></div>
                <BarChart3 className="text-indigo-600 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-8 left-8 right-8 h-24 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-6 gap-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <Zap size={20} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                    <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-24 sm:py-32 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-xs font-black leading-7 text-indigo-600 uppercase tracking-[0.3em]">Velocidade Máxima</h2>
            <p className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Tudo o que você precisa para crescer
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col group">
                <dt className="flex items-center gap-x-4 text-lg font-black leading-7 text-slate-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Zap size={24} />
                  </div>
                  Tendências em Tempo Real
                </dt>
                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-slate-600 font-medium">
                  <p className="flex-auto">Monitoramos Google Trends e YouTube para encontrar o que as pessoas estão buscando agora.</p>
                </dd>
              </div>
              <div className="flex flex-col group">
                <dt className="flex items-center gap-x-4 text-lg font-black leading-7 text-slate-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <BarChart3 size={24} />
                  </div>
                  Trend Score Exclusivo
                </dt>
                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-slate-600 font-medium">
                  <p className="flex-auto">Calculamos a velocidade e o potencial de cada assunto para você focar no que importa.</p>
                </dd>
              </div>
              <div className="flex flex-col group">
                <dt className="flex items-center gap-x-4 text-lg font-black leading-7 text-slate-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Sparkles size={24} />
                  </div>
                  Ideias Geradas por IA
                </dt>
                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-slate-600 font-medium">
                  <p className="flex-auto">Receba 10 ideias de roteiros, hooks e títulos otimizados pelo Gemini para cada tendência.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

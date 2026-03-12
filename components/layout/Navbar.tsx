import Link from 'next/link';
import { TrendingUp, LayoutDashboard, Lightbulb, Settings } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 group-hover:bg-indigo-500 transition-all">
              <TrendingUp size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              TrendShorts <span className="text-indigo-600">PT</span>
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex md:items-center md:gap-1">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link 
            href="/ideas" 
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all"
          >
            <Lightbulb size={18} />
            Ideias
          </Link>
          <Link 
            href="/settings" 
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all"
          >
            <Settings size={18} />
            Configurações
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard" 
            className="hidden sm:inline-flex rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-500 hover:shadow-indigo-200 transition-all active:scale-95"
          >
            Acessar App
          </Link>
        </div>
      </div>
    </nav>
  );
}

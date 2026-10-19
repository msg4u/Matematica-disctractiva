import React from 'react';
import { Language } from '../types';
import { UiTranslations } from '../translations';
import { Compass, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  t: UiTranslations;
  solvedCount: number;
  totalCount: number;
  onNavigateHome: () => void;
  activeProblemId: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  t,
  solvedCount,
  totalCount,
  onNavigateHome,
  activeProblemId
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title wordmark */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-indigo-600 focus-visible:outline-2 rounded-lg"
          aria-label={t.siteTitle}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block font-sans">
              Matematica Distractivă
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation link & Progress */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`transition-colors whitespace-nowrap hover:text-indigo-700 cursor-pointer ${
              activeProblemId === null ? 'text-indigo-700 font-semibold' : ''
            }`}
          >
            {t.allChallenges}
          </button>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="tabular-nums font-semibold text-slate-800">
              {solvedCount} / {totalCount}
            </span>
            <span>{lang === 'ro' ? 'rezolvate' : 'solved'}</span>
          </div>
        </nav>

        {/* Zone 3: Language Selector RO / EN */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="inline-flex p-1 bg-white/90 border border-slate-200 rounded-xl shadow-2xs"
            role="group"
            aria-label="Selector limbă"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('ro')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                lang === 'ro'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-pressed={lang === 'ro'}
            >
              RO
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { UiTranslations } from '../translations';
import { ArrowDown, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';

interface HeroProps {
  t: UiTranslations;
  solvedCount: number;
  totalCount: number;
  viewedCount: number;
  onStartAdventure: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  t,
  solvedCount,
  totalCount,
  viewedCount,
  onStartAdventure
}) => {
  const percentSolved = Math.round((solvedCount / totalCount) * 100);

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16">
      {/* Decorative background math symbols */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10 text-indigo-900 font-mono font-bold">
        <span className="absolute top-6 left-[8%] text-4xl">∑</span>
        <span className="absolute top-16 right-[12%] text-3xl">π</span>
        <span className="absolute bottom-8 left-[18%] text-3xl">∆</span>
        <span className="absolute bottom-12 right-[8%] text-4xl">√</span>
        <span className="absolute top-1/2 left-[3%] text-2xl">÷</span>
        <span className="absolute top-1/3 right-[4%] text-2xl">×</span>
        <span className="absolute top-2/3 right-[22%] text-2xl">17</span>
        <span className="absolute top-1/4 left-[30%] text-2xl">∞</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Matematică recreativă pentru 7–14 ani</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance leading-tight">
            {t.heroHeadline}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            {t.heroSubtitle}
          </p>

          {/* CTA & Progress summary */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onStartAdventure}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              <span>{t.startAdventure}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Tracker Card */}
          <div className="mt-8 p-4 bg-white/90 rounded-2xl border border-slate-200 shadow-xs max-w-xl mx-auto text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {t.progressSolved.replace('{solved}', solvedCount.toString()).replace('{total}', totalCount.toString())}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                <span>{t.progressViewed.replace('{viewed}', viewedCount.toString())}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${percentSolved}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

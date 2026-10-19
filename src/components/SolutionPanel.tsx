import React from 'react';
import { ProblemTranslation, UiTranslations } from '../translations';
import { Lightbulb, CheckCircle2, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { ProblemActivityRenderer } from './activities/ProblemActivityRenderer';

interface SolutionPanelProps {
  problemId: number;
  data: ProblemTranslation;
  t: UiTranslations;
  isOpen: boolean;
  onToggle: () => void;
  isViewed: boolean;
  onMarkUnderstood: () => void;
  isSolved: boolean;
}

export const SolutionPanel: React.FC<SolutionPanelProps> = ({
  problemId,
  data,
  t,
  isOpen,
  onToggle,
  isViewed,
  onMarkUnderstood,
  isSolved
}) => {
  return (
    <section className="mt-8 border-t border-slate-200/80 pt-6">
      {/* Solution Toggle Header Button */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`solution-panel-${problemId}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-xs cursor-pointer bg-amber-500 hover:bg-amber-600 text-white"
        >
          <Lightbulb className="w-4 h-4 text-amber-200" />
          <span>{isOpen ? t.hideSolution : t.showSolution}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isViewed && (
          <span className="text-xs font-semibold text-amber-800 bg-amber-100/80 border border-amber-300 px-3 py-1 rounded-lg flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.understoodBadge}</span>
          </span>
        )}
      </div>

      {/* Expandable Solution Content */}
      {isOpen && (
        <div
          id={`solution-panel-${problemId}`}
          className="mt-6 p-5 sm:p-7 bg-white rounded-2xl border-2 border-amber-200/70 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300 space-y-6"
        >
          {/* Quick Answer */}
          <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
              {t.solutionShortTitle}
            </div>
            <p className="text-sm sm:text-base font-semibold text-amber-950 leading-relaxed">
              {data.solutionShort}
            </p>
          </div>

          {/* Step-by-Step Explanation */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              {t.stepByStepTitle}
            </div>
            <ol className="space-y-3">
              {data.solutionSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Solution Diagram / Visual Demonstration */}
          <div className="pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Demonstrație vizuală:
            </div>
            <ProblemActivityRenderer
              problemId={problemId}
              t={t}
              isSolutionMode={true}
            />
          </div>

          {/* Key Takeaway */}
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-0.5">
                {t.takeawayTitle}
              </div>
              <p className="text-sm font-medium text-indigo-950 italic">
                „{data.takeaway}”
              </p>
            </div>
          </div>

          {/* Action Footer: Mark Understood & Hide */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            {!isViewed && !isSolved && (
              <button
                type="button"
                onClick={onMarkUnderstood}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.iUnderstood}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onToggle}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors ml-auto cursor-pointer"
            >
              {t.hideSolution}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

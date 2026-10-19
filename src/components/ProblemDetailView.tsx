import React, { useState } from 'react';
import { ProblemMeta } from '../types';
import { ProblemTranslation, UiTranslations } from '../translations';
import { ProblemActivityRenderer } from './activities/ProblemActivityRenderer';
import { SolutionPanel } from './SolutionPanel';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { playSuccessSound } from '../utils/sound';

interface ProblemDetailViewProps {
  meta: ProblemMeta;
  data: ProblemTranslation;
  t: UiTranslations;
  isSolved: boolean;
  isViewed: boolean;
  onSolve: () => void;
  onMarkViewed: () => void;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const ProblemDetailView: React.FC<ProblemDetailViewProps> = ({
  meta,
  data,
  t,
  isSolved,
  isViewed,
  onSolve,
  onMarkViewed,
  onBack,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}) => {
  const [showHint, setShowHint] = useState<boolean>(false);
  const [solutionOpen, setSolutionOpen] = useState<boolean>(false);
  const [activityKey, setActivityKey] = useState<number>(0);

  const handleResetActivity = () => {
    setActivityKey((prev) => prev + 1);
  };

  const handleSuccess = () => {
    playSuccessSound();
    onSolve();
  };

  const handleToggleSolution = () => {
    setSolutionOpen((prev) => !prev);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Navigation bar: Back and Next/Prev buttons */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-white/80 border border-slate-200 hover:border-indigo-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToChallenges}</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className="p-2 text-slate-600 bg-white/80 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title={t.previousProblem}
            aria-label={t.previousProblem}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold text-slate-500 px-2">
            #{meta.id} / 10
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className="p-2 text-slate-600 bg-white/80 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title={t.nextProblem}
            aria-label={t.nextProblem}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Problem Article */}
      <article className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6">
        {/* Header: Title and Labels */}
        <header className="space-y-3">
          {/* Metadata unboxed text */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <span>{t.categories[meta.category]}</span>
            <span aria-hidden="true">·</span>
            <span>{meta.ageMin}–{meta.ageMax} {t.ageYears}</span>
            <span aria-hidden="true">·</span>
            <span>{t.difficulties[meta.difficulty]}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {meta.durationMinutes} {t.minutesShort}
            </span>

            {/* Status indicator */}
            {isSolved ? (
              <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {t.solvedBadge}
              </span>
            ) : isViewed ? (
              <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                {t.understoodBadge}
              </span>
            ) : null}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {data.title}
          </h1>
        </header>

        {/* Problem Statement Card */}
        <div className="bg-amber-50/40 border border-amber-200/70 p-4 sm:p-5 rounded-2xl text-slate-800">
          <p className="text-base sm:text-lg leading-relaxed font-medium">
            {data.statement}
          </p>
        </div>

        {/* Interactive Workspace Area */}
        <section aria-label={t.trialArea} className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.trialArea}
            </h2>
            <button
              type="button"
              onClick={handleResetActivity}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetProblem}</span>
            </button>
          </div>

          <ProblemActivityRenderer
            key={activityKey}
            problemId={meta.id}
            t={t}
            isSolutionMode={false}
            onSuccess={handleSuccess}
            isSolved={isSolved}
          />
        </section>

        {/* Hint Section */}
        <div className="pt-2">
          {!showHint ? (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{t.giveHint}</span>
            </button>
          ) : (
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-bold text-sky-900 mb-1">
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-sky-600" />
                  {t.hintTitle}
                </span>
                <button
                  type="button"
                  onClick={() => setShowHint(false)}
                  className="text-[11px] text-sky-600 hover:text-sky-800 underline cursor-pointer"
                >
                  Ascunde
                </button>
              </div>
              <p className="text-sm text-sky-950 font-medium italic">
                „{data.hint}”
              </p>
            </div>
          )}
        </div>

        {/* Solution Panel */}
        <SolutionPanel
          problemId={meta.id}
          data={data}
          t={t}
          isOpen={solutionOpen}
          onToggle={handleToggleSolution}
          isViewed={isViewed}
          onMarkUnderstood={onMarkViewed}
          isSolved={isSolved}
        />
      </article>
    </div>
  );
};

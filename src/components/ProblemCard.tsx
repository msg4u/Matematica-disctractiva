import React from 'react';
import { ProblemMeta } from '../types';
import { ProblemTranslation, UiTranslations } from '../translations';
import { ProblemThumbnail } from './ProblemThumbnail';
import { CheckCircle2, BookOpen, Clock, ArrowRight } from 'lucide-react';

interface ProblemCardProps {
  meta: ProblemMeta;
  data: ProblemTranslation;
  t: UiTranslations;
  isSolved: boolean;
  isViewed: boolean;
  onSelect: (problemId: number) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  meta,
  data,
  t,
  isSolved,
  isViewed,
  onSelect
}) => {
  const difficultyLabel = t.difficulties[meta.difficulty];
  const categoryLabel = t.categories[meta.category];

  return (
    <article
      onClick={() => onSelect(meta.id)}
      className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Thumbnail area */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
        <ProblemThumbnail problemId={meta.id} />

        {/* Status badges */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          {isSolved ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-md shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.solvedBadge}</span>
            </span>
          ) : isViewed ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-md shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.understoodBadge}</span>
            </span>
          ) : null}
        </div>

        {/* Problem number watermark tag */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-xs rounded text-[11px] font-mono font-bold text-white">
          #{meta.id}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata unboxed text with typographic dot separators */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2 font-medium">
            <span>{categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{meta.ageMin}–{meta.ageMax} {t.ageYears}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5">
              <Clock className="w-3 h-3 text-slate-400" />
              {meta.durationMinutes} {t.minutesShort}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            {data.title}
          </h2>

          {/* Statement preview */}
          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {data.statement}
          </p>
        </div>

        {/* Card Footer: Difficulty & Explore Button */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            {difficultyLabel}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-indigo-700 group-hover:translate-x-0.5 transition-all">
            <span>{t.exploreProblem}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

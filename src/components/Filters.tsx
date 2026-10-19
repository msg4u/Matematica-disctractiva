import React from 'react';
import { AgeFilter, Category, Difficulty } from '../types';
import { UiTranslations } from '../translations';
import { RotateCcw, Filter } from 'lucide-react';

interface FiltersProps {
  t: UiTranslations;
  selectedAge: AgeFilter;
  onSelectAge: (age: AgeFilter) => void;
  selectedCategory: Category | 'all';
  onSelectCategory: (cat: Category | 'all') => void;
  selectedDifficulty: Difficulty | 'all';
  onSelectDifficulty: (diff: Difficulty | 'all') => void;
  onReset: () => void;
  activeFilterCount: number;
}

export const Filters: React.FC<FiltersProps> = ({
  t,
  selectedAge,
  onSelectAge,
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  onReset,
  activeFilterCount
}) => {
  const ageOptions: Array<{ id: AgeFilter; label: string }> = [
    { id: 'all', label: t.filterAll },
    { id: '7-9', label: '7–9 ani' },
    { id: '10-11', label: '10–11 ani' },
    { id: '12-14', label: '12–14 ani' }
  ];

  const categoryOptions: Array<{ id: Category | 'all'; label: string }> = [
    { id: 'all', label: t.filterAll },
    { id: 'logic', label: t.categories.logic },
    { id: 'observation', label: t.categories.observation },
    { id: 'geometry', label: t.categories.geometry },
    { id: 'parity', label: t.categories.parity },
    { id: 'arithmetic', label: t.categories.arithmetic },
    { id: 'motion', label: t.categories.motion },
    { id: 'time', label: t.categories.time }
  ];

  const difficultyOptions: Array<{ id: Difficulty | 'all'; label: string }> = [
    { id: 'all', label: t.filterAll },
    { id: 'easy', label: t.difficulties.easy },
    { id: 'medium', label: t.difficulties.medium },
    { id: 'challenging', label: t.difficulties.challenging }
  ];

  return (
    <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Filter groups */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Age Group */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {t.filterAge}
            </span>
            <div className="inline-flex p-1 bg-slate-100/90 rounded-xl">
              {ageOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectAge(opt.id)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedAge === opt.id
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Dropdown/Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {t.filterCategory}
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value as Category | 'all')}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-100 border border-transparent rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown/Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {t.filterDifficulty}
            </span>
            <select
              value={selectedDifficulty}
              onChange={(e) => onSelectDifficulty(e.target.value as Difficulty | 'all')}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-100 border border-transparent rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {difficultyOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset filters button */}
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="self-start lg:self-center inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetFilters}</span>
          </button>
        )}
      </div>
    </div>
  );
};

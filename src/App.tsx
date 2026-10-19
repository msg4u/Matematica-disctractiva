/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, AgeFilter, Category, Difficulty, UserProgress } from './types';
import { translations } from './translations';
import { PROBLEMS, checkAgeIntersection } from './data/problems';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Filters } from './components/Filters';
import { ProblemCard } from './components/ProblemCard';
import { ProblemDetailView } from './components/ProblemDetailView';
import { Footer } from './components/Footer';

const STORAGE_LANG_KEY = 'matematica_distractiva_lang';
const STORAGE_PROGRESS_KEY = 'matematica_distractiva_progress';

export default function App() {
  // Language state with localStorage fallback
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'en' || saved === 'ro') return saved;
    } catch {
      // localStorage unavailable
    }
    return 'ro';
  });

  // User progress with localStorage fallback
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          solvedProblems: Array.isArray(parsed.solvedProblems) ? parsed.solvedProblems : [],
          viewedSolutions: Array.isArray(parsed.viewedSolutions) ? parsed.viewedSolutions : []
        };
      }
    } catch {
      // localStorage unavailable
    }
    return { solvedProblems: [], viewedSolutions: [] };
  });

  // Navigation state: null = home list view, number = active problem
  const [activeProblemId, setActiveProblemId] = useState<number | null>(null);

  // Filter states
  const [selectedAge, setSelectedAge] = useState<AgeFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  // Sync lang changes to localStorage
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, newLang);
    } catch {
      // silent
    }
  };

  // Sync progress to localStorage
  const handleSolveProblem = (problemId: number) => {
    setProgress((prev) => {
      if (prev.solvedProblems.includes(problemId)) return prev;
      const next = {
        ...prev,
        solvedProblems: [...prev.solvedProblems, problemId]
      };
      try {
        localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(next));
      } catch {
        // silent
      }
      return next;
    });
  };

  const handleMarkViewed = (problemId: number) => {
    setProgress((prev) => {
      if (prev.viewedSolutions.includes(problemId)) return prev;
      const next = {
        ...prev,
        viewedSolutions: [...prev.viewedSolutions, problemId]
      };
      try {
        localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(next));
      } catch {
        // silent
      }
      return next;
    });
  };

  // Filter calculations
  const activeFilterCount =
    (selectedAge !== 'all' ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedDifficulty !== 'all' ? 1 : 0);

  const resetFilters = () => {
    setSelectedAge('all');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
  };

  const filteredProblems = PROBLEMS.filter((p) => {
    const ageMatches = checkAgeIntersection(p, selectedAge);
    const categoryMatches = selectedCategory === 'all' || p.category === selectedCategory;
    const difficultyMatches = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
    return ageMatches && categoryMatches && difficultyMatches;
  });

  const t = translations[lang].ui;
  const problemsDict = translations[lang].problems;

  const scrollToChallenges = () => {
    setActiveProblemId(null);
    setTimeout(() => {
      const el = document.getElementById('challenges');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const activeProblemMeta = PROBLEMS.find((p) => p.id === activeProblemId);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800">
      <Header
        lang={lang}
        onLanguageChange={handleLanguageChange}
        t={t}
        solvedCount={progress.solvedProblems.length}
        totalCount={PROBLEMS.length}
        onNavigateHome={() => setActiveProblemId(null)}
        activeProblemId={activeProblemId}
      />

      <main className="flex-1">
        {activeProblemId === null || !activeProblemMeta ? (
          // Main Home View
          <div>
            <Hero
              t={t}
              solvedCount={progress.solvedProblems.length}
              totalCount={PROBLEMS.length}
              viewedCount={progress.viewedSolutions.length}
              onStartAdventure={scrollToChallenges}
            />

            <section id="challenges" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Filter Bar */}
              <Filters
                t={t}
                selectedAge={selectedAge}
                onSelectAge={setSelectedAge}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedDifficulty={selectedDifficulty}
                onSelectDifficulty={setSelectedDifficulty}
                onReset={resetFilters}
                activeFilterCount={activeFilterCount}
              />

              {/* Problem Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProblems.map((meta) => {
                  const probData = problemsDict[meta.id];
                  const isSolved = progress.solvedProblems.includes(meta.id);
                  const isViewed = progress.viewedSolutions.includes(meta.id);

                  return (
                    <ProblemCard
                      key={meta.id}
                      meta={meta}
                      data={probData}
                      t={t}
                      isSolved={isSolved}
                      isViewed={isViewed}
                      onSelect={(id) => {
                        setActiveProblemId(id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                })}
              </div>

              {filteredProblems.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                  <p className="text-slate-600 font-medium">
                    Nicio problemă nu corespunde filtrelor selectate.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
                  >
                    {t.resetFilters}
                  </button>
                </div>
              )}
            </section>
          </div>
        ) : (
          // Single Problem Dedicated View
          <ProblemDetailView
            meta={activeProblemMeta}
            data={problemsDict[activeProblemMeta.id]}
            t={t}
            isSolved={progress.solvedProblems.includes(activeProblemMeta.id)}
            isViewed={progress.viewedSolutions.includes(activeProblemMeta.id)}
            onSolve={() => handleSolveProblem(activeProblemMeta.id)}
            onMarkViewed={() => handleMarkViewed(activeProblemMeta.id)}
            onBack={() => setActiveProblemId(null)}
            onPrev={() => {
              const prevId = activeProblemMeta.id > 1 ? activeProblemMeta.id - 1 : 1;
              setActiveProblemId(prevId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNext={() => {
              const nextId = activeProblemMeta.id < 10 ? activeProblemMeta.id + 1 : 10;
              setActiveProblemId(nextId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            hasPrev={activeProblemMeta.id > 1}
            hasNext={activeProblemMeta.id < 10}
          />
        )}
      </main>

      <Footer t={t} />
    </div>
  );
}

import React, { useState } from 'react';
import { UiTranslations } from '../../translations';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface TokenParityGridActivityProps {
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

// 4x4 boolean grid: true = token is present, false = token is removed
type Grid = boolean[][];

export const TokenParityGridActivity: React.FC<TokenParityGridActivityProps> = ({
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  // Required solution configuration:
  // Removed at (1,1), (1,2), (2,1), (2,3), (3,2), (3,3) (1-indexed)
  // 0-indexed: [0,0], [0,1], [1,0], [1,2], [2,1], [2,2]
  const createSolutionGrid = (): Grid => {
    const grid: Grid = Array(4).fill(null).map(() => Array(4).fill(true));
    const toRemove = [
      [0, 0], [0, 1],
      [1, 0], [1, 2],
      [2, 1], [2, 2]
    ];
    toRemove.forEach(([r, c]) => {
      grid[r][c] = false;
    });
    return grid;
  };

  const createInitialGrid = (): Grid => {
    return Array(4).fill(null).map(() => Array(4).fill(true));
  };

  const [grid, setGrid] = useState<Grid>(
    isSolutionMode ? createSolutionGrid() : createInitialGrid()
  );

  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const toggleToken = (r: number, c: number) => {
    if (isSolutionMode) return;
    const isCurrentlyPresent = grid[r][c];
    // If removing, check if already 6 removed
    const removedCount = 16 - grid.flat().filter(Boolean).length;
    if (isCurrentlyPresent && removedCount >= 6) {
      // already 6 removed, don't allow removing more
      return;
    }

    const next = grid.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? !cell : cell))
    );
    setGrid(next);
    setFeedback(null);
  };

  const reset = () => {
    setGrid(createInitialGrid());
    setFeedback(null);
  };

  const rowTotals = grid.map((row) => row.filter(Boolean).length);
  const colTotals = [0, 1, 2, 3].map((c) => grid.reduce((acc, row) => acc + (row[c] ? 1 : 0), 0));
  const removedCount = 16 - grid.flat().filter(Boolean).length;

  const rowsAllEven = rowTotals.every((total) => total % 2 === 0);
  const colsAllEven = colTotals.every((total) => total % 2 === 0);
  const isWinning = removedCount === 6 && rowsAllEven && colsAllEven;

  const handleVerify = () => {
    if (isWinning) {
      setFeedback({ isCorrect: true, text: t.feedbackCorrect });
      if (onSuccess) onSuccess();
    } else {
      setFeedback({ isCorrect: false, text: t.feedbackWrong });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* 4x4 Grid Visual Area */}
          <div className="md:col-span-7 flex flex-col items-center justify-center">
            <div className="relative inline-block bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
              {/* Column labels on top */}
              <div className="grid grid-cols-5 gap-2.5 mb-2.5 text-center">
                <div className="text-xs font-bold text-slate-400 flex items-center justify-center">
                  R \ C
                </div>
                {[1, 2, 3, 4].map((c) => (
                  <div key={c} className="text-xs font-bold text-slate-500 font-mono">
                    C{c}
                  </div>
                ))}
              </div>

              {/* 4 Rows */}
              {grid.map((row, r) => (
                <div key={r} className="grid grid-cols-5 gap-2.5 mb-2.5 items-center">
                  {/* Row label */}
                  <div className="text-xs font-bold text-slate-500 text-center font-mono">
                    R{r + 1}
                  </div>

                  {/* 4 Cells */}
                  {row.map((isPresent, c) => (
                    <button
                      key={`${r}-${c}`}
                      type="button"
                      onClick={() => toggleToken(r, c)}
                      disabled={isSolutionMode}
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${
                        isPresent
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs scale-100'
                          : 'bg-slate-100 border-2 border-dashed border-slate-300 text-slate-400 opacity-60 scale-95'
                      }`}
                      aria-label={`Rând ${r + 1}, Coloană ${c + 1}: ${isPresent ? 'Jeton prezent' : 'Jeton eliminat'}`}
                    >
                      {isPresent ? (
                        <div className="w-8 h-8 rounded-full border-2 border-amber-200 flex items-center justify-center bg-amber-400 shadow-inner">
                          <span className="w-2.5 h-2.5 rounded-full bg-white opacity-80" />
                        </div>
                      ) : (
                        <span className="text-xs font-mono font-semibold">✕</span>
                      )}
                    </button>
                  ))}
                </div>
              ))}

              {/* Column totals indicator at the bottom */}
              <div className="grid grid-cols-5 gap-2.5 mt-3 pt-3 border-t border-slate-100 text-center items-center">
                <div className="text-[11px] font-semibold text-slate-400">Total C:</div>
                {colTotals.map((tot, idx) => {
                  const isEven = tot % 2 === 0;
                  return (
                    <div
                      key={idx}
                      className={`text-xs py-1 px-1.5 rounded-md font-mono font-bold ${
                        isEven ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {tot} <span className="text-[9px] block font-sans">{isEven ? t.parityEven : t.parityOdd}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <span className="text-xs text-slate-500 mt-2 text-center">
              Apasă pe un jeton pentru a-l elimina sau reintroduce în grilă.
            </span>
          </div>

          {/* Stats and Row Totals */}
          <div className="md:col-span-5 flex flex-col gap-3">
            {/* Elimination counter */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500">{t.parityTokensRemoved}</div>
                <div className="text-[11px] text-slate-400">{t.parityGoal}</div>
              </div>
              <div className="text-2xl font-black text-indigo-700 font-mono tabular-nums">
                {removedCount} / 6
              </div>
            </div>

            {/* Row totals summary */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Totaluri pe rânduri:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {rowTotals.map((tot, idx) => {
                  const isEven = tot % 2 === 0;
                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                        isEven ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'
                      }`}
                    >
                      <span className="font-medium">Rândul {idx + 1}:</span>
                      <span className="font-mono font-bold">
                        {tot} ({isEven ? t.parityEven : t.parityOdd})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {!isSolutionMode && (
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleVerify}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                >
                  {t.checkAnswer}
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="p-2 text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
                  aria-label={t.resetProblem}
                  title={t.resetProblem}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            )}

            {feedback && (
              <div
                className={`text-xs p-2.5 rounded-lg flex items-center gap-1.5 font-medium ${
                  feedback.isCorrect
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {feedback.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {feedback.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

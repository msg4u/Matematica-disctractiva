import React, { useState } from 'react';
import { UiTranslations } from '../../translations';
import { CheckCircle2, RotateCcw, Undo2, ArrowRight } from 'lucide-react';

interface ThreePilesActivityProps {
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

type PileKey = 'A' | 'B' | 'C';

interface MoveRecord {
  from: PileKey;
  to: PileKey;
  amount: number;
  resultingState: { A: number; B: number; C: number };
}

export const ThreePilesActivity: React.FC<ThreePilesActivityProps> = ({
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  const initialPiles = { A: 11, B: 7, C: 6 };

  const [piles, setPiles] = useState<{ A: number; B: number; C: number }>(initialPiles);
  const [selectedSource, setSelectedSource] = useState<PileKey | null>(null);
  const [selectedDest, setSelectedDest] = useState<PileKey | null>(null);
  const [moveHistory, setMoveHistory] = useState<MoveRecord[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const reset = () => {
    setPiles(initialPiles);
    setSelectedSource(null);
    setSelectedDest(null);
    setMoveHistory([]);
    setFeedback(null);
  };

  const undo = () => {
    if (moveHistory.length === 0) return;
    const nextHistory = moveHistory.slice(0, -1);
    if (nextHistory.length === 0) {
      setPiles(initialPiles);
    } else {
      setPiles(nextHistory[nextHistory.length - 1].resultingState);
    }
    setMoveHistory(nextHistory);
    setSelectedSource(null);
    setSelectedDest(null);
    setFeedback(null);
  };

  const transferAmount =
    selectedSource && selectedDest && selectedSource !== selectedDest
      ? piles[selectedDest]
      : 0;

  const canExecute =
    selectedSource &&
    selectedDest &&
    selectedSource !== selectedDest &&
    transferAmount > 0 &&
    piles[selectedSource] >= transferAmount;

  const handleExecuteMove = () => {
    if (!canExecute || !selectedSource || !selectedDest) return;

    const nextPiles = {
      ...piles,
      [selectedSource]: piles[selectedSource] - transferAmount,
      [selectedDest]: piles[selectedDest] + transferAmount
    };

    const newRecord: MoveRecord = {
      from: selectedSource,
      to: selectedDest,
      amount: transferAmount,
      resultingState: nextPiles
    };

    const nextHistory = [...moveHistory, newRecord];
    setPiles(nextPiles);
    setMoveHistory(nextHistory);
    setSelectedSource(null);
    setSelectedDest(null);

    // Check win condition
    if (nextHistory.length === 3 && nextPiles.A === 8 && nextPiles.B === 8 && nextPiles.C === 8) {
      setFeedback({ isCorrect: true, text: t.feedbackCorrect });
      if (onSuccess) onSuccess();
    } else if (nextHistory.length >= 3 && (nextPiles.A !== 8 || nextPiles.B !== 8 || nextPiles.C !== 8)) {
      setFeedback({ isCorrect: false, text: 'Ai atins 3 mutări, dar grămezile nu sunt toate egale cu 8. Reîncearcă!' });
    }
  };

  // Solution table data
  const solutionSteps = [
    { move: 'Start', desc: 'Stare inițială', state: { A: 11, B: 7, C: 6 } },
    { move: '1. A → B', desc: 'Transferă 7 jetoane (cât are B)', state: { A: 4, B: 14, C: 6 } },
    { move: '2. B → C', desc: 'Transferă 6 jetoane (cât are C)', state: { A: 4, B: 8, C: 12 } },
    { move: '3. C → A', desc: 'Transferă 4 jetoane (cât are A)', state: { A: 8, B: 8, C: 8 } }
  ];

  if (isSolutionMode) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Tabelul stărilor succesive în cele 3 mutări:
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left bg-white rounded-xl border border-slate-200 shadow-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="p-3">Mutare</th>
                  <th className="p-3">Explicație</th>
                  <th className="p-3 text-center">Grămada A</th>
                  <th className="p-3 text-center">Grămada B</th>
                  <th className="p-3 text-center">Grămada C</th>
                  <th className="p-3 text-center">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {solutionSteps.map((step, idx) => (
                  <tr key={idx} className={idx === 3 ? 'bg-emerald-50/70 font-bold text-emerald-950' : ''}>
                    <td className="p-3 font-semibold font-sans">{step.move}</td>
                    <td className="p-3 font-sans text-slate-600">{step.desc}</td>
                    <td className="p-3 text-center text-indigo-700">{step.state.A}</td>
                    <td className="p-3 text-center text-indigo-700">{step.state.B}</td>
                    <td className="p-3 text-center text-indigo-700">{step.state.C}</td>
                    <td className="p-3 text-center text-slate-400">24</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 leading-relaxed">
            <strong>Observație cheie:</strong> La fiecare pas, grămada destinație se dublează (primește exact atâtea jetoane câte are deja). Totalul celor trei grămezi rămâne invariant: 11 + 7 + 6 = 24. La final, 24 ÷ 3 = 8 în fiecare grămadă.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
        {/* Visual Piles */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {(['A', 'B', 'C'] as PileKey[]).map((pileKey) => {
            const count = piles[pileKey];
            const isSource = selectedSource === pileKey;
            const isDest = selectedDest === pileKey;

            return (
              <div
                key={pileKey}
                className={`p-3 sm:p-4 rounded-2xl border transition-all flex flex-col items-center justify-between min-h-[170px] ${
                  isSource
                    ? 'bg-amber-100/70 border-amber-400 ring-2 ring-amber-300'
                    : isDest
                    ? 'bg-indigo-100/70 border-indigo-400 ring-2 ring-indigo-300'
                    : count === 8
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-center w-full">
                  <div className="text-xs font-bold text-slate-500 uppercase">Grămada {pileKey}</div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono my-1 tabular-nums">
                    {count}
                  </div>
                  <div className="text-[10px] text-slate-400">jetoane</div>
                </div>

                {/* Visual token stack illustration */}
                <div className="flex flex-wrap-reverse gap-1 justify-center max-w-[100px] my-2">
                  {Array.from({ length: Math.min(count, 14) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-600 shadow-2xs"
                    />
                  ))}
                  {count > 14 && <span className="text-[10px] font-bold text-slate-500 self-center">+{count - 14}</span>}
                </div>

                {/* Selection buttons */}
                <div className="grid grid-cols-2 gap-1.5 w-full mt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSource(isSource ? null : pileKey)}
                    className={`py-1 text-[11px] font-semibold rounded-md border transition-colors ${
                      isSource
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Sursă
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDest(isDest ? null : pileKey)}
                    className={`py-1 text-[11px] font-semibold rounded-md border transition-colors ${
                      isDest
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Dest.
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transfer preview & Action */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <span>Mutări:</span>
              <span className="font-bold font-mono text-indigo-700 text-sm tabular-nums">
                {moveHistory.length} / 3
              </span>
            </div>

            {selectedSource && selectedDest && selectedSource !== selectedDest ? (
              <div className="text-slate-700 flex items-center gap-1 font-medium">
                <span>Transferă {transferAmount} din {selectedSource} în {selectedDest}</span>
                <span className="text-[10px] text-slate-400">({selectedDest} devine {piles[selectedDest] * 2})</span>
              </div>
            ) : (
              <span className="text-slate-400">Selectează o sursă și o destinație diferite</span>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={undo}
                disabled={moveHistory.length === 0}
                className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <Undo2 className="w-3.5 h-3.5" />
                {t.pilesUndo}
              </button>
              <button
                type="button"
                onClick={reset}
                className="p-1 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title={t.pilesReset}
                aria-label={t.pilesReset}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExecuteMove}
            disabled={!canExecute || moveHistory.length >= 3}
            className="w-full py-2.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <span>{t.pilesMoveBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {feedback && (
          <div
            className={`mt-3 text-xs p-3 rounded-xl flex items-center gap-1.5 font-medium ${
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
  );
};

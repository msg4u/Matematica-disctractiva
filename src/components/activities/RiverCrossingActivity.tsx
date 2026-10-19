import React, { useState } from 'react';
import { UiTranslations } from '../../translations';
import { CheckCircle2, RotateCcw, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

interface RiverCrossingActivityProps {
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

type Item = 'farmer' | 'wolf' | 'goat' | 'cabbage';
type Bank = 'left' | 'right';

export const RiverCrossingActivity: React.FC<RiverCrossingActivityProps> = ({
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  // Solution steps sequence (bank positions after each step)
  // Step 0: start. All on left bank. Boat on left.
  const solutionTimeline = [
    {
      step: 0,
      left: ['farmer', 'wolf', 'goat', 'cabbage'] as Item[],
      right: [] as Item[],
      boatBank: 'left' as Bank,
      descRo: 'Toți sunt pe malul stâng inițial.',
      descEn: 'Everyone is on the left bank initially.'
    },
    {
      step: 1,
      left: ['wolf', 'cabbage'] as Item[],
      right: ['farmer', 'goat'] as Item[],
      boatBank: 'right' as Bank,
      descRo: '1. Omul trece capra pe malul drept. Lupul și varza stau pașnic pe malul stâng.',
      descEn: '1. The farmer takes the goat to the right bank. Wolf and cabbage stay safely.'
    },
    {
      step: 2,
      left: ['farmer', 'wolf', 'cabbage'] as Item[],
      right: ['goat'] as Item[],
      boatBank: 'left' as Bank,
      descRo: '2. Omul se întoarce singur cu barca pe malul stâng.',
      descEn: '2. The farmer returns alone to the left bank.'
    },
    {
      step: 3,
      left: ['cabbage'] as Item[],
      right: ['farmer', 'wolf', 'goat'] as Item[],
      boatBank: 'right' as Bank,
      descRo: '3. Omul duce lupul pe malul drept.',
      descEn: '3. The farmer carries the wolf to the right bank.'
    },
    {
      step: 4,
      left: ['farmer', 'goat', 'cabbage'] as Item[],
      right: ['wolf'] as Item[],
      boatBank: 'left' as Bank,
      descRo: '4. Omul ia capra înapoi pe malul stâng (lupul nu poate rămâne singur cu capra).',
      descEn: '4. The farmer brings the goat back to the left bank.'
    },
    {
      step: 5,
      left: ['goat'] as Item[],
      right: ['farmer', 'wolf', 'cabbage'] as Item[],
      boatBank: 'right' as Bank,
      descRo: '5. Omul lasă capra și duce varza pe malul drept.',
      descEn: '5. The farmer leaves the goat and takes the cabbage to the right bank.'
    },
    {
      step: 6,
      left: ['farmer', 'goat'] as Item[],
      right: ['wolf', 'cabbage'] as Item[],
      boatBank: 'left' as Bank,
      descRo: '6. Omul se întoarce singur pe malul stâng.',
      descEn: '6. The farmer returns alone to the left bank.'
    },
    {
      step: 7,
      left: [] as Item[],
      right: ['farmer', 'wolf', 'goat', 'cabbage'] as Item[],
      boatBank: 'right' as Bank,
      descRo: '7. Omul trece capra pe malul drept. Toți au traversat râul în deplină siguranță!',
      descEn: '7. The farmer carries the goat to the right bank. All four are safely across!'
    }
  ];

  // Interactive state
  const [positions, setPositions] = useState<Record<Item, Bank>>({
    farmer: 'left',
    wolf: 'left',
    goat: 'left',
    cabbage: 'left'
  });

  const [boatBank, setBoatBank] = useState<Bank>('left');
  const [passenger, setPassenger] = useState<Item | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ positions: Record<Item, Bank>; boatBank: Bank }>>([]);
  const [currentSolutionStep, setCurrentSolutionStep] = useState<number>(0);

  const resetInteractive = () => {
    setPositions({
      farmer: 'left',
      wolf: 'left',
      goat: 'left',
      cabbage: 'left'
    });
    setBoatBank('left');
    setPassenger(null);
    setWarning(null);
    setHistory([]);
  };

  const handleSelectPassenger = (item: Item) => {
    if (isSolutionMode) return;
    if (positions[item] !== boatBank) return; // Must be on same bank as boat
    if (passenger === item) {
      setPassenger(null);
    } else {
      setPassenger(item);
    }
  };

  const checkBankDanger = (newPositions: Record<Item, Bank>): string | null => {
    // Check both banks
    for (const bank of ['left', 'right'] as Bank[]) {
      const itemsOnBank = (Object.keys(newPositions) as Item[]).filter(
        (it) => newPositions[it] === bank
      );
      const hasFarmer = itemsOnBank.includes('farmer');
      if (!hasFarmer) {
        if (itemsOnBank.includes('wolf') && itemsOnBank.includes('goat')) {
          return t.riverInvalidDangerWolf;
        }
        if (itemsOnBank.includes('goat') && itemsOnBank.includes('cabbage')) {
          return t.riverInvalidDangerCabbage;
        }
      }
    }
    return null;
  };

  const handleCross = () => {
    if (isSolutionMode) return;
    const destBank: Bank = boatBank === 'left' ? 'right' : 'left';

    // Farmer and passenger move across
    const nextPositions = { ...positions, farmer: destBank };
    if (passenger) {
      nextPositions[passenger] = destBank;
    }

    // Save previous state to history
    setHistory([...history, { positions, boatBank }]);

    // Check danger
    const danger = checkBankDanger(nextPositions);
    if (danger) {
      setWarning(danger);
      setPositions(nextPositions);
      setBoatBank(destBank);
      setPassenger(null);
      return;
    }

    setWarning(null);
    setPositions(nextPositions);
    setBoatBank(destBank);
    setPassenger(null);

    // Check win condition: all 4 on right bank
    const allOnRight = Object.values(nextPositions).every((b) => b === 'right');
    if (allOnRight) {
      if (onSuccess) onSuccess();
    }
  };

  const undoMove = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setPositions(prev.positions);
    setBoatBank(prev.boatBank);
    setPassenger(null);
    setWarning(null);
    setHistory(history.slice(0, -1));
  };

  // Helper icons / styling for characters
  const renderItemVisual = (item: Item, inBoat = false) => {
    switch (item) {
      case 'farmer':
        return (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-200 border-2 border-amber-600 flex items-center justify-center text-lg shadow-xs">
              👨‍🌾
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-0.5">{t.riverFarmer}</span>
          </div>
        );
      case 'wolf':
        return (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-slate-600 flex items-center justify-center text-lg shadow-xs">
              🐺
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-0.5">{t.riverWolf}</span>
          </div>
        );
      case 'goat':
        return (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-stone-100 border-2 border-stone-500 flex items-center justify-center text-lg shadow-xs">
              🐐
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-0.5">{t.riverGoat}</span>
          </div>
        );
      case 'cabbage':
        return (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-lg shadow-xs">
              🥬
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-0.5">{t.riverCabbage}</span>
          </div>
        );
    }
  };

  if (isSolutionMode) {
    const activeStepData = solutionTimeline[currentSolutionStep];

    return (
      <div className="flex flex-col gap-5 w-full">
        {/* Step-by-step Solution Playback */}
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pasul {currentSolutionStep} din {solutionTimeline.length - 1}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentSolutionStep(Math.max(0, currentSolutionStep - 1))}
                disabled={currentSolutionStep === 0}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                {t.riverStepPrev}
              </button>
              <button
                type="button"
                onClick={() => setCurrentSolutionStep(Math.min(solutionTimeline.length - 1, currentSolutionStep + 1))}
                disabled={currentSolutionStep === solutionTimeline.length - 1}
                className="px-2.5 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-lg disabled:opacity-40 hover:bg-indigo-700 transition-colors flex items-center gap-1"
              >
                {t.riverStepNext}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSolutionStep(0)}
                className="p-1.5 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                title={t.riverReplay}
                aria-label={t.riverReplay}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* River Visual Stage */}
          <div className="relative min-h-[220px] bg-gradient-to-r from-emerald-100 via-sky-200 to-emerald-100 rounded-2xl border border-sky-300 p-4 overflow-hidden flex items-stretch">
            {/* Left Bank */}
            <div className="w-1/3 bg-emerald-600/10 border-r-2 border-emerald-700/30 p-2 sm:p-3 rounded-l-xl flex flex-col items-center">
              <div className="text-xs font-bold text-emerald-900 mb-2">{t.riverLeftBank}</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {activeStepData.left.map((it) => (
                  <div key={it} className="p-1 bg-white/80 rounded-xl shadow-xs">
                    {renderItemVisual(it)}
                  </div>
                ))}
              </div>
            </div>

            {/* River & Boat */}
            <div className="w-1/3 relative flex items-center justify-center px-2">
              <div
                className={`transition-all duration-500 ease-out p-2 bg-amber-800/90 text-white rounded-xl shadow-md border-2 border-amber-950 flex items-center justify-center gap-1.5 ${
                  activeStepData.boatBank === 'left' ? '-translate-x-6' : 'translate-x-6'
                }`}
              >
                <span className="text-xs font-bold">🛶</span>
              </div>
            </div>

            {/* Right Bank */}
            <div className="w-1/3 bg-emerald-600/10 border-l-2 border-emerald-700/30 p-2 sm:p-3 rounded-r-xl flex flex-col items-center">
              <div className="text-xs font-bold text-emerald-900 mb-2">{t.riverRightBank}</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {activeStepData.right.map((it) => (
                  <div key={it} className="p-1 bg-white/80 rounded-xl shadow-xs">
                    {renderItemVisual(it)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-800">
            {activeStepData.descRo}
          </div>
        </div>
      </div>
    );
  }

  // Interactive Mode
  const leftBankItems = (['farmer', 'wolf', 'goat', 'cabbage'] as Item[]).filter(
    (it) => positions[it] === 'left' && it !== passenger
  );
  const rightBankItems = (['farmer', 'wolf', 'goat', 'cabbage'] as Item[]).filter(
    (it) => positions[it] === 'right' && it !== passenger
  );
  const isWinning = Object.values(positions).every((b) => b === 'right');

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
        {/* River visual board */}
        <div className="relative min-h-[220px] bg-gradient-to-r from-emerald-100 via-sky-200 to-emerald-100 rounded-2xl border border-sky-300 p-3 sm:p-4 overflow-hidden flex items-stretch">
          {/* Left Bank */}
          <div className="w-1/3 bg-emerald-600/10 border-r-2 border-emerald-700/30 p-2 sm:p-3 rounded-l-xl flex flex-col items-center">
            <div className="text-xs font-bold text-emerald-900 mb-2">{t.riverLeftBank}</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {leftBankItems.map((it) => (
                <button
                  key={it}
                  type="button"
                  onClick={() => handleSelectPassenger(it)}
                  disabled={it === 'farmer' || boatBank !== 'left'}
                  className={`p-1.5 bg-white/90 rounded-xl shadow-xs transition-transform cursor-pointer border ${
                    passenger === it
                      ? 'ring-2 ring-indigo-500 scale-105 border-indigo-400'
                      : boatBank === 'left' && it !== 'farmer'
                      ? 'hover:scale-105 border-slate-200'
                      : 'opacity-85 border-slate-200'
                  }`}
                  aria-label={`Selectează ${it} pentru barcă`}
                >
                  {renderItemVisual(it)}
                </button>
              ))}
            </div>
          </div>

          {/* River with boat */}
          <div className="w-1/3 relative flex flex-col items-center justify-center px-1">
            <div
              className={`transition-all duration-300 bg-amber-900/90 text-white rounded-2xl p-2.5 shadow-md border-2 border-amber-950 flex flex-col items-center ${
                boatBank === 'left' ? 'self-start ml-1' : 'self-end mr-1'
              }`}
            >
              <div className="text-[10px] font-bold text-amber-200 uppercase mb-1">
                {t.riverBoat}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="p-1 bg-white/20 rounded-lg">{renderItemVisual('farmer', true)}</div>
                {passenger ? (
                  <button
                    type="button"
                    onClick={() => setPassenger(null)}
                    className="p-1 bg-white/30 rounded-lg hover:bg-white/40 cursor-pointer"
                    title="Scoate din barcă"
                  >
                    {renderItemVisual(passenger, true)}
                  </button>
                ) : (
                  <div className="w-10 h-10 border-2 border-dashed border-amber-300/60 rounded-xl flex items-center justify-center text-[10px] text-amber-200 text-center leading-tight">
                    Loc liber
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCross}
              disabled={!!warning}
              className="mt-3 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm flex items-center gap-1 transition-colors disabled:opacity-40"
            >
              {boatBank === 'left' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              {t.riverCross}
            </button>
          </div>

          {/* Right Bank */}
          <div className="w-1/3 bg-emerald-600/10 border-l-2 border-emerald-700/30 p-2 sm:p-3 rounded-r-xl flex flex-col items-center">
            <div className="text-xs font-bold text-emerald-900 mb-2">{t.riverRightBank}</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {rightBankItems.map((it) => (
                <button
                  key={it}
                  type="button"
                  onClick={() => handleSelectPassenger(it)}
                  disabled={it === 'farmer' || boatBank !== 'right'}
                  className={`p-1.5 bg-white/90 rounded-xl shadow-xs transition-transform cursor-pointer border ${
                    passenger === it
                      ? 'ring-2 ring-indigo-500 scale-105 border-indigo-400'
                      : boatBank === 'right' && it !== 'farmer'
                      ? 'hover:scale-105 border-slate-200'
                      : 'opacity-85 border-slate-200'
                  }`}
                  aria-label={`Selectează ${it} pentru barcă`}
                >
                  {renderItemVisual(it)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Warning or Success message */}
        {warning && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between text-xs text-amber-900 font-medium">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{warning}</span>
            </div>
            <button
              type="button"
              onClick={undoMove}
              className="px-2.5 py-1 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
            >
              Anulează
            </button>
          </div>
        )}

        {isWinning && !warning && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2 text-xs text-emerald-900 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.feedbackCorrect} Toți au ajuns pe celălalt mal!</span>
          </div>
        )}

        {/* Controls footer */}
        <div className="mt-4 pt-4 border-t border-amber-200/50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Apasă pe lup, capră sau varză pentru a-l urca în barcă, apoi pe „Traversează râul”.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={undoMove}
              disabled={history.length === 0}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40"
            >
              Înapoi
            </button>
            <button
              type="button"
              onClick={resetInteractive}
              className="p-1.5 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              title={t.resetProblem}
              aria-label={t.resetProblem}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

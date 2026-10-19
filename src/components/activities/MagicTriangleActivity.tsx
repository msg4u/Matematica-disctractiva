import React, { useState } from 'react';
import { UiTranslations } from '../../translations';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface MagicTriangleActivityProps {
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

type SlotKey = 'L1' | 'L2' | 'B1' | 'B2' | 'R1' | 'R2';

export const MagicTriangleActivity: React.FC<MagicTriangleActivityProps> = ({
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  // Solution configuration: L1=5, L2=9, B1=4, B2=8, R1=6, R2=7
  const solutionSlots: Record<SlotKey, number | null> = {
    L1: 5,
    L2: 9,
    B1: 4,
    B2: 8,
    R1: 6,
    R2: 7
  };

  const initialSlots: Record<SlotKey, number | null> = {
    L1: null,
    L2: null,
    B1: null,
    B2: null,
    R1: null,
    R2: null
  };

  const [slots, setSlots] = useState<Record<SlotKey, number | null>>(
    isSolutionMode ? solutionSlots : initialSlots
  );

  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [activeSide, setActiveSide] = useState<'all' | 'left' | 'base' | 'right'>('all');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const allNumbers = [4, 5, 6, 7, 8, 9];
  const placedNumbers = Object.values(slots).filter((v): v is number => v !== null);
  const availableNumbers = allNumbers.filter((n) => !placedNumbers.includes(n));

  const handleSlotClick = (slotKey: SlotKey) => {
    if (isSolutionMode) return;

    if (selectedNumber !== null) {
      // Place selected number
      setSlots({ ...slots, [slotKey]: selectedNumber });
      setSelectedNumber(null);
      setFeedback(null);
    } else if (slots[slotKey] !== null) {
      // Remove number from slot
      setSlots({ ...slots, [slotKey]: null });
      setFeedback(null);
    }
  };

  const reset = () => {
    setSlots(initialSlots);
    setSelectedNumber(null);
    setFeedback(null);
    setActiveSide('all');
  };

  // Fixed vertices:
  // V1 (Top) = 1
  // V2 (Bottom-Left) = 2
  // V3 (Bottom-Right) = 3
  const leftSum = 1 + (slots.L1 || 0) + (slots.L2 || 0) + 2;
  const baseSum = 2 + (slots.B1 || 0) + (slots.B2 || 0) + 3;
  const rightSum = 3 + (slots.R1 || 0) + (slots.R2 || 0) + 1;

  const allSlotsFilled = Object.values(slots).every((val) => val !== null);
  const isWinning = allSlotsFilled && leftSum === 17 && baseSum === 17 && rightSum === 17;

  const handleVerify = () => {
    if (isWinning) {
      setFeedback({ isCorrect: true, text: t.feedbackCorrect });
      if (onSuccess) onSuccess();
    } else {
      setFeedback({ isCorrect: false, text: t.feedbackWrong });
    }
  };

  // SVG Coordinates for equilateral triangle (360x340)
  // V1 Top: (180, 45)
  // V2 Bottom-Left: (60, 290)
  // V3 Bottom-Right: (300, 290)
  // Left side: between V1 and V2
  // L1: ~ 1/3 down: (140, 127)
  // L2: ~ 2/3 down: (100, 208)
  // Base side: between V2 and V3
  // B1: ~ 1/3 across: (140, 290)
  // B2: ~ 2/3 across: (220, 290)
  // Right side: between V3 and V1
  // R1: ~ 1/3 up: (260, 208)
  // R2: ~ 2/3 up: (220, 127)

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Magic Triangle SVG */}
          <div className="md:col-span-7 flex flex-col items-center justify-center">
            <svg
              viewBox="0 0 360 340"
              className="w-full max-w-[360px] aspect-square rounded-2xl bg-white border border-slate-200 shadow-sm"
              role="img"
              aria-label="Triunghiul Magic cu poziții numerice"
            >
              {/* Triangle side lines */}
              {/* Left side */}
              <line
                x1="180"
                y1="45"
                x2="60"
                y2="290"
                stroke={activeSide === 'left' ? '#4F46E5' : '#CBD5E1'}
                strokeWidth={activeSide === 'left' ? '6' : '3'}
                strokeLinecap="round"
              />
              {/* Base side */}
              <line
                x1="60"
                y1="290"
                x2="300"
                y2="290"
                stroke={activeSide === 'base' ? '#059669' : '#CBD5E1'}
                strokeWidth={activeSide === 'base' ? '6' : '3'}
                strokeLinecap="round"
              />
              {/* Right side */}
              <line
                x1="300"
                y1="290"
                x2="180"
                y2="45"
                stroke={activeSide === 'right' ? '#EA580C' : '#CBD5E1'}
                strokeWidth={activeSide === 'right' ? '6' : '3'}
                strokeLinecap="round"
              />

              {/* Fixed Vertex 1 (Top) */}
              <g>
                <circle cx="180" cy="45" r="20" fill="#1E1B4B" stroke="#4338CA" strokeWidth="2.5" />
                <text x="180" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
                  1
                </text>
              </g>

              {/* Fixed Vertex 2 (Bottom-Left) */}
              <g>
                <circle cx="60" cy="290" r="20" fill="#1E1B4B" stroke="#4338CA" strokeWidth="2.5" />
                <text x="60" y="297" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
                  2
                </text>
              </g>

              {/* Fixed Vertex 3 (Bottom-Right) */}
              <g>
                <circle cx="300" cy="290" r="20" fill="#1E1B4B" stroke="#4338CA" strokeWidth="2.5" />
                <text x="300" y="297" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
                  3
                </text>
              </g>

              {/* Interactive Slots on Left Side */}
              {[
                { key: 'L1' as SlotKey, x: 140, y: 127 },
                { key: 'L2' as SlotKey, x: 100, y: 208 }
              ].map(({ key, x, y }) => {
                const val = slots[key];
                return (
                  <g
                    key={key}
                    onClick={() => handleSlotClick(key)}
                    className="cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Slot ${key}: ${val ?? 'gol'}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleSlotClick(key);
                    }}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r="18"
                      fill={val !== null ? '#EEF2FF' : '#F8FAFC'}
                      stroke={val !== null ? '#4F46E5' : '#94A3B8'}
                      strokeWidth="2"
                      strokeDasharray={val !== null ? 'none' : '3,3'}
                    />
                    <text
                      x={x}
                      y={y + 6}
                      textAnchor="middle"
                      fill={val !== null ? '#1E1B4B' : '#94A3B8'}
                      fontSize="15"
                      fontWeight="bold"
                    >
                      {val !== null ? val : '?'}
                    </text>
                  </g>
                );
              })}

              {/* Interactive Slots on Base Side */}
              {[
                { key: 'B1' as SlotKey, x: 140, y: 290 },
                { key: 'B2' as SlotKey, x: 220, y: 290 }
              ].map(({ key, x, y }) => {
                const val = slots[key];
                return (
                  <g
                    key={key}
                    onClick={() => handleSlotClick(key)}
                    className="cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Slot ${key}: ${val ?? 'gol'}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleSlotClick(key);
                    }}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r="18"
                      fill={val !== null ? '#ECFDF5' : '#F8FAFC'}
                      stroke={val !== null ? '#059669' : '#94A3B8'}
                      strokeWidth="2"
                      strokeDasharray={val !== null ? 'none' : '3,3'}
                    />
                    <text
                      x={x}
                      y={y + 6}
                      textAnchor="middle"
                      fill={val !== null ? '#064E3B' : '#94A3B8'}
                      fontSize="15"
                      fontWeight="bold"
                    >
                      {val !== null ? val : '?'}
                    </text>
                  </g>
                );
              })}

              {/* Interactive Slots on Right Side */}
              {[
                { key: 'R1' as SlotKey, x: 260, y: 208 },
                { key: 'R2' as SlotKey, x: 220, y: 127 }
              ].map(({ key, x, y }) => {
                const val = slots[key];
                return (
                  <g
                    key={key}
                    onClick={() => handleSlotClick(key)}
                    className="cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Slot ${key}: ${val ?? 'gol'}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleSlotClick(key);
                    }}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r="18"
                      fill={val !== null ? '#FFF7ED' : '#F8FAFC'}
                      stroke={val !== null ? '#EA580C' : '#94A3B8'}
                      strokeWidth="2"
                      strokeDasharray={val !== null ? 'none' : '3,3'}
                    />
                    <text
                      x={x}
                      y={y + 6}
                      textAnchor="middle"
                      fill={val !== null ? '#7C2D12' : '#94A3B8'}
                      fontSize="15"
                      fontWeight="bold"
                    >
                      {val !== null ? val : '?'}
                    </text>
                  </g>
                );
              })}
            </svg>

            <span className="text-xs text-slate-500 mt-2 text-center">
              Alege un număr de mai jos și apasă pe un cerc liber (?) pentru a-l plasa.
            </span>
          </div>

          {/* Number Pool & Side Sums */}
          <div className="md:col-span-5 flex flex-col gap-3">
            {/* Number Pool */}
            {!isSolutionMode && (
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="text-xs font-semibold text-slate-500 mb-2">
                  {t.trianglePool}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allNumbers.map((num) => {
                    const isUsed = placedNumbers.includes(num);
                    const isSelected = selectedNumber === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSelectedNumber(isSelected ? null : num)}
                        disabled={isUsed}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                          isUsed
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300 scale-105'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                        }`}
                        aria-label={`Numărul ${num} ${isUsed ? '(deja folosit)' : isSelected ? '(selectat)' : ''}`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
                {selectedNumber !== null && (
                  <div className="text-[11px] text-indigo-700 font-medium mt-2">
                    Apasă pe un cerc gol din triunghi pentru a plasa numărul {selectedNumber}.
                  </div>
                )}
              </div>
            )}

            {/* Live Side Sums */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col gap-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.triangleSumTarget}
              </div>

              {/* Side A */}
              <div
                onClick={() => setActiveSide(activeSide === 'left' ? 'all' : 'left')}
                className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                  leftSum === 17
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span>{t.triangleSideA}</span>
                <span className="font-mono tabular-nums font-bold">
                  {leftSum} / 17 {leftSum === 17 && '✓'}
                </span>
              </div>

              {/* Side B */}
              <div
                onClick={() => setActiveSide(activeSide === 'base' ? 'all' : 'base')}
                className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                  baseSum === 17
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span>{t.triangleSideB}</span>
                <span className="font-mono tabular-nums font-bold">
                  {baseSum} / 17 {baseSum === 17 && '✓'}
                </span>
              </div>

              {/* Side C */}
              <div
                onClick={() => setActiveSide(activeSide === 'right' ? 'all' : 'right')}
                className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                  rightSum === 17
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span>{t.triangleSideC}</span>
                <span className="font-mono tabular-nums font-bold">
                  {rightSum} / 17 {rightSum === 17 && '✓'}
                </span>
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

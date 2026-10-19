import React, { useState } from 'react';
import { UiTranslations } from '../../translations';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface TenChairsActivityProps {
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

// 12 positions: 4 corners + 2 on each of 4 edges
// North: NW, N1, N2, NE
// East: NE, E1, E2, SE
// South: SE, S1, S2, SW
// West: SW, W1, W2, NW
type PositionKey = 'NW' | 'N1' | 'N2' | 'NE' | 'E1' | 'E2' | 'SE' | 'S1' | 'S2' | 'SW' | 'W1' | 'W2';

export const TenChairsActivity: React.FC<TenChairsActivityProps> = ({
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  // Solution configuration: 2 opposite corners (NW and SE) + 2 chairs on each of the 4 walls = 10 chairs
  const solutionPositions: Record<PositionKey, boolean> = {
    NW: true,
    N1: true,
    N2: true,
    NE: false,
    E1: true,
    E2: true,
    SE: true,
    S1: true,
    S2: true,
    SW: false,
    W1: true,
    W2: true
  };

  const initialPositions: Record<PositionKey, boolean> = {
    NW: false,
    N1: false,
    N2: false,
    NE: false,
    E1: false,
    E2: false,
    SE: false,
    S1: false,
    S2: false,
    SW: false,
    W1: false,
    W2: false
  };

  const [positions, setPositions] = useState<Record<PositionKey, boolean>>(
    isSolutionMode ? solutionPositions : initialPositions
  );

  const [highlightWall, setHighlightWall] = useState<'all' | 'north' | 'east' | 'south' | 'west'>('all');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const togglePosition = (key: PositionKey) => {
    if (isSolutionMode) return;
    const currentCount = Object.values(positions).filter(Boolean).length;
    if (!positions[key] && currentCount >= 10) {
      // Already 10 chairs placed
      return;
    }
    const next = { ...positions, [key]: !positions[key] };
    setPositions(next);
    setFeedback(null);
  };

  const reset = () => {
    setPositions(initialPositions);
    setFeedback(null);
    setHighlightWall('all');
  };

  // Wall counts:
  const northCount = (positions.NW ? 1 : 0) + (positions.N1 ? 1 : 0) + (positions.N2 ? 1 : 0) + (positions.NE ? 1 : 0);
  const eastCount = (positions.NE ? 1 : 0) + (positions.E1 ? 1 : 0) + (positions.E2 ? 1 : 0) + (positions.SE ? 1 : 0);
  const southCount = (positions.SE ? 1 : 0) + (positions.S1 ? 1 : 0) + (positions.S2 ? 1 : 0) + (positions.SW ? 1 : 0);
  const westCount = (positions.SW ? 1 : 0) + (positions.W1 ? 1 : 0) + (positions.W2 ? 1 : 0) + (positions.NW ? 1 : 0);

  const totalUsed = Object.values(positions).filter(Boolean).length;
  const allEqual = northCount === eastCount && eastCount === southCount && southCount === westCount;
  const isWinning = totalUsed === 10 && allEqual;

  const handleVerify = () => {
    if (isWinning) {
      setFeedback({ isCorrect: true, text: t.chairsConditionMet });
      if (onSuccess) onSuccess();
    } else {
      setFeedback({ isCorrect: false, text: t.chairsConditionNotMet });
    }
  };

  // Coordinates for the SVG room (340x340)
  const slotCoords: Record<PositionKey, { x: number; y: number; isCorner: boolean }> = {
    NW: { x: 50, y: 50, isCorner: true },
    N1: { x: 130, y: 50, isCorner: false },
    N2: { x: 210, y: 50, isCorner: false },
    NE: { x: 290, y: 50, isCorner: true },

    E1: { x: 290, y: 130, isCorner: false },
    E2: { x: 290, y: 210, isCorner: false },
    SE: { x: 290, y: 290, isCorner: true },

    S2: { x: 210, y: 290, isCorner: false },
    S1: { x: 130, y: 290, isCorner: false },
    SW: { x: 50, y: 290, isCorner: true },

    W2: { x: 50, y: 210, isCorner: false },
    W1: { x: 50, y: 130, isCorner: false }
  };

  const isPositionInWall = (key: PositionKey, wall: 'north' | 'east' | 'south' | 'west') => {
    if (wall === 'north') return ['NW', 'N1', 'N2', 'NE'].includes(key);
    if (wall === 'east') return ['NE', 'E1', 'E2', 'SE'].includes(key);
    if (wall === 'south') return ['SE', 'S1', 'S2', 'SW'].includes(key);
    if (wall === 'west') return ['SW', 'W1', 'W2', 'NW'].includes(key);
    return false;
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Room with chairs SVG */}
          <div className="md:col-span-7 flex flex-col items-center justify-center">
            <svg
              viewBox="0 0 340 340"
              className="w-full max-w-[340px] aspect-square rounded-2xl bg-white border-2 border-slate-300 shadow-sm"
              role="img"
              aria-label="Cameră pătrată cu scaune de-a lungul pereților"
            >
              {/* Wall boundaries */}
              {/* North wall line */}
              <line
                x1="50"
                y1="50"
                x2="290"
                y2="50"
                stroke={highlightWall === 'north' ? '#4F46E5' : '#CBD5E1'}
                strokeWidth={highlightWall === 'north' ? '8' : '4'}
                strokeLinecap="round"
              />
              {/* East wall line */}
              <line
                x1="290"
                y1="50"
                x2="290"
                y2="290"
                stroke={highlightWall === 'east' ? '#4F46E5' : '#CBD5E1'}
                strokeWidth={highlightWall === 'east' ? '8' : '4'}
                strokeLinecap="round"
              />
              {/* South wall line */}
              <line
                x1="290"
                y1="290"
                x2="50"
                y2="290"
                stroke={highlightWall === 'south' ? '#4F46E5' : '#CBD5E1'}
                strokeWidth={highlightWall === 'south' ? '8' : '4'}
                strokeLinecap="round"
              />
              {/* West wall line */}
              <line
                x1="50"
                y1="290"
                x2="50"
                y2="50"
                stroke={highlightWall === 'west' ? '#4F46E5' : '#CBD5E1'}
                strokeWidth={highlightWall === 'west' ? '8' : '4'}
                strokeLinecap="round"
              />

              {/* Room floor label */}
              <text x="170" y="165" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="600">
                CAMERĂ PĂTRATĂ
              </text>
              <text x="170" y="185" textAnchor="middle" fill="#64748B" fontSize="14" fontWeight="bold">
                {totalUsed} / 10 scaune
              </text>

              {/* Slots and Chairs */}
              {(Object.keys(slotCoords) as PositionKey[]).map((key) => {
                const { x, y, isCorner } = slotCoords[key];
                const hasChair = positions[key];
                const isWallLit = highlightWall !== 'all' && isPositionInWall(key, highlightWall);

                return (
                  <g
                    key={key}
                    onClick={() => togglePosition(key)}
                    className="cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Poziția ${key}: ${hasChair ? 'Scaun prezent' : 'Loc liber'}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') togglePosition(key);
                    }}
                  >
                    {/* Slot outline circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r="16"
                      fill={hasChair ? (isWallLit ? '#4F46E5' : '#3B82F6') : isWallLit ? '#EEF2FF' : '#F8FAFC'}
                      stroke={hasChair ? '#1E40AF' : '#94A3B8'}
                      strokeWidth={isCorner ? '2.5' : '1.5'}
                      strokeDasharray={hasChair ? 'none' : '3,3'}
                      className="transition-colors duration-150"
                    />

                    {/* Chair graphic if placed */}
                    {hasChair ? (
                      <g>
                        {/* Chair back */}
                        <rect x={x - 8} y={y - 8} width="16" height="5" rx="1.5" fill="#FFFFFF" />
                        {/* Chair seat */}
                        <rect x={x - 6} y={y - 1} width="12" height="7" rx="1.5" fill="#FFFFFF" />
                        {/* Chair legs */}
                        <line x1={x - 5} y1={y + 6} x2={x - 5} y2={y + 9} stroke="#FFFFFF" strokeWidth="1.5" />
                        <line x1={x + 5} y1={y + 6} x2={x + 5} y2={y + 9} stroke="#FFFFFF" strokeWidth="1.5" />
                      </g>
                    ) : (
                      <text x={x} y={y + 4} textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="bold">
                        +
                      </text>
                    )}

                    {isCorner && (
                      <circle cx={x} cy={y} r="18" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,2" />
                    )}
                  </g>
                );
              })}
            </svg>

            <span className="text-xs text-slate-500 mt-2 text-center">
              Apasă pe oricare loc pentru a așeza sau elimina un scaun. Punctele din colțuri sunt marcate punctat.
            </span>
          </div>

          {/* Wall counts & verification */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Scaune numărate pe fiecare perete:
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHighlightWall(highlightWall === 'north' ? 'all' : 'north')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  highlightWall === 'north'
                    ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-indigo-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500">{t.chairsWallNorth}</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{northCount} scaune</div>
              </button>

              <button
                type="button"
                onClick={() => setHighlightWall(highlightWall === 'east' ? 'all' : 'east')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  highlightWall === 'east'
                    ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-indigo-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500">{t.chairsWallEast}</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{eastCount} scaune</div>
              </button>

              <button
                type="button"
                onClick={() => setHighlightWall(highlightWall === 'south' ? 'all' : 'south')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  highlightWall === 'south'
                    ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-indigo-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500">{t.chairsWallSouth}</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{southCount} scaune</div>
              </button>

              <button
                type="button"
                onClick={() => setHighlightWall(highlightWall === 'west' ? 'all' : 'west')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  highlightWall === 'west'
                    ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-indigo-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500">{t.chairsWallWest}</div>
                <div className="text-lg font-bold text-slate-900 tabular-nums">{westCount} scaune</div>
              </button>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex justify-between items-center">
              <span>{t.chairsRemaining}:</span>
              <span className="font-bold text-indigo-700 font-mono text-sm tabular-nums">
                {10 - totalUsed} / 10
              </span>
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

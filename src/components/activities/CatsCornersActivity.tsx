import React, { useState } from 'react';
import { UiTranslations } from '../../translations';
import { Eye, CheckCircle2 } from 'lucide-react';

interface CatsCornersActivityProps {
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

export const CatsCornersActivity: React.FC<CatsCornersActivityProps> = ({
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  const [selectedCat, setSelectedCat] = useState<number>(1);
  const [inputVal, setInputVal] = useState<string>('');
  const [validationMsg, setValidationMsg] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Corner positions in 300x300 room SVG
  const cats = [
    { id: 1, name: '1', x: 50, y: 50, label: 'Colțul NV', labelEn: 'NW Corner', angle: 45 },
    { id: 2, name: '2', x: 250, y: 50, label: 'Colțul NE', labelEn: 'NE Corner', angle: 135 },
    { id: 3, name: '3', x: 250, y: 250, label: 'Colțul SE', labelEn: 'SE Corner', angle: 225 },
    { id: 4, name: '4', x: 50, y: 250, label: 'Colțul SV', labelEn: 'SW Corner', angle: 315 }
  ];

  const handleCheck = () => {
    const clean = inputVal.trim();
    if (clean === '4') {
      setValidationMsg({ isCorrect: true, text: t.feedbackCorrect });
      if (onSuccess) onSuccess();
    } else {
      setValidationMsg({ isCorrect: false, text: t.feedbackWrong });
    }
  };

  const currentCat = cats.find((c) => c.id === selectedCat) || cats[0];
  const otherCats = cats.filter((c) => c.id !== selectedCat);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Top-down Room SVG */}
          <div className="md:col-span-7 flex flex-col items-center justify-center">
            <svg
              viewBox="0 0 320 320"
              className="w-full max-w-[320px] aspect-square rounded-xl bg-slate-900 border-4 border-amber-900/30 shadow-inner"
              role="img"
              aria-label="Cameră pătrată văzută de sus cu 4 pisici"
            >
              {/* Floor grid */}
              <defs>
                <pattern id="floorTiles" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
                <marker id="sightArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#38BDF8" />
                </marker>
              </defs>
              <rect width="320" height="320" fill="url(#floorTiles)" />

              {/* Room center marker */}
              <circle cx="160" cy="160" r="4" fill="rgba(255,255,255,0.2)" />

              {/* Sight lines from active cat */}
              {otherCats.map((target) => (
                <line
                  key={`line-${target.id}`}
                  x1={currentCat.x}
                  y1={currentCat.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  strokeDasharray="5,5"
                  markerEnd="url(#sightArrow)"
                  className="animate-pulse"
                />
              ))}

              {/* Cats in corners */}
              {cats.map((cat) => {
                const isCurrent = cat.id === selectedCat;
                return (
                  <g
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className="cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Pisica ${cat.id}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedCat(cat.id);
                    }}
                  >
                    {/* Glow when selected */}
                    {isCurrent && (
                      <circle
                        cx={cat.x}
                        cy={cat.y}
                        r="32"
                        fill="rgba(56, 189, 248, 0.25)"
                        stroke="#38BDF8"
                        strokeWidth="2"
                        className="animate-ping"
                        style={{ animationDuration: '3s' }}
                      />
                    )}

                    {/* Tail cat is sitting on */}
                    <path
                      d={`M ${cat.x - 8} ${cat.y + 12} Q ${cat.x} ${cat.y + 22} ${cat.x + 16} ${cat.y + 10}`}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    {/* Cat Body */}
                    <circle cx={cat.x} cy={cat.y} r="20" fill={isCurrent ? '#FBBF24' : '#F59E0B'} stroke="#D97706" strokeWidth="2.5" />

                    {/* Ears */}
                    <polygon
                      points={`${cat.x - 12},${cat.y - 12} ${cat.x - 18},${cat.y - 25} ${cat.x - 4},${cat.y - 18}`}
                      fill="#D97706"
                    />
                    <polygon
                      points={`${cat.x + 12},${cat.y - 12} ${cat.x + 18},${cat.y - 25} ${cat.x + 4},${cat.y - 18}`}
                      fill="#D97706"
                    />

                    {/* Cat Eyes */}
                    <circle cx={cat.x - 6} cy={cat.y - 4} r="3" fill="#1E293B" />
                    <circle cx={cat.x + 6} cy={cat.y - 4} r="3" fill="#1E293B" />
                    <circle cx={cat.x - 5} cy={cat.y - 5} r="1" fill="#FFFFFF" />
                    <circle cx={cat.x + 7} cy={cat.y - 5} r="1" fill="#FFFFFF" />

                    {/* Whiskers */}
                    <line x1={cat.x - 8} y1={cat.y + 2} x2={cat.x - 16} y2={cat.y} stroke="#78350F" strokeWidth="1.5" />
                    <line x1={cat.x - 8} y1={cat.y + 5} x2={cat.x - 16} y2={cat.y + 6} stroke="#78350F" strokeWidth="1.5" />
                    <line x1={cat.x + 8} y1={cat.y + 2} x2={cat.x + 16} y2={cat.y} stroke="#78350F" strokeWidth="1.5" />
                    <line x1={cat.x + 8} y1={cat.y + 5} x2={cat.x + 16} y2={cat.y + 6} stroke="#78350F" strokeWidth="1.5" />

                    {/* Cat number badge */}
                    <circle cx={cat.x} cy={cat.y + 2} r="8" fill="#1E1B4B" />
                    <text
                      x={cat.x}
                      y={cat.y + 5}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {cat.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            <span className="text-xs text-slate-500 mt-2">
              Apasă pe o pisică pentru a-i vedea linia privirii către celelalte 3.
            </span>
          </div>

          {/* Interactive controls & explanation */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-2">
                <Eye className="w-4 h-4" />
                {t.catsSelectedSight.replace('{id}', currentCat.id.toString())}
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5">
                {otherCats.map((c) => (
                  <li key={c.id} className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px]">
                      {c.id}
                    </span>
                    <span>Pisica #{c.id} din {c.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!isSolutionMode && (
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
                <label htmlFor="catCountInput" className="text-sm font-semibold text-slate-800">
                  {t.catsCountLabel}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="catCountInput"
                    type="number"
                    min="1"
                    max="100"
                    value={inputVal}
                    onChange={(e) => {
                      setInputVal(e.target.value);
                      setValidationMsg(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCheck();
                    }}
                    placeholder="4"
                    className="w-28 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleCheck}
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                  >
                    {t.checkAnswer}
                  </button>
                </div>

                {validationMsg && (
                  <div
                    className={`text-xs p-2.5 rounded-lg flex items-center gap-1.5 font-medium ${
                      validationMsg.isCorrect
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {validationMsg.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {validationMsg.text}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { UiTranslations } from '../../translations';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface AppleBasketActivityProps {
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

export const AppleBasketActivity: React.FC<AppleBasketActivityProps> = ({
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  // 5 children: index 0 to 4
  // Each child has: hasApple: boolean, hasBasket: boolean
  const initialChildren = [
    { id: 1, hasApple: false, hasBasket: false, nameRo: 'Andrei', nameEn: 'Alex' },
    { id: 2, hasApple: false, hasBasket: false, nameRo: 'Maria', nameEn: 'Maya' },
    { id: 3, hasApple: false, hasBasket: false, nameRo: 'David', nameEn: 'David' },
    { id: 4, hasApple: false, hasBasket: false, nameRo: 'Elena', nameEn: 'Emma' },
    { id: 5, hasApple: false, hasBasket: false, nameRo: 'Matei', nameEn: 'Leo' }
  ];

  const [children, setChildren] = useState(
    isSolutionMode
      ? [
          { id: 1, hasApple: true, hasBasket: false, nameRo: 'Andrei', nameEn: 'Alex' },
          { id: 2, hasApple: true, hasBasket: false, nameRo: 'Maria', nameEn: 'Maya' },
          { id: 3, hasApple: true, hasBasket: false, nameRo: 'David', nameEn: 'David' },
          { id: 4, hasApple: true, hasBasket: false, nameRo: 'Elena', nameEn: 'Emma' },
          { id: 5, hasApple: true, hasBasket: true, nameRo: 'Matei', nameEn: 'Leo' }
        ]
      : initialChildren
  );

  const [applesInBasket, setApplesInBasket] = useState(isSolutionMode ? 1 : 5);
  const [basketGiven, setBasketGiven] = useState(isSolutionMode);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  const reset = () => {
    setChildren(initialChildren);
    setApplesInBasket(5);
    setBasketGiven(false);
    setSelectedChildId(null);
  };

  const giveAppleToChild = (childId: number) => {
    if (isSolutionMode) return;
    const target = children.find((c) => c.id === childId);
    if (!target || target.hasApple) return;
    if (applesInBasket <= 0) return;

    const nextApples = applesInBasket - 1;
    const nextChildren = children.map((c) =>
      c.id === childId ? { ...c, hasApple: true } : c
    );

    setApplesInBasket(nextApples);
    setChildren(nextChildren);

    checkWin(nextChildren, basketGiven, nextApples);
  };

  const giveBasketWithApple = (childId: number) => {
    if (isSolutionMode) return;
    const target = children.find((c) => c.id === childId);
    if (!target || target.hasApple || basketGiven) return;
    if (applesInBasket < 1) return;

    // Basket with the remaining apple is given to this child!
    const nextChildren = children.map((c) =>
      c.id === childId ? { ...c, hasApple: true, hasBasket: true } : c
    );
    setBasketGiven(true);
    setChildren(nextChildren);

    checkWin(nextChildren, true, applesInBasket);
  };

  const checkWin = (
    currentChildren: typeof children,
    isBasketHanded: boolean,
    remainingApples: number
  ) => {
    const allHaveApples = currentChildren.every((c) => c.hasApple);
    const oneHasBasketWithApple = currentChildren.some(
      (c) => c.hasBasket && c.hasApple
    );

    if (allHaveApples && isBasketHanded && oneHasBasketWithApple && remainingApples === 1) {
      if (onSuccess) onSuccess();
    }
  };

  const solvedCondition =
    children.every((c) => c.hasApple) &&
    children.some((c) => c.hasBasket) &&
    applesInBasket === 1;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Visual stage */}
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Basket area */}
          <div className="flex flex-col items-center justify-center p-4 bg-white/80 rounded-xl border border-amber-200/50 shadow-xs min-h-[220px]">
            <div className="text-sm font-semibold text-amber-900 mb-2">
              {basketGiven ? 'Coșul a fost oferit!' : `Coșul cu mere (${applesInBasket} rămase)`}
            </div>

            <svg
              viewBox="0 0 200 160"
              className="w-48 h-36 max-w-full drop-shadow-sm transition-transform duration-300"
              role="img"
              aria-label="Coș cu mere"
            >
              {/* Basket handle */}
              {!basketGiven && (
                <path
                  d="M 50 80 C 50 25, 150 25, 150 80"
                  fill="none"
                  stroke="#B45309"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              )}

              {/* Apples inside basket */}
              {!basketGiven && (
                <g>
                  {Array.from({ length: applesInBasket }).map((_, i) => {
                    const offsets = [
                      { x: 80, y: 70 },
                      { x: 105, y: 65 },
                      { x: 125, y: 75 },
                      { x: 92, y: 55 },
                      { x: 112, y: 50 }
                    ];
                    const pos = offsets[i] || { x: 100, y: 70 };
                    return (
                      <g key={i} className="animate-in fade-in duration-300">
                        {/* Apple leaf */}
                        <ellipse cx={pos.x + 3} cy={pos.y - 12} rx="4" ry="2" fill="#22C55E" transform={`rotate(-20 ${pos.x + 3} ${pos.y - 12})`} />
                        {/* Apple body */}
                        <circle cx={pos.x - 5} cy={pos.y} r="12" fill="#EF4444" />
                        <circle cx={pos.x + 5} cy={pos.y} r="12" fill="#DC2626" />
                        <circle cx={pos.x} cy={pos.y + 4} r="11" fill="#DC2626" />
                        <ellipse cx={pos.x - 3} cy={pos.y - 4} rx="3" ry="5" fill="#F87171" opacity="0.6" />
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Basket base */}
              <path
                d="M 40 80 L 60 140 L 140 140 L 160 80 Z"
                fill={basketGiven ? '#E5E7EB' : '#D97706'}
                stroke={basketGiven ? '#9CA3AF' : '#92400E'}
                strokeWidth="4"
                strokeLinejoin="round"
                opacity={basketGiven ? 0.35 : 1}
              />
              {/* Basket weave lines */}
              {!basketGiven && (
                <path
                  d="M 50 100 L 150 100 M 55 120 L 145 120 M 70 80 L 80 140 M 100 80 L 100 140 M 130 80 L 120 140"
                  stroke="#B45309"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}
            </svg>

            {basketGiven && (
              <span className="text-xs text-slate-500 mt-2 font-medium">
                Coșul este la copilul #5 (cu ultimul măr în el!)
              </span>
            )}
          </div>

          {/* Children grid */}
          <div className="flex flex-col gap-2.5">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Cei 5 copii:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {children.map((child, idx) => {
                const isSelected = selectedChildId === child.id;
                return (
                  <div
                    key={child.id}
                    onClick={() => setSelectedChildId(child.id)}
                    className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between ${
                      child.hasApple
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : isSelected
                        ? 'bg-amber-100/60 border-amber-400 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          Copilul #{child.id}
                        </div>
                        <div className="text-xs text-slate-500">
                          {child.hasBasket
                            ? '🍎 Are coșul cu ultimul măr!'
                            : child.hasApple
                            ? '🍎 Are 1 măr'
                            : 'Fără măr'}
                        </div>
                      </div>
                    </div>

                    {!isSolutionMode && !child.hasApple && (
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            giveAppleToChild(child.id);
                          }}
                          disabled={applesInBasket <= (basketGiven ? 0 : 1)}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md disabled:opacity-40 disabled:pointer-events-none transition-colors"
                        >
                          + Măr
                        </button>
                        {!basketGiven && applesInBasket === 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              giveBasketWithApple(child.id);
                            }}
                            className="px-2.5 py-1 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                          >
                            + Coș cu măr
                          </button>
                        )}
                      </div>
                    )}

                    {child.hasApple && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action toolbar */}
        {!isSolutionMode && (
          <div className="mt-4 pt-4 border-t border-amber-200/50 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.appleReset}
            </button>

            {solvedCondition && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                {t.feedbackCorrect}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

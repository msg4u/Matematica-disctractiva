import React, { useState } from 'react';
import { UiTranslations } from '../../translations';
import { CheckCircle2, Info } from 'lucide-react';

interface FlyCyclistsActivityProps {
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

export const FlyCyclistsActivity: React.FC<FlyCyclistsActivityProps> = ({
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  const [hoursElapsed, setHoursElapsed] = useState<number>(1.5);
  const [inputVal, setInputVal] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Initial distance = 300 km
  // Cyclist A speed = 50 km/h (moves from 0 to 150 km)
  // Cyclist B speed = 50 km/h (moves from 300 to 150 km)
  // Approach speed = 100 km/h
  // Total time until meeting = 3.0 hours
  // Fly speed = 100 km/h
  // Distance covered by fly = 100 * hoursElapsed
  // Remaining gap = 300 - 100 * hoursElapsed
  const cyclistAPos = Math.round(50 * hoursElapsed);
  const cyclistBPos = Math.round(300 - 50 * hoursElapsed);
  const gapRemaining = Math.max(0, cyclistBPos - cyclistAPos);
  const flyTotalDistance = Math.round(100 * hoursElapsed);

  const handleVerify = () => {
    const clean = inputVal.trim().toLowerCase().replace('km', '').trim();
    if (clean === '300') {
      setFeedback({ isCorrect: true, text: t.feedbackCorrect });
      if (onSuccess) onSuccess();
    } else {
      setFeedback({ isCorrect: false, text: t.feedbackWrong });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
        {/* Visual Route with Cyclists and Fly */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
          <svg
            viewBox="0 0 520 180"
            className="w-full max-w-[520px] h-44"
            role="img"
            aria-label="Cei doi bicicliști și musca pe traseul de 300 km"
          >
            {/* Top axis markings */}
            <line x1="50" y1="35" x2="470" y2="35" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="50" y="25" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">0 km (Start A)</text>
            <text x="260" y="25" textAnchor="middle" fill="#4F46E5" fontSize="10" fontWeight="bold">Întâlnire la 150 km</text>
            <text x="470" y="25" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">300 km (Start B)</text>

            {/* Road */}
            <rect x="30" y="95" width="460" height="20" rx="4" fill="#334155" />
            <line x1="30" y1="105" x2="490" y2="105" stroke="#F8FAFC" strokeWidth="2" strokeDasharray="10,10" opacity="0.6" />

            {/* Cyclist A */}
            {(() => {
              const xPos = 50 + (cyclistAPos / 300) * 420;
              return (
                <g transform={`translate(${xPos - 18}, 62)`} className="transition-transform duration-150">
                  <text x="18" y="0" textAnchor="middle" fontSize="20">🚴‍♂️</text>
                  <rect x="0" y="5" width="36" height="15" rx="3" fill="#0284C7" />
                  <text x="18" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">50 km/h →</text>
                </g>
              );
            })()}

            {/* Cyclist B */}
            {(() => {
              const xPos = 50 + (cyclistBPos / 300) * 420;
              return (
                <g transform={`translate(${xPos - 18}, 62)`} className="transition-transform duration-150">
                  <text x="18" y="0" textAnchor="middle" fontSize="20" transform="scale(-1, 1) translate(-36, 0)">🚴‍♀️</text>
                  <rect x="0" y="5" width="36" height="15" rx="3" fill="#E11D48" />
                  <text x="18" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">← 50 km/h</text>
                </g>
              );
            })()}

            {/* Schematic Fly */}
            {(() => {
              // Fly oscillates back and forth between cyclists as a schematic visual representation
              const xA = 50 + (cyclistAPos / 300) * 420;
              const xB = 50 + (cyclistBPos / 300) * 420;
              // Simple sine wave interpolation between xA and xB to show zig-zag
              const bounce = (Math.sin(hoursElapsed * Math.PI * 3.5) + 1) / 2;
              const flyX = xA + bounce * (xB - xA);
              return (
                <g transform={`translate(${flyX}, 55)`} className="transition-transform duration-150">
                  <text x="0" y="0" textAnchor="middle" fontSize="16">🪰</text>
                  <rect x="-24" y="2" width="48" height="13" rx="3" fill="#D97706" />
                  <text x="0" y="11" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">100 km/h</text>
                </g>
              );
            })()}

            {/* Remaining gap bracket */}
            <line
              x1={50 + (cyclistAPos / 300) * 420 + 20}
              y1="135"
              x2={50 + (cyclistBPos / 300) * 420 - 20}
              y2="135"
              stroke="#4F46E5"
              strokeWidth="2"
            />
            <text
              x={50 + ((cyclistAPos + cyclistBPos) / 600) * 420}
              y="155"
              textAnchor="middle"
              fill="#4338CA"
              fontSize="11"
              fontWeight="bold"
            >
              {gapRemaining} km distanță rămasă
            </text>
          </svg>

          {/* Time Scrubber */}
          <div className="w-full max-w-md mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>{t.flyTimeElapsed}</span>
              <span className="font-bold font-mono text-indigo-700 text-sm tabular-nums">
                {hoursElapsed.toFixed(1)} ore ({flyTotalDistance} km zburați de muscă)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={hoursElapsed}
              onChange={(e) => setHoursElapsed(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.0 ore (Start)</span>
              <span>1.5 ore (150 km parcurși de muscă)</span>
              <span>3.0 ore (Întâlnire, 300 km)</span>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-1.5 text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 w-full max-w-md">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
            <span>{t.schematicNotice}</span>
          </div>
        </div>

        {/* Numeric input area */}
        {!isSolutionMode && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
            <label htmlFor="flyInput" className="text-sm font-semibold text-slate-800">
              Ce distanță totală parcurge musca până când bicicliștii se întâlnesc?
            </label>
            <div className="flex items-center gap-2">
              <input
                id="flyInput"
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setFeedback(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleVerify();
                }}
                placeholder="300"
                className="w-32 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-mono"
              />
              <span className="text-xs font-semibold text-slate-500">km</span>
              <button
                type="button"
                onClick={handleVerify}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs ml-auto"
              >
                {t.checkAnswer}
              </button>
            </div>

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
        )}
      </div>
    </div>
  );
};

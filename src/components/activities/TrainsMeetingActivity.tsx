import React, { useState } from 'react';
import { UiTranslations } from '../../translations';
import { CheckCircle2 } from 'lucide-react';

interface TrainsMeetingActivityProps {
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

export const TrainsMeetingActivity: React.FC<TrainsMeetingActivityProps> = ({
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  const [minutesLeft, setMinutesLeft] = useState<number>(60);
  const [inputVal, setInputVal] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Train speeds: Train 1 = 60 km/h, Train 2 = 40 km/h
  // Closing speed = 100 km/h
  // At 60 minutes (1 hour) before meeting: distance = 100 km.
  // At minutesLeft:
  // Distance covered in the remaining minutes = 100 * (minutesLeft / 60) km
  const currentDistanceKm = Math.round((100 * minutesLeft) / 60);

  // For visualization: track is 100 km wide
  // Train 1 starts at 0, moves up to 60 km
  // Train 2 starts at 100, moves down to 60 km (where they meet!)
  const fractionTimeElapsed = (60 - minutesLeft) / 60; // 0 to 1
  const train1PosKm = Math.round(60 * fractionTimeElapsed);
  const train2PosKm = Math.round(100 - 40 * fractionTimeElapsed);

  const handleVerify = () => {
    const clean = inputVal.trim().toLowerCase().replace('km', '').trim();
    if (clean === '100') {
      setFeedback({ isCorrect: true, text: t.feedbackCorrect });
      if (onSuccess) onSuccess();
    } else {
      setFeedback({ isCorrect: false, text: t.feedbackWrong });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
        {/* Track and Trains SVG */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
          <svg
            viewBox="0 0 500 160"
            className="w-full max-w-[500px] h-36"
            role="img"
            aria-label="Calea ferată cu cele două trenuri care se apropie"
          >
            {/* Distance scale line at top */}
            <line x1="50" y1="35" x2="450" y2="35" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="50" y="25" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">0 km</text>
            <text x="290" y="25" textAnchor="middle" fill="#4F46E5" fontSize="10" fontWeight="bold">Punct de întâlnire (60 km)</text>
            <text x="450" y="25" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">100 km</text>

            {/* Railway tracks */}
            <line x1="30" y1="100" x2="470" y2="100" stroke="#475569" strokeWidth="4" />
            <line x1="30" y1="112" x2="470" y2="112" stroke="#475569" strokeWidth="4" />
            {/* Railroad ties */}
            {Array.from({ length: 22 }).map((_, i) => (
              <line
                key={i}
                x1={40 + i * 20}
                y1="96"
                x2={40 + i * 20}
                y2="116"
                stroke="#94A3B8"
                strokeWidth="2.5"
              />
            ))}

            {/* Train A (Blue, 60 km/h) */}
            {(() => {
              // Map 0..100 km to SVG x: 50..450
              const xPosA = 50 + (train1PosKm / 100) * 400;
              return (
                <g transform={`translate(${xPosA - 25}, 65)`} className="transition-transform duration-150">
                  <rect x="0" y="0" width="40" height="24" rx="4" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
                  <rect x="25" y="4" width="10" height="10" rx="2" fill="#93C5FD" />
                  <circle cx="10" cy="24" r="5" fill="#1E293B" />
                  <circle cx="30" cy="24" r="5" fill="#1E293B" />
                  <text x="20" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">60 km/h →</text>
                </g>
              );
            })()}

            {/* Train B (Red/Orange, 40 km/h) */}
            {(() => {
              const xPosB = 50 + (train2PosKm / 100) * 400;
              return (
                <g transform={`translate(${xPosB - 15}, 65)`} className="transition-transform duration-150">
                  <rect x="0" y="0" width="40" height="24" rx="4" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
                  <rect x="5" y="4" width="10" height="10" rx="2" fill="#FDBA74" />
                  <circle cx="10" cy="24" r="5" fill="#1E293B" />
                  <circle cx="30" cy="24" r="5" fill="#1E293B" />
                  <text x="20" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">← 40 km/h</text>
                </g>
              );
            })()}

            {/* Gap indicator */}
            <line
              x1={50 + (train1PosKm / 100) * 400 + 18}
              y1="135"
              x2={50 + (train2PosKm / 100) * 400 - 15}
              y2="135"
              stroke="#4F46E5"
              strokeWidth="2"
            />
            <text
              x={50 + ((train1PosKm + train2PosKm) / 200) * 400}
              y="150"
              textAnchor="middle"
              fill="#4338CA"
              fontSize="11"
              fontWeight="bold"
            >
              {currentDistanceKm} km rămași
            </text>
          </svg>

          {/* Time slider to simulate last 60 minutes */}
          <div className="w-full max-w-md mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>{t.trainsTimeSliderLabel}</span>
              <span className="font-bold font-mono text-indigo-700 text-sm tabular-nums">
                {minutesLeft} min ({currentDistanceKm} km)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={minutesLeft}
              onChange={(e) => setMinutesLeft(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 min (Întâlnire)</span>
              <span>30 min (50 km)</span>
              <span>60 min (100 km)</span>
            </div>
          </div>
        </div>

        {/* Numeric input area */}
        {!isSolutionMode && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
            <label htmlFor="trainDistInput" className="text-sm font-semibold text-slate-800">
              Ce distanță se află între cele două trenuri cu o oră înainte de întâlnire?
            </label>
            <div className="flex items-center gap-2">
              <input
                id="trainDistInput"
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setFeedback(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleVerify();
                }}
                placeholder="100"
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

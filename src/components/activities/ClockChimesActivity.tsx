import React, { useState } from 'react';
import { UiTranslations } from '../../translations';
import { CheckCircle2, Volume2, VolumeX, Bell } from 'lucide-react';
import { playClockChime } from '../../utils/sound';

interface ClockChimesActivityProps {
  t: UiTranslations;
  isSolutionMode?: boolean;
  onSuccess?: () => void;
  isSolved?: boolean;
}

export const ClockChimesActivity: React.FC<ClockChimesActivityProps> = ({
  t,
  isSolutionMode = false,
  onSuccess,
  isSolved = false
}) => {
  const [selectedView, setSelectedView] = useState<'both' | '6' | '12'>('both');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const handlePlayChime = () => {
    if (soundEnabled) {
      playClockChime();
    }
  };

  const handleVerify = () => {
    const clean = inputVal.trim().toLowerCase().replace('secunde', '').replace('s', '').replace('sec', '').trim();
    if (clean === '66') {
      setFeedback({ isCorrect: true, text: t.feedbackCorrect });
      if (onSuccess) onSuccess();
    } else {
      setFeedback({ isCorrect: false, text: t.feedbackWrong });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 sm:p-6 shadow-xs">
        {/* Audio control bar & view toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setSelectedView('both')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedView === 'both' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Comparație 6 vs 12
            </button>
            <button
              type="button"
              onClick={() => setSelectedView('6')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedView === '6' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ora 6 (6 bătăi)
            </button>
            <button
              type="button"
              onClick={() => setSelectedView('12')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedView === '12' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ora 12 (12 bătăi)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1.5 transition-colors ${
                soundEnabled
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
              title={soundEnabled ? t.clockSoundOn : t.clockSoundOff}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-600" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? t.clockSoundOn : t.clockSoundOff}</span>
            </button>

            {soundEnabled && (
              <button
                type="button"
                onClick={handlePlayChime}
                className="px-2.5 py-1 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center gap-1 transition-colors"
              >
                <Bell className="w-3.5 h-3.5" />
                {t.clockPlayChime}
              </button>
            )}
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
          {/* Clock at 6 o'clock */}
          {(selectedView === 'both' || selectedView === '6') && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Ora 6: 6 bătăi → 5 intervale = 30 secunde (30 ÷ 5 = 6 sec/interval)
                </span>
                <span className="font-mono text-indigo-700">Total: 30s</span>
              </div>

              {/* 6 chimes timeline SVG */}
              <div className="overflow-x-auto py-2">
                <svg viewBox="0 0 460 70" className="w-full min-w-[340px] h-16" role="img" aria-label="Linia timpului pentru 6 bătăi">
                  {/* Axis line */}
                  <line x1="30" y1="40" x2="430" y2="40" stroke="#CBD5E1" strokeWidth="2.5" />

                  {/* 5 intervals brackets */}
                  {Array.from({ length: 5 }).map((_, i) => {
                    const x1 = 30 + i * 80;
                    const x2 = 30 + (i + 1) * 80;
                    return (
                      <g key={i}>
                        <path
                          d={`M ${x1 + 4} 24 Q ${(x1 + x2) / 2} 16 ${x2 - 4} 24`}
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="1.5"
                        />
                        <text x={(x1 + x2) / 2} y="13" textAnchor="middle" fill="#D97706" fontSize="9" fontWeight="bold">
                          6s
                        </text>
                      </g>
                    );
                  })}

                  {/* 6 strike dots */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const cx = 30 + i * 80;
                    return (
                      <g key={i}>
                        <circle cx={cx} cy="40" r="10" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
                        <text x={cx} y="43" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">
                          {i + 1}
                        </text>
                        <text x={cx} y="62" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="monospace">
                          {i * 6}s
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {/* Clock at 12 o'clock */}
          {(selectedView === 'both' || selectedView === '12') && (
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  Ora 12: 12 bătăi → 11 intervale × 6 secunde = 66 secunde
                </span>
                <span className="font-mono text-indigo-700">Total: 66s</span>
              </div>

              {/* 12 chimes timeline SVG */}
              <div className="overflow-x-auto py-2">
                <svg viewBox="0 0 520 70" className="w-full min-w-[420px] h-16" role="img" aria-label="Linia timpului pentru 12 bătăi">
                  {/* Axis line */}
                  <line x1="20" y1="40" x2="500" y2="40" stroke="#CBD5E1" strokeWidth="2" />

                  {/* 11 intervals */}
                  {Array.from({ length: 11 }).map((_, i) => {
                    const x1 = 20 + i * 43.6;
                    const x2 = 20 + (i + 1) * 43.6;
                    return (
                      <g key={i}>
                        <path
                          d={`M ${x1 + 3} 24 Q ${(x1 + x2) / 2} 18 ${x2 - 3} 24`}
                          fill="none"
                          stroke="#6366F1"
                          strokeWidth="1.2"
                        />
                        <text x={(x1 + x2) / 2} y="15" textAnchor="middle" fill="#4F46E5" fontSize="8" fontWeight="bold">
                          6s
                        </text>
                      </g>
                    );
                  })}

                  {/* 12 strike dots */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const cx = 20 + i * 43.6;
                    return (
                      <g key={i}>
                        <circle cx={cx} cy="40" r="7" fill="#4F46E5" stroke="#312E81" strokeWidth="1.5" />
                        <text x={cx} y="43" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
                          {i + 1}
                        </text>
                        <text x={cx} y="60" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="monospace">
                          {i * 6}s
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Input box */}
        {!isSolutionMode && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-3">
            <label htmlFor="clockInput" className="text-sm font-semibold text-slate-800">
              Câte secunde trec la ora 12 de la prima până la a 12-a bătaie?
            </label>
            <div className="flex items-center gap-2">
              <input
                id="clockInput"
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setFeedback(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleVerify();
                }}
                placeholder="66"
                className="w-32 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-mono"
              />
              <span className="text-xs font-semibold text-slate-500">secunde</span>
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

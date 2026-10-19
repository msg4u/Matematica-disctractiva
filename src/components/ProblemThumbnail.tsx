import React from 'react';

export const ProblemThumbnail: React.FC<{ problemId: number }> = ({ problemId }) => {
  switch (problemId) {
    case 1:
      // Apple in basket thumbnail
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full" role="img" aria-hidden="true">
          <rect width="120" height="80" fill="#FEF3C7" />
          <path d="M 30 50 C 30 20, 90 20, 90 50" fill="none" stroke="#B45309" strokeWidth="4" />
          {/* Apples */}
          <circle cx="50" cy="45" r="9" fill="#EF4444" />
          <circle cx="65" cy="42" r="9" fill="#DC2626" />
          <circle cx="78" cy="46" r="8" fill="#EF4444" />
          <circle cx="58" cy="36" r="8" fill="#B91C1C" />
          <circle cx="70" cy="34" r="8" fill="#DC2626" />
          <path d="M 24 48 L 38 72 L 82 72 L 96 48 Z" fill="#D97706" stroke="#92400E" strokeWidth="2" />
        </svg>
      );
    case 2:
      // 4 cats in corners thumbnail
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full" role="img" aria-hidden="true">
          <rect width="120" height="80" fill="#0F172A" />
          <line x1="25" y1="20" x2="95" y2="60" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
          <line x1="25" y1="20" x2="95" y2="20" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
          <circle cx="25" cy="20" r="10" fill="#F59E0B" />
          <circle cx="95" cy="20" r="10" fill="#F59E0B" />
          <circle cx="95" cy="60" r="10" fill="#F59E0B" />
          <circle cx="25" cy="60" r="10" fill="#F59E0B" />
          <text x="60" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">4 ?</text>
        </svg>
      );
    case 3:
      // 10 chairs and 4 walls thumbnail
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full" role="img" aria-hidden="true">
          <rect width="120" height="80" fill="#F8FAFC" />
          <rect x="25" y="15" width="70" height="50" fill="none" stroke="#64748B" strokeWidth="3" rx="2" />
          {/* Corner chairs */}
          <circle cx="25" cy="15" r="5" fill="#4F46E5" />
          <circle cx="95" cy="65" r="5" fill="#4F46E5" />
          {/* Wall chairs */}
          <circle cx="48" cy="15" r="4" fill="#3B82F6" />
          <circle cx="72" cy="15" r="4" fill="#3B82F6" />
          <circle cx="95" cy="32" r="4" fill="#3B82F6" />
          <circle cx="95" cy="48" r="4" fill="#3B82F6" />
          <circle cx="48" cy="65" r="4" fill="#3B82F6" />
          <circle cx="72" cy="65" r="4" fill="#3B82F6" />
          <circle cx="25" cy="32" r="4" fill="#3B82F6" />
          <circle cx="25" cy="48" r="4" fill="#3B82F6" />
        </svg>
      );
    case 4:
      // Parity grid thumbnail
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full" role="img" aria-hidden="true">
          <rect width="120" height="80" fill="#F1F5F9" />
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 4 }).map((_, c) => {
              const isRemoved =
                (r === 0 && (c === 0 || c === 1)) ||
                (r === 1 && (c === 0 || c === 2)) ||
                (r === 2 && (c === 1 || c === 2));
              return (
                <circle
                  key={`${r}-${c}`}
                  cx={36 + c * 16}
                  cy={16 + r * 16}
                  r="5"
                  fill={isRemoved ? '#CBD5E1' : '#F59E0B'}
                  opacity={isRemoved ? 0.3 : 1}
                />
              );
            })
          )}
        </svg>
      );
    case 5:
      // Magic triangle thumbnail
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full" role="img" aria-hidden="true">
          <rect width="120" height="80" fill="#FAF5FF" />
          <polygon points="60,12 20,68 100,68" fill="none" stroke="#C084FC" strokeWidth="2" />
          <circle cx="60" cy="12" r="7" fill="#4F46E5" />
          <circle cx="20" cy="68" r="7" fill="#4F46E5" />
          <circle cx="100" cy="68" r="7" fill="#4F46E5" />
          <circle cx="40" cy="40" r="5" fill="#A855F7" />
          <circle cx="80" cy="40" r="5" fill="#A855F7" />
          <circle cx="60" cy="68" r="5" fill="#A855F7" />
          <text x="60" y="48" textAnchor="middle" fill="#6B21A8" fontSize="11" fontWeight="bold">∑ 17</text>
        </svg>
      );
    case 6:
      // River crossing thumbnail
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full" role="img" aria-hidden="true">
          <rect width="36" height="80" fill="#D1FAE5" />
          <rect x="36" width="48" height="80" fill="#BAE6FD" />
          <rect x="84" width="36" height="80" fill="#D1FAE5" />
          {/* Boat */}
          <path d="M 50 48 L 56 60 L 70 60 L 76 48 Z" fill="#78350F" />
          <circle cx="60" cy="42" r="5" fill="#F59E0B" />
          <text x="18" y="44" textAnchor="middle" fontSize="12">🐺</text>
          <text x="102" y="44" textAnchor="middle" fontSize="12">🐐</text>
        </svg>
      );
    case 7:
      // Three piles thumbnail
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full" role="img" aria-hidden="true">
          <rect width="120" height="80" fill="#FFFBEB" />
          <rect x="15" y="42" width="24" height="26" rx="4" fill="#FCD34D" stroke="#D97706" />
          <text x="27" y="58" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350F">11</text>
          <rect x="48" y="48" width="24" height="20" rx="4" fill="#FCD34D" stroke="#D97706" />
          <text x="60" y="62" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350F">7</text>
          <rect x="81" y="52" width="24" height="16" rx="4" fill="#FCD34D" stroke="#D97706" />
          <text x="93" y="64" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350F">6</text>
          <path d="M 27 34 Q 45 20 60 40" fill="none" stroke="#4F46E5" strokeWidth="2" strokeDasharray="3,2" />
        </svg>
      );
    case 8:
      // Trains meeting thumbnail
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full" role="img" aria-hidden="true">
          <rect width="120" height="80" fill="#EFF6FF" />
          <line x1="10" y1="52" x2="110" y2="52" stroke="#64748B" strokeWidth="2" />
          {/* Train 1 */}
          <rect x="20" y="38" width="25" height="14" rx="2" fill="#2563EB" />
          <text x="32" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">60 →</text>
          {/* Train 2 */}
          <rect x="75" y="38" width="25" height="14" rx="2" fill="#EA580C" />
          <text x="87" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">← 40</text>
          <text x="60" y="24" textAnchor="middle" fill="#1E40AF" fontSize="9" fontWeight="bold">100 km</text>
        </svg>
      );
    case 9:
      // Clock chimes thumbnail
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full" role="img" aria-hidden="true">
          <rect width="120" height="80" fill="#FDF4FF" />
          <circle cx="36" cy="40" r="22" fill="#FFFFFF" stroke="#C084FC" strokeWidth="2" />
          <line x1="36" y1="40" x2="36" y2="24" stroke="#581C87" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="40" x2="48" y2="40" stroke="#581C87" strokeWidth="1.5" strokeLinecap="round" />
          {/* Bell / sound waves */}
          <text x="82" y="46" textAnchor="middle" fontSize="22">🔔</text>
          <text x="82" y="66" textAnchor="middle" fill="#6B21A8" fontSize="9" fontWeight="bold">66s</text>
        </svg>
      );
    case 10:
      // Fly between cyclists thumbnail
      return (
        <svg viewBox="0 0 120 80" className="w-full h-full" role="img" aria-hidden="true">
          <rect width="120" height="80" fill="#F0FDF4" />
          <line x1="10" y1="55" x2="110" y2="55" stroke="#475569" strokeWidth="2" />
          <text x="20" y="48" textAnchor="middle" fontSize="14">🚴</text>
          <text x="100" y="48" textAnchor="middle" fontSize="14" transform="scale(-1, 1) translate(-200, 0)">🚴</text>
          <text x="60" y="38" textAnchor="middle" fontSize="14">🪰</text>
          <path d="M 28 36 Q 44 26 60 36 Q 76 46 92 36" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="2,2" />
        </svg>
      );
    default:
      return null;
  }
};

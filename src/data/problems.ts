import { ProblemMeta } from '../types';

export const PROBLEMS: ProblemMeta[] = [
  {
    id: 1,
    slug: 'marul-din-cos',
    ageMin: 7,
    ageMax: 9,
    category: 'logic',
    difficulty: 'easy',
    durationMinutes: 2
  },
  {
    id: 2,
    slug: 'pisicile-din-colturi',
    ageMin: 7,
    ageMax: 10,
    category: 'observation',
    difficulty: 'easy',
    durationMinutes: 3
  },
  {
    id: 3,
    slug: 'zece-scaune-patru-pereti',
    ageMin: 8,
    ageMax: 11,
    category: 'geometry',
    difficulty: 'medium',
    durationMinutes: 4
  },
  {
    id: 4,
    slug: 'punctele-in-perechi',
    ageMin: 9,
    ageMax: 12,
    category: 'parity',
    difficulty: 'medium',
    durationMinutes: 5
  },
  {
    id: 5,
    slug: 'triunghiul-magic',
    ageMin: 9,
    ageMax: 12,
    category: 'arithmetic',
    difficulty: 'medium',
    durationMinutes: 6
  },
  {
    id: 6,
    slug: 'lupul-capra-varza',
    ageMin: 9,
    ageMax: 13,
    category: 'logic',
    difficulty: 'medium',
    durationMinutes: 7
  },
  {
    id: 7,
    slug: 'trei-gramezi-trei-mutari',
    ageMin: 10,
    ageMax: 13,
    category: 'arithmetic',
    difficulty: 'challenging',
    durationMinutes: 7
  },
  {
    id: 8,
    slug: 'trenurile-inainte-de-intalnire',
    ageMin: 11,
    ageMax: 14,
    category: 'motion',
    difficulty: 'medium',
    durationMinutes: 4
  },
  {
    id: 9,
    slug: 'bataile-ceasului',
    ageMin: 10,
    ageMax: 14,
    category: 'time',
    difficulty: 'medium',
    durationMinutes: 4
  },
  {
    id: 10,
    slug: 'musca-dintre-biciclisti',
    ageMin: 12,
    ageMax: 14,
    category: 'motion',
    difficulty: 'challenging',
    durationMinutes: 6
  }
];

export function checkAgeIntersection(problem: ProblemMeta, filter: 'all' | '7-9' | '10-11' | '12-14'): boolean {
  if (filter === 'all') return true;
  if (filter === '7-9') return problem.ageMin <= 9 && problem.ageMax >= 7;
  if (filter === '10-11') return problem.ageMin <= 11 && problem.ageMax >= 10;
  if (filter === '12-14') return problem.ageMin <= 14 && problem.ageMax >= 12;
  return true;
}

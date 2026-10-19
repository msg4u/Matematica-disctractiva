export type Language = 'ro' | 'en';

export type Category = 'logic' | 'observation' | 'geometry' | 'parity' | 'arithmetic' | 'motion' | 'time';

export type Difficulty = 'easy' | 'medium' | 'challenging';

export type AgeFilter = 'all' | '7-9' | '10-11' | '12-14';

export interface ProblemMeta {
  id: number;
  slug: string;
  ageMin: number;
  ageMax: number;
  category: Category;
  difficulty: Difficulty;
  durationMinutes: number;
}

export interface UserProgress {
  solvedProblems: number[]; // problem IDs solved independently
  viewedSolutions: number[]; // problem IDs where solution was viewed / understood
}

export type CategoryId =
  | 'animals'
  | 'colors'
  | 'numbers'
  | 'food'
  | 'fruits'
  | 'vehicles'
  | 'bodyParts';

export interface WordCard {
  id: string;
  english: string;
  korean: string;
  category: CategoryId;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Category {
  id: CategoryId;
  nameKo: string;
  nameEn: string;
  emoji: string;
  bgColor: string;
  textColor: string;
}

export interface StudySession {
  categoryId: CategoryId;
  cards: WordCard[];
  currentIndex: number;
  known: string[];
  unknown: string[];
  startedAt: Date;
  completedAt?: Date;
}

export interface ChildProgress {
  cardId: string;
  timesCorrect: number;
  timesIncorrect: number;
  lastStudied: string; // ISO string
}

export interface ProgressStore {
  version: 1;
  progress: Record<string, ChildProgress>;
}

export type Page = 'home' | 'study' | 'result';

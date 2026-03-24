import type { Category } from '../types';
import animals from './words/animals';
import colors from './words/colors';
import numbers from './words/numbers';
import food from './words/food';
import fruits from './words/fruits';
import vehicles from './words/vehicles';
import bodyParts from './words/bodyParts';
import type { WordCard } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'animals', nameKo: '동물', nameEn: 'Animals', emoji: '🐾', bgColor: '#FF8C42', textColor: '#fff' },
  { id: 'colors', nameKo: '색깔', nameEn: 'Colors', emoji: '🎨', bgColor: '#FF6B9D', textColor: '#fff' },
  { id: 'numbers', nameKo: '숫자', nameEn: 'Numbers', emoji: '🔢', bgColor: '#4A90D9', textColor: '#fff' },
  { id: 'food', nameKo: '음식', nameEn: 'Food', emoji: '🍽️', bgColor: '#F5A623', textColor: '#fff' },
  { id: 'fruits', nameKo: '과일', nameEn: 'Fruits', emoji: '🍓', bgColor: '#E74C3C', textColor: '#fff' },
  { id: 'vehicles', nameKo: '탈것', nameEn: 'Vehicles', emoji: '🚗', bgColor: '#4ECDC4', textColor: '#fff' },
  { id: 'bodyParts', nameKo: '신체', nameEn: 'Body Parts', emoji: '💪', bgColor: '#9B59B6', textColor: '#fff' },
];

export const ALL_WORDS: Record<string, WordCard[]> = {
  animals,
  colors,
  numbers,
  food,
  fruits,
  vehicles,
  bodyParts,
};

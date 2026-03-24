import type { ChildProgress, ProgressStore } from '../types';

const STORAGE_KEY = 'kids-flashcard-progress-v1';

function loadStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: 1, progress: {} };
    const parsed = JSON.parse(raw) as ProgressStore;
    if (parsed.version !== 1) return { version: 1, progress: {} };
    return parsed;
  } catch {
    return { version: 1, progress: {} };
  }
}

function saveStore(store: ProgressStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // silent fail — storage might be full
  }
}

export function getProgress(cardId: string): ChildProgress | null {
  const store = loadStore();
  return store.progress[cardId] ?? null;
}

export function recordResult(cardId: string, correct: boolean): void {
  const store = loadStore();
  const existing = store.progress[cardId] ?? {
    cardId,
    timesCorrect: 0,
    timesIncorrect: 0,
    lastStudied: '',
  };
  store.progress[cardId] = {
    ...existing,
    timesCorrect: existing.timesCorrect + (correct ? 1 : 0),
    timesIncorrect: existing.timesIncorrect + (correct ? 0 : 1),
    lastStudied: new Date().toISOString(),
  };
  saveStore(store);
}

export function getAllProgress(): Record<string, ChildProgress> {
  return loadStore().progress;
}

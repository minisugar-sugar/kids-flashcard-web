import { useState, useCallback } from 'react';
import type { CategoryId, StudySession, WordCard } from '../types';
import { ALL_WORDS } from '../data/categories';
import { recordResult } from './useProgress';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useStudySession(onComplete: (session: StudySession) => void) {
  const [session, setSession] = useState<StudySession | null>(null);

  const startSession = useCallback((categoryId: CategoryId) => {
    const cards = shuffle(ALL_WORDS[categoryId] ?? []);
    setSession({
      categoryId,
      cards,
      currentIndex: 0,
      known: [],
      unknown: [],
      startedAt: new Date(),
    });
  }, []);

  const retryUnknown = useCallback(() => {
    setSession(prev => {
      if (!prev || prev.unknown.length === 0) return prev;
      const unknownCards = shuffle(
        prev.cards.filter(c => prev.unknown.includes(c.id))
      );
      return {
        ...prev,
        cards: unknownCards,
        currentIndex: 0,
        known: [],
        unknown: [],
        startedAt: new Date(),
        completedAt: undefined,
      };
    });
  }, []);

  const markKnown = useCallback(() => {
    setSession(prev => {
      if (!prev) return prev;
      const card: WordCard = prev.cards[prev.currentIndex];
      recordResult(card.id, true);
      const known = [...prev.known, card.id];
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex >= prev.cards.length) {
        const completed: StudySession = {
          ...prev,
          known,
          currentIndex: nextIndex,
          completedAt: new Date(),
        };
        onComplete(completed);
        return completed;
      }
      return { ...prev, known, currentIndex: nextIndex };
    });
  }, [onComplete]);

  const markUnknown = useCallback(() => {
    setSession(prev => {
      if (!prev) return prev;
      const card: WordCard = prev.cards[prev.currentIndex];
      recordResult(card.id, false);
      const unknown = [...prev.unknown, card.id];
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex >= prev.cards.length) {
        const completed: StudySession = {
          ...prev,
          unknown,
          currentIndex: nextIndex,
          completedAt: new Date(),
        };
        onComplete(completed);
        return completed;
      }
      return { ...prev, unknown, currentIndex: nextIndex };
    });
  }, [onComplete]);

  const currentCard = session ? session.cards[session.currentIndex] ?? null : null;

  return { session, currentCard, startSession, retryUnknown, markKnown, markUnknown };
}

import { useState, useEffect } from 'react';
import type { CategoryId, StudySession } from '../types';
import { CATEGORIES } from '../data/categories';
import { useStudySession } from '../hooks/useStudySession';
import { useProgressContext } from '../context/ProgressContext';
import FlashCard from '../components/FlashCard';
import ProgressBar from '../components/ProgressBar';
import ResultScreen from '../components/ResultScreen';

interface StudyPageProps {
  categoryId: CategoryId;
  onHome: () => void;
}

export default function StudyPage({ categoryId, onHome }: StudyPageProps) {
  const { playCorrectSound } = useProgressContext();
  const [completedSession, setCompletedSession] = useState<StudySession | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const { session, currentCard, startSession, retryUnknown, markKnown, markUnknown } =
    useStudySession((s) => setCompletedSession(s));

  useEffect(() => {
    startSession(categoryId);
    setCompletedSession(null);
  }, [categoryId, startSession]);

  // Reset flip state when session restarts
  useEffect(() => {
    setIsFlipped(false);
  }, [session?.currentIndex]);

  if (completedSession) {
    return (
      <ResultScreen
        session={completedSession}
        onRetryUnknown={() => {
          setCompletedSession(null);
          retryUnknown();
        }}
        onHome={onHome}
        onRetryAll={() => {
          setCompletedSession(null);
          startSession(categoryId);
        }}
      />
    );
  }

  if (!session || !currentCard) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4" style={{ backgroundColor: '#FFFBF0' }}>
        <p style={{ fontSize: '48px' }}>🐣</p>
        <p
          className="text-center mt-4 font-bold"
          style={{ fontSize: '20px', color: '#6B7280', fontFamily: "'Jua', sans-serif" }}
        >
          준비 중입니다! 곧 추가돼요
        </p>
        <button
          onClick={onHome}
          className="mt-6 rounded-full font-bold"
          style={{
            backgroundColor: '#FF6B35',
            color: '#fff',
            padding: '16px 32px',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer',
            minHeight: '60px',
            fontFamily: "'Jua', sans-serif",
          }}
        >
          홈으로 🏠
        </button>
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === categoryId);
  const total = session.cards.length;
  const current = session.currentIndex;

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#FFFBF0' }}>
      {/* Top bar */}
      <div className="flex items-center px-4 pt-4 pb-2 gap-3">
        <button
          onClick={onHome}
          className="rounded-full flex items-center justify-center transition-transform active:scale-90"
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#fff',
            border: '2px solid #E5E7EB',
            fontSize: '20px',
            cursor: 'pointer',
          }}
          aria-label="홈으로"
        >
          ←
        </button>
        <div className="flex-1">
          <p style={{ fontSize: '14px', color: '#9CA3AF', fontFamily: "'Nunito', sans-serif" }}>
            {category?.emoji} {category?.nameKo}
          </p>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar current={current} total={total} />

      {/* Card area — flex-1 so it takes up available space */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4">
        <div style={{ width: '100%', maxWidth: '400px', height: '320px', position: 'relative' }}>
          <FlashCard card={currentCard} onFlip={() => setIsFlipped(true)} />
        </div>

        {!isFlipped && (
          <p
            className="mt-4 text-center"
            style={{ fontSize: '15px', color: '#9CA3AF' }}
          >
            카드를 탭해서 뒤집어 보세요 👆
          </p>
        )}
      </div>

      {/* Action buttons — only visible after flip */}
      <div
        className="px-4 pb-6 flex gap-3 transition-all duration-300"
        style={{ opacity: isFlipped ? 1 : 0, pointerEvents: isFlipped ? 'auto' : 'none' }}
      >
        <button
          onClick={() => {
            markUnknown();
            setIsFlipped(false);
          }}
          className="flex-1 rounded-full font-bold transition-transform active:scale-95"
          style={{
            backgroundColor: '#E5E7EB',
            color: '#374151',
            padding: '16px',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            minHeight: '60px',
            fontFamily: "'Jua', sans-serif",
          }}
        >
          다시 해볼게요 😅
        </button>
        <button
          onClick={() => {
            playCorrectSound();
            markKnown();
            setIsFlipped(false);
          }}
          className="flex-1 rounded-full font-bold transition-transform active:scale-95"
          style={{
            backgroundColor: '#4ECDC4',
            color: '#fff',
            padding: '16px',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            minHeight: '60px',
            fontFamily: "'Jua', sans-serif",
          }}
        >
          알겠어요! ✓
        </button>
      </div>
    </div>
  );
}

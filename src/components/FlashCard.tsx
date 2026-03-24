import { useState, useEffect } from 'react';
import type { WordCard } from '../types';

interface FlashCardProps {
  card: WordCard;
  onFlip?: () => void;
}

export default function FlashCard({ card, onFlip }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  // Reset flip state when card changes
  useEffect(() => {
    setFlipped(false);
  }, [card.id]);

  function handleFlip() {
    if (!flipped) {
      setFlipped(true);
      onFlip?.();
    }
  }

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{ perspective: '1000px', minHeight: '320px' }}
      onClick={handleFlip}
      role="button"
      aria-label={flipped ? `한국어: ${card.korean}` : `영어: ${card.english}, 탭하여 뒤집기`}
    >
      <div className={`flip-card-inner w-full h-full absolute inset-0 ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div
          className="flip-card-front absolute inset-0 rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 gap-4"
          style={{ backgroundColor: '#fff', border: '3px solid #FF6B35' }}
        >
          <div style={{ fontSize: '100px', lineHeight: 1 }}>{card.emoji}</div>
          <p
            className="font-bold text-center"
            style={{ fontSize: '32px', color: '#2D2D2D', fontFamily: "'Nunito', sans-serif" }}
          >
            {card.english}
          </p>
          <p style={{ fontSize: '14px', color: '#9CA3AF' }}>탭하여 뒤집기 👆</p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back absolute inset-0 rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 gap-4"
          style={{ backgroundColor: '#FF6B35' }}
        >
          <div style={{ fontSize: '80px', lineHeight: 1 }}>{card.emoji}</div>
          <p
            className="font-bold text-center"
            style={{ fontSize: '40px', color: '#fff', fontFamily: "'Jua', sans-serif" }}
          >
            {card.korean}
          </p>
          <p
            className="font-semibold"
            style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', fontFamily: "'Nunito', sans-serif" }}
          >
            {card.english}
          </p>
        </div>
      </div>
    </div>
  );
}

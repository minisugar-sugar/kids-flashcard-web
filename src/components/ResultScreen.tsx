import { useEffect, useRef } from 'react';
import type { StudySession } from '../types';

interface ResultScreenProps {
  session: StudySession;
  onRetryUnknown: () => void;
  onHome: () => void;
  onRetryAll: () => void;
}

const STARS = ['⭐', '🌟', '✨', '💫', '⭐', '🌟'];

export default function ResultScreen({ session, onRetryUnknown, onHome, onRetryAll }: ResultScreenProps) {
  const total = session.cards.length;
  const known = session.known.length;
  const unknown = session.unknown.length;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const stars: HTMLElement[] = [];

    STARS.forEach((star, i) => {
      const el = document.createElement('div');
      el.textContent = star;
      const angle = (i / STARS.length) * 360;
      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * 80;
      const ty = Math.sin(rad) * 80;
      el.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 28px;
        transform: translate(-50%, -50%);
        --tx: ${tx}px;
        --ty: ${ty}px;
        animation-delay: ${i * 80}ms;
      `;
      el.className = 'star pointer-events-none';
      container.appendChild(el);
      stars.push(el);
    });

    return () => {
      stars.forEach(s => s.remove());
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8" style={{ backgroundColor: '#FFFBF0' }}>
      <div ref={containerRef} className="relative flex items-center justify-center mb-6" style={{ width: '160px', height: '160px' }}>
        <span style={{ fontSize: '80px' }}>🎉</span>
      </div>

      <h1
        className="text-center font-bold mb-2"
        style={{ fontSize: '36px', color: '#FF6B35', fontFamily: "'Jua', sans-serif" }}
      >
        잘했어요!
      </h1>

      <p style={{ fontSize: '18px', color: '#6B7280', marginBottom: '24px' }}>
        공부가 끝났어요
      </p>

      <div
        className="rounded-3xl p-6 mb-6 text-center shadow-lg"
        style={{ backgroundColor: '#fff', width: '100%', maxWidth: '320px' }}
      >
        <p style={{ fontSize: '16px', color: '#9CA3AF', marginBottom: '8px' }}>결과</p>
        <p style={{ fontSize: '48px', fontWeight: 800, color: '#4ECDC4', fontFamily: "'Nunito', sans-serif" }}>
          {known} <span style={{ fontSize: '28px', color: '#9CA3AF' }}>/ {total}</span>
        </p>
        <p style={{ fontSize: '16px', color: '#6B7280', marginTop: '4px' }}>맞힌 카드</p>

        {unknown > 0 && (
          <div
            className="mt-4 rounded-2xl px-4 py-2"
            style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '14px' }}
          >
            틀린 카드 {unknown}개 — 다시 해볼까요?
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full" style={{ maxWidth: '320px' }}>
        {unknown > 0 && (
          <button
            onClick={onRetryUnknown}
            className="rounded-full font-bold transition-transform active:scale-95"
            style={{
              backgroundColor: '#FF6B35',
              color: '#fff',
              padding: '16px',
              fontSize: '18px',
              border: 'none',
              cursor: 'pointer',
              minHeight: '60px',
              fontFamily: "'Jua', sans-serif",
            }}
          >
            틀린 카드 다시하기 🔄
          </button>
        )}
        <button
          onClick={onRetryAll}
          className="rounded-full font-bold transition-transform active:scale-95"
          style={{
            backgroundColor: '#4ECDC4',
            color: '#fff',
            padding: '16px',
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer',
            minHeight: '60px',
            fontFamily: "'Jua', sans-serif",
          }}
        >
          처음부터 다시하기 ↩
        </button>
        <button
          onClick={onHome}
          className="rounded-full font-bold transition-transform active:scale-95"
          style={{
            backgroundColor: '#E5E7EB',
            color: '#374151',
            padding: '16px',
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
    </div>
  );
}

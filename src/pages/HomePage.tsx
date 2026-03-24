import type { CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import CategoryGrid from '../components/CategoryGrid';
import { useProgressContext } from '../context/ProgressContext';

interface HomePageProps {
  onSelectCategory: (id: CategoryId) => void;
}

export default function HomePage({ onSelectCategory }: HomePageProps) {
  const { soundEnabled, setSoundEnabled } = useProgressContext();

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#FFFBF0' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
        <div />
        <h1
          className="text-center font-bold"
          style={{ fontSize: '28px', color: '#FF6B35', fontFamily: "'Jua', sans-serif" }}
        >
          단어 공부하기! 📚
        </h1>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="rounded-full flex items-center justify-center transition-transform active:scale-90"
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#fff',
            border: '2px solid #E5E7EB',
            fontSize: '24px',
            cursor: 'pointer',
          }}
          aria-label={soundEnabled ? '소리 끄기' : '소리 켜기'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Subtitle */}
      <p
        className="text-center mb-4"
        style={{ fontSize: '15px', color: '#9CA3AF', fontFamily: "'Nunito', sans-serif" }}
      >
        카테고리를 골라서 시작해요!
      </p>

      {/* Category Grid */}
      <CategoryGrid categories={CATEGORIES} onSelect={onSelectCategory} />
    </div>
  );
}

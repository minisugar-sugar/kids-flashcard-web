import type { Category } from '../types';
import { ALL_WORDS } from '../data/categories';

interface CategoryGridProps {
  categories: Category[];
  onSelect: (id: Category['id']) => void;
}

export default function CategoryGrid({ categories, onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
      {categories.map(cat => {
        const count = ALL_WORDS[cat.id]?.length ?? 0;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="flex flex-col items-center justify-center rounded-3xl shadow-lg transition-transform active:scale-95 hover:scale-105"
            style={{
              backgroundColor: cat.bgColor,
              color: cat.textColor,
              minHeight: '110px',
              padding: '16px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '48px', lineHeight: 1 }}>{cat.emoji}</span>
            <span
              className="font-bold mt-2"
              style={{ fontSize: '20px', fontFamily: "'Jua', sans-serif" }}
            >
              {cat.nameKo}
            </span>
            <span style={{ fontSize: '12px', opacity: 0.85, marginTop: '2px' }}>
              {cat.nameEn}
            </span>
            <span
              className="rounded-full px-2 py-0.5 mt-2 font-bold"
              style={{ fontSize: '12px', backgroundColor: 'rgba(0,0,0,0.2)' }}
            >
              {count}개 단어
            </span>
          </button>
        );
      })}
    </div>
  );
}

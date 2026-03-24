import { useState } from 'react';
import type { CategoryId, Page } from './types';
import { ProgressProvider } from './context/ProgressContext';
import HomePage from './pages/HomePage';
import StudyPage from './pages/StudyPage';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);

  function goToStudy(id: CategoryId) {
    setSelectedCategory(id);
    setPage('study');
  }

  function goHome() {
    setPage('home');
    setSelectedCategory(null);
  }

  return (
    <ProgressProvider>
      {page === 'home' && <HomePage onSelectCategory={goToStudy} />}
      {page === 'study' && selectedCategory && (
        <StudyPage categoryId={selectedCategory} onHome={goHome} />
      )}
    </ProgressProvider>
  );
}

<!-- /autoplan restore point: /root/.gstack/projects/kids-flashcard-web/feature-flashcard-web-autoplan-restore-20260324-014036.md -->
# Kids English Vocabulary Flashcard Web App

## Overview
A web application for children to study English vocabulary using flashcards. Designed for kids aged 5–12 with a fun, accessible UI.

## Goals
- Help children learn English vocabulary in an engaging, interactive way
- Simple, intuitive interface usable by young children
- Track learning progress per card (spaced repetition or simple known/unknown)
- Support for word categories (animals, colors, numbers, food, etc.)
- Each card shows: English word, Korean translation, image, pronunciation audio

## Core Features

### MVP (Phase 1)
1. **Flashcard View** — Show word (English), image, tap to reveal Korean translation
2. **Word Categories** — Pre-built sets: Animals, Colors, Numbers, Body Parts, Food, Fruits, Vehicles
3. **Study Session** — Flip through cards in a category, mark "Got it!" / "Try Again"
4. **Progress Tracking** — Per-session score (X/Y cards known)
5. **Simple Navigation** — Home screen → pick category → study

### Phase 2 (Post-MVP)
- Spaced repetition algorithm (SM-2)
- Parent dashboard (track child progress over time)
- Custom word sets (parents add their own)
- Sound effects and animations for correct answers
- Multiple children profiles

## Tech Stack
- **Frontend**: React + Vite (TypeScript)
- **Styling**: Tailwind CSS + custom kid-friendly theme
- **State**: React Context + useReducer (no backend for MVP)
- **Storage**: localStorage (persist progress)
- **Audio**: Web Audio API / HTML5 audio for pronunciation
- **Images**: Free word image library (Pixabay/Unsplash API or bundled SVGs)
- **Deployment**: Vercel / Netlify (static)

## Data Model

### WordCard
```ts
interface WordCard {
  id: string;
  english: string;
  korean: string;
  category: CategoryId;
  imageUrl: string;
  audioUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
```

### StudySession
```ts
interface StudySession {
  categoryId: CategoryId;
  cards: WordCard[];
  known: string[];   // card IDs
  unknown: string[]; // card IDs
  startedAt: Date;
  completedAt?: Date;
}
```

### Progress (persisted in localStorage)
```ts
interface ChildProgress {
  cardId: string;
  timesCorrect: number;
  timesIncorrect: number;
  lastStudied: Date;
}
```

## UI / UX Design

### Pages / Screens
1. **Home** — Big colorful category buttons with icons, title "단어 공부하기!"
2. **Category Screen** — Grid of cards in the category, progress bar
3. **Flashcard Screen** — Large card with image + English word, tap to flip, reveal Korean
4. **Result Screen** — Celebration animation, score, "다시하기" / "홈으로" buttons

### Design Principles
- Very large touch targets (min 60px)
- Bright, saturated colors
- Rounded corners, friendly fonts (e.g., Nunito, Jua)
- Korean and English text clearly distinguished
- Minimal text in UI chrome — icons preferred
- Works on mobile (portrait) and tablet

## File Structure
```
src/
  components/
    FlashCard.tsx       — flip animation card component
    CategoryGrid.tsx    — home screen category selector
    ProgressBar.tsx     — session progress indicator
    ResultScreen.tsx    — end-of-session celebration
  pages/
    HomePage.tsx
    CategoryPage.tsx
    StudyPage.tsx
  data/
    words/
      animals.ts
      colors.ts
      numbers.ts
      food.ts
      fruits.ts
      vehicles.ts
      bodyParts.ts
  hooks/
    useStudySession.ts  — session state management
    useProgress.ts      — localStorage persistence
  context/
    ProgressContext.tsx
  types/
    index.ts
  App.tsx
  main.tsx
```

## Design Specifications (added by /autoplan)

### Color System
- Primary: `#FF6B35` (orange)
- Secondary: `#4ECDC4` (teal)
- Background: `#FFFBF0` (warm cream)
- Text: `#2D2D2D`

### Typography
- Korean: Jua (Google Fonts, preloaded, subset to Korean+Latin)
- English: Nunito
- Card word size: minimum 28px
- UI chrome: minimum 16px

### Spacing / Shape
- Card border-radius: `24px`
- Button border-radius: `100px` (pill)
- Touch target minimum: `60px`

### Card Flip Spec
- CSS `rotateY(0deg → 180deg)`, 400ms, `ease-in-out`
- Front: image top 60% + English word bottom 40%
- Back: Korean word center (Jua 36px) + romanization small below
- `will-change: transform` on flip element
- `prefers-reduced-motion`: instant swap, no animation

### Information Hierarchy

#### Home Screen
1. App title + illustration (brand)
2. Category grid — 2 columns, full-color backgrounds (not icon-in-circle)
3. Overall progress (bottom, optional)

#### Study Screen
1. Flashcard (fills 70% of screen)
2. "Got it!" / "Try Again" buttons (bottom, full-width, 56px)
3. Progress indicator (top, minimal bar)

#### Result Screen
1. Celebration animation (CSS stars burst + "잘했어요!")
2. Score: X / Y 카드
3. "다시하기" / "홈으로" buttons

### Interaction States

| Feature | Loading | Empty | Error | Success |
|---|---|---|---|---|
| Category grid | Skeleton | Never empty (static) | — | Renders |
| Study session | — | "준비 중입니다! 곧 추가돼요 🐣" + home button | — | ResultScreen |
| Card image | Skeleton | — | Emoji fallback (🐶🍎 etc) | Image shows |
| Progress save | — | Empty progress (silent) | Toast "저장 실패" | — |

### Sound Effects
- Default: ON (show 🔊 toggle on home screen)
- iOS auto-play: try/catch, silent fallback
- Correct answer: soft positive chime
- No negative buzzer sounds (research: harmful for kids)

### Responsive
- Mobile (360-414px): PRIMARY — 2-col category grid, full-width card
- Tablet (768px+): 3-col categories, centered card max-width 400px

### Navigation
- State-based (no React Router): `currentPage: 'home' | 'category' | 'study' | 'result'`
- No URL changes needed for MVP

## Out of Scope (MVP)
- Backend / database
- User accounts / login
- Spaced repetition algorithm
- Custom word sets
- Multiple children profiles
- Offline PWA support
- Analytics

## Decision Audit Trail

<!-- AUTONOMOUS DECISION LOG -->

| # | Phase | Decision | Principle | Rationale | Rejected |
|---|-------|----------|-----------|-----------|----------|
| 1 | CEO | Tech stack: React+Vite vs Next.js vs Vanilla | P3+P5 | React+Vite is right-sized; Next.js overkill (no SSR benefit); Vanilla loses TypeScript safety | Next.js, Vanilla |
| 2 | CEO | Navigation: React Router vs state-based | P5 | 3 screens, no deep linking needed; state-based is 10x simpler and readable | React Router |
| 3 | CEO | Images: bundled SVGs vs Unsplash API | P5+P3 | No external dependency or API key; fully controlled child-safe content | Unsplash API |
| 4 | CEO | Card flip trigger: whole card vs button | P1 | Largest possible touch target; most intuitive for kids | Dedicated button only |
| 5 | CEO | "Known" definition: immediate vs explicit tap | P5 | Explicit "Got it!" tap prevents accidental marks | Auto-mark on flip |
| 6 | CEO | localStorage schema: add version field | P1 | Enables Phase 2 migrations without schema confusion | No versioning |
| 7 | CEO | Age levels: Easy/Standard modes | P1+P2 | Research proves children react negatively to age-mismatched content | Single difficulty |
| 8 | CEO | Positive feedback sounds | P1 | Research: negative buzzers harm kids; positive chimes boost engagement | No sound / buzzers |
| 9 | CEO | Shuffle mode | P1 | Prevents memorization by card position; XS effort | No shuffle |
| 10 | CEO | Word count on category buttons | P3 | XS effort, clear UX win | No word count |
| 11 | CEO | "Try again with unknown" mode | P1 | Directly supports learning goal, trivial state | One-shot only |
| 12 | CEO | Swipe gestures | P5 | Adds complexity; tap targets sufficient; defer | DEFERRED to TODOS.md |
| 13 | CEO | Favorite cards | P5 | Borderline MVP scope; state complexity | DEFERRED to TODOS.md |
| 14 | CEO | Auto-save mid-session | P1 | Prevents progress loss on browser close | End-of-session only |
| 15 | Design | Color palette: warm orange+teal vs generic blue | P5 | Specific, non-AI-slop palette; warm for kids | Purple/blue gradients |
| 16 | Design | Font: Jua+Nunito vs system fonts | P5 | No default font stacks; character reflects kids audience | Inter/Roboto/system |
| 17 | Design | Category buttons: full-color vs icon-in-circle | P5 | Icon-in-circle is AI slop pattern; full-color is differentiating | Icon-in-circle grid |
| 18 | Design | Sound default: ON with toggle | P5 | Kids love sounds; iOS fallback handled; show 🔊 toggle | Always off |
| 19 | Eng | File count (12 files): no reduction | P3 | Every file has single responsibility; consolidation saves nothing | Monolithic files |
| 20 | Eng | Audio: HTML5 vs Web Audio API | P5 | Web Audio API is over-engineered for simple SFX | Web Audio API |
| 21 | Eng | Test framework: Vitest + RTL + Playwright | P1+P5 | Standard Vite ecosystem; no extra config; full coverage capability | Jest (not Vite-native) |

## Success Metrics
- Kids can complete a full study session without adult help
- Cards load in < 1 second
- Works on common mobile browsers (Safari iOS, Chrome Android)

# 단어 공부하기 — Kids English Vocabulary Flashcard Web App

어린이(5~12세)를 위한 영어 단어 플래시카드 웹 앱입니다.
카드를 탭해서 뒤집으면 한국어 뜻이 나타나고, "알겠어요!" / "다시 해볼게요"로 학습 진도를 추적합니다.

---

## 기능 (MVP — Phase 1 완료)

- **7개 카테고리** — 동물, 색깔, 숫자, 음식, 과일, 탈것, 신체 (총 62개 단어)
- **플래시카드 뒤집기** — CSS 3D flip 애니메이션 (400ms), `prefers-reduced-motion` 대응
- **학습 세션** — 카드 셔플, "알겠어요 ✓" / "다시 해볼게요 😅" 마킹
- **결과 화면** — 점수 표시, 틀린 카드 재도전 모드
- **진도 저장** — `localStorage`에 맞힌 횟수/틀린 횟수 자동 저장 (버전 스키마 v1)
- **사운드 효과** — 정답 시 부드러운 차임 (Web Audio API, 🔊 토글 가능)
- **모바일 최적화** — 터치 타깃 최소 60px, 모바일(360px) / 태블릿(768px+) 반응형

---

## 기술 스택

| 항목 | 선택 |
|---|---|
| 프레임워크 | React 19 + Vite 8 + TypeScript |
| 스타일 | Tailwind CSS v4 (`@tailwindcss/vite`) |
| 상태 관리 | React Context + useState |
| 데이터 저장 | localStorage (스키마 버전 v1) |
| 오디오 | Web Audio API |
| 라우팅 | 상태 기반 네비게이션 (React Router 없음) |
| 런타임 | [Bun](https://bun.sh) |

---

## 환경 설정

### Bun 설치 (macOS / Linux)

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.zshrc   # 또는 터미널 재시작
```

Windows는 [Bun 공식 문서](https://bun.sh/docs/installation) 참고 (WSL 권장).
Node.js 18+와 npm / pnpm으로도 실행 가능 — 아래 명령의 `bun`을 대체하면 됩니다.

---

## 실행 방법

```bash
# 1. 저장소 클론
git clone <repo-url>
cd kids-flashcard-web

# 2. 의존성 설치
bun install

# 3. 개발 서버 실행
bun run dev
# → http://localhost:5173

# 4. 프로덕션 빌드
bun run build

# 5. 빌드 결과물 미리보기
bun run preview
# → http://localhost:4173
```

### Docker / 원격 컨테이너 환경

`package.json`에 `--host` 옵션이 적용되어 있어 `bun run dev` 실행 시 `0.0.0.0:5173`에 바인딩됩니다.
VSCode **Ports** 탭에서 `5173` 포트를 포워딩하면 호스트 브라우저에서 접근 가능합니다.

---

## 프로젝트 구조

```
src/
├── types/index.ts              # 공통 타입 정의
├── data/
│   ├── categories.ts           # 카테고리 목록 + ALL_WORDS 맵
│   └── words/                  # 카테고리별 단어 데이터 (7개 파일)
├── context/ProgressContext.tsx # 사운드 상태, playCorrectSound
├── hooks/
│   ├── useProgress.ts          # localStorage 읽기/쓰기
│   └── useStudySession.ts      # 세션 상태, 셔플, known/unknown 추적
├── components/
│   ├── FlashCard.tsx           # 3D flip 카드
│   ├── CategoryGrid.tsx        # 홈 카테고리 그리드
│   ├── ProgressBar.tsx         # 진행률 바
│   └── ResultScreen.tsx        # 결과 화면 (별 버스트 애니메이션)
├── pages/
│   ├── HomePage.tsx            # 홈 화면
│   └── StudyPage.tsx           # 학습 화면
├── App.tsx                     # 상태 기반 네비게이션 루트
└── main.tsx                    # 엔트리포인트
```

---

## 데이터 모델

```ts
// 단어 카드
interface WordCard {
  id: string;
  english: string;
  korean: string;
  category: CategoryId;
  emoji: string;          // 이미지 대신 이모지 사용
  difficulty: 'easy' | 'medium' | 'hard';
}

// localStorage 저장 구조 (key: 'kids-flashcard-progress-v1')
interface ProgressStore {
  version: 1;
  progress: Record<string, {
    cardId: string;
    timesCorrect: number;
    timesIncorrect: number;
    lastStudied: string;  // ISO 8601
  }>;
}
```

---

## 기획 문서

- [`PLAN.md`](./PLAN.md) — 전체 기획, 기술 스택 결정 근거, UI/UX 명세, 의사결정 로그 21개
- [`TODOS.md`](./TODOS.md) — MVP에서 제외된 Phase 2 기능 목록

---

## AI 에이전트 인수인계 가이드

### 현재 상태

Phase 1 (MVP) 완료. `bun run build` 빌드 통과.

### Phase 2 개발 우선순위

`TODOS.md` 항목 기준 권장 순서:

1. **Playwright E2E 테스트** — `playwright.config.ts` 추가, 홈→학습→결과 플로우 테스트
2. **스와이프 제스처** — 우측 스와이프=알겠어요, 좌측=다시. `useStudySession` 훅에 제스처 핸들러 추가
3. **즐겨찾기 카드** — `ProgressStore`에 `favorites: string[]` 필드 추가, 하트 버튼 UI
4. **스페이스드 리피티션 (SM-2)** — `ChildProgress`에 `easeFactor`, `nextReview` 필드 추가
5. **부모 대시보드** — `getAllProgress()`로 카테고리별 통계 화면 구성
6. **오프라인 PWA** — `vite-plugin-pwa` 추가, `manifest.json` 작성

### 코드 작성 규칙

- TypeScript `verbatimModuleSyntax` 활성화 → 타입 임포트는 반드시 `import type` 사용
- Tailwind CSS v4 유틸리티 + 인라인 `style` 병용. 디자인 토큰은 `src/index.css`의 `@theme` 블록에 정의
- React Router 도입 금지 — 상태 기반 네비게이션 유지 (PLAN.md 의사결정 #2)
- 새 카테고리 추가 순서:
  1. `src/data/words/<name>.ts` 파일 생성
  2. `src/data/categories.ts`의 `CATEGORIES` 배열 및 `ALL_WORDS` 맵에 등록
  3. `src/types/index.ts`의 `CategoryId` 유니온 타입에 추가

### 디자인 토큰

```
Primary:    #FF6B35  (오렌지)
Secondary:  #4ECDC4  (teal — 정답 버튼, 진행 바)
Background: #FFFBF0  (따뜻한 크림)
Text:       #2D2D2D
Font KO:    Jua (Google Fonts)
Font EN:    Nunito (Google Fonts)
Card radius: 24px  |  Button radius: 100px (pill)
Min touch target: 60px
```

---

## 라이선스

MIT

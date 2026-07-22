# Project Setup

Vite + React + TypeScript 기반 Reading Log 개발 환경 구성 요약입니다.

## Scripts

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (5173) |
| `npm run build` | 타입체크 + 프로덕션 빌드 |
| `npm run preview` | 빌드 미리보기 |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint 자동 수정 |
| `npm run format` | Prettier 포맷 |
| `npm run typecheck` | TypeScript 검사 |

## Path Alias

- `@/*` → `src/*`
- Vite: [`vite.config.ts`](../vite.config.ts)
- TS: [`tsconfig.app.json`](../tsconfig.app.json)

## 환경변수

1. `.env.example`을 복사해 `.env` 생성
2. 필수 키:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. 선택 키:
   - `VITE_GOOGLE_BOOKS_API_KEY` (도서 검색 할당량 여유용, 없어도 동작)
4. 접근 코드: [`src/shared/config/env.ts`](../src/shared/config/env.ts)

## 핵심 진입점

| 영역 | 파일 |
|---|---|
| Tailwind | `src/styles/index.css` + `@tailwindcss/vite` |
| React Query | `src/shared/lib/query-client.ts` → `QueryProvider` |
| Router | `src/app/router/index.tsx` |
| Supabase | `src/shared/lib/supabase/client.ts` |
| App bootstrap | `src/app/main.tsx` |

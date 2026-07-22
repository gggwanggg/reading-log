# Reading Log

모바일 중심 독서 기록 웹앱 — 서재·한 줄 메모·태그·지식 정원·독서 스트릭을 Supabase와 함께 관리합니다.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 과정명 | AI SW 장기교육 |
| 과제 번호 | 과제 5 |
| 과제명 | 리액트를 이용해서 독서 기록 앱 만들기 |
| 프로젝트명 | reading-log |
| 한 줄 소개 | 이 앱은 **독서가**가 **책·메모·태그**를 조회·추가·수정·삭제하고, 지식 그래프와 스트릭으로 독서 습관을 살펴볼 수 있도록 돕는 React CRUD 앱입니다. |
| 데이터 저장 방식 | □ mock data / □ LocalStorage / ☑ Supabase |
| 배포 또는 실행 링크 | https://reading-log-omega-seven.vercel.app/ |
| GitHub 링크 | https://github.com/gggwanggg/reading-log |

## 1-1. 내가 선택한 수행 수준

| 구분 | 나의 선택 | 설명 |
|---|:---:|---|
| 초급자 | □ | mock data 또는 LocalStorage 기반으로 Read/Create/Update/Delete 4개 흐름 확인 |
| 표준 학습자 | □ | 컴포넌트 분리, 입력 검증, 빈 상태·오류 상태 처리 |
| 심화 학습자 | ☑ | Supabase 연결 또는 설계, Auth/RLS 개념 검토, 보안 주의사항 기록 |

---

## 2. 실행 화면

| 화면 | 설명 | 캡처 |
|---|---|---|
| Login | Google OAuth 로그인 | (캡처 추가) |
| Library (서재) | 등록한 책 목록·검색 등록·상태 뱃지 | (캡처 추가) |
| Book Detail | 책 상세, 상태 변경, 해당 책 메모 | (캡처 추가) |
| Memo (기록) | 메모 목록·작성·수정·삭제, 태그 연결 | (캡처 추가) |
| Graph (지식 정원) | Note 노드 + 동일 Tag 엣지 Force Graph | (캡처 추가) |
| Calendar (스트릭) | GitHub Grass 스타일 잔디·연속일 | (캡처 추가) |
| Profile | 계정·태그/달력/정원 바로가기·로그아웃 | (캡처 추가) |
| 빈 상태 / 오류 상태 | EmptyState · ErrorState · 폼 검증 메시지 | |


> `screenshots/` 폴더에 캡처 사진 넣어두었습니다.

---

## 3. 주요 기능

### 3-1. 필수 기능

| 번호 | 기능 | 구현 여부 | 설명 |
|---:|---|---|---|
| 1 | 목록 조회 Read | ☑ 완료 / □ 부분 / □ 미완료 | 서재(`books`), 메모(`book_notes`), 태그 목록 조회 (React Query) |
| 2 | 항목 추가 Create | ☑ 완료 / □ 부분 / □ 미완료 | Google Books 검색 후 서재 등록, 메모 작성(+태그), 태그 생성 |
| 3 | 항목 수정 Update | ☑ 완료 / □ 부분 / □ 미완료 | 책 읽기 상태 변경, 메모·태그 수정 |
| 4 | 항목 삭제 Delete | ☑ 완료 / □ 부분 / □ 미완료 | 책·메모·태그 삭제(확인 UI) |
| 5 | 데이터 구조 정의 | ☑ 완료 / □ 부분 / □ 미완료 | Supabase 스키마·마이그레이션·RLS (`supabase/`) |

### 3-2. 권장 기능

| 번호 | 기능 | 구현 여부 | 설명 |
|---:|---|---|---|
| 1 | 컴포넌트 분리 | ☑ 완료 / □ 부분 / □ 미완료 | Feature 기반 (`features/*`) + 공통 UI (`shared/ui`) |
| 2 | 입력 검증 | ☑ 완료 / □ 부분 / □ 미완료 | React Hook Form + Zod (메모·태그 등) |
| 3 | 빈 상태 처리 | ☑ 완료 / □ 부분 / □ 미완료 | `EmptyState` (서재·메모·그래프·잔디 등) |
| 4 | 오류 상태 처리 | ☑ 완료 / □ 부분 / □ 미완료 | `ErrorState` + Auth/API 에러 메시지 |
| 5 | LocalStorage 저장 | □ 완료 / □ 부분 / ☑ 미완료 | Supabase 사용 (의도적 미사용) |
| 6 | 검색 또는 필터 | ☑ 완료 / □ 부분 / □ 미완료 | Google Books API 도서 검색 → 서재 저장 |

### 3-3. 도전 기능

| 번호 | 기능 | 시도 여부 | 결과 |
|---:|---|---|---|
| 1 | Supabase 연결 | ☑ 시도 / □ 미시도 | Auth + DB + RLS 적용, `anon` 키만 프론트 사용 |
| 2 | Auth/RLS 개념 검토 | ☑ 시도 / □ 미시도 | Google OAuth(PKCE), 테이블별 own-row RLS (`supabase/AUTH.md`, `SCHEMA.md`) |
| 3 | 보안 주의사항 기록 | ☑ 시도 / □ 미시도 | `.env` / service role 미노출, 문서화 |
| 4 | 배포 또는 외부 공유 | ☑ 시도 / □ 미시도 | Vercel 배포, `vercel.json` SPA rewrite, Supabase Site URL·Redirect 연동 확인 |
| 5 | 지식 정원 (Force Graph) | ☑ 시도 / □ 미시도 | Node=Book Note, Edge=공유 Tag |
| 6 | 독서 스트릭 (Grass) | ☑ 시도 / □ 미시도 | `created_at` 기준 잔디·연속일 (Dayjs) |
| 7 | UI 테마 | ☑ 시도 / □ 미시도 | 픽셀·파스텔·힐링 게임 (Tailwind) |

---

## 4. 사용 기술

| 구분 | 사용 기술 | 사용 이유 |
|---|---|---|
| 프론트엔드 | React 19 + TypeScript | 컴포넌트·타입 안전 UI |
| 개발 도구 | Vite 8 | 빠른 로컬 개발·빌드 |
| 라우팅 | React Router 7 | Splash·Auth·Feature 화면 분리 |
| 서버 상태 | TanStack React Query | 목록/캐시·무효화·낙관적 삭제 |
| 폼 | React Hook Form + Zod | 입력 검증 |
| 스타일 | Tailwind CSS v4 | 픽셀·파스텔 UI, 유틸리티만으로 테마 |
| 그래프 | react-force-graph-2d | 지식 정원 시각화 |
| 날짜 | Dayjs | 스트릭·날짜 포맷 |
| 데이터 | Supabase (Auth + PostgreSQL) | CRUD·RLS·Google OAuth |
| 외부 API | Google Books API (선택) | 도서 검색 (키 없어도 기본 검색 가능) |
| 배포 | Vercel | Vite 정적 빌드(`dist`) + SPA rewrite |
| AI 도구 | Cursor | 아키텍처·기능·UI·트러블슈팅 보조 |
| 제출 | GitHub / Vercel | 소스·README·실행 환경 공유 |

---

## 5. 실행 방법

### 5-1. 설치 및 실행

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
# .env에 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY 입력
npm run dev
```

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (기본 http://localhost:5173) |
| `npm run build` | 타입체크 + 프로덕션 빌드 |
| `npm run preview` | 빌드 미리보기 |
| `npm run lint` / `format` / `typecheck` | 품질 검사 |

상세: [`docs/SETUP.md`](./docs/SETUP.md)

### 5-1-1. Vercel 배포 (완료)

- GitHub 연동 Import, Framework: Vite, Output: `dist`
- Environment Variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (선택: `VITE_GOOGLE_BOOKS_API_KEY`)
- SPA 라우팅: 루트 [`vercel.json`](./vercel.json)
- Supabase Authentication → URL Configuration에 Production Site URL·`/auth/callback` Redirect 등록
- Google 로그인·경로 새로고침 동작 확인 완료

### 5-2. Supabase 준비

1. 프로젝트 생성 후 `.env`에 URL·anon key 설정
2. SQL 마이그레이션 적용: [`supabase/migrations/20260720000000_init_reading_log.sql`](./supabase/migrations/20260720000000_init_reading_log.sql)
3. Auth → Google provider 활성화
4. URL Configuration
   - Site URL: `http://localhost:5173`
   - Redirect URLs: `http://localhost:5173/auth/callback`

자세한 Auth 절차: [`supabase/AUTH.md`](./supabase/AUTH.md)

### 5-3. 실행 확인 방법

1. 앱 실행 → Splash → Login (Google)
2. **서재**: 책 검색·등록, 목록·상세·상태 변경·삭제
3. **메모**: 서재 책 선택 후 작성, 태그 입력, 수정·삭제
4. **정원**: 동일 태그가 있는 메모끼리 연결되는지 확인
5. **달력**: 오늘 메모 작성 시 잔디·스트릭 갱신
6. **프로필**: 로그아웃·태그 관리 진입
7. 새로고침 후 Supabase에 데이터가 유지되는지 확인

---

## 6. 데이터 구조

핵심 테이블 (상세 ERD·인덱스·RLS: [`supabase/SCHEMA.md`](./supabase/SCHEMA.md))

### `books` (서재)

| 필드명 | 자료형 | 필수 | 설명 | 예시 |
|---|---|:---:|---|---|
| id | uuid | ☑ | PK | … |
| user_id | uuid | ☑ | 소유자 | … |
| title | text | ☑ | 제목 | 데미안 |
| author | text | □ | 저자 | 헤르만 헤세 |
| cover_url | text | □ | 표지 URL | https://… |
| status | enum | ☑ | reading / finished / paused / wishlist | reading |
| created_at | timestamptz | ☑ | 생성 시각 | … |

### `book_notes` (메모)

| 필드명 | 자료형 | 필수 | 설명 | 예시 |
|---|---|:---:|---|---|
| id | uuid | ☑ | PK | … |
| user_id | uuid | ☑ | 소유자 | … |
| book_id | uuid | ☑ | 서재 책 FK | … |
| content | text | ☑ | 메모 본문 | 새는 알을 깨고 나온다 |
| note_date | date | ☑ | 기록일 | 2026-07-22 |
| created_at | timestamptz | ☑ | 생성 시각 (스트릭 기준) | … |

### `tags` / `note_tags`

| 테이블 | 역할 |
|---|---|
| tags | 사용자별 태그 (name, color) |
| note_tags | 메모 ↔ 태그 N:M |

### 기타

| 테이블 | 역할 |
|---|---|
| users | Auth 유저 프로필 확장 (1:1) |
| streaks | 스트릭 저장용(스키마 존재). UI 잔디는 `book_notes.created_at` 집계 |

### 데이터 예시 설명

```text
실제 개인정보나 민감 데이터가 아닌 샘플·본인 Google 계정으로 검증했습니다.
도서 메타데이터는 Google Books 공개 API 결과를 사용합니다.
```

---

## 7. 폴더 및 파일 구조

Feature 기반 구조입니다. 기능 단위로 API·훅·컴포넌트·스키마를 묶었습니다.

```text
reading-log/
├─ README.md
├─ PROMPT.md                 # AI 프롬프트·버전 이력
├─ package.json
├─ index.html
├─ .env.example
├─ vercel.json               # Vercel SPA rewrite
├─ docs/
│  ├─ SETUP.md
│  └─ TROUBLESHOOTING.md
├─ supabase/
│  ├─ AUTH.md
│  ├─ SCHEMA.md
│  ├─ migrations/
│  └─ seed.sql
└─ src/
   ├─ app/                   # main, App, router, providers
   ├─ pages/                 # 라우트 페이지(얇은 래퍼)
   ├─ features/
   │  ├─ auth/
   │  ├─ books/              # 서재·검색·상세·상태
   │  ├─ memos/              # 메모 CRUD
   │  ├─ tags/               # TagInput·TagManager
   │  ├─ graph/              # 지식 정원
   │  ├─ streak/             # 잔디·연속일
   │  └─ splash/
   ├─ shared/
   │  ├─ ui/                 # Button, Pixel*, EmptyState …
   │  ├─ lib/                # supabase, query, dayjs
   │  ├─ constants/
   │  ├─ hooks/
   │  ├─ api/
   │  └─ utils/
   └─ styles/index.css       # Tailwind 테마·파스텔 토큰
```

| 파일/폴더 | 역할 |
|---|---|
| `src/app/router` | 공개/보호 라우트, Splash·Profile 포함 |
| `src/features/*` | 도메인별 API·훅·UI |
| `src/shared/ui` | 픽셀 패널·버튼 등 공통 UI |
| `supabase/migrations` | DB·RLS 초기화 SQL |
| `PROMPT.md` | 요청 프롬프트 이력 |
| `docs/TROUBLESHOOTING.md` | UX·버그 해결 기록 |

---

## 8. AI 활용 기록

| 번호 | 사용 목적 | 사용한 AI 도구 | 입력한 프롬프트 요약 | AI 응답 활용 방식 | 내가 수정한 부분 |
|---:|---|---|---|---|---|
| 1 | 요구사항·아키텍처 | Cursor | Feature 기반 Reading Log 설계 | 폴더·도메인 구조 채택 | 화면/내비 문구·우선순위 조정 |
| 2 | Supabase 스키마 | Cursor | users/books/book_notes/tags RLS | 마이그레이션·문서 반영 | 대시보드에서 Auth URL 직접 설정 |
| 3 | Auth | Cursor | Google OAuth PKCE | AuthProvider·콜백 라우트 | Redirect URL·환경변수 검증 |
| 4 | 서재 CRUD·검색 | Cursor | Google Books → 서재 저장 | API·캐시·Sheet UI | 등록 CTA 단일화 등 UX 수정 |
| 5 | 메모 CRUD·태그 | Cursor | TagInput + note_tags | 폼·목록 연동 | 책 필수 선택 규칙 확인 |
| 6 | 지식 정원 | Cursor | Force Graph Note/Tag 엣지 | 그래프 데이터 빌더·UI | Empty/모바일 줌 확인 |
| 7 | 스트릭 | Cursor | created_at Grass·Dayjs | 잔디·연속 계산 | 파스텔 레벨 색 조정 |
| 8 | UI 테마 | Cursor | 픽셀·파스텔·힐링 게임 | Pixel* 컴포넌트·화면 적용 | 폰트·내비 라벨 검토 |
| 9 | 오류·UX 보완 | Cursor | 등록 버튼 중복, 상태 클릭 충돌 | 코드 수정 + TROUBLESHOOTING | 상세에서만 상태 수정 등 확정 |
| 10 | README 정리 | Cursor | 구현 결과로 README 채우기 | 본 문서 초안 | Vercel 배포 반영, 캡처·제출란은 추가 보완 |

전체 원문: [`PROMPT.md`](./PROMPT.md)

### 대표 프롬프트 1: 요구사항 정리

```text
당신은 시니어 React + TypeScript + Supabase 개발자입니다.
아래 요구사항을 기반으로 프로젝트 전체 아키텍처를 설계해주세요.
목표: 모바일 최적화, React+Vite+TS, Tailwind, Supabase, React Query, Router, RHF, Zod, Force Graph, Dayjs
서비스: 독서 기록, 한 줄 메모, 태그, 지식 그래프, 스트릭 달력
```

### 대표 프롬프트 2: 기능 구현

```text
메모도 crud가 가능하도록 설정해주세요
태그 기능을 구현해주세요. (여러 개 입력, 자동완성, 중복 제거, 삭제, 수정) TagInput 재사용
React Force Graph로 지식 정원 — Node=Book Note, Edge=같은 Tag
독서 스트릭 — book_note 생성일, GitHub Grass, 파스텔, Dayjs
```

### 대표 프롬프트 3: 오류 해결 또는 수정 요청

```text
서재 탭에서 책 등록 버튼이 여러 개 보입니다. 하나만 남기도록 수정해주세요.
서재에서 상태 클릭 시 select와 상세 이동이 동시에 됩니다. 목록에서는 수정 불가, 상세에서만 수정.
```

---

## 9. AI 생성 결과 검토 기록

| 검토 항목 | 확인 결과 | 보완 내용 |
|---|---|---|
| 필수 CRUD 기능 | ☑ 통과 / □ 보완 필요 | 책·메모·태그 CRUD 동작 확인 |
| 데이터 구조 | ☑ 통과 / □ 보완 필요 | SCHEMA·migration과 앱 타입 정합 |
| 컴포넌트 구조 | ☑ 통과 / □ 보완 필요 | Feature 경계 유지, pages는 얇게 |
| 입력 검증 | ☑ 통과 / □ 보완 필요 | Zod 스키마·필수 book_id |
| 빈 상태·오류 상태 | ☑ 통과 / □ 보완 필요 | Empty/Error/Spinner 공통 사용 |
| 저장 방식 | ☑ 통과 / □ 보완 필요 | Supabase + RLS |
| 코드 이해도 | ☑ 통과 / □ 보완 필요 | 훅·캐시 키·Auth 흐름 검토 |
| 보안 | ☑ 통과 / □ 보완 필요 | anon만 사용, `.env` gitignore |
| 과도한 구현 | □ 통과 / ☑ 보완 필요 | 그래프·스트릭·테마는 도전 기능으로 범위 명시 |

---

## 10. 오류 해결 기록

| 번호 | 발생 상황 | 오류 메시지 | 원인 | 해결 방법 | 재실행 결과 |
|---:|---|---|---|---|---|
| 1 | 서재에 등록 CTA가 3개 | (UX) | 헤더·요약·목록에 동일 액션 중복 | `+ 책 등록` 하나만 유지 | 진입점 단일화 |
| 2 | 상태 select + 상세 이동 동시 | (UX) | 카드 Link 안 select 클릭 전파 | 목록은 뱃지만, 상세에서만 picker | 혼란 해소 |
| 3 | 상세 상태 UI가 과도/미흡 | (UI) | picker 면적·위치 | compact picker + 색상 태그 | 가독성 개선 |

상세: [`docs/TROUBLESHOOTING.md`](./docs/TROUBLESHOOTING.md)

---

## 11. 테스트 기록

| 번호 | 테스트 항목 | 입력 또는 행동 | 기대 결과 | 실제 결과 | 통과 여부 |
|---:|---|---|---|---|:---:|
| 1 | 초기 화면 | `npm run dev` | Splash → Login 또는 서재 | 세션 없으면 Login | ☑ |
| 2 | 책 추가 | 검색 후 등록 | 서재 목록에 표시 | Supabase `books` 반영 | ☑ |
| 3 | 빈 입력 | 메모 내용/책 없이 저장 | 검증 오류 | Zod/폼 메시지 | ☑ |
| 4 | 메모 수정 | 수정 화면 저장 | 내용·태그 갱신 | 목록·상세 반영 | ☑ |
| 5 | 메모/책 삭제 | 확인 후 삭제 | 목록에서 제거 | 캐시 무효화 후 갱신 | ☑ |
| 6 | 새로고침 | F5 | 로그인·데이터 유지 | Supabase 세션·DB | ☑ |
| 7 | Supabase 연결 | CRUD | DB 반영 | RLS own row | ☑ |
| 8 | 지식 정원 | 공통 태그 메모 2개+ | 노드·엣지 표시 | Force Graph | ☑ |
| 9 | 스트릭 | 오늘 메모 작성 | 오늘 잔디·스트릭 | Grass UI | ☑ |
| 10 | 타입/빌드 | `npm run build` | 성공 | 성공 | ☑ |
| 11 | Vercel 배포 | Production URL 접속·로그인 | Splash/로그인/CRUD | 배포·Auth Redirect 확인 | ☑ |

---

## 12. Supabase 확장 기록(선택)

| 항목 | 작성 내용 |
|---|---|
| 사용 여부 | ☑ 사용 / □ 미사용 |
| 테이블 이름 | `users`, `books`, `book_notes`, `tags`, `note_tags`, `streaks` |
| 주요 컬럼 | 위 §6 참고 |
| 사용한 작업 | ☑ select / ☑ insert / ☑ update / ☑ delete |
| Auth 사용 여부 | ☑ 사용 (Google OAuth) / □ 미사용 |
| RLS 검토 여부 | ☑ 검토 / □ 미검토 |
| 보안상 주의한 점 | anon key만 Vite에 노출, service role 미사용, RLS로 user_id 격리 |

### Supabase 보안 메모

```text
- service role key 또는 secret key는 브라우저 코드, GitHub, README, 캡처에 노출하지 않았습니다.
- 공개 schema의 테이블은 RLS를 적용했습니다 (본인 row만 CRUD).
- 실제 민감 업무 데이터를 저장하지 않았습니다.
- .env는 저장소에 올리지 않고 .env.example만 공유했습니다.
```

---

## 13. 실시간 응시 기록과 10일 보완 기록

| 구분 | 작성 내용 |
|---|---|
| 실시간 1시간 안에 작성한 요구사항 | 독서 기록 CRUD + 모바일 웹, Supabase·태그·그래프·스트릭 방향 |
| 실시간 1시간 안에 사용한 프롬프트 | 아키텍처 설계, 스키마, Auth 스캐폴딩 |
| 실시간 1시간 안에 확인한 AI 생성 결과 | Feature 폴더·라우터·스키마 초안 |
| 실시간 1시간 안에 발생한 오류 또는 보완 계획 | Env·OAuth Redirect·마이그레이션 적용 필요 |
| 10일 보완 기간에 완성한 기능 | 서재/메모/태그 CRUD, 지식 정원, 스트릭, 픽셀 UI, Vercel 배포, 트러블슈팅 문서 |
| 10일 보완 기간에 추가한 README/캡처/테스트 기록 | README·PROMPT·TROUBLESHOOTING·Vercel 배포 기록 (캡처는 추가 예정) |

## 14. 보완 전후 비교

| 보완 항목 | 보완 전 | 보완 후 | 재실행 결과 |
|---|---|---|---|
| CRUD 기능 | 스캐폴딩·부분 목록 | 책·메모·태그 전체 CRUD | 정상 |
| 컴포넌트 구조 | 예시 수준 | Feature + shared UI | 확장 용이 |
| 입력 검증·상태 처리 | 미비 | Zod + Empty/Error | 검증·안내 동작 |
| 저장 방식 | 미연결 | Supabase + RLS | 데이터 유지 |
| README | 빈 템플릿 | 구현·배포 반영 작성 | 제출용 문서 갱신 |
| 보안 점검 | 미문서화 | AUTH/SCHEMA/보안 메모 | anon·RLS 확인 |
| 배포 | 로컬만 | Vercel + Supabase Redirect | 로그인·CRUD 확인 |

---

## 15. 보안·개인정보·저작권 점검

| 항목 | 확인 내용 | 상태 |
|---|---|:---:|
| 개인정보 | 과제용 Google 계정만 사용, 불필요 개인정보 미수집 | ☑ |
| 민감 데이터 | 건강·금융 등 민감 데이터 미사용 | ☑ |
| API Key | service role 미사용·미커밋, Google Books 키는 `.env`만 | ☑ |
| `.env` | `.gitignore`로 제외, `.env.example`만 공개 | ☑ |
| 외부 공유 링크 | Vercel 공개 URL·anon key만 사용, service role 미노출 확인 | ☑ |
| 저작권 | Google Books·폰트(Press Start 2P, Nunito) 라이선스 범위 내 사용 | ☑ |
| 출처·라이선스 | 의존성은 `package.json`, 스키마·문서는 저장소 내 명시 | ☑ |
| AI 생성 코드 | CRUD·UX·보안을 직접 실행·검토 후 반영 | ☑ |

---

## 16. 배운 점

1. Feature 단위로 API·훅·UI를 나누면 서재·메모·그래프처럼 기능이 늘어도 경계가 유지된다.
2. Supabase는 RLS와 Auth Redirect를 함께 맞춰야 “동작하는 CRUD”가 된다.
3. 모바일에서는 같은 액션의 CTA를 하나만 두고, 목록/상세의 상호작용을 분리하는 것이 UX에 중요하다.
4. AI 초안은 빠르지만, Empty/Error·검증·캐시 무효화는 사람이 시나리오로 검증해야 한다.

---

## 17. 아쉬운 점과 다음 개선 방향

| 아쉬운 점 | 원인 | 다음 개선 방향 |
|---|---|---|
| README에 Production URL 미기입 | 배포 직후 문서만 우선 갱신 | Vercel Domains URL을 §1·§18에 붙여 넣기 |
| 스크린샷 미첨부 | 문서 우선 작성 | `screenshots/` 캡처 후 §2 갱신 |
| `streaks` 테이블과 UI 집계 이중성 | UI는 note `created_at` 집계 | 트리거로 streaks 동기화 또는 스키마 정리 |
| 번들 용량 (Force Graph) | 단일 청크 | 그래프 라우트 코드 스플리팅 |

---

## 18. 제출 정보

| 항목 | 링크 또는 설명 |
|---|---|
| GitHub 링크 | https://github.com/gggwanggg/reading-log |
| 실행 링크 | https://reading-log-omega-seven.vercel.app/ |
| 실행 화면 캡처 | `./screenshots/` |
| 과제 안내 Colab | `과제5_ReactCRUD_과제안내_v0.2.ipynb` |
| 제출 폼 | `https://drive.google.com/drive/u/1/folders/1fYGx7aXnfqyXOF9MhFwMwiupVOqNvEwH` |
| 관련 문서 | [SETUP](./docs/SETUP.md) · [AUTH](./supabase/AUTH.md) · [SCHEMA](./supabase/SCHEMA.md) · [TROUBLESHOOTING](./docs/TROUBLESHOOTING.md) · [PROMPT](./PROMPT.md) |

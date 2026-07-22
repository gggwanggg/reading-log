# Project Prompt History

## [v0.0.1] PROMPT.md 생성 및 프롬프트 이력 기록 체계 도입
- **요청 목적**: 프로젝트의 버전별 변경 이력과 AI 프롬프트를 루트 `PROMPT.md`에 기록하고, 이후 모든 기능 구현·수정 요청 시 코드 변경과 함께 이 파일을 갱신하기 위함
- **사용된 프롬프트 원본**:
  ```text
  우리는 지금부터 새로운 프로젝트를 시작할 겁니다.
  이 프로젝트의 버전별 변경 이력과 AI 프롬프트를 기록하기 위해 루트 디렉토리에 PROMPT.md 파일을 생성해주세요.

  앞으로 내가 요구하는 모든 기능 구현이나 수정 요청에 대해, 코드를 수정하기 전이나 후에 반드시 이 PROMPT.md 파일도 함께 업데이트해줬으면 좋겠어요. 버전(Version) 정보는 내가 나중에 직접 수정할 수 있도록 형식을 비워두고 아래 양식을 엄격하게 지켜서 작성해주세요.

  PROMPT.md 파일의 양식:

  ---
  # Project Prompt History

  ## [v0.x.x] 작업 제목 (예: 프로젝트 초기화)
  - **요청 목적**: 이 작업을 왜 하는지 간략한 설명
  - **사용된 프롬프트 원본**: 
    ```text
    [내가 입력한 프롬프트 그대로 복사]
  ```

## [v0.0.2] Reading Log 프로젝트 아키텍처 설계 및 스캐폴딩
- **요청 목적**: 독서 기록·한 줄 메모·태그·지식 그래프·스트릭 달력 모바일 웹 서비스의 확장 가능한 Feature 기반 아키텍처를 설계하고, 확정된 구조로 프로젝트 스캐폴딩 및 Supabase 스키마 초안을 구성하기 위함
- **사용된 프롬프트 원본**:
  ```text
  당신은 시니어 React + TypeScript + Supabase 개발자입니다.

  아래 요구사항을 기반으로 프로젝트 전체 아키텍처를 설계해주세요.

  목표
  - 모바일 최적화 웹 서비스
  - React + Vite + TypeScript
  - TailwindCSS
  - Supabase(Auth + Database + Storage)
  - React Query
  - React Router
  - React Hook Form
  - Zod Validation
  - React Force Graph
  - Dayjs

  요구사항

  서비스 컨셉
  - 독서 기록
  - 한 줄 메모
  - 태그
  - 태그 기반 지식 그래프
  - 스트릭 달력

  설계해 주세요.

  1. 폴더 구조
  2. Domain 구조
  3. Component 구조
  4. Hook 구조
  5. API Layer
  6. Utils
  7. Constants
  8. Types
  9. 공통 UI 컴포넌트
  10. Feature 기반 구조

  확장성을 고려한 구조를 제안해주세요.

  ---
  Reading Log 프로젝트 아키텍처 설계

  Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

  To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.
  ```

## [v0.0.3] Supabase Database 설계 (users/books/book_notes/tags/note_tags/streaks)
- **요청 목적**: Reading Log 서비스의 Supabase DB를 지정 테이블 구조로 설계하고, ERD·PK/FK·Index·Cascade·타임스탬프·SQL·RLS·Storage 정책까지 문서화·마이그레이션으로 반영하기 위함
- **사용된 프롬프트 원본**:
  ```text
  이 프로젝트의 Supabase Database를 설계해주세요.

  필요한 내용

  - ERD
  - 테이블 정의
  - PK/FK
  - Index
  - Cascade 정책
  - CreatedAt
  - UpdatedAt

  테이블은

  users
  books
  book_notes
  tags
  note_tags
  streaks

  로 구성해주세요.

  추가로

  - SQL 생성문
  - RLS 정책
  - Storage 정책

  까지 작성해주세요.
  ```

## [v0.1.0] Supabase Auth Google 로그인 설계 및 구현
- **요청 목적**: Google OAuth 기반 로그인/로그아웃·세션·Refresh Token·Protected/Public Route·Auth Context·useAuth Hook을 예외처리 포함해 설계하고 앱에 반영하기 위함
- **사용된 프롬프트 원본**:
  ```text
  Supabase Auth를 이용하여 로그인 기능을 설계해주세요.

  지원

  - Google Login

  필요한 내용

  - 로그인 Flow
  - 로그아웃
  - Session 관리
  - Refresh Token
  - Protected Route
  - Public Route
  - Auth Context
  - useAuth Hook

  예외처리까지 고려해주세요.
  ```

## [v0.x.x] Vite 프로젝트 기반 세팅 (패키지/Tailwind/ESLint/Prettier/alias/env)
- **요청 목적**: Vite 프로젝트 기준으로 패키지 설치, Tailwind, ESLint, Prettier, path alias, 환경변수, React Query, Router, Supabase Client까지 개발 기반을 완성하기 위함
- **사용된 프롬프트 원본**:
  ```text
  위 구조를 기준으로

  Vite 프로젝트를 생성했다고 가정합니다.

  필요한

  - package 설치
  - Tailwind 설정
  - eslint
  - prettier
  - alias
  - 환경변수
  - React Query
  - Router
  - Supabase Client

  까지 모두 세팅해주세요.

  모든 코드를 작성해주세요.
  ```


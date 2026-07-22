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

## [v0.2.0] Vite 프로젝트 기반 세팅 (패키지/Tailwind/ESLint/Prettier/alias/env)
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

## [v0.3.0] 도서 검색 기능 구현 (제목/저자, React Query)
- **요청 목적**: 외부 검색 API로 제목·저자 도서 검색(debounce·loading·error·empty)을 제공하고, 선택 시 books 테이블에 저장하기 위함
- **사용된 프롬프트 원본**:
  ```text
  도서 검색 기능을 구현해주세요.

  요구사항

  - 검색 API 사용
  - 제목
  - 저자 검색

  기능

  - debounce
  - loading
  - error
  - empty state

  검색 성공 시

  books 테이블에 저장합니다.

  React Query를 사용해주세요.

  컴포넌트 분리 원칙을 적용해주세요.
  ```

## [v0.4.0] 내 서재 기능 구현 (목록/등록/삭제/상세, RQ Cache)
- **요청 목적**: 모바일 카드형 내 서재에서 책 목록·등록·삭제·상세를 제공하고, React Query 캐시(optimistic·initialData·setQueryData)를 적극 활용하기 위함
- **사용된 프롬프트 원본**:
  ```text
  내 서재 기능을 구현해주세요.

  기능

  - 책 목록
  - 등록
  - 삭제
  - 상세보기

  UI

  - 모바일 최적화
  - 카드형

  React Query Cache를 적극 활용해주세요.
  ```

## [v0.4.1] 서재 등록 버튼 중복 제거
- **요청 목적**: 서재 탭에 중복된 책 등록 진입점을 정리하고, '나의 책' 옆 '+ 책 등록' 버튼만 남기기 위함
- **사용된 프롬프트 원본**:
  ```text
  서재 탭에서 책을 등록할 수 있는 버튼이 3개 정도로 보입니다.
  사진에 나오는 버튼 제외하고 삭제해주세요.
  ```

## [v0.4.2] 책 읽기 상태(읽고 싶음 등) 사용자 수정
- **요청 목적**: 서재에 표시되는 책 상태 태그를 사용자가 직접 변경할 수 있도록 하기 위함
- **사용된 프롬프트 원본**:
  ```text
  서재 탭에서 책마다 "읽고 싶음" 이라는 태그가 보이는데 이에 대해 사용자가 수정할 수 있도록 구현해주세요.
  만약 db 구조 변화로 인해 Supabase에서 따로 설정해야 될 것이 있다면 알려주세요.
  ```

## [v0.4.3] 책 상태 수정: 서재 목록 비활성 + 상세에서만 명확히 수정
- **요청 목적**: 서재 카드에서 상태 select와 상세 이동이 겹치는 혼란을 없애고, 상세 페이지에서만 상태를 눈에 띄게 수정하도록 하기 위함
- **사용된 프롬프트 원본**:
  ```text
  서재 탭에서 특정 책의 상태를 변화시키기 위해 클릭하면 상태를 변화시키기 위한 셀렉트가 열어집니다. 그와 동시에 해당 책의 상세 페이지로 넘어갑니다.
  이러한 혼란을 없애기 위해 여러 책이 있는 서재 탭에서는 수정을 못하도록 막고, 책의 상세 페이지로 넘어갔을 때 수정할 수 있도록 변경해주세요.
  그리고 현재는 상태 부분을 변경할 수 있도록 보이지 않습니다. 이러한 점도 고려하여 적용해주세요.
  ```

## [v0.4.4] 서재 상태 태그 위치·너비 및 상세 상태 UI 축소
- **요청 목적**: 서재 카드에서 상태를 제목 오른쪽 태그로 두고 글자 너비만 쓰게 하며, 상세의 상태 변경 UI 면적을 줄이기 위함
- **사용된 프롬프트 원본**:
  ```text
  서재 탭에서는 상태를 책 제목 오른쪽에 태그 형식으로 넣는 방식 택해주세요. 글자 개수만큼 너비 차지하도록 수정

  또한 책 상세 페이지에서 현재 읽기 상태 변경 부분이 크게 차지 하고 있습니다.
  ```

## [v0.4.5] 책 읽기 상태 태그 색상 구분
- **요청 목적**: 서재·상세의 읽기 상태 태그를 상태별로 다른 색으로 구분해 가독성을 높이기 위함
- **사용된 프롬프트 원본**:
  ```text
  책 읽기 상태에 대한 태그에 대해 상태 별로 색깔 다르게 설정
  ```  

## [v0.5.0] 메모 작성 시 서재 등록 책 필수 선택
- **요청 목적**: 기록 탭 메모가 사용자가 서재에 등록한 책 1권에 반드시 연결되도록 하기 위함
- **사용된 프롬프트 원본**:
  ```text
  기록 탭에서 메모 작성하는 것에 대해
  사용자가 미리 서재 탭에서 등록했던 책 1권을 대상으로 메모가 생기도록 수정해주세요.
  ```

## [v0.5.1] 메모 CRUD (목록/작성/수정/삭제)
- **요청 목적**: 기록 탭 메모에 대해 조회·작성뿐 아니라 수정·삭제까지 완전한 CRUD를 제공하기 위함
- **사용된 프롬프트 원본**:
  ```text
  메모도 crud가 가능하도록 설정해주세요
  ```

## [v0.6.0] 태그 기능 구현 (TagInput, tags/note_tags)
- **요청 목적**: 여러 태그 입력·자동완성·중복 제거·삭제·수정을 지원하는 재사용 TagInput을 만들고 tags/note_tags에 연동하기 위함
- **사용된 프롬프트 원본**:
  ```text
  태그 기능을 구현해주세요.

  기능

  - 여러 개 입력
  - 자동완성
  - 중복 제거
  - 삭제
  - 수정

  DB는

  tags
  note_tags

  를 사용합니다.

  TagInput 컴포넌트를 재사용 가능하도록 만들어주세요.
  ```

## [v0.7.0] 지식 정원 (React Force Graph, Note 노드)
- **요청 목적**: Book Note를 노드로, 동일 Tag를 공유하는 Note 간 엣지로 지식 정원을 시각화하기 위함 (Zoom/Drag/Mobile/Empty State)
- **사용된 프롬프트 원본**:
  ```text
  React Force Graph를 이용하여

  지식 정원을 구현해주세요.

  규칙

  Node
  - Book Note

  Edge
  - 같은 Tag를 가진 Note

  요구사항

  - Zoom
  - Drag
  - Mobile
  - Empty State

  Graph Data 생성 함수도 작성해주세요.
  ```

## [v0.8.0] 독서 스트릭 (GitHub Grass, book_note 생성일)
- **요청 목적**: book_note 생성일 기준으로 오늘 작성 시 잔디를 만들고 연속일을 계산하며, GitHub Grass·파스텔·모바일 UI로 보여주기 위함 (Dayjs)
- **사용된 프롬프트 원본**:
  ```text
  독서 스트릭 기능을 구현해주세요.

  규칙

  book_note 생성일 기준

  오늘 작성하면

  잔디 생성

  연속 날짜 계산

  UI

  Github Grass 스타일

  파스텔 색상

  모바일 최적화

  Dayjs를 사용해주세요.
  ```

## [v0.8.1] 전체 UI 재설계 (픽셀·파스텔·힐링 게임)
- **요청 목적**: Splash~Profile까지 화면을 픽셀 감성·파스텔톤·힐링 게임 컨셉으로 Tailwind 전용 컴포넌트 단위 설계·적용하기 위함
- **사용된 프롬프트 원본**:
  ```text
  프로젝트 전체 UI를 설계해주세요.

  컨셉

  픽셀 감성
  파스텔톤
  힐링 게임

  화면

  - Splash
  - Login
  - Library
  - Book Detail
  - Memo
  - Graph
  - Calendar
  - Profile

  TailwindCSS만 사용해주세요.

  컴포넌트 단위로 설계해주세요.
  ```



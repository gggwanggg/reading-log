# 프로젝트 트러블슈팅 (Troubleshooting)

이 문서는 프로젝트 진행 중 발생한 에러, 문제 상황, 원인 분석 및 해결 과정을 기록합니다.

## 📋 목차
- [서재 탭 책 등록 버튼 중복 노출](#이슈-서재-탭-책-등록-버튼-중복-노출)
- [서재 책 상태 수정 UX 충돌 및 UI 정리](#이슈-서재-책-상태-수정-ux-충돌-및-ui-정리)

---

## 📝 템플릿 (새로운 이슈 작성 시 아래 형식을 복사하여 사용)

### [이슈 제목: 에러 메시지나 문제 상황 요약]
- **발생 일자:** YYYY-MM-DD
- **발생 환경:** (예: Frontend / Backend / 특정 라이브러리 버전 등)

#### 🚨 1. 문제 상황 (Problem)
- 어떤 상황에서 발생했는지 구체적인 증상 설명
- 에러 메시지 또는 콘솔 로그 (코드 블록 사용)

#### 🔍 2. 원인 분석 (Cause)
- 문제가 발생한 근본적인 원인
- 왜 이런 에러가 발생했는지에 대한 가설 및 분석

#### 🛠️ 3. 시도한 방법들 (Attempts)
- 해결을 위해 시도했던 방법들과 그 결과 (실패한 방법도 기록)
- **시도 1:** [내용] ➔ [결과/실패 이유]
- **시도 2:** [내용] ➔ [결과/실패 이유]

#### ✅ 4. 해결 방법 (Solution)
- 최종적으로 문제를 해결한 방법
- 수정 전/후 코드 비교 또는 구체적인 설정 변경 내역

#### 💡 5. 배운 점 및 참고 자료 (Learnings & References)
- 이 문제를 통해 알게 된 점이나 주의할 점
- 참고한 공식 문서, Stack Overflow, 블로그 링크 등

---

## 이슈 기록

### [이슈: 서재 탭 책 등록 버튼 중복 노출]
- **발생 일자:** 2026-07-22
- **발생 환경:** Frontend / React (`LibrarySection`, `BookList`, `AppHeader`)

#### 🚨 1. 문제 상황 (Problem)
- 서재 탭(`/books`)에서 책을 등록할 수 있는 진입점이 **약 3개**로 보임
- 화면에 동시에 노출되던 버튼:
  1. 헤더 우측 **등록**
  2. `나의 책` 옆 **+ 책 등록** (유지할 버튼)
  3. 목록 하단 **+ 책 더 등록하기**
- 동일 동작(등록 바텀시트 오픈)이 여러 곳에 있어 UI가 산만하고 모바일에서 혼란을 줌

#### 🔍 2. 원인 분석 (Cause)
- `내 서재` 기능 구현 시 등록 진입점을 여러 레이어에 중복 배치함
  - `LibrarySection`: 헤더 `rightSlot` + 요약 영역 버튼
  - `BookList`: `onRegisterClick` prop으로 하단 추가 링크
- 기능 자체는 정상이지만, **단일 진입점(Single CTA)** 원칙을 지키지 못한 UX 이슈

#### 🛠️ 3. 시도한 방법들 (Attempts)
- **시도 1:** 사용자 스크린샷 기준으로 유지할 CTA 확정 (`나의 책` 옆 `+ 책 등록`) ➔ 채택
- **시도 2:** 헤더/목록 하단 등록 진입점 제거, 요약 영역 버튼만 유지 ➔ 해결

#### ✅ 4. 해결 방법 (Solution)
- `LibrarySection`
  - 헤더 `rightSlot`의 **등록** 버튼 제거
  - `AppHeader`는 타이틀만 표시
  - `나의 책` / `N권` 옆 **+ 책 등록**만 남겨 바텀시트(`BookSearchSection`) 오픈
- `BookList`
  - `onRegisterClick` prop 및 **+ 책 더 등록하기** 링크 제거
  - 목록/empty/error/loading 역할만 담당하도록 단순화

수정 후 등록 진입점:

```text
서재 탭
└─ 나의 책 / N권  ……  [+ 책 등록]  ← 유일한 등록 CTA
   └─ 카드 목록
```

관련 파일:
- `src/features/books/components/LibrarySection.tsx`
- `src/features/books/components/BookList.tsx`

#### 💡 5. 배운 점 및 참고 자료 (Learnings & References)
- 같은 액션의 CTA는 화면당 **1개**로 두는 것이 모바일 UX에 유리함
- 기능 확장 시 “접근성”을 이유로 헤더/본문/푸터에 동일 버튼을 반복하지 않도록 주의
- 목록 컴포넌트(`BookList`)는 데이터 표시에 집중하고, 등록 같은 화면 오케스트레이션은 상위(`LibrarySection`)에서만 다루는 편이 책임이 명확함

---

### [이슈: 서재 책 상태 수정 UX 충돌 및 UI 정리]
- **발생 일자:** 2026-07-22
- **발생 환경:** Frontend / React (`BookCard`, `BookStatusPicker`, `BookDetailView`) · Supabase `books.status` (`book_status` enum)
- **관련 버전:** v0.4.2 ~ v0.4.4

#### 🚨 1. 문제 상황 (Problem)
- 서재 탭에서 책마다 **"읽고 싶음"** 등 상태 태그만 보이고, 사용자가 상태를 바꿀 수 없음
- 상태 수정을 서재 카드에 넣자, **select를 열려고 클릭하면 동시에 상세 페이지로 이동**하는 혼란 발생
- 상세 페이지로 수정 위치를 옮긴 뒤에는 상태 변경 UI가 **잘 안 보이거나**, 반대로 **화면을 과도하게 차지**함
- 서재 목록의 상태 표시도 제목 레이아웃과 어울리지 않음 (너비·위치)

#### 🔍 2. 원인 분석 (Cause)
- DB/스키마 문제는 아님. `books.status`는 이미 `book_status` enum(`reading` / `finished` / `paused` / `wishlist`)으로 존재하고, update API·RLS도 상태 변경을 지원함 → **Supabase 추가 설정 불필요**
- `BookCard` 전체가 `Link`로 감싸져 있어, 카드 안의 `select` 클릭이 부모 네비게이션과 **이벤트/의도 충돌**
- 목록(여러 책)과 상세(한 권)의 역할이 분리되지 않아, 수정 UI를 목록에 두면 탭·스크롤·이동과 겹치기 쉬움
- 상태 변경 UI를 “눈에 띄게” 만들려다 상세에서 면적이 커지고, 목록에서는 태그 역할(표시만)과 수정 역할이 섞임

#### 🛠️ 3. 시도한 방법들 (Attempts)
- **시도 1 (v0.4.2):** 서재 카드에 상태 수정(select 등)을 바로 추가 ➔ 수정은 가능했으나, 카드 `Link`와 겹쳐 **select 오픈 + 상세 이동이 동시에** 발생
- **시도 2 (v0.4.3):** 서재 목록에서는 상태 수정을 막고, **책 상세에서만** `BookStatusPicker`로 변경 ➔ 클릭 충돌 해소. 다만 상세 UI 가시성·면적 조정이 추가로 필요
- **시도 3 (v0.4.4):** 서재는 제목 오른쪽 **읽기 전용 태그**(`BookStatusBadge`, 글자 너비만큼), 상세는 컴팩트한 picker로 축소 ➔ 채택

#### ✅ 4. 해결 방법 (Solution)
역할 분리:
- **서재 목록:** 상태 **표시만** (수정 불가)
- **책 상세:** 상태 **수정만** (`BookStatusPicker` + `useUpdateBookMutation`)

서재 카드 (`BookCard`):
- 제목 오른쪽에 `BookStatusBadge` 배치
- `w-fit` / `whitespace-nowrap`으로 글자 수만큼만 너비 사용

```tsx
<div className="flex items-start gap-1.5">
  <p className="min-w-0 flex-1 line-clamp-2 ...">{book.title}</p>
  <BookStatusBadge status={book.status} />
</div>
```

상세 (`BookDetailView` + `BookStatusPicker`):
- 표지/제목 옆에 읽기 상태 select 노출
- `h-8`, `w-fit`, `field-sizing-content`, pill 스타일로 면적 축소
- 변경 시 `updateBook.mutate({ id, input: { status } })`

DB:
- 스키마/마이그레이션/Supabase 대시보드 추가 작업 없음 (기존 `status` 컬럼 사용)

관련 파일:
- `src/features/books/components/BookCard.tsx`
- `src/features/books/components/BookCover.tsx` (`BookStatusBadge`)
- `src/features/books/components/BookStatusPicker.tsx`
- `src/features/books/components/BookDetailView.tsx`
- `src/shared/constants/book-status.ts`

#### 💡 5. 배운 점 및 참고 자료 (Learnings & References)
- 전체가 `Link`/`button`인 카드 안에 또 다른 인터랙티브 컨트롤을 넣으면 **중첩 클릭**이 나기 쉬움 → 목록은 표시, 상세는 편집으로 나누는 편이 안전
- “수정 가능해야 한다”와 “목록에서 바로 고쳐야 한다”는 별개 요구사항. 모바일에서는 **상세에서만 수정**이 충돌을 줄임
- 기능이 이미 DB에 있으면(enum·update) 스키마 변경부터 가정하지 말고, **기존 컬럼/API로 충분한지** 먼저 확인
- 참고: `PROMPT.md` [v0.4.2] ~ [v0.4.4], `supabase/SCHEMA.md` (`books.status`)

---

### [이슈 제목: 에러 메시지나 문제 상황 요약]
- **발생 일자:** YYYY-MM-DD
- **발생 환경:** (예: Frontend / Backend / 특정 라이브러리 버전 등)

#### 🚨 1. 문제 상황 (Problem)
- 어떤 상황에서 발생했는지 구체적인 증상 설명
- 에러 메시지 또는 콘솔 로그 (코드 블록 사용)

```
에러 메시지 또는 콘솔 로그를 여기에 붙여넣으세요.
```

#### 🔍 2. 원인 분석 (Cause)
- 문제가 발생한 근본적인 원인
- 왜 이런 에러가 발생했는지에 대한 가설 및 분석

#### 🛠️ 3. 시도한 방법들 (Attempts)
- 해결을 위해 시도했던 방법들과 그 결과 (실패한 방법도 기록)
- **시도 1:** [내용] ➔ [결과/실패 이유]
- **시도 2:** [내용] ➔ [결과/실패 이유]

#### ✅ 4. 해결 방법 (Solution)
- 최종적으로 문제를 해결한 방법
- 수정 전/후 코드 비교 또는 구체적인 설정 변경 내역

#### 💡 5. 배운 점 및 참고 자료 (Learnings & References)
- 이 문제를 통해 알게 된 점이나 주의할 점
- 참고한 공식 문서, Stack Overflow, 블로그 링크 등

# Reading Log — Supabase Database Schema

## ERD

```mermaid
erDiagram
  auth_users ||--|| users : "1:1"
  users ||--o{ books : owns
  users ||--o{ book_notes : owns
  users ||--o{ tags : owns
  users ||--o{ streaks : has
  books ||--o{ book_notes : "has"
  book_notes }o--o{ tags : "tagged via note_tags"

  users {
    uuid id PK
    text display_name
    text avatar_url
    timestamptz created_at
    timestamptz updated_at
  }

  books {
    uuid id PK
    uuid user_id FK
    text title
    text author
    text cover_url
    book_status status
    date started_at
    date finished_at
    timestamptz created_at
    timestamptz updated_at
  }

  book_notes {
    uuid id PK
    uuid user_id FK
    uuid book_id FK
    text content
    date note_date
    timestamptz created_at
    timestamptz updated_at
  }

  tags {
    uuid id PK
    uuid user_id FK
    text name
    text color
    timestamptz created_at
    timestamptz updated_at
  }

  note_tags {
    uuid note_id PK_FK
    uuid tag_id PK_FK
    timestamptz created_at
    timestamptz updated_at
  }

  streaks {
    uuid user_id PK_FK
    date streak_date PK
    int note_count
    timestamptz created_at
    timestamptz updated_at
  }
```

> `auth.users`는 Supabase Auth 내장 테이블입니다. `public.users`는 앱 프로필용 1:1 확장 테이블입니다.

---

## 테이블 정의

### 1. `users`

| 컬럼 | 타입 | NULL | 기본값 | 설명 |
|---|---|---|---|---|
| id | uuid | NO | — | PK, `auth.users.id`와 동일 |
| display_name | text | YES | — | 표시 이름 |
| avatar_url | text | YES | — | 아바타 URL |
| created_at | timestamptz | NO | `now()` | 생성 시각 |
| updated_at | timestamptz | NO | `now()` | 수정 시각 (트리거) |

### 2. `books`

| 컬럼 | 타입 | NULL | 기본값 | 설명 |
|---|---|---|---|---|
| id | uuid | NO | `gen_random_uuid()` | PK |
| user_id | uuid | NO | — | FK → `users.id` |
| title | text | NO | — | 책 제목 |
| author | text | YES | — | 저자 |
| cover_url | text | YES | — | 표지 Storage URL |
| status | book_status | NO | `'reading'` | reading / finished / paused / wishlist |
| started_at | date | YES | — | 시작일 |
| finished_at | date | YES | — | 완독일 |
| created_at | timestamptz | NO | `now()` | 생성 시각 |
| updated_at | timestamptz | NO | `now()` | 수정 시각 |

### 3. `book_notes` (한 줄 메모)

| 컬럼 | 타입 | NULL | 기본값 | 설명 |
|---|---|---|---|---|
| id | uuid | NO | `gen_random_uuid()` | PK |
| user_id | uuid | NO | — | FK → `users.id` |
| book_id | uuid | YES | — | FK → `books.id` |
| content | text | NO | — | 1~280자 |
| note_date | date | NO | `utc today` | 스트릭·달력 기준일 |
| created_at | timestamptz | NO | `now()` | 생성 시각 |
| updated_at | timestamptz | NO | `now()` | 수정 시각 |

### 4. `tags`

| 컬럼 | 타입 | NULL | 기본값 | 설명 |
|---|---|---|---|---|
| id | uuid | NO | `gen_random_uuid()` | PK |
| user_id | uuid | NO | — | FK → `users.id` |
| name | text | NO | — | 태그명 (유저 내 unique) |
| color | text | YES | — | UI 색상 |
| created_at | timestamptz | NO | `now()` | 생성 시각 |
| updated_at | timestamptz | NO | `now()` | 수정 시각 |

### 5. `note_tags` (메모↔태그 N:M)

| 컬럼 | 타입 | NULL | 기본값 | 설명 |
|---|---|---|---|---|
| note_id | uuid | NO | — | PK/FK → `book_notes.id` |
| tag_id | uuid | NO | — | PK/FK → `tags.id` |
| created_at | timestamptz | NO | `now()` | 연결 생성 시각 |
| updated_at | timestamptz | NO | `now()` | 수정 시각 |

### 6. `streaks`

| 컬럼 | 타입 | NULL | 기본값 | 설명 |
|---|---|---|---|---|
| user_id | uuid | NO | — | PK/FK → `users.id` |
| streak_date | date | NO | — | PK, 활동일 |
| note_count | integer | NO | `0` | 해당일 메모 수 (≥0) |
| created_at | timestamptz | NO | `now()` | 생성 시각 |
| updated_at | timestamptz | NO | `now()` | 수정 시각 |

---

## PK / FK

| 테이블 | PK | FK |
|---|---|---|
| users | `id` | `id` → `auth.users(id)` |
| books | `id` | `user_id` → `users(id)` |
| book_notes | `id` | `user_id` → `users(id)`, `book_id` → `books(id)` |
| tags | `id` | `user_id` → `users(id)` |
| note_tags | `(note_id, tag_id)` | `note_id` → `book_notes(id)`, `tag_id` → `tags(id)` |
| streaks | `(user_id, streak_date)` | `user_id` → `users(id)` |

---

## Index

| 이름 | 테이블 | 컬럼 | 목적 |
|---|---|---|---|
| `books_user_id_idx` | books | `user_id` | 내 책 목록 |
| `books_user_id_updated_at_idx` | books | `(user_id, updated_at desc)` | 최근 수정순 |
| `book_notes_user_id_note_date_idx` | book_notes | `(user_id, note_date desc)` | 메모 목록·스트릭 |
| `book_notes_book_id_idx` | book_notes | `book_id` | 책별 메모 |
| `tags_user_id_idx` | tags | `user_id` | 내 태그 |
| `tags_user_id_name_key` | tags | `(user_id, name)` UNIQUE | 중복 방지 |
| `note_tags_tag_id_idx` | note_tags | `tag_id` | 태그→메모·그래프 |
| `streaks_user_id_streak_date_idx` | streaks | `(user_id, streak_date desc)` | 달력 조회 |

---

## Cascade 정책

| 관계 | ON DELETE | 이유 |
|---|---|---|
| `auth.users` → `users` | **CASCADE** | 계정 삭제 시 프로필 제거 |
| `users` → `books` | **CASCADE** | 유저 삭제 시 책 전체 제거 |
| `users` → `book_notes` | **CASCADE** | 유저 삭제 시 메모 제거 |
| `users` → `tags` | **CASCADE** | 유저 삭제 시 태그 제거 |
| `users` → `streaks` | **CASCADE** | 유저 삭제 시 스트릭 제거 |
| `books` → `book_notes.book_id` | **SET NULL** | 책 삭제 후에도 메모 본문은 보존 |
| `book_notes` → `note_tags` | **CASCADE** | 메모 삭제 시 연결 제거 |
| `tags` → `note_tags` | **CASCADE** | 태그 삭제 시 연결 제거 |

---

## CreatedAt / UpdatedAt

- 모든 테이블에 `created_at`, `updated_at` (`timestamptz`, `NOT NULL`, default `now()`)
- `updated_at`은 `BEFORE UPDATE` 트리거 `set_updated_at()`로 자동 갱신
- `note_tags`도 동일 규칙 적용 (연결 메타 일관성)

---

## RLS 요약

모든 테이블: **본인 행만** SELECT / INSERT / UPDATE / DELETE  
(`auth.uid() = user_id` 또는 `users.id` / note_tags는 소유 메모 경유)

---

## Storage 요약

| 버킷 | public | 정책 |
|---|---|---|
| `covers` | true | SELECT 공개, INSERT/UPDATE/DELETE는 `covers/{user_id}/...` 경로의 본인만 |

---

## SQL 파일

실행 파일: [`migrations/20260720000000_init_reading_log.sql`](./migrations/20260720000000_init_reading_log.sql)

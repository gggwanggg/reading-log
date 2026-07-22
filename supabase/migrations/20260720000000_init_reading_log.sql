-- Reading Log initial schema
-- tables: users, books, book_notes, tags, note_tags, streaks

create extension if not exists "pgcrypto";

create type public.book_status as enum ('reading', 'finished', 'paused', 'wishlist');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  author text,
  cover_url text,
  status public.book_status not null default 'reading',
  started_at date,
  finished_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.book_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  book_id uuid references public.books (id) on delete set null,
  content text not null check (char_length(content) between 1 and 280),
  note_date date not null default (timezone('utc', now()))::date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tags_user_id_name_key unique (user_id, name)
);

create table public.note_tags (
  note_id uuid not null references public.book_notes (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (note_id, tag_id)
);

create table public.streaks (
  user_id uuid not null references public.users (id) on delete cascade,
  streak_date date not null,
  note_count integer not null default 0 check (note_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, streak_date)
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index books_user_id_idx on public.books (user_id);
create index books_user_id_updated_at_idx on public.books (user_id, updated_at desc);
create index book_notes_user_id_note_date_idx on public.book_notes (user_id, note_date desc);
create index book_notes_book_id_idx on public.book_notes (book_id);
create index tags_user_id_idx on public.tags (user_id);
create index note_tags_tag_id_idx on public.note_tags (tag_id);
create index streaks_user_id_streak_date_idx on public.streaks (user_id, streak_date desc);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger books_set_updated_at
before update on public.books
for each row execute function public.set_updated_at();

create trigger book_notes_set_updated_at
before update on public.book_notes
for each row execute function public.set_updated_at();

create trigger tags_set_updated_at
before update on public.tags
for each row execute function public.set_updated_at();

create trigger note_tags_set_updated_at
before update on public.note_tags
for each row execute function public.set_updated_at();

create trigger streaks_set_updated_at
before update on public.streaks
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auth → public.users sync
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.users enable row level security;
alter table public.books enable row level security;
alter table public.book_notes enable row level security;
alter table public.tags enable row level security;
alter table public.note_tags enable row level security;
alter table public.streaks enable row level security;

-- users
create policy "users_select_own" on public.users
  for select using (auth.uid() = id);
create policy "users_update_own" on public.users
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- books
create policy "books_select_own" on public.books
  for select using (auth.uid() = user_id);
create policy "books_insert_own" on public.books
  for insert with check (auth.uid() = user_id);
create policy "books_update_own" on public.books
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "books_delete_own" on public.books
  for delete using (auth.uid() = user_id);

-- book_notes
create policy "book_notes_select_own" on public.book_notes
  for select using (auth.uid() = user_id);
create policy "book_notes_insert_own" on public.book_notes
  for insert with check (auth.uid() = user_id);
create policy "book_notes_update_own" on public.book_notes
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "book_notes_delete_own" on public.book_notes
  for delete using (auth.uid() = user_id);

-- tags
create policy "tags_select_own" on public.tags
  for select using (auth.uid() = user_id);
create policy "tags_insert_own" on public.tags
  for insert with check (auth.uid() = user_id);
create policy "tags_update_own" on public.tags
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "tags_delete_own" on public.tags
  for delete using (auth.uid() = user_id);

-- note_tags (소유한 book_notes 경유)
create policy "note_tags_select_own" on public.note_tags
  for select using (
    exists (
      select 1 from public.book_notes n
      where n.id = note_id and n.user_id = auth.uid()
    )
  );
create policy "note_tags_insert_own" on public.note_tags
  for insert with check (
    exists (
      select 1 from public.book_notes n
      where n.id = note_id and n.user_id = auth.uid()
    )
    and exists (
      select 1 from public.tags t
      where t.id = tag_id and t.user_id = auth.uid()
    )
  );
create policy "note_tags_update_own" on public.note_tags
  for update using (
    exists (
      select 1 from public.book_notes n
      where n.id = note_id and n.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.book_notes n
      where n.id = note_id and n.user_id = auth.uid()
    )
  );
create policy "note_tags_delete_own" on public.note_tags
  for delete using (
    exists (
      select 1 from public.book_notes n
      where n.id = note_id and n.user_id = auth.uid()
    )
  );

-- streaks
create policy "streaks_select_own" on public.streaks
  for select using (auth.uid() = user_id);
create policy "streaks_insert_own" on public.streaks
  for insert with check (auth.uid() = user_id);
create policy "streaks_update_own" on public.streaks
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "streaks_delete_own" on public.streaks
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Storage: covers bucket
-- path convention: covers/{user_id}/{book_id}/{filename}
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('covers', 'covers', true)
on conflict (id) do nothing;

create policy "covers_select_public"
on storage.objects for select
using (bucket_id = 'covers');

create policy "covers_insert_own"
on storage.objects for insert
with check (
  bucket_id = 'covers'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "covers_update_own"
on storage.objects for update
using (
  bucket_id = 'covers'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'covers'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "covers_delete_own"
on storage.objects for delete
using (
  bucket_id = 'covers'
  and auth.uid()::text = (storage.foldername(name))[1]
);

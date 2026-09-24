-- Early-bird list from the pricing section of the landing page. Anyone can
-- join; nobody can read through the API. Read it from the Supabase
-- dashboard (Table Editor -> waitlist).
create table public.waitlist (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  email text not null unique
    check (char_length(email) <= 320 and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  plan text check (plan in ('exam_pass', 'pro', 'teams')),
  source text check (char_length(source) <= 100)
);

alter table public.waitlist enable row level security;

create policy "Anyone can join the waitlist"
  on public.waitlist for insert to anon, authenticated
  with check (true);

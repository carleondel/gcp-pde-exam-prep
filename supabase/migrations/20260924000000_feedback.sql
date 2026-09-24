-- In-app feedback: bug reports, question errors and ideas. Anyone using the
-- app (signed in or on the trial) can insert; nobody can read through the
-- API. Read it from the Supabase dashboard (Table Editor -> feedback).
create table public.feedback (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid default auth.uid() references auth.users (id) on delete set null,
  email text check (char_length(email) <= 320),
  kind text not null check (kind in ('bug', 'question', 'idea', 'other')),
  message text not null check (char_length(message) between 3 and 5000),
  cert_id text check (char_length(cert_id) <= 50),
  question_id integer,
  page text check (char_length(page) <= 500),
  user_agent text check (char_length(user_agent) <= 500)
);

alter table public.feedback enable row level security;

create policy "Anyone can send feedback"
  on public.feedback for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));

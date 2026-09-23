-- One row per localStorage key the app keeps per certification
-- (e.g. "gcp-pde.progress.v2"). The client mirrors those keys verbatim, so
-- a new kind of saved state needs no schema change.
create table public.user_state (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  key text not null check (char_length(key) between 1 and 200),
  value jsonb not null check (octet_length(value::text) <= 1000000),
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.user_state enable row level security;

create policy "Users read their own state"
  on public.user_state for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users insert their own state"
  on public.user_state for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users update their own state"
  on public.user_state for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users delete their own state"
  on public.user_state for delete to authenticated
  using ((select auth.uid()) = user_id);

create function public.touch_user_state_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger user_state_touch_updated_at
  before update on public.user_state
  for each row execute function public.touch_user_state_updated_at();

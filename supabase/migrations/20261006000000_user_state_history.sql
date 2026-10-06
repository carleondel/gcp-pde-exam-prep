-- Safety net for user_state: keeps the previous value whenever a saved
-- progress loses XP (a reset, or an empty progress pushed over a real one)
-- or a row is deleted, so it can be restored by hand. Ordinary saves, which
-- only ever add XP, are not copied.
create table public.user_state_history (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  key text not null,
  value jsonb not null,
  value_updated_at timestamptz not null,
  operation text not null check (operation in ('UPDATE', 'DELETE')),
  archived_at timestamptz not null default now()
);

create index user_state_history_user_key_idx
  on public.user_state_history (user_id, key, archived_at desc);

alter table public.user_state_history enable row level security;

create policy "Users read their own state history"
  on public.user_state_history for select to authenticated
  using ((select auth.uid()) = user_id);

create function public.archive_user_state()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Deleting the account cascades here; there is nothing left to keep.
  if not exists (select 1 from auth.users where id = old.user_id) then
    return coalesce(new, old);
  end if;
  if tg_op = 'DELETE'
    or (
      old.key ~ '\.progress\.v\d+$'
      and (case when jsonb_typeof(new.value -> 'xp') = 'number'
             then (new.value ->> 'xp')::numeric else 0 end)
        < (case when jsonb_typeof(old.value -> 'xp') = 'number'
             then (old.value ->> 'xp')::numeric else 0 end)
    )
  then
    insert into public.user_state_history (user_id, key, value, value_updated_at, operation)
    values (old.user_id, old.key, old.value, old.updated_at, tg_op);
  end if;
  return coalesce(new, old);
end;
$$;

create trigger user_state_archive
  before update or delete on public.user_state
  for each row execute function public.archive_user_state();

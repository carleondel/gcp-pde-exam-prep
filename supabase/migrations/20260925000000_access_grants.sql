-- Complimentary access codes (friends, partners, giveaways). Codes are
-- created by hand in the SQL editor and never through the API. A signed-in
-- user redeems one with redeem_access_code(); it then belongs to them.
create table public.access_grants (
  code text primary key check (code ~ '^[A-Z0-9-]{6,40}$'),
  note text,
  plan text not null default 'pro' check (plan in ('exam_pass', 'pro', 'teams')),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  redeemed_by uuid references auth.users (id) on delete set null,
  redeemed_at timestamptz
);

alter table public.access_grants enable row level security;

-- Users can see only the codes they have redeemed (their own access).
create policy "Users see the codes they redeemed"
  on public.access_grants for select to authenticated
  using ((select auth.uid()) = redeemed_by);

create function public.redeem_access_code(p_code text)
returns table (plan text, expires_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  found_grant public.access_grants;
begin
  if auth.uid() is null then
    raise exception 'Sign in to redeem a code';
  end if;

  select * into found_grant
  from public.access_grants g
  where g.code = upper(trim(p_code))
  for update;

  if not found then
    raise exception 'That code is not valid';
  end if;
  if found_grant.redeemed_by is not null and found_grant.redeemed_by <> auth.uid() then
    raise exception 'That code has already been used';
  end if;
  if found_grant.expires_at is not null and found_grant.expires_at < now() then
    raise exception 'That code has expired';
  end if;

  update public.access_grants g
  set redeemed_by = auth.uid(), redeemed_at = coalesce(g.redeemed_at, now())
  where g.code = found_grant.code;

  return query select found_grant.plan, found_grant.expires_at;
end;
$$;

revoke all on function public.redeem_access_code(text) from public, anon;
grant execute on function public.redeem_access_code(text) to authenticated;

create table if not exists public.user_credibility (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  score numeric(5,2) not null default 60 check (score >= 0 and score <= 100),
  level smallint not null default 3 check (level between 0 and 4),
  level_label text not null default 'Limited'
    check (level_label in ('Suspended', 'At risk', 'Very Limited', 'Limited', 'All good')),
  updated_at timestamptz not null default now()
);

create or replace function public.set_credibility_level()
returns trigger language plpgsql as $$
begin
  if new.score >= 80 then
    new.level := 4;
    new.level_label := 'All good';
  elsif new.score >= 60 then
    new.level := 3;
    new.level_label := 'Limited';
  elsif new.score >= 40 then
    new.level := 2;
    new.level_label := 'Very Limited';
  elsif new.score >= 20 then
    new.level := 1;
    new.level_label := 'At risk';
  else
    new.level := 0;
    new.level_label := 'Suspended';
  end if;
  return new;
end;
$$;

do $$
begin
  drop trigger if exists set_credibility_level_trigger on public.user_credibility;
  create trigger set_credibility_level_trigger
    before insert or update on public.user_credibility
    for each row execute function public.set_credibility_level();
end $$;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  drop trigger if exists set_user_credibility_updated_at on public.user_credibility;
  create trigger set_user_credibility_updated_at
    before update on public.user_credibility
    for each row execute function public.set_updated_at();
end $$;

create table if not exists public.credibility_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null
    check (event_type in ('report_submitted', 'report_verified', 'report_rejected', 'report_resolved', 'penalty', 'admin_adjustment', 'system')),
  points numeric(5,2) not null,
  reason text not null default '',
  report_id uuid references public.reports(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists credibility_events_user on public.credibility_events(user_id);

create table if not exists public.report_credibility_analysis (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null unique references public.reports(id) on delete cascade,
  ai_score numeric(5,2) not null default 0 check (ai_score >= 0 and ai_score <= 100),
  severity text not null default 'Medium'
    check (severity in ('Low', 'Medium', 'High', 'Critical')),
  sentiment text not null default 'Neutral'
    check (sentiment in ('Negative', 'Neutral', 'Positive', 'Concerned', 'Anxious', 'Unclear')),
  credibility_level text not null default 'Medium'
    check (credibility_level in ('Low', 'Medium', 'High')),
  credibility_review text not null default '',
  ai_model_version text not null default '',
  analyzed_at timestamptz not null default now()
);

create table if not exists public.app_settings (
  id uuid primary key default gen_random_uuid(),
  ai_credibility_enabled boolean not null default true,
  high_credibility_threshold smallint not null default 90
    check (high_credibility_threshold between 0 and 100),
  medium_credibility_threshold smallint not null default 60
    check (medium_credibility_threshold between 0 and 100),
  updated_at timestamptz not null default now()
);

do $$
begin
  drop trigger if exists set_app_settings_updated_at on public.app_settings;
  create trigger set_app_settings_updated_at
    before update on public.app_settings
    for each row execute function public.set_updated_at();
end $$;

insert into public.app_settings (ai_credibility_enabled, high_credibility_threshold, medium_credibility_threshold)
select true, 90, 60
where not exists (select 1 from public.app_settings);

insert into public.user_credibility (user_id)
select id from public.profiles
on conflict (user_id) do nothing;

create or replace function public.handle_new_credibility()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.user_credibility (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

do $$
begin
  drop trigger if exists on_profile_created_credibility on public.profiles;
  create trigger on_profile_created_credibility
    after insert on public.profiles
    for each row execute function public.handle_new_credibility();
end $$;

alter table public.user_credibility enable row level security;
alter table public.credibility_events enable row level security;
alter table public.report_credibility_analysis enable row level security;
alter table public.app_settings enable row level security;

create policy "read_own_credibility"
  on public.user_credibility for select
  to authenticated
  using (auth.uid() = user_id);

create policy "read_all_credibility"
  on public.user_credibility for select
  to authenticated
  using (public.current_user_role() in ('admin', 'super_admin'));

create policy "read_own_credibility_events"
  on public.credibility_events for select
  to authenticated
  using (auth.uid() = user_id);

create policy "read_all_credibility_events"
  on public.credibility_events for select
  to authenticated
  using (public.current_user_role() in ('admin', 'super_admin'));

create policy "read_all_report_credibility"
  on public.report_credibility_analysis for select
  to authenticated
  using (true);

create policy "read_app_settings"
  on public.app_settings for select
  to authenticated
  using (true);
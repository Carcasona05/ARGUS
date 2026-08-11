create table if not exists public.notification_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
    check (name in (
      'report_status',
      'nearby_incident',
      'admin_account',
      'report_submitted',
      'ai_validation',
      'report_approved',
      'system',
      'log'
    )),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type_id uuid not null references public.notification_types(id),
  title text not null,
  message text not null default '',
  priority text not null default 'Low'
    check (priority in ('Low', 'Medium', 'High')),
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists notifications_user on public.notifications(user_id);
create index if not exists notifications_user_read on public.notifications(user_id, is_read);
create index if not exists notifications_created on public.notifications(created_at desc);

create table if not exists public.notification_report_status (
  notification_id uuid primary key references public.notifications(id) on delete cascade,
  report_id uuid references public.reports(id) on delete set null,
  location text,
  is_verified boolean not null default false
);

create table if not exists public.notification_nearby_incident (
  notification_id uuid primary key references public.notifications(id) on delete cascade,
  report_id uuid references public.reports(id) on delete set null,
  distance_meters numeric,
  level text not null default 'Moderate'
    check (level in ('Low', 'Moderate', 'High'))
);

create table if not exists public.login_activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device text not null,
  location text,
  is_current boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists login_activities_user on public.login_activities(user_id);
create index if not exists login_activities_user_current on public.login_activities(user_id, is_current);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  drop trigger if exists set_notifications_updated_at on public.notifications;
  create trigger set_notifications_updated_at
    before update on public.notifications
    for each row execute function public.set_updated_at();
end $$;

alter table public.notifications enable row level security;
alter table public.notification_report_status enable row level security;
alter table public.notification_nearby_incident enable row level security;
alter table public.login_activities enable row level security;

create policy "read_own_notifications" on public.notifications for select
  using (auth.uid() = user_id);
create policy "update_own_notifications" on public.notifications for update
  using (auth.uid() = user_id);

create policy "admin_read_all_notifications" on public.notifications for select
  to authenticated
  using (public.current_user_role() in ('admin', 'super_admin'));
create policy "admin_update_all_notifications" on public.notifications for update
  to authenticated
  using (public.current_user_role() in ('admin', 'super_admin'))
  with check (public.current_user_role() in ('admin', 'super_admin'));

create policy "read_own_report_status" on public.notification_report_status for select
  using (exists (
    select 1 from public.notifications n
    where n.id = notification_id and n.user_id = auth.uid()
  ));

create policy "read_own_nearby_incidents" on public.notification_nearby_incident for select
  using (exists (
    select 1 from public.notifications n
    where n.id = notification_id and n.user_id = auth.uid()
  ));

create policy "read_own_login_activities" on public.login_activities for select
  using (auth.uid() = user_id);
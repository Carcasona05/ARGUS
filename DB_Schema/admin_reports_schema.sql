create table if not exists public.admin_reports (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users(id) on delete set null,
  incident_type_id uuid references public.incident_types(id) on delete set null,
  location text,
  latitude double precision,
  longitude double precision,
  poster_name text,
  display_name_type text not null default 'Username'
    check (display_name_type in ('Fullname', 'Username')),
  details text not null default '',
  status text not null default 'Pending Review'
    check (status in ('Pending Review', 'Under Verification', 'Resolved', 'Rejected', 'Archived')),
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_report_images (
  id uuid primary key default gen_random_uuid(),
  admin_report_id uuid not null references public.admin_reports(id) on delete cascade,
  image_url text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists admin_report_images_report on public.admin_report_images(admin_report_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  drop trigger if exists set_admin_reports_updated_at on public.admin_reports;
  create trigger set_admin_reports_updated_at
    before update on public.admin_reports
    for each row execute function public.set_updated_at();
end $$;

alter table public.admin_reports enable row level security;
alter table public.admin_report_images enable row level security;

create policy "admin_read_admin_reports"
  on public.admin_reports for select
  to authenticated
  using (public.current_user_role() in ('admin', 'super_admin'));

create policy "admin_write_admin_reports"
  on public.admin_reports for insert
  to authenticated
  with check (public.current_user_role() in ('admin', 'super_admin'));

create policy "admin_read_admin_report_images"
  on public.admin_report_images for select
  to authenticated
  using (exists (
    select 1 from public.admin_reports r
    where r.id = admin_report_id
  ));

create policy "admin_write_admin_report_images"
  on public.admin_report_images for insert
  to authenticated
  with check (exists (
    select 1 from public.admin_reports r
    where r.id = admin_report_id
  ));

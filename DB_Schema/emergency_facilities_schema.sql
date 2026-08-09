create table if not exists public.emergency_facilities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  type text not null check (type in ('police', 'fire')),
  latitude double precision not null,
  longitude double precision not null,
  address text not null default '',
  phone text not null default '',
  created_at timestamptz not null default now()
);

insert into public.emergency_facilities (name, type, latitude, longitude, address, phone) values
  ('Argao Municipal Police Station', 'police', 9.8721, 123.5986, 'Poblacion, Argao, Cebu', '911'),
  ('Argao Fire Station', 'fire', 9.8738, 123.5998, 'Poblacion, Argao, Cebu', '911')
on conflict (name) do nothing;

alter table public.emergency_facilities enable row level security;

create policy "read_all_emergency_facilities" on public.emergency_facilities
  for select using (true);
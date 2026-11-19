-- Momiasi HCS · skema inti
-- Pola: setiap tabel menyimpan objek aplikasi utuh di kolom `data` (jsonb).
-- Kolom yang dipakai hak akses (RLS) diturunkan otomatis dari `data` (generated column),
-- sehingga klien tidak bisa memalsukannya tanpa melanggar policy.

create extension if not exists pgcrypto;

-- ---------- profil karyawan (1:1 dengan auth.users) ----------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  role text generated always as (coalesce(data->>'role', 'karyawan')) stored,
  level text generated always as (coalesce(data->>'level', 'Staff')) stored,
  dept text generated always as (data->>'dept') stored,
  atasan uuid generated always as (nullif(data->>'atasan', '')::uuid) stored,
  akun text generated always as (coalesce(data->>'akun', 'aktif')) stored,
  updated_at timestamptz not null default now()
);

create table public.settings (key text primary key, data jsonb not null, updated_at timestamptz not null default now());

-- ---------- helper hak akses (security definer: membaca profil tanpa memicu RLS berulang) ----------
create or replace function public.my_role() returns text language sql stable security definer set search_path = public as
$$ select role from profiles where id = auth.uid() and akun = 'aktif' $$;
create or replace function public.is_hc() returns boolean language sql stable security definer set search_path = public as
$$ select coalesce(my_role() in ('admin', 'superadmin'), false) $$;
create or replace function public.is_super() returns boolean language sql stable security definer set search_path = public as
$$ select coalesce(my_role() = 'superadmin', false) $$;
create or replace function public.is_dir() returns boolean language sql stable security definer set search_path = public as
$$ select exists (select 1 from profiles where id = auth.uid() and level = 'Direktur' and akun = 'aktif') $$;
create or replace function public.is_hcm() returns boolean language sql stable security definer set search_path = public as
$$ select is_super() or exists (select 1 from profiles where id = auth.uid() and data->>'jabatan' = 'HCGA Manager' and akun = 'aktif') $$;
create or replace function public.my_dept() returns text language sql stable security definer set search_path = public as
$$ select dept from profiles where id = auth.uid() $$;
-- atasan langsung (atau delegasinya yang sedang aktif) dari karyawan u
create or replace function public.is_manager_of(u uuid) returns boolean language sql stable security definer set search_path = public as
$$ select exists (
     select 1 from profiles p where p.id = u and (
       p.atasan = auth.uid()
       or exists (select 1 from settings s where s.key = 'delegasi'
                  and s.data->>'from' = p.atasan::text and s.data->>'to' = auth.uid()::text
                  and current_date between (s.data->>'mulai')::date and (s.data->>'sampai')::date)))
$$;

-- ---------- master ----------
create table public.vehicles (id text primary key, data jsonb not null, updated_at timestamptz not null default now());

-- ---------- tabel transaksi ----------
create table public.trips (id text primary key, data jsonb not null,
  owner uuid generated always as ((data->>'userId')::uuid) stored,
  status text generated always as (data->>'status') stored,
  ca_pic uuid generated always as (nullif(data->>'caPic', '')::uuid) stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.cars (id text primary key, data jsonb not null,
  owner uuid generated always as ((data->>'userId')::uuid) stored,
  status text generated always as (data->>'status') stored,
  driver uuid generated always as (nullif(data->'assign'->>'driverId', '')::uuid) stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.roomb (id text primary key, data jsonb not null,
  owner uuid generated always as ((data->>'userId')::uuid) stored,
  status text generated always as (data->>'status') stored,
  room text generated always as (data->>'roomId') stored,
  tanggal text generated always as (data->>'tanggal') stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.aset (id text primary key, data jsonb not null,
  owner uuid generated always as ((data->>'userId')::uuid) stored,
  status text generated always as (data->>'status') stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.trainings (id text primary key, data jsonb not null,
  owner uuid generated always as ((data->>'userId')::uuid) stored,
  status text generated always as (data->>'status') stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.onb (id text primary key, data jsonb not null,
  owner uuid generated always as ((data->>'userId')::uuid) stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.evals (id text primary key, data jsonb not null,
  owner uuid generated always as ((data->>'userId')::uuid) stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.fpk (id text primary key, data jsonb not null,
  owner uuid generated always as ((data->>'userId')::uuid) stored,
  status text generated always as (data->>'status') stored,
  dept text generated always as (data->>'dept') stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.cands (id text primary key, data jsonb not null,
  fpk_id text generated always as (data->>'fpkId') stored,
  dept text generated always as (data->>'dept') stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.reviews (id text primary key, data jsonb not null,
  owner uuid generated always as ((data->>'userId')::uuid) stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.notifs (id text primary key, data jsonb not null,
  owner uuid generated always as ((data->>'userId')::uuid) stored,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.uploads (id uuid primary key default gen_random_uuid(), name text not null, path text not null,
  owner uuid not null default auth.uid() references auth.users(id) on delete cascade, created_at timestamptz not null default now());

create index on public.trips(owner); create index on public.cars(owner); create index on public.roomb(tanggal, room);
create index on public.aset(owner); create index on public.trainings(owner); create index on public.onb(owner);
create index on public.evals(owner); create index on public.fpk(dept); create index on public.cands(dept);
create index on public.reviews(owner); create index on public.notifs(owner); create index on public.profiles(atasan);
create index on public.uploads(name);

-- penomoran dokumen per prefix & bulan (PD/2026/11/001)
create table public.counters (k text primary key, n int not null);
create or replace function public.next_no(prefix text) returns text language plpgsql security definer set search_path = public as $$
declare ym text := to_char(now() at time zone 'Asia/Jakarta', 'YYYY/MM'); v int;
begin
  insert into counters(k, n) values (prefix || '/' || ym, 1)
  on conflict (k) do update set n = counters.n + 1 returning n into v;
  return prefix || '/' || ym || '/' || lpad(v::text, 3, '0');
end $$;

-- updated_at + nomor otomatis (klien mengirim nomor berakhiran /AUTO)
create or replace function public.tg_touch() returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  if tg_op = 'INSERT' and new.data ? 'no' and new.data->>'no' like '%/AUTO' then
    new.data := jsonb_set(new.data, '{no}', to_jsonb(next_no(split_part(new.data->>'no', '/', 1))));
  end if;
  return new;
end $$;
do $$ declare t text; begin
  foreach t in array array['profiles','settings','vehicles','trips','cars','roomb','aset','trainings','onb','evals','fpk','cands','reviews','notifs'] loop
    execute format('create trigger touch before insert or update on public.%I for each row execute function public.tg_touch()', t);
  end loop;
end $$;

alter table public.profiles enable row level security;
alter table public.settings enable row level security;
alter table public.vehicles enable row level security;
alter table public.trips enable row level security;
alter table public.cars enable row level security;
alter table public.roomb enable row level security;
alter table public.aset enable row level security;
alter table public.trainings enable row level security;
alter table public.onb enable row level security;
alter table public.evals enable row level security;
alter table public.fpk enable row level security;
alter table public.cands enable row level security;
alter table public.reviews enable row level security;
alter table public.notifs enable row level security;
alter table public.uploads enable row level security;
alter table public.counters enable row level security;

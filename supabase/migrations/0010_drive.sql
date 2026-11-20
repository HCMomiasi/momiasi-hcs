-- Konfigurasi rahasia (URL Apps Script, kunci, peta folder Drive). Hanya service role (edge function) yang bisa membaca.
create table if not exists public.private_config (key text primary key, value jsonb not null, updated_at timestamptz not null default now());
alter table public.private_config enable row level security;
revoke all on public.private_config from anon, authenticated;
-- Berkas yang sudah dipindah ke Google Drive HC
alter table public.uploads add column if not exists doc text;
alter table public.uploads add column if not exists drive_id text;
alter table public.uploads add column if not exists drive_url text;

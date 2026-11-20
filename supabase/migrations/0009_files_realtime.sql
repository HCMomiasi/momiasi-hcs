-- 1) Berkas bisa dibuka oleh pengunggah, HC, dan orang terkait (pemilik pengajuan & atasannya) yang dicatat saat unggah.
alter table public.uploads add column if not exists viewers uuid[] not null default '{}';
drop policy if exists u_sel on public.uploads;
create policy u_sel on public.uploads for select to authenticated
  using (owner = (select auth.uid()) or (select auth.uid()) = any(viewers) or (select is_hc()));
drop policy if exists files_sel on storage.objects;
create policy files_sel on storage.objects for select to authenticated using (
  bucket_id = 'files' and (
    (storage.foldername(name))[1] = (select auth.uid())::text or (select public.is_hc())
    or exists (select 1 from public.uploads u where u.path = storage.objects.name and (select auth.uid()) = any(u.viewers))));
create index if not exists uploads_path_idx on public.uploads(path);

-- 2) Realtime: perubahan data langsung terkirim ke browser (tetap mengikuti RLS masing-masing pengguna).
do $$ declare t text; begin
  foreach t in array array['profiles','settings','vehicles','trips','cars','roomb','aset','trainings','onb','evals','fpk','cands','reviews','notifs'] loop
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;

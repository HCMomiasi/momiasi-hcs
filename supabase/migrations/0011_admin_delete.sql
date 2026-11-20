-- Admin HC & Super Admin boleh menghapus data di semua modul (karyawan/atasan tidak).
do $$ declare t text; begin
  foreach t in array array['trips','cars','roomb','aset','trainings','onb','evals','fpk','cands','reviews'] loop
    execute format('drop policy if exists %I on public.%I', t || '_del', t);
    execute format('create policy %I on public.%I for delete to authenticated using ((select public.is_hc()))', t || '_del', t);
  end loop;
end $$;

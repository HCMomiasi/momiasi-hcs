-- Advisor performa: auth.uid() di policy dievaluasi sekali per query (bukan per baris) + index FK uploads.
do $$ declare p record; q text; c text; begin
  for p in select schemaname, tablename, policyname, qual, with_check from pg_policies where schemaname = 'public' loop
    q := replace(p.qual, 'auth.uid()', '(select auth.uid())');
    c := replace(p.with_check, 'auth.uid()', '(select auth.uid())');
    if q is distinct from p.qual or c is distinct from p.with_check then
      execute format('alter policy %I on %I.%I', p.policyname, p.schemaname, p.tablename)
        || case when q is not null then format(' using (%s)', q) else '' end
        || case when c is not null then format(' with check (%s)', c) else '' end;
    end if;
  end loop;
end $$;
create index if not exists uploads_owner_idx on public.uploads(owner);

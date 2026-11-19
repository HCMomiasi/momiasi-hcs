-- Stress test: kunci per ruang+tanggal supaya dua booking bersamaan tidak lolos cek bentrok di waktu yang sama.
do $$ declare d text; begin
  d := pg_get_functiondef('public.tg_guard()'::regprocedure);
  d := replace(d, $r$    if n in ('menunggu_hcga', 'disetujui') then
      if (new.data->>'peserta')::int$r$, $r$    if n in ('menunggu_hcga', 'disetujui') then
      perform pg_advisory_xact_lock(hashtext('roomb:' || coalesce(new.data->>'roomId', '') || ':' || coalesce(new.data->>'tanggal', '')));
      if (new.data->>'peserta')::int$r$);
  if d not like '%pg_advisory_xact_lock%' then raise exception 'patch gagal'; end if;
  execute d;
end $$;

-- Perbaikan hasil QA: cabang delegasi membaca new.key, yang tidak ada di tabel selain settings
-- (menyebabkan insert/update HC pada onb, evals, reviews, profiles gagal).
do $$ declare d text; begin
  d := pg_get_functiondef('public.tg_guard()'::regprocedure);
  d := replace(d, $r$elsif tg_table_name = 'settings' and new.key = 'delegasi' and not is_hc() then$r$,
                  $r$elsif tg_table_name = 'settings' and to_jsonb(new)->>'key' = 'delegasi' and not is_hc() then$r$);
  if d not like '%to_jsonb(new)->>''key''%' then raise exception 'patch gagal'; end if;
  execute d;
end $$;

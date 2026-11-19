-- Kunci fungsi: helper hanya untuk pengguna login, fungsi internal tidak bisa dipanggil via API.
alter function public.deny(text) set search_path = public;
alter function public.is_peserta(jsonb) set search_path = public;
alter function public.only_keys(jsonb, jsonb, text[], text) set search_path = public;
alter function public.is_rater(jsonb) set search_path = public;
create or replace function public.tg_touch() returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  if tg_op = 'INSERT' and new.data ? 'no' and new.data->>'no' like '%/AUTO' then
    new.data := jsonb_set(new.data, '{no}', to_jsonb(next_no(split_part(new.data->>'no', '/', 1))));
  end if;
  return new;
end $$;
do $$ declare f text; begin
  foreach f in array array['my_role()','is_hc()','is_super()','is_dir()','is_hcm()','my_dept()','is_manager_of(uuid)','is_mgr()','manages_any(jsonb)',
    'is_peserta(jsonb)','is_rater(jsonb)','deny(text)','only_keys(jsonb,jsonb,text[],text)','qsets_public()','next_no(text)','tg_touch()','tg_guard()'] loop
    execute format('revoke execute on function public.%s from public, anon', f);
  end loop;
  foreach f in array array['next_no(text)','tg_touch()','tg_guard()'] loop
    execute format('revoke execute on function public.%s from authenticated', f);
  end loop;
end $$;
alter default privileges in schema public revoke execute on functions from public, anon;

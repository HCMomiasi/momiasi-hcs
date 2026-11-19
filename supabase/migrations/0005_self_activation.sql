-- Karyawan undangan boleh mengaktifkan akunnya sendiri (undangan -> aktif) & mengubah no. HP; selain itu tetap HC/Super Admin.
create policy p_self on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
do $$ declare d text; begin
  d := pg_get_functiondef('public.tg_guard()'::regprocedure);
  d := replace(d, $r$elsif tg_table_name = 'profiles' and tg_op = 'UPDATE' and not is_super() then$r$,
$r$elsif tg_table_name = 'profiles' and tg_op = 'UPDATE' and not is_super() and not is_hc() then
    perform only_keys(old.data, new.data, array['akun', 'hp'], 'Data karyawan hanya diubah HC');
    if (new.data->>'akun') is distinct from (old.data->>'akun') and not (me = new.id and old.data->>'akun' = 'undangan' and new.data->>'akun' = 'aktif') then perform deny('Status akun hanya diubah Super Admin'); end if;
  elsif tg_table_name = 'profiles' and tg_op = 'UPDATE' and not is_super() then$r$);
  if d not like '%array[''akun'', ''hp'']%' then raise exception 'patch gagal'; end if;
  execute d;
end $$;

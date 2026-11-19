-- divisi kandidat selalu mengikuti FPK-nya (dipakai RLS: atasan hanya melihat kandidat divisinya)
create or replace function public.tg_cand_dept() returns trigger language plpgsql security definer set search_path = public as $$
begin
  new.data := jsonb_set(new.data, '{dept}', coalesce(to_jsonb((select f.dept from fpk f where f.id = new.data->>'fpkId')), 'null'));
  return new;
end $$;
revoke execute on function public.tg_cand_dept() from public, anon, authenticated;
create trigger cand_dept before insert or update on public.cands for each row execute function public.tg_cand_dept();

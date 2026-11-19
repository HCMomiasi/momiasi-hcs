-- Momiasi HCS · hak akses (RLS) & aturan alur bisnis yang ditegakkan di server
-- Catatan: koneksi tanpa auth.uid() (migrasi/seed oleh admin database) tidak dibatasi oleh guard.

create or replace function public.deny(msg text) returns void language plpgsql as $$ begin raise exception using message = msg, errcode = 'P0001'; end $$;
create or replace function public.is_peserta(d jsonb) returns boolean language sql stable as $$ select coalesce(d->'peserta' ? auth.uid()::text, false) $$;
create or replace function public.manages_any(d jsonb) returns boolean language sql stable security definer set search_path = public as
$$ select exists (select 1 from jsonb_array_elements_text(coalesce(d->'peserta', '[]')) p where is_manager_of(p::uuid)) $$;
create or replace function public.is_mgr() returns boolean language sql stable security definer set search_path = public as
$$ select exists (select 1 from profiles where id = auth.uid() and level in ('Manager', 'Direktur') and akun = 'aktif') $$;
-- hanya kunci data yang diizinkan boleh berubah
create or replace function public.only_keys(o jsonb, n jsonb, allowed text[], msg text) returns void language plpgsql as $$
begin if (n - allowed) is distinct from (o - allowed) then perform deny(msg); end if; end $$;
create or replace function public.is_rater(d jsonb) returns boolean language sql stable as
$$ select coalesce(d->'penilai' @> jsonb_build_array(jsonb_build_object('uid', auth.uid()::text)), false) $$;

-- ================= POLICIES =================
create policy p_sel on public.profiles for select to authenticated using (true);
create policy p_upd on public.profiles for update to authenticated using (is_hc()) with check (is_hc());
create policy p_ins on public.profiles for insert to authenticated with check (is_super());

create policy s_sel on public.settings for select to authenticated using (key <> 'qsets' or is_hc());
create policy s_ins on public.settings for insert to authenticated with check (is_hc() or key = 'delegasi');
create policy s_upd on public.settings for update to authenticated using (is_hc() or key = 'delegasi') with check (is_hc() or key = 'delegasi');

create policy v_sel on public.vehicles for select to authenticated using (true);
create policy v_all on public.vehicles for all to authenticated using (is_hc()) with check (is_hc());
create policy v_drv on public.vehicles for update to authenticated using (exists (select 1 from cars c where c.driver = auth.uid() and c.data->'assign'->>'vehicleId' = vehicles.id)) with check (true);

create policy t_sel on public.trips for select to authenticated using (owner = auth.uid() or ca_pic = auth.uid() or is_hc() or is_manager_of(owner));
create policy t_ins on public.trips for insert to authenticated with check (owner = auth.uid());
create policy t_upd on public.trips for update to authenticated using (owner = auth.uid() or ca_pic = auth.uid() or is_hc() or is_manager_of(owner));

create policy c_sel on public.cars for select to authenticated using (owner = auth.uid() or driver = auth.uid() or is_hc());
create policy c_ins on public.cars for insert to authenticated with check (owner = auth.uid());
create policy c_upd on public.cars for update to authenticated using (owner = auth.uid() or driver = auth.uid() or is_hc());

create policy r_sel on public.roomb for select to authenticated using (true);
create policy r_ins on public.roomb for insert to authenticated with check (owner = auth.uid());
create policy r_upd on public.roomb for update to authenticated using (owner = auth.uid() or is_hc());

create policy a_sel on public.aset for select to authenticated using (owner = auth.uid() or is_hc());
create policy a_ins on public.aset for insert to authenticated with check (owner = auth.uid());
create policy a_upd on public.aset for update to authenticated using (owner = auth.uid() or is_hc());

create policy f_sel on public.fpk for select to authenticated using (is_hc() or is_dir() or owner = auth.uid() or (dept = my_dept() and is_mgr()));
create policy f_ins on public.fpk for insert to authenticated with check (owner = auth.uid());
create policy f_upd on public.fpk for update to authenticated using (is_hc() or is_dir() or owner = auth.uid());

create policy k_sel on public.cands for select to authenticated using (is_hc() or is_dir() or (dept = my_dept() and is_mgr()));
create policy k_ins on public.cands for insert to authenticated with check (is_hc());
create policy k_upd on public.cands for update to authenticated using (is_hc() or (dept = my_dept() and is_mgr()));

create policy tr_sel on public.trainings for select to authenticated using (is_hc() or owner = auth.uid() or is_peserta(data) or manages_any(data));
create policy tr_ins on public.trainings for insert to authenticated with check (owner = auth.uid());
create policy tr_upd on public.trainings for update to authenticated using (is_hc() or owner = auth.uid() or is_peserta(data) or manages_any(data));

create policy o_sel on public.onb for select to authenticated using (owner = auth.uid() or is_hc() or is_manager_of(owner));
create policy o_ins on public.onb for insert to authenticated with check (is_hc());
create policy o_upd on public.onb for update to authenticated using (owner = auth.uid() or is_hc() or is_manager_of(owner));

create policy e_sel on public.evals for select to authenticated using (is_hc() or is_manager_of(owner) or is_rater(data));
create policy e_ins on public.evals for insert to authenticated with check (is_hc());
create policy e_upd on public.evals for update to authenticated using (is_hc() or is_rater(data));

create policy rv_sel on public.reviews for select to authenticated using (is_hc() or owner = auth.uid() or is_manager_of(owner));
create policy rv_ins on public.reviews for insert to authenticated with check (is_hc());
create policy rv_upd on public.reviews for update to authenticated using (is_hc() or owner = auth.uid() or is_manager_of(owner));

create policy n_sel on public.notifs for select to authenticated using (owner = auth.uid());
create policy n_ins on public.notifs for insert to authenticated with check (true);
create policy n_upd on public.notifs for update to authenticated using (owner = auth.uid());
create policy n_del on public.notifs for delete to authenticated using (owner = auth.uid());

create policy u_sel on public.uploads for select to authenticated using (owner = auth.uid() or is_hc());
create policy u_ins on public.uploads for insert to authenticated with check (owner = auth.uid());

-- ================= GUARD: alur status =================
create or replace function public.tg_guard() returns trigger language plpgsql security definer set search_path = public as $$
declare me uuid := auth.uid(); o text := coalesce(old.data->>'status', ''); n text := coalesce(new.data->>'status', ''); t text := o || '>' || n;
  own uuid; k text; ov jsonb; nv jsonb; i int;
begin
  if me is null then return new; end if; -- seed / admin database
  if tg_op = 'UPDATE' and (new.data->>'userId') is distinct from (old.data->>'userId') then perform deny('Pemilik pengajuan tidak boleh diubah'); end if;
  own := nullif(new.data->>'userId', '')::uuid;

  if tg_table_name = 'trips' then
    if tg_op = 'UPDATE' and not is_hc() then
      if me = own or me = nullif(old.data->>'caPic', '')::uuid then perform only_keys(old.data, new.data, array['status', 'log', 'settlement'], 'Data pengajuan tidak boleh diubah setelah diajukan');
      else perform only_keys(old.data, new.data, array['status', 'log', 'rejectedAt'], 'Atasan hanya boleh menyetujui atau menolak'); end if;
    end if;
    if tg_op = 'INSERT' then
      if n not in ('menunggu_atasan', 'menunggu_hcga') then perform deny('Pengajuan dinas harus dimulai dari menunggu approval'); end if;
      if n = 'menunggu_hcga' and (select atasan from profiles where id = own) is not null then perform deny('Pengajuan dinas wajib melalui atasan'); end if;
    elsif o <> n then
      if t in ('menunggu_atasan>menunggu_hcga', 'menunggu_atasan>ditolak') then
        if me = own or not is_manager_of(own) then perform deny('Hanya atasan langsung (atau delegasinya) yang boleh memutuskan tahap ini'); end if;
      elsif t in ('menunggu_hcga>pemesanan', 'menunggu_hcga>ditolak', 'pemesanan>siap', 'settlement>selesai', 'settlement>siap') then
        if not is_hc() then perform deny('Tahap ini hanya untuk HCGA'); end if;
      elsif t in ('menunggu_atasan>dibatalkan', 'menunggu_hcga>dibatalkan') then
        if me <> own then perform deny('Hanya pemohon yang boleh membatalkan'); end if;
      elsif t = 'siap>settlement' then
        if me not in (own, coalesce(nullif(new.data->>'caPic', '')::uuid, own)) then perform deny('Settlement diajukan oleh pemohon / penerima CA'); end if;
      else perform deny('Perubahan status perjalanan dinas tidak sah: ' || t); end if;
    end if;

  elsif tg_table_name = 'cars' then
    if tg_op = 'UPDATE' and not is_hc() then
      if me = nullif(old.data->'assign'->>'driverId', '')::uuid then perform only_keys(old.data, new.data, array['status', 'log', 'trip', 'assign', 'declined'], 'Driver hanya boleh mengubah status & catatan perjalanan');
      else perform only_keys(old.data, new.data, array['status', 'log', 'trip'], 'Pemohon hanya boleh membatalkan / mencatat perjalanan'); end if;
    end if;
    if tg_op = 'INSERT' then
      if n <> 'menunggu_hcga' then perform deny('Booking mobil harus menunggu HCGA'); end if;
    elsif o <> n then
      if t in ('menunggu_hcga>menunggu_driver', 'menunggu_hcga>dijadwalkan', 'menunggu_hcga>ditolak') then
        if not is_hc() then perform deny('Penjadwalan mobil hanya oleh HCGA'); end if;
      elsif t = 'menunggu_driver>dijadwalkan' then
        if me <> nullif(old.data->'assign'->>'driverId', '')::uuid then perform deny('Hanya driver yang ditugaskan yang boleh menerima jadwal'); end if;
      elsif t = 'menunggu_driver>menunggu_hcga' then
        if me <> nullif(old.data->'assign'->>'driverId', '')::uuid and not is_hc() then perform deny('Hanya driver yang ditugaskan yang boleh menolak jadwal'); end if;
      elsif t in ('dijadwalkan>berjalan', 'berjalan>selesai') then
        if not (is_hc() or me = nullif(old.data->'assign'->>'driverId', '')::uuid or (me = own and coalesce(old.data->>'pakaiDriver', 'true') = 'false')) then perform deny('Hanya driver / pemohon (nyetir sendiri) yang boleh memulai atau menyelesaikan perjalanan'); end if;
      elsif n = 'dibatalkan' and o in ('menunggu_hcga', 'menunggu_driver', 'dijadwalkan') then
        if me <> own and not is_hc() then perform deny('Hanya pemohon yang boleh membatalkan'); end if;
      else perform deny('Perubahan status booking mobil tidak sah: ' || t); end if;
    end if;

  elsif tg_table_name = 'roomb' then
    if tg_op = 'UPDATE' and not is_hc() then perform only_keys(old.data, new.data, array['status', 'log', 'checkinAt'], 'Pemesan hanya boleh check-in atau membatalkan'); end if;
    if tg_op = 'INSERT' and n <> 'menunggu_hcga' then perform deny('Booking ruang harus menunggu HCGA'); end if;
    if tg_op = 'UPDATE' and o <> n then
      if t in ('menunggu_hcga>disetujui', 'menunggu_hcga>ditolak') then
        if not is_hc() then perform deny('Persetujuan ruang hanya oleh HCGA'); end if;
      elsif n = 'dibatalkan' and o in ('menunggu_hcga', 'disetujui') then
        if me <> own and not is_hc() then perform deny('Hanya pemesan yang boleh membatalkan'); end if;
      else perform deny('Perubahan status booking ruang tidak sah: ' || t); end if;
    end if;
    if tg_op = 'UPDATE' and (new.data->>'checkinAt') is distinct from (old.data->>'checkinAt') and me <> own then perform deny('Check-in hanya oleh pemesan'); end if;
    if n in ('menunggu_hcga', 'disetujui') then
      if (new.data->>'peserta')::int > coalesce((select (r->>'kap')::int from settings s, jsonb_array_elements(s.data) r where s.key = 'rooms' and r->>'id' = new.data->>'roomId'), 999) then
        perform deny('Jumlah peserta melebihi kapasitas ruangan'); end if;
      if (new.data->>'selesai') <= (new.data->>'mulai') then perform deny('Jam selesai harus setelah jam mulai'); end if;
      if exists (select 1 from roomb x where x.id <> new.id and x.room = new.data->>'roomId' and x.tanggal = new.data->>'tanggal'
                 and x.status in ('menunggu_hcga', 'disetujui')
                 and not (x.status = 'disetujui' and x.data->>'checkinAt' is null and ((x.tanggal || ' ' || (x.data->>'mulai'))::timestamp + interval '15 minutes') < (now() at time zone 'Asia/Jakarta'))
                 and (x.data->>'mulai') < (new.data->>'selesai') and (new.data->>'mulai') < (x.data->>'selesai')) then
        perform deny('Bentrok dengan booking lain di ruangan & jam yang sama'); end if;
    end if;

  elsif tg_table_name = 'aset' then
    if tg_op = 'UPDATE' and not is_hc() then perform only_keys(old.data, new.data, array['status', 'log', 'konfirmAt'], 'Pemohon hanya boleh konfirmasi terima / membatalkan'); end if;
    if tg_op = 'INSERT' then
      if n <> 'menunggu_hcga' then perform deny('Pengajuan aset harus menunggu HCGA'); end if;
    elsif o <> n then
      if t in ('menunggu_hcga>proses_beli', 'menunggu_hcga>ditolak', 'proses_beli>dipesan', 'dipesan>diterima', 'diterima>diserahkan') then
        if not is_hc() then perform deny('Tahap ini hanya untuk HCGA'); end if;
      elsif t in ('diserahkan>selesai', 'diserahkan>diterima') then
        if me <> own and not is_hc() then perform deny('Konfirmasi terima hanya oleh pemohon'); end if;
      elsif t = 'menunggu_hcga>dibatalkan' then
        if me <> own then perform deny('Hanya pemohon yang boleh membatalkan'); end if;
      else perform deny('Perubahan status aset tidak sah: ' || t); end if;
    end if;

  elsif tg_table_name = 'fpk' then
    if tg_op = 'UPDATE' and not is_hc() then perform only_keys(old.data, new.data, array['status', 'log', 'approvedAt'], 'Isi FPK tidak boleh diubah setelah diajukan'); end if;
    if tg_op = 'INSERT' then
      if n <> 'menunggu_direktur' then perform deny('FPK harus dimulai dari approval Direktur'); end if;
      if (select level from profiles where id = me) <> 'Manager' and not is_hc() then perform deny('FPK hanya bisa diajukan oleh level Manager'); end if;
    elsif o <> n then
      if t in ('menunggu_direktur>menunggu_hcm', 'menunggu_direktur>ditolak') then
        if not is_dir() then perform deny('Tahap ini hanya untuk Direktur'); end if;
      elsif t in ('menunggu_hcm>menunggu_ta', 'menunggu_hcm>ditolak') then
        if not is_hcm() then perform deny('Tahap ini hanya untuk HC Manager'); end if;
      elsif t in ('menunggu_ta>mencari', 'mencari>terpenuhi') then
        if not is_hc() then perform deny('Tahap ini hanya untuk tim TA'); end if;
      elsif n = 'dibatalkan' and o in ('menunggu_direktur', 'menunggu_hcm', 'menunggu_ta') then
        if me <> own then perform deny('Hanya pengaju yang boleh membatalkan'); end if;
      else perform deny('Perubahan status FPK tidak sah: ' || t); end if;
    elsif not is_hc() and not is_dir() and me <> own then perform deny('Tidak berhak mengubah FPK');
    end if;

  elsif tg_table_name = 'cands' then
    if tg_op = 'UPDATE' and not is_hc() then
      if (new.data - 'uif' - 'log') is distinct from (old.data - 'uif' - 'log') then perform deny('User hanya boleh mengisi User Interview Feedback'); end if;
      if old.data ? 'uif' then perform deny('Feedback sudah diisi'); end if;
    end if;

  elsif tg_table_name = 'trainings' then
    if tg_op = 'INSERT' then
      if n not in ('menunggu_atasan', 'menunggu_hcga') then perform deny('Pengajuan training harus menunggu approval'); end if;
      if n = 'menunggu_hcga' and (select atasan from profiles where id = own) is not null then perform deny('Pengajuan training wajib melalui atasan'); end if;
    else
      if o <> n then
        if t in ('menunggu_atasan>menunggu_hcga', 'menunggu_atasan>ditolak') then
          if me = own or not is_manager_of(own) then perform deny('Hanya atasan pengaju yang boleh memutuskan tahap ini'); end if;
        elsif t in ('menunggu_hcga>disetujui', 'menunggu_hcga>ditolak') then
          if not is_hc() then perform deny('Tahap ini hanya untuk HC'); end if;
        elsif t in ('disetujui>terlaksana', 'terlaksana>selesai', 'disetujui>selesai') then null; -- otomatis dari progres peserta
        elsif n = 'dibatalkan' and o in ('menunggu_atasan', 'menunggu_hcga') then
          if me <> own then perform deny('Hanya pengaju yang boleh membatalkan'); end if;
        else perform deny('Perubahan status training tidak sah: ' || t); end if;
      end if;
      if not is_hc() then
        if (new.data->'peserta') is distinct from (old.data->'peserta') or (new.data->>'harga') is distinct from (old.data->>'harga') then perform deny('Peserta & harga hanya bisa diubah HC'); end if;
        for k, nv in select key, value from jsonb_each(coalesce(new.data->'prog', '{}')) loop
          ov := coalesce(old.data->'prog'->k, '{}');
          if (nv->'piagam'->>'status') = 'disetujui' and coalesce(ov->'piagam'->>'status', '') <> 'disetujui' then perform deny('Piagam hanya diterbitkan HC'); end if;
          if k <> me::text and nv is distinct from ov and not is_manager_of(own) then perform deny('Peserta hanya boleh mengisi tugasnya sendiri'); end if;
        end loop;
      end if;
    end if;

  elsif tg_table_name = 'onb' and tg_op = 'UPDATE' and not is_hc() then
    if (new.data->>'pemaparanAt') is distinct from (old.data->>'pemaparanAt') then perform deny('Sesi pemaparan ditandai oleh HC'); end if;
    for i in 0 .. coalesce(jsonb_array_length(new.data->'tasks'), 0) - 1 loop
      nv := new.data->'tasks'->i; ov := old.data->'tasks'->i;
      if (nv->>'status') = 'selesai' and coalesce(ov->>'status', '') <> 'selesai' then
        if (nv->>'verif') = 'hc' or not is_manager_of(own) then perform deny('Tugas ini harus di-acc ' || case when nv->>'verif' = 'hc' then 'HC' else 'atasan (mentor)' end); end if;
      end if;
    end loop;

  elsif tg_table_name = 'evals' and tg_op = 'UPDATE' and not is_hc() then
    for i in 0 .. coalesce(jsonb_array_length(old.data->'penilai'), 0) - 1 loop
      ov := old.data->'penilai'->i; nv := new.data->'penilai'->i;
      if (ov->>'uid') <> me::text and nv is distinct from ov then perform deny('Penilai hanya boleh mengisi penilaiannya sendiri'); end if;
      if (ov->>'uid') = me::text and ov->'s' is not null and ov->'s' <> 'null'::jsonb and nv is distinct from ov then perform deny('Penilaian sudah dikirim'); end if;
    end loop;
    if (new.data - 'penilai') is distinct from (old.data - 'penilai') then perform deny('Data penilaian hanya diubah HC'); end if;

  elsif tg_table_name = 'reviews' and tg_op = 'UPDATE' and not is_hc() then
    if (new.data - 'ecr' - 'self' - 'pfb' - 'perf' - 'log') is distinct from (old.data - 'ecr' - 'self' - 'pfb' - 'perf' - 'log') then perform deny('Jadwal, pengingat & keputusan hanya oleh HC'); end if;
    if me = own and ((new.data->'pfb') is distinct from (old.data->'pfb') or (new.data->'perf') is distinct from (old.data->'perf')) then perform deny('Karyawan tidak boleh mengisi penilaian atasan'); end if;
    if me <> own and ((new.data->'ecr') is distinct from (old.data->'ecr') or (new.data->'self') is distinct from (old.data->'self')) then perform deny('Form ini diisi oleh karyawan yang bersangkutan'); end if;

  elsif tg_table_name = 'profiles' and tg_op = 'UPDATE' and not is_super() then
    if (new.data->>'role', new.data->>'akun', new.data->>'level', new.data->>'atasan', new.data->>'dept', new.data->>'posisi', new.data->>'email', new.data->>'jabatan')
       is distinct from (old.data->>'role', old.data->>'akun', old.data->>'level', old.data->>'atasan', old.data->>'dept', old.data->>'posisi', old.data->>'email', old.data->>'jabatan') then
      perform deny('Peran, level, divisi, atasan & akun hanya diubah Super Admin'); end if;
  elsif tg_table_name = 'settings' and new.key = 'delegasi' and not is_hc() then
    if (new.data->>'from') is not null and new.data->>'from' <> me::text then perform deny('Delegasi hanya bisa dibuat untuk approval Anda sendiri'); end if;
    if tg_op = 'UPDATE' and (old.data->>'from') is not null and old.data->>'from' <> me::text and current_date <= coalesce((old.data->>'sampai')::date, current_date - 1) then perform deny('Delegasi atasan lain masih aktif'); end if;
  end if;
  return new;
end $$;

do $$ declare t text; begin
  foreach t in array array['trips','cars','roomb','aset','fpk','cands','trainings','onb','evals','reviews','profiles','settings'] loop
    execute format('create trigger guard before insert or update on public.%I for each row execute function public.tg_guard()', t);
  end loop;
end $$;

-- ================= RPC =================
-- bank soal untuk peserta tes (tanpa kunci jawaban)
create or replace function public.qsets_public() returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce((select jsonb_agg(jsonb_set(q, '{qs}', (select coalesce(jsonb_agg(x - 'key'), '[]') from jsonb_array_elements(q->'qs') x))) from settings s, jsonb_array_elements(s.data) q where s.key = 'qsets'), '[]')
$$;
grant execute on function public.qsets_public() to authenticated;

-- halaman kandidat (tanpa login): undangan interview & offering, diakses dengan token acak
create or replace function public.cand_public(tok text) returns jsonb language plpgsql stable security definer set search_path = public as $$
declare c record; inv jsonb; f jsonb; hc jsonb;
begin
  if tok is null or length(tok) < 16 then return null; end if;
  select * into c from cands where data->'offer'->>'tok' = tok or exists (select 1 from jsonb_array_elements(data->'invites') i where i->>'tok' = tok) limit 1;
  if not found then return null; end if;
  select i into inv from jsonb_array_elements(c.data->'invites') i where i->>'tok' = tok limit 1;
  select data into f from fpk where id = c.data->>'fpkId';
  select jsonb_build_object('nama', p.data->>'nama', 'jabatan', p.data->>'jabatan') into hc from profiles p where p.role = 'superadmin' order by p.data->>'nama' limit 1;
  return jsonb_build_object('nama', c.data->>'nama', 'email', c.data->>'email', 'jabatan', f->>'jabatan', 'dept', f->>'dept', 'level', f->>'level',
    'invite', case when inv is null then null else inv - 'tok' || jsonb_build_object('iv', (select jsonb_agg(p.data->>'nama') from profiles p where p.id::text in (select jsonb_array_elements_text(inv->'iv')))) end,
    'offer', case when c.data->'offer'->>'tok' = tok then (c.data->'offer') - 'tok' else null end, 'hc', hc);
end $$;
create or replace function public.cand_respond(tok text, resp text, alasan text default '') returns jsonb language plpgsql security definer set search_path = public as $$
declare c record; idx int; inv jsonb; d jsonb; msg text;
begin
  if tok is null or length(tok) < 16 then perform deny('Link tidak valid'); end if;
  select * into c from cands where data->'offer'->>'tok' = tok or exists (select 1 from jsonb_array_elements(data->'invites') i where i->>'tok' = tok) limit 1 for update;
  if not found then perform deny('Link tidak valid'); end if;
  d := c.data;
  if d->'offer'->>'tok' = tok then
    if resp not in ('terima', 'tolak') then perform deny('Jawaban tidak valid'); end if;
    if d->'offer'->>'resp' <> 'menunggu' then perform deny('Penawaran ini sudah dijawab'); end if;
    d := jsonb_set(d, '{offer}', (d->'offer') || jsonb_build_object('resp', resp, 'respAt', (extract(epoch from now()) * 1000)::bigint));
    msg := (d->>'nama') || case when resp = 'terima' then ' menerima offering' else ' menolak offering' end;
  else
    if resp not in ('hadir', 'jadwal_ulang', 'tolak') then perform deny('Jawaban tidak valid'); end if;
    select ord - 1, i into idx, inv from jsonb_array_elements(d->'invites') with ordinality as t(i, ord) where i->>'tok' = tok;
    if inv->>'status' <> 'terkirim' then perform deny('Undangan ini sudah dikonfirmasi'); end if;
    d := jsonb_set(d, array['invites', idx::text], inv || jsonb_build_object('status', resp, 'alasan', coalesce(alasan, ''), 'respAt', (extract(epoch from now()) * 1000)::bigint, 'gcal', resp = 'hadir'));
    if resp = 'tolak' then d := d || jsonb_build_object('stage', 'mundur', 'alasanTolak', coalesce(nullif(alasan, ''), 'Tidak bersedia interview')); end if;
    msg := (d->>'nama') || ': ' || case resp when 'hadir' then 'bersedia hadir' when 'jadwal_ulang' then 'minta jadwal ulang' else 'tidak bersedia' end;
  end if;
  d := jsonb_set(d, '{log}', coalesce(d->'log', '[]') || jsonb_build_array(jsonb_build_object('t', (extract(epoch from now()) * 1000)::bigint, 'by', null, 'act', 'Kandidat: ' || msg, 'note', coalesce(alasan, ''))));
  update cands set data = d where id = c.id;
  insert into notifs(id, data) select x.nid, jsonb_build_object('id', x.nid, 'userId', x.pid, 'text', msg, 'link', '#/kandidat/' || c.id, 't', (extract(epoch from now()) * 1000)::bigint, 'read', false)
    from (select substr(md5(random()::text || p.id::text), 1, 10) nid, p.id pid from profiles p where p.role in ('admin', 'superadmin') and p.akun = 'aktif') x;
  return jsonb_build_object('ok', true);
end $$;
grant execute on function public.cand_public(text) to anon, authenticated;
grant execute on function public.cand_respond(text, text, text) to anon, authenticated;

-- ================= STORAGE =================
insert into storage.buckets (id, name, public) values ('files', 'files', false) on conflict (id) do nothing;
create policy files_ins on storage.objects for insert to authenticated with check (bucket_id = 'files' and (storage.foldername(name))[1] = auth.uid()::text);
create policy files_sel on storage.objects for select to authenticated using (bucket_id = 'files' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_hc()));

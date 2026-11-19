/* Momiasi HCS · QA otomatis lewat API (sama seperti yang bisa dilakukan pengguna dari browser).
   Jalankan di konsol halaman aplikasi: await QA.run(password). Data uji diberi prefix id "qa-" lalu dihapus di akhir via SQL. */
window.QA = (() => {
  const U = { rina: 1, dimas: 2, sari: 3, agus: 4, budi: 5, fajar: 6, nadia: 7, maya: 8, ratna: 9, yoga: 10, hendra: 11, putri: 12, bayu: 13, rudi: 14, lina: 15, rangga: 16 };
  const EMAIL = { rina: 'rina.pratiwi', dimas: 'dimas.hakim', sari: 'sari.wulandari', agus: 'agus.santoso', budi: 'budi.hartono', fajar: 'fajar.nugroho', nadia: 'nadia.putri', maya: 'maya.lestari', ratna: 'ratna.kusuma', hendra: 'hendra.wijaya', putri: 'putri.anggraini', bayu: 'bayu.saputra', rudi: 'rudi.hartanto', lina: 'lina.marlina', rangga: 'rangga.pramudya' };
  const id = n => '00000000-0000-4000-8000-' + String(U[n]).padStart(12, '0');
  const C = {}, R = [];
  const tag = 'qa-' + Date.now().toString(36);
  const today = new Date(Date.now() + 7 * 3600e3).toISOString().slice(0, 10);
  const plus = n => new Date(Date.parse(today) + n * 864e5).toISOString().slice(0, 10);
  async function as(n, pw) {
    if (C[n]) return C[n];
    const c = supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: false, autoRefreshToken: false, storageKey: 'qa-' + n } });
    const { error } = await c.auth.signInWithPassword({ email: EMAIL[n] + '@example.com', password: pw });
    if (error) throw new Error(n + ': ' + error.message);
    return (C[n] = c);
  }
  const log = (area, name, ok, info = '') => { R.push({ area, name, ok, info: String(info).slice(0, 140) }); };
  // expectOk / expectDeny: jalankan operasi, cek hasil sesuai aturan bisnis
  async function expectOk(area, name, p) { try { const r = await p; const e = r?.error || (r && 'data' in r && r.data === null && r.count === undefined && r.status !== 204 ? null : null); log(area, name, !e, e?.message || 'OK'); return r?.data; } catch (e) { log(area, name, false, e.message); } }
  async function expectDeny(area, name, p) { try { const r = await p; const denied = !!r.error || (Array.isArray(r.data) && r.data.length === 0) || (r.data === null && r.status !== 201); log(area, name, denied, r.error?.message || (denied ? 'tidak ada baris yang boleh diubah' : 'LOLOS padahal harus ditolak')); } catch (e) { log(area, name, true, e.message); } }
  const upd = (c, t, rid, data) => c.from(t).update({ data }).eq('id', rid).select('data');
  const ins = (c, t, data) => c.from(t).insert({ id: data.id, data }).select('data');
  const get = async (c, t, rid) => (await c.from(t).select('data').eq('id', rid).maybeSingle()).data?.data;
  const L = (by, act) => ({ t: Date.now(), by: id(by), act, note: '' });

  async function run(pw) {
    R.length = 0;
    const [rina, dimas, sari, lina, ratna, nadia, agus, maya, bayu, putri, fajar] = await Promise.all(['rina', 'dimas', 'sari', 'lina', 'ratna', 'nadia', 'agus', 'maya', 'bayu', 'putri', 'fajar'].map(n => as(n, pw)));

    /* ===== 1. Perjalanan dinas: Karyawan -> Atasan -> HCGA -> booking -> settlement ===== */
    const A = 'Perjalanan dinas';
    let t = { id: tag + '-t1', no: 'PD/AUTO', userId: id('rina'), kategori: 'A', wilayah: 'prov', tujuan: 'Surabaya', berangkat: plus(10), pulang: plus(12), keperluan: 'QA Event', ca: 500000, status: 'menunggu_atasan', log: [L('rina', 'Mengajukan')] };
    const t1 = await expectOk(A, 'Karyawan mengajukan dinas (status menunggu atasan)', ins(rina, 'trips', t));
    log(A, 'Nomor dokumen dibuat server (PD/YYYY/MM/NNN)', /^PD\/\d{4}\/\d{2}\/\d{3}$/.test(t1?.[0]?.data?.no || ''), t1?.[0]?.data?.no);
    await expectDeny(A, 'Karyawan tidak bisa lompat ke "menunggu HCGA" (bypass atasan)', ins(rina, 'trips', { ...t, id: tag + '-t1b', status: 'menunggu_hcga' }));
    await expectDeny(A, 'Karyawan tidak bisa menyetujui pengajuannya sendiri', upd(rina, 'trips', t.id, { ...t, status: 'menunggu_hcga' }));
    await expectDeny(A, 'Karyawan lain tidak bisa melihat pengajuan Rina', nadia.from('trips').select('id').eq('id', t.id));
    await expectDeny(A, 'Atasan divisi lain (Maya) tidak bisa menyetujui', upd(maya, 'trips', t.id, { ...t, status: 'menunggu_hcga' }));
    await expectDeny(A, 'HCGA tidak bisa memproses sebelum atasan menyetujui', upd(lina, 'trips', t.id, { ...t, status: 'pemesanan' }));
    t = { ...t, ...(await get(rina, 'trips', t.id)) };
    await expectDeny(A, 'Atasan tidak boleh mengubah isi pengajuan (CA) saat menyetujui', upd(dimas, 'trips', t.id, { ...t, ca: 9000000, status: 'menunggu_hcga' }));
    await expectOk(A, 'Atasan langsung (Dimas) menyetujui', upd(dimas, 'trips', t.id, { ...t, status: 'menunggu_hcga', log: [...t.log, L('dimas', 'Menyetujui')] }));
    t = await get(rina, 'trips', t.id);
    await expectDeny(A, 'Karyawan tidak bisa mengubah tujuan setelah diajukan', upd(rina, 'trips', t.id, { ...t, tujuan: 'Bali' }));
    await expectOk(A, 'HCGA memproses pemesanan tiket & CA', upd(lina, 'trips', t.id, { ...t, status: 'pemesanan' }));
    t = await get(lina, 'trips', t.id);
    await expectOk(A, 'HCGA menandai siap berangkat', upd(lina, 'trips', t.id, { ...t, status: 'siap', booking: { transport: 'KA Argo', kode: 'QA1' } }));
    t = await get(rina, 'trips', t.id);
    await expectDeny(A, 'Karyawan tidak bisa menutup (selesai) tanpa verifikasi HCGA', upd(rina, 'trips', t.id, { ...t, status: 'selesai' }));
    await expectOk(A, 'Karyawan mengajukan settlement', upd(rina, 'trips', t.id, { ...t, status: 'settlement', settlement: { items: [{ ket: 'Taksi', nominal: 150000 }] } }));
    t = await get(lina, 'trips', t.id);
    await expectOk(A, 'HCGA memverifikasi settlement -> selesai', upd(lina, 'trips', t.id, { ...t, status: 'selesai' }));
    t = await get(lina, 'trips', t.id);
    await expectDeny(A, 'Status yang sudah selesai tidak bisa dibuka lagi', upd(lina, 'trips', t.id, { ...t, status: 'menunggu_atasan' }));
    await expectDeny(A, 'Tidak bisa mengajukan atas nama orang lain', ins(nadia, 'trips', { ...t, id: tag + '-t2', no: 'PD/AUTO', status: 'menunggu_atasan', userId: id('rina') }));

    /* ===== 2. Delegasi approval ===== */
    const D = 'Delegasi';
    const { data: dOld } = await sari.from('settings').select('data').eq('key', 'delegasi').maybeSingle();
    await expectDeny(D, 'Karyawan tidak bisa membuat delegasi atas nama atasannya', rina.from('settings').upsert({ key: 'delegasi', data: { from: id('dimas'), to: id('rina'), mulai: today, sampai: plus(3) } }).select());
    await expectOk(D, 'Atasan mendelegasikan approval ke Fajar', dimas.from('settings').upsert({ key: 'delegasi', data: { from: id('dimas'), to: id('fajar'), mulai: today, sampai: plus(3) } }).select());
    const t3 = { id: tag + '-t3', no: 'PD/AUTO', userId: id('putri'), kategori: 'B', rateB: 'b1', tujuan: 'Gudang', berangkat: plus(2), pulang: plus(2), keperluan: 'QA', ca: 0, status: 'menunggu_atasan', log: [] };
    await expectOk(D, 'Putri (tim Dimas) mengajukan dinas', ins(putri, 'trips', t3));
    await expectOk(D, 'Delegasi (Fajar) bisa menyetujui selama periode aktif', upd(fajar, 'trips', t3.id, { ...(await get(putri, 'trips', t3.id)), status: 'menunggu_hcga' }));
    await sari.from('settings').upsert({ key: 'delegasi', data: dOld?.data ?? null });

    /* ===== 3. Booking ruang meeting ===== */
    const M = 'Ruang meeting';
    const rb = (who, extra) => ({ id: tag + '-b' + Math.random().toString(36).slice(2, 7), no: 'RM/AUTO', userId: id(who), roomId: 'r1', tanggal: plus(20), mulai: '09:00', selesai: '10:00', peserta: 4, judul: 'QA', status: 'menunggu_hcga', log: [], ...extra });
    const b1 = rb('rina');
    await expectOk(M, 'Booking ruang (menunggu HCGA, slot ditahan)', ins(rina, 'roomb', b1));
    await expectDeny(M, 'Jadwal bentrok di ruang & jam yang sama ditolak', ins(nadia, 'roomb', rb('nadia', { mulai: '09:30', selesai: '10:30' })));
    await expectOk(M, 'Jam bersebelahan (10.00–11.00) tetap boleh', ins(nadia, 'roomb', rb('nadia', { mulai: '10:00', selesai: '11:00' })));
    await expectDeny(M, 'Peserta melebihi kapasitas (6 > 5) ditolak', ins(nadia, 'roomb', rb('nadia', { mulai: '13:00', selesai: '14:00', peserta: 6 })));
    await expectDeny(M, 'Jam selesai sebelum jam mulai ditolak', ins(nadia, 'roomb', rb('nadia', { mulai: '15:00', selesai: '14:00' })));
    await expectDeny(M, 'Karyawan tidak bisa menyetujui booking sendiri', upd(rina, 'roomb', b1.id, { ...b1, no: (await get(rina, 'roomb', b1.id)).no, status: 'disetujui' }));
    const b1d = await get(lina, 'roomb', b1.id);
    await expectOk(M, 'HCGA menyetujui booking', upd(lina, 'roomb', b1.id, { ...b1d, status: 'disetujui' }));
    await expectDeny(M, 'Orang lain tidak bisa check-in atas booking Rina', upd(lina, 'roomb', b1.id, { ...b1d, status: 'disetujui', checkinAt: Date.now() }));
    const b1e = await get(rina, 'roomb', b1.id);
    await expectOk(M, 'Pemesan membatalkan -> slot terlepas', upd(rina, 'roomb', b1.id, { ...b1e, status: 'dibatalkan' }));
    await expectOk(M, 'Slot yang dibatalkan bisa dipesan orang lain', ins(nadia, 'roomb', rb('nadia', { mulai: '09:00', selesai: '10:00' })));

    /* ===== 4. Booking mobil + driver ===== */
    const K = 'Booking mobil';
    let c = { id: tag + '-c1', no: 'BM/AUTO', userId: id('rina'), tanggal: plus(5), mulai: '13:00', selesai: '16:00', tujuan: 'Gudang', penumpang: 2, pakaiDriver: true, status: 'menunggu_hcga', log: [] };
    await expectOk(K, 'Karyawan booking mobil', ins(rina, 'cars', c));
    await expectDeny(K, 'Driver tidak bisa mengambil tugas yang belum dijadwalkan HCGA', upd(agus, 'cars', c.id, { ...c, status: 'dijadwalkan' }));
    c = await get(lina, 'cars', c.id);
    await expectOk(K, 'HCGA menugaskan mobil kantor + driver Agus', upd(lina, 'cars', c.id, { ...c, status: 'menunggu_driver', assign: { type: 'kantor', vehicleId: 'v1', driverId: id('agus') } }));
    c = await get(lina, 'cars', c.id);
    await expectDeny(K, 'Driver lain (Budi) tidak bisa menerima tugas Agus', upd(await as('budi', pw), 'cars', c.id, { ...c, status: 'dijadwalkan' }));
    await expectOk(K, 'Driver Agus menerima jadwal', upd(agus, 'cars', c.id, { ...c, status: 'dijadwalkan' }));
    c = await get(agus, 'cars', c.id);
    await expectDeny(K, 'Driver tidak bisa mengganti tujuan / penumpang', upd(agus, 'cars', c.id, { ...c, tujuan: 'Jakarta' }));
    await expectOk(K, 'Driver memulai perjalanan', upd(agus, 'cars', c.id, { ...c, status: 'berjalan', trip: { kmAwal: 1000 } }));
    c = await get(agus, 'cars', c.id);
    await expectOk(K, 'Driver menyelesaikan perjalanan', upd(agus, 'cars', c.id, { ...c, status: 'selesai', trip: { kmAwal: 1000, kmAkhir: 1050 } }));

    /* ===== 5. Pembelian aset ===== */
    const P = 'Pembelian aset';
    let a = { id: tag + '-a1', no: 'PA/AUTO', userId: id('rina'), nama: 'Monitor QA', harga: 2000000, alasan: 'QA', status: 'menunggu_hcga', log: [] };
    await expectOk(P, 'Karyawan mengajukan aset', ins(rina, 'aset', a));
    a = await get(rina, 'aset', a.id);
    await expectDeny(P, 'Karyawan tidak bisa menyetujui / mengubah harga', upd(rina, 'aset', a.id, { ...a, harga: 1, status: 'proses_beli' }));
    for (const s of ['proses_beli', 'dipesan', 'diterima', 'diserahkan']) { a = await get(lina, 'aset', a.id); await expectOk(P, `HCGA: ${s}`, upd(lina, 'aset', a.id, { ...a, status: s })); }
    a = await get(rina, 'aset', a.id);
    await expectDeny(P, 'HCGA tidak bisa mengonfirmasi terima atas nama pemohon', upd(nadia, 'aset', a.id, { ...a, status: 'selesai' }));
    await expectOk(P, 'Pemohon mengonfirmasi barang diterima -> selesai', upd(rina, 'aset', a.id, { ...a, status: 'selesai', konfirmAt: Date.now() }));

    /* ===== 6. FPK (permintaan karyawan): Manager -> Direktur -> HC Manager -> TA ===== */
    const F = 'FPK';
    let f = { id: tag + '-f1', no: 'FPK/AUTO', userId: id('dimas'), dept: 'Branding', jabatan: 'QA Designer', level: 'Staff', jumlah: 1, gajiMin: 5e6, gajiMax: 6e6, tglMinta: today, status: 'menunggu_direktur', log: [] };
    await expectDeny(F, 'Staff (Rina) tidak bisa mengajukan FPK', ins(rina, 'fpk', { ...f, id: tag + '-f0', userId: id('rina') }));
    await expectOk(F, 'Manager (Dimas) mengajukan FPK', ins(dimas, 'fpk', f));
    f = await get(dimas, 'fpk', f.id);
    await expectDeny(F, 'Manager tidak bisa menyetujui FPK sendiri', upd(dimas, 'fpk', f.id, { ...f, status: 'menunggu_hcm' }));
    await expectDeny(F, 'HC Admin tidak bisa melewati Direktur', upd(lina, 'fpk', f.id, { ...f, status: 'menunggu_ta' }));
    await expectOk(F, 'Direktur menyetujui', upd(ratna, 'fpk', f.id, { ...f, status: 'menunggu_hcm' }));
    f = await get(lina, 'fpk', f.id);
    await expectDeny(F, 'HC Admin (bukan HC Manager) tidak bisa approve tahap HC Manager', upd(lina, 'fpk', f.id, { ...f, status: 'menunggu_ta' }));
    await expectOk(F, 'HC Manager menyetujui -> tim TA', upd(sari, 'fpk', f.id, { ...f, status: 'menunggu_ta' }));
    f = await get(lina, 'fpk', f.id);
    await expectOk(F, 'TA mulai mencari kandidat', upd(lina, 'fpk', f.id, { ...f, status: 'mencari' }));
    await expectDeny(F, 'Manager divisi lain (Maya) tidak bisa melihat FPK Branding', maya.from('fpk').select('id').eq('id', f.id));

    /* ===== 7. Kandidat & halaman kandidat (token) ===== */
    const T = 'Kandidat';
    const tok = 'qa' + crypto.randomUUID().replace(/-/g, '');
    let k = { id: tag + '-k1', fpkId: f.id, nama: 'Kandidat QA', email: 'kandidat.qa@example.com', hp: '0812', sumber: 'QA', stage: 'hr', invites: [{ id: 'i1', jenis: 'hr', tgl: plus(3), jam: '10:00', mode: 'Offline', lokasi: 'Kantor', iv: [id('lina')], status: 'terkirim', tok }], log: [] };
    await expectDeny(T, 'Manager tidak bisa menambah kandidat (hanya TA)', ins(dimas, 'cands', k));
    await expectOk(T, 'TA menambah kandidat', ins(lina, 'cands', k));
    k = await get(lina, 'cands', k.id);
    log(T, 'Divisi kandidat otomatis mengikuti FPK', k?.dept === 'Branding', k?.dept);
    await expectDeny(T, 'Karyawan biasa tidak bisa melihat data kandidat', rina.from('cands').select('id').eq('id', k.id));
    await expectDeny(T, 'Manager divisi lain tidak bisa melihat kandidat Branding', maya.from('cands').select('id').eq('id', k.id));
    log(T, 'Manager divisi yang sama bisa melihat kandidat', !!(await get(dimas, 'cands', k.id)));
    await expectDeny(T, 'Manager tidak bisa mengubah tahap kandidat', upd(dimas, 'cands', k.id, { ...k, stage: 'offering' }));
    await expectOk(T, 'Manager mengisi User Interview Feedback', upd(dimas, 'cands', k.id, { ...k, uif: { s: [8, 8, 8, 8, 8, 8], lanjut: 'Lanjut' } }));
    k = await get(dimas, 'cands', k.id);
    await expectDeny(T, 'Feedback yang sudah dikirim tidak bisa diubah', upd(dimas, 'cands', k.id, { ...k, uif: { s: [1, 1, 1, 1, 1, 1], lanjut: 'Tidak' } }));
    const anon = supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: false, storageKey: 'qa-anon' } });
    const pubBad = await anon.rpc('cand_public', { tok: 'tebak-tebak-token-salah' });
    log(T, 'Token salah tidak membuka data kandidat', !pubBad.data, JSON.stringify(pubBad.data));
    const pub = await anon.rpc('cand_public', { tok });
    log(T, 'Kandidat (tanpa login) melihat undangan via token', pub.data?.nama === 'Kandidat QA' && !JSON.stringify(pub.data).includes(tok), pub.error?.message || pub.data?.invite?.jenis);
    await expectOk(T, 'Kandidat mengonfirmasi hadir', anon.rpc('cand_respond', { tok, resp: 'hadir', alasan: '' }));
    await expectDeny(T, 'Konfirmasi kedua kali ditolak', anon.rpc('cand_respond', { tok, resp: 'tolak', alasan: '' }));
    await expectDeny(T, 'Anonim tidak bisa membaca tabel kandidat langsung', anon.from('cands').select('id').limit(1));

    /* ===== 8. LnD: bank soal, 360, training ===== */
    const N = 'LnD';
    const qs = await rina.from('settings').select('key').eq('key', 'qsets');
    log(N, 'Kunci jawaban tes tidak bisa dibaca karyawan', !qs.data?.length, qs.data?.length + ' baris');
    const qp = await rina.rpc('qsets_public');
    log(N, 'Soal tetap bisa diambil tanpa kunci', Array.isArray(qp.data) && qp.data.length > 0 && !JSON.stringify(qp.data).includes('"key"'));
    let tr = { id: tag + '-tr1', no: 'TR/AUTO', userId: id('rina'), judul: 'QA Training', harga: 1000000, peserta: [id('rina'), id('putri')], prog: {}, status: 'menunggu_atasan', log: [] };
    await expectOk(N, 'Karyawan mengajukan training', ins(rina, 'trainings', tr));
    tr = await get(rina, 'trainings', tr.id);
    await expectDeny(N, 'Pengaju tidak bisa menyetujui training sendiri', upd(rina, 'trainings', tr.id, { ...tr, status: 'menunggu_hcga' }));
    await expectOk(N, 'Atasan menyetujui training', upd(dimas, 'trainings', tr.id, { ...tr, status: 'menunggu_hcga' }));
    tr = await get(lina, 'trainings', tr.id);
    await expectOk(N, 'HC menyetujui training', upd(lina, 'trainings', tr.id, { ...tr, status: 'disetujui' }));
    tr = await get(rina, 'trainings', tr.id);
    await expectDeny(N, 'Peserta tidak bisa mengubah harga training', upd(rina, 'trainings', tr.id, { ...tr, harga: 1 }));
    await expectDeny(N, 'Peserta tidak bisa menerbitkan piagam sendiri', upd(rina, 'trainings', tr.id, { ...tr, prog: { [id('rina')]: { piagam: { status: 'disetujui' } } } }));
    await expectOk(N, 'Peserta mengisi tugas before/after miliknya', upd(rina, 'trainings', tr.id, { ...tr, prog: { [id('rina')]: { commit: 'commit.pdf' } } }));
    tr = await get(putri, 'trainings', tr.id);
    await expectDeny(N, 'Peserta lain tidak bisa mengubah tugas Rina', upd(putri, 'trainings', tr.id, { ...tr, prog: { ...tr.prog, [id('rina')]: { commit: 'palsu.pdf' } } }));
    let ev = { id: tag + '-e1', userId: id('rina'), trainingId: tr.id, penilai: [{ uid: id('dimas'), hub: 'Atasan', s: null }, { uid: id('putri'), hub: 'Rekan tim', s: null }], log: [] };
    await expectOk(N, 'HC membuat penilaian 360', ins(lina, 'evals', ev));
    await expectDeny(N, 'Yang dinilai (Rina) tidak bisa melihat siapa menilai apa', rina.from('evals').select('id').eq('id', ev.id));
    ev = await get(putri, 'evals', ev.id);
    await expectDeny(N, 'Penilai tidak bisa mengisi penilaian orang lain', upd(putri, 'evals', ev.id, { ...ev, penilai: [{ ...ev.penilai[0], s: [1, 1] }, ev.penilai[1]] }));
    await expectOk(N, 'Penilai mengisi penilaiannya sendiri', upd(putri, 'evals', ev.id, { ...ev, penilai: [ev.penilai[0], { ...ev.penilai[1], s: [8, 9] }] }));
    ev = await get(putri, 'evals', ev.id);
    await expectDeny(N, 'Penilaian yang sudah dikirim tidak bisa diubah', upd(putri, 'evals', ev.id, { ...ev, penilai: [ev.penilai[0], { ...ev.penilai[1], s: [10, 10] }] }));

    /* ===== 9. Akun & peran ===== */
    const G = 'Akun & peran';
    const me1 = await get(rina, 'profiles', id('rina'));
    await expectDeny(G, 'Karyawan tidak bisa menjadikan dirinya Super Admin', upd(rina, 'profiles', id('rina'), { ...me1, role: 'superadmin' }));
    await expectDeny(G, 'Karyawan tidak bisa mengganti atasannya', upd(rina, 'profiles', id('rina'), { ...me1, atasan: id('maya') }));
    await expectDeny(G, 'Karyawan tidak bisa mengubah profil orang lain', upd(rina, 'profiles', id('nadia'), { ...(await get(rina, 'profiles', id('nadia'))), hp: '0000' }));
    await expectDeny(G, 'Admin HC tidak bisa menaikkan peran (hanya Super Admin)', upd(lina, 'profiles', id('rina'), { ...me1, role: 'admin' }));
    await expectDeny(G, 'Karyawan tidak bisa membaca notifikasi orang lain', rina.from('notifs').select('id').eq('owner', id('sari')).limit(1));
    const fx = await rina.functions.invoke('admin-user', { body: { action: 'create', profile: { nama: 'X', email: 'x.qa@example.com' } } });
    log(G, 'Karyawan tidak bisa membuat akun lewat Edge Function', !!fx.error, fx.error ? 'ditolak' : 'LOLOS');
    const fl = await lina.functions.invoke('admin-user', { body: { action: 'ban', id: id('rina') } });
    log(G, 'Admin HC tidak bisa menonaktifkan akun (hanya Super Admin)', !!fl.error, fl.error ? 'ditolak' : 'LOLOS');
    const anonT = await anon.from('trips').select('id').limit(1);
    log(G, 'Pengunjung tanpa login tidak bisa membaca data', !anonT.data?.length, (anonT.data?.length || 0) + ' baris');
    return R;
  }

  /* ===== stress test ===== */
  async function stress(pw) {
    const out = {};
    const users = ['rina', 'nadia', 'putri', 'bayu', 'fajar', 'rangga', 'dimas', 'maya'];
    const cs = await Promise.all(users.map(n => as(n, pw)));
    // 1) 40 orang berebut slot ruang yang sama secara bersamaan -> harus tepat 1 yang berhasil
    const day = plus(26 + Math.floor(Math.random() * 30));
    const race = await Promise.all(Array.from({ length: 40 }, (_, i) => { const c = cs[i % cs.length], n = users[i % users.length];
      return ins(c, 'roomb', { id: `${tag}-race${i}`, no: 'RM/AUTO', userId: id(n), roomId: 'r2', tanggal: day, mulai: '14:00', selesai: '15:00', peserta: 3, judul: 'race', status: 'menunggu_hcga', log: [] }); }));
    out.raceRoom = { berhasil: race.filter(r => !r.error).length, ditolak: race.filter(r => r.error).length };
    // 2) 100 pengajuan dinas paralel -> nomor dokumen harus unik semua
    let t0 = performance.now();
    const many = await Promise.all(Array.from({ length: 100 }, (_, i) => { const c = cs[i % cs.length], n = users[i % users.length];
      return ins(c, 'trips', { id: `${tag}-m${i}`, no: 'PD/AUTO', userId: id(n), kategori: 'B', rateB: 'b1', tujuan: 'Stress', berangkat: plus(30), pulang: plus(30), keperluan: 'stress', ca: 0, status: n === 'dimas' || n === 'maya' ? 'menunggu_atasan' : 'menunggu_atasan', log: [] }); }));
    const nos = many.filter(r => !r.error).map(r => r.data[0].data.no);
    out.parallelTrips = { dikirim: 100, berhasil: nos.length, nomorUnik: new Set(nos).size, error: many.find(r => r.error)?.error?.message || null, ms: Math.round(performance.now() - t0) };
    // 3) beban baca: 20 kali muat-semua paralel (seperti 20 karyawan membuka aplikasi bersamaan)
    t0 = performance.now();
    const loads = await Promise.all(Array.from({ length: 20 }, (_, i) => Promise.all(Object.values(TBL).map(t => cs[i % cs.length].from(t).select('data').limit(1000)))));
    out.parallelLoad = { sesi: 20, gagal: loads.flat().filter(r => r.error).length, ms: Math.round(performance.now() - t0) };
    return out;
  }
  return { run, stress, R, tag, id };
})();

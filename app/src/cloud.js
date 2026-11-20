/* ===== cloud: Supabase sebagai sumber data =====
   Pola: aplikasi tetap bekerja di objek S (sama seperti prototype). save() menghitung selisih
   terhadap snapshot terakhir dari server lalu mengirim insert/update per baris. Aturan bisnis
   ditegakkan di database (RLS + trigger guard); bila ditolak, pesan server ditampilkan dan data dimuat ulang. */
const CFG = window.__HCS_CLOUD__;
const BASE = location.origin + location.pathname;
const AUTH_HASH = /type=(recovery|invite|signup|magiclink)/.exec(location.hash)?.[1] || (new URLSearchParams(location.search).has('aktivasi') ? 'recovery' : null);
const sb = supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'implicit' } });
const TBL = { users: 'profiles', vehicles: 'vehicles', trips: 'trips', cars: 'cars', roomb: 'roomb', aset: 'aset', trainings: 'trainings', onb: 'onb', evals: 'evals', fpk: 'fpk', cands: 'cands', reviews: 'reviews', notifs: 'notifs' };
const SETK = ['rooms', 'rateA', 'rateB', 'zona', 'lndBudget', 'ldTpl', 'qsets', 'onbTmpl', 'taTpl', 'delegasi'];
const blank = () => ({ v: 10, persona: 'karyawan', loggedIn: false, meId: null, seq: {}, delegasi: null, rooms: [], rateA: {}, rateB: [], zona: [], lndBudget: {}, ldTpl: [], qsets: [], onbTmpl: [], taTpl: {}, ...Object.fromEntries(Object.keys(TBL).map(k => [k, []])) });
let SNAP = {}, SESSION = null, BUSY = 0, PUB = null;
S = blank();

/* ---------- muat data ---------- */
async function fetchAll(t, cols = 'data') {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb.from(t).select(cols).order(t === 'settings' ? 'key' : 'id').range(from, from + 999);
    if (error) throw error;
    rows.push(...data);
    if (data.length < 1000) return rows;
  }
}
async function loadAll() {
  const keys = Object.keys(TBL);
  const [sets, ...lists] = await Promise.all([fetchAll('settings', 'key,data'), ...keys.map(k => fetchAll(TBL[k]))]);
  const n = blank(), snap = { settings: {} };
  keys.forEach((k, i) => { n[k] = lists[i].map(r => r.data); snap[k] = Object.fromEntries(n[k].map(o => [o.id, JSON.stringify(o)])); });
  sets.forEach(r => { if (SETK.includes(r.key)) n[r.key] = r.data; });
  if (!sets.some(r => r.key === 'qsets')) { const q = await sb.rpc('qsets_public'); n.qsets = q.data || []; }
  SETK.forEach(k => { snap.settings[k] = JSON.stringify(n[k] ?? null); });
  const mx = (re, src) => Math.max(0, ...[...JSON.stringify(src).matchAll(re)].map(m => +m[1]));
  n.seq = { AST: mx(/AST-\d{4}-(\d{3})/g, n.aset), PGM: mx(/PGM\/\d{4}\/\d{2}\/(\d{3})/g, n.trainings) };
  const meU = n.users.find(u => u.id === SESSION?.user.id);
  if (!['admin', 'superadmin'].includes(meU?.role)) n.users = n.users.filter(u => u.akun !== 'menunggu');
  Object.assign(n, { loggedIn: !!meU && meU.akun === 'aktif', meId: meU?.id || null, persona: meU ? personaOf(meU, n) : 'karyawan' });
  S = n; SNAP = snap;
  return meU;
}
function personaOf(u, n = S) {
  if (u.role === 'superadmin') return 'superadmin';
  if (u.role === 'admin') return 'admin';
  if (u.posisi === 'Driver') return 'driver';
  if (u.level === 'Direktur') return 'direktur';
  if (u.role === 'atasan') return 'atasan';
  return n.onb.some(o => o.userId === u.id && o.status === 'berjalan') ? 'baru' : 'karyawan';
}

/* ---------- simpan (diff -> insert/update) ---------- */
let QUEUED = false, chain = Promise.resolve();
save = function () { if (!S.loggedIn || QUEUED) return; QUEUED = true; queueMicrotask(() => { QUEUED = false; chain = chain.then(push).catch(syncFail); }); };
async function push() {
  const myId = S.meId; let changed = false;
  for (const [k, t] of Object.entries(TBL)) {
    const snap = SNAP[k] || (SNAP[k] = {});
    for (const o of [...S[k]]) {
      const j = JSON.stringify(o);
      if (snap[o.id] === j) continue;
      BUSY++;
      try {
        if (!(o.id in snap) && k === 'users') { const old = o.id, r = await fn('create', { profile: o }); Object.assign(o, r.profile); if (o.id !== old) remapId(old, o.id); }
        else if (!(o.id in snap) && k === 'notifs' && o.userId !== myId) {
          const { error } = await sb.from(t).insert({ id: o.id, data: o }); if (error) throw error;
          S.notifs = S.notifs.filter(x => x !== o); continue;
        } else {
          const q = o.id in snap ? sb.from(t).update({ data: o }).eq('id', o.id) : sb.from(t).insert({ id: o.id, data: o });
          const { data, error } = await q.select('data').maybeSingle();
          if (error) throw error;
          if (!data) throw new Error('Anda tidak berhak mengubah data ini');
          for (const key in data.data) if (JSON.stringify(o[key]) !== JSON.stringify(data.data[key])) { o[key] = data.data[key]; changed = true; }
        }
        snap[o.id] = JSON.stringify(o);
      } finally { BUSY--; }
    }
  }
  for (const k of SETK) {
    const j = JSON.stringify(S[k] ?? null);
    if (SNAP.settings[k] === j || (k === 'qsets' && !isHCGA())) continue;
    const { error } = await sb.from('settings').upsert({ key: k, data: S[k] ?? null });
    if (error) throw error;
    SNAP.settings[k] = j;
  }
  if (changed) softRender();
}
function remapId(a, b) {
  for (const k of Object.keys(TBL)) S[k] = S[k].map(o => { const j = JSON.stringify(o); return j.includes(a) ? Object.assign(o, JSON.parse(j.split(a).join(b))) : o; });
}
async function syncFail(e) {
  const msg = e?.message || String(e);
  toast(/JWT|token/i.test(msg) ? 'Sesi berakhir, silakan login ulang' : 'Tidak tersimpan: ' + msg);
  try { await loadAll(); } catch (_) {}
  render();
}
function softRender() { if (!$('#modal').classList.contains('open') && !document.activeElement?.closest('form')) rerenderQuiet(); }
function rerenderQuiet() { const y = window.scrollY; render(); window.scrollTo(0, y); }
nextNo = p => `${p}/AUTO`;
async function fn(action, body = {}) {
  const { data, error } = await sb.functions.invoke('admin-user', { body: { action, redirectTo: BASE + '?aktivasi=1', ...body } });
  if (error) { let m = error.message; try { m = (await error.context.json()).error || m; } catch (_) {} throw new Error(m); }
  return data;
}

/* ---------- unggah berkas ke Storage ---------- */
document.addEventListener('change', async e => {
  const inp = e.target;
  if (inp.type !== 'file' || !S.loggedIn || !inp.files.length) return;
  const files = [...inp.files].filter(f => !/\.csv$/i.test(f.name));
  if (!files.length) return;
  if (files.some(f => f.size > 10 * 1024 * 1024)) { toast('Maksimal 10 MB per file'); inp.value = ''; return; }
  const form = inp.form, btn = form && form.querySelector('button:not([type=button])'); if (btn) btn.disabled = true;
  try {
    for (const f of files) {
      const path = `${S.meId}/${Date.now()}-${f.name.replace(/[^\w.\-]+/g, '_')}`;
      const up = await sb.storage.from('files').upload(path, f); if (up.error) throw up.error;
      const r = await sb.from('uploads').insert({ name: f.name, path, viewers: viewersFor() }); if (r.error) throw r.error;
    }
    toast(files.length > 1 ? `${files.length} file terunggah` : 'File terunggah');
  } catch (err) { toast('Gagal mengunggah: ' + err.message); inp.value = ''; }
  finally { if (btn) btn.disabled = false; }
}, true);
/* siapa saja yang boleh membuka berkas ini selain pengunggah & HC: pemilik pengajuan yang sedang dibuka + atasannya */
function viewersFor() {
  const [p0, p1] = parse().parts, src = { dinas: S.trips, onb: S.onb, training: S.trainings, aset: S.aset, mobil: S.cars }[p0];
  const rec = src && src.find(x => x.id === p1), owner = rec?.userId;
  const ids = [owner, owner && user(owner).atasan, rec?.caPic, me().atasan, ...(rec?.peserta || [])];
  return [...new Set(ids.filter(x => x && x !== S.meId && /^[0-9a-f-]{36}$/.test(x)))];
}
document.addEventListener('click', async e => {
  const el = e.target.closest('.file'); if (!el || !S.loggedIn || e.target.closest('[data-act]')) return;
  const name = el.dataset.f || el.textContent.trim(), w = window.open('', '_blank');
  let q = sb.from('uploads').select('path').eq('name', name);
  if (el.dataset.o) q = q.eq('owner', el.dataset.o);
  const { data } = await q.order('created_at', { ascending: false }).limit(1);
  const s = data?.length ? await sb.storage.from('files').createSignedUrl(data[0].path, 300) : null;
  if (!s || s.error) { w?.close(); return toast(s ? s.error.message : 'File tidak ditemukan atau Anda tidak berhak membukanya'); }
  if (w) { w.opener = null; w.location = s.data.signedUrl; } else location.href = s.data.signedUrl;
});

/* ---------- realtime: perubahan dari pengguna lain langsung tampil tanpa refresh ---------- */
let RT = null, RQ = null;
function queueRender() {
  clearTimeout(RQ);
  RQ = setTimeout(() => {
    if ($('#modal').classList.contains('open') || document.querySelector('#view form') || document.activeElement?.closest('form')) { RQ = null; return setTimeout(queueRender, 1500); }
    rerenderQuiet();
  }, 250);
}
function applyChange(k, p) {
  if (!S.loggedIn) return;
  const snap = SNAP[k] || (SNAP[k] = {});
  if (p.eventType === 'DELETE') { const id = p.old?.id; if (!S[k].some(o => o.id === id)) return; S[k] = S[k].filter(o => o.id !== id); delete snap[id]; return queueRender(); }
  const d = p.new?.data; if (!d || !d.id) return;
  if (k === 'notifs' && d.userId !== S.meId) return;
  if (k === 'users' && d.akun === 'menunggu' && !isHCGA()) return;
  if (k === 'users' && d.id === S.meId) return reloadSoon();   // peran / atasan saya berubah: muat ulang penuh
  const o = S[k].find(x => x.id === d.id);
  if (o && snap[d.id] !== undefined && JSON.stringify(o) !== snap[d.id]) return;   // ada perubahan lokal yang belum tersimpan
  const before = o ? JSON.stringify(o) : null;
  if (o) { Object.keys(o).forEach(key => { if (!(key in d)) delete o[key]; }); Object.assign(o, d); } else S[k].push(d);
  const after = JSON.stringify(o || d); snap[d.id] = after;
  if (before !== after) queueRender();
}
let RL = null;
function reloadSoon() { clearTimeout(RL); RL = setTimeout(async () => { try { await chain; await loadAll(); queueRender(); } catch (_) {} }, 400); }
function startRealtime() {
  stopRealtime();
  RT = sb.channel('hcs-' + S.meId);
  Object.entries(TBL).forEach(([k, t]) => RT.on('postgres_changes', { event: '*', schema: 'public', table: t }, p => applyChange(k, p)));
  RT.on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, reloadSoon);
  let first = true;
  RT.subscribe(st => { if (st === 'SUBSCRIBED') { if (!first) reloadSoon(); first = false; } });   // sambung ulang: ambil yang terlewat
}
function stopRealtime() { if (RT) { sb.removeChannel(RT); RT = null; } }

/* ---------- link untuk kandidat & karyawan ---------- */
const tokGen = () => Array.from(crypto.getRandomValues(new Uint8Array(18)), b => 'abcdefghijkmnpqrstuvwxyz23456789'[b % 32]).join('');
fakeLink = path => {
  const [k, a, b] = path.split('/');
  if (k === 'k' || k === 'o') {
    const c = CD(a), x = c && (k === 'o' ? c.offer : c.invites.find(i => i.id === b));
    if (!x) return BASE;
    if (!x.tok) { x.tok = tokGen(); save(); }
    return `${BASE}#/${k === 'o' ? 'offer' : 'konfirmasi'}/${x.tok}`;
  }
  return BASE + ({ ecr: `#/ecr/${a}`, tugas: '#/lnd-tugas', review: `#/review/${a}` }[k] || '#/');
};

/* halaman kandidat tanpa login: isi S dengan data publik dari token lalu pakai tampilan yang sama */
const vKonfirmasi0 = vKonfirmasi, vOffer0 = vOffer;
function pubView(kind, tok) {
  if (PUB && PUB.tok === tok && PUB.d) {
    const d = PUB.d, iv = (d.invite?.iv || []).map((n, i) => ({ id: 'iv' + i, nama: n })), keep = S;
    S = { ...S, users: [{ id: 'hc', nama: d.hc?.nama || 'Tim HC', jabatan: d.hc?.jabatan || 'HCGA', role: 'superadmin', akun: 'aktif' }, ...iv],
      fpk: [{ id: 'f', jabatan: d.jabatan, dept: d.dept, level: d.level }],
      cands: [{ id: 'c', fpkId: 'f', nama: d.nama, email: d.email, invites: d.invite ? [{ ...d.invite, id: 'i', iv: iv.map(x => x.id) }] : [], offer: d.offer, log: [] }] };
    try { return (kind === 'offer' ? vOffer0('c') : vKonfirmasi0('c', 'i')).replace(/<div class="demo-note">[\s\S]*?<\/div>/, ''); } finally { S = keep; }
  }
  if (PUB && PUB.tok === tok && PUB.err) return `<div class="cand"><div class="cand-in"><div class="lw" style="width:130px">${LOGO()}</div><h1 style="margin-top:18px">Link tidak berlaku</h1><p class="muted">Link ini tidak ditemukan atau sudah tidak aktif. Hubungi tim Talent Acquisition Momiasi.</p></div></div>`;
  PUB = { tok };
  sb.rpc('cand_public', { tok }).then(({ data, error }) => { PUB = { tok, d: data, err: error || !data }; render(); });
  return '<div class="cand"><div class="cand-in"><p class="muted">Memuat…</p></div></div>';
}
vKonfirmasi = (a, b) => S.loggedIn && CD(a) ? vKonfirmasi0(a, b) : pubView('konfirmasi', a);
vOffer = a => S.loggedIn && CD(a) ? vOffer0(a) : pubView('offer', a);
async function candRespond(resp, alasan) {
  const { error } = await sb.rpc('cand_respond', { tok: PUB.tok, resp, alasan: alasan || '' });
  if (error) return toast(error.message);
  PUB.d = null; const { data } = await sb.rpc('cand_public', { tok: PUB.tok }); PUB.d = data; render(); toast('Terima kasih, jawaban Anda terkirim');
}

/* ---------- auth ---------- */
function prodLogin(html) { return html.replace(/<div class="demo-box">[\s\S]*?<\/form>/, '</form>'); }
const vLogin0 = vLogin; vLogin = q => prodLogin(vLogin0(q));
vAktivasi = () => {
  const u = S.users.find(x => x.id === SESSION?.user.id);
  if (!u) return `<div class="auth"><div class="authbox"><div class="lw" style="width:150px">${LOGO()}</div><h1 style="margin-top:22px">Link tidak berlaku</h1><p class="muted">Link aktivasi sudah kedaluwarsa atau sudah dipakai. Minta link baru ke HCGA.</p><a class="btn" href="#/login">Ke halaman masuk</a></div></div>`;
  return `<div class="auth"><form class="authbox" data-form="aktivasi" data-id="${u.id}" novalidate>
    <div class="lw" style="width:150px">${LOGO()}</div>
    <h1 style="margin-top:22px">${u.akun === 'undangan' ? 'Aktifkan akun' : 'Buat password baru'}</h1><p class="muted" style="margin:4px 0 20px">Halo ${esc(u.nama.split(' ')[0])}, buat password untuk ${esc(u.email)}.</p>
    <div class="form"><div class="f"><label>Password baru</label><input type="password" name="p1" autocomplete="new-password"><span class="hint">Minimal 8 karakter.</span></div>
    <div class="f"><label>Ulangi password</label><input type="password" name="p2" autocomplete="new-password"></div>
    <div id="formErr"></div><button class="btn primary" style="height:42px">Simpan & masuk</button></div></form></div>`;
};
const authErr = m => { const el = $('#formErr'); if (el) el.innerHTML = `<div class="alert">${m}</div>`; };
async function enter(first) {
  const u = await loadAll();
  if (!u) { await sb.auth.signOut(); SESSION = null; return authErr('Akun belum terdaftar di Momiasi HCS. Hubungi HCGA.'); }
  if (u.akun === 'nonaktif') { await sb.auth.signOut(); SESSION = null; S = blank(); return authErr('Akun ini sudah dinonaktifkan.'); }
  if (u.akun === 'undangan') return go('#/aktivasi');
  startRealtime();
  go(location.hash && !/^#\/(login|aktivasi)?$/.test(location.hash) ? location.hash : '#/');
  if (first) toast(`Selamat datang, ${u.nama.split(' ')[0]}`);
}
const FORMS_CLOUD = {
  login: async fd => {
    const email = (fd.get('email') || '').trim().toLowerCase(), password = fd.get('password') || '';
    if (!email || !password) return authErr('Isi email dan password.');
    authErr('Memeriksa…');
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return authErr(/invalid/i.test(error.message) ? 'Email atau password salah.' : /banned/i.test(error.message) ? 'Akun belum disetujui HC atau sudah dinonaktifkan. Hubungi HCGA.' : esc(error.message));
    SESSION = data.session; await enter(true);
  },
  aktivasi: async fd => {
    const p1 = fd.get('p1') || '';
    if (p1.length < 8) return authErr('Password minimal 8 karakter.');
    if (p1 !== fd.get('p2')) return authErr('Password tidak sama.');
    const { error } = await sb.auth.updateUser({ password: p1 });
    if (error) return authErr(esc(error.message));
    const u = S.users.find(x => x.id === SESSION.user.id);
    if (u.akun === 'undangan') {
      const { error: e2 } = await sb.from('profiles').update({ data: { ...u, akun: 'aktif' } }).eq('id', u.id);
      if (e2) return authErr(esc(e2.message));
      await loadAll(); notifyHCGA(`${u.nama} sudah mengaktifkan akun`, '#/pengaturan?tab=karyawan'); save();
    }
    history.replaceState(null, '', BASE + '#/'); toast('Password tersimpan'); await enter(true);
  },
  konfirmasi: (fd, f) => f.dataset.c !== 'c' ? FORMS0.konfirmasi(fd, f) : candRespond(fd.get('r'), (fd.get('alasan') || '').trim()),
  'offer-resp': (fd, f) => f.dataset.c !== 'c' ? FORMS0['offer-resp'](fd, f) : candRespond('terima')
};
FORMS_CLOUD.daftar = async (fd, f) => {
  const g = k => (fd.get(k) || '').trim();
  if (g('nama').length < 3 || !g('jabatan')) return authErr('Isi nama lengkap dan jabatan.');
  if ((fd.get('p1') || '').length < 8) return authErr('Password minimal 8 karakter.');
  if (fd.get('p1') !== fd.get('p2')) return authErr('Password tidak sama.');
  const btn = f.querySelector('button.primary'); btn.disabled = true; authErr('Mengirim…');
  const { error } = await sb.functions.invoke('daftar', { body: { nama: g('nama'), email: g('email'), hp: g('hp'), company: g('company'), dept: g('dept'), jabatan: g('jabatan'), password: fd.get('p1') } });
  btn.disabled = false;
  if (error) { let m = error.message; try { m = (await error.context.json()).error || m; } catch (_) {} return authErr(esc(m)); }
  go('#/daftar/terkirim');
};
regApply = async (u, f) => {
  try {
    const r = await fn('approve', { id: u.id, profile: f });
    await loadAll(); render(); toast(`Akun ${u.nama} aktif`);
    const p = r.profile;
    sendModal(`Kabari ${p.nama}`, [{ ke: p.nama, hp: p.hp || '', email: p.email, subjek: 'Akun Momiasi HCS Anda sudah aktif',
      text: `Halo ${p.nama.split(' ')[0]},\n\nPendaftaran akun Momiasi HCS Anda sudah disetujui HC. Silakan masuk di ${BASE} memakai email ${p.email} dan password yang Anda buat saat mendaftar.\n\nTim HCGA Momiasi` }]);
  } catch (e) { toast(e.message); }
};
regReject = async u => { try { await fn('reject', { id: u.id }); await loadAll(); render(); toast('Pendaftaran ditolak'); } catch (e) { toast(e.message); } };
const FORMS0 = { ...FORMS }; Object.assign(FORMS, FORMS_CLOUD);
const ACT0 = { ...ACT };
Object.assign(ACT, {
  logout: async () => { stopRealtime(); await sb.auth.signOut(); SESSION = null; S = blank(); SNAP = {}; go('#/login'); },
  forgot: () => modal('Lupa password', '<p style="margin:0">Masukkan email kantor. Link untuk membuat password baru akan dikirim ke email tersebut. Jika tidak masuk dalam beberapa menit, minta link reset ke HCGA.</p><div class="f"><label>Email</label><input type="email" name="email" placeholder="nama@momiasi.id" autofocus></div>', 'Kirim link', fd => {
    const email = (fd.get('email') || '').trim().toLowerCase(); if (!email) return false;
    sb.auth.resetPasswordForEmail(email, { redirectTo: BASE + '?aktivasi=1' }).then(({ error }) => toast(error ? (/rate/i.test(error.message) ? 'Terlalu banyak permintaan. Minta link reset ke HCGA.' : error.message) : 'Jika email terdaftar, link reset sudah dikirim'));
  }),
  'invite-view': async d => {
    const u = user(d.id); toast('Membuat link…');
    try {
      const { link } = await fn('link', { id: u.id });
      const baru = u.akun === 'undangan';
      const text = `Halo ${u.nama.split(' ')[0]},\n\n${baru ? 'HCGA sudah membuatkan akun Momiasi HCS (Human Capital System) untuk Anda.' : 'Berikut link untuk membuat password baru Momiasi HCS Anda.'} Buka link berikut untuk membuat password:\n${link}\n\nLink hanya bisa dipakai sekali dan berlaku 24 jam. Setelah itu masuk lewat ${BASE} dengan email ${u.email}.\n\nTim HCGA Momiasi`;
      sendModal(baru ? `Undangan akun · ${u.nama}` : `Link reset password · ${u.nama}`, [{ ke: u.nama, hp: u.hp || '', email: u.email, subjek: baru ? 'Akun Momiasi HCS Anda' : 'Reset password Momiasi HCS', text }]);
    } catch (e) { toast(e.message); }
  },
  'akun-off': d => { const u = user(d.id); modal(`Nonaktifkan akun ${esc(u.nama)}?`, '<p style="margin:0">Karyawan tidak bisa login lagi. Riwayat pengajuannya tetap tersimpan untuk laporan.</p>', 'Nonaktifkan', () => {
    fn('ban', { id: u.id }).then(() => { u.akun = 'nonaktif'; rerender(); toast('Akun dinonaktifkan'); }).catch(e => toast(e.message)); }, true); },
  'akun-on': d => { const u = user(d.id); fn('unban', { id: u.id }).then(() => { u.akun = 'aktif'; rerender(); toast('Akun diaktifkan kembali'); }).catch(e => toast(e.message)); },
  'offer-tolak': d => d.id !== 'c' ? ACT0['offer-tolak'](d) : candRespond('tolak'),
  reset: () => { toast('Memuat ulang data…'); loadAll().then(() => { render(); toast('Data diperbarui'); }); }
});

/* render tahan banting: satu data rusak tidak membuat halaman macet */
window.removeEventListener('hashchange', render);
const render0 = render;
render = function () {
  try { render0(); }
  catch (e) { console.error(e); document.body.classList.remove('bare'); $('#view').innerHTML = `<div class="page-head"><div><h1>Halaman gagal dimuat</h1><p class="muted">${esc(e.message)}</p></div></div><a class="btn" href="#/">Kembali ke beranda</a>`; }
};
window.addEventListener('hashchange', () => render());

/* ---------- boot ---------- */
async function boot() {
  document.querySelectorAll('.lw-slot').forEach(el => { el.innerHTML = LOGO(); });
  const { data } = await sb.auth.getSession();
  SESSION = data.session;
  if (AUTH_HASH && SESSION) { await loadAll(); history.replaceState(null, '', BASE + '#/aktivasi'); return render(); }
  if (SESSION) { try { await enter(false); } catch (e) { toast(e.message); go('#/login'); } }
  render();
}
sb.auth.onAuthStateChange((ev, s) => { SESSION = s; if (ev === 'SIGNED_OUT' && S.loggedIn) { S = blank(); go('#/login'); } });
setInterval(async () => {
  if (!S.loggedIn || BUSY || QUEUED || document.hidden || $('#modal').classList.contains('open') || document.activeElement?.closest('form')) return;
  try { await chain; await loadAll(); rerenderQuiet(); } catch (_) {}
}, 300000);
document.addEventListener('visibilitychange', () => { if (!document.hidden && S.loggedIn) reloadSoon(); });
boot();

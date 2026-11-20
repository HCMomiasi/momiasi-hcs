/* ===== icons ===== */
const IC = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  bag: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  car: '<path d="M3 16v-4l2.2-5.2A1.5 1.5 0 0 1 6.6 6h10.8a1.5 1.5 0 0 1 1.4.8L21 12v4a1 1 0 0 1-1 1h-1M5 17H4a1 1 0 0 1-1-1M3 12h18M9 17h6"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  door: '<path d="M4 21h16M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><path d="M14 12h.01"/>',
  check: '<path d="m9 11 3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  chart: '<path d="M4 20V11M10 20V5M16 20v-6M3 20h18"/>',
  sliders: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  bell: '<path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  print: '<path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><rect x="7" y="14" width="10" height="7"/>',
  file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/>',
  dl: '<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>',
  logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
  grad: '<path d="M2 9.5 12 5l10 4.5L12 14z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9.5V15"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h8"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  auto: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>',
  chat: '<path d="M20 12a8 8 0 0 1-11.8 7L4 20l1-4A8 8 0 1 1 20 12z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  screen: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>'
};
const ic = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;
const LOGO = () => `<img src="${LOGO_SRC}" alt="Momiasi">`;

const GROUPS = { ga: 'General Affairs & Admin', ta: 'Talent Acquisition', lnd: 'Learning & Development', sys: 'Sistem' };
const NAV_ALL = {
  beranda: ['Beranda', 'home', null], persetujuan: ['Persetujuan', 'check', null], jadwal: ['Jadwal saya', 'cal', null],
  dinas: ['Perjalanan dinas', 'bag', 'ga'], mobil: ['Booking mobil', 'car', 'ga'], ruang: ['Ruang meeting', 'door', 'ga'], aset: ['Pembelian aset', 'box', 'ga'], armada: ['Armada & driver', 'wrench', 'ga'],
  'dash-ga': ['Dashboard', 'chart', 'ga'], 'dash-ta': ['Dashboard', 'chart', 'ta'], 'dash-lnd': ['Dashboard', 'chart', 'lnd'],
  ta: ['Talent Acquisition', 'users', 'ta'],
  'ta-fpk': ['Permintaan karyawan', 'file', 'ta'], 'ta-kandidat': ['Kandidat', 'users', 'ta'], 'ta-jadwal': ['Jadwal interview', 'cal', 'ta'], 'ta-kontrak': ['Probation & kontrak', 'flag', 'ta'], 'ta-set': ['Pengaturan TA', 'sliders', 'ta'],
  'lnd-tugas': ['Tugas saya', 'check', null], training: ['Pengajuan training', 'grad', 'lnd'], 'lnd-tim': ['Tim saya', 'users', 'lnd'],
  'lnd-onb': ['Onboarding', 'flag', 'lnd'], 'lnd-training': ['Progres training', 'route', 'lnd'], 'lnd-360': ['Penilaian 360°', 'target', 'lnd'], 'lnd-riwayat': ['Riwayat training', 'file', 'lnd'], 'lnd-set': ['Pengaturan LnD', 'sliders', 'lnd'],
  laporan: ['Laporan', 'chart', 'sys'], pengaturan: ['Pengaturan', 'sliders', 'sys']
};
const ROLE_NAV = {
  karyawan: ['beranda', 'lnd-tugas', 'dinas', 'mobil', 'ruang', 'aset', 'training'],
  baru: ['beranda', 'lnd-tugas', 'dinas', 'mobil', 'ruang', 'aset', 'training'],
  atasan: ['beranda', 'persetujuan', 'lnd-tugas', 'dinas', 'mobil', 'ruang', 'aset', 'ta-fpk', 'ta-kandidat', 'training', 'lnd-tim'],
  direktur: ['beranda', 'persetujuan', 'lnd-tugas', 'dinas', 'mobil', 'ruang', 'aset', 'ta-fpk', 'ta-kandidat', 'training', 'lnd-tim'],
  admin: ['beranda', 'persetujuan', 'lnd-tugas', 'dash-ga', 'dinas', 'mobil', 'ruang', 'aset', 'armada', 'dash-ta', 'ta-fpk', 'ta-kandidat', 'ta-jadwal', 'ta-kontrak', 'ta-set', 'dash-lnd', 'lnd-onb', 'lnd-training', 'lnd-360', 'lnd-riwayat', 'lnd-set', 'laporan'],
  superadmin: ['beranda', 'persetujuan', 'lnd-tugas', 'dash-ga', 'dinas', 'mobil', 'ruang', 'aset', 'armada', 'dash-ta', 'ta-fpk', 'ta-kandidat', 'ta-jadwal', 'ta-kontrak', 'ta-set', 'dash-lnd', 'lnd-onb', 'lnd-training', 'lnd-360', 'lnd-riwayat', 'lnd-set', 'laporan', 'pengaturan'],
  driver: ['jadwal']
};
const NAV = Object.fromEntries(Object.entries(ROLE_NAV).map(([r, ks]) => [r, ks.map(k => [k, NAV_ALL[k][0], NAV_ALL[k][1], NAV_ALL[k][2]])]));
const SOON = [];
const DASH = ['dash-ga', 'dash-ta', 'dash-lnd'];

/* ===== small components ===== */
const pill = s => { const [l, c] = ST[s] || [s, 'gray']; return `<span class="pill ${c}">${l}</span>`; };
const card = (title, body, aside, sub) => `<section class="card"><div class="card-h"><h2>${title}${sub ? ` <span class="sub">${sub}</span>` : ''}</h2>${aside || ''}</div>${body}</section>`;
const empty = t => `<div class="empty">${t}</div>`;
/* nama berkas yang bisa diklik (dibuka dari Storage di versi online); o = pemilik berkas */
const fileChip = (name, o, drive) => name ? `<span class="file${drive ? ' drive' : ''}" data-f="${esc(name)}"${o ? ` data-o="${o}"` : ''}${drive ? ` data-drive="${esc(drive)}" title="Tersimpan di Google Drive HC"` : ''}>${ic('file')}${esc(name)}</span>` : '';
/* referensi berkas yang disimpan di data; versi online menambahkan tautan Google Drive */
let fileRef = f => ({ file: f.name });
const fileList = (x, o) => x && x.files && x.files.length ? x.files.map(f => fileChip(f.file, o, f.drive)).join(' ') : fileChip(x && x.file, o);
const row = ({ href, tag, title, sub, right }) => `<div class="row" data-href="${href}" role="link" tabindex="0">${tag ? `<span class="tag">${tag}</span>` : ''}<span class="rm"><span class="rt">${title}</span><span class="rs">${sub}</span></span><span class="rr">${right || ''}</span></div>`;
const kv = (k, v, cls) => `<div class="kv ${cls || ''}"><span>${k}</span><span class="num">${v}</span></div>`;
const opts = (arr, sel) => arr.map(o => { const [v, l] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(v)}" ${v === sel ? 'selected' : ''}>${esc(l)}</option>`; }).join('');
const timeOpts = (sel, from = 7 * 60, to = 21 * 60) => { let h = ''; for (let m = from; m <= to; m += 15) { const t = fromMin(m); h += `<option value="${t}" ${t === sel ? 'selected' : ''}>${jam(t)}</option>`; } return h; };
const userCell = id => { const u = user(id); return `${esc(u.nama)}<span class="s">${esc(u.jabatan || '')}${u.dept ? ' · ' + esc(u.dept) : ''}</span>`; };

function pending() {
  const m = me().id;
  const p = { atasan: S.trips.filter(t => t.status === 'menunggu_atasan' && canApproveAtasan(t, m)) };
  if (isHCGA()) {
    p.dinas = S.trips.filter(t => t.status === 'menunggu_hcga');
    p.pesan = S.trips.filter(t => t.status === 'pemesanan');
    p.settle = S.trips.filter(t => t.status === 'settlement');
    p.mobil = S.cars.filter(c => c.status === 'menunggu_hcga');
    p.ruang = S.roomb.filter(b => b.status === 'menunggu_hcga');
    p.aset = S.aset.filter(a => a.status === 'menunggu_hcga');
    p.asetProses = S.aset.filter(a => ['proses_beli', 'dipesan', 'diterima'].includes(a.status));
  }
  return p;
}
function pendingCount() {
  const p = pending();
  const L = lndPending(), T = taPending();
  if (isHCGA()) return regPending().length + p.dinas.length + p.pesan.length + p.settle.length + p.mobil.length + p.ruang.length + p.aset.length + L.hc.length + L.piagam.length + T.hc.length;
  return p.atasan.length + L.atasan.length + T.dir.length;
}

/* ===== trip rows / table ===== */
function tripRow(t, who) {
  const u = user(t.userId);
  return row({ href: `#/dinas/${t.id}`, tag: 'Dinas', title: `${esc(t.tujuan)} · ${esc(t.kegiatan)}`, sub: `${who ? esc(u.nama) + ' · ' : ''}${range(t.berangkat, t.pulang)} · ${t.no}`, right: pill(tstat(t)) });
}
function tripTable(list, who) {
  if (!list.length) return empty('Belum ada data.');
  return `<div class="tw"><table class="t"><thead><tr><th>No.</th>${who ? '<th>Karyawan</th>' : ''}<th>Tujuan & kegiatan</th><th class="hide-sm">Tanggal</th><th class="r hide-sm">CA</th><th>Status</th></tr></thead><tbody>${list.map(t =>
    `<tr class="click" data-href="#/dinas/${t.id}"><td class="num">${t.no}</td>${who ? `<td>${userCell(t.userId)}</td>` : ''}<td>${esc(t.tujuan)}<span class="s">${esc(t.kegiatan)} · Kat. ${t.kategori}</span></td><td class="hide-sm num">${range(t.berangkat, t.pulang)}</td><td class="r num hide-sm">${rp(t.ca)}</td><td>${pill(tstat(t))}</td></tr>`).join('')}</tbody></table></div>`;
}

/* ===== BERANDA ===== */
function salam() { const h = new Date().getHours(); return h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam'; }

function myActivities(uid) {
  const out = [];
  S.trips.filter(t => t.userId === uid && !['selesai', 'ditolak', 'dibatalkan'].includes(t.status)).sort((a, b) => a.berangkat.localeCompare(b.berangkat)).forEach(t => out.push(tripRow(t)));
  S.cars.filter(c => c.userId === uid && c.tanggal >= TODAY && !['selesai', 'ditolak', 'dibatalkan'].includes(c.status)).sort((a, b) => (a.tanggal + a.mulai).localeCompare(b.tanggal + b.mulai)).forEach(c => out.push(carRow(c)));
  S.aset.filter(a => a.userId === uid && !['selesai', 'ditolak', 'dibatalkan'].includes(a.status)).forEach(a => out.push(asetRow(a)));
  S.roomb.filter(b => b.userId === uid && b.tanggal >= TODAY && !['hangus', 'selesai', 'ditolak', 'dibatalkan'].includes(roomState(b))).sort((a, b) => (a.tanggal + a.mulai).localeCompare(b.tanggal + b.mulai)).forEach(b => out.push(roomRow(b)));
  return out;
}
function carRow(c, who) {
  const a = c.assign;
  let sub = `${relDay(c.tanggal)} · ${jam(c.mulai)}–${jam(c.selesai)}`;
  if (a?.type === 'kantor') sub += ` · ${veh(a.vehicleId).nama.split(' ').slice(-1)[0]} ${veh(a.vehicleId).plat} · ${a.driverId ? user(a.driverId).nama.split(' ')[0] : 'nyetir sendiri'}`;
  if (a?.type === 'eksternal') sub += ` · ${esc(a.vendor)}`;
  if (a?.type === 'umum') sub += ' · Transportasi umum';
  return row({ href: `#/mobil/${c.id}`, tag: 'Mobil', title: `${who ? esc(user(c.userId).nama) + ' → ' : ''}${esc(c.tujuan)}`, sub, right: pill(c.status) });
}
function roomRow(b, who) {
  const st = roomState(b);
  const btn = st === 'checkin' && b.userId === me().id ? `<button class="btn sm primary" data-act="room-checkin" data-id="${b.id}">Check-in</button>` : '';
  return row({ href: `#/ruang/${b.id}`, tag: 'Ruang', title: esc(b.judul), sub: `${who ? esc(user(b.userId).nama) + ' · ' : ''}${room(b.roomId).nama} · ${relDay(b.tanggal)} · ${jam(b.mulai)}–${jam(b.selesai)}`, right: btn + pill(st) });
}

function roomNow() {
  const n = nowMin();
  return S.rooms.map(r => {
    const list = S.roomb.filter(b => b.roomId === r.id && b.tanggal === TODAY && b.status === 'disetujui' && !['hangus', 'selesai'].includes(roomState(b))).sort((a, b) => a.mulai.localeCompare(b.mulai));
    const cur = list.find(b => toMin(b.mulai) <= n && n < toMin(b.selesai));
    const next = list.find(b => toMin(b.mulai) > n);
    let cls = '', t, s;
    if (cur && cur.checkinAt) { cls = 'busy'; t = `Dipakai sampai ${jam(cur.selesai)}`; s = `${esc(cur.judul)} · ${esc(user(cur.userId).nama)}`; }
    else if (cur) { cls = 'hold'; t = `Dipesan, menunggu check-in`; s = `${esc(cur.judul)} · ${esc(user(cur.userId).nama)}`; }
    else { t = 'Kosong'; s = next ? `Berikutnya ${jam(next.mulai)} · ${esc(next.judul)}` : 'Tidak ada jadwal lagi hari ini'; }
    return `<div class="rnow"><span class="ind ${cls}"></span><div class="rm"><b>${r.nama}</b> <span class="muted">· ${t}</span><div class="muted" style="font-size:12.5px">${s}</div></div><a class="btn sm" href="#/layar/${r.id}" title="Tampilan layar di depan ruangan">${ic('screen')}<span class="hide-sm">Layar</span></a></div>`;
  }).join('');
}

function vBeranda() {
  if (isHCGA() || isDir()) return vHome();
  const u = me();
  let h = `<div class="page-head"><div><h1>${salam()}, ${esc(u.nama.split(' ')[0])}</h1><p class="muted">${HARIL[new Date().getDay()]}, ${fdl(TODAY)}</p></div></div>
  <div class="quick"><a class="btn" href="#/dinas/baru">${ic('plus')} Perjalanan dinas</a><a class="btn" href="#/mobil/baru">${ic('plus')} Pesan mobil</a><a class="btn" href="#/ruang/baru">${ic('plus')} Pesan ruang meeting</a></div>`;
  {
    const yr = TODAY.slice(0, 4), my = S.trips.filter(t => t.userId === u.id || t.caPic === u.id);
    const tYr = my.filter(t => t.berangkat.slice(0, 4) === yr && !['ditolak', 'dibatalkan'].includes(t.status));
    const caO = my.filter(t => t.caPaidAt && ['siap', 'settlement'].includes(t.status));
    const rb = S.roomb.filter(b => b.userId === u.id && b.tanggal.slice(0, 7) === TODAY.slice(0, 7) && ['disetujui', 'menunggu_hcga'].includes(b.status));
    const team = S.persona === 'atasan' ? S.trips.filter(t => user(t.userId).atasan === u.id && t.berangkat.slice(0, 4) === yr && !['ditolak', 'dibatalkan'].includes(t.status)) : null;
    h += `<div class="tiles">${tile('Perjalanan dinas ' + yr, tYr.length, `${tYr.reduce((a, t) => a + allowance(t).days, 0)} hari dinas`)}${tile('CA belum di-settle', caO.length ? rpc(caO.reduce((a, t) => a + t.ca, 0)) : 'Rp 0', caO.length ? `${caO.length} perjalanan` : 'Semua beres', caO.length ? 'down' : '')}${tile('Booking ruang bulan ini', rb.length, `${rb.filter(b => roomState(b) === 'hangus').length} hangus`)}${team ? tile('Dinas tim ' + yr, team.length, rpc(team.reduce((a, t) => a + (t.caPaidAt ? t.ca : 0), 0)) + ' CA') : tile('Booking mobil bulan ini', S.cars.filter(c => c.userId === u.id && c.tanggal.slice(0, 7) === TODAY.slice(0, 7)).length, '')}</div>`;
  }
  if (S.persona === 'atasan') {
    const p = pending().atasan;
    h += card('Menunggu persetujuan Anda', p.length ? `<div class="list">${p.map(t => tripRow(t, true)).join('')}</div>` : empty('Tidak ada pengajuan yang menunggu.'), p.length ? '<a class="link" href="#/persetujuan">Buka persetujuan</a>' : '', p.length ? `${p.length} pengajuan` : '');
  }
  const mine = myActivities(u.id);
  h += `<div class="cols"><div>${card('Pengajuan & jadwal saya', mine.length ? `<div class="list">${mine.join('')}</div>` : empty('Belum ada pengajuan aktif.'))}</div><div>${card('Ruang meeting saat ini', roomNow(), '<a class="link" href="#/ruang">Lihat jadwal</a>')}</div></div>`;
  return h;
}

function vBerandaHCGA(mode) {
  const u = me(), p = pending();
  const todo = [
    ['Perjalanan dinas menunggu persetujuan HCGA', p.dinas.length, '#/persetujuan?tab=dinas'],
    ['Tiket, hotel & CA perlu diproses', p.pesan.length, '#/persetujuan?tab=pesan'],
    ['Settlement perlu diverifikasi', p.settle.length, '#/persetujuan?tab=settle'],
    ['Booking mobil perlu dijadwalkan', p.mobil.length, '#/persetujuan?tab=mobil'],
    ['Booking ruang meeting perlu disetujui', p.ruang.length, '#/persetujuan?tab=ruang'],
    ['Pengajuan aset menunggu persetujuan', p.aset.length, '#/persetujuan?tab=aset'],
    ['Aset sedang dibeli / perlu diserahkan', p.asetProses.length, '#/aset'],
    ['Pengajuan training menunggu HC', lndPending().hc.length, '#/persetujuan?tab=training'],
    ['Pengajuan piagam', lndPending().piagam.length, '#/persetujuan?tab=piagam'],
    ['Tugas onboarding menunggu acc', myLndTasks().onbVerif.length, '#/lnd-tugas'],
    ['FPK menunggu persetujuan HCGA', taPending().hc.length, '#/persetujuan?tab=fpk'],
    ['Probation & kontrak berakhir ≤ 30 hari', S.users.filter(u => { const e = contractEnd(u); return e && daysBetween(TODAY, e) <= 30 && daysBetween(TODAY, e) >= -7 && !(S.reviews.find(r => r.userId === u.id && r.status === 'berjalan' && r.keputusan)); }).length, '#/ta-kontrak']
  ];
  const todoHtml = `<div class="list">${todo.map(([l, n, href]) => `<div class="row nw" data-href="${href}" role="link" tabindex="0"><span class="rm"><span class="rt" style="font-weight:500;white-space:normal">${l}</span></span><span class="rr"><b class="num" style="font-size:16px;${n ? '' : 'color:var(--faint)'}">${n}</b>${ic('right')}</span></div>`).join('')}</div>`;
  const carsToday = S.cars.filter(c => c.tanggal === TODAY && !['ditolak', 'dibatalkan'].includes(c.status)).sort((a, b) => a.mulai.localeCompare(b.mulai));
  const roomsToday = S.roomb.filter(b => b.tanggal === TODAY && ['disetujui', 'menunggu_hcga'].includes(b.status)).sort((a, b) => a.mulai.localeCompare(b.mulai));
  const reminders = [];
  S.vehicles.forEach(v => [['servis', 'Servis berkala'], ['pajak', 'Pajak STNK'], ['kir', 'Uji KIR']].forEach(([k, l]) => {
    const s = dueState(v[k]); if (s) reminders.push({ v, l, d: v[k], s });
  }));
  reminders.sort((a, b) => a.d.localeCompare(b.d));
  const caOpen = S.trips.filter(t => t.caPaidAt && (tstat(t) === 'perlu_settle' || t.status === 'settlement'));
  const konsumsi = roomsToday.filter(b => b.konsumsi.jenis !== 'none' && b.status === 'disetujui');

  // ---- figures
  const m0 = monthKey(0), m1 = monthKey(1);
  const ca0 = caMonth(m0), ca1 = caMonth(m1);
  const delta = ca1 ? Math.round((ca0 - ca1) / ca1 * 100) : 0;
  const aktif = S.trips.filter(t => !['selesai', 'ditolak', 'dibatalkan'].includes(t.status));
  const caOpenSum = caOpen.reduce((a, t) => a + t.ca, 0);
  const H = roomHeat(4), occ = H.norm.flat().reduce((a, v) => a + v, 0) / H.norm.flat().length;
  const tiles = `<div class="tiles">
    ${tile('CA dinas dicairkan · ' + BULAN[+m0.slice(5) - 1], rpc(ca0), ca1 ? `${delta >= 0 ? '▲' : '▼'} ${Math.abs(delta)}% vs ${BULAN[+m1.slice(5) - 1]}` : '', delta > 0 ? 'up' : 'down')}
    ${tile('Perjalanan dinas berjalan', aktif.length, `${p.dinas.length + p.pesan.length + p.settle.length} perlu tindakan HCGA`)}
    ${tile('CA belum di-settle', rpc(caOpenSum), `${caOpen.length} perjalanan`)}
    ${tile('Okupansi ruang meeting', Math.round(occ * 100) + '%', 'rata-rata jam kerja, 4 minggu')}
  </div>`;
  const months = [5, 4, 3, 2, 1, 0].map(monthKey);
  const trend = colChart(months.map(m => ({ label: BLN[+m.slice(5) - 1], value: caMonth(m), tip: `${BULAN[+m.slice(5) - 1]} ${m.slice(0, 4)}: ${rp(caMonth(m))}` })), rpc, v => v ? rpc(v).replace('Rp ', '') : '0');
  const depts = [...new Set(S.users.map(u => u.dept))].map(dp => { const ts = S.trips.filter(t => t.caPaidAt && t.berangkat.slice(0, 7) === m0 && user(t.userId).dept === dp); return { label: dp, value: ts.reduce((a, t) => a + t.ca, 0), sub: `${ts.length} perjalanan`, tip: `${dp}: ${rp(ts.reduce((a, t) => a + t.ca, 0))} · ${ts.length} perjalanan` }; }).filter(x => x.value).sort((a, b) => b.value - a.value);
  const stages = [
    ['Menunggu atasan', ['menunggu_atasan']], ['Menunggu HCGA', ['menunggu_hcga']], ['Tiket & CA', ['pemesanan']], ['Siap / sedang dinas', ['siap', 'dinas']], ['Settlement', ['perlu_settle', 'settlement']]
  ].map(([l, st], i) => ({ label: l, value: aktif.filter(t => st.includes(tstat(t))).length, color: ORD[i], href: '#/dinas' }));
  const kmRows = S.vehicles.map(v => { const cs = S.cars.filter(c => c.status === 'selesai' && c.assign?.vehicleId === v.id && c.tanggal.slice(0, 7) === m0 && c.trip); const km = cs.reduce((a, c) => a + c.trip.odoEnd - c.trip.odoStart, 0); return { label: v.nama.replace(/^(Toyota|Daihatsu) /, ''), sub: v.plat, value: km, tip: `${v.nama} · ${km} km · ${cs.length} trip · BBM ${rp(cs.reduce((a, c) => a + c.trip.bbm, 0))}` }; });

  if (mode === 'ga') return `<div class="page-head"><div><div class="eyebrow">General Affairs & Admin</div><h1>Dashboard GA</h1><p class="muted">Perjalanan dinas, armada, ruang meeting, dan pembelian aset.</p></div><a class="btn" href="#/laporan">${ic('chart')} Laporan lengkap</a></div>
  ${tiles}
  <div class="cols">
    <div>${card('CA perjalanan dinas dicairkan', `<div class="card-b">${trend}</div>`, '', '6 bulan terakhir')}
      ${card('Status perjalanan dinas berjalan', `<div class="card-b">${segBar(stages)}</div>`, '', `${aktif.length} pengajuan`)}
      ${card('CA dinas per departemen', `<div class="card-b">${hbar(depts, rpc)}</div>`, '', BULAN[+m0.slice(5) - 1])}</div>
    <div>${card('Kepadatan ruang meeting', `<div class="card-b">${heatCard(4)}</div>`, '<a class="link" href="#/ruang">Status sekarang</a>', '4 minggu terakhir')}
      ${card('Pembelian aset per kategori', `<div class="card-b">${hbar(asetByKat(m0), rpc)}</div>`, '<a class="link" href="#/aset">Semua</a>', BULAN[+m0.slice(5) - 1])}
      ${card('Jarak tempuh mobil kantor', `<div class="card-b">${hbar(kmRows, v => v.toLocaleString('id-ID') + ' km')}</div>`, '<a class="link" href="#/armada">Armada</a>', BULAN[+m0.slice(5) - 1])}</div>
  </div>`;

  const gaAct = p.dinas.length + p.pesan.length + p.settle.length + p.mobil.length + p.ruang.length + p.aset.length;
  const modCard = (href, grp, rows, draft) => `<a class="modcard" href="${href}"><div class="mh2"><span>${grp}</span>${draft ? '<span class="pill gray">Rancangan</span>' : ''}</div>${rows.map(([l, v]) => `<div class="kv"><span>${l}</span><b class="num">${v}</b></div>`).join('')}<span class="link">Buka dashboard →</span></a>`;
  return `<div class="page-head"><div><h1>${salam()}, ${esc(u.nama.split(' ')[0])}</h1><p class="muted">${HARIL[new Date().getDay()]}, ${fdl(TODAY)}</p></div></div>
  <div class="modcards">
    ${modCard('#/dash-ga', 'General Affairs & Admin', [['Perlu tindakan', gaAct], ['CA dicairkan ' + BLN[+m0.slice(5) - 1], rpc(ca0)], ['Okupansi ruang', Math.round(occ * 100) + '%']])}
    ${modCard('#/dash-ta', 'Talent Acquisition', [['Posisi terbuka', S.fpk.filter(f => f.status === 'mencari').reduce((a, f) => a + f.jumlah, 0)], ['Kandidat dalam proses', S.cands.filter(c => ['screening', 'hr', 'tes', 'user', 'offering'].includes(c.stage)).length], ['Kontrak berakhir ≤ 30 hari', S.users.filter(u => { const e = contractEnd(u); return e && daysBetween(TODAY, e) <= 30 && daysBetween(TODAY, e) >= 0; }).length]])}
    ${(() => { lndSyncAll(); const run = S.trainings.filter(t => ['disetujui', 'terlaksana'].includes(t.status)).length, al = Object.values(S.lndBudget).reduce((a, b) => a + b, 0), us = Object.keys(S.lndBudget).reduce((a, dp) => a + budgetUsed(dp), 0); return modCard('#/dash-lnd', 'Learning & Development', [['Training berjalan', run], ['Onboarding berjalan', S.onb.filter(o => o.status === 'berjalan').length], ['Budget terpakai', Math.round(us / al * 100) + '%']]); })()}
  </div>
  <div class="cols">
    <div>${card('Perlu tindakan', todoHtml)}
      ${card('Pengingat armada', reminders.length ? `<div class="list">${reminders.map(r => row({ href: '#/armada', title: `${r.l} · ${esc(r.v.nama)}`, sub: `${r.v.plat} · jatuh tempo ${fd(r.d)}`, right: `<span class="pill ${r.s}">${daysBetween(TODAY, r.d) < 0 ? 'Terlewat' : daysBetween(TODAY, r.d) + ' hari lagi'}</span>` })).join('')}</div>` : empty('Semua dokumen & servis aman.'))}
      ${card('CA belum diselesaikan', caOpen.length ? `<div class="list">${caOpen.map(t => row({ href: `#/dinas/${t.id}`, title: `${esc(user(t.userId).nama)} · ${esc(t.tujuan)}`, sub: `${t.no} · pulang ${fds(t.pulang)} · ${Math.max(0, daysBetween(t.pulang, TODAY))} hari lalu`, right: `<span class="num">${rp(t.ca)}</span>` })).join('')}</div>` : empty('Tidak ada CA yang menggantung.'))}</div>
    <div>${card('Mobil hari ini', carsToday.length ? `<div class="list">${carsToday.map(c => carRow(c, true)).join('')}</div>` : empty('Tidak ada perjalanan mobil hari ini.'), '<a class="link" href="#/mobil">Semua</a>')}
      ${card('Ruang meeting hari ini', roomsToday.length ? `<div class="list">${roomsToday.map(b => roomRow(b, true)).join('')}</div>` : empty('Belum ada booking hari ini.'), '<a class="link" href="#/ruang">Status</a>')}
      ${konsumsi.length ? card('Konsumsi disiapkan hari ini', `<div class="list">${konsumsi.map(b => row({ href: `#/ruang/${b.id}`, title: `${KONSUMSI[b.konsumsi.jenis]} · ${b.konsumsi.porsi} porsi`, sub: `${room(b.roomId).nama} · ${jam(b.mulai)} · ${esc(b.judul)}${b.konsumsi.catatan ? ' · ' + esc(b.konsumsi.catatan) : ''}` })).join('')}</div>`) : ''}</div>
  </div>`;
}

/* ===== DINAS ===== */
function vDinasList(q) {
  const all = (isHCGA() ? S.trips : S.trips.filter(t => t.userId === me().id)).slice().sort((a, b) => b.berangkat.localeCompare(a.berangkat));
  const f = q.f || 'aktif';
  const groups = { aktif: all.filter(t => !['selesai', 'ditolak', 'dibatalkan'].includes(t.status)), selesai: all.filter(t => ['selesai', 'ditolak', 'dibatalkan'].includes(t.status)), semua: all };
  return `<div class="page-head"><div><h1>Perjalanan dinas</h1><p class="muted">${isHCGA() ? 'Semua pengajuan perjalanan dinas karyawan.' : 'Pengajuan dinas, tiket, uang muka (CA), dan settlement Anda.'}</p></div><a class="btn primary" href="#/dinas/baru">${ic('plus')} Ajukan perjalanan dinas</a></div>
  <div class="tabs">${[['aktif', 'Berjalan'], ['selesai', 'Selesai & ditolak'], ['semua', 'Semua']].map(([k, l]) => `<a href="#/dinas?f=${k}" class="${f === k ? 'on' : ''}">${l} <span class="c">${groups[k].length}</span></a>`).join('')}</div>
  ${fbar('dinas', { dept: isHCGA() })}
  <section class="card">${tripTable(groups[f], isHCGA())}</section>`;
}

function vDinasForm() {
  const u = me(), at = user(u.atasan);
  const atasanLbl = u.atasan ? `${at.nama}` : 'HCGA';
  return `<a class="back" href="#/dinas">${ic('left')} Perjalanan dinas</a>
  <div class="page-head"><div><h1>Ajukan perjalanan dinas</h1><p class="muted">Alur persetujuan: ${esc(atasanLbl)}${u.atasan ? ' (atasan) → HCGA' : ''}. Tiket & hotel dipesan oleh GA.</p></div></div>
  <form class="cols-main" data-form="dinas" data-live="dinas" novalidate>
    <div class="card"><div class="card-b form">
      <fieldset class="fs"><div class="fs-t">Jenis perjalanan</div>
        <div class="choice">
          <label><input type="radio" name="kategori" value="A" checked><span><b>Kategori A · Dinas luar kota</b><span>Shooting di luar kota, event, seminar, awarding</span></span></label>
          <label><input type="radio" name="kategori" value="B"><span><b>Kategori B · Operational visit</b><span>Visit vendor, gudang, shooting di Bandung, meeting client</span></span></label>
        </div>
      </fieldset>
      <fieldset class="fs"><div class="fs-t">Tujuan & waktu</div>
        <div class="fgrid">
          <div class="f"><label for="kegiatan">Jenis kegiatan</label><select id="kegiatan" name="kegiatan">${opts(KEG.A)}</select></div>
          <div class="f" data-show="kegLain"><label for="kegLain">Sebutkan kegiatan</label><input type="text" id="kegLain" name="kegLain" placeholder="mis. Pameran dagang, training vendor"></div>
          <div class="f" data-show="A"><label for="wilayah">Wilayah</label><select id="wilayah" name="wilayah">${opts(Object.entries(WIL), 'prov')}</select></div>
          <div class="f" data-show="B"><label for="rateB">Kendaraan</label><select id="rateB" name="rateB">${opts(S.rateB.map(b => [b.id, `${b.kendaraan}${b.kategori.includes('cafe') ? ' · di cafe/resto' : ''}`]))}</select></div>
          <div class="f"><label for="tujuan">Kota tujuan</label><input type="text" id="tujuan" name="tujuan" placeholder="mis. Bandung" required></div>
          <div class="f" data-show="intl"><label for="negara">Negara</label><input type="text" id="negara" name="negara" placeholder="mis. Singapura"></div>
          <div class="f"><label for="berangkat">Tanggal berangkat</label><input type="date" id="berangkat" name="berangkat" value="${addDays(TODAY, 7)}" min="${TODAY}"></div>
          <div class="f"><label for="pulang">Tanggal kembali</label><input type="date" id="pulang" name="pulang" value="${addDays(TODAY, 8)}" min="${TODAY}"></div>
          <div class="f full"><label for="keperluan">Maksud perjalanan</label><textarea id="keperluan" name="keperluan" placeholder="Ceritakan singkat tujuan dan agenda perjalanan" required></textarea></div>
        </div>
      </fieldset>
      <fieldset class="fs"><div class="fs-t">Lokasi acara</div>
        <div class="f"><label for="alamat">Nama tempat / alamat acara</label>
          <div class="inrow"><input type="text" id="alamat" name="alamat" placeholder="mis. Trans Studio Mall Bandung"><button type="button" class="btn" data-act="geo-search">Cari di peta</button></div>
          <div id="geoRes" class="geores"></div>
        </div>
        <div class="mapbox"><div id="map" class="map" data-edit="1"></div><div class="maphint" id="coord">Klik peta untuk menaruh titik lokasi acara.</div></div>
        <div class="f"><label for="gmaps">Atau tempel link Google Maps</label><input type="text" id="gmaps" name="gmaps" placeholder="https://maps.google.com/..."><span class="hint">Titik ini dipakai GA untuk mencari hotel terdekat dari lokasi acara.</span></div>
        <input type="hidden" name="lat"><input type="hidden" name="lng">
      </fieldset>
      <fieldset class="fs" data-show="A"><div class="fs-t">Transportasi & akomodasi</div>
        <div class="fgrid">
          <div class="f"><label for="moda">Moda transportasi</label><select id="moda" name="moda">${opts(MODA, 'Kereta')}</select></div>
          <div class="f" data-show="zona"><label for="zona">Zona perjalanan</label><select id="zona" name="zona">${opts(Object.entries(ZONA), 'z1')}</select><span class="hint" id="kelasHint"></span></div>
          <div class="f" data-show="modaLain"><label for="modaLain">Sebutkan transportasi</label><input type="text" id="modaLain" name="modaLain" placeholder="mis. Shuttle bandara, sewa mobil lokal"></div>
          <div class="f full"><label class="check"><input type="checkbox" name="hotel" checked> Perlu hotel</label></div>
          <div class="f" data-show="hotel"><label for="checkin">Check-in</label><input type="date" id="checkin" name="checkin"></div>
          <div class="f" data-show="hotel"><label for="malam">Jumlah malam</label><input type="number" id="malam" name="malam" min="1" max="30"><span class="hint" id="checkoutHint"></span></div>
          <div class="f full" data-show="hotel"><label for="hotelNote">Preferensi hotel</label><input type="text" id="hotelNote" name="hotelNote" placeholder="mis. bisa jalan kaki ke venue, ada parkir mobil"></div>
        </div>
      </fieldset>
      <fieldset class="fs"><div class="fs-t">Uang muka (cash advance)</div>
        <div class="fgrid"><div class="f"><label for="caPic">Penerima CA (PIC)</label><select id="caPic" name="caPic">${opts(S.users.filter(x => x.posisi !== 'Driver').map(x => [x.id, x.id === u.id ? `${x.nama} (saya)` : x.nama]), u.id)}</select><span class="hint">Dana ditransfer ke PIC ini, yang nanti juga membuat settlement.</span></div></div>
        <div class="tw cat"><table class="t"><thead><tr><th style="width:34%">Kebutuhan</th><th>Keterangan</th><th class="r" style="width:150px">Nominal</th><th style="width:40px"></th></tr></thead><tbody id="caRows">${caRowHtml({ jenis: CA_JENIS[0], ket: '', nominal: 0 }, true)}</tbody>
          <tfoot><tr><td colspan="2">Total CA diajukan</td><td class="r num" id="caTotal">Rp 0</td><td></td></tr></tfoot></table></div>
        <div><button type="button" class="btn sm" data-act="ca-add">${ic('plus')} Tambah kebutuhan</button></div>
      </fieldset>
      <div id="formErr"></div>
      <div class="form-foot"><a class="btn" href="#/dinas">Batal</a><button class="btn primary">Ajukan ke ${esc(u.atasan ? at.nama.split(' ')[0] : 'HCGA')}</button></div>
    </div></div>
    <aside class="card sum"><div class="card-h"><h2>Estimasi</h2></div><div class="card-b" id="sum"></div></aside>
  </form>`;
}
function caRowHtml(x, auto) {
  return `<tr ${auto ? 'data-auto="1"' : ''}><td><select name="caJenis" style="height:32px">${opts(CA_JENIS, x.jenis)}</select></td><td><input class="l" name="caKet" value="${esc(x.ket)}" placeholder="${auto ? 'Otomatis dari tarif' : 'mis. selisih harga tiket travel'}"></td><td><input name="caNom" type="number" min="0" step="1000" value="${x.nominal || ''}"></td><td>${auto ? '' : `<button type="button" class="ibtn" data-act="ca-del" title="Hapus">${ic('x')}</button>`}</td></tr>`;
}

function parseGmaps(s) {
  const m = s.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || s.match(/[?&](?:q|query|ll)=(-?\d+\.\d+),\s*(-?\d+\.\d+)/) || s.match(/^\s*(-?\d+\.\d+),\s*(-?\d+\.\d+)\s*$/);
  return m ? { lat: +m[1], lng: +m[2] } : null;
}

function tripFromForm(f) {
  const g = n => f.elements[n] ? f.elements[n].value : '';
  const kat = (f.querySelector('[name=kategori]:checked') || {}).value || 'A';
  const caItems = [...f.querySelectorAll('#caRows tr')].map(tr => ({ jenis: tr.querySelector('[name=caJenis]').value, ket: tr.querySelector('[name=caKet]').value.trim(), nominal: +tr.querySelector('[name=caNom]').value || 0 })).filter(x => x.nominal || x.ket);
  const lat = parseFloat(g('lat')), lng = parseFloat(g('lng'));
  return {
    userId: me().id, kategori: kat, kegiatan: g('kegiatan') === 'Lainnya' ? g('kegLain').trim() : g('kegiatan'), kegPilih: g('kegiatan'),
    tujuan: g('tujuan').trim(), negara: g('negara').trim(), wilayah: g('wilayah'), rateB: g('rateB'), berangkat: g('berangkat'), pulang: g('pulang'), keperluan: g('keperluan').trim(),
    moda: g('moda') === 'Lainnya' ? (g('modaLain').trim() || 'Lainnya') : g('moda'), modaPilih: g('moda'), zona: g('zona'),
    hotel: !!(f.elements.hotel && f.elements.hotel.checked), hotelInfo: { checkin: g('checkin'), malam: +g('malam') || 0, note: g('hotelNote').trim() },
    lokasi: { alamat: g('alamat').trim(), lat: isNaN(lat) ? null : lat, lng: isNaN(lng) ? null : lng },
    caPic: g('caPic'), caItems, ca: caItems.reduce((a, x) => a + x.nominal, 0)
  };
}

function liveDinas(f, e) {
  let t = tripFromForm(f);
  const nm = e && e.target.name;
  if (nm === 'kategori') { f.elements.kegiatan.innerHTML = opts(KEG[t.kategori]); t = tripFromForm(f); }
  if (nm === 'berangkat' && t.pulang < t.berangkat) { f.elements.pulang.value = t.berangkat; t = tripFromForm(f); }
  if (nm === 'gmaps') { const p = parseGmaps(e.target.value); if (p) setPin(p.lat, p.lng, true); }
  const valid = t.berangkat && t.pulang && t.pulang >= t.berangkat;
  const a = valid ? allowance(t) : { days: 0, per: 0, total: 0, label: '' };
  // hotel defaults follow dates until touched
  if (!f.elements.checkin.dataset.touched) f.elements.checkin.value = t.berangkat;
  if (!f.elements.malam.dataset.touched) f.elements.malam.value = Math.max(1, a.days - 1);
  t = tripFromForm(f);
  const isA = t.kategori === 'A';
  f.querySelectorAll('[data-show]').forEach(el => {
    const k = el.dataset.show;
    el.hidden = k === 'A' ? !isA : k === 'B' ? isA : k === 'intl' ? !(isA && t.wilayah === 'intl') : k === 'zona' ? !['Pesawat', 'Kereta'].includes(t.modaPilih) : k === 'kegLain' ? t.kegPilih !== 'Lainnya' : k === 'modaLain' ? t.modaPilih !== 'Lainnya' : k === 'hotel' ? !t.hotel : false;
  });
  // auto allowance row
  const auto = f.querySelector('#caRows tr[data-auto]');
  if (auto) {
    const n = auto.querySelector('[name=caNom]');
    if (!n.dataset.touched) n.value = a.total;
    const k = auto.querySelector('[name=caKet]');
    if (!k.dataset.touched) k.value = a.days ? `${a.days} hari × ${rp(a.per)}` : '';
  }
  t = tripFromForm(f);
  if (!isA) { t.hotel = false; }
  const kl = isA ? kelas(t) : null;
  $('#kelasHint').textContent = kl ? `Kelas sesuai kebijakan: ${t.modaPilih} ${kl}` : '';
  const co = t.hotelInfo.checkin && t.hotelInfo.malam ? addDays(t.hotelInfo.checkin, t.hotelInfo.malam) : '';
  $('#checkoutHint').textContent = co ? `Check-out ${fd(co)}` : '';
  $('#caTotal').textContent = rp(t.ca);
  let s = '';
  if (!valid) s = '<div class="alert">Tanggal kembali tidak boleh sebelum tanggal berangkat.</div>';
  else {
    s += `<div class="muted" style="font-size:12.5px;margin-bottom:8px">${esc(a.label)}</div>`;
    if (!isA && a.b) s += kv('Transport / hari', rp(a.b.transport)) + kv('Lunch / hari', rp(a.b.lunch));
    else s += kv('Daily allowance / hari', rp(a.per));
    s += kv('Jumlah hari', `${a.days} hari`) + kv('Total daily allowance', rp(a.total), 'total');
    s += `<div style="height:14px"></div>`;
    if (isA) {
      s += kv('Transportasi', t.modaPilih === 'Tidak perlu tiket' ? 'Tidak perlu' : esc(t.moda) + (kl ? ' · ' + kl : ''));
      s += kv('Hotel', t.hotel ? `${t.hotelInfo.malam} malam` : 'Tidak perlu');
      s += kv('Lokasi acara', t.lokasi.lat != null ? 'Titik sudah dipilih' : '<span style="color:var(--amber)">Belum ada titik</span>');
      s += `<p class="muted" style="font-size:12px;margin:6px 0 0">Tiket & hotel dibayar langsung perusahaan melalui GA, tidak masuk CA.</p>`;
    }
    s += `<div style="height:8px"></div>`;
    caItemsOf(t).filter(x => x.nominal).forEach(x => { s += kv(esc(x.jenis.replace(' (daily allowance)', '')), rp(x.nominal)); });
    s += kv(`CA ke ${esc(user(t.caPic).nama.split(' ')[0])}`, rp(t.ca), 'total');
  }
  $('#sum').innerHTML = s;
}

/* ===== maps (Leaflet + OpenStreetMap) ===== */
let MAP = null, PIN = null;
function initMaps() {
  MAP = null; PIN = null;
  const el = document.getElementById('map') || document.getElementById('mapView');
  if (!el) return;
  if (IS_ARTIFACT || typeof L === 'undefined') { el.innerHTML = `<div class="empty">${IS_ARTIFACT ? 'Peta interaktif tidak tersedia di link prototype (aktif di file index.html & aplikasi final).' + (el.dataset.lat ? `<br>Titik tersimpan: ${(+el.dataset.lat).toFixed(5)}, ${(+el.dataset.lng).toFixed(5)}` : '<br>Tempel link Google Maps di kolom bawah untuk menyimpan titik lokasi.') : 'Peta tidak bisa dimuat (perlu koneksi internet).'}</div>`; el.style.height = 'auto'; return; }
  const lat = parseFloat(el.dataset.lat), lng = parseFloat(el.dataset.lng), has = !isNaN(lat);
  MAP = L.map(el, { scrollWheelZoom: false, attributionControl: true }).setView(has ? [lat, lng] : [-6.2, 106.82], has ? 15 : 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(MAP);
  if (has) setPin(lat, lng, false);
  if (el.dataset.edit) MAP.on('click', ev => setPin(ev.latlng.lat, ev.latlng.lng, false));
}
function setPin(lat, lng, fly) {
  if (!MAP) { const f = document.querySelector('form[data-form=dinas]'); if (f) { f.elements.lat.value = lat.toFixed(6); f.elements.lng.value = lng.toFixed(6); $('#coord').innerHTML = `Titik dipilih: ${lat.toFixed(5)}, ${lng.toFixed(5)} · <a href="${gmapsUrl(lat, lng)}" target="_blank" rel="noopener">lihat di Google Maps</a>`; } return; }
  if (PIN) PIN.setLatLng([lat, lng]); else PIN = L.circleMarker([lat, lng], { radius: 9, color: '#fff', weight: 3, fillColor: '#B0307F', fillOpacity: 1 }).addTo(MAP);
  if (fly) MAP.setView([lat, lng], 16);
  const f = document.querySelector('form[data-form=dinas]');
  if (f) {
    f.elements.lat.value = lat.toFixed(6); f.elements.lng.value = lng.toFixed(6);
    $('#coord').innerHTML = `Titik dipilih: ${lat.toFixed(5)}, ${lng.toFixed(5)} · <a href="${gmapsUrl(lat, lng)}" target="_blank" rel="noopener">lihat di Google Maps</a>`;
    liveDinas(f);
  }
}
const gmapsUrl = (lat, lng) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
const hotelNearUrl = (lat, lng) => `https://www.google.com/maps/search/hotel/@${lat},${lng},15z`;
function lokasiCard(t) {
  const l = t.lokasi;
  if (!l || (!l.alamat && l.lat == null)) return '';
  return card('Lokasi acara', `${l.lat != null ? `<div id="mapView" class="map sm" data-lat="${l.lat}" data-lng="${l.lng}"></div>` : ''}<div class="card-b"><div style="font-weight:550">${esc(l.alamat || 'Titik di peta')}</div>${l.lat != null ? `<div class="btns" style="margin-top:10px"><a class="btn sm" href="${gmapsUrl(l.lat, l.lng)}" target="_blank" rel="noopener">Buka di Google Maps</a><a class="btn sm" href="${hotelNearUrl(l.lat, l.lng)}" target="_blank" rel="noopener">Cari hotel terdekat</a></div>` : ''}</div>`);
}

const STEPS = ['Diajukan', 'Atasan', 'HCGA', 'Tiket & CA', 'Berangkat', 'Settlement', 'Selesai'];
function stepper(t) {
  const st = tstat(t);
  const idx = { menunggu_atasan: 1, menunggu_hcga: 2, pemesanan: 3, siap: 4, dinas: 4, perlu_settle: 5, settlement: 5, selesai: 7 }[st];
  const bad = st === 'ditolak' ? (t.rejectedAt === 'hcga' ? 2 : 1) : -1;
  return `<ol class="steps">${STEPS.map((s, i) => {
    let c = '';
    if (bad >= 0) c = i < bad ? 'done' : i === bad ? 'bad' : '';
    else c = i < idx ? 'done' : i === idx ? 'cur' : '';
    return `<li class="${c}">${i === bad ? 'Ditolak ' + s.toLowerCase() : s}</li>`;
  }).join('')}</ol>`;
}
function timeline(log) {
  if (!log || !log.length) return empty('Belum ada riwayat.');
  return `<ul class="tl">${log.slice().reverse().map(l => `<li class="${/Menolak|Membatalkan|revisi/i.test(l.act) ? 'neg' : ''}"><b>${l.by ? esc(user(l.by).nama) : 'Kandidat'}</b> ${esc(l.act[0].toLowerCase()+l.act.slice(1))}<small>${fdt(l.t)}</small>${l.note ? `<q>${esc(l.note)}</q>` : ''}</li>`).join('')}</ul>`;
}

function tripAction(t) {
  const m = me(), st = tstat(t);
  if (t.status === 'menunggu_atasan' && canApproveAtasan(t, m.id) && t.userId !== m.id) {
    const deleg = user(t.userId).atasan !== m.id ? ` Anda menyetujui sebagai delegasi ${esc(user(user(t.userId).atasan).nama)}.` : '';
    return `<div class="act amber"><div><b>Menunggu persetujuan Anda</b><p>Setelah disetujui, pengajuan diteruskan ke HCGA.${deleg}</p></div><div class="btns"><button class="btn danger" data-act="trip-reject" data-id="${t.id}">Tolak</button><button class="btn primary" data-act="trip-approve" data-id="${t.id}">Setujui</button></div></div>`;
  }
  if (isHCGA() && t.status === 'menunggu_hcga') {
    return `<div class="act amber"><div><b>Menunggu persetujuan HCGA</b><p>Sudah disetujui atasan. Setelah disetujui, lanjut ke pemesanan tiket, hotel, dan pencairan CA.</p></div><div class="btns"><button class="btn danger" data-act="trip-reject" data-id="${t.id}">Tolak</button><button class="btn primary" data-act="trip-approve" data-id="${t.id}">Setujui</button></div></div>`;
  }
  if (isHCGA() && t.status === 'pemesanan') {
    const k = kelas(t), a = allowance(t);
    const needT = ['Pesawat', 'Kereta'].includes(t.moda);
    return `<form class="act block" data-form="booking" data-id="${t.id}"><b>Pemesanan tiket, hotel & pencairan CA</b><p>Isi detail pemesanan. Karyawan akan langsung melihat e-ticket & voucher di halaman ini.</p>
      <div class="fgrid" style="margin-top:14px">
        ${needT ? `<div class="f"><label>Tiket ${esc(t.moda.toLowerCase())}</label><input type="text" name="transport" placeholder="mis. ${t.moda === 'Pesawat' ? 'Garuda GA 832 · ' : 'KA Argo Bromo · '}${k || 'Ekonomi'}" required><span class="hint">Kelas sesuai kebijakan: ${k || '-'}</span></div>
        <div class="f"><label>Kode booking</label><input type="text" name="kode" placeholder="mis. ABC123"></div>` : ''}
        ${t.hotel ? `<div class="f"><label>Hotel</label><input type="text" name="hotel" placeholder="Nama hotel · ${nights(t)} malam"><span class="hint">Check-in ${fds(hotelIn(t))}, ${nights(t)} malam${t.lokasi?.lat != null ? ` · <a href="${hotelNearUrl(t.lokasi.lat, t.lokasi.lng)}" target="_blank" rel="noopener">cari hotel dekat lokasi acara</a>` : ''}${t.hotelInfo?.note ? ' · ' + esc(t.hotelInfo.note) : ''}</span></div>` : ''}
        <div class="f"><label>Lampiran (e-ticket, voucher)</label><input type="file" name="files" multiple></div>
        <div class="f full"><label class="check"><input type="checkbox" name="cair" checked> CA sebesar <b class="num">${rp(t.ca)}</b> sudah ditransfer ke ${esc(user(t.caPic || t.userId).nama)}</label></div>
      </div>
      <div class="form-foot"><button class="btn primary">Simpan & tandai siap berangkat</button></div></form>`;
  }
  if ((t.userId === m.id || t.caPic === m.id) && t.status === 'siap') {
    if (st === 'siap') return `<div class="act"><div><b>Siap berangkat ${relDay(t.berangkat).toLowerCase()}</b><p>Tiket & CA sudah siap. Settlement bisa diajukan setelah perjalanan selesai.</p></div><div class="btns"><a class="btn" href="#/sppd/${t.id}">${ic('print')} Cetak SPPD</a><button class="btn" data-act="settle-open" data-id="${t.id}">Ajukan settlement</button></div></div>`;
    return `<div class="act amber"><div><b>${st === 'dinas' ? 'Sedang dinas' : 'Perjalanan selesai, ajukan settlement'}</b><p>Lampirkan bukti pengeluaran. Selisih dengan CA dihitung otomatis.</p></div><div class="btns"><button class="btn primary" data-act="settle-open" data-id="${t.id}">Ajukan settlement</button></div></div>`;
  }
  if (isHCGA() && t.status === 'settlement') {
    const diff = t.ca - settleTotal(t);
    return `<div class="act amber"><div><b>Settlement menunggu verifikasi</b><p>${diff > 0 ? `Karyawan mengembalikan ${rp(diff)}.` : diff < 0 ? `Perusahaan membayar kekurangan ${rp(-diff)} ke karyawan.` : 'Realisasi sama dengan CA.'}</p></div><div class="btns"><button class="btn" data-act="settle-revise" data-id="${t.id}">Minta revisi</button><button class="btn primary" data-act="settle-verify" data-id="${t.id}">Verifikasi & selesaikan</button></div></div>`;
  }
  if (t.userId === m.id && ['menunggu_atasan', 'menunggu_hcga'].includes(t.status)) {
    return `<div class="act"><div><b>${ST[t.status][0]}</b><p>Anda akan mendapat notifikasi saat ada keputusan.</p></div><div class="btns"><button class="btn danger" data-act="trip-cancel" data-id="${t.id}">Batalkan pengajuan</button></div></div>`;
  }
  return '';
}

function settleForm(t) {
  const a = allowance(t);
  const items = t.settlement?.items?.length ? t.settlement.items : caItemsOf(t).map(x => ({ ket: x.jenis.replace(' (daily allowance)', '') + (x.ket ? ' · ' + x.ket : ''), nominal: x.nominal, bukti: '' }));
  return `<form class="card" data-form="settle" data-id="${t.id}" data-live="settle" id="settleForm"><div class="card-h"><h2>Settlement</h2><span class="sub">CA diterima <b class="num">${rp(t.ca)}</b></span></div>
    <div class="tw"><table class="t"><thead><tr><th>Keterangan</th><th class="r">Nominal</th><th>Bukti</th><th></th></tr></thead><tbody id="sRows">${items.map(settleRowHtml).join('')}</tbody></table></div>
    <div class="card-b"><button type="button" class="btn sm" data-act="settle-add">${ic('plus')} Tambah baris</button>
      <div style="max-width:360px;margin-left:auto" id="sSum"></div>
      <div class="form-foot"><button type="button" class="btn" data-act="settle-close">Batal</button><button class="btn primary">Kirim ke HCGA</button></div>
    </div></form>`;
}
function settleRowHtml(x) {
  return `<tr><td><input class="l" name="ket" value="${esc(x.ket)}" placeholder="mis. Taksi bandara"></td><td><input name="nominal" type="number" min="0" step="1000" value="${x.nominal || ''}"></td><td><input type="file" name="bukti" style="border:0;padding:0;height:auto;text-align:left;min-width:160px">${x.bukti ? `<span class="s">${esc(x.bukti)}</span>` : ''}</td><td><button type="button" class="ibtn" data-act="settle-del" title="Hapus baris">${ic('x')}</button></td></tr>`;
}
function liveSettle(f) {
  const t = S.trips.find(x => x.id === f.dataset.id);
  const tot = [...f.querySelectorAll('[name=nominal]')].reduce((a, i) => a + (+i.value || 0), 0);
  const diff = t.ca - tot;
  $('#sSum').innerHTML = kv('Total realisasi', rp(tot)) + kv('CA diterima', rp(t.ca)) + kv(diff > 0 ? 'Dikembalikan ke perusahaan' : diff < 0 ? 'Kekurangan dibayar perusahaan' : 'Selisih', rp(Math.abs(diff)), 'total');
}

function vDinasDetail(id) {
  const t = S.trips.find(x => x.id === id);
  if (!t) return notFound();
  const u = user(t.userId), a = allowance(t), k = kelas(t), st = tstat(t);
  const canSee = isHCGA() || t.userId === me().id || t.caPic === me().id || canApproveAtasan(t, me().id) || u.atasan === me().id;
  if (!canSee) return noAccess();
  const printable = ['pemesanan', 'siap', 'settlement', 'selesai'].includes(t.status);
  let h = `<a class="back" href="#/dinas">${ic('left')} Perjalanan dinas</a>
  <div class="page-head"><div><div class="eyebrow num">${t.no}</div><h1>${esc(t.tujuan)} · ${esc(t.kegiatan)}</h1><p class="muted">${esc(u.nama)} · ${fd(t.berangkat)}${t.pulang !== t.berangkat ? ' – ' + fd(t.pulang) : ''}</p></div><div class="btns">${pill(st)}${printable ? `<a class="btn" href="#/sppd/${t.id}">${ic('print')} Cetak SPPD</a>` : ''}</div></div>
  ${stepper(t)}${tripAction(t)}<div id="settleSlot"></div>
  <div class="cols-main"><div>`;
  h += card('Detail perjalanan', `<div class="card-b"><dl class="d">
    <dt>Pemohon</dt><dd>${esc(u.nama)} · ${esc(u.jabatan)}</dd>
    <dt>Departemen</dt><dd>${esc(u.dept)} · posisi ${esc(u.posisi)}</dd>
    <dt>Atasan</dt><dd>${u.atasan ? esc(user(u.atasan).nama) : '–'}</dd>
    <dt>Kategori</dt><dd>${t.kategori === 'A' ? 'A · Dinas luar kota' : 'B · Operational visit'} · ${esc(t.kegiatan)}</dd>
    <dt>Tujuan</dt><dd>${esc(t.tujuan)}${t.negara ? ', ' + esc(t.negara) : ''}${t.kategori === 'A' ? ` <span class="muted">(${WIL[t.wilayah]})</span>` : ''}</dd>
    <dt>Tanggal</dt><dd>${fd(t.berangkat)} – ${fd(t.pulang)} · ${a.days} hari</dd>
    ${t.kategori === 'A' ? `<dt>Transportasi</dt><dd>${esc(t.moda)}${k ? ` · ${k} <span class="muted">(${ZONA[t.zona]})</span>` : ''}</dd><dt>Hotel</dt><dd>${t.hotel ? `${nights(t)} malam · check-in ${fds(hotelIn(t))}, check-out ${fds(addDays(hotelIn(t), nights(t)))}${t.hotelInfo?.note ? `<br><span class="muted">${esc(t.hotelInfo.note)}</span>` : ''}` : 'Tidak perlu'}</dd>` : `<dt>Kendaraan</dt><dd>${esc(a.b.kendaraan)}</dd>`}
    <dt>Maksud</dt><dd>${esc(t.keperluan)}</dd></dl></div>`);
  h += lokasiCard(t);
  if (t.booking) h += card('Tiket & akomodasi', `<div class="card-b"><dl class="d">${t.booking.transport ? `<dt>Tiket</dt><dd>${esc(t.booking.transport)}</dd>` : ''}${t.booking.kode ? `<dt>Kode booking</dt><dd class="num"><b>${esc(t.booking.kode)}</b></dd>` : ''}${t.booking.hotel ? `<dt>Hotel</dt><dd>${esc(t.booking.hotel)}</dd>` : ''}${t.booking.files?.length ? `<dt>Lampiran</dt><dd><div class="files">${t.booking.files.map(f => `<span class="file">${ic('file')}${esc(f)}</span>`).join('')}</div></dd>` : ''}</dl></div>`);
  if (t.settlement && t.status !== 'siap') {
    const tot = settleTotal(t), diff = t.ca - tot;
    h += card('Settlement', `<div class="tw"><table class="t"><thead><tr><th>Keterangan</th><th class="r">Nominal</th><th class="hide-sm">Bukti</th></tr></thead><tbody>${t.settlement.items.map(x => `<tr><td>${esc(x.ket)}</td><td class="r num">${rp(x.nominal)}</td><td class="hide-sm">${x.bukti ? `<span class="file">${ic('file')}${esc(x.bukti)}</span>` : '<span class="faint">–</span>'}</td></tr>`).join('')}</tbody>
      <tfoot><tr><td>Total realisasi</td><td class="r num">${rp(tot)}</td><td class="hide-sm"></td></tr></tfoot></table></div>
      <div class="card-b" style="max-width:380px;margin-left:auto">${kv('CA diterima', rp(t.ca))}${kv(diff > 0 ? 'Dikembalikan karyawan' : diff < 0 ? 'Dibayar perusahaan' : 'Selisih', rp(Math.abs(diff)), 'total')}</div>`, '', t.settlement.verifiedAt ? `Diverifikasi ${fdt(t.settlement.verifiedAt)}` : `Diajukan ${fdt(t.settlement.at)}`);
  }
  h += `</div><div>`;
  h += card('Uang muka (CA)', `<div class="card-b"><div class="muted" style="font-size:12.5px;margin-bottom:6px">${esc(a.label)} · ${rp(a.per)} × ${a.days} hari</div>${caItemsOf(t).map(x => `<div class="kv"><span>${esc(x.jenis.replace(' (daily allowance)', ''))}${x.ket ? `<br><small class="faint">${esc(x.ket)}</small>` : ''}</span><span class="num">${rp(x.nominal)}</span></div>`).join('')}${kv('Total CA', rp(t.ca), 'total')}${kv('Penerima (PIC)', esc(user(t.caPic || t.userId).nama))}${kv('Status', t.caPaidAt ? 'Dicairkan ' + fdt(t.caPaidAt).split(' · ')[0] : 'Belum dicairkan')}</div>`);
  h += card('Riwayat', `<div class="card-b">${timeline(t.log)}</div>`);
  h += `</div></div>`;
  return h;
}

/* ===== SPPD ===== */
function vSPPD(id) {
  const t = S.trips.find(x => x.id === id);
  if (!t) return notFound();
  const u = user(t.userId), a = allowance(t), k = kelas(t);
  const appr = t.log.filter(l => l.act === 'Menyetujui');
  const sA = appr.find(l => !HCGA_IDS.includes(l.by)) || appr[0], sH = appr.find(l => HCGA_IDS.includes(l.by));
  const no = 'SPPD/' + t.no.split('/').slice(1).join('/');
  const rows = [
    ['Nama pegawai', u.nama], ['Jabatan / posisi', `${u.jabatan} · ${u.posisi}`], ['Departemen', u.dept],
    ['Maksud perjalanan dinas', t.keperluan], ['Jenis kegiatan', `Kategori ${t.kategori} · ${t.kegiatan}`],
    ['Tempat tujuan', t.tujuan + (t.negara ? ', ' + t.negara : '')], ['Tanggal berangkat', fdl(t.berangkat)], ['Tanggal kembali', fdl(t.pulang)], ['Lama perjalanan', `${a.days} hari`],
    ['Alat angkutan', t.kategori === 'A' ? `${t.moda}${k ? ' · kelas ' + k : ''}${t.booking?.transport ? ' (' + t.booking.transport + ')' : ''}` : a.b.kendaraan],
    ['Lokasi acara', t.lokasi?.alamat || '–'],
    ['Penginapan', t.hotel ? `${t.booking?.hotel || 'Hotel'} · ${nights(t)} malam (${fds(hotelIn(t))} – ${fds(addDays(hotelIn(t), nights(t)))})` : '–'],
    ['Daily allowance', `${rp(a.per)} × ${a.days} hari = ${rp(a.total)}`], ['Uang muka (CA)', `${rp(t.ca)} · diterima ${user(t.caPic || t.userId).nama}`]
  ];
  const sig = (title, l, name) => `<div><div>${title}</div><div class="box">${l ? `Disetujui elektronik<br>${fdt(l.t)}` : ''}</div><b>${esc(name)}</b></div>`;
  return `<div class="ptool"><a class="back" style="margin:0" href="#/dinas/${t.id}">${ic('left')} Kembali</a><button class="btn primary" data-act="print">${ic('print')} Cetak / simpan PDF</button></div>
  <div class="paper"><div class="ph"><div class="lw">${LOGO()}</div><div class="meta">Momiasi<br>General Affairs</div></div>
    <h2>SURAT PERINTAH PERJALANAN DINAS</h2><div class="nomor">Nomor: ${no}</div>
    <table>${rows.map((r, i) => `<tr><td>${i + 1}</td><td>${r[0]}</td><td>${esc(r[1])}</td></tr>`).join('')}</table>
    <div class="sig">${sig('Pelaksana', t.log[0], u.nama)}${sig('Atasan langsung', sA, sA ? user(sA.by).nama : (u.atasan ? user(u.atasan).nama : '—'))}${sig('HCGA', sH, sH ? user(sH.by).nama : user(HCGA_IDS[0]).nama)}</div>
    <div class="pf">Dokumen ini dibuat otomatis oleh Momiasi HCS (Human Capital System) pada ${fdt(Date.now())}. Persetujuan tercatat secara elektronik pada sistem.</div>
  </div>`;
}

/* ===== MOBIL ===== */
function vMobilList(q) {
  const all = (isHCGA() ? S.cars : S.cars.filter(c => c.userId === me().id)).slice().sort((a, b) => (b.tanggal + b.mulai).localeCompare(a.tanggal + a.mulai));
  const f = q.f || 'aktif';
  const g = { aktif: all.filter(c => !['selesai', 'ditolak', 'dibatalkan'].includes(c.status)), selesai: all.filter(c => ['selesai', 'ditolak', 'dibatalkan'].includes(c.status)), semua: all };
  const list = g[f];
  return `<div class="page-head"><div><h1>Booking mobil</h1><p class="muted">Mobil kantor dengan driver, mobil eksternal, atau transportasi umum. Disetujui & dijadwalkan oleh HCGA.</p></div><a class="btn primary" href="#/mobil/baru">${ic('plus')} Pesan mobil</a></div>
  <div class="tabs">${[['aktif', 'Mendatang'], ['selesai', 'Selesai & ditolak'], ['semua', 'Semua']].map(([k, l]) => `<a href="#/mobil?f=${k}" class="${f === k ? 'on' : ''}">${l} <span class="c">${g[k].length}</span></a>`).join('')}</div>
  ${fbar('mobil', { dept: isHCGA() })}
  <section class="card">${list.length ? `<div class="tw"><table class="t"><thead><tr><th>Tanggal & jam</th>${isHCGA() ? '<th>Pemohon</th>' : ''}<th>Tujuan</th><th class="hide-sm">Armada</th><th>Status</th></tr></thead><tbody>${list.map(c => `<tr class="click" data-href="#/mobil/${c.id}"><td class="num">${relDay(c.tanggal)}<span class="s">${jam(c.mulai)}–${jam(c.selesai)}</span></td>${isHCGA() ? `<td>${userCell(c.userId)}</td>` : ''}<td>${esc(c.tujuan)}<span class="s">${c.penumpang} orang · ${c.no}</span></td><td class="hide-sm">${assignText(c)}</td><td>${pill(c.status)}</td></tr>`).join('')}</tbody></table></div>` : empty('Belum ada booking.')}</section>`;
}
function assignText(c) {
  const a = c.assign;
  if (!a) return '<span class="faint">Belum dijadwalkan</span>';
  if (a.type === 'kantor') { const v = veh(a.vehicleId); return `${esc(v.nama)}<span class="s">${v.plat} · ${a.driverId ? esc(user(a.driverId).nama) : 'nyetir sendiri'}</span>`; }
  if (a.type === 'eksternal') return `Eksternal · ${esc(a.vendor)}<span class="s">${a.biaya ? 'Estimasi ' + rp(a.biaya) : ''}</span>`;
  return `Transportasi umum<span class="s">${esc(a.note || 'Reimburse')}</span>`;
}

function vMobilForm() {
  return `<a class="back" href="#/mobil">${ic('left')} Booking mobil</a>
  <div class="page-head"><div><h1>Pesan mobil</h1><p class="muted">HCGA akan menentukan mobil kantor & driver, atau mengarahkan ke mobil eksternal / transportasi umum bila armada penuh.</p></div></div>
  <form class="card" style="max-width:760px" data-form="mobil" novalidate><div class="card-b form">
    <div class="fgrid">
      <div class="f"><label>Tanggal</label><input type="date" name="tanggal" value="${addDays(TODAY, 1)}" min="${TODAY}"></div>
      <div class="f"><label>Jumlah penumpang</label><input type="number" name="penumpang" value="1" min="1" max="7"></div>
      <div class="f"><label>Jam berangkat</label><select name="mulai">${timeOpts('09:00', 5 * 60, 22 * 60)}</select></div>
      <div class="f"><label>Perkiraan kembali</label><select name="selesai">${timeOpts('12:00', 5 * 60, 23 * 60)}</select></div>
      <div class="f full"><label>Tujuan</label><input type="text" name="tujuan" placeholder="mis. Kantor klien, SCBD" required></div>
      <div class="f full"><span class="lb">Driver</span><div class="choice">
        <label><input type="radio" name="pakaiDriver" value="1" checked><span><b>Pakai driver kantor</b><span>Driver menerima jadwal & bisa menerima atau menolak</span></span></label>
        <label><input type="radio" name="pakaiDriver" value="0"><span><b>Nyetir sendiri</b><span>Hanya pinjam mobil. Wajib punya SIM A aktif</span></span></label>
      </div></div>
      <div class="f full"><label>Keperluan & catatan untuk driver</label><textarea name="keperluan" placeholder="mis. Bawa alat shooting, jemput di lobby"></textarea></div>
    </div>
    <div id="formErr"></div>
    <div class="form-foot"><a class="btn" href="#/mobil">Batal</a><button class="btn primary">Kirim ke HCGA</button></div>
  </div></form>`;
}

function vMobilDetail(id) {
  const c = S.cars.find(x => x.id === id);
  if (!c) return notFound();
  const u = user(c.userId), m = me();
  if (!(isHCGA() || c.userId === m.id || c.assign?.driverId === m.id)) return noAccess();
  let act = '';
  if (isHCGA() && c.status === 'menunggu_hcga') {
    const vOpts = S.vehicles.map(v => { const busy = carBusy('vehicleId', v.id, c).length; return `<option value="${v.id}" ${busy || v.kursi < c.penumpang ? 'disabled' : ''}>${esc(v.nama)} · ${v.plat} · ${v.kursi} kursi${busy ? ' · terpakai' : v.kursi < c.penumpang ? ' · kursi kurang' : ''}</option>`; }).join('');
    const dOpts = drivers().map(d => { const busy = carBusy('driverId', d.id, c).length; return `<option value="${d.id}" ${busy ? 'disabled' : ''}>${esc(d.nama)}${busy ? ' · bertugas' : ''}</option>`; }).join('');
    const anyV = S.vehicles.some(v => !carBusy('vehicleId', v.id, c).length && v.kursi >= c.penumpang);
    act = `<form class="act block amber" data-form="assign" data-id="${c.id}" data-live="assign"><b>Jadwalkan perjalanan ini</b><p>${anyV ? 'Pilih armada untuk permintaan ini.' : 'Semua mobil kantor terpakai di jam ini. Gunakan mobil eksternal atau transportasi umum.'}</p>
      <div class="choice" style="margin-top:12px">
        <label><input type="radio" name="type" value="kantor" ${anyV ? 'checked' : 'disabled'}><span><b>${c.pakaiDriver !== false ? 'Mobil kantor + driver' : 'Mobil kantor (tanpa driver)'}</b><span>Cek ketersediaan otomatis</span></span></label>
        <label><input type="radio" name="type" value="eksternal" ${anyV ? '' : 'checked'}><span><b>Mobil eksternal</b><span>Rental atau taksi online</span></span></label>
        <label><input type="radio" name="type" value="umum"><span><b>Transportasi umum</b><span>KRL, TransJakarta, dll. (reimburse)</span></span></label>
      </div>
      <div class="fgrid" style="margin-top:14px">
        <div class="f" data-t="kantor"><label>Mobil</label><select name="vehicleId">${vOpts}</select></div>
        ${c.pakaiDriver !== false ? `<div class="f" data-t="kantor"><label>Driver</label><select name="driverId">${dOpts}</select><span class="hint">Driver akan diminta konfirmasi terima / tolak.</span></div>` : `<div class="f" data-t="kantor"><span class="lb">Driver</span><div class="muted" style="padding-top:8px">Pemohon nyetir sendiri</div></div>`}
        <div class="f" data-t="eksternal" hidden><label>Vendor</label><select name="vendor">${opts(['Grab Car', 'Gocar', 'Bluebird', 'Rental (TRAC)', 'Rental lainnya'])}</select></div>
        <div class="f" data-t="eksternal umum" hidden><label>Estimasi biaya</label><input type="number" name="biaya" min="0" step="1000" placeholder="0"></div>
        <div class="f full"><label>Catatan untuk pemohon</label><input type="text" name="note" placeholder="opsional"></div>
      </div>
      <div class="form-foot"><button type="button" class="btn danger" data-act="car-reject" data-id="${c.id}">Tolak</button><button class="btn primary">Jadwalkan</button></div></form>`;
  } else if (c.status === 'menunggu_driver' && c.assign?.driverId === m.id) {
    act = `<div class="act amber"><div><b>Jadwal menyetir baru untuk Anda</b><p>${relDay(c.tanggal)}, ${jam(c.mulai)}–${jam(c.selesai)} · ${esc(veh(c.assign.vehicleId).nama)} ${veh(c.assign.vehicleId).plat}</p></div><div class="btns"><button class="btn danger" data-act="car-decline" data-id="${c.id}">Tolak</button><button class="btn primary" data-act="car-accept" data-id="${c.id}">Terima jadwal</button></div></div>`;
  } else if (c.status === 'menunggu_driver' && (isHCGA() || c.userId === m.id)) {
    act = `<div class="act amber"><div><b>Menunggu konfirmasi driver</b><p>${esc(user(c.assign.driverId).nama)} belum menerima jadwal ini. Jika ditolak, HCGA akan memilih driver lain.</p></div>${c.userId === m.id ? `<button class="btn danger" data-act="car-cancel" data-id="${c.id}">Batalkan</button>` : ''}</div>`;
  } else if ((c.assign?.driverId === m.id || isHCGA() || (c.pakaiDriver === false && c.userId === m.id)) && c.assign?.type === 'kantor' && ['dijadwalkan', 'berjalan'].includes(c.status)) {
    act = c.status === 'dijadwalkan'
      ? `<div class="act"><div><b>Dijadwalkan ${relDay(c.tanggal).toLowerCase()}, ${jam(c.mulai)}</b><p>${c.pakaiDriver === false ? 'Ambil kunci di GA, lalu tandai mulai dan isi odometer awal.' : 'Driver menandai mulai perjalanan dan mengisi odometer awal.'}</p></div><button class="btn primary" data-act="car-start" data-id="${c.id}">Mulai perjalanan</button></div>`
      : `<div class="act"><div><b>Perjalanan sedang berjalan</b><p>Odometer awal ${c.trip.odoStart.toLocaleString('id-ID')} km.</p></div><button class="btn primary" data-act="car-finish" data-id="${c.id}">Selesaikan perjalanan</button></div>`;
  } else if (c.userId === m.id && ['menunggu_hcga', 'dijadwalkan'].includes(c.status)) {
    act = `<div class="act"><div><b>${ST[c.status][0]}</b><p>${c.status === 'menunggu_hcga' ? 'HCGA akan menentukan armada. Anda akan mendapat notifikasi.' : 'Driver akan menunggu di lobby sesuai jam berangkat.'}</p></div><button class="btn danger" data-act="car-cancel" data-id="${c.id}">Batalkan</button></div>`;
  }
  const tr = c.trip;
  return `<a class="back" href="#/${S.persona === 'driver' ? 'jadwal' : 'mobil'}">${ic('left')} ${S.persona === 'driver' ? 'Jadwal saya' : 'Booking mobil'}</a>
  <div class="page-head"><div><div class="eyebrow num">${c.no}</div><h1>${esc(c.tujuan)}</h1><p class="muted">${fd(c.tanggal)} · ${jam(c.mulai)}–${jam(c.selesai)}</p></div>${pill(c.status)}</div>
  ${act}
  <div class="cols-main"><div>
  ${card('Detail permintaan', `<div class="card-b"><dl class="d"><dt>Pemohon</dt><dd>${esc(u.nama)} · ${esc(u.dept)}</dd><dt>Tanggal</dt><dd>${fd(c.tanggal)}</dd><dt>Jam</dt><dd>${jam(c.mulai)} – ${jam(c.selesai)}</dd><dt>Tujuan</dt><dd>${esc(c.tujuan)}</dd><dt>Penumpang</dt><dd>${c.penumpang} orang</dd><dt>Driver</dt><dd>${c.pakaiDriver === false ? 'Nyetir sendiri' : 'Pakai driver kantor'}</dd><dt>Keperluan</dt><dd>${esc(c.keperluan) || '–'}</dd></dl></div>`)}
  ${c.assign ? card('Armada', `<div class="card-b"><dl class="d">${c.assign.type === 'kantor' ? `<dt>Mobil</dt><dd>${esc(veh(c.assign.vehicleId).nama)} · ${veh(c.assign.vehicleId).plat}</dd><dt>Driver</dt><dd>${c.assign.driverId ? esc(user(c.assign.driverId).nama) : 'Nyetir sendiri · ' + esc(u.nama)}</dd>` : c.assign.type === 'eksternal' ? `<dt>Jenis</dt><dd>Mobil eksternal · ${esc(c.assign.vendor)}</dd><dt>Estimasi biaya</dt><dd>${rp(c.assign.biaya)}</dd>` : `<dt>Jenis</dt><dd>Transportasi umum (reimburse)</dd><dt>Estimasi biaya</dt><dd>${rp(c.assign.biaya)}</dd>`}${c.assign.note ? `<dt>Catatan</dt><dd>${esc(c.assign.note)}</dd>` : ''}</dl></div>`) : ''}
  ${tr && tr.odoEnd ? card('Catatan perjalanan', `<div class="card-b"><dl class="d"><dt>Odometer</dt><dd class="num">${tr.odoStart.toLocaleString('id-ID')} → ${tr.odoEnd.toLocaleString('id-ID')} km · <b>${(tr.odoEnd - tr.odoStart).toLocaleString('id-ID')} km</b></dd><dt>BBM</dt><dd class="num">${rp(tr.bbm)}</dd><dt>Tol</dt><dd class="num">${rp(tr.tol)}</dd><dt>Parkir</dt><dd class="num">${rp(tr.parkir)}</dd><dt>Total biaya</dt><dd class="num"><b>${rp(tr.bbm + tr.tol + tr.parkir)}</b></dd></dl></div>`) : ''}
  </div><div>${card('Riwayat', `<div class="card-b">${timeline(c.log)}</div>`)}</div></div>`;
}

/* ===== DRIVER ===== */
function vJadwal() {
  const m = me();
  const req = S.cars.filter(c => c.assign?.driverId === m.id && c.status === 'menunggu_driver').sort((a, b) => (a.tanggal + a.mulai).localeCompare(b.tanggal + b.mulai));
  const list = S.cars.filter(c => c.assign?.driverId === m.id && ['dijadwalkan', 'berjalan'].includes(c.status) && c.tanggal >= addDays(TODAY, -1)).sort((a, b) => (a.tanggal + a.mulai).localeCompare(b.tanggal + b.mulai));
  const done = S.cars.filter(c => c.assign?.driverId === m.id && c.status === 'selesai').sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 5);
  const byDay = {};
  list.forEach(c => (byDay[c.tanggal] = byDay[c.tanggal] || []).push(c));
  let h = `<div class="page-head"><div><h1>Jadwal saya</h1><p class="muted">${esc(m.nama)} · ${HARIL[new Date().getDay()]}, ${fdl(TODAY)}</p></div></div>`;
  if (req.length) {
    h += `<div class="dayh">Perlu konfirmasi Anda · ${req.length}</div>`;
    req.forEach(c => { const v = veh(c.assign.vehicleId), u = user(c.userId);
      h += `<div class="task req"><div class="tt"><span class="time num">${jam(c.mulai)}<span class="muted" style="font-size:14px;font-weight:500"> – ${jam(c.selesai)}</span></span><span class="muted">${relDay(c.tanggal)}</span></div><div class="dest">${esc(c.tujuan)}</div>
        <div class="meta"><span>${esc(u.nama)} · ${c.penumpang} penumpang</span><span>${esc(v.nama)} · ${v.plat}</span>${c.keperluan ? `<span>Catatan: ${esc(c.keperluan)}</span>` : ''}</div>
        <div class="btns"><button class="btn danger" data-act="car-decline" data-id="${c.id}">Tolak</button><button class="btn primary" data-act="car-accept" data-id="${c.id}">Terima</button></div></div>`; });
  }
  if (!list.length) h += card('Tugas', empty('Belum ada tugas terjadwal.'));
  Object.keys(byDay).forEach(d => {
    h += `<div class="dayh">${relDay(d)}${d !== TODAY && d !== addDays(TODAY, 1) ? '' : ' · ' + fds(d)}</div>`;
    byDay[d].forEach(c => {
      const v = veh(c.assign.vehicleId), u = user(c.userId);
      h += `<div class="task"><div class="tt"><span class="time num">${jam(c.mulai)}<span class="muted" style="font-size:14px;font-weight:500"> – ${jam(c.selesai)}</span></span>${pill(c.status)}</div>
        <div class="dest">${esc(c.tujuan)}</div>
        <div class="meta"><span>${esc(u.nama)} · ${esc(u.dept)} · ${c.penumpang} penumpang</span><span>${esc(v.nama)} · ${v.plat}</span>${c.keperluan ? `<span>Catatan: ${esc(c.keperluan)}</span>` : ''}</div>
        <div class="btns"><a class="btn" href="#/mobil/${c.id}">Detail</a>${c.status === 'dijadwalkan' ? `<button class="btn primary" data-act="car-start" data-id="${c.id}">Mulai perjalanan</button>` : `<button class="btn primary" data-act="car-finish" data-id="${c.id}">Selesai</button>`}</div></div>`;
    });
  });
  if (done.length) h += `<div class="dayh">Riwayat terakhir</div>` + `<section class="card"><div class="list">${done.map(c => row({ href: `#/mobil/${c.id}`, title: esc(c.tujuan), sub: `${fds(c.tanggal)} · ${veh(c.assign.vehicleId).plat}${c.trip ? ' · ' + (c.trip.odoEnd - c.trip.odoStart) + ' km' : ''}`, right: pill('selesai') })).join('')}</div></section>`;
  return h;
}

/* ===== RUANG ===== */
const G0 = 7 * 60, G1 = 21 * 60, PX = 30 / 30;
function vRuangKalender(q) {
  const d = q.d || TODAY;
  const n = nowMin();
  const H = (G1 - G0) * PX;
  let times = '', cols = '';
  for (let m = G0; m < G1; m += 60) times += `<span style="top:${(m - G0) * PX}px">${jam(fromMin(m))}</span>`;
  S.rooms.forEach(r => {
    let slots = '';
    for (let m = G0; m < G1; m += 30) {
      const past = d < TODAY || (d === TODAY && m + 30 <= n);
      slots += `<button class="slot ${m % 60 === 0 ? 'hr' : ''}" style="top:${(m - G0) * PX}px;height:${30 * PX}px" ${past ? 'disabled' : `data-act="slot" data-room="${r.id}" data-start="${fromMin(m)}" data-date="${d}"`} aria-label="Pesan ${r.nama} ${jam(fromMin(m))}"></button>`;
    }
    const pastH = d < TODAY ? H : d === TODAY ? Math.max(0, Math.min(H, (n - G0) * PX)) : 0;
    const bks = S.roomb.filter(b => b.roomId === r.id && b.tanggal === d && ['disetujui', 'menunggu_hcga'].includes(b.status)).map(b => {
      const st = roomState(b), top = (Math.max(G0, toMin(b.mulai)) - G0) * PX, hgt = Math.max(22, (toMin(b.selesai) - Math.max(G0, toMin(b.mulai))) * PX - 2);
      const cls = b.status === 'menunggu_hcga' ? 'pend' : st === 'hangus' ? 'lost' : '';
      return `<div class="bk ${cls} ${b.userId === me().id ? 'mine' : ''}" style="top:${top + 1}px;height:${hgt}px" data-href="#/ruang/${b.id}" title="${esc(b.judul)}"><b>${esc(b.judul)}</b><span>${jam(b.mulai)}–${jam(b.selesai)} · ${esc(user(b.userId).nama.split(' ')[0])}${b.status === 'menunggu_hcga' ? ' · menunggu HCGA' : st === 'hangus' ? ' · hangus' : ''}</span></div>`;
    }).join('');
    cols += `<div class="rg-col" style="height:${H}px">${slots}<div class="past" style="height:${pastH}px"></div>${bks}</div>`;
  });
  return `<p class="muted" style="margin:-4px 0 12px">Klik slot kosong untuk memesan.</p>
  <div class="rbar"><a class="btn sm" href="#/ruang?v=kalender&d=${addDays(d, -1)}" aria-label="Hari sebelumnya">${ic('left')}</a><a class="btn sm" href="#/ruang?v=kalender&d=${TODAY}">Hari ini</a><a class="btn sm" href="#/ruang?v=kalender&d=${addDays(d, 1)}" aria-label="Hari berikutnya">${ic('right')}</a><span class="dt">${HARIL[dt(d).getDay()]}, ${fdl(d)}</span>
    <div class="legend"><span><i style="background:var(--brand)"></i>Disetujui</span><span><i style="background:#D69A2D"></i>Menunggu HCGA</span><span><i style="background:var(--faint)"></i>Hangus</span></div></div>
  <div class="rg" style="--n:${S.rooms.length}"><div class="rg-h"><div></div>${S.rooms.map(r => `<div><b>${r.nama}</b><span>${r.kap} orang<span class="fas"> · ${esc(r.fas)}</span></span><br><a class="link" href="#/layar/${r.id}">Tampilan layar</a></div>`).join('')}</div>
    <div class="rg-b"><div class="rg-times" style="height:${H}px">${times}</div>${cols}${d === TODAY && n >= G0 && n <= G1 ? `<div class="nowline" style="top:${(n - G0) * PX}px"></div>` : ''}</div></div>
  <div style="height:16px"></div>`;
}
/* ===== RUANG: status board ===== */
function roomStatus(r) {
  const n = nowMin();
  const list = S.roomb.filter(b => b.roomId === r.id && b.tanggal === TODAY && b.status === 'disetujui' && roomState(b) !== 'hangus').sort((a, b) => a.mulai.localeCompare(b.mulai));
  const cur = list.find(b => toMin(b.mulai) <= n && n < toMin(b.selesai));
  const next = list.filter(b => toMin(b.mulai) > n);
  let cls = 'free', state = 'Tersedia', main = next.length ? `Kosong sampai ${jam(next[0].mulai)}` : 'Kosong sampai akhir hari', sub = next.length ? `${daysLeftMin(toMin(next[0].mulai) - n)} lagi meeting berikutnya` : 'Tidak ada jadwal lagi hari ini', prog = null;
  if (cur && cur.checkinAt) { cls = 'busy'; state = 'Sedang dipakai'; main = esc(cur.judul); sub = `${esc(user(cur.userId).nama)} · selesai ${jam(cur.selesai)} (${daysLeftMin(toMin(cur.selesai) - n)} lagi)`; prog = (n - toMin(cur.mulai)) / (toMin(cur.selesai) - toMin(cur.mulai)); }
  else if (cur) { cls = 'hold'; state = 'Menunggu check-in'; main = esc(cur.judul); sub = `${esc(user(cur.userId).nama)} · dilepas ${jam(fromMin(toMin(cur.mulai) + 15))} jika tidak check-in`; }
  const usedMin = list.filter(b => b.checkinAt || toMin(b.mulai) > n).reduce((a, b) => a + toMin(b.selesai) - toMin(b.mulai), 0);
  return { r, list, cur, next, cls, state, main, sub, prog, usedMin };
}
const daysLeftMin = m => m >= 60 ? `${Math.floor(m / 60)} jam${m % 60 ? ' ' + (m % 60) + ' menit' : ''}` : `${m} menit`;

function gantt(dISO) {
  const T0 = 7 * 60, T1 = 20 * 60, span = T1 - T0, n = nowMin();
  const pct = m => ((Math.min(Math.max(m, T0), T1) - T0) / span * 100).toFixed(2);
  let ticks = '';
  for (let h = 8; h <= 20; h += 2) ticks += `<span class="${h % 4 ? '' : 'm4'}" style="left:${pct(h * 60)}%">${pad(h)}.00</span>`;
  const rows = S.rooms.map(r => {
    const bs = S.roomb.filter(b => b.roomId === r.id && b.tanggal === dISO && ['disetujui', 'menunggu_hcga'].includes(b.status));
    return `<div class="gr"><div class="gl"><b>${r.nama.replace('Ruang ', '')}</b><span>${r.kap} org</span></div><div class="gt">${[...Array(14)].map((_, i) => `<i style="left:${pct((7 + i) * 60)}%"></i>`).join('')}${bs.map(b => { const st = roomState(b); const c = b.status === 'menunggu_hcga' ? 'pend' : st === 'hangus' ? 'lost' : st === 'selesai' ? 'done' : ''; return `<div class="gb ${c}" style="left:${pct(toMin(b.mulai))}%;width:calc(${(pct(toMin(b.selesai)) - pct(toMin(b.mulai))).toFixed(2)}% - 2px)" data-href="#/ruang/${b.id}" data-tip="${esc(b.judul)} · ${jam(b.mulai)}–${jam(b.selesai)} · ${esc(user(b.userId).nama)} · ${ST[st] ? ST[st][0] : st}"><span>${esc(b.judul)}</span></div>`; }).join('')}</div></div>`;
  }).join('');
  const now = dISO === TODAY && n >= T0 && n <= T1 ? `<div class="gnow" style="left:calc(var(--gl) + (100% - var(--gl)) * ${pct(n) / 100})"><em>${pad(Math.floor(n / 60))}.${pad(n % 60)}</em></div>` : '';
  return `<div class="gantt"><div class="gh"><div></div><div class="gx">${ticks}</div></div>${rows}${now}</div>`;
}

function vRuangStatus() {
  const all = S.rooms.map(roomStatus);
  const d = new Date();
  const free = all.filter(x => x.cls === 'free').length;
  const tiles = all.map(x => `<section class="rcard ${x.cls}"><div class="rc-top"><div><b>${x.r.nama}</b><span>${x.r.kap} orang · ${esc(x.r.fas)}</span></div><a class="btn sm" href="#/layar/${x.r.id}" title="Mode layar di depan ruangan">${ic('screen')}</a></div>
    <div class="rc-state"><i></i>${x.state}</div><div class="rc-main">${x.main}</div><div class="rc-sub">${x.sub}</div>
    ${x.prog != null ? `<div class="meter" role="img" aria-label="${Math.round(x.prog * 100)}% durasi meeting berjalan"><span style="width:${Math.round(x.prog * 100)}%"></span></div>` : ''}
    <div class="rc-next"><div class="rc-nh">Berikutnya hari ini</div>${x.next.length ? x.next.slice(0, 3).map(b => `<div class="rc-ni" data-href="#/ruang/${b.id}"><span class="num">${jam(b.mulai)}–${jam(b.selesai)}</span><span>${esc(b.judul)}</span><span class="muted">${esc(user(b.userId).nama.split(' ')[0])}</span></div>`).join('') : '<div class="muted" style="font-size:13px;padding:6px 0">Tidak ada lagi</div>'}</div>
    ${x.cls === 'free' ? `<a class="btn primary sm rc-book" href="#/ruang/baru?room=${x.r.id}&date=${TODAY}">Pesan ruang ini</a>` : ''}</section>`).join('');
  const sumRows = all.map(x => { const hrs = x.list.reduce((a, b) => a + toMin(b.selesai) - toMin(b.mulai), 0) / 60; return `<tr><td>${x.r.nama}</td><td class="r num">${x.list.length}</td><td class="r num">${hrs.toLocaleString('id-ID', { maximumFractionDigits: 1 })} jam</td><td><div class="minibar" data-tip="${Math.round(hrs / 9 * 100)}% dari 9 jam kerja"><span style="width:${Math.min(100, Math.round(hrs / 9 * 100))}%"></span></div></td><td class="r num">${Math.round(hrs / 9 * 100)}%</td></tr>`; }).join('');
  return `<div class="syncbar"><span class="sdot"></span>Sumber jadwal: Google Calendar ruang meeting · diperbarui ${pad(d.getHours())}.${pad(d.getMinutes())}<span class="sp"></span><a class="link" href="#/layar/semua">${ic('screen')} Mode layar TV</a></div>
  <p class="headline">${free === all.length ? 'Semua ruang meeting kosong saat ini.' : free ? `${free} dari ${all.length} ruang kosong saat ini.` : 'Semua ruang meeting sedang terpakai.'}</p>
  <div class="rcards">${tiles}</div>
  ${card('Jadwal hari ini', `<div class="card-b">${gantt(TODAY)}<div class="legend" style="margin:12px 0 0"><span><i style="background:var(--brand)"></i>Terpakai / disetujui</span><span><i style="background:#D69A2D"></i>Menunggu HCGA</span><span><i style="background:#C9D0CC"></i>Selesai / hangus</span></div></div>`, '<a class="link" href="#/ruang?v=kalender">Buka kalender</a>')}
  ${card('Pemakaian hari ini', `<div class="tw"><table class="t"><thead><tr><th>Ruangan</th><th class="r">Meeting</th><th class="r">Total durasi</th><th style="width:40%">Terisi</th><th class="r">%</th></tr></thead><tbody>${sumRows}</tbody></table></div>`)}`;
}

function vRuang(q) {
  const v = q.v || 'status';
  const mine = S.roomb.filter(b => b.userId === me().id && b.tanggal >= TODAY && ['disetujui', 'menunggu_hcga'].includes(b.status) && !['hangus', 'selesai'].includes(roomState(b))).sort((a, b) => (a.tanggal + a.mulai).localeCompare(b.tanggal + b.mulai));
  return `<div class="page-head"><div><h1>Ruang meeting</h1><p class="muted">Booking disetujui HCGA dan tersinkron ke Google Calendar. Wajib check-in maksimal 15 menit setelah mulai.</p></div><a class="btn primary" href="#/ruang/baru${q.d ? '?date=' + q.d : ''}">${ic('plus')} Pesan ruang</a></div>
  <div class="tabs"><a href="#/ruang" class="${v === 'status' ? 'on' : ''}">Status sekarang</a><a href="#/ruang?v=kalender" class="${v === 'kalender' ? 'on' : ''}">Kalender booking</a></div>
  ${v === 'status' ? vRuangStatus() : vRuangKalender(q)}
  ${card('Booking saya', mine.length ? `<div class="list">${mine.map(b => roomRow(b)).join('')}</div>` : empty('Belum ada booking mendatang.'))}`;
}



function vRuangForm(q) {
  const rId = q.room || 'r1', d = q.date || TODAY;
  let st = q.start;
  if (!st) { const m = d === TODAY ? Math.max(G0, Math.ceil(nowMin() / 30) * 30) : 9 * 60; st = fromMin(Math.min(m, 20 * 60)); }
  const en = fromMin(Math.min(toMin(st) + 60, G1));
  return `<a class="back" href="#/ruang?v=kalender&d=${d}">${ic('left')} Ruang meeting</a>
  <div class="page-head"><div><h1>Pesan ruang meeting</h1><p class="muted">Setelah disetujui HCGA, undangan Google Calendar dikirim ke peserta.</p></div></div>
  <form class="card" style="max-width:760px" data-form="ruang" data-live="ruang" novalidate><div class="card-b form">
    <fieldset class="fs"><div class="fs-t">Ruangan & waktu</div>
      <div class="choice">${S.rooms.map(r => `<label><input type="radio" name="roomId" value="${r.id}" ${r.id === rId ? 'checked' : ''}><span><b>${r.nama}</b><span>Maks. ${r.kap} orang · ${esc(r.fas)}</span></span></label>`).join('')}</div>
      <div class="fgrid">
        <div class="f full"><label>Judul meeting</label><input type="text" name="judul" placeholder="mis. Review campaign Desember" required></div>
        <div class="f"><label>Tanggal</label><input type="date" name="tanggal" value="${d}" min="${TODAY}"></div>
        <div class="f"><label>Jumlah peserta</label><input type="number" name="peserta" value="3" min="1"></div>
        <div class="f"><label>Mulai</label><select name="mulai">${timeOpts(st, G0, G1 - 15)}</select></div>
        <div class="f"><label>Selesai</label><select name="selesai">${timeOpts(en, G0 + 15, G1)}</select></div>
      </div>
      <div id="avail"></div>
    </fieldset>
    <fieldset class="fs"><div class="fs-t">Konsumsi</div>
      <div class="choice">${Object.entries(KONSUMSI).map(([k, l], i) => `<label><input type="radio" name="konsumsi" value="${k}" ${i === 0 ? 'checked' : ''}><span><b>${l}</b></span></label>`).join('')}</div>
      <div class="fgrid" data-k hidden><div class="f"><label>Jumlah porsi</label><input type="number" name="porsi" min="1" value="3"></div><div class="f"><label>Catatan konsumsi</label><input type="text" name="kcatatan" placeholder="mis. 1 vegetarian, tanpa kacang"></div></div>
    </fieldset>
    <fieldset class="fs"><div class="fs-t">Google Calendar</div>
      <label class="check"><input type="checkbox" name="gcal" checked> Buat event & kirim undangan ke peserta</label>
      <div class="f" data-g><label>Email peserta</label><textarea name="tamu" placeholder="pisahkan dengan koma, mis. dimas@..., fajar@..."></textarea></div>
    </fieldset>
    <div id="formErr"></div>
    <div class="form-foot"><a class="btn" href="#/ruang?v=kalender&d=${d}">Batal</a><button class="btn primary">Kirim ke HCGA</button></div>
  </div></form>`;
}
function ruangFromForm(f) {
  const g = n => f.elements[n] ? f.elements[n].value : '';
  return { roomId: (f.querySelector('[name=roomId]:checked') || {}).value, judul: g('judul').trim(), tanggal: g('tanggal'), peserta: +g('peserta') || 0, mulai: g('mulai'), selesai: g('selesai'), konsumsi: { jenis: (f.querySelector('[name=konsumsi]:checked') || {}).value, porsi: +g('porsi') || 0, catatan: g('kcatatan').trim() }, gcal: f.elements.gcal.checked, tamu: g('tamu').trim() };
}
function ruangErrors(b) {
  const e = [], r = room(b.roomId);
  if (toMin(b.selesai) <= toMin(b.mulai)) e.push('Jam selesai harus setelah jam mulai.');
  if (b.peserta > r.kap) e.push(`${r.nama} maksimal ${r.kap} orang. ${b.peserta <= 10 ? 'Coba Ruang Meeting 2.' : ''}`);
  if (b.tanggal === TODAY && toMin(b.mulai) < nowMin() - 15) e.push('Jam mulai sudah lewat.');
  const c = roomConflicts(b.roomId, b.tanggal, b.mulai, b.selesai);
  if (c.length) e.push(`Bentrok dengan "${esc(c[0].judul)}" (${jam(c[0].mulai)}–${jam(c[0].selesai)}, ${esc(user(c[0].userId).nama)}).`);
  return e;
}
function liveRuang(f, e) {
  const b = ruangFromForm(f);
  if (e && e.target.name === 'mulai' && toMin(b.selesai) <= toMin(b.mulai)) { f.elements.selesai.value = fromMin(Math.min(toMin(b.mulai) + 60, G1)); b.selesai = f.elements.selesai.value; }
  if (e && e.target.name === 'peserta' && b.konsumsi.jenis !== 'none') f.elements.porsi.value = b.peserta;
  f.querySelector('[data-k]').hidden = b.konsumsi.jenis === 'none';
  f.querySelector('[data-g]').hidden = !b.gcal;
  const err = b.judul || e ? ruangErrors(b) : [];
  $('#avail').innerHTML = err.length ? `<div class="alert">${err.join('<br>')}</div>` : `<div class="alert info">${room(b.roomId).nama} tersedia ${fd(b.tanggal)}, ${jam(b.mulai)}–${jam(b.selesai)}.</div>`;
}

function gcalUrl(b) {
  const r = room(b.roomId), f = (d, t) => d.replace(/-/g, '') + 'T' + t.replace(':', '') + '00';
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(b.judul)}&dates=${f(b.tanggal, b.mulai)}/${f(b.tanggal, b.selesai)}&ctz=Asia/Jakarta&location=${encodeURIComponent(r.nama + ' · Kantor Momiasi')}`;
}
function vRuangDetail(id) {
  const b = S.roomb.find(x => x.id === id);
  if (!b) return notFound();
  const u = user(b.userId), r = room(b.roomId), st = roomState(b), m = me();
  let act = '';
  if (isHCGA() && b.status === 'menunggu_hcga') {
    const c = roomConflicts(b.roomId, b.tanggal, b.mulai, b.selesai, b.id).filter(x => x.status === 'disetujui');
    act = `<div class="act amber"><div><b>Menunggu persetujuan HCGA</b><p>${c.length ? `Perhatian: bentrok dengan "${esc(c[0].judul)}".` : 'Slot tersedia.'}${b.konsumsi.jenis !== 'none' ? ` Termasuk konsumsi ${KONSUMSI[b.konsumsi.jenis].toLowerCase()} ${b.konsumsi.porsi} porsi.` : ''}</p></div><div class="btns"><button class="btn danger" data-act="room-reject" data-id="${b.id}">Tolak</button><button class="btn primary" data-act="room-approve" data-id="${b.id}">Setujui</button></div></div>`;
  } else if (b.userId === m.id && st === 'checkin') {
    act = `<div class="act"><div><b>Silakan check-in</b><p>Batas check-in ${jam(fromMin(toMin(b.mulai) + 15))}. Lewat dari itu booking hangus dan ruangan dilepas.</p></div><button class="btn primary" data-act="room-checkin" data-id="${b.id}">Check-in sekarang</button></div>`;
  } else if (b.userId === m.id && ['menunggu_hcga', 'disetujui'].includes(st)) {
    act = `<div class="act"><div><b>${st === 'disetujui' ? 'Booking disetujui' : 'Menunggu persetujuan HCGA'}</b><p>${st === 'disetujui' ? `Check-in dibuka ${jam(fromMin(toMin(b.mulai) - 15))} sampai ${jam(fromMin(toMin(b.mulai) + 15))}.` : 'Slot ini sudah ditahan untuk Anda sampai ada keputusan.'}</p></div><div class="btns">${st === 'disetujui' ? `<a class="btn" href="${gcalUrl(b)}" target="_blank" rel="noopener">${ic('cal')} Tambah ke Google Calendar</a>` : ''}<button class="btn danger" data-act="room-cancel" data-id="${b.id}">Batalkan</button></div></div>`;
  }
  return `<a class="back" href="#/ruang?v=kalender&d=${b.tanggal}">${ic('left')} Ruang meeting</a>
  <div class="page-head"><div><div class="eyebrow num">${b.no}</div><h1>${esc(b.judul)}</h1><p class="muted">${r.nama} · ${fd(b.tanggal)} · ${jam(b.mulai)}–${jam(b.selesai)}</p></div>${pill(st)}</div>
  ${act}
  <div class="cols-main"><div>${card('Detail booking', `<div class="card-b"><dl class="d"><dt>Pemesan</dt><dd>${esc(u.nama)} · ${esc(u.dept)}</dd><dt>Ruangan</dt><dd>${r.nama} · maks. ${r.kap} orang</dd><dt>Waktu</dt><dd>${fd(b.tanggal)}, ${jam(b.mulai)}–${jam(b.selesai)}</dd><dt>Peserta</dt><dd>${b.peserta} orang</dd><dt>Konsumsi</dt><dd>${KONSUMSI[b.konsumsi.jenis]}${b.konsumsi.jenis !== 'none' ? ` · ${b.konsumsi.porsi} porsi${b.konsumsi.catatan ? ' · ' + esc(b.konsumsi.catatan) : ''}` : ''}</dd><dt>Google Calendar</dt><dd>${b.gcal ? (b.status === 'disetujui' ? 'Event dibuat, undangan terkirim' : 'Dibuat setelah disetujui') : 'Tidak'}${b.tamu ? `<br><span class="muted">${esc(b.tamu)}</span>` : ''}</dd><dt>Check-in</dt><dd>${b.checkinAt ? fdt(b.checkinAt) : st === 'hangus' ? '<span style="color:var(--red)">Tidak check-in, booking hangus</span>' : 'Belum'}</dd></dl></div>`)}</div>
  <div>${card('Riwayat', `<div class="card-b">${timeline(b.log)}</div>`)}</div></div>`;
}

function vLayarSemua() {
  const d = new Date(), all = S.rooms.map(roomStatus);
  return `<div class="layar multi"><div class="lh"><div class="lw">${LOGO()}</div><div class="clock">${pad(d.getHours())}.${pad(d.getMinutes())}</div></div>
    <div class="lgrid">${all.map(x => `<div class="lcol ${x.cls}"><div class="lroom">${x.r.nama} · ${x.r.kap} orang</div><div class="lstate">${x.state}</div><div class="lcur">${x.main}</div><div class="lsub">${x.sub}</div>${x.prog != null ? `<div class="meter big"><span style="width:${Math.round(x.prog * 100)}%"></span></div>` : '<div class="band"></div>'}
      <div class="lnext"><h4>Berikutnya</h4>${x.next.length ? x.next.slice(0, 4).map(b => `<div><span>${jam(b.mulai)}–${jam(b.selesai)}</span><span>${esc(b.judul)}</span></div>`).join('') : '<div><span>–</span><span>Tidak ada lagi hari ini</span></div>'}</div></div>`).join('')}</div>
    <a class="exit" href="#/ruang">Keluar dari mode layar</a></div>`;
}
function vLayar(id) {
  if (id === 'semua') return vLayarSemua();
  const r = room(id);
  if (!r) return notFound();
  const n = nowMin();
  const list = S.roomb.filter(b => b.roomId === id && b.tanggal === TODAY && b.status === 'disetujui' && roomState(b) !== 'hangus').sort((a, b) => a.mulai.localeCompare(b.mulai));
  const cur = list.find(b => toMin(b.mulai) <= n && n < toMin(b.selesai) && !(b.checkinAt && false));
  const next = list.filter(b => toMin(b.mulai) > n);
  const d = new Date();
  let cls = 'free', state = 'Tersedia', main = next.length ? `Kosong sampai ${jam(next[0].mulai)}` : 'Kosong sepanjang sisa hari ini', sub = 'Pesan lewat Momiasi HCS';
  if (cur && cur.checkinAt) { cls = 'busy'; state = 'Sedang dipakai'; main = esc(cur.judul); sub = `${esc(user(cur.userId).nama)} · sampai ${jam(cur.selesai)}`; }
  else if (cur) { cls = 'hold'; state = 'Menunggu check-in'; main = esc(cur.judul); sub = `${esc(user(cur.userId).nama)} · dilepas otomatis ${jam(fromMin(toMin(cur.mulai) + 15))} jika tidak check-in`; }
  return `<div class="layar ${cls}"><div class="lh"><div class="lw">${LOGO()}</div><div class="clock">${pad(d.getHours())}.${pad(d.getMinutes())}</div></div>
    <div class="lroom">${r.nama} · ${r.kap} orang</div>
    <div class="lstate">${state}</div><div class="lcur">${main}</div><div class="lsub">${sub}</div>
    <div class="band"></div>
    <div class="lnext"><h4>Jadwal hari ini</h4>${list.length ? list.map(b => `<div><span>${jam(b.mulai)}–${jam(b.selesai)}</span><span>${esc(b.judul)}</span></div>`).join('') : '<div><span>–</span><span>Belum ada booking</span></div>'}</div>
    <a class="exit" href="#/ruang">Keluar dari mode layar</a></div>`;
}

/* ===== PERSETUJUAN ===== */
function vPersetujuan(q) {
  const p = pending();
  if (!isHCGA()) {
    const g = S.delegasi;
    return `<div class="page-head"><div><h1>Persetujuan</h1><p class="muted">Perjalanan dinas & training tim Anda yang menunggu keputusan.</p></div></div>
    ${card('Perjalanan dinas', p.atasan.length ? tripTable(p.atasan, true) : empty('Tidak ada pengajuan yang menunggu.'), '', p.atasan.length ? `${p.atasan.length} menunggu` : '')}
    ${isDir() ? card('Permintaan karyawan (FPK)', taPending().dir.length ? fpkTable(taPending().dir) : empty('Tidak ada FPK yang menunggu.'), '', taPending().dir.length ? taPending().dir.length + ' menunggu' : '') : ''}
    ${card('Pengajuan training', lndPending().atasan.length ? trTable(lndPending().atasan, true) : empty('Tidak ada pengajuan training yang menunggu.'), '', lndPending().atasan.length ? `${lndPending().atasan.length} menunggu` : '')}
    ${card('Delegasi saat cuti', `<form class="card-b" data-form="delegasi">${g && g.from === me().id ? `<div class="alert info" style="margin-bottom:12px">Approval Anda didelegasikan ke <b>${esc(user(g.to).nama)}</b> pada ${fds(g.mulai)} – ${fds(g.sampai)}. <button type="button" class="btn sm" data-act="deleg-clear" style="margin-left:8px">Hapus delegasi</button></div>` : ''}
      <div class="fgrid"><div class="f"><label>Delegasikan ke</label><select name="to">${opts(S.users.filter(u => u.id !== me().id && !['Driver'].includes(u.posisi)).map(u => [u.id, `${u.nama} · ${u.jabatan}`]), g?.to || 'u6')}</select></div><div></div>
      <div class="f"><label>Mulai</label><input type="date" name="mulai" value="${g?.mulai || TODAY}"></div><div class="f"><label>Sampai</label><input type="date" name="sampai" value="${g?.sampai || addDays(TODAY, 5)}"></div></div>
      <div class="form-foot"><button class="btn">Simpan delegasi</button></div></form>`, '', 'Pengajuan tim diteruskan ke orang yang Anda tunjuk')}`;
  }
  const tab = q.tab || 'dinas';
  const tabs = [['dinas', 'Dinas', p.dinas.length], ['pesan', 'Tiket & CA', p.pesan.length], ['settle', 'Settlement', p.settle.length], ['mobil', 'Mobil', p.mobil.length], ['ruang', 'Ruang meeting', p.ruang.length], ['aset', 'Aset', p.aset.length], ['fpk', 'FPK', taPending().hc.length], ['training', 'Training', lndPending().hc.length], ['piagam', 'Piagam', lndPending().piagam.length], ['akun', 'Pendaftar akun', regPending().length]];
  let body = '';
  if (tab === 'dinas' || tab === 'pesan' || tab === 'settle') body = tripTable(p[tab], true);
  if (tab === 'mobil') body = p.mobil.length ? `<div class="tw"><table class="t"><thead><tr><th>Tanggal & jam</th><th>Pemohon</th><th>Tujuan</th><th></th></tr></thead><tbody>${p.mobil.map(c => `<tr class="click" data-href="#/mobil/${c.id}"><td class="num">${relDay(c.tanggal)}<span class="s">${jam(c.mulai)}–${jam(c.selesai)}</span></td><td>${userCell(c.userId)}</td><td>${esc(c.tujuan)}<span class="s">${c.penumpang} orang</span></td><td class="r"><a class="btn sm" href="#/mobil/${c.id}">Jadwalkan</a></td></tr>`).join('')}</tbody></table></div>` : empty('Tidak ada permintaan mobil.');
  if (tab === 'aset') body = asetTable(p.aset, true);
  if (tab === 'akun') body = regTable();
  if (tab === 'training') body = trTable(lndPending().hc, true);
  if (tab === 'fpk') body = fpkTable(taPending().hc);
  if (tab === 'piagam') { const pg = lndPending().piagam; body = pg.length ? `<div class="list">${pg.map(({ t, u }) => `<div class="row nw" data-href="#/training/${t.id}" role="link" tabindex="0"><span class="rm"><span class="rt">${esc(user(u).nama)}</span><span class="rs">${esc(t.judul)} · ${fds(t.tanggal)}</span></span><span class="rr"><button class="btn sm" data-act="pg-reject" data-id="${t.id}" data-u="${u}">Tolak</button><button class="btn sm primary" data-act="pg-approve" data-id="${t.id}" data-u="${u}">Acc piagam</button></span></div>`).join('')}</div>` : empty('Tidak ada pengajuan piagam.'); }
  if (tab === 'ruang') body = p.ruang.length ? `<div class="tw"><table class="t"><thead><tr><th>Waktu</th><th>Pemesan</th><th>Meeting</th><th class="hide-sm">Konsumsi</th><th></th></tr></thead><tbody>${p.ruang.map(b => { const c = roomConflicts(b.roomId, b.tanggal, b.mulai, b.selesai, b.id).filter(x => x.status === 'disetujui'); return `<tr class="click" data-href="#/ruang/${b.id}"><td class="num">${relDay(b.tanggal)}<span class="s">${jam(b.mulai)}–${jam(b.selesai)}</span></td><td>${userCell(b.userId)}</td><td>${esc(b.judul)}<span class="s">${room(b.roomId).nama} · ${b.peserta} orang${c.length ? ' · <b style="color:var(--red)">bentrok</b>' : ''}</span></td><td class="hide-sm">${b.konsumsi.jenis === 'none' ? '<span class="faint">–</span>' : `${KONSUMSI[b.konsumsi.jenis]}<span class="s">${b.konsumsi.porsi} porsi</span>`}</td><td class="r"><div class="btns" style="justify-content:flex-end;flex-wrap:nowrap"><button class="btn sm danger" data-act="room-reject" data-id="${b.id}">Tolak</button><button class="btn sm primary" data-act="room-approve" data-id="${b.id}">Setujui</button></div></td></tr>`; }).join('')}</tbody></table></div>` : empty('Tidak ada booking yang menunggu.');
  return `<div class="page-head"><div><h1>Persetujuan</h1><p class="muted">Semua yang menunggu tindakan HCGA.</p></div></div>
  <div class="tabs">${tabs.map(([k, l, n]) => `<a href="#/persetujuan?tab=${k}" class="${tab === k ? 'on' : ''}">${l} <span class="c">${n}</span></a>`).join('')}</div>
  ${fbar('appr', { dept: true })}
  <section class="card">${body}</section>`;
}

/* ===== ARMADA ===== */
function vArmada() {
  const due = s => { const st = dueState(s); if (!s) return '<span class="faint">–</span>'; const n = daysBetween(TODAY, s); return `${fds(s)} ${dt(s).getFullYear()}${st ? `<span class="s" style="color:var(--${st})">${n < 0 ? 'terlewat ' + -n + ' hari' : n + ' hari lagi'}</span>` : ''}`; };
  const vehRows = S.vehicles.map(v => {
    const today = S.cars.filter(c => c.tanggal === TODAY && c.assign?.vehicleId === v.id && ['dijadwalkan', 'berjalan'].includes(c.status));
    return `<tr><td><b>${esc(v.nama)}</b><span class="s num">${v.plat} · ${v.kursi} kursi</span></td><td class="r num">${v.odo.toLocaleString('id-ID')} km</td><td class="num">${due(v.servis)}</td><td class="num">${due(v.pajak)}</td><td class="num">${due(v.kir)}</td><td>${today.length ? `<span class="pill blue">${today.length} tugas hari ini</span>` : '<span class="pill teal">Tersedia</span>'}</td></tr>`;
  }).join('');
  const drvRows = drivers().map(d => {
    const tasks = S.cars.filter(c => c.assign?.driverId === d.id);
    const today = tasks.filter(c => c.tanggal === TODAY && ['dijadwalkan', 'berjalan'].includes(c.status));
    const month = tasks.filter(c => c.status === 'selesai' && c.tanggal.slice(0, 7) === TODAY.slice(0, 7));
    return `<tr><td><b>${esc(d.nama)}</b></td><td>${today.length ? today.map(c => `${jam(c.mulai)} ${esc(c.tujuan)}`).join('<br>') : '<span class="faint">Tidak ada tugas</span>'}</td><td class="r num">${month.length}</td><td class="r num">${month.reduce((a, c) => a + (c.trip ? c.trip.odoEnd - c.trip.odoStart : 0), 0)} km</td></tr>`;
  }).join('');
  return `<div class="page-head"><div><h1>Armada & driver</h1><p class="muted">Kendaraan operasional, jadwal servis, pajak STNK, dan uji KIR.</p></div><button class="btn" data-act="veh-add">${ic('plus')} Tambah kendaraan</button></div>
  ${card('Kendaraan', `<div class="tw"><table class="t"><thead><tr><th>Kendaraan</th><th class="r">Odometer</th><th>Servis berikut</th><th>Pajak STNK</th><th>Uji KIR</th><th>Hari ini</th></tr></thead><tbody>${vehRows}</tbody></table></div>`)}
  ${card('Driver', `<div class="tw"><table class="t"><thead><tr><th>Nama</th><th>Tugas hari ini</th><th class="r">Trip bulan ini</th><th class="r">Jarak bulan ini</th></tr></thead><tbody>${drvRows}</tbody></table></div>`)}`;
}

/* ===== LAPORAN ===== */
function reportData(ym) {
  const inM = s => s && s.slice(0, 7) === ym;
  const depts = [...new Set(S.users.map(u => u.dept))];
  const trips = S.trips.filter(t => inM(t.berangkat) && !['ditolak', 'dibatalkan'].includes(t.status));
  const dinas = depts.map(d => { const ts = trips.filter(t => user(t.userId).dept === d); return { dept: d, n: ts.length, hari: ts.reduce((a, t) => a + allowance(t).days, 0), ca: ts.reduce((a, t) => a + (t.caPaidAt ? t.ca : 0), 0), real: ts.reduce((a, t) => a + (t.settlement?.verifiedAt ? settleTotal(t) : 0), 0) }; }).filter(x => x.n);
  const caOpen = S.trips.filter(t => t.caPaidAt && ['siap', 'settlement'].includes(t.status)).map(t => ({ t, umur: Math.max(0, daysBetween(t.pulang, TODAY)) }));
  const cars = S.cars.filter(c => inM(c.tanggal) && c.status === 'selesai');
  const mobil = S.vehicles.map(v => { const cs = cars.filter(c => c.assign?.vehicleId === v.id); return { v, n: cs.length, km: cs.reduce((a, c) => a + (c.trip ? c.trip.odoEnd - c.trip.odoStart : 0), 0), bbm: cs.reduce((a, c) => a + (c.trip?.bbm || 0), 0), tolpk: cs.reduce((a, c) => a + (c.trip ? c.trip.tol + c.trip.parkir : 0), 0) }; });
  const ext = cars.filter(c => c.assign && c.assign.type !== 'kantor');
  // working days in month up to today (or full month if past)
  const [y, mo] = ym.split('-').map(Number); let wd = 0;
  for (let d = new Date(y, mo - 1, 1); d.getMonth() === mo - 1; d.setDate(d.getDate() + 1)) { if (iso(d) > TODAY) break; if (d.getDay() % 6) wd++; }
  const ruang = S.rooms.map(r => { const bs = S.roomb.filter(b => b.roomId === r.id && inM(b.tanggal) && b.tanggal <= TODAY && b.status === 'disetujui'); const used = bs.filter(b => b.checkinAt); const mins = used.reduce((a, b) => a + toMin(b.selesai) - toMin(b.mulai), 0); return { r, n: bs.length, hangus: bs.filter(b => roomState(b) === 'hangus').length, jam: mins / 60, util: wd ? mins / (wd * 9 * 60) : 0 }; });
  const pend = [];
  S.trips.filter(t => ['menunggu_atasan', 'menunggu_hcga', 'pemesanan', 'settlement'].includes(t.status)).forEach(t => pend.push({ jenis: 'Dinas', no: t.no, siapa: user(t.userId).nama, tahap: ST[t.status][0], umur: (Date.now() - t.log[t.log.length - 1].t) / 864e5, href: `#/dinas/${t.id}` }));
  S.cars.filter(c => c.status === 'menunggu_hcga').forEach(c => pend.push({ jenis: 'Mobil', no: c.no, siapa: user(c.userId).nama, tahap: 'Menunggu HCGA', umur: (Date.now() - c.log[c.log.length - 1].t) / 864e5, href: `#/mobil/${c.id}` }));
  S.aset.filter(a => a.status === 'menunggu_hcga').forEach(a => pend.push({ jenis: 'Aset', no: a.no, siapa: user(a.userId).nama, tahap: 'Menunggu HCGA', umur: (Date.now() - a.log[a.log.length - 1].t) / 864e5, href: `#/aset/${a.id}` }));
  S.roomb.filter(b => b.status === 'menunggu_hcga').forEach(b => pend.push({ jenis: 'Ruang', no: b.no, siapa: user(b.userId).nama, tahap: 'Menunggu HCGA', umur: b.log.length ? (Date.now() - b.log[b.log.length - 1].t) / 864e5 : 0, href: `#/ruang/${b.id}` }));
  pend.sort((a, b) => b.umur - a.umur);
  return { dinas, caOpen, mobil, ext, ruang, pend, wd };
}
const umurTxt = d => d < 1 / 24 ? 'baru saja' : d < 1 ? Math.round(d * 24) + ' jam' : Math.floor(d) + ' hari';

function vLaporan(q) {
  const months = [0, 1, 2].map(i => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - i); return iso(d).slice(0, 7); });
  const ym = q.m || months[0];
  const R = reportData(ym);
  const mLabel = s => `${BULAN[+s.slice(5) - 1]} ${s.slice(0, 4)}`;
  const dl = k => `<button class="btn sm" data-act="csv" data-k="${k}" data-m="${ym}">${ic('dl')} Excel</button>`;
  const sum = (a, k) => a.reduce((x, y) => x + y[k], 0);
  const m6 = [5, 4, 3, 2, 1, 0].map(monthKey);
  return `<div class="page-head"><div><h1>Laporan</h1><p class="muted">Ringkasan biaya dan pemakaian fasilitas GA.</p></div><select style="width:auto" data-nav="laporan">${months.map(m => `<option value="${m}" ${m === ym ? 'selected' : ''}>${mLabel(m)}</option>`).join('')}</select></div>
  <div class="cols">
    <div>${card('CA perjalanan dinas dicairkan', `<div class="card-b">${colChart(m6.map(m => ({ label: BLN[+m.slice(5) - 1], value: caMonth(m), tip: `${mLabel(m)}: ${rp(caMonth(m))}` })), rpc, v => v ? rpc(v).replace('Rp ', '') : '0')}</div>`, '', '6 bulan terakhir')}</div>
    <div>${card('Kepadatan ruang meeting', `<div class="card-b">${heatCard(4)}</div>`, '', '4 minggu terakhir')}</div>
  </div>
  ${card('Biaya perjalanan dinas per departemen', R.dinas.length ? `<div class="tw"><table class="t"><thead><tr><th>Departemen</th><th class="r">Perjalanan</th><th class="r">Hari dinas</th><th class="r">CA dicairkan</th><th class="r">Realisasi (terverifikasi)</th></tr></thead><tbody>${R.dinas.map(x => `<tr><td>${esc(x.dept)}</td><td class="r num">${x.n}</td><td class="r num">${x.hari}</td><td class="r num">${rp(x.ca)}</td><td class="r num">${rp(x.real)}</td></tr>`).join('')}</tbody><tfoot><tr><td>Total</td><td class="r num">${sum(R.dinas, 'n')}</td><td class="r num">${sum(R.dinas, 'hari')}</td><td class="r num">${rp(sum(R.dinas, 'ca'))}</td><td class="r num">${rp(sum(R.dinas, 'real'))}</td></tr></tfoot></table></div>` : empty('Tidak ada perjalanan dinas di bulan ini.'), dl('dinas'), `berangkat di ${mLabel(ym)} · tidak termasuk tiket & hotel`)}
  ${card('CA belum di-settle', R.caOpen.length ? `<div class="tw"><table class="t"><thead><tr><th>No.</th><th>Karyawan</th><th>Tujuan</th><th class="r">CA</th><th>Status</th><th class="r">Lewat sejak pulang</th></tr></thead><tbody>${R.caOpen.map(({ t, umur }) => `<tr class="click" data-href="#/dinas/${t.id}"><td class="num">${t.no}</td><td>${userCell(t.userId)}</td><td>${esc(t.tujuan)}<span class="s">pulang ${fds(t.pulang)}</span></td><td class="r num">${rp(t.ca)}</td><td>${pill(tstat(t))}</td><td class="r num">${umur} hari</td></tr>`).join('')}</tbody></table></div>` : empty('Semua CA sudah di-settle.'), dl('ca'), 'semua periode')}
  <div class="cols">
  ${card('Pemakaian mobil kantor', `<div class="tw"><table class="t"><thead><tr><th>Kendaraan</th><th class="r">Trip</th><th class="r">Jarak</th><th class="r">BBM</th><th class="r">Tol & parkir</th></tr></thead><tbody>${R.mobil.map(x => `<tr><td>${esc(x.v.nama.replace('Daihatsu ', '').replace('Toyota ', ''))}<span class="s num">${x.v.plat}</span></td><td class="r num">${x.n}</td><td class="r num">${x.km} km</td><td class="r num">${rp(x.bbm)}</td><td class="r num">${rp(x.tolpk)}</td></tr>`).join('')}</tbody><tfoot><tr><td>Total</td><td class="r num">${sum(R.mobil, 'n')}</td><td class="r num">${sum(R.mobil, 'km')} km</td><td class="r num">${rp(sum(R.mobil, 'bbm'))}</td><td class="r num">${rp(sum(R.mobil, 'tolpk'))}</td></tr></tfoot></table></div>
    <div class="card-b" style="border-top:1px solid var(--line-2)">${kv('Mobil eksternal & transportasi umum', `${R.ext.length} trip · ${rp(R.ext.reduce((a, c) => a + (c.assign.biaya || 0), 0))}`)}</div>`, dl('mobil'))}
  ${card('Pemakaian ruang meeting', `<div class="tw"><table class="t"><thead><tr><th>Ruangan</th><th class="r">Booking</th><th class="r">Hangus</th><th class="r">Jam terpakai</th><th class="r">Utilisasi</th></tr></thead><tbody>${R.ruang.map(x => `<tr><td>${x.r.nama}<span class="s">${x.r.kap} orang</span></td><td class="r num">${x.n}</td><td class="r num">${x.hangus}</td><td class="r num">${x.jam.toLocaleString('id-ID', { maximumFractionDigits: 1 })} jam</td><td class="r num">${Math.round(x.util * 100)}%</td></tr>`).join('')}</tbody></table></div><div class="card-b muted" style="font-size:12px;border-top:1px solid var(--line-2)">Utilisasi = jam terpakai (sudah check-in) ÷ ${R.wd} hari kerja × 9 jam.</div>`, dl('ruang'))}
  </div>
  ${card('Pembelian aset per kategori', (() => { const rows = ASET_KAT.map(k => { const xs = S.aset.filter(a => a.kategori === k && a.no.includes('/' + ym.replace('-', '/') + '/')); return { k, n: xs.length, ok: xs.filter(a => !['menunggu_hcga', 'ditolak', 'dibatalkan'].includes(a.status)).length, done: xs.filter(a => a.status === 'selesai').length, nilai: xs.filter(a => a.beli).reduce((s, a) => s + a.beli.total, 0) }; }).filter(r => r.n); return rows.length ? `<div class="tw"><table class="t"><thead><tr><th>Kategori</th><th class="r">Pengajuan</th><th class="r">Disetujui</th><th class="r">Selesai</th><th class="r">Nilai dibeli</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r.k}</td><td class="r num">${r.n}</td><td class="r num">${r.ok}</td><td class="r num">${r.done}</td><td class="r num">${rp(r.nilai)}</td></tr>`).join('')}</tbody><tfoot><tr><td>Total</td><td class="r num">${sum(rows, 'n')}</td><td class="r num">${sum(rows, 'ok')}</td><td class="r num">${sum(rows, 'done')}</td><td class="r num">${rp(sum(rows, 'nilai'))}</td></tr></tfoot></table></div>` : empty('Tidak ada pengajuan aset di bulan ini.'); })(), dl('aset'), `diajukan di ${mLabel(ym)}`)}
  ${card('Approval tertunda', R.pend.length ? `<div class="tw"><table class="t"><thead><tr><th>Jenis</th><th>No.</th><th>Pemohon</th><th>Tahap</th><th class="r">Menunggu</th></tr></thead><tbody>${R.pend.map(x => `<tr class="click" data-href="${x.href}"><td><span class="tag">${x.jenis}</span></td><td class="num">${x.no}</td><td>${esc(x.siapa)}</td><td>${x.tahap}</td><td class="r num">${umurTxt(x.umur)}</td></tr>`).join('')}</tbody></table></div>` : empty('Tidak ada approval tertunda.'), dl('pend'), 'saat ini')}`;
}

/* ===== PENGATURAN ===== */
function vPengaturan(q) {
  const tab = q.tab || 'tarif';
  const tabs = `<div class="tabs"><a href="#/pengaturan?tab=tarif" class="${tab === 'tarif' ? 'on' : ''}">Tarif & kebijakan</a><a href="#/pengaturan?tab=karyawan" class="${tab === 'karyawan' ? 'on' : ''}">Karyawan & peran</a><a href="#/pengaturan?tab=peran" class="${tab === 'peran' ? 'on' : ''}">Hak akses peran</a><a href="#/pengaturan?tab=ruang" class="${tab === 'ruang' ? 'on' : ''}">Ruang meeting</a></div>`;
  let body = '';
  if (tab === 'tarif') {
    const num = (n, v) => `<input type="number" name="${n}" value="${v}" min="0" step="1000">`;
    body = `<form data-form="tarif">
    ${card('Daily allowance kategori A', `<div class="tw"><table class="t"><thead><tr><th>Posisi</th>${Object.values(WIL).map(w => `<th class="r">${w}</th>`).join('')}</tr></thead><tbody>${Object.entries(S.rateA).map(([p, r]) => `<tr><td><b>${p}</b></td>${Object.keys(WIL).map(k => `<td>${num(`A|${p}|${k}`, r[k])}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="card-b muted" style="font-size:12.5px">Berlaku untuk shooting di luar kota, event, seminar, atau awarding. Nominal per hari.</div>`)}
    ${card('Daily allowance kategori B', `<div class="tw"><table class="t"><thead><tr><th>Kategori</th><th>Kendaraan</th><th class="r">Transport</th><th class="r">Lunch</th></tr></thead><tbody>${S.rateB.map(b => `<tr><td>${esc(b.kategori)}</td><td>${esc(b.kendaraan)}</td><td>${num(`B|${b.id}|transport`, b.transport)}</td><td>${num(`B|${b.id}|lunch`, b.lunch)}</td></tr>`).join('')}</tbody></table></div><div class="card-b muted" style="font-size:12.5px">Berlaku untuk visit vendor, gudang, shooting di Bandung, meeting client. Nominal per hari kunjungan.</div>`)}
    ${card('Kelas transportasi berdasarkan zona', `<div class="tw"><table class="t"><thead><tr><th>Moda</th><th>Ketentuan</th>${Object.values(ZONA).map(z => `<th>${z}</th>`).join('')}</tr></thead><tbody>${S.zona.map((z, i) => `<tr><td><b>${z.moda}</b></td><td>${esc(z.ket)}</td>${['z1', 'z2', 'z3'].map(k => `<td><select name="Z|${i}|${k}" style="height:32px">${opts(['Ekonomi', 'Bisnis', 'Eksekutif'], z[k])}</select></td>`).join('')}</tr>`).join('')}</tbody></table></div>`)}
    <div class="form-foot"><button class="btn primary">Simpan perubahan tarif</button></div></form>`;
  }
  if (tab === 'karyawan') {
    const akunPill = a => a === 'aktif' ? '<span class="pill teal">Aktif</span>' : a === 'undangan' ? '<span class="pill amber">Undangan terkirim</span>' : a === 'menunggu' ? '<span class="pill amber">Menunggu persetujuan</span>' : '<span class="pill gray">Nonaktif</span>';
    const nA = S.users.filter(u => u.akun === 'aktif').length, nU = S.users.filter(u => u.akun === 'undangan').length;
    body = `<div class="alert info" style="margin-bottom:16px">Akun dibuat oleh Super Admin (satu per satu atau import Excel), sekaligus menentukan perannya. Karyawan menerima email undangan, membuat password sendiri, lalu bisa login. Karyawan juga bisa mendaftar sendiri dari halaman login (email kantor atau pribadi); pendaftar muncul di <a href="#/persetujuan?tab=akun">Persetujuan → Pendaftar akun</a>. Karyawan resign cukup dinonaktifkan.</div>` + fbar('users', { dept: true, ph: 'Cari nama atau email…' }) + card('Karyawan & akun', `<div class="tw"><table class="t"><thead><tr><th>Nama & email</th><th>Posisi</th><th class="hide-sm">Departemen</th><th>Level</th><th>Atasan (approver)</th><th>Peran</th><th>Akun</th><th></th></tr></thead><tbody>${S.users.map(u => `<tr><td><b>${esc(u.nama)}</b><span class="s">${esc(u.email || '')}</span></td><td><select data-act-change="user-posisi" data-id="${u.id}" style="height:32px;width:auto">${opts(['Head', 'Lead/Koor', 'Staff', 'Driver'], u.posisi)}</select></td><td class="hide-sm">${esc(u.dept)}</td><td><select data-act-change="user-level" data-id="${u.id}" style="height:32px;width:auto">${opts(LEVELS, u.level || 'Staff')}</select></td><td><select data-act-change="user-atasan" data-id="${u.id}" style="height:32px">${opts([['', '— (langsung HCGA)'], ...S.users.filter(x => x.id !== u.id && x.posisi !== 'Driver').map(x => [x.id, x.nama])], u.atasan || '')}</select></td><td><select data-act-change="user-role" data-id="${u.id}" style="height:32px;width:auto">${opts(Object.entries(ROLES), u.role)}</select></td><td>${akunPill(u.akun)}</td><td class="r"><div class="btns" style="justify-content:flex-end;flex-wrap:nowrap">${u.akun === 'undangan' ? `<button class="btn sm" data-act="invite-view" data-id="${u.id}">Lihat undangan</button>` : u.akun === 'aktif' ? (HCGA_IDS.includes(u.id) ? '' : `<button class="btn sm ghost" data-act="akun-off" data-id="${u.id}">Nonaktifkan</button>`) : `<button class="btn sm" data-act="akun-on" data-id="${u.id}">Aktifkan</button>`}</div></td></tr>`).join('')}</tbody></table></div>`, `<div class="btns"><button class="btn sm" data-act="user-import">${ic('dl')} Import Excel</button><button class="btn sm primary" data-act="user-add">${ic('plus')} Tambah</button></div>`, `${nA} aktif · ${nU} menunggu aktivasi`);
  }
  if (tab === 'peran') {
    const Y = '<span class="ok">✓</span>', N = '<span class="faint">–</span>', T = '<span class="muted" style="font-size:12px">tim sendiri</span>';
    const rows = [
      ['Mengajukan dinas, mobil, ruang, aset & training', Y, Y, Y, Y],
      ['Mengerjakan tugas LnD (onboarding, tes, reaction, 360°)', Y, Y, Y, Y],
      ['Menyetujui pengajuan dinas & training', N, T, N, N],
      ['Mentor onboarding & acc tugas onboarding', N, T, Y, Y],
      ['Melihat riwayat training & hasil 360°', N, T, Y, Y],
      ['Persetujuan HC (dinas, mobil, ruang, aset, training, piagam)', N, N, Y, Y],
      ['Proses operasional (tiket & CA, jadwalkan mobil, beli aset, armada)', N, N, Y, Y],
      ['Kelola onboarding, progres training, penilaian 360°, bank soal & template LnD', N, N, Y, Y],
      ['Dashboard modul & laporan', N, N, Y, Y],
      ['Kelola karyawan, akun & peran', N, N, N, Y],
      ['Ubah tarif, kebijakan & data ruang meeting', N, N, N, Y]
    ];
    body = `<div class="alert info" style="margin-bottom:16px">Peran diatur per karyawan di tab <a href="#/pengaturan?tab=karyawan">Karyawan & peran</a>. Persetujuan atasan selalu mengikuti kolom <b>Atasan</b> masing-masing karyawan. Driver memakai peran Karyawan dengan posisi Driver, dan otomatis mendapat tampilan Jadwal saya.</div>` + card('Hak akses per peran', `<div class="tw"><table class="t matrix"><thead><tr><th>Akses</th>${Object.values(ROLES).map(r => `<th class="c">${r}<span class="s">${S.users.filter(u => ROLES[u.role] === r).length} orang</span></th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr><td>${r[0]}</td>${r.slice(1).map(c => `<td class="c">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
  }
  if (tab === 'ruang') {
    body = card('Ruang meeting', `<div class="tw"><table class="t"><thead><tr><th>Ruangan</th><th class="r">Kapasitas</th><th>Fasilitas</th></tr></thead><tbody>${S.rooms.map(r => `<tr><td><b>${r.nama}</b></td><td class="r num">${r.kap} orang</td><td>${esc(r.fas)}</td></tr>`).join('')}</tbody></table></div><div class="card-b muted" style="font-size:12.5px">Aturan: approval HCGA · check-in dibuka 15 menit sebelum mulai · booking hangus jika tidak check-in 15 menit setelah mulai.</div>`);
  }
  return `<div class="page-head"><div><h1>Pengaturan</h1><p class="muted">Master data yang dipakai perhitungan otomatis.</p></div></div>${tabs}${body}`;
}

/* ===== LOGIN ===== */
function vLogin(q) {
  const demo = Object.entries(PERSONA).map(([k, id]) => `<button type="button" class="demo-acc" data-act="login-fill" data-email="${user(id).email}"><b>${PLABEL[k]}</b><span>${user(id).email}</span></button>`).join('');
  return `<div class="auth"><form class="authbox" data-form="login" novalidate><div class="authtop">${prefControls()}</div>
    <div class="lw" style="width:150px">${LOGO()}</div>
    <h1 style="margin-top:22px">Masuk</h1><p class="muted" style="margin:4px 0 20px">Momiasi HCS · Human Capital System</p>
    <div class="form"><div class="f"><label for="lemail">Email kantor</label><input type="email" id="lemail" name="email" placeholder="nama@momiasi.id" autocomplete="username"></div>
    <div class="f"><label for="lpass">Password</label><input type="password" id="lpass" name="password" autocomplete="current-password"></div>
    <div id="formErr"></div>
    <button class="btn primary" style="height:42px">Masuk</button>
    <a class="link" href="#" data-act="forgot" style="text-align:center">Lupa password?</a>
    <p class="muted" style="text-align:center;margin:4px 0 0;font-size:13px">Belum punya akun? <a class="link" href="#/daftar">Daftar di sini</a></p></div>
    <div class="demo-box"><div class="muted" style="font-size:12px;margin-bottom:6px">Akun demo prototype (password bebas):</div>${demo}</div>
  </form></div>`;
}
function vAktivasi(q) {
  const u = user(q.u);
  if (!u.id) return notFound();
  return `<div class="auth"><form class="authbox" data-form="aktivasi" data-id="${u.id}" novalidate>
    <div class="lw" style="width:150px">${LOGO()}</div>
    <h1 style="margin-top:22px">Aktifkan akun</h1><p class="muted" style="margin:4px 0 20px">Halo ${esc(u.nama.split(' ')[0])}, buat password untuk ${esc(u.email)}.</p>
    <div class="form"><div class="f"><label>Password baru</label><input type="password" name="p1" autocomplete="new-password"><span class="hint">Minimal 8 karakter.</span></div>
    <div class="f"><label>Ulangi password</label><input type="password" name="p2" autocomplete="new-password"></div>
    <div id="formErr"></div>
    <button class="btn primary" style="height:42px">Aktifkan & masuk</button></div>
  </form></div>`;
}

function vSoon(k) {
  const info = {
    ta: { d: 'Proses rekrutmen dari permintaan karyawan baru sampai onboarding.', ide: ['Permintaan tambahan karyawan (manpower request) dengan approval', 'Lowongan & database kandidat', 'Jadwal interview & penilaian interviewer', 'Offering letter', 'Checklist onboarding karyawan baru'] },
    lnd: { d: 'Pengembangan kompetensi karyawan: training, sertifikasi, dan evaluasinya.', ide: ['Rencana training tahunan & budget', 'Pengajuan training / sertifikasi eksternal dengan approval', 'Jadwal & absensi training internal', 'Evaluasi training & feedback peserta', 'Riwayat training per karyawan'] }
  }[k];
  return `<div class="page-head"><div><div class="eyebrow">${GROUPS[k]}</div><h1>${GROUPS[k]}</h1><p class="muted">${info.d}</p></div><span class="pill gray">Segera hadir</span></div>
  ${card('Modul ini sedang disiapkan', `<div class="card-b"><p style="margin:0 0 12px">Submodul ${GROUPS[k]} akan dirancang di tahap berikutnya. Berikut usulan awal untuk didiskusikan:</p><ul class="soon">${info.ide.map(x => `<li>${x}</li>`).join('')}</ul></div>`)}`;
}

/* ===== pendaftaran mandiri ===== */
const regPending = () => S.users.filter(u => u.akun === 'menunggu').sort((a, b) => (a.daftarAt || 0) - (b.daftarAt || 0));
function regTable() {
  const L = regPending();
  if (!L.length) return empty('Tidak ada pendaftar yang menunggu.');
  return `<div class="tw"><table class="t"><thead><tr><th>Nama & email</th><th>Company</th><th>Divisi & jabatan</th><th class="hide-sm">WhatsApp</th><th class="hide-sm">Mendaftar</th><th></th></tr></thead><tbody>${L.map(u => `<tr><td><b>${esc(u.nama)}</b><span class="s">${esc(u.email)}</span></td><td>${esc(u.company || '–')}</td><td>${esc(u.dept || '–')}<span class="s">${esc(u.jabatan || '–')}</span></td><td class="hide-sm num">${esc(u.hp || '–')}</td><td class="hide-sm num">${u.daftarAt ? fdt(u.daftarAt) : '–'}</td><td class="r"><div class="btns" style="justify-content:flex-end;flex-wrap:nowrap"><button class="btn sm danger" data-act="reg-reject" data-id="${u.id}">Tolak</button><button class="btn sm primary" data-act="reg-approve" data-id="${u.id}">Setujui</button></div></td></tr>`).join('')}</tbody></table></div>
  <div class="card-b muted" style="font-size:12.5px">Pendaftaran terbuka untuk email apa pun (termasuk Gmail), jadi pastikan pendaftar memang karyawan Momiasi: cek nama, divisi & no. WhatsApp sebelum menyetujui. Saat menyetujui, tentukan atasan (approver) dan level supaya alur persetujuan berjalan benar.</div>`;
}
function vDaftar() {
  return `<div class="auth"><form class="authbox" data-form="daftar" novalidate><div class="authtop">${prefControls()}</div>
    <div class="lw" style="width:150px">${LOGO()}</div>
    <h1 style="margin-top:22px">Daftar akun</h1><p class="muted" style="margin:4px 0 20px">Untuk karyawan Momiasi yang belum punya akun. Akun aktif setelah disetujui HC.</p>
    <div class="form"><div class="f"><label>Nama lengkap</label><input type="text" name="nama" autocomplete="name" required></div>
    <div class="f"><label>Email</label><input type="email" name="email" placeholder="nama@momiasi.id atau nama@gmail.com" autocomplete="username" required><span class="hint">Boleh email kantor atau email pribadi (Gmail, dll). Email ini dipakai untuk masuk.</span></div>
    <div class="f"><label>No. WhatsApp</label><input type="tel" name="hp" placeholder="08xxxxxxxxxx" autocomplete="tel"></div>
    <div class="fgrid"><div class="f"><label>Company</label><select name="company">${opts(COMPANIES)}</select></div><div class="f"><label>Divisi</label><select name="dept">${opts(DIVISI)}</select></div></div>
    <div class="f"><label>Jabatan</label><input type="text" name="jabatan" placeholder="mis. Content Writer" required></div>
    <div class="f"><label>Password</label><input type="password" name="p1" autocomplete="new-password"><span class="hint">Minimal 8 karakter.</span></div>
    <div class="f"><label>Ulangi password</label><input type="password" name="p2" autocomplete="new-password"></div>
    <div id="formErr"></div>
    <button class="btn primary" style="height:42px">Kirim pendaftaran</button>
    <a class="link" href="#/login" style="text-align:center">Sudah punya akun? Masuk</a></div></form></div>`;
}
function vDaftarSent() {
  return `<div class="auth"><div class="authbox"><div class="lw" style="width:150px">${LOGO()}</div>
    <h1 style="margin-top:22px">Pendaftaran terkirim</h1><p class="muted" style="margin:6px 0 18px">Tim HC akan memeriksa data Anda. Setelah disetujui, Anda bisa masuk memakai email dan password yang baru dibuat.</p>
    <a class="btn" href="#/login">Ke halaman masuk</a></div></div>`;
}

function notFound() { return `<div class="page-head"><h1>Halaman tidak ditemukan</h1></div><a class="btn" href="#/">Kembali ke beranda</a>`; }
function noAccess() { return `<div class="page-head"><div><h1>Tidak ada akses</h1><p class="muted">Halaman ini tidak tersedia untuk peran ${PLABEL[S.persona]}.</p></div></div><a class="btn" href="#/">Kembali ke beranda</a>`; }

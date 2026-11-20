/* ===== shell ===== */
function parse() {
  const h = (IS_ARTIFACT ? ROUTE : location.hash).slice(1) || '/';
  const [path, qs] = h.split('?');
  return { parts: path.split('/').filter(Boolean), q: Object.fromEntries(new URLSearchParams(qs || '')) };
}
function navHtml(cur, counts) {
  let last = undefined, h = '';
  NAV[S.persona].forEach(([k, l, i, g]) => {
    if (g !== last && g) h += `<div class="ngroup">${GROUPS[g]}</div>`;
    if (g !== last && !g && last) h += `<div class="ngap"></div>`;
    last = g;
    const lc = k === 'lnd-tugas' ? lndTaskCount() + taTasks().length : 0;
    h += `<a href="#/${k}" class="${cur === k ? 'on' : ''} ${SOON.includes(k) ? 'soonl' : ''}">${ic(i)}<span>${SOON.includes(k) ? 'Submodul segera hadir' : l}</span>${k === 'persetujuan' && counts ? `<span class="cnt">${counts}</span>` : ''}${lc ? `<span class="cnt">${lc}</span>` : ''}</a>`;
  });
  return h;
}
function renderShell(cur, title) {
  $('#prefs').innerHTML = prefControls();
  const u = me(), cnt = pendingCount();
  $('#nav').innerHTML = navHtml(cur, cnt);
  $('#who').innerHTML = `<span class="av">${initials(u.nama)}</span><span class="who"><b>${esc(u.nama)}</b><span>${esc(u.jabatan)}</span></span><button class="ibtn" data-act="logout" title="Keluar" aria-label="Keluar" style="margin-left:auto">${ic('logout')}</button>`;
  const g = (NAV_ALL[cur] && NAV_ALL[cur][2]) || (['onb', 'l360', 'n360', 'tes', 'reaction', 'lnd-karyawan'].includes(cur) ? 'lnd' : ['fpk', 'kandidat', 'review', 'hrscore', 'uif', 'pfb', 'ecr', 'self', 'perf'].includes(cur) ? 'ta' : null);
  $('#ttl').innerHTML = g && g !== 'sys' && !SOON.includes(cur) ? `<span class="muted" style="font-weight:500">${GROUPS[g]}</span> <span class="faint">/</span> ${esc(title)}` : esc(title);
  const items = NAV[S.persona].filter(x => !SOON.includes(x[0]) && !DASH.includes(x[0]));
  let b = '';
  if (items.length > 1) {
    const vis = items.length > 4 && NAV[S.persona].length > 5 ? items.slice(0, 4) : items;
    b = vis.map(([k, l, i]) => `<a href="#/${k}" class="${cur === k ? 'on' : ''}">${ic(i)}<span>${l.split(' ')[0] === 'Booking' ? l.split(' ')[1][0].toUpperCase() + l.split(' ')[1].slice(1) : l.split(' ')[0] === 'Perjalanan' ? 'Dinas' : l.split(' ')[0] === 'Ruang' ? 'Ruang' : l.split(' ')[0] === 'Pembelian' ? 'Aset' : l.split(' ')[0]}</span>${k === 'persetujuan' && cnt ? `<span class="cnt">${cnt}</span>` : ''}</a>`).join('');
    if (items.length > 5 || NAV[S.persona].length > items.length) b += `<button data-act="more" class="${items.slice(4).some(x => x[0] === cur) || SOON.includes(cur) ? 'on' : ''}">${ic('more')}<span>Lainnya</span></button>`;
  }
  $('#bnav').innerHTML = b;
  $('#bnav').style.display = b ? '' : 'none';
  $('#drawerNav').innerHTML = navHtml(cur, cnt);
  const un = S.notifs.filter(n => n.userId === u.id && !n.read).length;
  $('#bellDot').innerHTML = un ? `<span class="dot">${un}</span>` : '';
  $('#persona').value = S.persona;
}

const TITLES = { beranda: 'Beranda', dinas: 'Perjalanan dinas', mobil: 'Booking mobil', ruang: 'Ruang meeting', persetujuan: 'Persetujuan', jadwal: 'Jadwal saya', armada: 'Armada & driver', laporan: 'Laporan', pengaturan: 'Pengaturan', aset: 'Pembelian aset', 'ta-fpk': 'Permintaan karyawan', fpk: 'FPK', 'ta-kandidat': 'Kandidat', kandidat: 'Kandidat', 'ta-jadwal': 'Jadwal interview', 'ta-kontrak': 'Probation & kontrak', review: 'Probation & kontrak', 'ta-set': 'Pengaturan TA', hrscore: 'Interview HR', uif: 'User Interview Feedback', pfb: 'Probation feedback', ecr: 'Contract review', self: 'Self-reflection', perf: 'Performance review', 'lnd-tugas': 'Tugas saya', training: 'Pengajuan training', 'lnd-tim': 'Tim saya', 'lnd-onb': 'Onboarding', onb: 'Onboarding', 'lnd-training': 'Progres training', 'lnd-360': 'Penilaian 360°', l360: 'Penilaian 360°', n360: 'Penilaian 360°', 'lnd-riwayat': 'Riwayat training', 'lnd-karyawan': 'Riwayat training', 'lnd-set': 'Pengaturan LnD', tes: 'Tes', reaction: 'Form reaction', 'dash-ga': 'Dashboard', 'dash-ta': 'Dashboard', 'dash-lnd': 'Dashboard', ta: 'Talent Acquisition', lnd: 'Learning & Development' };
let layarTimer = null;

function render() {
  const { parts, q } = parse();
  const home = S.persona === 'driver' ? 'jadwal' : 'beranda';
  const p0 = parts[0] || home, p1 = parts[1];
  clearInterval(layarTimer);
  closePanels();
  $('#persona').value = S.persona;
  if (!S.loggedIn && !['login', 'aktivasi', 'layar', 'daftar'].includes(p0)) { if (IS_ARTIFACT) { ROUTE = '#/login'; render(); } else location.replace('#/login'); return; }
  if (p0 === 'login' || p0 === 'aktivasi' || p0 === 'daftar') {
    document.body.classList.add('bare');
    $('#bare').innerHTML = p0 === 'login' ? vLogin(q) : p0 === 'daftar' ? (p1 === 'terkirim' ? vDaftarSent() : vDaftar()) : vAktivasi(q);
    document.title = (p0 === 'daftar' ? 'Daftar' : 'Masuk') + ' · Momiasi HCS';
    return;
  }
  if (['sppd', 'layar', 'piagam', 'konfirmasi', 'offer', 'pr'].includes(p0)) {
    document.body.classList.add('bare');
    $('#bare').innerHTML = p0 === 'sppd' ? vSPPD(p1) : p0 === 'piagam' ? vPiagam(p1, parts[2]) : p0 === 'konfirmasi' ? vKonfirmasi(p1, parts[2]) : p0 === 'offer' ? vOffer(p1) : p0 === 'pr' ? vPR(p1) : vLayar(p1);
    if (p0 === 'layar') layarTimer = setInterval(() => { if (parse().parts[0] === 'layar') $('#bare').innerHTML = vLayar(p1); }, 20000);
    document.title = ({ sppd: 'SPPD', piagam: 'Piagam', konfirmasi: 'Konfirmasi interview', offer: 'Offering letter', pr: 'Performance review', layar: 'Layar ruang' })[p0] + ' · Momiasi HCS';
    window.scrollTo(0, 0);
    return;
  }
  document.body.classList.remove('bare');
  const allowed = NAV[S.persona].map(x => x[0]);
  const detailOk = { dinas: S.persona !== 'driver', mobil: true, ruang: S.persona !== 'driver', aset: S.persona !== 'driver', training: S.persona !== 'driver', onb: true, l360: true, n360: true, tes: true, reaction: true, 'lnd-karyawan': true, 'lnd-onb': false };
  const freeRoute = ['onb', 'l360', 'n360', 'tes', 'reaction', 'lnd-karyawan', 'fpk', 'kandidat', 'review', 'hrscore', 'uif', 'pfb', 'ecr', 'self', 'perf'];
  let html;
  if (!allowed.includes(p0) && !(p1 && detailOk[p0]) && !(freeRoute.includes(p0) && p1)) html = noAccess();
  else if (p0 === 'beranda') html = vBeranda();
  else if (p0 === 'dinas') html = p1 === 'baru' ? vDinasForm() : p1 ? vDinasDetail(p1) : vDinasList(q);
  else if (p0 === 'mobil') html = p1 === 'baru' ? vMobilForm() : p1 ? vMobilDetail(p1) : vMobilList(q);
  else if (p0 === 'ruang') html = p1 === 'baru' ? vRuangForm(q) : p1 ? vRuangDetail(p1) : vRuang(q);
  else if (p0 === 'persetujuan') html = vPersetujuan(q);
  else if (p0 === 'jadwal') html = vJadwal();
  else if (p0 === 'armada') html = vArmada();
  else if (p0 === 'laporan') html = vLaporan(q);
  else if (p0 === 'pengaturan') html = vPengaturan(q);
  else if (SOON.includes(p0)) html = vSoon(p0);
  else if (p0 === 'dash-ga') html = vDashGA();
  else if (p0 === 'dash-ta') html = vDashTAReal();
  else if (p0 === 'ta-fpk') html = vFpkList(q);
  else if (p0 === 'fpk') html = p1 === 'baru' ? vFpkForm() : vFpkDetail(p1);
  else if (p0 === 'ta-kandidat') html = vCandList(q);
  else if (p0 === 'kandidat') html = vCandDetail(p1);
  else if (p0 === 'ta-jadwal') html = vTaJadwal();
  else if (p0 === 'ta-kontrak') html = vTaKontrak(q);
  else if (p0 === 'ta-set') html = vTaSet();
  else if (p0 === 'review') html = vReview(p1);
  else if (p0 === 'hrscore') html = vHrScore(p1);
  else if (p0 === 'uif') html = vUif(p1);
  else if (p0 === 'pfb') html = vPfb(p1);
  else if (p0 === 'ecr') html = vEcr(p1);
  else if (p0 === 'self') html = vSelf(p1);
  else if (p0 === 'perf') html = vPerf(p1);
  else if (p0 === 'dash-lnd') html = vDashLndReal();
  else if (p0 === 'lnd-tugas') html = vLndTugas();
  else if (p0 === 'training') html = p1 === 'baru' ? (TR_PESERTA = [], vTrainingForm()) : p1 ? vTrainingDetail(p1) : vTrainingList(q);
  else if (p0 === 'lnd-tim') html = vLndRiwayat('tim');
  else if (p0 === 'lnd-onb') html = vLndOnb();
  else if (p0 === 'onb') html = vOnbDetail(p1);
  else if (p0 === 'lnd-training') html = vLndTraining(q);
  else if (p0 === 'lnd-360') html = vLnd360();
  else if (p0 === 'l360') html = p1 === 'baru' ? vL360New(q) : vL360Report(p1);
  else if (p0 === 'n360') html = vN360(p1);
  else if (p0 === 'lnd-riwayat') html = vLndRiwayat('all');
  else if (p0 === 'lnd-karyawan') html = vLndKaryawan(p1);
  else if (p0 === 'lnd-set') html = vLndSet(q);
  else if (p0 === 'tes') html = vTes(p1, parts[2]);
  else if (p0 === 'reaction') html = vReaction(p1);
  else if (p0 === 'aset') html = p1 === 'baru' ? vAsetForm() : p1 ? vAsetDetail(p1) : vAsetList(q);
  else html = notFound();
  renderShell(p0, TITLES[p0] || '');
  $('#view').innerHTML = html;
  document.title = `${TITLES[p0] || 'Beranda'} · Momiasi HCS`;
  const live = $('#view form[data-live]');
  if (live) LIVE[live.dataset.live] && LIVE[live.dataset.live](live);
  initMaps();
  setupFilter();
}
function go(h) { if (IS_ARTIFACT) { ROUTE = h; render(); window.scrollTo(0, 0); return; } if (location.hash === h) render(); else location.hash = h; }
function rerender() { save(); const y = window.scrollY; render(); window.scrollTo(0, y); }

/* ===== filter & search (semua daftar) ===== */
const FSTATE = {};
function fbar(key, o = {}) {
  const st = FSTATE[key] || {};
  return `<div class="fbar" data-fkey="${key}"><label class="fsearch">${ic('search')}<input type="search" id="fq" placeholder="${o.ph || 'Cari nama, nomor, tujuan…'}" value="${esc(st.q || '')}" aria-label="Cari"></label>${o.status === false ? '' : `<select id="fst" aria-label="Filter status"><option value="">Semua status</option></select>`}${o.dept ? `<select id="fdept" aria-label="Filter divisi">${opts([['', 'Semua divisi'], ...DIVISI.map(x => [x, x])], st.dept || '')}</select>` : ''}<span class="fcount muted" id="fcount"></span></div>`;
}
function filterRows(bar) { return [...$('#view').querySelectorAll('tbody tr, .list > .row, .fi')].filter(r => (bar.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING) && !r.closest('.fi .fi') && !(r.closest('.fi') && r.closest('.fi') !== r)); }
function setupFilter() {
  const bar = $('#view .fbar'); if (!bar) return;
  const st = FSTATE[bar.dataset.fkey] || {}, sel = $('#fst');
  if (sel) { const vals = [...new Set(filterRows(bar).flatMap(r => [...r.querySelectorAll('.pill')].map(p => p.textContent.trim())))].filter(Boolean).sort(); sel.insertAdjacentHTML('beforeend', vals.map(v => `<option ${v === st.status ? 'selected' : ''}>${esc(v)}</option>`).join('')); }
  applyFilter();
}
function applyFilter() {
  const bar = $('#view .fbar'); if (!bar) return;
  const st = FSTATE[bar.dataset.fkey] = { q: ($('#fq') || {}).value || '', status: ($('#fst') || {}).value || '', dept: ($('#fdept') || {}).value || '' };
  const words = st.q.toLowerCase().split(/\s+/).filter(Boolean), rows = filterRows(bar); let n = 0;
  rows.forEach(r => { const tx = r.textContent.toLowerCase(); const ok = words.every(w => tx.includes(w)) && (!st.status || [...r.querySelectorAll('.pill')].some(p => p.textContent.trim() === st.status)) && (!st.dept || r.textContent.includes(st.dept)); r.hidden = !ok; if (ok) n++; });
  const any = st.q || st.status || st.dept;
  $('#fcount').textContent = any ? `${n} dari ${rows.length} ditampilkan` : `${rows.length} data`;
  $('#view').querySelectorAll('.fnone').forEach(x => x.remove());
  if (any && !n) bar.insertAdjacentHTML('afterend', `<div class="fnone">Tidak ada data yang cocok. <button class="btn sm" data-act="freset">Hapus filter</button></div>`);
}

/* ===== feedback ===== */
let toastT;
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2800); }
let modalCb = null;
function modal(title, body, ok, cb, danger) {
  $('#modal').innerHTML = `<div class="mback" data-act="mclose"></div><form class="mbox" data-form="modal" novalidate><div class="mh"><h3>${title}</h3><button type="button" class="ibtn" data-act="mclose" aria-label="Tutup">${ic('x')}</button></div><div class="mb">${body}</div><div class="mf"><button type="button" class="btn" data-act="mclose">Batal</button><button class="btn ${danger ? 'danger-solid' : 'primary'}">${ok}</button></div></form>`;
  $('#modal').classList.add('open');
  modalCb = cb;
  setTimeout(() => { const f = $('#modal [autofocus]') || $('#modal input,#modal textarea'); f && f.focus(); }, 30);
}
function closeModal() { $('#modal').classList.remove('open'); $('#modal').innerHTML = ''; modalCb = null; }
function closePanels() { $('#npanel').classList.remove('open'); $('#drawer').classList.remove('open'); }
const noteField = (lbl, req) => `<div class="f"><label>${lbl}</label><textarea name="note" ${req ? 'required' : ''} placeholder="${req ? 'Wajib diisi' : 'Opsional'}"></textarea></div>`;

/* ===== actions ===== */
const T = id => S.trips.find(x => x.id === id);
const C = id => S.cars.find(x => x.id === id);
const B = id => S.roomb.find(x => x.id === id);

const ACT = {
  mclose: closeModal,
  print: () => IS_ARTIFACT ? toast(NO_FILE_MSG) : window.print(),
  more: () => $('#drawer').classList.add('open'),
  'mclose-drawer': () => $('#drawer').classList.remove('open'),
  bell: () => {
    const u = me(), list = S.notifs.filter(n => n.userId === u.id).slice(0, 15);
    $('#nlist').innerHTML = list.length ? list.map(n => `<a href="${n.link}" class="${n.read ? '' : 'unread'}" data-nid="${n.id}">${esc(n.text)}<small>${fdt(n.t)}</small></a>`).join('') : empty('Belum ada notifikasi.');
    $('#npanel').classList.toggle('open');
  },
  readall: () => { S.notifs.forEach(n => { if (n.userId === me().id) n.read = true; }); save(); renderShell(parse().parts[0] || 'beranda', $('#ttl').textContent); ACT.bell(); ACT.bell(); },
  reset: () => modal('Reset data contoh?', '<p style="margin:0">Semua perubahan yang Anda buat di prototype akan dihapus dan kembali ke data awal.</p>', 'Reset', () => { S = seed(); save(); go('#/'); toast('Data contoh dikembalikan'); }, true),

  'trip-approve': d => {
    const t = T(d.id);
    modal('Setujui perjalanan dinas?', `<p style="margin:0">${esc(user(t.userId).nama)} · ${esc(t.tujuan)} · ${range(t.berangkat, t.pulang)} · CA ${rp(t.ca)}</p>${noteField('Catatan')}`, 'Setujui', fd => {
      addLog(t, 'Menyetujui', fd.get('note'));
      if (t.status === 'menunggu_atasan') { t.status = 'menunggu_hcga'; notifyHCGA(`${user(t.userId).nama} · dinas ke ${t.tujuan} menunggu persetujuan HCGA`, `#/dinas/${t.id}`); notify(t.userId, `Dinas ke ${t.tujuan} disetujui atasan, diteruskan ke HCGA`, `#/dinas/${t.id}`); }
      else { t.status = 'pemesanan'; notify(t.userId, `Dinas ke ${t.tujuan} disetujui HCGA. Tiket & CA sedang diproses.`, `#/dinas/${t.id}`); }
      rerender(); toast('Pengajuan disetujui');
    });
  },
  'trip-reject': d => {
    const t = T(d.id);
    modal('Tolak perjalanan dinas?', noteField('Alasan penolakan', true), 'Tolak', fd => {
      if (!fd.get('note').trim()) { toast('Alasan penolakan wajib diisi'); return false; }
      t.rejectedAt = t.status === 'menunggu_atasan' ? 'atasan' : 'hcga';
      t.status = 'ditolak'; addLog(t, 'Menolak', fd.get('note'));
      notify(t.userId, `Dinas ke ${t.tujuan} ditolak: ${fd.get('note')}`, `#/dinas/${t.id}`);
      rerender(); toast('Pengajuan ditolak');
    }, true);
  },
  'trip-cancel': d => {
    const t = T(d.id);
    modal('Batalkan pengajuan?', '<p style="margin:0">Pengajuan akan ditarik dan tidak diproses lagi.</p>', 'Batalkan pengajuan', () => { t.status = 'dibatalkan'; addLog(t, 'Membatalkan'); rerender(); toast('Pengajuan dibatalkan'); }, true);
  },
  'settle-open': d => { $('#settleSlot').innerHTML = settleForm(T(d.id)); liveSettle($('#settleForm')); $('#settleSlot').scrollIntoView({ behavior: 'smooth', block: 'start' }); },
  'settle-close': () => { $('#settleSlot').innerHTML = ''; },
  'settle-add': () => { $('#sRows').insertAdjacentHTML('beforeend', settleRowHtml({ ket: '', nominal: '', bukti: '' })); $('#sRows tr:last-child input').focus(); },
  'settle-del': (d, el) => { el.closest('tr').remove(); liveSettle($('#settleForm')); },
  'settle-verify': d => {
    const t = T(d.id), diff = t.ca - settleTotal(t);
    modal('Verifikasi settlement?', `<p style="margin:0">${diff > 0 ? `Pastikan karyawan sudah mengembalikan <b>${rp(diff)}</b>.` : diff < 0 ? `Kekurangan <b>${rp(-diff)}</b> akan dibayarkan ke karyawan.` : 'Realisasi sama dengan CA.'}</p>`, 'Verifikasi & selesaikan', () => {
      t.status = 'selesai'; t.settlement.verifiedAt = Date.now(); addLog(t, 'Memverifikasi settlement');
      notify(t.userId, `Settlement ${t.no} sudah diverifikasi`, `#/dinas/${t.id}`); rerender(); toast('Settlement diverifikasi');
    });
  },
  'settle-revise': d => {
    const t = T(d.id);
    modal('Minta revisi settlement', noteField('Yang perlu diperbaiki', true), 'Kirim', fd => {
      if (!fd.get('note').trim()) { toast('Catatan wajib diisi'); return false; }
      t.status = 'siap'; addLog(t, 'Meminta revisi settlement', fd.get('note'));
      notify(t.userId, `Settlement ${t.no} perlu direvisi: ${fd.get('note')}`, `#/dinas/${t.id}`); rerender(); toast('Dikembalikan ke karyawan');
    });
  },

  'car-reject': d => {
    const c = C(d.id);
    modal('Tolak booking mobil?', noteField('Alasan', true), 'Tolak', fd => {
      if (!fd.get('note').trim()) { toast('Alasan wajib diisi'); return false; }
      c.status = 'ditolak'; addLog(c, 'Menolak', fd.get('note')); notify(c.userId, `Booking mobil ke ${c.tujuan} ditolak`, `#/mobil/${c.id}`); rerender(); toast('Booking ditolak');
    }, true);
  },
  'car-cancel': d => { const c = C(d.id); modal('Batalkan booking mobil?', '<p style="margin:0">Mobil & driver akan dilepas untuk permintaan lain.</p>', 'Batalkan', () => { c.status = 'dibatalkan'; addLog(c, 'Membatalkan'); if (c.assign?.driverId) notify(c.assign.driverId, `Tugas ke ${c.tujuan} dibatalkan`, '#/jadwal'); rerender(); toast('Booking dibatalkan'); }, true); },
  'car-accept': d => {
    const c = C(d.id); c.status = 'dijadwalkan'; addLog(c, 'Menerima jadwal');
    notify(c.userId, `Driver ${me().nama.split(' ')[0]} siap mengantar ke ${c.tujuan}, ${relDay(c.tanggal).toLowerCase()} ${jam(c.mulai)}`, `#/mobil/${c.id}`);
    notifyHCGA(`${me().nama} menerima jadwal ${c.no}`, `#/mobil/${c.id}`); rerender(); toast('Jadwal diterima');
  },
  'car-decline': d => {
    const c = C(d.id);
    modal('Tolak jadwal menyetir?', noteField('Alasan', true), 'Tolak jadwal', fd => {
      if (!fd.get('note').trim()) { toast('Alasan wajib diisi'); return false; }
      addLog(c, 'Menolak jadwal', fd.get('note'));
      c.status = 'menunggu_hcga'; c.declined = (c.declined || []).concat(me().id); c.assign = null;
      notifyHCGA(`${me().nama} menolak jadwal ${c.no}: ${fd.get('note')}. Pilih driver lain.`, `#/mobil/${c.id}`);
      rerender(); toast('Jadwal ditolak, dikembalikan ke HCGA');
    }, true);
  },
  'car-start': d => {
    const c = C(d.id), v = veh(c.assign.vehicleId);
    modal('Mulai perjalanan', `<div class="f"><label>Odometer awal (km)</label><input type="number" name="odo" value="${v.odo}" min="0" inputmode="numeric" autofocus></div>`, 'Mulai', fd => {
      c.status = 'berjalan'; c.trip = { odoStart: +fd.get('odo') || v.odo, startAt: Date.now() }; addLog(c, 'Memulai perjalanan');
      if (c.assign.driverId && c.userId !== me().id) notify(c.userId, `Driver ${user(c.assign.driverId).nama.split(' ')[0]} sudah berangkat ke ${c.tujuan}`, `#/mobil/${c.id}`); rerender(); toast('Perjalanan dimulai');
    });
  },
  'car-finish': d => {
    const c = C(d.id);
    modal('Selesaikan perjalanan', `<div class="fgrid"><div class="f full"><label>Odometer akhir (km)</label><input type="number" name="odo" min="${c.trip.odoStart}" value="${c.trip.odoStart}" inputmode="numeric" autofocus><span class="hint">Odometer awal ${c.trip.odoStart.toLocaleString('id-ID')} km</span></div>
      <div class="f"><label>BBM (Rp)</label><input type="number" name="bbm" min="0" step="1000" value="0"></div><div class="f"><label>Tol (Rp)</label><input type="number" name="tol" min="0" step="1000" value="0"></div><div class="f"><label>Parkir (Rp)</label><input type="number" name="parkir" min="0" step="1000" value="0"></div><div class="f"><label>Foto struk</label><input type="file" name="struk" accept="image/*" multiple></div></div>`, 'Selesai', fd => {
      const end = +fd.get('odo');
      if (end < c.trip.odoStart) { toast('Odometer akhir lebih kecil dari awal'); return false; }
      Object.assign(c.trip, { odoEnd: end, bbm: +fd.get('bbm') || 0, tol: +fd.get('tol') || 0, parkir: +fd.get('parkir') || 0, endAt: Date.now() });
      c.status = 'selesai'; veh(c.assign.vehicleId).odo = end; addLog(c, 'Menyelesaikan perjalanan', `${end - c.trip.odoStart} km`);
      rerender(); toast('Perjalanan selesai dicatat');
    });
  },

  slot: d => go(`#/ruang/baru?room=${d.room}&date=${d.date}&start=${d.start}`),
  'room-approve': d => {
    const b = B(d.id), c = roomConflicts(b.roomId, b.tanggal, b.mulai, b.selesai, b.id).filter(x => x.status === 'disetujui');
    if (c.length) { toast(`Bentrok dengan "${c[0].judul}". Tolak atau minta ganti jam.`); return; }
    b.status = 'disetujui'; addLog(b, 'Menyetujui' + (b.konsumsi.jenis !== 'none' ? ' & konfirmasi konsumsi' : ''));
    notify(b.userId, `Booking ${room(b.roomId).nama} "${b.judul}" disetujui${b.gcal ? ', undangan Google Calendar terkirim' : ''}`, `#/ruang/${b.id}`);
    rerender(); toast('Booking ruang disetujui');
  },
  'room-reject': d => {
    const b = B(d.id);
    modal('Tolak booking ruang?', noteField('Alasan', true), 'Tolak', fd => {
      if (!fd.get('note').trim()) { toast('Alasan wajib diisi'); return false; }
      b.status = 'ditolak'; addLog(b, 'Menolak', fd.get('note')); notify(b.userId, `Booking ruang "${b.judul}" ditolak: ${fd.get('note')}`, `#/ruang/${b.id}`); rerender(); toast('Booking ditolak');
    }, true);
  },
  'room-checkin': d => { const b = B(d.id); b.checkinAt = Date.now(); addLog(b, 'Check-in'); rerender(); toast(`Check-in berhasil · ${room(b.roomId).nama}`); },
  'room-cancel': d => { const b = B(d.id); modal('Batalkan booking ruang?', '<p style="margin:0">Slot akan dilepas untuk orang lain.</p>', 'Batalkan', () => { b.status = 'dibatalkan'; addLog(b, 'Membatalkan'); rerender(); toast('Booking dibatalkan'); }, true); },

  'deleg-clear': () => { S.delegasi = null; rerender(); toast('Delegasi dihapus'); },
  'veh-add': () => modal('Tambah kendaraan', `<div class="fgrid"><div class="f full"><label>Nama / model</label><input type="text" name="nama" placeholder="mis. Toyota Avanza" autofocus required></div><div class="f"><label>Plat nomor</label><input type="text" name="plat" placeholder="B 1234 ABC" required></div><div class="f"><label>Kursi penumpang</label><input type="number" name="kursi" value="6" min="1"></div><div class="f"><label>Odometer (km)</label><input type="number" name="odo" value="0" min="0"></div><div class="f"><label>Servis berikut</label><input type="date" name="servis"></div><div class="f"><label>Pajak STNK</label><input type="date" name="pajak"></div><div class="f"><label>Uji KIR</label><input type="date" name="kir"></div></div>`, 'Simpan', fd => {
    if (!fd.get('nama').trim() || !fd.get('plat').trim()) { toast('Nama dan plat wajib diisi'); return false; }
    S.vehicles.push({ id: 'v' + uid(), nama: fd.get('nama').trim(), plat: fd.get('plat').trim().toUpperCase(), kursi: +fd.get('kursi') || 1, odo: +fd.get('odo') || 0, servis: fd.get('servis'), pajak: fd.get('pajak'), kir: fd.get('kir') });
    rerender(); toast('Kendaraan ditambahkan');
  }),
  csv: d => exportCsv(d.k, d.m),
  freset: () => { const bar = $('#view .fbar'); if (bar) delete FSTATE[bar.dataset.fkey]; rerender(); },
  theme: () => { THEME = THEME_NEXT[THEME]; setPref('hcs-theme', THEME); applyTheme(); rerender(); toast(THEME_LABEL[THEME][LANG === 'en' ? 1 : 0]); },
  lang: () => { LANG = LANG === 'en' ? 'id' : 'en'; setPref('hcs-lang', LANG); applyLang(); rerender(); },
  logout: () => { S.loggedIn = false; save(); go('#/login'); },
  'login-fill': d => { $('#lemail').value = d.email; $('#lpass').value = 'demo1234'; $('#lpass').focus(); },
  forgot: () => modal('Lupa password', `<p style="margin:0">Masukkan email kantor. Link untuk membuat password baru akan dikirim ke email tersebut.</p><div class="f"><label>Email</label><input type="email" name="email" placeholder="nama@momiasi.id" autofocus></div>`, 'Kirim link', () => toast('Link reset password terkirim (simulasi)')),
  'akun-off': d => { const u = user(d.id); modal(`Nonaktifkan akun ${esc(u.nama)}?`, '<p style="margin:0">Karyawan tidak bisa login lagi. Riwayat pengajuannya tetap tersimpan untuk laporan.</p>', 'Nonaktifkan', () => { u.akun = 'nonaktif'; rerender(); toast('Akun dinonaktifkan'); }, true); },
  'reg-approve': d => { const u = user(d.id);
    modal(`Setujui akun ${esc(u.nama)}`, `<p class="muted" style="margin:0">${esc(u.email)} · ${esc(u.hp || 'tanpa no. WA')}</p><div class="fgrid">
      <div class="f"><label>Company</label><select name="company">${opts(COMPANIES, u.company)}</select></div><div class="f"><label>Divisi</label><select name="dept">${opts(DIVISI, u.dept)}</select></div>
      <div class="f full"><label>Jabatan</label><input type="text" name="jabatan" value="${esc(u.jabatan || '')}"></div>
      <div class="f"><label>Level</label><select name="level">${opts(LEVELS, u.level || 'Staff')}</select></div><div class="f"><label>Posisi (tarif)</label><select name="posisi">${opts(['Head', 'Lead/Koor', 'Staff', 'Driver'], u.posisi || 'Staff')}</select></div>
      <div class="f full"><label>Atasan (approver)</label><select name="atasan"><option value="">Tanpa atasan</option>${opts(S.users.filter(x => x.akun === 'aktif' && x.id !== u.id && x.posisi !== 'Driver').map(x => [x.id, `${x.nama} · ${x.jabatan || x.dept}`]))}</select></div>
      ${isSuper() ? `<div class="f full"><label>Peran</label><select name="role">${opts(Object.entries(ROLES), 'karyawan')}</select></div>` : ''}</div>`, 'Setujui & aktifkan', fd => {
      const f = Object.fromEntries(['company', 'dept', 'jabatan', 'level', 'posisi', 'atasan', 'role'].map(k => [k, (fd.get(k) || '').trim()]));
      if (!f.jabatan) { toast('Isi jabatan'); return false; }
      if (!f.atasan && !confirmNoAtasan(u)) return false;
      regApply(u, f);
    }); },
  'reg-reject': d => { const u = user(d.id); modal(`Tolak pendaftaran ${esc(u.nama)}?`, '<p style="margin:0">Data pendaftaran dihapus. Bila memang karyawan, ia bisa mendaftar ulang.</p>', 'Tolak', () => regReject(u), true); },
  'akun-on': d => { user(d.id).akun = 'aktif'; rerender(); toast('Akun diaktifkan kembali'); },
  'invite-view': d => { const u = user(d.id); modal('Email undangan', `<div class="mail"><div class="muted" style="font-size:12px">Kepada: ${esc(u.email)}<br>Subjek: Akun Momiasi HCS (Human Capital System) Anda</div><p>Halo ${esc(u.nama.split(' ')[0])},</p><p>HCGA sudah membuatkan akun untuk Anda di Momiasi HCS (Human Capital System): tempat mengajukan perjalanan dinas, booking mobil & ruang meeting, pembelian aset, dan layanan HC lainnya.</p><p><a class="btn primary sm" href="#/aktivasi?u=${u.id}" data-act="mclose-go" data-href2="#/aktivasi?u=${u.id}">Aktifkan akun</a></p><p class="muted" style="font-size:12px">Link berlaku 7 hari.</p></div>`, 'Kirim ulang', () => { toast(`Undangan dikirim ulang ke ${u.email}`); }); },
  'mclose-go': d => { closeModal(); S.loggedIn = false; save(); go(d.href2); },
  'user-add': () => modal('Tambah karyawan', `<div class="fgrid"><div class="f full"><label>Nama lengkap</label><input type="text" name="nama" autofocus></div><div class="f full"><label>Email kantor</label><input type="email" name="email" placeholder="nama@momiasi.id"></div><div class="f"><label>Jabatan</label><input type="text" name="jabatan"></div><div class="f"><label>Posisi (tarif)</label><select name="posisi">${opts(['Staff', 'Lead/Koor', 'Head', 'Driver'])}</select></div><div class="f"><label>Departemen</label><input type="text" name="dept" list="deptList"><datalist id="deptList">${DIVISI.map(x => `<option value="${esc(x)}">`).join('')}</datalist></div><div class="f"><label>Peran</label><select name="role">${opts(Object.entries(ROLES), 'karyawan')}</select></div><div class="f"><label>Atasan</label><select name="atasan">${opts([['', '—'], ...S.users.filter(x => x.posisi !== 'Driver').map(x => [x.id, x.nama])])}</select></div></div><p class="muted" style="margin:0;font-size:12.5px">Email undangan aktivasi langsung dikirim ke karyawan.</p>`, 'Simpan & kirim undangan', fd => {
    const nama = fd.get('nama').trim(), email = fd.get('email').trim().toLowerCase();
    if (!nama || !/^[^@\s]+@[^@\s]+$/.test(email)) { toast('Nama dan email wajib diisi dengan benar'); return false; }
    if (S.users.some(u => u.email === email)) { toast('Email sudah terdaftar'); return false; }
    S.users.push({ id: 'u' + uid(), nama, email, jabatan: fd.get('jabatan').trim() || '-', posisi: fd.get('posisi'), dept: fd.get('dept').trim() || '-', atasan: fd.get('atasan') || null, akun: 'undangan', role: fd.get('role') || 'karyawan' });
    rerender(); toast(`Undangan terkirim ke ${email}`);
  }),
  'user-import': () => modal('Import karyawan dari Excel', `<ol style="margin:0;padding-left:18px;line-height:1.7"><li>Unduh template, isi satu baris per karyawan.</li><li>Simpan sebagai CSV, lalu unggah di sini.</li><li>Sistem membuat akun & mengirim email undangan ke semua karyawan sekaligus.</li></ol><button type="button" class="btn sm" data-act="tpl" style="align-self:flex-start">${ic('dl')} Unduh template</button><div class="f"><label>File CSV</label><input type="file" name="file" accept=".csv,text/csv"></div>`, 'Import & kirim undangan', fd => {
    const f = fd.get('file');
    if (!f || !f.size) { toast('Pilih file CSV dulu'); return false; }
    f.text().then(txt => {
      const rows = txt.replace(/^\ufeff/, '').split(/\r?\n/).filter(Boolean).map(l => l.split(/[;,]/).map(x => x.replace(/^"|"$/g, '').trim()));
      const head = rows.shift().map(h => h.toLowerCase());
      const ix = k => head.indexOf(k);
      let n = 0;
      rows.forEach(r => { const email = (r[ix('email')] || '').toLowerCase(); if (!email || S.users.some(u => u.email === email)) return; const at = S.users.find(u => u.email === (r[ix('email_atasan')] || '').toLowerCase()); S.users.push({ id: 'u' + uid(), nama: r[ix('nama')] || email, email, jabatan: r[ix('jabatan')] || '-', posisi: r[ix('posisi')] || 'Staff', dept: r[ix('departemen')] || '-', atasan: at ? at.id : null, akun: 'undangan', role: ({ 'super admin': 'superadmin', admin: 'admin', atasan: 'atasan' })[(r[ix('peran')] || '').toLowerCase()] || 'karyawan' }); n++; });
      rerender(); toast(`${n} karyawan diimport, undangan terkirim`);
    });
  }),
  tpl: () => { if (IS_ARTIFACT) return toast(NO_FILE_MSG); const csv = '\ufeffnama;email;jabatan;posisi;departemen;email_atasan;peran\r\nContoh Nama;contoh.nama@momiasi.id;Content Writer;Staff;Branding;dimas.hakim@momiasi.id;Karyawan\r\n'; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'template-karyawan.csv'; document.body.appendChild(a); a.click(); a.remove(); },
  'ca-add': () => { $('#caRows').insertAdjacentHTML('beforeend', caRowHtml({ jenis: CA_JENIS[1], ket: '', nominal: '' })); $('#caRows tr:last-child [name=caNom]').focus(); liveDinas($('form[data-form=dinas]')); },
  'ca-del': (d, el) => { el.closest('tr').remove(); liveDinas($('form[data-form=dinas]')); },
  'geo-search': async () => {
    if (IS_ARTIFACT) return toast('Pencarian peta tidak tersedia di link prototype. Tempel link Google Maps di kolom bawahnya.');
    const q = $('#alamat').value.trim() || $('#tujuan').value.trim();
    if (!q) { toast('Ketik nama tempat atau alamat dulu'); return; }
    $('#geoRes').innerHTML = '<div class="muted" style="padding:8px 0">Mencari…</div>';
    try {
      const r = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=id,sg,my,th&q=' + encodeURIComponent(q), { headers: { 'Accept-Language': 'id' } });
      const js = await r.json();
      $('#geoRes').innerHTML = js.length ? js.map(x => `<button type="button" data-act="geo-pick" data-lat="${x.lat}" data-lng="${x.lon}" data-name="${esc(x.display_name)}">${esc(x.display_name)}</button>`).join('') : '<div class="muted" style="padding:8px 0">Tidak ketemu. Klik langsung di peta atau tempel link Google Maps.</div>';
    } catch (e) { $('#geoRes').innerHTML = '<div class="muted" style="padding:8px 0">Pencarian gagal. Klik langsung di peta.</div>'; }
  },
  'geo-pick': d => { if (!$('#alamat').value.trim()) $('#alamat').value = d.name.split(',').slice(0, 3).join(','); $('#geoRes').innerHTML = ''; setPin(+d.lat, +d.lng, true); }
};

let NOAT = null;
function confirmNoAtasan(u) { if (NOAT === u.id) return true; NOAT = u.id; toast('Belum memilih atasan: pengajuan dinas & training akan langsung ke HCGA. Klik Setujui lagi bila memang benar.'); return false; }
function regApply(u, f) { Object.assign(u, f, { role: f.role || 'karyawan', atasan: f.atasan || null, akun: 'aktif' }); notify(u.id, 'Akun Anda disetujui HC. Selamat datang di Momiasi HCS!', '#/'); rerender(); toast(`Akun ${u.nama} aktif`); }
function regReject(u) { S.users = S.users.filter(x => x !== u); rerender(); toast('Pendaftaran ditolak'); }

/* ===== forms ===== */
const FORMS = {
  login: fd => {
    const email = fd.get('email').trim().toLowerCase();
    const u = S.users.find(x => x.email === email);
    const err = m => { $('#formErr').innerHTML = `<div class="alert">${m}</div>`; };
    if (!email || !fd.get('password')) return err('Isi email dan password.');
    if (!u) return err('Email belum terdaftar. Hubungi HCGA.');
    if (u.akun === 'undangan') return err('Akun belum diaktifkan. Cek email undangan dari HCGA.');
    if (u.akun === 'nonaktif') return err('Akun ini sudah dinonaktifkan.');
    S.persona = u.role === 'superadmin' ? 'superadmin' : u.role === 'admin' ? 'admin' : u.posisi === 'Driver' ? 'driver' : u.role === 'atasan' ? 'atasan' : 'karyawan';
    S.meId = u.id; S.loggedIn = true; save(); go('#/'); toast(`Selamat datang, ${u.nama.split(' ')[0]}`);
  },
  aktivasi: (fd, f) => {
    const u = user(f.dataset.id);
    if ((fd.get('p1') || '').length < 8) { $('#formErr').innerHTML = '<div class="alert">Password minimal 8 karakter.</div>'; return; }
    if (fd.get('p1') !== fd.get('p2')) { $('#formErr').innerHTML = '<div class="alert">Password tidak sama.</div>'; return; }
    u.akun = 'aktif'; save();
    notifyHCGA(`${u.nama} sudah mengaktifkan akun`, '#/pengaturan?tab=karyawan');
    toast('Akun aktif. Silakan masuk.'); go('#/login');
  },
  daftar: fd => {
    const g = k => (fd.get(k) || '').trim(), err = m => { $('#formErr').innerHTML = `<div class="alert">${m}</div>`; };
    const email = g('email').toLowerCase();
    if (g('nama').length < 3 || !g('jabatan')) return err('Isi nama lengkap dan jabatan.');
    if (!/^[^@\s]+@momiasi\.id$/.test(email)) return err('Gunakan email kantor @momiasi.id.');
    if ((fd.get('p1') || '').length < 8) return err('Password minimal 8 karakter.');
    if (fd.get('p1') !== fd.get('p2')) return err('Password tidak sama.');
    if (S.users.some(u => u.email === email)) return err('Email ini sudah terdaftar.');
    S.users.push({ id: 'u' + uid(), nama: g('nama'), email, hp: g('hp'), company: g('company'), dept: g('dept'), jabatan: g('jabatan'), role: 'karyawan', level: 'Staff', posisi: 'Staff', atasan: null, akun: 'menunggu', daftarAt: Date.now() });
    notifyHCGA(`${g('nama')} (${g('dept')}) mendaftar akun, menunggu persetujuan`, '#/persetujuan?tab=akun'); save(); go('#/daftar/terkirim');
  },
  modal: fd => { const r = modalCb && modalCb(fd); if (r !== false) closeModal(); },
  dinas: (fd, f) => {
    const t = tripFromForm(f), err = [];
    if (!t.tujuan) err.push('Kota tujuan wajib diisi.');
    if (t.kegPilih === 'Lainnya' && !t.kegiatan) err.push('Sebutkan jenis kegiatannya.');
    if (t.kategori === 'A' && t.hotel && (!t.hotelInfo.malam || t.hotelInfo.malam < 1)) err.push('Isi jumlah malam hotel.');
    if (t.caItems.some(x => x.nominal && !x.jenis)) err.push('Lengkapi kebutuhan CA.');
    if (t.kategori === 'A' && t.wilayah === 'intl' && !t.negara) err.push('Negara tujuan wajib diisi untuk perjalanan internasional.');
    if (!t.keperluan) err.push('Maksud perjalanan wajib diisi.');
    if (!t.berangkat || !t.pulang || t.pulang < t.berangkat) err.push('Periksa tanggal berangkat dan kembali.');
    if (err.length) { $('#formErr').innerHTML = `<div class="alert">${err.join('<br>')}</div>`; return; }
    if (t.kategori === 'B') { t.moda = 'Tidak perlu tiket'; t.zona = ''; t.hotel = false; }
    if (!['Pesawat', 'Kereta'].includes(t.moda)) t.zona = '';
    if (!t.hotel) t.hotelInfo = null;
    delete t.kegPilih; delete t.modaPilih;
    const u = me();
    Object.assign(t, { id: 't' + uid(), no: nextNo('PD'), status: u.atasan ? 'menunggu_atasan' : 'menunggu_hcga', log: [] });
    addLog(t, 'Mengajukan');
    S.trips.push(t);
    if (t.caPic !== u.id) notify(t.caPic, `${u.nama} menunjuk Anda sebagai penerima CA dinas ke ${t.tujuan}`, `#/dinas/${t.id}`);
    if (u.atasan) { notify(u.atasan, `${u.nama} mengajukan perjalanan dinas ke ${t.tujuan}`, `#/dinas/${t.id}`); const dg = delegasiAktif(u.atasan); if (dg) notify(dg, `(Delegasi) ${u.nama} mengajukan perjalanan dinas ke ${t.tujuan}`, `#/dinas/${t.id}`); }
    else notifyHCGA(`${u.nama} mengajukan perjalanan dinas ke ${t.tujuan}`, `#/dinas/${t.id}`);
    save(); go(`#/dinas/${t.id}`); toast(`Terkirim ke ${u.atasan ? user(u.atasan).nama : 'HCGA'}`);
  },
  booking: (fd, f) => {
    const t = T(f.dataset.id);
    if (f.elements.transport && !fd.get('transport').trim()) { toast('Isi detail tiket terlebih dahulu'); f.elements.transport.focus(); return; }
    if (!fd.get('cair')) { toast('Tandai CA sudah ditransfer untuk melanjutkan'); return; }
    const files = [...(f.elements.files.files || [])].map(x => x.name);
    t.booking = { transport: (fd.get('transport') || '').trim(), kode: (fd.get('kode') || '').trim(), hotel: (fd.get('hotel') || '').trim(), files: files.length ? files : (f.elements.transport ? ['e-ticket.pdf'] : []) };
    t.caPaidAt = Date.now(); t.status = 'siap';
    addLog(t, f.elements.transport ? 'Memesan tiket & hotel, mencairkan CA' : 'Mencairkan CA');
    notify(t.userId, `Tiket & CA untuk dinas ke ${t.tujuan} sudah siap`, `#/dinas/${t.id}`);
    rerender(); toast('Disimpan, karyawan sudah dinotifikasi');
  },
  settle: (fd, f) => {
    const t = T(f.dataset.id);
    const rows = [...f.querySelectorAll('#sRows tr')].map(tr => ({ ket: tr.querySelector('[name=ket]').value.trim(), nominal: +tr.querySelector('[name=nominal]').value || 0, bukti: (tr.querySelector('[name=bukti]').files[0] || {}).name || (tr.querySelector('.s') ? tr.querySelector('.s').textContent : '') })).filter(x => x.ket || x.nominal);
    if (!rows.length) { toast('Tambahkan minimal satu baris'); return; }
    if (rows.some(x => !x.ket)) { toast('Lengkapi keterangan tiap baris'); return; }
    t.settlement = { at: Date.now(), items: rows }; t.status = 'settlement';
    addLog(t, 'Mengajukan settlement');
    notifyHCGA(`${user(t.userId).nama} mengajukan settlement ${t.no}`, `#/dinas/${t.id}`);
    rerender(); toast('Settlement terkirim ke HCGA');
  },
  mobil: (fd, f) => {
    const c = { tanggal: fd.get('tanggal'), mulai: fd.get('mulai'), selesai: fd.get('selesai'), tujuan: fd.get('tujuan').trim(), penumpang: +fd.get('penumpang') || 1, keperluan: fd.get('keperluan').trim(), pakaiDriver: fd.get('pakaiDriver') !== '0' };
    const err = [];
    if (!c.tujuan) err.push('Tujuan wajib diisi.');
    if (!c.tanggal || c.tanggal < TODAY) err.push('Tanggal tidak valid.');
    if (toMin(c.selesai) <= toMin(c.mulai)) err.push('Jam kembali harus setelah jam berangkat.');
    if (err.length) { $('#formErr').innerHTML = `<div class="alert">${err.join('<br>')}</div>`; return; }
    Object.assign(c, { id: 'c' + uid(), no: nextNo('BM'), userId: me().id, status: 'menunggu_hcga', log: [] });
    addLog(c, 'Mengajukan'); S.cars.push(c);
    notifyHCGA(`${me().nama} mengajukan booking mobil ke ${c.tujuan}`, `#/mobil/${c.id}`);
    save(); go(`#/mobil/${c.id}`); toast('Terkirim ke HCGA');
  },
  assign: (fd, f) => {
    const c = C(f.dataset.id), type = fd.get('type');
    if (type === 'kantor') {
      const needD = c.pakaiDriver !== false;
      if (!fd.get('vehicleId') || (needD && !fd.get('driverId'))) { toast('Pilih mobil dan driver yang tersedia'); return; }
      c.assign = { type, vehicleId: fd.get('vehicleId'), driverId: needD ? fd.get('driverId') : null, note: fd.get('note') };
      if (needD) notify(c.assign.driverId, `Jadwal menyetir baru: ${c.tujuan}, ${relDay(c.tanggal).toLowerCase()} ${jam(c.mulai)}. Mohon terima atau tolak.`, '#/jadwal');
      c.status = needD ? 'menunggu_driver' : 'dijadwalkan';
    } else { c.assign = { type, vendor: type === 'eksternal' ? fd.get('vendor') : '', biaya: +fd.get('biaya') || 0, note: fd.get('note') || (type === 'umum' ? 'Reimburse dengan bukti' : '') }; c.status = 'dijadwalkan'; }
    addLog(c, type === 'kantor' ? 'Menjadwalkan mobil kantor' : type === 'eksternal' ? `Mengarahkan ke mobil eksternal (${c.assign.vendor})` : 'Mengarahkan ke transportasi umum', fd.get('note'));
    if (c.status === 'dijadwalkan') notify(c.userId, `Booking mobil ke ${c.tujuan} sudah dijadwalkan`, `#/mobil/${c.id}`);
    rerender(); toast(c.status === 'menunggu_driver' ? 'Menunggu konfirmasi driver' : 'Perjalanan dijadwalkan');
  },
  ruang: (fd, f) => {
    const b = ruangFromForm(f), err = ruangErrors(b);
    if (!b.judul) err.unshift('Judul meeting wajib diisi.');
    if (err.length) { $('#formErr').innerHTML = `<div class="alert">${err.join('<br>')}</div>`; return; }
    if (b.konsumsi.jenis === 'none') b.konsumsi.porsi = 0;
    Object.assign(b, { id: 'b' + uid(), no: nextNo('RM'), userId: me().id, status: 'menunggu_hcga', log: [] });
    addLog(b, 'Mengajukan'); S.roomb.push(b);
    notifyHCGA(`${me().nama} memesan ${room(b.roomId).nama}: ${b.judul}`, `#/ruang/${b.id}`);
    save(); go(`#/ruang?v=kalender&d=${b.tanggal}`); toast('Slot ditahan, menunggu persetujuan HCGA');
  },
  delegasi: fd => {
    if (fd.get('sampai') < fd.get('mulai')) { toast('Tanggal selesai harus setelah tanggal mulai'); return; }
    S.delegasi = { from: me().id, to: fd.get('to'), mulai: fd.get('mulai'), sampai: fd.get('sampai') };
    notify(fd.get('to'), `${me().nama} mendelegasikan approval dinas ke Anda (${fds(fd.get('mulai'))}–${fds(fd.get('sampai'))})`, '#/persetujuan');
    rerender(); toast('Delegasi disimpan');
  },
  tarif: fd => {
    for (const [k, v] of fd.entries()) {
      const [t, a, b] = k.split('|');
      if (t === 'A') S.rateA[a][b] = +v || 0;
      if (t === 'B') S.rateB.find(x => x.id === a)[b] = +v || 0;
      if (t === 'Z') S.zona[+a][b] = v;
    }
    rerender(); toast('Tarif disimpan, berlaku untuk pengajuan baru');
  }
};

Object.assign(ACT, ASET_ACT, LND_ACT, TA_ACT);
Object.assign(FORMS, ASET_FORMS, LND_FORMS, TA_FORMS);
const LIVE = {
  fpk: f => { const n = f.elements.pertanyaan.value.split('\n').filter(x => x.trim()).length; $('#qCount').textContent = `${n} pertanyaan${n < 10 ? ' · minimal 10' : ''}`; },
  aset: liveAset,
  training: liveTraining,
  l360: liveL360,
  dinas: liveDinas,
  settle: liveSettle,
  ruang: liveRuang,
  assign: f => { const t = (f.querySelector('[name=type]:checked') || {}).value; f.querySelectorAll('[data-t]').forEach(el => { el.hidden = !el.dataset.t.split(' ').includes(t); }); }
};

/* ===== csv ===== */
function exportCsv(k, ym) {
  if (IS_ARTIFACT) return toast(NO_FILE_MSG);
  const R = reportData(ym);
  let rows;
  if (k === 'dinas') rows = [['Departemen', 'Perjalanan', 'Hari dinas', 'CA dicairkan', 'Realisasi']].concat(R.dinas.map(x => [x.dept, x.n, x.hari, x.ca, x.real]));
  if (k === 'ca') rows = [['No', 'Karyawan', 'Tujuan', 'Pulang', 'CA', 'Hari sejak pulang']].concat(R.caOpen.map(({ t, umur }) => [t.no, user(t.userId).nama, t.tujuan, t.pulang, t.ca, umur]));
  if (k === 'mobil') rows = [['Kendaraan', 'Plat', 'Trip', 'Km', 'BBM', 'Tol & parkir']].concat(R.mobil.map(x => [x.v.nama, x.v.plat, x.n, x.km, x.bbm, x.tolpk]));
  if (k === 'ruang') rows = [['Ruangan', 'Booking', 'Hangus', 'Jam terpakai', 'Utilisasi %']].concat(R.ruang.map(x => [x.r.nama, x.n, x.hangus, x.jam.toFixed(1), Math.round(x.util * 100)]));
  if (k === 'aset') rows = [['No', 'Pemohon', 'Barang', 'Kategori', 'Qty', 'Nilai', 'Status']].concat(S.aset.filter(a => a.no.includes('/' + ym.replace('-', '/') + '/')).map(a => [a.no, user(a.userId).nama, a.nama, a.kategori, a.qty, asetTotal(a), ST[a.status] ? ST[a.status][0] : a.status]));
  if (k === 'pend') rows = [['Jenis', 'No', 'Pemohon', 'Tahap', 'Menunggu (hari)']].concat(R.pend.map(x => [x.jenis, x.no, x.siapa, x.tahap, x.umur.toFixed(1)]));
  const csv = '﻿' + rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = `laporan-${k}-${ym}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  toast('File diunduh');
}

/* ===== events ===== */
document.addEventListener('click', e => {
  const wa = e.target.closest('a[data-wa]'); if (wa && wa.dataset.wa && !wa.classList.contains('sent')) { markSent(wa.dataset.wa, 'wa'); wa.classList.add('sent'); wa.insertAdjacentHTML('beforeend', ' ✓'); }
  const a = e.target.closest('[data-act]');
  if (a) { e.preventDefault(); e.stopPropagation(); ACT[a.dataset.act] && ACT[a.dataset.act](a.dataset, a); return; }
  const n = e.target.closest('[data-nid]');
  if (n) { const x = S.notifs.find(y => y.id === n.dataset.nid); if (x) { x.read = true; save(); } }
  if (IS_ARTIFACT) { const an = e.target.closest('a[href^="#/"]'); if (an) { e.preventDefault(); go(an.getAttribute('href')); return; } }
  if (!e.target.closest('#npanel') && !e.target.closest('[data-act=bell]')) $('#npanel').classList.remove('open');
  const r = e.target.closest('[data-href]');
  if (r && !e.target.closest('a,button,input,select,textarea')) go(r.dataset.href);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closePanels(); }
  if (e.key === 'Enter' && e.target.matches('[data-href]')) go(e.target.dataset.href);
});
document.addEventListener('submit', e => {
  const f = e.target.closest('form[data-form]');
  if (!f) return;
  e.preventDefault();
  FORMS[f.dataset.form] && FORMS[f.dataset.form](new FormData(f), f);
});
document.addEventListener('input', e => {
  if (e.target.id === 'fq') { applyFilter(); return; }
  const f = e.target.closest('form[data-live]');
  if (['ca', 'caNom', 'caKet', 'malam', 'checkin'].includes(e.target.name)) e.target.dataset.touched = 1;
  if (f && LIVE[f.dataset.live]) LIVE[f.dataset.live](f, e);
});
document.addEventListener('change', e => {
  if (e.target.id === 'fst' || e.target.id === 'fdept') { applyFilter(); return; }
  if (e.target.matches('.csel-all')) document.querySelectorAll('.csel').forEach(x => { if (!x.closest('tr').hidden) x.checked = e.target.checked; });
  if (e.target.matches('.csel, .csel-all')) { const n = document.querySelectorAll('.csel:checked').length, b = $('#selbar'); if (b) { b.hidden = !n; $('#selN').textContent = n; } return; }
  if (e.target.id === 'persona') { S.persona = e.target.value; S.meId = null; S.loggedIn = true; save(); go('#/'); render(); toast(`Sekarang melihat sebagai ${PLABEL[S.persona]} · ${me().nama}`); return; }
  if (e.target.dataset.nav === 'laporan') { go(`#/laporan?m=${e.target.value}`); return; }
  if (e.target.dataset.nav === 'kand') { go(`#/ta-kandidat?f=${e.target.dataset.f}${e.target.value ? '&fpk=' + e.target.value : ''}`); return; }
  const ac = e.target.dataset.actChange;
  if (ac === 'user-level') { user(e.target.dataset.id).level = e.target.value; save(); toast('Level diperbarui'); }
  if (ac === 'user-atasan') { const a = e.target.value ? user(e.target.value) : null; user(e.target.dataset.id).atasan = e.target.value || null; if (a && a.role === 'karyawan') { a.role = 'atasan'; save(); rerender(); toast(`Atasan diperbarui · ${a.nama} otomatis jadi peran Atasan`); return; } save(); toast('Atasan diperbarui'); }
  if (ac === 'user-role') { const u = user(e.target.dataset.id); if (u.role === 'superadmin' && e.target.value !== 'superadmin' && S.users.filter(x => x.role === 'superadmin').length === 1) { e.target.value = 'superadmin'; toast('Minimal harus ada satu Super Admin'); return; } u.role = e.target.value; save(); toast(`${u.nama} sekarang ${ROLES[u.role]}`); }
  if (ac === 'user-posisi') { user(e.target.dataset.id).posisi = e.target.value; save(); toast('Posisi diperbarui'); }
  const f = e.target.closest('form[data-live]');
  if (f && LIVE[f.dataset.live] && (e.target.type === 'radio' || e.target.type === 'checkbox' || e.target.tagName === 'SELECT' || e.target.type === 'date')) LIVE[f.dataset.live](f, e);
});
window.addEventListener('hashchange', render);
const TIP = document.getElementById('tip');
function showTip(el, x, y) { TIP.textContent = el.dataset.tip; TIP.classList.add('on'); const w = TIP.offsetWidth, h = TIP.offsetHeight; TIP.style.left = Math.min(window.innerWidth - w - 8, Math.max(8, x - w / 2)) + 'px'; TIP.style.top = (y - h - 12 < 4 ? y + 18 : y - h - 12) + 'px'; }
document.addEventListener('mousemove', e => { const el = e.target.closest('[data-tip]'); if (el) showTip(el, e.clientX, e.clientY); else TIP.classList.remove('on'); });
document.addEventListener('focusin', e => { const el = e.target.closest('[data-tip]'); if (el) { const r = el.getBoundingClientRect(); showTip(el, r.left + r.width / 2, r.top); } });
document.addEventListener('focusout', () => TIP.classList.remove('on'));
document.addEventListener('scroll', () => TIP.classList.remove('on'), true);
// refresh time-dependent states (check-in, now line) every minute
setInterval(() => { const p = parse().parts[0]; if (!$('#modal').classList.contains('open') && !document.querySelector('#view form') && ['beranda', 'ruang', undefined].includes(p)) rerender(); }, 60000);

$('#persona').innerHTML = Object.keys(PERSONA).map(k => `<option value="${k}">${PLABEL[k]} · ${user(PERSONA[k]).nama}</option>`).join('');
document.querySelectorAll('.lw-slot').forEach(el => { el.innerHTML = LOGO(); });
render();

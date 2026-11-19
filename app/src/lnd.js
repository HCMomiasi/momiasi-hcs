/* ===================== LEARNING & DEVELOPMENT ===================== */
const OT_ST = { belum: ['Belum mulai', 'gray'], proses: ['Dikerjakan', 'blue'], menunggu: ['Menunggu acc', 'amber'], revisi: ['Perlu revisi', 'red'], selesai: ['Selesai', 'teal'] };
const otPill = s => `<span class="pill ${OT_ST[s][1]}">${OT_ST[s][0]}</span>`;
const VERIF = { hc: 'HC', atasan: 'Atasan (mentor)' };

function lndSeed(d, now, L) {
  const D = 864e5, H = 36e5;
  const tmpl = [
    ['Lengkapi data diri & dokumen karyawan (KTP, NPWP, rekening)', 1, 'hc'],
    ['Tanda tangan kontrak kerja & NDA', 1, 'hc'],
    ['Ikuti sesi pemaparan onboarding (company profile & peraturan perusahaan)', 2, 'hc'],
    ['Setup email kantor & akses tools kerja', 2, 'atasan'],
    ['Perkenalan dengan tim & divisi terkait', 5, 'atasan'],
    ['Pelajari SOP & job description divisi', 7, 'atasan'],
    ['Susun rencana kerja 30-60-90 hari bersama atasan', 14, 'atasan'],
    ['Presentasi hasil kerja bulan pertama', 30, 'atasan']
  ];
  const mkTasks = statuses => tmpl.map(([judul, hari, verif], i) => ({ id: 'k' + (i + 1), judul, hari, verif, status: statuses[i] || 'belum', note: '', file: '' }));
  const onb = [
    { id: 'o1', userId: 'u12', join: d(-2), status: 'berjalan', pre: null, pemaparanAt: null, post: null, tasks: mkTasks(['selesai', 'menunggu', 'proses']), log: [L('u3', 'Memulai onboarding', 2 * D)] },
    { id: 'o2', userId: 'u13', join: d(-24), status: 'berjalan', pre: { skor: 60, at: now - 24 * D }, pemaparanAt: now - 22 * D, post: { skor: 90, at: now - 22 * D }, tasks: mkTasks(['selesai', 'selesai', 'selesai', 'selesai', 'selesai', 'selesai', 'menunggu', 'belum']), log: [L('u3', 'Memulai onboarding', 24 * D)] },
    { id: 'o3', userId: 'u10', join: d(-160), status: 'selesai', pre: { skor: 50, at: now - 160 * D }, pemaparanAt: now - 158 * D, post: { skor: 80, at: now - 158 * D }, tasks: mkTasks(Array(8).fill('selesai')), log: [], selesaiAt: now - 128 * D }
  ];
  const P = (o) => o; // readability
  const fullProg = (pic, rs, piagam) => ({ commit: { file: 'commitment-letter.docx', at: now }, reaction: { s: rs, saran: 'Tambah sesi praktik.', butuh: 'Analisis data', at: now }, ...(pic ? { result: { file: 'training-result.docx', at: now } } : {}), ...(piagam ? { piagam } : {}) });
  const trainings = [
    { id: 'tr1', no: 'TR/2026/11/031', userId: 'u7', judul: 'Google Analytics 4 untuk Tim Marketing', penyelenggara: 'Eksternal', vendor: 'Digital Marketing Academy', harga: 2500000, tglAju: d(-6), tanggal: d(8), mode: 'Online', peserta: ['u7', 'u10'], tes: null, status: 'disetujui',
      log: [L('u7', 'Mengajukan', 6 * D), L('u8', 'Menyetujui', 5 * D), L('u3', 'Menyetujui', 4 * D)], prog: { u7: { commit: { file: 'commitment-nadia.docx', at: now - 3 * D } }, u10: {} } },
    { id: 'tr2', no: 'TR/2026/11/027', userId: 'u6', judul: 'Public Speaking untuk Host Konten', penyelenggara: 'Internal', vendor: 'Trainer internal · Dimas Hakim', harga: 0, tglAju: d(-20), tanggal: d(-3), mode: 'Offline', peserta: ['u6', 'u1', 'u12'], tes: null, status: 'terlaksana',
      log: [L('u6', 'Mengajukan', 20 * D), L('u2', 'Menyetujui', 19 * D), L('u3', 'Menyetujui', 18 * D)],
      prog: { u6: { commit: { file: 'commitment-fajar.docx', at: now - 10 * D }, reaction: { s: [9, 9, 8, 10, 9, 8, 8, 9, 9, 9], saran: 'Durasi praktik ditambah.', butuh: 'Teknik interview narasumber', at: now - 2 * D } }, u1: { commit: { file: 'commitment-rina.docx', at: now - 9 * D } }, u12: { commit: { file: 'commitment-putri.docx', at: now - 1 * D } } } },
    { id: 'tr3', no: 'TR/2026/11/033', userId: 'u1', judul: 'SEO Copywriting untuk Artikel Parenting', penyelenggara: 'Eksternal', vendor: 'Kelas Penulis Digital', harga: 1750000, tglAju: d(0), tanggal: d(14), mode: 'Offline', peserta: ['u1', 'u12'], tes: null, status: 'menunggu_atasan', log: [L('u1', 'Mengajukan', 3 * H)], prog: { u1: {}, u12: {} } },
    { id: 'tr4', no: 'TR/2026/08/012', userId: 'u1', judul: 'Website Management & SEO Optimization', penyelenggara: 'Eksternal', vendor: 'Vendor training SEO', harga: 3000000, tglAju: d(-110), tanggal: d(-100), mode: 'Offline', peserta: ['u1', 'u6'], tes: null, status: 'selesai', selesaiAt: now - 95 * D,
      log: [L('u1', 'Mengajukan', 110 * D), L('u2', 'Menyetujui', 109 * D), L('u3', 'Menyetujui', 108 * D)], prog: { u1: fullProg(true, [9, 8, 9, 9, 8, 8, 7, 9, 9, 9]), u6: fullProg(false, [8, 8, 8, 9, 8, 7, 7, 8, 8, 8]) } },
    { id: 'tr5', no: 'TR/2026/09/018', userId: 'u8', judul: 'Leadership for New Managers', penyelenggara: 'Internal', vendor: 'Trainer internal · Ratna Kusuma', harga: 0, tglAju: d(-75), tanggal: d(-60), mode: 'Offline', peserta: ['u8', 'u2', 'u11'], tes: null, status: 'selesai', selesaiAt: now - 55 * D,
      log: [L('u8', 'Mengajukan', 75 * D), L('u9', 'Menyetujui', 74 * D), L('u3', 'Menyetujui', 73 * D)], prog: { u8: fullProg(true, [10, 9, 9, 10, 9, 9, 8, 10, 9, 10], { status: 'disetujui', no: 'PGM/2026/09/004', at: now - 54 * D }), u2: fullProg(false, [9, 9, 9, 9, 9, 8, 8, 9, 9, 9], { status: 'disetujui', no: 'PGM/2026/09/005', at: now - 54 * D }), u11: fullProg(false, [8, 8, 7, 9, 8, 8, 7, 8, 8, 8]) } },
    { id: 'tr6', no: 'TR/2026/10/021', userId: 'u11', judul: 'Next Level Customer Relationship: Membangun Brand Community', penyelenggara: 'Eksternal', vendor: 'Komunitas bisnis', harga: 1500000, tglAju: d(-50), tanggal: d(-40), mode: 'Offline', peserta: ['u11', 'u10'], tes: null, status: 'selesai', selesaiAt: now - 35 * D,
      log: [L('u11', 'Mengajukan', 50 * D), L('u9', 'Menyetujui', 49 * D), L('u3', 'Menyetujui', 48 * D)], prog: { u11: fullProg(true, [8, 9, 9, 8, 8, 8, 8, 9, 8, 8]), u10: fullProg(false, [9, 8, 9, 8, 9, 8, 8, 9, 9, 9]) } },
    { id: 'tr7', no: 'TR/2026/07/009', userId: 'u3', judul: 'Brevet Pajak', penyelenggara: 'Eksternal', vendor: 'Lembaga sertifikasi pajak', harga: 4500000, tglAju: d(-140), tanggal: d(-130), mode: 'Online', peserta: ['u3'], tes: null, status: 'selesai', selesaiAt: now - 120 * D,
      log: [L('u3', 'Mengajukan', 140 * D), L('u9', 'Menyetujui', 139 * D)], prog: { u3: fullProg(true, [8, 7, 9, 8, 7, 7, 6, 9, 8, 8]) } },
    { id: 'tr8', no: 'TR/2026/11/029', userId: 'u2', judul: 'Cinematic Video Masterclass', penyelenggara: 'Eksternal', vendor: 'Studio kreatif', harga: 6500000, tglAju: d(-9), tanggal: d(20), mode: 'Offline', peserta: ['u2', 'u6'], tes: null, status: 'ditolak', rejectedAt: 'hc',
      log: [L('u2', 'Mengajukan', 9 * D), L('u9', 'Menyetujui', 8 * D), L('u3', 'Menolak', 7 * D, 'Budget training Branding tahun ini tidak cukup untuk 2 peserta. Ajukan 1 peserta atau Januari.')], prog: { u2: {}, u6: {} } }
  ];
  const evals = [
    { id: 'e1', userId: 'u1', trainingId: 'tr4', trainingNama: 'Website Management & SEO Optimization', at: now - 5 * D, by: 'u3',
      penilai: [{ uid: 'u2', hub: 'Atasan langsung', s: null }, { uid: 'u6', hub: 'Rekan satu tim', s: [8, 8, 7, 8, 7, 8, 8, 8, 7, 8], at: now - 3 * D }, { uid: 'u7', hub: 'Rekan lintas divisi', s: [7, 7, 6, 8, 7, 7, 7, 8, 8, 7], at: now - 2 * D }] },
    { id: 'e2', userId: 'u2', trainingId: 'tr5', trainingNama: 'Leadership for New Managers', at: now - 10 * D, by: 'u3',
      penilai: [{ uid: 'u9', hub: 'Atasan langsung', s: [8, 8, 8, 9, 8, 8, 7, 9, 9, 8], at: now - 8 * D }, { uid: 'u6', hub: 'Rekan satu tim', s: [9, 8, 8, 9, 8, 9, 8, 9, 9, 9], at: now - 7 * D }, { uid: 'u8', hub: 'Rekan lintas divisi', s: [8, 7, 7, 8, 7, 8, 7, 8, 8, 8], at: now - 6 * D }] }
  ];
  return {
    qsets: [{ id: 'qs1', nama: 'Pre-Test & Post-Test Onboarding', sumber: 'Google Form HC', qs: JSON.parse(JSON.stringify(FORM_ONB_QS)) }],
    onbTmpl: tmpl.map(([judul, hari, verif], i) => ({ id: 'k' + (i + 1), judul, hari, verif })),
    onb, trainings, evals,
    lndBudget: { HCGA: 20000000, 'Marketing & Sales': 45000000, Branding: 50000000, Finance: 10000000, SCM: 15000000, RnD: 15000000, MLC: 15000000 },
    ldTpl: [{ id: 'commit', nama: 'Commitment Letter', file: 'Template Commitment Letter.docx', at: now - 30 * D }, { id: 'result', nama: 'Training Result', file: 'Template Training Result.docx', at: now - 30 * D }]
  };
}

/* ---------- helpers ---------- */
const qset = id => S.qsets.find(x => x.id === id);
const keysReady = qs => qs && qs.qs.every(q => q.key != null);
function scoreOf(rec, qsId) {
  if (!rec) return null;
  if (rec.skor != null) return rec.skor;
  const qs = qset(qsId);
  if (!rec.ans || !keysReady(qs)) return null;
  return Math.round(qs.qs.reduce((a, q, i) => a + (rec.ans[i] === q.key ? 1 : 0), 0) / qs.qs.length * 100);
}
const skorTxt = (rec, qsId) => { if (!rec) return '<span class="faint">–</span>'; const s = scoreOf(rec, qsId); return s == null ? '<span class="muted">Menunggu kunci jawaban</span>' : `<b class="num">${s}</b>`; };
const avg = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
const f1 = n => n.toLocaleString('id-ID', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const canSeeEmp = uid => isHCGA() || user(uid).atasan === me().id;

const afterPhase = t => !!t.terlaksanaAt || TODAY > t.tanggal;
function trSteps(t, uid) {
  const p = t.prog[uid] || {}, after = afterPhase(t), st = [];
  st.push({ k: 'commit', l: 'Commitment letter', done: !!p.commit, avail: !after || true, ph: 'Sebelum' });
  if (t.tes) st.push({ k: 'pre', l: 'Pretest', done: !!p.pre, skip: after && !p.pre, avail: !after, ph: 'Sebelum' });
  st.push({ k: 'pel', l: 'Pelaksanaan', done: after, auto: true, ph: '' });
  st.push({ k: 'reaction', l: 'Form reaction', done: !!p.reaction, avail: after, ph: 'Sesudah' });
  if (t.tes) st.push({ k: 'post', l: 'Posttest', done: !!p.post, avail: after, ph: 'Sesudah' });
  if (uid === t.userId) st.push({ k: 'result', l: 'Training result', done: !!p.result, avail: after, ph: 'Sesudah' });
  if (t.penyelenggara === 'Internal') st.push({ k: 'piagam', l: 'Piagam', opt: true, done: p.piagam?.status === 'disetujui', pend: p.piagam?.status === 'diajukan', avail: after, ph: 'Sesudah' });
  return st;
}
const pesertaDone = (t, uid) => trSteps(t, uid).every(s => s.opt || s.done || s.skip);
function syncTraining(t) {
  if (['disetujui', 'terlaksana'].includes(t.status)) {
    if (afterPhase(t) && t.status === 'disetujui') t.status = 'terlaksana';
    if (t.status === 'terlaksana' && t.peserta.every(u => pesertaDone(t, u))) { t.status = 'selesai'; t.selesaiAt = Date.now(); }
  }
}
function syncOnb(o) { if (o.status === 'berjalan' && o.post && o.tasks.every(k => k.status === 'selesai')) { o.status = 'selesai'; o.selesaiAt = Date.now(); notify(o.userId, 'Onboarding Anda selesai. Selamat bergabung!', '#/lnd-tugas'); } }
function lndSyncAll() { S.trainings.forEach(syncTraining); S.onb.forEach(syncOnb); }

function stepLine(steps) {
  return `<ol class="sline">${steps.map(s => `<li class="${s.done ? 'done' : s.skip ? 'skip' : s.pend ? 'pend' : s.opt ? 'opt' : ''}" data-tip="${esc(s.l)}: ${s.done ? 'selesai' : s.skip ? 'terlewat' : s.pend ? 'menunggu acc HC' : s.opt ? 'opsional' : 'belum'}"><i></i><span>${s.l}</span></li>`).join('')}</ol>`;
}
function onbSteps(o) {
  const done = o.tasks.filter(k => k.status === 'selesai').length;
  return [{ l: 'Pretest', done: !!o.pre }, { l: 'Pemaparan', done: !!o.pemaparanAt }, { l: 'Posttest', done: !!o.post }, { l: `Tugas ${done}/${o.tasks.length}`, done: done === o.tasks.length }, { l: 'Selesai', done: o.status === 'selesai' }];
}

/* ---------- task counts ---------- */
function myLndTasks() {
  const m = me().id, out = { onb: null, onbVerif: [], train: [], evals: [] };
  lndSyncAll();
  out.onb = S.onb.find(o => o.userId === m && o.status === 'berjalan') || null;
  S.onb.filter(o => o.status === 'berjalan').forEach(o => o.tasks.forEach(k => { if (k.status === 'menunggu' && ((k.verif === 'atasan' && user(o.userId).atasan === m) || (k.verif === 'hc' && isHCGA()))) out.onbVerif.push({ o, k }); }));
  S.trainings.filter(t => ['disetujui', 'terlaksana'].includes(t.status) && t.peserta.includes(m)).forEach(t => { const todo = trSteps(t, m).filter(s => !s.done && !s.skip && !s.opt && !s.auto && s.avail); out.train.push({ t, todo }); });
  S.evals.forEach(e => e.penilai.forEach(p => { if (p.uid === m && !p.s) out.evals.push({ e, p }); }));
  return out;
}
function lndTaskCount() {
  const x = myLndTasks();
  let n = x.onbVerif.length + x.evals.length + x.train.reduce((a, r) => a + r.todo.length, 0);
  if (x.onb) n += (!x.onb.pre ? 1 : 0) + (x.onb.pemaparanAt && !x.onb.post ? 1 : 0) + x.onb.tasks.filter(k => ['belum', 'proses', 'revisi'].includes(k.status)).length;
  return n;
}
function lndPending() {
  const m = me().id;
  const atasan = S.trainings.filter(t => t.status === 'menunggu_atasan' && (user(t.userId).atasan === m || delegasiAktif(user(t.userId).atasan) === m));
  const hc = isHCGA() ? S.trainings.filter(t => t.status === 'menunggu_hcga') : [];
  const piagam = [];
  if (isHCGA()) S.trainings.forEach(t => t.peserta.forEach(u => { if (t.prog[u]?.piagam?.status === 'diajukan') piagam.push({ t, u }); }));
  return { atasan, hc, piagam };
}

/* ======================= TUGAS SAYA ======================= */
function vLndTugas() {
  const x = myLndTasks(), m = me();
  let h = `<div class="page-head"><div><h1>Tugas saya</h1><p class="muted">Semua yang perlu Anda isi: feedback interview, probation & kontrak, onboarding, training, dan penilaian 360°.</p></div></div>`;
  let any = false;
  h += fbar('tugas', { status: false, ph: 'Cari tugas…' });
  const tt = taTasks();
  if (tt.length) { any = true; h += card('Talent Acquisition', `<div class="list">${tt.map(t => row({ href: t.href, title: esc(t.title), sub: esc(t.sub), right: `<a class="btn sm primary" href="${t.href}">${t.btn}</a>` })).join('')}</div>`, '', `${tt.length} tugas`); }
  if (x.onb) {
    any = true;
    const o = x.onb, done = o.tasks.filter(k => k.status === 'selesai').length;
    h += card('Onboarding', `<div class="card-b">${stepLine(onbSteps(o))}
      <div class="tests">${testCard('Tahap 1 · Pretest', o.pre, 'qs1', !o.pre ? `<a class="btn primary sm" href="#/tes/onb-pre/${o.id}">Kerjakan pretest</a>` : '', 'Mengukur pengetahuan awal sebelum sesi pemaparan onboarding.')}
      ${testCard('Tahap 2 · Posttest', o.post, 'qs1', o.post ? '' : o.pemaparanAt ? `<a class="btn primary sm" href="#/tes/onb-post/${o.id}">Kerjakan posttest</a>` : '<span class="muted" style="font-size:12.5px">Terbuka setelah sesi pemaparan</span>', 'Diisi setelah sesi pemaparan onboarding.')}</div></div>
      ${onbTaskList(o, 'owner')}`, '', `Bergabung ${fd(o.join)} · mentor ${esc(user(user(o.userId).atasan).nama)} · ${done}/${o.tasks.length} tugas selesai`);
  }
  if (x.train.length) {
    any = true;
    h += card('Training', `<div class="list">${x.train.map(({ t, todo }) => `<div class="trrow"><div class="trh"><div><b>${esc(t.judul)}</b><div class="muted" style="font-size:12.5px">${fd(t.tanggal)} · ${t.mode} · ${t.penyelenggara}${t.userId === m.id ? ' · Anda PIC' : ''}</div></div><a class="link" href="#/training/${t.id}">Detail</a></div>${stepLine(trSteps(t, m.id))}<div class="btns" style="margin-top:10px">${trActions(t, m.id)}</div></div>`).join('')}</div>`);
  }
  if (x.evals.length) {
    any = true;
    h += card('Penilaian perilaku pasca-training (360°)', `<div class="list">${x.evals.map(({ e, p }) => row({ href: `#/n360/${e.id}`, title: `Nilai ${esc(user(e.userId).nama)}`, sub: `${esc(e.trainingNama)} · Anda sebagai ${p.hub.toLowerCase()}`, right: `<a class="btn sm primary" href="#/n360/${e.id}">Isi penilaian</a>` })).join('')}</div>`);
  }
  if (x.onbVerif.length) {
    any = true;
    h += card('Verifikasi tugas onboarding', `<div class="list">${x.onbVerif.map(({ o, k }) => `<div class="row nw" style="cursor:default"><span class="rm"><span class="rt" style="white-space:normal">${esc(k.judul)}</span><span class="rs">${esc(user(o.userId).nama)}${k.note ? ' · "' + esc(k.note) + '"' : ''}${k.file ? ' · ' + esc(k.file) : ''}</span></span><span class="rr"><button class="btn sm" data-act="ot-revisi" data-o="${o.id}" data-k="${k.id}">Revisi</button><button class="btn sm primary" data-act="ot-acc" data-o="${o.id}" data-k="${k.id}">Acc</button></span></div>`).join('')}</div>`, '', 'Anda sebagai mentor / HC');
  }
  if (!any) h += card('Tugas', empty('Tidak ada tugas LnD saat ini.'));
  return h;
}
function testCard(title, rec, qsId, action, desc) {
  return `<div class="testc ${rec ? 'done' : ''}"><div class="tt2">${title}</div><div class="muted" style="font-size:12.5px;margin:2px 0 8px">${desc}</div>${rec ? `<div>Nilai: ${skorTxt(rec, qsId)} <span class="faint" style="font-size:12px">· ${fdt(rec.at)}</span></div>` : action}</div>`;
}
function onbTaskList(o, mode) {
  const isOwner = o.userId === me().id;
  return `<div class="tw"><table class="t"><thead><tr><th>Tugas</th><th class="hide-sm">Target</th><th class="hide-sm">Acc oleh</th><th>Status</th><th></th></tr></thead><tbody>${o.tasks.map(k => {
    let act = '';
    if (isOwner && k.status === 'belum') act = `<button class="btn sm" data-act="ot-start" data-o="${o.id}" data-k="${k.id}">Mulai</button>`;
    if (isOwner && ['proses', 'revisi'].includes(k.status)) act = `<button class="btn sm primary" data-act="ot-submit" data-o="${o.id}" data-k="${k.id}">Ajukan selesai</button>`;
    const canVerif = k.status === 'menunggu' && ((k.verif === 'hc' && isHCGA()) || (k.verif === 'atasan' && (user(o.userId).atasan === me().id || isHCGA())));
    if (canVerif) act = `<button class="btn sm" data-act="ot-revisi" data-o="${o.id}" data-k="${k.id}">Revisi</button><button class="btn sm primary" data-act="ot-acc" data-o="${o.id}" data-k="${k.id}">Acc</button>`;
    return `<tr><td><span class="ni">${esc(k.judul)}</span>${k.note ? `<span class="s">${esc(k.note)}${k.file ? ' · ' + esc(k.file) : ''}</span>` : k.file ? `<span class="s">${esc(k.file)}</span>` : ''}</td><td class="hide-sm num">${fds(addDays(o.join, k.hari))}</td><td class="hide-sm">${VERIF[k.verif]}</td><td>${otPill(k.status)}</td><td class="r"><div class="btns" style="justify-content:flex-end;flex-wrap:nowrap">${act}</div></td></tr>`;
  }).join('')}</tbody></table></div>`;
}
function trActions(t, uid) {
  const p = t.prog[uid] || {}, after = afterPhase(t), b = [];
  if (!p.commit) b.push(`<button class="btn sm" data-act="tpl-dl" data-id="commit">${ic('dl')} Template commitment letter</button><button class="btn sm primary" data-act="tr-commit" data-id="${t.id}">Unggah commitment letter</button>`);
  if (t.tes && !p.pre && !after) b.push(`<a class="btn sm primary" href="#/tes/tr-pre/${t.id}">Kerjakan pretest</a>`);
  if (after) {
    if (!p.reaction) b.push(`<a class="btn sm primary" href="#/reaction/${t.id}">Isi form reaction</a>`);
    if (t.tes && !p.post) b.push(`<a class="btn sm primary" href="#/tes/tr-post/${t.id}">Kerjakan posttest</a>`);
    if (uid === t.userId && !p.result) b.push(`<button class="btn sm" data-act="tpl-dl" data-id="result">${ic('dl')} Template training result</button><button class="btn sm primary" data-act="tr-result" data-id="${t.id}">Unggah training result</button>`);
    if (t.penyelenggara === 'Internal') {
      if (!p.piagam || p.piagam.status === 'ditolak') b.push(`<button class="btn sm" data-act="tr-piagam" data-id="${t.id}">Ajukan piagam</button>`);
      else if (p.piagam.status === 'diajukan') b.push('<span class="pill amber">Piagam menunggu HC</span>');
      else b.push(`<a class="btn sm" href="#/piagam/${t.id}/${uid}">${ic('print')} Lihat piagam</a>`);
    }
  } else b.push(`<span class="muted" style="font-size:12.5px">Tugas sesudah training terbuka setelah ${fd(t.tanggal)}.</span>`);
  return b.join('');
}

/* ======================= TES ======================= */
function vTes(kind, ref) {
  const isOnb = kind.startsWith('onb'), pre = kind.endsWith('pre');
  const src = isOnb ? S.onb.find(o => o.id === ref) : S.trainings.find(t => t.id === ref);
  if (!src) return notFound();
  const qsId = isOnb ? 'qs1' : src.tes, qs = qset(qsId);
  if (!qs) return notFound();
  const title = isOnb ? `${pre ? 'Pre-Test' : 'Post-Test'} Onboarding` : `${pre ? 'Pretest' : 'Posttest'} · ${src.judul}`;
  return `<a class="back" href="#/lnd-tugas">${ic('left')} Tugas saya</a>
  <div class="page-head"><div><div class="eyebrow">${isOnb ? 'Onboarding' : 'Training'}</div><h1>${esc(title)}</h1><p class="muted">${qs.qs.length} pertanyaan pilihan ganda · ${pre ? 'mengukur pengetahuan awal' : 'mengukur pemahaman setelah materi'}. Hasil tidak memengaruhi status Anda di tim.</p></div></div>
  <form class="card quiz" data-form="tes" data-kind="${kind}" data-ref="${ref}" style="max-width:820px"><div class="card-b">${qs.qs.map((q, i) => `<fieldset class="qq"><legend><span class="qn">${i + 1}</span>${esc(q.q)}</legend>${q.opts.map((o, j) => `<label class="qo"><input type="radio" name="q${i}" value="${j}"><span class="ql">${'ABCD'[j]}</span><span>${esc(o)}</span></label>`).join('')}</fieldset>`).join('')}
  <div id="formErr"></div><div class="form-foot"><a class="btn" href="#/lnd-tugas">Batal</a><button class="btn primary">Kirim jawaban</button></div></div></form>`;
}

/* ======================= REACTION ======================= */
function scaleInput(name, n) {
  return `<div class="scale" role="radiogroup">${[...Array(n)].map((_, i) => `<label><input type="radio" name="${name}" value="${i + 1}"><span>${i + 1}</span></label>`).join('')}</div>`;
}
function vReaction(id) {
  const t = S.trainings.find(x => x.id === id), u = me();
  if (!t || !t.peserta.includes(u.id)) return noAccess();
  return `<a class="back" href="#/lnd-tugas">${ic('left')} Tugas saya</a>
  <div class="page-head"><div><div class="eyebrow">Form evaluasi pelatihan</div><h1>${esc(t.judul)}</h1><p class="muted">Terima kasih telah berpartisipasi. Form ini untuk mengetahui tingkat kepuasan Anda terhadap pelatihan; masukan Super Team sangat berharga untuk program berikutnya.</p></div></div>
  <form class="card" data-form="reaction" data-id="${t.id}" style="max-width:820px"><div class="card-b form">
    <dl class="d"><dt>Nama lengkap</dt><dd>${esc(u.nama)}</dd><dt>Divisi</dt><dd>${esc(u.dept)}</dd><dt>Judul training</dt><dd>${esc(t.judul)}</dd><dt>Penyelenggara</dt><dd>${t.penyelenggara === 'Internal' ? 'Internal' : esc(t.vendor)}</dd></dl>
    <div class="scalehint"><span>1 = sangat tidak setuju</span><span>10 = sangat setuju</span></div>
    ${FORM_REACT_QS.map((q, i) => `<div class="sq"><div class="sqt"><span class="qn">${i + 1}</span>${esc(q)}</div>${scaleInput('r' + i, 10)}</div>`).join('')}
    <div class="fs-t" style="margin-top:6px">Kritik dan saran</div>
    <div class="f"><label>${esc(FORM_REACT_OPEN[0])}</label><textarea name="saran"></textarea></div>
    <div class="f"><label>${esc(FORM_REACT_OPEN[1])}</label><input type="text" name="butuh"></div>
    <div id="formErr"></div><div class="form-foot"><a class="btn" href="#/lnd-tugas">Batal</a><button class="btn primary">Kirim</button></div></div></form>`;
}

/* ======================= TRAINING ======================= */
const trTotal = t => t.harga * t.peserta.length;
function trPill(t) { const map = { menunggu_atasan: ['Menunggu atasan', 'amber'], menunggu_hcga: ['Menunggu HC', 'amber'], disetujui: ['Disetujui · persiapan', 'teal'], terlaksana: ['Pasca training', 'blue'], selesai: ['Selesai', 'gray'], ditolak: ['Ditolak', 'red'], dibatalkan: ['Dibatalkan', 'gray'] }[t.status]; return `<span class="pill ${map[1]}">${map[0]}</span>`; }
function trTable(list, who) {
  if (!list.length) return empty('Belum ada pengajuan training.');
  return `<div class="tw"><table class="t"><thead><tr><th>Training</th>${who ? '<th>PIC</th>' : ''}<th class="hide-sm">Pelaksanaan</th><th class="r hide-sm">Peserta</th><th class="r hide-sm">Biaya</th><th>Status</th></tr></thead><tbody>${list.map(t => `<tr class="click" data-href="#/training/${t.id}"><td><b>${esc(t.judul)}</b><span class="s">${t.no} · ${t.penyelenggara} · ${t.mode}</span></td>${who ? `<td>${userCell(t.userId)}</td>` : ''}<td class="hide-sm num">${fds(t.tanggal)}</td><td class="r num hide-sm">${t.peserta.length}</td><td class="r num hide-sm">${t.harga ? rp(trTotal(t)) : 'Gratis'}</td><td>${trPill(t)}</td></tr>`).join('')}</tbody></table></div>`;
}
function vTrainingList(q) {
  lndSyncAll();
  const m = me().id, all = (isHCGA() ? S.trainings : S.trainings.filter(t => t.userId === m || t.peserta.includes(m))).slice().sort((a, b) => b.tglAju.localeCompare(a.tglAju));
  const f = q.f || 'aktif', g = { aktif: all.filter(t => !['selesai', 'ditolak', 'dibatalkan'].includes(t.status)), selesai: all.filter(t => ['selesai', 'ditolak', 'dibatalkan'].includes(t.status)), semua: all };
  return `<div class="page-head"><div><div class="eyebrow">Learning & Development</div><h1>Pengajuan training</h1><p class="muted">Alur: Anda → atasan → HC. Setelah disetujui, ada tugas sebelum & sesudah training.</p></div><a class="btn primary" href="#/training/baru">${ic('plus')} Ajukan training</a></div>
  <div class="tabs">${[['aktif', 'Berjalan'], ['selesai', 'Selesai & ditolak'], ['semua', 'Semua']].map(([k, l]) => `<a href="#/training?f=${k}" class="${f === k ? 'on' : ''}">${l} <span class="c">${g[k].length}</span></a>`).join('')}</div>
  ${fbar('training', { dept: isHCGA() })}
  <section class="card">${trTable(g[f], isHCGA())}</section>`;
}
function vTrainingForm() {
  const u = me();
  return `<a class="back" href="#/training">${ic('left')} Pengajuan training</a>
  <div class="page-head"><div><h1>Ajukan training</h1><p class="muted">Alur persetujuan: ${u.atasan ? esc(user(u.atasan).nama) + ' (atasan) → ' : ''}HC. Atasan peserta lain akan mendapat notifikasi.</p></div></div>
  <form class="cols-main" data-form="training" data-live="training" novalidate>
    <div class="card"><div class="card-b form"><div class="fgrid">
      <div class="f full"><label>Judul training</label><input type="text" name="judul" placeholder="mis. Google Analytics 4 untuk Tim Marketing"></div>
      <div class="f"><label>Tanggal pengajuan</label><input type="date" value="${TODAY}" readonly></div>
      <div class="f"><label>Tanggal pelaksanaan</label><input type="date" name="tanggal" value="${addDays(TODAY, 14)}" min="${TODAY}"></div>
      <div class="f full"><span class="lb">Penyelenggara</span><div class="choice"><label><input type="radio" name="penyelenggara" value="Eksternal" checked><span><b>Eksternal</b><span>Vendor / lembaga luar</span></span></label><label><input type="radio" name="penyelenggara" value="Internal"><span><b>Internal</b><span>Trainer dari dalam perusahaan · bisa ajukan piagam</span></span></label></div></div>
      <div class="f"><label id="vendorLbl">Vendor</label><input type="text" name="vendor" placeholder="Nama vendor / trainer"></div>
      <div class="f"><span class="lb">Jenis training</span><div class="seg2"><label><input type="radio" name="mode" value="Online"><span>Online</span></label><label><input type="radio" name="mode" value="Offline" checked><span>Offline</span></label></div></div>
      <div class="f"><label>Harga per peserta</label><input type="number" name="harga" min="0" step="1000" placeholder="0"></div>
      <div class="f full"><span class="lb">Peserta</span>
        <div class="peserta" id="pList"><div class="pchip me">${esc(u.nama)} <span class="faint">(PIC)</span></div></div>
        <div class="inrow" style="margin-top:8px"><select id="pAdd">${opts([['', 'Tambah peserta…'], ...S.users.filter(x => x.id !== u.id && x.posisi !== 'Driver' && x.akun !== 'nonaktif').map(x => [x.id, `${x.nama} · ${x.dept}`])])}</select></div>
        <span class="hint">Peserta tambahan ikut mengerjakan commitment letter, form reaction, dan pretest/posttest.</span></div>
    </div><div id="formErr"></div>
    <div class="form-foot"><a class="btn" href="#/training">Batal</a><button class="btn primary">Kirim ke ${u.atasan ? esc(user(u.atasan).nama.split(' ')[0]) : 'HC'}</button></div></div></div>
    <aside class="card sum"><div class="card-h"><h2>Ringkasan biaya</h2></div><div class="card-b" id="tsum"></div></aside>
  </form>`;
}
let TR_PESERTA = [];
function liveTraining(f, e) {
  if (e && e.target.id === 'pAdd' && e.target.value) { if (!TR_PESERTA.includes(e.target.value)) TR_PESERTA.push(e.target.value); e.target.value = ''; }
  $('#pList').innerHTML = `<div class="pchip me">${esc(me().nama)} <span class="faint">(PIC)</span></div>` + TR_PESERTA.map(id => `<div class="pchip">${esc(user(id).nama)}<button type="button" data-act="tr-prm" data-id="${id}" aria-label="Hapus">${ic('x')}</button></div>`).join('');
  const intl = (f.querySelector('[name=penyelenggara]:checked') || {}).value === 'Internal';
  $('#vendorLbl').textContent = intl ? 'Trainer internal' : 'Vendor';
  const harga = +f.elements.harga.value || 0, n = TR_PESERTA.length + 1;
  const byDept = {};
  [me().id, ...TR_PESERTA].forEach(id => { const dp = user(id).dept; byDept[dp] = (byDept[dp] || 0) + harga; });
  $('#tsum').innerHTML = kv('Harga per peserta', harga ? rp(harga) : 'Gratis') + kv('Jumlah peserta', n) + kv('Total biaya', rp(harga * n), 'total') + `<div style="height:10px"></div><div class="muted" style="font-size:12px;margin-bottom:4px">Memotong budget training divisi:</div>` + Object.entries(byDept).map(([dp, v]) => { const used = budgetUsed(dp), alloc = S.lndBudget[dp] || 0; return kv(esc(dp), `${rp(v)} <small class="faint">· sisa ${rpc(Math.max(0, alloc - used))}</small>`); }).join('');
}
function budgetUsed(dp, yr) {
  yr = yr || TODAY.slice(0, 4);
  return S.trainings.filter(t => ['disetujui', 'terlaksana', 'selesai'].includes(t.status) && t.tanggal.slice(0, 4) === yr).reduce((a, t) => a + t.peserta.filter(u => user(u).dept === dp).length * t.harga, 0);
}

function vTrainingDetail(id) {
  lndSyncAll();
  const t = S.trainings.find(x => x.id === id);
  if (!t) return notFound();
  const m = me();
  const canSee = isHCGA() || t.peserta.includes(m.id) || t.peserta.some(u => user(u).atasan === m.id);
  if (!canSee) return noAccess();
  let act = '';
  if (t.status === 'menunggu_atasan' && (user(t.userId).atasan === m.id || delegasiAktif(user(t.userId).atasan) === m.id)) act = `<div class="act amber"><div><b>Menunggu persetujuan Anda</b><p>Total ${rp(trTotal(t))} untuk ${t.peserta.length} peserta. Setelah disetujui, diteruskan ke HC.</p></div><div class="btns"><button class="btn danger" data-act="tr-reject" data-id="${t.id}">Tolak</button><button class="btn primary" data-act="tr-approve" data-id="${t.id}">Setujui</button></div></div>`;
  else if (t.status === 'menunggu_hcga' && isHCGA()) act = `<div class="act amber block"><b>Menunggu persetujuan HC</b><p>Budget ${[...new Set(t.peserta.map(u => user(u).dept))].map(dp => `${esc(dp)}: terpakai ${rpc(budgetUsed(dp))} dari ${rpc(S.lndBudget[dp] || 0)}`).join(' · ')}</p>
    <div class="fgrid" style="margin-top:12px"><div class="f"><label>Pretest & posttest training</label><select id="tesSel">${opts([['', 'Tidak ada'], ...S.qsets.map(q => [q.id, q.nama])])}</select><span class="hint">Pilih set soal dari Bank soal bila training ini memakai tes.</span></div></div>
    <div class="form-foot"><button class="btn danger" data-act="tr-reject" data-id="${t.id}">Tolak</button><button class="btn primary" data-act="tr-approve" data-id="${t.id}">Setujui</button></div></div>`;
  else if (t.status === 'disetujui' && isHCGA()) act = `<div class="act"><div><b>Disetujui · tahap persiapan</b><p>Peserta mengisi commitment letter${t.tes ? ' & pretest' : ''}. Tugas sesudah training terbuka otomatis setelah ${fd(t.tanggal)}.</p></div><button class="btn" data-act="tr-done" data-id="${t.id}">Tandai sudah terlaksana</button></div>`;
  else if (t.peserta.includes(m.id) && ['disetujui', 'terlaksana'].includes(t.status)) act = `<div class="act block"><b>Tugas Anda</b>${stepLine(trSteps(t, m.id))}<div class="btns" style="margin-top:10px">${trActions(t, m.id)}</div></div>`;
  else if (t.userId === m.id && ['menunggu_atasan', 'menunggu_hcga'].includes(t.status)) act = `<div class="act"><div><b>${t.status === 'menunggu_atasan' ? 'Menunggu atasan' : 'Menunggu HC'}</b><p>Anda akan mendapat notifikasi saat ada keputusan.</p></div><button class="btn danger" data-act="tr-cancel" data-id="${t.id}">Batalkan</button></div>`;
  const piagamHC = isHCGA() ? t.peserta.filter(u => t.prog[u]?.piagam?.status === 'diajukan') : [];
  const progRows = t.peserta.map(u => { const p = t.prog[u] || {}, rs = p.reaction ? avg(p.reaction.s) : null;
    return `<tr><td><b>${esc(user(u).nama)}</b>${u === t.userId ? ' <span class="tag">PIC</span>' : ''}<span class="s">${esc(user(u).dept)}</span></td><td>${['disetujui', 'terlaksana', 'selesai'].includes(t.status) ? stepLine(trSteps(t, u)) : '<span class="faint">–</span>'}</td><td class="r num hide-sm">${rs != null ? f1(rs) : '–'}</td><td class="hide-sm">${[p.commit && `<span class="file">${ic('file')}${esc(p.commit.file)}</span>`, p.result && `<span class="file">${ic('file')}${esc(p.result.file)}</span>`].filter(Boolean).join(' ') || '<span class="faint">–</span>'}</td><td class="r">${piagamHC.includes(u) ? `<div class="btns" style="justify-content:flex-end;flex-wrap:nowrap"><button class="btn sm" data-act="pg-reject" data-id="${t.id}" data-u="${u}">Tolak</button><button class="btn sm primary" data-act="pg-approve" data-id="${t.id}" data-u="${u}">Acc piagam</button></div>` : p.piagam?.status === 'disetujui' ? `<a class="btn sm" href="#/piagam/${t.id}/${u}">Piagam</a>` : ''}</td></tr>`; }).join('');
  return `<a class="back" href="#/${isHCGA() ? 'lnd-training' : 'training'}">${ic('left')} ${isHCGA() ? 'Progres training' : 'Pengajuan training'}</a>
  <div class="page-head"><div><div class="eyebrow num">${t.no}</div><h1>${esc(t.judul)}</h1><p class="muted">${fd(t.tanggal)} · ${t.mode} · ${t.penyelenggara} · ${esc(t.vendor)}</p></div>${trPill(t)}</div>
  ${act}
  <div class="cols-main"><div>
  ${card('Progres peserta', `<div class="tw"><table class="t"><thead><tr><th>Peserta</th><th>Line proses</th><th class="r hide-sm">Reaction</th><th class="hide-sm">Dokumen</th><th></th></tr></thead><tbody>${progRows}</tbody></table></div>`)}
  ${card('Detail pengajuan', `<div class="card-b"><dl class="d"><dt>PIC</dt><dd>${esc(user(t.userId).nama)} · ${esc(user(t.userId).dept)}</dd><dt>Tanggal pengajuan</dt><dd>${fd(t.tglAju)}</dd><dt>Tanggal pelaksanaan</dt><dd>${fd(t.tanggal)}</dd><dt>Penyelenggara</dt><dd>${t.penyelenggara} · ${esc(t.vendor)}</dd><dt>Jenis</dt><dd>${t.mode}</dd><dt>Harga</dt><dd class="num">${t.harga ? `${rp(t.harga)} × ${t.peserta.length} peserta = <b>${rp(trTotal(t))}</b>` : 'Gratis (internal)'}</dd><dt>Pretest/posttest</dt><dd>${t.tes ? esc(qset(t.tes).nama) : 'Tidak ada'}</dd></dl></div>`)}
  </div><div>${card('Riwayat', `<div class="card-b">${timeline(t.log)}</div>`)}</div></div>`;
}

/* ======================= HC: PROGRES TRAINING ======================= */
function vLndTraining(q) {
  if (!isHCGA()) return noAccess();
  lndSyncAll();
  const f = q.f || 'aktif';
  const list = S.trainings.filter(t => f === 'aktif' ? ['disetujui', 'terlaksana'].includes(t.status) : f === 'aju' ? ['menunggu_atasan', 'menunggu_hcga'].includes(t.status) : t.status === 'selesai').sort((a, b) => a.tanggal.localeCompare(b.tanggal));
  const cnt = k => S.trainings.filter(t => k === 'aktif' ? ['disetujui', 'terlaksana'].includes(t.status) : k === 'aju' ? ['menunggu_atasan', 'menunggu_hcga'].includes(t.status) : t.status === 'selesai').length;
  const body = f === 'aju' ? trTable(list, true) : list.length ? list.map(t => `<section class="card fi"><div class="card-h"><div><a href="#/training/${t.id}" style="color:inherit;text-decoration:none"><h2>${esc(t.judul)}</h2></a><span class="sub">${fd(t.tanggal)} · ${t.penyelenggara} · ${t.peserta.length} peserta · ${t.peserta.filter(u => pesertaDone(t, u)).length} selesai</span></div>${trPill(t)}</div>
    <div class="tw"><table class="t lines"><tbody>${t.peserta.map(u => `<tr class="click" data-href="#/training/${t.id}"><td style="width:200px"><b>${esc(user(u).nama)}</b>${u === t.userId ? ' <span class="tag">PIC</span>' : ''}<span class="s">${esc(user(u).dept)}</span></td><td>${stepLine(trSteps(t, u))}</td><td class="r" style="width:110px">${pesertaDone(t, u) ? '<span class="pill teal">Selesai</span>' : '<span class="pill gray">Belum</span>'}</td></tr>`).join('')}</tbody></table></div></section>`).join('') : `<section class="card">${empty('Tidak ada training.')}</section>`;
  return `<div class="page-head"><div><div class="eyebrow">Learning & Development</div><h1>Progres training</h1><p class="muted">Line proses tiap peserta: commitment letter → pretest → pelaksanaan → reaction → posttest → training result → piagam.</p></div><a class="btn primary" href="#/training/baru">${ic('plus')} Ajukan training</a></div>
  <div class="tabs">${[['aktif', 'Sedang berjalan'], ['aju', 'Pengajuan'], ['selesai', 'Selesai']].map(([k, l]) => `<a href="#/lnd-training?f=${k}" class="${f === k ? 'on' : ''}">${l} <span class="c">${cnt(k)}</span></a>`).join('')}</div>
  ${fbar('ltr', { dept: true, ph: 'Cari judul training atau peserta…' })}
  <div class="legend" style="margin:0 0 12px"><span><i style="background:var(--brand)"></i>Selesai</span><span><i style="background:#fff;border:2px solid var(--line)"></i>Belum</span><span><i style="background:#D69A2D"></i>Menunggu acc</span><span><i style="background:var(--faint)"></i>Terlewat / opsional</span></div>
  ${body}`;
}

/* ======================= HC: ONBOARDING ======================= */
function vLndOnb() {
  if (!isHCGA()) return noAccess();
  lndSyncAll();
  const rows = S.onb.slice().sort((a, b) => b.join.localeCompare(a.join));
  return `<div class="page-head"><div><div class="eyebrow">Learning & Development</div><h1>Onboarding</h1><p class="muted">Karyawan baru: pretest → sesi pemaparan → posttest → daftar tugas dengan acc HC / atasan.</p></div><button class="btn primary" data-act="onb-add">${ic('plus')} Tambah karyawan onboarding</button></div>
  ${fbar('onb', { dept: true })}
  <section class="card"><div class="tw"><table class="t lines"><thead><tr><th>Karyawan</th><th>Line proses</th><th class="r">Pre</th><th class="r">Post</th><th>Status</th></tr></thead><tbody>${rows.map(o => `<tr class="click" data-href="#/onb/${o.id}"><td style="width:220px"><b>${esc(user(o.userId).nama)}</b><span class="s">${esc(user(o.userId).jabatan)} · join ${fds(o.join)}</span></td><td>${stepLine(onbSteps(o))}</td><td class="r num">${o.pre ? (scoreOf(o.pre, 'qs1') ?? '…') : '–'}</td><td class="r num">${o.post ? (scoreOf(o.post, 'qs1') ?? '…') : '–'}</td><td>${o.status === 'selesai' ? '<span class="pill gray">Selesai</span>' : '<span class="pill blue">Berjalan</span>'}</td></tr>`).join('')}</tbody></table></div></section>
  ${keysReady(qset('qs1')) ? '' : `<div class="alert warn">Kunci jawaban pretest/posttest onboarding belum diatur, jadi nilai tes baru belum bisa dihitung. <a href="#/lnd-set?tab=soal">Atur kunci jawaban</a></div>`}`;
}
function vOnbDetail(id) {
  lndSyncAll();
  const o = S.onb.find(x => x.id === id);
  if (!o) return notFound();
  if (!(isHCGA() || user(o.userId).atasan === me().id)) return noAccess();
  const u = user(o.userId), pre = scoreOf(o.pre, 'qs1'), post = scoreOf(o.post, 'qs1');
  return `<a class="back" href="#/${isHCGA() ? 'lnd-onb' : 'lnd-tim'}">${ic('left')} ${isHCGA() ? 'Onboarding' : 'Tim saya'}</a>
  <div class="page-head"><div><div class="eyebrow">Onboarding</div><h1>${esc(u.nama)}</h1><p class="muted">${esc(u.jabatan)} · ${esc(u.dept)} · bergabung ${fd(o.join)} · mentor ${esc(user(u.atasan).nama)}</p></div>${o.status === 'selesai' ? '<span class="pill gray">Selesai</span>' : '<span class="pill blue">Berjalan</span>'}</div>
  ${stepLine(onbSteps(o))}
  ${isHCGA() && o.pre && !o.pemaparanAt ? `<div class="act" style="margin-top:14px"><div><b>Pretest sudah dikerjakan</b><p>Setelah sesi pemaparan onboarding selesai, buka posttest (tahap 2).</p></div><button class="btn primary" data-act="onb-paparan" data-id="${o.id}">Pemaparan selesai · buka posttest</button></div>` : ''}
  <div class="tiles" style="margin-top:16px">${tile('Pretest', o.pre ? (pre ?? '…') : '–', o.pre ? fdt(o.pre.at) : 'belum dikerjakan')}${tile('Posttest', o.post ? (post ?? '…') : '–', o.post ? fdt(o.post.at) : o.pemaparanAt ? 'belum dikerjakan' : 'menunggu pemaparan')}${tile('Kenaikan nilai', pre != null && post != null ? (post - pre >= 0 ? '+' : '') + (post - pre) : '–', 'posttest − pretest')}${tile('Tugas selesai', `${o.tasks.filter(k => k.status === 'selesai').length}/${o.tasks.length}`, `${o.tasks.filter(k => k.status === 'menunggu').length} menunggu acc`)}</div>
  ${card('Daftar tugas onboarding', onbTaskList(o, 'admin'))}`;
}

/* ======================= 360 ======================= */
function evalAvg(e, hub) { const s = e.penilai.filter(p => p.s && (!hub || p.hub === hub)).map(p => avg(p.s)); return s.length ? avg(s) : null; }
function vLnd360() {
  if (!isHCGA()) return noAccess();
  const rows = S.evals.slice().sort((a, b) => b.at - a.at);
  const due = S.trainings.filter(t => t.status === 'selesai' && daysBetween(t.tanggal, TODAY) >= 85).flatMap(t => t.peserta.map(u => ({ t, u }))).filter(({ t, u }) => !S.evals.some(e => e.userId === u && e.trainingId === t.id));
  return `<div class="page-head"><div><div class="eyebrow">Learning & Development</div><h1>Penilaian 360°</h1><p class="muted">Training behavior evaluation: penilaian penerapan hasil training ±3 bulan setelah training, oleh atasan langsung, rekan satu tim, dan rekan lintas divisi.</p></div><a class="btn primary" href="#/l360/baru">${ic('plus')} Buat penilaian</a></div>
  ${due.length ? card('Sudah waktunya dievaluasi', `<div class="list">${due.slice(0, 6).map(({ t, u }) => row({ href: `#/l360/baru?u=${u}&t=${t.id}`, title: `${esc(user(u).nama)} · ${esc(t.judul)}`, sub: `Training ${fd(t.tanggal)} · ${daysBetween(t.tanggal, TODAY)} hari lalu`, right: `<a class="btn sm" href="#/l360/baru?u=${u}&t=${t.id}">Buat penilaian</a>` })).join('')}</div>`, '', '≥ 3 bulan setelah training') : ''}
  ${fbar('l360', { status: false, dept: true, ph: 'Cari karyawan atau training…' })}
  ${card('Penilaian', rows.length ? `<div class="tw"><table class="t"><thead><tr><th>Karyawan dinilai</th><th>Training</th><th class="r">Terisi</th><th class="r">Rata-rata</th><th></th></tr></thead><tbody>${rows.map(e => { const n = e.penilai.filter(p => p.s).length, a = evalAvg(e); return `<tr class="click" data-href="#/l360/${e.id}"><td>${userCell(e.userId)}</td><td>${esc(e.trainingNama)}<span class="s">dibuat ${fds(new Date(e.at).toISOString().slice(0, 10))}</span></td><td class="r num">${n}/${e.penilai.length}</td><td class="r num">${a != null ? `<b>${f1(a)}</b> / 10` : '–'}</td><td class="r"><a class="link" href="#/l360/${e.id}">Laporan</a></td></tr>`; }).join('')}</tbody></table></div>` : empty('Belum ada penilaian.'))}`;
}
function vL360New(q) {
  if (!isHCGA()) return noAccess();
  return `<a class="back" href="#/lnd-360">${ic('left')} Penilaian 360°</a>
  <div class="page-head"><div><h1>Buat penilaian 360°</h1><p class="muted">Pilih karyawan dan penilai. Setelah dikirim, setiap penilai mendapat tugas untuk mengisi form.</p></div></div>
  <form class="card" style="max-width:820px" data-form="l360" data-live="l360" novalidate><div class="card-b form">
    <div class="fgrid">
      <div class="f"><label>Karyawan yang dievaluasi</label><select name="userId">${opts([['', 'Pilih karyawan…'], ...S.users.filter(u => u.posisi !== 'Driver').map(u => [u.id, `${u.nama} · ${u.dept}`])], q.u || '')}</select></div>
      <div class="f"><label>Divisi</label><input type="text" name="divisi" readonly></div>
      <div class="f full"><label>Nama training yang diikuti</label><select name="trainingId" data-pre="${esc(q.t || '')}"></select></div>
      <div class="f full" data-lain hidden><label>Nama training (lainnya)</label><input type="text" name="trainingLain"></div>
    </div>
    <fieldset class="fs"><div class="fs-t">Penilai</div>
      <div class="tw cat"><table class="t"><thead><tr><th>Nama evaluator</th><th>Posisi / hubungan</th><th style="width:40px"></th></tr></thead><tbody id="pnRows"></tbody></table></div>
      <div><button type="button" class="btn sm" data-act="pn-add">${ic('plus')} Tambah penilai</button></div>
    </fieldset>
    <div id="formErr"></div><div class="form-foot"><a class="btn" href="#/lnd-360">Batal</a><button class="btn primary">Kirim ke penilai</button></div>
  </div></form>`;
}
const pnRow = (uid, hub, ex) => `<tr><td><select name="pn">${opts([['', 'Pilih…'], ...S.users.filter(u => u.posisi !== 'Driver' && u.id !== ex).map(u => [u.id, `${u.nama} · ${u.dept}`])], uid || '')}</select></td><td><select name="hub">${opts(FORM_360_HUB, hub || FORM_360_HUB[1])}</select></td><td><button type="button" class="ibtn" data-act="pn-del" aria-label="Hapus">${ic('x')}</button></td></tr>`;
function liveL360(f, e) {
  const uid = f.elements.userId.value;
  if (!e || e.target.name === 'userId') {
    f.elements.divisi.value = uid ? user(uid).dept : '';
    const tr = uid ? S.trainings.filter(t => t.peserta.includes(uid) && ['selesai', 'terlaksana'].includes(t.status)) : [];
    const pre = f.elements.trainingId.dataset.pre;
    f.elements.trainingId.innerHTML = opts([...tr.map(t => [t.id, `${t.judul} · ${fds(t.tanggal)}`]), ['lain', 'Lainnya…']], pre && tr.some(t => t.id === pre) ? pre : (tr[0]?.id || 'lain'));
    const rows = $('#pnRows');
    if (uid && !rows.children.length || (e && e.target.name === 'userId')) rows.innerHTML = uid && user(uid).atasan ? pnRow(user(uid).atasan, 'Atasan langsung', uid) + pnRow('', 'Rekan satu tim', uid) + pnRow('', 'Rekan lintas divisi', uid) : pnRow('', 'Rekan satu tim', uid);
  }
  f.querySelector('[data-lain]').hidden = f.elements.trainingId.value !== 'lain';
}
function vN360(id) {
  const e = S.evals.find(x => x.id === id), m = me();
  const p = e && e.penilai.find(x => x.uid === m.id);
  if (!p) return noAccess();
  const u = user(e.userId);
  return `<a class="back" href="#/lnd-tugas">${ic('left')} Tugas saya</a>
  <div class="page-head"><div><div class="eyebrow">Training behavior evaluation</div><h1>Penilaian untuk ${esc(u.nama)}</h1><p class="muted">Menilai sejauh mana pembelajaran dari training diterapkan dan terlihat dalam perilaku serta pekerjaan sehari-hari. Berikan penilaian berdasarkan kondisi yang benar-benar terlihat dalam pekerjaan, bukan asumsi.</p></div></div>
  <form class="card" data-form="n360" data-id="${e.id}" style="max-width:820px"><div class="card-b form">
    <dl class="d"><dt>Karyawan dievaluasi</dt><dd>${esc(u.nama)}</dd><dt>Divisi</dt><dd>${esc(u.dept)}</dd><dt>Training yang diikuti</dt><dd>${esc(e.trainingNama)}</dd><dt>Evaluator</dt><dd>${esc(m.nama)}</dd><dt>Hubungan</dt><dd>${p.hub}</dd></dl>
    <div class="scalehint"><span>1 = tidak terlihat sama sekali</span><span>10 = sangat terlihat & konsisten</span></div>
    ${FORM_360_QS.map((q, i) => `<div class="sq"><div class="sqt"><span class="qn">${i + 1}</span>${esc(q)}</div>${scaleInput('s' + i, 10)}</div>`).join('')}
    ${p.s ? '<div class="alert info">Anda sudah mengisi penilaian ini.</div>' : `<div id="formErr"></div><div class="form-foot"><a class="btn" href="#/lnd-tugas">Batal</a><button class="btn primary">Kirim penilaian</button></div>`}
  </div></form>`;
}
function vL360Report(id) {
  const e = S.evals.find(x => x.id === id);
  if (!e) return notFound();
  if (!canSeeEmp(e.userId)) return noAccess();
  const u = user(e.userId), filled = e.penilai.filter(p => p.s);
  const qAvg = (i, hub) => { const s = filled.filter(p => !hub || p.hub === hub).map(p => p.s[i]); return s.length ? avg(s) : null; };
  const overall = evalAvg(e);
  const ranked = FORM_360_QS.map((q, i) => ({ q, i, v: qAvg(i) })).filter(x => x.v != null).sort((a, b) => a.v - b.v);
  const low = ranked.slice(0, 2).map(x => x.i), high = ranked.slice(-2).map(x => x.i);
  const cell = v => v == null ? '<span class="faint">–</span>' : `<span class="hm" style="background:${HEAT[Math.min(5, Math.max(1, Math.round((v - 1) / 9 * 5)))]};color:${v >= 7.5 ? '#fff' : 'var(--ink)'}">${f1(v)}</span>`;
  return `<a class="back" href="#/${isHCGA() ? 'lnd-360' : 'lnd-tim'}">${ic('left')} ${isHCGA() ? 'Penilaian 360°' : 'Tim saya'}</a>
  <div class="page-head"><div><div class="eyebrow">Laporan penilaian 360°</div><h1>${esc(u.nama)}</h1><p class="muted">${esc(u.dept)} · training: ${esc(e.trainingNama)} · ${filled.length} dari ${e.penilai.length} penilai sudah mengisi</p></div><button class="btn" data-act="print">${ic('print')} Cetak</button></div>
  <div class="tiles">${tile('Rata-rata keseluruhan', overall != null ? f1(overall) + ' / 10' : '–', 'semua penilai')}${FORM_360_HUB.map(hb => tile(hb, evalAvg(e, hb) != null ? f1(evalAvg(e, hb)) : '–', `${filled.filter(p => p.hub === hb).length} penilai`)).join('')}</div>
  ${card('Nilai per pernyataan', `<div class="tw"><table class="t r360"><thead><tr><th>Pernyataan</th>${FORM_360_HUB.map(hb => `<th class="r">${hb.replace('Rekan ', 'Rekan<br>')}</th>`).join('')}<th class="r">Rata-rata</th></tr></thead><tbody>${FORM_360_QS.map((q, i) => `<tr><td><span class="qn sm">${i + 1}</span><span class="ni">${esc(q)}</span>${low.includes(i) && ranked.length > 3 ? ' <span class="pill amber">Area pengembangan</span>' : high.includes(i) && ranked.length > 3 ? ' <span class="pill teal">Kekuatan</span>' : ''}</td>${FORM_360_HUB.map(hb => `<td class="r">${cell(qAvg(i, hb))}</td>`).join('')}<td class="r"><b class="num">${qAvg(i) != null ? f1(qAvg(i)) : '–'}</b></td></tr>`).join('')}</tbody></table></div>`, '', 'skala 1–10 · warna makin gelap = makin tinggi')}
  <div class="cols">
    <div>${card('Penilai', `<div class="list">${e.penilai.map(p => row({ href: '#/l360/' + e.id, title: esc(user(p.uid).nama), sub: `${p.hub}${p.at ? ' · ' + fdt(p.at) : ''}`, right: p.s ? `<b class="num">${f1(avg(p.s))}</b>` : '<span class="pill amber">Belum mengisi</span>' })).join('')}</div>`)}
    </div><div>${low.length && ranked.length > 3 ? card('Rekomendasi pengembangan', `<div class="card-b"><p style="margin:0 0 8px;font-size:13.5px">Nilai terendah ada pada:</p><ul class="soon">${low.map(i => `<li>${esc(FORM_360_QS[i])}</li>`).join('')}</ul><a class="btn sm" style="margin-top:10px" href="#/training/baru">Ajukan training lanjutan</a></div>`) : ''}</div>
  </div>`;
}

/* ======================= RIWAYAT ======================= */
function empTrainings(uid) { return S.trainings.filter(t => t.peserta.includes(uid) && t.status === 'selesai').sort((a, b) => b.tanggal.localeCompare(a.tanggal)); }
function vLndRiwayat(scope) {
  const list = (scope === 'tim' ? S.users.filter(u => u.atasan === me().id) : S.users.filter(u => u.posisi !== 'Driver')).map(u => ({ u, tr: empTrainings(u.id), onb: S.onb.find(o => o.userId === u.id), ev: S.evals.filter(e => e.userId === u.id) }));
  const tim = scope === 'tim';
  const extra = tim ? (() => { const pend = []; S.onb.filter(o => o.status === 'berjalan' && user(o.userId).atasan === me().id).forEach(o => pend.push(row({ href: `#/onb/${o.id}`, title: `Onboarding ${esc(user(o.userId).nama)}`, sub: `${o.tasks.filter(k => k.status === 'selesai').length}/${o.tasks.length} tugas · ${o.tasks.filter(k => k.status === 'menunggu' && k.verif === 'atasan').length} menunggu acc Anda`, right: stepLine(onbSteps(o)) }))); return pend.length ? card('Onboarding tim (Anda mentor)', `<div class="list">${pend.join('')}</div>`) : ''; })() : '';
  return `<div class="page-head"><div><div class="eyebrow">Learning & Development</div><h1>${tim ? 'Tim saya' : 'Riwayat training'}</h1><p class="muted">${tim ? 'Riwayat training, onboarding, dan hasil 360° anggota tim Anda.' : 'Riwayat training per karyawan. Hanya bisa dilihat HC dan atasan terkait.'}</p></div></div>
  ${extra}
  ${fbar('riw', { status: false, dept: !tim, ph: 'Cari karyawan…' })}
  <section class="card">${list.length ? `<div class="tw"><table class="t"><thead><tr><th>Karyawan</th><th class="r">Training selesai</th><th class="hide-sm">Terakhir</th><th class="hide-sm">Onboarding</th><th class="r">360° rata-rata</th></tr></thead><tbody>${list.map(({ u, tr, onb, ev }) => { const a = ev.map(e => evalAvg(e)).filter(x => x != null); return `<tr class="click" data-href="#/lnd-karyawan/${u.id}"><td>${userCell(u.id)}</td><td class="r num">${tr.length}</td><td class="hide-sm">${tr[0] ? esc(tr[0].judul) + `<span class="s">${fds(tr[0].tanggal)}</span>` : '<span class="faint">–</span>'}</td><td class="hide-sm">${onb ? (onb.status === 'selesai' ? '<span class="pill gray">Selesai</span>' : '<span class="pill blue">Berjalan</span>') : '<span class="faint">–</span>'}</td><td class="r num">${a.length ? f1(avg(a)) : '–'}</td></tr>`; }).join('')}</tbody></table></div>` : empty('Belum ada anggota tim.')}</section>`;
}
function vLndKaryawan(uid) {
  const u = user(uid);
  if (!u.id || !canSeeEmp(uid)) return noAccess();
  lndSyncAll();
  const tr = empTrainings(uid), onb = S.onb.find(o => o.userId === uid), ev = S.evals.filter(e => e.userId === uid);
  const run = S.trainings.filter(t => t.peserta.includes(uid) && ['disetujui', 'terlaksana'].includes(t.status));
  return `<a class="back" href="#/${isHCGA() ? 'lnd-riwayat' : 'lnd-tim'}">${ic('left')} ${isHCGA() ? 'Riwayat training' : 'Tim saya'}</a>
  <div class="page-head"><div><div class="eyebrow">Riwayat training</div><h1>${esc(u.nama)}</h1><p class="muted">${esc(u.jabatan)} · ${esc(u.dept)} · atasan ${u.atasan ? esc(user(u.atasan).nama) : '–'}</p></div></div>
  <div class="tiles">${tile('Training selesai', tr.length, `${tr.filter(t => t.penyelenggara === 'Internal').length} internal · ${tr.filter(t => t.penyelenggara === 'Eksternal').length} eksternal`)}${tile('Investasi training', rpc(tr.reduce((a, t) => a + t.harga, 0)), 'biaya per peserta, total')}${tile('Rata-rata reaction', (() => { const s = tr.map(t => t.prog[uid]?.reaction).filter(Boolean).map(r => avg(r.s)); return s.length ? f1(avg(s)) + ' / 10' : '–'; })(), 'kepuasan training')}${tile('Rata-rata 360°', (() => { const a = ev.map(e => evalAvg(e)).filter(x => x != null); return a.length ? f1(avg(a)) + ' / 10' : '–'; })(), `${ev.length} penilaian`)}</div>
  ${onb ? card('Onboarding', `<div class="card-b">${stepLine(onbSteps(onb))}<div class="muted" style="font-size:13px;margin-top:8px">Pretest ${onb.pre ? scoreOf(onb.pre, 'qs1') ?? '…' : '–'} · Posttest ${onb.post ? scoreOf(onb.post, 'qs1') ?? '…' : '–'} · bergabung ${fd(onb.join)}</div></div>`, `<a class="link" href="#/onb/${onb.id}">Detail</a>`) : ''}
  ${run.length ? card('Training sedang berjalan', `<div class="list">${run.map(t => `<div class="trrow" data-href="#/training/${t.id}" style="cursor:pointer"><div class="trh"><b>${esc(t.judul)}</b><span class="muted" style="font-size:12.5px">${fds(t.tanggal)}</span></div>${stepLine(trSteps(t, uid))}</div>`).join('')}</div>`) : ''}
  ${card('Training selesai', tr.length ? `<div class="tw"><table class="t"><thead><tr><th>Training</th><th class="hide-sm">Tanggal</th><th class="hide-sm">Penyelenggara</th><th class="r">Reaction</th><th class="r hide-sm">Pre / Post</th><th></th></tr></thead><tbody>${tr.map(t => { const p = t.prog[uid] || {}; return `<tr class="click" data-href="#/training/${t.id}"><td><b>${esc(t.judul)}</b><span class="s">${t.no} · ${t.mode}</span></td><td class="hide-sm num">${fds(t.tanggal)}</td><td class="hide-sm">${t.penyelenggara}<span class="s">${esc(t.vendor)}</span></td><td class="r num">${p.reaction ? f1(avg(p.reaction.s)) : '–'}</td><td class="r num hide-sm">${t.tes ? `${scoreOf(p.pre, t.tes) ?? '–'} / ${scoreOf(p.post, t.tes) ?? '–'}` : '<span class="faint">–</span>'}</td><td class="r">${p.piagam?.status === 'disetujui' ? `<a class="btn sm" href="#/piagam/${t.id}/${uid}">Piagam</a>` : ''}</td></tr>`; }).join('')}</tbody></table></div>` : empty('Belum ada training yang selesai.'))}
  ${card('Penilaian 360°', ev.length ? `<div class="list">${ev.map(e => row({ href: `#/l360/${e.id}`, title: esc(e.trainingNama), sub: `${e.penilai.filter(p => p.s).length}/${e.penilai.length} penilai`, right: evalAvg(e) != null ? `<b class="num">${f1(evalAvg(e))}</b> / 10` : '–' })).join('')}</div>` : empty('Belum ada penilaian.'))}`;
}

/* ======================= PIAGAM ======================= */
function vPiagam(tid, uid) {
  const t = S.trainings.find(x => x.id === tid), p = t && t.prog[uid];
  if (!p || p.piagam?.status !== 'disetujui') return notFound();
  if (!(isHCGA() || uid === me().id || user(uid).atasan === me().id)) return noAccess();
  return `<div class="ptool"><a class="back" style="margin:0" href="#/training/${t.id}">${ic('left')} Kembali</a><button class="btn primary" data-act="print">${ic('print')} Cetak / simpan PDF</button></div>
  <div class="cert"><div class="cert-in">
    <div class="lw" style="width:170px;margin:0 auto">${LOGO()}</div>
    <div class="cert-k">Piagam penghargaan</div>
    <div class="cert-no">No. ${esc(p.piagam.no)}</div>
    <div class="cert-g">diberikan kepada</div>
    <div class="cert-n">${esc(user(uid).nama)}</div>
    <div class="cert-g">atas partisipasinya sebagai peserta training internal</div>
    <div class="cert-t">${esc(t.judul)}</div>
    <div class="cert-g">yang diselenggarakan pada ${fdl(t.tanggal)} · ${t.mode}</div>
    <div class="cert-sig"><div><div class="cert-line"></div><b>${esc(t.vendor.replace('Trainer internal · ', ''))}</b><span>Trainer</span></div><div><div class="cert-line"></div><b>${esc(user(HCGA_IDS[0]).nama)}</b><span>${esc(user(HCGA_IDS[0]).jabatan)}</span></div></div>
  </div></div>`;
}

/* ======================= PENGATURAN LnD ======================= */
function vLndSet(q) {
  if (!isHCGA()) return noAccess();
  const tab = q.tab || 'soal';
  const tabs = `<div class="tabs">${[['soal', 'Bank soal & kunci jawaban'], ['tugas', 'Template tugas onboarding'], ['dok', 'Template dokumen'], ['budget', 'Budget training'], ['form', 'Form reaction & 360°']].map(([k, l]) => `<a href="#/lnd-set?tab=${k}" class="${tab === k ? 'on' : ''}">${l}</a>`).join('')}</div>`;
  let body = '';
  if (tab === 'soal') {
    const set = qset(q.s || 'qs1') || S.qsets[0];
    body = `<div class="btns" style="margin-bottom:12px">${S.qsets.map(x => `<a class="btn sm ${x.id === set.id ? 'primary' : ''}" href="#/lnd-set?tab=soal&s=${x.id}">${esc(x.nama)}${keysReady(x) ? '' : ' ·  kunci belum lengkap'}</a>`).join('')}<button class="btn sm" data-act="qs-add">${ic('plus')} Set soal baru</button></div>
    ${keysReady(set) ? '' : '<div class="alert warn" style="margin-bottom:12px">Kunci jawaban dari Google Form tidak ikut terbaca (Google tidak menampilkannya di form publik). Pilih jawaban benar untuk setiap soal, lalu simpan; nilai tes otomatis dihitung ulang.</div>'}
    <form class="card" data-form="qset" data-id="${set.id}"><div class="card-h"><h2>${esc(set.nama)}</h2><span class="sub">${set.qs.length} soal · pilih jawaban benar (●)</span></div><div class="card-b form">${set.qs.map((qq, i) => `<div class="qedit"><div class="f"><label>Soal ${i + 1}</label><textarea name="q${i}" rows="2">${esc(qq.q)}</textarea></div><div class="qopts">${qq.opts.map((o, j) => `<label class="qo2"><input type="radio" name="k${i}" value="${j}" ${qq.key === j ? 'checked' : ''} title="Jawaban benar"><span class="ql">${'ABCD'[j]}</span><input type="text" name="o${i}_${j}" value="${esc(o)}"></label>`).join('')}</div>${i ? '' : ''}</div>`).join('')}
    <div class="btns"><button type="button" class="btn sm" data-act="qs-addq" data-id="${set.id}">${ic('plus')} Tambah soal</button></div>
    <div class="form-foot"><button class="btn primary">Simpan soal & kunci</button></div></div></form>`;
  }
  if (tab === 'tugas') body = `<form class="card" data-form="otmpl"><div class="card-h"><h2>Template tugas onboarding</h2><span class="sub">dipasang otomatis ke karyawan baru</span></div><div class="tw"><table class="t"><thead><tr><th>Tugas</th><th style="width:110px">Hari ke-</th><th style="width:180px">Acc oleh</th><th style="width:40px"></th></tr></thead><tbody id="otRows">${S.onbTmpl.map(otRow).join('')}</tbody></table></div><div class="card-b"><button type="button" class="btn sm" data-act="ot-addrow">${ic('plus')} Tambah tugas</button><div class="form-foot"><button class="btn primary">Simpan template</button></div><p class="muted" style="font-size:12.5px;margin:0">Status tugas: Belum mulai → Dikerjakan → Menunggu acc → Selesai (atau Perlu revisi). Daftar tugas di atas masih contoh, silakan disesuaikan.</p></div></form>`;
  if (tab === 'dok') body = card('Template dokumen', `<div class="tw"><table class="t"><thead><tr><th>Dokumen</th><th>File aktif</th><th class="hide-sm">Diunggah</th><th></th></tr></thead><tbody>${S.ldTpl.map(x => `<tr><td><b>${x.nama}</b><span class="s">${x.id === 'commit' ? 'Diisi semua peserta sebelum training' : 'Diisi PIC setelah training'}</span></td><td><span class="file">${ic('file')}${esc(x.file)}</span></td><td class="hide-sm">${fdt(x.at)}</td><td class="r"><div class="btns" style="justify-content:flex-end;flex-wrap:nowrap"><button class="btn sm" data-act="tpl-dl" data-id="${x.id}">${ic('dl')} Unduh</button><button class="btn sm primary" data-act="tpl-up" data-id="${x.id}">Unggah baru</button></div></td></tr>`).join('')}</tbody></table></div>`);
  if (tab === 'budget') body = `<form class="card" data-form="lbudget"><div class="card-h"><h2>Budget training ${TODAY.slice(0, 4)}</h2><span class="sub">alokasi per divisi</span></div><div class="tw"><table class="t"><thead><tr><th>Divisi</th><th class="r">Alokasi</th><th class="r">Terpakai</th><th class="r">Sisa</th></tr></thead><tbody>${Object.keys(S.lndBudget).map(dp => { const u = budgetUsed(dp); return `<tr><td>${esc(dp)}</td><td class="r"><input type="number" name="${esc(dp)}" value="${S.lndBudget[dp]}" step="1000000"></td><td class="r num">${rp(u)}</td><td class="r num">${rp(S.lndBudget[dp] - u)}</td></tr>`; }).join('')}</tbody></table></div><div class="card-b"><div class="form-foot"><button class="btn primary">Simpan budget</button></div></div></form>`;
  if (tab === 'form') body = `<div class="cols"><div>${card('Form reaction (evaluasi pelatihan)', `<div class="card-b"><p class="muted" style="margin:0 0 8px;font-size:12.5px">Skala 1–10 · diisi semua peserta setelah training</p><ol class="olist">${FORM_REACT_QS.map(x => `<li>${esc(x)}</li>`).join('')}</ol><p style="margin:10px 0 4px;font-weight:600;font-size:13px">Pertanyaan terbuka</p><ul class="soon">${FORM_REACT_OPEN.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`)}</div><div>${card('Form 360° (training behavior evaluation)', `<div class="card-b"><p class="muted" style="margin:0 0 8px;font-size:12.5px">Skala 1–10 · diisi atasan langsung, rekan satu tim, rekan lintas divisi</p><ol class="olist">${FORM_360_QS.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>`)}</div></div>`;
  return `<div class="page-head"><div><div class="eyebrow">Learning & Development</div><h1>Pengaturan LnD</h1><p class="muted">Bank soal, template tugas & dokumen, budget, dan isi form.</p></div></div>${tabs}${body}`;
}
const otRow = k => `<tr><td><input class="l" name="judul" value="${esc(k.judul)}"></td><td><input name="hari" type="number" min="0" value="${k.hari}"></td><td><select name="verif" style="height:32px">${opts([['hc', 'HC'], ['atasan', 'Atasan (mentor)']], k.verif)}</select></td><td><button type="button" class="ibtn" data-act="ot-delrow">${ic('x')}</button></td></tr>`;

/* ======================= DASHBOARD LnD (data asli) ======================= */
function vDashLndReal() {
  lndSyncAll();
  const yr = TODAY.slice(0, 4), m6 = [5, 4, 3, 2, 1, 0].map(monthKey);
  const appr = S.trainings.filter(t => ['disetujui', 'terlaksana', 'selesai'].includes(t.status));
  const yrT = appr.filter(t => t.tanggal.slice(0, 4) === yr);
  const alloc = Object.values(S.lndBudget).reduce((a, b) => a + b, 0), used = Object.keys(S.lndBudget).reduce((a, dp) => a + budgetUsed(dp), 0);
  const reacts = appr.flatMap(t => t.peserta.map(u => t.prog[u]?.reaction).filter(Boolean)).map(r => avg(r.s));
  const running = S.trainings.filter(t => ['disetujui', 'terlaksana'].includes(t.status));
  const onbRun = S.onb.filter(o => o.status === 'berjalan');
  const onbAll = S.onb.filter(o => o.pre && o.post && scoreOf(o.pre, 'qs1') != null && scoreOf(o.post, 'qs1') != null);
  const lift = onbAll.length ? avg(onbAll.map(o => scoreOf(o.post, 'qs1') - scoreOf(o.pre, 'qs1'))) : null;
  const budgetRows = `<div class="brows">${Object.keys(S.lndBudget).map(dp => { const u = budgetUsed(dp), a = S.lndBudget[dp], p = a ? u / a : 0; return `<div class="br" data-tip="${esc(dp)}: ${rp(u)} dari ${rp(a)} (${Math.round(p * 100)}%)" tabindex="0"><div class="bl"><span>${esc(dp)}</span><span class="num muted">${rpc(u)} / ${rpc(a)}</span></div><div class="meter2 ${p > 0.9 ? 'hi' : ''}"><span style="width:${Math.min(100, p * 100)}%"></span></div></div>`; }).join('')}</div>`;
  const perT = appr.filter(t => t.peserta.some(u => t.prog[u]?.reaction)).map(t => { const s = t.peserta.map(u => t.prog[u]?.reaction).filter(Boolean).map(r => avg(r.s)); return { label: t.judul.length > 22 ? t.judul.slice(0, 22) + '…' : t.judul, sub: `${s.length} responden`, value: avg(s), tip: `${t.judul}: ${f1(avg(s))} / 10 dari ${s.length} peserta` }; }).sort((a, b) => b.value - a.value);
  const eAvg = S.evals.map(e => ({ e, a: evalAvg(e) })).filter(x => x.a != null);
  return `<div class="page-head"><div><div class="eyebrow">Learning & Development</div><h1>Dashboard LnD</h1><p class="muted">Onboarding, training, kepuasan peserta, dan penerapan hasil training.</p></div><a class="btn" href="#/lnd-training">Progres training</a></div>
  <div class="tiles">${tile('Training berjalan', running.length, `${running.reduce((a, t) => a + t.peserta.length, 0)} peserta`)}${tile('Budget training terpakai', alloc ? Math.round(used / alloc * 100) + '%' : '–', `${rpc(used)} dari ${rpc(alloc)}`, used / alloc > 0.85 ? 'up' : '')}${tile('Kepuasan training', reacts.length ? f1(avg(reacts)) + ' / 10' : '–', `rata-rata form reaction · ${reacts.length} respon`)}${tile('Kenaikan nilai onboarding', lift != null ? (lift >= 0 ? '+' : '') + Math.round(lift) + ' poin' : '–', 'rata-rata posttest − pretest')}</div>
  <div class="cols">
    <div>${card('Training per bulan', `<div class="card-b">${colChart(m6.map(m => { const n = appr.filter(t => t.tanggal.slice(0, 7) === m).length; return { label: BLN[+m.slice(5) - 1], value: n, tip: `${BULAN[+m.slice(5) - 1]}: ${n} training` }; }), v => v + ' training', v => String(v))}</div>`, '', '6 bulan terakhir · disetujui')}
      ${card('Kepuasan per training', `<div class="card-b">${hbar(perT, v => f1(v))}</div>`, '', 'rata-rata form reaction, skala 1–10')}</div>
    <div>${card('Budget training per divisi', `<div class="card-b">${budgetRows}</div>`, '<a class="link" href="#/lnd-set?tab=budget">Atur</a>', 'terpakai / alokasi ' + yr)}
      ${card('Onboarding berjalan', onbRun.length ? `<div class="list">${onbRun.map(o => `<div class="trrow" data-href="#/onb/${o.id}" style="cursor:pointer"><div class="trh"><b>${esc(user(o.userId).nama)}</b><span class="muted" style="font-size:12.5px">join ${fds(o.join)}</span></div>${stepLine(onbSteps(o))}</div>`).join('')}</div>` : empty('Tidak ada onboarding berjalan.'), '<a class="link" href="#/lnd-onb">Semua</a>')}
      ${card('Hasil 360° terbaru', eAvg.length ? `<div class="list">${eAvg.map(({ e, a }) => row({ href: `#/l360/${e.id}`, title: esc(user(e.userId).nama), sub: esc(e.trainingNama), right: `<b class="num">${f1(a)}</b> / 10` })).join('')}</div>` : empty('Belum ada.'), '<a class="link" href="#/lnd-360">Semua</a>')}</div>
  </div>
  ${card('Training mendatang & berjalan', trTable(running.sort((a, b) => a.tanggal.localeCompare(b.tanggal)), true))}`;
}

/* ======================= ACTIONS ======================= */
const TR = id => S.trainings.find(x => x.id === id);
const OB = id => S.onb.find(x => x.id === id);
function dlTemplate(id) {
  if (IS_ARTIFACT) return toast(NO_FILE_MSG);
  const x = S.ldTpl.find(t => t.id === id);
  const body = id === 'commit'
    ? `<h2 style="text-align:center">COMMITMENT LETTER</h2><p>Saya yang bertanda tangan di bawah ini:</p><p>Nama: ____________________<br>Divisi: ____________________<br>Judul training: ____________________<br>Tanggal pelaksanaan: ____________________</p><p>Dengan ini berkomitmen untuk mengikuti training secara penuh, menerapkan hasil pembelajaran dalam pekerjaan, dan membagikan hasilnya kepada tim.</p><p>Target penerapan setelah training:</p><p>1. ____________________<br>2. ____________________<br>3. ____________________</p><br><p>Tanda tangan karyawan: ____________ &nbsp;&nbsp; Tanda tangan atasan: ____________</p>`
    : `<h2 style="text-align:center">TRAINING RESULT</h2><p>Judul training: ____________________<br>Tanggal: ____________________<br>PIC: ____________________<br>Peserta: ____________________</p><p><b>Ringkasan materi</b><br>____________________</p><p><b>Insight utama</b><br>____________________</p><p><b>Rencana penerapan di tim</b><br>____________________</p>`;
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${x.nama}</title></head><body style="font-family:Arial;font-size:11pt">${body}<p style="color:#888;font-size:9pt">Template contoh dari prototype · HC dapat mengganti dengan template resmi (.docx).</p></body></html>`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + html], { type: 'application/msword' }));
  a.download = x.file.replace(/\.docx$/, '.doc');
  document.body.appendChild(a); a.click(); a.remove();
  toast('Template diunduh');
}
function uploadModal(title, accept, cb) {
  modal(title, `<div class="f"><label>File</label><input type="file" name="file" accept="${accept}" autofocus></div><p class="muted" style="margin:0;font-size:12.5px">Format .docx atau .pdf</p>`, 'Unggah', fd => { const f = fd.get('file'); if (!f || !f.name) { toast('Pilih file dulu'); return false; } cb(f.name); });
}

const LND_ACT = {
  'tpl-dl': d => dlTemplate(d.id),
  'tpl-up': d => uploadModal('Unggah template baru', '.docx,.doc', name => { const x = S.ldTpl.find(t => t.id === d.id); x.file = name; x.at = Date.now(); rerender(); toast('Template diperbarui'); }),
  'tr-prm': d => { TR_PESERTA = TR_PESERTA.filter(x => x !== d.id); liveTraining($('form[data-form=training]')); },
  'tr-approve': d => {
    const t = TR(d.id), tes = $('#tesSel') ? $('#tesSel').value : null;
    modal('Setujui pengajuan training?', `<p style="margin:0">${esc(t.judul)} · ${t.peserta.length} peserta · ${rp(trTotal(t))}</p>${noteField('Catatan')}`, 'Setujui', fd => {
      addLog(t, 'Menyetujui', fd.get('note'));
      if (t.status === 'menunggu_atasan') { t.status = 'menunggu_hcga'; notifyHCGA(`Pengajuan training "${t.judul}" menunggu persetujuan HC`, `#/training/${t.id}`); notify(t.userId, `Training "${t.judul}" disetujui atasan, diteruskan ke HC`, `#/training/${t.id}`); }
      else { t.status = 'disetujui'; t.tes = tes || null; t.peserta.forEach(u => { t.prog[u] = t.prog[u] || {}; notify(u, `Training "${t.judul}" disetujui. Isi commitment letter${t.tes ? ' & pretest' : ''} sebelum ${fds(t.tanggal)}.`, '#/lnd-tugas'); }); }
      rerender(); toast('Disetujui');
    });
  },
  'tr-reject': d => { const t = TR(d.id); modal('Tolak pengajuan training?', noteField('Alasan', true), 'Tolak', fd => { if (!fd.get('note').trim()) { toast('Alasan wajib diisi'); return false; } t.rejectedAt = t.status === 'menunggu_atasan' ? 'atasan' : 'hc'; t.status = 'ditolak'; addLog(t, 'Menolak', fd.get('note')); notify(t.userId, `Training "${t.judul}" ditolak: ${fd.get('note')}`, `#/training/${t.id}`); rerender(); toast('Ditolak'); }, true); },
  'tr-cancel': d => { const t = TR(d.id); modal('Batalkan pengajuan training?', '<p style="margin:0">Pengajuan ditarik.</p>', 'Batalkan', () => { t.status = 'dibatalkan'; addLog(t, 'Membatalkan'); rerender(); }, true); },
  'tr-done': d => { const t = TR(d.id); t.terlaksanaAt = Date.now(); addLog(t, 'Menandai training terlaksana'); t.peserta.forEach(u => notify(u, `Training "${t.judul}" selesai. Isi form reaction${t.tes ? ' & posttest' : ''}${u === t.userId ? ' dan unggah training result' : ''}.`, '#/lnd-tugas')); syncTraining(t); rerender(); toast('Tugas sesudah training dibuka'); },
  'tr-commit': d => uploadModal('Unggah commitment letter', '.docx,.doc,.pdf', name => { const t = TR(d.id); (t.prog[me().id] = t.prog[me().id] || {}).commit = { file: name, at: Date.now() }; addLog(t, 'Mengunggah commitment letter'); syncTraining(t); rerender(); toast('Commitment letter terkirim'); }),
  'tr-result': d => uploadModal('Unggah training result', '.docx,.doc,.pdf', name => { const t = TR(d.id); (t.prog[me().id] = t.prog[me().id] || {}).result = { file: name, at: Date.now() }; addLog(t, 'Mengunggah training result'); notifyHCGA(`Training result "${t.judul}" sudah diunggah`, `#/training/${t.id}`); syncTraining(t); rerender(); toast('Training result terkirim'); }),
  'tr-piagam': d => { const t = TR(d.id); modal('Ajukan piagam?', `<p style="margin:0">Piagam untuk training internal <b>${esc(t.judul)}</b> akan dibuat otomatis setelah disetujui HC.</p>`, 'Ajukan', () => { (t.prog[me().id] = t.prog[me().id] || {}).piagam = { status: 'diajukan', at: Date.now() }; addLog(t, 'Mengajukan piagam'); notifyHCGA(`${me().nama} mengajukan piagam "${t.judul}"`, `#/training/${t.id}`); rerender(); toast('Pengajuan piagam terkirim ke HC'); }); },
  'pg-approve': d => { const t = TR(d.id); S.seq.PGM = (S.seq.PGM || 5) + 1; t.prog[d.u].piagam = { status: 'disetujui', no: `PGM/${TODAY.slice(0, 4)}/${TODAY.slice(5, 7)}/${String(S.seq.PGM).padStart(3, '0')}`, at: Date.now() }; addLog(t, `Menyetujui piagam ${user(d.u).nama}`); notify(d.u, `Piagam "${t.judul}" sudah terbit`, `#/piagam/${t.id}/${d.u}`); rerender(); toast('Piagam terbit'); },
  'pg-reject': d => { const t = TR(d.id); modal('Tolak pengajuan piagam?', noteField('Alasan', true), 'Tolak', fd => { if (!fd.get('note').trim()) return false; t.prog[d.u].piagam = { status: 'ditolak', at: Date.now() }; addLog(t, `Menolak piagam ${user(d.u).nama}`, fd.get('note')); notify(d.u, `Pengajuan piagam ditolak: ${fd.get('note')}`, `#/training/${t.id}`); rerender(); }, true); },
  'ot-start': d => { const k = OB(d.o).tasks.find(x => x.id === d.k); k.status = 'proses'; rerender(); toast('Tugas mulai dikerjakan'); },
  'ot-submit': d => { const o = OB(d.o), k = o.tasks.find(x => x.id === d.k); modal('Ajukan tugas selesai', `<p style="margin:0">${esc(k.judul)}</p><div class="f"><label>Catatan</label><textarea name="note" placeholder="Opsional"></textarea></div><div class="f"><label>Lampiran (opsional)</label><input type="file" name="file"></div>`, 'Ajukan', fd => { k.note = fd.get('note').trim(); const f = fd.get('file'); if (f && f.name) k.file = f.name; k.status = 'menunggu'; if (k.verif === 'atasan') notify(user(o.userId).atasan, `${user(o.userId).nama} menyelesaikan tugas onboarding: ${k.judul}`, '#/lnd-tugas'); else notifyHCGA(`${user(o.userId).nama} menyelesaikan tugas onboarding: ${k.judul}`, `#/onb/${o.id}`); rerender(); toast('Menunggu acc ' + (k.verif === 'atasan' ? 'atasan' : 'HC')); }); },
  'ot-acc': d => { const o = OB(d.o), k = o.tasks.find(x => x.id === d.k); k.status = 'selesai'; notify(o.userId, `Tugas "${k.judul}" sudah di-acc`, '#/lnd-tugas'); syncOnb(o); rerender(); toast('Tugas di-acc'); },
  'ot-revisi': d => { const o = OB(d.o), k = o.tasks.find(x => x.id === d.k); modal('Minta revisi', noteField('Yang perlu diperbaiki', true), 'Kirim', fd => { if (!fd.get('note').trim()) return false; k.status = 'revisi'; k.note = fd.get('note').trim(); notify(o.userId, `Tugas "${k.judul}" perlu revisi: ${k.note}`, '#/lnd-tugas'); rerender(); }); },
  'onb-paparan': d => { const o = OB(d.id); o.pemaparanAt = Date.now(); notify(o.userId, 'Sesi pemaparan onboarding selesai. Silakan kerjakan posttest (tahap 2).', '#/lnd-tugas'); rerender(); toast('Posttest dibuka untuk karyawan'); },
  'onb-add': () => modal('Tambah karyawan onboarding', `<div class="f"><label>Karyawan</label><select name="u">${opts(S.users.filter(u => u.posisi !== 'Driver' && !S.onb.some(o => o.userId === u.id)).map(u => [u.id, `${u.nama} · ${u.dept}`]))}</select><span class="hint">Belum ada di daftar? Tambahkan dulu di Pengaturan → Karyawan & atasan.</span></div><div class="f"><label>Tanggal bergabung</label><input type="date" name="join" value="${TODAY}"></div><p class="muted" style="margin:0;font-size:12.5px">Karyawan langsung mendapat tugas pretest + ${S.onbTmpl.length} tugas onboarding. Mentor: atasan langsung.</p>`, 'Mulai onboarding', fd => {
    const u = fd.get('u'); if (!u) return false;
    const o = { id: 'o' + uid(), userId: u, join: fd.get('join'), status: 'berjalan', pre: null, pemaparanAt: null, post: null, tasks: S.onbTmpl.map(k => ({ ...k, status: 'belum', note: '', file: '' })), log: [] };
    S.onb.push(o); notify(u, 'Selamat bergabung! Kerjakan pretest onboarding dan cek daftar tugas Anda.', '#/lnd-tugas'); if (user(u).atasan) notify(user(u).atasan, `${user(u).nama} mulai onboarding, Anda sebagai mentor`, `#/onb/${o.id}`);
    rerender(); toast('Onboarding dimulai');
  }),
  'pn-add': () => { const f = $('form[data-form=l360]'); $('#pnRows').insertAdjacentHTML('beforeend', pnRow('', 'Rekan satu tim', f.elements.userId.value)); },
  'pn-del': (d, el) => el.closest('tr').remove(),
  'ot-addrow': () => $('#otRows').insertAdjacentHTML('beforeend', otRow({ judul: '', hari: 7, verif: 'atasan' })),
  'ot-delrow': (d, el) => el.closest('tr').remove(),
  'qs-add': () => modal('Set soal baru', '<div class="f"><label>Nama set</label><input type="text" name="n" placeholder="mis. Pretest GA4" autofocus></div><div class="f"><label>Jumlah soal</label><input type="number" name="c" value="10" min="1" max="30"></div>', 'Buat', fd => { const n = fd.get('n').trim(); if (!n) return false; const id = 'qs' + uid(); S.qsets.push({ id, nama: n, sumber: 'Dibuat HC', qs: [...Array(+fd.get('c') || 10)].map(() => ({ q: '', opts: ['', '', '', ''], key: null })) }); save(); go(`#/lnd-set?tab=soal&s=${id}`); }),
  'qs-addq': d => { qset(d.id).qs.push({ q: '', opts: ['', '', '', ''], key: null }); rerender(); }
};

const LND_FORMS = {
  training: (fd, f) => {
    const t = { judul: fd.get('judul').trim(), tanggal: fd.get('tanggal'), penyelenggara: fd.get('penyelenggara'), vendor: fd.get('vendor').trim(), mode: fd.get('mode'), harga: +fd.get('harga') || 0 };
    const err = [];
    if (!t.judul) err.push('Judul training wajib diisi.');
    if (!t.vendor) err.push(t.penyelenggara === 'Internal' ? 'Isi nama trainer internal.' : 'Isi nama vendor.');
    if (!t.tanggal || t.tanggal < TODAY) err.push('Tanggal pelaksanaan tidak valid.');
    if (err.length) { $('#formErr').innerHTML = `<div class="alert">${err.join('<br>')}</div>`; return; }
    if (t.penyelenggara === 'Internal' && !/^Trainer internal/.test(t.vendor)) t.vendor = 'Trainer internal · ' + t.vendor;
    const u = me();
    Object.assign(t, { id: 'tr' + uid(), no: nextNo('TR'), userId: u.id, tglAju: TODAY, peserta: [u.id, ...TR_PESERTA], tes: null, status: u.atasan ? 'menunggu_atasan' : 'menunggu_hcga', log: [], prog: {} });
    t.peserta.forEach(p => t.prog[p] = {});
    addLog(t, 'Mengajukan'); S.trainings.push(t);
    if (u.atasan) notify(u.atasan, `${u.nama} mengajukan training "${t.judul}"`, `#/training/${t.id}`); else notifyHCGA(`${u.nama} mengajukan training "${t.judul}"`, `#/training/${t.id}`);
    TR_PESERTA.forEach(p => { notify(p, `${u.nama} menambahkan Anda sebagai peserta training "${t.judul}"`, `#/training/${t.id}`); const a = user(p).atasan; if (a && a !== u.atasan && a !== u.id) notify(a, `${user(p).nama} didaftarkan ikut training "${t.judul}" (info)`, `#/training/${t.id}`); });
    TR_PESERTA = [];
    save(); go(`#/training/${t.id}`); toast('Pengajuan training terkirim');
  },
  tes: (fd, f) => {
    const kind = f.dataset.kind, ref = f.dataset.ref, isOnb = kind.startsWith('onb'), pre = kind.endsWith('pre');
    const src = isOnb ? OB(ref) : TR(ref), qs = qset(isOnb ? 'qs1' : src.tes);
    const ans = qs.qs.map((_, i) => fd.get('q' + i));
    const miss = ans.map((a, i) => a == null ? i + 1 : null).filter(Boolean);
    if (miss.length) { $('#formErr').innerHTML = `<div class="alert">Belum dijawab: soal ${miss.join(', ')}.</div>`; return; }
    const rec = { ans: ans.map(Number), at: Date.now() };
    if (isOnb) { src[pre ? 'pre' : 'post'] = rec; if (pre) notifyHCGA(`${me().nama} sudah mengerjakan pretest onboarding`, `#/onb/${src.id}`); syncOnb(src); }
    else { (src.prog[me().id] = src.prog[me().id] || {})[pre ? 'pre' : 'post'] = rec; syncTraining(src); }
    save(); go('#/lnd-tugas');
    const s = scoreOf(rec, qs.id); toast(s == null ? 'Jawaban terkirim. Nilai muncul setelah HC mengatur kunci jawaban.' : `Jawaban terkirim · nilai ${s}`);
  },
  reaction: (fd, f) => {
    const t = TR(f.dataset.id), s = FORM_REACT_QS.map((_, i) => +fd.get('r' + i) || null);
    const miss = s.map((v, i) => v ? null : i + 1).filter(Boolean);
    if (miss.length) { $('#formErr').innerHTML = `<div class="alert">Belum dinilai: pernyataan ${miss.join(', ')}.</div>`; return; }
    if (!fd.get('saran').trim() || !fd.get('butuh').trim()) { $('#formErr').innerHTML = '<div class="alert">Isi kedua pertanyaan kritik & saran.</div>'; return; }
    (t.prog[me().id] = t.prog[me().id] || {}).reaction = { s, saran: fd.get('saran').trim(), butuh: fd.get('butuh').trim(), at: Date.now() };
    addLog(t, 'Mengisi form reaction'); syncTraining(t); save(); go('#/lnd-tugas'); toast('Terima kasih, form reaction terkirim');
  },
  n360: (fd, f) => {
    const e = S.evals.find(x => x.id === f.dataset.id), p = e.penilai.find(x => x.uid === me().id), s = FORM_360_QS.map((_, i) => +fd.get('s' + i) || null);
    const miss = s.map((v, i) => v ? null : i + 1).filter(Boolean);
    if (miss.length) { $('#formErr').innerHTML = `<div class="alert">Belum dinilai: pernyataan ${miss.join(', ')}.</div>`; return; }
    p.s = s; p.at = Date.now();
    if (e.penilai.every(x => x.s)) notifyHCGA(`Penilaian 360° ${user(e.userId).nama} sudah lengkap`, `#/l360/${e.id}`);
    save(); go('#/lnd-tugas'); toast('Penilaian terkirim');
  },
  l360: (fd, f) => {
    const userId = fd.get('userId'), tid = fd.get('trainingId');
    const pn = [...f.querySelectorAll('#pnRows tr')].map(tr => ({ uid: tr.querySelector('[name=pn]').value, hub: tr.querySelector('[name=hub]').value })).filter(x => x.uid);
    const err = [];
    if (!userId) err.push('Pilih karyawan yang dievaluasi.');
    if (tid === 'lain' && !fd.get('trainingLain').trim()) err.push('Isi nama training.');
    if (!pn.length) err.push('Tambahkan minimal satu penilai.');
    if (new Set(pn.map(x => x.uid)).size !== pn.length) err.push('Ada penilai yang dipilih dua kali.');
    if (err.length) { $('#formErr').innerHTML = `<div class="alert">${err.join('<br>')}</div>`; return; }
    const e = { id: 'e' + uid(), userId, trainingId: tid === 'lain' ? null : tid, trainingNama: tid === 'lain' ? fd.get('trainingLain').trim() : TR(tid).judul, at: Date.now(), by: me().id, penilai: pn.map(x => ({ ...x, s: null })) };
    S.evals.push(e);
    pn.forEach(x => notify(x.uid, `Tugas baru: penilaian 360° untuk ${user(userId).nama}`, `#/n360/${e.id}`));
    save(); go(`#/l360/${e.id}`); toast(`Terkirim ke ${pn.length} penilai`);
  },
  qset: (fd, f) => {
    const s = qset(f.dataset.id);
    s.qs = s.qs.map((q, i) => ({ q: fd.get('q' + i).trim(), opts: [0, 1, 2, 3].map(j => fd.get(`o${i}_${j}`).trim()), key: fd.get('k' + i) != null ? +fd.get('k' + i) : null }));
    rerender(); toast(keysReady(s) ? 'Tersimpan · nilai tes dihitung ulang' : 'Tersimpan · beberapa soal belum punya kunci');
  },
  otmpl: (fd, f) => {
    S.onbTmpl = [...f.querySelectorAll('#otRows tr')].map((tr, i) => ({ id: 'k' + (i + 1) + uid().slice(0, 2), judul: tr.querySelector('[name=judul]').value.trim(), hari: +tr.querySelector('[name=hari]').value || 0, verif: tr.querySelector('[name=verif]').value })).filter(x => x.judul);
    rerender(); toast('Template tugas disimpan · berlaku untuk karyawan onboarding berikutnya');
  },
  lbudget: fd => { for (const [k, v] of fd.entries()) S.lndBudget[k] = +v || 0; rerender(); toast('Budget disimpan'); }
};

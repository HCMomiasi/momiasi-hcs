/* ======================= TALENT ACQUISITION ======================= */
const STG = [['hr', 'Interview HR'], ['tes', 'Tes skill'], ['user', 'Interview user'], ['offering', 'Offering'], ['bergabung', 'Bergabung']];
const STG_L = Object.fromEntries([...STG, ['ditolak', 'Ditolak'], ['mundur', 'Mengundurkan diri']]);
const stgPill = s => `<span class="pill ${s === 'bergabung' ? 'teal' : s === 'ditolak' || s === 'mundur' ? 'gray' : s === 'offering' ? 'amber' : 'blue'}">${STG_L[s]}</span>`;
const FPK_ST = { menunggu_direktur: ['Menunggu Direktur', 'amber'], menunggu_hcm: ['Menunggu HC Manager', 'amber'], menunggu_ta: ['Menunggu TA', 'amber'], mencari: ['Dalam pencarian', 'blue'], terpenuhi: ['Terpenuhi', 'teal'], ditolak: ['Ditolak', 'red'], dibatalkan: ['Dibatalkan', 'gray'] };
const fpkPill = f => `<span class="pill ${FPK_ST[f.status][1]}">${FPK_ST[f.status][0]}</span>`;
const INV_ST = { terkirim: ['Menunggu konfirmasi', 'amber'], hadir: ['Bersedia hadir', 'teal'], jadwal_ulang: ['Minta jadwal ulang', 'blue'], tolak: ['Tidak bersedia', 'red'] };
const invPill = s => `<span class="pill ${INV_ST[s][1]}">${INV_ST[s][0]}</span>`;
const JENIS_INV = { hr: 'Interview HR', user: 'Interview user' };
const SUMBER = ['LinkedIn', 'Jobstreet', 'Glints', 'Referral karyawan', 'Instagram Momiasi', 'Website / email langsung'];

function taSeed(d, now, L) {
  const D = 864e5, H = 36e5;
  const lines = s => s.split('|');
  const Q10 = lines('Ceritakan proyek video yang paling Anda banggakan dan peran Anda di dalamnya.|Software editing apa yang paling Anda kuasai? Tunjukkan contohnya.|Bagaimana Anda mengatur workflow saat ada 5 video dengan deadline berdekatan?|Bagaimana Anda menerima revisi dari tim konten?|Apa yang Anda ketahui tentang konten parenting Momiasi?|Format video apa yang menurut Anda paling efektif untuk TikTok & Reels?|Ceritakan pengalaman Anda bekerja dalam tim kreatif.|Bagaimana Anda mengikuti tren editing terbaru?|Apa ekspektasi Anda terhadap atasan dan tim?|Mengapa Anda tertarik bergabung dengan Momiasi?');
  const fpk = [
    { id: 'f1', no: 'FPK/2026/10/007', userId: 'u2', jabatan: 'Video Editor', dept: 'Branding', gajiMin: 5000000, gajiMax: 6500000, level: 'Staff', statusPeg: 'PKWT', jumlah: 1, tesSkill: 'Editing video pendek 60 detik dari footage mentah', deadline: d(21), picTA: 'u15', tglMinta: d(-30), tglMulai: d(30), alasan: 'baru', alasanKet: 'Volume produksi video naik 2x sejak kanal TikTok aktif.', jobdesc: lines('Mengedit video konten harian (TikTok, Reels, YouTube Shorts)|Menyiapkan motion graphic sederhana & subtitle|Mengelola arsip footage tim'), kualifikasi: lines('Portofolio editing video min. 10 karya|Menguasai Premiere Pro / CapCut|Memahami tren konten short-form'), umurMin: 21, umurMax: 30, pendidikan: 'Min. D3 semua jurusan', pengalaman: 'Min. 1 tahun sebagai video editor', tambahan: 'Diutamakan domisili Bandung', pertanyaan: Q10, tesList: lines('Edit footage mentah menjadi video 60 detik|Buat subtitle & thumbnail|Presentasi hasil 10 menit'), target: lines('Output 25 video/bulan|Rata-rata waktu edit < 1 hari per video|Arsip footage tertata'), status: 'mencari', log: [L('u2', 'Mengajukan', 30 * D), L('u9', 'Menyetujui', 29 * D), L('u3', 'Menyetujui', 28 * D)], approvedAt: now - 28 * D },
    { id: 'f2', no: 'FPK/2026/11/009', userId: 'u8', jabatan: 'Social Media Specialist', dept: 'Marketing & Sales', gajiMin: 5000000, gajiMax: 6000000, level: 'Staff', statusPeg: 'PKWT', jumlah: 1, tesSkill: 'Membuat content plan 1 minggu', deadline: d(25), picTA: 'u15', tglMinta: d(-14), tglMulai: d(35), alasan: 'ganti', alasanKet: 'Menggantikan karyawan yang resign akhir Oktober.', jobdesc: lines('Mengelola akun Instagram & TikTok|Menyusun content plan bulanan|Membuat laporan performa mingguan'), kualifikasi: lines('Paham analytics Instagram & TikTok|Mampu copywriting'), umurMin: 21, umurMax: 28, pendidikan: 'Min. S1', pengalaman: 'Min. 1 tahun', tambahan: '', pertanyaan: Q10.map(x => x.replace('video', 'konten')), tesList: lines('Content plan 1 minggu|Analisis 3 postingan kompetitor'), target: lines('Engagement rate > 4%|Posting konsisten 2x/hari'), status: 'mencari', log: [L('u8', 'Mengajukan', 14 * D), L('u9', 'Menyetujui', 13 * D), L('u3', 'Menyetujui', 12 * D)], approvedAt: now - 12 * D },
    { id: 'f3', no: 'FPK/2026/11/011', userId: 'u11', jabatan: 'Host Live', dept: 'Marketing & Sales', gajiMin: 4500000, gajiMax: 5500000, level: 'Staff', statusPeg: 'PKWT', jumlah: 2, tesSkill: 'Simulasi live selling 10 menit', deadline: d(30), picTA: 'u15', tglMinta: d(-1), tglMulai: d(40), alasan: 'baru', alasanKet: 'Penambahan jam live shopping menjadi 3 sesi per hari.', jobdesc: lines('Membawakan live shopping TikTok & Shopee|Menyiapkan script live bersama tim'), kualifikasi: lines('Percaya diri di depan kamera|Komunikatif'), umurMin: 20, umurMax: 30, pendidikan: 'Min. SMA/SMK', pengalaman: 'Diutamakan pernah host live', tambahan: 'Bersedia shift', pertanyaan: Q10, tesList: lines('Simulasi live 10 menit'), target: lines('GMV per sesi naik 15%'), status: 'menunggu_direktur', log: [L('u11', 'Mengajukan', 20 * H)] },
    { id: 'f4', no: 'FPK/2026/11/010', userId: 'u14', jabatan: 'Admin Gudang', dept: 'SCM', gajiMin: 4000000, gajiMax: 4800000, level: 'Staff', statusPeg: 'PKWT', jumlah: 1, tesSkill: 'Tes Excel dasar', deadline: d(20), picTA: '', tglMinta: d(-5), tglMulai: d(30), alasan: 'baru', alasanKet: 'Gudang kedua mulai beroperasi Desember.', jobdesc: lines('Input stok masuk & keluar|Rekonsiliasi stok mingguan'), kualifikasi: lines('Teliti|Menguasai Excel'), umurMin: 20, umurMax: 30, pendidikan: 'Min. SMA/SMK', pengalaman: 'Min. 1 tahun admin gudang', tambahan: '', pertanyaan: Q10, tesList: lines('Tes Excel dasar'), target: lines('Selisih stok < 0,5%'), status: 'menunggu_hcm', log: [L('u14', 'Mengajukan', 5 * D), L('u9', 'Menyetujui', 4 * D)] },
    { id: 'f7', no: 'FPK/2026/11/012', userId: 'u8', jabatan: 'Customer Relation Management', dept: 'Marketing & Sales', gajiMin: 5000000, gajiMax: 6500000, level: 'Officer', statusPeg: 'PKWT', jumlah: 1, tesSkill: 'Simulasi handling komplain pelanggan', deadline: d(28), tglMinta: d(-6), alasan: 'baru', alasanKet: 'Volume chat pelanggan naik setelah kampanye 11.11.', jobdesc: lines('Menangani komplain & pertanyaan pelanggan|Mengelola program loyalitas member'), kualifikasi: lines('Komunikatif|Terbiasa dengan CRM tools'), umurMin: 22, umurMax: 30, pendidikan: 'Min. S1', pengalaman: 'Min. 1 tahun customer service', tambahan: '', pertanyaan: Q10, tesList: lines('Simulasi handling komplain'), target: lines('Response time < 10 menit'), status: 'menunggu_ta', log: [L('u8', 'Mengajukan', 6 * D), L('u9', 'Menyetujui', 5 * D), L('u3', 'Menyetujui', 2 * D)] },
    { id: 'f5', no: 'FPK/2026/09/004', userId: 'u2', jabatan: 'Content Creator', dept: 'Branding', gajiMin: 4800000, gajiMax: 5800000, level: 'Staff', statusPeg: 'PKWT', jumlah: 1, tesSkill: 'Membuat 1 konten Reels', deadline: d(-20), picTA: 'u15', tglMinta: d(-60), tglMulai: d(-2), alasan: 'baru', alasanKet: 'Penambahan kanal YouTube Shorts.', jobdesc: lines('Membuat konten video parenting'), kualifikasi: lines('Kreatif'), umurMin: 21, umurMax: 30, pendidikan: 'Min. D3', pengalaman: '1 tahun', tambahan: '', pertanyaan: Q10, tesList: lines('1 konten Reels'), target: lines('15 konten/bulan'), status: 'terpenuhi', log: [L('u2', 'Mengajukan', 60 * D)], approvedAt: now - 58 * D },
    { id: 'f6', no: 'FPK/2026/07/002', userId: 'u8', jabatan: 'Admin Marketplace', dept: 'Marketing & Sales', gajiMin: 4500000, gajiMax: 5000000, level: 'Staff', statusPeg: 'PKWT', jumlah: 2, tesSkill: '', deadline: d(-90), picTA: 'u15', tglMinta: d(-140), tglMulai: d(-100), alasan: 'baru', alasanKet: '', jobdesc: [], kualifikasi: [], umurMin: 20, umurMax: 30, pendidikan: '', pengalaman: '', tambahan: '', pertanyaan: Q10, tesList: [], target: [], status: 'terpenuhi', log: [], approvedAt: now - 138 * D }
  ];
  const C = (id, fpkId, nama, sumber, stage, tglLamar, extra) => Object.assign({ id, fpkId, nama, email: nama.toLowerCase().replace(/[^a-z]+/g, '.') + '@example.com', hp: '0812' + String(10000000 + id.charCodeAt(1) * 7919).slice(0, 8), sumber, stage, tglLamar, cv: 'CV-' + nama.split(' ')[0] + '.pdf', invites: [], log: [L('u15', 'Menambahkan kandidat', daysBetween(tglLamar, TODAY) * D)] }, extra || {});
  const hrS = (base) => ({ s: F_HR.map((_, i) => Math.min(10, base + (i % 3) - 1)), c: F_HR.map(() => ''), rek: 'Ya', alasan: 'Komunikatif dan portofolio relevan.', by: 'u15', at: now - 6 * D });
  const cands = [
    C('k1', 'f1', 'Andi Saputra', 'LinkedIn', 'user', d(-20), { hr: hrS(8), invites: [{ id: 'i1', jenis: 'hr', tgl: d(-8), jam: '10:00', mode: 'Offline', lokasi: KANTOR, iv: ['u15'], status: 'hadir', sentAt: now - 10 * D, waAt: now - 10 * D, respAt: now - 9 * D }, { id: 'i2', jenis: 'user', tgl: d(1), jam: '10:00', mode: 'Offline', lokasi: KANTOR, iv: ['u2'], status: 'hadir', sentAt: now - 2 * D, waAt: now - 2 * D, respAt: now - 1 * D }] }),
    C('k2', 'f1', 'Bella Kartika', 'Instagram Momiasi', 'user', d(-22), { hr: hrS(8), invites: [{ id: 'i3', jenis: 'hr', tgl: d(-10), jam: '13:00', mode: 'Online', lokasi: 'Google Meet', iv: ['u15'], status: 'hadir', sentAt: now - 12 * D, respAt: now - 11 * D }, { id: 'i4', jenis: 'user', tgl: d(-1), jam: '14:00', mode: 'Offline', lokasi: KANTOR, iv: ['u2'], status: 'hadir', sentAt: now - 4 * D, respAt: now - 3 * D }] }),
    C('k3', 'f1', 'Rizky Maulana', 'Jobstreet', 'hr', d(-9), { invites: [{ id: 'i5', jenis: 'hr', tgl: d(1), jam: '14:00', mode: 'Offline', lokasi: KANTOR, iv: ['u15'], status: 'terkirim', sentAt: now - 5 * H }] }),
    C('k4', 'f1', 'Siti Rahmawati', 'Glints', 'hr', d(-4)),
    C('k5', 'f1', 'Dewi Anjani', 'Referral karyawan', 'hr', d(-1)),
    C('k6', 'f1', 'Fikri Ramadhan', 'Jobstreet', 'ditolak', d(-18), { alasanTolak: 'Portofolio belum sesuai kebutuhan short-form.' }),
    C('k7', 'f1', 'Galih Prasetyo', 'LinkedIn', 'offering', d(-25), { hr: hrS(9), uif: { s: [9, 9, 8, 8, 9, 8], c: ['-', '-', '-', '-', '-', '-'], lanjut: 'Ya', alasan: 'Hard skill paling kuat di antara kandidat.', by: 'u2', at: now - 5 * D, tgl: d(-6) }, offer: { gaji: 6000000, mulai: d(14), statusPeg: 'PKWT', durasi: 12, benefit: 'BPJS Kesehatan & Ketenagakerjaan, laptop kerja', batas: d(3), sentAt: now - 1 * D, resp: 'menunggu' }, invites: [{ id: 'i6', jenis: 'hr', tgl: d(-14), jam: '10:00', mode: 'Offline', lokasi: KANTOR, iv: ['u15'], status: 'hadir' }, { id: 'i7', jenis: 'user', tgl: d(-6), jam: '10:00', mode: 'Offline', lokasi: KANTOR, iv: ['u2'], status: 'hadir' }] }),
    C('k8', 'f2', 'Nabila Zahra', 'LinkedIn', 'tes', d(-10), { hr: hrS(7), invites: [{ id: 'i8', jenis: 'hr', tgl: d(-3), jam: '09:00', mode: 'Online', lokasi: 'Google Meet', iv: ['u15'], status: 'hadir' }] }),
    C('k9', 'f2', 'Yusuf Hidayat', 'Glints', 'hr', d(-2)),
    C('k10', 'f2', 'Hana Pertiwi', 'Instagram Momiasi', 'hr', d(-6)),
    C('k11', 'f5', 'Putri Anggraini', 'Referral karyawan', 'bergabung', d(-50), { hr: hrS(8), uif: { s: [8, 8, 8, 9, 9, 8], c: ['-', '-', '-', '-', '-', '-'], lanjut: 'Ya', alasan: 'Cocok dengan tim.', by: 'u2', at: now - 30 * D, tgl: d(-31) }, offer: { gaji: 5500000, mulai: d(-2), statusPeg: 'PKWT', durasi: 12, benefit: 'BPJS', batas: d(-20), sentAt: now - 25 * D, resp: 'terima', respAt: now - 23 * D }, userId: 'u12' }),
    C('k12', 'f6', 'Rendi Kurniawan', 'Jobstreet', 'bergabung', d(-130), { offer: { gaji: 4800000, mulai: d(-100), statusPeg: 'PKWT', durasi: 12, resp: 'terima', respAt: now - 110 * D } }),
    C('k13', 'f6', 'Maria Ulfa', 'LinkedIn', 'bergabung', d(-125), { offer: { gaji: 4800000, mulai: d(-95), statusPeg: 'PKWT', durasi: 12, resp: 'terima', respAt: now - 105 * D } }),
    C('k14', 'f6', 'Tono Wijaya', 'Referral karyawan', 'mundur', d(-128), { alasanTolak: 'Menerima tawaran lain.' })
  ];
  const reviews = [
    { id: 'rv1', userId: 'u16', jenis: 'probation', akhir: d(10), status: 'berjalan', reminders: [{ at: now - 2 * D, ke: ['atasan', 'karyawan'] }], log: [L('u3', 'Mengirim pengingat probation', 2 * D)] },
    { id: 'rv2', userId: 'u1', jenis: 'pkwt', akhir: d(28), status: 'berjalan', reminders: [{ at: now - 1 * D, ke: ['atasan', 'karyawan'] }], log: [L('u3', 'Mengirim pengingat PKWT', 1 * D)] },
    { id: 'rv3', userId: 'u7', jenis: 'pkwt', akhir: d(-20), status: 'selesai', reminders: [{ at: now - 52 * D, ke: ['atasan', 'karyawan'] }],
      ecr: { s: [7, 9, 8, 8, 9], c: ['Sesuai pasar, berharap ada penyesuaian tahun depan', '-', 'Sudah ikut 2 training', '-', '-'], open: ['Engagement Instagram naik 38% dalam 6 bulan', 'Koordinasi lintas tim saat campaign besar', 'Akses tools analytics berbayar', 'Onboarding jelas, atasan responsif', 'Paid ads & analisis funnel'], plan: F_ECR_PLAN[0], alasan: 'Ingin melanjutkan campaign yang sudah berjalan.', saran: 'Pertahankan budaya saling bantu antar tim.', at: now - 48 * D },
      agenda: { tgl: d(-35), jam: '10:00', mode: 'Offline', lokasi: KANTOR, at: now - 45 * D },
      self: { a: ['Engagement Instagram naik 38%', 'Timeline campaign Ramadan yang padat', 'Akses tools analytics', 'Komunikasi dengan atasan lancar', 'Paid ads', 'Lebih banyak sharing session antar divisi'], at: now - 35 * D },
      perf: { positif: '1. Konsisten mencapai target engagement\n2. Inisiatif membuat report mingguan\n3. Komunikatif dengan tim desain', perbaikan: 'Perlu lebih rapi dalam dokumentasi brief.', rek: F_PERF_REK[0], catatan: 'Rekomendasi kontrak 1 tahun dan tidak ada perubahan kompensasi & benefit.', by: 'u8', at: now - 34 * D },
      keputusan: { hasil: 'Perpanjang kontrak', durasi: 12, catatan: '', at: now - 30 * D }, log: [] }
  ];
  return {
    fpk, cands, reviews,
    taTpl: {
      hr: { judul: 'Undangan Interview HR', wa: 'Halo {nama},\n\nTerima kasih telah melamar posisi {posisi} di Momiasi Indonesia. Kami mengundang Anda untuk mengikuti Interview HR pada:\n\nHari/tanggal : {tanggal}\nWaktu : {jam} WIB\nTempat : {lokasi}\n\nMohon konfirmasi kehadiran Anda melalui link berikut:\n{link}\n\nSampai bertemu,\nTim Talent Acquisition Momiasi Indonesia', subjek: 'Undangan Interview HR – {posisi} Momiasi Indonesia' },
      user: { judul: 'Undangan Interview User', wa: 'Halo {nama},\n\nSelamat, Anda lolos ke tahap Interview User untuk posisi {posisi}. Interview akan dilakukan bersama {interviewer} pada:\n\nHari/tanggal : {tanggal}\nWaktu : {jam} WIB\nTempat : {lokasi}\n\nMohon konfirmasi kehadiran Anda melalui link berikut:\n{link}\n\nTerima kasih,\nTim Talent Acquisition Momiasi Indonesia', subjek: 'Undangan Interview User – {posisi} Momiasi Indonesia' },
      offering: { judul: 'Offering letter', wa: 'Halo {nama},\n\nSelamat! Dengan senang hati kami menawarkan posisi {posisi} di Momiasi Indonesia, dengan rencana tanggal mulai bekerja {mulai}.\n\nDetail penawaran dapat Anda baca dan konfirmasi melalui link berikut paling lambat {batas}:\n{link}\n\nKami menantikan kabar baik dari Anda.\nTim Talent Acquisition Momiasi Indonesia', subjek: 'Offering Letter – {posisi} Momiasi Indonesia' },
      kontrak_karyawan: { judul: 'Pengingat kontrak (karyawan)', wa: 'Halo {nama},\n\nKami informasikan bahwa {jenis} Anda sebagai {posisi} akan berakhir pada {akhir}.\n\nMohon lengkapi form evaluasi melalui link berikut paling lambat {batas}:\n{link}\n\nSelanjutnya HC akan menjadwalkan presentasi final {jenis} bersama atasan Anda.\n\nTerima kasih,\nTim HCGA Momiasi Indonesia', subjek: 'Pengingat {jenis} berakhir – {nama}' },
      kontrak_atasan: { judul: 'Pengingat kontrak (atasan)', wa: 'Halo {atasan},\n\nKami informasikan {jenis} {nama} ({posisi}) akan berakhir pada {akhir}.\n\nHC akan menjadwalkan agenda final {jenis} bersama Anda dan {nama} melalui Google Calendar. Mohon siapkan penilaian, lalu isi form hasil final setelah presentasi di Momiasi HCS:\n{link}\n\nTerima kasih,\nTim HCGA Momiasi Indonesia', subjek: 'Agenda final {jenis} – {nama}' }
    }
  };
}

/* ---------- helpers ---------- */
const FP = id => S.fpk.find(x => x.id === id);
const CD = id => S.cands.find(x => x.id === id);
const RV = id => S.reviews.find(x => x.id === id);
const isDir = () => me().level === 'Direktur';
const isMgr = () => me().level === 'Manager';
const isHCM = () => S.persona === 'superadmin' || me().jabatan === 'HCGA Manager';
const FPK_OPEN = ['menunggu_direktur', 'menunggu_hcm', 'menunggu_ta', 'mencari'];
const canDiv = dept => isHCGA() || isDir() || me().dept === dept;
const fillTpl = (s, v) => s.replace(/\{(\w+)\}/g, (m, k) => v[k] != null ? v[k] : m);
const waLink = (hp, text) => `https://wa.me/${String(hp || '').replace(/\D/g, '').replace(/^0/, '62')}?text=${encodeURIComponent(text)}`;
const fakeLink = path => `https://hcs.momiasi.id/${path}`;
const gcalLink = (title, tgl, mulai, durMin, lokasi, guests, details) => { const s = tgl.replace(/-/g, '') + 'T' + mulai.replace(':', '') + '00', e = tgl.replace(/-/g, '') + 'T' + fromMin(toMin(mulai) + durMin).replace(':', '') + '00'; return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${s}/${e}&ctz=Asia/Jakarta&location=${encodeURIComponent(lokasi)}&add=${encodeURIComponent(guests.join(','))}&details=${encodeURIComponent(details || '')}`; };
const candAvg = s => s ? avg(s) : null;
const lastInv = (c, jenis) => c.invites.filter(i => i.jenis === jenis).slice(-1)[0];
const nextWorkday = n => { let x = addDays(TODAY, n); while ([0, 6].includes(dt(x).getDay())) x = addDays(x, 1); return x; };
const hariTgl = s => `${HARIL[dt(s).getDay()]}, ${fdl(s)}`;
function contractEnd(u) { return u.statusKontrak === 'Probation' ? u.probAkhir : u.statusKontrak === 'PKWT' ? u.kontrakAkhir : null; }
function reviewFor(u) { return S.reviews.find(r => r.userId === u.id && r.status === 'berjalan'); }
function ensureReview(u) {
  let r = reviewFor(u);
  if (!r) { r = { id: 'rv' + uid(), userId: u.id, jenis: u.statusKontrak === 'Probation' ? 'probation' : 'pkwt', akhir: contractEnd(u), status: 'berjalan', reminders: [], log: [] }; S.reviews.push(r); }
  return r;
}
const jenisL = r => r.jenis === 'probation' ? 'masa probation' : 'kontrak PKWT';
function rvSteps(r) {
  const s = [{ l: 'Pengingat', done: r.reminders.length > 0 }];
  if (r.jenis === 'probation') s.push({ l: 'Probation feedback', done: !!r.pfb });
  else s.push({ l: 'Contract review', done: !!r.ecr });
  s.push({ l: 'Agenda final', done: !!r.agenda }, { l: 'Self-reflection', done: !!r.self }, { l: 'Performance review', done: !!r.perf }, { l: 'Keputusan HC', done: !!r.keputusan });
  return s;
}
const agendaPassed = r => r.agenda && r.agenda.tgl <= TODAY;

/* ---------- tasks & pending ---------- */
function taTasks() {
  const m = me(), out = [];
  S.cands.forEach(c => { const iv = lastInv(c, 'user'); if (c.stage === 'user' && iv && iv.status === 'hadir' && iv.iv.includes(m.id) && iv.tgl <= TODAY && !c.uif) out.push({ t: 'uif', c, title: `User Interview Feedback · ${c.nama}`, sub: `${FP(c.fpkId).jabatan} · interview ${fds(iv.tgl)}`, href: `#/uif/${c.id}`, btn: 'Isi feedback' }); });
  S.reviews.filter(r => r.status === 'berjalan').forEach(r => {
    const u = user(r.userId);
    if (r.jenis === 'probation' && u.atasan === m.id && !r.pfb && daysBetween(TODAY, r.akhir) <= 14) out.push({ title: `Probation feedback · ${u.nama}`, sub: `Probation berakhir ${fd(r.akhir)}`, href: `#/pfb/${r.id}`, btn: 'Isi penilaian' });
    if (r.jenis === 'pkwt' && r.userId === m.id && r.reminders.length && !r.ecr) out.push({ title: 'Employment Contract Review', sub: `Kontrak Anda berakhir ${fd(r.akhir)}`, href: `#/ecr/${r.id}`, btn: 'Isi form' });
    if (agendaPassed(r) && r.userId === m.id && !r.self) out.push({ title: `Self-reflection final ${r.jenis === 'probation' ? 'probation' : 'PKWT'}`, sub: `Setelah presentasi ${fd(r.agenda.tgl)}`, href: `#/self/${r.id}`, btn: 'Isi form' });
    if (agendaPassed(r) && u.atasan === m.id && !r.perf) out.push({ title: `Performance review · ${u.nama}`, sub: `Presentasi final ${fd(r.agenda.tgl)}`, href: `#/perf/${r.id}`, btn: 'Isi hasil final' });
  });
  return out;
}
function taPending() {
  return { dir: isDir() ? S.fpk.filter(f => f.status === 'menunggu_direktur') : [], hc: S.fpk.filter(f => (f.status === 'menunggu_hcm' && isHCM()) || (f.status === 'menunggu_ta' && isHCGA())) };
}

/* ======================= FPK ======================= */
function fpkTable(list) {
  if (!list.length) return empty('Belum ada FPK.');
  return `<div class="tw"><table class="t"><thead><tr><th>Posisi</th><th class="hide-sm">Pengaju</th><th class="r">Kandidat</th><th class="hide-sm">Tanggal permintaan</th><th class="hide-sm">Deadline</th><th>Status</th></tr></thead><tbody>${list.map(f => { const cs = S.cands.filter(c => c.fpkId === f.id), act = cs.filter(c => !['ditolak', 'mundur', 'bergabung'].includes(c.stage)).length, join = cs.filter(c => c.stage === 'bergabung').length;
    return `<tr class="click" data-href="#/fpk/${f.id}"><td><b>${esc(f.jabatan)}</b><span class="s">${f.no} · ${esc(f.dept)} · ${f.jumlah} orang</span></td><td class="hide-sm">${userCell(f.userId)}</td><td class="r num">${act}<span class="s">${join}/${f.jumlah} bergabung</span></td><td class="hide-sm num">${fds(f.tglMinta)}</td><td class="hide-sm num" ${f.status === 'mencari' && f.deadline < TODAY ? 'style="color:var(--red)"' : ''}>${fds(f.deadline)}</td><td>${fpkPill(f)}</td></tr>`; }).join('')}</tbody></table></div>`;
}
function vFpkList(q) {
  const all = S.fpk.filter(f => canDiv(f.dept)).sort((a, b) => b.tglMinta.localeCompare(a.tglMinta));
  const f = q.f || 'aktif', g = { aktif: all.filter(x => FPK_OPEN.includes(x.status)), selesai: all.filter(x => !FPK_OPEN.includes(x.status)), semua: all };
  return `<div class="page-head"><div><div class="eyebrow">Talent Acquisition</div><h1>Permintaan karyawan (FPK)</h1><p class="muted">Diajukan atasan → disetujui Direktur → HC Manager → diterima TA, lalu masuk daftar pencarian.</p></div>${isMgr() || isHCGA() ? `<a class="btn primary" href="#/fpk/baru">${ic('plus')} Buat FPK</a>` : ''}</div>
  <div class="tabs">${[['aktif', 'Berjalan'], ['selesai', 'Selesai & ditolak'], ['semua', 'Semua']].map(([k, l]) => `<a href="#/ta-fpk?f=${k}" class="${f === k ? 'on' : ''}">${l} <span class="c">${g[k].length}</span></a>`).join('')}</div>
  ${fbar('fpk', { dept: true, ph: 'Cari jabatan, nomor FPK, pengaju…' })}
  <section class="card">${fpkTable(g[f])}</section>`;
}
function vFpkForm() {
  const u = me();
  if (!(isMgr() || isHCGA())) return noAccess();
  const dir = S.users.find(x => x.level === 'Direktur');
  return `<a class="back" href="#/ta-fpk">${ic('left')} Permintaan karyawan</a>
  <div class="page-head"><div><h1>Formulir Permintaan Karyawan</h1><p class="muted">Alur persetujuan: ${dir ? esc(dir.nama) + ' (Direktur) → ' : ''}HC Manager → TA. Setelah diterima TA, kandidat mulai dicari.</p></div></div>
  <form class="card" style="max-width:900px" data-form="fpk" data-live="fpk" novalidate><div class="card-b form">
    <fieldset class="fs"><div class="fs-t">Posisi</div><div class="fgrid">
      <div class="f"><label>Nama perusahaan</label><select name="company">${opts(COMPANIES)}</select></div>
      <div class="f"><label>Departemen</label><select name="dept">${opts(DIVISI, u.dept)}</select></div>
      <div class="f"><label>Jabatan</label><input type="text" name="jabatan" placeholder="mis. Video Editor"></div>
      <div class="f"><label>Level</label><select name="level">${opts(LEVELS.slice(0, 4), 'Staff')}</select></div>
      <div class="f"><label>Kisaran gaji minimum</label><input type="number" name="gajiMin" step="100000" min="0"><span class="hint">Hanya terlihat oleh Anda, Direktur, dan HC.</span></div>
      <div class="f"><label>Kisaran gaji maksimum</label><input type="number" name="gajiMax" step="100000" min="0"></div>
      <div class="f"><label>Status pegawai</label><select name="statusPeg">${opts(['PKWT', 'PKWTT', 'Magang', 'Freelance'])}</select></div>
      <div class="f"><label>Jumlah kebutuhan</label><input type="number" name="jumlah" value="1" min="1"></div>
      <div class="f"><label>Tes skill (opsional)</label><input type="text" name="tesSkill" placeholder="mis. Editing video 60 detik"></div>
      <div class="f"><label>Tanggal permintaan FPK</label><input type="date" name="tglMinta" value="${TODAY}"></div>
      <div class="f"><label>Deadline</label><input type="date" name="deadline" value="${addDays(TODAY, 30)}"></div>
    </div></fieldset>
    <fieldset class="fs"><div class="fs-t">Alasan permintaan</div>
      <div class="choice"><label><input type="radio" name="alasan" value="ganti"><span><b>Menggantikan karyawan</b><span>Isi nama karyawan yang digantikan</span></span></label><label><input type="radio" name="alasan" value="baru" checked><span><b>Penambahan karyawan baru</b><span>Jelaskan alasannya</span></span></label></div>
      <div class="f"><label>Keterangan</label><input type="text" name="alasanKet" placeholder="Nama karyawan yang digantikan / alasan penambahan"></div>
    </fieldset>
    <fieldset class="fs"><div class="fs-t">Job description & kualifikasi</div><div class="fgrid">
      <div class="f"><label>Job description</label><textarea name="jobdesc" rows="4" placeholder="Satu poin per baris"></textarea></div>
      <div class="f"><label>Qualification</label><textarea name="kualifikasi" rows="4" placeholder="Satu poin per baris"></textarea></div>
      <div class="f"><label>Umur (dari – sampai)</label><div class="inrow"><input type="number" name="umurMin" value="21" min="17"><input type="number" name="umurMax" value="30" min="17"></div></div>
      <div class="f"><label>Pendidikan</label><input type="text" name="pendidikan" placeholder="mis. Min. D3 semua jurusan"></div>
      <div class="f"><label>Pengalaman kerja</label><input type="text" name="pengalaman" placeholder="mis. Min. 1 tahun"></div>
      <div class="f"><label>Tambahan lainnya</label><input type="text" name="tambahan"></div>
    </div></fieldset>
    <fieldset class="fs"><div class="fs-t">Panduan interview user</div><div class="fgrid">
      <div class="f full"><label>List pertanyaan interview user (minimal 10)</label><textarea name="pertanyaan" rows="8" placeholder="Satu pertanyaan per baris"></textarea><span class="hint" id="qCount">0 pertanyaan</span></div>
      <div class="f"><label>Test skill</label><textarea name="tesList" rows="3" placeholder="Satu poin per baris"></textarea></div>
      <div class="f"><label>Target objective</label><textarea name="target" rows="3" placeholder="Satu poin per baris"></textarea></div>
    </div></fieldset>
    <div id="formErr"></div>
    <div class="form-foot"><a class="btn" href="#/ta-fpk">Batal</a><button class="btn primary">Kirim ke ${dir ? esc(dir.nama.split(' ')[0]) : 'Direktur'}</button></div>
  </div></form>`;
}
const listHtml = a => a && a.length ? `<ol class="olist">${a.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : '<span class="faint">–</span>';
function vFpkDetail(id) {
  const f = FP(id);
  if (!f) return notFound();
  if (!canDiv(f.dept)) return noAccess();
  const m = me(), cs = S.cands.filter(c => c.fpkId === f.id);
  const showGaji = isHCGA() || isDir() || f.userId === m.id;
  let act = '';
  if (f.status === 'menunggu_direktur' && isDir()) act = `<div class="act amber"><div><b>Menunggu persetujuan Anda (Direktur)</b><p>Setelah disetujui, FPK diteruskan ke HCGA.</p></div><div class="btns"><button class="btn danger" data-act="fpk-reject" data-id="${f.id}">Tolak</button><button class="btn primary" data-act="fpk-approve" data-id="${f.id}">Setujui</button></div></div>`;
  else if (f.status === 'menunggu_hcm' && isHCM()) act = `<div class="act amber"><div><b>Menunggu persetujuan HC Manager</b><p>Sudah disetujui Direktur. Setelah disetujui, FPK diteruskan ke tim TA.</p></div><div class="btns"><button class="btn danger" data-act="fpk-reject" data-id="${f.id}">Tolak</button><button class="btn primary" data-act="fpk-approve" data-id="${f.id}">Setujui</button></div></div>`;
  else if (f.status === 'menunggu_ta' && isHCGA()) act = `<div class="act amber"><div><b>FPK masuk ke TA</b><p>Sudah disetujui Direktur & HC Manager. Terima untuk memulai pencarian kandidat.</p></div><div class="btns"><button class="btn primary" data-act="fpk-approve" data-id="${f.id}">Terima & mulai pencarian</button></div></div>`;
  else if (f.status === 'mencari' && isHCGA()) act = `<div class="act"><div><b>Dalam pencarian</b><p>${cs.filter(c => c.stage === 'bergabung').length} dari ${f.jumlah} posisi terisi · deadline ${fd(f.deadline)}</p></div><div class="btns"><button class="btn" data-act="fpk-close" data-id="${f.id}">Tutup lowongan</button><button class="btn primary" data-act="cand-add" data-fpk="${f.id}">${ic('plus')} Tambah kandidat</button></div></div>`;
  const ord = ['menunggu_direktur', 'menunggu_hcm', 'menunggu_ta', 'mencari', 'terpenuhi'], oi = ord.indexOf(f.status);
  const steps = [{ l: 'Diajukan atasan', done: true }, { l: 'Direktur', done: oi > 0 }, { l: 'HC Manager', done: oi > 1 }, { l: 'TA', done: oi > 2 }, { l: 'Pencarian', done: oi > 3 }, { l: 'Terpenuhi', done: oi > 3 }];
  const pipe = STG.map(([k, l]) => ({ k, l, n: cs.filter(c => c.stage === k).length }));
  return `<a class="back" href="#/ta-fpk">${ic('left')} Permintaan karyawan</a>
  <div class="page-head"><div><div class="eyebrow num">${f.no}</div><h1>${esc(f.jabatan)}</h1><p class="muted">${esc(f.dept)} · ${f.level} · ${f.statusPeg} · ${f.jumlah} orang · diajukan ${esc(user(f.userId).nama)}</p></div>${fpkPill(f)}</div>
  ${stepLine(steps)}<div style="height:16px"></div>${act}
  ${['mencari', 'terpenuhi'].includes(f.status) ? card('Kandidat', `<div class="pipe">${pipe.map(p => `<div class="pp"><b class="num">${p.n}</b><span>${p.l}</span></div>`).join('')}</div>${candTable(cs, isHCGA())}`, isHCGA() && f.status === 'mencari' ? `<button class="btn sm" data-act="cand-add" data-fpk="${f.id}">${ic('plus')} Tambah</button>` : '', `${cs.length} kandidat`) : ''}
  <div class="cols-main"><div>
  ${card('Detail permintaan', `<div class="card-b"><dl class="d"><dt>Perusahaan</dt><dd>${esc(f.company || 'Momiasi Indonesia')}</dd><dt>Jabatan</dt><dd>${esc(f.jabatan)}</dd><dt>Departemen</dt><dd>${esc(f.dept)}</dd>${showGaji ? `<dt>Kisaran gaji</dt><dd class="num">${rp(f.gajiMin)} – ${rp(f.gajiMax)}</dd>` : ''}<dt>Level</dt><dd>${f.level}</dd><dt>Status pegawai</dt><dd>${f.statusPeg}</dd><dt>Tes skill</dt><dd>${esc(f.tesSkill) || '–'}</dd><dt>Tanggal permintaan</dt><dd>${fd(f.tglMinta)}</dd><dt>Deadline</dt><dd>${fd(f.deadline)}</dd><dt>Alasan</dt><dd>${f.alasan === 'ganti' ? 'Menggantikan karyawan' : 'Penambahan karyawan baru'}${f.alasanKet ? ': ' + esc(f.alasanKet) : ''}</dd><dt>Kualifikasi</dt><dd>Umur ${f.umurMin}–${f.umurMax} tahun · ${esc(f.pendidikan) || '–'} · ${esc(f.pengalaman) || '–'}${f.tambahan ? ' · ' + esc(f.tambahan) : ''}</dd></dl></div>`)}
  <div class="cols"><div>${card('Job description', `<div class="card-b">${listHtml(f.jobdesc)}</div>`)}</div><div>${card('Qualification', `<div class="card-b">${listHtml(f.kualifikasi)}</div>`)}</div></div>
  ${card('Panduan interview user', `<div class="card-b"><p class="muted" style="margin:0 0 6px;font-size:12.5px">Tampil juga di form User Interview Feedback.</p>${listHtml(f.pertanyaan)}<div class="cols" style="margin-top:12px"><div><b style="font-size:13px">Test skill</b>${listHtml(f.tesList)}</div><div><b style="font-size:13px">Target objective</b>${listHtml(f.target)}</div></div></div>`)}
  </div><div>${card('Riwayat', `<div class="card-b">${timeline(f.log)}</div>`)}</div></div>`;
}

/* ======================= KANDIDAT ======================= */
function candTable(list, sel) {
  if (!list.length) return empty('Belum ada kandidat.');
  return `<div class="tw"><table class="t"><thead><tr>${sel ? '<th style="width:36px"><input type="checkbox" class="csel-all" aria-label="Pilih semua"></th>' : ''}<th>Kandidat</th><th class="hide-sm">Posisi</th><th>Tahap</th><th class="r hide-sm">Interview HR</th><th class="r hide-sm">Interview user</th><th class="hide-sm">Sumber</th>${sel ? '<th></th>' : ''}</tr></thead><tbody>${list.map(c => { const f = FP(c.fpkId), h = candAvg(c.hr?.s), u = candAvg(c.uif?.s);
    return `<tr class="click" data-href="#/kandidat/${c.id}">${sel ? `<td>${['ditolak', 'mundur', 'bergabung'].includes(c.stage) ? '' : `<input type="checkbox" class="csel" value="${c.id}" aria-label="Pilih ${esc(c.nama)}">`}</td>` : ''}<td><b>${esc(c.nama)}</b><span class="s">melamar ${fds(c.tglLamar)}</span></td><td class="hide-sm">${esc(f.jabatan)}<span class="s">${esc(f.dept)}</span></td><td>${stgPill(c.stage)}</td><td class="r num hide-sm">${h != null ? f1(h) : '–'}</td><td class="r num hide-sm">${u != null ? f1(u) : '–'}</td><td class="hide-sm">${esc(c.sumber)}</td>${sel ? `<td class="r">${['ditolak', 'mundur', 'bergabung'].includes(c.stage) ? '' : `<button class="btn sm" data-act="cand-invite" data-id="${c.id}">${ic('chat')} Undang</button>`}</td>` : ''}</tr>`; }).join('')}</tbody></table></div>`;
}
function vCandList(q) {
  const vis = S.cands.filter(c => canDiv(FP(c.fpkId).dept));
  const f = q.f || 'proses', fp = q.fpk || '';
  const base = fp ? vis.filter(c => c.fpkId === fp) : vis;
  const g = { proses: base.filter(c => !['bergabung', 'ditolak', 'mundur'].includes(c.stage)), bergabung: base.filter(c => c.stage === 'bergabung'), ditolak: base.filter(c => ['ditolak', 'mundur'].includes(c.stage)), semua: base };
  const fpks = S.fpk.filter(x => canDiv(x.dept) && S.cands.some(c => c.fpkId === x.id));
  return `<div class="page-head"><div><div class="eyebrow">Talent Acquisition</div><h1>Kandidat</h1><p class="muted">${isHCGA() ? 'Database kandidat semua lowongan.' : 'Kandidat untuk lowongan di divisi Anda.'}</p></div>${isHCGA() ? `<div class="btns"><button class="btn" data-act="cand-import">${ic('dl')} Import Excel</button><button class="btn primary" data-act="cand-add">${ic('plus')} Tambah kandidat</button></div>` : ''}</div>
  <div class="rbar"><select style="width:auto" data-nav="kand" data-f="${f}">${opts([['', 'Semua lowongan'], ...fpks.map(x => [x.id, x.jabatan + ' · ' + x.dept])], fp)}</select></div>
  <div class="tabs">${[['proses', 'Dalam proses'], ['bergabung', 'Bergabung'], ['ditolak', 'Ditolak & mundur'], ['semua', 'Semua']].map(([k, l]) => `<a href="#/ta-kandidat?f=${k}${fp ? '&fpk=' + fp : ''}" class="${f === k ? 'on' : ''}">${l} <span class="c">${g[k].length}</span></a>`).join('')}</div>
  ${fbar('kand', { dept: true, ph: 'Cari nama kandidat, posisi, sumber…' })}
  ${isHCGA() ? `<div class="selbar" id="selbar" hidden><span><b id="selN">0</b> kandidat dipilih</span><button class="btn sm primary" data-act="cand-bulk">${ic('chat')} Undang terpilih via WA & Email</button></div>` : ''}
  <section class="card">${candTable(g[f], isHCGA())}</section>`;
}

function scoreTable(labels, s, c) {
  return `<div class="tw"><table class="t"><thead><tr><th>Aspek</th><th class="r" style="width:80px">Nilai</th><th class="hide-sm">Catatan</th></tr></thead><tbody>${labels.map((l, i) => `<tr><td class="ni">${esc(l)}</td><td class="r"><span class="hm" style="background:${HEAT[Math.min(5, Math.max(1, Math.round((s[i] - 1) / 9 * 5)))]};color:${s[i] >= 7.5 ? '#fff' : 'var(--ink)'}">${s[i]}</span></td><td class="hide-sm muted">${c && c[i] && c[i] !== '-' ? esc(c[i]) : ''}</td></tr>`).join('')}</tbody><tfoot><tr><td>Rata-rata</td><td class="r num">${f1(avg(s))}</td><td class="hide-sm"></td></tr></tfoot></table></div>`;
}
function invRows(c) {
  if (!c.invites.length) return empty('Belum ada undangan.');
  return `<div class="list">${c.invites.slice().reverse().map(i => `<div class="row" style="cursor:default"><span class="rm"><span class="rt">${JENIS_INV[i.jenis]} · ${hariTgl(i.tgl)}, ${jam(i.jam)}</span><span class="rs">${i.mode} · ${esc(i.lokasi)} · ${i.iv.map(x => esc(user(x).nama)).join(', ')}${i.alasan ? ` · "${esc(i.alasan)}"` : ''}</span></span><span class="rr">${isHCGA() ? chanTags(i) : ''}${invPill(i.status)}${isHCGA() ? `<button class="btn sm" data-act="inv-send" data-c="${c.id}" data-i="${i.id}">Kirim ulang</button>` : ''}</span></div>`).join('')}</div>`;
}
function candAction(c) {
  if (!isHCGA()) {
    const iv = lastInv(c, 'user');
    if (c.stage === 'user' && iv && iv.iv.includes(me().id) && !c.uif) return iv.tgl <= TODAY && iv.status === 'hadir' ? `<div class="act amber"><div><b>Isi User Interview Feedback</b><p>Interview ${fd(iv.tgl)}. Penilaian Anda menjadi bahan keputusan rekrutmen.</p></div><a class="btn primary" href="#/uif/${c.id}">Isi feedback</a></div>` : `<div class="act"><div><b>Interview user ${fd(iv.tgl)}, ${jam(iv.jam)}</b><p>${INV_ST[iv.status][0]}. Form feedback terbuka setelah interview.</p></div></div>`;
    return '';
  }
  const f = FP(c.fpkId), tolak = `<button class="btn danger" data-act="cand-reject" data-id="${c.id}">Tolak</button>`;
  const nx = (to, l) => `<button class="btn primary" data-act="cand-next" data-id="${c.id}" data-to="${to}">${l}</button>`;
  const hrI = lastInv(c, 'hr'), uI = lastInv(c, 'user');
  if (c.stage === 'hr') {
    if (!hrI || ['tolak', 'jadwal_ulang'].includes(hrI.status)) return `<div class="act amber"><div><b>${hrI ? 'Kandidat ' + INV_ST[hrI.status][0].toLowerCase() : 'Jadwalkan Interview HR'}</b><p>Undangan otomatis dari template, dikirim lewat WhatsApp & email.</p></div><div class="btns">${tolak}<button class="btn primary" data-act="inv-new" data-id="${c.id}" data-j="hr">Kirim undangan Interview HR</button></div></div>`;
    if (!c.hr) return `<div class="act"><div><b>Interview HR ${fd(hrI.tgl)}, ${jam(hrI.jam)}</b><p>${INV_ST[hrI.status][0]}. Isi penilaian setelah interview.</p></div><div class="btns">${tolak}<a class="btn primary" href="#/hrscore/${c.id}">Isi penilaian Interview HR</a></div></div>`;
    return `<div class="act"><div><b>Penilaian HR: ${f1(avg(c.hr.s))} / 10 · rekomendasi ${c.hr.rek}</b><p>Lanjutkan ke tahap berikutnya.</p></div><div class="btns">${tolak}${f.tesSkill ? nx('tes', 'Lanjut · tes skill') : nx('user', 'Lanjut · Interview user')}</div></div>`;
  }
  if (c.stage === 'tes') return `<div class="act"><div><b>Tes skill: ${esc(f.tesSkill)}</b><p>${c.tes ? `Nilai ${c.tes.nilai} · ${esc(c.tes.catatan || '')}` : 'Catat hasil tes kandidat.'}</p></div><div class="btns">${tolak}${c.tes ? nx('user', 'Lanjut · Interview user') : `<button class="btn primary" data-act="tes-input" data-id="${c.id}">Input hasil tes</button>`}</div></div>`;
  if (c.stage === 'user') {
    if (!uI || ['tolak', 'jadwal_ulang'].includes(uI.status)) return `<div class="act amber"><div><b>${uI ? 'Kandidat ' + INV_ST[uI.status][0].toLowerCase() : 'Jadwalkan Interview user'}</b><p>Interviewer default: ${esc(user(f.userId).nama)} (pengaju FPK).</p></div><div class="btns">${tolak}<button class="btn primary" data-act="inv-new" data-id="${c.id}" data-j="user">Kirim undangan Interview user</button></div></div>`;
    if (!c.uif) return `<div class="act"><div><b>Interview user ${fd(uI.tgl)}, ${jam(uI.jam)}</b><p>${INV_ST[uI.status][0]} · menunggu User Interview Feedback dari ${uI.iv.map(x => esc(user(x).nama)).join(', ')}.</p></div><div class="btns">${tolak}</div></div>`;
    return `<div class="act"><div><b>User: ${c.uif.lanjut === 'Ya' ? 'lanjut ke tahap berikutnya' : c.uif.lanjut === 'Tidak' ? 'tidak dilanjutkan' : 'dipertimbangkan'} · ${f1(avg(c.uif.s))} / 10</b><p>${esc(c.uif.alasan)}</p></div><div class="btns">${tolak}${nx('offering', 'Lanjut · offering')}</div></div>`;
  }
  if (c.stage === 'offering') {
    if (!c.offer || c.offer.resp === 'tolak') return `<div class="act amber"><div><b>${c.offer ? 'Kandidat menolak offering' : 'Buat offering letter'}</b><p>Kisaran gaji FPK: ${rp(f.gajiMin)} – ${rp(f.gajiMax)}.</p></div><div class="btns">${tolak}<button class="btn primary" data-act="offer-new" data-id="${c.id}">${c.offer ? 'Revisi offering' : 'Buat & kirim offering'}</button></div></div>`;
    if (c.offer.resp === 'menunggu') return `<div class="act"><div><b>Offering terkirim · menunggu jawaban kandidat</b><p>Batas konfirmasi ${fd(c.offer.batas)}.</p></div><div class="btns"><button class="btn" data-act="offer-send" data-id="${c.id}">Kirim ulang</button><a class="btn" href="#/offer/${c.id}">Lihat halaman kandidat</a></div></div>`;
    return `<div class="act amber"><div><b>Kandidat menerima offering</b><p>Mulai bekerja ${fd(c.offer.mulai)}. Buat akun karyawan: undangan login terkirim dan onboarding LnD langsung berjalan.</p></div><button class="btn primary" data-act="cand-join" data-id="${c.id}">Proses bergabung</button></div>`;
  }
  if (c.stage === 'bergabung') return `<div class="act"><div><b>Sudah bergabung</b><p>${c.userId ? `Akun ${esc(user(c.userId).nama)} · mulai ${fd(c.offer?.mulai || TODAY)}` : ''}</p></div>${c.userId && S.onb.some(o => o.userId === c.userId) ? `<a class="btn" href="#/onb/${S.onb.find(o => o.userId === c.userId).id}">Lihat onboarding</a>` : ''}</div>`;
  return '';
}
function vCandDetail(id) {
  const c = CD(id);
  if (!c) return notFound();
  const f = FP(c.fpkId);
  if (!canDiv(f.dept)) return noAccess();
  const idx = STG.findIndex(s => s[0] === c.stage);
  const steps = STG.map(([k, l], i) => ({ l, done: idx >= 0 ? i < idx || c.stage === 'bergabung' : false }));
  return `<a class="back" href="#/ta-kandidat">${ic('left')} Kandidat</a>
  <div class="page-head"><div><div class="eyebrow">Kandidat · <a href="#/fpk/${f.id}">${esc(f.jabatan)}</a></div><h1>${esc(c.nama)}</h1><p class="muted">${esc(f.dept)} · melamar ${fd(c.tglLamar)} · via ${esc(c.sumber)}</p></div><div class="btns">${stgPill(c.stage)}${isHCGA() && !['ditolak', 'mundur', 'bergabung'].includes(c.stage) ? `<button class="btn primary" data-act="cand-invite" data-id="${c.id}">${ic('chat')} Undang via WA & Email</button>` : ''}</div></div>
  ${stepLine(steps)}<div style="height:16px"></div>${candAction(c)}
  <div class="cols-main"><div>
  ${card('Data kandidat', `<div class="card-b"><dl class="d"><dt>Email</dt><dd>${esc(c.email)}</dd><dt>WhatsApp</dt><dd class="num">${esc(c.hp)}</dd><dt>CV</dt><dd><span class="file">${ic('file')}${esc(c.cv)}</span></dd><dt>Sumber</dt><dd>${esc(c.sumber)}</dd>${c.alasanTolak ? `<dt>Alasan</dt><dd>${esc(c.alasanTolak)}</dd>` : ''}</dl></div>`)}
  ${card('Jadwal & undangan', invRows(c))}
  ${c.hr ? card('Penilaian Interview HR', scoreTable(F_HR, c.hr.s, c.hr.c) + `<div class="card-b">${kv('Rekomendasi', c.hr.rek)}<p class="muted" style="margin:4px 0 0;font-size:13px">${esc(c.hr.alasan)}</p></div>`, '', `oleh ${esc(user(c.hr.by).nama)}`) : ''}
  ${c.uif ? card('User Interview Feedback', scoreTable(F_UIF.map(x => x.t), c.uif.s, c.uif.c) + `<div class="card-b">${kv('Diproses ke tahap selanjutnya?', c.uif.lanjut)}<p class="muted" style="margin:4px 0 0;font-size:13px">${esc(c.uif.alasan)}</p></div>`, '', `oleh ${esc(user(c.uif.by).nama)} · ${fds(c.uif.tgl)}`) : ''}
  ${c.offer ? card('Offering', `<div class="card-b"><dl class="d"><dt>Gaji</dt><dd class="num">${rp(c.offer.gaji)}${c.offer.gaji > f.gajiMax ? ' <span class="pill amber">di atas kisaran FPK</span>' : ''}</dd><dt>Mulai bekerja</dt><dd>${fd(c.offer.mulai)}</dd><dt>Status</dt><dd>${c.offer.statusPeg}${c.offer.statusPeg === 'PKWT' ? ` · ${c.offer.durasi} bulan · probation 3 bulan` : ''}</dd><dt>Benefit</dt><dd>${esc(c.offer.benefit || '–')}</dd><dt>Jawaban</dt><dd>${{ menunggu: 'Menunggu', terima: 'Diterima', tolak: 'Ditolak' }[c.offer.resp]}${c.offer.respAt ? ' · ' + fdt(c.offer.respAt) : ''}</dd></dl></div>`, `<a class="link" href="#/offer/${c.id}">Offering letter</a>`) : ''}
  </div><div>${card('Riwayat', `<div class="card-b">${timeline(c.log)}</div>`)}</div></div>`;
}

/* ---------- invitation send modal ---------- */
function invVars(c, i) { const f = FP(c.fpkId); return { nama: c.nama, posisi: f.jabatan, tanggal: hariTgl(i.tgl), jam: jam(i.jam), lokasi: i.mode === 'Online' ? 'Online via Google Meet (link menyusul di undangan kalender)' : i.lokasi, interviewer: i.iv.map(x => user(x).nama).join(' & '), link: fakeLink(`k/${c.id}/${i.id}`) }; }
function sendModal(title, rows, after) {
  modal(title, rows.map(r => `<div class="sendbox"><div class="sb-h"><b>${esc(r.ke)}</b><span class="muted num">${esc(r.hp)} · ${esc(r.email)}</span></div>${r.subjek ? `<div class="muted" style="font-size:12.5px">Subjek email: <b style="color:var(--ink-2)">${esc(r.subjek)}</b></div>` : ''}<pre class="msg">${esc(r.text)}</pre><div class="btns"><a class="btn sm primary" href="${waLink(r.hp, r.text)}" target="_blank" rel="noopener" data-wa="${esc(r.ref || '')}">${ic('chat')} Kirim via WhatsApp</a><button type="button" class="btn sm" data-act="mail-send" data-ref="${esc(r.ref || '')}" data-to="${esc(r.email)}">${ic('mail')} Kirim via Email</button>${r.extra || ''}</div></div>`).join('') + '<p class="muted" style="margin:0;font-size:12px">WhatsApp terbuka dengan pesan yang sudah terisi, tinggal tekan kirim. Email dikirim langsung dari sistem ke alamat kandidat.</p>', 'Selesai', () => { after && after(); setTimeout(rerender, 50); });
}
function markSent(ref, ch) {
  if (!ref) return;
  const [k, a, b] = ref.split(':');
  if (k === 'i') { const c = CD(a), i = c && c.invites.find(x => x.id === b); if (i) { i[ch + 'At'] = Date.now(); addLog(c, `Mengirim undangan ${JENIS_INV[i.jenis]} via ${ch === 'wa' ? 'WhatsApp' : 'email'}`); } }
  if (k === 'o') { const c = CD(a); if (c && c.offer) { c.offer[ch + 'At'] = Date.now(); addLog(c, `Mengirim offering via ${ch === 'wa' ? 'WhatsApp' : 'email'}`); } }
  if (k === 'm') { const c = CD(a); if (c) addLog(c, `Mengirim pesan via ${ch === 'wa' ? 'WhatsApp' : 'email'}`, b || ''); }
  save();
}
const chanTags = o => `<span class="chan ${o.waAt ? 'on' : ''}" title="WhatsApp">${ic('chat')} WA</span><span class="chan ${o.mailAt ? 'on' : ''}" title="Email">${ic('mail')} Email</span>`;
function sendInvite(c, i) {
  const t = S.taTpl[i.jenis], v = invVars(c, i), text = fillTpl(t.wa, v);
  sendModal(`${t.judul} · ${c.nama}`, [{ ke: c.nama, hp: c.hp, email: c.email, text, subjek: fillTpl(t.subjek, v), ref: `i:${c.id}:${i.id}`, extra: `<a class="btn sm" href="#/konfirmasi/${c.id}/${i.id}" data-act="mclose-nav" data-href2="#/konfirmasi/${c.id}/${i.id}">Lihat halaman kandidat</a>` }]);
}

/* ---------- candidate-facing pages (no login) ---------- */
function vKonfirmasi(cid, iid) {
  const c = CD(cid), i = c && c.invites.find(x => x.id === iid);
  if (!i) return notFound();
  const f = FP(c.fpkId), done = i.status !== 'terkirim';
  const gl = gcalLink(`${JENIS_INV[i.jenis]} – ${f.jabatan} Momiasi`, i.tgl, i.jam, 60, i.mode === 'Online' ? 'Google Meet' : i.lokasi, [c.email, ...i.iv.map(x => user(x).email)]);
  return `<div class="cand"><div class="cand-in"><div class="lw" style="width:130px">${LOGO()}</div>
    <div class="demo-note">Tampilan kandidat (simulasi). <a href="#/kandidat/${c.id}">Kembali ke HCS</a></div>
    <h1 style="margin-top:18px">${JENIS_INV[i.jenis]}</h1><p class="muted" style="margin:4px 0 18px">${esc(f.jabatan)} · Momiasi Indonesia</p>
    <dl class="d"><dt>Nama</dt><dd>${esc(c.nama)}</dd><dt>Hari/tanggal</dt><dd>${hariTgl(i.tgl)}</dd><dt>Waktu</dt><dd>${jam(i.jam)} WIB · ±60 menit</dd><dt>Tempat</dt><dd>${i.mode === 'Online' ? 'Online · Google Meet' : `${esc(i.lokasi)} · <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(i.lokasi)}" target="_blank" rel="noopener">Buka di Maps</a>`}</dd><dt>Interviewer</dt><dd>${i.iv.map(x => esc(user(x).nama)).join(', ')}</dd></dl>
    ${done ? `<div class="alert ${i.status === 'hadir' ? 'info' : 'warn'}" style="margin-top:18px">${i.status === 'hadir' ? `Terima kasih, kehadiran Anda sudah dikonfirmasi. Undangan Google Calendar sudah dikirim ke ${esc(c.email)}.` : i.status === 'jadwal_ulang' ? 'Permintaan jadwal ulang sudah kami terima. Tim TA akan menghubungi Anda.' : 'Terima kasih atas informasinya.'}</div>${i.status === 'hadir' ? `<a class="btn" style="margin-top:12px" href="${gl}" target="_blank" rel="noopener">${ic('cal')} Buka di Google Calendar</a>` : ''}`
    : `<form data-form="konfirmasi" data-c="${c.id}" data-i="${i.id}" class="form" style="margin-top:20px"><div class="choice" style="grid-template-columns:1fr"><label><input type="radio" name="r" value="hadir" checked><span><b>Saya bersedia hadir</b><span>Undangan Google Calendar akan dikirim ke email Anda</span></span></label><label><input type="radio" name="r" value="jadwal_ulang"><span><b>Minta jadwal ulang</b><span>Tuliskan waktu yang memungkinkan</span></span></label><label><input type="radio" name="r" value="tolak"><span><b>Tidak bersedia</b><span>Mengundurkan diri dari proses ini</span></span></label></div><div class="f"><label>Catatan (opsional)</label><textarea name="alasan" placeholder="mis. Bisa hari Kamis setelah pukul 13.00"></textarea></div><button class="btn primary" style="height:42px">Kirim konfirmasi</button></form>`}
  </div></div>`;
}
function offerLetter(c) {
  const f = FP(c.fpkId), o = c.offer;
  return `<div class="letter"><div class="ph"><div class="lw">${LOGO()}</div><div class="meta">Momiasi Indonesia<br>${KANTOR}</div></div>
    <h2>OFFERING LETTER</h2><p>Kepada Yth.<br><b>${esc(c.nama)}</b><br>di tempat</p>
    <p>Dengan hormat, berdasarkan rangkaian proses seleksi yang telah Anda ikuti, kami dengan senang hati menawarkan posisi berikut:</p>
    <table class="lt"><tr><td>Posisi</td><td>${esc(f.jabatan)}</td></tr><tr><td>Departemen</td><td>${esc(f.dept)}</td></tr><tr><td>Level</td><td>${f.level}</td></tr><tr><td>Status</td><td>${o.statusPeg}${o.statusPeg === 'PKWT' ? ` · ${o.durasi} bulan, termasuk masa probation 3 bulan` : ''}</td></tr><tr><td>Gaji pokok</td><td>${rp(o.gaji)} per bulan (bruto)</td></tr><tr><td>Benefit</td><td>${esc(o.benefit || '–')}</td></tr><tr><td>Tanggal mulai</td><td>${hariTgl(o.mulai)}</td></tr><tr><td>Lokasi kerja</td><td>${KANTOR}</td></tr></table>
    <p>Mohon memberikan konfirmasi paling lambat <b>${fdl(o.batas)}</b>.</p>
    <p style="margin-top:28px">Hormat kami,<br><br><b>${esc(user(HCGA_IDS[0]).nama)}</b><br>${esc(user(HCGA_IDS[0]).jabatan)}</p></div>`;
}
function vOffer(cid) {
  const c = CD(cid);
  if (!c || !c.offer) return notFound();
  const o = c.offer;
  return `<div class="cand"><div class="cand-in wide"><div class="demo-note">Tampilan kandidat (simulasi). <a href="#/kandidat/${c.id}">Kembali ke HCS</a></div>
    ${offerLetter(c)}
    ${o.resp === 'menunggu' ? `<form data-form="offer-resp" data-c="${c.id}" class="btns" style="justify-content:flex-end;margin-top:18px"><button type="button" class="btn danger" data-act="offer-tolak" data-id="${c.id}">Tolak penawaran</button><button class="btn primary">Terima penawaran</button></form>` : `<div class="alert ${o.resp === 'terima' ? 'info' : 'warn'}" style="margin-top:18px">${o.resp === 'terima' ? 'Anda telah menerima penawaran ini. Tim HC akan mengirim informasi hari pertama dan akun Momiasi HCS ke email Anda.' : 'Anda menolak penawaran ini.'}</div>`}
  </div></div>`;
}

/* ---------- scoring forms ---------- */
function scaleBlock(prefix, items, withComment, rule) {
  return items.map((it, i) => `<div class="sq"><div class="sqt"><span class="qn">${i + 1}</span><span><b>${esc(typeof it === 'string' ? it : it.t)}</b>${it.d ? `<span class="sqd">${esc(it.d)}</span>` : ''}</span></div>${scaleInput(prefix + i, 10)}${withComment ? `<div class="f" style="margin:8px 0 0 34px"><input type="text" name="${prefix}c${i}" placeholder="${rule}"></div>` : ''}</div>`).join('');
}
const SCALE_HINT = '<div class="scalehint"><span>1–2 sangat kurang · 3–4 kurang · 5–6 cukup</span><span>7–8 baik · 9–10 sangat baik</span></div>';
function vHrScore(cid) {
  if (!isHCGA()) return noAccess();
  const c = CD(cid), f = c && FP(c.fpkId), i = c && lastInv(c, 'hr');
  if (!c) return notFound();
  return `<a class="back" href="#/kandidat/${c.id}">${ic('left')} ${esc(c.nama)}</a>
  <div class="page-head"><div><div class="eyebrow">Form penilaian</div><h1>Interview HR</h1><p class="muted">${esc(c.nama)} · ${esc(f.jabatan)}${i ? ' · ' + fd(i.tgl) : ''}</p></div></div>
  <form class="card" data-form="hrscore" data-id="${c.id}" style="max-width:860px"><div class="card-b form">${SCALE_HINT}
    ${scaleBlock('h', F_HR, true, 'Catatan (wajib bila nilai 1–7)')}
    <div class="f"><span class="lb">Apakah kandidat akan diproses ke tahap selanjutnya?</span><div class="seg2">${['Ya', 'Tidak', 'Dipertimbangkan'].map((x, k) => `<label><input type="radio" name="rek" value="${x}" ${k ? '' : 'checked'}><span>${x}</span></label>`).join('')}</div></div>
    <div class="f"><label>Alasan keputusan</label><textarea name="alasan"></textarea></div>
    <div id="formErr"></div><div class="form-foot"><a class="btn" href="#/kandidat/${c.id}">Batal</a><button class="btn primary">Simpan penilaian</button></div></div></form>`;
}
function vUif(cid) {
  const c = CD(cid);
  if (!c) return notFound();
  const f = FP(c.fpkId), i = lastInv(c, 'user'), m = me();
  if (!(isHCGA() || (i && i.iv.includes(m.id)))) return noAccess();
  if (c.uif) return `<a class="back" href="#/kandidat/${c.id}">${ic('left')} ${esc(c.nama)}</a><div class="alert info">Feedback untuk ${esc(c.nama)} sudah diisi.</div>`;
  return `<a class="back" href="#/kandidat/${c.id}">${ic('left')} ${esc(c.nama)}</a>
  <div class="page-head"><div><div class="eyebrow">User Interview Feedback · Momiasi Indonesia</div><h1>${esc(c.nama)}</h1><p class="muted">Hasil penilaian user terhadap kandidat, dipakai sebagai bahan keputusan rekrutmen oleh User & HCGA.</p></div></div>
  <div class="cols-main"><form class="card" data-form="uif" data-id="${c.id}"><div class="card-b form">
    <dl class="d"><dt>Kandidat yang dinilai</dt><dd>${esc(c.nama)}</dd><dt>Nama user yang menilai</dt><dd>${esc(m.nama)}</dd><dt>Posisi</dt><dd>${esc(f.jabatan)}</dd><dt>Tanggal interview user</dt><dd>${i ? fd(i.tgl) : '–'}</dd></dl>
    ${SCALE_HINT}
    ${scaleBlock('u', F_UIF, true, 'Nilai 1–7: tulis catatan. Nilai 8–10: isi "-"')}
    <div class="f"><span class="lb">Apakah kandidat akan diproses ke tahap selanjutnya?</span><div class="seg2">${['Ya', 'Tidak', 'Dipertimbangkan'].map((x, k) => `<label><input type="radio" name="lanjut" value="${x}" ${k ? '' : 'checked'}><span>${x}</span></label>`).join('')}</div></div>
    <div class="f"><label>Alasan keputusan</label><textarea name="alasan"></textarea></div>
    <div id="formErr"></div><div class="form-foot"><a class="btn" href="#/lnd-tugas">Batal</a><button class="btn primary">Kirim feedback</button></div></div></form>
    <aside class="card sum"><div class="card-h"><h2>Panduan dari FPK</h2></div><div class="card-b"><b style="font-size:13px">Pertanyaan interview</b>${listHtml(f.pertanyaan)}<b style="font-size:13px;display:block;margin-top:10px">Target objective</b>${listHtml(f.target)}</div></aside></div>`;
}

/* ======================= JADWAL ======================= */
function vTaJadwal() {
  if (!isHCGA()) return noAccess();
  const all = S.cands.flatMap(c => c.invites.map(i => ({ c, i }))).filter(x => x.i.tgl >= addDays(TODAY, -7)).sort((a, b) => (a.i.tgl + a.i.jam).localeCompare(b.i.tgl + b.i.jam));
  const up = all.filter(x => x.i.tgl >= TODAY), past = all.filter(x => x.i.tgl < TODAY).reverse();
  const byDay = {}; up.forEach(x => (byDay[x.i.tgl] = byDay[x.i.tgl] || []).push(x));
  const fb = x => x.i.jenis === 'hr' ? (x.c.hr ? '<span class="pill teal">Penilaian HR terisi</span>' : '<span class="pill amber">Penilaian HR belum</span>') : (x.c.uif ? '<span class="pill teal">Feedback user terisi</span>' : '<span class="pill amber">Feedback user belum</span>');
  const rowH = (x, showFb) => row({ href: `#/kandidat/${x.c.id}`, tag: x.i.jenis === 'hr' ? 'HR' : 'User', title: `${jam(x.i.jam)} · ${esc(x.c.nama)}`, sub: `${esc(FP(x.c.fpkId).jabatan)} · ${x.i.mode} · ${x.i.iv.map(v => esc(user(v).nama)).join(', ')}`, right: showFb ? fb(x) : invPill(x.i.status) });
  return `<div class="page-head"><div><div class="eyebrow">Talent Acquisition</div><h1>Jadwal interview</h1><p class="muted">Interview HR & user beserta konfirmasi kandidat. Yang sudah dikonfirmasi otomatis masuk Google Calendar.</p></div></div>
  ${fbar('jadwal', { ph: 'Cari kandidat, posisi, interviewer…' })}
  ${Object.keys(byDay).length ? Object.keys(byDay).map(dd => card(relDay(dd) + (dd === TODAY || dd === addDays(TODAY, 1) ? ' · ' + fds(dd) : ''), `<div class="list">${byDay[dd].map(x => rowH(x)).join('')}</div>`)).join('') : card('Mendatang', empty('Belum ada jadwal interview.'))}
  ${card('7 hari terakhir', past.length ? `<div class="list">${past.map(x => rowH(x, true)).join('')}</div>` : empty('Tidak ada.'), '', 'status penilaian interviewer')}`;
}

/* ======================= PROBATION & KONTRAK ======================= */
function vTaKontrak(q) {
  if (!isHCGA()) return noAccess();
  const tab = q.tab || 'aksi';
  const emps = S.users.filter(u => ['Probation', 'PKWT'].includes(u.statusKontrak) && u.akun !== 'nonaktif');
  const soon = emps.filter(u => { const e = contractEnd(u); return e && daysBetween(TODAY, e) <= 30 && daysBetween(TODAY, e) >= -7; }).sort((a, b) => contractEnd(a).localeCompare(contractEnd(b)));
  let body = '';
  if (tab === 'aksi') body = soon.length ? fbar('kaksi', { status: false, ph: 'Cari karyawan…' }) + `<section class="card"><div class="tw"><table class="t lines"><thead><tr><th>Karyawan</th><th>Berakhir</th><th>Line proses</th><th></th></tr></thead><tbody>${soon.map(u => { const r = reviewFor(u), e = contractEnd(u), n = daysBetween(TODAY, e); return `<tr class="click" data-href="#/review/${u.id}"><td style="width:210px"><b>${esc(u.nama)}</b><span class="s">${esc(u.jabatan)} · ${u.statusKontrak}</span></td><td class="num" style="width:120px">${fds(e)}<span class="s" style="color:var(--${n <= 7 ? 'red' : 'amber'})">${n < 0 ? 'lewat ' + -n + ' hari' : n + ' hari lagi'}</span></td><td>${stepLine(rvSteps(r || { jenis: u.statusKontrak === 'Probation' ? 'probation' : 'pkwt', reminders: [] }))}</td><td class="r" style="width:110px"><a class="btn sm" href="#/review/${u.id}">Kelola</a></td></tr>`; }).join('')}</tbody></table></div></section>` : card('Akan berakhir', empty('Tidak ada probation atau kontrak yang berakhir dalam 30 hari.'));
  if (tab === 'data') body = fbar('kontrak', { status: false, dept: true, ph: 'Cari karyawan…' }) + `<section class="card"><div class="tw"><table class="t"><thead><tr><th>Karyawan</th><th class="hide-sm">Company</th><th>Status</th><th class="hide-sm">Mulai</th><th>Berakhir</th><th></th></tr></thead><tbody>${S.users.filter(u => u.akun !== 'nonaktif').map(u => { const e = contractEnd(u); return `<tr><td>${userCell(u.id)}</td><td class="hide-sm">${esc(u.company || 'Momiasi Indonesia')}</td><td>${u.statusKontrak || 'PKWTT'}</td><td class="hide-sm num">${u.join ? fds(u.join) : '–'}</td><td class="num">${e ? fds(e) + ` <span class="s">${daysBetween(TODAY, e)} hari lagi</span>` : '<span class="faint">–</span>'}</td><td class="r"><button class="btn sm" data-act="kontrak-edit" data-id="${u.id}">Ubah</button></td></tr>`; }).join('')}</tbody></table></div></section>`;
  if (tab === 'selesai') { const done = S.reviews.filter(r => r.status === 'selesai'); body = card('Review selesai', done.length ? `<div class="list">${done.map(r => row({ href: `#/pr/${r.id}`, title: `${esc(user(r.userId).nama)} · ${r.jenis === 'probation' ? 'Probation' : 'PKWT'}`, sub: `Berakhir ${fd(r.akhir)} · ${r.keputusan ? esc(r.keputusan.hasil) : ''}`, right: '<span class="btn sm">Performance review</span>' })).join('')}</div>` : empty('Belum ada.')); }
  return `<div class="page-head"><div><div class="eyebrow">Talent Acquisition</div><h1>Probation & kontrak</h1><p class="muted">Pengingat H-30 · form evaluasi · agenda final via Google Calendar · hasil final · keputusan HC · report performance review.</p></div></div>
  <div class="tabs">${[['aksi', `Akan berakhir (${soon.length})`], ['data', 'Data kontrak'], ['selesai', 'Selesai']].map(([k, l]) => `<a href="#/ta-kontrak?tab=${k}" class="${tab === k ? 'on' : ''}">${l}</a>`).join('')}</div>${body}`;
}
function vReview(uidv) {
  const u = user(uidv);
  if (!u.id) return notFound();
  if (!(isHCGA() || u.atasan === me().id)) return noAccess();
  const r = reviewFor(u) || S.reviews.filter(x => x.userId === u.id).slice(-1)[0];
  const e = contractEnd(u), jn = u.statusKontrak === 'Probation' ? 'probation' : 'pkwt';
  const rr = r || { jenis: jn, reminders: [], log: [] };
  const hc = isHCGA();
  const step = (title, done, body, act) => `<div class="rstep ${done ? 'done' : ''}"><div class="rs-h"><span class="rs-dot"></span><b>${title}</b>${act ? `<span class="rs-act">${act}</span>` : ''}</div>${body ? `<div class="rs-b">${body}</div>` : ''}</div>`;
  const formLink = (ok, href, label) => ok ? `<a class="link" href="${href}">${label}</a>` : '';
  return `<a class="back" href="#/ta-kontrak">${ic('left')} Probation & kontrak</a>
  <div class="page-head"><div><div class="eyebrow">${jn === 'probation' ? 'Akhir masa probation' : 'Akhir kontrak PKWT'}</div><h1>${esc(u.nama)}</h1><p class="muted">${esc(u.jabatan)} · ${esc(u.dept)} · atasan ${esc(user(u.atasan).nama)} · berakhir ${e ? fd(e) : '–'}</p></div>${r && r.status === 'selesai' ? `<a class="btn primary" href="#/pr/${r.id}">${ic('file')} Performance review</a>` : ''}</div>
  ${stepLine(rvSteps(rr))}<div style="height:16px"></div>
  <section class="card"><div class="card-b rsteps">
    ${step('1. Kirim pengingat ke atasan & karyawan', rr.reminders.length, rr.reminders.length ? `Terkirim ${rr.reminders.map(x => fdt(x.at)).join(', ')} · WhatsApp & email` : 'Template pengingat dikirim lewat WhatsApp & email.', hc ? `<button class="btn sm ${rr.reminders.length ? '' : 'primary'}" data-act="rv-remind" data-u="${u.id}">${rr.reminders.length ? 'Kirim ulang' : 'Kirim pengingat'}</button>` : '')}
    ${jn === 'probation' ? step('2. Probation feedback (atasan)', r && r.pfb, r && r.pfb ? `Rata-rata <b>${f1(avg(r.pfb.s))}</b> / 10 · rekomendasi ${esc(r.pfb.keputusan)} · ${formLink(true, `#/pfb/${r.id}`, 'lihat')}` : `Tugas otomatis ke ${esc(user(u.atasan).nama)} mulai H-14.`) : step('2. Employment Contract Review (karyawan)', r && r.ecr, r && r.ecr ? `Rencana: <b>${esc(r.ecr.plan)}</b> · kepuasan rata-rata ${f1(avg(r.ecr.s))} / 10 · ${formLink(true, `#/ecr/${r.id}`, 'lihat')}` : 'Terbuka untuk karyawan setelah pengingat dikirim.')}
    ${step('3. Agenda final ' + (jn === 'probation' ? 'probation' : 'PKWT') + ' (presentasi)', r && r.agenda, r && r.agenda ? `${hariTgl(r.agenda.tgl)}, ${jam(r.agenda.jam)} · ${r.agenda.mode === 'Online' ? 'Google Meet' : esc(r.agenda.lokasi)} · Google Calendar: ${esc(u.nama)}, ${esc(user(u.atasan).nama)}${hc ? ' · <a href="' + gcalLink('Final ' + (jn === 'probation' ? 'Probation' : 'PKWT') + ' – ' + u.nama, r.agenda.tgl, r.agenda.jam, 60, r.agenda.mode === 'Online' ? 'Google Meet' : r.agenda.lokasi, [u.email, user(u.atasan).email]) + '" target="_blank" rel="noopener">buka di Google Calendar</a>' : ''}` : 'HC menjadwalkan presentasi & menandai karyawan dan atasan di Google Calendar.', hc ? `<button class="btn sm ${rr.reminders.length && !(r && r.agenda) ? 'primary' : ''}" data-act="rv-agenda" data-u="${u.id}">${r && r.agenda ? 'Ubah jadwal' : 'Jadwalkan'}</button>` : '')}
    ${step('4. Self-reflection (karyawan)', r && r.self, r && r.self ? `Diisi ${fdt(r.self.at)} · ${formLink(true, `#/self/${r.id}`, 'lihat')}` : 'Terbuka untuk karyawan setelah presentasi.')}
    ${step('5. Performance review / hasil final (atasan)', r && r.perf, r && r.perf ? `<b>${esc(r.perf.rek)}</b> · ${esc(r.perf.catatan)} · ${formLink(true, `#/perf/${r.id}`, 'lihat')}` : `Diisi ${esc(user(u.atasan).nama)} setelah presentasi.`, !hc && r && agendaPassed(r) && !r.perf ? `<a class="btn sm primary" href="#/perf/${r.id}">Isi hasil final</a>` : '')}
    ${step('6. Keputusan HC', r && r.keputusan, r && r.keputusan ? `<b>${esc(r.keputusan.hasil)}</b>${r.keputusan.durasi ? ` · ${r.keputusan.durasi} bulan` : ''}${r.keputusan.catatan ? ' · ' + esc(r.keputusan.catatan) : ''}` : 'Mengubah data kontrak karyawan & menutup review.', hc && r && r.perf && !r.keputusan ? `<button class="btn sm primary" data-act="rv-decide" data-u="${u.id}">Tetapkan keputusan</button>` : '')}
    <div class="rstep"><div class="rs-h"><span class="rs-dot"></span><b>Hasil Assessment 360° (HC)</b><span class="pill gray" style="margin-left:8px">Menyusul</span></div><div class="rs-b">Bagian rangkuman 360° (colleagues, superior, lead) akan terisi otomatis setelah modul 360° karyawan dibangun.</div></div>
  </div></section>
  ${r ? card('Riwayat', `<div class="card-b">${timeline(r.log)}</div>`) : ''}`;
}

/* ---------- review forms ---------- */
function reviewHead(r, title, desc) {
  const u = user(r.userId);
  return `<a class="back" href="${isHCGA() || u.atasan === me().id ? '#/review/' + u.id : '#/lnd-tugas'}">${ic('left')} Kembali</a><div class="page-head"><div><div class="eyebrow">${esc(title)}</div><h1>${esc(u.nama)}</h1><p class="muted">${esc(desc)}</p></div></div>`;
}
function canReviewView(r) { const u = user(r.userId); return isHCGA() || u.atasan === me().id || r.userId === me().id; }
function vPfb(id) {
  const r = RV(id); if (!r) return notFound();
  const u = user(r.userId); if (!(isHCGA() || u.atasan === me().id)) return noAccess();
  if (r.pfb) return reviewHead(r, 'Probation Feedback · Momiasi Indonesia', `Dinilai ${user(r.pfb.by).nama} · ${fdt(r.pfb.at)}`) + card('Hasil', scoreTable(F_PROB.map(x => x.t), r.pfb.s, r.pfb.c) + `<div class="card-b">${kv('Rekomendasi', esc(r.pfb.keputusan))}</div>`);
  return reviewHead(r, 'Probation Feedback · Momiasi Indonesia', 'Penilaian kinerja selama masa probation untuk menilai kesiapan melanjutkan status kerja, serta area perbaikan & pengembangan.') + `<form class="card" data-form="pfb" data-id="${r.id}" style="max-width:860px"><div class="card-b form"><dl class="d"><dt>Nama karyawan yang dinilai</dt><dd>${esc(u.nama)}</dd><dt>Nama user yang menilai</dt><dd>${esc(me().nama)}</dd></dl>${SCALE_HINT}${scaleBlock('p', F_PROB, true, 'Nilai 1–7: tulis catatan. Selain itu isi "-"')}
    <div class="f"><span class="lb">Keputusan / rekomendasi atasan</span><div class="seg2">${['Lulus probation', 'Perpanjang probation', 'Tidak lulus'].map((x, k) => `<label><input type="radio" name="kep" value="${x}" ${k ? '' : 'checked'}><span>${x}</span></label>`).join('')}</div></div>
    <div id="formErr"></div><div class="form-foot"><button class="btn primary">Kirim penilaian</button></div></div></form>`;
}
function vEcr(id) {
  const r = RV(id); if (!r) return notFound();
  if (!canReviewView(r)) return noAccess();
  const u = user(r.userId), mine = r.userId === me().id;
  if (r.ecr || !mine) {
    if (!r.ecr) return reviewHead(r, 'Employment Contract Review', 'Belum diisi karyawan.');
    return reviewHead(r, 'Employment Contract Review', `Diisi ${fdt(r.ecr.at)}`) + card('Kepuasan selama kontrak', scoreTable(F_ECR_SCALE, r.ecr.s, r.ecr.c)) + card('Refleksi & rencana', `<div class="card-b"><dl class="d">${F_ECR_OPEN.slice(0, 5).map((q, i) => `<dt>${esc(q)}</dt><dd>${esc(r.ecr.open[i])}</dd>`).join('')}<dt>Rencana setelah kontrak</dt><dd><b>${esc(r.ecr.plan)}</b></dd><dt>Alasan</dt><dd>${esc(r.ecr.alasan)}</dd><dt>Masukan untuk perusahaan</dt><dd>${esc(r.ecr.saran)}</dd></dl></div>`);
  }
  return reviewHead(r, 'Employment Contract Review', F_ECR_DESC) + `<form class="card" data-form="ecr" data-id="${r.id}" style="max-width:860px"><div class="card-b form">
    <dl class="d"><dt>Nama lengkap</dt><dd>${esc(u.nama)}</dd><dt>Divisi</dt><dd>${esc(u.dept)}</dd><dt>Company</dt><dd>${esc(u.company || 'Momiasi Indonesia')}</dd><dt>Posisi</dt><dd>${esc(u.jabatan)}</dd><dt>Tanggal mulai kontrak</dt><dd>${u.kontrakMulai ? fd(u.kontrakMulai) : '–'}</dd><dt>Tanggal berakhir kontrak</dt><dd>${fd(r.akhir)}</dd></dl>
    <div class="scalehint"><span>1 = sangat tidak puas</span><span>10 = sangat puas</span></div>
    ${scaleBlock('e', F_ECR_SCALE, true, 'Komentar atau catatan Anda')}
    ${F_ECR_OPEN.slice(0, 5).map((q, i) => `<div class="f"><label>${i + 6}. ${esc(q)}</label><textarea name="o${i}"></textarea></div>`).join('')}
    <div class="f"><span class="lb">Bagaimana rencana Anda setelah masa kontrak kerja berakhir?</span><div class="choice" style="grid-template-columns:1fr">${F_ECR_PLAN.map((x, k) => `<label><input type="radio" name="plan" value="${esc(x)}" ${k ? '' : 'checked'}><span><b>${esc(x)}</b></span></label>`).join('')}</div></div>
    <div class="f"><label>${esc(F_ECR_OPEN[5])}</label><textarea name="alasan"></textarea></div>
    <div class="f"><label>${esc(F_ECR_OPEN[6])}</label><textarea name="saran"></textarea></div>
    <label class="check" style="align-items:flex-start"><input type="checkbox" name="stmt" style="margin-top:3px"> <span style="font-size:13px">${esc(F_ECR_STMT)}</span></label>
    <div id="formErr"></div><div class="form-foot"><button class="btn primary">Kirim</button></div></div></form>`;
}
function vSelf(id) {
  const r = RV(id); if (!r) return notFound();
  if (!canReviewView(r)) return noAccess();
  const u = user(r.userId), mine = r.userId === me().id;
  if (r.self || !mine) return reviewHead(r, 'Form Feedback Final · Self-reflection', r.self ? `Diisi ${fdt(r.self.at)}` : 'Belum diisi karyawan.') + (r.self ? card('Jawaban', `<div class="card-b"><dl class="d">${F_SELF.map((q, i) => `<dt>${esc(q)}</dt><dd>${esc(r.self.a[i])}</dd>`).join('')}</dl></div>`) : '');
  return reviewHead(r, 'Form Feedback Final Probation/PKWT', 'Diisi oleh karyawan (self-reflection setelah presentasi).') + `<form class="card" data-form="self" data-id="${r.id}" style="max-width:860px"><div class="card-b form">
    <dl class="d"><dt>Nama karyawan</dt><dd>${esc(u.nama)}</dd><dt>Jabatan / posisi</dt><dd>${esc(u.jabatan)}</dd><dt>Departemen</dt><dd>${esc(u.dept)}</dd><dt>Tanggal presentasi</dt><dd>${r.agenda ? fd(r.agenda.tgl) : '–'}</dd><dt>Atasan langsung</dt><dd>${esc(user(u.atasan).nama)}</dd></dl>
    <div class="fs-t">B. Refleksi terhadap masa probation/kontrak</div>${F_SELF.slice(0, 4).map((q, i) => `<div class="f"><label>${i + 1}. ${esc(q)}</label><textarea name="a${i}"></textarea></div>`).join('')}
    <div class="fs-t">C. Rencana pengembangan</div>${F_SELF.slice(4).map((q, i) => `<div class="f"><label>${i + 5}. ${esc(q)}</label><textarea name="a${i + 4}"></textarea></div>`).join('')}
    <div id="formErr"></div><div class="form-foot"><button class="btn primary">Kirim</button></div></div></form>`;
}
function vPerf(id) {
  const r = RV(id); if (!r) return notFound();
  const u = user(r.userId); if (!(isHCGA() || u.atasan === me().id)) return noAccess();
  if (r.perf || isHCGA()) return reviewHead(r, 'Form Performance Review Probation/Kontrak', r.perf ? `Diisi ${user(r.perf.by).nama} · ${fdt(r.perf.at)}` : 'Belum diisi atasan.') + (r.perf ? card('Hasil', `<div class="card-b"><dl class="d"><dt>Hal positif yang menonjol</dt><dd style="white-space:pre-line">${esc(r.perf.positif)}</dd><dt>Hal yang perlu diperbaiki</dt><dd>${esc(r.perf.perbaikan)}</dd><dt>Kesan & rekomendasi</dt><dd><b>${esc(r.perf.rek)}</b></dd><dt>Catatan tambahan</dt><dd>${esc(r.perf.catatan)}</dd></dl></div>`) : '');
  return reviewHead(r, 'Form Performance Review Probation/Kontrak', 'Diisi pendamping / panel penilai segera setelah presentasi berlangsung.') + `<form class="card" data-form="perf" data-id="${r.id}" style="max-width:860px"><div class="card-b form">
    <dl class="d"><dt>Nama karyawan</dt><dd>${esc(u.nama)}</dd><dt>Jabatan / posisi</dt><dd>${esc(u.jabatan)}</dd><dt>Departemen</dt><dd>${esc(u.dept)}</dd><dt>Tanggal & waktu presentasi</dt><dd>${r.agenda ? `${hariTgl(r.agenda.tgl)} (${jam(r.agenda.jam)})` : '–'}</dd><dt>Nama pendamping / penilai</dt><dd>${esc(me().nama)}</dd><dt>Jabatan pendamping</dt><dd>${esc(me().jabatan)}</dd></dl>
    <div class="fs-t">B. Observasi pendamping</div>
    <div class="f"><label>1. Hal-hal positif yang menonjol selama bekerja</label><textarea name="positif" rows="4"></textarea></div>
    <div class="f"><label>2. Hal-hal yang perlu diperbaiki atau menjadi catatan</label><textarea name="perbaikan"></textarea></div>
    <div class="fs-t">D. Kesan & rekomendasi</div>
    <div class="choice" style="grid-template-columns:1fr">${F_PERF_REK.map((x, k) => `<label><input type="radio" name="rek" value="${x}" ${k ? '' : 'checked'}><span><b>${x}</b></span></label>`).join('')}</div>
    <div class="f"><label>Catatan tambahan</label><textarea name="catatan" placeholder="Rekomendasi durasi kontrak dan kompensasi apabila layak melanjutkan kontrak"></textarea></div>
    <div id="formErr"></div><div class="form-foot"><button class="btn primary">Kirim hasil final</button></div></div></form>`;
}

/* ---------- performance review report ---------- */
function vPR(id) {
  const r = RV(id); if (!r) return notFound();
  const u = user(r.userId); if (!(isHCGA() || u.atasan === me().id)) return noAccess();
  const sec = (t, body) => `<h3 class="prh">${t}</h3>${body}`;
  const tbl = (labels, s, c) => `<table class="lt sc"><tr><th>Aspek</th><th>Nilai</th><th>Catatan</th></tr>${labels.map((l, i) => `<tr><td>${esc(l)}</td><td style="text-align:center">${s[i]}</td><td>${c && c[i] && c[i] !== '-' ? esc(c[i]) : ''}</td></tr>`).join('')}<tr><td><b>Rata-rata</b></td><td style="text-align:center"><b>${f1(avg(s))}</b></td><td></td></tr></table>`;
  return `<div class="ptool"><a class="back" style="margin:0" href="#/review/${u.id}">${ic('left')} Kembali</a><button class="btn primary" data-act="print">${ic('dl')} Unduh / cetak PDF</button></div>
  <div class="paper"><div class="ph"><div class="lw">${LOGO()}</div><div class="meta">HCGA Momiasi<br>Dicetak ${fdt(Date.now())}</div></div>
    <h2>PERFORMANCE REVIEW ${r.jenis === 'probation' ? 'PROBATION' : 'KONTRAK (PKWT)'}</h2><div class="nomor">${esc(u.nama)} · ${esc(u.jabatan)} · ${esc(u.dept)}</div>
    <table class="lt"><tr><td>Atasan langsung</td><td>${esc(user(u.atasan).nama)}</td></tr><tr><td>Company</td><td>${esc(u.company || 'Momiasi Indonesia')}</td></tr><tr><td>Status</td><td>${r.jenis === 'probation' ? 'Probation' : 'PKWT'} · berakhir ${fdl(r.akhir)}</td></tr><tr><td>Presentasi final</td><td>${r.agenda ? `${hariTgl(r.agenda.tgl)}, ${jam(r.agenda.jam)}` : '–'}</td></tr></table>
    ${sec('A. Hasil Assessment 360°', '<div class="prbox">Menyusul. Rangkuman penilaian colleagues, superior, dan lead akan terisi otomatis setelah modul 360° karyawan dibangun.</div>')}
    ${r.pfb ? sec('B. Probation Feedback (atasan)', tbl(F_PROB.map(x => x.t), r.pfb.s, r.pfb.c) + `<p>Rekomendasi atasan: <b>${esc(r.pfb.keputusan)}</b></p>`) : ''}
    ${r.ecr ? sec(r.pfb ? 'C. Employment Contract Review' : 'B. Employment Contract Review (karyawan)', tbl(F_ECR_SCALE, r.ecr.s, r.ecr.c) + `<table class="lt">${F_ECR_OPEN.slice(0, 5).map((q, i) => `<tr><td>${esc(q)}</td><td>${esc(r.ecr.open[i])}</td></tr>`).join('')}<tr><td>Rencana setelah kontrak</td><td><b>${esc(r.ecr.plan)}</b> · ${esc(r.ecr.alasan)}</td></tr><tr><td>Masukan untuk perusahaan</td><td>${esc(r.ecr.saran)}</td></tr></table>`) : ''}
    ${sec('Final ' + (r.jenis === 'probation' ? 'Probation' : 'PKWT') + ' · Self-reflection karyawan', r.self ? `<table class="lt">${F_SELF.map((q, i) => `<tr><td>${esc(q)}</td><td>${esc(r.self.a[i])}</td></tr>`).join('')}</table>` : '<div class="prbox">Belum diisi.</div>')}
    ${sec('Final ' + (r.jenis === 'probation' ? 'Probation' : 'PKWT') + ' · Performance review pendamping', r.perf ? `<table class="lt"><tr><td>Pendamping / penilai</td><td>${esc(user(r.perf.by).nama)} · ${esc(user(r.perf.by).jabatan)}</td></tr><tr><td>Hal positif yang menonjol</td><td style="white-space:pre-line">${esc(r.perf.positif)}</td></tr><tr><td>Hal yang perlu diperbaiki</td><td>${esc(r.perf.perbaikan)}</td></tr><tr><td>Kesan & rekomendasi</td><td><b>${esc(r.perf.rek)}</b></td></tr><tr><td>Catatan tambahan</td><td>${esc(r.perf.catatan)}</td></tr></table>` : '<div class="prbox">Belum diisi.</div>')}
    ${sec('Keputusan HC', r.keputusan ? `<p><b>${esc(r.keputusan.hasil)}</b>${r.keputusan.durasi ? ` · ${r.keputusan.durasi} bulan` : ''}${r.keputusan.catatan ? ' · ' + esc(r.keputusan.catatan) : ''} · ${fdt(r.keputusan.at)}</p>` : '<div class="prbox">Belum ditetapkan.</div>')}
    <div class="sig" style="grid-template-columns:repeat(2,1fr)"><div><div>Atasan langsung</div><div class="box"></div><b>${esc(user(u.atasan).nama)}</b></div><div><div>HCGA</div><div class="box"></div><b>${esc(user(HCGA_IDS[0]).nama)}</b></div></div>
  </div>`;
}

/* ======================= PENGATURAN TA ======================= */
function vTaSet() {
  if (!isHCGA()) return noAccess();
  const vars = '{nama} {posisi} {tanggal} {jam} {lokasi} {interviewer} {link} {mulai} {batas} {jenis} {akhir} {atasan}';
  return `<div class="page-head"><div><div class="eyebrow">Talent Acquisition</div><h1>Pengaturan TA</h1><p class="muted">Template pesan WhatsApp & email, aspek penilaian, dan alamat interview. Draf template di bawah masih buatan saya, silakan disesuaikan.</p></div></div>
  <form data-form="tatpl">${Object.entries(S.taTpl).map(([k, t]) => card(esc(t.judul), `<div class="card-b form"><div class="f"><label>Subjek email</label><input type="text" name="${k}_subjek" value="${esc(t.subjek)}"></div><div class="f"><label>Isi pesan (WhatsApp & email)</label><textarea name="${k}_wa" rows="9" style="font-family:inherit">${esc(t.wa)}</textarea></div></div>`)).join('')}
  <p class="muted" style="font-size:12.5px">Variabel yang bisa dipakai: ${vars}</p>
  <div class="form-foot"><button class="btn primary">Simpan template</button></div></form>
  <div class="cols"><div>${card('Aspek penilaian Interview HR', `<div class="card-b"><ol class="olist">${F_HR.map(x => `<li>${esc(x)}</li>`).join('')}</ol><p class="muted" style="font-size:12.5px;margin:8px 0 0">Skala 1–10</p></div>`)}</div><div>${card('Lokasi interview', `<div class="card-b">${kv('Alamat kantor', KANTOR)}<a class="link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(KANTOR)}" target="_blank" rel="noopener">Buka di Google Maps</a></div>`)}</div></div>`;
}

/* ======================= DASHBOARD TA (data asli) ======================= */
function vDashTAReal() {
  const open = S.fpk.filter(f => f.status === 'mencari'), proses = S.cands.filter(c => ['hr', 'tes', 'user', 'offering'].includes(c.stage));
  const offers = S.cands.filter(c => c.offer && c.offer.resp !== 'menunggu'), acc = offers.filter(c => c.offer.resp === 'terima');
  const tth = acc.map(c => { const f = FP(c.fpkId); return f.approvedAt && c.offer.respAt ? (c.offer.respAt - f.approvedAt) / 864e5 : null; }).filter(x => x != null);
  const funnel = STG.map(([k, l], i) => ({ l, n: S.cands.filter(c => { const ci = STG.findIndex(s => s[0] === c.stage); const reached = ci >= 0 ? ci : (c.hr ? (c.uif ? 2 : 0) : 0); return reached >= i; }).length }));
  const top = funnel[0].n || 1;
  const fun = `<div class="funnel">${funnel.map((x, i) => `<div class="fn" data-tip="${x.l}: ${x.n} kandidat" tabindex="0"><span class="fl">${x.l}</span><span class="ft"><span style="width:${Math.max(2, x.n / top * 75)}%;background:${ORD[Math.min(4, Math.floor(i * 5 / funnel.length))]}"></span><b class="num">${x.n}</b>${i ? `<small>${funnel[i - 1].n ? Math.round(x.n / funnel[i - 1].n * 100) : 0}%</small>` : ''}</span></div>`).join('')}</div>`;
  const src = SUMBER.map(s => ({ label: s, value: S.cands.filter(c => c.sumber === s).length, tip: `${s}: ${S.cands.filter(c => c.sumber === s).length} pelamar` })).filter(x => x.value).sort((a, b) => b.value - a.value);
  const m6 = [5, 4, 3, 2, 1, 0].map(monthKey), hires = m6.map(m => S.cands.filter(c => c.stage === 'bergabung' && c.offer && c.offer.mulai.slice(0, 7) === m).length);
  const iv = S.cands.flatMap(c => c.invites.map(i => ({ c, i }))).filter(x => x.i.tgl >= TODAY).sort((a, b) => (a.i.tgl + a.i.jam).localeCompare(b.i.tgl + b.i.jam)).slice(0, 5);
  const ending = S.users.filter(u => { const e = contractEnd(u); return e && daysBetween(TODAY, e) <= 30 && daysBetween(TODAY, e) >= -7; });
  return `<div class="page-head"><div><div class="eyebrow">Talent Acquisition</div><h1>Dashboard TA</h1><p class="muted">Permintaan karyawan, pipeline kandidat, kecepatan rekrutmen, dan kontrak yang akan berakhir.</p></div><a class="btn" href="#/ta-kandidat">Kandidat</a></div>
  <div class="tiles">${tile('Posisi terbuka', open.reduce((a, f) => a + f.jumlah, 0), `${open.length} FPK · ${S.fpk.filter(f => ['menunggu_direktur', 'menunggu_hcm', 'menunggu_ta'].includes(f.status)).length} menunggu approval`)}${tile('Kandidat dalam proses', proses.length, 'Interview HR sampai offering')}${tile('Rata-rata time to hire', tth.length ? Math.round(avg(tth)) + ' hari' : '–', 'FPK disetujui sampai offering diterima')}${tile('Offering diterima', offers.length ? Math.round(acc.length / offers.length * 100) + '%' : '–', `${acc.length} dari ${offers.length} offering`)}</div>
  <div class="cols">
    <div>${card('Pipeline kandidat', `<div class="card-b">${fun}</div>`, '', 'semua lowongan')}${card('Sumber kandidat', `<div class="card-b">${hbar(src, v => v + ' orang')}</div>`)}</div>
    <div>${card('Karyawan baru bergabung', `<div class="card-b">${colChart(m6.map((m, i) => ({ label: BLN[+m.slice(5) - 1], value: hires[i], tip: `${BULAN[+m.slice(5) - 1]}: ${hires[i]} orang` })), v => v + ' org', v => String(v))}</div>`, '', '6 bulan terakhir')}
      ${card('Interview terdekat', iv.length ? `<div class="list">${iv.map(x => row({ href: `#/kandidat/${x.c.id}`, tag: x.i.jenis === 'hr' ? 'HR' : 'User', title: esc(x.c.nama), sub: `${relDay(x.i.tgl)} ${jam(x.i.jam)} · ${esc(FP(x.c.fpkId).jabatan)}`, right: invPill(x.i.status) })).join('')}</div>` : empty('Tidak ada.'), '<a class="link" href="#/ta-jadwal">Jadwal</a>')}
      ${card('Probation & kontrak berakhir ≤ 30 hari', ending.length ? `<div class="list">${ending.map(u => row({ href: `#/review/${u.id}`, title: esc(u.nama), sub: `${u.statusKontrak} · berakhir ${fd(contractEnd(u))}`, right: stepLine(rvSteps(reviewFor(u) || { jenis: u.statusKontrak === 'Probation' ? 'probation' : 'pkwt', reminders: [] })) })).join('')}</div>` : empty('Tidak ada.'), '<a class="link" href="#/ta-kontrak">Kelola</a>')}</div>
  </div>
  ${card('Posisi terbuka', fpkTable(open))}`;
}

/* ======================= ACTIONS & FORMS ======================= */
function ivDefaults(c, j) { const f = FP(c.fpkId); return j === 'hr' ? [isHCGA() ? me().id : 'u15'] : [f.userId]; }
const TA_ACT = {
  'cand-invite': d => { const c = CD(d.id);
    modal(`Undang ${esc(c.nama)}`, `<p style="margin:0">Pilih jenis undangan. Pesan dibuat dari template dan dikirim lewat WhatsApp & email.</p><div class="choice" style="grid-template-columns:1fr">${[['hr', 'Interview HR', 'Jadwal, lokasi & link konfirmasi kehadiran'], ['user', 'Interview user', 'Bersama atasan pengaju FPK'], ...(c.offer ? [['offering', 'Offering letter', 'Kirim ulang penawaran']] : []), ['bebas', 'Pesan lain', 'Tulis pesan sendiri, mis. minta dokumen tambahan']].map(([v, l, h], k) => `<label><input type="radio" name="j" value="${v}" ${k ? '' : 'checked'}><span><b>${l}</b><span>${h}</span></span></label>`).join('')}</div>`, 'Lanjut', fd => {
      const j = fd.get('j');
      setTimeout(() => {
        if (j === 'offering') return TA_ACT['offer-send']({ id: c.id });
        if (j === 'bebas') return modal(`Pesan untuk ${esc(c.nama)}`, `<div class="f"><label>Subjek email</label><input type="text" name="sub" value="Informasi rekrutmen ${esc(FP(c.fpkId).jabatan)} – Momiasi Indonesia"></div><div class="f"><label>Pesan</label><textarea name="msg" rows="7">Halo ${esc(c.nama)},



Terima kasih,
Tim Talent Acquisition Momiasi Indonesia</textarea></div>`, 'Lanjut', f2 => { setTimeout(() => sendModal(`Pesan · ${c.nama}`, [{ ke: c.nama, hp: c.hp, email: c.email, subjek: f2.get('sub'), text: f2.get('msg'), ref: `m:${c.id}:${f2.get('sub')}` }]), 150); });
        if (j === 'user' && ['hr', 'tes'].includes(c.stage)) { c.stage = 'user'; addLog(c, 'Melanjutkan ke Interview user'); }
        TA_ACT['inv-new']({ id: c.id, j });
      }, 150);
    }); },
  'cand-bulk': () => { const ids = [...document.querySelectorAll('.csel:checked')].map(x => x.value); if (!ids.length) return;
    modal(`Undang ${ids.length} kandidat`, `<div class="fgrid"><div class="f"><label>Jenis</label><select name="j">${opts([['hr', 'Interview HR'], ['user', 'Interview user']])}</select></div><div class="f"><label>Tanggal</label><input type="date" name="tgl" value="${nextWorkday(2)}" min="${TODAY}"></div><div class="f"><label>Jam mulai</label><select name="jam">${timeOpts('09:00', 8 * 60, 17 * 60)}</select></div><div class="f"><label>Jarak antar kandidat</label><select name="gap">${opts([['30', '30 menit'], ['45', '45 menit'], ['60', '60 menit']], '45')}</select></div><div class="f"><label>Mode</label><select name="mode">${opts(['Offline', 'Online'])}</select></div><div class="f"><label>Interviewer</label><select name="iv">${opts([['', 'Default (HR / atasan pengaju)'], ...S.users.filter(u => u.posisi !== 'Driver').map(u => [u.id, u.nama])])}</select></div><div class="f full"><label>Lokasi (offline)</label><input type="text" name="lokasi" value="${esc(KANTOR)}"></div></div><p class="muted" style="margin:0;font-size:12.5px">Jadwal tiap kandidat dibuat berurutan, lalu pesan undangan untuk semua kandidat ditampilkan sekaligus.</p>`, 'Buat undangan', fd => {
      const j = fd.get('j'), gap = +fd.get('gap'); let t = toMin(fd.get('jam')); const rows = [];
      ids.forEach(id => { const c = CD(id); if (j === 'user' && ['hr', 'tes'].includes(c.stage)) c.stage = 'user';
        const i = { id: 'i' + uid(), jenis: j, tgl: fd.get('tgl'), jam: fromMin(t), mode: fd.get('mode'), lokasi: fd.get('mode') === 'Online' ? 'Google Meet' : fd.get('lokasi'), iv: [fd.get('iv') || ivDefaults(c, j)[0]], status: 'terkirim', sentAt: Date.now() };
        c.invites.push(i); addLog(c, `Membuat undangan ${JENIS_INV[j]}`, `${hariTgl(i.tgl)} ${jam(i.jam)}`); i.iv.forEach(x => notify(x, `Jadwal ${JENIS_INV[j]}: ${c.nama}, ${relDay(i.tgl).toLowerCase()} ${jam(i.jam)}`, `#/kandidat/${c.id}`));
        const tp = S.taTpl[j], v = invVars(c, i); rows.push({ ke: `${c.nama} · ${jam(i.jam)}`, hp: c.hp, email: c.email, text: fillTpl(tp.wa, v), subjek: fillTpl(tp.subjek, v), ref: `i:${c.id}:${i.id}` }); t += gap; });
      save(); rerender(); setTimeout(() => sendModal(`Undangan ${JENIS_INV[j]} · ${ids.length} kandidat`, rows), 150); }); },
  'mail-send': (d, el) => { markSent(d.ref, 'mail'); el.outerHTML = `<span class="pill teal">${ic('mail')} Email terkirim ke ${esc(d.to)}</span>`; toast('Email terkirim'); },
  'mclose-nav': d => { closeModal(); go(d.href2); },
  'fpk-approve': d => { const f = FP(d.id); modal(f.status === 'menunggu_ta' ? 'Terima FPK & mulai pencarian?' : 'Setujui FPK?', `<p style="margin:0">${esc(f.jabatan)} · ${esc(f.dept)} · ${f.jumlah} orang</p>${noteField('Catatan')}`, 'Setujui', fd => {
    addLog(f, f.status === 'menunggu_ta' ? 'Menerima FPK & memulai pencarian' : 'Menyetujui', fd.get('note'));
    const hcm = S.users.filter(u => u.jabatan === 'HCGA Manager').map(u => u.id), ta = S.users.filter(u => u.role === 'admin').map(u => u.id);
    if (f.status === 'menunggu_direktur') { f.status = 'menunggu_hcm'; hcm.forEach(x => notify(x, `FPK ${f.jabatan} disetujui Direktur, menunggu HC Manager`, `#/fpk/${f.id}`)); notify(f.userId, `FPK ${f.jabatan} disetujui Direktur`, `#/fpk/${f.id}`); }
    else if (f.status === 'menunggu_hcm') { f.status = 'menunggu_ta'; ta.forEach(x => notify(x, `FPK baru untuk TA: ${f.jabatan} (${f.dept})`, `#/fpk/${f.id}`)); notify(f.userId, `FPK ${f.jabatan} disetujui HC Manager, diteruskan ke TA`, `#/fpk/${f.id}`); }
    else { f.status = 'mencari'; f.approvedAt = Date.now(); notify(f.userId, `FPK ${f.jabatan} diterima TA, pencarian kandidat dimulai`, `#/fpk/${f.id}`); }
    rerender(); toast('FPK disetujui'); }); },
  'fpk-reject': d => { const f = FP(d.id); modal('Tolak FPK?', noteField('Alasan', true), 'Tolak', fd => { if (!fd.get('note').trim()) return false; f.status = 'ditolak'; addLog(f, 'Menolak', fd.get('note')); notify(f.userId, `FPK ${f.jabatan} ditolak: ${fd.get('note')}`, `#/fpk/${f.id}`); rerender(); }, true); },
  'fpk-close': d => { const f = FP(d.id); modal('Tutup lowongan?', '<p style="margin:0">FPK ditandai selesai. Kandidat yang masih diproses tetap tersimpan.</p>', 'Tutup', () => { f.status = 'terpenuhi'; addLog(f, 'Menutup lowongan'); rerender(); }); },
  'cand-add': d => modal('Tambah kandidat', `<div class="fgrid"><div class="f full"><label>Lowongan</label><select name="fpk">${opts(S.fpk.filter(f => f.status === 'mencari').map(f => [f.id, `${f.jabatan} · ${f.dept}`]), d.fpk || '')}</select></div><div class="f full"><label>Nama lengkap</label><input type="text" name="nama" autofocus></div><div class="f"><label>Email</label><input type="email" name="email"></div><div class="f"><label>No. WhatsApp</label><input type="text" name="hp" placeholder="08xx"></div><div class="f"><label>Sumber</label><select name="sumber">${opts(SUMBER)}</select></div><div class="f"><label>CV</label><input type="file" name="cv" accept=".pdf,.doc,.docx"></div></div>`, 'Simpan', fd => {
    const nama = fd.get('nama').trim(); if (!nama || !fd.get('fpk')) { toast('Isi nama & pilih lowongan'); return false; }
    const c = { id: 'k' + uid(), fpkId: fd.get('fpk'), nama, email: fd.get('email').trim(), hp: fd.get('hp').trim(), sumber: fd.get('sumber'), stage: 'hr', tglLamar: TODAY, cv: (fd.get('cv') && fd.get('cv').name) || 'CV.pdf', invites: [], log: [] };
    addLog(c, 'Menambahkan kandidat'); S.cands.push(c); save(); go(`#/kandidat/${c.id}`); toast('Kandidat ditambahkan · langsung tahap Interview HR'); setTimeout(() => TA_ACT['inv-new']({ id: c.id, j: 'hr' }), 250); }),
  'cand-import': () => modal('Import kandidat dari Excel', `<p style="margin:0">Unggah file CSV dari job portal dengan kolom <code>nama;email;hp;sumber</code>. Semua kandidat langsung masuk tahap Interview HR.</p><div class="f"><label>Lowongan</label><select name="fpk">${opts(S.fpk.filter(f => f.status === 'mencari').map(f => [f.id, `${f.jabatan} · ${f.dept}`]))}</select></div><div class="f"><label>File CSV</label><input type="file" name="file" accept=".csv"></div>`, 'Import', fd => {
    const file = fd.get('file'); if (!file || !file.size) { toast('Pilih file CSV'); return false; }
    file.text().then(txt => { const rows = txt.replace(/^﻿/, '').split(/\r?\n/).filter(Boolean).map(l => l.split(/[;,]/).map(x => x.replace(/^"|"$/g, '').trim())); const h = rows.shift().map(x => x.toLowerCase()); let n = 0; rows.forEach(r => { const g = k => r[h.indexOf(k)] || ''; if (!g('nama')) return; S.cands.push({ id: 'k' + uid(), fpkId: fd.get('fpk'), nama: g('nama'), email: g('email'), hp: g('hp'), sumber: g('sumber') || 'Jobstreet', stage: 'hr', tglLamar: TODAY, cv: 'CV.pdf', invites: [], log: [] }); n++; }); rerender(); toast(`${n} kandidat diimport`); }); }),
  'cand-next': d => { const c = CD(d.id); c.stage = d.to; addLog(c, `Melanjutkan ke ${STG_L[d.to]}`); rerender(); toast(`${c.nama} · ${STG_L[d.to]}`); if (d.to === 'hr' || d.to === 'user') setTimeout(() => TA_ACT['inv-new']({ id: c.id, j: d.to }), 200); },
  'cand-reject': d => { const c = CD(d.id); modal(`Tolak ${esc(c.nama)}?`, `<div class="f"><label>Status</label><select name="st">${opts([['ditolak', 'Ditolak perusahaan'], ['mundur', 'Kandidat mengundurkan diri']])}</select></div>${noteField('Alasan', true)}`, 'Simpan', fd => { if (!fd.get('note').trim()) return false; c.stage = fd.get('st'); c.alasanTolak = fd.get('note').trim(); addLog(c, c.stage === 'ditolak' ? 'Menolak kandidat' : 'Kandidat mengundurkan diri', c.alasanTolak); rerender(); }, true); },
  'inv-new': d => { const c = CD(d.id), j = d.j, def = ivDefaults(c, j);
    modal(`Undangan ${JENIS_INV[j]} · ${esc(c.nama)}`, `<div class="fgrid"><div class="f"><label>Tanggal</label><input type="date" name="tgl" value="${nextWorkday(2)}" min="${TODAY}"></div><div class="f"><label>Jam</label><select name="jam">${timeOpts('10:00', 8 * 60, 17 * 60)}</select></div><div class="f"><label>Mode</label><select name="mode">${opts(['Offline', 'Online'])}</select></div><div class="f"><label>Interviewer</label><select name="iv">${opts(S.users.filter(u => u.posisi !== 'Driver').map(u => [u.id, u.nama]), def[0])}</select></div><div class="f full"><label>Lokasi (offline)</label><input type="text" name="lokasi" value="${esc(KANTOR)}"></div></div><p class="muted" style="margin:0;font-size:12.5px">Pesan dibuat dari template "${esc(S.taTpl[j].judul)}". Setelah kandidat konfirmasi hadir, event Google Calendar dibuat untuk kandidat & interviewer.</p>`, 'Buat undangan', fd => {
      const i = { id: 'i' + uid(), jenis: j, tgl: fd.get('tgl'), jam: fd.get('jam'), mode: fd.get('mode'), lokasi: fd.get('mode') === 'Online' ? 'Google Meet' : fd.get('lokasi'), iv: [fd.get('iv')], status: 'terkirim', sentAt: Date.now() };
      c.invites.push(i); addLog(c, `Mengirim undangan ${JENIS_INV[j]}`, `${hariTgl(i.tgl)} ${jam(i.jam)}`); i.iv.forEach(x => notify(x, `Jadwal ${JENIS_INV[j]}: ${c.nama}, ${relDay(i.tgl).toLowerCase()} ${jam(i.jam)}`, `#/kandidat/${c.id}`)); save(); rerender();
      setTimeout(() => sendInvite(c, i), 150); }); },
  'inv-send': d => { const c = CD(d.c); sendInvite(c, c.invites.find(i => i.id === d.i)); },
  'tes-input': d => { const c = CD(d.id); modal('Hasil tes skill', `<div class="f"><label>Nilai (0–100)</label><input type="number" name="n" min="0" max="100" autofocus></div><div class="f"><label>Catatan</label><textarea name="c"></textarea></div><div class="f"><label>Lampiran hasil tes</label><input type="file" name="f"></div>`, 'Simpan', fd => { c.tes = { nilai: +fd.get('n') || 0, catatan: fd.get('c').trim(), at: Date.now() }; addLog(c, 'Mencatat hasil tes skill', `Nilai ${c.tes.nilai}`); rerender(); }); },
  'offer-new': d => { const c = CD(d.id), f = FP(c.fpkId), o = c.offer || {};
    modal(`Offering · ${esc(c.nama)}`, `<div class="fgrid"><div class="f"><label>Gaji pokok / bulan</label><input type="number" name="gaji" step="100000" value="${o.gaji || f.gajiMax}"><span class="hint">Kisaran FPK ${rp(f.gajiMin)} – ${rp(f.gajiMax)}</span></div><div class="f"><label>Tanggal mulai</label><input type="date" name="mulai" value="${o.mulai || (f.tglMulai > TODAY ? f.tglMulai : addDays(TODAY, 14))}"></div><div class="f"><label>Status</label><select name="statusPeg">${opts(['PKWT', 'PKWTT', 'Magang'], o.statusPeg || f.statusPeg)}</select></div><div class="f"><label>Durasi kontrak (bulan)</label><input type="number" name="durasi" value="${o.durasi || 12}" min="1"></div><div class="f full"><label>Benefit</label><input type="text" name="benefit" value="${esc(o.benefit || 'BPJS Kesehatan & Ketenagakerjaan')}"></div><div class="f"><label>Batas konfirmasi</label><input type="date" name="batas" value="${addDays(TODAY, 3)}"></div></div>`, 'Buat & kirim', fd => {
      c.offer = { gaji: +fd.get('gaji'), mulai: fd.get('mulai'), statusPeg: fd.get('statusPeg'), durasi: +fd.get('durasi'), benefit: fd.get('benefit').trim(), batas: fd.get('batas'), sentAt: Date.now(), resp: 'menunggu' };
      addLog(c, 'Mengirim offering letter', rp(c.offer.gaji)); save(); rerender(); setTimeout(() => TA_ACT['offer-send']({ id: c.id }), 150); }); },
  'offer-send': d => { const c = CD(d.id), f = FP(c.fpkId); sendModal(`Offering · ${c.nama}`, [{ ke: c.nama, hp: c.hp, email: c.email, ref: `o:${c.id}`, subjek: fillTpl(S.taTpl.offering.subjek, { posisi: f.jabatan }), text: fillTpl(S.taTpl.offering.wa, { nama: c.nama, posisi: f.jabatan, mulai: fdl(c.offer.mulai), batas: fdl(c.offer.batas), link: fakeLink('o/' + c.id) }), extra: `<a class="btn sm" href="#/offer/${c.id}" data-act="mclose-nav" data-href2="#/offer/${c.id}">Lihat halaman kandidat</a>` }]); },
  'offer-tolak': d => { const c = CD(d.id); c.offer.resp = 'tolak'; c.offer.respAt = Date.now(); addLog(c, 'Kandidat menolak offering'); notifyHCGA(`${c.nama} menolak offering ${FP(c.fpkId).jabatan}`, `#/kandidat/${c.id}`); rerender(); },
  'cand-join': d => { const c = CD(d.id), f = FP(c.fpkId);
    modal('Proses bergabung', `<p style="margin:0">Sistem akan:</p><ul class="soon"><li>Membuat akun <b>${esc(c.nama)}</b> (${esc(c.email)}) dan mengirim undangan login</li><li>Mengisi data kontrak: ${c.offer.statusPeg}, mulai ${fd(c.offer.mulai)}, probation 3 bulan</li><li>Memulai onboarding LnD (pretest & daftar tugas) dengan mentor ${esc(user(f.userId).nama)}</li></ul>`, 'Proses', () => {
      const id = 'u' + uid(), mulai = c.offer.mulai;
      S.users.push({ id, nama: c.nama, posisi: 'Staff', level: f.level, jabatan: f.jabatan, dept: f.dept, atasan: f.userId, email: c.email, akun: 'undangan', role: 'karyawan', company: f.company || 'Momiasi Indonesia', statusKontrak: 'Probation', join: mulai, kontrakMulai: mulai, probAkhir: addDays(mulai, 90), kontrakAkhir: c.offer.statusPeg === 'PKWT' ? addDays(mulai, c.offer.durasi * 30) : null });
      c.userId = id; c.stage = 'bergabung'; addLog(c, 'Memproses bergabung');
      S.onb.push({ id: 'o' + uid(), userId: id, join: mulai, status: 'berjalan', pre: null, pemaparanAt: null, post: null, tasks: S.onbTmpl.map(k => ({ ...k, status: 'belum', note: '', file: '' })), log: [] });
      notify(f.userId, `${c.nama} bergabung ${fd(mulai)}, Anda sebagai mentor onboarding`, '#/lnd-tim');
      if (S.cands.filter(x => x.fpkId === f.id && x.stage === 'bergabung').length >= f.jumlah) { f.status = 'terpenuhi'; addLog(f, 'FPK terpenuhi'); }
      rerender(); toast('Akun dibuat & onboarding dimulai'); }); },
  'kontrak-edit': d => { const u = user(d.id); modal(`Data kontrak · ${esc(u.nama)}`, `<div class="fgrid"><div class="f"><label>Company</label><select name="company">${opts(COMPANIES, u.company || COMPANIES[0])}</select></div><div class="f"><label>Status</label><select name="st">${opts(['Probation', 'PKWT', 'PKWTT'], u.statusKontrak || 'PKWTT')}</select></div><div class="f"><label>Tanggal mulai</label><input type="date" name="mulai" value="${u.kontrakMulai || u.join || ''}"></div><div class="f"><label>Akhir probation</label><input type="date" name="prob" value="${u.probAkhir || ''}"></div><div class="f"><label>Akhir kontrak PKWT</label><input type="date" name="akhir" value="${u.kontrakAkhir || ''}"></div></div>`, 'Simpan', fd => { Object.assign(u, { company: fd.get('company'), statusKontrak: fd.get('st'), kontrakMulai: fd.get('mulai'), probAkhir: fd.get('prob') || null, kontrakAkhir: fd.get('akhir') || null }); rerender(); toast('Data kontrak disimpan'); }); },
  'rv-remind': d => { const u = user(d.u), r = ensureReview(u), a = user(u.atasan), jl = jenisL(r);
    const v = { nama: u.nama, posisi: u.jabatan, akhir: fdl(r.akhir), jenis: jl, batas: fdl(addDays(TODAY, 7)), atasan: a.nama };
    sendModal('Pengingat ' + jl + ' · ' + u.nama, [
      { ke: `${u.nama} (karyawan)`, hp: u.hp || '081200000000', email: u.email, text: fillTpl(S.taTpl.kontrak_karyawan.wa, { ...v, link: fakeLink((r.jenis === 'pkwt' ? 'ecr/' : 'tugas/') + r.id) }) },
      { ke: `${a.nama} (atasan)`, hp: a.hp || '081200000001', email: a.email, text: fillTpl(S.taTpl.kontrak_atasan.wa, { ...v, link: fakeLink('review/' + u.id) }) }
    ], () => { r.reminders.push({ at: Date.now(), ke: ['atasan', 'karyawan'] }); addLog(r, 'Mengirim pengingat ' + jl); if (r.jenis === 'pkwt') notify(u.id, `Kontrak Anda berakhir ${fd(r.akhir)}. Isi Employment Contract Review.`, `#/ecr/${r.id}`); else notify(a.id, `Probation ${u.nama} berakhir ${fd(r.akhir)}. Isi probation feedback.`, `#/pfb/${r.id}`); notify(a.id, `Pengingat: ${jl} ${u.nama} berakhir ${fd(r.akhir)}`, `#/review/${u.id}`); rerender(); toast('Pengingat tercatat'); }); },
  'rv-agenda': d => { const u = user(d.u), r = ensureReview(u), a = user(u.atasan);
    modal('Agenda final ' + (r.jenis === 'probation' ? 'probation' : 'PKWT'), `<div class="fgrid"><div class="f"><label>Tanggal</label><input type="date" name="tgl" value="${r.agenda?.tgl || addDays(TODAY, 3)}"></div><div class="f"><label>Jam</label><select name="jam">${timeOpts(r.agenda?.jam || '10:00', 8 * 60, 17 * 60)}</select></div><div class="f"><label>Mode</label><select name="mode">${opts(['Offline', 'Online'], r.agenda?.mode)}</select></div><div class="f"><label>Lokasi</label><input type="text" name="lokasi" value="${esc(r.agenda?.lokasi || 'Ruang Meeting 1, ' + KANTOR)}"></div></div><p class="muted" style="margin:0;font-size:12.5px">Event Google Calendar dibuat dengan peserta ${esc(u.nama)} & ${esc(a.nama)}.</p>`, 'Jadwalkan', fd => {
      r.agenda = { tgl: fd.get('tgl'), jam: fd.get('jam'), mode: fd.get('mode'), lokasi: fd.get('lokasi'), at: Date.now() }; addLog(r, 'Menjadwalkan agenda final', `${hariTgl(r.agenda.tgl)} ${jam(r.agenda.jam)}`);
      [u.id, a.id].forEach(x => notify(x, `Agenda final ${r.jenis === 'probation' ? 'probation' : 'PKWT'} ${u.nama}: ${fds(r.agenda.tgl)} ${jam(r.agenda.jam)} (Google Calendar)`, x === u.id ? '#/lnd-tugas' : `#/review/${u.id}`)); rerender(); toast('Agenda dibuat di Google Calendar'); }); },
  'rv-decide': d => { const u = user(d.u), r = reviewFor(u), prob = r.jenis === 'probation';
    modal('Keputusan HC', `<div class="f"><label>Keputusan</label><select name="h">${opts(prob ? ['Lulus probation', 'Perpanjang probation', 'Tidak lulus'] : ['Perpanjang kontrak', 'Diangkat karyawan tetap (PKWTT)', 'Tidak diperpanjang'])}</select></div><div class="f"><label>Durasi (bulan, bila diperpanjang)</label><input type="number" name="dur" value="12" min="0"></div>${noteField('Catatan')}<p class="muted" style="margin:0;font-size:12.5px">Rekomendasi atasan: ${esc(r.perf.rek)} · ${esc(r.perf.catatan)}</p>`, 'Simpan keputusan', fd => {
      const h = fd.get('h'), dur = +fd.get('dur') || 0;
      r.keputusan = { hasil: h, durasi: /Perpanjang/.test(h) ? dur : 0, catatan: fd.get('note').trim(), at: Date.now() }; r.status = 'selesai'; addLog(r, 'Menetapkan keputusan', h);
      if (h === 'Lulus probation') { u.statusKontrak = u.kontrakAkhir ? 'PKWT' : 'PKWTT'; }
      if (h === 'Perpanjang probation') u.probAkhir = addDays(r.akhir, dur * 30 || 30);
      if (h === 'Perpanjang kontrak') { u.kontrakMulai = addDays(r.akhir, 1); u.kontrakAkhir = addDays(r.akhir, dur * 30); }
      if (/PKWTT/.test(h)) { u.statusKontrak = 'PKWTT'; u.kontrakAkhir = null; }
      if (/Tidak/.test(h)) u.statusKontrak = 'Berakhir';
      notify(u.atasan, `Keputusan ${prob ? 'probation' : 'kontrak'} ${u.nama}: ${h}`, `#/pr/${r.id}`);
      save(); go(`#/pr/${r.id}`); toast('Keputusan disimpan · report siap diunduh'); }); }
};
const scoreFrom = (fd, p, n) => [...Array(n)].map((_, i) => +fd.get(p + i) || null);
function scoreErr(s, c, rule) {
  const miss = s.map((v, i) => v ? null : i + 1).filter(Boolean);
  if (miss.length) return `Belum dinilai: nomor ${miss.join(', ')}.`;
  if (rule) { const need = s.map((v, i) => v <= 7 && (!c[i] || c[i] === '-') ? i + 1 : null).filter(Boolean); if (need.length) return `Nilai 1–7 wajib diberi catatan: nomor ${need.join(', ')}.`; }
  return '';
}
const TA_FORMS = {
  fpk: (fd, f) => {
    const L = n => fd.get(n).split('\n').map(x => x.trim()).filter(Boolean);
    const x = { company: fd.get('company'), dept: fd.get('dept'), jabatan: fd.get('jabatan').trim(), level: fd.get('level'), gajiMin: +fd.get('gajiMin') || 0, gajiMax: +fd.get('gajiMax') || 0, statusPeg: fd.get('statusPeg'), jumlah: +fd.get('jumlah') || 1, tesSkill: fd.get('tesSkill').trim(), deadline: fd.get('deadline'), tglMinta: fd.get('tglMinta') || TODAY, alasan: fd.get('alasan'), alasanKet: fd.get('alasanKet').trim(), jobdesc: L('jobdesc'), kualifikasi: L('kualifikasi'), umurMin: +fd.get('umurMin'), umurMax: +fd.get('umurMax'), pendidikan: fd.get('pendidikan').trim(), pengalaman: fd.get('pengalaman').trim(), tambahan: fd.get('tambahan').trim(), pertanyaan: L('pertanyaan'), tesList: L('tesList'), target: L('target') };
    const err = [];
    if (!x.jabatan) err.push('Jabatan wajib diisi.');
    if (!x.gajiMin || !x.gajiMax || x.gajiMax < x.gajiMin) err.push('Periksa kisaran gaji.');
    if (!x.alasanKet) err.push('Isi keterangan alasan permintaan.');
    if (!x.jobdesc.length) err.push('Isi minimal 1 job description.');
    if (x.pertanyaan.length < 10) err.push(`List pertanyaan interview user minimal 10 (sekarang ${x.pertanyaan.length}).`);
    if (err.length) { $('#formErr').innerHTML = `<div class="alert">${err.join('<br>')}</div>`; return; }
    Object.assign(x, { id: 'f' + uid(), no: nextNo('FPK'), userId: me().id, status: 'menunggu_direktur', log: [] });
    addLog(x, 'Mengajukan'); S.fpk.push(x);
    S.users.filter(u => u.level === 'Direktur').forEach(u => notify(u.id, `${me().nama} mengajukan FPK ${x.jabatan}`, `#/fpk/${x.id}`));
    save(); go(`#/fpk/${x.id}`); toast('FPK terkirim ke Direktur');
  },
  konfirmasi: (fd, f) => { const c = CD(f.dataset.c), i = c.invites.find(x => x.id === f.dataset.i); i.status = fd.get('r'); i.alasan = fd.get('alasan').trim(); i.respAt = Date.now(); if (i.status === 'hadir') i.gcal = true;
    c.log.push({ t: Date.now(), by: null, act: `Kandidat: ${INV_ST[i.status][0].toLowerCase()}${i.status === 'hadir' ? ' · event Google Calendar dibuat' : ''}`, note: i.alasan });
    notifyHCGA(`${c.nama}: ${INV_ST[i.status][0].toLowerCase()} (${JENIS_INV[i.jenis]} ${fds(i.tgl)})`, `#/kandidat/${c.id}`); i.iv.forEach(x => { if (!HCGA_IDS.includes(x)) notify(x, `${c.nama}: ${INV_ST[i.status][0].toLowerCase()} untuk ${JENIS_INV[i.jenis]} ${fds(i.tgl)}`, `#/kandidat/${c.id}`); });
    if (i.status === 'tolak') { c.stage = 'mundur'; c.alasanTolak = i.alasan || 'Tidak bersedia interview'; }
    rerender(); },
  'offer-resp': (fd, f) => { const c = CD(f.dataset.c); c.offer.resp = 'terima'; c.offer.respAt = Date.now(); c.log.push({ t: Date.now(), by: null, act: 'Kandidat menerima offering', note: '' }); notifyHCGA(`${c.nama} menerima offering ${FP(c.fpkId).jabatan}`, `#/kandidat/${c.id}`); notify(FP(c.fpkId).userId, `${c.nama} menerima offering ${FP(c.fpkId).jabatan}`, `#/kandidat/${c.id}`); rerender(); },
  hrscore: (fd, f) => { const c = CD(f.dataset.id), s = scoreFrom(fd, 'h', F_HR.length), cm = F_HR.map((_, i) => (fd.get('hc' + i) || '').trim());
    const e = scoreErr(s, cm, true) || (!fd.get('alasan').trim() ? 'Isi alasan keputusan.' : ''); if (e) { $('#formErr').innerHTML = `<div class="alert">${e}</div>`; return; }
    c.hr = { s, c: cm, rek: fd.get('rek'), alasan: fd.get('alasan').trim(), by: me().id, at: Date.now() }; addLog(c, 'Mengisi penilaian Interview HR', f1(avg(s)) + ' / 10'); save(); go(`#/kandidat/${c.id}`); toast('Penilaian HR tersimpan'); },
  uif: (fd, f) => { const c = CD(f.dataset.id), s = scoreFrom(fd, 'u', F_UIF.length), cm = F_UIF.map((_, i) => (fd.get('uc' + i) || '').trim());
    const e = scoreErr(s, cm, true) || (!fd.get('alasan').trim() ? 'Isi alasan keputusan.' : ''); if (e) { $('#formErr').innerHTML = `<div class="alert">${e}</div>`; return; }
    c.uif = { s, c: cm, lanjut: fd.get('lanjut'), alasan: fd.get('alasan').trim(), by: me().id, at: Date.now(), tgl: lastInv(c, 'user')?.tgl || TODAY }; addLog(c, 'Mengisi User Interview Feedback', `${f1(avg(s))} / 10 · ${c.uif.lanjut}`);
    notifyHCGA(`User Interview Feedback ${c.nama}: ${c.uif.lanjut}`, `#/kandidat/${c.id}`); save(); go('#/lnd-tugas'); toast('Feedback terkirim ke HC'); },
  pfb: (fd, f) => { const r = RV(f.dataset.id), s = scoreFrom(fd, 'p', F_PROB.length), cm = F_PROB.map((_, i) => (fd.get('pc' + i) || '').trim());
    const e = scoreErr(s, cm, true); if (e) { $('#formErr').innerHTML = `<div class="alert">${e}</div>`; return; }
    r.pfb = { s, c: cm, keputusan: fd.get('kep'), by: me().id, at: Date.now() }; addLog(r, 'Mengisi probation feedback', fd.get('kep')); notifyHCGA(`Probation feedback ${user(r.userId).nama}: ${fd.get('kep')}`, `#/review/${r.userId}`); save(); go('#/lnd-tugas'); toast('Probation feedback terkirim'); },
  ecr: (fd, f) => { const r = RV(f.dataset.id), s = scoreFrom(fd, 'e', F_ECR_SCALE.length), cm = F_ECR_SCALE.map((_, i) => (fd.get('ec' + i) || '').trim()), open = [0, 1, 2, 3, 4].map(i => fd.get('o' + i).trim());
    let e = scoreErr(s, cm, false); if (!e && open.some(x => !x)) e = 'Lengkapi pertanyaan 6–10.'; if (!e && (!fd.get('alasan').trim() || !fd.get('saran').trim())) e = 'Isi alasan dan masukan untuk perusahaan.'; if (!e && !fd.get('stmt')) e = 'Centang pernyataan persetujuan.';
    if (e) { $('#formErr').innerHTML = `<div class="alert">${e}</div>`; return; }
    r.ecr = { s, c: cm, open, plan: fd.get('plan'), alasan: fd.get('alasan').trim(), saran: fd.get('saran').trim(), at: Date.now() }; addLog(r, 'Mengisi Employment Contract Review', r.ecr.plan); notifyHCGA(`${me().nama} mengisi contract review: ${r.ecr.plan}`, `#/review/${r.userId}`); save(); go('#/lnd-tugas'); toast('Terima kasih, form terkirim'); },
  self: (fd, f) => { const r = RV(f.dataset.id), a = F_SELF.map((_, i) => fd.get('a' + i).trim()); if (a.some(x => !x)) { $('#formErr').innerHTML = '<div class="alert">Lengkapi semua pertanyaan.</div>'; return; }
    r.self = { a, at: Date.now() }; addLog(r, 'Mengisi self-reflection'); save(); go('#/lnd-tugas'); toast('Self-reflection terkirim'); },
  perf: (fd, f) => { const r = RV(f.dataset.id); if (!fd.get('positif').trim() || !fd.get('catatan').trim()) { $('#formErr').innerHTML = '<div class="alert">Isi hal positif dan catatan tambahan (rekomendasi durasi & kompensasi).</div>'; return; }
    r.perf = { positif: fd.get('positif').trim(), perbaikan: fd.get('perbaikan').trim() || '-', rek: fd.get('rek'), catatan: fd.get('catatan').trim(), by: me().id, at: Date.now() }; addLog(r, 'Mengisi performance review', r.perf.rek); notifyHCGA(`Hasil final ${user(r.userId).nama}: ${r.perf.rek}`, `#/review/${r.userId}`); save(); go('#/lnd-tugas'); toast('Hasil final terkirim ke HC'); },
  tatpl: fd => { Object.keys(S.taTpl).forEach(k => { S.taTpl[k].subjek = fd.get(k + '_subjek'); S.taTpl[k].wa = fd.get(k + '_wa'); }); rerender(); toast('Template disimpan'); }
};

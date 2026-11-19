/* ===== utils ===== */
const IS_ARTIFACT = !!window.__HCS_ARTIFACT__;
let ROUTE = '#/';
const NO_FILE_MSG = 'Di link prototype, unduh & cetak dinonaktifkan. Coba lewat file index.html atau di aplikasi final.';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rp = n => 'Rp ' + Math.round(n || 0).toLocaleString('id-ID');
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const TODAY = iso(new Date());
const addDays = (s, n) => { const d = new Date(s + 'T00:00'); d.setDate(d.getDate() + n); return iso(d); };
const BLN = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const HARI = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
const HARIL = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const dt = s => new Date(s + 'T00:00');
const fd = s => { if (!s) return '–'; const d = dt(s); return `${HARI[d.getDay()]}, ${d.getDate()} ${BLN[d.getMonth()]} ${d.getFullYear()}`; };
const fdl = s => { const d = dt(s); return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`; };
const fds = s => { if (!s) return '–'; const d = dt(s); return `${d.getDate()} ${BLN[d.getMonth()]}`; };
const fdt = ts => { const d = new Date(ts); return `${d.getDate()} ${BLN[d.getMonth()]} · ${pad(d.getHours())}.${pad(d.getMinutes())}`; };
const range = (a, b) => a === b ? fds(a) : (dt(a).getMonth() === dt(b).getMonth() ? `${dt(a).getDate()}–${fds(b)}` : `${fds(a)} – ${fds(b)}`);
const daysBetween = (a, b) => Math.round((dt(b) - dt(a)) / 864e5);
const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const fromMin = m => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
const jam = t => t ? t.replace(':', '.') : '';
const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
const uid = () => Math.random().toString(36).slice(2, 9);
const initials = n => n.split(' ').map(x => x[0]).slice(0, 2).join('').toUpperCase();
const relDay = s => { const n = daysBetween(TODAY, s); return n === 0 ? 'Hari ini' : n === 1 ? 'Besok' : n === -1 ? 'Kemarin' : fd(s); };

/* ===== constants ===== */
const WIL = { jabo: 'Dalam & luar kota Jabodetabek', prov: 'Antar provinsi', pulau: 'Luar pulau', intl: 'Internasional' };
const ZONA = { z1: 'Zona 1 · dekat (<2 jam)', z2: 'Zona 2 · sedang (3–5 jam)', z3: 'Zona 3 · jauh (>6 jam)' };
const KEG = {
  A: ['Shooting di luar kota', 'Event', 'Seminar', 'Awarding', 'Lainnya'],
  B: ['Visit vendor', 'Visit gudang', 'Shooting di Bandung', 'Meeting client', 'Lainnya']
};
const MODA = ['Pesawat', 'Kereta', 'Travel', 'Bus', 'Kapal laut', 'Mobil kantor', 'Lainnya', 'Tidak perlu tiket'];
const CA_JENIS = ['Uang saku (daily allowance)', 'Kekurangan transportasi', 'Transport lokal', 'Konsumsi / entertain klien', 'Lainnya'];
const PERSONA = { karyawan: 'u1', baru: 'u12', atasan: 'u2', direktur: 'u9', admin: 'u15', superadmin: 'u3', driver: 'u4' };
const ROLES = { karyawan: 'Karyawan', atasan: 'Atasan', admin: 'Admin', superadmin: 'Super Admin' };
const PLABEL = { karyawan: 'Karyawan', baru: 'Karyawan baru', atasan: 'Atasan · Manager', direktur: 'Direktur', admin: 'Admin', superadmin: 'Super Admin', driver: 'Driver' };
const KONSUMSI = { none: 'Tidak perlu', snack: 'Snack & minum', makan: 'Makan siang' };

const ST = {
  menunggu_atasan: ['Menunggu atasan', 'amber'], menunggu_hcga: ['Menunggu HCGA', 'amber'],
  pemesanan: ['Pemesanan tiket & CA', 'blue'], siap: ['Siap berangkat', 'teal'], dinas: ['Sedang dinas', 'blue'],
  perlu_settle: ['Perlu settlement', 'amber'], settlement: ['Verifikasi settlement', 'amber'],
  selesai: ['Selesai', 'gray'], ditolak: ['Ditolak', 'red'], dibatalkan: ['Dibatalkan', 'gray'],
  dijadwalkan: ['Dijadwalkan', 'teal'], berjalan: ['Sedang berjalan', 'blue'],
  menunggu_driver: ['Menunggu konfirmasi driver', 'amber'],
  disetujui: ['Disetujui', 'teal'], checkin: ['Silakan check-in', 'blue'], berlangsung: ['Berlangsung', 'blue'],
  hangus: ['Hangus · tidak check-in', 'red'],
  proses_beli: ['Proses pembelian', 'blue'], dipesan: ['Dipesan', 'blue'], diterima: ['Diterima GA', 'blue'], diserahkan: ['Menunggu konfirmasi terima', 'amber']
};

/* ===== seed ===== */
function seed() {
  const d = n => addDays(TODAY, n), now = Date.now(), H = 36e5, D = 864e5;
  const L = (by, act, ago, note) => ({ t: now - ago, by, act, note: note || '' });
  const ceil15 = Math.min(Math.ceil((nowMin() + 1) / 15) * 15, 20 * 60);
  const mo = TODAY.slice(0, 7).replace('-', '/');

  const users = [
    { id: 'u1', nama: 'Rina Pratiwi', posisi: 'Staff', jabatan: 'Content Writer', dept: 'Branding', atasan: 'u2', email: 'rina.pratiwi@momiasi.id', akun: 'aktif' },
    { id: 'u2', nama: 'Dimas Hakim', posisi: 'Head', jabatan: 'Head of Content', dept: 'Branding', atasan: 'u9', email: 'dimas.hakim@momiasi.id', akun: 'aktif' },
    { id: 'u3', nama: 'Sari Wulandari', posisi: 'Head', jabatan: 'HCGA Manager', dept: 'HCGA', atasan: 'u9', email: 'sari.wulandari@momiasi.id', akun: 'aktif' },
    { id: 'u4', nama: 'Agus Santoso', posisi: 'Driver', jabatan: 'Driver', dept: 'HCGA', atasan: 'u3', email: 'agus.santoso@momiasi.id', akun: 'aktif' },
    { id: 'u5', nama: 'Budi Hartono', posisi: 'Driver', jabatan: 'Driver', dept: 'HCGA', atasan: 'u3', email: 'budi.hartono@momiasi.id', akun: 'aktif' },
    { id: 'u6', nama: 'Fajar Nugroho', posisi: 'Lead/Koor', jabatan: 'Video Production Lead', dept: 'Branding', atasan: 'u2', email: 'fajar.nugroho@momiasi.id', akun: 'aktif' },
    { id: 'u7', nama: 'Nadia Putri', posisi: 'Staff', jabatan: 'Social Media Specialist', dept: 'Marketing & Sales', atasan: 'u8', email: 'nadia.putri@momiasi.id', akun: 'aktif' },
    { id: 'u8', nama: 'Maya Lestari', posisi: 'Head', jabatan: 'Head of Marketing', dept: 'Marketing & Sales', atasan: 'u9', email: 'maya.lestari@momiasi.id', akun: 'aktif' },
    { id: 'u9', nama: 'Ratna Kusuma', posisi: 'Head', jabatan: 'General Manager', dept: 'Manajemen', atasan: null, email: 'ratna.kusuma@momiasi.id', akun: 'aktif' },
    { id: 'u10', nama: 'Yoga Pradana', posisi: 'Staff', jabatan: 'Partnership Executive', dept: 'Marketing & Sales', atasan: 'u11', email: 'yoga.pradana@momiasi.id', akun: 'undangan' },
    { id: 'u11', nama: 'Hendra Wijaya', posisi: 'Head', jabatan: 'Head of Sales', dept: 'Marketing & Sales', atasan: 'u9', email: 'hendra.wijaya@momiasi.id', akun: 'aktif' },
    { id: 'u12', nama: 'Putri Anggraini', posisi: 'Staff', jabatan: 'Content Creator', dept: 'Branding', atasan: 'u2', email: 'putri.anggraini@momiasi.id', akun: 'aktif' },
    { id: 'u13', nama: 'Bayu Saputra', posisi: 'Staff', jabatan: 'Admin SCM', dept: 'SCM', atasan: 'u14', email: 'bayu.saputra@momiasi.id', akun: 'aktif' },
    { id: 'u15', nama: 'Lina Marlina', posisi: 'Staff', jabatan: 'HC & GA Officer', dept: 'HCGA', atasan: 'u3', email: 'lina.marlina@momiasi.id', akun: 'aktif' },
    { id: 'u16', nama: 'Rangga Pramudya', posisi: 'Staff', jabatan: 'Graphic Designer', dept: 'Branding', atasan: 'u2', email: 'rangga.pramudya@momiasi.id', akun: 'aktif' },
    { id: 'u14', nama: 'Rudi Hartanto', posisi: 'Head', jabatan: 'Head of SCM', dept: 'SCM', atasan: 'u9', email: 'rudi.hartanto@momiasi.id', akun: 'aktif' }
  ];

  const ROLE_SEED = { u2: 'atasan', u8: 'atasan', u9: 'atasan', u11: 'atasan', u14: 'atasan', u3: 'superadmin', u15: 'admin' };
  users.forEach(u => { u.role = ROLE_SEED[u.id] || 'karyawan'; });
  const LV = { u2: 'Manager', u3: 'Manager', u6: 'Koordinator', u8: 'Manager', u9: 'Direktur', u10: 'Officer', u11: 'Manager', u14: 'Manager', u15: 'Officer' };
  const KT = { u1: ['PKWT', -337, null, 28], u6: ['PKWT', -245, null, 120], u7: ['PKWT', -19, null, 345], u10: ['PKWT', -345, null, 20], u12: ['Probation', -2, 88, 363], u13: ['Probation', -24, 66, 341], u15: ['PKWT', -165, null, 200], u16: ['Probation', -80, 10, 285] };
  users.forEach((u, i) => { u.level = LV[u.id] || 'Staff'; u.company = ['u13', 'u14'].includes(u.id) ? 'Little Mommies' : 'Momiasi Indonesia'; u.hp = '0812' + String(30000000 + i * 1234567).slice(0, 8);
    const k = KT[u.id]; if (k) { u.statusKontrak = k[0]; u.join = d(k[1]); u.kontrakMulai = d(k[1]); u.probAkhir = k[2] != null ? d(k[2]) : null; u.kontrakAkhir = d(k[3]); } else { u.statusKontrak = 'PKWTT'; u.join = d(-700 + i * 20); u.kontrakMulai = u.join; } });
  const trips = [
    { id: 't1', no: `PD/${mo}/021`, userId: 'u1', kategori: 'A', kegiatan: 'Shooting di luar kota', tujuan: 'Bandung', negara: '', wilayah: 'prov', rateB: 'b1', berangkat: d(-2), pulang: d(0), keperluan: 'Shooting konten "Weekend bareng si kecil" di tiga lokasi wisata keluarga.', moda: 'Kereta', zona: 'z1', hotel: true, ca: 600000, status: 'siap', lokasi: { alamat: 'Kawasan wisata Lembang, Bandung Barat', lat: -6.8117, lng: 107.6177 }, hotelInfo: { checkin: d(-2), malam: 2 }, caPic: 'u1', caItems: [{ jenis: 'Uang saku (daily allowance)', ket: '3 hari', nominal: 510000 }, { jenis: 'Transport lokal', ket: 'Taksi stasiun ke 3 lokasi shooting', nominal: 90000 }],
      log: [L('u1', 'Mengajukan', 9 * D), L('u2', 'Menyetujui', 8.8 * D, 'Oke, koordinasi jadwal dengan tim video ya.'), L('u3', 'Menyetujui', 8.5 * D), L('u3', 'Memesan tiket & hotel, mencairkan CA', 7 * D)],
      booking: { transport: 'KA Argo Parahyangan · Ekonomi (pulang-pergi)', kode: 'KAI-7H2K1P', hotel: 'Hotel area Jl. Braga · 2 malam', files: ['e-ticket-kai.pdf', 'voucher-hotel.pdf'] }, caPaidAt: now - 7 * D },
    { id: 't2', no: `PD/${mo}/026`, userId: 'u1', kategori: 'A', kegiatan: 'Event', tujuan: 'Surabaya', negara: '', wilayah: 'prov', rateB: 'b1', berangkat: d(12), pulang: d(14), keperluan: 'Liputan dan booth Momiasi di Mom & Baby Expo Surabaya.', moda: 'Kereta', zona: 'z3', hotel: true, ca: 510000, status: 'menunggu_atasan',
      log: [L('u1', 'Mengajukan', 2 * H)] },
    { id: 't3', no: `PD/${mo}/024`, userId: 'u6', kategori: 'A', kegiatan: 'Shooting di luar kota', tujuan: 'Yogyakarta', negara: '', wilayah: 'prov', rateB: 'b1', berangkat: d(8), pulang: d(11), keperluan: 'Shooting series "Cerita Ibu Bekerja" dengan 3 narasumber.', moda: 'Kereta', zona: 'z3', hotel: true, ca: 800000, status: 'menunggu_atasan',
      log: [L('u6', 'Mengajukan', 26 * H)] },
    { id: 't4', no: `PD/${mo}/022`, userId: 'u7', kategori: 'A', kegiatan: 'Awarding', tujuan: 'Denpasar, Bali', negara: '', wilayah: 'pulau', rateB: 'b1', berangkat: d(20), pulang: d(22), keperluan: 'Menghadiri Indonesia Digital Parenting Award sebagai nominee.', moda: 'Pesawat', zona: 'z1', hotel: true, ca: 600000, status: 'menunggu_hcga', lokasi: { alamat: 'Bali Nusa Dua Convention Center', lat: -8.8008, lng: 115.2317 }, hotelInfo: { checkin: d(20), malam: 2 }, caPic: 'u7', caItems: [{ jenis: 'Uang saku (daily allowance)', ket: '3 hari', nominal: 600000 }],
      log: [L('u7', 'Mengajukan', 3 * D), L('u8', 'Menyetujui', 2 * D)] },
    { id: 't5', no: `PD/${mo}/023`, userId: 'u2', kategori: 'A', kegiatan: 'Seminar', tujuan: 'Singapura', negara: 'Singapura', wilayah: 'intl', rateB: 'b1', berangkat: d(15), pulang: d(17), keperluan: 'Pembicara di Asia Parenting Media Summit.', moda: 'Pesawat', zona: 'z1', hotel: true, ca: 1500000, status: 'pemesanan', lokasi: { alamat: 'Sands Expo & Convention Centre, Marina Bay, Singapura', lat: 1.2834, lng: 103.8607 }, hotelInfo: { checkin: d(15), malam: 2 }, caPic: 'u2', caItems: [{ jenis: 'Uang saku (daily allowance)', ket: '3 hari', nominal: 1500000 }],
      log: [L('u2', 'Mengajukan', 4 * D), L('u9', 'Menyetujui', 3 * D), L('u3', 'Menyetujui', 1 * D)] },
    { id: 't6', no: `PD/${mo}/018`, userId: 'u10', kategori: 'B', kegiatan: 'Visit vendor', tujuan: 'Vendor packaging, Tangerang', negara: '', wilayah: 'jabo', rateB: 'b2', berangkat: d(-6), pulang: d(-5), keperluan: 'Quality check packaging hampers kolaborasi brand.', moda: 'Mobil kantor', zona: '', hotel: false, ca: 60000, status: 'settlement',
      log: [L('u10', 'Mengajukan', 10 * D), L('u11', 'Menyetujui', 9.9 * D), L('u3', 'Menyetujui', 9.5 * D), L('u3', 'Mencairkan CA', 9 * D), L('u10', 'Mengajukan settlement', 20 * H)],
      caPaidAt: now - 9 * D, settlement: { at: now - 20 * H, items: [{ ket: 'Lunch 2 hari', nominal: 60000, bukti: '' }, { ket: 'Parkir vendor', nominal: 15000, bukti: 'parkir-0311.jpg' }] } },
    { id: 't7', no: `PD/${mo}/011`, userId: 'u6', kategori: 'A', kegiatan: 'Shooting di luar kota', tujuan: 'Semarang', negara: '', wilayah: 'prov', rateB: 'b1', berangkat: d(-15), pulang: d(-13), keperluan: 'Shooting kuliner keluarga Semarang.', moda: 'Kereta', zona: 'z2', hotel: true, ca: 600000, status: 'selesai',
      log: [L('u6', 'Mengajukan', 22 * D), L('u2', 'Menyetujui', 21 * D), L('u3', 'Menyetujui', 21 * D), L('u3', 'Memesan tiket & hotel, mencairkan CA', 20 * D), L('u6', 'Mengajukan settlement', 11 * D), L('u3', 'Memverifikasi settlement', 10 * D)],
      booking: { transport: 'KA Argo Muria · Ekonomi', kode: 'KAI-2M9QXA', hotel: 'Hotel Simpang Lima · 2 malam', files: ['e-ticket.pdf'] }, caPaidAt: now - 20 * D,
      settlement: { at: now - 11 * D, verifiedAt: now - 10 * D, items: [{ ket: 'Uang saku 3 hari', nominal: 600000, bukti: '' }, { ket: 'Taksi stasiun–lokasi', nominal: 120000, bukti: 'taksi.jpg' }] } },
    { id: 't8', no: `PD/${mo}/014`, userId: 'u8', kategori: 'A', kegiatan: 'Seminar', tujuan: 'Bekasi', negara: '', wilayah: 'jabo', rateB: 'b1', berangkat: d(-9), pulang: d(-9), keperluan: 'Narasumber seminar parenting komunitas.', moda: 'Mobil kantor', zona: '', hotel: false, ca: 150000, status: 'selesai',
      log: [L('u8', 'Mengajukan', 14 * D), L('u9', 'Menyetujui', 13 * D), L('u3', 'Menyetujui', 13 * D), L('u3', 'Mencairkan CA', 12 * D), L('u8', 'Mengajukan settlement', 8 * D), L('u3', 'Memverifikasi settlement', 7 * D)],
      caPaidAt: now - 12 * D, settlement: { at: now - 8 * D, verifiedAt: now - 7 * D, items: [{ ket: 'Uang saku 1 hari', nominal: 150000, bukti: '' }, { ket: 'Tol', nominal: 42000, bukti: 'etoll.jpg' }] } },
    { id: 't9', no: `PD/${mo}/016`, userId: 'u11', kategori: 'B', kegiatan: 'Meeting client', tujuan: 'Kantor klien, Bogor', negara: '', wilayah: 'jabo', rateB: 'b3', berangkat: d(-4), pulang: d(-4), keperluan: 'Pitching paket sponsorship Q1.', moda: 'Tidak perlu tiket', zona: '', hotel: false, ca: 100000, status: 'selesai',
      log: [L('u11', 'Mengajukan', 6 * D), L('u9', 'Menyetujui', 6 * D), L('u3', 'Menyetujui', 5.8 * D), L('u3', 'Mencairkan CA', 5.5 * D), L('u11', 'Mengajukan settlement', 3 * D), L('u3', 'Memverifikasi settlement', 2 * D)],
      caPaidAt: now - 5.5 * D, settlement: { at: now - 3 * D, verifiedAt: now - 2 * D, items: [{ ket: 'Transport mobil pribadi', nominal: 100000, bukti: '' }] } },
    { id: 't10', no: `PD/${mo}/019`, userId: 'u10', kategori: 'A', kegiatan: 'Event', tujuan: 'Medan', negara: '', wilayah: 'pulau', rateB: 'b1', berangkat: d(25), pulang: d(27), keperluan: 'Aktivasi brand partner di mall Medan.', moda: 'Pesawat', zona: 'z2', hotel: true, ca: 600000, status: 'ditolak', rejectedAt: 'atasan',
      log: [L('u10', 'Mengajukan', 5 * D), L('u11', 'Menolak', 4 * D, 'Cukup diwakilkan tim partner lokal, budget event Q4 sudah habis.')] },
    { id: 't11', no: `PD/${addDays(TODAY, -32).slice(0, 7).replace('-', '/')}/030`, userId: 'u1', kategori: 'A', kegiatan: 'Seminar', tujuan: 'Bogor', negara: '', wilayah: 'jabo', rateB: 'b1', berangkat: d(-34), pulang: d(-33), keperluan: 'Workshop menulis konten kesehatan anak.', moda: 'Mobil kantor', zona: '', hotel: false, ca: 200000, status: 'selesai',
      log: [L('u1', 'Mengajukan', 40 * D), L('u2', 'Menyetujui', 39 * D), L('u3', 'Menyetujui', 39 * D), L('u3', 'Mencairkan CA', 38 * D), L('u1', 'Mengajukan settlement', 32 * D), L('u3', 'Memverifikasi settlement', 31 * D)],
      caPaidAt: now - 38 * D, settlement: { at: now - 32 * D, verifiedAt: now - 31 * D, items: [{ ket: 'Uang saku 2 hari', nominal: 200000, bukti: '' }] } }
  ];

  const vehicles = [
    { id: 'v1', nama: 'Toyota Innova Reborn', plat: 'B 1734 MOA', kursi: 7, odo: 84120, servis: d(12), pajak: d(140), kir: '' },
    { id: 'v2', nama: 'Toyota Avanza', plat: 'B 2241 MSI', kursi: 7, odo: 61350, servis: d(48), pajak: d(19), kir: '' },
    { id: 'v3', nama: 'Daihatsu Gran Max Blind Van', plat: 'B 9087 MOI', kursi: 2, odo: 51200, servis: d(70), pajak: d(200), kir: d(9) }
  ];

  const trip = (km, bbm, tol, parkir, odoEnd) => ({ odoStart: odoEnd - km, odoEnd, bbm, tol, parkir, startAt: now, endAt: now });
  const cars = [
    { id: 'c1', no: `BM/${mo}/041`, userId: 'u1', tanggal: d(0), mulai: '13:00', selesai: '16:00', tujuan: 'Gudang Cikarang', penumpang: 2, keperluan: 'Cek stok merchandise untuk giveaway akhir tahun.', status: 'dijadwalkan', pakaiDriver: true, assign: { type: 'kantor', vehicleId: 'v1', driverId: 'u4' }, log: [L('u1', 'Mengajukan', 1 * D), L('u3', 'Menjadwalkan mobil kantor', 20 * H), L('u4', 'Menerima jadwal', 19 * H)] },
    { id: 'c2', no: `BM/${mo}/042`, userId: 'u6', tanggal: d(1), mulai: '07:00', selesai: '12:00', tujuan: 'Lokasi shooting, Kemang', penumpang: 2, keperluan: 'Bawa alat shooting (lighting & tripod).', status: 'menunggu_driver', pakaiDriver: true, assign: { type: 'kantor', vehicleId: 'v3', driverId: 'u4' }, log: [L('u6', 'Mengajukan', 2 * D), L('u3', 'Menjadwalkan mobil kantor', 1 * H)] },
    { id: 'c3', no: `BM/${mo}/044`, userId: 'u7', tanggal: d(1), mulai: '09:00', selesai: '12:00', tujuan: 'Kantor klien, SCBD', penumpang: 3, keperluan: 'Presentasi proposal campaign Ramadan.', status: 'menunggu_hcga', log: [L('u7', 'Mengajukan', 3 * H)] },
    { id: 'c4', no: `BM/${mo}/045`, userId: 'u10', tanggal: d(2), mulai: '10:00', selesai: '15:00', tujuan: 'Vendor packaging, Tangerang', penumpang: 1, keperluan: 'Ambil sample packaging revisi.', status: 'menunggu_hcga', log: [L('u10', 'Mengajukan', 1 * H)] },
    { id: 'c5', no: `BM/${mo}/039`, userId: 'u8', tanggal: d(-3), mulai: '08:00', selesai: '15:00', tujuan: 'Studio, BSD', penumpang: 4, keperluan: 'Shooting iklan brand partner.', status: 'selesai', assign: { type: 'kantor', vehicleId: 'v1', driverId: 'u4' }, trip: trip(86, 250000, 48000, 20000, 84120), log: [] },
    { id: 'c6', no: `BM/${mo}/036`, userId: 'u10', tanggal: d(-7), mulai: '10:00', selesai: '13:00', tujuan: 'Kantor klien, Kuningan', penumpang: 2, keperluan: 'Meeting sponsorship.', status: 'selesai', assign: { type: 'eksternal', vendor: 'Grab Car', biaya: 185000, note: 'Mobil kantor penuh' }, log: [] },
    { id: 'c7', no: `BM/${mo}/033`, userId: 'u6', tanggal: d(-11), mulai: '07:00', selesai: '17:00', tujuan: 'Lokasi shooting, Depok', penumpang: 2, keperluan: 'Shooting B-roll.', status: 'selesai', assign: { type: 'kantor', vehicleId: 'v3', driverId: 'u5' }, trip: trip(54, 180000, 30000, 10000, 51200), log: [] },
    { id: 'c8', no: `BM/${mo}/031`, userId: 'u1', tanggal: d(-12), mulai: '09:00', selesai: '12:00', tujuan: 'Kantor Kemenkes, Kuningan', penumpang: 1, keperluan: 'Liputan konferensi pers.', status: 'selesai', assign: { type: 'umum', note: 'KRL + ojek online, reimburse', biaya: 26000 }, log: [] },
    { id: 'c9', no: `BM/${mo}/029`, userId: 'u2', tanggal: d(-14), mulai: '13:00', selesai: '17:00', tujuan: 'Kantor partner, Pondok Indah', penumpang: 3, keperluan: 'Meeting kolaborasi konten.', status: 'selesai', assign: { type: 'kantor', vehicleId: 'v2', driverId: 'u5' }, trip: trip(42, 150000, 0, 10000, 61350), log: [] }
  ];

  const b = (id, roomId, userId, tanggal, mulai, selesai, judul, peserta, status, extra) =>
    Object.assign({ id, no: `RM/${mo}/${id.slice(1).padStart(3, '0')}`, roomId, userId, tanggal, mulai, selesai, judul, peserta, status, konsumsi: { jenis: 'none', porsi: 0, catatan: '' }, gcal: true, tamu: '', log: [] }, extra || {});
  const rb = [
    b('b1', 'r1', 'u2', d(0), '09:00', '10:00', 'Weekly sync tim konten', 5, 'disetujui', { checkinAt: now - 2 * H }),
    b('b2', 'r2', 'u8', d(0), '10:30', '12:00', 'Brainstorm campaign Desember', 8, 'disetujui', { checkinAt: now - 1 * H, konsumsi: { jenis: 'snack', porsi: 8, catatan: '' } }),
    b('b3', 'r1', 'u1', d(0), fromMin(ceil15), fromMin(Math.min(ceil15 + 60, 21 * 60)), 'Review naskah artikel bulan Desember', 3, 'disetujui'),
    b('b4', 'r2', 'u11', d(0), '14:00', '15:30', 'Meeting partner brand susu formula', 6, 'disetujui', { konsumsi: { jenis: 'makan', porsi: 6, catatan: '1 vegetarian' } }),
    b('b5', 'r2', 'u7', d(1), '11:00', '13:00', 'Presentasi report Q4 ke manajemen', 8, 'menunggu_hcga', { konsumsi: { jenis: 'makan', porsi: 8, catatan: '' } }),
    b('b6', 'r1', 'u10', d(1), '15:00', '16:00', 'Interview kandidat partnership', 3, 'menunggu_hcga'),
    b('b7', 'r1', 'u6', d(2), '10:00', '11:30', 'Review edit video series', 4, 'disetujui')
  ];
  // history for utilisation report
  // deterministic history: past 35 days, weekdays, busier mornings & early afternoons
  let seedN = 7; const rnd = () => (seedN = (seedN * 9301 + 49297) % 233280) / 233280;
  const judulH = ['Weekly sync', 'Review campaign', 'Meeting vendor', 'Briefing shooting', 'Rapat bulanan', 'Interview kandidat', 'Koordinasi event', 'Review konten', 'Meeting partner'];
  const startsH = [9, 9, 10, 10, 11, 13, 14, 14, 15, 16];
  const uH = ['u1', 'u2', 'u6', 'u7', 'u8', 'u10', 'u11', 'u3'];
  let hi = 0;
  for (let o = -35; o <= -1; o++) {
    const day = dt(d(o)).getDay(); if (day === 0 || day === 6) continue;
    ['r1', 'r2'].forEach(r => {
      const n = 1 + Math.floor(rnd() * 3), used = {};
      for (let k = 0; k < n; k++) {
        const st = startsH[Math.floor(rnd() * startsH.length)]; if (used[st] || used[st - 1]) continue;
        const dur = rnd() < 0.6 ? 1 : 2; used[st] = 1;
        const lost = rnd() < 0.08;
        rb.push(b('h' + (++hi), r, uH[Math.floor(rnd() * uH.length)], d(o), fromMin(st * 60), fromMin((st + dur) * 60), judulH[Math.floor(rnd() * judulH.length)], r === 'r1' ? 4 : 7, 'disetujui', lost ? {} : { checkinAt: now + o * D }));
      }
    });
  }
  // historic trips for 6-month cost trend
  const tujuanH = [['Bandung', 'prov', 'Shooting di luar kota'], ['Surabaya', 'prov', 'Event'], ['Bogor', 'jabo', 'Seminar'], ['Bali', 'pulau', 'Awarding'], ['Yogyakarta', 'prov', 'Shooting di luar kota'], ['Tangerang', 'jabo', 'Event'], ['Makassar', 'pulau', 'Event'], ['Semarang', 'prov', 'Seminar']];
  const uT = ['u1', 'u6', 'u7', 'u10', 'u2', 'u8', 'u11'];
  for (let m = 5; m >= 1; m--) {
    const n = 3 + Math.floor(rnd() * 4);
    for (let k = 0; k < n; k++) {
      const [tj, wil, keg] = tujuanH[Math.floor(rnd() * tujuanH.length)], u = uT[Math.floor(rnd() * uT.length)];
      const start = d(-m * 30 + Math.floor(rnd() * 20) - 5), len = 1 + Math.floor(rnd() * 3), end = addDays(start, len - 1);
      const pos = users.find(x => x.id === u).posisi;
      const rateTbl = { Head: { jabo: 150000, prov: 230000, pulau: 300000 }, 'Lead/Koor': { jabo: 125000, prov: 200000, pulau: 250000 }, Staff: { jabo: 100000, prov: 170000, pulau: 200000 } };
      const al = rateTbl[pos][wil] * len, extra = Math.round(rnd() * 25) * 10000;
      const mo2 = start.slice(0, 7).replace('-', '/');
      trips.push({ id: 'th' + m + k, no: `PD/${mo2}/0${10 + k}`, userId: u, kategori: 'A', kegiatan: keg, tujuan: tj, negara: '', wilayah: wil, rateB: 'b1', berangkat: start, pulang: end, keperluan: 'Perjalanan dinas rutin.', moda: wil === 'pulau' ? 'Pesawat' : wil === 'prov' ? 'Kereta' : 'Mobil kantor', zona: wil === 'jabo' ? '' : 'z2', hotel: len > 1, ca: al, status: 'selesai',
        log: [L(u, 'Mengajukan', (m * 30 + 8) * D)], caPaidAt: now - (m * 30 + 5) * D, settlement: { at: now - (m * 30 - 3) * D, verifiedAt: now - (m * 30 - 4) * D, items: [{ ket: `Uang saku ${len} hari`, nominal: al, bukti: '' }].concat(extra ? [{ ket: 'Transport lokal', nominal: extra, bukti: 'struk.jpg' }] : []) } });
    }
  }
  rb.push(b('h99', 'r2', 'u6', d(-2), '15:00', '16:00', 'Review thumbnail', 3, 'disetujui'));

  const notifs = [
    { id: uid(), userId: 'u9', text: 'Hendra Wijaya mengajukan FPK Host Live', link: '#/fpk/f3', t: now - 20 * H, read: false },
    { id: uid(), userId: 'u2', text: 'Isi User Interview Feedback untuk Bella Kartika', link: '#/uif/k2', t: now - 5 * H, read: false },
    { id: uid(), userId: 'u1', text: 'Kontrak Anda berakhir dalam 28 hari. Isi Employment Contract Review.', link: '#/ecr/rv2', t: now - 1 * D, read: false },
    { id: uid(), userId: 'u12', text: 'Selamat bergabung! Kerjakan pretest onboarding dan cek daftar tugas Anda.', link: '#/lnd-tugas', t: now - 2 * D, read: false },
    { id: uid(), userId: 'u2', text: 'Rina Pratiwi mengajukan training "SEO Copywriting untuk Artikel Parenting"', link: '#/training/tr3', t: now - 3 * H, read: false },
    { id: uid(), userId: 'u1', text: 'Training "Public Speaking untuk Host Konten" selesai. Isi form reaction.', link: '#/lnd-tugas', t: now - 1 * D, read: false },
    { id: uid(), userId: 'u3', text: 'Fajar Nugroho mengajukan pembelian Lighting LED panel 60W', link: '#/aset/a2', t: now - 5 * H, read: false },
    { id: uid(), userId: 'u1', text: 'Monitor 24 inch IPS sudah diserahkan. Mohon konfirmasi penerimaan.', link: '#/aset/a1', t: now - 3 * H, read: false },
    { id: uid(), userId: 'u2', text: 'Rina Pratiwi mengajukan perjalanan dinas ke Surabaya', link: '#/dinas/t2', t: now - 2 * H, read: false },
    { id: uid(), userId: 'u2', text: 'Fajar Nugroho mengajukan perjalanan dinas ke Yogyakarta', link: '#/dinas/t3', t: now - 26 * H, read: false },
    { id: uid(), userId: 'u3', text: 'Nadia Putri mengajukan booking mobil ke SCBD', link: '#/mobil/c3', t: now - 3 * H, read: false },
    { id: uid(), userId: 'u3', text: 'Yoga Pradana mengajukan settlement PD/' + mo + '/018', link: '#/dinas/t6', t: now - 20 * H, read: false },
    { id: uid(), userId: 'u3', text: 'Pajak STNK Toyota Avanza (B 2241 MSI) jatuh tempo dalam 19 hari', link: '#/armada', t: now - 5 * H, read: true },
    { id: uid(), userId: 'u1', text: 'Mobil untuk Gudang Cikarang sudah dijadwalkan: Innova B 1734 MOA, driver Agus', link: '#/mobil/c1', t: now - 20 * H, read: false },
    { id: uid(), userId: 'u4', text: 'Tugas baru: Gudang Cikarang, hari ini 13.00', link: '#/jadwal', t: now - 20 * H, read: false }
  ];

  return {
    v: 10, persona: 'karyawan', loggedIn: true, users, trips, cars, roomb: rb, vehicles, notifs, aset: asetSeed(d, now, L, mo), ...lndSeed(d, now, L), ...taSeed(d, now, L),
    rooms: [
      { id: 'r1', nama: 'Ruang Meeting 1', kap: 5, fas: 'TV 50", whiteboard' },
      { id: 'r2', nama: 'Ruang Meeting 2', kap: 10, fas: 'TV 65", kamera & speaker video conference, whiteboard' }
    ],
    rateA: {
      Head: { jabo: 150000, prov: 230000, pulau: 300000, intl: 500000 },
      'Lead/Koor': { jabo: 125000, prov: 200000, pulau: 250000, intl: 400000 },
      Staff: { jabo: 100000, prov: 170000, pulau: 200000, intl: 300000 }
    },
    rateB: [
      { id: 'b1', kategori: 'Operational visit', kendaraan: 'Motor', transport: 35000, lunch: 30000 },
      { id: 'b2', kategori: 'Operational visit', kendaraan: 'Mobil', transport: 0, lunch: 30000 },
      { id: 'b3', kategori: 'Operational visit', kendaraan: 'Mobil pribadi', transport: 100000, lunch: 0 },
      { id: 'b4', kategori: 'Operational visit di cafe/resto', kendaraan: 'Motor', transport: 0, lunch: 80000 }
    ],
    zona: [
      { moda: 'Kereta', ket: 'Perjalanan antar kota di Pulau Jawa', z1: 'Ekonomi', z2: 'Ekonomi', z3: 'Bisnis' },
      { moda: 'Pesawat', ket: 'Perjalanan di luar pulau', z1: 'Ekonomi', z2: 'Ekonomi', z3: 'Ekonomi' }
    ],
    delegasi: null,
    seq: { PD: 26, BM: 45, RM: 120, PA: 18, AST: 31, TR: 33, PGM: 5, FPK: 11 }
  };
}

const KEY = 'momiasi-ga-proto';
let S;
try { S = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { S = null; }
if (!S || S.v !== 10) S = seed();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

/* ===== domain helpers ===== */
const user = id => S.users.find(u => u.id === id) || { nama: '—', posisi: '', dept: '' };
const room = id => S.rooms.find(r => r.id === id);
const veh = id => S.vehicles.find(v => v.id === id);
const me = () => user(S.meId || PERSONA[S.persona]);
const isHCGA = () => S.persona === 'admin' || S.persona === 'superadmin';
const isSuper = () => S.persona === 'superadmin';
const hcIds = () => S.users.filter(u => (u.role === 'admin' || u.role === 'superadmin') && u.akun !== 'nonaktif').sort((a, b) => (b.role === 'superadmin') - (a.role === 'superadmin')).map(u => u.id);
const HCGA_IDS = { includes: id => hcIds().includes(id), forEach: f => hcIds().forEach(f), get 0() { return hcIds()[0]; } };
const drivers = () => S.users.filter(u => u.posisi === 'Driver');

function nextNo(p) {
  S.seq[p] = (S.seq[p] || 0) + 1;
  return `${p}/${TODAY.slice(0, 4)}/${TODAY.slice(5, 7)}/${String(S.seq[p]).padStart(3, '0')}`;
}
function notify(userId, text, link) { S.notifs.unshift({ id: uid(), userId, text, link, t: Date.now(), read: false }); }
function notifyHCGA(text, link) { HCGA_IDS.forEach(id => notify(id, text, link)); }
function addLog(o, act, note) { (o.log = o.log || []).push({ t: Date.now(), by: me().id, act, note: note || '' }); }

function delegasiAktif(fromId) {
  const g = S.delegasi;
  return g && g.from === fromId && TODAY >= g.mulai && TODAY <= g.sampai ? g.to : null;
}
function canApproveAtasan(t, uidv) {
  const a = user(t.userId).atasan;
  return a === uidv || delegasiAktif(a) === uidv;
}

function allowance(t) {
  const u = user(t.userId);
  const days = Math.max(1, daysBetween(t.berangkat, t.pulang) + 1);
  if (t.kategori === 'A') {
    const r = (S.rateA[u.posisi] || S.rateA.Staff)[t.wilayah] || 0;
    return { days, per: r, total: r * days, label: `Kategori A · ${u.posisi === 'Driver' ? 'Staff' : u.posisi} · ${WIL[t.wilayah] || ''}` };
  }
  const b = S.rateB.find(x => x.id === t.rateB) || S.rateB[0];
  const per = b.transport + b.lunch;
  return { days, per, total: per * days, label: `Kategori B · ${b.kategori} · ${b.kendaraan}`, b };
}
function kelas(t) {
  if (!t.moda || !t.zona) return null;
  const z = S.zona.find(x => x.moda === t.moda);
  return z ? z[t.zona] : null;
}
function tstat(t) {
  if (t.status !== 'siap') return t.status;
  if (TODAY < t.berangkat) return 'siap';
  if (TODAY <= t.pulang) return 'dinas';
  return 'perlu_settle';
}
const nights = t => t.hotelInfo?.malam || Math.max(1, daysBetween(t.berangkat, t.pulang));
const hotelIn = t => t.hotelInfo?.checkin || t.berangkat;
function caItemsOf(t) { return t.caItems && t.caItems.length ? t.caItems : [{ jenis: CA_JENIS[0], ket: '', nominal: t.ca }]; }
function settleTotal(t) { return (t.settlement?.items || []).reduce((a, x) => a + (+x.nominal || 0), 0); }

function roomState(b) {
  if (b.status !== 'disetujui') return b.status;
  const n = nowMin(), st = toMin(b.mulai), en = toMin(b.selesai);
  if (b.tanggal < TODAY) return b.checkinAt ? 'selesai' : 'hangus';
  if (b.tanggal > TODAY) return 'disetujui';
  if (b.checkinAt) return n >= en ? 'selesai' : 'berlangsung';
  if (n > st + 15) return 'hangus';
  if (n >= st - 15) return 'checkin';
  return 'disetujui';
}
function overlap(a1, a2, b1, b2) { return toMin(a1) < toMin(b2) && toMin(b1) < toMin(a2); }
function roomConflicts(roomId, tanggal, mulai, selesai, exceptId) {
  return S.roomb.filter(x => x.id !== exceptId && x.roomId === roomId && x.tanggal === tanggal && ['menunggu_hcga', 'disetujui'].includes(x.status) && !['hangus', 'selesai'].includes(roomState(x)) && overlap(mulai, selesai, x.mulai, x.selesai));
}
function carBusy(field, id, c) {
  return S.cars.filter(x => x.id !== c.id && x.tanggal === c.tanggal && ['dijadwalkan', 'berjalan', 'menunggu_driver'].includes(x.status) && x.assign?.type === 'kantor' && x.assign[field] === id && overlap(c.mulai, c.selesai, x.mulai, x.selesai));
}
function dueState(s) {
  if (!s) return null;
  const n = daysBetween(TODAY, s);
  return n < 0 ? 'red' : n <= 30 ? 'amber' : null;
}

/* ===== Bahasa (ID/EN) & tema (sistem/terang/gelap) ===== */
const pref = (k, d) => { try { return localStorage.getItem(k) || d; } catch (e) { return d; } };
const setPref = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
let LANG = pref('hcs-lang', 'id');
let THEME = pref('hcs-theme', 'system');

const DATE_WORDS = {
  id: { HARI: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'], HARIL: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'], BLN: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'], BULAN: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'] },
  en: { HARI: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], HARIL: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], BLN: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], BULAN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] }
};
function applyDateWords() { const w = DATE_WORDS[LANG]; [[HARI, w.HARI], [HARIL, w.HARIL], [BLN, w.BLN], [BULAN, w.BULAN]].forEach(([a, b]) => b.forEach((v, i) => { a[i] = v; })); }

Object.keys(EN).forEach(k => { if (/^[A-Z][a-z]/.test(k)) { const lk = k[0].toLowerCase() + k.slice(1); if (EN[lk] == null) EN[lk] = EN[k][0].toLowerCase() + EN[k].slice(1); } });
Object.assign(EN, { 'ringkasan seluruh modul HC': 'overview of all HC modules', 'Perlu tindakan': 'Needs action', 'CA dinas': 'Trip CA', 'jam kerja, 4 minggu': 'working hours, 4 weeks', 'kandidat dalam proses': 'candidates in process', 'offering diterima': 'offers accepted', 'Budget training': 'Training budget', 'onboarding berjalan': 'onboarding in progress', 'CA perjalanan dinas': 'Trip CA', 'Status perjalanan dinas': 'Trip status', 'Ruang meeting saat ini': 'Meeting rooms now', 'Status permintaan karyawan (FPK)': 'Hiring request status', 'Probation & kontrak berakhir': 'Probation & contracts ending', 'karyawan baru': 'new employees', 'terpakai dari alokasi': 'used of allocation', 'Penilaian 360°': '360° evaluations', 'Dinas tim': 'Team trips', 'Training tim': 'Team training', 'Kontrak ≤ 30 hari': 'Contracts ≤ 30 days', 'hari lagi': 'days left', '6 bulan': '6 months', '4 minggu': '4 weeks', 'berjalan': 'ongoing', 'Undang via WA & Email': 'Invite via WhatsApp & Email', 'Undang terpilih via WA & Email': 'Invite selected via WhatsApp & Email', 'kandidat dipilih': 'candidates selected', 'Undang': 'Invite', 'Kirim via Email': 'Send via Email', 'Email terkirim ke': 'Email sent to', 'Subjek email': 'Email subject', 'Pesan lain': 'Other message', 'Lanjut': 'Continue', 'Buat undangan': 'Create invitations', 'Jarak antar kandidat': 'Gap between candidates', 'Jam mulai': 'Start time', 'Pilih jenis undangan. Pesan dibuat dari template dan dikirim lewat WhatsApp & email.': 'Choose the invitation type. The message is generated from a template and sent via WhatsApp & email.', 'Jadwal, lokasi & link konfirmasi kehadiran': 'Schedule, location & attendance confirmation link', 'Bersama atasan pengaju FPK': 'With the requesting manager', 'Kirim ulang penawaran': 'Resend the offer', 'Tulis pesan sendiri, mis. minta dokumen tambahan': 'Write your own message, e.g. ask for documents', 'Semua status': 'All statuses', 'Semua divisi': 'All divisions', 'Cari nama, nomor, tujuan…': 'Search name, number, destination…', 'Cari nama atau email…': 'Search name or email…', 'Cari judul training atau peserta…': 'Search training or participant…', 'Cari karyawan atau training…': 'Search employee or training…', 'Cari karyawan…': 'Search employee…', 'Cari tugas…': 'Search tasks…', 'Cari jabatan, nomor FPK, pengaju…': 'Search title, request no., requester…', 'Cari nama kandidat, posisi, sumber…': 'Search candidate, position, source…', 'Cari kandidat, posisi, interviewer…': 'Search candidate, position, interviewer…', 'ditampilkan': 'shown', 'data': 'items', 'Tidak ada data yang cocok.': 'No matching items.', 'Hapus filter': 'Clear filters', 'Tanggal permintaan FPK': 'Request date', 'Tanggal permintaan': 'Request date', 'Menunggu HC Manager': 'Waiting for HC Manager', 'Menunggu TA': 'Waiting for TA', 'Menunggu persetujuan HC Manager': 'Waiting for HC Manager approval', 'FPK masuk ke TA': 'Request received by TA', 'Terima & mulai pencarian': 'Accept & start sourcing', 'Diajukan atasan': 'Submitted by manager', 'HC Manager': 'HC Manager', 'Tampilan layar': 'Room display', '(atasan)': '(manager)', 'Pengingat kontrak (karyawan)': 'Contract reminder (employee)', 'Pengingat kontrak (atasan)': 'Contract reminder (manager)', 'Undangan Interview HR': 'HR interview invitation', 'Undangan Interview User': 'User interview invitation', 'Perjalanan antar kota di Pulau Jawa': 'Intercity travel within Java', 'Perjalanan di luar pulau': 'Travel to other islands', 'Kunci jawaban pretest/posttest onboarding belum diatur, jadi nilai tes baru belum bisa dihitung.': 'The onboarding pretest/posttest answer key is not set yet, so new test scores cannot be calculated.', 'Atur kunci jawaban': 'Set the answer key', 'berangkat di': 'departing in', 'tidak termasuk tiket & hotel': 'excluding tickets & hotel', 'diajukan di': 'requested in', 'Utilisasi = jam terpakai (sudah check-in) ÷': 'Utilization = hours used (checked in) ÷', 'hari kerja × 9 jam': 'working days × 9 hours', 'Berlaku untuk shooting di luar kota, event, seminar, atau awarding. Nominal per hari.': 'Applies to out-of-town shoots, events, seminars, or awards. Amount per day.', 'Berlaku untuk visit vendor, gudang, shooting di Bandung, meeting client. Nominal per hari kunjungan.': 'Applies to vendor & warehouse visits, Bandung shoots, client meetings. Amount per visit day.', 'Jumlah': 'Quantity', 'Buka di Google Maps': 'Open in Google Maps', 'Tampil juga di form User Interview Feedback.': 'Also shown in the User Interview Feedback form.', 'Tugas hari ini': 'Tasks today', 'Trip bulan ini': 'Trips this month', 'Jarak bulan ini': 'Distance this month', 'Cari hotel terdekat': 'Find nearby hotels', 'Titik di peta': 'Map pin', 'Belum ada': 'None yet' });
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const EN_LONG = Object.keys(EN).filter(k => k.length >= 3 && EN[k] !== k && !/^[a-z][a-z-]*$/.test(k) && !['Desember', 'November', 'Oktober', 'September', 'Agustus', 'Juli', 'Juni', 'Mei', 'April', 'Maret', 'Februari', 'Januari', 'Konten', 'Head', 'Staff'].includes(k)).sort((a, b) => b.length - a.length);
const EN_RE = new RegExp('(^|[^A-Za-z0-9À-ÿ])(' + EN_LONG.map(reEsc).join('|') + ')(?=$|[^A-Za-z0-9À-ÿ])', 'g');
const EN_PATTERNS = [
  [/(\d) jt\b/g, '$1M'], [/(\d) rb\b/g, '$1K'], [/\b(\d+) org\b/g, '$1 ppl'], [/\b(\d+) jam\b/g, '$1 hrs'],
  [/\blewat (\d+) hari\b/g, '$1 days overdue'], [/\b(\d+) hari\b/g, '$1 days'], [/\b(\d+) orang\b/g, '$1 people'], [/\b(\d+) dari (\d+)\b/g, '$1 of $2'], [/\bhari ini\b/g, 'today'], [/\bbulan ini\b/g, 'this month'], [/\b(\d+) tugas\b/g, '$1 tasks'], [/\bmenunggu approval\b/g, 'awaiting approval'], [/ · diajukan /g, ' · submitted by '], [/ · atasan /g, ' · manager '], [/ · berakhir /g, ' · ends '], [/\bdari Rp/g, 'of Rp'], [/\b(\d+) malam\b/g, '$1 nights'], [/\b(\d+) bulan\b/g, '$1 months'], [/\b(\d+) menit\b/g, '$1 min'], [/\b(\d+) peserta\b/g, '$1 participants'], [/\b(\d+) penumpang\b/g, '$1 passengers'], [/\b(\d+) kursi\b/g, '$1 seats'], [/\b(\d+) berjalan\b/g, '$1 ongoing'], [/\brata-rata (\d)/g, 'average $1'], [/\b(\d+) porsi\b/g, '$1 portions'], [/\bterlewat (\d+) hari\b/g, '$1 days overdue']
];
function trString(s) {
  if (LANG !== 'en' || !s || !/[A-Za-z]/.test(s)) return s;
  const t = s.trim();
  if (EN[t] != null) return s.replace(t, EN[t]);
  let r = s.replace(EN_RE, (m, p, k) => p + EN[k]);
  EN_PATTERNS.forEach(([a, b]) => { r = r.replace(a, b); });
  return r;
}
const NO_TR = '[data-noi18n],.msg,.sqt,.qq,.qedit,.olist,.ni,.tl q,script,style,textarea';
function translateTree(root) {
  if (LANG !== 'en' || !root) return;
  if (root.nodeType === 3) { if (!(root.parentElement && root.parentElement.closest(NO_TR))) { const v = trString(root.nodeValue); if (v !== root.nodeValue) root.nodeValue = v; } return; }
  if (root.nodeType !== 1 || root.closest(NO_TR)) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest(NO_TR) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n => { const v = trString(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; });
  [root, ...root.querySelectorAll('[placeholder],[title],[aria-label],[data-tip]')].forEach(el => {
    if (!el.getAttribute || el.closest(NO_TR)) return;
    ['placeholder', 'title', 'aria-label', 'data-tip'].forEach(a => { const v = el.getAttribute(a); if (v) { const t = trString(v); if (t !== v) el.setAttribute(a, t); } });
  });
}
new MutationObserver(ms => { if (LANG !== 'en') return; ms.forEach(m => m.addedNodes.forEach(n => translateTree(n))); }).observe(document.documentElement, { childList: true, subtree: true });

function applyTheme() {
  const root = document.documentElement;
  if (THEME === 'system') { if (!IS_ARTIFACT) root.removeAttribute('data-theme'); }
  else root.setAttribute('data-theme', THEME);
}
function applyLang() { document.documentElement.lang = LANG; applyDateWords(); }
const THEME_NEXT = { system: 'light', light: 'dark', dark: 'system' };
const THEME_LABEL = { system: ['Tema: ikuti sistem', 'Theme: system'], light: ['Tema: terang', 'Theme: light'], dark: ['Tema: gelap', 'Theme: dark'] };
function prefControls() {
  return `<button class="ibtn" data-act="theme" title="${THEME_LABEL[THEME][LANG === 'en' ? 1 : 0]}" aria-label="${THEME_LABEL[THEME][LANG === 'en' ? 1 : 0]}">${ic(THEME === 'dark' ? 'moon' : THEME === 'light' ? 'sun' : 'auto')}</button><button class="langbtn" data-act="lang" data-noi18n title="${LANG === 'en' ? 'Bahasa Indonesia' : 'English'}"><span class="${LANG === 'id' ? 'on' : ''}">ID</span><span class="${LANG === 'en' ? 'on' : ''}">EN</span></button>`;
}
applyTheme(); applyLang();

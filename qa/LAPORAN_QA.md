# Laporan QA · Momiasi HCS
Tanggal uji: 19 November 2026 · lingkungan: Supabase `momiasi-hcs` (data contoh) · alat: `qa/qa.js` lewat API publik (hak akses sama seperti pengguna di browser).

## Ringkasan
| Jenis uji | Hasil |
|---|---|
| Positif (alur bisnis berjalan sesuai urutan & peran) | 39 / 39 lulus |
| Negatif (pelanggaran alur, hak akses, manipulasi data) | 54 / 54 ditolak dengan alasan yang benar |
| Smoke UI: 7 peran × semua menu + halaman detail (119 halaman) | 0 halaman error |
| Alur UI ujung-ke-ujung (form → simpan → approval peran lain → notifikasi HCGA) | lulus |
| Stress: 40 orang berebut slot ruang yang sama bersamaan | 1 berhasil, 39 ditolak "bentrok" |
| Stress: 100 pengajuan dinas paralel | 100 tersimpan, 100 nomor dokumen unik, ±0,4 detik |
| Stress: 20 sesi memuat seluruh data bersamaan | 0 gagal, ±2 detik total |

## Temuan & perbaikan selama QA
1. **Bug (kritis), sudah diperbaiki** · trigger aturan bisnis membaca kolom khusus tabel pengaturan untuk semua tabel → HC gagal membuat onboarding, penilaian 360°, review kontrak & mengubah profil. Perbaikan: migrasi `0006_guard_fix`.
2. **Risiko race condition, sudah diperbaiki** · dua booking ruang di detik yang sama bisa sama-sama lolos cek bentrok. Perbaikan: kunci per ruang+tanggal (`0007_room_lock`).
3. **Ketahanan tampilan, sudah diperbaiki** · satu baris data rusak (dibuat lewat API) membuat dashboard macet. Sekarang halaman menampilkan pesan error dan menu lain tetap jalan.
4. **Performa, sudah diperbaiki** · 28 policy RLS mengevaluasi ulang `auth.uid()` per baris (`0008_rls_perf`). Waktu 100 pengajuan paralel turun dari ±0,6 dtk ke ±0,4 dtk.

## Rincian skenario (semua lulus)
**Perjalanan dinas** · karyawan mengajukan → nomor PD dibuat server · tidak bisa melompati atasan · tidak bisa menyetujui sendiri · karyawan lain tidak bisa melihat · atasan divisi lain tidak bisa menyetujui · HCGA tidak bisa memproses sebelum atasan · atasan tidak bisa mengubah nilai CA · atasan langsung menyetujui · isi pengajuan terkunci setelah diajukan · HCGA pemesanan → siap · karyawan tidak bisa menutup sendiri · settlement → verifikasi HCGA → selesai · status selesai tidak bisa dibuka lagi · tidak bisa mengajukan atas nama orang lain.

**Delegasi** · karyawan tidak bisa membuat delegasi atas nama atasan · atasan mendelegasikan · delegasi bisa approve selama periode aktif.

**Ruang meeting** · booking menahan slot · bentrok jam ditolak · jam bersebelahan boleh · melebihi kapasitas ditolak · jam terbalik ditolak · pemesan tidak bisa menyetujui sendiri · HCGA menyetujui · check-in hanya oleh pemesan · pembatalan melepas slot untuk orang lain.

**Booking mobil** · driver tidak bisa ambil tugas sebelum dijadwalkan HCGA · HCGA menugaskan mobil+driver · driver lain tidak bisa menerima · driver menerima, mulai, selesai · driver tidak bisa mengubah tujuan/penumpang.

**Pembelian aset** · pemohon tidak bisa menyetujui / mengubah harga · HCGA proses beli → dipesan → diterima → diserahkan · orang lain tidak bisa konfirmasi atas nama pemohon · pemohon konfirmasi → selesai.

**FPK** · Staff tidak bisa mengajukan · Manager mengajukan · tidak bisa menyetujui sendiri · HC tidak bisa melewati Direktur · Direktur → HC Manager (HC Admin biasa ditolak) → TA mencari · Manager divisi lain tidak bisa melihat.

**Kandidat** · hanya TA menambah kandidat · divisi kandidat otomatis dari FPK · karyawan & manager divisi lain tidak bisa melihat · manager divisi sama hanya boleh mengisi User Interview Feedback, sekali · halaman kandidat via token: token salah tidak membuka apa pun, token benar tidak membocorkan token/data lain, konfirmasi hanya sekali · anonim tidak bisa membaca tabel.

**LnD** · kunci jawaban tes tidak bisa dibaca karyawan, soal tetap tersedia · training: karyawan → atasan → HC · peserta tidak bisa ubah harga / terbitkan piagam / ubah tugas peserta lain · 360°: yang dinilai tidak melihat penilai · penilai hanya mengisi miliknya, sekali.

**Akun & peran** · karyawan tidak bisa menjadi Super Admin / ganti atasan / ubah profil orang lain · Admin HC tidak bisa menaikkan peran atau menonaktifkan akun · notifikasi orang lain tidak terbaca · edge function menolak non-HCGA · pengunjung tanpa login tidak melihat data.

## Belum tercakup / catatan
- Undangan & reset password lewat link (Edge Function) baru bisa diuji penuh setelah Site URL di Supabase diisi URL GitHub Pages.
- Unggah berkas ke Storage diuji lewat aturan akses; uji unggah manual disarankan setelah go-live.
- "Leaked password protection" Supabase Auth belum aktif (pengaturan dashboard).

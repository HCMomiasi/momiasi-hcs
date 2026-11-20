# Momiasi HCS · Human Capital System

Aplikasi internal HCGA Momiasi: General Affairs (perjalanan dinas, booking mobil & ruang meeting, pembelian aset, armada),
Talent Acquisition (FPK, kandidat, interview, offering, probation & kontrak) dan Learning & Development
(onboarding, training, 360°, riwayat).

## Arsitektur
- **Frontend**: satu file statis `docs/index.html` (vanilla JS), di-host GitHub Pages di **https://hcs.littlemommies.id** (CNAME di DNS littlemommies.id → hcmomiasi.github.io).
- **Backend**: Supabase — Postgres + Auth + Storage + 1 Edge Function.
  - Setiap tabel menyimpan objek aplikasi di kolom `data` (jsonb); kolom hak akses (owner, status, divisi…) diturunkan otomatis.
  - **Aturan bisnis ditegakkan di database**: RLS (siapa boleh melihat/mengubah) + trigger `guard` (urutan status & siapa yang
    boleh memindahkan status, kapasitas & bentrok ruang, field yang boleh diubah per peran). Klien tidak bisa melompati alur.
  - Nomor dokumen (PD/BM/RM/PA/TR/FPK) dibuat server: `PREFIX/YYYY/MM/NNN`.
  - Kandidat membuka halaman konfirmasi/offering lewat token acak (RPC `cand_public` / `cand_respond`), tanpa login.
  - Edge Function `admin-user`: buat akun karyawan, link aktivasi/reset (dibagikan via WhatsApp/email), nonaktifkan akun.

## Struktur
```
docs/index.html                    aplikasi (hasil build)
supabase/migrations/*.sql          skema, RLS, aturan alur bisnis
supabase/functions/admin-user      edge function kelola akun
supabase/cleanup_before_golive.sql hapus data contoh & akun uji sebelum dipakai resmi
```

## Sebelum go-live
1. Supabase > Authentication > URL Configuration: isi **Site URL** dengan `https://hcs.littlemommies.id/` dan tambahkan `https://hcs.littlemommies.id/**` di Redirect URLs.
2. Jalankan `supabase/cleanup_before_golive.sql`, lalu buat Super Admin asli (petunjuk di file tersebut).
3. Super Admin menambah karyawan (satu per satu / import CSV) lalu mengirim link aktivasi lewat tombol **Undangan**, atau karyawan **mendaftar sendiri** di halaman login (email kantor maupun Gmail) lalu HC menyetujui di Persetujuan → Pendaftar akun. Bila suatu saat ingin membatasi domain email, isi settings `daftarDomain`, mis. `["momiasi.id"]`.

## Mengubah aplikasi
Sumber ada di `app/src/*.js|css`. Setelah mengubah, jalankan `cd app && python3 build.py` → menghasilkan `docs/index.html`, lalu commit & push.

## QA
`qa/qa.js` berisi skenario uji alur bisnis (positif & negatif per peran) dan stress test. Jalankan di konsol halaman aplikasi:
`await import('./qa.js')` tidak diperlukan — tempel isi file lalu `await QA.run('<password akun uji>')` dan `await QA.stress('<password>')`.
Hasil terakhir: lihat `qa/LAPORAN_QA.md`.

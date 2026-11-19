-- Jalankan SEKALI sebelum go-live (SQL Editor Supabase) untuk menghapus seluruh data contoh & akun uji.
-- Pengaturan (tarif, ruangan, bank soal, template) DIPERTAHANKAN. Super Admin asli dibuat dulu lewat
-- Authentication > Add user, lalu jalankan blok paling bawah dengan email-nya.
begin;
truncate public.trips, public.cars, public.roomb, public.aset, public.trainings, public.onb, public.evals,
         public.fpk, public.cands, public.reviews, public.notifs, public.uploads, public.counters;
delete from public.vehicles;
delete from public.settings where key = 'delegasi';
delete from storage.objects where bucket_id = 'files';
delete from auth.users where email like '%@example.com';   -- profil ikut terhapus (cascade)
commit;

-- Super Admin pertama (ganti nama & email):
-- insert into public.profiles(id, data)
-- select id, jsonb_build_object('id', id, 'nama', 'Nama Anda', 'email', email, 'role', 'superadmin', 'akun', 'aktif',
--        'jabatan', 'HCGA Manager', 'posisi', 'Head', 'level', 'Manager', 'dept', 'HCGA', 'company', 'Momiasi Indonesia')
-- from auth.users where email = 'email.anda@momiasi.id';

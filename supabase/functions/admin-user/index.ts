// Momiasi HCS · kelola akun karyawan (butuh service role, jadi di server).
// Aksi: create (buat akun + profil, kembalikan link aktivasi), link (link aktivasi / reset password baru),
//       approve / reject (pendaftaran mandiri berstatus 'menunggu'),
//       ban / unban (nonaktifkan login). Pemanggil wajib HCGA aktif; ubah peran & ban hanya Super Admin.
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';

const H = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Content-Type': 'application/json' };
const out = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: H });
const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: H });
  try {
    const jwt = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
    const { data: { user } } = await admin.auth.getUser(jwt);
    if (!user) return out({ error: 'Sesi berakhir, silakan login ulang' }, 401);
    const { data: me } = await admin.from('profiles').select('role, akun').eq('id', user.id).single();
    if (!me || me.akun !== 'aktif' || !['admin', 'superadmin'].includes(me.role)) return out({ error: 'Hanya HCGA yang boleh mengelola akun' }, 403);
    const sup = me.role === 'superadmin';
    const { action, profile, id, redirectTo } = await req.json();
    const link = async (email: string) => {
      const { data, error } = await admin.auth.admin.generateLink({ type: 'recovery', email, options: { redirectTo } });
      if (error) throw error;
      return data.properties.action_link;
    };

    if (action === 'create') {
      const p = { ...profile, email: String(profile?.email || '').trim().toLowerCase(), akun: 'undangan' };
      if (!p.nama || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) return out({ error: 'Nama dan email wajib valid' }, 400);
      if (!sup) p.role = 'karyawan';
      const { data, error } = await admin.auth.admin.createUser({ id: p.id, email: p.email, email_confirm: true });
      if (error) return out({ error: /already/i.test(error.message) ? `Email ${p.email} sudah terdaftar` : error.message }, 400);
      p.id = data.user.id;
      const ins = await admin.from('profiles').insert({ id: p.id, data: p });
      if (ins.error) { await admin.auth.admin.deleteUser(p.id); return out({ error: ins.error.message }, 400); }
      return out({ profile: p, link: await link(p.email) });
    }
    if (action === 'link') {
      const { data: u } = await admin.from('profiles').select('data').eq('id', id).single();
      if (!u) return out({ error: 'Karyawan tidak ditemukan' }, 404);
      return out({ link: await link(u.data.email) });
    }
    if (action === 'approve' || action === 'reject') {
      const { data: row } = await admin.from('profiles').select('data').eq('id', id).single();
      if (!row || row.data.akun !== 'menunggu') return out({ error: 'Pendaftaran tidak ditemukan atau sudah diproses' }, 404);
      if (action === 'reject') { await admin.auth.admin.deleteUser(id); return out({ ok: true }); }
      const f = profile || {}, pick = (k: string) => (f[k] ?? row.data[k]);
      if (f.atasan) {
        const { data: at } = await admin.from('profiles').select('data').eq('id', f.atasan).maybeSingle();
        if (!at || at.data.akun !== 'aktif') return out({ error: 'Atasan tidak valid' }, 400);
        // sama seperti pengaturan karyawan: yang ditunjuk sebagai atasan otomatis berperan Atasan
        if (at.data.role === 'karyawan') await admin.from('profiles').update({ data: { ...at.data, role: 'atasan' } }).eq('id', f.atasan);
      }
      const p = { ...row.data, dept: pick('dept'), jabatan: pick('jabatan'), level: pick('level'), posisi: pick('posisi'), company: pick('company'),
        atasan: f.atasan || null, role: sup && ['karyawan', 'atasan', 'admin', 'superadmin'].includes(f.role) ? f.role : 'karyawan', akun: 'aktif', disetujuiAt: Date.now(), disetujuiOleh: user.id };
      const up = await admin.from('profiles').update({ data: p }).eq('id', id);
      if (up.error) return out({ error: up.error.message }, 400);
      const { error } = await admin.auth.admin.updateUserById(id, { ban_duration: 'none' });
      if (error) return out({ error: error.message }, 400);
      return out({ profile: p });
    }
    if (action === 'ban' || action === 'unban') {
      if (!sup) return out({ error: 'Hanya Super Admin' }, 403);
      if (id === user.id) return out({ error: 'Tidak bisa menonaktifkan akun sendiri' }, 400);
      const { error } = await admin.auth.admin.updateUserById(id, { ban_duration: action === 'ban' ? '876000h' : 'none' });
      return error ? out({ error: error.message }, 400) : out({ ok: true });
    }
    return out({ error: 'Aksi tidak dikenal' }, 400);
  } catch (e) {
    return out({ error: String((e as Error).message || e) }, 500);
  }
});

// Momiasi HCS · pendaftaran mandiri karyawan (tanpa login).
// Akun dibuat dalam keadaan terkunci (akun = 'menunggu', login diblokir) sampai HC menyetujui.
// Email bebas (banyak karyawan memakai Gmail); verifikasi identitas dilakukan HC saat menyetujui.
// Opsional: settings 'daftarDomain' = ["momiasi.id", ...] untuk membatasi domain.
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';

const H = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Content-Type': 'application/json' };
const out = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: H });
const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
const s = (v: unknown, n = 120) => String(v ?? '').trim().slice(0, n);

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: H });
  if (req.method !== 'POST') return out({ error: 'Metode tidak didukung' }, 405);
  try {
    const b = await req.json();
    const email = s(b.email).toLowerCase(), nama = s(b.nama), password = String(b.password || '');
    const { data: set } = await admin.from('settings').select('data').eq('key', 'daftarDomain').maybeSingle();
    const domains: string[] = Array.isArray(set?.data) ? set.data : [];
    if (nama.length < 3) return out({ error: 'Isi nama lengkap' }, 400);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return out({ error: 'Email tidak valid' }, 400);
    if (domains.length && !domains.includes(email.split('@')[1])) return out({ error: `Gunakan email kantor (${domains.map(d => '@' + d).join(' / ')})` }, 400);
    if (password.length < 8) return out({ error: 'Password minimal 8 karakter' }, 400);
    const { data: exist } = await admin.from('profiles').select('id').eq('data->>email', email).maybeSingle();
    if (exist) return out({ error: 'Email ini sudah terdaftar. Silakan masuk, atau hubungi HCGA bila lupa password.' }, 409);

    const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, ban_duration: '876000h' });
    if (error) return out({ error: /already/i.test(error.message) ? 'Email ini sudah terdaftar.' : error.message }, 400);
    const id = data.user.id;
    const p = { id, nama, email, hp: s(b.hp, 20), company: s(b.company, 60) || 'Momiasi Indonesia', dept: s(b.dept, 60), jabatan: s(b.jabatan, 80),
      role: 'karyawan', level: 'Staff', posisi: 'Staff', atasan: null, akun: 'menunggu', daftarAt: Date.now() };
    const ins = await admin.from('profiles').insert({ id, data: p });
    if (ins.error) { await admin.auth.admin.deleteUser(id); return out({ error: ins.error.message }, 400); }
    const { data: hc } = await admin.from('profiles').select('id').in('role', ['admin', 'superadmin']).eq('akun', 'aktif');
    if (hc?.length) await admin.from('notifs').insert(hc.map(h => { const nid = crypto.randomUUID().slice(0, 10);
      return { id: nid, data: { id: nid, userId: h.id, text: `${nama} (${p.dept || '-'}) mendaftar akun, menunggu persetujuan`, link: '#/persetujuan?tab=akun', t: Date.now(), read: false } }; }));
    return out({ ok: true });
  } catch (e) {
    return out({ error: String((e as Error).message || e) }, 500);
  }
});

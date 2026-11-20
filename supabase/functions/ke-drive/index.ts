// Momiasi HCS · pindahkan berkas onboarding/training dari Storage HCS ke Google Drive HC (folder DATA KARYAWAN).
// Alur: browser unggah ke Storage (folder milik user) → fungsi ini mengirim ke Google Apps Script milik
// humancapital@momiasi.id → berkas di Storage dihapus, yang tersisa hanya tautan Drive (hanya HC yang bisa membuka).
import { createClient } from 'npm:@supabase/supabase-js@2.45.4';
import { encodeBase64 } from 'jsr:@std/encoding@1/base64';

const H = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Content-Type': 'application/json' };
const out = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: H });
const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
const bersih = (s: string) => s.replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: H });
  try {
    const jwt = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
    const { data: { user } } = await admin.auth.getUser(jwt);
    if (!user) return out({ error: 'Sesi berakhir, silakan login ulang' }, 401);
    const { path, doc, konteks } = await req.json();
    if (typeof path !== 'string' || !path.startsWith(user.id + '/')) return out({ error: 'Berkas tidak valid' }, 400);

    const [{ data: cfg }, { data: prof }, { data: up }] = await Promise.all([
      admin.from('private_config').select('value').eq('key', 'drive').single(),
      admin.from('profiles').select('data').eq('id', user.id).single(),
      admin.from('uploads').select('id, name').eq('path', path).eq('owner', user.id).single()]);
    const c = cfg?.value;
    if (!c?.url) return out({ error: 'Koneksi Google Drive belum diatur HC' }, 503);
    if (!up) return out({ error: 'Berkas tidak ditemukan' }, 404);
    const jenis = c.folders?.[doc] ? doc : 'Dokumen Lainnya', tujuan = c.folders[jenis] || { name: 'Dokumen Lainnya' };

    const { data: blob, error: e1 } = await admin.storage.from('files').download(path);
    if (e1 || !blob) return out({ error: 'Gagal membaca berkas' }, 500);
    const nama = prof?.data?.nama || user.email || 'Karyawan';
    const ext = (up.name.match(/\.[A-Za-z0-9]{1,6}$/) || [''])[0];
    const namaFile = bersih(`${nama} - ${jenis}${konteks ? ' - ' + konteks : ''}`) + ext;

    const r = await fetch(c.url, { method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ kunci: c.kunci, folderId: tujuan.id, folderName: tujuan.name, name: namaFile, mime: blob.type || 'application/octet-stream',
        data: encodeBase64(new Uint8Array(await blob.arrayBuffer())), oleh: `${nama} <${user.email}>`, konteks: konteks || '' }) });
    const g = await r.json().catch(() => ({ error: 'Respon Google Drive tidak valid (' + r.status + ')' }));
    if (!g.ok) return out({ error: 'Google Drive: ' + (g.error || 'gagal') }, 502);

    await admin.from('uploads').update({ doc: jenis, drive_id: g.id, drive_url: g.url, name: namaFile }).eq('id', up.id);
    await admin.storage.from('files').remove([path]);
    return out({ ok: true, name: namaFile, url: g.url, folder: g.folder, doc: jenis });
  } catch (e) {
    return out({ error: String((e as Error).message || e) }, 500);
  }
});

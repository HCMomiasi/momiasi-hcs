/**
 * Momiasi HCS → Google Drive
 * Menerima berkas dari server HCS (Supabase Edge Function "ke-drive") lalu menyimpannya
 * ke folder DATA KARYAWAN sesuai jenis dokumen. Dipasang dari akun humancapital@momiasi.id.
 *
 * Cara pasang: script.google.com → New project → tempel kode ini → Deploy → New deployment
 * → Type: Web app → Execute as: Me → Who has access: Anyone → Deploy → salin Web app URL.
 */
const KUNCI = '__KUNCI__';                                   // harus sama dengan yang tersimpan di HCS
const ROOT = '1Ce1RFzyBVFjIicxg9VeJHKBmAGVNIGca';            // folder DATA KARYAWAN

function doPost(e) {
  try {
    const b = JSON.parse(e.postData.contents);
    if (b.kunci !== KUNCI) return kirim({ error: 'Akses ditolak' });
    if (b.cek) return kirim({ ok: true, root: DriveApp.getFolderById(ROOT).getName() });
    const folder = b.folderId ? DriveApp.getFolderById(b.folderId) : folderAnak(DriveApp.getFolderById(ROOT), b.folderName || 'Dokumen Lainnya');
    const file = folder.createFile(Utilities.newBlob(Utilities.base64Decode(b.data), b.mime || 'application/octet-stream', b.name));
    file.setDescription('Diunggah lewat Momiasi HCS oleh ' + (b.oleh || '-') + (b.konteks ? ' · ' + b.konteks : ''));
    return kirim({ ok: true, id: file.getId(), url: file.getUrl(), folder: folder.getName() });
  } catch (err) {
    return kirim({ error: String(err) });
  }
}
function folderAnak(induk, nama) {
  const it = induk.getFoldersByName(nama);
  return it.hasNext() ? it.next() : induk.createFolder(nama);
}
function kirim(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

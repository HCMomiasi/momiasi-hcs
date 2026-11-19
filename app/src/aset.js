/* ===== PEMBELIAN ASET ===== */
const ASET_KAT = ['Elektronik & IT', 'Peralatan shooting', 'Furnitur', 'Perlengkapan kantor', 'Lainnya'];
const ASET_STEPS = ['Diajukan', 'Persetujuan HCGA', 'Proses beli', 'Dipesan', 'Diterima GA', 'Diserahkan', 'Selesai'];
const ASET_IDX = { menunggu_hcga: 1, proses_beli: 2, dipesan: 3, diterima: 4, diserahkan: 5, selesai: 7 };

function asetSeed(d, now, L, mo) {
  const H = 36e5, D = 864e5;
  const a = (id, no, userId, nama, kategori, tanggal, qty, harga, link, keperluan, status, extra) => Object.assign({ id, no: `PA/${mo}/${no}`, userId, nama, kategori, tanggal, qty, harga, link, keperluan, status, log: [] }, extra || {});
  return [
    a('a1', '014', 'u1', 'Monitor 24 inch IPS', 'Elektronik & IT', d(-3), 1, 2100000, 'https://www.tokopedia.com/', 'Monitor kedua untuk editing artikel & layout infografis.', 'diserahkan',
      { log: [L('u1', 'Mengajukan', 12 * D), L('u3', 'Menyetujui', 11 * D), L('u3', 'Memesan barang', 10 * D, 'Toko resmi · Rp 2.049.000'), L('u3', 'Menerima barang di GA', 4 * D, 'Kode aset AST-2611-031'), L('u3', 'Menyerahkan ke karyawan', 3 * H)],
        beli: { vendor: 'Toko resmi brand (Tokopedia)', total: 2049000, order: 'INV/20261107/889213', eta: d(-5), files: ['invoice-monitor.pdf'] }, terima: { kode: 'AST-2611-031', kondisi: 'Baik', at: now - 4 * D } }),
    a('a2', '017', 'u6', 'Lighting LED panel 60W', 'Peralatan shooting', d(10), 2, 1450000, 'https://shopee.co.id/', 'Ganti lighting studio yang sudah redup, untuk shooting series Desember.', 'menunggu_hcga', { log: [L('u6', 'Mengajukan', 5 * H)] }),
    a('a3', '015', 'u7', 'Ring light 18" + tripod', 'Peralatan shooting', d(4), 1, 650000, 'https://www.tokopedia.com/', 'Untuk konten live Instagram & TikTok.', 'dipesan',
      { log: [L('u7', 'Mengajukan', 6 * D), L('u3', 'Menyetujui', 5 * D), L('u3', 'Memesan barang', 3 * D, 'Estimasi tiba ' + fds(d(2)))], beli: { vendor: 'Shopee Mall', total: 629000, order: '261116ABCD77', eta: d(2), files: [] } }),
    a('a4', '016', 'u10', 'Kursi kerja ergonomis', 'Furnitur', d(14), 1, 1800000, 'https://www.ikea.co.id/', 'Kursi lama rusak (sandaran patah).', 'proses_beli', { log: [L('u10', 'Mengajukan', 2 * D), L('u3', 'Menyetujui', 1 * D, 'Cari yang garansi minimal 1 tahun')] }),
    a('a5', '009', 'u8', 'Laptop 14" (RAM 16GB)', 'Elektronik & IT', d(-20), 1, 13500000, '', 'Laptop pengganti untuk Head of Marketing, unit lama > 5 tahun.', 'selesai',
      { log: [L('u8', 'Mengajukan', 30 * D), L('u3', 'Menyetujui', 29 * D), L('u3', 'Memesan barang', 28 * D), L('u3', 'Menerima barang di GA', 22 * D), L('u3', 'Menyerahkan ke karyawan', 21 * D), L('u8', 'Mengonfirmasi barang diterima', 21 * D)],
        beli: { vendor: 'Distributor resmi', total: 13250000, order: 'PO-0931', eta: d(-22), files: ['invoice-laptop.pdf'] }, terima: { kode: 'AST-2610-027', kondisi: 'Baik', at: now - 22 * D } }),
    a('a6', '012', 'u2', 'Kamera mirrorless kedua', 'Peralatan shooting', d(30), 1, 18000000, '', 'Backup kamera untuk shooting outdoor.', 'ditolak', { log: [L('u2', 'Mengajukan', 8 * D), L('u3', 'Menolak', 7 * D, 'Budget capex Q4 sudah terpakai. Ajukan ulang di Januari.')] }),
    a('a7', '018', 'u1', 'Headset dengan mic', 'Elektronik & IT', d(7), 1, 450000, 'https://www.tokopedia.com/', 'Untuk interview narasumber via online.', 'menunggu_hcga', { log: [L('u1', 'Mengajukan', 1 * H)] }),
    a('a8', '011', 'u11', 'Lemari arsip besi', 'Furnitur', d(-12), 1, 2300000, '', 'Penyimpanan kontrak partnership.', 'selesai',
      { log: [L('u11', 'Mengajukan', 20 * D), L('u3', 'Menyetujui', 19 * D)], beli: { vendor: 'Toko furnitur kantor', total: 2250000, order: 'NB-118', eta: d(-14), files: [] }, terima: { kode: 'AST-2611-024', kondisi: 'Baik', at: now - 14 * D } }),
    a('a9', '010', 'u3', 'Dispenser air & kulkas pantry', 'Perlengkapan kantor', d(-16), 1, 3800000, '', 'Penggantian unit pantry lantai 2.', 'selesai',
      { log: [L('u3', 'Mengajukan', 25 * D)], beli: { vendor: 'Electronic City', total: 3650000, order: 'EC-77120', eta: d(-17), files: [] }, terima: { kode: 'AST-2611-022', kondisi: 'Baik', at: now - 17 * D } })
  ];
}
function asetByKat(ym) {
  return ASET_KAT.map(k => { const xs = S.aset.filter(a => a.kategori === k && a.no.includes('/' + ym.replace('-', '/') + '/') && !['ditolak', 'dibatalkan'].includes(a.status)); const v = xs.reduce((s, a) => s + asetTotal(a), 0); return { label: k, value: v, sub: `${xs.length} pengajuan`, tip: `${k}: ${rp(v)} · ${xs.length} pengajuan` }; }).filter(x => x.value).sort((a, b) => b.value - a.value);
}
const asetTotal = a => a.beli?.total || a.harga * a.qty;

function asetRow(a, who) {
  return row({ href: `#/aset/${a.id}`, tag: 'Aset', title: `${esc(a.nama)}${a.qty > 1 ? ' × ' + a.qty : ''}`, sub: `${who ? esc(user(a.userId).nama) + ' · ' : ''}dibutuhkan ${fds(a.tanggal)} · ${a.no}`, right: pill(a.status) });
}
function asetTable(list, who) {
  if (!list.length) return empty('Belum ada pengajuan.');
  return `<div class="tw"><table class="t"><thead><tr><th>No.</th>${who ? '<th>Pemohon</th>' : ''}<th>Barang</th><th class="r hide-sm">Qty</th><th class="r hide-sm">Nilai</th><th class="hide-sm">Dibutuhkan</th><th>Status</th></tr></thead><tbody>${list.map(a =>
    `<tr class="click" data-href="#/aset/${a.id}"><td class="num">${a.no}</td>${who ? `<td>${userCell(a.userId)}</td>` : ''}<td>${esc(a.nama)}<span class="s">${esc(a.kategori)}</span></td><td class="r num hide-sm">${a.qty}</td><td class="r num hide-sm">${rp(asetTotal(a))}${a.beli ? '' : '<span class="s">estimasi</span>'}</td><td class="num hide-sm">${fds(a.tanggal)}</td><td>${pill(a.status)}</td></tr>`).join('')}</tbody></table></div>`;
}

function vAsetList(q) {
  const all = (isHCGA() ? S.aset : S.aset.filter(a => a.userId === me().id)).slice().sort((a, b) => b.no.localeCompare(a.no));
  const f = q.f || 'aktif';
  const g = { aktif: all.filter(a => !['selesai', 'ditolak', 'dibatalkan'].includes(a.status)), selesai: all.filter(a => ['selesai', 'ditolak', 'dibatalkan'].includes(a.status)), semua: all };
  return `<div class="page-head"><div><h1>Pembelian aset</h1><p class="muted">${isHCGA() ? 'Semua pengajuan pembelian aset & perlengkapan.' : 'Ajukan kebutuhan barang kerja. Disetujui dan dibelikan oleh HCGA.'}</p></div><a class="btn primary" href="#/aset/baru">${ic('plus')} Ajukan pembelian</a></div>
  <div class="tabs">${[['aktif', 'Berjalan'], ['selesai', 'Selesai & ditolak'], ['semua', 'Semua']].map(([k, l]) => `<a href="#/aset?f=${k}" class="${f === k ? 'on' : ''}">${l} <span class="c">${g[k].length}</span></a>`).join('')}</div>
  ${fbar('aset', { dept: isHCGA() })}
  <section class="card">${asetTable(g[f], isHCGA())}</section>`;
}

function vAsetForm() {
  return `<a class="back" href="#/aset">${ic('left')} Pembelian aset</a>
  <div class="page-head"><div><h1>Ajukan pembelian aset</h1><p class="muted">Alur: Anda mengajukan → HCGA menyetujui → GA membeli → barang diserahkan ke Anda.</p></div></div>
  <form class="cols-main" data-form="aset" data-live="aset" novalidate>
    <div class="card"><div class="card-b form"><div class="fgrid">
      <div class="f full"><label for="anama">Nama barang</label><input type="text" id="anama" name="nama" placeholder="mis. Monitor 24 inch IPS" required></div>
      <div class="f"><label for="akat">Kategori</label><select id="akat" name="kategori">${opts(ASET_KAT)}</select></div>
      <div class="f"><label for="atgl">Tanggal dibutuhkan</label><input type="date" id="atgl" name="tanggal" value="${addDays(TODAY, 7)}" min="${TODAY}"></div>
      <div class="f full"><label for="alink">Link barang</label><input type="url" id="alink" name="link" placeholder="https://www.tokopedia.com/..."><span class="hint">Link marketplace atau website toko, supaya GA membeli barang yang tepat.</span></div>
      <div class="f"><label for="aqty">Jumlah (qty)</label><input type="number" id="aqty" name="qty" value="1" min="1"></div>
      <div class="f"><label for="aharga">Perkiraan harga satuan</label><input type="number" id="aharga" name="harga" min="0" step="1000" placeholder="0"></div>
      <div class="f full"><label for="akep">Keperluan</label><textarea id="akep" name="keperluan" placeholder="Untuk apa barang ini dan kenapa dibutuhkan" required></textarea></div>
    </div>
    <div id="formErr"></div>
    <div class="form-foot"><a class="btn" href="#/aset">Batal</a><button class="btn primary">Kirim ke HCGA</button></div></div></div>
    <aside class="card sum"><div class="card-h"><h2>Ringkasan</h2></div><div class="card-b" id="asum"></div></aside>
  </form>`;
}
function liveAset(f) {
  const qty = +f.elements.qty.value || 0, h = +f.elements.harga.value || 0, link = f.elements.link.value.trim();
  $('#asum').innerHTML = kv('Barang', esc(f.elements.nama.value.trim()) || '<span class="faint">–</span>') + kv('Qty', qty) + kv('Harga satuan', h ? rp(h) : '<span class="faint">belum diisi</span>') + kv('Perkiraan total', rp(qty * h), 'total') + kv('Dibutuhkan', fd(f.elements.tanggal.value)) + (link ? `<div style="margin-top:10px"><a class="link" href="${esc(link)}" target="_blank" rel="noopener">Cek link barang ↗</a></div>` : '');
}

function asetStepper(a) {
  const idx = ASET_IDX[a.status] ?? 0, bad = a.status === 'ditolak' ? 1 : -1;
  return `<ol class="steps">${ASET_STEPS.map((s, i) => { let c = bad >= 0 ? (i < bad ? 'done' : i === bad ? 'bad' : '') : (i < idx ? 'done' : i === idx ? 'cur' : ''); return `<li class="${c}">${i === bad ? 'Ditolak HCGA' : s}</li>`; }).join('')}</ol>`;
}

function asetAction(a) {
  const m = me();
  if (isHCGA() && a.status === 'menunggu_hcga') return `<div class="act amber"><div><b>Menunggu persetujuan HCGA</b><p>Perkiraan ${rp(a.harga * a.qty)} · dibutuhkan ${fd(a.tanggal)}.</p></div><div class="btns"><button class="btn danger" data-act="aset-reject" data-id="${a.id}">Tolak</button><button class="btn primary" data-act="aset-approve" data-id="${a.id}">Setujui</button></div></div>`;
  if (isHCGA() && a.status === 'proses_beli') return `<form class="act block" data-form="aset-beli" data-id="${a.id}"><b>Catat pembelian</b><p>Isi setelah barang dipesan atau dibayar.</p>
    <div class="fgrid" style="margin-top:14px"><div class="f"><label>Toko / vendor</label><input type="text" name="vendor" placeholder="mis. Tokopedia · Toko resmi" required></div><div class="f"><label>Total harga realisasi</label><input type="number" name="total" min="0" step="1000" value="${a.harga * a.qty || ''}"></div>
    <div class="f"><label>No. order / invoice / PO</label><input type="text" name="order"></div><div class="f"><label>Estimasi barang tiba</label><input type="date" name="eta" value="${addDays(TODAY, 3)}"></div>
    <div class="f full"><label>Lampiran invoice / bukti bayar</label><input type="file" name="files" multiple></div></div>
    <div class="form-foot"><button class="btn primary">Simpan · barang dipesan</button></div></form>`;
  if (isHCGA() && a.status === 'dipesan') return `<div class="act"><div><b>Barang sudah dipesan</b><p>Estimasi tiba ${fd(a.beli.eta)}. Tandai saat barang sampai di GA.</p></div><button class="btn primary" data-act="aset-terima" data-id="${a.id}">Barang diterima GA</button></div>`;
  if (isHCGA() && a.status === 'diterima') return `<div class="act"><div><b>Barang ada di GA · ${esc(a.terima.kode)}</b><p>Serahkan ke ${esc(user(a.userId).nama)}. Karyawan akan diminta konfirmasi terima.</p></div><button class="btn primary" data-act="aset-serah" data-id="${a.id}">Serahkan ke karyawan</button></div>`;
  if (a.userId === m.id && a.status === 'diserahkan') return `<div class="act amber"><div><b>Barang sudah diserahkan ke Anda</b><p>Cek barangnya, lalu konfirmasi bahwa Anda sudah menerima dalam kondisi baik.</p></div><div class="btns"><button class="btn" data-act="aset-masalah" data-id="${a.id}">Ada masalah</button><button class="btn primary" data-act="aset-konfirmasi" data-id="${a.id}">Konfirmasi sudah terima</button></div></div>`;
  if (isHCGA() && a.status === 'diserahkan') return `<div class="act"><div><b>Menunggu konfirmasi ${esc(user(a.userId).nama)}</b><p>Diserahkan, menunggu karyawan mengonfirmasi penerimaan.</p></div></div>`;
  if (a.userId === m.id && a.status === 'menunggu_hcga') return `<div class="act"><div><b>Menunggu persetujuan HCGA</b><p>Anda akan mendapat notifikasi saat ada keputusan.</p></div><button class="btn danger" data-act="aset-cancel" data-id="${a.id}">Batalkan</button></div>`;
  return '';
}

function vAsetDetail(id) {
  const a = S.aset.find(x => x.id === id);
  if (!a) return notFound();
  if (!(isHCGA() || a.userId === me().id)) return noAccess();
  const u = user(a.userId);
  return `<a class="back" href="#/aset">${ic('left')} Pembelian aset</a>
  <div class="page-head"><div><div class="eyebrow num">${a.no}</div><h1>${esc(a.nama)}${a.qty > 1 ? ' × ' + a.qty : ''}</h1><p class="muted">${esc(u.nama)} · ${esc(a.kategori)} · dibutuhkan ${fd(a.tanggal)}</p></div>${pill(a.status)}</div>
  ${asetStepper(a)}${asetAction(a)}
  <div class="cols-main"><div>
  ${card('Detail pengajuan', `<div class="card-b"><dl class="d"><dt>Pemohon</dt><dd>${esc(u.nama)} · ${esc(u.jabatan)} · ${esc(u.dept)}</dd><dt>Nama barang</dt><dd>${esc(a.nama)}</dd><dt>Kategori</dt><dd>${esc(a.kategori)}</dd><dt>Jumlah</dt><dd>${a.qty} unit</dd><dt>Perkiraan harga</dt><dd class="num">${a.harga ? `${rp(a.harga)} × ${a.qty} = <b>${rp(a.harga * a.qty)}</b>` : '–'}</dd><dt>Tanggal dibutuhkan</dt><dd>${fd(a.tanggal)}</dd><dt>Link barang</dt><dd>${a.link ? `<a href="${esc(a.link)}" target="_blank" rel="noopener">${esc(a.link.replace(/^https?:\/\//, '').slice(0, 60))} ↗</a>` : '–'}</dd><dt>Keperluan</dt><dd>${esc(a.keperluan)}</dd></dl></div>`)}
  ${a.beli ? card('Pembelian', `<div class="card-b"><dl class="d"><dt>Toko / vendor</dt><dd>${esc(a.beli.vendor)}</dd><dt>Total realisasi</dt><dd class="num"><b>${rp(a.beli.total)}</b>${a.harga ? ` <span class="muted">(estimasi ${rp(a.harga * a.qty)})</span>` : ''}</dd>${a.beli.order ? `<dt>No. order</dt><dd class="num">${esc(a.beli.order)}</dd>` : ''}<dt>Estimasi tiba</dt><dd>${fd(a.beli.eta)}</dd>${a.beli.files?.length ? `<dt>Lampiran</dt><dd><div class="files">${a.beli.files.map(f => `<span class="file">${ic('file')}${esc(f)}</span>`).join('')}</div></dd>` : ''}</dl></div>`) : ''}
  ${a.terima ? card('Penerimaan & aset', `<div class="card-b"><dl class="d"><dt>Kode aset</dt><dd class="num"><b>${esc(a.terima.kode)}</b></dd><dt>Kondisi</dt><dd>${esc(a.terima.kondisi)}</dd><dt>Diterima GA</dt><dd>${fdt(a.terima.at)}</dd>${a.serahAt ? `<dt>Diserahkan</dt><dd>${fdt(a.serahAt)}</dd>` : ''}${a.konfirmAt ? `<dt>Dikonfirmasi karyawan</dt><dd>${fdt(a.konfirmAt)}</dd>` : ''}</dl></div>`) : ''}
  </div><div>${card('Riwayat', `<div class="card-b">${timeline(a.log)}</div>`)}</div></div>`;
}

const ASET_ACT = {
  'aset-approve': d => { const a = S.aset.find(x => x.id === d.id); modal('Setujui pembelian?', `<p style="margin:0">${esc(a.nama)} × ${a.qty} · perkiraan ${rp(a.harga * a.qty)}</p>${noteField('Catatan untuk pemohon / tim pembelian')}`, 'Setujui', fd => { a.status = 'proses_beli'; addLog(a, 'Menyetujui', fd.get('note')); notify(a.userId, `Pengajuan ${a.nama} disetujui HCGA, sedang diproses pembelian`, `#/aset/${a.id}`); rerender(); toast('Disetujui, lanjut proses beli'); }); },
  'aset-reject': d => { const a = S.aset.find(x => x.id === d.id); modal('Tolak pengajuan aset?', noteField('Alasan', true), 'Tolak', fd => { if (!fd.get('note').trim()) { toast('Alasan wajib diisi'); return false; } a.status = 'ditolak'; addLog(a, 'Menolak', fd.get('note')); notify(a.userId, `Pengajuan ${a.nama} ditolak: ${fd.get('note')}`, `#/aset/${a.id}`); rerender(); toast('Pengajuan ditolak'); }, true); },
  'aset-cancel': d => { const a = S.aset.find(x => x.id === d.id); modal('Batalkan pengajuan?', '<p style="margin:0">Pengajuan ditarik dan tidak diproses.</p>', 'Batalkan', () => { a.status = 'dibatalkan'; addLog(a, 'Membatalkan'); rerender(); toast('Pengajuan dibatalkan'); }, true); },
  'aset-terima': d => { const a = S.aset.find(x => x.id === d.id); S.seq.AST = (S.seq.AST || 31) + 1; const kode = `AST-${TODAY.slice(2, 4)}${TODAY.slice(5, 7)}-${String(S.seq.AST).padStart(3, '0')}`;
    modal('Barang diterima GA', `<div class="f"><label>Kode aset</label><input type="text" name="kode" value="${kode}"><span class="hint">Tempel stiker kode ini di barang.</span></div><div class="f"><label>Kondisi</label><select name="kondisi">${opts(['Baik', 'Rusak ringan', 'Tidak sesuai pesanan'])}</select></div>`, 'Simpan', fd => { a.terima = { kode: fd.get('kode').trim() || kode, kondisi: fd.get('kondisi'), at: Date.now() }; a.status = 'diterima'; addLog(a, 'Menerima barang di GA', `Kode aset ${a.terima.kode} · ${a.terima.kondisi}`); notify(a.userId, `${a.nama} sudah tiba di GA, segera diserahkan`, `#/aset/${a.id}`); rerender(); toast('Barang dicatat sebagai aset'); }); },
  'aset-serah': d => { const a = S.aset.find(x => x.id === d.id); a.status = 'diserahkan'; a.serahAt = Date.now(); addLog(a, 'Menyerahkan ke karyawan'); notify(a.userId, `${a.nama} sudah diserahkan. Mohon konfirmasi penerimaan.`, `#/aset/${a.id}`); rerender(); toast('Menunggu konfirmasi karyawan'); },
  'aset-konfirmasi': d => { const a = S.aset.find(x => x.id === d.id); a.status = 'selesai'; a.konfirmAt = Date.now(); addLog(a, 'Mengonfirmasi barang diterima'); notifyHCGA(`${me().nama} mengonfirmasi terima ${a.nama}`, `#/aset/${a.id}`); rerender(); toast('Terima kasih, pengajuan selesai'); },
  'aset-masalah': d => { const a = S.aset.find(x => x.id === d.id); modal('Laporkan masalah', noteField('Apa masalahnya?', true), 'Kirim ke HCGA', fd => { if (!fd.get('note').trim()) { toast('Jelaskan masalahnya'); return false; } a.status = 'diterima'; addLog(a, 'Melaporkan masalah', fd.get('note')); notifyHCGA(`${me().nama} melaporkan masalah pada ${a.nama}: ${fd.get('note')}`, `#/aset/${a.id}`); rerender(); toast('Laporan terkirim ke HCGA'); }); }
};
const ASET_FORMS = {
  aset: (fd, f) => {
    const a = { nama: fd.get('nama').trim(), kategori: fd.get('kategori'), tanggal: fd.get('tanggal'), link: fd.get('link').trim(), qty: +fd.get('qty') || 0, harga: +fd.get('harga') || 0, keperluan: fd.get('keperluan').trim() };
    const err = [];
    if (!a.nama) err.push('Nama barang wajib diisi.');
    if (a.qty < 1) err.push('Jumlah minimal 1.');
    if (!a.tanggal || a.tanggal < TODAY) err.push('Tanggal dibutuhkan tidak valid.');
    if (a.link && !/^https?:\/\//.test(a.link)) err.push('Link barang harus diawali http:// atau https://');
    if (!a.keperluan) err.push('Keperluan wajib diisi.');
    if (err.length) { $('#formErr').innerHTML = `<div class="alert">${err.join('<br>')}</div>`; return; }
    Object.assign(a, { id: 'a' + uid(), no: nextNo('PA'), userId: me().id, status: 'menunggu_hcga', log: [] });
    addLog(a, 'Mengajukan'); S.aset.push(a);
    notifyHCGA(`${me().nama} mengajukan pembelian ${a.nama}`, `#/aset/${a.id}`);
    save(); go(`#/aset/${a.id}`); toast('Terkirim ke HCGA');
  },
  'aset-beli': (fd, f) => {
    const a = S.aset.find(x => x.id === f.dataset.id);
    if (!fd.get('vendor').trim()) { toast('Isi toko / vendor'); return; }
    a.beli = { vendor: fd.get('vendor').trim(), total: +fd.get('total') || 0, order: fd.get('order').trim(), eta: fd.get('eta'), files: [...f.elements.files.files].map(x => x.name) };
    a.status = 'dipesan'; addLog(a, 'Memesan barang', `${a.beli.vendor} · ${rp(a.beli.total)}`);
    notify(a.userId, `${a.nama} sudah dipesan, estimasi tiba ${fds(a.beli.eta)}`, `#/aset/${a.id}`);
    rerender(); toast('Pembelian dicatat');
  }
};

/* ===== Dashboard TA & LnD (rancangan, data contoh statis) ===== */
const TA_DEMO = {
  tth: 32, offerAcc: 78,
  funnel: [['Lamaran masuk', 214], ['Lolos screening CV', 86], ['Interview HR', 41], ['Interview user', 19], ['Offering', 9], ['Bergabung', 7]],
  open: [
    { pos: 'Video Editor', dept: 'Konten', sejak: addDays(TODAY, -38), kand: 23, tahap: 'Interview user', target: addDays(TODAY, 21), prio: 'Tinggi' },
    { pos: 'Social Media Specialist', dept: 'Marketing', sejak: addDays(TODAY, -21), kand: 31, tahap: 'Interview HR', target: addDays(TODAY, 35), prio: 'Sedang' },
    { pos: 'Partnership Executive', dept: 'Sales', sejak: addDays(TODAY, -45), kand: 12, tahap: 'Offering', target: addDays(TODAY, 10), prio: 'Tinggi' },
    { pos: 'Content Writer (Kesehatan)', dept: 'Konten', sejak: addDays(TODAY, -9), kand: 18, tahap: 'Screening CV', target: addDays(TODAY, 45), prio: 'Sedang' },
    { pos: 'GA Staff', dept: 'HCGA', sejak: addDays(TODAY, -15), kand: 9, tahap: 'Interview HR', target: addDays(TODAY, 30), prio: 'Rendah' },
    { pos: 'Graphic Designer', dept: 'Marketing', sejak: addDays(TODAY, -60), kand: 27, tahap: 'Interview user', target: addDays(TODAY, -5), prio: 'Tinggi' }
  ],
  hires: [2, 1, 3, 0, 2, 1],
  sumber: [['LinkedIn', 72], ['Jobstreet', 58], ['Referral karyawan', 31], ['Instagram Momiasi', 29], ['Glints', 24]],
  interviews: [
    { t: addDays(TODAY, 0) + ' 14:00', nama: 'Kandidat A', pos: 'Video Editor', oleh: 'Fajar Nugroho' },
    { t: addDays(TODAY, 1) + ' 10:00', nama: 'Kandidat B', pos: 'Partnership Executive', oleh: 'Hendra Wijaya' },
    { t: addDays(TODAY, 1) + ' 13:30', nama: 'Kandidat C', pos: 'Social Media Specialist', oleh: 'Sari Wulandari' },
    { t: addDays(TODAY, 2) + ' 09:00', nama: 'Kandidat D', pos: 'Graphic Designer', oleh: 'Maya Lestari' }
  ]
};
const LND_DEMO = {
  budget: 150000000, used: 93500000, score: 4.4, jamPerOrang: 14.5,
  jam: [96, 120, 64, 150, 132, 88],
  dept: [['Konten', 32, 41000000, 50000000], ['Marketing', 18, 26500000, 35000000], ['Sales', 14, 15000000, 30000000], ['HCGA', 8, 9000000, 20000000], ['Manajemen', 3, 2000000, 15000000]],
  partisipasi: [['Konten', 0.86], ['Marketing', 0.72], ['HCGA', 0.75], ['Sales', 0.55], ['Manajemen', 0.6]],
  upcoming: [
    { judul: 'Public speaking untuk host konten', tipe: 'Internal', tgl: addDays(TODAY, 3), peserta: 12, kuota: 15, status: 'Pendaftaran dibuka' },
    { judul: 'Google Analytics 4 untuk tim marketing', tipe: 'Eksternal', tgl: addDays(TODAY, 8), peserta: 4, kuota: 4, status: 'Penuh' },
    { judul: 'Sertifikasi K3 untuk driver & GA', tipe: 'Eksternal', tgl: addDays(TODAY, 15), peserta: 3, kuota: 5, status: 'Menunggu approval' },
    { judul: 'Leadership for new managers', tipe: 'Internal', tgl: addDays(TODAY, 24), peserta: 6, kuota: 10, status: 'Pendaftaran dibuka' }
  ]
};
const draftNote = m => `<div class="alert warn" style="margin-bottom:16px"><b>Rancangan dashboard.</b> Angka di halaman ini masih contoh untuk membahas tampilan & indikatornya. Data asli akan berasal dari submodul ${m} setelah dirancang dan dibangun.</div>`;

function vDashGA() { return vBerandaHCGA('ga'); }

function vDashTA() {
  const D = TA_DEMO, lastM = [5, 4, 3, 2, 1, 0].map(monthKey);
  const top = D.funnel[0][1];
  const funnel = `<div class="funnel">${D.funnel.map(([l, v], i) => `<div class="fn" data-tip="${l}: ${v} orang${i ? ` · ${Math.round(v / D.funnel[i - 1][1] * 100)}% dari tahap sebelumnya` : ''}" tabindex="0"><span class="fl">${l}</span><span class="ft"><span style="width:${Math.max(2, v / top * 75)}%;background:${ORD[Math.min(4, Math.floor(i * 5 / D.funnel.length))]}"></span><b class="num">${v}</b>${i ? `<small>${Math.round(v / D.funnel[i - 1][1] * 100)}%</small>` : ''}</span></div>`).join('')}</div>`;
  const prioPill = p => `<span class="pill ${p === 'Tinggi' ? 'red' : p === 'Sedang' ? 'amber' : 'gray'}">${p}</span>`;
  const openT = `<div class="tw"><table class="t"><thead><tr><th>Posisi</th><th class="hide-sm">Dibuka</th><th class="r">Kandidat</th><th>Tahap terjauh</th><th class="hide-sm">Target join</th><th>Prioritas</th></tr></thead><tbody>${D.open.map(o => { const late = o.target < TODAY; return `<tr><td><b>${o.pos}</b><span class="s">${o.dept}</span></td><td class="hide-sm num">${daysBetween(o.sejak, TODAY)} hari lalu</td><td class="r num">${o.kand}</td><td>${o.tahap}</td><td class="hide-sm num" ${late ? 'style="color:var(--red)"' : ''}>${fds(o.target)}${late ? '<span class="s" style="color:var(--red)">lewat target</span>' : ''}</td><td>${prioPill(o.prio)}</td></tr>`; }).join('')}</tbody></table></div>`;
  return `<div class="page-head"><div><div class="eyebrow">Talent Acquisition</div><h1>Dashboard TA</h1><p class="muted">Kebutuhan karyawan, pipeline kandidat, dan kecepatan rekrutmen.</p></div><span class="pill gray">Rancangan</span></div>
  ${draftNote('Talent Acquisition')}
  <div class="tiles">${tile('Posisi terbuka', D.open.length, `${D.open.filter(o => o.prio === 'Tinggi').length} prioritas tinggi`)}${tile('Kandidat dalam proses', D.funnel.slice(1, 5).reduce((a, x) => a + x[1], 0), 'screening sampai offering')}${tile('Rata-rata time to hire', D.tth + ' hari', 'dari lowongan dibuka sampai offering diterima')}${tile('Offering diterima', D.offerAcc + '%', '6 bulan terakhir')}</div>
  <div class="cols">
    <div>${card('Pipeline kandidat', `<div class="card-b">${funnel}</div>`, '', 'semua posisi aktif')}
      ${card('Sumber kandidat', `<div class="card-b">${hbar(D.sumber.map(([l, v]) => ({ label: l, value: v, tip: `${l}: ${v} pelamar` })), v => v + ' orang')}</div>`, '', '6 bulan terakhir')}</div>
    <div>${card('Karyawan baru bergabung', `<div class="card-b">${colChart(lastM.map((m, i) => ({ label: BLN[+m.slice(5) - 1], value: D.hires[i], tip: `${BULAN[+m.slice(5) - 1]}: ${D.hires[i]} orang` })), v => v + ' org', v => String(v))}</div>`, '', '6 bulan terakhir')}
      ${card('Interview terdekat', `<div class="list">${D.interviews.map(x => row({ href: '#/dash-ta', title: `${x.pos} · ${x.nama}`, sub: `${relDay(x.t.slice(0, 10))} ${jam(x.t.slice(11))} · interviewer ${x.oleh}` })).join('')}</div>`)}</div>
  </div>
  ${card('Posisi terbuka', openT, '', `${D.open.length} posisi`)}`;
}

function vDashLnd() {
  const D = LND_DEMO, lastM = [5, 4, 3, 2, 1, 0].map(monthKey);
  const pct = Math.round(D.used / D.budget * 100);
  const budgetRows = `<div class="brows">${D.dept.map(([d, , used, alloc]) => { const p = used / alloc; return `<div class="br" data-tip="${d}: ${rp(used)} dari ${rp(alloc)} (${Math.round(p * 100)}%)" tabindex="0"><div class="bl"><span>${d}</span><span class="num muted">${rpc(used)} / ${rpc(alloc)}</span></div><div class="meter2 ${p > 0.9 ? 'hi' : ''}"><span style="width:${Math.min(100, p * 100)}%"></span></div></div>`; }).join('')}</div>`;
  const up = `<div class="tw"><table class="t"><thead><tr><th>Training</th><th class="hide-sm">Tipe</th><th>Tanggal</th><th class="r">Peserta</th><th>Status</th></tr></thead><tbody>${D.upcoming.map(x => `<tr><td><b>${x.judul}</b></td><td class="hide-sm">${x.tipe}</td><td class="num">${fds(x.tgl)}</td><td class="r num">${x.peserta}/${x.kuota}</td><td><span class="pill ${x.status === 'Penuh' ? 'gray' : x.status.startsWith('Menunggu') ? 'amber' : 'teal'}">${x.status}</span></td></tr>`).join('')}</tbody></table></div>`;
  return `<div class="page-head"><div><div class="eyebrow">Learning & Development</div><h1>Dashboard LnD</h1><p class="muted">Jam training, pemakaian budget, partisipasi, dan kualitas training.</p></div><span class="pill gray">Rancangan</span></div>
  ${draftNote('Learning & Development')}
  <div class="tiles">${tile('Jam training per karyawan', D.jamPerOrang.toLocaleString('id-ID') + ' jam', 'tahun berjalan')}${tile('Budget training terpakai', pct + '%', `${rpc(D.used)} dari ${rpc(D.budget)}`, pct > 85 ? 'up' : '')}${tile('Training mendatang', D.upcoming.length, '30 hari ke depan')}${tile('Rata-rata nilai evaluasi', D.score.toLocaleString('id-ID') + ' / 5', 'dari feedback peserta')}</div>
  <div class="cols">
    <div>${card('Total jam training', `<div class="card-b">${colChart(lastM.map((m, i) => ({ label: BLN[+m.slice(5) - 1], value: D.jam[i], tip: `${BULAN[+m.slice(5) - 1]}: ${D.jam[i]} jam` })), v => v + ' jam', v => String(v))}</div>`, '', '6 bulan terakhir')}
      ${card('Partisipasi training per departemen', `<div class="card-b">${hbar(D.partisipasi.map(([l, v]) => ({ label: l, value: v, tip: `${l}: ${Math.round(v * 100)}% karyawan sudah ikut training tahun ini` })), v => Math.round(v * 100) + '%')}</div>`, '', '% karyawan, tahun berjalan')}</div>
    <div>${card('Budget training per departemen', `<div class="card-b">${budgetRows}</div>`, '', 'terpakai / alokasi tahunan')}</div>
  </div>
  ${card('Training mendatang', up)}`;
}

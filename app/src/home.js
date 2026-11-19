/* ===== Beranda: dashboard gabungan GA · TA · LnD (HC & Direktur) ===== */
function vHome() {
  lndSyncAll();
  const u = me(), m0 = monthKey(0), m1 = monthKey(1), m6 = [5, 4, 3, 2, 1, 0].map(monthKey), yr = TODAY.slice(0, 4);
  const mon = m => BLN[+m.slice(5) - 1];

  /* ---- GA ---- */
  const ca0 = caMonth(m0), ca1 = caMonth(m1), dCa = ca1 ? Math.round((ca0 - ca1) / ca1 * 100) : 0;
  const tripAktif = S.trips.filter(t => !['selesai', 'ditolak', 'dibatalkan'].includes(t.status));
  const H = roomHeat(4), occ = H.norm.flat().reduce((a, v) => a + v, 0) / H.norm.flat().length;
  const caTrend = colChart(m6.map(m => ({ label: mon(m), value: caMonth(m), tip: `${BULAN[+m.slice(5) - 1]}: ${rp(caMonth(m))}` })), rpc, v => v ? rpc(v).replace('Rp ', '') : '0');
  const tripSeg = segBar([['Menunggu atasan', ['menunggu_atasan']], ['Menunggu HCGA', ['menunggu_hcga']], ['Tiket & CA', ['pemesanan']], ['Siap / sedang dinas', ['siap', 'dinas']], ['Settlement', ['perlu_settle', 'settlement']]].map(([l, st], i) => ({ label: l, value: tripAktif.filter(t => st.includes(tstat(t))).length, color: ORD[i], href: '#/dinas' })));
  const km = S.vehicles.map(v => { const cs = S.cars.filter(c => c.status === 'selesai' && c.assign?.vehicleId === v.id && c.tanggal.slice(0, 7) === m0 && c.trip); const k = cs.reduce((a, c) => a + c.trip.odoEnd - c.trip.odoStart, 0); return { label: v.nama.replace(/^(Toyota|Daihatsu) /, ''), sub: v.plat, value: k, tip: `${v.nama}: ${k} km · ${cs.length} trip` }; });
  const asetNilai = S.aset.filter(a => a.no.includes('/' + m0.replace('-', '/') + '/') && !['ditolak', 'dibatalkan'].includes(a.status)).reduce((s, a) => s + asetTotal(a), 0);

  /* ---- TA ---- */
  const open = S.fpk.filter(f => f.status === 'mencari'), proses = S.cands.filter(c => ['hr', 'tes', 'user', 'offering'].includes(c.stage));
  const offers = S.cands.filter(c => c.offer && c.offer.resp !== 'menunggu'), acc = offers.filter(c => c.offer.resp === 'terima');
  const tth = acc.map(c => { const f = FP(c.fpkId); return f.approvedAt && c.offer.respAt ? (c.offer.respAt - f.approvedAt) / 864e5 : null; }).filter(x => x != null);
  const fun = STG.map(([k, l], i) => ({ l, n: S.cands.filter(c => { const ci = STG.findIndex(s => s[0] === c.stage); return (ci >= 0 ? ci : (c.uif ? 2 : 0)) >= i; }).length }));
  const top = fun[0].n || 1;
  const funnel = `<div class="funnel">${fun.map((x, i) => `<div class="fn" data-tip="${x.l}: ${x.n} kandidat" tabindex="0"><span class="fl">${x.l}</span><span class="ft"><span style="width:${Math.max(2, x.n / top * 75)}%;background:${ORD[Math.min(4, i)]}"></span><b class="num">${x.n}</b>${i ? `<small>${fun[i - 1].n ? Math.round(x.n / fun[i - 1].n * 100) : 0}%</small>` : ''}</span></div>`).join('')}</div>`;
  const hires = colChart(m6.map(m => { const n = S.cands.filter(c => c.stage === 'bergabung' && c.offer && c.offer.mulai.slice(0, 7) === m).length; return { label: mon(m), value: n, tip: `${BULAN[+m.slice(5) - 1]}: ${n} orang` }; }), v => v + ' org', v => String(v));
  const src = hbar(SUMBER.map(s => ({ label: s, value: S.cands.filter(c => c.sumber === s).length, tip: `${s}: ${S.cands.filter(c => c.sumber === s).length} pelamar` })).filter(x => x.value).sort((a, b) => b.value - a.value), v => v + ' orang');
  const fpkSeg = segBar([['Menunggu Direktur', 'menunggu_direktur'], ['Menunggu HC Manager', 'menunggu_hcm'], ['Menunggu TA', 'menunggu_ta'], ['Dalam pencarian', 'mencari'], ['Terpenuhi', 'terpenuhi']].map(([l, st], i) => ({ label: l, value: S.fpk.filter(f => f.status === st).length, color: ORD[i], href: '#/ta-fpk' })));
  const ending = S.users.filter(x => { const e = contractEnd(x); return e && daysBetween(TODAY, e) <= 30 && daysBetween(TODAY, e) >= -7; }).sort((a, b) => contractEnd(a).localeCompare(contractEnd(b)));

  /* ---- LnD ---- */
  const apprT = S.trainings.filter(t => ['disetujui', 'terlaksana', 'selesai'].includes(t.status));
  const running = S.trainings.filter(t => ['disetujui', 'terlaksana'].includes(t.status));
  const alloc = Object.values(S.lndBudget).reduce((a, b) => a + b, 0), used = Object.keys(S.lndBudget).reduce((a, dp) => a + budgetUsed(dp), 0);
  const reacts = apprT.flatMap(t => t.peserta.map(p => t.prog[p]?.reaction).filter(Boolean)).map(r => avg(r.s));
  const trMonth = colChart(m6.map(m => { const n = apprT.filter(t => t.tanggal.slice(0, 7) === m).length; return { label: mon(m), value: n, tip: `${BULAN[+m.slice(5) - 1]}: ${n} training` }; }), v => v + ' training', v => String(v));
  const budget = `<div class="brows">${Object.keys(S.lndBudget).map(dp => { const us = budgetUsed(dp), al = S.lndBudget[dp], p = al ? us / al : 0; return `<div class="br" data-tip="${esc(dp)}: ${rp(us)} dari ${rp(al)}" tabindex="0"><div class="bl"><span>${esc(dp)}</span><span class="num muted">${Math.round(p * 100)}%</span></div><div class="meter2 ${p > 0.9 ? 'hi' : ''}"><span style="width:${Math.min(100, p * 100)}%"></span></div></div>`; }).join('')}</div>`;
  const kepuasan = hbar(apprT.filter(t => t.peserta.some(p => t.prog[p]?.reaction)).map(t => { const s = t.peserta.map(p => t.prog[p]?.reaction).filter(Boolean).map(r => avg(r.s)); return { label: t.judul.length > 20 ? t.judul.slice(0, 20) + '…' : t.judul, value: avg(s), tip: `${t.judul}: ${f1(avg(s))} / 10` }; }).sort((a, b) => b.value - a.value), v => f1(v));
  const onbRun = S.onb.filter(o => o.status === 'berjalan');
  const ev360 = S.evals.map(e => evalAvg(e)).filter(x => x != null);

  /* ---- actions ---- */
  const p = pending(), L = lndPending(), T = taPending();
  const chips = (isHCGA() ? [
    ['Dinas', p.dinas.length + p.pesan.length + p.settle.length, '#/persetujuan?tab=dinas'], ['Mobil', p.mobil.length, '#/persetujuan?tab=mobil'], ['Ruang', p.ruang.length, '#/persetujuan?tab=ruang'], ['Aset', p.aset.length, '#/persetujuan?tab=aset'],
    ['FPK', T.hc.length, '#/persetujuan?tab=fpk'], ['Training', L.hc.length, '#/persetujuan?tab=training'], ['Piagam', L.piagam.length, '#/persetujuan?tab=piagam'], ['Kontrak ≤ 30 hari', ending.length, '#/ta-kontrak']
  ] : [['Dinas tim', p.atasan.length, '#/persetujuan'], ['FPK', T.dir.length, '#/persetujuan'], ['Training tim', L.atasan.length, '#/persetujuan']]).filter(c => c[1]);

  const sec = (cls, icon, title, href, body) => `<section class="hsec ${cls}"><div class="hsec-h"><span class="hico">${ic(icon)}</span><h2>${title}</h2>${href ? `<a class="link" href="${href}">Buka dashboard →</a>` : ''}</div>${body}</section>`;
  const w = (title, sub, body, wide) => `<div class="card hw ${wide ? 'wide' : ''}"><div class="card-h"><h2>${title}${sub ? ` <span class="sub">${sub}</span>` : ''}</h2></div><div class="card-b">${body}</div></div>`;
  const dash = h => isHCGA() ? h : '';

  return `<div class="page-head"><div><h1>${salam()}, ${esc(u.nama.split(' ')[0])}</h1><p class="muted">${HARIL[new Date().getDay()]}, ${fdl(TODAY)} · ringkasan seluruh modul HC</p></div>${isHCGA() ? `<a class="btn" href="#/laporan">${ic('chart')} Laporan</a>` : ''}</div>
  ${chips.length ? `<div class="chips"><span class="muted" style="font-size:12.5px">Perlu tindakan</span>${chips.map(([l, n, h]) => `<a class="chip" href="${h}">${l}<b class="num">${n}</b></a>`).join('')}</div>` : ''}
  <div class="tiles t8">
    ${tile('CA dinas · ' + BULAN[+m0.slice(5) - 1], rpc(ca0), ca1 ? `${dCa >= 0 ? '▲' : '▼'} ${Math.abs(dCa)}% vs ${BULAN[+m1.slice(5) - 1]}` : '', dCa > 0 ? 'up' : '')}
    ${tile('Okupansi ruang meeting', Math.round(occ * 100) + '%', 'jam kerja, 4 minggu')}
    ${tile('Posisi terbuka', open.reduce((a, f) => a + f.jumlah, 0), `${proses.length} kandidat dalam proses`)}
    ${tile('Rata-rata time to hire', tth.length ? Math.round(avg(tth)) + ' hari' : '–', `${offers.length ? Math.round(acc.length / offers.length * 100) : 0}% offering diterima`)}
    ${tile('Training berjalan', running.length, `${running.reduce((a, t) => a + t.peserta.length, 0)} peserta`)}
    ${tile('Kepuasan training', reacts.length ? f1(avg(reacts)) + ' / 10' : '–', `${reacts.length} respon`)}
    ${tile('Budget training ' + yr, alloc ? Math.round(used / alloc * 100) + '%' : '–', `${rpc(used)} dari ${rpc(alloc)}`)}
    ${tile('Kontrak berakhir ≤ 30 hari', ending.length, `${S.onb.filter(o => o.status === 'berjalan').length} onboarding berjalan`)}
  </div>
  ${sec('ga', 'bag', 'General Affairs & Admin', isHCGA() ? '#/dash-ga' : '', `<div class="dgrid">
    ${w('CA perjalanan dinas', '6 bulan', caTrend)}
    ${w('Kepadatan ruang meeting', '4 minggu', heatCard(4))}
    ${w('Status perjalanan dinas', `${tripAktif.length} berjalan`, tripSeg)}
    ${w('Pembelian aset per kategori', `${BULAN[+m0.slice(5) - 1]} · ${rpc(asetNilai)}`, hbar(asetByKat(m0), rpc))}
    ${w('Jarak tempuh mobil kantor', BULAN[+m0.slice(5) - 1], hbar(km, v => v + ' km'))}
    ${w('Ruang meeting saat ini', '', `<div class="list mini">${roomNow()}</div>`)}
  </div>`)}
  ${sec('ta', 'users', 'Talent Acquisition', isHCGA() ? '#/dash-ta' : '#/ta-fpk', `<div class="dgrid">
    ${w('Pipeline kandidat', 'semua lowongan', funnel)}
    ${w('Karyawan baru bergabung', '6 bulan', hires)}
    ${w('Sumber kandidat', '', src)}
    ${w('Status permintaan karyawan (FPK)', `${S.fpk.length} FPK`, fpkSeg)}
    ${w('Probation & kontrak berakhir', '≤ 30 hari', ending.length ? `<div class="list mini">${ending.map(x => row({ href: isHCGA() ? `#/review/${x.id}` : '#/lnd-tim', title: esc(x.nama), sub: `${x.statusKontrak} · ${fds(contractEnd(x))} · ${daysBetween(TODAY, contractEnd(x))} hari lagi`, right: '' })).join('')}</div>` : empty('Tidak ada.'), true)}
  </div>`)}
  ${sec('lnd', 'grad', 'Learning & Development', isHCGA() ? '#/dash-lnd' : '', `<div class="dgrid">
    ${w('Training per bulan', '6 bulan', trMonth)}
    ${w('Budget training per divisi', 'terpakai dari alokasi ' + yr, budget)}
    ${w('Kepuasan per training', 'skala 1–10', kepuasan)}
    ${w('Onboarding berjalan', `${onbRun.length} karyawan baru`, onbRun.length ? `<div class="list mini">${onbRun.map(o => `<div class="trrow"><div class="trh"><b>${esc(user(o.userId).nama)}</b><span class="muted" style="font-size:12px">join ${fds(o.join)}</span></div>${stepLine(onbSteps(o))}</div>`).join('')}</div>` : empty('Tidak ada onboarding berjalan.'), true)}
    ${w('Penilaian 360°', ev360.length ? `rata-rata ${f1(avg(ev360))} / 10` : '', hbar(S.evals.filter(e => evalAvg(e) != null).map(e => ({ label: user(e.userId).nama, sub: e.trainingNama.length > 26 ? e.trainingNama.slice(0, 26) + '…' : e.trainingNama, value: evalAvg(e), tip: `${user(e.userId).nama} · ${e.trainingNama}: ${f1(evalAvg(e))}` })), v => f1(v)))}
  </div>`)}`;
}

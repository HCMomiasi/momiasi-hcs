/* ===== charts (HTML/CSS, single brand hue; tooltips via data-tip) ===== */
const rpc = n => n >= 1e9 ? `Rp ${(n / 1e9).toLocaleString('id-ID', { maximumFractionDigits: 1 })} M` : n >= 1e6 ? `Rp ${(n / 1e6).toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt` : n >= 1e3 ? `Rp ${Math.round(n / 1e3)} rb` : `Rp ${n}`;
function niceStep(raw) { if (raw <= 0) return 1; const p = Math.pow(10, Math.floor(Math.log10(raw))); for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= raw) return m * p; return 10 * p; }

function tile(label, value, note, tone) {
  return `<div class="tile"><div class="tl">${label}</div><div class="tv">${value}</div>${note ? `<div class="tn ${tone || ''}">${note}</div>` : ''}</div>`;
}

// vertical columns; data [{label, value, tip}], last column highlighted & labelled
function colChart(data, fmt, axisFmt) {
  const max = Math.max(1, ...data.map(d => d.value));
  const step = niceStep(max / 4), top = step * Math.ceil(max / step);
  let grid = '';
  for (let v = 0; v <= top + 1e-9; v += step) grid += `<div class="cg" style="bottom:${v / top * 100}%"><span>${(axisFmt || fmt)(v)}</span></div>`;
  const cols = data.map((d, i) => {
    const last = i === data.length - 1;
    return `<div class="cc" data-tip="${esc(d.tip || d.label + ': ' + fmt(d.value))}" tabindex="0"><div class="cb ${last ? 'cur' : ''}" style="height:${d.value / top * 100}%">${last ? `<em>${fmt(d.value)}</em>` : ''}</div><span class="cx">${d.label}</span></div>`;
  }).join('');
  return `<div class="colchart"><div class="cgrid">${grid}</div><div class="ccols">${cols}</div></div>`;
}

// horizontal bars; rows [{label, sub, value, tip}]
function hbar(rows, fmt) {
  const max = Math.max(1, ...rows.map(r => r.value));
  if (!rows.length) return empty('Belum ada data.');
  return `<div class="hbars">${rows.map(r => `<div class="hb" data-tip="${esc(r.tip || r.label + ': ' + fmt(r.value))}" tabindex="0"><div class="hl">${esc(r.label)}${r.sub ? `<small>${r.sub}</small>` : ''}</div><div class="ht"><span style="width:${Math.max(r.value ? 1.5 : 0, r.value / max * 75)}%"></span><b>${fmt(r.value)}</b></div></div>`).join('')}</div>`;
}

// ordinal stages, thin segmented bar + legend with counts
const ORD = ['#5FAF98', '#3E9A82', '#24806B', '#17644F', '#0E4637'];
function segBar(parts) {
  const tot = parts.reduce((a, p) => a + p.value, 0);
  if (!tot) return empty('Tidak ada perjalanan dinas yang sedang berjalan.');
  return `<div class="seg" role="img" aria-label="${parts.map(p => `${p.label} ${p.value}`).join(', ')}">${parts.filter(p => p.value).map(p => `<span style="flex:${p.value};background:${p.color}" data-tip="${esc(p.label)}: ${p.value} (${Math.round(p.value / tot * 100)}%)"></span>`).join('')}</div>
  <div class="seglegend">${parts.map(p => `<a href="${p.href || '#/dinas'}" class="sl"><i style="background:${p.color}"></i><span>${p.label}</span><b class="num">${p.value}</b></a>`).join('')}</div>`;
}

// heatmap rows x cols, values 0..1
const HEAT = ['var(--heat0)', '#CFE9E0', '#9FD3C2', '#5FAF98', '#24806B', '#0E4637'];
function heatmap(rowLabels, colLabels, vals, tipFn) {
  const bin = v => v <= 0 ? 0 : Math.min(5, 1 + Math.floor(v * 5 - 1e-9));
  return `<div class="heat" style="--c:${colLabels.length}"><div></div>${colLabels.map(c => `<div class="hx">${c}</div>`).join('')}
    ${rowLabels.map((r, i) => `<div class="hy">${r}</div>${colLabels.map((c, j) => `<div class="hc" style="background:${HEAT[bin(vals[i][j])]}" data-tip="${esc(tipFn(i, j))}" tabindex="0"></div>`).join('')}`).join('')}</div>
    <div class="hscale"><span>Sepi</span>${HEAT.map(c => `<i style="background:${c}"></i>`).join('')}<span>Penuh</span></div>`;
}

/* ===== dashboard data ===== */
function monthKey(offset) { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() - offset); return iso(d).slice(0, 7); }
function caMonth(ym) { return S.trips.filter(t => t.caPaidAt && t.berangkat.slice(0, 7) === ym).reduce((a, t) => a + t.ca, 0); }
function roomHeat(weeks) {
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], days = [1, 2, 3, 4, 5];
  const vals = days.map(() => hours.map(() => 0));
  let nDays = days.map(() => 0);
  for (let o = 1; o <= weeks * 7; o++) { const dd = addDays(TODAY, -o), wd = dt(dd).getDay(); if (wd >= 1 && wd <= 5) nDays[wd - 1]++; }
  S.roomb.filter(b => b.status === 'disetujui' && b.checkinAt && b.tanggal < TODAY && daysBetween(b.tanggal, TODAY) <= weeks * 7).forEach(b => {
    const wd = dt(b.tanggal).getDay(); if (wd < 1 || wd > 5) return;
    hours.forEach((h, j) => { const ov = Math.max(0, Math.min(toMin(b.selesai), (h + 1) * 60) - Math.max(toMin(b.mulai), h * 60)); vals[wd - 1][j] += ov / 60; });
  });
  const cap = S.rooms.length;
  const norm = vals.map((r, i) => r.map(v => nDays[i] ? v / (nDays[i] * cap) : 0));
  return { hours, days, norm };
}
function heatCard(weeks) {
  const H = roomHeat(weeks);
  return heatmap(['Sen', 'Sel', 'Rab', 'Kam', 'Jum'], H.hours.map(h => pad(h)), H.norm, (i, j) => `${HARIL[i + 1]}, ${pad(H.hours[j])}.00–${pad(H.hours[j] + 1)}.00 · rata-rata ${Math.round(H.norm[i][j] * 100)}% ruang terpakai`);
}

import base64, pathlib
root = pathlib.Path(__file__).parent
src = root / 'src'
html = (src / 'shell.html').read_text()
logo = 'data:image/png;base64,' + base64.b64encode((root / 'assets' / 'logo-full.png').read_bytes()).decode()
bell = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>'
js = '\n'.join((src / f).read_text() for f in ['forms.js', 'data.js', 'charts.js', 'views.js', 'i18n-en.js', 'i18n.js', 'aset.js', 'lnd.js', 'ta.js', 'dash.js', 'home.js', 'app.js'])
html = html.replace('/*CSS*/', (src / 'app.css').read_text()).replace('%BELL%', bell).replace('%LOGO%', logo).replace('/*JS*/', js)
(root / 'index.html').write_text(html)
print('built', len(html)//1024, 'KB')

# ---- artifact build (no doctype/html/head/body; no Leaflet; flag) ----
import re
art = html
art = re.sub(r'<!doctype html>\s*<html[^>]*>\s*<head>', '', art, flags=re.I)
art = re.sub(r'<meta charset="utf-8">\s*<meta name="viewport"[^>]*>', '', art)
art = re.sub(r'<link rel="stylesheet" href="https://cdnjs[^>]*>\s*<script src="https://cdnjs[^>]*></script>', '', art)
art = art.replace('</head>\n<body>', '').replace('</body>\n</html>', '')
art = art.replace('<script>\nconst LOGO_SRC', '<script>\nwindow.__HCS_ARTIFACT__ = true;\nconst LOGO_SRC', 1)
(root / 'artifact').mkdir(exist_ok=True)
(root / 'artifact' / 'momiasi-hcs.html').write_text(art)
print('artifact', len(art)//1024, 'KB', 'leaflet' in art.lower(), '<head>' in art, '__HCS_ARTIFACT__' in art)

# ---- cloud build (GitHub Pages + Supabase) -> ../momiasi-hcs/docs/index.html ----
CLOUD = {'url': 'https://yfrdbidnkceuvulsccdr.supabase.co', 'key': 'sb_publishable_Qs5XY6uaB6221sFajGKQMw_Iu8fgmA2'}
def sub(s, a, b, n=1):
    assert s.count(a) >= n, ('patch tidak cocok', a[:70])
    return s.replace(a, b)
cj = {f: (src / f).read_text() for f in ['forms.js', 'data.js', 'charts.js', 'views.js', 'i18n-en.js', 'i18n.js', 'aset.js', 'lnd.js', 'ta.js', 'dash.js', 'home.js', 'app.js', 'cloud.js']}
cj['data.js'] = sub(cj['data.js'], "try { S = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { S = null; }\nif (!S || S.v !== 10) S = seed();", "S = null;")
cj['ta.js'] = sub(cj['ta.js'], 'const fakeLink =', 'let fakeLink =')
cj['ta.js'] = sub(cj['ta.js'], "const id = 'u' + uid()", "const id = crypto.randomUUID()")
cj['app.js'] = sub(cj['app.js'], "id: 'u' + uid()", "id: crypto.randomUUID()", 2)
cj['app.js'] = sub(cj['app.js'], "['login', 'aktivasi', 'layar'].includes(p0)", "['login', 'aktivasi', 'layar', 'konfirmasi', 'offer'].includes(p0)")
cj['app.js'] = sub(cj['app.js'], "toast(`Undangan terkirim ke ${email}`)", "toast(`Akun ${email} dibuat · kirim link aktivasi lewat tombol Undangan`)")
cj['app.js'] = sub(cj['app.js'], "toast(`${n} karyawan diimport, undangan terkirim`)", "toast(`${n} karyawan diimport · kirim link aktivasi lewat tombol Undangan`)")
cj['app.js'] = sub(cj['app.js'], "Sistem membuat akun & mengirim email undangan ke semua karyawan sekaligus.", "Sistem membuat akun semua karyawan sekaligus; link aktivasi dikirim per orang lewat WhatsApp / email.")
tail = "$('#persona').innerHTML = Object.keys(PERSONA)"
i = cj['app.js'].index(tail); cj['app.js'] = cj['app.js'][:i]
chtml = (src / 'shell.html').read_text()
chtml = re.sub(r'<div class="demo">.*?</div>\n', '<select id="persona" hidden></select>\n', chtml, count=1)
chtml = sub(chtml, '</head>', '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js"></script>\n</head>')
chtml = chtml.replace('/*CSS*/', (src / 'app.css').read_text()).replace('%BELL%', bell).replace('%LOGO%', logo)
chtml = chtml.replace('/*JS*/', 'window.__HCS_CLOUD__ = ' + __import__('json').dumps(CLOUD) + ';\n' + '\n'.join(cj.values()))
out = root.parent / 'docs'
out.mkdir(parents=True, exist_ok=True)
(out / 'index.html').write_text(chtml)
(out / '.nojekyll').write_text('')
print('cloud', len(chtml)//1024, 'KB')

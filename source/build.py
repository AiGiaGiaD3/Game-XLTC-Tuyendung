import base64,json,re
from pathlib import Path
root=Path(__file__).parent
cases=json.loads((root/'cases.json').read_text())
distractors=json.loads((root/'game-content.json').read_text())
assert len(cases)==len(distractors)==30
assert [c['id'] for c in cases]==list(range(1,31))
assert all(len(c['s'])==4 and all(len(s)==2 for s in c['s']) for c in cases)
assert all(len(d)==4 and len(set(d))==4 for d in distractors)
html=(root/'template.html').read_text().replace('__CASES__',json.dumps(cases,ensure_ascii=False)).replace('__DISTRACTORS__',json.dumps(distractors,ensure_ascii=False))
font_css = []
for name, weight in [('Regular', 400), ('Bold', 700)]:
    font_path = root / 'fonts' / f'NotoSans-{name}.woff'
    data = base64.b64encode(font_path.read_bytes()).decode('ascii')
    font_css.append(f"@font-face{{font-family:'Noto Sans';src:url(data:font/woff;base64,{data}) format('woff');font-weight:{weight};font-display:swap}}")
html = html.replace('__MISSIONS__', (root / 'missions.js').read_text())
html = html.replace('__ROUTES__', (root / 'routes.js').read_text())
font_license = (root / 'fonts' / 'LICENSE.txt').read_text()
html = html.replace('__REFINE_CSS__', '\n'.join(font_css) + '\n' + (root / 'refine.css').read_text())
html = html.replace('__AUDIO__', (root / 'audio.js').read_text()).replace('__SCENERY__', (root / 'scenery.js').read_text())
html = html.replace('</head>', '<!-- Embedded font license\n' + font_license.replace('--', '—') + '\n-->\n</head>', 1)
assert '__CASES__' not in html and '__DISTRACTORS__' not in html
(root/'dist').mkdir(exist_ok=True)
(root/'dist/index.html').write_text(html)
(root/'check.js').write_text(re.search(r'<script>(.*?)</script>',html,re.S).group(1))
print('Built 30 cases, 120 source steps, 120 custom distractors. Standalone HTML:',len(html.encode()),'bytes')

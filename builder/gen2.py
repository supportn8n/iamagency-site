# -*- coding: utf-8 -*-
import re
html = open('builder/utp.figma.html', encoding='utf-8').read()
html = re.sub(r'<!--.*?-->', '', html, flags=re.S).strip()
# убрать вязку 71 3 (она сквозная из Hero)
html = re.sub(r'<img layer-name="71 3"[^>]*>', '', html)
# картинки builder -> локальные
imgmap = {
    'e7775a39b8adc5f34790c9f5539178fdb3344366': '/utp/ring1.png',
    '20d2cd9f7fce1222b9645e576bc5e76832e5bef9': '/utp/ring2.png',
    'def89a043bb18e7011089b62f6edeaa577292b2d': '/utp/ring3.png',
}
def repl_img(m):
    u = m.group(1)
    for k, v in imgmap.items():
        if k in u:
            return 'src="' + v + '"'
    return m.group(0)
html = re.sub(r'src="(https://api\.builder\.io/api/v1/image/assets/TEMP/[^"]+)"', repl_img, html)
# корневой div -> нативный холст 1440x1024, прозрачный
html = re.sub(r'<div layer-name="УТП" style="[^"]*">',
              '<div style="position:absolute;left:0;top:0;width:1440px;height:1024px;overflow:hidden">', html, count=1)
# Coolvetica -> Oswald
html = html.replace('Coolvetica', 'Oswald')
# экранирование для template literal
esc = html.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
open('src/app/blocks/utpHtml.ts', 'w', encoding='utf-8').write('export const utpHtml = `' + esc + '`;\n')
print('native-px utpHtml.ts ok, len', len(html))

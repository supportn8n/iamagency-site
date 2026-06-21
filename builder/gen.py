# -*- coding: utf-8 -*-
import re
html = open('builder/utp.converted.html', encoding='utf-8').read()
# корневой div -> прозрачный, вписать во фрейм
html = re.sub(r'<div layer-name="УТП" style="[^"]*">',
              '<div style="position:absolute;inset:0;overflow:hidden">', html, count=1)
# Coolvetica -> Oswald (нет Coolvetica)
html = html.replace('Coolvetica', 'Oswald')
# экранирование для JS template literal
esc = html.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
open('src/app/blocks/utpHtml.ts', 'w', encoding='utf-8').write('export const utpHtml = `' + esc + '`;\n')
print('utpHtml.ts ok, len', len(html))

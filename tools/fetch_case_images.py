# -*- coding: utf-8 -*-
# Скачивает фото кейсов для страниц /case/* в обход лимита Figma render API.
# Метод: /v1/files/<key>/images отдаёт imageRef -> S3 URL (лимита нет),
# качаем исходник по ссылке и режем локально по cropTransform из манифестов.
import sys, io, os, json, ssl, glob, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace', line_buffering=True)
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'src', 'app', 'keisy', 'gen')
OUT = os.path.join(ROOT, 'public', 'blk', 'keisy')
RAW = os.path.join(ROOT, '.loop', 'raw-fills')  # кэш исходников по imageRef
os.makedirs(OUT, exist_ok=True); os.makedirs(RAW, exist_ok=True)
CTX = ssl.create_default_context(); CTX.check_hostname = False; CTX.verify_mode = ssl.CERT_NONE
KEY = '7FkQtMfKX8eVLRVBJa11kY'

# токен из .mcp.json
mcp = open(os.path.join(os.path.dirname(ROOT), '.mcp.json'), encoding='utf-8').read()
import re
TOK = re.search(r'figd_[A-Za-z0-9_-]+', mcp).group(0)

def http(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {})
    return urllib.request.urlopen(req, context=CTX, timeout=60).read()

print('Получаю карту imageRef -> URL ...')
fills = json.loads(http('https://api.figma.com/v1/files/%s/images' % KEY,
                        {'X-Figma-Token': TOK}))['meta']['images']
print('  ссылок:', len(fills))

def raw_image(ref):
    """скачивает исходник по imageRef (с кэшем на диске), возвращает PIL.Image"""
    p = os.path.join(RAW, ref + '.bin')
    if not os.path.exists(p):
        url = fills.get(ref)
        if not url:
            return None
        for attempt in range(3):
            try:
                data = urllib.request.urlopen(url, context=CTX, timeout=30).read()
                open(p, 'wb').write(data)
                break
            except Exception as e:
                print('  ! таймаут/ошибка скачивания', ref, 'попытка', attempt + 1, e)
                if attempt == 2:
                    return None
    try:
        return Image.open(p).convert('RGBA')
    except Exception as e:
        print('  ! битый исходник', ref, e); return None

def crop(img, ct):
    """ct = [[sx,0,tx],[0,sy,ty]] -> обрезка исходника до видимой области"""
    W, H = img.size
    if not ct:
        return img
    sx, _, tx = ct[0]; _, sy, ty = ct[1]
    l = tx * W; t = ty * H; r = (tx + sx) * W; b = (ty + sy) * H
    l = max(0, min(W, l)); r = max(0, min(W, r))
    t = max(0, min(H, t)); b = max(0, min(H, b))
    if r - l < 1 or b - t < 1:
        return img
    return img.crop((int(round(l)), int(round(t)), int(round(r)), int(round(b))))

manifests = sorted(glob.glob(os.path.join(GEN, '*.images.json')))
total = done = skip = fail = 0
for mf in manifests:
    entries = json.load(open(mf, encoding='utf-8'))
    for e in entries:
        total += 1
        ref = e.get('imageRef')
        if not ref:
            skip += 1; continue
        base = e['fileName'][:-4] if e['fileName'].endswith('.png') else e['fileName']
        suf = e.get('suffix')
        out = os.path.join(OUT, base + (('-' + suf) if suf else '') + '.png')
        if os.path.exists(out):
            done += 1; continue
        img = raw_image(ref)
        if img is None:
            fail += 1; continue
        try:
            crop(img, e.get('cropTransform')).save(out)
            done += 1
        except Exception as ex:
            print('  ! crop fail', e['fileName'], ex); fail += 1
    print('  %s: готово %d, пропущено(без ref) %d, ошибок %d' % (os.path.basename(mf), done, skip, fail))

print('ИТОГО: всего %d, сохранено %d, без ref %d, ошибок %d' % (total, done, skip, fail))

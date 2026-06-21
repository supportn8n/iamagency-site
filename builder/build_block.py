# -*- coding: utf-8 -*-
import re, os, ssl, urllib.request
ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE

BLOCKS = [
    # ("hero", "pxl7mc1exqrmqljdrje", "Hero"),  # ФИНАЛ: фигуры заменены на оригиналы вручную, НЕ перегенерировать
    # ("utp", "gdbb9rilttrmqljdrjg", "УТП"),  # ФИНАЛ: оранжевый пончик + размер карточек правлены вручную
    ("uslugi",    "vjbwgkmwjnmqljdrk6",  "Услуги"),
    # ("tarify", "x4g1lbpbbfemqljdrk5", "Тарифы"),  # ФИНАЛ: кнопка+фигура правлены
    # ("portfolio", "mg2juj0h86cmqljdrk2", "Портфолио"),  # ФИНАЛ: убраны квадраты у «+»
    ("marketing", "werp5rxey6hmqljdrk0", "Маркетинг"),
    ("napravleniya", "j674u45e88dmqliwj6j", "Направления"),
    ("keysy", "apeb02a2lkdmqliwj6m", "Кейсы"),
    ("sozdanie", "s7nsthpckxmqliwj6s", "Создание"),
    ("qa", "7bban6jd39pmqliwj6u", "Q&A"),
    ("process", "woxje2u098fmqliwj6x", "Процесс"),
    ("skidka", "b7nkaihbjgemqliwj6z", "Скидка"),
    ("otzyvy",    "mgm0ucstvlmqljdrjy",  "Отзывы"),
    ("shkola",    "c78itgfxajqmqljdrka", "Школа"),
    ("blog",      "afj90ai3izvmqljdrjm", "Блог"),
    ("kontakty",  "ngv45ysqnemqljdrjw",  "Контакты"),
    ("futer",     "vjh2nyv2kxsmqlgusc5", "Футер"),
]

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=60, context=ctx).read()

os.makedirs("src/app/blocks/gen", exist_ok=True)
for slug, aid, ru in BLOCKS:
    try:
        html = fetch("https://api.builder.io/api/v1/file/assets/TEMP/" + aid).decode("utf-8", "replace")
    except Exception as e:
        print(slug, "FETCH ERR", str(e)[:60]); continue
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S).strip()
    # скачать картинки
    assetdir = "public/blk/" + slug
    os.makedirs(assetdir, exist_ok=True)
    urls = re.findall(r'src="(https://api\.builder\.io/api/v1/image/assets/TEMP/[^"]+)"', html)
    seen = {}
    for u in urls:
        if u in seen: continue
        key = re.search(r"assets/TEMP/([a-f0-9]+)", u)
        key = key.group(1)[:12] if key else str(len(seen))
        fn = f"{assetdir}/{key}.png"
        local = f"/blk/{slug}/{key}.png"
        try:
            data = fetch(u)
            open(fn, "wb").write(data)
            seen[u] = local
        except Exception as e:
            print("  img err", str(e)[:40]); seen[u] = u  # оставить исходный url
    for u, l in seen.items():
        html = html.replace(u, l)
    # корневой div -> нативный холст 1440xH (сохранить фон+реальную высоту, сбросить позицию)
    m = re.search(r'<div layer-name="[^"]*" style="([^"]*)">', html)
    bg = ""; H = 1024
    if m:
        bgm = re.search(r"(background:[^;]+)", m.group(1))
        if bgm: bg = bgm.group(1) + ";"
        hm = re.search(r"height:\s*([0-9.]+)px", m.group(1))
        if hm: H = int(round(float(hm.group(1))))
    html = re.sub(r'<div layer-name="[^"]*" style="[^"]*">',
                  f'<div style="position:absolute;left:0;top:0;width:1440px;height:{H}px;{bg}overflow:hidden">',
                  html, count=1)
    # Coolvetica подключён @font-face (с кириллицей) — НЕ подменяем
    # Однострочные тексты (height ≈ font-size) — НЕ переносить, иначе 2 строки наезжают
    def _nowrap(m):
        s = m.group(1)
        fs = re.search(r"font-size:([0-9.]+)px", s)
        h = re.search(r"height:([0-9.]+)px", s)
        if fs and h and "line-height" in s and "white-space" not in s:
            if float(h.group(1)) < float(fs.group(1)) * 1.5:
                return 'style="' + s + ';white-space:nowrap"'
        return m.group(0)
    html = re.sub(r'style="([^"]*)"', _nowrap, html)
    esc = html.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    open(f"src/app/blocks/gen/{slug}Html.ts", "w", encoding="utf-8").write(
        f"// {ru} — из Builder.io (Figma→HTML)\nexport const {slug}H = {H};\nexport const {slug}Html = `{esc}`;\n")
    imgs = len([v for v in seen.values() if v.startswith("/blk/")])
    print(f"OK {slug} ({ru}): {H}px высота, html {len(html)} симв, картинок {imgs}")
print("ГОТОВО")

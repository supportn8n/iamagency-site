// Заменяет серые div-заглушки в src/app/keisy/gen/*Html.ts на <img>,
// но только для тех узлов, чья картинка реально скачана в public/blk/keisy.
// Идемпотентно: если файла ещё нет — заглушка остаётся, повторный запуск дозаменит.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const GEN = path.join(ROOT, "src", "app", "keisy", "gen");
const OUT = path.join(ROOT, "public", "blk", "keisy");
const have = new Set(fs.readdirSync(OUT).filter((f) => f.endsWith(".png")));

const modules = [
  "beauty", "fashion", "sport", "experts", "realEstate",
  "tourism", "cars", "horeca", "product", "events",
];
const manifestFor = (m) => {
  // манифесты названы по-разному: beautyHtml.images.json vs cars.images.json
  const a = path.join(GEN, m + "Html.images.json");
  if (fs.existsSync(a)) return a;
  const b = path.join(GEN, m.toLowerCase() + ".images.json");
  if (fs.existsSync(b)) return b;
  return null;
};

let totalReplaced = 0;
for (const m of modules) {
  const file = path.join(GEN, m + "Html.ts");
  const mf = manifestFor(m);
  if (!fs.existsSync(file) || !mf) { console.log("SKIP", m); continue; }
  const entries = JSON.parse(fs.readFileSync(mf, "utf8"));
  // ключ nodeId|imageRef -> имя файла на диске
  const map = {};
  for (const e of entries) {
    if (!e.imageRef) continue;
    const base = e.fileName.endsWith(".png") ? e.fileName.slice(0, -4) : e.fileName;
    const fname = base + (e.suffix ? "-" + e.suffix : "") + ".png";
    map[e.nodeId + "|" + e.imageRef] = fname;
  }
  let s = fs.readFileSync(file, "utf8");
  let n = 0;
  // заглушки вида: <div style="..." data-figma-node="ID" data-image-ref="REF"></div>
  s = s.replace(
    /<div style="([^"]*)"[^>]*?data-figma-node="([^"]*)"[^>]*?data-image-ref="([^"]*)"[^>]*><\/div>/g,
    (full, style, node, ref) => {
      const fname = map[node + "|" + ref];
      if (!fname || !have.has(fname)) return full; // нет картинки — оставляем заглушку
      // из стиля убираем фон-заглушку, добавляем object-fit
      const st = style
        .replace(/background:[^;]*;?/g, "")
        .replace(/;;+/g, ";");
      n++;
      return `<img src="/blk/keisy/${fname}" alt="" loading="lazy" style="${st};object-fit:cover;" />`;
    }
  );
  if (n > 0) fs.writeFileSync(file, s);
  totalReplaced += n;
  console.log(`${m}: заменено ${n}`);
}
console.log("ИТОГО заменено заглушек:", totalReplaced);

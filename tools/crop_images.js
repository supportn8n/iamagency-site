// Обрезает картинки кейсов по cropTransform из дампа Figma (сырой imageRef
// скачан целиком, а показывать надо только видимую область — логотип/кадр).
// Идемпотентно: исходник кладём в .loop/rawsrc и всегда режем из него.
// ponytail: только осевая обрезка (b=c≈0); повёрнутые кропы пропускаем (их единицы).
const fs = require("fs"), path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const KEISY = path.join(ROOT, "public/blk/keisy");
const GEN = path.join(ROOT, "src/app/keisy/gen");
const RAW = path.join(ROOT, ".loop/rawsrc");
const DUMP = "C:/Users/gromo/.claude/projects/c--Users-gromo-OneDrive------------------/222a8fd2-e497-41d8-bdc4-8c77178ce89a/tool-results/mcp-figma-get_figma_data-1782997296413.txt";
fs.mkdirSync(RAW, { recursive: true });

const filter = process.argv[2]; // необяз. подстрока имени файла для теста

// карта imageRef|suffix -> {a,b,tx,c,d,ty}
const dump = fs.readFileSync(DUMP, "utf8");
const re = /"imageRef":"([0-9a-f]+)"[^}]*?"cropTransform":\[\[([-\d.eE]+),([-\d.eE]+),([-\d.eE]+)\],\[([-\d.eE]+),([-\d.eE]+),([-\d.eE]+)\]\][^}]*?"filenameSuffix":"(\w+)"/g;
const cm = {};
let m;
while ((m = re.exec(dump))) {
  const [, ref, a, b, tx, c, d, ty, suf] = m;
  cm[ref + "|" + suf] = { a: +a, b: +b, tx: +tx, c: +c, d: +d, ty: +ty };
}
console.log("матриц обрезки в дампе:", Object.keys(cm).length);

(async () => {
  let cropped = 0, skipRot = 0, noMatrix = 0, noFile = 0;
  for (const mf of fs.readdirSync(GEN).filter((f) => f.endsWith(".images.json"))) {
    for (const e of JSON.parse(fs.readFileSync(path.join(GEN, mf), "utf8"))) {
      if (!e.imageRef || !e.needsCropping) continue;
      const base = e.fileName.endsWith(".png") ? e.fileName.slice(0, -4) : e.fileName;
      const fn = base + (e.suffix ? "-" + e.suffix : "") + ".webp";
      if (filter && !fn.includes(filter)) continue;
      const dst = path.join(KEISY, fn);
      if (!fs.existsSync(dst)) { noFile++; continue; }
      const mat = cm[e.imageRef + "|" + (e.suffix || "")];
      if (!mat) { noMatrix++; continue; }
      if (Math.abs(mat.b) > 0.001 || Math.abs(mat.c) > 0.001) { skipRot++; continue; }

      // сохранить сырой исходник один раз
      const raw = path.join(RAW, fn);
      if (!fs.existsSync(raw)) fs.copyFileSync(dst, raw);

      const img = sharp(raw);
      const meta = await img.metadata();
      const W = meta.width, H = meta.height;
      let left = Math.round(mat.tx * W), top = Math.round(mat.ty * H);
      let w = Math.round(mat.a * W), h = Math.round(mat.d * H);
      // клампы
      left = Math.max(0, Math.min(left, W - 1));
      top = Math.max(0, Math.min(top, H - 1));
      w = Math.max(1, Math.min(w, W - left));
      h = Math.max(1, Math.min(h, H - top));
      try {
        await sharp(raw).extract({ left, top, width: w, height: h }).webp({ quality: 82 }).toFile(dst + ".tmp");
        fs.renameSync(dst + ".tmp", dst);
        cropped++;
      } catch (err) { console.log("! fail", fn, err.message); }
    }
  }
  console.log(`обрезано: ${cropped}, повёрнутых пропущено: ${skipRot}, без матрицы: ${noMatrix}, нет файла: ${noFile}`);
})();

const fs = require("fs"), path = require("path");
const GEN = path.resolve(__dirname, "..", "src/app/keisy/gen");
const OUT = path.resolve(__dirname, "..", "public/blk/keisy");
const have = new Set(fs.readdirSync(OUT).filter((f) => f.endsWith(".png")));

// карта node|ref -> файл (только реально существующие)
const map = {};
for (const mf of fs.readdirSync(GEN).filter((f) => f.endsWith(".images.json"))) {
  for (const e of JSON.parse(fs.readFileSync(path.join(GEN, mf), "utf8"))) {
    if (!e.imageRef) continue;
    const base = e.fileName.endsWith(".png") ? e.fileName.slice(0, -4) : e.fileName;
    const fn = base + (e.suffix ? "-" + e.suffix : "") + ".png";
    if (have.has(fn)) map[e.nodeId + "|" + e.imageRef] = fn;
  }
}
fs.writeFileSync(path.join(GEN, "_imageMap.json"), JSON.stringify(map));
console.log("в карте", Object.keys(map).length, "картинок");

// новое тело ph
const D = "$"; // чтобы не путаться
const newPh =
  "const ph = ($1) => {\n" +
  "  const _f = (IMGMAP as Record<string, string>)[node + \"|\" + (ref || \"\")];\n" +
  "  if (_f) return `<img src=\"/blk/keisy/${_f}\" alt=\"\" loading=\"lazy\" style=\"position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;${r ? `border-radius:${r};` : \"\"}object-fit:cover;\" />`;\n" +
  "  return `<div style=\"position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${PH};${r ? `border-radius:${r};` : \"\"}\" data-figma-node=\"${node}\"${ref ? ` data-image-ref=\"${ref}\"` : \"\"}></div>`;\n" +
  "};";

// матчим определение ph (стрелка с одним template-выражением, заканчивается на `;)
const phRe = /const ph = \(([\s\S]*?)\) =>\s*`<div style="position:absolute;left:\$\{x\}px;[\s\S]*?<\/div>`;/;

let patched = 0;
for (const f of fs.readdirSync(GEN).filter((f) => f.endsWith("Html.ts"))) {
  const p = path.join(GEN, f);
  let s = fs.readFileSync(p, "utf8");
  if (!phRe.test(s)) continue;
  if (s.includes("_imageMap.json")) { console.log("уже пропатчен", f); continue; }
  const args = s.match(phRe)[1];
  s = 'import IMGMAP from "./_imageMap.json";\n' + s;
  s = s.replace(phRe, newPh.replace("$1", args));
  fs.writeFileSync(p, s);
  patched++;
  console.log("patched", f);
}
console.log("пропатчено модулей:", patched);

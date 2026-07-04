// Делает пилюли-ники кликабельными ссылками на Instagram: если href не задан,
// а текст похож на @ник — ставит https://instagram.com/<ник>.
// ponytail: покрывает две формы pill (блочную и выражением); что не совпало — логируем.
const fs = require("fs"), path = require("path");
const GEN = path.resolve(__dirname, "..", "src/app/keisy/gen");

const HELPER =
  'const instaFrom = (t: string) => { const u = String(t).trim().replace(/^@/, ""); return /^[\\w.]+$/.test(u) ? "https://instagram.com/" + u : ""; };\n';

// блочная: return href ? `<a href="${href}"...` : `<div style="${st}">${text}</div>`;
const blockRe = /return href\s*\n?\s*\?\s*`<a href="\$\{href\}"([\s\S]*?)`\s*\n?\s*:\s*`<div style="\$\{st\}">\$\{text\}<\/div>`;/;
// выражением: ) =>\n href\n ? `<a href="${href}"...` : `<div ...`;
const exprRe = /\) =>\s*\n?\s*href\s*\n?\s*\?\s*`<a href="\$\{href\}"([\s\S]*?)`\s*\n?\s*:\s*(`<div[\s\S]*?`);/;

let done = 0, miss = [];
for (const f of fs.readdirSync(GEN).filter((x) => x.endsWith("Html.ts"))) {
  const p = path.join(GEN, f);
  let s = fs.readFileSync(p, "utf8");
  if (!/const pill = \(/.test(s)) continue;
  if (s.includes("instaFrom")) { done++; continue; }
  let patched = false;
  if (blockRe.test(s)) {
    s = s.replace(blockRe, 'const _h = href || instaFrom(text);\n  return _h ? `<a href="${_h}"$1` : `<div style="${st}">${text}</div>`;');
    patched = true;
  } else if (exprRe.test(s)) {
    s = s.replace(exprRe, ') => { const _h = href || instaFrom(text); return _h ? `<a href="${_h}"$1` : $2; }');
    patched = true;
  }
  if (!patched) { miss.push(f); continue; }
  s = s.replace(/const pill = \(/, HELPER + "const pill = (");
  fs.writeFileSync(p, s);
  done++;
  console.log("pill-links:", f);
}
console.log("готово:", done, miss.length ? "не совпало: " + miss.join(",") : "");

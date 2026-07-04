// Задачи 2/3/4-остаток по модулям кейсов.
const fs = require("fs"), path = require("path");
const GEN = path.resolve(__dirname, "..", "src/app/keisy/gen");

const LINK_SVG = (x, y) =>
  `<svg style="position:absolute;left:${x}px;top:${y}px;width:36.56px;height:36.56px" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

let stat = { nowrap: 0, iconPh: 0, iconLit: 0, nick: 0 };
for (const f of fs.readdirSync(GEN).filter((x) => x.endsWith("Html.ts"))) {
  const p = path.join(GEN, f);
  let s = fs.readFileSync(p, "utf8");

  // Задача 2: заголовок кейса (47.4px) не переносить
  s = s.replace(/(font-size:47\.4px;[^"]*?)white-space:pre-line/g, (m, a) => { stat.nowrap++; return a + "white-space:nowrap"; });

  // Задача 3: иконка case-title -> линк-SVG
  // ph-модули: ${ph(x, y, 36.56, 36.56, "...", "...")}
  s = s.replace(/\$\{ph\(([\d.]+), ([\d.]+), 36\.56, 36\.56, "[^"]*", "[^"]*"\)\}/g, (m, x, y) => { stat.iconPh++; return LINK_SVG(x, y); });
  // literal-модули: <div ...width:36.56px;height:36.56px;background:#E5E3E0;" data-figma-node="..."></div>
  s = s.replace(/<div style="position:absolute;left:([\d.]+)px;top:([\d.]+)px;width:36\.56px;height:36\.56px;background:#E5E3E0;" data-figma-node="[^"]*"><\/div>/g, (m, x, y) => { stat.iconLit++; return LINK_SVG(x, y); });

  // Задача 4-остаток: ники-пилюли в literal-модулях -> ссылка на Instagram
  s = s.replace(
    /(<div style="[^"]*border:0\.\d+px solid #272727;[^"]*border-radius:20\.\d+px;">)(\s*<div style="[^"]*">)([\w.]+)(<\/div>\s*<\/div>)/g,
    (m, open, mid, user, close) => { stat.nick++; return `<a href="https://instagram.com/${user}" target="_blank" rel="noopener" style="text-decoration:none;">${open}${mid}${user}${close}</a>`; }
  );

  fs.writeFileSync(p, s);
}
console.log(JSON.stringify(stat));

// Перебирает 10 модулей кейсов и заменяет весь блок хлебной крошки на ровный
// flex-ряд с одинаковыми отступами: Главная → Кейсы → NAME.
const fs = require("fs"), path = require("path");
const GEN = path.resolve(__dirname, "..", "src/app/keisy/gen");

const FONT =
  "font-family:Inter,sans-serif;font-weight:500;font-size:23.42px;line-height:1;letter-spacing:-0.05em;text-transform:uppercase;";

// контейнер крошки: <div ...left:65px;top:30px...> ... </div> (внутри только a/span)
const re = /<div style="position:absolute;left:65px;top:30px;[^"]*">[\s\S]*?<\/div>/;
// NAME — последний <span>…</span> перед закрытием обёртки и контейнера
const nameRe = />([^<]+)<\/span><\/span>\s*<\/div>|color:#1C1C1C[^"]*">([^<]+)<\/span>/;

let fixed = 0;
for (const f of fs.readdirSync(GEN).filter((x) => x.endsWith("Html.ts"))) {
  const p = path.join(GEN, f);
  let s = fs.readFileSync(p, "utf8");
  const m = s.match(re);
  if (!m) { console.log("нет крошки:", f); continue; }
  const nm = m[0].match(nameRe);
  const name = (nm ? nm[1] || nm[2] : "").trim();
  if (!name) { console.log("не нашёл NAME:", f); continue; }
  const repl =
    `<div style="position:absolute;left:65px;top:30px;display:flex;gap:13px;align-items:baseline;white-space:nowrap;${FONT}">` +
    `<a href="/" style="color:#9A9895;text-decoration:none;">Главная</a>` +
    `<span style="color:#9A9895;">→</span>` +
    `<a href="/keisy" style="color:#9A9895;text-decoration:none;">Кейсы</a>` +
    `<span style="color:#9A9895;">→</span>` +
    `<span style="color:#1C1C1C;">${name}</span>` +
    `</div>`;
  s = s.replace(re, repl);
  fs.writeFileSync(p, s);
  fixed++;
  console.log("исправлено:", f, "->", name);
}
console.log("ИТОГО исправлено:", fixed);

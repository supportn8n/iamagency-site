const base = "http://localhost:3010";
const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
  match[1].replace(/^https?:\/\/[^/]+/, base),
);

let images = 0;
let missing = 0;
let empty = 0;
let generic = 0;
let old = 0;
const sources = new Set();

for (const url of urls) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const html = await response.text();

  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    images += 1;
    const src = tag.match(/\bsrc=["']([^"']*)/i)?.[1];
    if (src) sources.add(new URL(src.replaceAll("&amp;", "&"), base).href);

    const alt = tag.match(/\balt=["']([^"']*)["']/i)?.[1];
    if (alt === undefined) missing += 1;
    else if (!alt.trim()) empty += 1;

    if (alt?.startsWith("кейс I AM AGENCY -")) generic += 1;
    if (alt?.includes(": пример работы")) old += 1;
  }
}

const sourceUrls = [...sources];
const failures = [];
for (let index = 0; index < sourceUrls.length; index += 12) {
  await Promise.all(
    sourceUrls.slice(index, index + 12).map(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) failures.push(`${response.status} ${url}`);
      } catch {
        failures.push(`ERR ${url}`);
      }
    }),
  );
}

console.log(
  JSON.stringify(
    {
      pages: urls.length,
      images,
      meaningful: images - missing - empty,
      decorative: empty,
      missing,
      genericLegacy: generic,
      oldCasePattern: old,
      uniqueSources: sourceUrls.length,
      brokenSources: failures.length,
      failures: failures.slice(0, 10),
    },
    null,
    2,
  ),
);

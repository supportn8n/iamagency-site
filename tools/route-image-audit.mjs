const baseUrl = (process.argv[2] || "http://localhost:3010").replace(/\/$/, "");
const routes = [
  "/",
  "/marketing",
  "/keisy",
  "/case/beauty",
  "/uslugi/vedenie-sotssetey",
  "/tarify/dvizhenie",
  "/shkola-smm",
  "/blog",
];
const sampleAssets = [
  "/blk/keysy/7d58232e25cf.webp",
  "/partners/logos.webp",
  "/apple-icon.png",
];

let failed = false;

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`);
  const html = await response.text();
  const sources = [...html.matchAll(/<img[^>]+src=["']([^"']+)/gi)].map((match) => match[1]);
  const nonModernRaster = sources.filter((source) => /\.(?:png|jpe?g|gif)(?:\?|$)/i.test(source));
  const missingDimensions = [...html.matchAll(/<img\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => !/\bwidth\s*[:=]/i.test(tag) || !/\bheight\s*[:=]/i.test(tag));

  if (!response.ok || nonModernRaster.length > 0) failed = true;
  console.log(JSON.stringify({
    route,
    status: response.status,
    images: sources.length,
    nonModernRaster,
    imagesWithoutStableDimensions: missingDimensions.length,
    missingDimensionSamples: missingDimensions.slice(0, 5).map((tag) => {
      const source = tag.match(/src=["']([^"']+)/i)?.[1] || "unknown";
      return source.slice(0, 180);
    }),
  }));
}

for (const asset of sampleAssets) {
  const response = await fetch(`${baseUrl}${asset}`);
  const bytes = (await response.arrayBuffer()).byteLength;
  if (!response.ok) failed = true;
  console.log(JSON.stringify({
    asset,
    status: response.status,
    contentType: response.headers.get("content-type"),
    cacheControl: response.headers.get("cache-control"),
    bytes,
  }));
}

if (failed) process.exitCode = 1;

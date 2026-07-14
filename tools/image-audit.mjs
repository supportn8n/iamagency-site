import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "src");
const publicRoot = path.join(root, "public");
const convert = process.argv.includes("--convert");
const recompressWebp = process.argv.includes("--recompress-webp");
const sourceExtensions = new Set([".ts", ".tsx", ".css", ".json"]);
const rasterExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"]);
const pathPattern = /\/[A-Za-z0-9_@().+\-/]+\.(?:png|jpe?g|gif|webp|avif|svg)/gi;
const conversionExceptions = new Set(["/apple-icon.png"]);

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

const sourceFiles = (await walk(sourceRoot)).filter((file) => sourceExtensions.has(path.extname(file)));
const sourceContents = new Map();
const references = new Set();

for (const file of sourceFiles) {
  const content = await fs.readFile(file, "utf8");
  sourceContents.set(file, content);
  for (const match of content.matchAll(pathPattern)) {
    if (!match[0].startsWith("//")) references.add(match[0]);
  }
}

for (const reference of [...references]) {
  const isBareSelector = reference.slice(1).includes("/") === false
    && [...references].some((candidate) => candidate !== reference && candidate.endsWith(reference));
  if (isBareSelector) references.delete(reference);
}

const rows = [];
for (const reference of [...references].sort()) {
  let localPath = path.join(publicRoot, ...reference.slice(1).split("/"));
  let stat;
  try {
    stat = await fs.stat(localPath);
  } catch {
    const appMetadataPath = path.join(sourceRoot, "app", ...reference.slice(1).split("/"));
    try {
      stat = await fs.stat(appMetadataPath);
      localPath = appMetadataPath;
    } catch {
      rows.push({ reference, missing: true });
      continue;
    }
  }

  const extension = path.extname(reference).toLowerCase();
  const row = { reference, extension, bytes: stat.size, missing: false };
  if (rasterExtensions.has(extension)) {
    const metadata = await sharp(localPath, { animated: true }).metadata();
    Object.assign(row, {
      width: metadata.width,
      height: metadata.height,
      alpha: Boolean(metadata.hasAlpha),
      pages: metadata.pages || 1,
    });
  }
  rows.push(row);
}

const candidates = rows.filter((row) =>
  !row.missing
  && [".png", ".jpg", ".jpeg"].includes(row.extension)
  && !conversionExceptions.has(row.reference),
);

const conversions = [];
for (const row of candidates) {
  const sourcePath = path.join(publicRoot, ...row.reference.slice(1).split("/"));
  const outputReference = row.reference.replace(/\.(?:png|jpe?g)$/i, ".webp");
  const outputPath = path.join(publicRoot, ...outputReference.slice(1).split("/"));
  const buffer = await sharp(sourcePath).webp({ lossless: true, effort: 6 }).toBuffer();
  if (buffer.length >= row.bytes) continue;

  conversions.push({
    from: row.reference,
    to: outputReference,
    before: row.bytes,
    after: buffer.length,
    saved: row.bytes - buffer.length,
  });

  if (convert) {
    await fs.writeFile(outputPath, buffer);
    for (const [file, content] of sourceContents) {
      if (!content.includes(row.reference)) continue;
      sourceContents.set(file, content.split(row.reference).join(outputReference));
    }
  }
}

const webpRecompressions = [];
if (recompressWebp) {
  for (const row of rows.filter((item) => !item.missing && item.extension === ".webp" && item.pages === 1)) {
    const filePath = path.join(publicRoot, ...row.reference.slice(1).split("/"));
    const buffer = await sharp(filePath).webp({ lossless: true, effort: 6 }).toBuffer();
    const saved = row.bytes - buffer.length;
    if (saved < 2048 || saved / row.bytes < 0.05) continue;
    webpRecompressions.push({ path: row.reference, before: row.bytes, after: buffer.length, saved });
    if (convert) await fs.writeFile(filePath, buffer);
  }
}

if (convert) {
  for (const [file, content] of sourceContents) await fs.writeFile(file, content, "utf8");
}

const activeBytes = rows.filter((row) => !row.missing).reduce((sum, row) => sum + row.bytes, 0);
const byFormat = Object.values(rows.filter((row) => !row.missing).reduce((groups, row) => {
  groups[row.extension] ||= { extension: row.extension, count: 0, bytes: 0 };
  groups[row.extension].count += 1;
  groups[row.extension].bytes += row.bytes;
  return groups;
}, {})).sort((a, b) => b.bytes - a.bytes);

console.log(JSON.stringify({
  mode: convert ? "convert" : "audit",
  referencedFiles: rows.length,
  missing: rows.filter((row) => row.missing),
  activeBytes,
  byFormat,
  conversions,
  totalPotentialSavings: conversions.reduce((sum, item) => sum + item.saved, 0),
  webpRecompressions,
  webpRecompressionSavings: webpRecompressions.reduce((sum, item) => sum + item.saved, 0),
  largestActive: rows
    .filter((row) => !row.missing)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 25)
    .map(({ reference, extension, bytes, width, height }) => ({ reference, extension, bytes, width, height })),
  retainedExceptions: [...conversionExceptions],
}, null, 2));

import { access, readFile, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";

const routes = [
  "/",
  "/about",
  "/about/ata",
  "/news",
  "/news/1",
  "/news/2",
  "/new",
  "/new/1",
  "/new/2",
  "/culture",
  "/business",
  "/resources",
  "/contact",
];

const requiredFiles = [
  "dist/manifest.webmanifest",
  "dist/robots.txt",
  "dist/sitemap.xml",
  "dist/downloads/atya-constitution.docx",
];

const forbiddenVisibleText = [
  "医学研修",
  "图库问答",
  "会员服务",
  "会员权益",
  "/assets/ata-logo.png",
];

const forbiddenPublicRoutes = [
  "/programs/medical-summer-school",
  "/gallery",
  "/membership",
  "/organization",
  "/publications",
];

function routeIndexPath(route) {
  if (route === "/") return "dist/index.html";
  return `dist${route}/index.html`;
}

async function assertReadable(path) {
  await access(path, constants.R_OK);
}

function assertIncludes(text, expected, label) {
  if (!text.includes(expected)) {
    throw new Error(`${label} missing ${expected}`);
  }
}

function assertExcludes(text, forbidden, label) {
  if (text.includes(forbidden)) {
    throw new Error(`${label} contains forbidden public text: ${forbidden}`);
  }
}

async function collectFiles(entry) {
  const info = await stat(entry);
  if (info.isFile()) return [entry];
  const children = await readdir(entry);
  const nested = await Promise.all(children.map((child) => collectFiles(`${entry}/${child}`)));
  return nested.flat();
}

for (const route of routes) {
  const path = routeIndexPath(route);
  await assertReadable(path);
  const html = await readFile(path, "utf8");
  assertIncludes(html, "<title>", path);
  assertIncludes(html, 'name="description"', path);
  assertIncludes(html, 'rel="canonical"', path);
  assertIncludes(html, 'property="og:url"', path);
  assertIncludes(html, 'name="twitter:card"', path);
  assertIncludes(html, 'type="application/ld+json"', path);
  assertIncludes(html, '<div id="root">', path);
  assertIncludes(html, "<noscript>", path);
}

const notFound = await readFile("dist/404.html", "utf8");
assertIncludes(notFound, 'content="noindex, follow"', "dist/404.html");

const manifest = JSON.parse(await readFile("dist/manifest.webmanifest", "utf8"));
if (manifest.name !== "澳大利亚潮汕青年会") {
  throw new Error("manifest name mismatch");
}
if (!manifest.icons?.some((icon) => icon.src === "/assets/atya-logo.png")) {
  throw new Error("manifest does not use ATYA logo");
}

const sitemap = await readFile("dist/sitemap.xml", "utf8");
for (const route of routes) {
  const loc = `https://austeoswa.com${route === "/" ? "/" : route}`;
  assertIncludes(sitemap, `<loc>${loc}</loc>`, "dist/sitemap.xml");
}
assertExcludes(sitemap, "/organization", "dist/sitemap.xml");
assertExcludes(sitemap, "/publications", "dist/sitemap.xml");
for (const route of forbiddenPublicRoutes) {
  assertExcludes(sitemap, route, "dist/sitemap.xml");
}

for (const file of requiredFiles) {
  await assertReadable(file);
}

const textExtensions = new Set([".js", ".css", ".html", ".xml", ".txt", ".json", ".webmanifest"]);
const distFiles = await collectFiles("dist");
for (const path of distFiles) {
  const extension = path.includes(".") ? path.slice(path.lastIndexOf(".")) : "";
  if (!textExtensions.has(extension)) continue;
  const text = await readFile(path, "utf8");
  for (const forbidden of forbiddenVisibleText) {
    assertExcludes(text, forbidden, path);
  }
  if (path.endsWith(".html") || path.endsWith(".xml")) {
    for (const route of forbiddenPublicRoutes) {
      assertExcludes(text, route, path);
    }
  }
}

const builtText = (await Promise.all(
  distFiles
    .filter((path) => path.endsWith(".js") || path.endsWith(".html"))
    .map((path) => readFile(path, "utf8")),
)).join("\n");

for (const expected of [
  "澳大利亚潮汕青年会",
  "商务与资源",
  "资源中心",
  "乡音相连，共筑未来",
  "澳洲潮汕同乡会青年会率代表团参观澳洲潮州同乡会馆",
  "【待确认：",
]) {
  assertIncludes(builtText, expected, "dist build");
}

console.log(`Verified ATYA build with ${routes.length} routes and ${requiredFiles.length} required files.`);

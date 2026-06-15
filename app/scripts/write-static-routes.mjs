import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const routes = [
  "/about",
  "/organization",
  "/news",
  "/publications",
  "/gallery",
  "/programs/medical-summer-school",
  "/contact",
];

const distDir = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(distDir);
const indexHtml = await readFile(new URL("index.html", distDir), "utf8");

await writeFile(new URL("404.html", distDir), indexHtml);

for (const route of routes) {
  const routeDir = join(distPath, route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(join(routeDir, "index.html"), indexHtml);
}

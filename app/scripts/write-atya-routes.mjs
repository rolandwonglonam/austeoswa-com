import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const siteName = "澳大利亚潮汕青年会";
const siteUrl = "https://austeoswa.com";

const routes = [
  {
    path: "/",
    title: "首页",
    description: "澳大利亚潮汕青年会官方门户，面向在澳潮汕青年与关心潮汕文化的朋友。",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/about",
    title: "关于青年会",
    description: "了解澳大利亚潮汕青年会的定位、轻量组织说明、公开联系信息和待确认资料清单。",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/about/ata",
    title: "同乡会说明",
    description: "同乡会作为二级背景信息保留，本版官网主线聚焦澳大利亚潮汕青年会。",
    priority: "0.4",
    changefreq: "yearly",
  },
  {
    path: "/news",
    title: "新闻活动",
    description: "浏览澳大利亚潮汕青年会新闻活动、原站活动文章和待补充活动资料。",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/news/1",
    title: "乡音相连，共筑未来",
    description: "原站活动文章：赴悉尼参加中秋晚宴暨授牌仪式。",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    path: "/news/2",
    title: "参观澳洲潮州同乡会馆",
    description: "原站活动文章：澳洲潮汕同乡会青年会率代表团参观澳洲潮州同乡会馆。",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    path: "/new",
    title: "新闻活动",
    description: "原站新闻活动入口保留为兼容链接。",
    priority: "0.5",
    changefreq: "weekly",
  },
  {
    path: "/new/1",
    title: "乡音相连，共筑未来",
    description: "原站活动文章兼容链接。",
    priority: "0.5",
    changefreq: "yearly",
  },
  {
    path: "/new/2",
    title: "参观澳洲潮州同乡会馆",
    description: "原站活动文章兼容链接。",
    priority: "0.5",
    changefreq: "yearly",
  },
  {
    path: "/culture",
    title: "潮汕文化",
    description: "潮汕话、节庆民俗、工夫茶、饮食文化和长者故事的后续内容入口。",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/business",
    title: "商务与资源",
    description: "合作机构、友好社团、企业资源和活动赞助的公开入口，未确认信息统一标注待确认。",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/resources",
    title: "资源中心",
    description: "整理青年会章程、原站活动文章、公开资料和待补充清单。",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/contact",
    title: "联系我们",
    description: "提交青年会咨询、活动合作、媒体联络、商务与资源对接或资料补充。",
    priority: "0.7",
    changefreq: "monthly",
  },
];

const distDir = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(distDir);
const indexHtml = await readFile(new URL("index.html", distDir), "utf8");

const publicWhitelist = [
  ".nojekyll",
  "CNAME",
  "manifest.webmanifest",
  "robots.txt",
  "assets/atya-logo.png",
  "assets/ceremony-group.jpg",
  "assets/ceremony-speech.jpg",
  "assets/cruise-boat.jpg",
  "assets/logan-meeting.jpg",
  "downloads/atya-constitution.docx",
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function breadcrumb(route) {
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "首页",
      item: `${siteUrl}/`,
    },
  ];

  if (route.path !== "/") {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: route.title,
      item: `${siteUrl}${route.path}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

const routeJsonLd = {
  "/contact": [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "联系我们",
      url: `${siteUrl}/contact`,
      mainEntity: {
        "@type": "Organization",
        name: siteName,
        email: "info@austeoswa.com",
        address: "Unit 10/23 Margaret St, Southport QLD 4215, Australia",
        areaServed: "Australia",
      },
    },
  ],
  "/resources": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "资源中心",
      url: `${siteUrl}/resources`,
      inLanguage: "zh-CN",
      about: ["青年会章程", "活动文章", "合作资料", "待确认资料"],
    },
  ],
};

function setMeta(html, route) {
  const title = route.path === "/" ? `${siteName} | ATYA` : `${route.title} | ${siteName}`;
  const description = route.description;
  const url = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
  const jsonLd = [breadcrumb(route), ...(routeJsonLd[route.path] || [])];

  return html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${escapeHtml(url)}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${escapeHtml(url)}" />`)
    .replace("</head>", `${jsonLd.map((item) => `    <script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n")}\n  </head>`);
}

function setNoIndex(html) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>页面未找到 | ${siteName}</title>`)
    .replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/>/, `<meta name="robots" content="noindex, follow" />`);
}

await writeFile(new URL("404.html", distDir), setNoIndex(indexHtml));

for (const file of publicWhitelist) {
  const target = join(distPath, file);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(new URL(`../public/${file}`, import.meta.url), target);
}

for (const route of routes) {
  if (route.path === "/") continue;
  const routeDir = join(distPath, route.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(join(routeDir, "index.html"), setMeta(indexHtml, route));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>
    <loc>${siteUrl}${route.path === "/" ? "/" : route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

await writeFile(new URL("sitemap.xml", distDir), sitemap);

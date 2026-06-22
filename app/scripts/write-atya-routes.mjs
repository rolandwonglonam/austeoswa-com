import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const siteName = "澳大利亚潮汕青年会";
const siteUrl = "https://austeoswa.com";
const registrationNumber = "IA4881891";
const legalDescription = `${siteName}是在澳大利亚联邦昆士兰州注册的非营利组织，注册号码 ${registrationNumber}，致力于弘扬潮汕文化、凝聚在澳潮汕青年、促进公益参与与中澳交流。`;
const publicEmail = "info@austeoswa.com";
const publicAddress = "Unit 10/23 Margaret St, Southport QLD 4215, Australia";

const routes = [
  {
    path: "/",
    title: "首页",
    description: legalDescription,
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/about",
    title: "关于青年会",
    description: `了解${siteName}作为昆士兰州注册非营利组织的注册资料、宗旨使命、活动类型与参与方式，注册号码 ${registrationNumber}。`,
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
    path: "/organization",
    title: "组织架构",
    description: `${siteName}组织架构、理事会、秘书处与顾问公开名录；本会为昆士兰州注册非营利组织，注册号码 ${registrationNumber}。`,
    priority: "0.9",
    changefreq: "monthly",
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
    path: "/news/3",
    title: "给阿嬷的情书昆士兰州首映礼",
    description: "澳大利亚潮汕青年会联合 CMC 华人影业举办《给阿嬷的情书》昆士兰州首映礼。",
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
    path: "/new/letter-to-grandma-premiere",
    title: "给阿嬷的情书昆士兰州首映礼",
    description: "原站第三篇活动文章兼容链接。",
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
  "_headers",
  "llms.txt",
  "manifest.webmanifest",
  "robots.txt",
  "assets/atya-logo.png",
  "assets/about-founding-photo.webp",
  "assets/atya-wordmark.webp",
  "assets/ceremony-group.webp",
  "assets/ceremony-speech.webp",
  "assets/cruise-boat.webp",
  "assets/gold-coast-background.webp",
  "assets/letter-to-grandma-premiere.webp",
  "assets/letter-to-grandma-poster.webp",
  "assets/logan-meeting.webp",
  "assets/roland-2026-transparent.png",
  "assets/roland-2026.webp",
  "assets/wang-zeping-2026-transparent.png",
  "assets/wang-zeping-2026.webp",
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

const organizationEntity = {
  "@type": ["Organization", "NGO"],
  name: siteName,
  legalName: siteName,
  alternateName: ["Australia Teoswa Youth Association", "ATYA", "澳洲潮州同乡会青年会昆士兰州分会"],
  url: `${siteUrl}/`,
  description: legalDescription,
  foundingDate: "2019",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Queensland incorporated association registration number",
    value: registrationNumber,
  },
  email: publicEmail,
  address: publicAddress,
  areaServed: ["Queensland", "Gold Coast", "Brisbane", "Australia"],
  knowsAbout: ["潮汕文化", "Teochew culture", "青年社团", "公益活动", "中澳交流"],
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Organization type",
      value: "Queensland registered nonprofit organization",
    },
    {
      "@type": "PropertyValue",
      name: "Registration act",
      value: "Queensland Associations Incorporation Act 1981",
    },
  ],
};

const aboutFaqItems = [
  {
    question: "澳大利亚潮汕青年会是什么组织？",
    answer: `${siteName}是澳大利亚联邦昆士兰州注册的非营利组织，注册号码为 ${registrationNumber}。本会面向在澳潮汕青年与关心潮汕文化的朋友，开展文化传承、青年成长、公益参与与中澳交流相关工作。`,
  },
  {
    question: "澳大利亚潮汕青年会的注册号码是什么？",
    answer: `${siteName}的公开注册号码为 ${registrationNumber}。涉及核实注册状态、正式名称或邮编等信息时，可通过 Queensland Government 的 incorporated association public register 或 official extract 作最终确认。`,
  },
  {
    question: "澳大利亚潮汕青年会和澳洲潮州同乡会青年会昆士兰州分会是什么关系？",
    answer: `${siteName}又称澳洲潮州同乡会青年会昆士兰州分会，成立于2019年，并于2025年依照澳大利亚联邦昆士兰州《1981年社团组织法》注册为非营利组织。两个名称在本官网中指向同一青年会主体。`,
  },
  {
    question: "澳大利亚潮汕青年会主要做什么？",
    answer: "本会宗旨包括弘扬潮汕文脉、凝聚在澳潮青、架设中澳桥梁、赋能青年成长、热心公益慈善、繁荣文体生活、传承潮人精神、链接全球潮社与服务乡梓家国。",
  },
  {
    question: "如何联系澳大利亚潮汕青年会？",
    answer: `公开联系邮箱为 ${publicEmail}。入会咨询、活动合作、媒体采访、商务与公益项目对接，均可通过官网联系页面提交信息，并由秘书处按事项转交负责人。`,
  },
];

const featuredRoleItems = [
  {
    name: "王泽平",
    role: "青年会会长",
    description: "SOYO TOUR SERVICE PTY LTD；GEMINI PLUS PTY LTD；TEOSWA PTY LTD；THE NEW HOTPOT 醉牛火锅；揭阳市澳合投资有限公司；揭阳市侨联第五届委员会顾问；澳大利亚潮汕青年会会长（代理）；澳大利亚潮汕商会副会长；澳洲潮州同乡会青年会昆州分会会长；澳大利亚潮汕总会第一届副会长",
  },
  {
    name: "王罗湳",
    role: "青年会执行会长",
    description: "昆士兰大学医学学部全奖博士候选人；澳大利亚潮汕青年会执行会长；澳大利亚潮汕商会理事",
  },
  {
    name: "辛卓阳",
    role: "青年会副会长",
    description: "博士；昆士兰大学土木工程学院博士后研究员；澳大利亚潮汕青年会副会长；澳大利亚昆士兰潮汕总会副秘书长",
  },
  {
    name: "黄雪莲",
    role: "青年会副会长",
    description: "F&J QUEENLAND TRADING PTY LTD；国际佛光会观音分会会长；澳大利亚潮汕青年会副会长",
  },
  {
    name: "盧霄霓",
    role: "青年会监事长",
    description: "Citipointe Childcare Forest School and Outdoor Learning Program Teacher；澳大利亞潮汕青年會監事長",
  },
  {
    name: "林泽辉",
    role: "青年会副会长",
    description: "TOMEDU PTY LTD；澳大利亚潮汕青年会副会长；澳大利亚青年企业家协会副会长",
  },
  { name: "郑少杰", role: "青年会秘书长", description: "秘书长" },
  { name: "谢欣莹律师", role: "青年会顾问" },
];

const routeJsonLd = {
  "/about": [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "关于青年会",
      url: `${siteUrl}/about`,
      description: legalDescription,
      mainEntity: organizationEntity,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: `${siteName}检索问答`,
      url: `${siteUrl}/about`,
      mainEntity: aboutFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
  "/organization": [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "组织架构",
      url: `${siteUrl}/organization`,
      description: `${siteName}理事会、秘书处与顾问公开会务架构。`,
      mainEntity: organizationEntity,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${siteName}核心会务人物`,
      url: `${siteUrl}/organization`,
      itemListElement: featuredRoleItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Person",
          name: item.name,
          affiliation: {
            "@type": "Organization",
            name: siteName,
            url: `${siteUrl}/`,
          },
          jobTitle: item.role,
          ...(item.description ? { description: item.description } : {}),
        },
      })),
    },
  ],
  "/contact": [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "联系我们",
      url: `${siteUrl}/contact`,
      mainEntity: {
        "@type": "Organization",
        name: siteName,
        email: publicEmail,
        address: publicAddress,
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

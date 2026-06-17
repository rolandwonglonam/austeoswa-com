import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./atya.css";

const site = {
  name: "澳大利亚潮汕青年会",
  englishName: "Australia Teoswa Youth Association",
  shortName: "ATYA",
  secondaryName: "澳大利亚潮汕同乡会",
  domain: "https://austeoswa.com",
  email: "info@austeoswa.com",
  address: "Unit 10/23 Margaret St, Southport QLD 4215, Australia",
  mission: "联络乡谊、互助互爱、传承文化、回馈社会",
  description:
    "澳大利亚潮汕青年会官方门户，面向在澳潮汕青年与关心潮汕文化的朋友，承接青年交流、文化传承、公益参与、商务与资源对接。",
};

const navItems = [
  { label: "首页", href: "/" },
  { label: "关于青年会", href: "/about" },
  { label: "新闻活动", href: "/news" },
  { label: "潮汕文化", href: "/culture" },
  { label: "商务与资源", href: "/business" },
  { label: "资源中心", href: "/resources" },
  { label: "联系我们", href: "/contact" },
];

const routeTitles = {
  "/": "首页",
  "/about": "关于青年会",
  "/about/ata": "同乡会说明",
  "/news": "新闻活动",
  "/news/1": "活动文章",
  "/news/2": "活动文章",
  "/new": "新闻活动",
  "/new/1": "活动文章",
  "/new/2": "活动文章",
  "/culture": "潮汕文化",
  "/business": "商务与资源",
  "/resources": "资源中心",
  "/contact": "联系我们",
};

const legacyPath = (...segments) => `/${segments.join("/")}`;

const routeAliases = Object.fromEntries([
  [legacyPath("organization"), "/about"],
  [legacyPath("membership"), "/contact"],
  [legacyPath("publications"), "/resources"],
  [legacyPath("gallery"), "/resources"],
  [legacyPath("programs", "medical-summer-school"), "/resources"],
]);

const heroStats = [
  { value: "ATYA", label: "青年会为官网主线" },
  { value: "QLD", label: "以昆士兰潮汕青年社群为基础" },
  { value: "2", label: "原站活动文章已恢复" },
];

const principles = [
  {
    title: "联络乡谊",
    text: "连接旅居澳大利亚的潮汕青年、家庭与社区朋友，形成稳定、互助、可信任的社群联系。",
  },
  {
    title: "传承文化",
    text: "围绕潮汕话、节庆、工夫茶、潮汕美食与家庭记忆，持续整理适合海外社区传播的文化内容。",
  },
  {
    title: "青年发展",
    text: "通过活动执行、志愿服务、职业交流和项目协作，让青年在真实场景中积累经验与连接。",
  },
  {
    title: "回馈社会",
    text: "参与社区公益、跨社团协作和中澳友好交流，把青年会建设成可长期合作的公共平台。",
  },
];

const focusAreas = [
  {
    title: "青年活动与志愿者",
    text: "活动策划、现场执行、摄影记录、翻译协助、新媒体整理等。",
    pending: "【待确认：青年会固定志愿者报名方式与负责人】",
  },
  {
    title: "潮汕文化传播",
    text: "潮汕话入门、节庆民俗、工夫茶体验、潮汕美食和长者故事。",
    pending: "【待确认：可公开使用的文化素材、图片和音视频】",
  },
  {
    title: "商务与资源对接",
    text: "合作机构、友好社团、企业资源和活动赞助需求先做公开入口，名单确认后再上线。",
    pending: "【待确认：合作机构名单、Logo 授权与对接规则】",
  },
  {
    title: "资料与文章归档",
    text: "恢复原站活动文章，并把章程、公开资料、活动回顾归入资源中心。",
    pending: "【待确认：哪些文件可直接公开下载】",
  },
];

const youthStructure = [
  {
    title: "青年会理事会",
    text: "负责青年会年度方向、重点活动、对外合作和与同乡会相关事务的协同。",
  },
  {
    title: "秘书与执行协作",
    text: "负责活动通知、资料归档、联系入口和志愿者协调。",
  },
  {
    title: "项目工作组",
    text: "按活动临时组建文化、外联、新媒体、现场执行、摄影记录等小组。",
  },
];

const pendingProfile = [
  "【待确认：青年会现任会长、执行负责人和公开职务名单】",
  "【待确认：是否公开青年会注册号、章程版本和任期信息】",
  "【待确认：官方微信公众号、社媒链接和公开联系电话】",
];

const articleImages = {
  article1: "https://tca-prod-public.oss-cn-shanghai.aliyuncs.com/new/new1-03.webp",
  article2: "https://tca-prod-public.oss-cn-shanghai.aliyuncs.com/new/new1-15.webp",
};

const articles = [
  {
    id: "1",
    category: "活动回顾",
    date: "2025年9月24日",
    image: articleImages.article1,
    title: "乡音相连，共筑未来——澳洲潮汕同乡会与青年会赴悉尼参加中秋晚宴暨授牌仪式",
    summary:
      "澳大利亚潮汕同乡会与澳洲潮汕青年会代表团前往悉尼，参加由悉尼潮州同乡会青年会主办的中秋晚宴暨昆士兰分会授牌仪式。",
    source: "原网站活动文章",
    sections: [
      {
        title: "领导致辞，共话发展",
        body:
          "仪式上，悉尼潮青会会长杜艇先生、潮青会创会会长陈少伟太平绅士分别发表致辞，回顾悉尼潮青会的发展历程，并对昆士兰分会的成立表示祝贺。澳洲潮汕青年会会长王泽平先生在演讲中感谢悉尼潮州同乡会青年会的支持，并表示昆士兰分会将继续深化与悉尼以及各地潮团的协作，团结更广大的在澳潮汕族裔，共同推动潮汕文化传承与发展。",
      },
      {
        title: "代表齐聚，共襄盛举",
        body:
          "出席本次活动的还有澳大利亚潮汕同乡会荣誉会长卢霄霓女士、会长黄璐璐女士、执行会长黄雪莲女士、副会长陈泽宁先生、副会长辛卓阳先生、副会长兼秘书长郑少杰先生，以及澳洲潮汕青年会执行会长王罗湳先生、顾问刘慧君太平绅士等。",
      },
      {
        title: "携手前行，共创辉煌",
        body:
          "此次授牌仪式是两地潮人深化合作、共谋发展的新起点。未来，澳大利亚潮汕同乡会与澳洲潮汕青年会将继续秉持联络乡谊、传承文化、服务社区的宗旨，加强与海内外潮团联系，为潮汕文化在澳洲的传播与发展贡献力量。",
      },
    ],
  },
  {
    id: "2",
    category: "外联参访",
    date: "2025年9月25日",
    image: articleImages.article2,
    title: "澳洲潮汕同乡会青年会率代表团参观澳洲潮州同乡会馆",
    summary:
      "应澳洲潮州同乡会青年会邀请，澳洲潮汕同乡会与青年会会长率代表团参访悉尼潮州同乡会馆。",
    source: "原网站活动文章",
    sections: [
      {
        title: "深化合作，共促发展",
        body:
          "此次参访是澳洲潮汕同乡会与青年会成立以来对悉尼潮州同乡会的首次正式访问。座谈会上，澳洲潮汕同乡会会长黄璐璐女士致辞，感谢悉尼潮州同乡会青年会的热情接待，并表示昆士兰同乡会将学习悉尼同乡会经验，继续秉持联络乡谊、传承文化、服务社区的宗旨。",
      },
      {
        title: "传承文化，凝聚力量",
        body:
          "澳洲潮州同乡会青年会创会会长陈少伟太平绅士介绍了悉尼潮州同乡会的发展历程和会务经验，并强调青年人在社团发展中的重要作用。荣誉会长张桂芳女士也表示，希望未来两地在文化活动、青年交流、商贸合作等方面开展更多实质合作。",
      },
      {
        title: "互赠礼品，增进友谊",
        body:
          "座谈会后，双方互赠纪念品并参观悉尼潮州同乡会会所。代表团成员对悉尼同乡会的热情接待和周到安排表示感谢。",
      },
      {
        title: "展望未来，携手共进",
        body:
          "此次参访进一步加深两地潮人的情谊，为今后合作奠定基础。双方表示将在青年互动、文化传承、会务交流等方面开展更多合作，共同推动澳洲潮汕文化事业的发展。",
      },
    ],
  },
];

const newsItems = [
  ...articles,
  {
    id: "pending-1",
    category: "待补充",
    date: "【待确认：发布时间】",
    image: "/assets/ceremony-speech.jpg",
    title: "青年会近期活动资料整理中",
    summary: "【待确认：近期活动名称、时间、地点、主办/协办单位、可公开照片与参与人员授权】",
    source: "待 Roland 补充",
    sections: [],
  },
];

const cultureItems = [
  {
    title: "潮汕话入门",
    text: "先整理常用问候、家庭称谓、活动现场用语和普通话释义。",
    pending: "【待确认：潮汕话音频、拼音标注和朗读人员授权】",
  },
  {
    title: "节庆与民俗",
    text: "围绕春节、中秋、工夫茶、潮汕饮食等主题沉淀可发布文章。",
    pending: "【待确认：可公开使用的节庆照片和文字资料】",
  },
  {
    title: "长者故事与青年记录",
    text: "由青年志愿者记录乡亲故事、移民经历、家庭记忆和创业经历。",
    pending: "【待确认：采访对象、肖像授权和发布范围】",
  },
];

const businessItems = [
  {
    title: "合作机构与友好社团",
    text: "预留给已确认合作关系的机构、社团、学校、企业和社区组织。",
    pending: "【待确认：名称、简介、Logo、排序、是否互链】",
  },
  {
    title: "企业资源与对接名录",
    text: "可整理潮汕青年创业者、专业服务、赞助伙伴和项目合作需求。",
    pending: "【待确认：是否公开、展示字段、审核规则、更新负责人】",
  },
  {
    title: "活动赞助与联合品牌",
    text: "为文化活动、青年交流、公益项目和商务交流预留合作入口。",
    pending: "【待确认：赞助等级、权益表、合同模板和联系人】",
  },
  {
    title: "商务交流活动",
    text: "后续可承接企业参访、圆桌交流、行业分享和跨社团合作。",
    pending: "【待确认：既有活动资料和下一场活动安排】",
  },
];

const resourceItems = [
  {
    title: "澳大利亚潮汕青年会章程",
    type: "章程资料",
    summary: "本地素材中已有青年会章程文件，适合作为资源中心首批公开资料。",
    href: "/downloads/atya-constitution.docx",
    status: "需确认公开版本",
  },
  {
    title: "原站活动文章：悉尼中秋晚宴暨授牌仪式",
    type: "活动文章",
    summary: "已恢复为新闻活动详情页。",
    href: "/news/1",
    status: "已恢复",
  },
  {
    title: "原站活动文章：参访澳洲潮州同乡会馆",
    type: "活动文章",
    summary: "已恢复为新闻活动详情页。",
    href: "/news/2",
    status: "已恢复",
  },
  {
    title: "青年会公开介绍资料",
    type: "待补充",
    summary: "【待确认：正式简介、英文名称、注册信息、组织负责人公开口径】",
    href: "/about",
    status: "待确认",
  },
  {
    title: "合作机构与友好社团名录",
    type: "待补充",
    summary: "【待确认：机构名单、Logo 授权、链接、排序与是否公开联系人】",
    href: "/business",
    status: "待确认",
  },
];

const contactTopics = ["青年会咨询", "活动合作", "媒体联络", "商务与资源", "资料补充", "其他"];

function cleanPath(pathname) {
  const withoutTrailing = pathname.replace(/\/+$/, "") || "/";
  return routeAliases[withoutTrailing] || (routeTitles[withoutTrailing] ? withoutTrailing : "/");
}

function titleFor(path) {
  if (path === "/news/1" || path === "/new/1") return articles[0].title;
  if (path === "/news/2" || path === "/new/2") return articles[1].title;
  return routeTitles[path] || routeTitles[routeAliases[path]] || "首页";
}

function App() {
  const [path, setPath] = useState(() => {
    const stored = sessionStorage.getItem("austeoswa:redirectPath");
    if (stored) {
      sessionStorage.removeItem("austeoswa:redirectPath");
      history.replaceState({}, "", stored);
    }
    const normalized = cleanPath(location.pathname);
    if (normalized !== location.pathname.replace(/\/+$/, "") && location.pathname !== "/") {
      history.replaceState({}, "", normalized);
    }
    return normalized;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(cleanPath(location.pathname));
    addEventListener("popstate", onPopState);
    return () => removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const pageTitle = titleFor(path);
    document.title = path === "/" ? `${site.name} | ${site.shortName}` : `${pageTitle} | ${site.name}`;
  }, [path]);

  function navigate(href) {
    const next = cleanPath(href);
    history.pushState({}, "", next);
    setPath(next);
    setMenuOpen(false);
    scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Header activePath={path} menuOpen={menuOpen} navigate={navigate} setMenuOpen={setMenuOpen} />
      <main id="main-content" tabIndex="-1">
        {path === "/" && <HomePage navigate={navigate} />}
        {path === "/about" && <AboutPage navigate={navigate} />}
        {path === "/about/ata" && <AtaPage navigate={navigate} />}
        {(path === "/news" || path === "/new") && <NewsPage navigate={navigate} />}
        {(path === "/news/1" || path === "/new/1") && <ArticlePage article={articles[0]} navigate={navigate} />}
        {(path === "/news/2" || path === "/new/2") && <ArticlePage article={articles[1]} navigate={navigate} />}
        {path === "/culture" && <CulturePage />}
        {path === "/business" && <BusinessPage navigate={navigate} />}
        {path === "/resources" && <ResourcesPage navigate={navigate} />}
        {path === "/contact" && <ContactPage />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ activePath, menuOpen, navigate, setMenuOpen }) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => navigate("/")} aria-label="返回首页">
        <img src="/assets/atya-logo.png" alt="澳大利亚潮汕青年会 Logo" />
        <span>
          <strong>{site.shortName}</strong>
          <small>{site.name}</small>
        </span>
      </button>
      <nav className="desktop-nav" aria-label="主导航">
        {navItems.map((item) => (
          <button
            key={item.href}
            className={activePath === item.href ? "active" : ""}
            type="button"
            aria-current={activePath === item.href ? "page" : undefined}
            onClick={() => navigate(item.href)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button
        className="menu-button"
        type="button"
        aria-controls="mobile-nav"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? "关闭" : "菜单"}
      </button>
      {menuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="移动导航">
          {navItems.map((item) => (
            <button
              key={item.href}
              className={activePath === item.href ? "active" : ""}
              type="button"
              onClick={() => navigate(item.href)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Australia Teoswa Youth Association</p>
            <h1>澳大利亚潮汕青年会</h1>
            <p className="hero-lede">{site.description}</p>
            <div className="hero-actions">
              <button className="button primary" type="button" onClick={() => navigate("/news")}>查看活动</button>
              <button className="button secondary" type="button" onClick={() => navigate("/contact")}>联系青年会</button>
            </div>
            <div className="stat-grid">
              {heroStats.map((stat) => (
                <article key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
          <aside className="hero-card" aria-label="青年会活动影像">
            <img src="/assets/ceremony-group.jpg" alt="澳大利亚潮汕青年会活动合影" />
            <div className="hero-logo-row">
              <img src="/assets/atya-logo.png" alt="澳大利亚潮汕青年会 Logo" />
              <p>官网主站以青年会为核心；同乡会信息仅作为背景与二级说明出现。</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="container section">
        <SectionTitle eyebrow="Purpose" title={site.mission} text="这一版先把边界收紧：不扩展短期无法落地的会员系统，不展示未确认名单，不放未经确认的公开素材。" />
        <div className="principle-grid">
          {principles.map((item) => (
            <article className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionTitle eyebrow="Focus" title="第一版只做青年会相关内容" text="能确认的内容直接上线；缺口用待确认标注，便于 Roland 明早逐条补齐。" />
        <div className="focus-grid">
          {focusAreas.map((item) => (
            <article className="focus-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <small>{item.pending}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionTitle eyebrow="Latest" title="原站活动文章已恢复" text="先保留原网站公开过的两篇活动文章，后续新增活动按同一结构补充。" />
        <ArticleGrid items={articles} navigate={navigate} />
      </section>
    </>
  );
}

function AboutPage({ navigate }) {
  return (
    <PageShell eyebrow="About ATYA" title="关于青年会" image="/assets/ceremony-speech.jpg">
      <section className="split-layout">
        <div className="content-panel">
          <h2>{site.name}</h2>
          <p>
            {site.name}是本官网当前主线。页面优先呈现青年会的定位、活动、文化传承、商务与资源对接，以及资源中心资料。
          </p>
          <p>
            与同乡会相关的信息暂时降为二级说明，不在首页做重点宣传，避免把网站做成总会主站。
          </p>
        </div>
        <div className="content-panel accent">
          <h2>公开信息</h2>
          <ul className="clean-list">
            <li>英文名：{site.englishName}</li>
            <li>联系邮箱：{site.email}</li>
            <li>通讯地址：{site.address}</li>
            <li>公开电话：【待确认：是否发布官方联系电话】</li>
            <li>社媒/公众号：【待确认：官方账号与链接】</li>
          </ul>
        </div>
      </section>

      <section className="subsection">
        <SectionTitle eyebrow="Structure" title="轻量组织说明" text="青年会结构先以职能说明为主，不展示未经确认的大名单。" />
        <div className="principle-grid compact">
          {youthStructure.map((item) => (
            <article className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="pending-box">
          {pendingProfile.map((item) => <p key={item}>{item}</p>)}
        </div>
      </section>

      <div className="action-band">
        <p>同乡会资料仅作为背景说明保留，后续如需独立展示可从这里进入二级页面。</p>
        <button className="button secondary" type="button" onClick={() => navigate("/about/ata")}>查看同乡会说明</button>
      </div>
    </PageShell>
  );
}

function AtaPage({ navigate }) {
  return (
    <PageShell eyebrow="Secondary" title="同乡会说明" image="/assets/ceremony-group.jpg">
      <section className="content-panel">
        <h2>{site.secondaryName}</h2>
        <p>
          同乡会在本版网站中作为青年会的背景与上级社团关系说明，不进入首页主视觉和主导航重点宣传。
        </p>
        <p>
          原站公开过的同乡会与青年会联合活动文章已保留在新闻活动栏目。涉及同乡会章程、理事名单、会员资料等内容，需 Roland 确认公开范围后再决定是否在资源中心展示。
        </p>
        <p>【待确认：同乡会二级页面是否需要显示章程下载、理事会名单或仅保留简介】</p>
      </section>
      <div className="action-band">
        <p>当前版本仍以青年会主站为准。</p>
        <button className="button primary" type="button" onClick={() => navigate("/about")}>返回青年会介绍</button>
      </div>
    </PageShell>
  );
}

function NewsPage({ navigate }) {
  const [category, setCategory] = useState("全部");
  const categories = useMemo(() => ["全部", ...new Set(newsItems.map((item) => item.category))], []);
  const filtered = category === "全部" ? newsItems : newsItems.filter((item) => item.category === category);

  return (
    <PageShell eyebrow="News & Events" title="新闻活动" image="/assets/ceremony-group.jpg">
      <SectionTitle eyebrow="Archive" title="活动文章与后续活动归档" text="先恢复原站两篇文章；没有资料的活动不编内容，只列待确认项。" />
      <div className="filter-row" aria-label="新闻分类筛选">
        {categories.map((item) => (
          <button key={item} className={category === item ? "active" : ""} type="button" onClick={() => setCategory(item)}>{item}</button>
        ))}
      </div>
      <ArticleGrid items={filtered} navigate={navigate} />
    </PageShell>
  );
}

function ArticleGrid({ items, navigate }) {
  return (
    <div className="article-grid">
      {items.map((item) => {
        const isRestored = item.id === "1" || item.id === "2";
        return (
          <article className="article-card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div>
              <span>{item.category} · {item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              {isRestored ? (
                <button className="text-button" type="button" onClick={() => navigate(`/news/${item.id}`)}>阅读全文</button>
              ) : (
                <small>{item.source}</small>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ArticlePage({ article, navigate }) {
  return (
    <PageShell eyebrow={article.category} title={article.title} image={article.image}>
      <article className="article-detail">
        <div className="article-meta">
          <span>{article.date}</span>
          <span>{article.source}</span>
        </div>
        <p className="lead">{article.summary}</p>
        {article.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </article>
      <div className="action-band">
        <p>这篇内容来自原网站公开活动文章，后续如需增补照片或署名，请补充授权材料。</p>
        <button className="button secondary" type="button" onClick={() => navigate("/news")}>返回新闻活动</button>
      </div>
    </PageShell>
  );
}

function CulturePage() {
  return (
    <PageShell eyebrow="Culture" title="潮汕文化" image="/assets/cruise-boat.jpg">
      <SectionTitle eyebrow="Teochew heritage" title="先做可持续的文化内容入口" text="这一页只放青年会能长期维护的文化方向，不编具体课程和活动场次。" />
      <div className="principle-grid compact">
        {cultureItems.map((item) => (
          <article className="info-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <small>{item.pending}</small>
          </article>
        ))}
      </div>
      <section className="subsection">
        <div className="content-panel">
          <h2>后续内容规则</h2>
          <p>每个文化内容发布前应至少确认：来源、作者或提供者、照片/音频授权、是否涉及未成年人或私人信息、是否需要中英双语。</p>
          <p>【待确认：第一批潮汕文化文章题目与素材来源】</p>
        </div>
      </section>
    </PageShell>
  );
}

function BusinessPage({ navigate }) {
  return (
    <PageShell eyebrow="Business & Resources" title="商务与资源" image="/assets/logan-meeting.jpg">
      <SectionTitle eyebrow="Partnership" title="先建入口，不虚构名单" text="这一页保留 Roland 提到的合作机构、友好社团和对接名录方向，但没有确认前全部标注待确认。" />
      <div className="focus-grid">
        {businessItems.map((item) => (
          <article className="focus-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <small>{item.pending}</small>
          </article>
        ))}
      </div>
      <div className="action-band">
        <p>合作信息需要秘书处或 Roland 审核后发布；未确认前不展示机构名称和联系人。</p>
        <button className="button primary" type="button" onClick={() => navigate("/contact")}>提交合作咨询</button>
      </div>
    </PageShell>
  );
}

function ResourcesPage({ navigate }) {
  const [query, setQuery] = useState("");
  const filtered = resourceItems.filter((item) => {
    const text = `${item.title} ${item.type} ${item.summary} ${item.status}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  return (
    <PageShell eyebrow="Resources" title="资源中心" image="/assets/ceremony-speech.jpg">
      <SectionTitle eyebrow="Documents" title="公开资料与待补清单" text="资源中心只放能确认的资料；不能确认的资料保留待确认句式，方便明早逐条补齐。" />
      <label className="resource-search">
        搜索资源
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="输入章程、活动、合作、待确认等关键词" />
      </label>
      <div className="resource-list">
        {filtered.map((item) => (
          <article key={item.title}>
            <span>{item.type} · {item.status}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <button className="text-button" type="button" onClick={() => navigate(item.href)}>查看</button>
          </article>
        ))}
        {filtered.length === 0 && (
          <article>
            <h3>暂无匹配资料</h3>
            <p>换一个关键词，或把缺少的信息发给青年会统一补充。</p>
          </article>
        )}
      </div>
    </PageShell>
  );
}

function ContactPage() {
  const [topic, setTopic] = useState(contactTopics[0]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`[ATYA官网咨询] ${topic}`);
    const body = encodeURIComponent(
      `姓名：${form.get("name")}\n邮箱：${form.get("email")}\n电话/微信：${form.get("phone") || "未填写"}\n机构/公司：${form.get("organization") || "未填写"}\n咨询类型：${topic}\n\n留言：\n${form.get("message")}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <PageShell eyebrow="Contact" title="联系我们" image="/assets/logan-meeting.jpg">
      <div className="contact-layout">
        <section>
          <SectionTitle eyebrow="Official contact" title="青年会联系入口" text="当前只展示已在原站或素材中能确认的信息；私人电话和个人证件信息不公开。" />
          <div className="contact-list">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.address}</span>
            <a href={site.domain}>{site.domain}</a>
            <span>公开电话：【待确认：是否设置官方电话或 WhatsApp】</span>
            <span>官方社媒：【待确认：微信公众号、Instagram、Facebook 等链接】</span>
          </div>
        </section>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            咨询类型
            <select value={topic} onChange={(event) => setTopic(event.target.value)}>
              {contactTopics.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            姓名
            <input name="name" type="text" required placeholder="请输入姓名" />
          </label>
          <label>
            邮箱
            <input name="email" type="email" required placeholder="name@example.com" />
          </label>
          <label>
            电话 / 微信
            <input name="phone" type="text" placeholder="便于后续联系，可留空" />
          </label>
          <label>
            机构 / 公司
            <input name="organization" type="text" placeholder="个人咨询可留空" />
          </label>
          <label>
            留言
            <textarea name="message" rows="5" required placeholder="请说明需求、时间、背景或需要补充的资料" />
          </label>
          <button className="button primary" type="submit">发送邮件</button>
        </form>
      </div>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, image, children }) {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{site.description}</p>
          </div>
          <img src={image} alt={title} />
        </div>
      </section>
      <div className="container page-content">{children}</div>
    </>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <button className="brand footer-brand" type="button" onClick={() => navigate("/")}>
        <img src="/assets/atya-logo.png" alt="" />
        <span>
          <strong>{site.shortName}</strong>
          <small>{site.mission}</small>
        </span>
      </button>
      <div className="footer-links">
        {navItems.map((item) => (
          <button key={item.href} type="button" onClick={() => navigate(item.href)}>{item.label}</button>
        ))}
      </div>
      <p>© {new Date().getFullYear()} {site.name}. 未确认资料以页面标注为准。</p>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);

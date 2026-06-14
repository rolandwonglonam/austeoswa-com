import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  activities,
  associationBoard,
  contactTopics,
  contentModels,
  eventCalendar,
  faqs,
  galleryAlbums,
  galleryMoments,
  governanceUnits,
  heroStats,
  memberBenefits,
  membershipTiers,
  navItems,
  newsArticles,
  principles,
  publicationItems,
  publicationsArchive,
  site,
  youthBoard,
} from "./data/siteData";
import "./styles.css";

const pageTitles = {
  "/": "首页",
  "/about": "关于我们",
  "/organization": "组织架构",
  "/news": "新闻活动",
  "/membership": "会员权益",
  "/publications": "文化会讯",
  "/gallery": "图库 FAQ",
  "/contact": "联系我们",
};

function normalizePath(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";
  return pageTitles[path] ? path : "/";
}

function App() {
  const [path, setPath] = useState(() => {
    const stored = sessionStorage.getItem("austeoswa:redirectPath");
    if (stored) {
      sessionStorage.removeItem("austeoswa:redirectPath");
      history.replaceState({}, "", stored);
    }
    return normalizePath(location.pathname);
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(location.pathname));
    addEventListener("popstate", onPopState);
    return () => removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.title =
      path === "/"
        ? `${site.name} | Austeoswa`
        : `${pageTitles[path]} | ${site.name}`;
  }, [path]);

  function navigate(href) {
    const next = normalizePath(href);
    history.pushState({}, "", next);
    setPath(next);
    setMenuOpen(false);
    scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <Header activePath={path} menuOpen={menuOpen} navigate={navigate} setMenuOpen={setMenuOpen} />
      <main>
        {path === "/" && <HomePage navigate={navigate} />}
        {path === "/about" && <AboutPage />}
        {path === "/organization" && <OrganizationPage />}
        {path === "/news" && <NewsPage navigate={navigate} />}
        {path === "/membership" && <MembershipPage navigate={navigate} />}
        {path === "/publications" && <PublicationsPage />}
        {path === "/gallery" && <GalleryPage />}
        {path === "/contact" && <ContactPage />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ activePath, menuOpen, navigate, setMenuOpen }) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => navigate("/")}>
        <img src="/assets/ata-logo.png" alt="澳大利亚潮汕同乡会 Logo" />
        <span>
          <strong>Austeoswa</strong>
          <small>{site.name}</small>
        </span>
      </button>
      <nav className="desktop-nav" aria-label="主导航">
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
      <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)}>
        {menuOpen ? "关闭" : "菜单"}
      </button>
      {menuOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <button key={item.href} type="button" onClick={() => navigate(item.href)}>
              {item.label}
            </button>
          ))}
        </div>
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
            <p className="eyebrow">Australia Teoswa Association · Official Portal</p>
            <h1>澳大利亚潮汕同乡会暨潮汕青年会</h1>
            <p className="hero-lede">{site.description}</p>
            <div className="hero-actions">
              <button className="button primary" type="button" onClick={() => navigate("/contact")}>
                联系入会
              </button>
              <button className="button secondary" type="button" onClick={() => navigate("/about")}>
                了解组织
              </button>
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
          <div className="hero-card">
            <img src="/assets/ceremony-group.jpg" alt="澳大利亚潮汕同乡会活动合影" />
            <div>
              <img src="/assets/ata-logo.png" alt="" />
              <img src="/assets/atya-logo.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <SectionTitle eyebrow="Purpose" title={site.tagline} text="依据同乡会与青年会章程整理，第一版官网优先呈现组织身份、宗旨、架构与联系入口。" />
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
        <SectionTitle eyebrow="Moments" title="真实活动现场" text="先选用成立大会、青年会现场和会员活动照片，后续可按授权范围继续扩展图库与新闻回顾。" />
        <div className="activity-grid">
          {activities.map((item) => (
            <article className="activity-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <PageShell eyebrow="About" title="关于我们" image="/assets/ceremony-speech.jpg">
      <div className="split-layout">
        <div className="content-panel">
          <h2>{site.ataName}</h2>
          <p>
            澳大利亚潮汕同乡会为在澳大利亚依法注册的非营利性民间团体，立足昆士兰，服务旅居澳大利亚的潮汕同乡和认同潮汕文化的朋友。
          </p>
          <p>
            本会以团结同乡、联络乡谊、互助互爱、传承文化、回馈社会为宗旨，推动澳大利亚与潮汕地区在经贸、文化、教育、慈善等领域的交流合作。
          </p>
        </div>
        <div className="content-panel blue">
          <h2>{site.atyaName}</h2>
          <p>
            澳大利亚潮汕青年会面向在澳潮汕青年、学生、新移民、专业人士和创业者，推动青年在教育、文化、经济、公益等领域的发展与贡献。
          </p>
          <p>
            青年会致力于搭建中澳及国际青年交流平台，促进相互交流、合作互助，增强青年综合素质、全球视野与社区责任感。
          </p>
        </div>
      </div>
      <section className="subsection">
        <SectionTitle eyebrow="Activities" title="主要活动方向" />
        <div className="principle-grid">
          {["联谊活动", "专业讲座", "公益慈善", "外联合作", "青年发展", "文化传承"].map((item) => (
            <article className="simple-tile" key={item}>{item}</article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function OrganizationPage() {
  return (
    <PageShell eyebrow="Governance" title="组织架构" image="/assets/ceremony-group.jpg">
      <section className="subsection compact-top">
        <SectionTitle eyebrow="Structure" title="机构设置" text="依据章程整理，实际岗位与公开展示范围可按理事会确认继续调整。" />
        <div className="unit-grid">
          {governanceUnits.map((unit) => (
            <span key={unit}>{unit}</span>
          ))}
        </div>
      </section>
      <BoardSection title="澳大利亚潮汕同乡会第二届理事会芳名表" note="于 2025 年 8 月 3 日选举产生" rows={associationBoard} />
      <BoardSection title="澳洲潮汕青年会第一届理事会芳名" note="于 2025 年 8 月 3 日选举产生" rows={youthBoard} />
    </PageShell>
  );
}

function ContactPage() {
  function handleContactSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const topic = form.get("topic");
    const name = form.get("name");
    const email = form.get("email");
    const message = form.get("message");
    const subject = encodeURIComponent(`[官网咨询] ${topic}`);
    const body = encodeURIComponent(`姓名：${name}\n邮箱：${email}\n咨询类型：${topic}\n\n留言：\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <PageShell eyebrow="Contact" title="联系我们" image="/assets/logan-meeting.jpg">
      <div className="contact-layout">
        <div>
          <SectionTitle eyebrow="Enquiry" title="入会、活动与合作入口" text="第一版先使用公开联系信息与前端表单占位；表单后端可在下一阶段接入 Sanity、Google Sheets 或邮件服务。" />
          <div className="contact-list">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.address}</span>
            <a href={site.domain}>{site.domain}</a>
          </div>
          <div className="topic-grid">
            {contactTopics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        </div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <label>
            咨询类型
            <select name="topic">
              {contactTopics.map((topic) => <option key={topic}>{topic}</option>)}
            </select>
          </label>
          <label>
            姓名
            <input name="name" type="text" placeholder="请输入姓名" required />
          </label>
          <label>
            邮箱
            <input name="email" type="email" placeholder="name@example.com" required />
          </label>
          <label>
            留言
            <textarea name="message" rows="5" placeholder="请简单说明需求" required />
          </label>
          <button className="button primary" type="submit">发送咨询</button>
        </form>
      </div>
    </PageShell>
  );
}

function NewsPage({ navigate }) {
  return (
    <PageShell eyebrow="News & Events" title="新闻活动" image="/assets/ceremony-group.jpg">
      <SectionTitle
        eyebrow="Archive-ready"
        title="把活动证明沉淀成长期内容"
        text="新闻、公告、活动预告、活动回顾都按后续 CMS 内容模型排好；当前只放可公开候选内容和授权提醒。"
      />
      <div className="article-grid">
        {newsArticles.map((item) => (
          <article className="article-card" key={item.title}>
            <img src={item.image} alt={item.title} />
            <div>
              <span>{item.category} · {item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
      <section className="subsection">
        <SectionTitle eyebrow="Calendar" title="活动与项目规划" />
        <div className="timeline-list">
          {eventCalendar.map((event) => (
            <article key={event.title}>
              <strong>{event.date}</strong>
              <div>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
                <small>{event.location} · {event.audience}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="action-band">
        <p>活动合作、新闻素材和媒体报道可统一进入联系入口，确认授权后再公开发布。</p>
        <button className="button primary" type="button" onClick={() => navigate("/contact")}>提交活动合作</button>
      </div>
    </PageShell>
  );
}

function MembershipPage({ navigate }) {
  return (
    <PageShell eyebrow="Membership" title="会员权益" image="/assets/cruise-boat.jpg">
      <SectionTitle
        eyebrow="Member services"
        title="先公开申请路径，登录系统后置"
        text="第一版不做会员登录，先解释会员类别、适合人群、权益和申请方式，避免把技术范围拖重。"
      />
      <div className="tier-grid">
        {membershipTiers.map((tier) => (
          <article className="tier-card" key={tier.name}>
            <div className="tier-top">
              <h3>{tier.name}</h3>
              <span>{tier.price}</span>
            </div>
            <p>{tier.bestFor}</p>
            <ul>
              {tier.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <section className="subsection">
        <SectionTitle eyebrow="Benefits" title="会员能获得什么" />
        <div className="principle-grid">
          {memberBenefits.map((benefit) => (
            <article className="info-card" key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="action-band">
        <p>具体会费、资格和资料授权以秘书处确认后的正式规则为准。</p>
        <button className="button primary" type="button" onClick={() => navigate("/contact")}>开始申请</button>
      </div>
    </PageShell>
  );
}

function PublicationsPage() {
  return (
    <PageShell eyebrow="Publications" title="文化会讯" image="/assets/ceremony-speech.jpg">
      <SectionTitle
        eyebrow="Documents"
        title="把章程、会讯和项目资料变成可搜索资产"
        text="素材地图已经识别出章程、活动资料、项目资料和默认不公开文件；这里先放公开规划，不直接发布敏感附件。"
      />
      <div className="publication-layout">
        <div className="publication-list">
          {publicationsArchive.map((item) => (
            <article key={item.title}>
              <span>{item.type} · {item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
        <aside className="model-panel">
          <p className="eyebrow">Content models</p>
          <h3>后续 CMS 数据模型</h3>
          {contentModels.map((model) => (
            <div key={model.label}>
              <strong>{model.label}</strong>
              <p>{model.purpose}</p>
            </div>
          ))}
        </aside>
      </div>
      <section className="subsection">
        <SectionTitle eyebrow="Formats" title="出版物类型" />
        <div className="principle-grid">
          {publicationItems.map((item) => (
            <article className="simple-card" key={item.title}>
              <span>{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function GalleryPage() {
  return (
    <PageShell eyebrow="Gallery & FAQ" title="图库 FAQ" image="/assets/logan-meeting.jpg">
      <SectionTitle
        eyebrow="Material map"
        title="按授权风险组织图库"
        text="素材已按成立大会、新春游轮、外联会面、照片素材等分组；人物、证件、申请表和账单类素材默认不公开。"
      />
      <div className="album-grid">
        {galleryAlbums.map((album) => (
          <article className="album-card" key={album.title}>
            <img src={album.image} alt={album.title} />
            <div>
              <span>{album.count} · {album.date}</span>
              <h3>{album.title}</h3>
              <p>{album.summary}</p>
            </div>
          </article>
        ))}
      </div>
      <section className="subsection gallery-layout">
        <div>
          <SectionTitle eyebrow="Scene labels" title="图库分类" />
          <div className="topic-grid">
            {galleryMoments.map((moment) => (
              <article className="simple-card" key={moment.title}>
                <span>{moment.label}</span>
                <h3>{moment.title}</h3>
                <p>{moment.text}</p>
              </article>
            ))}
          </div>
        </div>
        <aside className="model-panel">
          <p className="eyebrow">FAQ</p>
          <h3>常见问题</h3>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} open={faq === faqs[0]}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </aside>
      </section>
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

function BoardSection({ title, note, rows }) {
  return (
    <section className="subsection">
      <SectionTitle eyebrow="Board" title={title} text={note} />
      <div className="board-grid">
        {rows.map((row) => (
          <article className="board-card" key={`${title}-${row.role}`}>
            <strong>{row.role}</strong>
            <p>{row.names.join("、")}</p>
          </article>
        ))}
      </div>
    </section>
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
      <div>
        <button className="brand footer-brand" type="button" onClick={() => navigate("/")}>
          <img src="/assets/ata-logo.png" alt="" />
          <span>
            <strong>Austeoswa</strong>
            <small>{site.tagline}</small>
          </span>
        </button>
        <p>{site.description}</p>
      </div>
      <div className="footer-links">
        {navItems.map((item) => (
          <button key={item.href} type="button" onClick={() => navigate(item.href)}>{item.label}</button>
        ))}
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);

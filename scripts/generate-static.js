// Simple static site generator: reads seed_payload.json and outputs a GitHub Pages friendly static site under gh-pages/
const fs = require("fs");
const path = require("path");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function escapeHTML(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tagVariant(label, project) {
  const catBadges = project.categoryBadges || [];
  const match = catBadges.find(cb => cb.label === label);
  if (match) return match.variant;
  return "default";
}

function renderIndex(site, projects) {
  const heroLinks = (site.hero.ctas || [])
    .map(
      (cta) => `<a href="${cta.href}" class="cta">${escapeHTML(cta.label)}</a>`,
    )
    .join("");
  const bullets = (site.aboutBullets || [])
    .map((b) => `<li>${escapeHTML(b)}</li>`)
    .join("");
  const projCards = (projects || [])
    .slice(0, 6)
    .map((p) => {
      const catBadges = (p.categoryBadges || [])
        .map(cb => `<span class="project-badge ${cb.variant}">${escapeHTML(cb.label)}</span>`)
        .join("");
      const badges = (p.badges || p.techStack || [])
        .slice(0, 5)
        .map(b => `<span class="tag">${escapeHTML(b)}</span>`)
        .join("");
      const liveBtn = p.links?.live
        ? `<a href="${p.links.live}" target="_blank" rel="noopener" class="btn-live">Live</a>`
        : "";

      return `
    <article class="project-card">
      ${catBadges ? `<div class="project-card-header">${catBadges}</div>` : ""}
      <h3 class="project-title">${escapeHTML(p.title)}</h3>
      <p class="project-desc">${escapeHTML(p.description)}</p>
      <div class="project-tags">${badges}</div>
      <div class="project-card-footer">
        <a href="projects/${p.slug}.html" class="btn-case-study">Read Case Study</a>
        ${liveBtn}
      </div>
    </article>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Ashutosh Raval - Portfolio</title>
  <link rel="stylesheet" href="css/styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <header class="site-header">
    <a href="index.html" class="brand">Ashutosh Raval</a>
    <nav>
      <a href="projects/chat-microservice.html">Projects</a>
    </nav>
  </header>
  <main class="container">
    <section class="hero">
      <h1>${escapeHTML(site.hero.headline)}</h1>
      <p>${escapeHTML(site.hero.subheading)}</p>
      <div class="cta-row">${heroLinks}</div>
      <p class="lead">${escapeHTML(site.hero.summary)}</p>
    </section>
    <section class="about">
      <h2>About Me</h2>
      <ul>${bullets}</ul>
    </section>
    <section class="projects">
      <h2>Projects</h2>
      <div class="project-grid">${projCards}</div>
    </section>
  </main>
  <footer class="site-footer">&copy; ${new Date().getFullYear()} Ashutosh Raval</footer>
</body>
</html>`;
}

function renderProjectPage(p) {
  const decisions = (p.caseStudy?.decisions || []).filter(Boolean);
  const badges = p.badges || p.techStack || [];
  const categoryBadges = p.categoryBadges || [];
  const techGroups = p.techGroups;
  const impactMetrics = p.impactMetrics || [];
  const metrics = p.metrics || [];
  const infra = p.infrastructure || [];

  const heroTags = [
    ...badges.slice(0, 3).map(b => `<span class="tag">${escapeHTML(b)}</span>`),
    ...categoryBadges.map(cb => `<span class="tag ${cb.variant}">${escapeHTML(cb.label)}</span>`)
  ].join("");

  const metaItems = [];
  if (p.domain) {
    metaItems.push(`<div class="meta-item"><span class="meta-label">Domain</span><span class="meta-value">${escapeHTML(p.domain)}</span></div>`);
  }
  if (p.roleCount) {
    metaItems.push(`<div class="meta-item"><span class="meta-label">Roles</span><span class="meta-value">${escapeHTML(p.roleCount)}</span></div>`);
  }
  if (p.links?.live) {
    const displayUrl = p.links.live.replace(/^https?:\/\//, '').replace(/\/$/, '');
    metaItems.push(`<div class="meta-item"><span class="meta-label">Live</span><a href="${p.links.live}" target="_blank" rel="noopener" class="live-link"><span class="live-dot"></span>${escapeHTML(displayUrl)}</a></div>`);
  }

  // Sections
  let sections = "";

  if (p.caseStudy?.problemStatement) {
    sections += `
  <div class="section">
    <p class="section-label">01 / The Challenge</p>
    <h2>Fragmented workflows across project stakeholders</h2>
    <p>${escapeHTML(p.caseStudy.problemStatement)}</p>
  </div>`;
  }

  if (p.caseStudy?.systemRoles && p.caseStudy.systemRoles.length > 0) {
    const roleIcons = {
      'Super Admin': '&#x1F6E1;&#xFE0F;',
      'Admin': '&#x1F464;',
      'Inspector': '&#x1F50D;',
      'Contractor': '&#x1F527;',
      'Client': '&#x1F3E2;'
    };
    const roleCards = p.caseStudy.systemRoles.map(r => `
      <div class="role-card">
        <div class="role-icon">${roleIcons[r.name] || '&#x1F4CB;'}</div>
        <div class="role-name">${escapeHTML(r.name)}</div>
        <div class="role-desc">${escapeHTML(r.description)}</div>
      </div>`).join("");

    sections += `
  <div class="section">
    <p class="section-label">02 / System Roles</p>
    <h2>${p.caseStudy.systemRoles.length} distinct roles, one unified platform</h2>
    <div class="roles-grid">${roleCards}</div>
  </div>`;
  }

  if (p.caseStudy?.coreWorkflow && p.caseStudy.coreWorkflow.length > 0) {
    const wfSteps = p.caseStudy.coreWorkflow.map(s => `
      <div class="wf-step">
        <div class="wf-num">${String(s.step).padStart(2, '0')}</div>
        <div class="wf-content">
          <div class="wf-title">${escapeHTML(s.title)}</div>
          <div class="wf-desc">${escapeHTML(s.description)}</div>
        </div>
      </div>`).join("");

    sections += `
  <div class="section">
    <p class="section-label">03 / Core Workflow</p>
    <h2>From project creation to delivery</h2>
    <div class="workflow">${wfSteps}</div>
  </div>`;
  }

  if (p.caseStudy?.featureModules && p.caseStudy.featureModules.length > 0) {
    const modCards = p.caseStudy.featureModules.map(m => `
      <div class="module-card">
        <div class="module-title">${escapeHTML(m.title)}</div>
        <div class="module-desc">${escapeHTML(m.description)}</div>
      </div>`).join("");

    sections += `
  <div class="section">
    <p class="section-label">04 / Feature Modules</p>
    <h2>Key capabilities across the platform</h2>
    <div class="modules-grid">${modCards}</div>
  </div>`;
  }

  if (p.caseStudy?.architectureDetails || decisions.length > 0) {
    let archContent = "";
    if (p.caseStudy?.architectureDetails) {
      archContent += `<p>${escapeHTML(p.caseStudy.architectureDetails)}</p>`;
    }
    if (decisions.length > 0) {
      const decisionItems = decisions.map(d => {
        const boldMatch = d.match(/^([^—–-]+)[—–-]\s*(.+)$/);
        const inner = boldMatch
          ? `<strong>${escapeHTML(boldMatch[1].trim())}</strong> ${escapeHTML(boldMatch[2])}`
          : escapeHTML(d);
        return `<div class="decision"><div class="decision-dot"></div><div class="decision-text">${inner}</div></div>`;
      }).join("");
      archContent += `<div class="decisions">${decisionItems}</div>`;
    }

    sections += `
  <div class="section">
    <p class="section-label">05 / Architecture Insights</p>
    <h2>Design decisions that drive reliability</h2>
    <div class="arch-card">${archContent}</div>
  </div>`;
  }

  if (impactMetrics.length > 0 || metrics.length > 0) {
    const parseVal = (raw) => {
      const m = raw.match(/^([^\d]*)([\d]+)([^\d]*)$/);
      if (m && m[2]) return { main: m[1] + m[2], suffix: m[3] || "" };
      return { main: raw, suffix: "" };
    };

    const impactCards = (impactMetrics.length > 0 ? impactMetrics : metrics.map(m => ({ value: m, label: "" })))
      .map(im => {
        const { main, suffix } = parseVal(im.value);
        const suffixSpan = suffix ? `<span>${escapeHTML(suffix)}</span>` : "";
        return `
      <div class="impact-card">
        <div class="impact-value">${escapeHTML(main)}${suffixSpan}</div>
        <div class="impact-label">${escapeHTML(im.label)}</div>
      </div>`;
      }).join("");

    sections += `
  <div class="section">
    <p class="section-label">06 / Impact</p>
    <h2>Measurable outcomes delivered</h2>
    <div class="impact-grid">${impactCards}</div>
  </div>`;
  }

  if (techGroups || badges.length > 0 || infra.length > 0) {
    let stackHTML = "";
    if (techGroups) {
      const groups = Object.entries(techGroups).map(([group, tags]) => `
      <div class="stack-group">
        <div class="stack-group-label">${escapeHTML(group)}</div>
        <div class="stack-tags">${tags.map(t => `<span class="stack-tag">${escapeHTML(t)}</span>`).join("")}</div>
      </div>`).join("");
      stackHTML = `<div class="stack-grid">${groups}</div>`;
    } else {
      const allTags = [
        ...badges.map(b => `<span class="stack-tag">${escapeHTML(b)}</span>`),
        ...infra.map(i => `<span class="stack-tag" style="color:#10b981;border-color:rgba(16,185,129,0.2)">${escapeHTML(i)}</span>`)
      ].join("");
      stackHTML = `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:1.5rem">${allTags}</div>`;
    }

    sections += `
  <div class="section">
    <p class="section-label">07 / Technology & Infrastructure</p>
    <h2>Stack</h2>
    ${stackHTML}
  </div>`;
  }

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${escapeHTML(p.title)} | Ashutosh Raval</title>
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <nav class="static-nav">
    <a href="../" class="nav-logo">Ashutosh Raval</a>
    <ul class="nav-links">
      <li><a href="../projects/chat-microservice.html">Projects</a></li>
      <li><a href="https://drive.google.com/uc?export=download&id=1E7TDI-G897_zsH1-PKVzAm1_guaqwjv4" target="_blank" rel="noopener noreferrer">Resume</a></li>
      <li><a href="../contact.html">Contact</a></li>
    </ul>
  </nav>

  <section class="project-hero">
    <a href="../projects/chat-microservice.html" class="back-link">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 3L5 8l5 5"/></svg>
      Back to Projects
    </a>

    <p class="hero-label">Case Study</p>
    <h1 class="hero-title">${escapeHTML(p.title)}</h1>
    <p class="hero-subtitle">${escapeHTML(p.description)}</p>

    <div class="tag-row">${heroTags}</div>

    <div class="meta-row">${metaItems.join("")}</div>
  </section>

  <div class="divider"></div>

  <div class="project-content">${sections}</div>

  <footer class="project-footer">&copy; ${new Date().getFullYear()} Ashutosh Raval</footer>
</body>
</html>`;
}

function main() {
  const seedPath = path.resolve(__dirname, "../seed_payload.json");
  const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
  const site = seed.site || seed[0] || {};
  const projects = seed.projects || [];

  const gh = path.resolve(__dirname, "../gh-pages");
  const ghAssets = path.resolve(gh, "assets");
  ensureDir(gh);
  ensureDir(path.resolve(gh, "projects"));
  ensureDir(path.resolve(gh, "css"));
  ensureDir(ghAssets);

  // Copy resume asset if exists in seed
  const resumeUrl = site?.resume?.file?.url;
  if (resumeUrl) {
    const src = path.resolve(__dirname, "../public/resume/Ashutosh_Raval_Resume.pdf");
    const destDir = path.resolve(gh, "assets", "resume");
    ensureDir(destDir);
    const dest = path.resolve(destDir, "Ashutosh_Raval_Resume.pdf");
    try {
      fs.copyFileSync(src, dest);
    } catch {}
  }

  // Copy contact.html if exists
  const contactSrc = path.resolve(__dirname, "../docs/contact.html");
  const contactDest = path.resolve(gh, "contact.html");
  try {
    if (fs.existsSync(contactSrc)) {
      fs.copyFileSync(contactSrc, contactDest);
    }
  } catch {}

  // Write index.html
  const indexHtml = renderIndex(site, projects);
  fs.writeFileSync(path.resolve(gh, "index.html"), indexHtml, "utf8");

  // Write project pages
  (projects || []).forEach((p) => {
    const html = renderProjectPage(p);
    fs.writeFileSync(
      path.resolve(gh, "projects", `${p.slug}.html`),
      html,
      "utf8",
    );
  });

  // Write CSS
  const css = `/* Basic dark theme for static export */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0a0a0f;
  --fg: #e8e8f0;
  --muted: #8888a0;
  --accent: #1e40af;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
  font-size: 15px;
  line-height: 1.75;
}

/* Nav */
.static-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10,10,15,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}
.nav-logo { font-size: 15px; font-weight: 600; color: var(--fg); text-decoration: none; }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a { font-size: 13px; color: var(--muted); text-decoration: none; }
.nav-links a:hover { color: var(--fg); }

/* Site header */
.site-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: #0b1020; border-bottom: 1px solid #1e2a57; }
.brand { font-size: 15px; font-weight: 600; color: var(--fg); text-decoration: none; }
.site-header nav a { font-size: 13px; color: var(--muted); text-decoration: none; margin-left: 16px; }
.site-header nav a:hover { color: var(--fg); }

.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
.hero { padding: 60px 0 40px; }
.cta { display: inline-block; margin-right: 8px; padding: 10px 14px; background: #1e3a8a; color: white; text-decoration: none; border-radius: 6px; }
.cta-row { margin: 20px 0; }
.lead { color: var(--muted); max-width: 620px; }
.about { padding: 40px 0; }
.about ul { color: var(--muted); padding-left: 20px; }
.about li { margin-bottom: 8px; }

/* Project grid */
.projects { padding: 40px 0 60px; }
.project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.project-card {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 20px;
  background: #111118;
  transition: border-color .2s, transform .2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.project-card:hover { border-color: rgba(99,179,237,0.25); transform: translateY(-2px); }
.project-card-header { display: flex; gap: 6px; margin-bottom: 12px; }
.project-badge { font-size: 11px; font-weight: 500; padding: 2px 8px; border-radius: 4px; }
.project-badge.amber { background: rgba(246,173,85,0.1); color: #fbd38d; border: 1px solid rgba(246,173,85,0.2); }
.project-badge.green { background: rgba(104,211,145,0.1); color: #9ae6b4; border: 1px solid rgba(104,211,145,0.2); }
.project-title { font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 8px; }
.project-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin: 0 0 12px; flex-grow: 1; }
.project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
.project-tags .tag {
  font-size: 11px;
  font-family: 'JetBrains Mono', monospace, ui-monospace;
  background: rgba(255,255,255,0.04);
  color: var(--fg);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  padding: 2px 8px;
}
.project-card-footer { display: flex; gap: 8px; margin-top: auto; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06); }
.btn-case-study { font-size: 13px; color: #63b3ed; text-decoration: none; border: 1px solid rgba(99,179,237,0.3); border-radius: 6px; padding: 6px 14px; }
.btn-case-study:hover { background: rgba(99,179,237,0.08); }
.btn-live { font-size: 13px; color: #68d391; text-decoration: none; border: 1px solid rgba(104,211,145,0.3); border-radius: 6px; padding: 6px 14px; }
.btn-live:hover { background: rgba(104,211,145,0.08); }

.site-footer { text-align: center; padding: 16px; color: var(--muted); border-top: 1px solid rgba(255,255,255,0.08); }

a { color: #93c5fd; }

/* Project detail page */
.project-hero { max-width: 860px; margin: 0 auto; padding: 5rem 2rem 3.5rem; }
.back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--muted); text-decoration: none; margin-bottom: 2.5rem; transition: color .2s; }
.back-link:hover { color: #63b3ed; }
.back-link svg { width: 14px; height: 14px; }
.hero-label { font-size: 11px; font-family: 'JetBrains Mono', monospace, ui-monospace; letter-spacing: 0.12em; color: #63b3ed; text-transform: uppercase; margin-bottom: 1rem; }
.hero-title { font-size: clamp(2rem, 5vw, 2.75rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 1.25rem; color: #fff; }
.hero-subtitle { font-size: 17px; color: var(--muted); max-width: 620px; margin-bottom: 2rem; }
.tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 2.5rem; }
.tag { font-size: 12px; font-family: 'JetBrains Mono', monospace, ui-monospace; background: rgba(99,179,237,0.1); color: #90cdf4; border: 1px solid rgba(99,179,237,0.2); border-radius: 4px; padding: 3px 10px; }
.tag.green { background: rgba(104,211,145,0.08); color: #9ae6b4; border-color: rgba(104,211,145,0.2); }
.tag.amber { background: rgba(246,173,85,0.08); color: #fbd38d; border-color: rgba(246,173,85,0.2); }
.meta-row { display: flex; flex-wrap: wrap; gap: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); }
.meta-item { display: flex; flex-direction: column; gap: 3px; }
.meta-label { font-size: 11px; font-family: 'JetBrains Mono', monospace, ui-monospace; letter-spacing: 0.1em; color: var(--muted); text-transform: uppercase; }
.meta-value { font-size: 14px; color: var(--fg); }
.live-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #63b3ed; text-decoration: none; border: 1px solid rgba(99,179,237,0.35); border-radius: 6px; padding: 6px 14px; transition: background .2s; }
.live-link:hover { background: rgba(99,179,237,0.08); }
.live-dot { width: 7px; height: 7px; border-radius: 50%; background: #68d391; flex-shrink: 0; animation: pulse 2s infinite; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
.divider { max-width: 860px; margin: 0 auto; height: 1px; background: rgba(255,255,255,0.08); }
.project-content { max-width: 860px; margin: 0 auto; padding: 0 2rem 6rem; }
.section { margin-top: 4rem; }
.section-label { font-size: 11px; font-family: 'JetBrains Mono', monospace, ui-monospace; letter-spacing: 0.12em; color: #63b3ed; text-transform: uppercase; margin-bottom: 1rem; }
.section h2 { font-size: 1.5rem; font-weight: 600; letter-spacing: -0.02em; color: #fff; margin-bottom: 1rem; }
.section p { color: var(--muted); max-width: 680px; line-height: 1.75; }
.section p + p { margin-top: .75rem; }
.roles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 1.5rem; }
.role-card { background: #111118; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.1rem 1.25rem; transition: border-color .2s; }
.role-card:hover { border-color: rgba(99,179,237,0.3); }
.role-icon { font-size: 18px; margin-bottom: 8px; }
.role-name { font-size: 13px; font-weight: 600; color: var(--fg); margin-bottom: 4px; }
.role-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }
.workflow { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0; }
.wf-step { display: flex; gap: 1rem; padding: 1.1rem 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
.wf-step:last-child { border-bottom: none; }
.wf-num { flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; background: rgba(99,179,237,0.1); border: 1px solid rgba(99,179,237,0.25); display: flex; align-items: center; justify-content: center; font-size: 11px; font-family: 'JetBrains Mono', monospace, ui-monospace; color: #63b3ed; font-weight: 500; margin-top: 1px; }
.wf-content { flex: 1; }
.wf-title { font-size: 14px; font-weight: 500; color: var(--fg); margin-bottom: 2px; }
.wf-desc { font-size: 13px; color: var(--muted); }
.modules-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-top: 1.5rem; }
.module-card { background: #111118; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.25rem; transition: border-color .2s; }
.module-card:hover { border-color: rgba(99,179,237,0.25); }
.module-title { font-size: 14px; font-weight: 600; color: var(--fg); margin-bottom: 6px; }
.module-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }
.impact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 1.5rem; }
.impact-card { background: #111118; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.25rem; text-align: left; }
.impact-value { font-size: 2rem; font-weight: 600; color: #fff; letter-spacing: -0.03em; line-height: 1; margin-bottom: 6px; }
.impact-value span { font-size: 1.1rem; color: #68d391; }
.impact-label { font-size: 13px; color: var(--muted); }
.arch-card { background: #111118; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.75rem; margin-top: 1.5rem; }
.arch-card p { color: var(--muted); font-size: 14px; line-height: 1.75; }
.decisions { margin-top: 1.25rem; display: flex; flex-direction: column; gap: 10px; }
.decision { display: flex; gap: 10px; align-items: flex-start; }
.decision-dot { width: 6px; height: 6px; border-radius: 50%; background: #63b3ed; flex-shrink: 0; margin-top: 7px; }
.decision-text { font-size: 13px; color: var(--muted); }
.decision-text strong { color: var(--fg); font-weight: 500; }
.stack-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 1.5rem; }
.stack-group { background: #111118; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.1rem 1.25rem; }
.stack-group-label { font-size: 11px; font-family: 'JetBrains Mono', monospace, ui-monospace; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; }
.stack-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.stack-tag { font-size: 12px; font-family: 'JetBrains Mono', monospace, ui-monospace; background: rgba(255,255,255,0.04); color: var(--fg); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 2px 8px; }
.project-footer { border-top: 1px solid rgba(255,255,255,0.08); padding: 2rem; text-align: center; font-size: 13px; color: var(--muted); }

@media (max-width: 600px) {
  .project-hero { padding: 3rem 1.25rem 2.5rem; }
  .project-content { padding: 0 1.25rem 4rem; }
  .static-nav { padding: 0 1.25rem; }
}

input,
textarea,
select {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #2a2f4f;
  background: #0b1220;
  color: #fff;
  font: inherit;
}

textarea { resize: vertical; }

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}

button,
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 9px 14px;
  border: 0;
  border-radius: 6px;
  background: #1e40af;
  color: #fff;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 3px solid #10b981;
  outline-offset: 2px;
}
`;
  fs.writeFileSync(path.resolve(gh, "css", "styles.css"), css, "utf8");

  console.log(`Static site generated in ${gh}`);
}

main();

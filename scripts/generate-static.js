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
    .replace(/>/g, "&gt;");
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
    .slice(0, 4)
    .map(
      (p) => `
    <div class="card">
      <h3>${escapeHTML(p.title)}</h3>
      <p>${escapeHTML(p.description)}</p>
      <a href="projects/${p.slug}.html" class="link">Read Case Study</a>
      <div class="badges">${(p.badges || []).map((b) => `<span class="badge">${escapeHTML(b)}</span>`).join("")}</div>
    </div>`,
    )
    .join("\n");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Ashutosh Raval - Portfolio</title><link rel="stylesheet" href="css/styles.css"></head><body><header class="site-header"><a href="index.html" class="brand">Ashutosh Raval</a><nav><a href="index.html">Home</a> <a href="projects/chat-microservice.html">Projects</a></nav></header><main class="container"><section class="hero"><h1>${escapeHTML(site.hero.headline)}</h1><p>${escapeHTML(site.hero.subheading)}</p><div class="cta-row">${heroLinks}</div><p class="lead">${escapeHTML(site.hero.summary)}</p></section><section class="about"><h2>About Me</h2><ul>${bullets}</ul></section><section class="projects"><h2>Projects</h2><div class="grid">${projCards}</div></section></main><footer class="site-footer">© ${new Date().getFullYear()} Ashutosh Raval</footer></body></html>`;
}

function renderProjectPage(p) {
  const badges = (p.badges || [])
    .map((b) => `<span class="badge">${escapeHTML(b)}</span>`)
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${escapeHTML(p.title)}</title><link rel="stylesheet" href="../css/styles.css"></head><body><main class="container"><h1>${escapeHTML(p.title)}</h1><p>${escapeHTML(p.description)}</p><section><h2>Case Study</h2><p><strong>Problem:</strong> ${escapeHTML(p.caseStudy?.problemStatement)}</p><p><strong>Solution:</strong> ${escapeHTML(p.caseStudy?.solutionArchitecture)}</p><p><strong>Decisions:</strong> ${escapeHTML((p.caseStudy?.decisions || []).join(", "))}</p><p><strong>Results:</strong> ${escapeHTML(p.caseStudy?.results)}</p></section><section><h3>Tech Stack</h3><div class="badges">${badges}</div></section><section><a href="../../index.html">Back to Home</a></section></main></body></html>`;
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
    // If resume is in public/resume, copy to gh-pages/assets/resume
    const src = path.resolve(
      __dirname,
      "../public/resume/Ashutosh_Raval_Resume.pdf",
    );
    const destDir = path.resolve(gh, "assets", "resume");
    ensureDir(destDir);
    const dest = path.resolve(destDir, "Ashutosh_Raval_Resume.pdf");
    try {
      fs.copyFileSync(src, dest);
    } catch {}
  }

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
.site-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: #0b1020; border-bottom: 1px solid #1e2a57; }
.container { padding: 0 20px; max-width: 1000px; margin: 0 auto; }
.hero { padding: 24px 0; }
.cta { display: inline-block; margin-right: 8px; padding: 10px 14px; background: #1e3a8a; color: white; text-decoration: none; border-radius: 6px; }
.card { border:1px solid #2a2f4f; padding:16px; border-radius: 12px; background:#11152b; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.badge { background: #1f2b54; color: #cbd5e1; padding: 4px 8px; border-radius:999px; font-size:12px; }
.link { color: #93c5fd; }
.site-footer { text-align: center; padding: 16px; color: #cbd5e1; }
`;
  fs.writeFileSync(path.resolve(gh, "css", "styles.css"), css, "utf8");
}

main();

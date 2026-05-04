GitHub Pages: Static export of Ashutosh Raval Portfolio

Overview

- This project ships a static, GitHub Pages-ready export of the portfolio that can be viewed without any local installation.
- It uses a lightweight static-site generator (Node.js script) that reads seed_payload.json and outputs a static site under gh-pages/
- The content remains driven by seeds to ensure updates are straightforward and deterministic.

What’s included

- A static index.html for the home page with hero, about, and a four-project grid.
- Per-project HTML pages under gh-pages/projects/ (four major projects).
- CSS for a clean, dark-theme look (gh-pages/assets/css/styles.css).
- Resumé asset copied to gh-pages/assets/resume/ Ashutosh_Raval_Resume.pdf (placeholder until replaced).
- A simple small CLI workflow to generate and publish to GitHub Pages.

How to generate the static site locally

- Prerequisites: Node.js
- Run the generator:
  - npm run pages:generate
- Inspect the generated files in gh-pages/ (index.html, projects/\*.html, assets/)
- Generate a GitHub Pages-friendly publish step:
  - npm run docs:ghpages

Publishing to GitHub Pages (two common approaches)

- Approach A: Publish to gh-pages branch
  1. Create a gh-pages branch if not present: git checkout --orphan gh-pages
  2. Remove existing files and copy gh-pages content: git rm -rf .; cp -R gh-pages/\* .
  3. Commit and push: git add .; git commit -m "Publish portfolio static site to GH Pages"; git push origin gh-pages
  4. In GitHub, set Pages source to gh-pages branch root.
- Approach B: Publish to docs/ folder on main
  1. Move generated site into docs/ (docs/ should contain index.html and assets)
  2. Commit and push to main; in GitHub, set Pages source to main / docs.

Maintenance tips

- To update the site, run npm run pages:generate again, then re-publish using one of the approaches above.
- Keep seed_payload.json as the single source of truth for content; regenerate static pages whenever you update content.
- If you need to update assets (resume, images), place them in gh-pages/assets/ and reference them in your content seeds.

Notes

- This approach intentionally stays static. If you want a CMS-driven dynamic version later (Payload), you can point a lightweight frontend at a read-only API to fetch project data and render client-side.

Examples

- Seed data source: seed_payload.json at repo root
- Generated static site: gh-pages/
- CSS: gh-pages/css/styles.css
- Projects: gh-pages/projects/chat-microservice.html, etc.

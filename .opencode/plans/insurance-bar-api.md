# Insurance Bar API Project Addition Plan

## Overview
Add a new project entry for "Insurance Bar API" to the portfolio seed data (`seed_payload.json`).

## Changes Required

### 1. `seed_payload.json` — Add new project to `projects` array

Insert a new project object **before line 234** (the `]` that closes the `projects` array), after the CCM project entry.

**Slug:** `insurance-bar-api` (unique — no existing project uses this)

**Title:** `Insurance Bar API — Multi-Role Insurance Management Platform`

**Category:** `Insurance Technology`

**`links.live`:** `https://admin.theinsurancebar.com/`

### 2. `app/projects/[slug]/page.tsx` — Add role icons (optional)

Add entries to the `roleIcons` record (line 31) so Customer, Partner, and Partner Associate roles render proper icons instead of the fallback clipboard:
- `'Customer': '\u{1F9D1}'` (person)
- `'Partner': '\u{1F91D}'` (handshake)
- `'Partner Associate': '\u{1F465}'` (people)

This is a cosmetic enhancement — the page will still work without it.

## Project Entry Structure (matches existing format)

```json
{
  "slug": "insurance-bar-api",
  "title": "Insurance Bar API — Multi-Role Insurance Management Platform",
  "category": "Insurance Technology",
  "description": "Comprehensive insurance management platform with role-based access control...",
  "keyFeatures": [
    "Role-based access control (Admin, Customer, Partner, Partner Associate)",
    "Policy lifecycle management (create, update, delete, approve)",
    "Claims management with partner assignment",
    "Case management with multi-stage workflow",
    "Master data management (types, categories, insurance companies, documents)",
    "Loan management with approval workflow",
    "Support ticketing system with status tracking",
    "Subscription management with benefit allocation",
    "Payment processing for fees and subscriptions"
  ],
  "techStack": ["Node.js", "Express", "MongoDB", "PostgreSQL", "React", "React Router", "Axios", "JWT"],
  "techGroups": {
    "Backend": ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    "Frontend": ["React", "React Router", "Axios"],
    "Auth & Security": ["JWT", "RBAC", "Role Middleware"]
  },
  "metrics": ["4 Role-Based Portals", "End-to-End Policy Management", "Multi-Stage Case Workflow"],
  "impactMetrics": [
    { "value": "4×", "label": "Role-specific portals for different user types" },
    { "value": "E2E", "label": "End-to-end insurance lifecycle management" },
    { "value": "✓", "label": "Secure data isolation between roles" },
    { "value": "$", "label": "Integrated payment and subscription handling" }
  ],
  "impact": "...",
  "caseStudy": { ... },
  "links": { "live": "https://admin.theinsurancebar.com/" },
  "badges": ["Node.js", "MongoDB", "PostgreSQL", "RBAC", "Multi-Role"],
  "categoryBadges": [
    { "label": "Insurance Tech", "variant": "amber" },
    { "label": "Multi-Role", "variant": "green" }
  ]
}
```

## Verification Steps

1. Run `npx tsx --eval "const seed = require('./seed_payload.json'); console.log(seed.projects.length)"` — should output `5` (was 4)
2. Run `node --test tests/static-data.test.js` — all tests should pass (unique slug, valid slug format, title + description + caseStudy required)
3. Run `npm run build` — Next.js build should generate a new page at `/projects/insurance-bar-api`
4. Run `npm run docs:ghpages` — static site generator should create `gh-pages/projects/insurance-bar-api.html`
5. Run `npm run docs:publish` — should copy the new page to `docs/projects/insurance-bar-api.html`

## No Other Files Need Changes

- `app/data/portfolio.ts` — reads from seed_payload.json dynamically, no change needed
- `app/layout.tsx` — maps over `projects` for nav links, auto-includes new project
- `app/projects/page.tsx` and `ProjectCard.tsx` — render from `projects` array, auto-include
- `scripts/generate-static.js` — iterates `seed.projects`, auto-generates new page
- `scripts/publish-docs.js` — copies entire gh-pages/ → docs/, no manual work
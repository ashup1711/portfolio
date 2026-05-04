# Ashutosh Raval Portfolio

Static Next.js portfolio designed for GitHub Pages. The repository can be published without a custom domain at:

`https://<github-username>.github.io/portfolio/`

The public site is data-driven from committed project data and includes menu navigation, local case-study pages, resume download, contact links, and external links to past project repositories.

## Local Development

- npm install
- npm run dev
- Open http://localhost:3000

## GitHub Pages Build

- `npm test`: validate project data, URL helpers, and shared validation helpers.
- `npm run build`: create a local static export in `out/`.
- `npm run build:github`: create a GitHub Pages export using `/portfolio` as the base path.

The GitHub Actions workflow in `.github/workflows/deploy.yml` runs tests, builds with `GITHUB_PAGES=true`, uploads `out/`, and deploys through GitHub Pages.

Repository settings:
- Repository name: `portfolio`
- Settings > Pages > Source: GitHub Actions
- No custom domain required

## Updating Projects

Edit project and site content in `app/data/portfolio.ts`. Each project should include:
- `slug` for `/projects/<slug>/`
- `title`, `category`, and `description`
- `caseStudy` content for the local detail page
- `links.repo` for the past project repository
- optional `links.live` for a deployed demo

The header includes a Past Projects menu that routes to local case studies, and each case study links back out to the project repository.

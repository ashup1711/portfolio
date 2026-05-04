# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 13 portfolio using the App Router. Application pages live in `app/`, including `app/page.tsx`, route folders such as `app/projects/[slug]/page.tsx`, and shared UI in `app/components/`. Data access helpers are in `app/lib/`, with shared TypeScript shapes in `types/`. Legacy API routes and local mock Payload endpoints live under `pages/api/`, including `pages/api/payload/site.ts` and `pages/api/payload/projects.ts`. Static assets are served from `public/`, such as `public/resume/Ashutosh_Raval_Resume.pdf`. Utility scripts belong in `scripts/`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Next.js development server, normally at `http://localhost:3000`.
- `npm run build`: create a production build and run Next.js/TypeScript validation.
- `npm run start`: serve the production build after `npm run build`.
- `npm run seed:reset`: reset the local seed payload via `scripts/resetSeed.js`.

There is currently no dedicated `test`, `lint`, or `format` script. Use `npm run build` as the minimum validation before submitting changes.

## Coding Style & Naming Conventions

Use TypeScript and React functional components. Keep component filenames in PascalCase, for example `ProjectCard.tsx`, and keep route folders lowercase and URL-oriented, for example `app/contact/page.tsx`. Prefer named helper functions in `app/lib/` and shared interfaces in `types/`. Existing code uses two-space indentation, single quotes, and semicolon-free TypeScript; follow that style for consistency. Avoid path aliases unless `tsconfig.json` is updated intentionally.

## Testing Guidelines

No test framework is configured yet. For behavior changes, add focused tests only after introducing a test runner and package script. Until then, manually verify affected routes in `npm run dev` and run `npm run build`. Check mock endpoints such as `/api/payload/site` and `/api/payload/projects` when changing payload data flow.

## Commit & Pull Request Guidelines

This directory does not currently expose Git history, so no repository-specific commit convention can be inferred. Use concise, imperative commit messages such as `Add project detail layout` or `Fix payload project fallback`. Pull requests should describe the user-visible change, list validation performed, mention environment variable changes, and include screenshots for UI updates.

## Security & Configuration Tips

For production-like Payload integration, set `NEXT_PUBLIC_PAYLOAD_BASE_URL` and `NEXT_PUBLIC_PAYLOAD_TOKEN` as needed. Do not commit real tokens, private CMS URLs, or personal credentials. Restart the dev server after changing environment variables.

## Agent-Specific Instructions

When discovering code structure, prefer codebase-memory MCP tools before falling back to text search. Use grep-style tools only for configs, literal strings, or files not indexed by the graph.

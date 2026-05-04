# Ashutosh Raval Portfolio

A data-driven portfolio website built with Next.js (App Router) and TypeScript. It features a flexible architecture that supports both a local mock CMS (for development and seeding) and a production-ready integration with Payload CMS.

## Project Overview

- **Framework:** [Next.js 13](https://nextjs.org/) (utilizing the `app` directory).
- **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety and scalability.
- **Data Layer:** Hybrid approach using either local mock endpoints (`pages/api/payload`) or a remote [Payload CMS](https://payloadcms.com/) instance.
- **Styling:** Vanilla CSS (`app/globals.css`, `app/styles/globals.css`) and [React Icons](https://react-icons.github.io/react-icons/).
- **Key Sections:**
  - **Hero Section:** Personal bio, key highlights, and primary CTAs.
  - **Projects:** Dynamic list of projects with detailed case studies, tech stacks, and metrics.
  - **Contact:** Information and links for professional outreach.

## Getting Started

### Prerequisites
- Node.js (v16.x or later recommended)
- npm

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### Mock API Endpoints
During local development, the site uses in-memory mock endpoints:
- `GET /api/payload/site`: Global site configuration and bio.
- `GET /api/payload/projects`: List of all projects.
- `POST /api/payload/projects`: Add a new project (in-memory).
- `DELETE /api/payload/projects?slug={slug}`: Remove a project (in-memory).

### Resetting Seed Data
To reset the in-memory mock data to the original seed state:
```bash
npm run seed:reset
```

## Production Integration (Payload CMS)

To connect the frontend to a real Payload CMS backend, configure the following environment variables:

- `NEXT_PUBLIC_PAYLOAD_BASE_URL`: The base URL of your Payload CMS instance.
- `NEXT_PUBLIC_PAYLOAD_TOKEN`: (Optional) API token if your Payload instance requires authentication.

Once set, the `app/lib/payloadClient.ts` will automatically switch from local mocks to fetching data from the Payload API.

## Development Conventions

- **Component Structure:** Components are located in `app/components`. Prefer functional components and TypeScript interfaces for props.
- **API Fetching:** All data fetching logic should reside in `app/lib/payloadClient.ts` to maintain a single point of truth for data source switching.
- **Type Safety:** Use the shared types in the `types/` directory and ensure `any` is avoided where possible (refactoring existing `any` types is encouraged).
- **Styling:** Adhere to the existing CSS patterns in `app/globals.css`. Use CSS variables for theme-related colors.

## Project Structure

- `app/`: Next.js App Router files (pages, layouts, components, styles).
- `pages/api/payload/`: Mock CMS API implementation.
- `public/`: Static assets (images, PDFs).
- `scripts/`: Utility scripts (e.g., seeding).
- `types/`: Global TypeScript definitions.
- `seed_payload.json`: Source of truth for initial project and site data.

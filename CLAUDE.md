# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gatsby 2-based static website for Bradley Brown Inc, a custom home construction company. The site showcases projects, services, company information, and career opportunities.

## Development Commands

```bash
# Start development server (runs at http://localhost:8000)
gatsby develop
# or
npm run develop
# or
npm start

# Build for production
gatsby build
# or
npm run build

# Serve production build locally
gatsby serve
# or
npm run serve

# Format code with Prettier
npm run format
```

## Technology Stack

- **Framework**: Gatsby 2.13.25
- **UI Library**: React 16.8.6
- **Styling**: SASS with Bootstrap 4.3.1 and Reactstrap
- **Key Gatsby Plugins**:
  - `gatsby-plugin-layout` - Persistent layout wrapper
  - `gatsby-transformer-json` - JSON data sourcing
  - `gatsby-plugin-react-svg` - SVG component imports
  - `gatsby-plugin-sharp` / `gatsby-image` - Image optimization

## Architecture

**Data-Driven Content**: Structured JSON data powers dynamic sections of the website. These files are parsed at build time using `gatsby-transformer-json`, enabling seamless integration into the GraphQL data layer:

- `src/data/projects.json` — Project portfolio metadata (title, slug, category, images, completion info, status)
- `src/data/careers.json` — Job listings (position, location, employment type, application link)

Best Practice Refinements:
- Store data in a dedicated directory such as `src/data/` (instead of `src/images/data/`) to keep media and content sources cleanly separated.
- Expose JSON nodes through GraphQL queries in components and templates for consistent data access.
- Leverage TypeScript types or GraphQL fragments to enforce schema consistency across pages.
- Consider migrating larger datasets to CMS integration (e.g., Strapi, Sanity) for scalability and non-technical editing capabilities.

**Page Generation**: `gatsby-node.js` programmatically creates individual project pages at `/projects/{slug}` using the `singleProject.js` template and data from `projects.json`.

**Global Layout**: The site uses `gatsby-plugin-layout` with `src/components/layout.js` as the persistent layout wrapper. This component queries site metadata via GraphQL and renders the Header and Footer on all pages.

**Site Configuration**: `gatsby-config.js` contains all site metadata including:

- Company information (title, description, contact details)
- Social media links
- Operating hours and location
- Career benefits
- Author/owner information

**Theme System**: Multiple color themes are available in `src/themes/` (green.scss, orange.scss). Themes are imported in page files to apply different color schemes.

**Component Structure**:

- `src/pages/` - Route-based page components (index.js, about.js, services.js, projects.js, careers.js, contact.js)
- `src/components/` - Reusable components (hero, services, about, feature, news, quote, project cards, etc.)
- `src/templates/` - Page templates for programmatically generated pages
- `src/assets/svg/` - SVG icons organized by type (regular, solid)

**GraphQL Queries**: Components use GraphQL to fetch:

- Site metadata from `gatsby-config.js`
- Project data from JSON files via `gatsby-transformer-json`
- Optimized images via `gatsby-transformer-sharp`

## Key Patterns

**SVG Imports**: SVGs in `src/assets/` can be imported as React components thanks to `gatsby-plugin-react-svg`:

```javascript
import IconName from "../assets/svg/icon-name.svg"
```

**Static Queries**: Layout and components use `useStaticQuery` hook to fetch data that doesn't change based on page context.

**Page Queries**: Page components export GraphQL queries that are automatically executed at build time, with results passed as props.

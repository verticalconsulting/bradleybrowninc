# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gatsby 5-based static website for Bradley Brown Inc, a licensed and insured custom home construction company serving Mississippi. The site showcases completed projects, services, company information, and provides contact/quote request functionality.

**Live Site:** https://bradleybrowninc.com
**Deployment:** Cloudflare Pages (automatic deployment on push to master)
**Repository:** https://github.com/verticalconsulting/bradleybrowninc

## Technology Stack

### Core Framework
- **Gatsby 5.15.0** - React-based static site generator
- **React 18.3.1** - UI library
- **Node.js 18+** - Runtime environment

### Styling
- **SASS/SCSS** - Primary styling approach
- **Bootstrap 4.6.2** - CSS framework
- **Reactstrap 9.2.3** - React Bootstrap components
- Multiple theme system (`src/themes/`)

### Key Gatsby Plugins
- `gatsby-plugin-layout` (4.15.0) - Persistent layout wrapper
- `gatsby-plugin-image` (3.15.0) + `gatsby-plugin-sharp` (5.15.0) - Image optimization
- `gatsby-transformer-json` (5.15.0) - JSON data sourcing for projects
- `gatsby-plugin-react-svg` (3.3.0) - SVG as React components
- `gatsby-plugin-sass` (6.15.0) - SASS/SCSS compilation
- `gatsby-plugin-manifest` (5.15.0) - PWA manifest
- `gatsby-plugin-react-helmet` (6.15.0) - Head tag management

### Analytics & Tracking
- **Google Tag Manager:** GTM-M3W35JTV (in `src/html.js` and `gatsby-ssr.js`)
- **Google Ads Conversion Tracking:** AW-17864041271 (gtag.js)

### Development Tools
- **Prettier 3.2.5** - Code formatting
- **Husky 8.0.3** - Git hooks
- **GitHub Actions** - CI/CD pipeline for PR validation

## Development Commands

```bash
# Start development server (http://localhost:8000)
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

# Validate (build + format)
npm run validate

# Set up git hooks
npm run prepare
```

## Architecture

### Data-Driven Content

**Project Portfolio:**
- Source: `src/images/data/projects.json`
- Schema: `{title, slug, category[], description, img{src[], orig, author}, amount, duration, completionDate, owner, address, featured}`
- Generated Pages: `/projects/{slug}` via `gatsby-node.js`
- Template: `src/templates/singleProject.js`
- Categories: `["construction", "remodeling", "interior design"]`

**Best Practices:**
- Keep JSON data in `src/images/data/` (not scattered)
- Use descriptive slugs (URL-friendly, unique)
- Set `featured: true` to display on homepage
- First image in `img.src[]` array is the thumbnail
- Support external image URLs (Cloudflare Images, Unsplash, etc.)

### Page Generation

**Static Pages** (`src/pages/`):
- `index.js` - Homepage with hero, featured projects, services
- `about.js` - About Us page
- `services.js` - Services overview
- `projects.js` - Project gallery with category filtering
- `contact.js` - Contact form and information
- `privacy-policy.js` - GDPR/privacy compliance page
- `thank-you.js` - Post-submission confirmation
- `quote.js` - Quote request page

**Dynamic Pages** (generated via `gatsby-node.js`):
- `/projects/{slug}/` - Individual project detail pages
- Uses `src/templates/singleProject.js`
- Queries project data via GraphQL by slug

### Global Layout

**Layout System:**
- Plugin: `gatsby-plugin-layout` with `src/components/layout.js`
- Persistent across all pages (no unmount/remount on navigation)
- Queries site metadata via GraphQL
- Renders `<Header>` and `<Footer>` globally

**Site Configuration** (`gatsby-config.js`):
Contains all site metadata:
- Company information (title, description, contact details)
- Social media links (Facebook, Twitter, Instagram, LinkedIn)
- Operating hours and location
- Service areas (counties served)
- Service offerings
- Career benefits
- Author/owner information

GraphQL queries access this data via `site.siteMetadata`.

### Theme System

**Multiple Themes:**
- `src/themes/green.scss` - Primary theme
- `src/themes/orange.scss` - Alternative theme
- `src/themes/bootstrap-color.scss` - Bootstrap variable overrides

**Usage:**
```javascript
import "../themes/green.scss"
```

### Component Structure

**Component Organization:**
- `src/components/` - Reusable components
  - `layout.js` - Global wrapper
  - `header.js` - Navigation with responsive menu
  - `footer.js` - Footer with links, contact info, badges
  - `hero.js` - Hero sections with video/image backgrounds
  - `services.js` - Services grid
  - `about.js` - About section
  - `project.js` - Project gallery with category filtering
  - `projCard.js` - Individual project cards
  - `photoViewer.js` - Image gallery viewer
  - `pageHeader.js` - Page title headers
  - Additional utility components (list1, list2, feature, quote, etc.)

**Component Patterns:**
- Functional components with hooks
- Props validation with PropTypes
- SCSS modules for component-specific styles
- GraphQL queries for data requirements

### SVG Assets

**SVG Icons:**
- Location: `src/assets/svg/`
- Organized by type: `regular/`, `solid/`
- Import as React components:
  ```javascript
  import IconName from "../assets/svg/solid/icon-name.svg"
  ```
- Enabled by `gatsby-plugin-react-svg`

### GraphQL Queries

**Static Queries** (useStaticQuery hook):
- Layout component queries site metadata
- Used for data that doesn't change based on page context

**Page Queries** (exported GraphQL queries):
- Page components export queries
- Automatically executed at build time
- Results passed as props to component

**Example:**
```javascript
export const query = graphql`
  query($slug: String!) {
    projectsJson(slug: { eq: $slug }) {
      title
      category
      description
    }
  }
`
```

## Key Patterns & Conventions

### Image References in CSS/SCSS

**CRITICAL:** Always use correct paths and existing files:
```scss
/* ✅ CORRECT - file exists */
background-image: url("../images/bg.jpg");

/* ❌ WRONG - file doesn't exist */
background-image: url("../images/bg.webp");
```

**Common Issues:**
- Missing leading `../` relative path
- Wrong file extension (`.webp` vs `.jpg`)
- File doesn't exist in `src/images/`
- Case sensitivity differences (Windows vs Linux)

**Validation:**
- Pre-commit hook checks for missing image references
- CI/CD pipeline validates on every PR
- Build fails if referenced images don't exist

### Link Paths

**CRITICAL:** Always use absolute paths for internal links:
```javascript
/* ✅ CORRECT - absolute path */
<Link to="/projects/custom-home-build">

/* ❌ WRONG - relative path */
<Link to="projects/custom-home-build">
```

**Recent Fixes:**
- `src/components/projCard.js:10` - Fixed project card links
- `src/components/footer.js:95` - Fixed privacy policy link

### Form Configuration

**Current Setup:**
- Uses Netlify Forms syntax (`data-netlify="true"`)
- For Cloudflare Pages deployment, forms may need migration to:
  - Formspree (recommended for simplicity)
  - Getform
  - Custom serverless function

**Form Example:**
```javascript
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
```

## CI/CD & Quality Assurance

### GitHub Actions Pipeline

**Workflow:** `.github/workflows/pr-validation.yml`

**Automated Checks on PR:**
1. **Build Validation** - Full Gatsby production build
2. **Image Reference Check** - Validates all CSS/SCSS `url()` references
3. **Code Formatting** - Prettier validation
4. **Linting** - ESLint checks (if configured)

**Build Artifacts:**
- Uploads `public/` directory for review
- Retention: 7 days

### Git Hooks (Husky)

**Pre-commit** (`.husky/pre-commit`):
- Validates image references in staged CSS/SCSS files
- Runs Prettier on staged files
- Auto-adds formatted files back to commit

**Pre-push** (`.husky/pre-push`):
- Runs full production build
- Blocks push if build fails
- Ensures deployable code

### PR Templates & Issues

**Templates:**
- `.github/PULL_REQUEST_TEMPLATE/pull_request_template.md` - Comprehensive PR checklist
- `.github/ISSUE_TEMPLATE/build-failure.md` - Build error reporting
- `.github/ISSUE_TEMPLATE/bug-report.md` - General bug reports
- `.github/ISSUE_TEMPLATE/feature-request.md` - Feature suggestions

**Contribution Guide:**
- `CONTRIBUTING.md` - Complete contributor workflow
- Branch strategy (feature/*, fix/*, content/*)
- Code style guidelines
- Testing requirements

## Deployment

### Cloudflare Pages Configuration

**Build Settings:**
```
Build command: npm run build
Build output directory: public
Node version: 18
Root directory: (root)
```

**Automatic Deployment:**
- Trigger: Push to `master` branch
- Build time: ~2-3 minutes
- CDN propagation: ~1-2 minutes

**Environment Variables:**
- `NODE_VERSION=18` (set in Cloudflare dashboard)

**Custom Domain:**
- Primary: bradleybrowninc.com
- Configured via Cloudflare DNS

### Manual Deployment

```bash
# Build locally
npm run build

# Deploy with Wrangler
npx wrangler pages deploy public --project-name=bradleybrowninc
```

## Analytics Implementation

### Google Tag Manager (GTM)

**Container ID:** GTM-M3W35JTV

**Implementation:**
- `src/html.js` - Custom HTML component with GTM script in `<head>`
- `gatsby-ssr.js` - Server-side rendering with `onRenderBody` hook
- Includes both script tag and noscript iframe

**Tracking:**
- Page views (automatic)
- Custom events (configurable in GTM dashboard)
- E-commerce tracking (if configured)

### Google Ads Conversion Tracking

**Conversion ID:** AW-17864041271

**Implementation:**
- `src/html.js` - gtag.js async script after GTM
- `gatsby-ssr.js` - Parallel implementation for SSR
- Positioned immediately after `<head>` element

**Tracking:**
- Conversion events
- Remarketing
- Dynamic remarketing (if configured)

## Common Issues & Solutions

### Build Failures

**Issue:** Missing image references
```
Error: Can't resolve '../images/filename.jpg'
```

**Solution:**
1. Check if file exists in `src/images/`
2. Verify path is correct in SCSS file
3. Check file extension matches (`.jpg` vs `.webp`)
4. Ensure proper relative path (`../images/` from `src/components/`)

**Prevention:**
- Pre-commit hooks validate before commit
- CI/CD pipeline catches before merge

### 404 Errors

**Issue:** Links to project pages or privacy policy return 404

**Common Causes:**
1. Missing leading slash in Link component
2. Incorrect path in footer/navigation
3. Page file doesn't exist in `src/pages/`
4. Dynamic page not generated in `gatsby-node.js`

**Solutions:**
- Always use absolute paths: `/projects/${slug}`
- Verify page files exist
- Check `gatsby-node.js` for page generation logic
- Run `gatsby clean && gatsby develop` to regenerate pages

### Development Server Issues

**Issue:** Changes not reflecting, stale cache

**Solution:**
```bash
gatsby clean
npm run develop
```

**Issue:** GraphQL errors

**Solution:**
- Check GraphQL playground: http://localhost:8000/___graphql
- Verify query syntax
- Ensure data source files exist
- Rebuild schema: `gatsby clean`

## File Naming & Organization Conventions

### Component Files
- **Naming:** camelCase (e.g., `projCard.js`, `photoViewer.js`)
- **Co-located SCSS:** Same name as component (e.g., `projCard.scss`)
- **Location:** `src/components/` for reusable, `src/pages/` for routes

### Page Files
- **Naming:** kebab-case matches URL (e.g., `privacy-policy.js` → `/privacy-policy`)
- **Location:** `src/pages/`
- **Routing:** Automatic by Gatsby based on filename

### Data Files
- **Location:** `src/images/data/` (better than `src/data/` for this project)
- **Format:** JSON for structured data
- **Naming:** Descriptive, plural (e.g., `projects.json`)

### Theme Files
- **Location:** `src/themes/`
- **Naming:** Color name (e.g., `green.scss`, `orange.scss`)
- **Common:** `bootstrap-color.scss` for variable overrides

### Asset Files
- **Images:** `src/images/` (PNG, JPG, WebP)
- **SVG Icons:** `src/assets/svg/regular/` or `src/assets/svg/solid/`
- **Badges:** `src/images/badge/` (company certifications)

## SEO & Meta Configuration

### Global SEO (gatsby-config.js)
```javascript
siteMetadata: {
  title: `Bradley Brown Inc`,
  description: `No job is too big, or too small...`,
  // ... other metadata
}
```

### Page-level SEO (React Helmet)
```javascript
import { Helmet } from "react-helmet"

<Helmet>
  <title>Page Title - Bradley Brown Inc</title>
  <meta name="description" content="..." />
</Helmet>
```

### PWA Configuration
- Manifest: Configured via `gatsby-plugin-manifest`
- Icon: `src/images/brand-logo.png` (generates all sizes)
- Offline support: `gatsby-plugin-offline` (commented out, can enable)

## Performance Optimization

### Static Site Generation (SSG)
- All pages pre-rendered at build time
- No runtime data fetching
- Fast page loads from CDN

### Image Optimization
- `gatsby-plugin-sharp` + `gatsby-plugin-image`
- Automatic responsive images
- WebP format generation
- Lazy loading built-in

### Code Splitting
- Automatic JavaScript bundle optimization
- Route-based code splitting
- Component-level lazy loading support

### CDN Delivery (Cloudflare)
- Global edge network
- Automatic caching
- DDoS protection
- Free SSL/TLS

## Testing Strategy

### Manual Testing Checklist
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Project detail pages generate properly
- [ ] Forms submit (test in production/staging)
- [ ] Images load correctly
- [ ] Mobile responsive design
- [ ] Cross-browser compatibility

### Automated Testing
- **Build validation** - CI/CD pipeline
- **Image reference checks** - Pre-commit & CI
- **Code formatting** - Prettier pre-commit
- **Linting** - ESLint (if configured)

### Pre-deployment Checklist
1. Run `npm run build` locally - should succeed
2. Run `npm run serve` - manually test production build
3. Check PR validation - all checks green
4. Review build output for warnings
5. Test on multiple browsers/devices

## Documentation Files

- **README.md** - Project overview, quick start, comprehensive reference
- **CLAUDE.md** (this file) - AI assistant development context
- **CONTRIBUTING.md** - Contributor guidelines, PR workflow
- **SITE-MANAGEMENT.md** - Content management guide for non-developers
- **CLOUDFLARE-WORKER-SETUP.md** - Cloudflare Worker redirect configuration
- **LOGO_README.md** - Logo asset usage guidelines

## Important Notes for AI Assistants

### When Making Changes

1. **Always validate image paths** before committing CSS/SCSS changes
2. **Use absolute paths** for internal links (start with `/`)
3. **Check file existence** before referencing in code
4. **Run build locally** to validate changes before PR
5. **Update documentation** if changing architecture or patterns

### When Fixing Bugs

1. **Search for similar patterns** in codebase before fixing
2. **Fix all instances** of the same issue (not just one)
3. **Add validation** to prevent recurrence (git hooks, CI checks)
4. **Document the fix** in commit message and relevant docs

### When Adding Features

1. **Follow existing patterns** in the codebase
2. **Add to appropriate directories** following conventions
3. **Update gatsby-config.js** if adding plugins or metadata
4. **Update documentation** files (README, CLAUDE.md, etc.)
5. **Test thoroughly** before committing

### Code Style Preferences

- **JavaScript:** ES6+ syntax, functional components with hooks
- **Styling:** SCSS with BEM-like naming, component-scoped styles
- **File Organization:** Co-locate related files (component + styles)
- **Comments:** Use for complex logic, not obvious code
- **Commits:** Descriptive messages following conventional commits style

## Support & Resources

**Documentation:**
- Gatsby: https://www.gatsbyjs.com/docs/
- React: https://react.dev/
- Cloudflare Pages: https://developers.cloudflare.com/pages/

**Project Resources:**
- Repository: https://github.com/verticalconsulting/bradleybrowninc
- Live Site: https://bradleybrowninc.com
- Issue Tracker: GitHub Issues

**Contact:**
- Technical Lead: Corey Hughes (corey@verticalconsulting.net)
- Business Contact: bradleybrowninc@gmail.com
- Phone: 601-954-1306

---

**Last Updated:** 2025-01-09
**Gatsby Version:** 5.15.0
**Node Version:** 18+
**Deployment:** Cloudflare Pages

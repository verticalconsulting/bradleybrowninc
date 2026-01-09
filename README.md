# Bradley Brown Inc - Custom Home Builder Website

![Bradley Brown Inc](https://bradleybrowninc.com/icons/icon-144x144.png)

Professional website for Bradley Brown Inc, a licensed and insured custom home builder serving Rankin, Madison, Hinds, and Scott Counties in Mississippi.

**Live Site:** [https://bradleybrowninc.com](https://bradleybrowninc.com)

## 🏗️ About

Bradley Brown Inc specializes in custom home building, remodeling, and construction services in the Mississippi area. This website showcases our portfolio, services, and provides an easy way for potential clients to get in touch.

## 🚀 Technology Stack

- **Framework:** Gatsby 5 (Static Site Generator)
- **UI Library:** React 18
- **Styling:** SASS/SCSS with Bootstrap 4 and Reactstrap
- **Deployment:** Cloudflare Pages
- **Analytics:**
  - Google Tag Manager (GTM-M3W35JTV)
  - Google Ads Conversion Tracking (AW-17864041271)
- **Forms:** Configurable (Netlify Forms, Formspree, or custom)

### Key Gatsby Plugins

- `gatsby-plugin-layout` - Persistent layout wrapper
- `gatsby-plugin-image` / `gatsby-plugin-sharp` - Optimized image processing
- `gatsby-transformer-json` - JSON data sourcing for projects
- `gatsby-plugin-react-svg` - SVG component imports
- `gatsby-plugin-sass` - SASS/SCSS support

## 📁 Project Structure

```
bradleybrowninc/
├── src/
│   ├── pages/              # Route-based pages
│   │   ├── index.js        # Homepage
│   │   ├── about.js        # About Us
│   │   ├── services.js     # Services
│   │   ├── projects.js     # Projects gallery
│   │   ├── contact.js      # Contact page
│   │   ├── privacy-policy.js
│   │   └── thank-you.js
│   ├── components/         # Reusable React components
│   │   ├── layout.js       # Global layout wrapper
│   │   ├── header.js       # Navigation header
│   │   ├── footer.js       # Site footer
│   │   ├── hero.js         # Hero sections
│   │   ├── project.js      # Project gallery
│   │   └── projCard.js     # Project cards
│   ├── templates/          # Dynamic page templates
│   │   └── singleProject.js
│   ├── images/             # Image assets
│   │   └── data/
│   │       └── projects.json  # Project portfolio data
│   ├── themes/             # SCSS theme files
│   │   ├── green.scss
│   │   └── orange.scss
│   └── assets/             # SVG icons
├── gatsby-config.js        # Gatsby configuration & site metadata
├── gatsby-node.js          # Dynamic page generation
├── gatsby-ssr.js           # Server-side rendering (GTM, gtag)
├── src/html.js             # Custom HTML wrapper
├── .github/                # GitHub Actions & templates
│   ├── workflows/
│   │   └── pr-validation.yml
│   ├── PULL_REQUEST_TEMPLATE/
│   └── ISSUE_TEMPLATE/
├── .husky/                 # Git hooks
└── CONTRIBUTING.md         # Contributor guidelines
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/verticalconsulting/bradleybrowninc.git
cd bradleybrowninc

# Install dependencies
npm install

# Set up git hooks (automatic)
npm run prepare
```

### Development Commands

```bash
# Start development server (http://localhost:8000)
npm run develop
# or
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve

# Format code with Prettier
npm run format

# Validate build and formatting
npm run validate
```

### GraphQL Playground

When running the dev server, access the GraphQL playground at:
- **http://localhost:8000/___graphql**

## 📝 Content Management

### Site Metadata

Edit global site information in `gatsby-config.js`:

```javascript
module.exports = {
  siteMetadata: {
    title: `Bradley Brown Inc`,
    fullTitle: `Bradley Brown Inc - Licensed & Insured Custom Home Builder`,
    description: `No job is too big, or too small...`,
    email: `bradleybrowninc@gmail.com`,
    contact: {
      mobile: `601-954-1306`,
      telephone: `601-954-1306`,
    },
    address: `104 Tiffany Drive, Brandon, MS 39042`,
    social: {
      facebook: `https://www.facebook.com/BradleyBrownInc`,
      // ... other social links
    }
  }
}
```

### Managing Projects

Projects are stored in `src/images/data/projects.json`. Each project is dynamically generated into a page at `/projects/{slug}`.

**Add a new project:**

```json
{
  "title": "Custom Home Build",
  "slug": "custom-home-build",
  "category": ["remodeling", "construction"],
  "description": "Project description here...",
  "img": {
    "src": [
      "https://imagedelivery.net/...",
      "https://imagedelivery.net/..."
    ],
    "orig": "https://source-url.com",
    "author": "Photo credit"
  },
  "amount": "USD $979,000",
  "duration": "120 Calendar days",
  "completionDate": "Feb. 20, 2024",
  "owner": "Client Name",
  "address": "Mississippi",
  "featured": true
}
```

**Key fields:**
- `slug` - URL-friendly identifier (must be unique)
- `category` - Array: `["construction", "remodeling", "interior design"]`
- `featured` - Set to `true` to display on homepage
- `img.src` - Array of image URLs (first image is the thumbnail)

After editing, rebuild the site for changes to take effect.

### Page Content

Edit page content directly in `src/pages/*.js` files. Most pages use GraphQL to query site metadata from `gatsby-config.js`.

## 🎨 Styling & Themes

Multiple color themes available in `src/themes/`:
- `green.scss`
- `orange.scss`

Import theme in page files:
```javascript
import "../themes/green.scss"
```

Custom component styles are in `src/components/*.scss`.

## 📧 Contact Forms

The contact form can be configured for different platforms:

### Netlify Forms (Default)
```javascript
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
```

### Formspree (Alternative)
```javascript
<form
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
>
```

See `SITE-MANAGEMENT.md` for detailed form configuration.

## 🚢 Deployment

### Cloudflare Pages (Current)

**Build Settings:**
- Build command: `npm run build`
- Build output directory: `public`
- Node version: 18

**Automatic Deployment:**
Every push to `master` branch triggers automatic deployment to Cloudflare Pages.

**Manual Deployment:**
```bash
npm run build
npx wrangler pages deploy public --project-name=bradleybrowninc
```

### Environment Variables

Set in Cloudflare Pages dashboard if needed:
- `NODE_VERSION=18`

## 🔍 SEO & Analytics

### Google Tag Manager
- **Container ID:** GTM-M3W35JTV
- Configured in `src/html.js` and `gatsby-ssr.js`

### Google Ads Conversion Tracking
- **Conversion ID:** AW-17864041271
- Tracks conversions and page views

### Meta Tags
Pages use React Helmet for custom meta tags. Global defaults are in `gatsby-config.js`.

## 🔄 CI/CD & Quality Assurance

### GitHub Actions

Automated checks on every PR:
- ✅ Gatsby build validation
- ✅ Missing image reference detection
- ✅ Code formatting (Prettier)
- ✅ Linting

### Git Hooks (Husky)

**Pre-commit:**
- Validates image references in CSS/SCSS
- Runs Prettier on staged files

**Pre-push:**
- Runs full production build

### PR Process

See `CONTRIBUTING.md` for the complete contribution workflow.

## 📊 Performance

- **Static Site Generation** - All pages pre-rendered at build time
- **Image Optimization** - Gatsby Image with sharp for responsive images
- **Code Splitting** - Automatic JavaScript bundle optimization
- **PWA Ready** - Manifest and offline support configured

## 🐛 Troubleshooting

### Build Failures

**Missing image references:**
```bash
# Check which images are referenced but missing
npm run build
```

Common causes:
- Image path typos in SCSS files
- File extensions don't match (`.webp` vs `.jpg`)
- Case sensitivity (Windows vs Linux)

**Solution:** Update the path in the SCSS file or add the missing image.

### 404 Errors

- Project links: Ensure paths start with `/` in `src/components/projCard.js`
- Privacy policy: Check footer links in `src/components/footer.js`

### Development Server Issues

```bash
# Clean cache and restart
gatsby clean
npm run develop
```

## 📚 Documentation

- **[SITE-MANAGEMENT.md](./SITE-MANAGEMENT.md)** - Complete site management guide
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines and PR workflow
- **[CLOUDFLARE-WORKER-SETUP.md](./CLOUDFLARE-WORKER-SETUP.md)** - Cloudflare Worker configuration
- **[CLAUDE.md](./CLAUDE.md)** - AI assistant development context

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Development workflow
- PR process
- Code style guidelines
- Testing requirements

## 📄 License

MIT License - see LICENSE file for details

## 👥 Credits

**Design & Development:**
- Five Hughes LLC / Vertical Consulting
- Website: [verticalconsulting.net](https://verticalconsulting.net)

**Built With:**
- [Gatsby](https://www.gatsbyjs.com/)
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## 📞 Support

**Technical Issues:**
- Open an issue using the appropriate template
- Check documentation files first

**Business Inquiries:**
- Email: bradleybrowninc@gmail.com
- Phone: 601-954-1306

---

**Bradley Brown Inc** - Licensed & Insured Custom Home Builder
Serving Rankin, Madison, Hinds, and Scott Counties, Mississippi

© 2019-2025 Bradley Brown Inc. All rights reserved.

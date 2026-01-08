# Bradley Brown Inc - Site Management Guide

Quick reference guide for managing the Bradley Brown Inc website built with Gatsby 2.

## Development

```bash
# Start local development server (http://localhost:8000)
npm run develop

# Build for production
npm run build

# Preview production build
npm run serve
```

## Editing Page Content

### Company Information & SEO

All site metadata is in `gatsby-config.js`:

```javascript
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Bradley Brown Inc`,
    description: `No job is too big...`,
    email: `bradleybrowninc@gmail.com`,
    contact: {
      mobile: `601-954-1306`,
      telephone: `601-954-1306`,
    },
    address: `104 Tiffany Drive, Brandon, MS 39042`,
    serviceAreas: [...],
    serviceOfferings: [...],
    social: {...}
  }
}
```

**What you can edit:**
- Company name, taglines, descriptions
- Contact information (phone, email, address)
- Service areas (counties served)
- Service offerings (remodels, additions, repairs)
- Social media links
- Business hours
- Google Maps embed URL

**After editing:** Restart the dev server or rebuild for changes to take effect.

### Page Text Content

Main page files are in `src/pages/`:
- `index.js` - Homepage
- `about.js` - About Us page
- `services.js` - Services page
- `projects.js` - Projects gallery
- `contact.js` - Contact page

Edit text directly in the JSX. Most pages query `gatsby-config.js` for dynamic data via GraphQL.

## Managing Projects

### Adding a New Project

Edit `src/images/data/projects.json`:

```json
{
  "title": "Project Name",
  "slug": "project-url-slug",
  "category": ["remodeling", "interior design"],
  "description": "Detailed project description...",
  "img": {
    "src": [
      "https://image-url-1.jpg",
      "https://image-url-2.jpg"
    ],
    "orig": "https://source-attribution",
    "author": "Photo credit"
  },
  "amount": "Php 4,000,000.00",
  "duration": "85 Calendar days",
  "completionDate": "Feb. 20, 2018",
  "owner": "Client Name",
  "address": "Brandon, MS",
  "featured": true
}
```

**Key fields:**
- `slug`: URL-friendly identifier (creates `/projects/your-slug`)
- `category`: Array of categories (construction, remodeling, interior design)
- `img.src`: Array of image URLs (first image is thumbnail)
- `featured`: Set to `true` to show on homepage

**Image sources:**
- External URLs (Unsplash, CDN)
- Local images: Place in `src/images/` and reference as `"../images/filename.jpg"`

### Editing Existing Projects

1. Find the project in `src/images/data/projects.json`
2. Update any fields
3. Rebuild: `npm run build`

### Removing Projects

Delete the project object from the JSON array in `projects.json`.

## SEO Configuration

### Page Meta Tags

Each page can set its own meta tags using React Helmet:

```javascript
import { Helmet } from "react-helmet"

<Helmet>
  <title>Page Title - Bradley Brown Inc</title>
  <meta name="description" content="Page description..." />
</Helmet>
```

### Site-wide SEO

Edit `gatsby-config.js` → `siteMetadata` for global SEO defaults.

### Manifest & Icons

PWA settings in `gatsby-config.js`:

```javascript
{
  resolve: `gatsby-plugin-manifest`,
  options: {
    name: `Bradley Brown Inc`,
    icon: `src/images/brand-logo.png`, // Site icon/favicon
  }
}
```

Replace `src/images/brand-logo.png` with your logo (512x512px recommended).

## Forms

### Contact Form Configuration

The contact form at `/contact` uses **Netlify Forms** (currently configured):

```javascript
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />
  {/* Form fields... */}
</form>
```

**Netlify Form Setup:**
1. Deploy to Netlify (or Cloudflare with Netlify Forms plugin)
2. Forms automatically appear in Netlify dashboard
3. Configure email notifications in Netlify dashboard → Settings → Forms

**For Cloudflare Pages:**
- Netlify Forms won't work natively
- Replace with:
  - **Formspree** (add `action="https://formspree.io/f/{your-id}"`)
  - **Getform** (similar to Formspree)
  - **Custom API route** (requires serverless function)

Example Formspree integration:

```javascript
<form
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
>
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

## Deployment to Cloudflare Pages

### Initial Setup

1. **Connect GitHub repository:**
   - Log into Cloudflare Dashboard → Pages
   - Click "Create a project" → "Connect to Git"
   - Authorize GitHub and select `bradleybrowninc` repository

2. **Build configuration:**
   ```
   Build command: npm run build
   Build output directory: public
   Environment variables: NODE_VERSION = 22
   ```

3. **Deploy:**
   - Click "Save and Deploy"
   - Cloudflare builds and deploys automatically

### Automatic Deployments

Every push to `master` branch triggers automatic deployment.

### Custom Domain

1. Cloudflare Pages → Your project → Custom domains
2. Add your domain (e.g., `bradleybrowninc.com`)
3. Update DNS records as instructed (usually CNAME to `your-project.pages.dev`)

### Manual Deployment

```bash
# Build locally
npm run build

# Install Wrangler CLI (Cloudflare's tool)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy public --project-name=bradleybrowninc
```

### Form Handling on Cloudflare

Since Netlify Forms won't work on Cloudflare, update the contact form:

**Option 1: Formspree (Easiest)**
```javascript
<form action="https://formspree.io/f/{YOUR_ID}" method="POST">
```
Sign up at formspree.io, get your form ID.

**Option 2: Cloudflare Workers**
Create a serverless function to handle form submissions and send emails via API (SendGrid, Mailgun, etc.).

## Color Themes

Multiple color schemes available in `src/themes/`:
- `green.scss`
- `orange.scss`

Import in page files:
```javascript
import "../themes/green.scss"
```

## Navigation Menu

Edit navigation links in `src/components/header.js`:

```javascript
<NavItem>
  <Link to="/page-url/#section">Link Text</Link>
</NavItem>
```

## Quick Reference

| Task | File Location |
|------|---------------|
| Site info & SEO | `gatsby-config.js` |
| Add/edit projects | `src/images/data/projects.json` |
| Edit homepage | `src/pages/index.js` |
| Edit services | `src/pages/services.js` |
| Edit contact info | `gatsby-config.js` → `siteMetadata` |
| Edit navigation | `src/components/header.js` |
| Edit navigation | `src/pages/privacy-policy.js` |
| Edit navigation | `src/pages/thank-you.js` |
| Change logo | `src/images/brand-logo.png` |
| Form configuration | `src/pages/contact.js` |

## Support

For technical issues with:
- **Gatsby**: https://www.gatsbyjs.com/docs/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/
- **Formspree**: https://formspree.io/docs/

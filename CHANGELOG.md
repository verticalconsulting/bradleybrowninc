# Changelog

All notable changes to the Bradley Brown Inc website.

## [Unreleased] - 2026-01-14

### Added

- ✅ **AI Quote System** - Full AI-powered project estimation with visualization
  - Cloudflare Workers AI integration with Llama 3.1 8B Instruct
  - AI-generated project visualizations using Stable Diffusion XL
  - Mississippi-specific pricing calculator
  - Multi-step quote form with image upload
  - Email notifications via Formspree
  - Fallback systems for reliability

- ✅ **Project Type Question** - Added "What type of project are you considering?" field to contact form
  - Dropdown with 9 project type options
  - Professional styling with proper spacing
  - Integrated with Formspree submission

- ✅ **Cloudflare Account Configuration** - AI Gateway fully configured
  - Account ID: af822065bd416045e3a0e3d07e0648fe
  - Gateway Name: bradleybrown-ai
  - Production-ready AI endpoints

- ✅ **Comprehensive Documentation**
  - AI-SETUP-GUIDE.md - Initial setup instructions
  - CLOUDFLARE-AI-SETUP.md - Detailed Cloudflare configuration
  - AI-VISUALIZATION-GUIDE.md - Visualization feature details
  - AI-AUDIT-REPORT.md - Complete system audit
  - ENHANCEMENT-ROADMAP.md - Strategic improvement plan

### Fixed

- 🔧 **AI Quote Form Dropdown Height** - Fixed display issue where selected values were cut off
  - Increased min-height to 48px
  - Added proper line-height for better text display
  - Improved option padding for readability

- 🔧 **Contact Form Styling** - Enhanced form element consistency
  - Added styling for select dropdowns
  - Improved label formatting
  - Better visual hierarchy

### Changed

- 📝 Updated README.md with AI system information
- 📝 Enhanced .gitignore for environment variable security
- 🎨 Improved UI consistency across forms

### Technical Details

- **Files Modified:**
  - `src/pages/ai-quote.scss` - Dropdown height fix
  - `src/pages/contact.js` - Added project type field
  - `src/pages/contact.scss` - Enhanced form styling
  - `functions/api/ai-quote.js` - Account ID configuration
  - `AI-AUDIT-REPORT.md` - Updated status to complete

- **Dependencies:** No new dependencies added
- **Breaking Changes:** None
- **Migration Required:** None

---

## [1.0.0] - 2026-01-09

### Initial Release

- ✅ Gatsby 5 static site with responsive design
- ✅ Project portfolio with category filtering
- ✅ Contact form with Formspree integration
- ✅ Google Tag Manager and Ads tracking
- ✅ Cloudflare Pages deployment
- ✅ SEO optimization with sitemap
- ✅ Mobile-responsive navigation
- ✅ Bootstrap 4.6.2 with custom theming

---

## Release Schedule

### Upcoming Releases

#### v1.1.0 (Planned: January 2026)

- Customer testimonials section
- FAQ page
- Blog section for home improvement tips
- Before/after photo galleries
- Google Reviews widget

#### v1.2.0 (Planned: February 2026)

- Customer portal for project tracking
- Email marketing automation
- Enhanced analytics dashboard
- A/B testing implementation

#### v2.0.0 (Planned: Q2 2026)

- Mobile app (iOS/Android)
- 3D project visualization
- CRM integration
- Advanced AI features

---

## Version History

| Version | Date       | Key Features           |
| ------- | ---------- | ---------------------- |
| 1.0.0   | 2026-01-09 | Initial public launch  |
| 1.0.1   | 2026-01-14 | AI system + form fixes |

---

## Deployment Notes

### Production Environment

- **Platform:** Cloudflare Pages
- **Build Command:** `npm run build`
- **Output Directory:** `public`
- **Node Version:** 18+
- **Auto Deploy:** On push to master branch

### Environment Variables Required

```
GATSBY_CLOUDFLARE_AI_GATEWAY_TOKEN=<token>
AI_GATEWAY_TOKEN=<token>
```

---

## Contributors

- Technical Lead: Corey Hughes (corey@verticalconsulting.net)
- Business Owner: Bradley Brown (bradleybrowninc@gmail.com)
- AI Assistant: Claude (Anthropic)

---

**Changelog Format:** [Keep a Changelog](https://keepachangelog.com/)
**Versioning:** [Semantic Versioning](https://semver.org/)

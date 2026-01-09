# Bradley Brown Inc Website - Business Summary

**Website:** https://bradleybrowninc.com
**Company:** Bradley Brown Inc - Licensed & Insured Custom Home Builder
**Location:** Mississippi (Serving multiple counties)
**Date:** January 9, 2026

---

## Executive Summary

Your business website is a professional, modern Gatsby-based static site that showcases your construction portfolio, services, and provides multiple convenient payment options for clients. The site is optimized for search engines, mobile-responsive, and includes comprehensive tracking analytics.

---

## Website Features & Capabilities

### 1. **Core Pages**

#### Homepage (`/`)

- Professional hero section with company branding
- Featured project gallery (automatically pulls projects marked as `featured: true`)
- Services overview with quick navigation
- Call-to-action buttons for quotes and contact
- Company badges: MSHBA, NAHB, BBB, MS State Contractor License

#### Services Page (`/services`)

- Detailed service offerings:
  - Custom Home Building
  - Home Remodeling & Renovations
  - Interior Design Services
  - Commercial Construction
  - Kitchen & Bathroom Remodeling
  - Room Additions & Extensions

#### Projects Page (`/projects`)

- Filterable portfolio gallery (All, Construction, Remodeling, Interior Design)
- Individual project detail pages with:
  - Photo galleries
  - Project descriptions
  - Completion dates
  - Budget information
  - Location details

#### About Page (`/about`)

- Company history and mission
- Team information
- Licensing and certifications
- Service areas

#### Contact Page (`/contact`)

- Contact form (currently using Formspree)
- Phone numbers (Mobile: 601-954-1306, Office/Fax)
- Email: bradleybrowninc@gmail.com
- Physical address
- Service area list
- Google Maps integration
- Social media links (Facebook, Twitter, Instagram, LinkedIn)

#### Payment Page (`/payment`) **[NEW - Just Added]**

- Modern tabbed interface with 4 payment methods
- Secure payment processing
- Clear instructions for each method

#### Privacy Policy Page (`/privacy-policy`)

- GDPR-compliant privacy information
- Data collection and usage policies

---

## Payment Methods Available

### 1. **💳 Stripe (Credit/Debit Cards)**

**Status:** Ready to activate
**Transaction Fees:** 2.9% + $0.30 per transaction
**Features:**

- Accepts Visa, Mastercard, American Express, Discover
- Apple Pay & Google Pay support
- Instant payment confirmation
- 256-bit SSL encryption
- Best for: All payment sizes, professional transactions

**⚠️ ACTION REQUIRED:** See setup instructions below

---

### 2. **📊 Klarna (Buy Now, Pay Later)**

**Status:** SDK integrated, awaiting merchant account
**Transaction Fees:** 3.29% - 5.99% (varies by payment plan)
**Features:**

- Pay in 4 interest-free installments
- Monthly financing options
- No credit score impact to check eligibility
- Instant approval decisions
- Shows "As low as $X/month" messaging on your site
- Best for: Projects $1,000+ where clients want payment plans

**⚠️ ACTION REQUIRED:** See setup instructions below

---

### 3. **🏦 Zelle (Bank Transfer)**

**Status:** ✅ Fully functional - Ready to use immediately
**Transaction Fees:** $0.00 (FREE for both parties)
**Features:**

- Zero fees - 100% of payment received
- Money arrives in minutes
- Bank-to-bank transfer
- Available at most major banks
- Best for: Deposits, large payments, cost-conscious clients

**Configuration:**

- Email: bradleybrowninc@gmail.com
- Name: Bradley Brown Inc
- No additional setup needed

---

### 4. **📱 Venmo (Mobile Payments)**

**Status:** ✅ Fully functional
**Transaction Fees:** Free for personal, 2.75% for business
**Features:**

- Quick mobile payments
- Deep-link app integration
- Profile: @bradleybrowninc
- Best for: Smaller payments, deposits, mobile-savvy clients

---

## Technical Infrastructure

### Hosting & Deployment

- **Platform:** Cloudflare Pages
- **Domain:** bradleybrowninc.com
- **Deployment:** Automatic on GitHub push to master branch
- **Build Time:** ~2-3 minutes
- **CDN:** Global edge network with DDoS protection
- **SSL/TLS:** Automatic HTTPS

### Analytics & Tracking

- **Google Tag Manager:** GTM-M3W35JTV
- **Google Ads Conversion:** AW-17864041271
- **Tracks:** Page views, form submissions, conversion events

### Contact Form Integration

- **Current Provider:** Formspree (https://formspree.io/f/mykgnqee)
- **Redirect:** https://bradleybrowninc.com/thank-you
- **Features:** File uploads supported, spam protection

### Technical Stack

- **Framework:** Gatsby 5 (React-based static site generator)
- **Styling:** SASS/SCSS with Bootstrap 4
- **Node Version:** 18+
- **Repository:** https://github.com/verticalconsulting/bradleybrowninc

---

## Content Management

### Adding/Editing Projects

Projects are managed via JSON file: `src/images/data/projects.json`

**Project Schema:**

```json
{
  "title": "Project Name",
  "slug": "url-friendly-name",
  "category": ["construction", "remodeling", "interior design"],
  "description": "Detailed project description...",
  "img": {
    "src": ["image1.jpg", "image2.jpg", "image3.jpg"],
    "orig": "External URL or photographer credit",
    "author": "Photographer name"
  },
  "amount": "Budget range or cost",
  "duration": "Time to complete",
  "completionDate": "Month Year",
  "owner": "Client name (or 'Private Client')",
  "address": "Project location",
  "featured": true
}
```

**Key Points:**

- Set `featured: true` to display project on homepage
- First image in `img.src[]` array is the thumbnail
- Images can be local files or external URLs (Cloudflare Images, Unsplash, etc.)
- Slug becomes the URL: `/projects/your-slug-here`

### Site Metadata

Global site information is managed in: `gatsby-config.js`

This includes:

- Company name and description
- Contact information
- Social media links
- Operating hours
- Service areas
- Career benefits

---

## SEO & Performance

### Search Engine Optimization

- Structured page titles and meta descriptions
- Schema.org markup for local business
- Sitemap generation
- Mobile-responsive design
- Fast load times (static site)

### Performance

- **Static Site Generation:** All pages pre-rendered at build time
- **Image Optimization:** Automatic responsive images, WebP format
- **Code Splitting:** Optimized JavaScript bundles
- **CDN Delivery:** Global edge caching

### Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Alt text on images

---

## Quality Assurance

### Automated Checks

- **Pre-commit Hooks:** Validates image references, runs Prettier formatting
- **Pre-push Hooks:** Full production build before push
- **GitHub Actions CI/CD:** Build validation on all pull requests
- **Build Artifacts:** 7-day retention for review

### Testing Checklist

- ✅ All pages load without errors
- ✅ Navigation works correctly
- ✅ Project detail pages generate properly
- ✅ Forms submit correctly
- ✅ Images load and display properly
- ✅ Mobile responsive design
- ✅ Cross-browser compatibility

---

## Support & Maintenance

### Repository & Documentation

- **GitHub:** https://github.com/verticalconsulting/bradleybrowninc
- **Issue Tracking:** GitHub Issues
- **Documentation Files:**
  - `README.md` - Technical overview and setup
  - `CLAUDE.md` - AI assistant development context
  - `CONTRIBUTING.md` - Contributor guidelines
  - `SITE-MANAGEMENT.md` - Content management guide
  - `BUSINESS-SUMMARY.md` - This document

### Development Team

- **Technical Lead:** Corey Hughes (corey@verticalconsulting.net)
- **Company:** Five Hughes LLC / Vertical Consulting

### Business Contacts

- **Email:** bradleybrowninc@gmail.com
- **Phone:** 601-954-1306
- **Mobile:** (Listed on contact page)

---

## Browser & Device Support

### Browsers

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Devices

- ✅ Desktop (1920px+)
- ✅ Laptop (1366px - 1920px)
- ✅ Tablet (768px - 1365px)
- ✅ Mobile (320px - 767px)

---

## Security & Compliance

### Security Features

- HTTPS encryption (automatic via Cloudflare)
- DDoS protection (Cloudflare)
- Form spam protection (honeypot fields)
- Secure payment processing (PCI-compliant via Stripe/Klarna)
- No sensitive data stored on site

### Privacy Compliance

- Privacy Policy page available
- GDPR considerations addressed
- Cookie consent (if needed)
- Data processing transparency

---

## Cost Breakdown

### Current Monthly Costs

- **Hosting:** $0 (Cloudflare Pages free tier)
- **Domain:** ~$12/year (bradleybrowninc.com)
- **Formspree:** $0 (free tier, 50 submissions/month)
- **GitHub:** $0 (public repository)

### Payment Processing Fees

- **Stripe:** 2.9% + $0.30 per transaction
- **Klarna:** 3.29% - 5.99% per transaction
- **Zelle:** $0 (completely free)
- **Venmo:** Free personal, 2.75% business

### Potential Additional Costs

- **Formspree Pro:** $10/month (unlimited submissions, custom branding)
- **Stripe Account:** No monthly fee, pay-as-you-go
- **Klarna Merchant:** No monthly fee, pay-as-you-go
- **Google Workspace:** $6-18/user/month (if needed for email)

---

## Recent Updates (January 2026)

### Payment Integration Enhancement

- ✅ Added Stripe payment link integration
- ✅ Integrated Klarna SDK for financing options
- ✅ Added Zelle bank transfer option
- ✅ Enhanced Venmo integration with better UI
- ✅ Created modern tabbed payment interface
- ✅ Added payment.scss for professional styling
- ✅ Deployed to production (Cloudflare Pages)

### Files Modified

- `src/pages/payment.js` - Complete redesign
- `src/pages/payment.scss` - New styling file
- `src/html.js` - Added Klarna SDK script

---

## Future Enhancement Opportunities

### Short Term (1-3 months)

1. Complete Stripe payment link setup
2. Apply for Klarna merchant account
3. Add more project photos to portfolio
4. Collect and display client testimonials
5. Add blog section for SEO and authority building

### Medium Term (3-6 months)

1. Implement live chat for instant customer support
2. Add project cost calculator/estimator tool
3. Create before/after photo galleries
4. Build email newsletter signup and campaigns
5. Add video testimonials and walkthroughs

### Long Term (6-12 months)

1. Online quote request system with AI estimation
2. Client portal for project tracking
3. Scheduling system for consultations
4. 3D room visualizer for design services
5. Integration with project management tools

---

## Competitive Advantages

### Your Website Strengths

1. **Professional Design:** Clean, modern, mobile-responsive
2. **Fast Performance:** Static site with CDN delivery
3. **Multiple Payment Options:** Convenience increases conversions
4. **Portfolio Showcase:** Visual proof of quality work
5. **SEO Optimized:** Better search engine rankings
6. **Zero Downtime:** Static hosting is extremely reliable
7. **Security:** HTTPS, DDoS protection, secure payments
8. **Analytics:** Track visitor behavior and conversions

### What Sets You Apart

- Licensed and insured (with badge verification)
- Member of professional organizations (MSHBA, NAHB)
- BBB accredited
- Flexible payment options (including 0% fee Zelle)
- Clear service area definition
- Direct contact information readily available

---

## Key Performance Indicators (KPIs)

### Metrics to Track

1. **Website Traffic:** Monthly unique visitors
2. **Conversion Rate:** Contact form submissions / visitors
3. **Payment Method Usage:** Which payment options are most popular
4. **Project Page Views:** Most viewed projects
5. **Bounce Rate:** Visitors who leave immediately
6. **Average Session Duration:** Engagement level
7. **Mobile vs Desktop:** Device usage patterns
8. **Geographic Sources:** Where visitors are coming from

### Google Tag Manager Events

- Page views
- Contact form submissions
- Payment page visits
- Phone number clicks
- Email link clicks
- Social media link clicks

---

## Conclusion

Your website is a professional, feature-rich platform that effectively showcases your construction business and makes it easy for clients to contact you and make payments. The recent payment integration enhancement provides multiple convenient options for clients while keeping costs low (especially with Zelle at 0% fees).

The site is built on modern, reliable technology with automatic deployments, quality assurance checks, and comprehensive analytics. With the addition of Stripe and Klarna, you're now positioned to accept payments from clients who prefer credit cards or need financing options for larger projects.

**Next immediate action items:**

1. Set up your Stripe payment link (5-10 minutes)
2. Consider applying for Klarna merchant account (optional, for projects $1,000+)
3. Monitor payment page analytics to see which methods clients prefer
4. Continue adding high-quality project photos to your portfolio

---

**Document Version:** 1.0
**Last Updated:** January 9, 2026
**Prepared By:** Claude Code (Anthropic AI Assistant)
**For:** Bradley Brown Inc
**Technical Contact:** Corey Hughes (corey@verticalconsulting.net)

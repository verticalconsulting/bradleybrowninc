# AI Quote System Setup Guide

## Overview
The AI Quote system uses Cloudflare AI Gateway to generate intelligent project estimates. This guide explains how to configure and deploy the AI features.

---

## 🔐 Environment Variables Setup

### Local Development (.env.local)
Your AI Gateway token is stored in `.env.local`:
```
GATSBY_CLOUDFLARE_AI_GATEWAY_TOKEN=RtMTWH2K3d-w78_IkOqeO0JheB9pHHqgTy3mukxb
```

⚠️ **IMPORTANT**: This file is git-ignored and should NEVER be committed to the repository.

### Production (Cloudflare Pages)
Set environment variables in Cloudflare Dashboard:

1. Go to **Cloudflare Dashboard** → **Pages** → **bradleybrowninc**
2. Click **Settings** → **Environment variables**
3. Add production variables:
   ```
   AI_GATEWAY_TOKEN = RtMTWH2K3d-w78_IkOqeO0JheB9pHHqgTy3mukxb
   ```

---

## 🤖 Cloudflare AI Gateway Setup

### Step 1: Enable AI Gateway
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **AI** → **AI Gateway**
3. Create a new gateway named `bradleybrown-ai`
4. Copy your Account ID and Gateway ID

### Step 2: Configure AI Models
Cloudflare offers several AI models. For construction estimates, we recommend:
- **@cf/meta/llama-2-7b-chat-int8** - Fast, cost-effective for estimates
- **@cf/openai/gpt-3.5-turbo** - More sophisticated analysis

### Step 3: Update API Endpoint
Edit `functions/api/ai-quote.js` and update:
```javascript
const AI_GATEWAY_URL = 'https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/bradleybrown-ai/@cf/meta/llama-2-7b-chat-int8';
```

Replace `YOUR_ACCOUNT_ID` with your actual Cloudflare account ID.

---

## 📁 File Structure

```
bradleybrowninc/
├── .env.local                    # Local environment variables (git-ignored)
├── src/
│   └── pages/
│       └── ai-quote.js           # AI Quote frontend page
├── functions/
│   └── api/
│       └── ai-quote.js           # Cloudflare Worker/Function
└── AI-SETUP-GUIDE.md             # This file
```

---

## 🚀 Deployment

### Automatic Deployment (Recommended)
The AI quote system will deploy automatically when you push to GitHub:
```bash
git add .
git commit -m "Add AI quote system"
git push origin feature-AI
```

### Manual Testing
Test the API locally using Wrangler:
```bash
# Install Wrangler if needed
npm install -g wrangler

# Test the function locally
wrangler pages dev ./public --binding AI_GATEWAY_TOKEN=RtMTWH2K3d-w78_IkOqeO0JheB9pHHqgTy3mukxb
```

---

## 🧪 Testing the AI Quote System

### 1. Frontend Testing
Visit: `http://localhost:8000/ai-quote/`
- Fill out the multi-step form
- Upload test images
- Submit for AI estimate

### 2. API Testing
Use curl or Postman:
```bash
curl -X POST https://bradleybrowninc.com/api/ai-quote \
  -H "Content-Type: application/json" \
  -d '{
    "formData": {
      "name": "Test User",
      "email": "test@example.com",
      "projectType": "Kitchen Remodel",
      "squareFootage": "200"
    }
  }'
```

### 3. Expected Response
```json
{
  "success": true,
  "estimate": {
    "summary": {
      "total": 35000,
      "timeline": "3-6 months",
      "sqft": "200"
    },
    "breakdown": { ... },
    "materials": [ ... ],
    "timeline": [ ... ]
  }
}
```

---

## 💰 Cost Management

### Cloudflare AI Pricing
- **Free Tier**: 10,000 requests/month
- **Paid Tier**: $0.01 per 1,000 requests

### Monitoring Usage
1. Go to **Cloudflare Dashboard** → **AI** → **Usage**
2. Set up alerts at 80% of free tier
3. Monitor weekly for unusual spikes

### Cost Optimization Tips
1. Cache frequent requests (similar project types)
2. Implement rate limiting (max 10 requests per IP/hour)
3. Use simpler models for basic estimates

---

## 🔧 Troubleshooting

### Issue: AI endpoint returns 401 Unauthorized
**Solution**: Verify the token is correctly set in environment variables

### Issue: Estimates seem generic/inaccurate
**Solution**: Improve the prompt in `generateAIPrompt()` function with more specific instructions

### Issue: Function not deploying
**Solution**:
```bash
# Check function syntax
node functions/api/ai-quote.js

# Clear cache and rebuild
gatsby clean
npm run build
```

### Issue: CORS errors in browser
**Solution**: Ensure CORS headers are set in the Cloudflare function

---

## 📊 Analytics & Monitoring

### Track AI Quote Usage
Add to Google Tag Manager:
```javascript
// Track AI quote form submissions
dataLayer.push({
  'event': 'ai_quote_generated',
  'project_type': formData.projectType,
  'estimated_value': estimate.summary.total
});
```

### Monitor Performance
- Check Cloudflare Analytics for function performance
- Monitor email notifications for lead quality
- Track conversion rate from AI quotes to actual projects

---

## 🔒 Security Best Practices

1. **Never expose tokens in client-side code**
2. **Validate all input on the server side**
3. **Implement rate limiting to prevent abuse**
4. **Sanitize user input before AI processing**
5. **Use HTTPS for all API calls**
6. **Rotate tokens every 90 days**

---

## 📞 Support

For issues with the AI Quote system:
1. Check this guide first
2. Review Cloudflare AI documentation
3. Contact: corey@verticalconsulting.net

---

## 📝 Notes

- **Token Storage**: The token `RtMTWH2K3d-w78_IkOqeO0JheB9pHHqgTy3mukxb` is stored securely in `.env.local`
- **Git Safety**: The `.env.local` file is git-ignored and won't be committed
- **Production Ready**: The system falls back to calculated estimates if AI fails
- **Email Integration**: Currently uses Formspree for notifications

---

Last Updated: January 2026
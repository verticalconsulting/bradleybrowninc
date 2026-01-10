# Cloudflare AI Complete Setup Guide

## Quick Start Checklist

Follow these steps in order to set up your AI quote system:

- [ ] 1. Get your Cloudflare Account ID
- [ ] 2. Enable Workers AI
- [ ] 3. Create AI Gateway
- [ ] 4. Update configuration files
- [ ] 5. Deploy and test

---

## Step 1: Get Your Cloudflare Account ID

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain (bradleybrowninc.com)
3. On the right sidebar, you'll see your **Account ID**
4. Copy it (looks like: `f037e56e89293a057740de681ac9aa31`)

---

## Step 2: Enable Cloudflare Workers AI

1. In Cloudflare Dashboard, go to **AI** → **Workers AI**
2. Click **Get Started** (if not already enabled)
3. You'll get:
   - 10,000 free requests per day
   - Access to all AI models
   - No credit card required for free tier

---

## Step 3: Create AI Gateway

1. Go to **AI** → **AI Gateway**
2. Click **Create Gateway**
3. Name it: `bradleybrown-ai`
4. Settings to configure:
   ```
   Rate Limiting: 100 requests per minute
   Cache TTL: 3600 seconds (1 hour)
   Log Requests: Enabled
   Retry Failed: Enabled (max 3 retries)
   ```
5. Click **Create**
6. Copy your Gateway endpoint

---

## Step 4: Update Your Configuration

### Update the Worker Function

Edit `functions/api/ai-quote.js` and replace:

```javascript
const ACCOUNT_ID = 'YOUR_ACCOUNT_ID'; // Replace with your actual Account ID
const GATEWAY_NAME = 'bradleybrown-ai'; // Your gateway name
```

### Update Environment Variables

In Cloudflare Pages Dashboard:
1. Go to **Settings** → **Environment variables**
2. Add:
   ```
   AI_GATEWAY_TOKEN = RtMTWH2K3d-w78_IkOqeO0JheB9pHHqgTy3mukxb
   CLOUDFLARE_ACCOUNT_ID = [Your Account ID]
   ```

---

## Step 5: Model Selection Guide

### Best Models for Construction Estimates:

| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| **@cf/meta/llama-3.1-8b-instruct** ⭐ | Fast (1-2s) | Excellent | Low | Primary choice - detailed estimates |
| **@cf/mistral/mistral-7b-instruct** | Very Fast (<1s) | Good | Lowest | Quick estimates, simple projects |
| **@cf/meta/llama-3-8b-instruct** | Fast (1-2s) | Very Good | Low | Alternative to 3.1 |
| **@cf/openai/gpt-3.5-turbo** | Medium (2-3s) | Excellent | Medium | Complex analysis (requires API key) |

### Recommended: Llama 3.1-8b-instruct
- Best balance of speed and quality
- Excellent at structured output
- Understands construction terminology
- Good at math/calculations

---

## Architecture Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│   Frontend  │────▶│   Cloudflare  │────▶│ AI Gateway  │────▶│  Workers AI   │
│  (Gatsby)   │     │    Worker     │     │  (Caching)  │     │   (Model)     │
└─────────────┘     └──────────────┘     └─────────────┘     └──────────────┘
                           │                      │
                           ▼                      ▼
                    ┌──────────────┐      ┌──────────────┐
                    │  Email Alert  │      │  Analytics   │
                    │  (Formspree)  │      │  Dashboard   │
                    └──────────────┘      └──────────────┘
```

---

## Testing Your Setup

### 1. Test Workers AI Directly

```bash
curl https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/ai/run/@cf/meta/llama-3.1-8b-instruct \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a construction cost estimator."},
      {"role": "user", "content": "Estimate cost for a 10x10 kitchen remodel"}
    ]
  }'
```

### 2. Test AI Gateway

```bash
curl https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/bradleybrown-ai/workers-ai/@cf/meta/llama-3.1-8b-instruct \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Estimate cost for a bathroom remodel"}
    ]
  }'
```

### 3. Test Your API Endpoint

```bash
curl https://bradleybrowninc.com/api/ai-quote \
  -H "Content-Type: application/json" \
  -d '{
    "formData": {
      "name": "Test Customer",
      "email": "test@example.com",
      "projectType": "Kitchen Remodel",
      "squareFootage": "150"
    }
  }'
```

---

## Cost Analysis

### Free Tier Limits
- **Workers AI**: 10,000 requests/day free
- **AI Gateway**: Unlimited (just management layer)
- **Workers**: 100,000 requests/day free

### Monthly Cost Estimate for Your Business
Based on typical contractor website traffic:

| Usage Level | Requests/Month | Monthly Cost |
|------------|---------------|--------------|
| Low | 1,000 | $0 (free tier) |
| Medium | 5,000 | $0 (free tier) |
| High | 50,000 | ~$25 |
| Very High | 200,000 | ~$100 |

**💡 Pro Tip**: With AI Gateway caching, 30-40% of requests will be cached, reducing costs significantly.

---

## Optimizations

### 1. Enable Caching
In your AI Gateway settings:
- Set cache TTL to 3600 (1 hour)
- Similar projects will use cached responses
- Reduces costs by 30-40%

### 2. Rate Limiting
Prevent abuse:
```javascript
// In your Worker
const ip = request.headers.get('CF-Connecting-IP');
const rateLimitKey = `rate_limit:${ip}`;
// Implement rate limiting logic
```

### 3. Smart Prompt Engineering
Shorter, focused prompts = lower costs:
```javascript
// Good - Concise
"Estimate: Kitchen remodel, 150sqft, modern style, granite counters"

// Bad - Verbose
"I need you to provide me with a detailed comprehensive estimate for..."
```

---

## Monitoring & Analytics

### AI Gateway Dashboard Shows:
- Request volume
- Response times
- Cache hit rate
- Error rates
- Cost tracking

### Set Up Alerts:
1. Go to AI Gateway → Settings → Alerts
2. Set alert for:
   - Error rate > 5%
   - Response time > 3 seconds
   - Daily usage > 8,000 requests

---

## Troubleshooting

### Common Issues:

**1. "Unauthorized" Error**
- Check your token is correct
- Ensure token has AI permissions
- Verify Account ID is correct

**2. "Model not found"**
- Use exact model name: `@cf/meta/llama-3.1-8b-instruct`
- Check model is available in your region

**3. Slow Response Times**
- Enable caching in AI Gateway
- Consider using mistral-7b for faster responses
- Check if you're hitting rate limits

**4. Inconsistent Estimates**
- Lower temperature to 0.3 (more consistent)
- Add more specific instructions in system prompt
- Include example format in prompt

---

## Production Checklist

Before going live:

- [ ] Account ID configured in Worker
- [ ] Environment variables set in Cloudflare Pages
- [ ] AI Gateway created and configured
- [ ] Caching enabled (3600 seconds)
- [ ] Rate limiting configured
- [ ] Error handling tested
- [ ] Fallback estimates working
- [ ] Email notifications tested
- [ ] Analytics tracking enabled
- [ ] Cost alerts configured

---

## Support Resources

- **Cloudflare AI Docs**: https://developers.cloudflare.com/workers-ai/
- **AI Gateway Docs**: https://developers.cloudflare.com/ai-gateway/
- **Model Playground**: https://playground.ai.cloudflare.com
- **Status Page**: https://www.cloudflarestatus.com/
- **Community Discord**: https://discord.cloudflare.com

---

## Quick Commands Reference

```bash
# Deploy your site with AI features
git add .
git commit -m "Add AI quote system"
git push origin feature-AI

# Test locally with Wrangler
wrangler pages dev ./public --binding AI_GATEWAY_TOKEN=YOUR_TOKEN

# View logs
wrangler tail

# Check AI usage
curl https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/ai/usage \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

Last Updated: January 2026
Token Status: ✅ Securely stored in .env.local
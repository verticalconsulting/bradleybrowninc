# How to Update the API Token

## Current Token

Your Cloudflare AI Gateway Token has been updated to:

```
cGwm1tz_QGN2jBm2FbklYKyy8-upDu5Zih41FtdP
```

## Local Development

The token is already configured in:

- `.env.development.local` - For local development
- `.env.production` - For production builds

To verify it's working locally:

1. Restart the development server: `gatsby develop`
2. Check the console for: "🔧 Configuration Status: { aiEnabled: true }"
3. Test the AI Quote form at `/ai-quote`

## Production Deployment (Cloudflare Pages)

### Step 1: Update Environment Variables in Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **bradleybrowninc**
3. Go to **Settings** → **Environment variables**
4. Update or add:
   ```
   AI_GATEWAY_TOKEN = cGwm1tz_QGN2jBm2FbklYKyy8-upDu5Zih41FtdP
   ```
5. Click **Save**

### Step 2: Trigger a New Deployment

Option A - Push to GitHub:

```bash
git add .
git commit -m "Update API token configuration"
git push origin feature-AI
```

Option B - Manual Redeploy:

1. In Cloudflare Pages Dashboard
2. Go to **Deployments** tab
3. Click **Retry deployment** on the latest deployment

## Testing Production

After deployment completes:

1. Visit https://bradleybrowninc.com/ai-quote
2. Submit a test quote request
3. Check if AI features are working

## Security Notes

- Never commit the actual token to Git
- The `.env` files are already in `.gitignore`
- Always use environment variables for sensitive data
- Rotate tokens regularly for security

## Troubleshooting

If the token isn't working:

1. Check the token format (should be alphanumeric with underscores/hyphens)
2. Verify it's set in Cloudflare Pages environment variables
3. Ensure there are no extra spaces or quotes
4. Check the browser console for error messages
5. Review Cloudflare Pages build logs

## Token Management

- Store tokens securely (password manager recommended)
- Document token purpose and expiration
- Set up monitoring for API usage
- Review Cloudflare AI Gateway logs regularly

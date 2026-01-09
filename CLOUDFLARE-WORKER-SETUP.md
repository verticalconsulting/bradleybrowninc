# Cloudflare Worker Setup Guide

This guide explains how to deploy the URL redirect worker to Cloudflare.

## What It Does

The worker redirects:
- `bradleybrowninc.com/quote` → `bradleybrowninc.com/#quote`

Additional redirects can be easily added in the code.

## Deployment Steps

### 1. Log in to Cloudflare
- Go to [dash.cloudflare.com](https://dash.cloudflare.com)
- Select your account

### 2. Create a New Worker
1. Click on **Workers & Pages** in the left sidebar
2. Click **Create Application**
3. Click **Create Worker**
4. Give it a name (e.g., `bradleybrowninc-redirects`)
5. Click **Deploy**

### 3. Edit the Worker Code
1. After deployment, click **Edit Code**
2. Delete the default code
3. Copy the entire contents of `cloudflare-worker.js` from this repository
4. Paste it into the Cloudflare editor
5. Click **Save and Deploy**

### 4. Add a Route
1. Go back to the worker overview page
2. Click **Triggers** tab
3. Under **Routes**, click **Add Route**
4. Enter your route pattern:
   - **Route**: `bradleybrowninc.com/*` (or `*bradleybrowninc.com/*` to include subdomains)
   - **Zone**: Select `bradleybrowninc.com`
5. Click **Save**

### 5. Test the Redirect
- Visit `https://bradleybrowninc.com/quote`
- You should be redirected to `https://bradleybrowninc.com/#quote`

## Adding More Redirects

To add additional redirects, edit the `redirects` object in the worker code:

```javascript
const redirects = {
  '/quote': '/#quote',
  '/services': '/#services',        // Add new redirects here
  '/old-page': '/new-page',         // Another example
  '/contact-us': '/#contact',       // Another example
}
```

After making changes:
1. Click **Edit Code** in the worker
2. Update the redirects object
3. Click **Save and Deploy**

## Redirect Types

The worker currently uses **301 (Permanent)** redirects. You can change this to **302 (Temporary)** by modifying line:

```javascript
return Response.redirect(redirectUrl, 301) // Change to 302 for temporary
```

## Troubleshooting

### Redirect Not Working
1. **Check the route**: Make sure the route pattern includes your domain and path
2. **Clear cache**: Try in an incognito/private browser window
3. **Wait for propagation**: Changes can take 1-2 minutes to propagate
4. **Check worker logs**: Go to the worker → **Logs** tab to see if requests are hitting it

### Worker Not Triggering
- Ensure the route pattern matches your URL
- Routes are processed in order, so make sure no other worker/page rule conflicts
- Verify the worker is deployed (status should be "Deployed")

## Cost

Cloudflare Workers free tier includes:
- 100,000 requests per day
- More than enough for most small to medium websites

If you need more, paid plans start at $5/month for 10 million requests.

## Support

For more information, visit [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

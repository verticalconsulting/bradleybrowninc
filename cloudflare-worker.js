/**
 * Cloudflare Worker - URL Redirects
 *
 * This worker handles URL redirects for the Bradley Brown Inc website
 *
 * To deploy:
 * 1. Log in to your Cloudflare dashboard
 * 2. Go to Workers & Pages
 * 3. Create a new Worker
 * 4. Copy and paste this code
 * 5. Deploy the worker
 * 6. Add a route to your domain (e.g., bradleybrowninc.com/*)
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname, hostname } = url

  // Define your redirects here
  const redirects = {
    '/quote': '/#quote',
    // Add more redirects as needed:
    // '/old-path': '/new-path',
    // '/services': '/#services',
  }

  // Check if the current path matches any redirect
  if (redirects[pathname]) {
    const redirectUrl = `${url.protocol}//${hostname}${redirects[pathname]}`

    return Response.redirect(redirectUrl, 301) // 301 = Permanent redirect
  }

  // If no redirect matches, fetch the original request
  return fetch(request)
}

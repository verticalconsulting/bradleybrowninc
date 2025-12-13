# Logo Files for Bradley Brown Inc

This file provides instructions for updating the logo files with the new Bradley Brown Inc branding.

## Logo Files to Replace

### Primary Logo (Navigation Header)
**File:** `src/images/brand-logo.png`
**Usage:** Used in the navigation header which has a dark blue background
**Recommended:** Use the WHITE logo on blue background version
**Dimensions:** Height should be approximately 40px for optimal display

### Favicon/App Icon
**File:** `src/images/brand-logo.png` (same file as above)
**Usage:** Also used as the site favicon/app icon (configured in gatsby-config.js)
**Note:** This should be a square image, preferably at least 512x512px

## Logo Versions Provided

You have been provided with two logo versions:
1. **White logo on blue background** - Use this for the navigation header
2. **Blue logo on white background** - Use this for light backgrounds or marketing materials

## How to Update

1. Replace `/home/user/bradleybrowninc/src/images/brand-logo.png` with the white logo version
2. Run `gatsby clean` to clear the cache
3. Run `gatsby develop` or `gatsby build` to see the changes

## Additional Notes

- The logo in the header is displayed at 40px height
- The navbar has a dark background, so the white logo will provide the best contrast
- If you need different logos for different contexts, you can add additional image files and update the layout.js component accordingly

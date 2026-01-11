# AI Project Visualization Guide

## Overview

The AI Quote page now includes an **AI-Generated Project Visualization** feature that creates visual representations of how projects will look based on user specifications.

## Features

### 🎨 Visual Generation

- **Automatic Generation**: Visualizations are created automatically when estimates are generated
- **Style-Aware**: Images match the selected design style (Modern, Traditional, Farmhouse, etc.)
- **Feature Integration**: Visualization incorporates selected features into the image
- **High Quality**: Uses professional architectural visualization standards

### 🖼️ Visualization Display

- **Large Preview**: Full-width image display of the project concept
- **Design Details**: Shows selected style and key features
- **Disclaimer**: Clear indication that this is a conceptual visualization
- **Fallback Images**: High-quality stock images when AI generation is unavailable

## How It Works

### 1. User Flow

```
User fills form → Submits for estimate → Estimate generated → Visualization created → Both displayed
```

### 2. Technical Implementation

#### Frontend (ai-quote.js)

- `generateVisualization()` function creates detailed prompts
- Sends request to `/api/ai-visualize` endpoint
- Displays loading state while generating
- Shows placeholder images as fallback

#### Backend (ai-visualize.js)

- Cloudflare Worker function
- Attempts multiple AI models:
  1. Stable Diffusion XL (primary)
  2. DreamShaper-8-LCM (fallback)
  3. Curated stock images (final fallback)
- Returns base64 encoded images or URLs

### 3. Prompt Engineering

The system creates detailed prompts including:

- Project type and square footage
- Selected design style
- Chosen features
- Material preferences
- Professional lighting and perspective requirements

Example prompt:

```
Professional architectural visualization, photorealistic interior design render.
Create a Modern style Kitchen Remodel project. The space is 150 square feet.
Design features: Island, Granite Countertops, Under-cabinet Lighting.
Materials: high-quality finishes.
Color scheme: warm and inviting with neutral tones and clean lines.
Lighting: natural daylight with accent lighting.
Perspective: 3/4 view showing the full space.
Quality: photorealistic, high-end architectural visualization, magazine quality.
```

## Configuration

### Environment Variables

```env
AI_GATEWAY_TOKEN=your_token_here
```

### Cloudflare AI Models

Currently configured models:

- **@cf/stabilityai/stable-diffusion-xl-base-1.0** - Primary image generation
- **@cf/lykon/dreamshaper-8-lcm** - Alternative model
- Both generate 1024x768 images

### Fallback Images

High-quality Unsplash images for each project type:

- Kitchen Remodel
- Bathroom Remodel
- Whole House Renovation
- Room Addition
- Basement Finishing
- Outdoor Living Space
- Custom Home Build

## Customization

### Styling (ai-quote.scss)

The visualization section includes:

```scss
.visualization-section {
  background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%);
  border: 2px solid #e5e7eb;

  .visualization-container {
    position: relative;
    overflow: hidden;
    border-radius: 12px;

    .visualization-image {
      width: 100%;
      height: auto;
      max-height: 600px;
      object-fit: cover;
    }
  }
}
```

### Adding New Project Types

To add visualization support for new project types:

1. Update placeholder images in `ai-visualize.js`:

```javascript
const placeholders = {
  "Your New Type": "https://your-image-url.jpg",
  // ...
}
```

2. Add style-specific images:

```javascript
const curatedImages = {
  "Modern Your Type": "https://modern-version.jpg",
  "Traditional Your Type": "https://traditional-version.jpg",
  // ...
}
```

## Troubleshooting

### Common Issues

**1. Visualization Not Generating**

- Check if `AI_GATEWAY_TOKEN` is set
- Verify Cloudflare AI is enabled
- Check browser console for errors

**2. Slow Generation**

- Normal generation takes 3-5 seconds
- Stable Diffusion XL may take longer
- Consider using DreamShaper for faster results

**3. Low Quality Images**

- Increase `num_steps` for better quality (slower)
- Adjust `guidance` parameter (7.5 is optimal)
- Use higher resolution settings

### Testing

Test visualization locally:

```bash
# Start development server
gatsby develop

# Navigate to AI Quote page
http://localhost:8000/ai-quote

# Fill form and submit
# Visualization will use placeholders in dev mode
```

Test with production AI:

```bash
# Build and serve
gatsby build
gatsby serve

# With proper env variables set
# Real AI generation will occur
```

## Performance Considerations

- **Caching**: Images are not cached to ensure unique generations
- **Size**: Base64 images are larger than URLs (consider CDN storage)
- **Loading**: Generation happens after estimate (non-blocking)
- **Mobile**: Images are responsive and optimized for all devices

## Future Enhancements

Potential improvements:

- [ ] Save generated images to CDN
- [ ] Multiple angle views
- [ ] Before/after comparisons
- [ ] 3D room tours
- [ ] AR visualization
- [ ] User image upload for style matching
- [ ] Progress photos simulation
- [ ] Material swatches overlay

## Support

For issues or questions:

- Check browser console for errors
- Review Cloudflare AI dashboard for usage
- Contact: bradleybrowninc@gmail.com

---

**Last Updated:** January 2025
**Version:** 1.0.0
**Status:** ✅ Production Ready

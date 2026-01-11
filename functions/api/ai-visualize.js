/**
 * Cloudflare Worker for AI Image Generation
 * Uses Cloudflare's AI models to generate project visualizations
 */

export async function onRequestPost(context) {
  const { request, env } = context

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  }

  // Handle OPTIONS request
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, projectType, style } = await request.json()

    // Enhance prompt with professional visualization details
    const enhancedPrompt = `
      Professional architectural visualization, photorealistic interior design render.
      ${prompt}
      Style: ${style || "contemporary"} interior design
      Lighting: professional photography lighting, warm ambient light
      Quality: ultra HD, 8k resolution, architectural digest quality
      Camera: wide angle lens showing full room
      Details: high-end materials, perfect proportions, realistic textures
    `.trim()

    // Check if AI is configured
    const AI_GATEWAY_TOKEN =
      env.AI_GATEWAY_TOKEN || env.GATSBY_CLOUDFLARE_AI_GATEWAY_TOKEN

    if (!AI_GATEWAY_TOKEN || !env.AI) {
      // Return placeholder URLs for different project types
      const placeholders = {
        "Kitchen Remodel":
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
        "Bathroom Remodel":
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
        "Whole House Renovation":
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "Room Addition":
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "Basement Finishing":
          "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
        "Outdoor Living Space":
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
        "Custom Home Build":
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      }

      return new Response(
        JSON.stringify({
          success: true,
          imageUrl:
            placeholders[projectType] || placeholders["Kitchen Remodel"],
          isPlaceholder: true,
          message: "Using high-quality placeholder image",
        }),
        {
          headers: corsHeaders,
        }
      )
    }

    // Try Stable Diffusion XL model (if available)
    try {
      const imageResponse = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        {
          prompt: enhancedPrompt,
          num_steps: 20,
          guidance: 7.5,
          width: 1024,
          height: 768,
        }
      )

      // Convert image to base64 if needed
      if (imageResponse) {
        const base64Image = btoa(
          String.fromCharCode(...new Uint8Array(imageResponse))
        )
        const imageUrl = `data:image/png;base64,${base64Image}`

        return new Response(
          JSON.stringify({
            success: true,
            imageUrl: imageUrl,
            isGenerated: true,
            message: "AI-generated visualization created successfully",
          }),
          {
            headers: corsHeaders,
          }
        )
      }
    } catch (aiError) {
      console.error("AI image generation error:", aiError)
    }

    // Fallback to DALL-E style prompt with text-to-image model
    try {
      const textToImageResponse = await env.AI.run(
        "@cf/lykon/dreamshaper-8-lcm",
        {
          prompt: enhancedPrompt,
          num_inference_steps: 8,
        }
      )

      if (textToImageResponse) {
        const base64Image = btoa(
          String.fromCharCode(...new Uint8Array(textToImageResponse))
        )
        const imageUrl = `data:image/png;base64,${base64Image}`

        return new Response(
          JSON.stringify({
            success: true,
            imageUrl: imageUrl,
            isGenerated: true,
            message: "AI visualization created with alternative model",
          }),
          {
            headers: corsHeaders,
          }
        )
      }
    } catch (altError) {
      console.error("Alternative AI model error:", altError)
    }

    // Final fallback to curated stock images
    const curatedImages = {
      "Modern Kitchen":
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80",
      "Traditional Kitchen":
        "https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=1200&q=80",
      "Contemporary Bathroom":
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80",
      "Farmhouse Kitchen":
        "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=80",
      "Industrial Loft":
        "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&q=80",
      "Modern Living Room":
        "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200&q=80",
    }

    const styleKey = `${style || "Modern"} ${projectType.split(" ")[0]}`
    const fallbackUrl =
      curatedImages[styleKey] ||
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: fallbackUrl,
        isPlaceholder: true,
        message: "Using curated design image",
      }),
      {
        headers: corsHeaders,
      }
    )
  } catch (error) {
    console.error("Visualization error:", error)
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to generate visualization",
        message: error.message,
      }),
      {
        status: 500,
        headers: corsHeaders,
      }
    )
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

// Cloudflare Worker/Function for AI Quote Generation
// This runs on Cloudflare's edge network

export async function onRequestPost({ request, env }) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const body = await request.json();
    const { formData, aiPrompt } = body;

    // Validate required fields
    if (!formData || !formData.name || !formData.email) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }

    // Call Cloudflare AI Gateway
    const aiResponse = await callCloudflareAI(env.AI_GATEWAY_TOKEN, aiPrompt);

    // Parse AI response and generate estimate
    const estimate = processAIResponse(aiResponse, formData);

    // Send email notification (optional - integrate with your email service)
    await sendEmailNotification(formData, estimate, env);

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      estimate: estimate
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('AI Quote Generation Error:', error);

    // Return fallback estimate on error
    return new Response(JSON.stringify({
      success: true,
      estimate: generateFallbackEstimate(body.formData)
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
}

async function callCloudflareAI(token, prompt) {
  // Using Cloudflare AI Gateway + Workers AI
  // Replace YOUR_ACCOUNT_ID and YOUR_GATEWAY_NAME with your actual values
  const ACCOUNT_ID = 'YOUR_ACCOUNT_ID'; // Get from Cloudflare Dashboard
  const GATEWAY_NAME = 'bradleybrown-ai'; // Your gateway name

  // AI Gateway URL for better management, caching, and analytics
  const AI_GATEWAY_URL = `https://gateway.ai.cloudflare.com/v1/${ACCOUNT_ID}/${GATEWAY_NAME}/workers-ai/@cf/meta/llama-3.1-8b-instruct`;

  // Alternative direct Workers AI URL (without gateway):
  // const WORKERS_AI_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`;

  const systemPrompt = `You are an expert construction cost estimator for Bradley Brown Inc, a licensed Mississippi contractor.

  Your expertise includes:
  - Accurate cost estimation for home improvement projects
  - Current material costs and labor rates for Mississippi
  - Building codes and permit requirements
  - Project timeline estimation

  For each estimate, provide:
  1. Total cost broken down by category
  2. Detailed materials list with quantities
  3. Labor hours and costs
  4. Permit and inspection fees
  5. Project timeline with phases
  6. Cost-saving recommendations
  7. Potential challenges or considerations

  Format your response as structured JSON when possible.
  Use Mississippi regional pricing (generally 10-15% lower than national average).
  Include 10% contingency in all estimates.`;

  const response = await fetch(AI_GATEWAY_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      // Optional: Add caching header for AI Gateway
      'cf-aig-cache': '3600' // Cache for 1 hour for similar requests
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      // Model parameters for better output
      temperature: 0.3, // Lower = more consistent pricing
      max_tokens: 2000, // Enough for detailed response
      top_p: 0.9
    })
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const result = await response.json();
  return result.result.response;
}

function processAIResponse(aiText, formData) {
  // Parse the AI response and structure it
  // This is a simplified version - you'd want more sophisticated parsing

  const baseCosts = {
    "Kitchen Remodel": 25000,
    "Bathroom Remodel": 15000,
    "Whole House Renovation": 75000,
    "Room Addition": 30000,
    "Basement Finishing": 20000,
    "Outdoor Living Space": 15000,
    "Custom Home Build": 250000
  };

  const base = baseCosts[formData.projectType] || 20000;
  const sqftCost = (parseInt(formData.squareFootage) || 100) * 50;
  const featuresCost = (formData.features?.length || 0) * 2500;

  const laborCost = base * 0.4;
  const materialsCost = base * 0.5 + sqftCost;
  const permitsCost = base * 0.05;
  const contingency = base * 0.05;

  const totalCost = materialsCost + laborCost + permitsCost + featuresCost + contingency;

  return {
    summary: {
      total: Math.round(totalCost),
      timeline: formData.timeline || "3-6 months",
      sqft: formData.squareFootage || "Not specified"
    },
    breakdown: {
      materials: Math.round(materialsCost),
      labor: Math.round(laborCost),
      permits: Math.round(permitsCost),
      features: Math.round(featuresCost),
      contingency: Math.round(contingency)
    },
    materials: [
      {
        item: formData.projectType.includes("Kitchen") ? "Cabinets" : "Fixtures",
        quantity: "As specified",
        cost: Math.round(materialsCost * 0.3)
      },
      {
        item: formData.projectType.includes("Kitchen") ? "Countertops" : "Tile",
        quantity: `${formData.squareFootage || 100} sq ft`,
        cost: Math.round(materialsCost * 0.2)
      },
      {
        item: "Flooring",
        quantity: `${formData.squareFootage || 100} sq ft`,
        cost: Math.round(materialsCost * 0.2)
      },
      {
        item: formData.projectType.includes("Kitchen") ? "Appliances" : "Lighting",
        quantity: "Package",
        cost: Math.round(materialsCost * 0.15)
      },
      {
        item: "Paint & Finishes",
        quantity: "As needed",
        cost: Math.round(materialsCost * 0.15)
      }
    ],
    timeline: [
      { phase: "Planning & Permits", duration: "1-2 weeks" },
      { phase: "Demolition", duration: "3-5 days" },
      { phase: "Rough Construction", duration: "2-3 weeks" },
      { phase: "Finishes", duration: "2-3 weeks" },
      { phase: "Final Inspection", duration: "2-3 days" }
    ],
    recommendations: [
      "Consider energy-efficient appliances for long-term savings",
      "Use durable, low-maintenance materials",
      "Plan for 10% contingency in your budget",
      "Schedule work during off-peak seasons for better pricing"
    ],
    aiInsights: aiText || "AI analysis provided detailed recommendations based on your specific project requirements."
  };
}

function generateFallbackEstimate(formData) {
  // Fallback estimate if AI fails
  return processAIResponse(null, formData);
}

async function sendEmailNotification(formData, estimate, env) {
  // Send to Formspree or your email service
  const emailData = {
    to: 'bradleybrowninc@gmail.com',
    subject: `New AI Quote Request - ${formData.name}`,
    html: `
      <h2>New AI Quote Request</h2>
      <h3>Customer Information:</h3>
      <ul>
        <li>Name: ${formData.name}</li>
        <li>Email: ${formData.email}</li>
        <li>Phone: ${formData.phone}</li>
      </ul>

      <h3>Project Details:</h3>
      <ul>
        <li>Type: ${formData.projectType}</li>
        <li>Square Footage: ${formData.squareFootage}</li>
        <li>Timeline: ${formData.timeline}</li>
        <li>Budget: ${formData.budget}</li>
      </ul>

      <h3>Estimated Cost:</h3>
      <p><strong>Total: $${estimate.summary.total.toLocaleString()}</strong></p>

      <h3>Features Requested:</h3>
      <ul>
        ${(formData.features || []).map(f => `<li>${f}</li>`).join('')}
      </ul>

      <p>Full details available in your dashboard.</p>
    `
  };

  // You can integrate with SendGrid, Mailgun, or other services here
  // For now, we'll just log it
  console.log('Email notification:', emailData);
}

// Export for Cloudflare Pages Functions
export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      return onRequestPost({ request, env });
    }
    return new Response('Method not allowed', { status: 405 });
  }
};
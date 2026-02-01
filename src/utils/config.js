// Configuration utility for accessing environment variables safely

const config = {
  // AI Gateway Configuration
  ai: {
    gatewayToken: process.env.GATSBY_CLOUDFLARE_AI_GATEWAY_TOKEN || '',
    gatewayUrl: process.env.GATSBY_CLOUDFLARE_AI_GATEWAY_URL || '',
    enabled: !!process.env.GATSBY_CLOUDFLARE_AI_GATEWAY_TOKEN
  },

  // API Endpoints
  api: {
    aiQuote: process.env.GATSBY_API_URL
      ? `${process.env.GATSBY_API_URL}/api/ai-quote`
      : '/api/ai-quote',
    formspree: 'https://formspree.io/f/mykgnqee'
  },

  // Feature Flags
  features: {
    aiQuotes: true,
    imageAnalysis: !!process.env.GATSBY_CLOUDFLARE_AI_GATEWAY_TOKEN,
    emailNotifications: true
  },

  // Development/Production Detection
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
};

// Helper function to check if AI is configured
export const isAIConfigured = () => {
  return config.ai.enabled && config.ai.gatewayToken.length > 0;
};

// Helper function to get AI headers
export const getAIHeaders = () => {
  if (!isAIConfigured()) {
    console.warn('AI Gateway token not configured');
    return {};
  }

  return {
    'Authorization': `Bearer ${config.ai.gatewayToken}`,
    'Content-Type': 'application/json'
  };
};

// Log configuration status (only in development)
if (config.isDevelopment) {
  console.log('🔧 Configuration Status:', {
    aiEnabled: config.ai.enabled,
    hasToken: config.ai.gatewayToken.length > 0,
    environment: process.env.NODE_ENV
  });
}

export default config;
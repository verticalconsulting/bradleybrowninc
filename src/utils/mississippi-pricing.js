// Mississippi-specific construction pricing model
// Based on regional labor rates and material costs
// Prices are 10-15% lower than national average

export const mississippiPricing = {
  // Labor rates per hour (Mississippi average)
  labor: {
    generalContractor: 65, // National avg: $75
    carpenter: 35,         // National avg: $40
    plumber: 55,          // National avg: $65
    electrician: 50,      // National avg: $60
    painter: 30,          // National avg: $35
    tilesetter: 40,       // National avg: $45
    helper: 20            // National avg: $25
  },

  // Square foot pricing by project type
  sqftPricing: {
    "Kitchen Remodel": {
      basic: 75,      // Laminate counters, stock cabinets
      mid: 150,       // Granite, semi-custom cabinets
      high: 250       // Premium materials, custom everything
    },
    "Bathroom Remodel": {
      basic: 70,
      mid: 125,
      high: 200
    },
    "Whole House Renovation": {
      basic: 45,
      mid: 85,
      high: 150
    },
    "Room Addition": {
      basic: 80,
      mid: 120,
      high: 180
    },
    "Basement Finishing": {
      basic: 35,
      mid: 55,
      high: 85
    },
    "Custom Home Build": {
      basic: 95,
      mid: 135,
      high: 200
    },
    "Outdoor Living Space": {
      basic: 25,
      mid: 45,
      high: 75
    }
  },

  // Material costs (Mississippi pricing)
  materials: {
    kitchen: {
      cabinets: {
        stock: 100,        // per linear foot
        semiCustom: 175,
        custom: 350
      },
      countertops: {
        laminate: 25,      // per sq ft
        granite: 45,
        quartz: 55,
        marble: 85
      },
      appliances: {
        basic: 2500,       // package price
        mid: 5000,
        high: 12000
      },
      flooring: {
        vinyl: 3,          // per sq ft
        laminate: 4,
        tile: 6,
        hardwood: 8
      }
    },
    bathroom: {
      vanity: {
        single: 400,
        double: 800,
        custom: 1500
      },
      fixtures: {
        basic: 500,
        mid: 1200,
        high: 2500
      },
      tile: {
        ceramic: 5,        // per sq ft
        porcelain: 8,
        natural: 15
      },
      shower: {
        prefab: 800,
        tiled: 2500,
        luxury: 5000
      }
    }
  },

  // Feature add-ons
  features: {
    // Kitchen features
    "Island": 3500,
    "Breakfast Bar": 1500,
    "Pantry": 2500,
    "High-end Appliances": 5000,
    "Custom Cabinets": 8000,
    "Granite Countertops": 3000,
    "Backsplash": 1200,
    "Under-cabinet Lighting": 500,

    // Bathroom features
    "Double Vanity": 2000,
    "Walk-in Shower": 3500,
    "Soaking Tub": 2500,
    "Heated Floors": 1500,
    "Custom Tile Work": 2000,
    "Skylights": 1800,
    "Towel Warmers": 400,
    "Steam Shower": 5000
  },

  // Permits and fees (Mississippi average)
  permits: {
    buildingPermit: 500,
    electricalPermit: 150,
    plumbingPermit: 150,
    mechanicalPermit: 100,
    inspections: 300
  },

  // Project timeline factors (weeks)
  timelines: {
    "Kitchen Remodel": {
      small: 3,
      medium: 5,
      large: 8
    },
    "Bathroom Remodel": {
      small: 2,
      medium: 3,
      large: 5
    },
    "Whole House Renovation": {
      small: 8,
      medium: 12,
      large: 20
    },
    "Room Addition": {
      small: 4,
      medium: 8,
      large: 12
    },
    "Custom Home Build": {
      small: 16,
      medium: 24,
      large: 36
    }
  },

  // Budget level multipliers
  budgetMultipliers: {
    "Under $10,000": 1.0,
    "$10,000 - $25,000": 1.1,
    "$25,000 - $50,000": 1.15,
    "$50,000 - $100,000": 1.2,
    "$100,000 - $200,000": 1.25,
    "Over $200,000": 1.3
  }
};

// Calculate estimate based on inputs
export function calculateMississippiEstimate(formData) {
  const projectType = formData.projectType || "Kitchen Remodel";
  const sqft = parseInt(formData.squareFootage) || 100;
  const budget = formData.budget || "$25,000 - $50,000";
  const features = formData.features || [];

  // Determine quality level based on budget
  let qualityLevel = 'basic';
  if (budget.includes('50,000') || budget.includes('100,000')) {
    qualityLevel = 'mid';
  } else if (budget.includes('200,000') || budget.includes('Over')) {
    qualityLevel = 'high';
  }

  // Get base pricing
  const basePricing = mississippiPricing.sqftPricing[projectType] ||
                     mississippiPricing.sqftPricing["Kitchen Remodel"];
  const pricePerSqft = basePricing[qualityLevel];

  // Calculate costs
  const baseCost = sqft * pricePerSqft;

  // Add feature costs
  const featuresCost = features.reduce((total, feature) => {
    return total + (mississippiPricing.features[feature] || 0);
  }, 0);

  // Calculate breakdown
  const laborCost = baseCost * 0.4;
  const materialsCost = baseCost * 0.5;
  const permitsCost = Object.values(mississippiPricing.permits)
    .reduce((a, b) => a + b, 0);
  const contingency = (baseCost + featuresCost) * 0.1;

  const totalCost = baseCost + featuresCost + permitsCost + contingency;

  // Determine timeline
  let projectSize = 'small';
  if (sqft > 150) projectSize = 'medium';
  if (sqft > 300) projectSize = 'large';

  const timelineWeeks = mississippiPricing.timelines[projectType]?.[projectSize] || 4;

  return {
    summary: {
      total: Math.round(totalCost),
      baseCost: Math.round(baseCost),
      timeline: `${timelineWeeks} weeks`,
      sqft: sqft,
      pricePerSqft: pricePerSqft,
      location: "Mississippi (Regional Pricing)"
    },
    breakdown: {
      materials: Math.round(materialsCost),
      labor: Math.round(laborCost),
      permits: Math.round(permitsCost),
      features: Math.round(featuresCost),
      contingency: Math.round(contingency)
    },
    regionalNotes: [
      "Prices reflect Mississippi regional rates (10-15% below national average)",
      "Labor costs based on local contractor rates",
      "Materials sourced from regional suppliers",
      "Permit fees based on Mississippi county averages"
    ]
  };
}

export default mississippiPricing;
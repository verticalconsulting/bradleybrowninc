// Site Configuration File
// Centralized location for managing images, videos, and other reusable content

// ============================================
// IMPORTS
// ============================================
// import companyVideo from "../images/company.mp4"
import heroImage from "../images/company.jpg" // Uncomment to use image
import logo from "../images/brand-logo.png"
import aboutImage from "../images/about.jpg"

// ============================================
// HERO SECTION
// ============================================
export const heroConfig = {
  // Set to "video" or "image"
  backgroundType: "image",

  // Video or image source
  // backgroundSrc: companyVideo,
  backgroundSrc: heroImage, // Uncomment to use image instead

  // Hero content (can override on individual pages)
  title: "Building Dreams, Creating Homes",
  description: "Custom home construction excellence",
}

// ============================================
// IMAGES
// ============================================

export const images = {
  logo: logo,
  aboutImage: aboutImage,
  // Add more images as needed
}

// ============================================
// COMPANY INFO
// ============================================
export const company = {
  name: "Bradley Brown Inc",
  tagline: "Building Quality Homes Since 2019",
  phone: "601-954-1306",
  // Add other company-related constants
}

// ============================================
// COLORS & THEMES
// ============================================
export const colors = {
  primary: "#your-primary-color",
  secondary: "#your-secondary-color",
  // Add theme colors as needed
}

// ============================================
// SOCIAL MEDIA
// ============================================
// Note: Social media links are managed in gatsby-config.js
// but you can add additional social configurations here

// ============================================
// FEATURE FLAGS
// ============================================
export const features = {
  showProjectsInHeader: true,
  showPrivacyPolicyInHeader: true,
  enableContactForm: true,
  // Add feature toggles as needed
}

// ============================================
// PATHS & ROUTES
// ============================================
export const routes = {
  home: "/#hero",
  services: "/services/#services",
  projects: "/projects/#projects",
  about: "/about/#about",
  contact: "/contact/#contact",
  privacy: "/privacy/#privacy-policy",
}

// ============================================
// BUTTON TEXT & LABELS
// ============================================
export const labels = {
  heroButton1: "Our Services",
  heroButton2: "Request a Quote",
  heroButton3: "Call Now",
  // Add more labels as needed
}

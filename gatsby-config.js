module.exports = {
  siteMetadata: {
    title: `Bradley Brown Inc`,
    fullTitle: `Bradley Brown Inc - Licensed & Insured Custom Home Builder`,
    description: `No job is too big, or too small. Licensed and insured custom home builder serving Rankin, Madison, Hinds, and Scott Counties in Mississippi.`,
    about: `Bradley Brown Inc is a licensed and insured custom home builder specializing in whole home remodels, kitchen and bathroom renovations, additions, and minor repairs. No job is too big, or too small.`,
    email: `bradleybrowninc@gmail.com`,
    social: {
      facebook: `https://facebook.com/bradleybrowninc`,
      twitter: `https://twitter.com/bradleybrowninc`,
      instagram: `https://instagram.com/bradleybrowninc`,
      linkedin: `https://linkedin.com/company/bradleybrowninc`,
    },
    contact: {
      mobile: `601-954-1306`,
      telephone: `601-954-1306`,
    },
    address: `104 Tiffany Drive, Brandon, MS 39042`,
    serviceAreas: [
      `Rankin County`,
      `Madison County`,
      `Hinds County (limited areas)`,
      `Scott County (limited areas)`,
    ],
    serviceOfferings: [
      {
        title: `Kitchen Remodels`,
        description: `Transform your kitchen into the heart of your home with custom designs and quality craftsmanship.`,
      },
      {
        title: `Bathroom Remodels`,
        description: `Upgrade your bathroom with modern fixtures, beautiful tile work, and functional layouts.`,
      },
      {
        title: `Whole House Remodeling`,
        description: `Complete home transformations that bring your vision to life, from concept to completion.`,
      },
      {
        title: `Additions`,
        description: `Expand your living space with custom additions that seamlessly blend with your existing home.`,
      },
      {
        title: `Minor Repairs`,
        description: `Professional repair services for all your home maintenance needs, big or small.`,
      },
    ],
    map: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.8!2d-89.9859!3d32.2734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDE2JzI0LjIiTiA4OcKwNTknMDkuMiJX!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus`,
    opening: {
      day: `Monday - Friday`,
      hour: `8:00am - 5:00pm`,
    },
    careers: {
      title: `Join Our Team`,
      about: `Bradley Brown Inc is always looking for skilled craftsmen and dedicated professionals who take pride in quality work. We offer competitive compensation and a supportive work environment.`,
      benefits: [
        `Competitive pay`,
        `Flexible scheduling`,
        `Professional development opportunities`,
      ],
    },

    author: {
      name: `Corey Hughes`,
      position: `Owner`,
      email: `corey@verticalconsulting.net`,
      contact: `(601) 506-8818)`,
      website: `https://verticalconsulting.net`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout`),
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bradley Brown Inc`,
        short_name: `Bradley Brown Inc`,
        start_url: `/`,
        background_color: `#003D82`,
        theme_color: `#003D82`,
        display: `minimal-ui`,
        icon: `src/images/brand-logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

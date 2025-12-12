module.exports = {
  siteMetadata: {
    title: `Elite Builders`,
    fullTitle: `ELITE CUSTOM BUILDERS`,
    description: `Crafting Excellence in Every Detail | Custom Homes & Luxury Remodels`,
    about: `We specialize in high-end custom home construction and premium kitchen and bath remodeling. With an unwavering commitment to quality craftsmanship and attention to detail, we transform your vision into reality. Our experienced team delivers exceptional results that stand the test of time.`,
    email: `info@elitebuilders.com`,
    social: {
      facebook: `https://facebook.com/elitebuilders`,
      twitter: `https://twitter.com/elitebuilders`,
      instagram: `https://instagram.com/elitebuilders`,
      linkedin: `https://linkedin.com/in/elitebuilders`,
    },
    contact: {
      mobile: `(555) 123-4567`,
      telephone: `(555) 987-6543`,
    },
    address: `123 Builder's Lane, Your City, State 12345`,
    map: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.590531801578!2d120.92931831483857!3d14.450745589898093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d282c1782f4f%3A0x62e247641b50bd21!2sBermuda%20Country%20Subdivision%2C%20Bacoor%2C%20Cavite!5e0!3m2!1sen!2sph!4v1566970336076!5m2!1sen!2sph`,
    opening: {
      day: `Monday - Friday`,
      hour: `8:00am - 5:00pm`,
    },
    careers: {
      title: `Benefits and rewards`,
      about: `Our diverse capabilities provide employees with the ability to
      work on projects of all sizes and types and receive amazing
      benefits in return. They include but are in no way limited to:`,
      benefits: [
        `Healthcare and wellness benefits`,
        `Retirement and financial protection`,
        `Employee development programs`,
      ],
    },

    author: {
      name: `Mark Dino Pelonia`,
      position: `Web Developer`,
      email: `markdinopelonia447@gmail.com`,
      contact: `(+63) 946 290 9678`,
      website: `https://markdino.github.io/portfolio`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/brand-logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

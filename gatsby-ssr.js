/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react")

exports.onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  // Google Tag Manager script for <head>
  setHeadComponents([
    React.createElement("script", {
      key: "gtm-script",
      dangerouslySetInnerHTML: {
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M3W35JTV');`,
      },
    }),
    // Google Ads conversion tracking (gtag.js)
    React.createElement("script", {
      key: "gtag-script",
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=AW-17864041271",
    }),
    React.createElement("script", {
      key: "gtag-config",
      dangerouslySetInnerHTML: {
        __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-17864041271');`,
      },
    }),
  ])

  // Google Tag Manager noscript for <body>
  setPreBodyComponents([
    React.createElement("noscript", {
      key: "gtm-noscript",
      dangerouslySetInnerHTML: {
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M3W35JTV"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      },
    }),
  ])
}

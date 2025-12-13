import React from "react"
import { graphql } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"

// ---------- Themes colors ----------
import "../themes/blue.scss"

// ---------- Components ----------
import Hero from "../components/hero"
import Services from "../components/services"
import About from "../components/about"
import QuoteForm from "../components/quoteForm"
import Feature from "../components/feature"

const IndexPage = ({ data }) => {
  const { fullTitle, description, about } = data.site.siteMetadata

  return (
    <div>
      <Hero title={fullTitle} description={description} />
      <Services />
      <About about={about} />
      <Feature
        title="Featured Projects"
        projects={data.allProjectsJson.edges}
      />
      <QuoteForm />
    </div>
  )
}

export const projectsQuery = graphql`
  query FeaturedProjectsQuery {
    allProjectsJson {
      edges {
        node {
          title
          slug
          category
          description
          img {
            src
            orig
            author
          }
          completionDate
          amount
          duration
          owner
          address
          featured
        }
      }
    }
    site {
      siteMetadata {
        fullTitle
        description
        about
      }
    }
  }
`

export default IndexPage

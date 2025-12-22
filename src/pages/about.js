import React from "react"
import { Container, Row, Col } from "reactstrap"
import { useStaticQuery, graphql } from "gatsby"
import companyThumbnail from "../images/company.jpg"
import PageHeader from "../components/pageHeader"
import AboutCard from "../components/aboutCard"

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query AboutdataQuery {
      site {
        siteMetadata {
          title
          fullTitle
        }
      }
    }
  `)

  const { title, fullTitle } = data.site.siteMetadata

  const aboutContent = [
    `Bradley Brown Inc is owned and operated by Brad Brown, a seasoned professional with decades of experience in the construction industry. From custom home building to complete remodels, and just about everything under the sun related to construction, Brad has seen and done it all.`,
    `What sets Bradley Brown Inc apart is the unwavering commitment to quality and attention to detail. Brad treats every project as if it were his own home, ensuring that every nail, board, and finish meets the highest standards of craftsmanship. This personal approach means you're not just hiring a contractor—you're partnering with someone who genuinely cares about the outcome.`,
    `While Bradley Brown Inc may not always be the cheapest option, clients consistently find that the investment is worth it. The company delivers fine craftsmanship that is built to last, using quality materials and proven techniques that stand the test of time. Whether it's a kitchen remodel, bathroom renovation, home addition, or minor repair, you can count on work that exceeds expectations.`,
    `Serving Rankin, Madison, Hinds, and Scott Counties in Mississippi, Bradley Brown Inc has built a reputation for reliability, integrity, and exceptional workmanship. No job is too big or too small—from minor repairs to complete home transformations, every project receives the same level of dedication and expertise.`,
  ]
  return (
    <section id="about">
      <PageHeader title="About Us" />
      <Container>
        <main className="about-page section-lg">
          <h2 className="header-title text-center font-weight-bold">{title}</h2>
          <section className="about-content">
            <img
              src={companyThumbnail}
              alt="Company Thumbnail"
              className="img-thumbnail w-50 mr-3"
              align="left"
            />
            <p className="content-title font-weight-bold">{fullTitle}</p>
            {aboutContent.map(para => (
              <p>{para}</p>
            ))}
          </section>
          <hr />
          <Row>
            <Col md="6">
              <AboutCard title="Mission">
                <p>
                  <strong>{fullTitle}</strong>'s mission is to deliver exceptional craftsmanship and personalized service to homeowners throughout Central Mississippi. We are committed to:
                </p>
                <ol>
                  <li>Treating every project with the care and attention we would give our own home.</li>
                  <li>
                    Building lasting relationships with clients through honest communication and reliable service.
                  </li>
                  <li>
                    Using quality materials and proven construction techniques that stand the test of time.
                  </li>
                  <li>Maintaining the highest standards of professionalism and craftsmanship in every job.</li>
                  <li>
                    Serving our communities with integrity, from small repairs to complete home transformations.
                  </li>
                </ol>
              </AboutCard>
            </Col>
            <Col md="6">
              <AboutCard title="Vision">
                <p>
                  Our vision is to be Central Mississippi's most trusted name in custom home building and remodeling. <strong>{fullTitle}</strong> aspires to be recognized not just for the quality of our work, but for the relationships we build and the care we bring to every project. We envision a future where every homeowner knows they can count on us for honest advice, superior craftsmanship, and work that truly lasts.
                </p>
              </AboutCard>
              <AboutCard title="Core Values">
                <p>
                  At <strong>{title}</strong>, our core values guide everything we do. These principles are the foundation of how we work and how we serve our clients:
                </p>
                <ul>
                  <li>Quality Craftsmanship - Built to last</li>
                  <li>Attention to Detail - Every project matters</li>
                  <li>Integrity - Honest and reliable service</li>
                  <li>Personal Care - Treating your home as our own</li>
                  <li>Customer Satisfaction - Your vision, our expertise</li>
                </ul>
              </AboutCard>
            </Col>
          </Row>
          <hr />
        </main>
      </Container>
    </section>
  )
}

export default AboutPage

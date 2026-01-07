import React from "react"
import { Container, Row, Col } from "reactstrap"
import { Link, useStaticQuery, graphql } from "gatsby"
import PageHeader from "../components/pageHeader"

const ThankYouPage = () => {
  const data = useStaticQuery(graphql`
    query ThankYoudataQuery {
      site {
        siteMetadata {
          title
          contact {
            mobile
          }
          email
        }
      }
    }
  `)

  const { title, contact, email } = data.site.siteMetadata

  return (
    <section id="thank-you">
      <PageHeader title="Thank You" />
      <Container>
        <main className="thank-you-page section-lg">
          <Row className="justify-content-center">
            <Col lg="8" className="text-center">
              <div className="thank-you-icon mb-4" style={{ fontSize: "80px", color: "#28a745" }}>
                ✓
              </div>

              <h2 className="header-title font-weight-bold mb-4">
                Thank You for Contacting Us!
              </h2>

              <p className="lead text-muted mb-4">
                We've received your message and appreciate you reaching out to <strong>{title}</strong>.
              </p>

              <div className="thank-you-content mb-5">
                <h4 className="font-weight-bold mb-3">What Happens Next?</h4>
                <Row className="justify-content-center">
                  <Col md="10">
                    <div className="text-left">
                      <ol className="thank-you-steps" style={{ fontSize: "1.1rem", lineHeight: "2" }}>
                        <li>
                          <strong>We'll review your request</strong> - Our team will carefully look over the details you provided.
                        </li>
                        <li>
                          <strong>You'll hear from us within 24 hours</strong> - We'll reach out by phone or email to discuss your project.
                        </li>
                        <li>
                          <strong>We'll schedule a consultation</strong> - If needed, we'll arrange a time to meet and provide a detailed quote.
                        </li>
                      </ol>
                    </div>
                  </Col>
                </Row>
              </div>

              <hr className="my-5" />

              <div className="need-immediate-help mb-5">
                <h5 className="font-weight-bold mb-3">Need Immediate Assistance?</h5>
                <p className="text-muted mb-3">
                  If your project is urgent, feel free to call us directly:
                </p>
                <div className="contact-buttons">
                  <a href={`tel:${contact.mobile}`} className="btn btn-primary btn-lg mr-2 mb-2">
                    Call {contact.mobile}
                  </a>
                  <a href={`mailto:${email}`} className="btn btn-outline-primary btn-lg mb-2">
                    Email Us
                  </a>
                </div>
              </div>

              <hr className="my-5" />

              <div className="navigation-links">
                <h5 className="font-weight-bold mb-4">Continue Exploring</h5>
                <Row className="justify-content-center">
                  <Col md="3" sm="6" className="mb-3">
                    <Link to="/" className="btn btn-outline-secondary btn-block">
                      Home
                    </Link>
                  </Col>
                  <Col md="3" sm="6" className="mb-3">
                    <Link to="/services/#services" className="btn btn-outline-secondary btn-block">
                      Our Services
                    </Link>
                  </Col>
                  <Col md="3" sm="6" className="mb-3">
                    <Link to="/projects/#projects" className="btn btn-outline-secondary btn-block">
                      View Projects
                    </Link>
                  </Col>
                  <Col md="3" sm="6" className="mb-3">
                    <Link to="/about/#about" className="btn btn-outline-secondary btn-block">
                      About Us
                    </Link>
                  </Col>
                </Row>
              </div>

              <div className="social-proof mt-5 p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <p className="mb-2 font-weight-bold">🏆 Why Choose {title}?</p>
                <p className="text-muted mb-0">
                  Licensed & insured • Decades of experience • Quality craftsmanship • Attention to detail
                </p>
              </div>
            </Col>
          </Row>
        </main>
      </Container>
    </section>
  )
}

export default ThankYouPage

import React from "react"
import { Container, Row, Col, Button } from "reactstrap"
import "./quoteForm.scss"

const QuoteForm = () => {
  return (
    <div className="quote-form" id="quote">
      <section className="quote-form-section">
        <Container>
          <div className="quote-form-content">
            <h2 className="text-center mb-4 font-weight-bold">Request a Quote</h2>
            <p className="text-center text-muted mb-5">
              Ready to start your project? Fill out the form below and our team will get back to you within 24 hours.
            </p>
            <form
              name="quote"
              method="POST"
              data-netlify-honeypot="bot-field"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="quote" />
              <Row>
                <Col md="6" className="mb-4">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Your Name*"
                    required
                  />
                </Col>
                <Col md="6" className="mb-4">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    required
                  />
                </Col>
                <Col md="6" className="mb-4">
                  <input
                    className="form-control"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number*"
                    required
                  />
                </Col>
                <Col md="6" className="mb-4">
                  <select
                    className="form-control"
                    name="service"
                    required
                  >
                    <option value="">Select Service*</option>
                    <option value="Custom Home Build">Custom Home Build</option>
                    <option value="Kitchen Remodel">Kitchen Remodel</option>
                    <option value="Bath Remodel">Bath Remodel</option>
                    <option value="Multiple Services">Multiple Services</option>
                    <option value="Other">Other</option>
                  </select>
                </Col>
                <Col md="12" className="mb-4">
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    placeholder="Project Address"
                  />
                </Col>
                <Col md="12" className="mb-4">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Tell us about your project*"
                    rows="6"
                    required
                  ></textarea>
                </Col>
                <Col md="12" className="text-center">
                  <Button
                    color="primary"
                    size="lg"
                    type="submit"
                    className="quote-submit-btn"
                  >
                    Submit Quote Request
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default QuoteForm

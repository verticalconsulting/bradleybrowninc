import React, { useState } from "react"
import { Container, Row, Col, Button } from "reactstrap"
import "./quoteForm.scss"

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_type: "",
    start_timeline: "",
    address: "",
    message: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

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
              action="https://formspree.io/f/mykgnqee"
              method="POST"
            >
              <input type="hidden" name="_next" value="https://bradleybrowninc.com/thank-you" />
              <Row>
                <Col md="6" className="mb-4">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Your Name*"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md="6" className="mb-4">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md="6" className="mb-4">
                  <input
                    className="form-control"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number*"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md="6" className="mb-4">
                  <select
                    className="form-control"
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">What type of project are you considering?*</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bath">Bath</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Office">Office</option>
                    <option value="Custom Home Build">Custom Home Build</option>
                    <option value="Home remodel">Home remodel</option>
                    <option value="Other">Other</option>
                  </select>
                </Col>
                <Col md="6" className="mb-4">
                  <select
                    className="form-control"
                    name="start_timeline"
                    value={formData.start_timeline}
                    onChange={handleChange}
                    required
                  >
                    <option value="">When do you plan to start?*</option>
                    <option value="0-3 months">0-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </Col>
                <Col md="12" className="mb-4">
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    placeholder="Project Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="12" className="mb-4">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Tell us about your project*"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
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

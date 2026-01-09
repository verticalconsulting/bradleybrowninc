import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import { Helmet } from "react-helmet"
import PageHeader from "../components/pageHeader"
import "./payment.scss"

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState("stripe")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

  // Payment configuration
  const venmoUsername = "bradleybrowninc"
  const venmoHandle = "@bradleybrowninc"
  const zelleEmail = "bradleybrowninc@gmail.com"
  const stripePaymentLink = "https://buy.stripe.com/your-payment-link" // Replace with your actual Stripe Payment Link

  // Initialize Klarna messaging
  useEffect(() => {
    if (window.Klarna && activeTab === "klarna") {
      window.Klarna.OnsiteMessaging.refresh()
    }
  }, [activeTab])

  const handleVenmoPayment = () => {
    let venmoUrl = `venmo://paycharge?txn=pay&recipients=${venmoUsername}`
    if (amount && parseFloat(amount) > 0) {
      venmoUrl += `&amount=${parseFloat(amount).toFixed(2)}`
    }
    if (note) {
      venmoUrl += `&note=${encodeURIComponent(note)}`
    }
    window.location.href = venmoUrl
    setTimeout(() => {
      window.open(`https://venmo.com/${venmoUsername}`, "_blank")
    }, 1000)
  }

  const handleStripePayment = () => {
    window.open(stripePaymentLink, "_blank")
  }

  return (
    <>
      <Helmet>
        <title>Make a Payment - Bradley Brown Inc</title>
        <meta
          name="description"
          content="Make a payment to Bradley Brown Inc securely. We accept Stripe, Klarna, Zelle, and Venmo for your convenience."
        />
      </Helmet>

      <section id="payment">
        <PageHeader title="Make a Payment" />

        <Container>
          <div className="payment-page section-lg">
            <Row className="justify-content-center">
              <Col lg="10" xl="9">
                <div className="text-center mb-5">
                  <h2 className="font-weight-bold mb-3">
                    Choose Your Payment Method
                  </h2>
                  <p className="text-muted lead">
                    We offer multiple convenient and secure payment options for
                    your project
                  </p>
                </div>

                <Card className="shadow-sm payment-card">
                  <CardBody className="p-0">
                    <Nav tabs className="payment-tabs">
                      <NavItem>
                        <NavLink
                          className={activeTab === "stripe" ? "active" : ""}
                          onClick={() => setActiveTab("stripe")}
                        >
                          <div className="tab-content-wrapper">
                            <span className="tab-icon">💳</span>
                            <span className="tab-label">
                              Credit Card (Stripe)
                            </span>
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={activeTab === "klarna" ? "active" : ""}
                          onClick={() => setActiveTab("klarna")}
                        >
                          <div className="tab-content-wrapper">
                            <span className="tab-icon">📊</span>
                            <span className="tab-label">
                              Pay Later (Klarna)
                            </span>
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={activeTab === "zelle" ? "active" : ""}
                          onClick={() => setActiveTab("zelle")}
                        >
                          <div className="tab-content-wrapper">
                            <span className="tab-icon">🏦</span>
                            <span className="tab-label">Zelle</span>
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={activeTab === "venmo" ? "active" : ""}
                          onClick={() => setActiveTab("venmo")}
                        >
                          <div className="tab-content-wrapper">
                            <span className="tab-icon">📱</span>
                            <span className="tab-label">Venmo</span>
                          </div>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTab} className="p-4 p-md-5">
                      {/* Stripe Tab */}
                      <TabPane tabId="stripe">
                        <div className="payment-method-content">
                          <div className="text-center mb-4">
                            <div className="payment-logo mb-3">
                              <svg
                                width="100"
                                height="42"
                                viewBox="0 0 60 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M59.5 12.5C59.5 18.8513 54.3513 24 48 24C41.6487 24 36.5 18.8513 36.5 12.5C36.5 6.14873 41.6487 1 48 1C54.3513 1 59.5 6.14873 59.5 12.5ZM48 20C52.1421 20 55.5 16.6421 55.5 12.5C55.5 8.35786 52.1421 5 48 5C43.8579 5 40.5 8.35786 40.5 12.5C40.5 16.6421 43.8579 20 48 20Z"
                                  fill="#635BFF"
                                />
                                <path d="M23 4H4V21H23V4Z" fill="#635BFF" />
                              </svg>
                            </div>
                            <h3 className="font-weight-bold mb-2">
                              Pay with Credit or Debit Card
                            </h3>
                            <p className="text-muted">
                              Secure payment processing with Stripe. Accepts all
                              major credit and debit cards.
                            </p>
                          </div>

                          <div className="features-list mb-4">
                            <div className="feature-item">
                              ✓ Instant payment confirmation
                            </div>
                            <div className="feature-item">
                              ✓ 256-bit SSL encryption
                            </div>
                            <div className="feature-item">
                              ✓ Accepts Visa, Mastercard, Amex, Discover
                            </div>
                            <div className="feature-item">
                              ✓ Apple Pay & Google Pay supported
                            </div>
                          </div>

                          <Button
                            color="primary"
                            size="lg"
                            block
                            onClick={handleStripePayment}
                            className="mb-3"
                          >
                            Pay with Stripe
                          </Button>

                          <p className="text-center text-muted small mb-0">
                            Transaction fees: 2.9% + $0.30
                          </p>
                        </div>
                      </TabPane>

                      {/* Klarna Tab */}
                      <TabPane tabId="klarna">
                        <div className="payment-method-content">
                          <div className="text-center mb-4">
                            <div className="payment-logo mb-3">
                              <svg
                                width="120"
                                height="40"
                                viewBox="0 0 120 40"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="120"
                                  height="40"
                                  rx="4"
                                  fill="#FFB3C7"
                                />
                                <text
                                  x="60"
                                  y="25"
                                  fontFamily="Arial, sans-serif"
                                  fontSize="18"
                                  fontWeight="bold"
                                  fill="#000"
                                  textAnchor="middle"
                                >
                                  Klarna
                                </text>
                              </svg>
                            </div>
                            <h3 className="font-weight-bold mb-2">
                              Pay Over Time with Klarna
                            </h3>
                            <p className="text-muted">
                              Flexible financing options for projects $1,000+.
                              No hidden fees.
                            </p>
                          </div>

                          <div className="klarna-messaging-wrapper mb-4 p-4 bg-light rounded">
                            <klarna-placement
                              data-key="credit-promotion-auto-size"
                              data-locale="en-US"
                              data-purchase-amount="100000"
                            ></klarna-placement>
                          </div>

                          <div className="features-list mb-4">
                            <div className="feature-item">
                              ✓ Pay in 4 interest-free installments
                            </div>
                            <div className="feature-item">
                              ✓ Or choose monthly financing
                            </div>
                            <div className="feature-item">
                              ✓ No impact on credit score to check eligibility
                            </div>
                            <div className="feature-item">
                              ✓ Instant approval decision
                            </div>
                          </div>

                          <Button
                            color="primary"
                            size="lg"
                            block
                            className="mb-3"
                            style={{
                              backgroundColor: "#FFB3C7",
                              borderColor: "#FFB3C7",
                              color: "#000",
                            }}
                          >
                            Coming Soon - Contact Us
                          </Button>

                          <p className="text-center text-muted small mb-0">
                            Contact us to set up Klarna financing for your
                            project
                          </p>
                        </div>
                      </TabPane>

                      {/* Zelle Tab */}
                      <TabPane tabId="zelle">
                        <div className="payment-method-content">
                          <div className="text-center mb-4">
                            <div className="payment-logo mb-3">
                              <svg
                                width="100"
                                height="40"
                                viewBox="0 0 100 40"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="100"
                                  height="40"
                                  rx="4"
                                  fill="#6D1ED4"
                                />
                                <text
                                  x="50"
                                  y="25"
                                  fontFamily="Arial, sans-serif"
                                  fontSize="16"
                                  fontWeight="bold"
                                  fill="#fff"
                                  textAnchor="middle"
                                >
                                  Zelle
                                </text>
                              </svg>
                            </div>
                            <h3 className="font-weight-bold mb-2">
                              Pay with Zelle
                            </h3>
                            <p className="text-muted">
                              Fast, free bank-to-bank transfers. No fees for
                              either party.
                            </p>
                          </div>

                          <div className="zelle-info-box p-4 mb-4 bg-light rounded">
                            <div className="text-center">
                              <h5 className="font-weight-bold mb-3">
                                Our Zelle Information
                              </h5>
                              <div className="zelle-email p-3 bg-white rounded mb-2">
                                <strong>Email:</strong>{" "}
                                <code>{zelleEmail}</code>
                              </div>
                              <div className="zelle-name p-3 bg-white rounded">
                                <strong>Name:</strong> Bradley Brown Inc
                              </div>
                            </div>
                          </div>

                          <div className="features-list mb-4">
                            <div className="feature-item">
                              ✓ Zero fees - 100% free
                            </div>
                            <div className="feature-item">
                              ✓ Money typically arrives in minutes
                            </div>
                            <div className="feature-item">
                              ✓ Send directly from your bank app
                            </div>
                            <div className="feature-item">
                              ✓ Available at most major banks
                            </div>
                          </div>

                          <div className="instructions-box p-4 border rounded">
                            <h5 className="font-weight-bold mb-3">
                              How to Pay with Zelle
                            </h5>
                            <ol className="pl-3 mb-0">
                              <li className="mb-2">
                                Open your bank's mobile app or online banking
                              </li>
                              <li className="mb-2">
                                Select "Send Money with Zelle"
                              </li>
                              <li className="mb-2">
                                Enter our email: <code>{zelleEmail}</code>
                              </li>
                              <li className="mb-2">Enter the payment amount</li>
                              <li className="mb-2">
                                Add your project details or invoice # in the
                                memo
                              </li>
                              <li>Confirm and send</li>
                            </ol>
                          </div>
                        </div>
                      </TabPane>

                      {/* Venmo Tab */}
                      <TabPane tabId="venmo">
                        <div className="payment-method-content">
                          <div className="text-center mb-4">
                            <div className="payment-logo mb-3">
                              <svg
                                width="120"
                                height="120"
                                viewBox="0 0 120 120"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="120"
                                  height="120"
                                  rx="20"
                                  fill="#3D95CE"
                                />
                                <path
                                  d="M73.2 32.4C74.4 34.8 75 37.5 75 40.8C75 51.3 66.3 64.2 59.1 75H45.6L38.4 35.1L50.7 33.9L55.2 63.6C58.5 58.2 62.7 49.8 62.7 43.5C62.7 40.5 62.1 38.1 61.2 36.3L73.2 32.4Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                            <h3 className="font-weight-bold mb-2">
                              Pay with Venmo
                            </h3>
                            <p className="text-muted">
                              Quick mobile payments. Perfect for deposits and
                              smaller amounts.
                            </p>
                            <p className="text-muted mb-0">
                              <strong>{venmoHandle}</strong>
                            </p>
                          </div>

                          <div className="venmo-form mb-4">
                            <div className="form-group mb-3">
                              <label className="font-weight-bold">
                                Payment Amount (Optional)
                              </label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">$</span>
                                </div>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="0.00"
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                  min="0"
                                  step="0.01"
                                />
                              </div>
                              <small className="form-text text-muted">
                                You can also enter the amount in Venmo
                              </small>
                            </div>

                            <div className="form-group mb-3">
                              <label className="font-weight-bold">
                                Payment Note (Optional)
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Project name or invoice number"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                maxLength="100"
                              />
                              <small className="form-text text-muted">
                                Help us identify your payment
                              </small>
                            </div>
                          </div>

                          <Button
                            color="primary"
                            size="lg"
                            block
                            onClick={handleVenmoPayment}
                            className="mb-2"
                            style={{
                              backgroundColor: "#3D95CE",
                              borderColor: "#3D95CE",
                            }}
                          >
                            Pay with Venmo App
                          </Button>

                          <Button
                            color="outline-primary"
                            size="lg"
                            block
                            onClick={() =>
                              window.open(
                                `https://venmo.com/${venmoUsername}`,
                                "_blank"
                              )
                            }
                            style={{ borderColor: "#3D95CE", color: "#3D95CE" }}
                          >
                            Open Venmo Profile
                          </Button>
                        </div>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>

                <div className="payment-help-section mt-5 text-center">
                  <Card className="shadow-sm">
                    <CardBody className="p-4">
                      <h4 className="font-weight-bold mb-3">Need Help?</h4>
                      <p className="text-muted mb-3">
                        Questions about payments or need assistance? We're here
                        to help!
                      </p>
                      <div className="contact-buttons">
                        <a
                          href="tel:601-954-1306"
                          className="btn btn-outline-primary mr-2 mb-2"
                        >
                          📞 Call 601-954-1306
                        </a>
                        <a
                          href="mailto:bradleybrowninc@gmail.com"
                          className="btn btn-outline-primary mb-2"
                        >
                          ✉️ Email Us
                        </a>
                      </div>
                      <div className="alert alert-info mt-4 mb-0" role="alert">
                        <strong>Payment Processing:</strong> Payments are
                        typically processed within 1-2 business days. You'll
                        receive a confirmation email once we receive your
                        payment.
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <div className="other-payment-methods mt-4 text-center">
                  <p className="text-muted">
                    We also accept checks, cash, and wire transfers.{" "}
                    <a href="/contact">Contact us</a> for details.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  )
}

export default PaymentPage

import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap"
import { Helmet } from "react-helmet"
import PageHeader from "../components/pageHeader"

const PaymentPage = () => {
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

  const venmoUsername = "bradleybrowninc" // Update this with your actual Venmo username
  const venmoHandle = "@bradleybrowninc" // Update this with your actual Venmo handle

  const handleVenmoPayment = () => {
    // Create Venmo deep link
    let venmoUrl = `venmo://paycharge?txn=pay&recipients=${venmoUsername}`

    if (amount && parseFloat(amount) > 0) {
      venmoUrl += `&amount=${parseFloat(amount).toFixed(2)}`
    }

    if (note) {
      venmoUrl += `&note=${encodeURIComponent(note)}`
    }

    // Try to open Venmo app, fallback to web if app not installed
    window.location.href = venmoUrl

    // Fallback to web version after a short delay if app doesn't open
    setTimeout(() => {
      const webUrl = `https://venmo.com/${venmoUsername}`
      window.open(webUrl, "_blank")
    }, 1000)
  }

  const handleOpenVenmo = () => {
    // Direct link to Venmo profile
    window.open(`https://venmo.com/${venmoUsername}`, "_blank")
  }

  return (
    <>
      <Helmet>
        <title>Make a Payment - Bradley Brown Inc</title>
        <meta
          name="description"
          content="Make a payment to Bradley Brown Inc securely using Venmo. Fast, easy, and convenient payment options for your construction project."
        />
      </Helmet>

      <section id="payment">
        <PageHeader title="Make a Payment" />

        <Container>
          <div className="payment-page section-lg">
            <Row className="justify-content-center">
              <Col lg="8" md="10">
                <Card className="shadow-sm">
                  <CardBody className="p-4 p-md-5">
                    <div className="text-center mb-4">
                      <h2 className="font-weight-bold mb-3">Pay with Venmo</h2>
                      <p className="text-muted">
                        Make secure payments for your project quickly and easily
                        using Venmo.
                      </p>
                    </div>

                    <div className="venmo-info bg-light p-4 rounded mb-4">
                      <div className="text-center">
                        <svg
                          width="120"
                          height="120"
                          viewBox="0 0 120 120"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mb-3"
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
                        <h4 className="font-weight-bold mb-2">
                          Bradley Brown Inc
                        </h4>
                        <p className="text-muted mb-0">{venmoHandle}</p>
                      </div>
                    </div>

                    <FormGroup>
                      <Label for="amount" className="font-weight-bold">
                        Payment Amount (Optional)
                      </Label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">$</span>
                        </div>
                        <Input
                          type="number"
                          id="amount"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <small className="form-text text-muted">
                        Enter the amount you wish to pay (you can also enter it
                        in Venmo)
                      </small>
                    </FormGroup>

                    <FormGroup>
                      <Label for="note" className="font-weight-bold">
                        Payment Note (Optional)
                      </Label>
                      <Input
                        type="text"
                        id="note"
                        placeholder="Project name or invoice number"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        maxLength="100"
                      />
                      <small className="form-text text-muted">
                        Add a note to help us identify your payment (invoice #,
                        project address, etc.)
                      </small>
                    </FormGroup>

                    <div className="d-grid gap-2 mt-4">
                      <Button
                        color="primary"
                        size="lg"
                        onClick={handleVenmoPayment}
                        className="mb-2"
                      >
                        Pay with Venmo App
                      </Button>
                      <Button
                        color="outline-primary"
                        size="lg"
                        onClick={handleOpenVenmo}
                      >
                        Open Venmo Profile
                      </Button>
                    </div>

                    <div className="payment-info mt-5 pt-4 border-top">
                      <h5 className="font-weight-bold mb-3">
                        Payment Instructions
                      </h5>
                      <ol className="pl-3">
                        <li className="mb-2">
                          <strong>On Mobile:</strong> Click "Pay with Venmo App"
                          to open the Venmo app directly with pre-filled payment
                          information.
                        </li>
                        <li className="mb-2">
                          <strong>On Desktop:</strong> Click "Open Venmo
                          Profile" to visit our Venmo profile and complete
                          payment through the website or scan our QR code.
                        </li>
                        <li className="mb-2">
                          <strong>Manual Payment:</strong> Open your Venmo app
                          and search for{" "}
                          <code className="bg-light px-2 py-1 rounded">
                            {venmoHandle}
                          </code>
                        </li>
                        <li>
                          <strong>Add a Note:</strong> Please include your
                          project details or invoice number in the payment note.
                        </li>
                      </ol>
                    </div>

                    <div className="alert alert-info mt-4" role="alert">
                      <strong>Note:</strong> After making your payment, please
                      allow 1-2 business days for processing. You'll receive a
                      confirmation email once your payment has been received.
                    </div>

                    <div className="text-center mt-4">
                      <p className="text-muted mb-2">
                        Need help or have questions?
                      </p>
                      <a href="tel:601-954-1306" className="btn btn-link">
                        Call us at 601-954-1306
                      </a>
                      <span className="mx-2">or</span>
                      <a
                        href="mailto:bradleybrowninc@gmail.com"
                        className="btn btn-link"
                      >
                        Email us
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col lg="12">
                <div className="text-center">
                  <h4 className="font-weight-bold mb-3">
                    Other Payment Methods
                  </h4>
                  <p className="text-muted">
                    We also accept checks, cash, and wire transfers. Please{" "}
                    <a href="/contact">contact us</a> for more payment options.
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

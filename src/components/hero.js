import React from "react"
import { Container } from "reactstrap"
import { Button } from "reactstrap"
import { Link } from "gatsby"
import "./hero.scss"
import companyVideo from "../images/company.mp4"

const Hero = ({ title, description }) => {
  return (
    <div className="hero" id="hero">
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={companyVideo} type="video/mp4" />
      </video>
      <section className="h-100 d-flex align-items-center text-center bg-dark-40">
        <Container>
          <main className="hero-content">
            <h1 className="title">{title}</h1>
            <hr className="h-separator" />
            <p className="hero-description">{description}</p>
            <section className="hero-buttons">
              <Button href="#services">Our Services</Button>
              <Button href="#quote" outline>Request a Quote</Button>
            </section>
          </main>
        </Container>
      </section>
    </div>
  )
}

export default Hero

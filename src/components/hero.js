import React from "react"
import { Container } from "reactstrap"
import { Button } from "reactstrap"
import "./hero.scss"
import { heroConfig, labels, company } from "../config/siteConfig"

const Hero = ({
  title,
  description,
  backgroundType = heroConfig.backgroundType,
  backgroundSrc = heroConfig.backgroundSrc,
}) => {
  // Use provided props or default to config values
  const source = backgroundSrc

  return (
    <div className="hero" id="hero">
      {backgroundType === "video" ? (
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={source} type="video/mp4" />
        </video>
      ) : (
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${source})` }}
        />
      )}
      <section className="h-100 d-flex align-items-center text-center bg-dark-40">
        <Container>
          <main className="hero-content">
            <section className="hero-buttons">
              <Button href="#services">{labels.heroButton1}</Button>
              <Button href="#quote" outline>
                {labels.heroButton2}
              </Button>
              <Button href={`tel:${company.phone}`} color="success">
                {labels.heroButton3}
              </Button>
            </section>
            <h1 className="title">{title}</h1>
            <hr className="h-separator" />
            <p className="hero-description">{description}</p>
          </main>
        </Container>
      </section>
    </div>
  )
}

export default Hero

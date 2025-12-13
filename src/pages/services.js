import React from "react"
import { Container, Row, Col } from "reactstrap"

import PageHeader from "../components/pageHeader"
import Service from "../components/service"

import Bulldozer from "../images/icons/icon-bulldozer-74x74.png"
import Tassels from "../images/icons/icon-tassels-70x70.png"
import Ruler from "../images/icons/icon-ruler-45x71.png"
import Suitcase from "../images/icons/icon-suitcase-73x57.png"
import Relues from "../images/icons/icon-relues-63x64.png"
import Helmet from "../images/icons/icon-helmet-67x65.png"

const ServicesPage = () => {
  const card = [
    {
      title: `Kitchen Remodels`,
      icon: Tassels,
      description: `Transform your kitchen into the heart of your home with custom designs and quality craftsmanship.`,
    },
    {
      title: `Bathroom Remodels`,
      icon: Ruler,
      description: `Upgrade your bathroom with modern fixtures, beautiful tile work, and functional layouts.`,
    },
    {
      title: `Whole House Remodeling`,
      icon: Bulldozer,
      description: `Complete home transformations that bring your vision to life, from concept to completion.`,
    },
    {
      title: `Additions`,
      icon: Helmet,
      description: `Expand your living space with custom additions that seamlessly blend with your existing home.`,
    },
    {
      title: `Minor Repairs`,
      icon: Suitcase,
      description: `Professional repair services for all your home maintenance needs, big or small. No job is too small!`,
    },
  ]
  return (
    <section id="services">
      <PageHeader title="Services" />
      <section className="services">
        <Container>
          <Row>
            {card.map(service => {
              return (
                <Col md="6" lg="4">
                  <Service services={service} />
                </Col>
              )
            })}
          </Row>
        </Container>
      </section>
    </section>
  )
}

export default ServicesPage

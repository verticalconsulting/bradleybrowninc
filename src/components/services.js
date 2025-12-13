import React from "react"
import { Container, Row, Col } from "reactstrap"
import "./services.scss"

import Service from "./service"

import Bulldozer from "../images/icons/icon-bulldozer-74x74.png"
import Tassels from "../images/icons/icon-tassels-70x70.png"
import Ruler from "../images/icons/icon-ruler-45x71.png"

const Services = () => {
  const card = [
    {
      title: `Whole House Remodeling`,
      icon: Bulldozer,
      description: `Complete home transformations that bring your vision to life. We specialize in comprehensive remodeling projects that enhance both beauty and functionality.`,
    },
    {
      title: `Kitchen Remodels`,
      icon: Tassels,
      description: `Transform your kitchen into the heart of your home with custom designs and quality craftsmanship. From modern updates to complete renovations.`,
    },
    {
      title: `Bathroom Remodels`,
      icon: Ruler,
      description: `Upgrade your bathroom with modern fixtures, beautiful tile work, and functional layouts. Creating spaces you'll love for years to come.`,
    },
  ]
  return (
    <div className="services" id="services">
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
    </div>
  )
}

export default Services

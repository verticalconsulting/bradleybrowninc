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
      title: `Custom Home Builds`,
      icon: Bulldozer,
      description: `From concept to completion, we create exceptional custom homes tailored to your unique vision. Our meticulous attention to detail ensures every element reflects superior craftsmanship.`,
    },
    {
      title: `Kitchen Remodeling`,
      icon: Tassels,
      description: `Transform your kitchen into a masterpiece of form and function. We specialize in high-end kitchen renovations that blend luxury, innovation, and timeless design.`,
    },
    {
      title: `Bath Remodeling`,
      icon: Ruler,
      description: `Create your personal spa retreat with our premium bathroom remodeling services. We deliver elegant, sophisticated spaces with the finest materials and expert craftsmanship.`,
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

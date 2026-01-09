import React, { Component } from "react"
import { Link } from "gatsby"
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap"

class Header extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  render() {
    const { siteTitle, logo } = this.props
    return (
      <div className="header">
        <Navbar color="dark" dark expand="md" className="navbar fixed-top">
          <Container>
            <Link to="/#hero" className="navbar-brand">
              <img
                src={logo}
                alt={`${siteTitle} Logo`}
                height="60px"
                className="mr-2"
              />
              {siteTitle}
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link
                    className="nav-link"
                    activeStyle={{ fontWeight: "bold" }}
                    to="/#hero"
                  >
                    Home
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className="nav-link"
                    activeStyle={{ fontWeight: "bold" }}
                    to="/services/#services"
                  >
                    Services
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className="nav-link"
                    activeStyle={{ fontWeight: "bold" }}
                    to="/projects/#projects"
                  >
                    Projects
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className="nav-link"
                    activeStyle={{ fontWeight: "bold" }}
                    to="/about/#about"
                  >
                    About Us
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className="nav-link"
                    activeStyle={{ fontWeight: "bold" }}
                    to="/contact/#contact"
                  >
                    Contact
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className="nav-link"
                    activeStyle={{ fontWeight: "bold" }}
                    to="/privacy-policy/#privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </NavItem>
                <NavItem>
                  <Link
                    className="nav-link btn btn-success text-white px-3 ml-md-2"
                    activeStyle={{ fontWeight: "bold" }}
                    to="/payment/#payment"
                  >
                    Make Payment
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default Header

import React from 'react';

import { Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './index.css'

const Header: React.FC = () => {
  return (
    <Navbar className="color-nav" expand="lg">
      <Container>
        <Navbar.Brand href="/">Virtex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item as={Link} className="nav-link" to="/">Inicio</Nav.Item>
            <Nav.Item as={Link} className="nav-link" to="/huawei">Huawei</Nav.Item>
            <Nav.Item as={Link} className="nav-link" to="/zte">Zte</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
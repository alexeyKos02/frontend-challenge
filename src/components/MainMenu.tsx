import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { Link } from "react-router-dom";

interface MainMenuProps {
  className?: string;
}

const MainMenu: React.FC<MainMenuProps> = (props) => {
  return (
    <div>
      <Navbar
        expand="lg"
        bg="primary"
        data-bs-theme="dark"
        className={`${props.className || ""}`}
      >
        <Container>
          <Navbar.Brand>Котики</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Nav.Link as={Link} to="/">
                  Все милахи
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/favorites">
                  Любимые милахи
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainMenu;

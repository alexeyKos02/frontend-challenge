import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

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
        className={`${props.className || ''}`}
      >
        <Container>
          <Navbar.Brand href="#home">Котики</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/frontend-challenge/">Все милахи</Nav.Link>
              <Nav.Link href="/frontend-challenge/favorites">Любимые милахи</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MainMenu;

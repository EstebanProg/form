import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';


function Header() {
  const [scrolling, setScrolling] = useState(false);

  // Detectar el scroll para cambiar el estado
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Cambia 50 a lo que necesites como punto de activación
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <StyledNavbar
        expand="md"
        fixed="top"
        scrolling={scrolling}
        className="shadow-sm"
      >
        <Container fluid>
          <Navbar.Brand >Mi empresa</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/">Inicio</Nav.Link>
              </Nav>
              <Nav className="justify-content-end">
                <Nav.Link href="/">Iniciar sesion</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </StyledNavbar>
    </>
  );
}

const StyledNavbar = styled(Navbar)`
  background-color: ${(props) =>
    props.scrolling ? 'rgba(255, 255, 255, 0)' : '#007bff'}; 
  transition: background-color 0.3s ease;
  transition: transform 0.3s ease;  /* Añadido para el efecto de desaparecer */

  /* Desaparece el navbar al hacer scroll */
  transform: ${(props) => (props.scrolling ? 'translateY(-100%)' : 'translateY(0)')};

  .navbar-toggler {
    border-color: #000;
  }

  .navbar-toggler-icon {
    background-color: #000;
  }

  .navbar-brand {
    color: #000;
  }

  .navbar-nav .nav-link {
    color: #000;
  }

  .navbar-nav .nav-link:hover {
    color: #007bff;
  }
`;

export default Header;
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import styled from "styled-components";

function DarkFooter() {
  return (
    <StyledFooter>
      <Container fluid>
        <Row>
          <Col md={4} className="footer-section">
            <h4>Sobre Nosotros</h4>
            <p>
              Somos una empresa dedicada a brindar las mejores soluciones para
              nuestros clientes. ¡Tu éxito es nuestra misión!
            </p>
          </Col>
          <Col md={4} className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li>
                <a href="#home">Inicio</a>
              </li>
              <li>
                <a href="#services">Servicios</a>
              </li>
              <li>
                <a href="#about">Acerca de</a>
              </li>
              <li>
                <a href="#contact">Contacto</a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="footer-section">
            <h4>Redes Sociales</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <p>&copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 40px 0; /* Puedes ajustar el padding para que no quede tan pegado a los bordes */
  width: 100%; /* Aseguramos que ocupe todo el ancho disponible */
  margin-top: auto;

  .footer-section {
    margin-bottom: 20px;
    padding: 0 15px; /* Agregamos un poco de espacio a los lados de las secciones */

    h4 {
      color: #fff;
      margin-bottom: 15px;
    }

    p {
      font-size: 14px;
      color: #bbb;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 10px;

        a {
          color: #bbb;
          text-decoration: none;

          &:hover {
            color: #fff;
          }
        }
      }
    }

    .social-icons a {
      font-size: 20px;
      color: #bbb;
      margin-right: 15px;
      transition: color 0.3s;

      &:hover {
        color: #fff;
      }
    }
  }

  .text-center {
    margin-top: 20px;

    p {
      font-size: 14px;
      color: #bbb;
    }
  }
`;

export default DarkFooter;
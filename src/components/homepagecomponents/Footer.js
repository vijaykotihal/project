import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6} className="text-center text-sm-end">
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;

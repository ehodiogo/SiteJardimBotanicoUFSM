import { Container, Row, Col, Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center text-center">
      <Row>
        <Col>
          <h1 className="display-1 text-danger fw-bold">404</h1>
          <p className="fs-3">Ops! Página não encontrada.</p>
          <p className="lead">
            A página que você está procurando não existe ou foi removida.
          </p>
          <Button variant="danger" href="/">
            Voltar para o início
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;

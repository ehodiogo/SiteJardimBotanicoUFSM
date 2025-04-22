import React from "react";
import "../App.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import PageLayout from "../components/PageLayout";

const Home: React.FC = () => {
  return (
    <PageLayout>
      <Container className="homeContainer">
        {/* Seção do Mascote e Balão */}
        <Row className="align-items-center mb-5">
          <Col md={4} className="mascotBox">
            <div className="mascotPlaceholder">Mascote Aqui</div>
          </Col>
          <Col md={8}>
            <div className="speechBubble">
              <p>
                Olá! Eu sou o guardião do nosso Jardim 🌿 <br />
                Gostaria de saber mais sobre algo que viu no jardim? Use sua
                câmera e escaneie o QR Code presente na planta ou animal! <br />
              </p>
              <Button variant="success">Ativar Câmera</Button>
            </div>
          </Col>
        </Row>

        {/* Seção de História */}
        <Row className="mb-5">
          <Col>
            <Card className="card">
              <Card.Body>
                <Card.Title>🌳 Nossa História</Card.Title>
                <Card.Text>
                  Fundado em 1985, o Jardim Botânico é um espaço dedicado à
                  preservação da flora nativa e exótica. Aqui, a natureza
                  encontra conhecimento e encantamento!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Horário de Funcionamento */}
        <Row className="mb-5">
          <Col md={6}>
            <Card className="card">
              <Card.Body>
                <Card.Title>⏰ Horário de Funcionamento</Card.Title>
                <Card.Text>
                  Segunda a Sexta: 08h às 18h <br />
                  Sábados e Domingos: 09h às 17h
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Redes Sociais */}
          <Col md={6}>
            <Card className="card">
              <Card.Body>
                <Card.Title>📱 Redes Sociais</Card.Title>
                <Card.Text>
                  Instagram: @jardimbotanico <br />
                  Facebook: fb.com/jardimbotanico <br />
                  Twitter: @jardimbot
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
};

export default Home;

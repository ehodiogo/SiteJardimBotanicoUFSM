import { FaClock } from "react-icons/fa";
import "../App.css";

const HorariosFuncionamento = () => {
  return (
    <section className="py-5 px-3">
      <div
        className="card shadow-sm rounded p-4"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <h4 className="mb-4 d-flex align-items-center text-brown">
          <FaClock className="me-2 text-green" />
          Horários de Funcionamento
        </h4>

        <div className="mb-3">
          <div className="d-flex justify-content-between border-bottom pb-2">
            <div>
              <strong className="text-brown">Segunda a Sexta</strong>
              <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                Entrada até às 16h
              </div>
            </div>
            <span className="fw-semibold text-green">8h às 17h</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between border-bottom pb-2">
            <div>
              <strong className="text-brown">Sábados e Domingos</strong>
              <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                Entrada até às 17h
              </div>
            </div>
            <span className="fw-semibold text-green">9h às 18h</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between border-bottom pb-2">
            <div>
              <strong className="text-brown">Feriados</strong>
              <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                Entrada até às 15h
              </div>
            </div>
            <span className="fw-semibold text-green">10h às 16h</span>
          </div>
        </div>

        <div className="mt-3" style={{ fontSize: "0.85rem", color: "#888" }}>
          <strong>Nota:</strong> O jardim pode fechar mais cedo em condições
          climáticas adversas. Consulte nosso site ou redes sociais para
          informações atualizadas.
        </div>
      </div>
    </section>
  );
};

export default HorariosFuncionamento;

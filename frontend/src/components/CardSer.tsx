import { useNavigate } from "react-router-dom";
import lerTextoEmVozAlto from "../functions/Acessibilidade";

interface ItemProps {
  id: string;
  foto: string;
  nome: string;
  descricao: string;
  descricaoAcessivel: string;
  dadosCientificos: {
    nomeCientifico: string;
  };
  type: string;
  grupo?: string;
}

function CardAmostragem({ item }: { item: ItemProps }) {
  const navigate = useNavigate();

  return (
    <div
      className="card shadow-lg border-0"
      style={{ width: "20rem", backgroundColor: "#f4f9f4", position: "relative" }}
    >
      <img
        src={item.foto}
        alt={item.nome}
        className="card-img-top"
        style={{
          display: "block",
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          pointerEvents: "none", // ESSENCIAL
          userSelect: "none", // previne seleção
        }}
      />

      <div className="card-body text-center">
        <h5 className="card-title text-success fw-bold">{item.nome}</h5>

        <p className="card-text text-muted" style={{ fontStyle: "italic" }}>
          {item.descricao}
        </p>

        <p className="card-text">
          <strong className="text-primary">Nome Científico:</strong>{" "}
          <span className="text-secondary">{item.dadosCientificos.nomeCientifico}</span>
        </p>

        {item.grupo && (
          <p className="card-text fw-light">
            Grupo:{" "}
            <span className="fw-bold text-success">
              {item.grupo}
            </span>
          </p>
        )}

        <div className="d-flex flex-column align-items-center gap-2 mt-3">
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => lerTextoEmVozAlto(item.descricaoAcessivel)}
          >
            🌿 Ouvir Descrição
          </button>

          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={() => navigate(`/ListagemUnica/${item.nome}-${item.id}`)}
          >
            Ver mais informações
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardAmostragem;

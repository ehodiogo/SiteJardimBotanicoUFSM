import { useParams } from "react-router-dom";
import seres from "../mock/dadosMock";
import Ser from "../types/Ser";
import lerTextoEmVozAlto from "../functions/Acessibilidade";

function DetalhesSer() {
  const { id } = useParams();
  const serId = id?.split("-").pop();
  const ser: Ser | undefined = seres.seres.find((s) => String(s.id) === serId);

  if (!ser) {
    return <p className="text-center mt-5 text-danger">Ser não encontrado!</p>;
  }

  console.log("Funcionalidades: ", ser.funcionalidade)

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
  <div
    className="card shadow-lg border-0"
    style={{
      width: "100%",
      maxWidth: "480px",
      backgroundColor: "#f4f9f4",
      borderRadius: "16px",
      minHeight: "600px", 
    }}
  >
    <img
      src={ser.foto}
      className="card-img-top"
      alt={ser.nome}
      style={{
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        height: "320px",
        objectFit: "cover",
      }}
    />
        <div className="card-body text-center px-4 py-4">
          <h2 className="card-title text-success fw-bold">{ser.nome}</h2>
          <p className="card-text text-muted" style={{ fontStyle: "italic" }}>
            {ser.descricao}
          </p>
          <p className="card-text mb-1">
            <strong className="text-primary">Nome Científico:</strong>{" "}
            <span className="text-secondary">{ser.dadosCientificos.nomeCientifico}</span>
          </p>
          {ser.grupo && (
            <p className="card-text">
              <strong className="text-primary">Grupo:</strong>{" "}
              <span className="text-success fw-bold">{ser.grupo}</span>
            </p>
          )}
          {ser.funcionalidade && ser.funcionalidade.tags.length > 0 && (
            <div className="mt-3">
              <h5 className="text-success fw-bold">Funções no Ecossistema</h5>
              <ul className="list-unstyled">
                {ser.funcionalidade.tags.map((tag, index) => (
                  <li key={index} className="text-secondary">
                    🌿 {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            className="btn btn-success btn-sm mt-3"
            onClick={() => lerTextoEmVozAlto(ser.descricaoAcessivel)}
          >
            🌿 Ouvir Descrição
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalhesSer;

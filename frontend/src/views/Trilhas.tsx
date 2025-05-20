import { useNavigate } from "react-router-dom";
import { getAllData } from "../services/Api";
import { useState, useEffect } from "react";
import { Trilha } from "../types/Trilha";

const TrilhasJardimBotanico = () => {
  const navigate = useNavigate();
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);

  useEffect(() => {
    getAllData<Trilha[]>("trilhas").then((res) => {
      if (res) setTrilhas(res);
    });
  }, []);

  return (
    <section
      className="d-flex align-items-start"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f1f8e9, #c8e6c9)",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className="container">
        <h1
          className="text-center mb-5"
          style={{ color: "#2e7d32", fontWeight: "700" }}
        >
          Trilhas do Jardim Botânico da UFSM
        </h1>

        <div className="row g-4 justify-content-center">
          {trilhas.map((trilha) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={trilha.id}>
              <div
                className="card h-100 shadow border-0"
                style={{
                  borderRadius: "16px",
                  backgroundColor: "#ffffff",
                  transition: "transform 0.2s",
                }}
              >
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title"
                    style={{ color: "#2e7d32", fontWeight: "600" }}
                  >
                    🌿 {trilha.nome}
                  </h5>

                  <p className="text-muted small mb-2">
                    <i className="bi bi-map"></i> {trilha.nome}
                  </p>

                  <p className="mb-1 small">
                    <strong>Dificuldade:</strong> {trilha.dificuldade}
                  </p>

                  <p className="mb-3 small">
                    <strong>Duração:</strong> {trilha.duracao}
                  </p>

                  <button
                    className="btn mt-auto text-white"
                    style={{
                      backgroundColor: "#81c784",
                      borderRadius: "50px",
                      fontWeight: "500",
                    }}
                    onClick={() => navigate(`/trilha/${trilha.id}`)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrilhasJardimBotanico;

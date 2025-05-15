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
    <div className="container py-5 bg-light min-vh-100">
      <h1 className="text-center text-primary mb-5">
        Trilhas do Jardim Botânico da UFSM
      </h1>

      <div className="row g-4 justify-content-center">
        {trilhas.map((trilha) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={trilha.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-warning">{trilha.nome}</h5>
                <p className="card-text text-muted mb-2">{trilha.nome}</p>
                <p className="mb-1">
                  <strong>Dificuldade:</strong> {trilha.dificuldade}
                </p>
                <p className="mb-3">
                  <strong>Duração:</strong> {trilha.duracao}
                </p>
                <button
                  className="mt-auto btn btn-primary"
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
  );
};

export default TrilhasJardimBotanico;

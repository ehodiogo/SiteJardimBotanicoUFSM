import React, { useState, useEffect } from "react";
import { getAllData } from "../services/Api";
import { Trilha } from "../types/Trilha";
import TrailCard from "../components/TrailCard";
import "../css/TrilhaPage.css";

const TrilhasJardimBotanico: React.FC = () => {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrilhas = async () => {
      try {
        setLoading(true);
        const res = await getAllData<Trilha[]>("trilhas");
        if (res) {
          setTrilhas(res);
        } else {
          setError("Não foi possível carregar as trilhas.");
        }
      } catch (err) {
        console.error("Erro ao buscar trilhas:", err);
        setError("Ocorreu um erro ao carregar as trilhas.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrilhas();
  }, []);

  return (
    <section className="trilhas-page-container">
      <div className="container">
        <h1 className="trilhas-main-title">
          Trilhas do Jardim Botânico da UFSM
        </h1>

        {loading && <p className="loading-message">Carregando trilhas...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && trilhas.length === 0 && (
          <p className="no-trails-message">
            Nenhuma trilha disponível no momento.
          </p>
        )}

        <div className="row g-4 justify-content-center">
          {trilhas.map((trilha) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={trilha.id}>
              <TrailCard trilha={trilha} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrilhasJardimBotanico;

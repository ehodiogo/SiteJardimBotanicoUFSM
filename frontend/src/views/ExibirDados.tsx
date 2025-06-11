import React, { useEffect, useState } from "react";
import { getAllData } from "../services/Api"; // Ajuste o caminho
import Amostra from "../types/Amostra"; // Ajuste o caminho
import BiodiversityCard from "../components/BiodiversityCard"; // Importa o novo componente
import "../css/ExibirDados.css"; // Importa o CSS para a página

const BiodiversityList: React.FC = () => {
  const [dados, setDados] = useState<Amostra[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmostras = async () => {
      try {
        setLoading(true);
        const res = await getAllData<Amostra[]>("amostras");
        if (res) {
          setDados(res);
        } else {
          setError("Não foi possível carregar as amostras da biodiversidade.");
        }
      } catch (err) {
        console.error("Erro ao buscar amostras:", err);
        setError("Ocorreu um erro ao carregar os dados da biodiversidade.");
      } finally {
        setLoading(false);
      }
    };

    fetchAmostras();
  }, []);

  const renderStatusMessage = (
    message: string,
    type: "loading" | "error" | "empty"
  ) => (
    <div className={`status-message ${type}-message`}>
      {type === "loading" && (
        <div className="spinner-border text-success me-2" role="status"></div>
      )}
      {message}
    </div>
  );

  return (
    <section className="biodiversity-page-container">
      <div className="container content-section">
        <h1 className="biodiversity-main-title">
          Biodiversidade do Jardim Botânico
        </h1>

        {loading &&
          renderStatusMessage(
            "Carregando itens da biodiversidade...",
            "loading"
          )}
        {error && renderStatusMessage(error, "error")}

        {!loading &&
          !error &&
          dados.length === 0 &&
          renderStatusMessage(
            "Nenhum item de biodiversidade encontrado no momento.",
            "empty"
          )}

        <div className="row g-4 justify-content-center biodiversity-grid">
          {dados.map((item, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <BiodiversityCard amostra={item} animationDelay={index * 0.08} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BiodiversityList;

import React, { useEffect, useState, useCallback } from "react";
import { getAllData } from "../services/Api"; // Ajuste o caminho
import Amostra from "../types/Amostra"; // Ajuste o caminho
import { falarTexto } from "../functions/Fala"; // Ajuste o caminho
import { useParams } from "react-router-dom";
import { FaMicrophone, FaLeaf, FaFlask } from "react-icons/fa"; // Ícones para informações
import "../css/ExibirDado.css"; // Importa o CSS da página

const BiodiversityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dado, setDado] = useState<Amostra | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const armazenarIdNoLocalStorage = useCallback((amostraId: string) => {
    console.log("amostraId: ", amostraId);
    console.log("id:", id);
    const armazenadas = localStorage.getItem("amostrasAnalisadas");
    const dados = armazenadas ? JSON.parse(armazenadas) : { valores: [] };

    if (!Array.isArray(dados.valores)) {
      dados.valores = [];
    }

    // Convertendo id para string para garantir consistência no array
    const idString = String(amostraId);
    if (!dados.valores.includes(idString)) {
      dados.valores.push(idString);
    }

    dados.ultimaAtualizacao = new Date().toISOString();

    localStorage.setItem("amostrasAnalisadas", JSON.stringify(dados));
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchDado = async () => {
      setLoading(true);
      setError(null);
      try {
        const cached = localStorage.getItem(`amostra_${id}`);
        if (cached) {
          const parsed: Amostra = JSON.parse(cached);
          setDado(parsed);
          armazenarIdNoLocalStorage(String(parsed.id));
          localStorage.removeItem(`amostra_${id}`); // Remove do cache após uso
        } else {
          const res = await getAllData<Amostra>("amostras/" + id);
          if (res) {
            setDado(res);
            armazenarIdNoLocalStorage(String(res.id));
          } else {
            setError("Amostra não encontrada.");
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados da amostra:", err);
        setError("Ocorreu um erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchDado();
  }, [id, armazenarIdNoLocalStorage]);

  const renderStatusMessage = (message: string, type: "loading" | "error") => (
    <div className={`status-message ${type}-message`}>
      {type === "loading" && (
        <div className="spinner-border text-success me-2" role="status"></div>
      )}
      {message}
    </div>
  );

  if (loading) {
    return (
      <section className="biodiversity-detail-page-container">
        <div className="container content-section">
          {renderStatusMessage("Carregando detalhes da amostra...", "loading")}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="biodiversity-detail-page-container">
        <div className="container content-section">
          {renderStatusMessage(error, "error")}
        </div>
      </section>
    );
  }

  if (!dado) {
    return (
      <section className="biodiversity-detail-page-container">
        <div className="container content-section">
          {renderStatusMessage("Nenhum dado de amostra disponível.", "error")}
        </div>
      </section>
    );
  }

  return (
    <section className="biodiversity-detail-page-container">
      <div className="container content-section">
        <h1 className="biodiversity-detail-main-title">
          Detalhes da Biodiversidade
        </h1>

        <div className="detail-card-wrapper">
          <div className="detail-card-image-section">
            <img
              src={dado.imagem_url}
              alt={dado.nome_popular || dado.nome_cientifico}
              className="detail-main-image"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-biodiversidade.jpg";
              }} // Fallback
            />
          </div>
          <div className="detail-card-info-section">
            <h2 className="detail-name">
              {dado.nome_popular || dado.nome_cientifico}
            </h2>
            {dado.nome_popular && (
              <p className="detail-scientific-name">
                <FaLeaf className="info-icon" />
                <span>Nome Científico:</span> <em>{dado.nome_cientifico}</em>
              </p>
            )}
            {dado.tipo && (
              <p className="detail-misc-info">
                <FaFlask className="info-icon" />
                <span>Categoria:</span> {dado.tipo}
              </p>
            )}

            <div className="detail-description-box">
              <h3 className="description-title">Descrição:</h3>
              <p className="description-text">{dado.descricao}</p>
            </div>

            <button
              className="speak-button"
              onClick={() => falarTexto(dado.descricao_acessivel)}
            >
              <FaMicrophone className="speak-icon" /> Ouvir Descrição
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiodiversityDetail;

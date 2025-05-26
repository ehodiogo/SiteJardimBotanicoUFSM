import React, { useEffect, useState, useCallback } from "react";
import { getAllData } from "../services/Api";
import Amostra from "../types/Amostra";
import { falarTexto } from "../functions/Fala";
import { useParams } from "react-router-dom";

const ExibirDado: React.FC = () => {
  const { id } = useParams();
  const [dado, setDado] = useState<Amostra>();

  const armazenarIdNoLocalStorage = useCallback((id: number) => {
    const armazenadas = localStorage.getItem("amostrasAnalisadas");
    const dados = armazenadas ? JSON.parse(armazenadas) : { valores: [] };

    if (!Array.isArray(dados.valores)) {
      dados.valores = [];
    }

    if (!dados.valores.includes(id)) {
      dados.valores.push(id);
    }

    dados.ultimaAtualizacao = new Date().toISOString();

    localStorage.setItem("amostrasAnalisadas", JSON.stringify(dados));
  }, []);
  
  useEffect(() => {
    if (!id) return;

    const cached = localStorage.getItem(`amostra_${id}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      setDado(parsed);
      armazenarIdNoLocalStorage(parsed.id);
      localStorage.removeItem(`amostra_${id}`); // <- Remoção do cache
    } else {
      getAllData<Amostra>("amostras/" + id).then((res) => {
        if (res) {
          setDado(res);
          armazenarIdNoLocalStorage(res.id);
        }
      });
    }
  }, [id, armazenarIdNoLocalStorage]);

  if (!dado) {
    return <div style={{ padding: "40px" }}>Carregando dados...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>{dado.nome_popular}</h1>
      <img
        src={dado.imagem_url}
        alt={dado.nome_popular}
        style={{ width: "300px", borderRadius: "12px", marginBottom: "20px" }}
      />
      <p>
        <strong>Nome científico:</strong> {dado.nome_cientifico}
      </p>
      <p>
        <strong>Descrição:</strong> {dado.descricao}
      </p>
      <p>
        <strong>Descrição acessível:</strong> {dado.descricao_acessivel}
      </p>
      <button
        onClick={() => falarTexto(dado.descricao_acessivel)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#b03a2e",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Ouvir descrição
      </button>
    </div>
  );
};

export default ExibirDado;

import { useNavigate } from "react-router-dom";
import { getAllData } from "../services/Api";
import { useState, useEffect } from "react";
import { Trilha } from "../types/Trilha";

const TrilhasJardimBotanico = () => {
    const navigate = useNavigate();

  const [trilhas, setTrilhas] = useState<Trilha[]>([]);

  useEffect(() => {
    getAllData<Trilha[]>('trilhas').then((res) => {
      if (res) setTrilhas(res);
    });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Trilhas do Jardim Botânico da UFSM</h1>
      <div style={styles.grid}>
        {trilhas.map((trilha) => (
          <div key={trilha.id} style={styles.card}>
            <h2 style={styles.cardTitulo}>{trilha.nome}</h2>
            <p style={styles.cardDescricao}>{trilha.nome}</p>
            <p>
              <strong>Dificuldade:</strong> {trilha.dificuldade}
            </p>
            <p>
              <strong>Duração:</strong> {trilha.duracao}
            </p>
            <button style={styles.botao} onClick={() => navigate(`/trilha/${trilha.id}`)}>Ver Detalhes</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#eef5e9",
    minHeight: "100vh",
    textAlign: "center" as const,
  },
  titulo: {
    fontSize: "2.5rem",
    color: "#2e7d32",
    marginBottom: "40px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "center" as const,
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    width: "300px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
    textAlign: "left" as const,
  },
  cardTitulo: {
    fontSize: "1.5rem",
    color: "#33691e",
    marginBottom: "10px",
  },
  cardDescricao: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "10px",
  },
  botao: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#66bb6a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default TrilhasJardimBotanico;

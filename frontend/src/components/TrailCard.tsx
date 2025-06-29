import React from "react";
import { useNavigate } from "react-router-dom";
import { Trilha } from "../types/Trilha";
import { FaLeaf, FaHourglassHalf, FaMountain } from "react-icons/fa";
import "../css/TrailCard.css";

interface TrailCardProps {
  trilha: Trilha;
}

const TrailCard: React.FC<TrailCardProps> = ({ trilha }) => {
  const navigate = useNavigate();

  const getDificuldadeTexto = (nivel: number) => {
    switch (nivel) {
      case 1:
        return "Fácil";
      case 2:
        return "Média";
      case 3:
        return "Difícil";
      default:
        return "Desconhecida";
    }
  };

  const getDificuldadeCor = (nivel: number) => {
    switch (nivel) {
      case 1:
        return "#66bb6a";
      case 2:
        return "#ffa726";
      case 3:
        return "#ef5350";
      default:
        return "#9e9e9e";
    }
  };

  return (
    <div
      className="trail-card"
      onClick={() => navigate(`/trilha/${trilha.id}`)}
    >
      <div className="trail-card-body">
        <h5 className="trail-card-title">
          <FaLeaf className="trail-card-icon" /> {trilha.nome}
        </h5>

        <div className="trail-details">
          <p className="trail-detail-item">
            <FaMountain className="detail-icon" />
            <span className="detail-label">Dificuldade:</span>{" "}
            <span
              style={{
                color: getDificuldadeCor(trilha.dificuldade),
                fontWeight: "bold",
              }}
            >
              {getDificuldadeTexto(trilha.dificuldade)}
            </span>
          </p>
          <p className="trail-detail-item">
            <FaHourglassHalf className="detail-icon" />
            <span className="detail-label">Duração:</span> {trilha.duracao}{" "}
            minutos
          </p>
        </div>

        <button className="trail-details-button">Ver Detalhes</button>
      </div>
    </div>
  );
};

export default TrailCard;

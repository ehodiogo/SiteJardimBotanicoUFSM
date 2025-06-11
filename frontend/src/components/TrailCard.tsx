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
            {trilha.dificuldade}
          </p>
          <p className="trail-detail-item">
            <FaHourglassHalf className="detail-icon" />
            <span className="detail-label">Duração:</span> {trilha.duracao}
          </p>
        </div>

        <button className="trail-details-button">Ver Detalhes</button>
      </div>
    </div>
  );
};

export default TrailCard;

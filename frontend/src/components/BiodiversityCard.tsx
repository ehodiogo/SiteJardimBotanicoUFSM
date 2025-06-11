import React from "react";
import Amostra from "../types/Amostra"; // Ajuste o caminho
import { useNavigate } from "react-router-dom"; // Para o botão "ver mais"
import "../css/BiodiversityCard.css"; // Importa o CSS para o card

interface BiodiversityCardProps {
  amostra: Amostra;
  animationDelay?: number; // Para animações sequenciais
}

const BiodiversityCard: React.FC<BiodiversityCardProps> = ({
  amostra,
  animationDelay = 0,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="biodiversity-card"
      style={{ animationDelay: `${animationDelay}s` }}
      onClick={() => navigate(`/listagem/${amostra.id}`)} // Navegar para a página de detalhes
    >
      <div className="biodiversity-card-image-wrapper">
        <img
          src={amostra.imagem}
          alt={amostra.nome_cientifico}
          className="biodiversity-card-image"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-biodiversidade.jpg";
          }} // Fallback para imagem
        />
      </div>
      <div className="biodiversity-card-content">
        <h3 className="biodiversity-card-title">{amostra.nome_cientifico}</h3>
        {amostra.nome_popular && (
          <p className="biodiversity-card-popular-name">
            ({amostra.nome_popular})
          </p>
        )}
        <button
          className="biodiversity-card-button"
          onClick={(e) => {
            navigate(`/biodiversidade/${amostra.id}`);
          }}
        >
          Ver Mais
        </button>
      </div>
    </div>
  );
};

export default BiodiversityCard;

import React from "react";
import { Link } from "react-router-dom";
import "../css/AcesseMapa.css";

const AcesseMapa: React.FC = () => {
  return (
    <section className="acesse-mapa-section">
      <div className="acesse-mapa-container">
        <div className="acesse-mapa-esquerda">
          <Link to="/unity" className="acesse-mapa-botao">
            Clique aqui
          </Link>
        </div>
        <div className="acesse-mapa-direita">
          <h2>Acesse nosso mapa interativo</h2>
          <p>
            Descubra o Jardim Botânico explorando áreas do mapa interativo.
            Clique nos pontos para saber mais sobre locais, espécies e atrações!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AcesseMapa;

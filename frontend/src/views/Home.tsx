import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  useEffect(() => {
    const armazenado = localStorage.getItem("amostrasAnalisadas");

    if (armazenado) {
      try {
        const dados = JSON.parse(armazenado);
        const ultima = new Date(dados.ultimaAtualizacao);
        const agora = new Date();
        const umDiaMs = 24 * 60 * 60 * 1000;

        if (agora.getTime() - ultima.getTime() > umDiaMs) {
          localStorage.removeItem("amostrasAnalisadas");
        }
      } catch {
        localStorage.removeItem("amostrasAnalisadas");  
      }
    }
  }, []);

  return (
    <div className="container py-5">
      <h1>Home</h1>
      <Link to="/trilhas" className="btn btn-primary">
        Ver trilhas
      </Link>
      <Link to="/listagem" className="btn btn-primary">
        Ver dados
      </Link>
    </div>
  );
};

export default Home;

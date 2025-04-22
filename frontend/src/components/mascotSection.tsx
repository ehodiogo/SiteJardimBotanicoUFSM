import React from "react";
import mascote from "../../public/fotos/Jerivaldo.png";

const MascotSection: React.FC = () => {
  return (
    <div className="container mb-5">
      <div className="row align-items-center">
        {/* Imagem do Mascote */}
        <div className="col-md-2 d-flex justify-content-center mascot-box">
          <img
            src={mascote}
            className="img-fluid rounded mascot-placeholder"
            alt="Mascote do Jardim"
            style={{ maxHeight: "180px" }}
          />
        </div>

        {/* Balão de fala */}
        <div className="col-md-6">
          <div
            className="p-4 rounded shadow-sm bg-light speech-bubble"
            style={{
              borderLeft: "5px solid #198754", // Verde Bootstrap
            }}
          >
            <p className="mb-3">
              Olá! Eu sou o Jerivaldo, guardião do nosso Jardim 🌿 <br />
              <br />
              Gostaria de saber mais sobre algo que viu? Use sua câmera e
              escaneie o QR Code presente na planta ou animal!
            </p>
            <button className="btn btn-success">Ativar Câmera</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MascotSection;

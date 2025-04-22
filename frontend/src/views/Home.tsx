import React from "react";
import "../App.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import MascotSection from "../components/mascotSection";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import HorariosFuncionamento from "../components/Horarios";
import Agendamento from "../components/Agendamento";

const Home: React.FC = () => {
  return (
    <div>
      <div className="homeContainer px-6 py-10">
        <MascotSection />

        <div className="container mb-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">🌳 Nossa História</h5>
              <p className="card-text">
                O Jardim Botânico da UFSM foi criado em 1981 como uma área de
                preservação e ensino, com o objetivo de conservar espécies
                nativas da flora regional e promover a educação ambiental. Ele
                ocupa uma área de aproximadamente 25 hectares no campus de Santa
                Maria, abrigando trilhas ecológicas, coleções científicas e
                programas de pesquisa e extensão.
                <br />
                <br />É um espaço onde ciência, preservação e comunidade
                caminham juntas em harmonia com a natureza.
              </p>
            </div>
          </div>
        </div>
        <HorariosFuncionamento />
        <Agendamento />
      </div>
      <footer
        className="text-white pt-5 pb-3 p-4"
        style={{ backgroundColor: "rgb(63, 46, 42)" }}
      >
        <div className="">
          <div className="row mb-4">
            <div className="col-lg-4 mb-4">
              <h5 className="mb-3">Jardim Botânico da UFSM</h5>
              <p style={{ color: "#d6cfc9" }}>
                Um espaço dedicado à preservação, pesquisa e divulgação da
                biodiversidade vegetal, oferecendo aos visitantes uma
                experiência única de contato com a natureza.
              </p>
              <div className="d-flex gap-3 mt-3">
                <a
                  href="https://www.facebook.com/JardimBotanicoDeSantaMaria?_rdr"
                  className="text-light fs-4"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/jardimbotanicodaufsm"
                  className="text-light fs-4"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Coluna 2 - Mapa */}
            <div className="col-lg-5 mb-4">
              <h5 className="mb-3">Localização</h5>
              <iframe
                src="https://www.google.com/maps?q=-29.719,-53.729459&hl=pt-BR&z=15&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>

            {/* Coluna 3 - Contato */}
            <div className="col-lg-3 mb-4 justify-content-center">
              <h5 className="mb-3">Contato</h5>
              <ul className="list-unstyled" style={{ color: "#d6cfc9" }}>
                <li className="mb-3 d-flex">
                  <HiOutlineLocationMarker className="me-2 mt-1" />
                  Av. Roraima, 1000
                  <br />
                  Camobi, Santa Maria - RS
                  <br />
                  CEP: 97105-900
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <HiOutlinePhone className="me-2" />
                  (55) 99193-8183
                </li>
                <li className="d-flex align-items-center">
                  <HiOutlineMail className="me-2" />
                  jardimbotanico@ufsm.br
                </li>
              </ul>
            </div>
          </div>

          <div
            className="text-center border-top pt-3"
            style={{ color: " #c2b6ac", borderColor: "rgb(59, 40, 31)" }}
          >
            Jardim Botânico UFSM. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Agendamento from "../components/Agendamento";
import MascotChat from "../components/mascotChat";
import AcesseMapa from "../components/UnityRef";

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
    <div className="">
      <MascotChat />
      <Agendamento />
      <AcesseMapa />
      <Footer />
    </div>
  );
};

export default Home;

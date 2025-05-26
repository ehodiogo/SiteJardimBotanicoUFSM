import React, { useState } from "react";
import {
  FaUserCheck,
  FaCalendarAlt,
  FaUserGraduate,
  FaClock,
  FaFlask,
  FaDatabase,
  FaMapPin,
  FaMapSigns,
  FaQuestionCircle,
  FaTags,
  FaUniversalAccess,
  FaCogs,
} from "react-icons/fa";

import PresencaTab from "../tabs/Presenca";
import AgendamentoTab from "../tabs/Agendamento";
import BolsistaTab from "../tabs/Bolsista";
import HorariosBolsistaTab from "../tabs/HorariosBolsista";
import AmostraTab from "../tabs/Amostra";
import DadosCientificosTab from "../tabs/DadosCientificos";
import PontoTab from "../tabs/Ponto";
import TrilhaTab from "../tabs/Trilha";
import QuizTab from "../tabs/Quiz";
import TagTab from "../tabs/Tag";
import AcessibilidadeTab from "../tabs/Acessibilidade";
import ConfiguracaoJBTab from "../tabs/ConfiguracaoJB";

const AdminTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("");

  const tabs = [
    { id: "presenca", label: "Presença", icon: <FaUserCheck /> },
    { id: "agendamento", label: "Agendamento", icon: <FaCalendarAlt /> },
    { id: "bolsista", label: "Bolsista", icon: <FaUserGraduate /> },
    { id: "horarios-bolsista", label: "Horários Bolsista", icon: <FaClock /> },
    { id: "amostra", label: "Amostra", icon: <FaFlask /> },
    {
      id: "dados-cientificos",
      label: "Dados Científicos",
      icon: <FaDatabase />,
    },
    { id: "ponto", label: "Ponto", icon: <FaMapPin /> },
    { id: "trilha", label: "Trilha", icon: <FaMapSigns /> },
    { id: "quiz", label: "Quiz", icon: <FaQuestionCircle /> },
    { id: "tag", label: "Tag", icon: <FaTags /> },
    {
      id: "acessibilidade",
      label: "Acessibilidade",
      icon: <FaUniversalAccess />,
    },
    { id: "configuracao-jb", label: "Configuração JB", icon: <FaCogs /> },
  ];

  const renderTabContent = () => {
    if (!activeTab) {
      return (
        <div style={{ textAlign: "center", padding: "2rem", color: "#555" }}>
          <h3>Bem-vindo ao Painel Administrativo do Jardim Botânico da UFSM</h3>
          <p>
            Aqui você pode gerenciar as principais funcionalidades do sistema,
            como controle de presença, agendamentos, bolsistas, dados
            científicos, trilhas e mais.
          </p>
          <p>
            Use a barra lateral para navegar pelas seções disponíveis. Basta
            clicar em um item para começar!
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case "presenca":
        return <PresencaTab />;
      case "agendamento":
        return <AgendamentoTab />;
      case "bolsista":
        return <BolsistaTab />;
      case "horarios-bolsista":
        return <HorariosBolsistaTab />;
      case "amostra":
        return <AmostraTab />;
      case "dados-cientificos":
        return <DadosCientificosTab />;
      case "ponto":
        return <PontoTab />;
      case "trilha":
        return <TrilhaTab />;
      case "quiz":
        return <QuizTab />;
      case "tag":
        return <TagTab />;
      case "acessibilidade":
        return <AcessibilidadeTab />;
      case "configuracao-jb":
        return <ConfiguracaoJBTab />;
      default:
        return <p>Seção não encontrada.</p>;
    }
  };


  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "220px",
          backgroundColor: "#2e7d32",
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "1rem 0",
          position: "sticky",
          top: 0,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "1.25rem",
          }}
        >
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tabs.map(({ id, label, icon }) => (
            <li key={id}>
              <button
                onClick={() => setActiveTab(id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "0.75rem 1rem",
                  backgroundColor: activeTab === id ? "#1b5e20" : "transparent",
                  color: "white",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontWeight: activeTab === id ? "bold" : "normal",
                  gap: "0.75rem",
                  transition: "background-color 0.3s ease",
                }}
              >
                <span>{icon}</span> {label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "2rem",
          backgroundColor: "#f4f4f4",
          overflowY: "auto",
        }}
      >
        <div
          className="card shadow-sm p-4"
          style={{
            backgroundColor: "white",
            borderRadius: "0.75rem",
            minHeight: "300px",
            maxWidth: "100%",
          }}
        >
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminTabs;

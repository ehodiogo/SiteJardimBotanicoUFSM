import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import Navbar from "./components/navbar";

const ExibirDados = lazy(() => import("./views/ExibirDados"));
const ExibirDado = lazy(() => import("./views/ExibirDado"));
const Home = lazy(() => import("./views/Home"));
const Trilhas = lazy(() => import("./views/Trilhas"));
const TrilhaPage = lazy(() => import("./views/Trilha"));
const Quiz = lazy(() => import("./views/Quiz"));
const NotFound = lazy(() => import("./views/404NotFound"));
const Presenca = lazy(() => import("./views/Presenca"));
const Agendamento = lazy(() => import("./views/Agendamento"));
const Agenda = lazy(() => import("./views/Agenda"));
const UnityPage = lazy(() => import("./views/UnityPage"));

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "85px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listagem" element={<ExibirDados />} />
          <Route path="/listagem/:id" element={<ExibirDado />} />
          <Route path="/trilhas" element={<Trilhas />} />
          <Route path="/trilha/:id" element={<TrilhaPage />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/presenca" element={<Presenca />} />
          <Route path="/unity" element={<UnityPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

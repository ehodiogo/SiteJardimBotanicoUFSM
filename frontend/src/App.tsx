import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";

const ExibirDados = lazy(() => import('./views/ExibirDados'));
const ExibirDado = lazy(() => import('./views/ExibirDado'));
const Home = lazy(() => import('./views/Home'));
const Trilhas = lazy(() => import('./views/Trilhas'));
const TrilhaPage = lazy(() => import('./views/Trilha'));
const Agendamento = lazy(() => import('./views/Agendamento'));
const Quiz = lazy(() => import('./views/Quiz'));

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listagem" element={<ExibirDados />} />
        <Route path="/listagem/:id" element={<ExibirDado />} />
        <Route path="/trilhas" element={<Trilhas />} />
        <Route path="/trilha/:id" element={<TrilhaPage />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default App;

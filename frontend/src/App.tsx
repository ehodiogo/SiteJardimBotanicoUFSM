import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";

const ExibirDados = lazy(() => import('./views/Listagem'));
const Home = lazy(() => import('./views/Home'));
const Trilhas = lazy(() => import('./views/Trilhas'));
const TrilhaPage = lazy(() => import('./views/Trilha'));

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exibir" element={<ExibirDados />} />
        <Route path="/trilhas" element={<Trilhas />} />
        <Route path="/trilha/:id" element={<TrilhaPage />} />
      </Routes>
    </Router>
  );
};

export default App;

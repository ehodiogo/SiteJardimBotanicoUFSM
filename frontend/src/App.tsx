import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExibirDados = lazy(() => import('./views/Listagem'));
const Home = lazy(() => import('./views/Home'));

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exibir" element={<ExibirDados />} />
      </Routes>
    </Router>
  );
};

export default App;

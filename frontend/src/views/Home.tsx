import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4">Bem-vindo ao Sistema</h1>
      <p className="lead mb-4">Esta é a página inicial da aplicação com Bootstrap 5.</p>
      <Link to="/exibir" className="btn btn-primary">
        Ver dados do backend
      </Link>
    </div>
  );
};

export default Home;

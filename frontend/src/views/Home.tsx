import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container py-5 text-center">
      {/* Banner / Hero */}
      <div className="bg-primary text-white p-5 rounded shadow mb-5">
        <h1 className="display-4 fw-bold">Jardim Botânico - UFSM</h1>
        <p className="lead">
          Um espaço de preservação ambiental, educação e pesquisa na Universidade Federal de Santa Maria.
        </p>
        <Link to="/listagem" className="btn btn-success btn-lg mt-3">
          Ver dados do backend
        </Link>
      </div>

      {/* Destaques */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-primary">Trilhas Ecológicas</h5>
              <p className="card-text">Descubra caminhos naturais e espécies nativas do bioma local.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-primary">Educação Ambiental</h5>
              <p className="card-text">Atividades educativas para escolas, visitantes e pesquisadores.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title text-primary">Pesquisa Científica</h5>
              <p className="card-text">Apoio a projetos de conservação, biodiversidade e ecologia.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

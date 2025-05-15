import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container py-5">
      
      <h1>Home</h1>

      <Link to="/trilhas" className="btn btn-primary">Ver trilhas</Link>
      <Link to="/listagem" className="btn btn-primary">Ver dados</Link>
    </div>
  );
};

export default Home;

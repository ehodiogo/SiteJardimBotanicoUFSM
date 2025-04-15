import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/SideBar";

// const Home = lazy(() => import("./pages/Home"));
// TODO: manter a importação de pages com lazy para que no build ele divida o código em partes menores
const PageNotFound = lazy(() => import("./views/Erro404"));
const Listagem = lazy(() => import("./views/Listagem"));
const Trilha = lazy(() => import("./views/Trilha"));

function App() {
  return (
    <Router>
      <Sidebar />
      <div
        style={{
          marginLeft: "80px", // largura da sidebar colapsada
          padding: "20px",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <Routes>
          <Route path="" element={<h1>Home</h1>} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/listagem" element={<Listagem />} />
          <Route path="/trilha" element={<Trilha />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

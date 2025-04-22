import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/SideBar";
import Home from "./views/Home";

// const Home = lazy(() => import("./pages/Home"));
// TODO: manter a importação de pages com lazy para que no build ele divida o código em partes menores
const PageNotFound = lazy(() => import("./views/Erro404"));
const Listagem = lazy(() => import("./views/Listagem"));
const Trilha = lazy(() => import("./views/Trilha"));
const DetalhesSer = lazy(() => import("./views/ListagemUnica"));

function App() {
  return (
    <Router>
      <Sidebar />
      <div
        style={{
          marginLeft: "80px", // largura da sidebar colapsada
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <Routes>
          <Route path="" element={<a>Home</a>} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/listagem" element={<Listagem />} />
          <Route path="/trilha" element={<Trilha />} />
          <Route path="/ListagemUnica/:id" element={<DetalhesSer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

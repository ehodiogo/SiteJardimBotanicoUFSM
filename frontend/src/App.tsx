import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// const Home = lazy(() => import("./pages/Home")); 
// TODO: manter a importação de pages com lazy para que no build ele divida o código em partes menores e carregue apenas o necessário, diminuindo tempo de renderização!
const PageNotFound = lazy(() => import("./views/Erro404"));
const Listagem = lazy(() => import("./views/Listagem"));
function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<h1>Home</h1> } />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/listagem" element={<Listagem />} />
      </Routes>
    </Router>
  );
}

export default App;

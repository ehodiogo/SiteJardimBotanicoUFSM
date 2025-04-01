import { useState } from "react";
import CardAmostragem from "../components/CardSer";
import Ser from "../types/Ser";
import seres from "../mock/dadosMock";

function Listagem() {
  const [filtros, setFiltros] = useState<string[]>([]);
  const tipos: string[] = ["Planta", "Animal", "Fungo"];

  const toggleFiltro = (tipo: string) => {
    setFiltros((prevFiltros) =>
      prevFiltros.includes(tipo)
        ? prevFiltros.filter((f) => f !== tipo)
        : [...prevFiltros, tipo]
    );
  };

  const seresFiltrados = filtros.length === 0 
    ? seres.seres 
    : seres.seres.filter((ser: Ser) => filtros.includes(ser.type));

  return (
    <div className="container py-4 text-center">
      <h1 className="fw-bold text-success">Listagem de Dados</h1>

      <div className="d-flex flex-wrap justify-content-center gap-2 my-3">
        {tipos.map((tipo) => (
          <button
            key={tipo}
            onClick={() => toggleFiltro(tipo)}
            className={`btn ${filtros.includes(tipo) ? "btn-danger" : "btn-outline-success"}`}
          >
            {tipo}
          </button>
        ))}
      </div>

      <section>
        <h2 className="h4">Seres</h2>
        <p>
          Filtrando por: <strong>{filtros.length > 0 ? filtros.join(", ") : "Todos"}</strong>
        </p>
        <div className="row justify-content-center row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
          {seresFiltrados.map((ser: Ser) => (
            <div key={ser.nome + ser.id} className="col d-flex justify-content-center">
              <CardAmostragem item={ser} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Listagem;

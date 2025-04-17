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

  const seresFiltrados =
    filtros.length === 0
      ? seres.seres
      : seres.seres.filter((ser: Ser) => filtros.includes(ser.type));

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-center text-success mb-4 display-5">
        🌿 Listagem de Espécies
      </h1>

      <div className="text-center mb-4">
        <p className="text-muted">Selecione um ou mais filtros:</p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {tipos.map((tipo) => (
            <button
              key={tipo}
              onClick={() => toggleFiltro(tipo)}
              className={`btn ${
                filtros.includes(tipo) ? "btn-success" : "btn-outline-success"
              } px-4 py-2 fw-semibold rounded-pill shadow-sm`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      <hr className="my-4" />

      <div className="text-center mb-3">
        <h2 className="h4 text-secondary">Seres Encontrados</h2>
        <p>
          <strong className="text-muted">
            {filtros.length > 0
              ? `Filtrando por: ${filtros.join(", ")}`
              : "Exibindo todos"}
          </strong>
        </p>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {seresFiltrados.map((ser: Ser) => (
          <div key={ser.nome + ser.id} className="col d-flex justify-content-center">
            <CardAmostragem item={ser} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listagem;

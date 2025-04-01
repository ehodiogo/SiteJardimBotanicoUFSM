import { seres } from "../mock/dadosMock";
import CardAmostragem from "../components/CardSer";
import { useState } from "react";

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

  const seresFiltrados = filtros.length === 0 ? seres : seres.filter(ser => filtros.includes(ser.type));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Listagem de Dados</h1>

      <div style={{ marginBottom: "20px" }}>
        {tipos.map((tipo) => (
          <button
            key={tipo}
            onClick={() => toggleFiltro(tipo)}
            style={{ 
              margin: "5px", 
              padding: "10px", 
              backgroundColor: filtros.includes(tipo) ? "#b03a2e" : "#ddd", 
              color: filtros.includes(tipo) ? "white" : "black",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            {tipo}
          </button>
        ))}
      </div>

      <section>
        <h2>Seres</h2>
        <p>Filtrando por: <strong>{filtros.length > 0 ? filtros.join(", ") : "Todos"}</strong></p>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {seresFiltrados.map((ser) => (
            <CardAmostragem key={ser.nome + ser.id} item={ser} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Listagem;

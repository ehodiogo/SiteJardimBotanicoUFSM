import { useState } from "react";
import CardAmostragem from "../components/CardSer";
import Ser from "../types/Ser";
import seres from "../mock/dadosMock";
import PageLayout from "../components/PageLayout";

function Listagem() {
  const [filtros, setFiltros] = useState<string[]>([]);
  const [subFiltros, setSubFiltros] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 

  const tipos: string[] = ["Planta", "Animal", "Fungo"];

  const subTipos: string[] = [
    "Alimentar", "Alucinógeno", "Aquático", "Ameaçado", "Caatinga", 
    "Caçador", "Comunicação", "Construção", "Controle", "Cultura", 
    "Decompositor", "Ecossistema", "Escavador", "Estética", "Fauna", 
    "Floresta", "Frutos", "Herbívoro", "Infestação", "Madeira", "Medicinal", 
    "Nutrientes", "Ornamental", "Paisagismo", "Pesquisa", "Populações", 
    "Predador", "Presas", "Raro", "Regulação", "Reflorestamento", "Social", 
    "Solo", "Venenosa", "Água doce"
  ];

  const toggleFiltro = (tipo: string) => {
    setFiltros((prevFiltros) =>
      prevFiltros.includes(tipo)
        ? prevFiltros.filter((f) => f !== tipo)
        : [...prevFiltros, tipo]
    );
  };

  const toggleSubFiltro = (subTipo: string) => {
    setSubFiltros((prevSubFiltros) =>
      prevSubFiltros.includes(subTipo)
        ? prevSubFiltros.filter((f) => f !== subTipo)
        : [...prevSubFiltros, subTipo]
    );
  };

  const clearAllSubFiltros = () => {
    setSubFiltros([]);
  };

  const seresFiltrados = seres.seres.filter((ser: Ser) => {
    const filtroOk = filtros.length === 0 || filtros.includes(ser.type);
    const subFiltroOk =
      subFiltros.length === 0 ||
      ser.funcionalidade?.tags?.some((tag: string) => subFiltros.includes(tag));

    return filtroOk && subFiltroOk;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubTipos = subTipos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(subTipos.length / itemsPerPage);

  return (
    <PageLayout>
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

        <div className="text-center mb-4">
          <p className="text-muted">Selecione um ou mais sub-filtros:</p>
          <div className="dropdown">
            <button
              className="btn btn-outline-success px-4 py-2 fw-semibold rounded-pill shadow-sm"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sub-filtros
            </button>
            <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
              <li>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Pesquisar sub-filtro..."
                  onChange={(e) => {
                    const searchQuery = e.target.value.toLowerCase();
                    const filteredSubTipos = subTipos.filter((subTipo) =>
                      subTipo.toLowerCase().includes(searchQuery)
                    );
                    setSubFiltros(filteredSubTipos);
                  }}
                />
              </li>
              {currentSubTipos.map((tipo) => (
                <li key={tipo}>
                  <label className="dropdown-item">
                    <input
                      type="checkbox"
                      value={tipo}
                      checked={subFiltros.includes(tipo)}
                      onChange={() => toggleSubFiltro(tipo)}
                    />
                    {tipo}
                  </label>
                </li>
              ))}
              <li>
                <div className="dropdown-item text-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={clearAllSubFiltros}
                  >
                    Limpar todos
                  </button>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  <span className="align-self-center">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                  </button>
                </div>
              </li>
            </ul>
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
            <div
              key={ser.nome + ser.id}
              className="col d-flex justify-content-center"
            >
              <CardAmostragem item={ser} />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Listagem;

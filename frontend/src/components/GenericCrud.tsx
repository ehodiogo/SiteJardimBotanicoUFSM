import React, { useEffect, useState, useCallback } from "react";
import { SchemaField } from "../functions/SchemaField";
import ExpandableText from "./ExpandableText";

type TabType = "listar" | "criar" | "editar" | "remover";

interface GenericCrudProps<T extends { id: number }> {
  entityName: string;
  apiUrl: string;
  schema: readonly SchemaField<T>[];
  displayField?: keyof T | ((item: T) => string); // aceita chave ou função
}

const GenericCrud = <T extends { id: number }>({
  entityName,
  apiUrl,
  schema,
  displayField,
}: GenericCrudProps<T>) => {
  const [activeTab, setActiveTab] = useState<TabType>("listar");
  const [dados, setDados] = useState<T[]>([]);
  const [form, setForm] = useState<Partial<T>>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Estado para linha clicada na listagem
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const fetchDados = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Erro ao buscar dados");
      const json = (await res.json()) as T[];
      setDados(json);
    } catch (e) {
      alert("Erro ao carregar dados: " + e);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    if (
      activeTab === "listar" ||
      activeTab === "editar" ||
      activeTab === "remover"
    ) {
      fetchDados();
      setSelectedRow(null); // Limpa seleção ao trocar aba
    }
  }, [activeTab, fetchDados]);

  useEffect(() => {
    if (selectedId !== null) {
      const item = dados.find((d) => d.id === selectedId);
      if (item) setForm(item);
    } else {
      setForm({});
    }
  }, [selectedId, dados]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!schema.some((f) => f.name === name)) return;

    const fieldType = schema.find((f) => f.name === name)?.type;

    setForm((prev) => ({
      ...prev,
      [name]: fieldType === "number" ? Number(value) : value,
    }));
  };

  // Função para renderizar o texto no select
  const renderDisplayField = (item: T) => {
    if (!displayField) {
      // Se não passou nada, usa o primeiro campo do schema
      return String(item[schema[0].name]);
    }
    if (typeof displayField === "function") {
      return displayField(item);
    }
    // se for string (keyof T)
    return String(item[displayField]);
  };

  // Função para clicar na linha da tabela
  const handleRowClick = (item: T) => {
    // Se clicar na mesma linha desmarca, senão marca novo item
    if (selectedRow?.id === item.id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(item);
    }
  };

  console.log("Items: ", dados);

  return (
    <div className="container py-4">
      <div className="d-flex gap-2 justify-content-center mb-4">
        {(["listar", "criar", "editar", "remover"] as TabType[]).map((tab) => {
          const colors: Record<TabType, string> = {
            listar: "btn-secondary",
            criar: "btn-success",
            editar: "btn-primary",
            remover: "btn-danger",
          };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn ${
                isActive
                  ? colors[tab]
                  : `btn-outline-${colors[tab].replace("btn-", "")}`
              }`}
            >
              {tab.toUpperCase()}
            </button>
          );
        })}
      </div>

      <div className="card p-4">
        {loading ? (
          <div className="text-center">Carregando...</div>
        ) : activeTab === "listar" ? (
          <div>
            <h4 className="mb-3 text-center">Todos os {entityName}s</h4>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    {schema
                      .filter(({ name }) => name !== "id")
                      .map(({ name, label }) => (
                        <th key={name.toString()}>{label}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {dados.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleRowClick(item)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedRow?.id === item.id ? "#e9ecef" : undefined,
                      }}
                    >
                      {schema
                        .filter(({ name }) => name !== "id")
                        .map(({ name }) => (
                          <td key={name.toString()}>
                            <ExpandableText text={String(item[name])} />
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedRow && (
              <div className="card mt-4 p-3 border-primary">
                <h5 className="mb-3">Detalhes </h5>
                {schema.map(({ name, label }) => (
                  <div key={label} className="mb-2">
                    <strong>{label}:</strong> {String(selectedRow[name])}
                  </div>
                ))}
                <button
                  className="btn btn-outline-secondary btn-sm mt-2"
                  onClick={() => setSelectedRow(null)}
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        ) : activeTab === "criar" ? (
          <div>
            <h4 className="mb-3 text-center">Criar Novo {entityName}</h4>
            <div className="row g-2 justify-content-center">
              {schema
                .filter(({ name }) => name !== "id")
                .map(({ name, label, type }) => (
                  <div
                    key={name.toString()}
                    className={`col-md-${type === "number" ? 3 : 4}`}
                  >
                    <input
                      name={name.toString()}
                      placeholder={label}
                      type={type === "number" ? "number" : "text"}
                      className="form-control"
                      value={
                        form[name] !== undefined && form[name] !== null
                          ? String(form[name])
                          : ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                ))}
              <div className="col-md-2 text-center">
                <button
                  className="btn btn-success w-100"
                  onClick={handleCreate}
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === "editar" ? (
          <div>
            <h4 className="mb-3 text-center">Editar {entityName}</h4>
            <div className="mb-3 text-center">
              <select
                className="form-select w-50 mx-auto"
                onChange={(e) => setSelectedId(Number(e.target.value) || null)}
                value={selectedId ?? ""}
              >
                <option value="">Selecione</option>
                {dados.map((d) => (
                  <option key={d.id} value={d.id}>
                    {renderDisplayField(d)}
                  </option>
                ))}
              </select>
            </div>
            {selectedId && (
              <div className="row g-2 justify-content-center">
                {schema
                  .filter(({ name }) => name !== "id")
                  .map(({ name, label, type }) => (
                    <div
                      key={name.toString()}
                      className={`col-md-${type === "number" ? 3 : 4}`}
                    >
                      <input
                        name={name.toString()}
                        placeholder={label}
                        type={type === "number" ? "number" : "text"}
                        className="form-control"
                        value={
                          form[name] !== undefined && form[name] !== null
                            ? String(form[name])
                            : ""
                        }
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                <div className="col-md-2 text-center">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleEdit}
                  >
                    Atualizar
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : activeTab === "remover" ? (
          <div>
            <h4 className="mb-3 text-center">Remover {entityName}</h4>
            <div className="mb-3 text-center">
              <select
                className="form-select w-50 mx-auto"
                onChange={(e) => setSelectedId(Number(e.target.value) || null)}
                value={selectedId ?? ""}
              >
                <option value="">Selecione</option>
                {dados.map((d) => (
                  <option key={d.id} value={d.id}>
                    {renderDisplayField(d)}
                  </option>
                ))}
              </select>
            </div>
            {selectedId && (
              <div className="text-center">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Remover
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );

  // Funções para criar, editar e remover (você já deve ter implementado)
  async function handleCreate() {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro ao criar");
      setForm({});
      fetchDados();
      setActiveTab("listar");
    } catch (error) {
      alert(error);
    }
  }

  async function handleEdit() {
    if (!selectedId) return;
    try {
      const res = await fetch(`${apiUrl}/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro ao atualizar");
      setSelectedId(null);
      setForm({});
      fetchDados();
      setActiveTab("listar");
    } catch (error) {
      alert(error);
    }
  }

  async function handleDelete() {
    if (!selectedId) return;
    if (!window.confirm(`Confirma remover o ${entityName} selecionado?`))
      return;
    try {
      const res = await fetch(`${apiUrl}/${selectedId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao remover");
      setSelectedId(null);
      fetchDados();
      setActiveTab("listar");
    } catch (error) {
      alert(error);
    }
  }
};

export default GenericCrud;

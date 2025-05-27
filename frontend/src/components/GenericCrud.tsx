import React, { useEffect, useState, useCallback } from "react";
import { SchemaField } from "../functions/SchemaField";

type TabType = "listar" | "criar" | "editar" | "remover";

interface GenericCrudProps<T extends { id: number }> {
  entityName: string;
  apiUrl: string;
  schema: readonly SchemaField<T>[]; 
}  

const GenericCrud = <T extends { id: number }>({
  entityName,
  apiUrl,
  schema,
}: GenericCrudProps<T>) => {
  const [activeTab, setActiveTab] = useState<TabType>("listar");
  const [dados, setDados] = useState<T[]>([]);
  const [form, setForm] = useState<Partial<T>>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDados = useCallback(async () => {
    console.log("API URL:", apiUrl);
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

  const handleCreate = async () => {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro ao criar");
      alert(`${entityName} criado com sucesso!`);
      setForm({});
      setActiveTab("listar");
    } catch (e) {
      alert(e);
    }
  };

  const handleEdit = async () => {
    if (selectedId === null) return;
    try {
      const res = await fetch(`${apiUrl}/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erro ao editar");
      alert(`${entityName} atualizado com sucesso!`);
      setForm({});
      setSelectedId(null);
      setActiveTab("listar");
    } catch (e) {
      alert(e);
    }
  };

  const handleDelete = async () => {
    if (selectedId === null) return;
    try {
      const res = await fetch(`${apiUrl}/${selectedId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar");
      alert(`${entityName} removido com sucesso!`);
      setSelectedId(null);
      setActiveTab("listar");
    } catch (e) {
      alert(e);
    }
  };

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
                    {schema.map(({ name, label }) => (
                      <th key={name.toString()}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dados.map((item) => (
                    <tr key={item.id}>
                      {schema.map(({ name }) => (
                        <td key={name.toString()}>{String(item[name])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === "criar" ? (
          <div>
            <h4 className="mb-3 text-center">Criar Novo {entityName}</h4>
            <div className="row g-2 justify-content-center">
              {schema.map(({ name, label, type }) => (
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
                    {String(d[schema[0].name])}
                  </option>
                ))}
              </select>
            </div>
            {selectedId && (
              <div className="row g-2 justify-content-center">
                {schema.map(({ name, label, type }) => (
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
                    Salvar
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : activeTab === "remover" ? (
          <div>
            <h4 className="mb-3 text-center">Remover {entityName}</h4>
            <div className="row g-2 justify-content-center">
              <div className="col-md-6">
                <select
                  className="form-select"
                  onChange={(e) =>
                    setSelectedId(Number(e.target.value) || null)
                  }
                  value={selectedId ?? ""}
                >
                  <option value="">Selecione</option>
                  {dados.map((d) => (
                    <option key={d.id} value={d.id}>
                      {String(d[schema[0].name])}
                    </option>
                  ))}
                </select>
              </div>
              {selectedId && (
                <div className="col-md-2 text-center">
                  <button
                    className="btn btn-danger w-100"
                    onClick={handleDelete}
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GenericCrud;

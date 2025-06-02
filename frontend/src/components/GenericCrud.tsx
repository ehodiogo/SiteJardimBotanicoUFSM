/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from "react";
import SchemaField from "../functions/SchemaField";

const ExpandableText: React.FC<{ text: string }> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 50;

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="btn btn-link btn-sm p-0 ml-1" 
      >
        {isExpanded ? "Menos" : "Mais"}
      </button>
    </span>
  );
};

type TabType = "listar" | "criar" | "editar" | "remover";

interface GenericCrudProps<T extends { id: number }> {
  entityName: string;
  apiUrl: string;
  schema: readonly SchemaField<T>[];
  displayField?: keyof T | ((item: T) => string); 
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
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000); 
  };

  const fetchDados = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Erro ao buscar dados");
      const json = (await res.json()) as T[];
      setDados(json);
    } catch (e: any) {
      showMessage("danger", "Erro ao carregar dados: " + e.message);
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
      setSelectedRow(null); 
      setForm({}); 
      setSelectedId(null); 
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const field = schema.find((f) => f.name === name);

    if (!field) return;

    let parsedValue: any = value;
    if (field.type === "number") {
      parsedValue = Number(value);
    } else if (field.type === "object") {
      try {
        parsedValue = JSON.parse(value);
      } catch (error) {
        console.error("Entrada JSON inválida:", error);
        parsedValue = value; 
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const renderDisplayField = (item: T) => {
    if (!displayField) {
      const firstField = schema[0]?.name;
      return firstField ? String(item[firstField]) : `Item ${item.id}`;
    }
    if (typeof displayField === "function") {
      return displayField(item);
    }
    return String(item[displayField]);
  };

  const handleRowClick = (item: T) => {
    if (selectedRow?.id === item.id) {
      setSelectedRow(null);
    } else {
      setSelectedRow(item);
    }
  };

  const renderFieldValue = (value: any, fieldSchema?: SchemaField<T>) => {
    if (typeof value === 'object' && value !== null) {
      if (fieldSchema && fieldSchema.type === "object" && fieldSchema.displayFields && fieldSchema.displayFields.length > 0) {
        const displayedParts = fieldSchema.displayFields.map(part => {
          const fieldValue = value[part.key as keyof typeof value];
          return `${part.label}: ${typeof fieldValue === 'object' && fieldValue !== null ? JSON.stringify(fieldValue) : String(fieldValue)}`;
        });
        return displayedParts.join(' | '); 
      }
      return JSON.stringify(value, null, 2); 
    }
    return String(value);
  };

  async function handleCreate() {
    try {
      setLoading(true);
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao criar");
      }
      setForm({});
      fetchDados();
      setActiveTab("listar");
      showMessage("success", `${entityName} criado com sucesso!`);
    } catch (error: any) {
      showMessage("danger", "Erro ao criar: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit() {
    if (!selectedId) return;
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao atualizar");
      }
      setSelectedId(null);
      setForm({});
      fetchDados();
      setActiveTab("listar");
      showMessage("success", `${entityName} atualizado com sucesso!`);
    } catch (error: any) {
      showMessage("danger", "Erro ao atualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!selectedId) return;
    console.log(`Confirmando exclusão de ${entityName} com ID: ${selectedId}`);
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/${selectedId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao remover");
      }
      setSelectedId(null);
      fetchDados();
      setActiveTab("listar");
      showMessage("success", `${entityName} removido com sucesso!`);
    } catch (error: any) {
      showMessage("danger", "Erro ao remover: " + error.message);
    } finally {
      setLoading(false);
    }
  }

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

      {message && (
        <div className={`alert alert-${message.type} text-center`} role="alert">
          {message.text}
        </div>
      )}

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
                  {dados.length === 0 ? (
                    <tr>
                      <td colSpan={schema.length - 1} className="text-center">
                        Nenhum {entityName} encontrado.
                      </td>
                    </tr>
                  ) : (
                    dados.map((item) => (
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
                          .map((field) => (
                            <td key={field.name.toString()}>
                              <ExpandableText text={renderFieldValue(item[field.name], field)} />
                            </td>
                          ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {selectedRow && (
              <div className="card mt-4 p-3 border-primary">
                <h5 className="mb-3">Detalhes de {renderDisplayField(selectedRow)}</h5>
                {schema.map((field) => (
                  <div key={field.label} className="mb-2">
                    <strong>{field.label}:</strong> {renderFieldValue(selectedRow[field.name], field)}
                  </div>
                ))}
                <button
                  className="btn btn-outline-secondary btn-sm mt-2"
                  onClick={() => setSelectedRow(null)}
                >
                  Fechar Detalhes
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
                    {type === "object" ? (
                      <textarea
                        name={name.toString()}
                        placeholder={label}
                        className="form-control"
                        rows={4} 
                        value={
                          form[name] !== undefined && form[name] !== null
                            ? typeof form[name] === 'object' ? JSON.stringify(form[name], null, 2) : String(form[name])
                            : ""
                        }
                        onChange={handleChange}
                      />
                    ) : (
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
                    )}
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
                <option value="">Selecione um item para editar</option>
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
                      {type === "object" ? (
                        <textarea
                          name={name.toString()}
                          placeholder={label}
                          className="form-control"
                          rows={4}
                          value={
                            form[name] !== undefined && form[name] !== null
                              ? typeof form[name] === 'object' ? JSON.stringify(form[name], null, 2) : String(form[name])
                              : ""
                          }
                          onChange={handleChange}
                        />
                      ) : (
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
                      )}
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
                <option value="">Selecione um item para remover</option>
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
};

export default GenericCrud;
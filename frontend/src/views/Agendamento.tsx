import React, { useState } from "react";
import {
  atividadesPrimarias,
  atividadesSecundarias,
  tiposInstituicao,
  niveisInstituicao,
} from "../form/AgendamentoForm";
import "../css/AgendamentoPage.css";

const AgendamentoForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    telefone: "",
    nome_escola_instituto: "",
    nome_responsavel: "",
    municipio: "",
    endereco_escola_instituto: "",
    tipo_institituicao: "outro",
    nivel_instituicao: "nao_escolar",
    ano_serie_semestre_turma: "",
    numero_previsto_visitantes: "",
    data_agendamento: "",
    tempo_disponivel: "",
    horario_pretendido: "",
    necessaria_adaptacao: false,
    adaptacao_descricao: "",
    primeira_atividade: "",
    segunda_atividade: "",
    aliar_conteudo_escolar: false,
    conteudo_escolar: "",
    piquenique: false,
  });
  const [, setBtnHover] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    const name = target.name;

    let value: string | boolean = target.value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviar dados:", formData);

    fetch("http://localhost:8000/api/agendamentos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Erro ao enviar dados:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="agendamento-form">
      <h2 className="agendamento-title">Agendamento de Visita</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="agendamento-input"
      />
      <input
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={handleChange}
        required
        className="agendamento-input"
      />
      <input
        name="nome_escola_instituto"
        placeholder="Nome da escola/instituto"
        value={formData.nome_escola_instituto}
        onChange={handleChange}
        required
        className="agendamento-input"
      />
      <input
        name="nome_responsavel"
        placeholder="Nome do responsável"
        value={formData.nome_responsavel}
        onChange={handleChange}
        required
        className="agendamento-input"
      />
      <input
        name="municipio"
        placeholder="Município"
        value={formData.municipio}
        onChange={handleChange}
        required
        className="agendamento-input"
      />
      <input
        name="endereco_escola_instituto"
        placeholder="Endereço da escola (opcional)"
        value={formData.endereco_escola_instituto}
        onChange={handleChange}
        className="agendamento-input"
      />

      <select
        name="tipo_institituicao"
        value={formData.tipo_institituicao}
        onChange={handleChange}
        className="agendamento-select"
      >
        {tiposInstituicao.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      <select
        name="nivel_instituicao"
        value={formData.nivel_instituicao}
        onChange={handleChange}
        className="agendamento-select"
      >
        {niveisInstituicao.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      <input
        name="ano_serie_semestre_turma"
        placeholder="Ano/Série/Semestre/Turma"
        value={formData.ano_serie_semestre_turma}
        onChange={handleChange}
        className="agendamento-input"
      />
      <input
        name="numero_previsto_visitantes"
        placeholder="Nº previsto de visitantes"
        value={formData.numero_previsto_visitantes}
        onChange={handleChange}
        className="agendamento-input"
      />

      <label className="agendamento-label">Data do agendamento</label>
      <input
        name="data_agendamento"
        type="date"
        value={formData.data_agendamento}
        onChange={handleChange}
        required
        className="agendamento-input"
      />

      <label className="agendamento-label">Tempo disponível</label>
      <input
        name="tempo_disponivel"
        type="time"
        value={formData.tempo_disponivel}
        onChange={handleChange}
        required
        className="agendamento-input"
      />

      <label className="agendamento-label">Horário pretendido</label>
      <input
        name="horario_pretendido"
        type="time"
        value={formData.horario_pretendido}
        onChange={handleChange}
        required
        className="agendamento-input"
      />

      <label className="agendamento-checkbox-container">
        <input
          name="necessaria_adaptacao"
          type="checkbox"
          checked={formData.necessaria_adaptacao}
          onChange={handleChange}
        />
        Necessita adaptação de acessibilidade?
      </label>
      <textarea
        name="adaptacao_descricao"
        placeholder="Descreva a adaptação necessária"
        value={formData.adaptacao_descricao}
        onChange={handleChange}
        disabled={!formData.necessaria_adaptacao}
        className="agendamento-textarea"
      />
      <label className="agendamento-label">Escolha a primeira atividade</label>
      <select
        name="primeira_atividade"
        value={formData.primeira_atividade}
        onChange={handleChange}
        required
        className="agendamento-select"
      >
        <option value="">Selecione uma atividade</option>
        {atividadesPrimarias.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      <label className="agendamento-label">Escolha a segunda atividade</label>
      <select
        name="segunda_atividade"
        value={formData.segunda_atividade}
        onChange={handleChange}
        required
        className="agendamento-select"
      >
        <option value="">Selecione uma atividade</option>
        {atividadesSecundarias.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      <label className="agendamento-checkbox-container">
        <input
          name="aliar_conteudo_escolar"
          type="checkbox"
          checked={formData.aliar_conteudo_escolar}
          onChange={handleChange}
        />
        Aliar ao conteúdo escolar?
      </label>
      <textarea
        name="conteudo_escolar"
        placeholder="Informe o conteúdo escolar a ser aliado"
        value={formData.conteudo_escolar}
        onChange={handleChange}
        disabled={!formData.aliar_conteudo_escolar}
        className="agendamento-textarea"
      />

      <label className="agendamento-checkbox-container">
        <input
          name="piquenique"
          type="checkbox"
          checked={formData.piquenique}
          onChange={handleChange}
        />
        Levar piquenique?
      </label>

      <button
        type="submit"
        className="agendamento-button"
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
      >
        Enviar
      </button>
    </form>
  );
};

export default AgendamentoForm;

import React, { useState } from "react";

const tiposInstituicao = [
  { value: "publica_municipal", label: "Pública Municipal" },
  { value: "publica_estadual", label: "Pública Estadual" },
  { value: "publica_federal", label: "Pública Federal" },
  { value: "privada", label: "Privada" },
  { value: "filantropica", label: "Filantrópica" },
  { value: "outro", label: "Outro" },
];

const niveisInstituicao = [
  { value: "infantil", label: "Educação Infantil" },
  {
    value: "fundamental_inicial",
    label: "Educação Fundamental - Séries Iniciais",
  },
  { value: "fundamental_final", label: "Educação Fundamental - Séries Finais" },
  { value: "medio", label: "Ensino Médio" },
  { value: "superior", label: "Ensino Superior" },
  { value: "nao_escolar", label: "Não escolar" },
];

const atividadesPrimarias = [
  {
    value: "caminhada_guiada",
    label: "Caminhada guiada pelo Jardim Botânico (1h30-2h) - todas as idades",
  },
  {
    value: "telhado_verde",
    label: "Telhado verde e agenda 2030 (até 40 min) - a partir de 9 anos",
  },
  {
    value: "jardim_sensorial",
    label: "Jardim Sensorial (até 30 min) - todas as idades",
  },
  {
    value: "exposicao_taxidermia",
    label: "Exposição de animais taxidermizados - todas as idades",
  },
  {
    value: "palestra_peconhentos",
    label:
      "Palestra sobre prevenção de acidentes com animais peçonhentos - a partir de 9 anos",
  },
  {
    value: "chapeuzinho_verde",
    label: "“Chapeuzinho Verde e o Jardim Encantado” (pré ao 2º ano)",
  },
  {
    value: "horta_mandala",
    label:
      "Visita à horta mandala do Jardim Botânico - horta sustentável (terças de manhã)",
  },
  {
    value: "artesanato_botanico",
    label: "Artesanato botânico (terças de manhã e quartas à tarde)",
  },
  {
    value: "culinaria_pancs",
    label: "Culinária com PANCS (terças de manhã e quartas à tarde)",
  },
];

const atividadesSecundarias = [
  {
    value: "caminhada_guiada",
    label: "Caminhada guiada (1h30-2h) - a partir de 9 anos",
  },
  {
    value: "telhado_verde",
    label: "Telhado verde e agenda 2030 (até 40 min) - a partir de 9 anos",
  },
  { value: "jardim_sensorial", label: "Jardim Sensorial (até 30 min)" },
  {
    value: "exposicao_taxidermia",
    label: "Exposição de animais taxidermizados",
  },
  {
    value: "palestra_peconhentos",
    label: "Palestra sobre acidentes com animais peçonhentos",
  },
];

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
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 800,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      <h2>Agendamento de Visita</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={handleChange}
        required
      />
      <input
        name="nome_escola_instituto"
        placeholder="Nome da escola/instituto"
        value={formData.nome_escola_instituto}
        onChange={handleChange}
        required
      />
      <input
        name="nome_responsavel"
        placeholder="Nome do responsável"
        value={formData.nome_responsavel}
        onChange={handleChange}
        required
      />
      <input
        name="municipio"
        placeholder="Município"
        value={formData.municipio}
        onChange={handleChange}
        required
      />
      <input
        name="endereco_escola_instituto"
        placeholder="Endereço da escola (opcional)"
        value={formData.endereco_escola_instituto}
        onChange={handleChange}
      />

      <select
        name="tipo_institituicao"
        value={formData.tipo_institituicao}
        onChange={handleChange}
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
      />
      <input
        name="numero_previsto_visitantes"
        placeholder="Nº previsto de visitantes"
        value={formData.numero_previsto_visitantes}
        onChange={handleChange}
      />

      <label>Data do agendamento</label>
      <input
        name="data_agendamento"
        type="date"
        value={formData.data_agendamento}
        onChange={handleChange}
        required
      />

      <label>Tempo disponível</label>
      <input
        name="tempo_disponivel"
        type="time"
        value={formData.tempo_disponivel}
        onChange={handleChange}
        required
      />

      <label>Horário pretendido</label>
      <input
        name="horario_pretendido"
        type="time"
        value={formData.horario_pretendido}
        onChange={handleChange}
        required
      />

      <label>
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
      />

      <label>Primeira Atividade</label>
      <select
        name="primeira_atividade"
        value={formData.primeira_atividade}
        onChange={handleChange}
        required
      >
        <option value="">Selecione...</option>
        {atividadesPrimarias.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      <label>Segunda Atividade</label>
      <select
        name="segunda_atividade"
        value={formData.segunda_atividade}
        onChange={handleChange}
        required
      >
        <option value="">Selecione...</option>
        {atividadesSecundarias.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      <label>
        <input
          name="aliar_conteudo_escolar"
          type="checkbox"
          checked={formData.aliar_conteudo_escolar}
          onChange={handleChange}
        />
        Deseja aliar o conteúdo escolar?
      </label>
      <textarea
        name="conteudo_escolar"
        placeholder="Conteúdo escolar relacionado"
        value={formData.conteudo_escolar}
        onChange={handleChange}
      />

      <label>
        <input
          name="piquenique"
          type="checkbox"
          checked={formData.piquenique}
          onChange={handleChange}
        />
        Haverá piquenique?
      </label>

      <button type="submit">Enviar Agendamento</button>
    </form>
  );
};

export default AgendamentoForm;

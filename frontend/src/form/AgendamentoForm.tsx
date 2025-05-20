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


export { tiposInstituicao, niveisInstituicao, atividadesPrimarias, atividadesSecundarias };
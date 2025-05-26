export type TiposInstituicao =
  | "publica_municipal"
  | "publica_estadual"
  | "publica_federal"
  | "privada"
  | "filantropica"
  | "outro";

export type NiveisInstituicao =
  | "infantil"
  | "fundamental_inicial"
  | "fundamental_final"
  | "medio"
  | "superior"
  | "nao_escolar";

export type AtividadesPrimarias =
  | "caminhada_guiada"
  | "telhado_verde"
  | "jardim_sensorial"
  | "exposicao_taxidermia"
  | "palestra_peconhentos"
  | "chapeuzinho_verde"
  | "horta_mandala"
  | "artesanato_botanico"
  | "culinaria_pancs";

export type AtividadesSecundarias =
  | "caminhada_guiada"
  | "telhado_verde"
  | "jardim_sensorial"
  | "exposicao_taxidermia"
  | "palestra_peconhentos";

export type Agendamento = {
  id: number;
  email: string;
  telefone: string;
  nome_escola_instituto: string;
  nome_responsavel: string;
  municipio: string;
  endereco_escola_instituto?: string | null;
  tipo_institituicao: TiposInstituicao;
  nivel_instituicao: NiveisInstituicao;
  ano_serie_semestre_turma?: string | null;
  numero_previsto_visitantes?: string | null;
  data_agendamento: string; 
  tempo_disponivel: string; 
  horario_pretendido: string; 
  necessaria_adaptacao: boolean;
  adaptacao_descricao?: string | null;
  primeira_atividade: AtividadesPrimarias;
  segunda_atividade: AtividadesSecundarias;
  aliar_conteudo_escolar: boolean;
  conteudo_escolar?: string | null;
  piquenique: boolean;
};

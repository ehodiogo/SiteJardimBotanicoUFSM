import GenericCrud from "../components/GenericCrud";
import SchemaField from "../functions/SchemaField";
 import { Agendamento } from "../types/Agendamento";

const agendamentoSchema: readonly SchemaField<Agendamento>[] = [
  { name: "id", label: "ID", type: "number" },
  { name: "email", label: "Email", type: "string" },
  { name: "telefone", label: "Telefone", type: "string" },
  { name: "nome_escola_instituto", label: "Nome da Escola/Instituto", type: "string" },
  { name: "nome_responsavel", label: "Nome do Responsável", type: "string" },
  { name: "municipio", label: "Município", type: "string" },
  { name: "endereco_escola_instituto", label: "Endereço da Escola/Instituto", type: "string" },
  { name: "tipo_institituicao", label: "Tipo de Instituição", type: "string" },
  { name: "nivel_instituicao", label: "Nível da Instituição", type: "string" },
  { name: "ano_serie_semestre_turma", label: "Ano/Série/Semestre/Turma", type: "string" },
  { name: "numero_previsto_visitantes", label: "Número de Visitantes Previsto", type: "string" },
  { name: "data_agendamento", label: "Data do Agendamento", type: "string" },
  { name: "tempo_disponivel", label: "Tempo Disponível", type: "string" },
  { name: "horario_pretendido", label: "Horário Pretendido", type: "string" },
  { name: "necessaria_adaptacao", label: "Necessária Adaptação", type: "boolean" },
  { name: "adaptacao_descricao", label: "Descrição da Adaptação", type: "string" },
  { name: "primeira_atividade", label: "Primeira Atividade", type: "string" },
  { name: "segunda_atividade", label: "Segunda Atividade", type: "string" },
  { name: "aliar_conteudo_escolar", label: "Aliar Conteudo Escolar", type: "boolean" },
  { name: "conteudo_escolar", label: "Conteudo Escolar", type: "string" },
  { name: "piquenique", label: "Piquenique", type: "boolean" },
];

export default function TelaAgendamento() {
  return (
    <div>
      <GenericCrud<Agendamento>
        entityName="Agendamento"
        apiUrl="http://sitejardimbotanicoufsm-backend.onrender.com/api/agendamentos/"
        schema={agendamentoSchema}
        displayField={(item) =>
          `${item.nome_responsavel} - ${item.data_agendamento}`
        }
      />
    </div>
  );
}

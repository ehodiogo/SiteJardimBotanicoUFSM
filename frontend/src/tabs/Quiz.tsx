import GenericCrud from "../components/GenericCrud";
import SchemaField from "../functions/SchemaField";
import QuizAmostra from "../types/QuizAmostra";

const quizSchema: readonly SchemaField<QuizAmostra>[] = [
  { name: "id", label: "ID", type: "number" },
  { name: "pergunta", label: "Pergunta", type: "string" },
  { name: "resposta_correta", label: "Resposta Correta", type: "string" },
  { name: "resposta_incorreta_1", label: "Resposta Incorreta 1", type: "string" },
  { name: "resposta_incorreta_2", label: "Resposta Incorreta 2", type: "string" },
  { name: "amostra", label: "Amostra", type: "string" },
];

export default function TelaAmostra() {
  return (
    <div>
      <GenericCrud<QuizAmostra>
        entityName="Quizes"
        apiUrl="http://sitejardimbotanicoufsm-backend.onrender.com/api/quiz/"
        schema={quizSchema}
      />
    </div>
  );
}

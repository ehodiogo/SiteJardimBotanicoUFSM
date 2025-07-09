import GenericCrud from "../components/GenericCrud";
import SchemaField from "../functions/SchemaField";
import { Trilha } from "../types/Trilha";

const trilhaSchema: readonly SchemaField<Trilha>[] = [
  { name: "id", label: "ID", type: "number" },
  { name: "nome", label: "Nome", type: "string" },
  { name: "duracao", label: "Duração", type: "string" },
  { name: "dificuldade", label: "Dificuldade", type: "number" },
  { name: "tags", label: "Tags", type: "string" },
];

export default function TelaAmostra() {
  return (
    <div>
      <GenericCrud<Trilha>
        entityName="Trilhas"
        apiUrl="http://sitejardimbotanicoufsm-backend.onrender.com/api/trilhas/"
        schema={trilhaSchema}
      />
    </div>
  );
}

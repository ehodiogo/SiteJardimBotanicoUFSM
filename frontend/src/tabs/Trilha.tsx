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
        apiUrl="http://127.0.0.1:8000/api/trilhas/"
        schema={trilhaSchema}
      />
    </div>
  );
}

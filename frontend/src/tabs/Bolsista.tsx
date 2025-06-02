import GenericCrud from "../components/GenericCrud";
import SchemaField from "../functions/SchemaField";
import { Bolsista } from "../types/Bolsista";

const bolsistaSchema: readonly SchemaField<Bolsista>[] = [
  { name: "id", label: "ID", type: "number" },
  { name: "nome", label: "Nome", type: "string" },
  { name: "email", label: "Email", type: "string" },
  { name: "matricula", label: "Matricula", type: "string" },
  { name: "curso", label: "Curso", type: "string" },
  { name: "periodo", label: "Periodo", type: "string" },
];

export default function TelaAmostra() {
  return (
    <div>
      <GenericCrud<Bolsista>
        entityName="Bolsista"
        apiUrl="http://127.0.0.1:8000/api/bolsistas/"
        schema={bolsistaSchema}
        displayField={(item) =>
          `${item.nome} - ${item.matricula} - ${item.curso}`
        }
      />
    </div>
  );
}

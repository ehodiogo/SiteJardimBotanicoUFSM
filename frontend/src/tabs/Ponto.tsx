import GenericCrud from "../components/GenericCrud";
import { SchemaField } from "../functions/SchemaField";
import { Ponto } from "../types/Trilha";

const pontoSchema: readonly SchemaField<Ponto>[] = [
  { name: "id", label: "ID", type: "number" },
  { name: "latitude", label: "Latitude", type: "number" },
  { name: "longitude", label: "Longitude", type: "number" },
  { name: "descricao", label: "Descrição", type: "string" },
  { name: "order", label: "Ordem", type: "number" },
  { name: "guia", label: "Guia", type: "string" },
  { name: "imagem", label: "Imagem", type: "string" },
];

export default function TelaAmostra() {
  return (
    <div>
      <GenericCrud<Ponto>
        entityName="Ponto"
        apiUrl="http://localhost:8000/api/ponto "
        schema={pontoSchema}
      />
    </div>
  );
}

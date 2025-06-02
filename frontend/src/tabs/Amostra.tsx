import GenericCrud from "../components/GenericCrud";
import SchemaField from "../functions/SchemaField";
import Amostra from "../types/Amostra";

const amostraSchema: readonly SchemaField<Amostra>[] = [
  { name: "id", label: "ID", type: "number" },
  { name: "nome_popular", label: "Nome Popular", type: "string" },
  { name: "nome_cientifico", label: "Nome Científico", type: "string" },
  { name: "descricao", label: "Descrição", type: "string" },
  { name: "descricao_acessivel", label: "Descrição Acessível", type: "string" },
  { name: "tipo", label: "Tipo", type: "string" },
  { name: "origem", label: "Origem", type: "string" },
  { name: "data_registro", label: "Data de Registro", type: "string" },
  { name: "imagem", label: "Imagem", type: "string" },
  { name: "imagem_url", label: "URL da Imagem", type: "string" },
  { name: "dados_cientificos", label: "Dados Científicos", type: "object",
    displayFields: [
        { key: "reino", label: "Reino" },
        { key: "filo", label: "Filo" },
        { key: "classe", label: "Classe" },
        { key: "ordem", label: "Ordem" },
        { key: "familia", label: "Familia" },
        { key: "genero", label: "Genero" },
        { key: "especie", label: "Especie" },
    ]
   },
];

export default function TelaAmostra() {
  return (
    <div>
      <GenericCrud<Amostra>
        entityName="Amostra"
        apiUrl="http://127.0.0.1:8000/api/amostras/"
        schema={amostraSchema}
        displayField={(item) =>
          `${item.nome_popular} - ${item.nome_cientifico}`
        }
      />
    </div>
  );
}

import DadosCientificos from "./DadosCientificos";

type Amostra = {
    id: number;
    nome_cientifico: string;
    nome_popular: string;
    descricao: string;
    descricao_acessivel: string;
    tipo: string;
    origem: string;
    data_registro: string;
    imagem: string;
    imagem_url: string;
    dados_cientificos: DadosCientificos;
}

export default Amostra;
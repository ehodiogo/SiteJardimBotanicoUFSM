import DadosCientificos from "./DadosCientificos";

type Ser = {
    id: string;
    nome: string;
    descricao: string;
    foto: string; 
    dadosCientificos: DadosCientificos;
    descricaoAcessivel : string;
    type: string;
    grupo?: string;
}

export default Ser;
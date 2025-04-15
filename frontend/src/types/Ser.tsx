import DadosCientificos from "./DadosCientificos";
import Funcionalidade from "./Funcionalidade";

type Ser = {
    id: string;
    nome: string;
    descricao: string;
    foto: string; 
    dadosCientificos: DadosCientificos;
    descricaoAcessivel : string;
    type: string;
    grupo?: string;
    funcionalidade?: Funcionalidade;
}

export default Ser;
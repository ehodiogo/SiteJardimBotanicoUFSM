import DadosCientificos from "./DadosCientificos";

type Animal = {
  id: string;
  nome: string;
  descricao: string;
  foto: string; 
  dadosCientificos: DadosCientificos;
  descricaoAcessivel : string;
};

export default Animal;
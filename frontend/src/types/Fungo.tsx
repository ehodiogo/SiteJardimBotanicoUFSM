import DadosCientificos from "./DadosCientificos";

type Fungo = {
  id: string;
  nome: string;
  descricao: string;
  foto: string;
  dadosCientificos: DadosCientificos;
  descricaoAcessivel : string;
};

export default Fungo;
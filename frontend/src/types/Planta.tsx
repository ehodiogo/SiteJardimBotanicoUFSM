import DadosCientificos from "./DadosCientificos";

type Planta = {
  id: string;
  nome: string;
  grupo: string;
  descricao: string;
  foto: string;
  dadosCientificos: DadosCientificos;
  descricaoAcessivel : string;
};

export default Planta;
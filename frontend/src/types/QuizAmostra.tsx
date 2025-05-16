import Amostra from "./Amostra";

type QuizAmostra = {
    id: number;
    pergunta: string;
    resposta_correta: string;
    resposta_incorreta_1: string;
    resposta_incorreta_2: string;
    amostra: Amostra;
}

export default QuizAmostra;
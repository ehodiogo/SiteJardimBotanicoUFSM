import { useEffect, useState } from "react";
import QuizAmostra from "../types/QuizAmostra";
import { getAllData } from "../services/Api";

interface PerguntaQuizProps {
  amostra_id: number;
  aoResponder: (acertou: boolean) => void;
}

const PerguntaQuiz = ({ amostra_id, aoResponder }: PerguntaQuizProps) => {
  const [perguntaQuiz, setPerguntaQuiz] = useState<QuizAmostra | null>(null);
  const [opcoes, setOpcoes] = useState<string[]>([]);
  const [respondido, setRespondido] = useState(false);
  const [acertou, setAcertou] = useState<boolean | null>(null);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null);

  useEffect(() => {
    setRespondido(false);
    setAcertou(null);
    setOpcaoSelecionada(null);

    getAllData<QuizAmostra[]>("quiz/amostra/" + amostra_id).then((data) => {
      if (data && data.length > 0) {
        const primeiraPergunta = data[0];
        setPerguntaQuiz(primeiraPergunta);

        const respostas = [
          primeiraPergunta.resposta_correta,
          primeiraPergunta.resposta_incorreta_1,
          primeiraPergunta.resposta_incorreta_2,
        ];

        setOpcoes(shuffleArray(respostas));
      }
    });
  }, [amostra_id]);  

  function shuffleArray(array: string[]) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const responder = (opcao: string) => {
    if (respondido) return;

    setOpcaoSelecionada(opcao);

    const correto = opcao === perguntaQuiz?.resposta_correta;
    setAcertou(correto);
    setRespondido(true);
    aoResponder(correto);
  };

  if (!perguntaQuiz) return <p>Carregando...</p>;

  if (opcoes.length === 0)
    return <p>Não há alternativas disponíveis para esta pergunta.</p>;

  return (
    <div style={{ marginTop: 20 }}>
      <p>
        <strong>Pergunta:</strong> {perguntaQuiz.pergunta}
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {opcoes.map((opcao) => (
          <li key={opcao} style={{ marginBottom: 10 }}>
            <button
              onClick={() => responder(opcao)}
              disabled={respondido}
              style={{
                width: "100%",
                padding: "10px",
                cursor: respondido ? "default" : "pointer",
                backgroundColor:
                  respondido && opcao === perguntaQuiz.resposta_correta
                    ? "lightgreen"
                    : respondido && opcao === opcaoSelecionada && !acertou
                    ? "salmon"
                    : "gray",
                border: "1px solid #ccc",
                borderRadius: 5,
                fontSize: 16,
              }}
            >
              {opcao}
            </button>
          </li>
        ))}
      </ul>
      {respondido && (
        <p>
          {acertou ? (
            <span style={{ color: "green" }}>Você acertou!</span>
          ) : (
            <span style={{ color: "red" }}>
              Você errou! Resposta correta: {perguntaQuiz.resposta_correta}
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default PerguntaQuiz;

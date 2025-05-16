import { useState } from "react";
import PerguntaQuiz from "../components/PerguntaQuiz";

const Quiz = () => {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);

  const idsArmazenados = JSON.parse(
    localStorage.getItem("amostrasAnalisadas") || "[]"
  );
  if (!Array.isArray(idsArmazenados) || idsArmazenados.length === 0) {
    return <div>Sem perguntas para o quiz.</div>;
  }

  const irProximo = () => {
    if (perguntaAtual < idsArmazenados.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    }
  };

  const irAnterior = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1);
    }
  };

  const aoResponder = (acertou: boolean) => {
    if (acertou) {
      setPontuacao(pontuacao + 1);
    }
  };

  return (
    <div>
      <h1>Quiz</h1>
      <p>
        Pergunta {perguntaAtual + 1} de {idsArmazenados.length}
      </p>
      <p>Pontuação: {pontuacao}</p>

      <button onClick={irAnterior} disabled={perguntaAtual === 0}>
        Anterior
      </button>
      <button
        onClick={irProximo}
        disabled={perguntaAtual === idsArmazenados.length - 1}
      >
        Próxima
      </button>

      <PerguntaQuiz
        amostra_id={idsArmazenados[perguntaAtual]}
        aoResponder={aoResponder}
        key={idsArmazenados[perguntaAtual]}
      />
    </div>
  );
};

export default Quiz;

import { useState } from "react";
import PerguntaQuiz from "../components/PerguntaQuiz";

const Quiz = () => {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);

  const idsArmazenados = JSON.parse(
    localStorage.getItem("amostrasAnalisadas") || "[]"
  );

  if (!Array.isArray(idsArmazenados) || idsArmazenados.length === 0) {
    return <div className="quiz-sem-perguntas">Sem perguntas para o quiz.</div>;
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
    <>
      <style>{`
        body, html {
          margin: 0; padding: 0; height: 100%;
          background: linear-gradient(to bottom right, #f0f4f8, #e8f5e9);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .quiz-container {
          max-width: 800px;
          margin: 20px auto;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(23, 110, 11, 0.692);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .quiz-title {
          text-align: center;
          font-size: 1.8rem;
          color: #2e7d32;
          font-weight: 700;
          margin: 0;
        }
        .quiz-info {
          text-align: center;
          color: #555;
          font-weight: 600;
          font-size: 1rem;
        }
        .quiz-buttons {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }
        button {
          flex: 1 1 45%;
          padding: 14px 0;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          background-color: #2e7d32;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover:not(:disabled) {
          background-color: #81c784;
        }
        button:disabled {
          background-color: #ccc;
          color: #777;
          cursor: not-allowed;
        }
        .quiz-sem-perguntas {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.2rem;
          color: #555;
          font-weight: 600;
          padding: 20px;
          text-align: center;
        }
        @media (min-width: 480px) {
          button {
            flex: 1 1 30%;
            font-size: 20px;
          }
          .quiz-info {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="quiz-container">
        <h1 className="quiz-title">Quiz</h1>
        <p className="quiz-info">
          Pergunta {perguntaAtual + 1} de {idsArmazenados.length}
        </p>
        <p className="quiz-info">Pontuação: {pontuacao}</p>

        <PerguntaQuiz
          amostra_id={idsArmazenados[perguntaAtual]}
          aoResponder={aoResponder}
          key={idsArmazenados[perguntaAtual]}
        />

        <div className="quiz-buttons">
          <button onClick={irAnterior} disabled={perguntaAtual === 0}>
            Anterior
          </button>
          <button
            onClick={irProximo}
            disabled={perguntaAtual === idsArmazenados.length - 1}
          >
            Próxima
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;

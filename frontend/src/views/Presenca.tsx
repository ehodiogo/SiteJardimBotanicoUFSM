import { useState, useEffect } from "react";
import { Agendamento } from "../types/Agendamento";
import { getAllData } from "../services/Api";

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

const Star: React.FC<StarProps> = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill={filled ? "#ffc107" : "none"}
    stroke="#ffc107"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ cursor: "pointer" }}
    viewBox="0 0 24 24"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
  

// 1 agendamento só por dia??
// mais de um por dia??

const Presenca = () => {
  const [nome, setNome] = useState("");
  const [feedback, setFeedback] = useState("");
  const [melhoria, setMelhoria] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);
  const [enviado, setEnviado] = useState(false);

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    getAllData<Agendamento[]>("agendamentos-hoje").then((res) => {

      if (res) {
        setAgendamentos(res);        
      } else {
        console.error("Nenhum agendamento encontrado.");
      }
    });
  }, []);

  console.log("Agendamentos:", agendamentos);

  const handleEnviar = () => {
    if (nome.trim() && feedback.trim() && avaliacao > 0) {
      setEnviado(true);
    } else {
      alert("Por favor, preencha nome, feedback e dê uma avaliação.");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 480 }}>
      {!enviado ? (
        <div className="card shadow-sm p-4">
          <h4 className="mb-4 text-center text-success">Feedback do Passeio</h4>

          <div className="mb-3">
            <p>Selecione o passeio que deseja dar feedback:</p>

            {agendamentos.map((agendamento) => (
              <select
                key={agendamento.id}
                className="form-select"
                value={agendamento.id}
                onChange={(e) => {
                  const selectedAgendamentoId = parseInt(e.target.value);
                  const selectedAgendamento = agendamentos.find(
                    (a) => a.id === selectedAgendamentoId
                  );
                  if (selectedAgendamento) {
                    setAgendamentos([selectedAgendamento]);
                  }
                }}
              >
                <option value={agendamento.id}>
                  {agendamento.data_agendamento} - {agendamento.nome_responsavel}
                </option>
              </select>
            ))}
          </div>

          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Seu nome
            </label>
            <input
              id="nome"
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="feedback" className="form-label">
              Feedback do passeio
            </label>
            <textarea
              id="feedback"
              className="form-control"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Escreva seu feedback"
              rows={4}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="melhoria" className="form-label">
              O que poderia melhorar?
            </label>
            <textarea
              id="melhoria"
              className="form-control"
              value={melhoria}
              onChange={(e) => setMelhoria(e.target.value)}
              placeholder="Sugestões para melhorar o passeio"
              rows={3}
            />
          </div>

        <p className="text-center mb-3">Avaliação</p>
          <div
            className="d-flex justify-content-center mb-4"
            aria-label="Avaliação por estrelas"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= avaliacao}
                onClick={() => setAvaliacao(star)}
              />
            ))}
          </div>

          <button className="btn btn-success w-100" onClick={handleEnviar}>
            Enviar
          </button>
        </div>
      ) : (
        <div className="card shadow-sm p-4 text-center">
          <h4 className="mb-3 text-success">
            Obrigado pelo seu feedback, {nome}!
          </h4>
          <p>
            <strong>Avaliação:</strong> {avaliacao} ⭐
          </p>
          <p className="mb-3 fst-italic">"{feedback}"</p>
          {melhoria && (
            <p className="mb-4 text-muted">
              <strong>Sugestão de melhoria:</strong> {melhoria}
            </p>
          )}
          <button
            className="btn btn-outline-success"
            onClick={() => {
              setNome("");
              setFeedback("");
              setMelhoria("");
              setAvaliacao(0);
              setEnviado(false);
            }}
          >
            Registrar outro
          </button>
        </div>
      )}
    </div>
  );
};

export default Presenca;

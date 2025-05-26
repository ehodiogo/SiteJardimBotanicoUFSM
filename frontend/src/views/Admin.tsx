import { useEffect, useState } from "react";
import { getAllData } from "../services/Api";
import "bootstrap/dist/css/bootstrap.min.css";
import Amostra from "../types/Amostra";
import QuizAmostra from "../types/QuizAmostra";
import { Trilha } from "../types/Trilha";

export default function AdminPanel() {
  const [amostras, setAmostras] = useState<Amostra[]>([]);
  const [quizzes, setQuizzes] = useState<QuizAmostra[]>([]);
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<"amostras" | "quizzes" | "trilhas">(
    "amostras"
  );

  useEffect(() => {
    getAllData<Amostra[]>("amostras").then((res) => {
      if (res) setAmostras(res);
    });

    getAllData<QuizAmostra[]>("quiz").then((res) => {
      if (res) setQuizzes(res);
    });

    getAllData<Trilha[]>("trilhas").then((res) => {
      if (res) setTrilhas(res);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Administração</h1>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === "amostras" ? "active" : ""}`}
            onClick={() => setAbaAtiva("amostras")}
          >
            Amostras
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === "quizzes" ? "active" : ""}`}
            onClick={() => setAbaAtiva("quizzes")}
          >
            Quiz de Amostras
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${abaAtiva === "trilhas" ? "active" : ""}`}
            onClick={() => setAbaAtiva("trilhas")}
          >
            Trilhas
          </button>
        </li>
      </ul>

      {abaAtiva === "amostras" && (
        <div>
          <h2>Amostras</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome Científico</th>
                <th>Nome Popular</th>
                <th>Imagem</th>
              </tr>
            </thead>
            <tbody>
              {amostras.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.nome_cientifico}</td>
                  <td>{a.nome_popular}</td>
                  <td>
                    <img
                      src={a.imagem_url}
                      alt={a.nome_popular}
                      style={{ width: 80 }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {abaAtiva === "quizzes" && (
        <div>
          <h2>Quizzes</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pergunta</th>
                <th>Resposta Correta</th>
                <th>Amostra</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((q) => (
                console.log(q),
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td>{q.pergunta}</td>
                  <td>{q.resposta_correta}</td>
                  <td>{q.amostra.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {abaAtiva === "trilhas" && (
        <div>
          <h2>Trilhas</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Duração</th>
                <th>Dificuldade</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {trilhas.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.nome}</td>
                  <td>{t.duracao}</td>
                  <td>{t.dificuldade}</td>
                  <td>{t.tags.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

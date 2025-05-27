import React, { useEffect, useState } from "react";
import axios from "axios";
import { Agendamento } from "../types/Agendamento";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const Agenda: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string>(
    formatDate(new Date())
  );

  useEffect(() => {
    axios
      .get<Agendamento[]>("http://127.0.0.1:8000/api/agendamentos")
      .then((response) => setAgendamentos(response.data))
      .catch((error) => console.error("Erro ao buscar agendamentos:", error));
  }, []);

  const horarios = Array.from(
    { length: 16 },
    (_, i) => `${String(7 + i).padStart(2, "0")}:00`
  );

  const agendamentosDoDia = agendamentos.filter(
    (a) => a.data_agendamento === dataSelecionada
  );

  return (
    <div className="container py-5">
      <div className="card shadow p-4 mb-5">
        <h2 className="mb-4 text-center text-primary">Agenda de Visitas</h2>

        <div className="mb-4">
          <label htmlFor="dataInput" className="form-label fw-semibold">
            Selecione o dia:
          </label>
          <input
            type="date"
            id="dataInput"
            className="form-control"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
          />
        </div>

        <div className="text-center mb-4">
          <h5 className="text-secondary">
            Dia selecionado:{" "}
            <span className="text-dark">
              {new Date(dataSelecionada + "T00:00").toLocaleDateString()}
            </span>
          </h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th className="bg-primary text-white">Horário</th>
                <th className="bg-primary text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((hora) => {
                const agendamento = agendamentosDoDia.find(
                  (a) => a.horario_pretendido.substring(0, 5) === hora
                );
                return (
                  <tr key={hora}>
                    <td className="fw-bold">{hora}</td>
                    <td
                      className={
                        agendamento
                          ? "bg-danger text-white fw-semibold"
                          : "bg-success text-white fw-semibold"
                      }
                    >
                      {agendamento
                        ? agendamento.nome_escola_instituto
                        : "Disponível"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Agenda;

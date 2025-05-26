import { useEffect, useState } from "react";
import { Bolsista } from "../types/Bolsista";
import { getAllData } from "../services/Api";

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const formatarHorario = (hora: string) => hora.substring(0, 5);

const BolsistaTab = () => {
  const [bolsistas, setBolsistas] = useState<Bolsista[]>([]);

  useEffect(() => {
    getAllData<Bolsista[]>("bolsistas").then((res) => {
      if (res) setBolsistas(res);
    });
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-danger">
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Curso</th>
            <th>Período</th>
            <th>Horários</th>
          </tr>
        </thead>
        <tbody>
          {bolsistas.map((b) => (
            <tr key={b.id}>
              <td>{b.matricula}</td>
              <td>{b.nome}</td>
              <td>{b.email}</td>
              <td>{b.curso}</td>
              <td>{b.periodo}</td>
              <td>
                {b.horarios && b.horarios.length > 0 ? (
                  <ul className="list-unstyled mb-0">
                    {b.horarios.map((h) => (
                      <li key={h.id}>
                        {diasSemana[h.dia_semana]}:{" "}
                        {formatarHorario(h.horario_inicio)} -{" "}
                        {formatarHorario(h.horario_fim)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted">Sem horários</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BolsistaTab;

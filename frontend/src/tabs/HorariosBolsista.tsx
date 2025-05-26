import { useEffect, useState } from "react";
import { HorarioBolsista } from "../types/HorarioBolsista";
import { getAllData } from "../services/Api";

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const formatarHorario = (hora: string) => hora.substring(0, 5);

interface HorarioBolsistaComNome extends HorarioBolsista {
  nome_bolsista: string;
  matricula_bolsista: string;
}

const HorarioBolsistaTab = () => {
  const [horarios, setHorarios] = useState<HorarioBolsistaComNome[]>([]);

  useEffect(() => {
    getAllData<HorarioBolsistaComNome[]>("horarios_bolsista").then((res) => {
      if (res) setHorarios(res);
    });
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-danger">
          <tr>
            <th>Bolsista (Matrícula)</th>
            <th>Dia da Semana</th>
            <th>Início</th>
            <th>Fim</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((h) => (
            <tr key={h.id}>
              <td>
                {h.nome_bolsista} ({h.matricula_bolsista})
              </td>
              <td>{diasSemana[h.dia_semana]}</td>
              <td>{formatarHorario(h.horario_inicio)}</td>
              <td>{formatarHorario(h.horario_fim)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorarioBolsistaTab;

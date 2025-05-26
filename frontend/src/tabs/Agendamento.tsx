import { getAllData } from "../services/Api";
import { useEffect, useState } from "react";
import { Agendamento } from "../types/Agendamento";

const AgendamentoTab = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [agendamentoSelecionado, setAgendamentoSelecionado] =
    useState<Agendamento | null>(null);

  useEffect(() => {
    getAllData<Agendamento[]>("agendamentos").then((res) => {
      if (res) setAgendamentos(res);
    });
  }, []);

  const selecionarAgendamento = (agendamento: Agendamento) => {
    setAgendamentoSelecionado(agendamento);
  };

  const limparSelecao = () => {
    setAgendamentoSelecionado(null);
  };

  const editarAgendamento = () => {
    alert(`Editar agendamento: ${agendamentoSelecionado?.id}`);
  };

  const removerAgendamento = () => {
    if (window.confirm("Tem certeza que deseja remover este agendamento?")) {
      alert(`Remover agendamento: ${agendamentoSelecionado?.id}`);
      limparSelecao();
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center text-success mb-4">Agendamentos</h1>

      {agendamentos.length === 0 ? (
        <p className="text-center">Nenhum agendamento encontrado.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th>Escola / Instituto</th>
                <th>Município</th>
                <th>Data</th>
                <th>Primeira Atividade</th>
                <th>Segunda Atividade</th>
                <th>Telefone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((a) => (
                <tr
                  key={a.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => selecionarAgendamento(a)}
                  className={
                    agendamentoSelecionado?.id === a.id ? "table-info" : ""
                  }
                >
                  <td>{a.nome_escola_instituto}</td>
                  <td>{a.municipio}</td>
                  <td>{a.data_agendamento}</td>
                  <td>{a.primeira_atividade}</td>
                  <td>{a.segunda_atividade}</td>
                  <td>{a.telefone}</td>
                  <td>{a.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {agendamentoSelecionado && (
        <div className="card mt-4 shadow-sm">
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Detalhes do Agendamento</h5>
            <button
              className="btn btn-sm btn-light"
              onClick={limparSelecao}
              title="Fechar"
            >
              &times;
            </button>
          </div>
          <div className="card-body">
            <p>
              <strong>Escola / Instituto:</strong>{" "}
              {agendamentoSelecionado.nome_escola_instituto}
            </p>
            <p>
              <strong>Município:</strong> {agendamentoSelecionado.municipio}
            </p>
            <p>
              <strong>Data do agendamento:</strong>{" "}
              {agendamentoSelecionado.data_agendamento}
            </p>
            <p>
              <strong>Primeira atividade:</strong>{" "}
              {agendamentoSelecionado.primeira_atividade}
            </p>
            <p>
              <strong>Segunda atividade:</strong>{" "}
              {agendamentoSelecionado.segunda_atividade}
            </p>
            <p>
              <strong>Telefone:</strong> {agendamentoSelecionado.telefone}
            </p>
            <p>
              <strong>Email:</strong> {agendamentoSelecionado.email}
            </p>
            <p>
              <strong>Responsável:</strong>{" "}
              {agendamentoSelecionado.nome_responsavel}
            </p>
            <p>
              <strong>Tipo de instituição:</strong>{" "}
              {agendamentoSelecionado.tipo_institituicao}
            </p>
            <p>
              <strong>Nível da instituição:</strong>{" "}
              {agendamentoSelecionado.nivel_instituicao}
            </p>
            <p>
              <strong>Necessita adaptação:</strong>{" "}
              {agendamentoSelecionado.necessaria_adaptacao ? "Sim" : "Não"}
            </p>
            {agendamentoSelecionado.necessaria_adaptacao && (
              <p>
                <strong>Descrição da adaptação:</strong>{" "}
                {agendamentoSelecionado.adaptacao_descricao}
              </p>
            )}
            <p>
              <strong>Alia conteúdo escolar:</strong>{" "}
              {agendamentoSelecionado.aliar_conteudo_escolar ? "Sim" : "Não"}
            </p>
            {agendamentoSelecionado.aliar_conteudo_escolar && (
              <p>
                <strong>Conteúdo escolar:</strong>{" "}
                {agendamentoSelecionado.conteudo_escolar}
              </p>
            )}
            <p>
              <strong>Piquenique:</strong>{" "}
              {agendamentoSelecionado.piquenique ? "Sim" : "Não"}
            </p>
          </div>
          <div className="card-footer d-flex gap-2 justify-content-end">
            <button className="btn btn-warning" onClick={editarAgendamento}>
              Editar
            </button>
            <button className="btn btn-danger" onClick={removerAgendamento}>
              Remover
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendamentoTab;

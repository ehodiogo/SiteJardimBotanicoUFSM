import lerTextoEmVozAlto from "../functions/Acessibilidade";

interface ItemProps {
  foto: string;
  nome: string;
  descricao: string;
  descricaoAcessivel: string;
  dadosCientificos: {
    nomeCientifico: string;
  };
  type: string;
  grupo?: string;
}

function CardAmostragem({ item }: { item: ItemProps }) {
  return (
    <div className="card shadow-lg border-0" style={{ width: "20rem", backgroundColor: "#f4f9f4" }}>
      <img
        src={item.foto}
        className="card-img-top"
        alt={item.nome}
        style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px", height: "200px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title text-success fw-bold">{item.nome}</h5>
        <p className="card-text text-muted" style={{ fontStyle: "italic" }}>{item.descricao}</p>
        <p className="card-text">
          <strong className="text-primary">Nome Científico:</strong> <span className="text-secondary">{item.dadosCientificos.nomeCientifico}</span>
          {item.grupo && (
            <a>Grupo: {item.grupo}</a>
          )}
        </p>
        <button className="btn btn-success btn-sm mt-2" onClick={() => lerTextoEmVozAlto(item.descricaoAcessivel)}>
          🌿 Ouvir Descrição
        </button>
      </div>
    </div>
  );
}

export default CardAmostragem;

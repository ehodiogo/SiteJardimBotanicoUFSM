import { plantas, fungos, animais } from "../mock/dadosMock";
import lerTextoEmVozAlto from "../functions/Acessibilidade";

function Dados() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Listagem de Dados</h1>

      <section>
        <h2>Plantas</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {plantas.map((planta) => (
            <div
              key={planta.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                width: "250px",
              }}
            >
              <img
                src={planta.foto}
                alt={planta.nome}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h3>{planta.nome}</h3>
              <p>{planta.descricao}</p>
              <p>
                <strong>Nome Científico:</strong> {planta.dadosCientificos.nomeCientifico}
              </p>
              <button onClick={() => lerTextoEmVozAlto(planta.descricaoAcessivel)}>
                Ler Descrição
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Fungos</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {fungos.map((fungo) => (
            <div
              key={fungo.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                width: "250px",
              }}
            >
              <img
                src={fungo.foto}
                alt={fungo.nome}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h3>{fungo.nome}</h3>
              <p>{fungo.descricao}</p>
              <p>
                <strong>Nome Científico:</strong> {fungo.dadosCientificos.nomeCientifico}
              </p>
              <button onClick={() => lerTextoEmVozAlto(fungo.descricaoAcessivel)}>
                Ler Descrição
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Animais</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {animais.map((animal) => (
            <div
              key={animal.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                width: "250px",
              }}
            >
              <img
                src={animal.foto}
                alt={animal.nome}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h3>{animal.nome}</h3>
              <p>{animal.descricao}</p>
              <p>
                <strong>Nome Científico:</strong> {animal.dadosCientificos.nomeCientifico}
              </p>
              <button onClick={() => lerTextoEmVozAlto(animal.descricaoAcessivel)}>
                Ler Descrição
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dados;

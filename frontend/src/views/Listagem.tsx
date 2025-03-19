import { plantas, fungos, animais } from "../mock/dadosMock";
import CardAmostragem from "../components/CardSer";

function Listagem() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Listagem de Dados</h1>

      <section>
        <h2>Plantas</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {plantas.map((planta) => (
            <CardAmostragem key={planta.id} item={planta} />
          ))}
        </div>
      </section>

      <section>
        <h2>Fungos</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {fungos.map((fungo) => (
            <CardAmostragem key={fungo.id} item={fungo} />
          ))}
        </div>
      </section>

      <section>
        <h2>Animais</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {animais.map((animal) => (
            <CardAmostragem key={animal.id} item={animal} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Listagem;

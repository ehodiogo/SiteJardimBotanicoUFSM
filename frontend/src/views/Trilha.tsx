import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import { LatLngTuple, DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

const iconeUsuario = new DivIcon({
  className: "",
  html: `
    <div style="font-size: 24px; color: #c0392b;">👤</div>
  `,
});

function haversineDistance([lat1, lon1]: LatLngTuple, [lat2, lon2]: LatLngTuple): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371e3; 
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

const trilhasDisponiveis: Record<
  string,
  { nome: string; pontos: { coordenadas: LatLngTuple; imagem: string }[] }
> = {
  "SemTrilha": {
    nome: "SemTrilha",
    pontos: [
      {
        coordenadas: [-29.717055079683693, -53.72934471436021],
        imagem: "/fotos/Amanita_muscaria.jpg",
      },
    ],
  },
  "trilha1": {
    nome: "Trilha Predador",
    pontos: [
      { coordenadas: [-29.717055079683693, -53.72934471436021], imagem: "/fotos/Amanita_muscaria.jpg" },
      { coordenadas: [-29.717082505146156, -53.729615368601664], imagem: "/fotos/Bugiu-Ruivo.jpg" },
      { coordenadas: [-29.717035495714047, -53.730445375105], imagem: "/fotos/Colaptes melanochloros.jpg" },
      { coordenadas: [-29.717372412616157, -53.7299446634828], imagem: "/fotos/Cryptotrama_aspartata.jpg" },
      { coordenadas: [-29.71781118980265, -53.730445375520546], imagem: "/fotos/cymatoderma_caperatum.jpg" },
      { coordenadas: [-29.717889535454184, -53.728961274975845], imagem: "/fotos/Dasypus-hybridus-1.jpg" },
      { coordenadas: [-29.718477182261125, -53.72883946943917], imagem: "/fotos/Eugenia myrcianthes.jpg" },
      { coordenadas: [-29.718026636357354, -53.7277748878039], imagem: "/fotos/Hydrochoerus hydrochaeris.jpg" },
    ],
  },
  "trilha2": {
    nome: "Trilha Caçador",
    pontos: [
      { coordenadas: [-29.716, -53.730], imagem: "/fotos/azul1.jpg" },
      { coordenadas: [-29.7165, -53.7295], imagem: "/fotos/azul2.jpg" },
      { coordenadas: [-29.717, -53.729], imagem: "/fotos/azul3.jpg" },
      { coordenadas: [-29.7175, -53.7285], imagem: "/fotos/azul4.jpg" },
    ],
  },
};

const tagsComTrilhas: Record<string, string> = {
  "Predador": "trilha1",
  "Caçador": "trilha2",
  "Medicinal": "trilha1",
};

const Trilha = () => {
  const [trilhaAtual, setTrilhaAtual] = useState("SemTrilha");
  const [tagSelecionada, setTagSelecionada] = useState<string | null>(null);
  const trilha = trilhasDisponiveis[trilhaAtual];
  const [posicaoAtual, setPosicaoAtual] = useState(0);
  const [distancia, setDistancia] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [tempoPassado, setTempoPassado] = useState(0);
  const [permitirClique, setPermitirClique] = useState(false);

  useEffect(() => {
    if (tagSelecionada) {
      const trilhaAssociada = tagsComTrilhas[tagSelecionada];
      setTrilhaAtual(trilhaAssociada);
      setPosicaoAtual(0);
      setTempoPassado(0);
    }
  }, [tagSelecionada]);

  const avançarParaProximoPonto = () => {
    if (posicaoAtual < trilha.pontos.length - 1) {
      setPosicaoAtual(posicaoAtual + 1);
      setTempoPassado(0);
    }
  };

  useEffect(() => {
    if (posicaoAtual > 0 && trilhaAtual !== "SemTrilha") {
      const d = haversineDistance(
        trilha.pontos[posicaoAtual - 1].coordenadas,
        trilha.pontos[posicaoAtual].coordenadas
      );
      setDistancia(d);
      const estimatedTime = d / 40.33;
      setTempo(estimatedTime);
    }
  }, [posicaoAtual, trilha.pontos, trilhaAtual]);

  useEffect(() => {
    if (posicaoAtual > 0 && tempo > 0) {
      const tempoParaPermitir = tempo * 0.7;
      if (tempoPassado >= tempoParaPermitir || posicaoAtual === 0) {
        setPermitirClique(true);
      } else {
        setPermitirClique(false);
      }
    }
  }, [tempoPassado, tempo, posicaoAtual]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (tempoPassado < tempo) {
        setTempoPassado((prev) => prev + 0.1);
      }
    }, 600);

    return () => clearInterval(timer);
  }, [tempoPassado, tempo]);

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">Simulação de Trilha</h2>

      <div className="mb-3">
        <label className="form-label">Selecione um tipo de Trilha</label>
        <select
          className="form-select"
          value={tagSelecionada ?? ""}
          onChange={(e) => setTagSelecionada(e.target.value)}
        >
          <option value="">Clique aqui e selecione uma trilha abaixo!</option>
          {Object.keys(tagsComTrilhas).map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {trilhaAtual === "SemTrilha" && (
        <div className="alert alert-warning" role="alert">
          Não há trilha selecionada. Por favor, escolha uma trilha para começarmos!
        </div>
      )}

      {trilhaAtual !== "SemTrilha" && (
        <MapContainer
          center={trilha.pontos[0].coordenadas}
          zoom={17}
          style={{ height: "60vh", borderRadius: "12px", marginBottom: "20px" }}
          key={trilhaAtual}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polyline positions={trilha.pontos.map(p => p.coordenadas)} pathOptions={{ color: "red", weight: 5 }} />
          {trilha.pontos.map((pos, idx) => (
            <Marker key={idx} position={pos.coordenadas}>
              <Popup>Ponto {idx + 1}</Popup>
            </Marker>
          ))}

          <Marker position={trilha.pontos[posicaoAtual].coordenadas} icon={iconeUsuario}>
            <Popup>
              <div style={{ color: "#c0392b", fontWeight: "bold", fontSize: "16px" }}>
                👣 Você está aqui
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      )}

      {trilhaAtual !== "SemTrilha" && (
        <div className="card shadow-sm p-4">
          <h5 className="mb-3">Informações do ponto atual</h5>
          <p><strong>Posição:</strong> {posicaoAtual + 1} / {trilha.pontos.length}</p>
          <p><strong>Distância até o próximo:</strong> {distancia.toFixed(1)} metros</p>
          <p><strong>Tempo estimado de caminhada até o próximo ponto:</strong> {tempo.toFixed(1)} minutos</p>

          {posicaoAtual === 0 ? (
            <>
              <p><strong>Início da trilha! Prepare-se para começar sua jornada:</strong></p>
              <img
                src={trilha.pontos[0].imagem}
                alt={`Imagem do ponto 1`}
                className="img-fluid rounded"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <button
                className="btn btn-success mt-3"
                onClick={avançarParaProximoPonto}
              >
                Começar
              </button>
            </>
          ) : (
            <div>
              <img
                src={trilha.pontos[posicaoAtual].imagem}
                alt={`Imagem do ponto ${posicaoAtual + 1}`}
                className="img-fluid rounded"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <button
                className={`btn btn-primary mt-3 ${!permitirClique ? "disabled" : ""}`}
                onClick={avançarParaProximoPonto}
                disabled={!permitirClique}
              >
                Avançar para o próximo ponto
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Trilha;

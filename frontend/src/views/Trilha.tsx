import { useParams } from "react-router-dom";
import "../css/TrilhaPage.css";
import { useState, useEffect } from "react";
import { Trilha } from "../types/Trilha";
import { getAllData } from "../services/Api";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

// Distância em metros entre dois pontos
function calcularDistancia(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // metros
}

// Cálculo da direção (ângulo) entre dois pontos
function calcularDirecao(
  pontoA: [number, number],
  pontoB: [number, number]
): number {
  const [lat1, lon1] = pontoA;
  const [lat2, lon2] = pontoB;

  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.cos(dLon);
  const brng = Math.atan2(y, x);
  const brngDeg = ((brng * 180) / Math.PI + 360) % 360;

  return brngDeg;
}

// Texto com base no ângulo
function descreverDirecao(angulo: number): string {
  if (angulo < 45 || angulo >= 315) return "siga para o norte";
  if (angulo >= 45 && angulo < 135) return "vire à direita (leste)";
  if (angulo >= 135 && angulo < 225) return "siga para o sul";
  if (angulo >= 225 && angulo < 315) return "vire à esquerda (oeste)";
  return "";
}

// Formatação do tempo estimado
function formatarTempo(segundos: number): string {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = Math.floor(segundos % 60);
  return `${minutos} min ${segundosRestantes} s`;
}

const TrilhaPage = () => {
  const [trilha, setTrilha] = useState<Trilha>();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [mapType, setMapType] = useState("satellite");
  const { id } = useParams();

  useEffect(() => {
    getAllData<Trilha>(`trilhas/${id}`).then((res) => {
      if (res) setTrilha(res);
    });

    // setUserLocation([-29.71675789534707, -53.729767314748]);

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.warn("Erro ao obter localização:", err),
        { enableHighAccuracy: true }
      );
    }
  }, [id]);

  if (!trilha) return <div>Carregando trilha...</div>;

  const pontosOrdenados = trilha.pontos.sort((a, b) => a.order - b.order);
  const centro: [number, number] = pontosOrdenados.length
    ? [pontosOrdenados[0].latitude, pontosOrdenados[0].longitude]
    : [-29.7, -53.7];

  const proximoPonto = userLocation
    ? pontosOrdenados.reduce((maisProximo, ponto) => {
        const distAtual = calcularDistancia(
          userLocation[0],
          userLocation[1],
          ponto.latitude,
          ponto.longitude
        );
        const distMaisProx = calcularDistancia(
          userLocation[0],
          userLocation[1],
          maisProximo.latitude,
          maisProximo.longitude
        );
        return distAtual < distMaisProx ? ponto : maisProximo;
      }, pontosOrdenados[0])
    : null;

  const distancia =
    userLocation && proximoPonto
      ? calcularDistancia(
          userLocation[0],
          userLocation[1],
          proximoPonto.latitude,
          proximoPonto.longitude
        )
      : null;

  const VELOCIDADE_MEDIA_MS = 1.39; 
  const tempoEstimadoSegundos =
    distancia !== null ? distancia / VELOCIDADE_MEDIA_MS : null;

  const direcao =
    userLocation && proximoPonto
      ? calcularDirecao(userLocation, [
          proximoPonto.latitude,
          proximoPonto.longitude,
        ])
      : null;

  const tileLayerUrls: Record<string, { url: string; attribution: string }> = {
    standard: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "Tiles &copy; Esri",
    },
  };

  return (
    <div className="container">
      <h1>{trilha.nome}</h1>
      <p>
        <strong>Dificuldade:</strong> {trilha.dificuldade}
      </p>
      <p>
        <strong>Duração:</strong> {trilha.duracao}
      </p>
      <p>
        <strong>Tags:</strong> {trilha.tags.join(", ")}
      </p>

      {userLocation && proximoPonto && (
        <>
          <p>
            <strong>Distância até o próximo ponto:</strong>{" "}
            {(distancia! / 1000).toFixed(2)} km
          </p>
          <p>
            <strong>Tempo estimado até o próximo ponto:</strong>{" "}
            {formatarTempo(tempoEstimadoSegundos!)}
          </p>
          <p>
            <strong>Direção sugerida:</strong> {descreverDirecao(direcao!)}
          </p>
        </>
      )}

      <label style={{ marginTop: "10px", display: "block" }}>
        Tipo de mapa:{" "}
        <select value={mapType} onChange={(e) => setMapType(e.target.value)}>
          <option value="standard">Padrão</option>
=          <option value="satellite">Satélite</option>
        </select>
      </label>

      <MapContainer
        center={centro}
        zoom={50}
        style={{ height: "500px", width: "100%", marginTop: "20px" }}
      >
        <TileLayer
          url={tileLayerUrls[mapType].url}
          attribution={tileLayerUrls[mapType].attribution}
        />

        {pontosOrdenados.map((ponto) => (
          <Marker
            key={ponto.id}
            position={[ponto.latitude, ponto.longitude]}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              <strong>{ponto.descricao}</strong>
              <br />
              {ponto.guia.descricao}
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <>
            <Marker
              position={userLocation}
              icon={L.icon({
                iconUrl: "https://www.svgrepo.com/show/13671/location-pin.svg",
                iconSize: [30, 30],
                iconAnchor: [15, 30],
              })}
            >
              <Popup>Sua localização atual</Popup>
            </Marker>
            <Circle
              center={userLocation}
              radius={10}
              pathOptions={{ color: "blue" }}
            />
          </>
        )}

        {userLocation && proximoPonto && (
          <Polyline
            positions={[
              userLocation,
              [proximoPonto.latitude, proximoPonto.longitude],
            ]}
            pathOptions={{ color: "red", weight: 4 }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default TrilhaPage;

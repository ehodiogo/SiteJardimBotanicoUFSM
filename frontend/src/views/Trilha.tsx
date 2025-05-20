import { useParams } from "react-router-dom";
import "../css/TrilhaPage.css";
import { useState, useEffect, useMemo } from "react";
import { Trilha } from "../types/Trilha";
import { getAllData } from "../services/Api";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { BsFillGeoFill, BsGeoAltFill } from "react-icons/bs";
import ReactDOMServer from "react-dom/server";
import { falarTexto } from "../functions/Fala";
import calcularDistancia from "../functions/Distancia";
import { useMap } from "react-leaflet";

const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 17, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

const TrilhaPage = () => {
  const [usarPosicaoReal, setUsarPosicaoReal] = useState(true);
  const [trilha, setTrilha] = useState<Trilha>();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [mapType, setMapType] = useState("satellite");
  const [pontoAtual, setPontoAtual] = useState(1);
  const [visitados, setVisitados] = useState<number[]>([]);
  const [mostrarPontoAtual, setMostrarPontoAtual] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  const { id } = useParams();

  useEffect(() => {
    getAllData<Trilha>(`trilhas/${id}`).then((res) => {
      if (res) setTrilha(res);
    });

    if (usarPosicaoReal) {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (pos) => {
            setUserLocation([pos.coords.latitude, pos.coords.longitude]);
          },
          (err) => console.warn("Erro ao obter localização:", err),
          { enableHighAccuracy: true }
        );
      }
    } else {
      setUserLocation([-29.716895283302495, -53.729593828291925]);
    }
  }, [id, usarPosicaoReal]);

  const pontosOrdenados = useMemo(() => {
    if (!trilha?.pontos) return [];
    return [...trilha.pontos].sort((a, b) => a.order - b.order);
  }, [trilha?.pontos]);

  useEffect(() => {
    if (!userLocation || !trilha) return;

    const ponto = pontosOrdenados.find((p) => p.order === pontoAtual);
    if (!ponto) return;

    const distancia = calcularDistancia(
      userLocation[0],
      userLocation[1],
      ponto.latitude,
      ponto.longitude
    );

    if (distancia <= 3 && !visitados.includes(ponto.order)) {
      falarTexto(ponto.descricao);
      falarTexto(ponto.guia.descricao);
      setVisitados((prev) => [...prev, ponto.order]);
      setMostrarPontoAtual(true);
    }
  }, [userLocation, pontoAtual, visitados, trilha, pontosOrdenados]);

  const irParaProximoPonto = () => {
    setPontoAtual((prev) => prev + 1);
    setMostrarPontoAtual(false);
  };

  const centro: [number, number] = pontosOrdenados.length
    ? [pontosOrdenados[0].latitude, pontosOrdenados[0].longitude]
    : [-29.7, -53.7];

  const ponto = pontosOrdenados.find((p) => p.order === pontoAtual);

  if (!trilha) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="spinner-border"
          role="status"
          style={{ color: "#2e7d32" }}
        />
        <span className="ms-2 text-success">Carregando trilha...</span>
      </div>
    );
  }

  if (!userLocation) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="spinner-border"
          role="status"
          style={{ color: "#2e7d32" }}
        />
        <span className="ms-2 text-success">Carregando localização...</span>
      </div>
    );
  }

  if (!ponto) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="spinner-border"
          role="status"
          style={{ color: "#2e7d32" }}
        />
        <span className="ms-2 text-success">Carregando pontos...</span>
      </div>
    );
  }

  if (!mapCenter) setMapCenter(userLocation);

  return (
    <section
      className="d-flex flex-column align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f1f8e9, #c8e6c9)",
        paddingTop: "60px",
        paddingBottom: "60px",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    >
      <div className="container">
        <h1
          className="mb-4 text-center"
          style={{ color: "#2e7d32", fontWeight: "700" }}
        >
          {trilha.nome}
        </h1>

        <div className="row g-3 mb-4">
          {[
            {
              label: "Dificuldade",
              value: trilha.dificuldade,
            },
            {
              label: "Duração",
              value: trilha.duracao,
            },
            {
              label: "Tags",
              value: trilha.tags.join(", "),
            },
          ].map(({ label, value }) => (
            <div key={label} className="col-12 col-md-4">
              <div
                className="card shadow border-0 h-100"
                style={{
                  borderRadius: "16px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div className="card-body text-center p-3">
                  <h5
                    className="card-title"
                    style={{ color: "#2e7d32", fontWeight: "600" }}
                  >
                    {label}
                  </h5>
                  <p className="card-text text-muted mb-0">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label
            htmlFor="mapTypeSelect"
            className="form-label fw-bold"
            style={{ color: "#2e7d32" }}
          >
            Tipo de mapa:
          </label>
          <select
            id="mapTypeSelect"
            className="form-select"
            value={mapType}
            onChange={(e) => setMapType(e.target.value)}
            style={{ borderRadius: "12px" }}
          >
            <option value="standard">Padrão</option>
            <option value="satellite">Satélite</option>
          </select>
        </div>

        <div
          className="mb-5"
          style={{ borderRadius: "12px", overflow: "hidden" }}
        >
          <MapContainer
            center={centro}
            zoom={17}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url={tileLayerUrls[mapType].url}
              attribution={tileLayerUrls[mapType].attribution}
            />
            {pontosOrdenados.map((ponto) => {
              const liberado =
                visitados.includes(ponto.order) || ponto.order === pontoAtual;
              return (
                liberado && (
                  <Marker
                    key={ponto.id}
                    position={[ponto.latitude, ponto.longitude]}
                    icon={L.divIcon({
                      className: "",
                      html: ReactDOMServer.renderToString(
                        <BsGeoAltFill
                          size={30}
                          color={
                            ponto.order === pontoAtual ? "#2e7d32" : "#81c784"
                          }
                        />
                      ),
                      iconSize: [30, 30],
                      iconAnchor: [15, 30],
                    })}
                  >
                    <Popup>
                      <strong>{ponto.descricao}</strong>
                      <br />
                      {ponto.guia.descricao}
                      <br />
                      <small>Ordem: {ponto.order}</small>
                    </Popup>
                  </Marker>
                )
              );
            })}

            {userLocation && (
              <>
                <Marker
                  position={userLocation}
                  icon={L.divIcon({
                    className: "",
                    html: ReactDOMServer.renderToString(
                      <BsFillGeoFill size={30} color="#b03a2e" />
                    ),
                    iconSize: [30, 30],
                    iconAnchor: [15, 30],
                  })}
                >
                  <Popup>Sua localização atual</Popup>
                </Marker>
                <Circle
                  center={userLocation}
                  radius={2}
                  pathOptions={{ color: "#b03a2e" }}
                />
              </>
            )}

            <RecenterMap center={mapCenter || centro} />
          </MapContainer>
        </div>

        {mostrarPontoAtual && (
          <div
            className="alert alert-success text-center"
            role="alert"
            style={{
              borderRadius: "12px",
              fontWeight: "600",
              backgroundColor: "#dcedc8",
              color: "#33691e",
            }}
          >
            <p>
              Você está no ponto <strong>{pontoAtual}</strong>:{" "}
              {ponto.descricao}
            </p>
            <button
              className="btn btn-outline-success"
              onClick={irParaProximoPonto}
            >
              Ir para próximo ponto
            </button>
          </div>
        )}

        <button
          onClick={() => {
            if (userLocation) setMapCenter(userLocation);
          }}
          title="Centralizar mapa na minha localização"
        >
          Centralizar no meu local
        </button>

        <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
          <button
            className={`btn btn-sm ${
              usarPosicaoReal ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setUsarPosicaoReal(true)}
          >
            Usar GPS real
          </button>
          <button
            className={`btn btn-sm ${
              !usarPosicaoReal ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setUsarPosicaoReal(false)}
          >
            Usar posição fixa
          </button>
        </div>
      </div>
    </section>
  );
};


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

export default TrilhaPage;

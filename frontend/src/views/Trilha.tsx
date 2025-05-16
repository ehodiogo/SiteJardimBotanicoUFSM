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
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-2">Carregando trilha...</span>
      </div>
    );
  }

  if (!userLocation) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-2">Carregando localização...</span>
      </div>
    );
  }

  if (!ponto) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-2">Carregando pontos...</span>
      </div>
    );
  }

  console.log("Distancias:", visitados);
  console.log(
    "Distancia usuario proximo ponto:",
    calcularDistancia(
      userLocation[0],
      userLocation[1],
      ponto.latitude,
      ponto.longitude
    )
  );

  return (
    <div className="container py-4">
      <h1 className="mb-4">{trilha.nome}</h1>

      <div className="row mb-3">
        <div className="col-md-4">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h5 className="card-title">Dificuldade</h5>
              <p className="card-text">{trilha.dificuldade}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h5 className="card-title">Duração</h5>
              <p className="card-text">{trilha.duracao}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h5 className="card-title">Tags</h5>
              <p className="card-text">{trilha.tags.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 mb-4">
        <label className="form-label">Tipo de mapa:</label>
        <select
          className="form-select"
          value={mapType}
          onChange={(e) => setMapType(e.target.value)}
        >
          <option value="standard">Padrão</option>
          <option value="satellite">Satélite</option>
        </select>
      </div>

      <div className="mb-5" style={{ position: "relative" }}>
        <MapContainer
          center={centro}
          zoom={17}
          style={{ height: "500px", width: "100%" }}
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
                        color={ponto.order === pontoAtual ? "green" : "blue"}
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
                    <BsFillGeoFill size={30} color="red" />
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
                pathOptions={{ color: "red" }}
              />
            </>
          )}
        </MapContainer>

        {mostrarPontoAtual && ponto && (
          <div
            style={{
              position: "fixed",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              maxWidth: 400,
              width: "90%",
              zIndex: 9999,
              textAlign: "center",
            }}
          >
            <img
              src={ponto.imagem}
              alt={`Imagem do ponto ${ponto.order}`}
              style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
            />
            <p>Imagem url: {ponto.imagem}</p>
            <p>{ponto.descricao}</p>
            <button
              className="btn btn-primary"
              onClick={irParaProximoPonto}
              style={{ marginTop: 10 }}
            >
              Ir para o próximo ponto
            </button>
          </div>
        )}
      </div>

      <div>
        <button onClick={() => setUsarPosicaoReal((prev) => !prev)}>
          {usarPosicaoReal ? "Usar Posição Mockada" : "Usar Posição Real"}
        </button>

      </div>
    </div>
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

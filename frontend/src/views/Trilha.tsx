import { useParams } from "react-router-dom";
import "../css/Trilha.css"; // Importa o CSS atualizado
import { useState, useEffect, useMemo, useCallback } from "react"; // Adicionado useCallback
import { Ponto, Trilha } from "../types/Trilha"; // Ajuste o caminho
import { getAllData } from "../services/Api"; // Ajuste o caminho
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { BsFillGeoFill, BsGeoAltFill } from "react-icons/bs";
import ReactDOMServer from "react-dom/server";
import { falarTexto } from "../functions/Fala"; // Ajuste o caminho
import calcularDistancia from "../functions/Distancia";
import { FaMapMarkerAlt, FaClock, FaTags, FaTree } from "react-icons/fa"; // Ícones para os cards de info

const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 17, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

const TrilhaPage: React.FC = () => {
  const [usarPosicaoReal, setUsarPosicaoReal] = useState(true);
  const [usarPosicaoProxima, setUsarPosicaoProxima] = useState(false);
  const [trilha, setTrilha] = useState<Trilha | null>(null); // Pode ser null
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [mapType, setMapType] = useState("satellite");
  const [pontoAtualOrder, setPontoAtualOrder] = useState(1); // Renomeado para clareza
  const [visitados, setVisitados] = useState<number[]>([]);
  const [mostrarPontoAtualInfo, setMostrarPontoAtualInfo] = useState(false); // Renomeado para clareza
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  const { id } = useParams<{ id: string }>(); // Tipar useParams

  useEffect(() => {
    getAllData<Trilha>(`trilhas/${id}`).then((res) => {
      setTrilha(res);
    })
    if (usarPosicaoReal) {
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (pos) => {
            setUserLocation([pos.coords.latitude, pos.coords.longitude]);
          },
          (err) => console.warn("Erro ao obter localização:", err),
          { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 } // Adicionar opções
        );
        return () => navigator.geolocation.clearWatch(watchId); // Limpar watchPosition
      }
    } else {
      // Posições fixas para teste
      if (usarPosicaoProxima) {
        setUserLocation([-29.716781667616758, -53.729607756572]); // Próximo ao ponto 1
      } else {
        setUserLocation([-29.716895283302495, -53.729593828291925]); // Posição fixa inicial
      }
    }
  }, [id, usarPosicaoReal, usarPosicaoProxima]);

  const pontosOrdenados = useMemo(() => {
    if (!trilha?.pontos) return [];
    return [...trilha.pontos].sort((a, b) => a.order - b.order);
  }, [trilha?.pontos]);

  // Encontrar o ponto atual com base na ordem
  const pontoAtualObj = useMemo(() => {
    return pontosOrdenados.find((p) => p.order === pontoAtualOrder);
  }, [pontosOrdenados, pontoAtualOrder]);

  const mostrarProximoPasso = useCallback(
    (ponto: Ponto, distancia: number): string | null => {
      if (
        distancia > 3 &&
        distancia <= 15 &&
        ponto.guia &&
        typeof ponto.guia.proximo_passo === "string"
      ) {
        return ponto.guia.proximo_passo;
      }
      return null;
    },
    []
  );

  useEffect(() => {
    if (!userLocation || !trilha || !pontoAtualObj) return;

    const distancia = calcularDistancia(
      userLocation[0],
      userLocation[1],
      pontoAtualObj.latitude,
      pontoAtualObj.longitude
    );

    console.log(`Distância ao ponto ${pontoAtualObj.order}:`, distancia);

    if (distancia <= 3 && !visitados.includes(pontoAtualObj.order)) {
      falarTexto(pontoAtualObj.descricao);
      falarTexto(pontoAtualObj.guia.descricao);
      setVisitados((prev) => [...prev, pontoAtualObj.order]);
      setMostrarPontoAtualInfo(true); // Mostrar informações do ponto atual
    }

    const msg = mostrarProximoPasso(pontoAtualObj, distancia);
    if (msg) {
      falarTexto(msg);
    }
  }, [
    userLocation,
    pontoAtualOrder,
    visitados,
    trilha,
    pontoAtualObj,
    mostrarProximoPasso,
  ]);

  const irParaProximoPonto = () => {
    setPontoAtualOrder((prev) => prev + 1);
    setMostrarPontoAtualInfo(false); // Esconder info do ponto atual ao ir para o próximo
  };

  // Definir o centro inicial do mapa e atualizá-lo quando a localização do usuário estiver disponível
  useEffect(() => {
    if (userLocation && !mapCenter) {
      setMapCenter(userLocation);
    } else if (!userLocation && pontosOrdenados.length > 0) {
      // Se não tem localização do usuário, centraliza no primeiro ponto da trilha
      setMapCenter([pontosOrdenados[0].latitude, pontosOrdenados[0].longitude]);
    }
  }, [userLocation, mapCenter, pontosOrdenados]);

  const renderLoading = (message: string) => (
    <div className="loading-state">
      <div
        className="spinner-border"
        role="status"
        style={{ color: "#4CAF50" }}
      />
      <span className="ms-2 text-success">{message}</span>
    </div>
  );

  if (!trilha) return renderLoading("Carregando trilha...");
  if (!userLocation && usarPosicaoReal)
    return renderLoading("Aguardando sua localização GPS...");
  if (!pontoAtualObj && pontosOrdenados.length > 0)
    return renderLoading("Carregando pontos da trilha...");
  if (pontosOrdenados.length === 0)
    return renderLoading("Nenhum ponto encontrado para esta trilha."); // Caso não haja pontos na trilha

  return (
    <section className="trilha-page-container">
      <div className="container content-wrapper">
        <h1 className="trilhas-main-title">{trilha.nome}</h1>

        <div className="info-cards-grid mb-5">
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h5 className="info-label">Dificuldade</h5>
            <p className="info-value">{trilha.dificuldade}</p>
          </div>
          <div className="info-card">
            <FaClock className="info-icon" />
            <h5 className="info-label">Duração Estimada</h5>
            <p className="info-value">{trilha.duracao}</p>
          </div>
          <div className="info-card">
            <FaTags className="info-icon" />
            <h5 className="info-label">Tags</h5>
            <p className="info-value">{trilha.tags.join(", ")}</p>
          </div>
        </div>

        <div className="map-controls-section mb-4">
          <label htmlFor="mapTypeSelect" className="form-label-custom">
            Tipo de mapa:
          </label>
          <select
            id="mapTypeSelect"
            className="form-select-custom"
            value={mapType}
            onChange={(e) => setMapType(e.target.value)}
          >
            <option value="standard">Padrão</option>
            <option value="satellite">Satélite</option>
          </select>
        </div>

        <div className="map-container-wrapper mb-5">
          <MapContainer
            center={mapCenter || [-29.716895, -53.729593]} // Fallback center
            zoom={17}
            className="leaflet-map-custom"
          >
            <TileLayer
              url={tileLayerUrls[mapType].url}
              attribution={tileLayerUrls[mapType].attribution}
            />

            {/* Marcadores dos pontos da trilha */}
            {pontosOrdenados.map((ponto) => {
              const liberado =
                visitados.includes(ponto.order) ||
                ponto.order === pontoAtualOrder;
              return (
                liberado && (
                  <Marker
                    key={ponto.id}
                    position={[ponto.latitude, ponto.longitude]}
                    icon={L.divIcon({
                      className: "custom-marker-icon",
                      html: ReactDOMServer.renderToString(
                        <BsGeoAltFill
                          size={30}
                          color={
                            ponto.order === pontoAtualOrder
                              ? "#E91E63"
                              : "#66BB6A"
                          } // Rosa para ponto atual, verde para visitado
                        />
                      ),
                      iconSize: [30, 30],
                      iconAnchor: [15, 30],
                    })}
                  >
                    <Popup>
                      <strong>
                        Ponto {ponto.order}: {ponto.descricao}
                      </strong>
                      <br />
                      Guia: {ponto.guia.descricao}
                    </Popup>
                  </Marker>
                )
              );
            })}

            {/* Marcador da localização do usuário */}
            {userLocation && (
              <>
                <Marker
                  position={userLocation}
                  icon={L.divIcon({
                    className: "user-location-marker",
                    html: ReactDOMServer.renderToString(
                      <BsFillGeoFill size={30} color="#007bff" />
                    ),
                    iconSize: [30, 30],
                    iconAnchor: [15, 30],
                  })}
                >
                  <Popup>Sua localização atual</Popup>
                </Marker>
                <Circle
                  center={userLocation}
                  radius={2} // Raio pequeno para precisão visual
                  pathOptions={{ color: "#007bff", fillOpacity: 0.5 }} // Cor azul
                />
              </>
            )}

            {mapCenter && <RecenterMap center={mapCenter} />}
          </MapContainer>
        </div>

        {/* Informações do Ponto Atual e Botão Próximo */}
        {mostrarPontoAtualInfo && pontoAtualObj && (
          <div className="current-point-info-card status-message success-message">
            <h3 className="point-title">
              Você está no Ponto {pontoAtualObj.order}!
            </h3>
            <p className="point-description">{pontoAtualObj.descricao}</p>
            {pontoAtualObj.imagem && (
              <div className="point-image-wrapper">
                <img
                  src={pontoAtualObj.imagem}
                  alt={`Imagem do ponto ${pontoAtualObj.order}`}
                  className="point-image"
                />
              </div>
            )}
            <button className="btn-next-point" onClick={irParaProximoPonto}>
              Próximo Ponto <FaTree className="btn-icon" />
            </button>
          </div>
        )}

        <div className="map-action-buttons-group">
          <button
            className="action-button primary-action"
            onClick={() => {
              if (userLocation) setMapCenter(userLocation);
            }}
            title="Centralizar mapa na minha localização"
          >
            <BsFillGeoFill /> Centralizar no meu local
          </button>
        </div>

        <div className="debug-buttons-group">
          <button
            className={`debug-button ${usarPosicaoReal ? "active" : ""}`}
            onClick={() => {
              setUsarPosicaoReal(true);
              setUsarPosicaoProxima(false);
            }}
          >
            Usar GPS real
          </button>
          <button
            className={`debug-button ${
              !usarPosicaoReal && !usarPosicaoProxima ? "active" : ""
            }`}
            onClick={() => {
              setUsarPosicaoReal(false);
              setUsarPosicaoProxima(false);
            }}
          >
            Usar posição fixa
          </button>
          <button
            className={`debug-button ${usarPosicaoProxima ? "active" : ""}`}
            onClick={() => {
              setUsarPosicaoProxima(true);
              setUsarPosicaoReal(false);
            }}
          >
            Usar posição próxima
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
      '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
  },
};

export default TrilhaPage;

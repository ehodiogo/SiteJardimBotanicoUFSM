import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Trilha = () => {
  const trilha: LatLngTuple[] = [
    [-29.717055079683693, -53.72934471436021],
    [-29.717082505146156, -53.729615368601664],
    [-29.717035495714047, -53.730445375105],
    [-29.717372412616157, -53.7299446634828],
    [-29.71781118980265, -53.730445375520546],
    [-29.717889535454184, -53.728961274975845],
    [-29.718477182261125, -53.72883946943917],
    [-29.718026636357354, -53.7277748878039],
  ];

  const pontoInicial = trilha[0];
  const pontoFinal = trilha[trilha.length - 1];

  return (
    <MapContainer
      center={[-29.716718342256012, -53.7292405815829]}
      zoom={100}
      style={{ height: '100vh' }}
      key={Date.now()}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Polyline positions={trilha} pathOptions={{ color: 'red', weight: 6 }} />

      <Marker position={pontoInicial}>
        <Popup>Início da Trilha</Popup>
      </Marker>

      <Marker position={pontoFinal}>
        <Popup>Fim da Trilha</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Trilha;

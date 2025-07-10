import React, { useState, useRef, useEffect } from "react";
import { FaCamera, FaSyncAlt } from "react-icons/fa";
import "../css/BotanicalSiteLayout.css";

type BotanicalSiteLayoutProps = object;

const mascoteActualPath = "/Jerivaldo.png";

const currentMascotGreeting = "Seja bem-vindo ao Jardim Botânico da UFSM!";
const currentCameraPrompt =
  "Viu algo interessante? Ative a câmera clicando no ícone abaixo e leia o QR code para mais informações!";

const welcomeTitlePart1 = "Bem-vindo ao";
const welcomeTitlePart2 = "Jardim Botânico";
const welcomeDescription =
  "O nosso espaço busca proporcionar aos visitantes contato com a natureza atrelado ao conhecimento. O jardim oferece visitas guiadas, tour pelas plantas carnívoras, passeio pelo telhado verde, visita ao jardim sensorial, exposição de animais taxidermizados e muito mais!";

const BotanicalSiteLayout: React.FC<BotanicalSiteLayoutProps> = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobile) return; 

    async function getVideoDevices() {
      try {
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = allDevices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        setCameraError("Erro ao listar dispositivos de vídeo.");
        console.error(error);
      }
    }
    getVideoDevices();
  }, [selectedDeviceId, isMobile]);

  useEffect(() => {
    const startCamera = async () => {
      setCameraError(null);

      if (!showCamera) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
          console.log("Câmera parada");
        }
        return;
      }

      const constraints = isMobile
        ? { video: { facingMode } }
        : selectedDeviceId
        ? { video: { deviceId: { exact: selectedDeviceId } } }
        : { video: true };

      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          console.log("Câmera iniciada");
        }
      } catch (err: unknown) {
        console.error("Erro ao acessar a câmera:", err);
        if (err instanceof Error) {
          if (err.name === "NotAllowedError") {
            setCameraError(
              "Você negou a permissão para acessar a câmera. Por favor, habilite nas configurações do seu navegador."
            );
          } else if (err.name === "NotFoundError") {
            setCameraError("Nenhuma câmera foi encontrada no seu dispositivo.");
          } else {
            setCameraError(`Erro ao acessar a câmera: ${err.message}`);
          }
        } else {
          setCameraError(
            "Ocorreu um erro desconhecido ao tentar acessar a câmera."
          );
        }
        setShowCamera(false);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        console.log("Câmera parada");
      }
    };
  }, [showCamera, selectedDeviceId, facingMode, isMobile]);

  const switchCamera = () => {
    if (isMobile) {
      setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    } else {
      if (devices.length < 2) return;

      const currentIndex = devices.findIndex(
        (device) => device.deviceId === selectedDeviceId
      );
      const nextIndex = (currentIndex + 1) % devices.length;
      setSelectedDeviceId(devices[nextIndex].deviceId);
    }
  };

  return (
    <div className="botanical-site-background">
      <div className="botanical-content-grid">
        <div className="welcome-text-column">
          <h1 className="welcome-title-part1">{welcomeTitlePart1}</h1>
          <h2 className="welcome-title-part2">{welcomeTitlePart2}</h2>
          <p className="welcome-description">{welcomeDescription}</p>
        </div>

        <div className="mascot-area-column">
          <div className="mascot-main-panel">
            <img
              src={mascoteActualPath}
              alt="Mascote Jerivaldo"
              className="mascot-image-actual"
            />
            <p className="mascot-greeting">{currentMascotGreeting}</p>
          </div>

          <div className="qr-scan-area">
            {!showCamera && (
              <p className="camera-prompt">{currentCameraPrompt}</p>
            )}

            <button
              className="qr-scan-button"
              onClick={() => setShowCamera((prev) => !prev)}
            >
              <FaCamera />
              <span>{showCamera ? "Fechar Câmera" : "Ativar Câmera"}</span>
            </button>
          </div>

          {showCamera && (
            <div
              className="camera-view-container-themed"
              style={{ position: "relative" }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: "100%", borderRadius: 10 }}
              />

              {(devices.length > 1 || isMobile) && (
                <button
                  onClick={switchCamera}
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    padding: "8px 12px",
                    borderRadius: "25px",
                    border: "none",
                    backgroundColor: "#3a5a40",
                    color: "#fff",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: "600",
                  }}
                  aria-label="Trocar câmera"
                  title="Trocar câmera"
                >
                  <FaSyncAlt />
                  Trocar câmera
                </button>
              )}
            </div>
          )}

          {cameraError && (
            <div className="error-message-themed" role="alert">
              {cameraError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotanicalSiteLayout;

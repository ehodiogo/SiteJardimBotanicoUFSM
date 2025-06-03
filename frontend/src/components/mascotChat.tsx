import React, { useState, useRef, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
const mascoteActualPath = "/Jerivaldo.png";

const currentMascotGreeting = "Seja bem-vindo ao Jardim Botânico da UFSM!";
const currentCameraPrompt =
  "Viu algo interessante? Ative a câmera clicando no ícone abaixo e leia o QR code para mais informações!";

const welcomeTitlePart1 = "Bem-vindo ao";
const welcomeTitlePart2 = "Jardim Botânico";
const welcomeDescription =
  "Um refúgio de biodiversidade e beleza natural, onde você pode se conectar com a natureza e descobrir a riqueza da flora brasileira.";

const BotanicalSiteLayout: React.FC = () => {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleOpenCamera = async () => {
    setCameraError(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setShowCamera(true);
      } catch (err) {
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
    } else {
      setCameraError("Seu navegador não suporta acesso à câmera.");
      setShowCamera(false);
    }
  };

  const handleCloseCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
    setCameraError(null);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <>
      <style>
        {`
          .botanical-site-background {
            background-color: #f7f9f4; 
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px; /* Adicionado padding geral */
            font-family: 'Georgia', serif; 
          }

          .botanical-content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr; 
            gap: 60px; 
            max-width: 1100px; 
            width: 100%;
            align-items: center; 
          }

          .welcome-text-column h1 {
            font-size: 2.2em; 
            color: #774936; 
            font-weight: normal;
            margin-bottom: 0;
          }

          .welcome-text-column h2 {
            font-size: 3.8em; 
            color: #3a5a40; 
            font-weight: bold;
            margin-top: -10px; 
            margin-bottom: 20px;
          }

          .welcome-text-column p {
            font-size: 1.1em;
            color: #5c5c5c; 
            line-height: 1.6;
            max-width: 400px; 
          }

          .mascot-area-column {
            display: flex;
            flex-direction: column;
            align-items: center; 
          }

          .mascot-main-panel {
            background-color: #e8e6e1; 
            border-radius: 25px;
            padding: 30px;
            width: 100%;
            max-width: 420px; 
            min-height: 380px; 
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            box-shadow: 0 0 0 10px #fff, 0 5px 15px rgba(0,0,0,0.07); 
            /* Removido position: relative; pois o mascot-side-bubble foi removido */
          }
          
          .mascot-main-panel .mascot-image-actual {
            max-width: 70%; /* Ajustado para dar mais espaço à mensagem */
            max-height: 220px; /* Ajustado */
            height: auto;
            margin-bottom: 20px; /* Aumentado espaço */
          }

          /* .mascot-side-bubble e .mascot-placeholder-icon foram removidos */
          /* .mascot-main-panel p.mascot-status foi removido */

          .qr-scan-area {
            margin-top: 25px;
            display: flex;
            flex-direction: column; 
            align-items: center;
            cursor: pointer;
            color: #3a5a40; 
          }
          
          .qr-scan-button { 
            display: flex;
            align-items: center;
            padding: 10px 15px;
            border: 1px solid #d0d0d0;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            transition: background-color 0.2s;
          }
          .qr-scan-button:hover {
            background-color: #f0f0f0;
          }
          .qr-scan-button svg { 
            margin-right: 8px;
            font-size: 1.5em; 
          }
          .qr-scan-button span {
            font-size: 1em;
            font-weight: 500;
          }

          .mascot-interaction-texts { 
            margin-top: 15px;
            text-align: center;
            max-width: 350px;
          }
          .mascot-interaction-texts .greeting {
            font-size: 1em;
            color: #333;
            font-weight: bold;
            margin-bottom: 10px; /* Aumentado espaço */
          }
          .mascot-interaction-texts .prompt {
            font-size: 0.9em;
            color: #555;
            line-height: 1.4; /* Melhorado espaçamento de linha */
          }

          .camera-view-container-themed {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #222; 
            text-align: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px; 
          }

          .camera-view-container-themed video {
            width: 100%;
            height: auto;
            border-radius: 6px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
          .camera-view-container-themed button {
            margin-top:10px;
            background-color: #c82333; 
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
          }
          .camera-view-container-themed button:hover {
            background-color: #bd2130;
          }

          .error-message-themed {
            background-color: #f8d7da;
            color: #721c24;
            padding: 10px 15px;
            border: 1px solid #f5c6cb;
            border-radius: 8px;
            margin-top: 15px;
            text-align: center;
            width: 100%;
            max-width: 400px;
          }

          @media (max-width: 992px) {
            .botanical-content-grid {
              grid-template-columns: 1fr; 
              gap: 40px;
              text-align: center; 
            }
            .welcome-text-column p {
              margin-left: auto;
              margin-right: auto;
            }
            /* .mascot-side-bubble e ::before já foram removidos */
          }
          @media (max-width: 480px) {
            .welcome-text-column h1 { font-size: 1.8em; }
            .welcome-text-column h2 { font-size: 2.8em; }
            .mascot-main-panel { min-height: auto; padding: 25px; } /* Altura automática e padding ajustado */
            .mascot-main-panel .mascot-image-actual { max-height: 180px; }
          }
        `}
      </style>

      <div className="botanical-site-background">
        <div className="botanical-content-grid">
          <div className="welcome-text-column">
            <h1>{welcomeTitlePart1}</h1>
            <h2>{welcomeTitlePart2}</h2>
            <p>{welcomeDescription}</p>
          </div>

          <div className="mascot-area-column">
            <div className="mascot-main-panel">
              <img
                src={mascoteActualPath}
                alt="Mascote Jerivaldo"
                className="mascot-image-actual"
              />
              <div className="mascot-interaction-texts">
                <p className="greeting">{currentMascotGreeting}</p>
              </div>
            </div>

            <div
              className="qr-scan-area"
              onClick={!showCamera ? handleOpenCamera : undefined}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && !showCamera && handleOpenCamera()
              }
            >
              {!showCamera && (
                <div className="mascot-interaction-texts">
                  <p className="prompt">{currentCameraPrompt}</p>
                </div>
              )}
            </div>
            <div className="qr-scan-button">
              <FaCamera />
              <span>{showCamera ? "Câmera Ativa" : "Ativar Câmera"}</span>
            </div>

            {showCamera && (
              <div className="camera-view-container-themed">
                <video ref={videoRef} autoPlay playsInline muted />
                <button onClick={handleCloseCamera}>Fechar Câmera</button>
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
    </>
  );
};

export default BotanicalSiteLayout;

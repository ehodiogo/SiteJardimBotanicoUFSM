import backgroundImage from "../../public/backgroundAgendamento.jpg";

const Agendamento = () => {
  return (
    <section
      className="agendamento-section"
      style={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 20px",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(139, 69, 19, 0.57)",
          zIndex: 1,
        }}
      ></div>

      <div
        className="text-center"
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          Venha explorar a natureza em toda sua exuberância
        </h1>
        <p style={{ fontSize: "1.2rem", marginTop: "20px" }}>
          Descubra a beleza e a diversidade do nosso Jardim Botânico. Um espaço
          de aprendizado, lazer e conexão com a natureza.
        </p>
        <a
          href="https://forms.gle/9GoPeqG27csYxWJ86"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success mt-4"
          style={{
            borderRadius: "50px",
            padding: "12px 30px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            backgroundColor: "#5a8f29",
          }}
        >
          Agende sua visita
        </a>
      </div>
    </section>
  );
};

export default Agendamento;

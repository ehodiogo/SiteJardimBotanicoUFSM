import React from "react";

const TelhadoVerde: React.FC = () => {
  return (
    <>
      <div style={{ height: "100vh", backgroundColor: "#c3debf" }}>
        <iframe
          src="https://sitejardimbotanicoufsm-unity.onrender.com/" // olhar o nome da build para evitar erros !!!!!!!!!!!!!!
          title="Telhado Verde"
          width="100%"
          height="100%"
          style={{ border: "none", marginTop: "40px" }}
        ></iframe>
      </div>
    </>
  );
};

export default TelhadoVerde;

import React, { useEffect, useState } from "react";
import { getAllData } from "../services/Api";
import Amostra from "../types/Amostra";
import { falarTexto } from "../functions/Fala";
import { useParams } from "react-router-dom";

const ExibirDado: React.FC = () => {
    const { id } = useParams();
    const [dado, setDado] = useState<Amostra>();

    console.log("ID:", id);

    useEffect(() => {
        getAllData<Amostra>("amostras/" + id, ).then((res) => {
        if (res) setDado(res);
        });
    }, [id]);

    return (
        <div style={{ padding: "40px" }}>
        <h1>Dado do Backend</h1>
        <ul>
            {dado && (
            <li key={dado.id}>
                <strong>{dado.nome_cientifico}</strong>: {dado.descricao}
                <button onClick={() => falarTexto(dado.descricao_acessivel)}>Falar</button>
            </li>
            )}
        </ul>
        </div>
  );    
};

export default ExibirDado;

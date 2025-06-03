import React, { useEffect, useState } from 'react';
import { getAllData } from '../services/Api';
import Amostra from '../types/Amostra';
import { falarTexto } from '../functions/Fala';

const ExibirDados: React.FC = () => {
  const [dados, setDados] = useState<Amostra[]>([]);

  useEffect(() => {
    getAllData<Amostra[]>('amostras').then((res) => {
      if (res) setDados(res);
    });
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <ul>
        {dados.map((item) => (
            console.log(item),
          <li key={item.id}>
            <strong>{item.nome_cientifico}</strong>: {item.descricao}
            <img src={item.imagem} alt={item.nome_cientifico} />
            <button onClick={() => falarTexto(item.descricao_acessivel)}>Falar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExibirDados;

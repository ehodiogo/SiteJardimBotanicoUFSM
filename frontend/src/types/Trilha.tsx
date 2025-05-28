export type Guia = {
  descricao: string;
  proximo_passo: string;
}

export type Ponto = {
  id: number;
  latitude: number;
  longitude: number;
  descricao: string;
  order: number;
  guia: Guia;
  imagem: string;
}

export type Trilha = {
  id: number;
  nome: string;
  pontos: Ponto[];
  duracao: string;
  dificuldade: number;
  tags: string[];
}

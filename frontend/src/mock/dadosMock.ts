import DadosCientificos from "../types/DadosCientificos";
import Planta from "../types/Planta";
import Fungo from "../types/Fungo";
import Animal from "../types/Animal";

const dadosCientificosPlanta: DadosCientificos = {
  id: "1",
  nomeCientifico: "Rosa rubiginosa",
  reino: "Plantae",
  filo: "Angiosperms",
  classe: "Dicotyledons",
  ordem: "Rosales",
  familia: "Rosaceae",
  genero: "Rosa",
  especie: "R. rubiginosa"
};

const dadosCientificosFungo: DadosCientificos = {
  id: "2",
  nomeCientifico: "Agaricus bisporus",
  reino: "Fungi",
  filo: "Basidiomycota",
  classe: "Agaricomycetes",
  ordem: "Agaricales",
  familia: "Agaricaceae",
  genero: "Agaricus",
  especie: "A. bisporus"
};

const dadosCientificosAnimal: DadosCientificos = {
  id: "3",
  nomeCientifico: "Panthera leo",
  reino: "Animalia",
  filo: "Chordata",
  classe: "Mammalia",
  ordem: "Carnivora",
  familia: "Felidae",
  genero: "Panthera",
  especie: "P. leo"
};

const plantas: Planta[] = [
  {
    id: "1",
    nome: "Rosa",
    grupo: "Flor",
    descricao: "Uma planta ornamental, muito apreciada por sua beleza e aroma.",
    descricaoAcessivel: "A rosa é uma flor que tem pétalas de cores variadas, como vermelho, branco e rosa. Ela tem um perfume doce e é comumente usada em buquês e jardins. Suas folhas são verdes e as flores são em forma de círculo com várias pétalas.",
    foto: "https://example.com/rosa.jpg",
    dadosCientificos: dadosCientificosPlanta
  },
  {
    id: "2",
    nome: "Cacto",
    grupo: "Suculenta",
    descricao: "Planta adaptada a ambientes secos, com espinhos ao invés de folhas.",
    descricaoAcessivel: "O cacto é uma planta que vive em locais secos e quentes. Em vez de folhas, ele tem espinhos que ajudam a proteger e conservar água. Sua superfície pode ser verde e é coberta por espinhos afiados.",
    foto: "https://example.com/cacto.jpg",
    dadosCientificos: dadosCientificosPlanta
  }
];

const fungos: Fungo[] = [
  {
    id: "1",
    nome: "Cogumelo Paris",
    descricao: "Fungo comestível, bastante utilizado na culinária.",
    descricaoAcessivel: "O cogumelo Paris tem uma cabeça redonda e lisa, de cor branca, com um caule também branco. Ele cresce em terrenos úmidos e é comumente usado em pratos como saladas e sopas.",
    foto: "https://example.com/cogumelo.jpg",
    dadosCientificos: dadosCientificosFungo
  },
  {
    id: "2",
    nome: "Shiitake",
    descricao: "Fungo medicinal e comestível, originário da Ásia.",
    descricaoAcessivel: "O shiitake tem uma cabeça marrom escura, com um formato arredondado e uma textura suave. Ele é muito usado na culinária asiática e é conhecido por suas propriedades medicinais.",
    foto: "https://example.com/shiitake.jpg",
    dadosCientificos: dadosCientificosFungo
  }
];

const animais: Animal[] = [
  {
    id: "1",
    nome: "Leão",
    descricao: "Um dos maiores felinos, conhecido por sua força e posição no topo da cadeia alimentar.",
    descricaoAcessivel: "O leão é um grande felino com uma juba característica que envolve sua cabeça. Ele tem um corpo musculoso e é de cor dourada. O leão é conhecido por ser um predador de topo nas savanas africanas.",
    foto: "https://example.com/leao.jpg",
    dadosCientificos: dadosCientificosAnimal
  },
  {
    id: "2",
    nome: "Elefante",
    descricao: "O maior animal terrestre, conhecido por sua memória e habilidades sociais.",
    descricaoAcessivel: "O elefante é um grande mamífero com pele cinza e grandes orelhas. Ele tem um tronco longo e pode pesar várias toneladas. Conhecido por sua inteligência, os elefantes vivem em grupos e são muito sociais.",
    foto: "https://example.com/elefante.jpg",
    dadosCientificos: dadosCientificosAnimal
  }
];

export { plantas, fungos, animais };

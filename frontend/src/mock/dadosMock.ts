import DadosCientificos from "../types/DadosCientificos";
import Funcionalidade from "../types/Funcionalidade";

const dadosCientificosAnimais: DadosCientificos[] = [
  {
    id: "1",
    nomeCientifico: "Vanellus chilensis",
    reino: "Animalia",
    filo: "Chordata",
    classe: "Aves",
    ordem: "Charadriiformes",
    familia: "Charadriidae",
    genero: "Vanellus",
    especie: "V. chilensis"
  },
  {
    id: "2",
    nomeCientifico: "Colaptes melanochloros",
    reino: "Animalia",
    filo: "Chordata",
    classe: "Aves",
    ordem: "Piciformes",
    familia: "Picidae",
    genero: "Colaptes",
    especie: "C. melanochloros"
  },
  {
    id: "3",
    nomeCientifico: "Lycalopex gymnocercus",
    reino: "Animalia",
    filo: "Chordata",
    classe: "Mammalia",
    ordem: "Carnivora",
    familia: "Canidae",
    genero: "Lycalopex",
    especie: "L. gymnocercus"
  },
  {
    id: "4",
    nomeCientifico: "Trachemys dorbigni",
    reino: "Animalia",
    filo: "Chordata",
    classe: "Reptilia",
    ordem: "Testudines",
    familia: "Emydidae",
    genero: "Trachemys",
    especie: "T. dorbigni"
  },
  {
    id: "5",
    nomeCientifico: "Caiman latirostris",
    reino: "Animalia",
    filo: "Chordata",
    classe: "Reptilia",
    ordem: "Crocodylia",
    familia: "Alligatoridae",
    genero: "Caiman",
    especie: "C. latirostris"
  },
  {
    id: "6",
    nomeCientifico: "Alouatta guariba",
    reino: "Animalia",
    filo: "Chordata",
    classe: "Mammalia",
    ordem: "Primates",
    familia: "Atelidae",
    genero: "Alouatta",
    especie: "A. guariba"
  },
  {
    id: "7",
    nomeCientifico: "Dasypus hybridus",
    reino: "Animalia",
    filo: "Chordata",
    classe: "Mammalia",
    ordem: "Cingulata",
    familia: "Dasypodidae",
    genero: "Dasypus",
    especie: "D. hybridus"
  },
  {
    id: "8",
    nomeCientifico: "Salvator merianae",
    reino: "Animalia",
    filo: "Chordata",
    classe: "Reptilia",
    ordem: "Squamata",
    familia: "Teiidae",
    genero: "Salvator",
    especie: "S. merianae"
  },
  {
    id: "9",
    nomeCientifico: "Athene cunicularia",
    reino: "Animalia",
    filo: "Chordata",
    classe: "Aves",
    ordem: "Strigiformes",
    familia: "Strigidae",
    genero: "Athene",
    especie: "A. cunicularia"
  },
  {
    id: "10",
    nomeCientifico: "Bothrops alternatus",
    reino: "Animalia",
    filo: "Chordata",
    classe: "Reptilia",
    ordem: "Squamata",
    familia: "Viperidae",
    genero: "Bothrops",
    especie: "B. alternatus"
  }, 
  {
    id: "11",
    nomeCientifico: "Amanita muscaria",
    reino: "Fungi",
    filo: "Basidiomycota",
    classe: "Agaricomycetes",
    ordem: "Agaricales",
    familia: "Amanitaceae",
    genero: "Amanita",
    especie: "A. muscaria",
  },
  {
    id: "12",
    nomeCientifico: "Cymatoderma caperatum",
    reino: "Fungi",
    filo: "Basidiomycota",
    classe: "Agaricomycetes",
    ordem: "Polyporales",
    familia: "Meruliaceae",
    genero: "Cymatoderma",
    especie: "C. caperatum",
  },
  {
    id: "13",
    nomeCientifico: "Cryptotrama asprata",
    reino: "Fungi",
    filo: "Basidiomycota",
    classe: "Agaricomycetes",
    ordem: "Agaricales",
    familia: "Physalacriaceae",
    genero: "Cryptotrama",
    especie: "C. asprata",
  },
  {
    id: "14",
    nomeCientifico: "Kusaghiporia talpae",
    reino: "Fungi",
    filo: "Basidiomycota",
    classe: "Agaricomycetes",
    ordem: "Polyporales",
    familia: "Polyporaceae",
    genero: "Kusaghiporia",
    especie: "K. talpae",
  },
  {
    id: "15",
    nomeCientifico: "Syagrus romanzoffiana",
    reino: "Plantae",
    filo: "Tracheophyta",
    classe: "Liliopsida",
    ordem: "Arecales",
    familia: "Arecaceae",
    genero: "Syagrus",
    especie: "S. romanzoffiana",
  },
  {
    id: "16",
    nomeCientifico: "Bauhinia variegata",
    reino: "Plantae",
    filo: "Tracheophyta",
    classe: "Magnoliopsida",
    ordem: "Fabales",
    familia: "Fabaceae",
    genero: "Bauhinia",
    especie: "B. variegata",
  },
  {
    id: "17",
    nomeCientifico: "Pinus sp.",
    reino: "Plantae",
    filo: "Tracheophyta",
    classe: "Pinopsida",
    ordem: "Pinales",
    familia: "Pinaceae",
    genero: "Pinus",
    especie: "P. sp.",
  },
  {
    id: "18",
    nomeCientifico: "Ochna serrulata",
    reino: "Plantae",
    filo: "Tracheophyta",
    classe: "Magnoliopsida",
    ordem: "Malpighiales",
    familia: "Ochnaceae",
    genero: "Ochna",
    especie: "O. serrulata",
  },
  {
    id: "19",
    nomeCientifico: "Eugenia micranta",
    reino: "Plantae",
    filo: "Tracheophyta",
    classe: "Magnoliopsida",
    ordem: "Myrtales",
    familia: "Myrtaceae",
    genero: "Eugenia",
    especie: "E. micranta",
  },
  {
    id: "20",
    nomeCientifico: "Chloroleucon tortum",
    reino: "Plantae",
    filo: "Tracheophyta",
    classe: "Magnoliopsida",
    ordem: "Fabales",
    familia: "Fabaceae",
    genero: "Chloroleucon",
    especie: "C. tortum",
  },
];

const funcionalidades: Funcionalidade[] = [
  {
    id: 1,
    tags: [
      "CONTROLE INSETOS",
      "VULNERÁVEL A PREDADORES",
      "MANUTENÇÃO DO ECOSSISTEMA",
    ],
  },
  {
    id: 2,
    tags: [
      "CONTROLE INSETOS",
      "ECOSSISTEMA DE FLORESTAS",
      "ALIMENTAÇÃO DE INSETOS",
    ],
  },
  {
    id: 3,
    tags: [
      "CAÇADOR DE ROEDORES",
      "ESPECIE DE PREDADOR",
      "ALIMENTAÇÃO DE OUTROS ANIMAIS",
    ],
  },
  {
    id: 4,
    tags: [
      "AQUÁTICO",
      "BIOLOGIA DE ÁGUA DOCE",
      "PROTEÇÃO DE ECOSSISTEMAS AQUÁTICOS",
    ],
  },
  {
    id: 5,
    tags: [
      "PREDADOR DE PEQUENOS ANIMAIS",
      "REGULAÇÃO DE POPULAÇÕES",
      "IMPORTÂNCIA NA CÂMARA ALIMENTAR",
    ],
  },
  {
    id: 6,
    tags: [
      "COMUNICAÇÃO",
      "ESPECIE AMEAÇADA",
      "HÁBITOS SOCIAIS",
    ],
  },
  {
    id: 7,
    tags: [
      "ESCAVADOR",
      "CONTROLADOR DE SOLO",
      "ALIMENTAÇÃO DE VEGETAIS",
    ],
  },
  {
    id: 8,
    tags: [
      "PREDADOR DE ROEDORES",
      "CONTROLADOR DE POPULAÇÕES",
      "REGULAÇÃO ECOLÓGICA",
    ],
  },
  {
    id: 9,
    tags: [
      "CAÇADOR DE INSETOS",
      "CONTROLADOR DE INFESTAÇÃO",
      "NÍVEL DE ALIMENTAÇÃO",
    ],
  },
  {
    id: 10,
    tags: [
      "VENENOSA",
      "PREDADOR",
      "APLICAÇÃO MEDICINAL",
    ],
  },
  {
    id: 11,
    tags: [
      "ALUCINÓGENO",
      "PESQUISA CIENTÍFICA",
      "CULTURA POPULAR",
    ],
  },
  {
    id: 12,
    tags: [
      "DECOMPOSITOR",
      "AJUDA NO CICLO DE NUTRIENTES",
      "ASSOCIADO A MADEIRA",
    ],
  },
  {
    id: 13,
    tags: [
      "DECOMPOSITOR",
      "CICLO DE NUTRIENTES",
      "MADEIRA EM DECOMPOSIÇÃO",
    ],
  },
  {
    id: 14,
    tags: [
      "DECOMPOSITOR",
      "ESPECIE RARA",
      "CICLO DE NUTRIENTES",
    ],
  },
  {
    id: 15,
    tags: [
      "PAISAGISMO",
      "ALIMENTAÇÃO DE ANIMAIS",
      "FRUTOS COMESTÍVEIS",
    ],
  },
  {
    id: 16,
    tags: [
      "PAISAGISMO",
      "ORNAMENTAL",
      "ESTÉTICA",
    ],
  },
  {
    id: 17,
    tags: [
      "REFLORESTAMENTO",
      "MADEIRA",
      "CONSTRUÇÃO",
    ],
  },
  {
    id: 18,
    tags: [
      "ORNAMENTAL",
      "ALIMENTO PARA FAUNA",
      "PESQUISA ECOLOGICA",
    ],
  },
  {
    id: 19,
    tags: [
      "FRUTOS COMESTÍVEIS",
      "ALIMENTO PARA FAUNA",
      "UTILIZAÇÃO EM MEDICINA POPULAR",
    ],
  },
  {
    id: 20,
    tags: [
      "PLANTAS MEDICINAIS",
      "CULTURA TRADICIONAL",
      "CAATINGA",
    ],
  },
];

// TODO: COLOCAR MAIS FOTOS!!! FALTANTES NOS DADOS 

const seres = {
  seres : [
      {
      id: "1",
      nome: "Quero-quero",
      grupo: "Ave",
      descricao: "Ave de campo com plumagem característica, conhecida por sua vocalização forte.",
      descricaoAcessivel: "O quero-quero é uma ave que tem penas brancas e pretas e é bastante barulhenta. Sua chamada pode ser ouvida à distância e é comum em áreas abertas.",
      foto: "/fotos/quero-quero.jpg",
      dadosCientificos: dadosCientificosAnimais[0],
      type: "Animal",
      funcionalidade: funcionalidades[0],
    },
    {
      id: "2",
      nome: "Pica-pau",
      grupo: "Ave",
      descricao: "Ave conhecida por seu comportamento de bater o bico nas árvores.",
      descricaoAcessivel: "O pica-pau é uma ave que tem uma língua longa para pegar insetos nas árvores. Ele é facilmente reconhecido pelo som de seu bico batendo nas árvores.",
      foto: "/fotos/Colaptes melanochloros.jpg",
      dadosCientificos: dadosCientificosAnimais[1],
      type: "Animal"
    },
    {
      id: "3",
      nome: "Graxaim",
      grupo: "Mamífero",
      descricao: "Canídeo de pequeno porte encontrado em habitats abertos da América do Sul.",
      descricaoAcessivel: "O graxaim é um mamífero que se parece com um pequeno lobo, com pelagem que varia do cinza ao castanho. Ele vive em áreas abertas e é conhecido por sua habilidade de caçar em grupo.",
      foto: "/fotos/guaixinim.jpg",
      dadosCientificos: dadosCientificosAnimais[2],
      type: "Animal"
    },
    {
      id: "4",
      nome: "Tigre-d’água",
      grupo: "Réptil",
      descricao: "Quelônio de água doce encontrado principalmente no sul do Brasil.",
      descricaoAcessivel: "O tigre-d'água é uma tartaruga com uma carapaça escura e uma cauda longa. É muito comum em áreas úmidas e pântanos.",
      foto: "/fotos/tigre-agua.jpg",
      dadosCientificos: dadosCientificosAnimais[3],
      type: "Animal"
    },
    {
      id: "5",
      nome: "Jacaré-do-papo amarelo",
      grupo: "Réptil",
      descricao: "Crocodiliano de médio porte que habita ambientes com vegetação densa.",
      descricaoAcessivel: "O jacaré-do-papo amarelo é um grande réptil com pele verde-escura e uma barriga amarela. Ele vive em pântanos e rios do Brasil.",
      foto: "/fotos/jacare-papo-amarelo.jpg",
      dadosCientificos: dadosCientificosAnimais[4],
      type: "Animal"
    },
    {
      id: "6",
      nome: "Bugio",
      grupo: "Mamífero",
      descricao: "Macaco conhecido pelo som alto e pela cauda preênsil.",
      descricaoAcessivel: "O bugio é um macaco de pelagem marrom que vive em árvores e emite sons altos para se comunicar com outros membros de sua espécie.",
      foto: "/fotos/Bugiu-Ruivo.jpg",
      dadosCientificos: dadosCientificosAnimais[5],
      type: "Animal"
    },
    {
      id: "7",
      nome: "Tatu molita",
      grupo: "Mamífero",
      descricao: "Tatu de pequeno porte, encontrado em áreas de vegetação densa.",
      descricaoAcessivel: "O tatu molita é um pequeno mamífero que tem uma carapaça dura e escavadora. Ele vive em tocas e se alimenta de pequenos animais e vegetais.",
      foto: "/fotos/Dasypus-hybridus-1.jpg",
      dadosCientificos: dadosCientificosAnimais[6],
      type: "Animal"
    },
    {
      id: "8",
      nome: "Teiú",
      grupo: "Réptil",
      descricao: "Maior lagarto do Rio Grande do Sul, conhecido por sua cauda longa.",
      descricaoAcessivel: "O teiú é um lagarto de grande porte que se alimenta de roedores e outros pequenos animais. Ele pode ser encontrado em áreas abertas e florestas.",
      foto: "/fotos/teiú.jpg",
      dadosCientificos: dadosCientificosAnimais[7],
      type: "Animal"
    },
    {
      id: "9",
      nome: "Corija buraqueira",
      grupo: "Ave",
      descricao: "Pequena ave que vive em buracos no solo, comum em áreas abertas.",
      descricaoAcessivel: "A corija buraqueira é uma ave de pequeno porte que faz seus ninhos em buracos no solo. Ela é encontrada em áreas de campo aberto.",
      foto: "/fotos/corija-buraqueira.jpg",
      dadosCientificos: dadosCientificosAnimais[8],
      type: "Animal"
    },
    {
      id: "10",
      nome: "Cruzeira",
      grupo: "Réptil",
      descricao: "Serpente peçonhenta com uma mordida potencialmente fatal.",
      descricaoAcessivel: "A cruzeira é uma serpente venenosa de grande porte. Sua mordida pode ser fatal se não tratada corretamente. Ela é encontrada em áreas de mata.",
      foto: "/fotos/cruzeira.jpg",
      dadosCientificos: dadosCientificosAnimais[9],
      type: "Animal"
    },
    {
      id: "11",
      nome: "Amanita muscaria",
      grupo: "Fungo",
      descricao:
        "Cogumelo vermelho com manchas brancas, frequentemente associado a mitos e cerimônias antigas.",
      descricaoAcessivel:
        "O Amanita muscaria é um cogumelo de cor vermelha com pintas brancas. Cresce embaixo de árvores e tem uma aparência chamativa.",
      foto: "/fotos/Amanita_muscaria.jpg",
      dadosCientificos: dadosCientificosAnimais[10],
      type: "Fungo",
    },
    {
      id: "12",
      nome: "Cymatoderma caperatum",
      grupo: "Fungo",
      descricao:
        "Fungo de formato semelhante a um funil, com textura coriácea e coloração marrom-dourada.",
      descricaoAcessivel:
        "O Cymatoderma caperatum tem formato de funil e cor marrom. Cresce em troncos e raízes de árvores mortas.",
      foto: "/fotos/cymatoderma_caperatum.jpg",
      dadosCientificos: dadosCientificosAnimais[11],
      type: "Fungo",
    },
    {
      id: "13",
      nome: "Cryptotrama asprata",
      grupo: "Fungo",
      descricao: "Cogumelo de coloração amarela brilhante, encontrado em madeira em decomposição.",
      descricaoAcessivel:
        "O Cryptotrama asprata é um cogumelo pequeno e amarelo que cresce em madeira podre.",
      foto: "/fotos/Cryptotrama_aspartata.jpg",
      dadosCientificos: dadosCientificosAnimais[12],
      type: "Fungo",
    },
    {
      id: "14",
      nome: "Kusaghiporia talpae",
      grupo: "Fungo",
      descricao:
        "Fungo raro da família Polyporaceae, encontrado em troncos caídos e raízes subterrâneas.",
      descricaoAcessivel:
        "O Kusaghiporia talpae cresce em troncos caídos e tem uma textura fibrosa.",
      foto: "/fotos/kusaghiporia_talpae.jpg",
      dadosCientificos: dadosCientificosAnimais[13],
      type: "Fungo",
    },
    {
      id: "15",
      nome: "Jerivá",
      grupo: "Planta",
      descricao:
        "Palmeira nativa do Brasil, muito usada no paisagismo e produção de frutos para alimentação animal.",
      descricaoAcessivel:
        "O Jerivá é uma palmeira alta com folhas longas e frutos pequenos alaranjados.",
      foto: "/fotos/Jerivaldo.png",
      dadosCientificos: dadosCientificosAnimais[14],
      type: "Planta",
    },
    {
      id: "16",
      nome: "Bauhinia variegata",
      grupo: "Planta",
      descricao: "Árvore ornamental com flores grandes e rosadas, usada no paisagismo.",
      descricaoAcessivel:
        "A Bauhinia variegata é uma árvore que tem flores rosas grandes e bonitas.",
      foto: "/fotos/bauhinia-variegata.jpg",
      dadosCientificos: dadosCientificosAnimais[15],
      type: "Planta",
    },
    {
      id: "17",
      nome: "Pinus",
      grupo: "Planta",
      descricao: "Gênero de árvores coníferas de grande porte, amplamente cultivadas no mundo.",
      descricaoAcessivel:
        "O Pinus é uma árvore alta com folhas em forma de agulha, comum em reflorestamentos.",
      foto: "/fotos/pinus.jpg",
      dadosCientificos: dadosCientificosAnimais[16],
      type: "Planta",
    },
    {
      id: "18",
      nome: "Ochna serrulata",
      grupo: "Planta",
      descricao:
        "Arbusto ornamental conhecido como 'árvore do Mickey' devido ao formato de seus frutos.",
      descricaoAcessivel:
        "A Ochna serrulata tem pequenas flores amarelas e frutos vermelhos.",
      foto: "/fotos/ochna-serrulata.jpg",
      dadosCientificos: dadosCientificosAnimais[17],
      type: "Planta",
    },
    {
      id: "19",
      nome: "Eugenia micranta",
      grupo: "Planta",
      descricao:
        "Pequena árvore frutífera da família das Myrtaceae, semelhante à pitanga.",
      descricaoAcessivel:
        "A Eugenia micranta tem folhas verdes e produz pequenos frutos comestíveis.",
      foto: "/fotos/Eugenia myrcianthes.jpg",
      dadosCientificos: dadosCientificosAnimais[18],
      type: "Planta",
    },
    {
      id: "20",
      nome: "Jurema",
      grupo: "Planta",
      descricao:
        "Árvore típica da caatinga brasileira, utilizada em práticas culturais e medicinais.",
      descricaoAcessivel:
        "A Jurema é uma árvore resistente com tronco retorcido e folhas pequenas.",
      foto: "/fotos/chloroleucon-tortum.jpg",
      dadosCientificos: dadosCientificosAnimais[19],
      type: "Planta",
    },
  ]
};


export default seres ;
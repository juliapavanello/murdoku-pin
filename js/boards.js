// Fonte de dados dos tabuleiros. Cada objeto descreve um "caso" completo:
// tamanho do grid, o layout inicial (pistas visuais), os cômodos, os suspeitos e o gabarito de resposta.

function celulasRetangulo(linhaInicio, colunaInicio, linhaFim, colunaFim) {
  const celulas = [];
  for (let linha = linhaInicio; linha <= linhaFim; linha++) {
    for (let coluna = colunaInicio; coluna <= colunaFim; coluna++) {
      celulas.push(`${linha}-${coluna}`);
    }
  }
  return celulas;
}

function todasCelulas(tamanho) {
  return celulasRetangulo(0, 0, tamanho - 1, tamanho - 1);
}

function celulasExceto(tamanho, ...grupos) {
  const removidas = new Set(grupos.flat());
  return todasCelulas(tamanho).filter((celula) => !removidas.has(celula));
}

const PASTA_FIGMA = "assets/icones/figma/";

const ICONES_FIGMA = {
  cadeira: `${PASTA_FIGMA}cadeira.svg`,
  caixaRegistradora: `${PASTA_FIGMA}caixa-registradora.svg`,
  estante: `${PASTA_FIGMA}estante.svg`,
  flores: `${PASTA_FIGMA}flores.svg`,
  mesa: `${PASTA_FIGMA}mesa.svg`,
  mesaDireita: `${PASTA_FIGMA}mesa-direita.svg`,
  mesaEsquerda: `${PASTA_FIGMA}mesa-esquerda.svg`,
  planta: `${PASTA_FIGMA}planta.svg`,
  tapeteAzulBaixo: `${PASTA_FIGMA}tapete-azul-baixo.svg`,
  tapeteAzulDobra: `${PASTA_FIGMA}tapete-azul-dobra.svg`,
  tapeteAzulLado: `${PASTA_FIGMA}tapete-azul-lado.svg`,
  cozinhaMesa: `${PASTA_FIGMA}cozinha-mesa.svg`,
  cozinhaMesaCanto: `${PASTA_FIGMA}cozinha-mesa-canto.svg`,
  cozinhaMesaDireita: `${PASTA_FIGMA}cozinha-mesa-direita.svg`,
  cozinhaMesaEsquerda: `${PASTA_FIGMA}cozinha-mesa-esquerda.svg`,
  cozinhaMesaMeio: `${PASTA_FIGMA}cozinha-mesa-meio.svg`,
  tapeteRosaDirBaixo: `${PASTA_FIGMA}tapete-rosa-dir-baixo.svg`,
  tapeteRosaDirCima: `${PASTA_FIGMA}tapete-rosa-dir-cima.svg`,
  tapeteRosaEsqBaixo: `${PASTA_FIGMA}tapete-rosa-esq-baixo.svg`,
  tapeteRosaEsqCima: `${PASTA_FIGMA}tapete-rosa-esq-cima.svg`,
  tapeteRosaMeioBaixo: `${PASTA_FIGMA}tapete-rosa-meio-baixo.svg`,
  tapeteRosaMeioCima: `${PASTA_FIGMA}tapete-rosa-meio-cima.svg`,
  casamentoArvore: `${PASTA_FIGMA}casamento-arvore.svg`,
  pinturaCavalete: `${PASTA_FIGMA}pintura-cavalete.svg`,
  pinturaEstatua: `${PASTA_FIGMA}pintura-estatua.svg`,
  pinturaPedra: `${PASTA_FIGMA}pintura-pedra.svg`,
  poltronaBranca: `${PASTA_FIGMA}poltrona-branca.svg`,
  visitanteCamaBase: `${PASTA_FIGMA}visitante-cama-base.svg`,
  visitanteCamaCoberta: `${PASTA_FIGMA}visitante-cama-coberta.svg`,
  visitanteTv: `${PASTA_FIGMA}visitante-tv.svg`,
  vilaCactus: `${PASTA_FIGMA}vila-cactus.svg`,
  vilaCaixaRegistradora: `${PASTA_FIGMA}vila-caixa-registradora.svg`,
  vilaCamaBase: `${PASTA_FIGMA}vila-cama-base.svg`,
  vilaCamaCoberta: `${PASTA_FIGMA}vila-cama-coberta.svg`,
  vilaCavalo: `${PASTA_FIGMA}vila-cavalo.svg`,
  vilaCofre: `${PASTA_FIGMA}vila-cofre.svg`,
  vilaFimMesa: `${PASTA_FIGMA}vila-fim-mesa.svg`,
  vilaMesa: `${PASTA_FIGMA}vila-mesa.svg`,
  vilaMesaDireita: `${PASTA_FIGMA}vila-mesa-direita.svg`,
  vilaMesaEsquerda: `${PASTA_FIGMA}vila-mesa-esquerda.svg`,
  vilaMesaLado: `${PASTA_FIGMA}vila-mesa-lado.svg`,
  vilaMesaLadoBaixo: `${PASTA_FIGMA}vila-mesa-lado-baixo.svg`,
  vilaSacoDinheiro: `${PASTA_FIGMA}vila-saco-dinheiro.svg`,
};

const TABULEIROS = [
  {
    id: 1,
    nome: "O Chiqueiro",
    tamanho: 5, // 5x5
    dificuldade: "facil",

    // Layout inicial das células do grid.
    // Tipos aceitos: "vazio", "lama", "porco"
    gridInicial: [
      ["vazio", "vazio", "lama", "vazio", "vazio"],
      ["porco", "lama", "lama", "vazio", "lama"],
      ["vazio", "vazio", "vazio", "vazio", "vazio"],
      ["porco", "vazio", "porco", "vazio", "porco"],
      ["vazio", "vazio", "vazio", "vazio", "vazio"],
    ],

    // Cada tabuleiro define os próprios ícones. Tipos omitidos não exibem imagem.
    icones: {
      lama: "assets/icones/Lama.png",
      porco: "assets/icones/noto-v1_pig.png",
    },

    // Delimitação dos cômodos para aplicar as bordas pretas grossas.
    // As chaves de célula seguem o padrão "linha-coluna" (0-indexado).
    comodos: [
      {
        nome: "PÁTIO ENLAMEADO",
        cor: "#f2c879",
        rotulo: { left: 48, top: 57 },
        celulas: [
          "0-0", "0-1", "0-2", "0-3", "0-4",
          "1-0", "1-1", "1-2", "1-3", "1-4",
           "2-1", "2-2"
          
        ],
      },
      {
        nome: "PASTO",
        cor: "#f2c879",
        rotulo: { left: 35, top: 94 },
        celulas: ["2-0","3-0", "3-1","3-2", "4-0", "4-1", "4-2"],
      },
      {
        nome: "CHIQUEIRO",
        cor: "#e8b4a8",
        rotulo: { left: 82, top: 94 },
        corPorCelula: { "4-4": "#8a5a2e" },
        celulas: ["2-3","2-4", "3-3", "3-4", "4-3", "4-4"],
      },
    ],

    suspeitos: [
      { id: "andy", nome: "Andy", dica: "Ele estava no chiqueiro", foto: "assets/suspeitos/man_avatar.png" },
      { id: "brent", nome: "Brent", dica: "Ele não estava sobre uma poça de lama", foto: "assets/suspeitos/brent.png" },
      { id: "carissa", nome: "Carissa", dica: "Ela estava ao lado da mesa", foto: "assets/suspeitos/carissa.png" },
      { id: "dolores", nome: "Dolores", dica: "Ela estava no Pasto", foto: "assets/suspeitos/dolores.png" },
      { id: "eduardo", nome: "Eduardo", dica: "A Vítima. Ele estava sozinho com o assassino.", foto: "assets/suspeitos/eduardo.png", isVitima: true },
    ],

    // Resposta gabarito para a validação 
    solucaoMock: {
      "4-3": "carissa",
      "2-4": "andy",
      "0-0": "brent",
      "3-1": "dolores",
      "1-2": "eduardo",
    },
  },
  {
    id: 2,
    nome: "O Clube Do Livro",
    tamanho: 6, // 6x6
    dificuldade: "facil",

    // Layout inicial das células do grid.
    // Tipos aceitos: "vazio", "estante", "planta", "tapete", "poltrona"
    gridInicial: [
      ["vazio", "estante", "planta", "vazio", "estante","estante"],
      ["estante", "tapetePontaEsquerda", "continua", "continua", "continua","tapetePontaDireita"],
      ["vazio", "poltrona", "vazio", "estante", "estante","vazio"],
      ["poltrona", "vazio", "tapetePontaCima", "vazio", "vazio","vazio"],
      ["poltrona", "tapetePontaEsquerda", "tapeteViraCima", "vazio", "tapetePontaEsquerda","mesaDeLado2"],
      ["mesa", "vazio", "poltrona", "planta", "mesa","mesaDeLado"],
    ],

    // Cada tabuleiro define os próprios ícones. Tipos omitidos não exibem imagem.
    icones: {
      estante: "assets/icones/estante.png",
      planta: "assets/icones/planta.png",
      tapete: "assets/icones/tapete.png",
      tapetePontaEsquerda: "assets/icones/tapete ponta esquerda.png",
      tapetePontaDireita: "assets/icones/tapete ponta direita.png",
      continua: "assets/icones/tepetemeio.png",
      tapetePontaCima: "assets/icones/tapete ponta cima.png",
      tapeteViraCima: "assets/icones/tapete vira cima.png",
      poltrona: "assets/icones/poltrona.png",
      mesa: "assets/icones/mesa.png",
      mesaDeLado: "assets/icones/mesa de canto.png",
      mesaDeLado2: "assets/icones/mesa de lado2.png",
    },

    // Delimitação dos cômodos para aplicar as bordas pretas grossas.
    // As chaves de célula seguem o padrão "linha-coluna" (0-indexado).
    comodos: [
      {
        nome: "Biblioteca",
        cor: "#A3ABD2",
        rotulo: { left: 48, top: 57 },
        celulas: [
          "0-0", "0-1", "0-2", "0-3", "0-4", "0-5",
          "1-0", "1-1", "1-2", "1-3", "1-4","1-5",
           "2-3", "2-4"
          
        ],
      },
      {
        nome: "Circulo de Discussão",
        cor: "#B1E2DE",
        rotulo: { left: 35, top: 94 },
        celulas: [
          "2-0","2-1", "2-2",
          "3-0", "3-1","3-2","3-3",
          "4-0", "4-1", "4-2","4-3",
          "5-0", "5-1", "5-2","5-3"
        ],
      },
      {
        nome: "Refresco",
        cor: "#EFD8F3",
        rotulo: { left: 82, top: 94 },
        celulas: ["2-5","3-4", "3-5", "4-4", "4-5", "5-4","5-5"],
      },
    ],

    suspeitos: [
  { id: "ada", nome: "Ada", dica: "Ela estava ao lado de uma planta.", foto: "assets/suspeitos/carissa.png" },
  { id: "brigitte", nome: "Brigitte", dica: "Ela estava ao sul de Cameron.", foto: "assets/suspeitos/dolores.png" },
  { id: "cameron", nome: "Cameron", dica: "Ela estava sobre um tapete.", foto: "assets/suspeitos/man_avatar.png" },
  { id: "darlene", nome: "Darlene", dica: "Ela era a única pessoa sentada numa cadeira.", foto: "assets/suspeitos/cameron.png" },
  { id: "edison", nome: "Edison", dica: "Ele estava na biblioteca. Ele não estava ao lado de uma estante", foto: "assets/suspeitos/brent.png" },
  { id: "vinita", nome: "Vinita", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/vinita.png", isVitima: true },
],

    // Resposta gabarito para a validação 
    solucaoMock: {
      "0-3": "ada",
      "5-1": "brigitte",
      "4-4": "cameron",
      "3-0": "darlene",
      "1-2": "edison",
      "2-5": "vinita",
    },
  },
  {
    id: 3,
    nome: "A Floricultura",
    tamanho: 7,
    dificuldade: "facil",

    gridInicial: [
      ["mesaEsquerda", "mesaDireita", "vazio", "estante", "vazio", "vazio", "vazio"],
      ["vazio", "cadeira", "vazio", "vazio", "tapeteAzulLado", "tapeteAzulDobra", "vazio"],
      ["flores", "vazio", "flores", "vazio", "vazio", "tapeteAzulBaixo", "estante"],
      ["flores", "vazio", "vazio", "vazio", "vazio", "vazio", "estante"],
      ["vazio", "vazio", "tapeteAzulBaixo", "flores", "caixaRegistradora", "vazio", "planta"],
      ["estante", "vazio", "tapeteAzulBaixo", "vazio", "mesa", "cadeira", "vazio"],
      ["flores", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
    ],

    icones: {
      cadeira: ICONES_FIGMA.cadeira,
      caixaRegistradora: ICONES_FIGMA.caixaRegistradora,
      estante: ICONES_FIGMA.estante,
      flores: ICONES_FIGMA.flores,
      mesa: ICONES_FIGMA.mesa,
      mesaDireita: ICONES_FIGMA.mesaDireita,
      mesaEsquerda: ICONES_FIGMA.mesaEsquerda,
      planta: ICONES_FIGMA.planta,
      tapeteAzulBaixo: ICONES_FIGMA.tapeteAzulBaixo,
      tapeteAzulDobra: ICONES_FIGMA.tapeteAzulDobra,
      tapeteAzulLado: ICONES_FIGMA.tapeteAzulLado,
    },

    comodos: [
      {
        nome: "OFICINA",
        cor: "#f4e3ee",
        rotulo: { left: 86, top: 42 },
        celulas: [
          ...celulasRetangulo(0, 0, 1, 6),
          ...celulasRetangulo(2, 4, 2, 6),
        ],
      },
      {
        nome: "ÁREA DE VENDAS",
        cor: "#ffd9f2",
        rotulo: { left: 30, top: 96 },
        celulas: celulasRetangulo(2, 0, 6, 3),
      },
      {
        nome: "CAIXA",
        cor: "#ffbde8",
        rotulo: { left: 82, top: 96 },
        celulas: celulasRetangulo(3, 4, 6, 6),
      },
    ],

    suspeitos: [
      { id: "amir", nome: "Amir", dica: "Ele estava ao lado de uma planta.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "bianca", nome: "Bianca", dica: "Ela estava na Oficina.", foto: "assets/suspeitos/dolores.png" },
      { id: "carly", nome: "Carly", dica: "Ela estava sobre um tapete.", foto: "assets/suspeitos/vinita.png" },
      { id: "diane", nome: "Diane", dica: "Ela estava sentada numa cadeira.", foto: "assets/suspeitos/cameron.png" },
      { id: "emmett", nome: "Emmett", dica: "Ele estava na primeira coluna.", foto: "assets/suspeitos/brent.png" },
      { id: "felicia", nome: "Felícia", dica: "Ela estava na Área de vendas. Havia um homem com ela.", foto: "assets/suspeitos/carissa.png" },
      { id: "vickie", nome: "Vickie", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/eduardo.png", isVitima: true },
    ],

    solucaoMock: {
      "4-5": "amir",
      "1-4": "bianca",
      "4-2": "carly",
      "5-5": "diane",
      "5-0": "emmett",
      "3-2": "felicia",
      "6-1": "vickie",
    },
  },
  {
    id: 4,
    nome: "Cozinha do Inferno",
    tamanho: 8,
    dificuldade: "medio",

    gridInicial: [
      ["cozinhaMesaCanto", "cozinhaMesaDireita", "vazio", "estante", "cozinhaMesa", "vazio", "cadeira", "vazio"],
      ["cozinhaMesaEsquerda", "tapeteRosaEsqCima", "tapeteRosaMeioCima", "tapeteRosaMeioCima", "tapeteRosaDirCima", "estante", "cozinhaMesa", "vazio"],
      ["vazio", "tapeteRosaEsqBaixo", "tapeteRosaMeioBaixo", "tapeteRosaMeioBaixo", "tapeteRosaDirBaixo", "vazio", "planta", "vazio"],
      ["vazio", "cozinhaMesaEsquerda", "cozinhaMesaMeio", "cozinhaMesaDireita", "vazio", "vazio", "vazio", "cadeira"],
      ["vazio", "estante", "vazio", "vazio", "planta", "cozinhaMesa", "cadeira", "vazio"],
      ["cozinhaMesaEsquerda", "cozinhaMesaDireita", "vazio", "cadeira", "vazio", "vazio", "cozinhaMesa", "cadeira"],
      ["vazio", "vazio", "cadeira", "cozinhaMesa", "vazio", "cadeira", "vazio", "tapeteRosaEsqCima"],
      ["tapeteRosaEsqCima", "tapeteRosaDirCima", "vazio", "vazio", "cadeira", "cozinhaMesa", "cadeira", "tapeteRosaEsqBaixo"],
    ],

    icones: {
      cadeira: ICONES_FIGMA.cadeira,
      cozinhaMesa: ICONES_FIGMA.cozinhaMesa,
      cozinhaMesaCanto: ICONES_FIGMA.cozinhaMesaCanto,
      cozinhaMesaDireita: ICONES_FIGMA.cozinhaMesaDireita,
      cozinhaMesaEsquerda: ICONES_FIGMA.cozinhaMesaEsquerda,
      cozinhaMesaMeio: ICONES_FIGMA.cozinhaMesaMeio,
      estante: ICONES_FIGMA.estante,
      planta: ICONES_FIGMA.planta,
      tapeteRosaDirBaixo: ICONES_FIGMA.tapeteRosaDirBaixo,
      tapeteRosaDirCima: ICONES_FIGMA.tapeteRosaDirCima,
      tapeteRosaEsqBaixo: ICONES_FIGMA.tapeteRosaEsqBaixo,
      tapeteRosaEsqCima: ICONES_FIGMA.tapeteRosaEsqCima,
      tapeteRosaMeioBaixo: ICONES_FIGMA.tapeteRosaMeioBaixo,
      tapeteRosaMeioCima: ICONES_FIGMA.tapeteRosaMeioCima,
    },

    comodos: [
      {
        nome: "COZINHA",
        cor: "#f7daa1",
        rotulo: { left: 30, top: 48 },
        celulas: celulasRetangulo(0, 0, 3, 4),
      },
      {
        nome: "BANHEIRO",
        cor: "#d99599",
        rotulo: { left: 76, top: 48 },
        celulas: celulasRetangulo(0, 5, 3, 7),
      },
      {
        nome: "RECEPÇÃO",
        cor: "#e8bcbc",
        rotulo: { left: 20, top: 96 },
        celulas: celulasRetangulo(4, 0, 7, 2),
      },
      {
        nome: "SALA DE JANTAR",
        cor: "#e6b8b8",
        rotulo: { left: 66, top: 96 },
        celulas: celulasRetangulo(4, 3, 7, 7),
      },
    ],

    suspeitos: [
      { id: "amelia", nome: "Amélia", dica: "Ele estava ao lado de uma planta.", foto: "assets/suspeitos/dolores.png" },
      { id: "beatriz", nome: "Beatriz", dica: "Ela não estava sentada em uma cadeira.", foto: "assets/suspeitos/vinita.png" },
      { id: "claudio", nome: "Cláudio", dica: "Ele estava sobre um tapete.", foto: "assets/suspeitos/brent.png" },
      { id: "duarte", nome: "Duarte", dica: "Ele não estava sentado em uma cadeira.", foto: "assets/suspeitos/cameron.png" },
      { id: "elisa", nome: "Elisa", dica: "Ela estava ao lado de uma estante.", foto: "assets/suspeitos/carissa.png" },
      { id: "fatima", nome: "Fátima", dica: "Ela estava no Banheiro.", foto: "assets/suspeitos/dolores.png" },
      { id: "gabriel", nome: "Gabriel", dica: "Ele estava na Recepção.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "vitoria", nome: "Vitória", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/eduardo.png", isVitima: true },
    ],

    solucaoMock: {
      "2-5": "amelia",
      "4-5": "beatriz",
      "1-2": "claudio",
      "0-4": "duarte",
      "4-2": "elisa",
      "2-6": "fatima",
      "6-1": "gabriel",
      "7-6": "vitoria",
    },
  },
  {
    id: 5,
    nome: "A Vila da Fronteira",
    tamanho: 10,
    dificuldade: "dificil",

    gridInicial: [
      ["vazio", "vilaMesa", "estante", "vazio", "vazio", "vazio", "vazio", "vazio", "vilaCactus", "vilaCavalo"],
      ["cadeira", "vilaCamaBase", "vilaCamaCoberta", "vilaCavalo", "vazio", "vilaMesaEsquerda", "vilaMesaDireita", "vazio", "vazio", "vazio"],
      ["vazio", "estante", "vilaSacoDinheiro", "vazio", "vilaSacoDinheiro", "vazio", "vazio", "cadeira", "vazio", "vilaCactus"],
      ["vazio", "vazio", "cadeira", "vazio", "cadeira", "vazio", "vazio", "cadeira", "vilaCavalo", "vazio"],
      ["vilaCactus", "vazio", "vazio", "vazio", "cadeira", "vazio", "vazio", "cadeira", "vazio", "vazio"],
      ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
      ["estante", "vazio", "vazio", "vazio", "vilaCactus", "vazio", "vazio", "vazio", "vazio", "vazio"],
      ["vilaSacoDinheiro", "vazio", "estante", "vilaCaixaRegistradora", "vilaCavalo", "vilaSacoDinheiro", "vazio", "vilaFimMesa", "estante", "cadeira"],
      ["vazio", "cadeira", "vazio", "vazio", "vazio", "vazio", "vazio", "vilaMesaLadoBaixo", "vazio", "vilaMesa"],
      ["estante", "vazio", "estante", "vilaMesa", "vazio", "cadeira", "vilaCofre", "vazio", "vazio", "vilaCaixaRegistradora"],
    ],

    icones: {
      cadeira: ICONES_FIGMA.cadeira,
      estante: ICONES_FIGMA.estante,
      vilaCactus: ICONES_FIGMA.vilaCactus,
      vilaCaixaRegistradora: ICONES_FIGMA.vilaCaixaRegistradora,
      vilaCamaBase: ICONES_FIGMA.vilaCamaBase,
      vilaCamaCoberta: ICONES_FIGMA.vilaCamaCoberta,
      vilaCavalo: ICONES_FIGMA.vilaCavalo,
      vilaCofre: ICONES_FIGMA.vilaCofre,
      vilaFimMesa: ICONES_FIGMA.vilaFimMesa,
      vilaMesa: ICONES_FIGMA.vilaMesa,
      vilaMesaDireita: ICONES_FIGMA.vilaMesaDireita,
      vilaMesaEsquerda: ICONES_FIGMA.vilaMesaEsquerda,
      vilaMesaLadoBaixo: ICONES_FIGMA.vilaMesaLadoBaixo,
      vilaSacoDinheiro: ICONES_FIGMA.vilaSacoDinheiro,
    },

    comodos: [
      {
        nome: "CASA DO PASTOR",
        cor: "#efd5b7",
        rotulo: { left: 20, top: 6 },
        celulas: celulasRetangulo(0, 0, 2, 2),
      },
      {
        nome: "CAPELA",
        cor: "#efc9b6",
        rotulo: { left: 61, top: 48 },
        celulas: celulasRetangulo(1, 4, 4, 7),
      },
      {
        nome: "ARMAZÉM GERAL",
        cor: "#efc9b6",
        rotulo: { left: 21, top: 50 },
        celulas: celulasRetangulo(5, 0, 9, 2),
      },
      {
        nome: "VARANDA",
        cor: "#d6b083",
        rotulo: { left: 51, top: 96 },
        celulas: celulasRetangulo(7, 4, 9, 6),
      },
      {
        nome: "BANCO",
        cor: "#d6b083",
        rotulo: { left: 77, top: 96 },
        celulas: celulasRetangulo(7, 7, 9, 9),
      },
      {
        nome: "EXTERIOR",
        cor: "#f1d678",
        rotulo: { left: 80, top: 66 },
        celulas: celulasExceto(
          10,
          celulasRetangulo(0, 0, 2, 2),
          celulasRetangulo(1, 4, 4, 7),
          celulasRetangulo(5, 0, 9, 2),
          celulasRetangulo(7, 4, 9, 6),
          celulasRetangulo(7, 7, 9, 9)
        ),
      },
    ],

    suspeitos: [
      { id: "abigail", nome: "Abigail", dica: "Ela estava ao lado de uma caixa registradora.", foto: "assets/suspeitos/carissa.png" },
      { id: "bruna", nome: "Bruna", dica: "Ela estava em um canto de sua área.", foto: "assets/suspeitos/dolores.png" },
      { id: "carlos", nome: "Carlos", dica: "Ele estava sentado em uma cadeira.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "daniel", nome: "Daniel", dica: "Não é o foragido. Ele estava ao lado de uma cadeira.", foto: "assets/suspeitos/brent.png" },
      { id: "edina", nome: "Edina", dica: "Ela estava no Banco.", foto: "assets/suspeitos/vinita.png" },
      { id: "frank", nome: "Frank", dica: "Ela estava montado em um cavalo.", foto: "assets/suspeitos/eduardo.png" },
      { id: "garrett", nome: "Garrett", dica: "Ele estava ao lado de um cacto.", foto: "assets/suspeitos/brent.png" },
      { id: "hazel", nome: "Hazel", dica: "Ela estava sentada numa cadeira. Ela estava com o foragido.", foto: "assets/suspeitos/dolores.png" },
      { id: "isa", nome: "Isa", dica: "Ela estava ao Sul de Hazel, em uma área diferente.", foto: "assets/suspeitos/carissa.png" },
      { id: "vini", nome: "Vini", dica: "A vítima. Ele estava sozinho com o assassino.", foto: "assets/suspeitos/vinita.png", isVitima: true },
    ],

    pistasGerais: [
      "Há exatamente um foragido escondido entre os suspeitos. O foragido pode ser ou não o assassino.",
      "O foragido estava ao lado de uma mesa.",
    ],

    solucaoMock: {
      "7-2": "abigail",
      "0-0": "bruna",
      "3-7": "carlos",
      "4-6": "daniel",
      "9-8": "edina",
      "1-3": "frank",
      "1-8": "garrett",
      "8-1": "hazel",
      "9-1": "isa",
      "7-5": "vini",
    },
  },
  {
    id: 6,
    nome: "Pintura ao Ar Livre",
    tamanho: 6,
    dificuldade: "facil",

    gridInicial: [
      ["vazio", "vazio", "pinturaPedra", "vazio", "poltronaBranca", "vazio"],
      ["vazio", "vazio", "vazio", "pinturaEstatua", "flores", "vazio"],
      ["flores", "vazio", "vazio", "vazio", "pinturaCavalete", "poltronaBranca"],
      ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
      ["vazio", "vazio", "vazio", "flores", "vazio", "vazio"],
      ["vazio", "vazio", "vazio", "poltronaBranca", "vazio", "vazio"],
    ],

    icones: {
      flores: ICONES_FIGMA.flores,
      pinturaCavalete: ICONES_FIGMA.pinturaCavalete,
      pinturaEstatua: ICONES_FIGMA.pinturaEstatua,
      pinturaPedra: ICONES_FIGMA.pinturaPedra,
      poltronaBranca: ICONES_FIGMA.poltronaBranca,
    },

    comodos: [
      {
        nome: "LAGO",
        cor: "#cdf5ff",
        rotulo: { left: 25, top: 29 },
        celulas: [
          ...celulasRetangulo(0, 0, 0, 3),
          ...celulasRetangulo(1, 0, 1, 1),
        ],
      },
      {
        nome: "CALÇADA",
        cor: "#b5b5b5",
        rotulo: { left: 54, top: 94 },
        celulas: [
          "4-0",
          "4-5",
          ...celulasRetangulo(5, 0, 5, 5),
        ],
      },
      {
        nome: "FLORESTA",
        cor: "#a1d65c",
        rotulo: { left: 48, top: 75 },
        celulas: celulasExceto(
          6,
          [
            ...celulasRetangulo(0, 0, 0, 3),
            ...celulasRetangulo(1, 0, 1, 1),
          ],
          [
            "4-0",
            "4-5",
            ...celulasRetangulo(5, 0, 5, 5),
          ]
        ),
      },
    ],

    suspeitos: [
      { id: "allison", nome: "Allison", dica: "Ela estava na primeira coluna.", foto: "assets/suspeitos/dolores.png" },
      { id: "brendon", nome: "Brendon", dica: "Ele estava uma fileira ao sul de Donovan, em outra área.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "clark", nome: "Clark", dica: "Ela estava ao lado da pedra.", foto: "assets/suspeitos/cameron.png" },
      { id: "donovan", nome: "Donovan", dica: "Ele estava ao lado do cavalete.", foto: "assets/suspeitos/brent.png" },
      { id: "ellie", nome: "Ellie", dica: "Ela estava sentada em uma cadeira.", foto: "assets/suspeitos/carissa.png" },
      { id: "vincenza", nome: "Vincenza", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/vinita.png", isVitima: true },
    ],

    solucaoMock: {
      "2-0": "allison",
      "3-3": "brendon",
      "0-1": "clark",
      "2-3": "donovan",
      "0-4": "ellie",
      "4-3": "vincenza",
    },
  },
  {
    id: 7,
    nome: "Casamento Branco",
    tamanho: 9,
    dificuldade: "medio",

    gridInicial: [
      ["vazio", "flores", "vazio", "tapeteRosaEsqCima", "mesa", "tapeteRosaDirCima", "vazio", "vazio", "casamentoArvore"],
      ["casamentoArvore", "vazio", "vazio", "tapeteRosaEsqBaixo", "tapeteRosaMeioBaixo", "tapeteRosaDirBaixo", "vazio", "vazio", "vazio"],
      ["vazio", "vazio", "vazio", "vazio", "tapeteRosaMeioCima", "flores", "vazio", "vazio", "vazio"],
      ["vazio", "vazio", "flores", "poltronaBranca", "tapeteRosaMeioCima", "poltronaBranca", "vazio", "vazio", "casamentoArvore"],
      ["vazio", "vazio", "poltronaBranca", "vazio", "tapeteRosaMeioCima", "vazio", "poltronaBranca", "vazio", "mesa"],
      ["vazio", "vazio", "vazio", "vazio", "tapeteRosaMeioCima", "vazio", "vazio", "vazio", "vazio"],
      ["flores", "vazio", "flores", "poltronaBranca", "tapeteRosaMeioBaixo", "poltronaBranca", "poltronaBranca", "flores", "casamentoArvore"],
      ["vazio", "mesaEsquerda", "mesaDireita", "flores", "vazio", "vazio", "flores", "vazio", "vazio"],
      ["casamentoArvore", "vazio", "mesa", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
    ],

    icones: {
      casamentoArvore: ICONES_FIGMA.casamentoArvore,
      flores: ICONES_FIGMA.flores,
      mesa: ICONES_FIGMA.mesa,
      mesaDireita: ICONES_FIGMA.mesaDireita,
      mesaEsquerda: ICONES_FIGMA.mesaEsquerda,
      poltronaBranca: ICONES_FIGMA.poltronaBranca,
      tapeteRosaDirBaixo: ICONES_FIGMA.tapeteRosaDirBaixo,
      tapeteRosaDirCima: ICONES_FIGMA.tapeteRosaDirCima,
      tapeteRosaEsqBaixo: ICONES_FIGMA.tapeteRosaEsqBaixo,
      tapeteRosaEsqCima: ICONES_FIGMA.tapeteRosaEsqCima,
      tapeteRosaMeioBaixo: ICONES_FIGMA.tapeteRosaMeioBaixo,
      tapeteRosaMeioCima: ICONES_FIGMA.tapeteRosaMeioCima,
    },

    comodos: [
      {
        nome: "ALTAR",
        cor: "#f7d4ec",
        rotulo: { left: 48, top: 24 },
        celulas: celulasRetangulo(0, 3, 1, 5),
      },
      {
        nome: "PÁTIO OESTE",
        cor: "#c4fea4",
        rotulo: { left: 17, top: 96 },
        celulas: [
          ...celulasRetangulo(0, 0, 6, 1),
          ...celulasRetangulo(7, 0, 8, 1),
          "8-2",
        ],
      },
      {
        nome: "PÁTIO LESTE",
        cor: "#c4fea4",
        rotulo: { left: 82, top: 96 },
        celulas: [
          ...celulasRetangulo(0, 7, 6, 8),
          ...celulasRetangulo(7, 6, 8, 8),
        ],
      },
      {
        nome: "ALPENDRE",
        cor: "#f1ecee",
        rotulo: { left: 48, top: 96 },
        celulas: celulasRetangulo(7, 2, 8, 5),
      },
      {
        nome: "CAPELA",
        cor: "#f1ecee",
        rotulo: { left: 48, top: 73 },
        celulas: celulasExceto(
          9,
          celulasRetangulo(0, 3, 1, 5),
          [
            ...celulasRetangulo(0, 0, 6, 1),
            ...celulasRetangulo(7, 0, 8, 1),
            "8-2",
          ],
          [
            ...celulasRetangulo(0, 7, 6, 8),
            ...celulasRetangulo(7, 6, 8, 8),
          ],
          celulasRetangulo(7, 2, 8, 5)
        ),
      },
    ],

    suspeitos: [
      { id: "archer", nome: "Archer", dica: "Ele estava ao lado de uma mesa.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "brooke", nome: "Brooke", dica: "Ela estava ao lado de algumas flores.", foto: "assets/suspeitos/vinita.png" },
      { id: "crystal", nome: "Crystal", dica: "Havia um homem na cama em sua área.", foto: "assets/suspeitos/dolores.png" },
      { id: "daisy", nome: "Daisy", dica: "Ela estava no Alpendre.", foto: "assets/suspeitos/carissa.png" },
      { id: "ernie", nome: "Ernie", dica: "Ele estava a nordeste de Crystal.", foto: "assets/suspeitos/cameron.png" },
      { id: "finn", nome: "Finn", dica: "Ele estava num canto da sua área.", foto: "assets/suspeitos/brent.png" },
      { id: "giulia", nome: "Giulia", dica: "Ela estava com alguém que estava ao lado de uma árvore.", foto: "assets/suspeitos/vinita.png" },
      { id: "harper", nome: "Harper", dica: "Ela estava sentada numa cadeira.", foto: "assets/suspeitos/eduardo.png" },
      { id: "vikram", nome: "Vikram", dica: "A vítima. Ele estava sozinha com o assassino.", foto: "assets/suspeitos/man_avatar.png", isVitima: true },
    ],

    solucaoMock: {
      "0-3": "archer",
      "6-0": "brooke",
      "4-8": "crystal",
      "8-4": "daisy",
      "3-7": "ernie",
      "8-8": "finn",
      "7-7": "giulia",
      "4-2": "harper",
      "6-5": "vikram",
    },
  },
  {
    id: 8,
    nome: "Visitantes Inesperados",
    tamanho: 9,
    dificuldade: "dificil",

    gridInicial: [
      ["estante", "planta", "estante", "vazio", "mesa", "vazio", "planta", "vazio", "visitanteCamaBase"],
      ["vazio", "visitanteCamaBase", "tapeteAzulLado", "vazio", "vazio", "vazio", "vazio", "tapeteAzulDobra", "visitanteCamaCoberta"],
      ["vazio", "visitanteCamaCoberta", "estante", "vazio", "visitanteTv", "vazio", "tapeteAzulBaixo", "vazio", "poltronaBranca"],
      ["tapeteAzulLado", "tapeteAzulDobra", "estante", "tapeteRosaEsqCima", "tapeteRosaMeioCima", "tapeteRosaDirCima", "poltronaBranca", "vazio", "estante"],
      ["vazio", "planta", "poltronaBranca", "tapeteRosaEsqBaixo", "tapeteRosaMeioBaixo", "tapeteRosaDirBaixo", "poltronaBranca", "poltronaBranca", "vazio"],
      ["mesa", "vazio", "vazio", "vazio", "vazio", "poltronaBranca", "planta", "estante", "vazio"],
      ["poltronaBranca", "vazio", "vazio", "vazio", "vazio", "planta", "poltronaBranca", "poltronaBranca", "tapeteAzulLado"],
      ["vazio", "vazio", "tapeteAzulDobra", "vazio", "vazio", "poltronaBranca", "mesaEsquerda", "mesaDireita", "tapeteAzulBaixo"],
      ["vazio", "tapeteAzulBaixo", "estante", "vazio", "vazio", "vazio", "vazio", "poltronaBranca", "vazio"],
    ],

    icones: {
      estante: ICONES_FIGMA.estante,
      mesa: ICONES_FIGMA.mesa,
      mesaDireita: ICONES_FIGMA.mesaDireita,
      mesaEsquerda: ICONES_FIGMA.mesaEsquerda,
      planta: ICONES_FIGMA.planta,
      poltronaBranca: ICONES_FIGMA.poltronaBranca,
      tapeteAzulBaixo: ICONES_FIGMA.tapeteAzulBaixo,
      tapeteAzulDobra: ICONES_FIGMA.tapeteAzulDobra,
      tapeteAzulLado: ICONES_FIGMA.tapeteAzulLado,
      tapeteRosaDirBaixo: ICONES_FIGMA.tapeteRosaDirBaixo,
      tapeteRosaDirCima: ICONES_FIGMA.tapeteRosaDirCima,
      tapeteRosaEsqBaixo: ICONES_FIGMA.tapeteRosaEsqBaixo,
      tapeteRosaEsqCima: ICONES_FIGMA.tapeteRosaEsqCima,
      tapeteRosaMeioBaixo: ICONES_FIGMA.tapeteRosaMeioBaixo,
      tapeteRosaMeioCima: ICONES_FIGMA.tapeteRosaMeioCima,
      visitanteCamaBase: ICONES_FIGMA.visitanteCamaBase,
      visitanteCamaCoberta: ICONES_FIGMA.visitanteCamaCoberta,
      visitanteTv: ICONES_FIGMA.visitanteTv,
    },

    comodos: [
      {
        nome: "ENTRADA",
        cor: "#a9eada",
        exibirRotulo: false,
        celulas: [
          ...celulasRetangulo(0, 0, 2, 3),
          ...celulasRetangulo(3, 0, 3, 2),
          ...celulasRetangulo(4, 0, 5, 1),
        ],
      },
      {
        nome: "SUÍTE",
        cor: "#baf3e4",
        exibirRotulo: false,
        celulas: [
          ...celulasRetangulo(0, 4, 2, 8),
          ...celulasRetangulo(3, 6, 3, 8),
          ...celulasRetangulo(4, 7, 4, 8),
        ],
      },
      {
        nome: "SALA",
        cor: "#c0cadd",
        exibirRotulo: false,
        celulas: [
          ...celulasRetangulo(3, 3, 3, 5),
          ...celulasRetangulo(4, 2, 6, 6),
        ],
      },
      {
        nome: "GARAGEM",
        cor: "#a1b8d7",
        exibirRotulo: false,
        celulas: [
          ...celulasRetangulo(6, 0, 6, 1),
          ...celulasRetangulo(7, 0, 7, 4),
          ...celulasRetangulo(8, 0, 8, 3),
        ],
      },
      {
        nome: "JARDIM",
        cor: "#bff1c2",
        exibirRotulo: false,
        celulas: [
          ...celulasRetangulo(7, 5, 7, 7),
          ...celulasRetangulo(8, 4, 8, 7),
        ],
      },
      {
        nome: "CORREDOR",
        cor: "#addaae",
        exibirRotulo: false,
        celulas: [
          ...celulasRetangulo(5, 7, 6, 8),
          "7-8",
          "8-8",
        ],
      },
    ],

    suspeitos: [
      { id: "angelo", nome: "Angelo", dica: "Ele estava ao lado da televisão.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "bruna", nome: "Bruna", dica: "Ela estava em uma cama.", foto: "assets/suspeitos/vinita.png" },
      { id: "camila", nome: "Camila", dica: "Ela estava na última coluna.", foto: "assets/suspeitos/dolores.png" },
      { id: "danielVisitante", nome: "Daniel", dica: "Ele estava ao lado de uma mesa.", foto: "assets/suspeitos/cameron.png" },
      { id: "ed", nome: "Ed", dica: "Ele era a única pessoa ao lado de uma planta.", foto: "assets/suspeitos/brent.png" },
      { id: "fabio", nome: "Fabio", dica: "Ele estava ao lado de uma prateleira.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "gabi", nome: "Gabi", dica: "Ela estava ao lado de uma cama.", foto: "assets/suspeitos/carissa.png" },
      { id: "hayden", nome: "Hayden", dica: "Ele estava sentado em uma cadeira.", foto: "assets/suspeitos/eduardo.png" },
      { id: "virginia", nome: "Virginia", dica: "A vítima. Ele estava sozinha com o assassino.", foto: "assets/suspeitos/vinita.png", isVitima: true },
    ],

    solucaoMock: {
      "2-3": "angelo",
      "1-8": "bruna",
      "4-8": "camila",
      "5-1": "danielVisitante",
      "5-5": "ed",
      "3-7": "fabio",
      "0-7": "gabi",
      "4-6": "hayden",
      "7-7": "virginia",
    },
  },
];


window.TABULEIROS = TABULEIROS;

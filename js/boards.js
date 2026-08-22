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
      ["mesa", "vazio", "planta", "vazio", "planta", "mesa", "vazio"],
      ["vazio", "tapetePontaEsquerda", "continua", "continua", "continua", "tapetePontaDireita", "vazio"],
      ["planta", "vazio", "vazio", "mesaDeLado2", "vazio", "vazio", "planta"],
      ["vazio", "mesa", "vazio", "vazio", "vazio", "mesaDeLado", "vazio"],
      ["tapetePontaCima", "vazio", "planta", "vazio", "mesa", "vazio", "vazio"],
      ["vazio", "vazio", "tapeteViraCima", "continua", "continua", "vazio", "planta"],
      ["mesaDeLado2", "vazio", "vazio", "caixa", "vazio", "planta", "vazio"],
    ],

    icones: {
      planta: "assets/icones/planta.png",
      mesa: "assets/icones/mesa.png",
      mesaDeLado: "assets/icones/mesa de canto.png",
      mesaDeLado2: "assets/icones/mesa de lado2.png",
      caixa: "assets/icones/mesa de canto.png",
      tapetePontaEsquerda: "assets/icones/tapete ponta esquerda.png",
      tapetePontaDireita: "assets/icones/tapete ponta direita.png",
      continua: "assets/icones/tepetemeio.png",
      tapetePontaCima: "assets/icones/tapete ponta cima.png",
      tapeteViraCima: "assets/icones/tapete vira cima.png",
    },

    comodos: [
      {
        nome: "VITRINE",
        cor: "#f7dfe8",
        rotulo: { left: 22, top: 14 },
        celulas: celulasRetangulo(0, 0, 1, 2),
      },
      {
        nome: "ESTUFA",
        cor: "#c4faf6",
        rotulo: { left: 70, top: 20 },
        celulas: celulasRetangulo(0, 3, 2, 6),
      },
      {
        nome: "ATELIE",
        cor: "#e8d7ef",
        rotulo: { left: 28, top: 49 },
        celulas: celulasRetangulo(2, 0, 4, 3),
      },
      {
        nome: "CAIXA",
        cor: "#f3cddc",
        rotulo: { left: 78, top: 64 },
        celulas: celulasRetangulo(3, 4, 6, 6),
      },
      {
        nome: "JARDIM",
        cor: "#d8f4ca",
        rotulo: { left: 28, top: 86 },
        celulas: celulasRetangulo(5, 0, 6, 3),
      },
    ],

    suspeitos: [
      { id: "flora", nome: "Flora", dica: "Ela estava na estufa.", foto: "assets/suspeitos/carissa.png" },
      { id: "bruno", nome: "Bruno", dica: "Ele estava perto de uma mesa.", foto: "assets/suspeitos/brent.png" },
      { id: "celina", nome: "Celina", dica: "Ela não estava no caixa.", foto: "assets/suspeitos/dolores.png" },
      { id: "danilo", nome: "Danilo", dica: "Ele estava ao lado de uma planta.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "elisa", nome: "Elisa", dica: "Ela estava sobre o tapete.", foto: "assets/suspeitos/vinita.png" },
      { id: "fabio", nome: "Fabio", dica: "Ele estava no jardim.", foto: "assets/suspeitos/cameron.png" },
      { id: "gina", nome: "Gina", dica: "A vitima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/eduardo.png", isVitima: true },
    ],

    solucaoMock: {
      "0-4": "flora",
      "3-1": "bruno",
      "2-0": "celina",
      "5-6": "danilo",
      "1-3": "elisa",
      "6-2": "fabio",
      "4-4": "gina",
    },
  },
  {
    id: 4,
    nome: "Cozinha do Inferno",
    tamanho: 8,
    dificuldade: "medio",

    gridInicial: [
      ["mesa", "continua", "continua", "mesaDeLado", "estante", "planta", "poltrona", "vazio"],
      ["vazio", "vazio", "estante", "vazio", "mesa", "mesaDeLado2", "vazio", "planta"],
      ["tapetePontaEsquerda", "continua", "tapetePontaDireita", "vazio", "vazio", "vazio", "mesa", "vazio"],
      ["tapetePontaCima", "vazio", "vazio", "mesaDeLado", "estante", "vazio", "vazio", "mesa"],
      ["vazio", "mesa", "vazio", "vazio", "tapetePontaEsquerda", "continua", "continua", "tapetePontaDireita"],
      ["poltrona", "vazio", "planta", "vazio", "vazio", "vazio", "mesaDeLado2", "vazio"],
      ["estante", "vazio", "vazio", "mesa", "vazio", "planta", "vazio", "mesaDeLado"],
      ["vazio", "planta", "vazio", "vazio", "mesa", "vazio", "poltrona", "vazio"],
    ],

    icones: {
      estante: "assets/icones/estante.png",
      planta: "assets/icones/planta.png",
      poltrona: "assets/icones/poltrona.png",
      mesa: "assets/icones/mesa.png",
      mesaDeLado: "assets/icones/mesa de canto.png",
      mesaDeLado2: "assets/icones/mesa de lado2.png",
      tapetePontaEsquerda: "assets/icones/tapete ponta esquerda.png",
      tapetePontaDireita: "assets/icones/tapete ponta direita.png",
      continua: "assets/icones/tepetemeio.png",
      tapetePontaCima: "assets/icones/tapete ponta cima.png",
    },

    comodos: [
      {
        nome: "DESPENSA",
        cor: "#d7b48a",
        rotulo: { left: 19, top: 13 },
        celulas: celulasRetangulo(0, 0, 1, 2),
      },
      {
        nome: "SALAO",
        cor: "#f3d0dc",
        rotulo: { left: 68, top: 18 },
        celulas: celulasRetangulo(0, 3, 2, 7),
      },
      {
        nome: "COZINHA",
        cor: "#cfa06d",
        rotulo: { left: 25, top: 47 },
        celulas: celulasRetangulo(2, 0, 5, 3),
      },
      {
        nome: "FORNO",
        cor: "#f2a2c2",
        rotulo: { left: 75, top: 65 },
        celulas: celulasRetangulo(3, 4, 7, 7),
      },
      {
        nome: "ESTOQUE",
        cor: "#e8d8c7",
        rotulo: { left: 25, top: 86 },
        celulas: celulasRetangulo(6, 0, 7, 3),
      },
    ],

    suspeitos: [
      { id: "augusto", nome: "Augusto", dica: "Ele estava na despensa.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "bianca", nome: "Bianca", dica: "Ela estava ao lado de uma estante.", foto: "assets/suspeitos/carissa.png" },
      { id: "caio", nome: "Caio", dica: "Ele estava perto do tapete.", foto: "assets/suspeitos/brent.png" },
      { id: "dora", nome: "Dora", dica: "Ela estava no salao.", foto: "assets/suspeitos/dolores.png" },
      { id: "enrico", nome: "Enrico", dica: "Ele nao estava perto da planta.", foto: "assets/suspeitos/eduardo.png" },
      { id: "frida", nome: "Frida", dica: "Ela estava na cozinha.", foto: "assets/suspeitos/vinita.png" },
      { id: "gael", nome: "Gael", dica: "Ele estava no forno.", foto: "assets/suspeitos/cameron.png" },
      { id: "helena", nome: "Helena", dica: "A vitima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/carissa.png", isVitima: true },
    ],

    solucaoMock: {
      "0-1": "augusto",
      "1-2": "bianca",
      "2-1": "caio",
      "0-6": "dora",
      "6-3": "enrico",
      "5-2": "frida",
      "4-6": "gael",
      "7-4": "helena",
    },
  },
  {
    id: 5,
    nome: "A Vila da Fronteira",
    tamanho: 10,
    dificuldade: "dificil",

    gridInicial: [
      ["mesa", "vazio", "planta", "vazio", "poltrona", "vazio", "mesa", "mesaDeLado", "vazio", "planta"],
      ["vazio", "estante", "vazio", "mesa", "vazio", "vazio", "vazio", "mesaDeLado2", "vazio", "vazio"],
      ["planta", "vazio", "vazio", "vazio", "mesa", "vazio", "estante", "vazio", "planta", "vazio"],
      ["vazio", "mesa", "vazio", "planta", "vazio", "vazio", "mesaDeLado", "vazio", "vazio", "estante"],
      ["vazio", "vazio", "poltrona", "vazio", "mesa", "planta", "vazio", "vazio", "mesa", "vazio"],
      ["estante", "vazio", "vazio", "vazio", "planta", "vazio", "vazio", "mesaDeLado2", "vazio", "planta"],
      ["vazio", "mesaDeLado", "vazio", "vazio", "mesa", "vazio", "planta", "vazio", "vazio", "mesa"],
      ["planta", "vazio", "vazio", "estante", "vazio", "mesa", "vazio", "poltrona", "vazio", "vazio"],
      ["vazio", "mesa", "vazio", "vazio", "planta", "vazio", "estante", "vazio", "mesaDeLado", "vazio"],
      ["mesaDeLado2", "vazio", "planta", "vazio", "vazio", "mesa", "vazio", "vazio", "planta", "vazio"],
    ],

    icones: {
      estante: "assets/icones/estante.png",
      planta: "assets/icones/planta.png",
      poltrona: "assets/icones/poltrona.png",
      mesa: "assets/icones/mesa.png",
      mesaDeLado: "assets/icones/mesa de canto.png",
      mesaDeLado2: "assets/icones/mesa de lado2.png",
    },

    comodos: [
      {
        nome: "BANCO",
        cor: "#d6c1a8",
        rotulo: { left: 20, top: 16 },
        celulas: celulasRetangulo(0, 0, 2, 3),
      },
      {
        nome: "SALOON",
        cor: "#c28e72",
        rotulo: { left: 70, top: 15 },
        celulas: celulasRetangulo(0, 4, 2, 9),
      },
      {
        nome: "PRACA",
        cor: "#d9c587",
        rotulo: { left: 25, top: 43 },
        celulas: celulasRetangulo(3, 0, 5, 4),
      },
      {
        nome: "COFRE",
        cor: "#9aa0a4",
        rotulo: { left: 75, top: 43 },
        celulas: celulasRetangulo(3, 5, 5, 9),
      },
      {
        nome: "POUSADA",
        cor: "#e6cfbd",
        rotulo: { left: 25, top: 78 },
        celulas: celulasRetangulo(6, 0, 9, 4),
      },
      {
        nome: "FRONTEIRA",
        cor: "#c8d59c",
        rotulo: { left: 75, top: 78 },
        celulas: celulasRetangulo(6, 5, 9, 9),
      },
    ],

    suspeitos: [
      { id: "amelia", nome: "Amelia", dica: "Ela estava no banco.", foto: "assets/suspeitos/carissa.png" },
      { id: "bartholomeu", nome: "Bartholomeu", dica: "Ele estava ao sul de uma planta.", foto: "assets/suspeitos/brent.png" },
      { id: "clara", nome: "Clara", dica: "Ela estava perto do saloon.", foto: "assets/suspeitos/dolores.png" },
      { id: "dante", nome: "Dante", dica: "Ele estava ao lado de uma mesa.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "ester", nome: "Ester", dica: "Ela nao estava na praca.", foto: "assets/suspeitos/vinita.png" },
      { id: "felix", nome: "Felix", dica: "Ele estava na pousada.", foto: "assets/suspeitos/eduardo.png" },
      { id: "greta", nome: "Greta", dica: "Ela estava perto da fronteira.", foto: "assets/suspeitos/cameron.png" },
      { id: "hugo", nome: "Hugo", dica: "Ele estava perto de uma estante.", foto: "assets/suspeitos/brent.png" },
      { id: "ines", nome: "Ines", dica: "Ela estava longe do cofre.", foto: "assets/suspeitos/carissa.png" },
      { id: "jonas", nome: "Jonas", dica: "A vitima. Ele estava sozinho com o assassino.", foto: "assets/suspeitos/man_avatar.png", isVitima: true },
    ],

    solucaoMock: {
      "0-2": "amelia",
      "3-3": "bartholomeu",
      "1-6": "clara",
      "4-4": "dante",
      "7-7": "ester",
      "8-1": "felix",
      "9-8": "greta",
      "7-3": "hugo",
      "5-0": "ines",
      "6-6": "jonas",
    },
  },
];


window.TABULEIROS = TABULEIROS;

// Fonte de dados dos tabuleiros. Cada objeto descreve um "caso" completo:
// tamanho do grid, o layout inicial (pistas visuais), os cômodos, os suspeitos e o gabarito de resposta.

const TABULEIROS = [
  {
    id: 1,
    nome: "O Chiqueiro",
    tamanho: 5, // 5x5

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
];


window.TABULEIROS = TABULEIROS;
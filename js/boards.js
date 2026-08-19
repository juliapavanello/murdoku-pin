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
];


window.TABULEIROS = TABULEIROS;
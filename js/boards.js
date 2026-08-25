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
  barril: `${PASTA_FIGMA}barril.svg`,
  bandeiraGolf: `${PASTA_FIGMA}bandeira-golf.svg`,
  caixa: `${PASTA_FIGMA}caixa.svg`,
  caixaRegistradora: `${PASTA_FIGMA}caixa-registradora.svg`,
  estante: `${PASTA_FIGMA}estante.svg`,
  flores: `${PASTA_FIGMA}flores.svg`,
  mesa: `${PASTA_FIGMA}mesa.svg`,
  mesaAreiaComprida: `${PASTA_FIGMA}mesa-areia-comprida.svg`,
  minigolfMesaComprida: `${PASTA_FIGMA}minigolf-mesa-comprida.svg`,
  minigolfMesaDireita: `${PASTA_FIGMA}minigolf-mesa-direita.svg`,
  minigolfMesaEsquerda: `${PASTA_FIGMA}minigolf-mesa-esquerda.svg`,
  minigolfMesaFimComprida: `${PASTA_FIGMA}minigolf-mesa-fim-comprida.svg`,
  minigolfMesaLado: `${PASTA_FIGMA}minigolf-mesa-lado.svg`,
  minigolfMesaVertical: `${PASTA_FIGMA}minigolf-mesa-vertical.svg`,
  mesaAzulComprida: `${PASTA_FIGMA}mesa-azul-comprida.svg`,
  mesaDireita: `${PASTA_FIGMA}mesa-direita.svg`,
  mesaEsquerda: `${PASTA_FIGMA}mesa-esquerda.svg`,
  mesaRoxa: `${PASTA_FIGMA}mesa-roxa.svg`,
  planta: `${PASTA_FIGMA}planta.svg`,
  tapeteAzulBaixo: `${PASTA_FIGMA}tapete-azul-baixo.svg`,
  tapeteAzulCima: `${PASTA_FIGMA}tapete-azul-cima.svg`,
  tapeteAzulDobra: `${PASTA_FIGMA}tapete-azul-dobra.svg`,
  tapeteAzulDobraCima: `${PASTA_FIGMA}tapete-azul-dobra_copy.svg`,
  tapeteAzulLado: `${PASTA_FIGMA}tapete-azul-lado.svg`,
  tapeteAzulMeio: `${PASTA_FIGMA}tapete-azul-meio.svg`,
  barbeariaTapeteConexao: `${PASTA_FIGMA}barbearia-tapete-conexao.svg`,
  barbeariaTapeteDobra: `${PASTA_FIGMA}barbearia-tapete-dobra.svg`,
  barbeariaTapeteForaEsquerda: `${PASTA_FIGMA}barbearia-tapete-lado.svg`,
  barbeariaTapeteVertical: `${PASTA_FIGMA}barbearia-tapete-vertical.svg`,
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
  visitanteTapeteQuartoPrincipalCima: `${PASTA_FIGMA}visitante-tapete-quarto-principal-cima.svg`,
  visitanteTapeteQuartoPrincipalDireita: `${PASTA_FIGMA}visitante-tapete-quarto-principal-direita.svg`,
  visitanteTapeteQuartoPrincipalDobra: `${PASTA_FIGMA}visitante-tapete-quarto-principal-dobra.svg`,
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
    tamanho: 5, 
    dificuldade: "facil",

    gridInicial: [
      ["vazio", "vazio", "lama", "vazio", "vazio"],
      ["porco", "lama", "lama", "vazio", "lama"],
      ["vazio", "vazio", "vazio", "vazio", "vazio"],
      ["porco", "vazio", "porco", "vazio", "porco"],
      ["vazio", "vazio", "vazio", "vazio", "vazio"],
    ],

    celulasBloqueadas: ["4-4"],

    icones: {
      lama: "assets/icones/Lama.png",
      porco: "assets/icones/noto-v1_pig.png",
    },

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
    tamanho: 6, 
    dificuldade: "facil",

    gridInicial: [
      ["vazio", "estante", "planta", "vazio", "estante","estante"],
      ["estante", "tapetePontaEsquerda", "continua", "continua", "continua","tapetePontaDireita"],
      ["vazio", "poltrona", "vazio", "estante", "estante","vazio"],
      ["poltrona", "vazio", "tapetePontaCima", "vazio", "vazio","vazio"],
      ["poltrona", "tapetePontaEsquerda", "tapeteViraCima", "vazio", "tapetePontaEsquerda","mesaDeLado2"],
      ["mesa", "vazio", "poltrona", "planta", "mesa","mesaDeLado"],
    ],

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

    comodos: [
      {
        nome: "Biblioteca",
        cor: "#A3ABD2",
        rotulo: { left: 58, top: 47 },
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

celulasBloqueadas: ["0-1","0-2","0-4","0-5","1-0","2-3","2-4","4-5","5-0","5-3","5-4","5-5"],

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
      ["vazio", "vazio", "tapeteAzulCima", "flores", "caixaRegistradora", "vazio", "planta"],
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
      tapeteAzulCima: ICONES_FIGMA.tapeteAzulCima,
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
    celulasBloqueadas: ["0-0","0-1","0-3","2-0","2-2","2-6","3-0","3-6","4-3","4-4","4-6","5-0","5-4","6-0"],

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
        celulas: [
          ...celulasRetangulo(0, 0, 3, 4),
          "1-5", "2-5",
        ],
      },
      {
        nome: "BANHEIRO",
        cor: "#d99599",
        rotulo: { left: 76, top: 48 },
        celulas: [
          ...celulasRetangulo(0, 5, 0, 7),
          "1-6", "1-7",
          "2-6", "2-7",
          ...celulasRetangulo(3, 5, 3, 7),
        ],
      },
      {
        nome: "RECEPÇÃO",
        cor: "#e8bcbc",
        rotulo: { left: 20, top: 96 },
        celulas: [
          ...celulasRetangulo(4, 0, 7, 1),
          "7-2", "7-3",
        ],
      },
      {
        nome: "SALA DE JANTAR",
        cor: "#e6b8b8",
        rotulo: { left: 66, top: 96 },
        celulas: [
          ...celulasRetangulo(4, 2, 6, 7),
          ...celulasRetangulo(7, 4, 7, 7),
        ],
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
    celulasBloqueadas: ["0-0","0-1","0-3","0-4","1-0","1-5","2-6","3-1","3-2","3-3","4-1","4-4","4-5","5-0","5-1","5-6","6-3","7-5"],
    
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

    celulasBloqueadas: ["0-1","0-2","0-8","1-5","1-6","2-1","2-2","2-4","2-9","4-0","6-0","6-4","7-0","7-2","7-3","7-5","7-7","7-8","8-7","8-9","9-0","9-2","9-3","9-6","9-9"],

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

    celulasBloqueadas: ["0-2","1-3","1-4","2-0","2-4","4-3"],

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
          "7-2", "8-2",
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
        celulas: celulasRetangulo(7, 3, 8, 5),
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
            "7-2", "8-2",
          ],
          [
            ...celulasRetangulo(0, 7, 6, 8),
            ...celulasRetangulo(7, 6, 8, 8),
          ],
          celulasRetangulo(7, 3, 8, 5)
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

    celulasBloqueadas: ["0-1","0-4","0-8","1-0","2-5","3-2","3-8","4-8","6-0","6-2","6-7","6-8","7-1","7-2","7-3","7-6","8-0","8-2"],

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
      ["visitanteCamaBase", "tapeteAzulCima", "vazio", "vazio", "vazio", "vazio", "visitanteTapeteQuartoPrincipalCima", "vazio", "visitanteCamaCoberta"],
      ["visitanteCamaCoberta", "tapeteAzulMeio", "estante", "vazio", "visitanteTv", "vazio", "visitanteTapeteQuartoPrincipalDobra", "visitanteTapeteQuartoPrincipalDireita", "poltronaBranca"],
      ["tapeteAzulLado", "tapeteAzulDobra", "estante", "tapeteRosaEsqCima", "tapeteRosaMeioCima", "tapeteRosaDirCima", "poltronaBranca", "vazio", "estante"],
      ["vazio", "planta", "poltronaBranca", "tapeteRosaEsqBaixo", "tapeteRosaMeioBaixo", "tapeteRosaDirBaixo", "poltronaBranca", "poltronaBranca", "vazio"],
      ["mesa", "vazio", "vazio", "vazio", "vazio", "poltronaBranca", "planta", "estante", "tapeteAzulCima"],
      ["poltronaBranca", "vazio", "vazio", "vazio", "vazio", "planta", "poltronaBranca", "poltronaBranca", "tapeteAzulMeio"],
      ["vazio", "tapeteAzulCima", "vazio", "vazio", "vazio", "poltronaBranca", "mesaEsquerda", "mesaDireita", "tapeteAzulBaixo"],
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
      tapeteAzulCima: ICONES_FIGMA.tapeteAzulCima,
      tapeteAzulDobra: ICONES_FIGMA.tapeteAzulDobraCima,
      tapeteAzulLado: ICONES_FIGMA.tapeteAzulLado,
      tapeteAzulMeio: ICONES_FIGMA.tapeteAzulMeio,
      tapeteRosaDirBaixo: ICONES_FIGMA.tapeteRosaDirBaixo,
      tapeteRosaDirCima: ICONES_FIGMA.tapeteRosaDirCima,
      tapeteRosaEsqBaixo: ICONES_FIGMA.tapeteRosaEsqBaixo,
      tapeteRosaEsqCima: ICONES_FIGMA.tapeteRosaEsqCima,
      tapeteRosaMeioBaixo: ICONES_FIGMA.tapeteRosaMeioBaixo,
      tapeteRosaMeioCima: ICONES_FIGMA.tapeteRosaMeioCima,
      visitanteCamaBase: ICONES_FIGMA.visitanteCamaBase,
      visitanteCamaCoberta: ICONES_FIGMA.visitanteCamaCoberta,
      visitanteTapeteQuartoPrincipalCima: ICONES_FIGMA.visitanteTapeteQuartoPrincipalCima,
      visitanteTapeteQuartoPrincipalDireita: ICONES_FIGMA.visitanteTapeteQuartoPrincipalDireita,
      visitanteTapeteQuartoPrincipalDobra: ICONES_FIGMA.visitanteTapeteQuartoPrincipalDobra,
      visitanteTv: ICONES_FIGMA.visitanteTv,
    },

    comodos: [
      {
        nome: "QUARTO DE HÓSPEDES",
        cor: "#a9eada",
        posicaoRotulo: { left: 24, top: 3 },
        celulas: [
          ...celulasRetangulo(0, 0, 1, 3),
          ...celulasRetangulo(2, 0, 2, 2),
          ...celulasRetangulo(3, 0, 4, 1),
        ],
      },
      {
        nome: "QUARTO PRINCIPAL",
        cor: "#baf3e4",
        posicaoRotulo: { left: 65, top: 3 },
        celulas: [
          ...celulasRetangulo(0, 4, 1, 8),
          ...celulasRetangulo(2, 6, 2, 8),
          ...celulasRetangulo(3, 7, 3, 8),
        ],
      },
      {
        nome: "SALA DE ESTAR",
        cor: "#c0cadd",
        posicaoRotulo: { left: 38, top: 66 },
        celulas: [
          ...celulasRetangulo(2, 3, 2, 5),
          ...celulasRetangulo(3, 2, 5, 6),
        ],
      },
      {
        nome: "BANHEIRO",
        cor: "#a1b8d7",
        posicaoRotulo: { left: 19, top: 97 },
        celulas: [
          ...celulasRetangulo(5, 0, 5, 1),
          ...celulasRetangulo(6, 0, 6, 4),
          ...celulasRetangulo(7, 0, 7, 3),
          ...celulasRetangulo(8, 0, 8, 2),
        ],
      },
      {
        nome: "SALA DE JANTAR",
        cor: "#bff1c2",
        posicaoRotulo: { left: 65, top: 97 },
        celulas: [
          ...celulasRetangulo(6, 5, 6, 7),
          ...celulasRetangulo(7, 4, 7, 7),
          ...celulasRetangulo(8, 3, 8, 7),
        ],
      },
      {
        nome: "COZINHA",
        cor: "#addaae",
        posicaoRotulo: { left: 88, top: 47 },
        celulas: [
          ...celulasRetangulo(4, 7, 5, 8),
          "6-8",
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

    celulasBloqueadas: ["0-0","0-1","0-2","0-4","0-6","2-2","2-4","3-2","3-8","4-1","5-0","5-6","5-7","6-5","7-6","7-7","8-2"],

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
  {
    id: 9,
    nome: "A Barbearia",
    tamanho: 8,
    dificuldade: "medio",

    gridInicial: [
      ["estante", "caixa", "caixa", "vazio", "vazio", "poltronaBranca", "mesaAzulComprida", "vazio"],
      ["vazio", "vazio", "vazio", "caixa", "visitanteTv", "vazio", "vazio", "poltronaBranca"],
      ["vazio", "estante", "mesaAzulComprida", "mesaAzulComprida", "mesaAzulComprida", "vazio", "vazio", "vazio"],
      ["vazio", "vazio", "poltronaBranca", "vazio", "poltronaBranca", "vazio", "poltronaBranca", "mesaRoxa"],
      ["mesaRoxa", "poltronaBranca", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
      ["mesaRoxa", "vazio", "vazio", "visitanteTv", "vazio", "mesaRoxa", "vazio", "vazio"],
      ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
      ["estante", "vazio", "poltronaBranca", "poltronaBranca", "poltronaBranca", "visitanteTv", "poltronaBranca", "vazio"],
    ],

    icones: {
      barbeariaTapeteConexao: ICONES_FIGMA.barbeariaTapeteConexao,
      barbeariaTapeteDobra: ICONES_FIGMA.barbeariaTapeteDobra,
      barbeariaTapeteForaEsquerda: ICONES_FIGMA.barbeariaTapeteForaEsquerda,
      barbeariaTapeteVertical: ICONES_FIGMA.barbeariaTapeteVertical,
      caixa: ICONES_FIGMA.caixa,
      estante: ICONES_FIGMA.estante,
      mesaAzulComprida: ICONES_FIGMA.mesaAzulComprida,
      mesaRoxa: ICONES_FIGMA.mesaRoxa,
      poltronaBranca: ICONES_FIGMA.poltronaBranca,
      visitanteTv: ICONES_FIGMA.visitanteTv,
    },

    decoracoes: {
      "3-1": "barbeariaTapeteDobra",
      "3-2": "barbeariaTapeteConexao",
      "3-3": "barbeariaTapeteConexao",
      "3-4": "barbeariaTapeteConexao",
      "3-5": "barbeariaTapeteConexao",
      "3-6": "barbeariaTapeteConexao",
      "4-1": "barbeariaTapeteVertical",
      "5-1": "barbeariaTapeteVertical",
      "6-1": "barbeariaTapeteDobra",
      "6-2": "barbeariaTapeteConexao",
      "7-1": "barbeariaTapeteVertical",
    },

    comodos: [
      {
        nome: "DEPÓSITO",
        cor: "#b5d0c1",
        rotulo: { left: 16, top: 36 },
        celulas: [
          ...celulasRetangulo(0, 0, 1, 3),
          "2-0",
          "2-1",
        ],
      },
      {
        nome: "SALA DOS FUNCIONÁRIOS",
        cor: "#e3eff4",
        rotulo: { left: 75, top: 25 },
        celulas: celulasRetangulo(0, 4, 1, 7),
      },
      {
        nome: "ÁREA PRINCIPAL",
        cor: "#de9cb1",
        rotulo: { left: 29, top: 74 },
        celulas: [
          ...celulasRetangulo(2, 2, 2, 7),
          ...celulasRetangulo(3, 0, 3, 7),
          ...celulasRetangulo(4, 0, 5, 4),
        ],
      },
      {
        nome: "ENTRADA",
        cor: "#755b75",
        rotulo: { left: 75, top: 74 },
        celulas: celulasRetangulo(4, 5, 5, 7),
      },
      {
        nome: "SALA DE ESPERA",
        cor: "#8c81c3",
        rotulo: { left: 48, top: 96 },
        celulas: celulasRetangulo(6, 0, 7, 7),
      },
    ],

    suspeitos: [
      { id: "adonis", nome: "Adonis", dica: "Ele estava ao lado da mesa na Entrada.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "bryson", nome: "Bryson", dica: "Ninguém na área dele tinha barba.", foto: "assets/suspeitos/brent.png" },
      { id: "craig", nome: "Craig", dica: "Ele estava sentado em uma cadeira.", foto: "assets/suspeitos/cameron.png" },
      { id: "dylan", nome: "Dylan", dica: "Ele estava ao lado de uma televisão. Ele estava sozinho.", foto: "assets/suspeitos/eduardo.png" },
      { id: "edisonBarbearia", nome: "Edison", dica: "Ele estava ao lado de uma caixa.", foto: "assets/suspeitos/vinita.png" },
      { id: "floyd", nome: "Floyd", dica: "Ele estava em um tapete.", foto: "assets/suspeitos/brent.png" },
      { id: "grant", nome: "Grant", dica: "Ele estava ao lado da estante na Sala de espera.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "vasiliy", nome: "Vasiliy", dica: "A vítima. Ele estava sozinho com o assassino.", foto: "assets/suspeitos/eduardo.png", isVitima: true },
    ],

    celulasBloqueadas: ["0-0","0-1","0-2","0-6","1-3","1-4","2-1","2-2","2-3","2-4","4-0","5-0","5-3","5-5","7-0","7-5"],

    solucaoMock: {
      "3-6": "adonis",
      "1-5": "bryson",
      "4-1": "craig",
      "5-4": "dylan",
      "5-6": "edisonBarbearia",
      "5-1": "floyd",
      "7-1": "grant",
      "7-3": "vasiliy",
    },
  },
  {
    id: 10,
    nome: "Preparadores",
    tamanho: 9,
    dificuldade: "medio",

    gridInicial: [
      ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
      ["vazio", "mesaAreiaComprida", "mesaAreiaComprida", "vazio", "poltronaBranca", "vazio", "vazio", "caixa", "vazio"],
      ["planta", "mesaAreiaComprida", "vazio", "mesaAreiaComprida", "poltronaBranca", "vazio", "visitanteTv", "vazio", "planta"],
      ["vazio", "vazio", "vazio", "poltronaBranca", "vazio", "vazio", "estante", "vazio", "vazio"],
      ["vazio", "vazio", "vazio", "mesaAreiaComprida", "vilaCamaBase", "vilaCamaCoberta", "vazio", "vazio", "vazio", "vazio"],
      ["vazio", "poltronaBranca", "mesaAreiaComprida", "estante", "vazio", "vazio", "vazio", "estante", "caixa"],
      ["mesaAreiaComprida", "visitanteTv", "mesaAreiaComprida", "vazio", "vazio", "estante", "caixa", "vazio", "vazio"],
      ["visitanteCamaBase", "poltronaBranca", "caixa", "vazio", "vazio", "vazio", "vazio", "caixa", "caixa"],
      ["visitanteCamaCoberta", "estante", "vazio", "vazio", "caixa", "vazio", "caixa", "estante", "vazio"],
    ],

    icones: {
      caixa: ICONES_FIGMA.caixa,
      estante: ICONES_FIGMA.estante,
      mesaAreiaComprida: ICONES_FIGMA.mesaAreiaComprida,
      planta: ICONES_FIGMA.planta,
      poltronaBranca: ICONES_FIGMA.poltronaBranca,
      visitanteCamaBase: ICONES_FIGMA.visitanteCamaBase,
      visitanteCamaCoberta: ICONES_FIGMA.visitanteCamaCoberta,
      visitanteTv: ICONES_FIGMA.visitanteTv,
      vilaCamaBase: ICONES_FIGMA.vilaCamaBase,
      vilaCamaCoberta: ICONES_FIGMA.vilaCamaCoberta,
    },

    comodos: [
      {
        nome: "PÁTIO",
        cor: "#93be61",
        rotulo: { left: 10, top: 8 },
        celulas: [
          ...celulasRetangulo(0, 0, 0, 8),
          "1-0", "1-7", "1-8",
          "2-0", "2-7", "2-8",
          "3-0", "3-7", "3-8",
          "4-0", "5-0",
          "4-7", "4-8",
        ],
      },
      {
        nome: "COZINHA",
        cor: "#d6c8a2",
        rotulo: { left: 24, top: 36 },
        celulas: celulasRetangulo(1, 1, 3, 3),
      },
      {
        nome: "SALA DE ESTAR",
        cor: "#f0c898",
        rotulo: { left: 55, top: 36 },
        celulas: celulasRetangulo(1, 4, 3, 6),
      },
      {
        nome: "BANHEIRO",
        cor: "#b1e2de",
        rotulo: { left: 18, top: 55 },
        celulas: [
          "4-1", "4-2",
          "5-1", "5-2",
        ],
      },
      {
        nome: "QUARTO",
        cor: "#efcf94",
        rotulo: { left: 62, top: 54 },
        celulas: [
          ...celulasRetangulo(4, 3, 5, 6),
          "6-4", "6-5", "6-6",
        ],
      },
      {
        nome: "SALA SEGURA",
        grupoBorda: "area-segura",
        cor: "#9eb0b5",
        rotulo: { left: 15, top: 96 },
        celulas: [
          "6-0", "6-1", "6-2",
          "7-0", "7-1", "7-2",
          "8-0", "8-1", "8-2", "8-3", "8-4",
        ],
      },
      {
        nome: "ESCADAS SECRETAS",
        grupoBorda: "area-segura",
        cor: "#9eb0b5",
        rotulo: { left: 38, top: 84 },
        celulas: [
          "6-3",
          "7-3", "7-4",
        ],
      },
      {
        nome: "DESPENSA",
        cor: "#a9bdc3",
        rotulo: { left: 80, top: 96 },
        celulas: celulasExceto(
          9,
          [
            ...celulasRetangulo(0, 0, 0, 8),
            "1-0", "1-7", "1-8",
            "2-0", "2-7", "2-8",
            "3-0", "3-7", "3-8",
            "4-0", "5-0",
            "4-7", "4-8",
          ],
          celulasRetangulo(1, 1, 3, 3),
          celulasRetangulo(1, 4, 3, 6),
          [
            "4-1", "4-2",
            "5-1", "5-2",
          ],
          [
            ...celulasRetangulo(4, 3, 5, 6),
            "6-4", "6-5", "6-6",
          ],
          [
            "6-0", "6-1", "6-2",
            "7-0", "7-1", "7-2",
            "8-0", "8-1", "8-2", "8-3", "8-4",
          ],
          [
            "6-3",
            "7-3", "7-4",
          ]
        ),
      },
    ],

    suspeitos: [
      { id: "angeloPreparadores", nome: "Angelo", dica: "Havia uma caixa na área dele. Ele não estava ao lado de nenhuma caixa.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "blake", nome: "Blake", dica: "Ele estava no quarto.", foto: "assets/suspeitos/brent.png" },
      { id: "carolina", nome: "Carolina", dica: "Havia um homem na cama em sua área.", foto: "assets/suspeitos/eduardo.png" },
      { id: "claudioPreparadores", nome: "Cláudio", dica: "Havia outra pessoa ao lado de uma prateleira na sua área.", foto: "assets/suspeitos/dolores.png" },
      { id: "edna", nome: "Edna", dica: "Ela estava na linha inferior.", foto: "assets/suspeitos/carissa.png" },
      { id: "friedrich", nome: "Friedrich", dica: "Ele estava ao lado de uma TV.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "greg", nome: "Greg", dica: "Ele estava sentado em uma cadeira.", foto: "assets/suspeitos/cameron.png" },
      { id: "howie", nome: "Howie", dica: "Ele estava no banheiro.", foto: "assets/suspeitos/vinita.png" },
      { id: "vivianna", nome: "Vivianna", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/eduardo.png", isVitima: true },
    ],

    celulasBloqueadas: ["1-1","1-2","1-7","2-0","2-1","2-3","2-6","2-8","3-6","4-3","5-2","5-3","5-7","5-8","6-0","6-1","6-2","6-5","6-6","7-2","7-7","7-8","8-1","8-4","8-6","8-7"],

    bordasExtras: {
      esquerda: ["6-3", "7-3"],
      direita: ["6-3", "7-4"],
      baixo: ["7-3", "7-4"],
    },

    bordasAbertas: {
      baixo: ["5-3", "6-4"],
    },

    solucaoMock: {
      "1-5": "angeloPreparadores",
      "4-5": "blake",
      "4-4": "carolina",
      "5-4": "claudioPreparadores",
      "8-3": "edna",
      "2-7": "friedrich",
      "7-1": "greg",
      "5-1": "howie",
      "8-8": "vivianna",
    },
  },
  {
    id: 11,
    nome: "A Adega",
    tamanho: 9,
    dificuldade: "dificil",

    gridInicial: [
      ["planta", "mesaRoxa", "vazio", "vazio", "visitanteCamaBase", "vazio", "poltronaBranca", "mesaRoxa", "mesaRoxa"],
      ["poltronaBranca", "vazio", "vazio", "vazio", "visitanteCamaCoberta", "vazio", "planta", "vazio", "vazio"],
      ["vazio", "poltronaBranca", "vazio", "vazio", "vazio", "vazio", "vazio", "mesaRoxa", "vazio"],
      ["visitanteTv", "vazio", "mesaRoxa", "vazio", "vazio", "mesaRoxa", "poltronaBranca", "vazio", "vazio"],
      ["planta", "vazio", "poltronaBranca", "vazio", "vazio", "poltronaBranca", "vazio", "vazio", "estante"],
      ["estante", "poltronaBranca", "vazio", "poltronaBranca", "vazio", "vazio", "vazio", "vazio", "mesaRoxa"],
      ["vazio", "vazio", "barril", "estante", "vazio", "barril", "estante", "vazio", "mesaRoxa"],
      ["estante", "visitanteTv", "estante", "vazio", "vazio", "barril", "vazio", "vazio", "vazio"],
      ["mesaRoxa", "mesaRoxa", "estante", "estante", "vazio", "estante", "vazio", "planta", "vazio"],
    ],

    icones: {
      barril: ICONES_FIGMA.barril,
      estante: ICONES_FIGMA.estante,
      mesaRoxa: ICONES_FIGMA.mesaRoxa,
      planta: ICONES_FIGMA.planta,
      poltronaBranca: ICONES_FIGMA.poltronaBranca,
      visitanteCamaBase: ICONES_FIGMA.visitanteCamaBase,
      visitanteCamaCoberta: ICONES_FIGMA.visitanteCamaCoberta,
      visitanteTv: ICONES_FIGMA.visitanteTv,
    },

    comodos: [
      {
        nome: "BANHEIRO",
        cor: "#bb9ba8",
        rotulo: { left: 17, top: 21 },
        celulas: [
          ...celulasRetangulo(0, 0, 0, 3),
          ...celulasRetangulo(1, 0, 1, 2),
        ],
      },
      {
        nome: "QUARTO PRINCIPAL",
        cor: "#d4a1b5",
        rotulo: { left: 50, top: 34 },
        celulas: [
          ...celulasRetangulo(0, 4, 0, 6),
          ...celulasRetangulo(1, 3, 1, 6),
          ...celulasRetangulo(2, 2, 2, 6),
        ],
      },
      {
        nome: "COZINHA",
        cor: "#c69a9a",
        rotulo: { left: 89, top: 34 },
        celulas: celulasRetangulo(0, 7, 2, 8),
      },
      {
        nome: "SALA DE ESTAR",
        cor: "#a37589",
        rotulo: { left: 27, top: 50 },
        celulas: [
          ...celulasRetangulo(2, 0, 2, 1),
          ...celulasRetangulo(3, 0, 4, 4),
        ],
      },
      {
        nome: "SALA DE JANTAR",
        cor: "#9f81a2",
        rotulo: { left: 62, top: 50 },
        celulas: celulasRetangulo(3, 5, 4, 8),
      },
      {
        nome: "ADEGA",
        cor: "#8f7180",
        rotulo: { left: 50, top: 96 },
        celulas: celulasRetangulo(6, 2, 8, 6),
      },
      {
        nome: "PORÃO",
        cor: "#a07983",
        rotulo: { left: 86, top: 96 },
        celulas: [
          ...celulasRetangulo(5, 0, 5, 8),
          ...celulasRetangulo(6, 0, 8, 1),
          ...celulasRetangulo(6, 7, 8, 8),
        ],
      },
    ],

    suspeitos: [
      { id: "austin", nome: "Austin", dica: "Ele não estava ao lado de uma mesa.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "benton", nome: "Benton", dica: "Ele estava na linha de baixo.", foto: "assets/suspeitos/brent.png" },
      { id: "chloe", nome: "Chloe", dica: "Ela estava ao lado de uma estante.", foto: "assets/suspeitos/dolores.png" },
      { id: "dawn", nome: "Dawn", dica: "Ela estava ao leste de Benton. Ela não estava ao lado de uma mesa.", foto: "assets/suspeitos/vinita.png" },
      { id: "eloise", nome: "Eloise", dica: "Ela estava no Porão. Ela não estava ao lado da TV.", foto: "assets/suspeitos/eduardo.png" },
      { id: "fred", nome: "Fred", dica: "Ele estava sozinho. Ele estava sentado em uma cadeira.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "gean", nome: "Gean", dica: "Ele estava no Banheiro.", foto: "assets/suspeitos/cameron.png" },
      { id: "henry", nome: "Henry", dica: "Ele estava ao lado de uma mesa.", foto: "assets/suspeitos/brent.png" },
      { id: "vinAdega", nome: "Vin", dica: "A vítima. Ele estava sozinho com o assassino.", foto: "assets/suspeitos/vinita.png", isVitima: true },
    ],

    celulasBloqueadas: ["0-0","0-1","0-7","0-8","1-6","2-7","3-0","3-2","3-5","4-0","4-8","5-0","5-3","5-8","6-2","6-3","6-5","6-6","6-8","7-0","7-1","7-2","7-5","8-0","8-1","8-2","8-3","8-5","8-7"],

    solucaoMock: {
      "4-4": "austin",
      "8-4": "benton",
      "4-7": "chloe",
      "8-5": "dawn",
      "7-8": "eloise",
      "4-5": "fred",
      "1-1": "gean",
      "7-2": "henry",
      "6-5": "vinAdega",
    },
  },
  {
    id: 12,
    nome: "O Minigolfe",
    tamanho: 10,
    dificuldade: "dificil",

    gridInicial: [
      ["vazio", "vazio", "vazio", "vazio", "vilaCactus", "vazio", "vazio", "minigolfMesaEsquerda", "minigolfMesaDireita", "flores"],
      ["vazio", "vazio", "vazio", "vazio", "bandeiraGolf", "vazio", "vazio", "vazio", "vazio", "vazio"],
      ["vazio", "vazio", "vazio", "poltronaBranca", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
      ["vazio", "vilaCactus", "vazio", "vazio", "vazio", "vazio", "vazio", "barril", "vazio", "vazio"],
      ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "barril", "vazio"],
      ["vazio", "vazio", "flores", "vazio", "vazio", "bandeiraGolf", "vazio", "vazio", "vazio", "vazio"],
      ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "minigolfMesaVertical"],
      ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "minigolfMesaFimComprida", "minigolfMesaComprida", "minigolfMesaLado"],
      ["bandeiraGolf", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "planta"],
      ["vazio", "vazio", "vazio", "vazio", "vazio", "flores", "poltronaBranca", "poltronaBranca", "vazio", "vazio"],
    ],

    icones: {
      bandeiraGolf: ICONES_FIGMA.bandeiraGolf,
      barril: ICONES_FIGMA.barril,
      flores: ICONES_FIGMA.flores,
      minigolfMesaComprida: ICONES_FIGMA.minigolfMesaComprida,
      minigolfMesaDireita: ICONES_FIGMA.minigolfMesaDireita,
      minigolfMesaEsquerda: ICONES_FIGMA.minigolfMesaEsquerda,
      minigolfMesaFimComprida: ICONES_FIGMA.minigolfMesaFimComprida,
      minigolfMesaLado: ICONES_FIGMA.minigolfMesaLado,
      minigolfMesaVertical: ICONES_FIGMA.minigolfMesaVertical,
      planta: ICONES_FIGMA.planta,
      poltronaBranca: ICONES_FIGMA.poltronaBranca,
      vilaCactus: ICONES_FIGMA.vilaCactus,
    },

    comodos: [
      {
        nome: "MINIGOLF VERDE CLARO",
        cor: "#a7dba4",
        exibirRotulo: false,
        grupoBorda: "minigolf",
        celulas: [
          ...celulasRetangulo(0, 0, 0, 4),
          "1-0", ...celulasRetangulo(1, 3, 1, 4),
          ...celulasRetangulo(3, 0, 3, 1),
          ...celulasRetangulo(3, 5, 3, 8),
          ...celulasRetangulo(4, 5, 4, 9),
          "5-5", ...celulasRetangulo(5, 8, 5, 9),
          ...celulasRetangulo(7, 1, 7, 3),
          ...celulasRetangulo(8, 0, 8, 2),
          ...celulasRetangulo(9, 0, 9, 1),
        ],
      },
      {
        nome: "MINIGOLF CAMPO",
        cor: "#90cb76",
        exibirRotulo: false,
        grupoBorda: "minigolf",
        celulas: [
          ...celulasRetangulo(0, 7, 0, 9),
          ...celulasRetangulo(1, 8, 1, 9),
          ...celulasRetangulo(2, 2, 2, 5),
          ...celulasRetangulo(2, 8, 2, 9),
          ...celulasRetangulo(3, 2, 3, 4),
          "3-9",
          ...celulasRetangulo(4, 2, 5, 4),
          "8-4",
          ...celulasRetangulo(9, 4, 9, 5),
        ],
      },
      {
        nome: "MINIGOLF TRILHA",
        cor: "#d8d8ab",
        exibirRotulo: false,
        grupoBorda: "minigolf",
        celulas: [
          ...celulasRetangulo(0, 5, 0, 6),
          ...celulasRetangulo(1, 5, 1, 7),
          ...celulasRetangulo(2, 6, 2, 7),
          ...celulasRetangulo(4, 0, 5, 1),
          ...celulasRetangulo(6, 3, 6, 5),
          "7-4",
        ],
      },
      {
        nome: "MINIGOLF AREIA",
        cor: "#f7f5a1",
        exibirRotulo: false,
        grupoBorda: "minigolf",
        celulas: [
          ...celulasRetangulo(1, 1, 1, 2),
          ...celulasRetangulo(2, 0, 2, 1),
          ...celulasRetangulo(5, 6, 5, 7),
        ],
      },
      {
        nome: "MINIGOLF ILHA",
        cor: "#a8e0e1",
        exibirRotulo: false,
        grupoBorda: "minigolf",
        celulas: [
          ...celulasRetangulo(6, 0, 6, 2),
          "7-0",
          "8-3",
          ...celulasRetangulo(9, 2, 9, 3),
        ],
      },
      {
        nome: "MINIGOLF ENTRADA",
        cor: "#dad9c3",
        exibirRotulo: false,
        grupoBorda: "minigolf",
        celulas: [
          ...celulasRetangulo(6, 6, 6, 9),
          ...celulasRetangulo(7, 5, 7, 9),
          ...celulasRetangulo(8, 5, 8, 9),
          ...celulasRetangulo(9, 6, 9, 9),
        ],
      },
      {
        nome: "O DESERTO",
        rotulo: { left: 9, top: 36 },
        celulas: ["3-0"],
      },
      {
        nome: "OS BARRIS",
        rotulo: { left: 67, top: 57 },
        celulas: ["5-7"],
      },
      {
        nome: "PASSARELA",
        rotulo: { left: 45, top: 88 },
        celulas: ["8-4"],
      },
      {
        nome: "A ILHA",
        rotulo: { left: 25, top: 88 },
        celulas: ["8-2"],
      },
      {
        nome: "ENTRADA",
        rotulo: { left: 73, top: 88 },
        celulas: ["8-7"],
      },
    ],

    bordasExtras: {
      direita: [
        ...celulasRetangulo(0, 4, 1, 4),
        ...celulasRetangulo(2, 1, 3, 1),
        "3-8",
        ...celulasRetangulo(3, 4, 5, 4),
        "6-2",
        "6-5",
        ...celulasRetangulo(7, 3, 9, 3),
        ...celulasRetangulo(7, 4, 8, 4),
        "9-5",
      ],
      baixo: [
        ...celulasRetangulo(1, 2, 1, 4),
        ...celulasRetangulo(2, 5, 2, 8),
        ...celulasRetangulo(3, 0, 3, 1),
        "3-9",
        ...celulasRetangulo(5, 0, 5, 2),
        ...celulasRetangulo(5, 5, 5, 9),
        "6-3",
        "6-5",
        "8-5",
      ],
    },

    suspeitos: [
      { id: "alisson", nome: "Alisson", dica: "Ele estava exatamente uma fileira ao sul de alguém em uma bandeira.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "brunaMinigolf", nome: "Bruna", dica: "Ela estava sentada em uma cadeira.", foto: "assets/suspeitos/vinita.png" },
      { id: "carlosMinigolf", nome: "Carlos", dica: "Ele não estava em um canto.", foto: "assets/suspeitos/cameron.png" },
      { id: "danielMinigolf", nome: "Daniel", dica: "Ele era a única pessoa em uma casa de trilha.", foto: "assets/suspeitos/brent.png" },
      { id: "eduarda", nome: "Eduarda", dica: "Ela estava em uma casa de areia.", foto: "assets/suspeitos/dolores.png" },
      { id: "fabia", nome: "Fabia", dica: "Ela estava sozinha.", foto: "assets/suspeitos/carissa.png" },
      { id: "gabiMinigolf", nome: "Gabi", dica: "Ela estava na fileira de cima.", foto: "assets/suspeitos/eduardo.png" },
      { id: "hugo", nome: "Hugo", dica: "Ele estava ao lado de flores.", foto: "assets/suspeitos/man_avatar.png" },
      { id: "isaMinigolf", nome: "Isa", dica: "Ela estava sozinha no Deserto com alguém.", foto: "assets/suspeitos/vinita.png" },
      { id: "virginiaMinigolf", nome: "Virginia", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/dolores.png", isVitima: true },
    ],

    celulasBloqueadas: ["0-4","0-7","0-8","0-9","3-1","3-7","4-8","5-2","6-9","7-7","7-8","7-9","8-9","9-5"],

    solucaoMock: {
      "2-4": "alisson",
      "9-6": "brunaMinigolf",
      "1-8": "carlosMinigolf",
      "7-4": "danielMinigolf",
      "4-0": "eduarda",
      "5-7": "fabia",
      "0-2": "gabiMinigolf",
      "5-3": "hugo",
      "3-1": "isaMinigolf",
      "8-8": "virginiaMinigolf",
    },
  },
];


window.TABULEIROS = TABULEIROS;

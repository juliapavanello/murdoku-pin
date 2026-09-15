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
      ["vazio", "vazio", "vazio", "vazio", "cozinhaMesa"],
    ],

    celulasBloqueadas: ["1-0", "3-0", "3-2", "3-4", "4-4"],

    icones: {
      lama: "assets/icones/Lama.png",
      porco: "assets/icones/noto-v1_pig.png",
      cozinhaMesa: ICONES_FIGMA.cozinhaMesa,
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
        celulas: ["2-0", "3-0", "3-1", "3-2", "4-0", "4-1", "4-2"],
      },
      {
        nome: "CHIQUEIRO",
        cor: "#e8b4a8",
        rotulo: { left: 82, top: 94 },
        celulas: ["2-3", "2-4", "3-3", "3-4", "4-3", "4-4"],
      },
    ],

    suspeitos: [
      { id: "andy", nome: "Andy", dica: "Ele estava no chiqueiro", foto: "assets/suspeitos/man_avatar.png", regraId: "estaNoComodo", regraParams: { comodo: "CHIQUEIRO" } },
      { id: "brent", nome: "Brent", dica: "Ele não estava sobre uma poça de lama", foto: "assets/suspeitos/brent.png", regraId: "naoEstaSobreTipo", regraParams: { tipo: "lama" } },
      { id: "carissa", nome: "Carissa", dica: "Ela estava ao lado da mesa", foto: "assets/suspeitos/carissa.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "mesa" } },
      { id: "dolores", nome: "Dolores", dica: "Ela estava no Pasto", foto: "assets/suspeitos/dolores.png", regraId: "estaNoComodo", regraParams: { comodo: "PASTO" } },
      { id: "eduardo", nome: "Eduardo", dica: "A Vítima. Ele estava sozinho com o assassino.", foto: "assets/suspeitos/eduardo.png", regraId: "semRestricao", isVitima: true },
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
      ["vazio", "estante", "planta", "vazio", "estante", "estante"],
      ["estante", "tapetePontaEsquerda", "continua", "continua", "continua", "tapetePontaDireita"],
      ["vazio", "poltrona", "vazio", "estante", "estante", "vazio"],
      ["poltrona", "vazio", "tapetePontaCima", "vazio", "vazio", "vazio"],
      ["poltrona", "tapetePontaEsquerda", "tapeteViraCima", "vazio", "tapetePontaEsquerda", "mesaDeLado2"],
      ["mesa", "vazio", "poltrona", "planta", "mesa", "mesaDeLado"],
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
          "1-0", "1-1", "1-2", "1-3", "1-4", "1-5",
          "2-3", "2-4"

        ],
      },
      {
        nome: "Circulo de Discussão",
        cor: "#B1E2DE",
        rotulo: { left: 35, top: 94 },
        celulas: [
          "2-0", "2-1", "2-2",
          "3-0", "3-1", "3-2", "3-3",
          "4-0", "4-1", "4-2", "4-3",
          "5-0", "5-1", "5-2", "5-3"
        ],
      },
      {
        nome: "Refresco",
        cor: "#EFD8F3",
        rotulo: { left: 82, top: 94 },
        celulas: ["2-5", "3-4", "3-5", "4-4", "4-5", "5-4", "5-5"],
      },
    ],

    suspeitos: [
      { id: "ada", nome: "Ada", dica: "Ela estava ao lado de uma planta.", foto: "assets/suspeitos/carissa.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "planta" } },
      { id: "brigitte", nome: "Brigitte", dica: "Ela estava ao sul de Cameron.", foto: "assets/suspeitos/dolores.png", regraId: "estaAoSulDeSuspeito", regraParams: { suspeitoId: "cameron" } },
      { id: "cameron", nome: "Cameron", dica: "Ela estava sobre um tapete.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaSobreTipo", regraParams: { tipo: "tapete" } },
      { id: "darlene", nome: "Darlene", dica: "Ela era a única pessoa sentada numa cadeira.", foto: "assets/suspeitos/cameron.png", regraId: "euSouOUnicoSobreTipo", regraParams: { tipo: "poltrona" } },
      { id: "edison", nome: "Edison", dica: "Ele estava na biblioteca. Ele não estava ao lado de uma estante", foto: "assets/suspeitos/brent.png", regraId: "estaNoComodoSemFicarAoLadoDeTipo", regraParams: { comodo: "Biblioteca", tipoEvitado: "estante" } },
      { id: "vinita", nome: "Vinita", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/vinita.png", regraId: "semRestricao", isVitima: true },
    ],

    celulasBloqueadas: ["0-1", "0-2", "0-|4", "0-5", "1-0", "2-3", "2-4", "4-5", "5-0", "5-3", "5-4", "5-5"],

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
      { id: "amir", nome: "Amir", dica: "Ele estava ao lado de uma planta.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "planta" } },
      { id: "bianca", nome: "Bianca", dica: "Ela estava na Oficina.", foto: "assets/suspeitos/dolores.png", regraId: "estaNoComodo", regraParams: { comodo: "OFICINA" } },
      { id: "carly", nome: "Carly", dica: "Ela estava sobre um tapete.", foto: "assets/suspeitos/vinita.png", regraId: "estaSobreTipo", regraParams: { tipo: "tapete" } },
      { id: "diane", nome: "Diane", dica: "Ela estava sentada numa cadeira.", foto: "assets/suspeitos/cameron.png", regraId: "estaSobreTipo", regraParams: { tipo: "cadeira" } },
      { id: "emmett", nome: "Emmett", dica: "Ele estava na primeira coluna.", foto: "assets/suspeitos/brent.png", regraId: "estaNaPrimeiraColuna" },
      { id: "felicia", nome: "Felícia", dica: "Ela estava na Área de vendas. Havia um homem com ela.", foto: "assets/suspeitos/carissa.png", regraId: "estaNoComodoComHomem", regraParams: { comodo: "ÁREA DE VENDAS", homensIds: ["amir", "emmett"] } },
      { id: "vickie", nome: "Vickie", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/eduardo.png", regraId: "semRestricao", isVitima: true },
    ],
    celulasBloqueadas: ["0-0", "0-1", "0-3", "2-0", "2-2", "2-6", "3-0", "3-6", "4-3", "4-4", "4-6", "5-0", "5-4", "6-0"],

    solucaoMock: {
      "5-6": "amir",
      "0-2": "bianca",
      "2-5": "carly",
      "1-1": "diane",
      "4-0": "emmett",
      "3-3": "felicia",
      "6-4": "vickie",
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
      ["cozinhaMesaEsquerda", "vazio", "vazio", "cadeira", "vazio", "vazio", "cozinhaMesa", "cadeira"],
      ["cozinhaMesaCanto", "cozinhaMesaDireita", "cadeira", "cozinhaMesa", "vazio", "cadeira", "vazio", "tapeteRosaEsqCima"],
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
      { id: "amelia", nome: "Amélia", genero: "mulher", dica: "Ela estava ao lado de uma planta.", foto: "assets/suspeitos/dolores.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "planta" } },
      { id: "beatriz", nome: "Beatriz", genero: "mulher", dica: "Ela não estava sentada em uma cadeira.", foto: "assets/suspeitos/vinita.png", regraId: "naoEstaSobreTipo", regraParams: { tipo: "cadeira" } },
      { id: "claudio", nome: "Cláudio", genero: "homem", dica: "Ele estava sobre um tapete.", foto: "assets/suspeitos/brent.png", regraId: "estaSobreTipo", regraParams: { tipo: "tapete" } },
      { id: "duarte", nome: "Duarte", genero: "homem", dica: "Ele não estava sentado em uma cadeira.", foto: "assets/suspeitos/jack.png", regraId: "naoEstaSobreTipo", regraParams: { tipo: "cadeira" } },
      { id: "elisa", nome: "Elisa", genero: "mulher", dica: "Ela estava ao lado de uma estante.", foto: "assets/suspeitos/carissa.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "estante" } },
      { id: "fatima", nome: "Fátima", genero: "mulher", dica: "Ela estava no Banheiro.", foto: "assets/suspeitos/dolores.png", regraId: "estaNoComodo", regraParams: { comodo: "BANHEIRO" } },
      { id: "gabriel", nome: "Gabriel", genero: "homem", dica: "Ele estava na Recepção.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaNoComodo", regraParams: { comodo: "RECEPÇÃO" } },
      { id: "vitoria", nome: "Vitória", genero: "mulher", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/eduardo.png", regraId: "semRestricao", regraParams: {}, isVitima: true },
    ],
    pistasGerais: [
      "Cada homem estava ao lado de uma mesa",
      "Para cada homem ao lado de uma mesa, havia uma mulher ao lado da mesma mesa",
    ],
    regrasGlobais: [
      { regraId: "cadaHomemAoLadoDeMesa" },
      { regraId: "seHomemAoLadoDeMesaTemMulherNaMesmaMesa" },
    ],
    celulasBloqueadas: ["0-0", "0-1", "0-3", "0-4", "1-0", "1-5", "1-6", "2-6", "3-1", "3-2", "3-3", "4-1", "4-4", "4-5", "5-0", "5-6", "6-0", "6-1", "6-3", "7-5"],

    solucaoMock: {
      "4-3": "amelia",
      "3-4": "beatriz",
      "2-2": "claudio",
      "1-7": "duarte",
      "5-1": "elisa",
      "0-6": "fatima",
      "7-0": "gabriel",
      "6-5": "vitoria",
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
      ["estante", "vazio", "vazio", "vazio", "vilaCactus", "vazio", "vazio", "vazio", "estante", "cadeira"],
      ["vilaSacoDinheiro", "vazio", "estante", "vilaCaixaRegistradora", "vilaCavalo", "vilaSacoDinheiro", "vazio", "vilaMesaLado", "vazio", "vilaMesa"],
      ["vazio", "cadeira", "vazio", "vazio", "vazio", "vazio", "vilaFimMesa", "vilaMesaLadoBaixo", "vazio", "vazio"],
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
      vilaMesaLado: ICONES_FIGMA.vilaMesaLado,
      vilaMesaLadoBaixo: ICONES_FIGMA.vilaMesaLadoBaixo,
      vilaSacoDinheiro: ICONES_FIGMA.vilaSacoDinheiro,
    },

    comodos: [
      {
        nome: "CASA DO PASTOR",
        cor: "#d8c894",
        rotulo: { left: 13, top: 28 },
        celulas: [
          ...celulasRetangulo(0, 0, 1, 2),
          ...celulasRetangulo(2, 0, 2, 1),
        ],
      },
      {
        nome: "CAPELA",
        cor: "#f4d2ac",
        rotulo: { left: 61, top: 49 },
        celulas: celulasRetangulo(0, 4, 4, 7),
      },
      {
        nome: "ARMAZÉM GERAL",
        cor: "#ddbea0",
        rotulo: { left: 21, top: 98 },
        celulas: [
          ...celulasRetangulo(5, 0, 6, 2),
          ...celulasRetangulo(7, 0, 9, 3),
        ],
      },
      {
        nome: "VARANDA",
        cor: "#dfbf95",
        rotulo: { left: 50, top: 98 },
        celulas: [
          "6-6",
          ...celulasRetangulo(7, 4, 7, 6),
          ...celulasRetangulo(8, 4, 9, 5),
        ],
      },
      {
        nome: "BANCO",
        cor: "#b89a7b",
        rotulo: { left: 81, top: 98 },
        celulas: [
          ...celulasRetangulo(6, 7, 7, 9),
          ...celulasRetangulo(8, 6, 9, 9),
        ],
      },
      {
        nome: "EXTERIOR",
        cor: "#eed184",
        rotulo: { left: 48, top: 66 },
        celulas: celulasExceto(
          10,
          celulasRetangulo(0, 0, 1, 2),
          celulasRetangulo(2, 0, 2, 1),
          celulasRetangulo(0, 4, 4, 7),
          celulasRetangulo(5, 0, 6, 2),
          celulasRetangulo(7, 0, 9, 3),
          ["6-6"],
          celulasRetangulo(7, 4, 7, 6),
          celulasRetangulo(8, 4, 9, 5),
          celulasRetangulo(6, 7, 7, 9),
          celulasRetangulo(8, 6, 9, 9)
        ),
      },
    ],

    suspeitos: [
      {
        "id": "abigail",
        "nome": "Abigail",
        "dica": "Ela estava ao lado de uma caixa registradora.",
        "foto": "assets/suspeitos/carissa.png",
        "regraId": "estaAoLadoDeTipo",
        "regraParams": {
          "tipo": "caixaRegistradora"
        }
      },
      {
        "id": "bruna",
        "nome": "Bruna",
        "dica": "Ela estava em um canto de sua área.",
        "foto": "assets/suspeitos/dolores.png",
        "regraId": "estaNoCantoDaArea",
        "regraParams": {}
      },
      {
        "id": "carlos",
        "nome": "Carlos",
        "dica": "Ele estava sentado em uma cadeira.",
        "foto": "assets/suspeitos/man_avatar.png",
        "regraId": "estaSobreTipo",
        "regraParams": {
          "tipo": "cadeira"
        }
      },
      {
        "id": "daniel",
        "nome": "Daniel",
        "dica": "Não é o foragido. Ele estava ao lado de uma cadeira.",
        "foto": "assets/suspeitos/brent.png",
        "regraId": "estaAoLadoDeTipo",
        "regraParams": {
          "tipo": "cadeira"
        }
      },
      {
        "id": "edina",
        "nome": "Edina",
        "dica": "Ela estava no Banco.",
        "foto": "assets/suspeitos/vinita.png",
        "regraId": "estaNoComodo",
        "regraParams": {
          "comodo": "BANCO"
        }
      },
      {
        "id": "frank",
        "nome": "Frank",
        "dica": "Ela estava montado em um cavalo.",
        "foto": "assets/suspeitos/eduardo.png",
        "regraId": "estaSobreTipo",
        "regraParams": {
          "tipo": "vilaCavalo"
        }
      },
      {
        "id": "garrett",
        "nome": "Garrett",
        "dica": "Ele estava ao lado de um cacto.",
        "foto": "assets/suspeitos/jack.png",
        "regraId": "estaAoLadoDeTipo",
        "regraParams": {
          "tipo": "vilaCactus"
        }
      },
      {
        "id": "hazel",
        "nome": "Hazel",
        "dica": "Ela estava sentada numa cadeira. Ela estava com o foragido.",
        "foto": "assets/suspeitos/dolores.png",
        "regraId": "estaSobreTipo",
        "regraParams": {
          "tipo": "cadeira"
        }
      },
      {
        "id": "isa",
        "nome": "Isa",
        "dica": "Ela estava ao Sul de Hazel, em uma área diferente.",
        "foto": "assets/suspeitos/carissa.png",
        "regraId": "estaAoSulEEmAreaDiferenteDeSuspeito",
        "regraParams": {
          "suspeitoId": "hazel"
        }
      },
      {
        "id": "vini",
        "nome": "Vini",
        "dica": "A vítima. Ele estava sozinho com o assassino.",
        "foto": "assets/suspeitos/floyd.png",
        "isVitima": true,
        "regraId": "estaNoComodoComUmaPessoaESozinhaNoComodo",
        "regraParams": {}
      }
    ],

    pistasGerais: [
      "Há exatamente um foragido escondido entre os suspeitos. O foragido pode ser ou não o assassino.",
      "O foragido estava ao lado de uma mesa."
    ],

    regrasGlobais: [
      {
        "regraId": "existeForagidoCompativel",
        "params": {
          "companhiaId": "hazel",
          "excluidosIds": [
            "daniel",
            "vini"
          ],
          "tipo": "mesa"
        }
      }
    ],

    celulasBloqueadas: ["0-1", "0-2", "0-8", "1-5", "1-6", "2-1", "2-2", "2-4", "2-9", "4-0", "6-0", "6-4", "6-8", "7-0", "7-2", "7-3", "7-5", "7-7", "7-9", "8-6", "8-7", "9-0", "9-2", "9-3", "9-6", "9-9"],

    solucaoMock: {
      "8-3": "abigail",
      "3-8": "frank",
      "9-7": "edina",
      "1-0": "carlos",
      "6-9": "hazel",
      "4-1": "garrett",
      "2-6": "daniel",
      "7-4": "isa",
      "5-2": "bruna",
      "0-5": "vini"
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
      { id: "allison", nome: "Allison", dica: "Ela estava na primeira coluna.", foto: "assets/suspeitos/dolores.png", regraId: "estaNaPrimeiraColuna" },
      { id: "brendon", nome: "Brendon", dica: "Ele estava uma fileira ao sul de Donovan, em outra área.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaUmaLinhaAoSulEEmAreaDiferenteDeSuspeito", regraParams: { suspeitoId: "donovan" } },
      { id: "clark", nome: "Clark", dica: "Ela estava ao lado da pedra.", foto: "assets/suspeitos/cameron.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "pinturaPedra" } },
      { id: "donovan", nome: "Donovan", dica: "Ele estava ao lado do cavalete.", foto: "assets/suspeitos/brent.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "pinturaCavalete" } },
      { id: "ellie", nome: "Ellie", dica: "Ela estava sentada em uma cadeira.", foto: "assets/suspeitos/carissa.png", regraId: "estaSobreTipo", regraParams: { tipo: "poltronaBranca" } },
      { id: "vincenza", nome: "Vincenza", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/vinita.png", regraId: "semRestricao", isVitima: true },
    ],

    celulasBloqueadas: ["0-2", "1-3", "1-4", "2-0", "2-4", "4-3"],

    solucaoMock: {
      "1-0": "allison",
      "4-5": "brendon",
      "0-1": "clark",
      "3-4": "donovan",
      "5-3": "ellie",
      "2-2": "vincenza",
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
      ["flores", "vazio", "vazio", "vazio", "tapeteRosaMeioCima", "vazio", "vazio", "vazio", "vazio"],
      ["vazio", "vazio", "flores", "poltronaBranca", "tapeteRosaMeioBaixo", "poltronaBranca", "poltronaBranca", "flores", "casamentoArvore"],
      ["casamentoArvore", "mesaEsquerda", "mesaDireita", "flores", "vazio", "vazio", "flores", "vazio", "vazio"],
      ["vazio", "vazio", "mesa", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
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
      { id: "archer", nome: "Archer", genero: "homem", dica: "Ele estava ao lado de uma mesa.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "mesa" } },
      { id: "brooke", nome: "Brooke", genero: "mulher", dica: "Ela estava ao lado de algumas flores.", foto: "assets/suspeitos/vinita.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "flores" } },
      { id: "crystal", nome: "Crystal", genero: "mulher", dica: "Ela estava na 5 coluna.", foto: "assets/suspeitos/dolores.png", regraId: "estaNaQuintaColuna", regraParams: { genero: "homem", tipo: "poltronaBranca" } },
      { id: "daisy", nome: "Daisy", genero: "mulher", dica: "Ela estava no Alpendre.", foto: "assets/suspeitos/carissa.png", regraId: "estaNoComodo", regraParams: { comodo: "ALPENDRE" } },
      { id: "ernie", nome: "Ernie", genero: "homem", dica: "Ele estava a nordeste de Crystal.", foto: "assets/suspeitos/cameron.png", regraId: "estaAoNordesteDeSuspeito", regraParams: { suspeitoId: "crystal" } },
      { id: "finn", nome: "Finn", genero: "homem", dica: "Ele estava num canto da sua área.", foto: "assets/suspeitos/brent.png", regraId: "estaNoCantoDaArea" },
      { id: "giulia", nome: "Giulia", genero: "mulher", dica: "Ela estava com alguém que estava ao lado de uma árvore.", foto: "assets/suspeitos/vinita.png", regraId: "estaNaAreaComPessoaAoLadoDeTipo", regraParams: { tipo: "casamentoArvore" } },
      { id: "harper", nome: "Harper", genero: "mulher", dica: "Ela estava sentada numa cadeira.", foto: "assets/suspeitos/eduardo.png", regraId: "estaSobreTipo", regraParams: { tipo: "poltronaBranca" } },
      { id: "vikram", nome: "Vikram", genero: "homem", dica: "A vítima. Ele estava sozinha com o assassino.", foto: "assets/suspeitos/man_avatar.png", isVitima: true, regraId: "semRestricao" },
    ],
    pistasGerais: [
      "Havia um homem e uma mulher no altar",
    ],
    regrasGlobais: [
      { regraId: "homemEMulherNoComodo", params: { comodo: "ALTAR" } }
    ],

    celulasBloqueadas: ["0-1", "0-4", "0-8", "1-0", "2-5", "3-2", "3-8", "4-8", "6-0", "6-2", "6-7", "6-8", "7-1", "7-2", "7-3", "7-6", "8-0", "8-2"],

    solucaoMock: {
      "5-8": "archer",
      "7-7": "brooke",
      "1-4": "crystal",
      "8-3": "daisy",
      "0-5": "ernie",
      "6-6": "finn",
      "3-1": "giulia",
      "4-2": "harper",
      "2-0": "vikram",
    },
  },
  {
    id: 8,
    nome: "Visitantes Inesperados",
    tamanho: 9,
    dificuldade: "dificil",

    gridInicial: [
      ["estante", "planta", "estante", "vazio", "mesa", "vazio", "planta", "visitanteCamaBase", "vazio"],
      ["visitanteCamaBase", "tapeteAzulCima", "vazio", "vazio", "vazio", "vazio", "visitanteTapeteQuartoPrincipalCima", "visitanteCamaCoberta", "vazio"],
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
      { id: "angelo", nome: "Angelo", dica: "Ele estava ao lado da televisão.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "visitanteTv" } },
      { id: "bruna", nome: "Bruna", dica: "Ela estava em uma cama.", foto: "assets/suspeitos/vinita.png", regraId: "estaSobreTipo", regraParams: { tipo: "visitanteCama" } },
      { id: "camila", nome: "Camila", dica: "Ela estava na última coluna.", foto: "assets/suspeitos/dolores.png", regraId: "estaNaUltimaColuna", regraParams: {} },
      { id: "danielVisitante", nome: "Daniel", dica: "Ele estava ao lado de uma mesa.", foto: "assets/suspeitos/jack.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "mesa" } },
      { id: "ed", nome: "Ed", dica: "Ele era a única pessoa ao lado de uma planta.", foto: "assets/suspeitos/brent.png", regraId: "euSouOUnicoAoLadoDeTipo", regraParams: { tipo: "planta" } },
      { id: "fabio", nome: "Fabio", dica: "Ele estava ao lado de uma prateleira.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "estante" } },
      { id: "gabi", nome: "Gabi", dica: "Ela estava ao lado de uma cama.", foto: "assets/suspeitos/carissa.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "visitanteCama" } },
      { id: "hayden", nome: "Hayden", dica: "Ele estava sentado em uma cadeira.", foto: "assets/suspeitos/eduardo.png", regraId: "estaSobreTipo", regraParams: { tipo: "poltronaBranca" } },
      { id: "virginia", nome: "Virginia", dica: "A vítima. Ele estava sozinha com o assassino.", foto: "assets/suspeitos/vinita.png", isVitima: true, regraId: "semRestricao" },
    ],
    pistasGerais: [
      "Havia somente uma pessoa em um tapete",
    ],
    regrasGlobais: [
      { regraId: "somenteUmaPessoaTapete" },
    ],
    celulasBloqueadas: ["0-0", "0-1", "0-2", "0-4", "0-6", "2-2", "2-4", "3-2", "3-8", "4-1", "5-0", "5-6", "5-7", "6-5", "7-6", "7-7", "8-2"],

    solucaoMock: {
      "2-5": "angelo",
      "1-7": "bruna",
      "8-8": "camila",
      "5-1": "danielVisitante",
      "6-6": "ed",
      "0-3": "fabio",
      "3-0": "gabi",
      "4-2": "hayden",
      "7-4": "virginia",
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
      { id: "adonis", nome: "Adonis", dica: "Ele estava ao lado da mesa na Entrada.", foto: "assets/suspeitos/jack.png", regraId: "estaAoLadoDeTipoNoComodo", regraParams: { tipo: "mesa", comodo: "ENTRADA" } },
      { id: "bryson", nome: "Bryson", dica: "Ninguém na área dele tinha barba.", foto: "assets/suspeitos/brent.png", regraId: "nenhumBarbadoNaArea", regraParams: { barbadosIds: ["adonis", "craig", "floyd", "grant", "vasiliy"] } },
      { id: "craig", nome: "Craig", dica: "Ele estava sentado em uma cadeira.", foto: "assets/suspeitos/craig.png", regraId: "estaSobreTipo", regraParams: { tipo: "poltronaBranca" } },
      { id: "dylan", nome: "Dylan", dica: "Ele estava ao lado de uma televisão. Ele estava sozinho.", foto: "assets/suspeitos/eduardo.png", regraId: "estaAoLadoDeTipoESozinho", regraParams: { tipo: "visitanteTv" } },
      { id: "edisonBarbearia", nome: "Edison", dica: "Ele estava ao lado de uma caixa.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "caixa" } },
      { id: "floyd", nome: "Floyd", dica: "Ele estava em um tapete.", foto: "assets/suspeitos/floyd.png", regraId: "estaSobreTipo", regraParams: { tipo: "barbeariaTapete" } },
      { id: "grant", nome: "Grant", dica: "Ele estava ao lado da estante na Sala de espera.", foto: "assets/suspeitos/grant.png", regraId: "estaAoLadoDeTipoNoComodo", regraParams: { tipo: "estante", comodo: "SALA DE ESPERA" } },
      { id: "vasiliy", nome: "Vasiliy", dica: "A vítima. Ele estava sozinho com o assassino.", foto: "assets/suspeitos/vasiliy.png", isVitima: true, regraId: "semRestricao" },
    ],

    celulasBloqueadas: ["0-0", "0-1", "0-2", "0-6", "1-3", "1-4", "2-1", "2-2", "2-3", "2-4", "4-0", "5-0", "5-3", "5-5", "7-0", "7-5"],

    solucaoMock: {
      "5-6": "adonis",
      "2-0": "bryson",
      "3-4": "craig",
      "1-5": "dylan",
      "0-3": "edisonBarbearia",
      "6-2": "floyd",
      "7-1": "grant",
      "4-7": "vasiliy",
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
      ["vazio", "mesaAreiaComprida", "vazio", "mesaAreiaComprida", "poltronaBranca", "vazio", "visitanteTv", "vazio", "planta"],
      ["planta", "vazio", "vazio", "poltronaBranca", "vazio", "vazio", "estante", "vazio", "vazio"],
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
          "6-4",
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
            "6-4",
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
      { id: "angeloPreparadores", nome: "Angelo", dica: "Havia uma caixa na área dele. Ele não estava ao lado de nenhuma caixa.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaNaAreaComTipoENaoAoLado", regraParams: { tipo: "caixa" } },
      { id: "blake", nome: "Blake", dica: "Ele estava no quarto.", foto: "assets/suspeitos/brent.png", regraId: "estaNoComodo", regraParams: { comodo: "QUARTO" } },
      { id: "carolina", nome: "Carolina", dica: "Havia um homem na cama em sua área.", foto: "assets/suspeitos/eduardo.png", regraId: "estaNaAreaComPessoaSobreTipo", regraParams: { tipo: "vilaCama" } },
      { id: "daryl", nome: "Daryl", dica: "Havia outra pessoa ao lado de uma prateleira na sua área.", foto: "assets/suspeitos/jack.png", regraId: "estaNaAreaComPessoaAoLadoDeTipo", regraParams: { tipo: "estante" } },
      { id: "edna", nome: "Edna", dica: "Ela estava na linha inferior.", foto: "assets/suspeitos/carissa.png", regraId: "estaNaUltimaLinha", regraParams: {} },
      { id: "friedrich", nome: "Friedrich", dica: "Ele estava ao lado de uma TV.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "visitanteTv" } },
      { id: "greg", nome: "Greg", dica: "Ele estava sentado em uma cadeira.", foto: "assets/suspeitos/grant.png", regraId: "estaSobreTipo", regraParams: { tipo: "poltronaBranca" } },
      { id: "howie", nome: "Howie", dica: "Ele estava no banheiro.", foto: "assets/suspeitos/vinita.png", regraId: "estaNoComodo", regraParams: { comodo: "BANHEIRO" } },
      { id: "vivianna", nome: "Vivianna", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/eduardo.png", isVitima: true, regraId: "semRestricao" },
    ],

    celulasBloqueadas: ["1-1", "1-2", "1-7", "2-0", "2-1", "2-3", "2-6", "2-8", "3-6", "4-3", "5-2", "5-3", "5-7", "5-8", "6-0", "6-1", "6-2", "6-5", "6-6", "7-2", "7-7", "7-8", "8-1", "8-4", "8-6", "8-7"],

    bordasExtras: {
      esquerda: ["6-3", "7-3"],
      direita: ["6-3", "7-4"],
      baixo: ["7-3", "7-4"],
    },

    bordasAbertas: {
      baixo: ["5-3", "6-4"],
    },

    solucaoMock: {
      "0-8": "angeloPreparadores",
      "4-5": "blake",
      "6-4": "carolina",
      "7-0": "daryl",
      "8-2": "edna",
      "1-6": "friedrich",
      "3-3": "greg",
      "5-1": "howie",
      "2-7": "vivianna",
    },
  },
  {
    id: 11,
    nome: "A Adega",
    tamanho: 9,
    dificuldade: "dificil",

    gridInicial: [
      ["planta", "mesaRoxa", "vazio", "poltronaBranca", "visitanteCamaBase", "vazio", "poltronaBranca", "mesaRoxa", "mesaRoxa"],
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
      { id: "austin", nome: "Austin", dica: "Ele não estava ao lado de uma mesa.", foto: "assets/suspeitos/man_avatar.png", regraId: "naoEstaAoLadoDeTipo", regraParams: { tipo: "mesa" } },
      { id: "benton", nome: "Benton", dica: "Ele estava na linha de baixo.", foto: "assets/suspeitos/brent.png", regraId: "estaNaUltimaLinha", regraParams: {} },
      { id: "chloe", nome: "Chloe", dica: "Ela estava ao lado de uma estante.", foto: "assets/suspeitos/dolores.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "estante" } },
      { id: "dawn", nome: "Dawn", dica: "Ela estava ao leste de Benton. Ela não estava ao lado de uma mesa.", foto: "assets/suspeitos/vinita.png", regraId: "estaAoLesteENaoAoLadoDeTipo", regraParams: { suspeitoId: "benton", tipo: 'mesa' } },
      { id: "eloise", nome: "Eloise", dica: "Ela estava no Porão. Ela não estava ao lado da TV.", foto: "assets/suspeitos/eduardo.png", regraId: "estaNoComodoENaoAoLadoDeTipo", regraParams: { comodo: "PORÃO", tipo: "visitanteTv" } },
      { id: "fred", nome: "Fred", dica: "Ele estava sozinho. Ele estava sentado em uma cadeira.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaSozinhoNoComodoESobreTipo", regraParams: { tipo: "poltronaBranca" } },
      { id: "gean", nome: "Gean", dica: "Ele estava no Banheiro.", foto: "assets/suspeitos/jack.png", regraId: "estaNoComodo", regraParams: { comodo: "BANHEIRO" } },
      { id: "henry", nome: "Henry", dica: "Ele estava ao lado de uma mesa.", foto: "assets/suspeitos/brent.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "mesa" } },
      { id: "vinAdega", nome: "Vin", dica: "A vítima. Ele estava sozinho com o assassino.", foto: "assets/suspeitos/floyd.png", isVitima: true, regraId: "semRestricao" },
    ],
    pistasGerais: [
      "Havia exatamente uma pessoa na cama",
      "Não havia cômodo vazio",
      "Havia exatamenteduas pessoas sentadas em uma cadeira",
    ],
    regrasGlobais: [
      { regraId: "exatamenteUmaPessoaNaCama" },
      { regraId: "nenhumComodoVazio" },
      { regraId: "exatamenteDuasPessoasNaCadeira" },
    ],

    celulasBloqueadas: ["0-0", "0-1", "0-7", "0-8", "1-6", "2-7", "3-0", "3-2", "3-5", "4-0", "4-8", "5-0", "5-3", "5-8", "6-2", "6-3", "6-5", "6-6", "6-8", "7-0", "7-1", "7-2", "7-5", "8-0", "8-1", "8-2", "8-3", "8-5", "8-7"],

    solucaoMock: {
      "0-4": "austin",
      "8-6": "benton",
      "7-3": "chloe",
      "3-7": "dawn",
      "5-5": "eloise",
      "4-2": "fred",
      "1-0": "gean",
      "2-8": "henry",
      "6-1": "vinAdega",
    }
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

    // Áreas lógicas seguem as bordas; cores e terrenos são independentes.
    comodos: [
      {
        nome: "O DESERTO",
        cor: "#a7dba4",
        grupoBorda: "minigolf",
        rotulo: { left: 9, top: 36 },
        celulas: [
          "0-0", "0-1", "0-2", "0-3", "0-4",
          "1-0", "1-1", "1-2", "1-3", "1-4",
          "2-0", "2-1",
          "3-0", "3-1",
        ],
        corPorCelula: {
          "1-1": "#f7f5a1",
          "1-2": "#f7f5a1",
          "2-0": "#f7f5a1",
          "2-1": "#f7f5a1",
        },
      },
      {
        nome: "PASSARELA",
        cor: "#90cb76",
        grupoBorda: "minigolf",
        rotulo: { left: 45, top: 88 },
        celulas: [
          "0-5", "0-6", "0-7", "0-8", "0-9",
          "1-5", "1-6", "1-7", "1-8", "1-9",
          "2-2", "2-3", "2-4", "2-5", "2-6", "2-7", "2-8", "2-9",
          "3-2", "3-3", "3-4", "3-9",
          "4-0", "4-1", "4-2", "4-3", "4-4",
          "5-0", "5-1", "5-2", "5-3", "5-4",
          "6-3", "6-4", "6-5",
          "7-4",
          "8-4",
          "9-4", "9-5",
        ],
        corPorCelula: {
          "0-5": "#d8d8ab",
          "0-6": "#d8d8ab",
          "1-5": "#d8d8ab",
          "1-6": "#d8d8ab",
          "1-7": "#d8d8ab",
          "2-6": "#d8d8ab",
          "2-7": "#d8d8ab",
          "4-0": "#d8d8ab",
          "4-1": "#d8d8ab",
          "5-0": "#d8d8ab",
          "5-1": "#d8d8ab",
          "6-3": "#d8d8ab",
          "6-4": "#d8d8ab",
          "6-5": "#d8d8ab",
          "7-4": "#d8d8ab",
        },
      },
      {
        nome: "OS BARRIS",
        cor: "#a7dba4",
        grupoBorda: "minigolf",
        rotulo: { left: 67, top: 57 },
        celulas: [
          "3-5", "3-6", "3-7", "3-8",
          "4-5", "4-6", "4-7", "4-8", "4-9",
          "5-5", "5-6", "5-7", "5-8", "5-9",
        ],
        corPorCelula: {
          "5-6": "#f7f5a1",
          "5-7": "#f7f5a1",
        },
      },
      {
        nome: "A ILHA",
        cor: "#a7dba4",
        grupoBorda: "minigolf",
        rotulo: { left: 25, top: 88 },
        celulas: [
          "6-0", "6-1", "6-2",
          "7-0", "7-1", "7-2", "7-3",
          "8-0", "8-1", "8-2", "8-3",
          "9-0", "9-1", "9-2", "9-3",
        ],
        corPorCelula: {
          "6-0": "#a8e0e1",
          "6-1": "#a8e0e1",
          "6-2": "#a8e0e1",
          "7-0": "#a8e0e1",
          "8-3": "#a8e0e1",
          "9-2": "#a8e0e1",
          "9-3": "#a8e0e1",
        },
      },
      {
        nome: "ENTRADA",
        cor: "#dad9c3",
        grupoBorda: "minigolf",
        rotulo: { left: 73, top: 88 },
        celulas: [
          "6-6", "6-7", "6-8", "6-9",
          "7-5", "7-6", "7-7", "7-8", "7-9",
          "8-5", "8-6", "8-7", "8-8", "8-9",
          "9-6", "9-7", "9-8", "9-9",
        ],
      },
    ],

    decoracoes: {
      "0-5": ["trilha"],
      "0-6": ["trilha"],
      "1-5": ["trilha"],
      "1-6": ["trilha"],
      "1-7": ["trilha"],
      "2-6": ["trilha"],
      "2-7": ["trilha"],
      "4-0": ["trilha"],
      "4-1": ["trilha"],
      "5-0": ["trilha"],
      "5-1": ["trilha"],
      "6-3": ["trilha"],
      "6-4": ["trilha"],
      "6-5": ["trilha"],
      "7-4": ["trilha"],
      "1-1": ["areia"],
      "1-2": ["areia"],
      "2-0": ["areia"],
      "2-1": ["areia"],
      "5-6": ["areia"],
      "5-7": ["areia"],
    },

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
      { id: "alisson", nome: "Alisson", dica: "Ele estava exatamente uma fileira ao sul de alguém em uma bandeira.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaUmaLinhaAoSulDePessoaSobreTipo", regraParams: { tipo: "bandeiraGolf" } },
      { id: "brunaMinigolf", nome: "Bruna", dica: "Ela estava sentada em uma cadeira.", foto: "assets/suspeitos/vinita.png", regraId: "estaSobreTipo", regraParams: { tipo: "poltronaBranca" } },
      { id: "carlosMinigolf", nome: "Carlos", dica: "Ele não estava em um canto.", foto: "assets/suspeitos/jack.png", regraId: "naoEstaNoCantoDaArea", regraParams: {} },
      { id: "danielMinigolf", nome: "Daniel", dica: "Ele era a única pessoa em uma casa de trilha.", foto: "assets/suspeitos/brent.png", regraId: "euSouOUnicoSobreTipo", regraParams: { tipo: "trilha" } },
      { id: "eduarda", nome: "Eduarda", dica: "Ela estava em uma casa de areia.", foto: "assets/suspeitos/dolores.png", regraId: "estaSobreTipo", regraParams: { tipo: "areia" } },
      { id: "fabia", nome: "Fabia", dica: "Ela estava sozinha.", foto: "assets/suspeitos/carissa.png", regraId: "estaSozinhoNoComodo", regraParams: {} },
      { id: "gabiMinigolf", nome: "Gabi", dica: "Ela estava na fileira de cima.", foto: "assets/suspeitos/eduardo.png", regraId: "estaNaPrimeiraLinha", regraParams: {} },
      { id: "hugo", nome: "Hugo", dica: "Ele estava ao lado de flores.", foto: "assets/suspeitos/man_avatar.png", regraId: "estaAoLadoDeTipo", regraParams: { tipo: "flores" } },
      { id: "isaMinigolf", nome: "Isa", dica: "Ela estava sozinha no Deserto com alguém.", foto: "assets/suspeitos/vinita.png", regraId: "estaNoComodoComUmaPessoaESozinhaNoComodo", regraParams: { comodo: "O DESERTO" } },
      { id: "virginiaMinigolf", nome: "Virginia", dica: "A vítima. Ela estava sozinha com o assassino.", foto: "assets/suspeitos/dolores.png", isVitima: true, regraId: "estaNoComodoComUmaPessoaESozinhaNoComodo", regraParams: {} },
    ],
    pistasGerais: [
      "Havia exatamente uma pessoa ao lado de uma mesa",
      "Havia exatamente uma pessoa ao lado de um barril",
    ],
    regrasGlobais: [
      { regraId: "exatamenteUmaPessoaAoLadoDeTipo", params: { tipo: "minigolfMesa" } },
      { regraId: "exatamenteUmaPessoaAoLadoDeTipo", params: { tipo: "barril" } },
    ],

    celulasBloqueadas: ["0-4", "0-7", "0-8", "0-9", "3-1", "3-7", "4-8", "5-2", "6-9", "7-7", "7-8", "7-9", "8-9", "9-5"],

    solucaoMock: {
      "9-9": "alisson",
      "2-3": "brunaMinigolf",
      "7-6": "carlosMinigolf",
      "6-5": "danielMinigolf",
      "5-7": "eduarda",
      "8-0": "fabia",
      "0-1": "gabiMinigolf",
      "4-2": "hugo",
      "1-4": "isaMinigolf",
      "3-8": "virginiaMinigolf",
    },
  },
];


window.TABULEIROS = TABULEIROS;

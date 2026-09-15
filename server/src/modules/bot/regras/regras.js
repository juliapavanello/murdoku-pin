import {
  encontrarCelulasDaMesa,
  buscarCelula,
  celulasVizinhas,
  celulaTemTipoOuDecoracao,
  mesmoComodo,
  estaSozinhoNoComodo,
} from './regras.utils.js';

/**
 * Cada regra é uma "strategy": uma função com a MESMA assinatura,
 * que recebe um único objeto com TODOS os dados relevantes e devolve
 * um boolean dizendo se aquela célula é uma posição válida para aquele
 * suspeito, dado o que já sabemos até agora.
 *
 * Assinatura: regra(dados) => boolean
 * dados = {
 *   celula,     // célula candidata sendo testada
 *   suspeito,   // suspeito para quem a regra está sendo avaliada
 *   suspeitos,  // lista completa de suspeitos do caso
 *   tabuleiro,  // tabuleiro normalizado (ver regras.utils.js)
 *   posicoes,   // mapa { suspeitoId: celula } já fixados até agora (parcial)
 *   params,     // suspeito.regraParams, parâmetros específicos da regra
 * }
 *
 * IMPORTANTE sobre regras relacionais (que dependem de outro suspeito):
 * como o bot posiciona um suspeito de cada vez, no momento em que a regra
 * de um suspeito A é avaliada, o suspeito B que ela referencia pode ainda
 * não estar posicionado. Nesses casos a regra deve retornar `true`
 * (não descarta a célula) quando a posição de B ainda é desconhecida — o
 * motor do bot reavalia TODAS as regras a cada novo palpite (ver
 * `bot.service.js` -> validarPosicoesAtuais), então a jogada só é
 * definitivamente aceita quando todas as regras dos suspeitos já
 * posicionados baterem simultaneamente.
 */

function encontrarComodo(tabuleiro, celula) {
  if (!celula) return null;

  const chave = `${celula.linha}-${celula.coluna}`;

  return tabuleiro.comodos?.find((comodo) =>
    comodo.celulas.includes(chave)
  ) || null;
}

const REGRAS = {
  semRestricao: () => true,

  // --- Regras genéricas e reutilizáveis -----------------------------------

  estaNoComodo: ({ celula, params }) => celula.comodo === params?.comodo,

  naoEstaNoComodo: ({ celula, params }) => celula.comodo !== params?.comodo,

  estaSobreTipo: ({ celula, params }) => celulaTemTipoOuDecoracao(celula, params?.tipo),

  naoEstaSobreTipo: ({ celula, params }) => !celulaTemTipoOuDecoracao(celula, params?.tipo),

  estaAoLadoDeTipo: ({ celula, tabuleiro, params }) =>
    celulasVizinhas(tabuleiro, celula).some(
      (vizinha) =>
        celulaTemTipoOuDecoracao(vizinha, params?.tipo) &&
        mesmoComodo(celula, vizinha)
    ),

  naoEstaAoLadoDeTipo: ({ celula, tabuleiro, params }) =>
    !celulasVizinhas(tabuleiro, celula).some((vizinha) =>
      celulaTemTipoOuDecoracao(vizinha, params?.tipo) &&
      mesmoComodo(celula, vizinha)
    ),

  estaNaPrimeiraColuna: ({ celula }) => celula.coluna === 0,

  estaNaQuintaColuna: ({ celula }) =>
    celula.coluna === 4,

  estaNaUltimaColuna: ({ celula, tabuleiro }) => celula.coluna === tabuleiro.tamanho - 1,

  estaNaPrimeiraLinha: ({ celula }) => celula.linha === 0,

  estaNaUltimaLinha: ({ celula, tabuleiro }) => celula.linha === tabuleiro.tamanho - 1,

  estaSozinhoNoComodo: ({ celula, suspeito, suspeitos, posicoes }) =>
    estaSozinhoNoComodo(celula, suspeito.id, suspeitos, posicoes),

  estaSozinhoNoComodo2: ({ celula, suspeito, suspeitos, posicoes, params }) => {
    const { comodo } = params;

    if (celula.comodo !== comodo) {
      return false;
    }

    return suspeitos.every((outro) => {
      if (outro.id === suspeito.id) {
        return true;
      }

      const posicao = posicoes[outro.id];

      if (!posicao) {
        return true;
      }

      return posicao.comodo !== comodo;
    });
  },

  euSouOUnicoSobreTipo: ({ celula, suspeito, suspeitos, posicoes, params }) => {
    if (!celulaTemTipoOuDecoracao(celula, params?.tipo)) return false;
    return !suspeitos.some((outro) => {
      if (outro.id === suspeito.id) return false;
      const posicaoOutro = posicoes[outro.id];
      return posicaoOutro && celulaTemTipoOuDecoracao(posicaoOutro, params?.tipo);
    });
  },

  // --- Regras relacionais (posição relativa a outro suspeito) ------------

  estaAoSulDeSuspeito: ({ celula, posicoes, params }) => {
    const referencia = posicoes[params?.suspeitoId];
    if (!referencia) return true;
    return celula.linha > referencia.linha;
  },

  estaAoNorteDeSuspeito: ({ celula, posicoes, params }) => {
    const referencia = posicoes[params?.suspeitoId];
    if (!referencia) return true;
    return celula.linha < referencia.linha;
  },

  estaAoLesteDeSuspeito: ({ celula, posicoes, params }) => {
    const referencia = posicoes[params?.suspeitoId];
    if (!referencia) return true;
    return celula.coluna > referencia.coluna;
  },

  estaAoOesteDeSuspeito: ({ celula, posicoes, params }) => {
    const referencia = posicoes[params?.suspeitoId];
    if (!referencia) return true;
    return celula.coluna < referencia.coluna;
  },

  estaAoLadoDeSuspeito: ({ celula, tabuleiro, posicoes, params }) => {
    const referencia = posicoes[params?.suspeitoId];
    if (!referencia) return true;
    return celulasVizinhas(tabuleiro, celula).some(
      (vizinha) => vizinha.linha === referencia.linha && vizinha.coluna === referencia.coluna
    );
  },

  estaNaMesmaAreaDeSuspeito: ({ celula, posicoes, params }) => {
    const referencia = posicoes[params?.suspeitoId];
    if (!referencia) return true;
    return mesmoComodo(celula, referencia);
  },

  estaEmAreaDiferenteDeSuspeito: ({ celula, posicoes, params }) => {
    const referencia = posicoes[params?.suspeitoId];
    if (!referencia) return true;
    return !mesmoComodo(celula, referencia);
  },

  estaUmaLinhaAoSulEEmAreaDiferenteDeSuspeito: ({ celula, posicoes, params }) => {
    const referencia = posicoes[params?.suspeitoId];
    if (!referencia) return true; // Se Donovan ainda não foi posicionado, não bloqueia

    const umaLinhaAoSul = celula.linha === referencia.linha + 1;
    const areaDiferente = !mesmoComodo(celula, referencia);

    return umaLinhaAoSul && areaDiferente;
  },

  estaNoComodoComHomem: ({ celula, suspeitos, posicoes, params }) => {
    if (celula.comodo !== params?.comodo) return false;
    const homensIds = params?.homensIds || [];

    const todosHomensPosicionados = homensIds.every((id) => Boolean(posicoes[id]));
    if (!todosHomensPosicionados) return true;

    return homensIds.some((id) => {
      const posHomem = posicoes[id];
      return posHomem && mesmoComodo(celula, posHomem);
    });
  },

  cadaHomemAoLadoDeMesa({ suspeitos, posicoes, tabuleiro }) {
    const homens = suspeitos.filter(
      (suspeito) => suspeito.genero === "homem"
    );

    return homens.every((homem) => {
      const posicao = posicoes[homem.id];

      if (!posicao) return false;

      return REGRAS.estaAoLadoDeTipo({
        celula: posicao,
        tabuleiro,
        params: { tipo: "cozinhaMesa" },
      });
    });
  },

  seHomemAoLadoDeMesaTemMulherNaMesmaMesa({
    suspeitos,
    posicoes,
    tabuleiro,
  }) {
    const homens = suspeitos.filter(
      (suspeito) => suspeito.genero === "homem"
    );

    const mulheres = suspeitos.filter(
      (suspeito) => suspeito.genero === "mulher"
    );

    return homens.every((homem) => {
      const posicaoHomem = posicoes[homem.id];

      if (!posicaoHomem) return false;

      // Mesas que possuem alguma célula ao lado do homem
      const celulasMesaAoLado = celulasVizinhas(
        tabuleiro,
        posicaoHomem
      ).filter(
        (vizinha) =>
          mesmoComodo(posicaoHomem, vizinha) &&
          celulaTemTipoOuDecoracao(vizinha, "cozinhaMesa")
      );

      // Cada célula encontrada pode pertencer à mesma mesa física.
      const mesas = new Map();

      for (const celulaMesa of celulasMesaAoLado) {
        const celulasDaMesa = encontrarCelulasDaMesa(
          tabuleiro,
          celulaMesa
        );

        const chave = celulasDaMesa
          .map((celula) => `${celula.linha}-${celula.coluna}`)
          .sort()
          .join("|");

        mesas.set(chave, celulasDaMesa);
      }

      // O homem precisa ter uma mulher ao lado de uma das mesas
      // que ele próprio está ao lado.
      return [...mesas.values()].some((mesa) => {
        return mulheres.some((mulher) => {
          const posicaoMulher = posicoes[mulher.id];

          if (!posicaoMulher) return false;

          if (!mesmoComodo(posicaoHomem, posicaoMulher)) {
            return false;
          }

          return mesa.some((celulaMesa) =>
            celulasVizinhas(tabuleiro, celulaMesa).some(
              (vizinha) =>
                vizinha.linha === posicaoMulher.linha &&
                vizinha.coluna === posicaoMulher.coluna
            )
          );
        });
      });
    });
  },

  estaAoNordesteDeSuspeito: ({ celula, suspeitos, posicoes, params }) => {
    const suspeito = suspeitos.find((s) => s.id === params.suspeitoId);
    if (!suspeito || !posicoes[suspeito.id]) return true;

    const posicao = posicoes[suspeito.id];

    return (
      celula.linha < posicao.linha &&
      celula.coluna > posicao.coluna
    );
  },

  estaNoCantoDaArea: ({ celula, tabuleiro }) => {
    const vizinhos = [
      buscarCelula(tabuleiro, celula.linha - 1, celula.coluna), // norte
      buscarCelula(tabuleiro, celula.linha, celula.coluna + 1), // leste
      buscarCelula(tabuleiro, celula.linha + 1, celula.coluna), // sul
      buscarCelula(tabuleiro, celula.linha, celula.coluna - 1), // oeste
    ];

    for (let i = 0; i < 4; i++) {
      const primeiro = vizinhos[i];
      const segundo = vizinhos[(i + 1) % 4];

      const primeiroFora =
        !primeiro || primeiro.comodo !== celula.comodo;

      const segundoFora =
        !segundo || segundo.comodo !== celula.comodo;

      if (primeiroFora && segundoFora) {
        return true;
      }
    }

    return false;
  },

  estaNaAreaComPessoaAoLadoDeTipo: ({
    celula,
    suspeito,
    suspeitos,
    tabuleiro,
    posicoes,
    params
  }) => {
    const area = encontrarComodo(tabuleiro, celula);

    if (!area) return false;

    const todosPosicionados = suspeitos.every(
      (suspeito) => posicoes[suspeito.id]
    );

    const alguemAoLado = suspeitos.some((outraPessoa) => {
      if (outraPessoa.id === suspeito?.id) return false;

      const posicao = posicoes[outraPessoa.id];

      if (!posicao) return false;

      const mesmaArea =
        encontrarComodo(tabuleiro, posicao)?.nome === area.nome;

      if (!mesmaArea) return false;

      return celulasVizinhas(tabuleiro, posicao).some(
        (vizinha) =>
          celulaTemTipoOuDecoracao(vizinha, params?.tipo)
      );
    });

    // Ainda existe alguém que pode estar ao lado da árvore.
    if (!todosPosicionados) {
      return true;
    }

    // Agora sim temos a solução completa.
    return alguemAoLado;
  },

  homemEMulherNoComodo: ({ suspeitos, posicoes, tabuleiro, params }) => {
    const homens = suspeitos.filter((s) => s.genero === "homem");
    const mulheres = suspeitos.filter((s) => s.genero === "mulher");

    const homemNoComodo = homens.some((homem) => {
      const posicao = posicoes[homem.id];
      return posicao &&
        encontrarComodo(tabuleiro, posicao)?.nome === params.comodo;
    });

    const mulherNoComodo = mulheres.some((mulher) => {
      const posicao = posicoes[mulher.id];
      return posicao &&
        encontrarComodo(tabuleiro, posicao)?.nome === params.comodo;
    });

    return homemNoComodo && mulherNoComodo;
  },

  estaAoLadoDeTipoNoComodo({ celula, tabuleiro, params }) {
    const { tipo, comodo } = params;

    if (celula.comodo !== comodo) return false;

    const vizinhos = celulasVizinhas(tabuleiro, celula);

    return vizinhos.some(
      (vizinha) =>
        vizinha.comodo === comodo &&
        celulaTemTipoOuDecoracao(vizinha, tipo)
    );
  },

  estaAoLadoDeTipoESozinho({
    celula,
    tabuleiro,
    posicoes,
    suspeito,
    suspeitos,
    params,
  }) {
    const { tipo } = params;

    const estaAoLado = celulasVizinhas(tabuleiro, celula).some(
      (vizinha) => celulaTemTipoOuDecoracao(vizinha, tipo)
    );

    if (!estaAoLado) return false;

    return estaSozinhoNoComodo(
      celula,
      suspeito.id,
      suspeitos,
      posicoes
    );
  },

  nenhumBarbadoNaArea({
    celula,
    suspeitos,
    posicoes,
    params,
  }) {
    const { barbadosIds = [] } = params;
    const todosBarbadosPosicionados = barbadosIds.every(
      (id) => Boolean(posicoes[id])
    );

    if (!todosBarbadosPosicionados) {
      return true;
    }

    return !barbadosIds.some((suspeitoId) => {
      const posicao = posicoes[suspeitoId];

      if (!posicao) return false;

      return mesmoComodo(celula, posicao);
    });
  },

  euSouOUnicoAoLadoDeTipo: ({
    celula,
    suspeito,
    suspeitos,
    tabuleiro,
    posicoes,
    params,
  }) => {
    const tipo = params?.tipo;

    // O próprio suspeito precisa estar ao lado do tipo
    const estaAoLado = celulasVizinhas(tabuleiro, celula).some(
      (vizinha) =>
        celulaTemTipoOuDecoracao(vizinha, tipo) &&
        mesmoComodo(celula, vizinha)
    );

    if (!estaAoLado) return false;

    // Enquanto ainda existem outros suspeitos não posicionados,
    // não podemos afirmar que ele é o único.
    const todosOutrosPosicionados = suspeitos
      .filter((outro) => outro.id !== suspeito.id)
      .every((outro) => Boolean(posicoes[outro.id]));

    if (!todosOutrosPosicionados) return true;

    // Agora verificamos se algum outro suspeito também está
    // ao lado do mesmo tipo, dentro do mesmo cômodo.
    const outroAoLado = suspeitos.some((outro) => {
      if (outro.id === suspeito.id) return false;

      const posicao = posicoes[outro.id];

      if (!posicao) return false;

      return celulasVizinhas(tabuleiro, posicao).some(
        (vizinha) =>
          celulaTemTipoOuDecoracao(vizinha, tipo) &&
          mesmoComodo(posicao, vizinha)
      );
    });

    return !outroAoLado;
  },

  somenteUmaPessoaTapete: ({
    suspeitos,
    posicoes,
    tabuleiro,
  }) => {
    const pessoasNoTapete = suspeitos.filter((suspeito) => {
      const posicao = posicoes[suspeito.id];

      if (!posicao) return false;

      return celulaTemTipoOuDecoracao(posicao, "tapete");
    });

    return pessoasNoTapete.length <= 1;
  },

  estaNaAreaComTipoENaoAoLado({ celula, tabuleiro, params }) {
    const { tipo } = params;

    const temTipoNaArea = tabuleiro.celulas.some(
      (outraCelula) =>
        mesmoComodo(celula, outraCelula) &&
        celulaTemTipoOuDecoracao(outraCelula, tipo)
    );

    if (!temTipoNaArea) return false;

    const estaAoLado = REGRAS.estaAoLadoDeTipo({
      celula,
      tabuleiro,
      params,
    });

    return !estaAoLado;
  },

  estaNaAreaComPessoaSobreTipo({
    celula,
    suspeitos,
    posicoes,
    tabuleiro,
    params,
  }) {
    const { tipo } = params;

    const pessoasPosicionadas = suspeitos.filter(
      (suspeito) => posicoes[suspeito.id]
    );

    // Ainda não temos pessoas suficientes no tabuleiro para avaliar a regra.
    if (pessoasPosicionadas.length < suspeitos.length) {
      return true;
    }

    return pessoasPosicionadas.some((suspeito) => {
      const posicao = posicoes[suspeito.id];

      return (
        mesmoComodo(celula, posicao) &&
        celulaTemTipoOuDecoracao(posicao, tipo)
      );
    });
  },

  estaSozinhoNoComodoESobreTipo: ({
    celula,
    suspeito,
    suspeitos,
    posicoes,
    params,
  }) => {
    if (!REGRAS.estaSobreTipo({ celula, params })) {
      return false;
    }

    return estaSozinhoNoComodo(
      celula,
      suspeito.id,
      suspeitos,
      posicoes
    );
  },

  estaNoComodoENaoAoLadoDeTipo: ({
    celula,
    tabuleiro,
    params,
  }) => {
    const { comodo, tipo } = params;

    if (celula.comodo !== comodo) {
      return false;
    }

    return !REGRAS.estaAoLadoDeTipo({
      celula,
      tabuleiro,
      params: { tipo },
    });
  },

  estaAoLesteENaoAoLadoDeTipo: ({
    celula,
    suspeitos,
    posicoes,
    tabuleiro,
    params,
  }) => {
    const { suspeitoId, tipo } = params;

    const suspeito = suspeitos.find(
      (suspeito) => suspeito.id === suspeitoId
    );

    if (!suspeito) {
      return false;
    }

    const posicao = posicoes[suspeitoId];

    if (!posicao) {
      return true;
    }

    const estaAoLeste = celula.coluna > posicao.coluna;

    if (!estaAoLeste) {
      return false;
    }

    return !REGRAS.estaAoLadoDeTipo({
      celula,
      tabuleiro,
      params: { tipo },
    });
  },

  exatamenteUmaPessoaNaCama: ({ suspeitos, posicoes }) =>
    suspeitos.filter((s) => celulaTemTipoOuDecoracao(posicoes[s.id], "cama")).length === 1,

  nenhumComodoVazio: ({ suspeitos, posicoes, tabuleiro }) =>
    tabuleiro.comodos.every((comodo) =>
      suspeitos.some((s) => encontrarComodo(tabuleiro, posicoes[s.id])?.nome === comodo.nome)
    ),

  exatamenteDuasPessoasNaCadeira: ({ suspeitos, posicoes }) =>
    suspeitos.filter((s) => celulaTemTipoOuDecoracao(posicoes[s.id], "poltrona")).length === 2,

  exatamenteUmaPessoaAoLadoDeTipo: ({ suspeitos, posicoes, tabuleiro, params }) => {
    const { tipo } = params;

    return (
      suspeitos.filter((suspeito) => {
        const posicao = posicoes[suspeito.id];

        return REGRAS.estaAoLadoDeTipo({
          celula: posicao,
          tabuleiro,
          params: { tipo },
        });
      }).length === 1
    );
  },

  naoEstaNoCantoDaArea: ({ celula, tabuleiro }) => {
    const vizinhos = {
      norte: buscarCelula(tabuleiro, celula.linha - 1, celula.coluna),
      leste: buscarCelula(tabuleiro, celula.linha, celula.coluna + 1),
      sul: buscarCelula(tabuleiro, celula.linha + 1, celula.coluna),
      oeste: buscarCelula(tabuleiro, celula.linha, celula.coluna - 1),
    };

    const estaForaDaArea = (vizinha) =>
      !vizinha || vizinha.comodo !== celula.comodo;

    const canto =
      (estaForaDaArea(vizinhos.norte) && estaForaDaArea(vizinhos.leste)) ||
      (estaForaDaArea(vizinhos.leste) && estaForaDaArea(vizinhos.sul)) ||
      (estaForaDaArea(vizinhos.sul) && estaForaDaArea(vizinhos.oeste)) ||
      (estaForaDaArea(vizinhos.oeste) && estaForaDaArea(vizinhos.norte));

    return !canto;
  },

  // Uma fileira abaixo de outra pessoa sobre o tipo, em qualquer coluna.
  estaUmaLinhaAoSulDePessoaSobreTipo: ({
    celula, suspeito, suspeitos, posicoes, tabuleiro, params,
  }) => {
    const referencias = tabuleiro.celulas.filter((outra) =>
      !outra.bloqueada &&
      outra.linha === celula.linha - 1 &&
      celulaTemTipoOuDecoracao(outra, params?.tipo)
    );
    if (referencias.length === 0) return false;

    const outros = suspeitos.filter((outro) => outro.id !== suspeito.id);
    if (outros.some((outro) => {
      const posicao = posicoes[outro.id];
      return posicao && referencias.some((referencia) =>
        referencia.linha === posicao.linha &&
        referencia.coluna === posicao.coluna
      );
    })) return true;

    // Uma pessoa ainda não posicionada pode satisfazer a referência.
    return outros.some((outro) => !posicoes[outro.id]);
  },

  estaUmaLinhaAoSulDeTipo: ({ celula, tabuleiro, params }) => {
    const { tipo } = params;

    const celulaAoNorte = buscarCelula(
      tabuleiro,
      celula.linha - 1,
      celula.coluna
    );

    if (!celulaAoNorte) {
      return false;
    }

    return celulaTemTipoOuDecoracao(celulaAoNorte, tipo);
  },

  estaNoComodoComUmaPessoaESozinhaNoComodo: ({
    celula,
    suspeitos,
    posicoes,
    tabuleiro,
    params,
  }) => {
    // Sem cômodo explícito, conta as pessoas na área da própria célula.
    const comodo = params?.comodo ?? celula.comodo;

    const area = tabuleiro.comodos.find((c) =>
      c.nome === comodo && c.celulas.includes(`${celula.linha}-${celula.coluna}`)
    );

    if (!area) {
      return false;
    }

    const todosPosicionados = suspeitos.every(
      (suspeito) => Boolean(posicoes[suspeito.id])
    );

    if (!todosPosicionados) {
      return true;
    }

    const quantidadeNaArea = suspeitos.filter((suspeito) => {
      const posicao = posicoes[suspeito.id];

      return area.celulas.includes(
        `${posicao.linha}-${posicao.coluna}`
      );
    }).length;

    return quantidadeNaArea === 2;
  },

  estaAoSulEEmAreaDiferenteDeSuspeito: (dados) =>
    REGRAS.estaAoSulDeSuspeito(dados) &&
    REGRAS.estaEmAreaDiferenteDeSuspeito(dados),

  existeForagidoCompativel: ({ suspeitos, posicoes, tabuleiro, params }) => {
    const { companhiaId, excluidosIds = [], tipo = "mesa" } = params;
    const companhia = posicoes[companhiaId];

    return suspeitos.some((candidato) => {
      if (candidato.id === companhiaId || excluidosIds.includes(candidato.id)) {
        return false;
      }

      const celula = posicoes[candidato.id];
      return celula.comodo === companhia.comodo &&
        REGRAS.estaAoLadoDeTipo({ celula, tabuleiro, params: { tipo } });
    });
  },

  // --- Regras "de caso" (compostas, específicas de uma dica) --------------
  estaNoComodoSemFicarAoLadoDeTipo: ({ celula, tabuleiro, params }) =>
    celula.comodo === params?.comodo &&
    !celulasVizinhas(tabuleiro, celula).some((vizinha) =>
      celulaTemTipoOuDecoracao(vizinha, params?.tipoEvitado)
    ),
};
export default REGRAS;

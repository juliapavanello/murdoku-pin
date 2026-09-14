import {
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
      celulaTemTipoOuDecoracao(vizinha, params?.tipo)
    ),

  estaNaPrimeiraColuna: ({ celula }) => celula.coluna === 0,

  estaNaQuintaColuna: ({ celula }) =>
    celula.coluna === 4,

  estaNaUltimaColuna: ({ celula, tabuleiro }) => celula.coluna === tabuleiro.tamanho - 1,

  estaNaPrimeiraLinha: ({ celula }) => celula.linha === 0,

  estaNaUltimaLinha: ({ celula, tabuleiro }) => celula.linha === tabuleiro.tamanho - 1,

  estaSozinhoNoComodo: ({ celula, suspeito, suspeitos, posicoes }) =>
    estaSozinhoNoComodo(celula, suspeito.id, suspeitos, posicoes),

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

  cadaHomemAoLadoDeMesa: ({ celula, suspeito, tabuleiro }) => {
    if (suspeito.genero !== "homem") return true;

    return celulasVizinhas(tabuleiro, celula).some(
      (vizinha) =>
        celulaTemTipoOuDecoracao(vizinha, "mesa") &&
        mesmoComodo(celula, vizinha)
    );
  },

  seHomemAoLadoDeMesaTemMulherNaMesmaMesa: ({ celula, suspeito, suspeitos, tabuleiro, posicoes }) => {
    if (suspeito.genero !== "homem") return true;

    const mesasVizinhas = celulasVizinhas(tabuleiro, celula).filter(
      (vizinha) =>
        celulaTemTipoOuDecoracao(vizinha, "mesa") &&
        mesmoComodo(celula, vizinha)
    );

    if (mesasVizinhas.length === 0) return true;

    const mulheres = suspeitos.filter((s) => s.genero === "mulher");
    const todasMulheresPosicionadas = mulheres.every((m) => Boolean(posicoes[m.id]));

    if (!todasMulheresPosicionadas) return true;

    return mesasVizinhas.some((mesa) =>
      mulheres.some((mulher) => {
        const posMulher = posicoes[mulher.id];
        if (!posMulher) return false;

        return celulasVizinhas(tabuleiro, posMulher).some(
          (v) =>
            v.linha === mesa.linha &&
            v.coluna === mesa.coluna &&
            mesmoComodo(posMulher, v)
        );
      })
    );
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

    const alguemAoLado = suspeitos.some((suspeito) => {
      const posicao = posicoes[suspeito.id];

      if (!posicao || posicao === celula) return false;

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

  // --- Regras "de caso" (compostas, específicas de uma dica) --------------
  estaNoComodoSemFicarAoLadoDeTipo: ({ celula, tabuleiro, params }) =>
    celula.comodo === params?.comodo &&
    !celulasVizinhas(tabuleiro, celula).some((vizinha) =>
      celulaTemTipoOuDecoracao(vizinha, params?.tipoEvitado)
    ),
};
export default REGRAS;
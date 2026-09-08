import {
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
const REGRAS = {
  semRestricao: () => true,

  // --- Regras genéricas e reutilizáveis -----------------------------------

  estaNoComodo: ({ celula, params }) => celula.comodo === params?.comodo,

  naoEstaNoComodo: ({ celula, params }) => celula.comodo !== params?.comodo,

  estaSobreTipo: ({ celula, params }) => celulaTemTipoOuDecoracao(celula, params?.tipo),

  naoEstaSobreTipo: ({ celula, params }) => !celulaTemTipoOuDecoracao(celula, params?.tipo),

  estaAoLadoDeTipo: ({ celula, tabuleiro, params }) =>
    celulasVizinhas(tabuleiro, celula).some((vizinha) =>
      celulaTemTipoOuDecoracao(vizinha, params?.tipo)
    ),

  naoEstaAoLadoDeTipo: ({ celula, tabuleiro, params }) =>
    !celulasVizinhas(tabuleiro, celula).some((vizinha) =>
      celulaTemTipoOuDecoracao(vizinha, params?.tipo)
    ),

  estaNaPrimeiraColuna: ({ celula }) => celula.coluna === 0,

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
  // --- Regras "de caso" (compostas, específicas de uma dica) --------------
  estaNoComodoSemFicarAoLadoDeTipo: ({ celula, tabuleiro, params }) =>
    celula.comodo === params?.comodo &&
    !celulasVizinhas(tabuleiro, celula).some((vizinha) =>
      celulaTemTipoOuDecoracao(vizinha, params?.tipoEvitado)
    ),
};

export default REGRAS;
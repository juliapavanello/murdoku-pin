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
  // Regra "neutra": não impõe nenhuma restrição própria (fica só com as
  // restrições globais do tabuleiro, tipo "não pode estar bloqueada").
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

  // "Ninguém mais na área dele/dela" — nenhum outro suspeito já colocado
  // pode estar no mesmo cômodo desta célula.
  estaSozinhoNoComodo: ({ celula, suspeito, suspeitos, posicoes }) =>
    estaSozinhoNoComodo(celula, suspeito.id, suspeitos, posicoes),

  // "Era a única pessoa sentada numa cadeira" (ou qualquer outro tipo/objeto):
  // a célula precisa ter o tipo pedido E nenhum outro suspeito já
  // posicionado pode estar sobre uma célula do mesmo tipo.
  euSouOUnicoSobreTipo: ({ celula, suspeito, suspeitos, posicoes, params }) => {
    if (!celulaTemTipoOuDecoracao(celula, params?.tipo)) return false;
    return !suspeitos.some((outro) => {
      if (outro.id === suspeito.id) return false;
      const posicaoOutro = posicoes[outro.id];
      return posicaoOutro && celulaTemTipoOuDecoracao(posicaoOutro, params?.tipo);
    });
  },

  // --- Regras relacionais (posição relativa a outro suspeito) ------------
  // Todas seguem o mesmo padrão: se a posição do suspeito de referência
  // ainda não é conhecida, a regra não descarta a célula (retorna true);
  // a validação real acontece quando os dois já estiverem posicionados.

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

  // --- Regras "de caso" (compostas, específicas de uma dica) --------------
  // Exemplo real do case "O Clube do Livro": "Ele estava na biblioteca.
  // Ele não estava ao lado de uma estante". Mistura duas condições —
  // perfeitamente possível numa strategy, já que é só uma função.
  estaNoComodoSemFicarAoLadoDeTipo: ({ celula, tabuleiro, params }) =>
    celula.comodo === params?.comodo &&
    !celulasVizinhas(tabuleiro, celula).some((vizinha) =>
      celulaTemTipoOuDecoracao(vizinha, params?.tipoEvitado)
    ),
};

export default REGRAS;
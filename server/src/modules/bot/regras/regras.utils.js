/**
 * Funções utilitárias usadas pelas regras (strategies) e pelo motor do bot.
 *
 * Formato esperado de `tabuleiro`:
 * {
 *   tamanho: number,
 *   celulas: Array<{
 *     linha: number,
 *     coluna: number,
 *     tipo: string,          // ex: "vazio", "lama", "cadeira"...
 *     comodo: string|null,   // nome do cômodo/área dessa célula
 *     decoracoes: string[],  // decorações extras na célula (ex: ["tapete"])
 *     bloqueada: boolean,
 *   }>
 * }
 *
 * Esse formato é uma versão "achatada" (flat) do board usado hoje no front,
 * que guarda `gridInicial` (matriz 2D) e `comodos` (lista separada com as
 * células de cada área) em estruturas diferentes. Ver `tabuleiro.mapper.js`
 * para a função que converte um board do front nesse formato.
 */

function buscarCelula(tabuleiro, linha, coluna) {
  return tabuleiro.celulas.find(
    (celula) => celula.linha === linha && celula.coluna === coluna
  );
}

function buscarPosicaoSuspeito(posicoes, suspeitoId) {
  return posicoes[suspeitoId] || null;
}

function buscarSuspeitoPorId(suspeitos, suspeitoId) {
  return suspeitos.find((suspeito) => suspeito.id === suspeitoId) || null;
}

// Vizinhos ortogonais (cima, baixo, esquerda, direita) que existem no tabuleiro.
function celulasVizinhas(tabuleiro, celula) {
  const candidatas = [
    { linha: celula.linha - 1, coluna: celula.coluna }, // norte
    { linha: celula.linha + 1, coluna: celula.coluna }, // sul
    { linha: celula.linha, coluna: celula.coluna - 1 }, // oeste
    { linha: celula.linha, coluna: celula.coluna + 1 }, // leste
  ];

  return candidatas
    .map(({ linha, coluna }) => buscarCelula(tabuleiro, linha, coluna))
    .filter(Boolean);
}

function celulaTemTipoOuDecoracao(celula, tipo) {
  if (!celula || !tipo) return false;
  const tipoProcurado = tipo.toLowerCase();
  const tipoMatch = celula.tipo && celula.tipo.toLowerCase().includes(tipoProcurado);
  const decoracaoMatch = (celula.decoracoes || []).some((dec) =>
    dec.toLowerCase().includes(tipoProcurado)
  );

  return tipoMatch || decoracaoMatch;
}

function mesmoComodo(celulaA, celulaB) {
  return Boolean(celulaA) && Boolean(celulaB) && celulaA.comodo === celulaB.comodo;
}

// true se nenhum outro suspeito já posicionado está no mesmo cômodo que `celula`.
function estaSozinhoNoComodo(celula, suspeitoAtualId, suspeitos, posicoes) {
  return !suspeitos.some((outro) => {
    if (outro.id === suspeitoAtualId) return false;
    const posicaoOutro = posicoes[outro.id];
    return posicaoOutro && mesmoComodo(posicaoOutro, celula);
  });
}

export {
  buscarCelula,
  buscarPosicaoSuspeito,
  buscarSuspeitoPorId,
  celulasVizinhas,
  celulaTemTipoOuDecoracao,
  mesmoComodo,
  estaSozinhoNoComodo,
};
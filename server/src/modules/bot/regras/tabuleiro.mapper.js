/**
 * Converte um tabuleiro no formato usado hoje em `js/boards.js` do front
 * (gridInicial: matriz 2D, comodos: lista separada com as células de cada
 * área, celulasBloqueadas: lista de "linha-coluna", decoracoes: mapa
 * opcional "linha-coluna" -> tipo(s)) para o formato "achatado" que o
 * motor do bot e as regras (regras.js) esperam.
 *
 * Esse mapper existe porque o front e o back, hoje, descrevem o tabuleiro
 * de duas formas diferentes. Ele NÃO está conectado a nenhuma rota ainda
 * — é só a ponte que permitiria, por exemplo, o front mandar
 * `TABULEIROS[i]` direto pro endpoint do bot no futuro.
 */
function normalizarTabuleiro(boardFront) {
  const { tamanho, gridInicial, comodos = [], celulasBloqueadas = [], decoracoes = {} } = boardFront;

  function comodoDaCelula(linha, coluna) {
    const chave = `${linha}-${coluna}`;
    const comodo = comodos.find((c) => c.celulas.includes(chave));
    return comodo ? comodo.nome : null;
  }

  function decoracoesDaCelula(linha, coluna) {
    const chave = `${linha}-${coluna}`;
    const valor = decoracoes[chave];
    if (!valor) return [];
    return Array.isArray(valor) ? valor : [valor];
  }

  const celulas = [];
  for (let linha = 0; linha < tamanho; linha++) {
    for (let coluna = 0; coluna < tamanho; coluna++) {
      const chave = `${linha}-${coluna}`;
      celulas.push({
        linha,
        coluna,
        tipo: gridInicial[linha][coluna],
        comodo: comodoDaCelula(linha, coluna),
        decoracoes: decoracoesDaCelula(linha, coluna),
        bloqueada: celulasBloqueadas.includes(chave),
      });
    }
  }

  return { tamanho, celulas };
}

export { normalizarTabuleiro };
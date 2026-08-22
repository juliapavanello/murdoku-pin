// Componente reutilizável do tabuleiro do Murdoku.
// Recebe um objeto de tabuleiro (ver js/boards.js) e renderiza:
//  - a grid NxN com CSS Grid dinâmico
//  - as bordas grossas dos cômodos
//  - o painel de suspeitos
//  - as interações de clique (selecionar suspeito -> marcar célula, X, apagar, desfazer, enviar)
//
// Uso básico:
// const jogo = criarJogoMurdoku(TABULEIROS[1], {
//   boardEl: document.getElementById("tabuleiro"),
//   suspeitosEl: document.getElementById("suspeitos"),
// });

/**
 * Retorna o nome do cômodo ao qual a célula (linha, coluna) pertence.
 */
function getComodoDaCelula(comodos, linha, coluna) {
  const chave = `${linha}-${coluna}`;
  const comodo = comodos.find((c) => c.celulas.includes(chave));
  return comodo ? comodo.nome : null;
}

/**
 * Cria e controla uma instância do jogo para um tabuleiro específico.
 * Retorna um objeto com métodos públicos (reiniciar, desfazer, enviar...).
 */
function criarJogoMurdoku(tabuleiro, { boardEl, suspeitosEl }) {
  const {
    tamanho,
    gridInicial,
    comodos,
    suspeitos,
    solucaoMock,
    icones = {},
    pistasGerais = [],
  } = tabuleiro;

  // Estado interno: o que foi marcado em cada célula (independente do tipo de fundo, que vem do gridInicial e não muda).
  // marcacoes["linha-coluna"] = { tipo: "x" | "suspeito", suspeitoId?: string }
  let marcacoes = {};
  let historico = []; // pilha de snapshots de `marcacoes` para o desfazer
  let suspeitoSelecionadoId = null;
  let ferramentaAtiva = null; // "x" | "apagar" | null

  function salvarHistorico() {
    historico.push(JSON.parse(JSON.stringify(marcacoes)));
  }

  function desfazer() {
    const anterior = historico.pop();
    if (!anterior) return;
    marcacoes = anterior;
    renderizarGrid();
  }

  function limparTudo() {
    salvarHistorico();
    marcacoes = {};
    renderizarGrid();
  }

  function selecionarSuspeito(id) {
    ferramentaAtiva = null;
    suspeitoSelecionadoId = suspeitoSelecionadoId === id ? null : id;
    renderizarSuspeitos();
  }

  function selecionarFerramenta(nome) {
    suspeitoSelecionadoId = null;
    ferramentaAtiva = ferramentaAtiva === nome ? null : nome;
    renderizarSuspeitos();
  }

  function onCelulaClicada(linha, coluna) {
    const chave = `${linha}-${coluna}`;
    salvarHistorico();

    if (ferramentaAtiva === "apagar") {
      delete marcacoes[chave];
    } else if (ferramentaAtiva === "x") {
      marcacoes[chave] = { tipo: "x" };
    } else if (suspeitoSelecionadoId) {
      marcacoes[chave] = { tipo: "suspeito", suspeitoId: suspeitoSelecionadoId };
    } else {
      // Sem ferramenta/suspeito selecionado: clique simples alterna X.
      if (marcacoes[chave] && marcacoes[chave].tipo === "x") {
        delete marcacoes[chave];
      } else {
        marcacoes[chave] = { tipo: "x" };
      }
    }

    renderizarGrid();
  }

  function conteudoDaCelula(linha, coluna) {
    const chave = `${linha}-${coluna}`;
    const marcacao = marcacoes[chave];
    if (!marcacao) return "";
    if (marcacao.tipo === "x") return "✕";
    if (marcacao.tipo === "suspeito") {
      const suspeito = suspeitos.find((s) => s.id === marcacao.suspeitoId);
      return suspeito ? suspeito.nome.charAt(0).toUpperCase() : "?";
    }
    return "";
  }

  function renderizarGrid() {
    boardEl.innerHTML = "";
    boardEl.style.setProperty("--tamanho-grid", tamanho);
    boardEl.classList.add("tabuleiro-grid");

    for (let linha = 0; linha < tamanho; linha++) {
      for (let coluna = 0; coluna < tamanho; coluna++) {
        const tipo = gridInicial[linha][coluna];
        const chave = `${linha}-${coluna}`;
        const marcacao = marcacoes[chave];

        const celula = document.createElement("button");
        celula.type = "button";
        celula.className = "celula";
        celula.dataset.linha = linha;
        celula.dataset.coluna = coluna;
        celula.dataset.tipo = tipo;
        celula.setAttribute(
          "aria-label",
          `Célula linha ${linha + 1}, coluna ${coluna + 1}`
        );

        // Cor de fundo do cômodo ao qual a célula pertence (se definida em boards.js).
        const comodoDaCelula = comodos.find((c) => c.celulas.includes(chave));
        if (comodoDaCelula?.cor) {
          celula.style.background =
            comodoDaCelula.corPorCelula?.[chave] || comodoDaCelula.cor;
        }

        // Ícone de fundo configurado pelo tabuleiro — fica atrás da marcação.
        if (icones[tipo]) {
          const icone = document.createElement("span");
          icone.className = "celula__icone";
          const imagem = document.createElement("img");
          imagem.src = icones[tipo];
          imagem.alt = "";
          imagem.setAttribute("aria-hidden", "true");
          icone.appendChild(imagem);
          celula.appendChild(icone);
        }

        // Marcação do jogador (X ou letra do suspeito).
        const conteudo = conteudoDaCelula(linha, coluna);
        if (conteudo) {
          const marca = document.createElement("span");
          marca.className =
            marcacao?.tipo === "suspeito" ? "celula__marca celula__marca--suspeito" : "celula__marca";
          marca.textContent = conteudo;
          celula.appendChild(marca);
        }

        // Bordas grossas entre cômodos diferentes.
        const comodoAtual = getComodoDaCelula(comodos, linha, coluna);
        const comodoDireita = getComodoDaCelula(comodos, linha, coluna + 1);
        const comodoBaixo = getComodoDaCelula(comodos, linha + 1, coluna);

        // A borda externa do tabuleiro é feita pelo container (.tabuleiro-grid);
        // aqui só marcamos as divisas *internas* entre cômodos diferentes.
        if (coluna < tamanho - 1 && comodoAtual !== comodoDireita) {
          celula.classList.add("celula--borda-direita");
        }
        if (linha < tamanho - 1 && comodoAtual !== comodoBaixo) {
          celula.classList.add("celula--borda-baixo");
        }

        celula.addEventListener("click", () => onCelulaClicada(linha, coluna));
        boardEl.appendChild(celula);
      }
    }

    renderizarRotulosComodos();
  }

  // Escreve o nome de cada cômodo centralizado sobre a area. Calcula o centróide das células do cômodo e posiciona o rótulo
  // em porcentagem, como uma camada por cima do grid — assim nunca é cortado pelo overflow de uma célula individual.
  function renderizarRotulosComodos() {
    const camada = document.createElement("div");
    camada.className = "camada-rotulos";

    comodos.forEach((comodo) => {
      const posicoes = comodo.celulas.map((chave) => chave.split("-").map(Number));
      const mediaLinha = posicoes.reduce((soma, [l]) => soma + l, 0) / posicoes.length;
      const mediaColuna = posicoes.reduce((soma, [, c]) => soma + c, 0) / posicoes.length;

      const rotulo = document.createElement("span");
      rotulo.className = "camada-rotulos__item";
      rotulo.textContent = comodo.nome;
      rotulo.style.left = comodo.rotulo?.left
        ? `${comodo.rotulo.left}%`
        : `${((mediaColuna + 0.5) / tamanho) * 100}%`;
      rotulo.style.top = comodo.rotulo?.top
        ? `${comodo.rotulo.top}%`
        : `${((mediaLinha + 0.5) / tamanho) * 100}%`;
      camada.appendChild(rotulo);
    });

    boardEl.appendChild(camada);
  }

  function renderizarSuspeitos() {
    suspeitosEl.innerHTML = "";
    const usaGradeCompacta = suspeitos.length > 8;
    suspeitosEl.classList.toggle("suspeitos-grid--compacta", usaGradeCompacta);
    suspeitosEl.closest(".tela-jogo")?.classList.toggle("tela-jogo--suspeitos-compactos", usaGradeCompacta);
    suspeitos.forEach((suspeito) => {
      const card = document.createElement("div");
      card.className = "suspeito-card";
      if (suspeito.id === suspeitoSelecionadoId) card.classList.add("suspeito-card--selecionado");
      if (suspeito.isVitima) card.classList.add("suspeito-card--vitima");

      card.innerHTML = `
        <div class="suspeito-card__avatar">
          <img src="${suspeito.foto}" alt="${suspeito.nome}" onerror="this.style.display='none'">
        </div>
        <div class="suspeito-card__info">
          <div class="suspeito-card__nome">${suspeito.nome}</div>
          <div class="suspeito-card__dica">${suspeito.dica}</div>
        </div>
      `;

      card.addEventListener("click", () => selecionarSuspeito(suspeito.id));
      suspeitosEl.appendChild(card);
    });

    if (pistasGerais.length > 0) {
      const blocoPistas = document.createElement("section");
      blocoPistas.className = "pistas-gerais";

      const titulo = document.createElement("h3");
      titulo.textContent = "Pistas gerais";
      blocoPistas.appendChild(titulo);

      const lista = document.createElement("ul");
      pistasGerais.forEach((pista) => {
        const item = document.createElement("li");
        item.textContent = pista;
        lista.appendChild(item);
      });

      blocoPistas.appendChild(lista);
      suspeitosEl.appendChild(blocoPistas);
    }
  }

  function autoResolver() {
    salvarHistorico();
    marcacoes = {};
    Object.entries(solucaoMock).forEach(([chave, suspeitoId]) => {
      marcacoes[chave] = { tipo: "suspeito", suspeitoId };
    });
    renderizarGrid();
  }

  function enviar() {
    const chavesGabarito = Object.keys(solucaoMock);
    let acertos = 0;

    chavesGabarito.forEach((chave) => {
      const celulaEl = boardEl.querySelector(
        `.celula[data-linha="${chave.split("-")[0]}"][data-coluna="${chave.split("-")[1]}"]`
      );
      const marcacao = marcacoes[chave];
      const correto = marcacao?.tipo === "suspeito" && marcacao.suspeitoId === solucaoMock[chave];
      if (correto) acertos++;
      celulaEl?.classList.remove("celula--correta", "celula--incorreta");
      celulaEl?.classList.add(correto ? "celula--correta" : "celula--incorreta");
    });

    const resolvido = acertos === chavesGabarito.length;
    return { acertos, total: chavesGabarito.length, resolvido };
  }

  renderizarGrid();
  renderizarSuspeitos();

  return {
    desfazer,
    limparTudo,
    selecionarFerramenta,
    autoResolver,
    enviar,
  };
}

window.criarJogoMurdoku = criarJogoMurdoku;

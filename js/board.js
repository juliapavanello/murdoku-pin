function getComodoDaCelula(comodos, linha, coluna) {
  const chave = `${linha}-${coluna}`;
  const comodo = comodos.find((c) => c.celulas.includes(chave));
  return comodo ? comodo.nome : null;
}

function getGrupoBordaDaCelula(comodos, linha, coluna) {
  const chave = `${linha}-${coluna}`;
  const comodo = comodos.find((c) => c.celulas.includes(chave));
  return comodo ? (comodo.grupoBorda || comodo.nome) : null;
}

function criarJogoMurdoku(tabuleiro, { boardEl, suspeitosEl }) {
  const {
    tamanho,
    gridInicial,
    comodos,
    suspeitos,
    solucaoMock,
    icones = {},
    decoracoes = {},
    pistasGerais = [],
    celulasBloqueadas = [],
    bordasExtras = {},
    bordasAbertas = {},
  } = tabuleiro;
  const bordasExtrasDireita = bordasExtras.direita || [];
  const bordasExtrasBaixo = bordasExtras.baixo || [];
  const bordasExtrasCima = bordasExtras.cima || [];
  const bordasExtrasEsquerda = bordasExtras.esquerda || [];
  const bordasAbertasDireita = bordasAbertas.direita || [];
  const bordasAbertasBaixo = bordasAbertas.baixo || [];

  let marcacoes = {};
  let historico = [];
  let jogadas = [];
  let suspeitoSelecionadoId = null;
  let ferramentaAtiva = null;
  let celulaSelecionada = null;

  function salvarHistorico() {
    historico.push({
      marcacoes: JSON.parse(JSON.stringify(marcacoes)),
      jogadas: JSON.parse(JSON.stringify(jogadas)),
    });
  }

  function focarCelula(linha, coluna) {
    if (linha === undefined || coluna === undefined) return;
    boardEl.querySelector(`.celula[data-linha="${linha}"][data-coluna="${coluna}"]`)?.focus();
  }

  function desfazer(linha, coluna) {
    const anterior = historico.pop();
    if (!anterior) return;
    marcacoes = anterior.marcacoes;
    jogadas = anterior.jogadas;
    renderizarGrid();
    focarCelula(linha, coluna);
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

  function marcarCelula(linha, coluna, marcacaoSolicitada = null, origem = "jogador") {
    const chave = `${linha}-${coluna}`;
    if (celulasBloqueadas.includes(chave)) return;
    const celulaAtiva = document.activeElement;

    salvarHistorico();

    if (marcacaoSolicitada === "apagar" || ferramentaAtiva === "apagar") {
      delete marcacoes[chave];
      jogadas.push({ linha, coluna, acao: "apagar", origem });
    } else if (marcacaoSolicitada === "x" || ferramentaAtiva === "x") {
      marcacoes[chave] = { tipo: "x" };
      jogadas.push({ linha, coluna, acao: "x", origem });
    } else if (marcacaoSolicitada) {
      marcacoes[chave] = { tipo: "suspeito", suspeitoId: marcacaoSolicitada };
      jogadas.push({ linha, coluna, acao: "suspeito", suspeitoId: marcacaoSolicitada, origem });
    } else if (suspeitoSelecionadoId) {
      marcacoes[chave] = { tipo: "suspeito", suspeitoId: suspeitoSelecionadoId };
      jogadas.push({ linha, coluna, acao: "suspeito", suspeitoId: suspeitoSelecionadoId, origem });
    } else {
      if (marcacoes[chave] && marcacoes[chave].tipo === "x") {
        delete marcacoes[chave];
        jogadas.push({ linha, coluna, acao: "apagar", origem });
      } else {
        marcacoes[chave] = { tipo: "x" };
        jogadas.push({ linha, coluna, acao: "x", origem });
      }
    }

    renderizarGrid();
    if (celulaAtiva?.classList.contains("celula")) focarCelula(linha, coluna);
  }

  function selecionarCelula(linha, coluna, { focar = true } = {}) {
    const chave = `${linha}-${coluna}`;
    celulaSelecionada = chave;
    const celula = boardEl.querySelector(`.celula[data-linha="${linha}"][data-coluna="${coluna}"]`);
    if (!celula) return;

    boardEl.querySelectorAll(".celula--selecionada").forEach((item) => {
      item.classList.remove("celula--selecionada");
    });
    celula.classList.add("celula--selecionada");
    if (focar) celula.focus();
  }

  function onCelulaClicada(evento) {
    const celula = evento.currentTarget;
    const linha = Number(celula.dataset.linha);
    const coluna = Number(celula.dataset.coluna);

    if (celula.dataset.bloqueada === "true") {
      selecionarCelula(linha, coluna, { focar: true });
      return;
    }

    selecionarCelula(linha, coluna, { focar: true });
    if (ferramentaAtiva || suspeitoSelecionadoId) marcarCelula(linha, coluna);
  }

  function moverSelecaoPorTecla(evento) {
    const mover = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };

    const deslocamento = mover[evento.key];
    if (!deslocamento) return;

    const linha = Number(evento.currentTarget.dataset.linha);
    const coluna = Number(evento.currentTarget.dataset.coluna);
    const proximaLinha = linha + deslocamento[0];
    const proximaColuna = coluna + deslocamento[1];

    if (
      proximaLinha < 0 ||
      proximaLinha >= tamanho ||
      proximaColuna < 0 ||
      proximaColuna >= tamanho
    ) {
      return;
    }

    evento.preventDefault();
    const proximaCelula = boardEl.querySelector(
      `.celula[data-linha="${proximaLinha}"][data-coluna="${proximaColuna}"]`
    );

    if (!proximaCelula) return;

    selecionarCelula(proximaLinha, proximaColuna, { focar: true });
  }

  function onCelulaDigitada(evento) {
    const tecla = evento.key.toLowerCase();
    const linha = Number(evento.currentTarget.dataset.linha);
    const coluna = Number(evento.currentTarget.dataset.coluna);

    if (evento.key.startsWith("Arrow")) {
      moverSelecaoPorTecla(evento);
      return;
    }

    if ((evento.ctrlKey || evento.metaKey) && tecla === "z") {
      evento.preventDefault();
      desfazer(linha, coluna);
      return;
    }
    if (evento.ctrlKey || evento.metaKey || evento.altKey) return;

    if (tecla === "x") {
      evento.preventDefault();
      marcarCelula(linha, coluna, "x");
      return;
    }

    if (tecla === "backspace" || tecla === "delete") {
      evento.preventDefault();
      marcarCelula(linha, coluna, "apagar");
      return;
    }

    const suspeito = suspeitos.find(
      (item) => item.nome.charAt(0).toLowerCase() === tecla
    );
    if (suspeito) {
      evento.preventDefault();
      marcarCelula(linha, coluna, suspeito.id);
    }
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
        if (celulaSelecionada === chave) celula.classList.add("celula--selecionada");
        const estaBloqueada = celulasBloqueadas.includes(chave);
        if (estaBloqueada) {
          celula.classList.add("celula--bloqueada");
          celula.dataset.bloqueada = "true";
          celula.setAttribute("aria-disabled", "true");
        }
        celula.setAttribute(
          "aria-label",
          `Célula linha ${linha + 1}, coluna ${coluna + 1}${estaBloqueada ? ", bloqueada" : ""}`
        );

        const comodoDaCelula = comodos.find((c) => c.celulas.includes(chave));
        if (comodoDaCelula?.cor) {
          celula.style.background =
            comodoDaCelula.corPorCelula?.[chave] || comodoDaCelula.cor;
        }

        const sombrasBordasExtras = [];
        if (bordasExtrasCima.includes(chave)) {
          sombrasBordasExtras.push("inset 0 4px 0 var(--cor-borda-grossa)");
        }
        if (bordasExtrasDireita.includes(chave)) {
          sombrasBordasExtras.push("inset -4px 0 0 var(--cor-borda-grossa)");
        }
        if (bordasExtrasBaixo.includes(chave)) {
          sombrasBordasExtras.push("inset 0 -4px 0 var(--cor-borda-grossa)");
        }
        if (bordasExtrasEsquerda.includes(chave)) {
          sombrasBordasExtras.push("inset 4px 0 0 var(--cor-borda-grossa)");
        }
        if (sombrasBordasExtras.length) {
          celula.style.boxShadow = sombrasBordasExtras.join(", ");
        }

        const decoracoesDaCelula = Array.isArray(decoracoes[chave])
          ? decoracoes[chave]
          : decoracoes[chave]
            ? [decoracoes[chave]]
            : [];
        decoracoesDaCelula.forEach((decoracao) => {
          if (!icones[decoracao]) return;
          const camadaDecoracao = document.createElement("span");
          camadaDecoracao.className = `celula__decoracao celula__decoracao--${decoracao}`;
          const imagemDecoracao = document.createElement("img");
          imagemDecoracao.src = icones[decoracao];
          imagemDecoracao.alt = "";
          imagemDecoracao.setAttribute("aria-hidden", "true");
          camadaDecoracao.appendChild(imagemDecoracao);
          celula.appendChild(camadaDecoracao);
        });

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

        const conteudo = conteudoDaCelula(linha, coluna);
        if (conteudo) {
          const marca = document.createElement("span");
          marca.className =
            marcacao?.tipo === "suspeito" ? "celula__marca celula__marca--suspeito" : "celula__marca";
          marca.textContent = conteudo;
          celula.appendChild(marca);
        }

        const comodoAtual = getGrupoBordaDaCelula(comodos, linha, coluna);
        const comodoDireita = getGrupoBordaDaCelula(comodos, linha, coluna + 1);
        const comodoBaixo = getGrupoBordaDaCelula(comodos, linha + 1, coluna);

        if (
          coluna < tamanho - 1 &&
          (
            (comodoAtual !== comodoDireita && !bordasAbertasDireita.includes(chave)) ||
            bordasExtrasDireita.includes(chave)
          )
        ) {
          celula.classList.add("celula--borda-direita");
        }
        if (
          linha < tamanho - 1 &&
          (
            (comodoAtual !== comodoBaixo && !bordasAbertasBaixo.includes(chave)) ||
            bordasExtrasBaixo.includes(chave)
          )
        ) {
          celula.classList.add("celula--borda-baixo");
        }

        celula.addEventListener("click", onCelulaClicada);
        celula.addEventListener("keydown", onCelulaDigitada);
        boardEl.appendChild(celula);
      }
    }

    renderizarRotulosComodos();
  }

  function renderizarRotulosComodos() {
    const camada = document.createElement("div");
    camada.className = "camada-rotulos";

    comodos.forEach((comodo) => {
      if (comodo.exibirRotulo === false || !comodo.nome) return;
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

  function botResolver(res) {
    const payload = res?.payload;
    const suspeitoRecebido = payload?.suspeito ?? payload?.supeito;
    const posicao = payload?.posicao;

    if (res?.code == 2) { desfazer(); return; }
    if (res?.code == 3) { return window.registrarEnvioMurdoku?.("bot"); }

    const suspeito = typeof suspeitoRecebido === "object"
      ? suspeitoRecebido
      : suspeitos.find(
        (item) => item.id === suspeitoRecebido || item.nome === suspeitoRecebido
      );
    const suspeitoId = suspeito?.id ?? suspeitoRecebido;

    let linha;
    let coluna;
    if (typeof posicao === "string") {
      [linha, coluna] = posicao.split("-").map(Number);
    } else if (Array.isArray(posicao)) {
      [linha, coluna] = posicao.map(Number);
    } else {
      linha = Number(posicao?.linha);
      coluna = Number(posicao?.coluna);
    }

    if (!suspeitoId || !Number.isInteger(linha) || !Number.isInteger(coluna)) {
      console.error("Resposta do bot inválida:", res);
      return { correto: false, erro: "Resposta do bot inválida" };
    }

    marcarCelula(linha, coluna, suspeitoId, "bot");

    const chave = `${linha}-${coluna}`;
    const correto = solucaoMock[chave] === suspeitoId;
    const celula = boardEl.querySelector(
      `.celula[data-linha="${linha}"][data-coluna="${coluna}"]`
    );
    celula?.classList.add(correto ? "celula--correta" : "celula--incorreta");

    console.log(correto ? "Jogada do bot correta" : "Jogada do bot incorreta", {
      suspeitoId,
      linha,
      coluna,
    });

    return { correto, suspeitoId, linha, coluna };
  }

  window.botResolver = botResolver

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
    botResolver,
    autoResolver,
    enviar,
    obterJogadas: () => JSON.parse(JSON.stringify(jogadas)),
  };
}

window.criarJogoMurdoku = criarJogoMurdoku;

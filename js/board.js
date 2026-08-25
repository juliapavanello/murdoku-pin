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
  let suspeitoSelecionadoId = null;
  let ferramentaAtiva = null; 

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
    if (celulasBloqueadas.includes(chave)) return;

    salvarHistorico();

    if (ferramentaAtiva === "apagar") {
      delete marcacoes[chave];
    } else if (ferramentaAtiva === "x") {
      marcacoes[chave] = { tipo: "x" };
    } else if (suspeitoSelecionadoId) {
      marcacoes[chave] = { tipo: "suspeito", suspeitoId: suspeitoSelecionadoId };
    } else {
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
        const estaBloqueada = celulasBloqueadas.includes(chave);
        if (estaBloqueada) {
          celula.classList.add("celula--bloqueada");
          celula.disabled = true;
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

        celula.addEventListener("click", () => onCelulaClicada(linha, coluna));
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

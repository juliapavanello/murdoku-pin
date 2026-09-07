function montarHistorico() {
  const listaEl = document.getElementById("historico-lista");
  const vazioEl = document.getElementById("historico-vazio");
  const limparEl = document.getElementById("historico-limpar");
  if (!listaEl || !vazioEl || !limparEl) return;

  let historico = [];
  try {
    historico = JSON.parse(localStorage.getItem("murdoku.historico")) || [];
  } catch {
    historico = [];
  }

  function descreverJogada(jogada) {
    const celula = `linha ${Number(jogada.linha) + 1}, coluna ${Number(jogada.coluna) + 1}`;
    if (jogada.acao === "apagar") return `Marcacao apagada na ${celula}`;
    if (jogada.acao === "x") return `Marcacao X adicionada na ${celula}`;
    if (jogada.acao === "suspeito") return `Suspeito ${jogada.suspeitoId ?? ""} marcado na ${celula}`;
    return `Acao registrada na ${celula}`;
  }

  function renderizar() {
    listaEl.innerHTML = "";
    vazioEl.hidden = historico.length > 0;
    limparEl.hidden = historico.length === 0;

    historico.forEach((item) => {
      const linha = document.createElement("article");
      linha.className = "historico-item";

      const cabecalho = document.createElement("div");
      cabecalho.className = "historico-item__cabecalho";
      cabecalho.innerHTML = `
          <div>
            <div class="historico-item__nome">${item.nome}</div>
            <div class="historico-item__data">${item.data}</div>
          </div>
          <span class="historico-item__resultado historico-item__resultado--${item.resolvido ? "sucesso" : "parcial"}">
            ${item.resolvido ? "Resolvido" : `${item.acertos}/${item.total}`}
          </span>
        `;
      linha.appendChild(cabecalho);

      const jogadas = item.jogadas || [];
      const jogadasBloco = document.createElement("details");
      jogadasBloco.className = "historico-item__jogadas";
      const jogadasTitulo = document.createElement("summary");
      jogadasTitulo.textContent = "Jogadas da tentativa";
      jogadasBloco.appendChild(jogadasTitulo);

      if (jogadas.length === 0) {
        const vazioJogadas = document.createElement("p");
        vazioJogadas.textContent = "Nenhuma jogada registrada.";
        jogadasBloco.appendChild(vazioJogadas);
      } else {
        const listaJogadas = document.createElement("ol");
        jogadas.forEach((jogada) => {
          const jogadaEl = document.createElement("li");
          jogadaEl.textContent = descreverJogada(jogada);
          listaJogadas.appendChild(jogadaEl);
        });
        jogadasBloco.appendChild(listaJogadas);
      }

      linha.appendChild(jogadasBloco);
      listaEl.appendChild(linha);
    });
  }

  limparEl.addEventListener("click", () => {
    historico = [];
    localStorage.removeItem("murdoku.historico");
    localStorage.removeItem("jogadas");
    renderizar();
  });

  renderizar();
}

window.montarHistorico = montarHistorico;

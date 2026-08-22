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

  function renderizar() {
    listaEl.innerHTML = "";
    vazioEl.hidden = historico.length > 0;
    limparEl.hidden = historico.length === 0;

    historico.forEach((item) => {
      const linha = document.createElement("article");
      linha.className = "historico-item";
      linha.innerHTML = `
        <div>
          <div class="historico-item__nome">${item.nome}</div>
          <div class="historico-item__data">${item.data}</div>
        </div>
        <span class="historico-item__resultado historico-item__resultado--${item.resolvido ? "sucesso" : "parcial"}">
          ${item.resolvido ? "Resolvido" : `${item.acertos}/${item.total}`}
        </span>
      `;
      listaEl.appendChild(linha);
    });
  }

  limparEl.addEventListener("click", () => {
    historico = [];
    localStorage.removeItem("murdoku.historico");
    renderizar();
  });

  renderizar();
}

window.montarHistorico = montarHistorico;

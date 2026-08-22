function dificuldadeDoTabuleiro(tabuleiro) {
  if (tabuleiro.tamanho <= 5) return "facil";
  if (tabuleiro.tamanho === 6) return "medio";
  return "dificil";
}

function rotuloDificuldade(dificuldade) {
  return {
    facil: "Fácil",
    medio: "Médio",
    dificil: "Difícil",
  }[dificuldade];
}

function montarHubTabuleiros() {
  const grade = document.getElementById("grade-tabuleiros");
  const filtros = document.querySelectorAll("[data-filtro]");
  if (!grade || !window.TABULEIROS) return;

  let filtroAtual = "todos";

  function renderizar() {
    const tabuleiros = TABULEIROS.filter((tabuleiro) => {
      const dificuldade = dificuldadeDoTabuleiro(tabuleiro);
      return filtroAtual === "todos" || dificuldade === filtroAtual;
    });

    grade.innerHTML = "";

    tabuleiros.forEach((tabuleiro) => {
      const dificuldade = dificuldadeDoTabuleiro(tabuleiro);
      const card = document.createElement("a");
      card.className = "card-tabuleiro";
      card.href = `tabuleiro.html?id=${tabuleiro.id}`;
      card.innerHTML = `
        <span class="card-tabuleiro__tag">${tabuleiro.tamanho}x${tabuleiro.tamanho}</span>
        <h2 class="card-tabuleiro__nome">${tabuleiro.nome}</h2>
        <span class="badge-dificuldade badge-dificuldade--${dificuldade}">
          ${rotuloDificuldade(dificuldade)}
        </span>
        <div class="card-tabuleiro__meta">${tabuleiro.suspeitos.length} suspeitos</div>
      `;
      grade.appendChild(card);
    });
  }

  filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
      filtroAtual = botao.dataset.filtro;
      filtros.forEach((item) => item.classList.remove("filtro-btn--ativo"));
      botao.classList.add("filtro-btn--ativo");
      renderizar();
    });
  });

  renderizar();
}

window.montarHubTabuleiros = montarHubTabuleiros;

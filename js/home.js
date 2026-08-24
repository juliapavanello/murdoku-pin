function dificuldadeDoTabuleiro(tabuleiro) {
  if (tabuleiro.dificuldade) return tabuleiro.dificuldade;
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

const ORDEM_DIFICULDADES = ["facil", "medio", "dificil"];
const ORDEM_CONFIGURACAO_MAPA = [1, 2, 6, 3, 9, 4, 7, 10, 11, 8, 12, 5];

function ordenarComoFigma(a, b) {
  const posicaoA = ORDEM_CONFIGURACAO_MAPA.indexOf(a.id);
  const posicaoB = ORDEM_CONFIGURACAO_MAPA.indexOf(b.id);
  const ordemA = posicaoA === -1 ? Number.MAX_SAFE_INTEGER : posicaoA;
  const ordemB = posicaoB === -1 ? Number.MAX_SAFE_INTEGER : posicaoB;
  return ordemA - ordemB;
}

function criarCardTabuleiro(tabuleiro) {
  const dificuldade = dificuldadeDoTabuleiro(tabuleiro);
  const card = document.createElement("a");
  card.className = "card-tabuleiro";
  card.href = `tabuleiro.html?id=${tabuleiro.id}`;
  card.innerHTML = `
    <h2 class="card-tabuleiro__nome">${tabuleiro.nome}</h2>
    <span class="badge-dificuldade badge-dificuldade--${dificuldade}">
      ${rotuloDificuldade(dificuldade)}
    </span>
    <div class="card-tabuleiro__meta">
      ${tabuleiro.tamanho}x${tabuleiro.tamanho}
      <span>${tabuleiro.suspeitos.length} suspeitos</span>
    </div>
  `;
  return card;
}

function montarHubTabuleiros() {
  const grade = document.getElementById("grade-tabuleiros");
  const filtros = document.querySelectorAll("[data-filtro]");
  if (!grade || !window.TABULEIROS) return;

  let filtroAtual = "todos";

  function renderizar() {
    grade.innerHTML = "";

    const dificuldades =
      filtroAtual === "todos" ? ORDEM_DIFICULDADES : [filtroAtual];

    dificuldades.forEach((dificuldade) => {
      const tabuleiros = TABULEIROS.filter(
        (tabuleiro) => dificuldadeDoTabuleiro(tabuleiro) === dificuldade
      ).sort(ordenarComoFigma);
      if (tabuleiros.length === 0) return;

      const grupo = document.createElement("section");
      grupo.className = `grupo-tabuleiros grupo-tabuleiros--${dificuldade}`;
      grupo.setAttribute(
        "aria-label",
        `Tabuleiros ${rotuloDificuldade(dificuldade).toLowerCase()}`
      );

      const lista = document.createElement("div");
      lista.className = "grupo-tabuleiros__grade";
      tabuleiros.forEach((tabuleiro) => lista.appendChild(criarCardTabuleiro(tabuleiro)));

      grupo.appendChild(lista);
      grade.appendChild(grupo);
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

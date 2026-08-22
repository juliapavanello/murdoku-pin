function montarNav(secaoAtual) {
  const secoes = [
    { id: "tabuleiros", rotulo: "Tabuleiros", icone: "▦", href: "index.html" },
    { id: "historico", rotulo: "Histórico", icone: "◷", href: "historico.html" },
  ];

  document.querySelector(".nav-lateral")?.remove();
  document.querySelector(".nav-lateral__hamburguer")?.remove();
  document.querySelector(".nav-lateral__backdrop")?.remove();

  const botaoMenu = document.createElement("button");
  botaoMenu.className = "nav-lateral__hamburguer";
  botaoMenu.type = "button";
  botaoMenu.setAttribute("aria-label", "Abrir menu");
  botaoMenu.textContent = "☰";

  const nav = document.createElement("nav");
  nav.className = "nav-lateral";
  nav.setAttribute("aria-label", "Navegação principal");
  nav.innerHTML = `
    <a class="nav-lateral__logo" href="index.html">Murdoku</a>
    <ul class="nav-lateral__itens">
      ${secoes
        .map(
          (secao) => `
            <li>
              <a class="nav-item${secao.id === secaoAtual ? " nav-item--ativo" : ""}" href="${secao.href}">
                <span class="nav-item__icone" aria-hidden="true">${secao.icone}</span>
                <span class="nav-item__texto">${secao.rotulo}</span>
              </a>
            </li>
          `
        )
        .join("")}
    </ul>
  `;

  const backdrop = document.createElement("button");
  backdrop.className = "nav-lateral__backdrop";
  backdrop.type = "button";
  backdrop.setAttribute("aria-label", "Fechar menu");

  function fecharMenu() {
    nav.classList.remove("nav-lateral--aberta");
    backdrop.classList.remove("nav-lateral__backdrop--ativo");
    botaoMenu.setAttribute("aria-expanded", "false");
  }

  function abrirMenu() {
    nav.classList.add("nav-lateral--aberta");
    backdrop.classList.add("nav-lateral__backdrop--ativo");
    botaoMenu.setAttribute("aria-expanded", "true");
  }

  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.addEventListener("click", () => {
    if (nav.classList.contains("nav-lateral--aberta")) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  });
  backdrop.addEventListener("click", fecharMenu);
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) fecharMenu();
  });

  document.body.prepend(backdrop);
  document.body.prepend(nav);
  document.body.prepend(botaoMenu);
}

window.montarNav = montarNav;

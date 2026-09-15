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

  const LIMITE_JOGADAS_EXIBIDAS = 200;

  function descreverJogada(jogada, item) {
    const sufixoBot = ehEventoDoBot(jogada, item) ? " pelo bot" : "";
    if (jogada.acao === "bot-finalizou") {
      return jogada.mensagem || "O bot terminou a resolução.";
    }
    if (jogada.acao === "desfazer") {
      const jogadaDesfeita = jogada.desfeita;
      if (!jogadaDesfeita) return "Jogada desfeita";
      const celula = `linha ${Number(jogadaDesfeita.linha) + 1}, coluna ${Number(jogadaDesfeita.coluna) + 1}`;
      if (jogadaDesfeita.acao === "suspeito") {
        return `Desfez a marcação do suspeito ${jogadaDesfeita.suspeitoId ?? ""} na ${celula}${sufixoBot}`;
      }
      if (jogadaDesfeita.acao === "x") return `Desfez a marcação X na ${celula}${sufixoBot}`;
      if (jogadaDesfeita.acao === "apagar") return `Desfez a exclusão na ${celula}${sufixoBot}`;
      return `Desfez uma jogada na ${celula}${sufixoBot}`;
    }
    const celula = `linha ${Number(jogada.linha) + 1}, coluna ${Number(jogada.coluna) + 1}`;
    if (jogada.apagada && jogada.suspeitoId) {
      return `Suspeito ${jogada.suspeitoId} apagado na ${celula}${sufixoBot}`;
    }
    if (jogada.apagada) return `Marcacao apagada na ${celula}${sufixoBot}`;
    if (jogada.acao === "apagar") return `Marcacao apagada na ${celula}${sufixoBot}`;
    if (jogada.acao === "x") return `Marcacao X adicionada na ${celula}${sufixoBot}`;
    if (jogada.acao === "suspeito") {
      return `Suspeito ${jogada.suspeitoId ?? ""} marcado na ${celula}${sufixoBot}`;
    }
    return `Acao registrada na ${celula}`;
  }

  function formatarDuracao(ms) {
    if (ms === null || ms === undefined || ms === "") return "tempo não registrado";
    const valor = Number(ms);
    if (!Number.isFinite(valor)) return "tempo não registrado";
    if (valor < 1000) return "menos de 1s";

    const totalSegundos = Math.floor(valor / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    if (horas > 0) {
      return `${horas}h ${String(minutos).padStart(2, "0")}min ${String(segundos).padStart(2, "0")}s`;
    }
    if (minutos > 0) return `${minutos}min ${String(segundos).padStart(2, "0")}s`;
    return `${segundos}s`;
  }

  function getJogadas(item) {
    return Array.isArray(item?.jogadas) ? item.jogadas : [];
  }

  function getOrigemResolucao(item) {
    if (item.resolvidoPor === "bot") return "Bot";
    if (item.resolvidoPor === "pessoa") return "Pessoa";
    return getJogadas(item).some((jogada) => jogada.origem === "bot") ? "Bot" : "Pessoa";
  }

  function ehEventoDoBot(jogada, item) {
    if (!jogada) return false;
    if (jogada.origem === "bot") return true;
    return getOrigemResolucao(item) === "Bot" &&
      jogada.acao === "desfazer" &&
      jogada.desfeita?.origem === "bot";
  }

  function ehEventoContavel(jogada) {
    return jogada?.acao !== "bot-finalizou";
  }

  function resumirJogadas(item) {
    const jogadas = getJogadas(item);
    const contaveis = jogadas.filter(ehEventoContavel);
    const bot = contaveis.filter((jogada) => ehEventoDoBot(jogada, item)).length;
    const pessoa = Math.max(0, contaveis.length - bot);
    const desfeitas = contaveis.filter((jogada) => jogada.acao === "desfazer").length;
    const desfeitasBot = contaveis.filter(
      (jogada) => jogada.acao === "desfazer" && ehEventoDoBot(jogada, item)
    ).length;
    const apagadas = contaveis.filter((jogada) => jogada.acao === "apagar").length;
    const marcacoesX = contaveis.filter((jogada) => jogada.acao === "x").length;

    return {
      total: contaveis.length,
      bot,
      pessoa,
      desfeitas,
      desfeitasBot,
      correcoes: desfeitas + apagadas,
      marcacoesX,
    };
  }

  function formatarDetalheOrigem(resumoJogadas) {
    const partes = [];
    if (resumoJogadas.pessoa > 0 || resumoJogadas.bot === 0) {
      partes.push(`Pessoa: ${resumoJogadas.pessoa}`);
    }
    if (resumoJogadas.bot > 0) partes.push(`Bot: ${resumoJogadas.bot}`);
    return partes.join(" · ");
  }

  function formatarTentativasDesfeitas(quantidade) {
    return quantidade === 1
      ? "1 tentativa desfeita"
      : `${quantidade} tentativas desfeitas`;
  }

  function numeroValido(valor) {
    const numero = Number(valor);
    return Number.isFinite(numero) ? numero : null;
  }

  function getResumoTempo(item) {
    const origem = getOrigemResolucao(item);
    const resumoJogadas = resumirJogadas(item);
    const totalMs = numeroValido(item.tempoResolucaoMs);
    const botMs = numeroValido(item.tempoBotMs);
    const pessoaSalvaMs = numeroValido(item.tempoPessoaMs);
    const pessoaMs = pessoaSalvaMs ?? (
      origem === "Bot" && totalMs !== null && botMs !== null
        ? Math.max(0, totalMs - botMs)
        : totalMs
    );

    const chips = [
      `${item.resolvido ? "Resolvido por" : "Tentativa de"}: ${origem}`,
    ];

    if (origem === "Bot") {
      chips.push(`Tempo total: ${formatarDuracao(totalMs)}`);
      if (pessoaMs !== null) {
        const rotuloPessoa = resumoJogadas.pessoa > 0 ? "Pessoa antes do bot" : "Antes do bot";
        chips.push(`${rotuloPessoa}: ${formatarDuracao(pessoaMs)}`);
      }
      if (botMs !== null) chips.push(`Bot resolvendo: ${formatarDuracao(botMs)}`);
    } else {
      chips.push(`Tempo da pessoa: ${formatarDuracao(totalMs)}`);
    }

    return { origem, totalMs, botMs, pessoaMs, chips };
  }

  function classificarDesempenho(percentual, resolvido) {
    if (resolvido && percentual === 100) return "Excelente";
    if (percentual >= 75) return "Bom";
    if (percentual >= 50) return "Regular";
    return "Precisa revisar";
  }

  function analisarPartida(item) {
    const total = Number(item.total) || 0;
    const acertos = Number(item.acertos) || 0;
    const percentual = total > 0 ? Math.round((acertos / total) * 100) : 0;
    const resumoJogadas = resumirJogadas(item);
    const resumoTempo = getResumoTempo(item);
    const mediaPorJogadaMs = resumoTempo.totalMs !== null && resumoJogadas.total > 0
      ? resumoTempo.totalMs / resumoJogadas.total
      : null;
    const classificacao = classificarDesempenho(percentual, item.resolvido);

    let diagnostico = "Sem jogadas suficientes para analisar a partida.";
    if (item.resolvido && resumoTempo.origem === "Bot") {
      diagnostico = resumoJogadas.pessoa > 0
        ? "O bot concluiu a partida. Use o tempo da pessoa antes do bot para separar sua tentativa da resolução automática."
        : "O bot concluiu sozinho. As jogadas registradas são tentativas internas da resolução automática.";
      if (resumoJogadas.desfeitasBot > 0) {
        diagnostico += ` O histórico inclui ${formatarTentativasDesfeitas(resumoJogadas.desfeitasBot)} pelo próprio bot.`;
      }
    } else if (item.resolvido) {
      diagnostico = "Partida concluída pela pessoa. O aproveitamento ficou completo no envio.";
    } else if (percentual >= 75) {
      diagnostico = "Você chegou perto da solução. Vale revisar poucas pistas e posições finais.";
    } else if (percentual >= 50) {
      diagnostico = "A tentativa ficou no meio do caminho. Revise cômodos, linhas e colunas antes de reenviar.";
    } else if (total > 0) {
      diagnostico = "A partida precisa de uma revisão maior nas pistas antes da próxima tentativa.";
    }

    return {
      classificacao,
      diagnostico,
      metricas: [
        { rotulo: "Aproveitamento", valor: `${acertos}/${total}`, detalhe: `${percentual}% de acerto` },
        { rotulo: "Jogadas", valor: String(resumoJogadas.total), detalhe: formatarDetalheOrigem(resumoJogadas) },
        { rotulo: "Correções", valor: String(resumoJogadas.correcoes), detalhe: `Desfeitas: ${resumoJogadas.desfeitas} · X marcados: ${resumoJogadas.marcacoesX}` },
        { rotulo: "Média", valor: formatarDuracao(mediaPorJogadaMs), detalhe: "por jogada registrada" },
      ],
    };
  }

  function renderizarAnalise(item) {
    const analise = analisarPartida(item);
    const metricas = analise.metricas.map((metrica) => `
      <div class="historico-item__metrica">
        <span>${metrica.rotulo}</span>
        <strong>${metrica.valor}</strong>
        <small>${metrica.detalhe}</small>
      </div>
    `).join("");

    return `
      <section class="historico-item__analise" aria-label="Análise da partida">
        <div class="historico-item__analise-cabecalho">
          <span>Análise da partida</span>
          <strong>${analise.classificacao}</strong>
        </div>
        <div class="historico-item__metricas">${metricas}</div>
        <p>${analise.diagnostico}</p>
      </section>
    `;
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
      const resumoTempo = getResumoTempo(item);
      const tempoChips = resumoTempo.chips.map((chip) => `<span>${chip}</span>`).join("");
      cabecalho.innerHTML = `
          <div>
            <div class="historico-item__nome">${item.nome}</div>
            <div class="historico-item__data">${item.data}</div>
            <div class="historico-item__tempo">
              ${tempoChips}
            </div>
          </div>
          <span class="historico-item__resultado historico-item__resultado--${item.resolvido ? "sucesso" : "parcial"}">
            ${item.resolvido ? "Resolvido" : `${item.acertos}/${item.total}`}
          </span>
        `;
      linha.appendChild(cabecalho);
      linha.insertAdjacentHTML("beforeend", renderizarAnalise(item));

      const jogadas = getJogadas(item);
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
        jogadas.slice(0, LIMITE_JOGADAS_EXIBIDAS).forEach((jogada) => {
          const jogadaEl = document.createElement("li");
          jogadaEl.textContent = descreverJogada(jogada, item);
          listaJogadas.appendChild(jogadaEl);
        });
        jogadasBloco.appendChild(listaJogadas);

        if (jogadas.length > LIMITE_JOGADAS_EXIBIDAS) {
          const avisoLimite = document.createElement("p");
          avisoLimite.textContent =
            `Mostrando as primeiras ${LIMITE_JOGADAS_EXIBIDAS} jogadas de ${jogadas.length}. ` +
            "O restante são passos internos registrados durante a resolução.";
          jogadasBloco.appendChild(avisoLimite);
        }
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

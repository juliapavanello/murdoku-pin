import AppError from "../../infrastructure/errors/app.error.js";
import RESPONSE from "../../shared/constants/response.js";
import REGRAS from "./regras/regras.js";
import { socketAberto } from "../../infrastructure/websocket/websocket.js";

const WEBSOCKET_ABERTO = 1; // WebSocket.OPEN

// Só manda mensagem pelo socket se tiver alguém conectado. `payload`, quando
// passado, é mesclado no objeto de RESPONSE (só faz sentido pro
// COLOCAR_SUSPEITO, que é o único dos 4 formatos que tem payload variável).
function enviarMensagem(resposta, payload) {
  if (!socketAberto || socketAberto.readyState !== WEBSOCKET_ABERTO) return;
  socketAberto.send(JSON.stringify(payload ? { ...resposta, payload } : resposta));
}

/**
 * Resolve um caso do Murdoku: dado um tabuleiro e uma lista de suspeitos
 * (cada um com um `regraId` que aponta pra uma strategy em regras.js),
 * encontra uma posição válida para cada suspeito.
 *
 * Restrição "estilo Sudoku" do jogo (confirmada olhando os `solucaoMock`
 * dos tabuleiros existentes no front): cada suspeito ocupa exatamente
 * uma célula, e nenhum suspeito pode compartilhar linha OU coluna com
 * outro. Isso é imposto pelo motor, além da regra própria de cada um.
 */
function criarServiceUsuario() {
  function gameStart(payload) {
    const { suspeitos, tabuleiro } = payload;

    const posicoesFinais = {};
    const dominioInicial = {};
    for (const suspeito of suspeitos) {
      dominioInicial[suspeito.id] = calcularDominio(suspeito, suspeitos, tabuleiro, posicoesFinais);
    }

    const encontrado = investigarSuspeitosRestantes(
      [...suspeitos],
      dominioInicial,
      posicoesFinais,
      suspeitos,
      tabuleiro
    );

    if (!encontrado) {
      enviarMensagem(RESPONSE.ERRO_DESCONHECIDO);
      throw new AppError({
        ...RESPONSE.ERRO_DESCONHECIDO,
        message: "Não encontrei nenhuma posição válida pra todos os suspeitos com as dicas fornecidas.",
      });
    }

    return posicoesFinais;
  }

  // Domínio = todas as células onde ESSE suspeito, isoladamente, poderia
  // estar: não pode ser uma célula bloqueada, não pode ser uma célula já
  // ocupada por outro suspeito, e precisa satisfazer a regra dele.
  function calcularDominio(suspeito, suspeitos, tabuleiro, posicoesFinais) {
    const regra = REGRAS[suspeito.regraId] || REGRAS.semRestricao;

    return tabuleiro.celulas.filter((celula) => {
      if (celula.bloqueada) return false;
      if (celulaOcupada(celula, posicoesFinais)) return false;

      return regra({
        celula,
        suspeito,
        suspeitos,
        tabuleiro,
        posicoes: posicoesFinais,
        params: suspeito.regraParams,
      });
    });
  }

  function celulaOcupada(celula, posicoesFinais) {
    return Object.values(posicoesFinais).some(
      (ocupada) => ocupada.linha === celula.linha && ocupada.coluna === celula.coluna
    );
  }

  // Backtracking com heurística MRV (Minimum Remaining Values): sempre
  // tenta primeiro o suspeito com MENOS opções restantes, pra falhar
  // rápido quando a jogada está errada.
  function investigarSuspeitosRestantes(suspeitosRestantes, dominiosAtuais, posicoesFinais, suspeitos, tabuleiro) {
    if (suspeitosRestantes.length === 0) {
      // Investigou (e validou) todos os suspeitos: as posições em
      // posicoesFinais já são a solução completa nesse ponto.
      enviarMensagem(RESPONSE.ENVIAR_SOLUCAO);
      return true;
    }

    const suspeitoAtual = getSuspeitoComMenorDominio(suspeitosRestantes, dominiosAtuais);
    const dominioAtual = dominiosAtuais[suspeitoAtual.id] || [];

    for (const celula of dominioAtual) {
      posicoesFinais[suspeitoAtual.id] = celula;
      enviarMensagem(RESPONSE.COLOCAR_SUSPEITO, {
        supeito: suspeitoAtual.id,
        posicao: `${celula.linha}-${celula.coluna}`,
      });

      if (validarPosicoesAtuais(suspeitos, posicoesFinais, tabuleiro)) {
        const proximosSuspeitos = removerSuspeito(suspeitosRestantes, suspeitoAtual);
        // Recalcula o domínio de quem falta, já considerando a nova posição
        // (isso cobre tanto a restrição de linha/coluna quanto regras
        // relacionais que dependiam desse suspeito recém-posicionado).
        const novosDominios = recalcularDominios(proximosSuspeitos, suspeitos, tabuleiro, posicoesFinais);

        if (investigarSuspeitosRestantes(proximosSuspeitos, novosDominios, posicoesFinais, suspeitos, tabuleiro)) {
          return true; // Achou o suspeito, e propaga a resposta pra trás
        }
      }

      // Essa célula não funcionou — ou a própria jogada já era inválida, ou
      // travou mais na frente (algum suspeito depois desse ficou sem opção).
      // Desfaz e avisa o front a cada tentativa desfeita, pra dar pra
      // acompanhar o backtracking passo a passo, não só o resultado final.
      delete posicoesFinais[suspeitoAtual.id];
      enviarMensagem(RESPONSE.DESFAZER);
    }

    // Esgotou todas as células do domínio (ou ele já nasceu vazio): não há
    // mais opções pra esse suspeito nesse ramo. Retorna false pro nível
    // anterior, que vai desfazer A PRÓPRIA jogada dele (e mandar o
    // DESFAZER correspondente) no loop acima.
    return false;
  }

  // Confere se, com as posições atuais (parciais), TODOS os suspeitos já
  // posicionados continuam satisfazendo sua própria regra — incluindo os
  // que foram posicionados antes e cuja regra dependia de alguém que só
  // agora ganhou uma posição.
  function validarPosicoesAtuais(suspeitos, posicoesFinais, tabuleiro) {
    const idsPosicionados = Object.keys(posicoesFinais);

    // Ninguém pode dividir linha ou coluna com outro suspeito (regra do jogo).
    for (let i = 0; i < idsPosicionados.length; i++) {
      for (let j = i + 1; j < idsPosicionados.length; j++) {
        const a = posicoesFinais[idsPosicionados[i]];
        const b = posicoesFinais[idsPosicionados[j]];
        if (a.linha === b.linha || a.coluna === b.coluna) return false;
      }
    }

    return idsPosicionados.every((suspeitoId) => {
      const suspeito = suspeitos.find((s) => s.id === suspeitoId);
      const regra = REGRAS[suspeito.regraId] || REGRAS.semRestricao;
      return regra({
        celula: posicoesFinais[suspeitoId],
        suspeito,
        suspeitos,
        tabuleiro,
        posicoes: posicoesFinais,
        params: suspeito.regraParams,
      });
    });
  }

  function recalcularDominios(suspeitosRestantes, suspeitos, tabuleiro, posicoesFinais) {
    const dominios = {};
    for (const suspeito of suspeitosRestantes) {
      dominios[suspeito.id] = calcularDominio(suspeito, suspeitos, tabuleiro, posicoesFinais);
    }
    return dominios;
  }

  function getSuspeitoComMenorDominio(suspeitosRestantes, dominiosAtuais) {
    let escolhido = suspeitosRestantes[0];
    let menorTamanho = dominiosAtuais[escolhido.id]?.length ?? Infinity;

    for (const suspeito of suspeitosRestantes) {
      const tamanho = dominiosAtuais[suspeito.id]?.length ?? Infinity;
      if (tamanho < menorTamanho) {
        menorTamanho = tamanho;
        escolhido = suspeito;
      }
    }

    return escolhido;
  }

  function removerSuspeito(listaSuspeitos, suspeito) {
    return listaSuspeitos.filter((suspeitoLista) => suspeitoLista.id !== suspeito.id);
  }

  return { gameStart };
}

export default criarServiceUsuario;
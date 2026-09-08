import AppError from "../../infrastructure/errors/app.error.js";
import RESPONSE from "../../shared/constants/response.js";
import REGRAS from "./regras/regras.js";
import { socketAberto } from "../../infrastructure/websocket/websocket.js";

const WEBSOCKET_ABERTO = 1;

function enviarMensagem(resposta, payload) {
  if (!socketAberto || socketAberto.readyState !== WEBSOCKET_ABERTO) return;

  socketAberto.send(
    JSON.stringify(payload ? { ...resposta, payload } : resposta)
  );
}

function criarServiceUsuario() {
  function gameStart(payload) {
    const { suspeitos, tabuleiro } = payload;

    const posicoesFinais = {};
    const dominioInicial = {};

    for (const suspeito of suspeitos) {
      dominioInicial[suspeito.id] = calcularDominio(
        suspeito,
        suspeitos,
        tabuleiro,
        posicoesFinais
      );
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
        message:
          "Não encontrei nenhuma posição válida pra todos os suspeitos com as dicas fornecidas.",
      });
    }

    return posicoesFinais;
  }

  function calcularDominio(
    suspeito,
    suspeitos,
    tabuleiro,
    posicoesFinais
  ) {
    const regra = REGRAS[suspeito.regraId] || REGRAS.semRestricao;

    return tabuleiro.celulas.filter((celula) => {
      if (celula.bloqueada) return false;

      if (celulaOcupada(celula, posicoesFinais)) return false;
      if (conflitaLinhaOuColuna(celula, posicoesFinais)) return false;

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
      (ocupada) =>
        ocupada.linha === celula.linha &&
        ocupada.coluna === celula.coluna
    );
  }

  function conflitaLinhaOuColuna(celula, posicoesFinais) {
    return Object.values(posicoesFinais).some(
      (ocupada) =>
        ocupada.linha === celula.linha ||
        ocupada.coluna === celula.coluna
    );
  }

  function investigarSuspeitosRestantes(
    suspeitosRestantes,
    dominiosAtuais,
    posicoesFinais,
    suspeitos,
    tabuleiro
  ) {
    if (suspeitosRestantes.length === 0) {
      enviarMensagem(RESPONSE.ENVIAR_SOLUCAO);
      return true;
    }

    const suspeitoAtual = getSuspeitoComMenorDominio(
      suspeitosRestantes,
      dominiosAtuais
    );

    const dominioAtual = dominiosAtuais[suspeitoAtual.id] || [];

    for (const celula of dominioAtual) {
      posicoesFinais[suspeitoAtual.id] = celula;

      enviarMensagem(RESPONSE.COLOCAR_SUSPEITO, {
        supeito: suspeitoAtual.id,
        posicao: `${celula.linha}-${celula.coluna}`,
      });

      if (validarPosicoesAtuais(suspeitos, posicoesFinais, tabuleiro)) {
        const proximosSuspeitos = removerSuspeito(
          suspeitosRestantes,
          suspeitoAtual
        );

        const novosDominios = recalcularDominios(
          proximosSuspeitos,
          suspeitos,
          tabuleiro,
          posicoesFinais
        );

        if (investigarSuspeitosRestantes(proximosSuspeitos, novosDominios, posicoesFinais, suspeitos, tabuleiro)) { return true; }
      }

      delete posicoesFinais[suspeitoAtual.id];

      enviarMensagem(RESPONSE.DESFAZER);
    }

    return false;
  }

  function validarPosicoesAtuais(suspeitos,posicoesFinais,tabuleiro) {
    const idsPosicionados = Object.keys(posicoesFinais);

    for (let i = 0; i < idsPosicionados.length; i++) {
      for (let j = i + 1; j < idsPosicionados.length; j++) {
        const a = posicoesFinais[idsPosicionados[i]];
        const b = posicoesFinais[idsPosicionados[j]];

        if (
          a.linha === b.linha ||
          a.coluna === b.coluna
        ) {
          return false;
        }
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

  function recalcularDominios(
    suspeitosRestantes,
    suspeitos,
    tabuleiro,
    posicoesFinais
  ) {
    const dominios = {};

    for (const suspeito of suspeitosRestantes) {
      dominios[suspeito.id] = calcularDominio(
        suspeito,
        suspeitos,
        tabuleiro,
        posicoesFinais
      );
    }

    return dominios;
  }

  function getSuspeitoComMenorDominio(
    suspeitosRestantes,
    dominiosAtuais
  ) {
    let escolhido = suspeitosRestantes[0];

    let menorTamanho =
      dominiosAtuais[escolhido.id]?.length ?? Infinity;

    for (const suspeito of suspeitosRestantes) {
      const tamanho =
        dominiosAtuais[suspeito.id]?.length ?? Infinity;

      if (tamanho < menorTamanho) {
        menorTamanho = tamanho;
        escolhido = suspeito;
      }
    }

    return escolhido;
  }

  function removerSuspeito(listaSuspeitos, suspeito) {
    return listaSuspeitos.filter(
      (suspeitoLista) =>
        suspeitoLista.id !== suspeito.id
    );
  }

  return { gameStart };
}

export default criarServiceUsuario;
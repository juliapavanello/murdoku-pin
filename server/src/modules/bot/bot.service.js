import AppError from "../../infrastructure/errors/app.error.js";
import RESPONSE from "../../shared/constants/response.js";
import { socketAberto } from "../../infrastructure/websocket/websocket.js";

function criarServiceUsuario() {
    function gameStart(payload) {
        socketAberto.send(JSON.stringify({objeto: "Complicado", eae: 2}));
        return;
        let posicoesFinais = {}
        let dominios = {}

        for (const suspeito of payload.suspeitos) {
            dominios[suspeito.nome] = getDominioInicialSuspeito(suspeito, payload);
        }

        function investigarSuspeitosRestantes(suspeitosRestantes, dominiosAtuais) {
            if (suspeitosRestantes.length == 0) { return true; } //Investigou todos os suspeitos

            const suspeitoAtual = getSuspeitoComMenorDominio(suspeitosRestantes, dominiosAtuais)
            const dominioAtual = dominiosAtuais[suspeitoAtual.nome];
            if (dominioAtual.length == 0) { return false; } //Suspeito sem lugar pra ser colocado

            for (const celula of dominioAtual) {
                posicoesFinais[suspeitoAtual.nome] = celula;
                let novosDominios = removerLinhaAndColunaDosDominios(dominiosAtuais, celula, posicoesFinais)

                if (validarJogada()) {
                    const proximosSuspeitos = removerSuspeito(suspeitosRestantes, suspeitoAtual)
                    if (investigarSuspeitosRestantes(proximosSuspeitos, novosDominios)) {
                        return true; //Achou o suspeito, e propaga a resposta pra trás
                    }
                }
            }

            posicoesFinais = removerSuspeito(posicoesFinais, suspeitoAtual)
        }

        if (investigarSuspeitosRestantes(payload.suspeitos, dominios)) {
            return posicoesFinais;
        }

        return false;
    }

    function getDominioInicialSuspeito(suspeito, payload) {
        const posicoesValidas = payload.tabuleiro.celulas.filter(suspeito.filtroRegra)
        return posicoesValidas;
    }

    function getSuspeitoComMenorDominio(suspeitosRestantes, dominiosAtuais) {
        let menor = { length: 0 };
        for (const suspeito of suspeitosRestantes) {
            if (dominiosAtuais[suspeito.nome].length < menor.length) {
                menor = dominiosAtuais[suspeito.nome];
            }
        }
        return menor;
    }

    function removerSuspeito(listaSuspeitos, suspeito) {
        const index = listaSuspeitos.findIndex(suspeitoLista => suspeitoLista.nome === suspeito.nome);

        if (index !== -1) {
            listaSuspeitos.splice(index, 1);
        }

        return listaSuspeitos;
    }

    function removerLinhaAndColunaDosDominios(dominiosAtuais, celula, posicoesFinais) {
        for (const dominioAtual of dominiosAtuais) {

        }
    }

    return { gameStart }
}

export default criarServiceUsuario;
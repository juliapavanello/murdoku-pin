const RESPONSE = Object.freeze({
    ERRO_DESCONHECIDO: {
        code: 0,
        message: "Um erro inesperado ocorreu! Espero que não tenha acontecido na frente do professor",
        status: 500
    },
    COLOCAR_SUSPEITO: {
        code: 1,
        message: "Acho que o suspeito x pode estar na posição y",
        status: "200",
        payload: {
            supeito: "",
            posicao: "",
        }
    },
    DESFAZER: {
        code: 2,
        message: "Ok, o último suspeito não deve estar errado, pois estou sem opções de jogada e ainda tenho suspeitos.",
        status: "200"
    },
    ENVIAR_SOLUCAO: {
        code: 3,
        message: "Achei uma solução válida para todos os suspeitos!",
        status: "200"
    }
});

export default RESPONSE;
const socket = new WebSocket('ws://localhost:7032/ws');

socket.onopen = () => {
    console.log('✅ Comunicação com o bot estabelecida!');
};

socket.onmessage = (event) => {
    let res;
    try {
        res = JSON.parse(event.data);
    } catch {
        console.log('Mensagem do servidor:', event.data);
        return;
    }

    console.log("Servidor: ");
    console.log(res);

    const resultado = window.jogo?.botResolver(res);
    if (resultado) console.log("Resultado da jogada do bot:", resultado);
};

socket.onerror = (error) => {
    console.error('❌ Erro:', error);
};

socket.onclose = () => {
    console.log('Comunicação encerrada.');
};
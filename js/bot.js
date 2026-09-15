const isLocal =
    window.location.protocol === 'file:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';
const socket = new WebSocket(
    isLocal ? 'ws://localhost:7032/ws' : 'wss://murdoku-pin.onrender.com/ws'
);

socket.onopen = () => {
    console.log('✅ Comunicação com o bot estabelecida!');
};

const jogadas = [];

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
    window?.botResolver(res);
};

// setInterval(() => {
//     if (jogadas.length == 0) return;
//     const jogada = jogadas.shift()

//     const resultado = window?.botResolver(jogada);
//     if (resultado) console.log("Resultado da jogada do bot:", resultado);
// }, 1)

socket.onerror = (error) => {
    console.error('❌ Erro:', error);
};

socket.onclose = () => {
    console.log('Comunicação encerrada.');
};

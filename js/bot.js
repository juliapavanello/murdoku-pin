const socket = new WebSocket('ws://localhost:7032/ws');

socket.onopen = () => {
    console.log('✅ Comunicação com o bot estabelecida!');
};

socket.onmessage = (event) => {
    const res = JSON.parse(event.data)
    console.log("Servidor: ");
    
    console.log(res);
};

socket.onerror = (error) => {
    console.error('❌ Erro:', error);
};

socket.onclose = () => {
    console.log('Comunicação encerrada.');
};
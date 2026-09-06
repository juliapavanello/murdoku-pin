import { WebSocketServer } from 'ws';
export let socketAberto = null;

function createWebSocketServer(server) {
    const wss = new WebSocketServer({
        server,
        path: '/ws'
    });

    wss.on('connection', (socket) => {
        socketAberto = socket;
        console.log('WebSocket conectado.');

        socket.send('Olá, cliente! Mensagem enviada pelo backend.');
        socket.on('message', (message) => {
            console.log('Mensagem recebida:', message.toString());
        });

        socket.on('close', () => {
            console.log('WebSocket desconectado.');
            socketAberto = null
        });

        socket.on('error', (error) => {
            console.error('WebSocket Error:', error);
            socketAberto = null
        });
    });

    return wss;
}

export default createWebSocketServer;
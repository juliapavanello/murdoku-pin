import dotenv from 'dotenv/config';
import path from 'path';

import http from 'node:http';
import app from './app.js';
import createWebSocketServer from './infrastructure/websocket/websocket.js';

const PORT = process.env.PORT_BACK || 3000;
const server = http.createServer(app);

createWebSocketServer(server)

server.listen(PORT, () => {
    console.log("Servidor iniciado na porta " + PORT);
})
import { IncomingMessage } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 8080;

// Inicializa o servidor WebSocket
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws: WebSocket, request: IncomingMessage) => {
    console.log('Cliente conectado!');

    console.log({
        ip: request.socket.remoteAddress,
        userAgent: request.headers['user-agent'],
        entryTime: Date.now(),
        actions: []
    })

    // Recebe mensagens do cliente
    ws.on('message', (message: string) => {
    console.log(`Mensagem recebida: ${message}`);

    // Responde ao cliente
    ws.send(`Mensagem recebida: ${message}`);
    });

    // Lida com o fechamento da conexão
    ws.on('close', () => {
    console.log('Cliente desconectado.');
    });
});

console.log(`Servidor WebSocket rodando na porta ${PORT}`);
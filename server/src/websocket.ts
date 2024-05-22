import WebSocket from 'ws';
import { Server } from 'http';

let wss: WebSocket.Server;

export const setupWebSocket = (server: Server) => {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
      console.log('Received:', message);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  return wss;
};

export const closeWebSocket = () => {
  if (!wss) {
    return;
  }
  wss.clients.forEach(client => client.close());
  wss.close();
};

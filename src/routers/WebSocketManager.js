const WebSocket = require('ws');

class WebSocketManager {
  constructor() {
    this.clients = new Set();
  }

  initWebSocketServer(server) {
    this.websocketServer = new WebSocket.Server({ server });

    this.websocketServer.on('connection', (ws) => {
      // console.log('Client connected via WebSocket');
      this.clients.add(ws);

      ws.on('message', (message) => {
        const messageString = message.toString('utf8');
        // console.log('Received:', messageString);

        // Broadcast the message to all clients except the sender
        this.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(messageString);
          }
        });
      });

      ws.on('close', () => {
        // console.log('Client disconnected');
        this.clients.delete(ws);
      });
    });
  }

  broadcast(message) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

module.exports = WebSocketManager;

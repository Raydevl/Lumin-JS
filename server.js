const WebSocket = require('ws');

// Create a WebSocket server
const server = new WebSocket.Server({ port: 8080 });

// Store connected clients in an array
const clients = [];

// Handle new connections
server.on('connection', (client) => {
  // Add client to the list of connected clients
  clients.push(client);

  // Handle incoming messages from the client
  client.on('message', (message) => {
    // Broadcast the message to all connected clients
    clients.forEach((c) => {
      if (c !== client && c.readyState === WebSocket.OPEN) {
        c.send(message);
      }
    });
  });

  // Handle disconnections
  client.on('close', () => {
    // Remove client from the list of connected clients
    const index = clients.indexOf(client);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

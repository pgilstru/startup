const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  // create websocket object
  const wss = new WebSocketServer({ noServer: true });

  // handle protocol upgrade (HTTP --> WebSocket)
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // track the connections to forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    // const connection = { id: uuid.v4(), alive: true, ws: ws };
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);
    console.log('New connection est');

    // forward messages to everyone except sender
    ws.on('message', function message(data) {
      //OG
      console.log('Received WebSocket message: ', message);
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // remove closed connection so we don't try forwarding anymore
    ws.on('close', () => {
      const pos = connections.findIndex((o, i) => o.id === connection.id);
      console.log('Da connection closedr');

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // kill connection that didn't respond to the ping
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy }

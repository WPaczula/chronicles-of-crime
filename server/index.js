const { Server: WebSocketServer } = require("ws");

const webSocketServer = new WebSocketServer({ port: 5001 });

const connections = [];

let history = [];

webSocketServer.on("connection", ws => {
  console.log("New connection!");
  connections.push(ws);

  ws.on("message", message => {
    console.log(message);
    history.push(...JSON.parse(message));

    connections
      .filter(c => c !== ws)
      .forEach(c => {
        c.send(JSON.stringify(history));
      });
  });

  ws.on("close", () => {
    const id = connections.indexOf(ws);

    if (id !== -1) {
      connections.splice(id, 1);
    }
  });

  ws.send(JSON.stringify(history));
});

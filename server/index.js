const { Server: WebSocketServer } = require("ws");

const port = process.env.PORT || 5001;
const webSocketServer = new WebSocketServer({ port });

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

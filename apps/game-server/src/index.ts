import { createServer } from "node:http";
import { WebSocketServer } from "ws";
import { PROTOCOL_VERSION } from "@bear/shared";

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "127.0.0.1";

const httpServer = createServer((request, response) => {
  if (request.url === "/health" && request.method === "GET") {
    response.writeHead(200, {
      "Content-Type": "application/json",
    });

    response.end(
      JSON.stringify({
        success: true,
        service: "bear-game-server",
        status: "healthy",
      }),
    );

    return;
  }

  response.writeHead(404, {
    "Content-Type": "application/json",
  });

  response.end(
    JSON.stringify({
      success: false,
      message: "Route not found",
    }),
  );
});

const websocketServer = new WebSocketServer({
  server: httpServer,
  path: "/ws",
});

websocketServer.on("connection", (socket) => {
  console.log("[WEBSOCKET] Client connected.");

  socket.on("message", (message) => {
    console.log("[WEBSOCKET] Received:", message.toString());
  });

  socket.on("close", () => {
    console.log("[WEBSOCKET] Client disconnected.");
  });

  socket.on("error", (error) => {
    console.error("[WEBSOCKET] Error:", error);
  });

  socket.send(
    JSON.stringify({
      type: "CONNECTION_ESTABLISHED",
      protocolVersion: PROTOCOL_VERSION,
      serverId: "local-game-server",
    }),
  );
});

httpServer.listen(PORT, HOST, () => {
  console.log("====================================");
  console.log("       BEAR GAME SERVER");
  console.log("====================================");
  console.log(`HTTP:      http://${HOST}:${PORT}`);
  console.log(`WebSocket: ws://${HOST}:${PORT}/ws`);
  console.log("Status:    Running");
  console.log("====================================");
});

import express, { Express } from "express";
import { PORT } from "./config.json";
import cors from "cors";
import * as socketio from "socket.io";
import EventManager from "./managers/EventManager";
import GameManager from "./managers/GameManager";


const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

function runServer() {
  const server = app.listen(PORT, () => {
    console.log(`[server] runned. PORT: ${PORT}`);
  });

  EventManager.setIo(server);
  GameManager.update();
}

runServer();

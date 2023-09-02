import { Server } from "http";
import * as socketio from "socket.io";
import PlayersManager from "./PlayersManager";

class EventManager {
  io: socketio.Server|null = null;
  playerSeed: number;

  constructor () {

  }

  setIo (server: Server) {
    console.log("[event] socket setup");

    this.io = new socketio.Server(server, { 
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
     });

    this.io.on("connection", (socket: socketio.Socket) => {
      console.log("Connection");

      socket.on("createPlayerEvent", () => this.createPlayerEvent(socket));
      
      socket.on("disconnect", () => {
        PlayersManager.deletePlayerBySocketId(socket.id);
      });
      
      socket.on("setPlayerTarget", (data) => {
        console.log(data);
        const player = PlayersManager.findPlayerById(data.id);
        
        if (!player)
          return;
        
        player.targetX = data.targetX;
        player.targetY = data.targetY;
      });
    });
  }

  createPlayerEvent (socket: socketio.Socket) {
    PlayersManager.createPlayer(socket);
  }

  update () {

  }
}
export default new EventManager();

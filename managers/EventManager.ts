import { Server } from "http";
import * as socketio from "socket.io";
import PlayersManager from "./PlayersManager";
import WorldObjectsManager from "./WorldObjectsManager";
import { MoveToGameObjectEvent } from "../GameObjects/Unit/Unit";

interface GetResource {
  objectId: number,
  playerId: number
};

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

      socket.on("createPlayerEvent", () => {
        console.log("Create new player event")
        this.createPlayerEvent(socket);
      });
      
      socket.on("disconnect", () => {
        PlayersManager.deletePlayerBySocketId(socket.id);
      });
      
      socket.on("setPlayerTarget", (data) => {
        const player = PlayersManager.findPlayerById(data.id);
        
        if (!player)
          return;
        
        player.targetX = data.targetX;
        player.targetY = data.targetY;

        player.findPath = false;
      });

      socket.on("getResource", (data: GetResource) => {
        console.log("Getting resources")
      });

      socket.on("pushNewEvent", (data) => {
        const player = PlayersManager.findPlayerById(data.id);

        if (!player)
          return;

        switch (data.type) {
          case "move-to-gameobject-event":
            
          break;

          case "get-resource-event":

          break;
        }
      });

      socket.on("player-move-direction", (data) => {
        const { id, direction } = data;

        const player = PlayersManager.findPlayerById(id);

        if (!player)
          return;
        
        player.move(direction);
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

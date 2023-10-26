import Player from "../GameObjects/Player";
import { Socket } from "socket.io";
import WorldObjectsManager from "./WorldObjectsManager";

class PlayerManager {
  players: Array<Player> = [];

  constructor () {
  }

  createPlayer (socket: Socket) {
    const newPlayer = new Player();

    newPlayer.socket = socket;
    this.players.push(newPlayer);

    console.log(`[playerManager] new player`);
    newPlayer.socket.emit("playerCreated", newPlayer.networkData());
    

    const playersNetworkData = this.players.map(pl => pl.networkData());

    newPlayer.socket.emit("updateEvent", {
      playersData: playersNetworkData.filter(_player => _player.id !== newPlayer.id ),
      ownPlayerData: newPlayer.networkData(),
      worldObjectsData: WorldObjectsManager.objects.map(wo => wo.networkData()),
      unitsData: []
    });
  }

  update () {
    // console.log("dt");
    this.players.map(player => {
      player.update();
    });
  }

  findPlayerById (id: number) {
    const players = this.players.filter(player => player.id == id);
    // console.log(players, id)
    // console.log(this.players)
    if (players.length > 0)
      return players[0];
    else 
      return null;
  }

  deletePlayerBySocketId (socketId: string) {
    this.players.map((player, index) => {
      if (player.socket.id == socketId)
        this.players.splice(index, 1);
    })
  }
}

export default new PlayerManager();

import GameObject from "../GameObjects/GameObject";
import PlayersManager from "./PlayersManager";
import WorldObjectsManager from "./WorldObjectsManager";

class GameManager {
  worldObjectsUpdates: [[GameObject, number]];
  
  update () {
    PlayersManager.update();
    WorldObjectsManager.update();

    const playersNetworkData = PlayersManager.players.map(player => player.networkData());
    const unitsNetworkData = WorldObjectsManager.unitObjects.map(unit => unit.networkData());

    PlayersManager.players.map(player => {
      const ownPlayer = PlayersManager.findPlayerById(player.id);

      const worldObjectDataMap = WorldObjectsManager.objects.filter(object => { 
        if (object.networkUpdateId == object.lastUpdateId)
          return false;
         
        object.networkUpdateId = object.lastUpdateId;
        return true;
      });

      player.socket.emit("updateEvent", {
        playersData: playersNetworkData.filter(_player => _player.id !== player.id ),
        ownPlayerData: ownPlayer==null? null: ownPlayer.networkData(),
        worldObjectsData: worldObjectDataMap.map(wo => wo.networkData()),
        unitsData: unitsNetworkData
      });
    });

    setTimeout(() => this.update(), 15);
  }
}

export default new GameManager();

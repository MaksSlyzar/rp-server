import Player from "../../Player";
import PlayerActivity from "./PlayerActivity";

class StarterActivity extends PlayerActivity {
    constructor (player: Player) {
        super(player);
    }

    update () {

    }

    networkData() {
        return {

        };
    }
}

export default StarterActivity;
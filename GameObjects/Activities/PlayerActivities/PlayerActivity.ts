import Player from "../../Player";

interface ActivityText {
    text: string;
    icon: string;
}

class PlayerActivity {
    title: string;
    description: Array<ActivityText>;
    player: Player;
    lastUpdated: number;

    constructor (player: Player) {
        this.player = player;
    }

    networkData () {
        return {};
    }

    generateNewUpdate () {
        this.lastUpdated = Math.round(Math.random() * 1000000);
    }
}

export default PlayerActivity;
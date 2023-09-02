import GameObject from "../GameObject";

class Tree extends GameObject {
    collision = true;
    collider = {
        x: 35,
        y: 35,
        width: 50,
        height: 50 
    };

    constructor () {
        super();
        this.updateId();
    }

    networkData () {
        return {
          posX: this.posX,
          posY: this.posY,
          id: this.id,
          type: "Tree"
        }
    }

    updateId () {
        this.lastUpdateId = Math.random() * 1000000000;
    }
}

export default Tree;
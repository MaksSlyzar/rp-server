import GameObject from "../GameObject";

class Tree extends GameObject {
    collision = true;
    collider = {
        x: 0,
        y: 0,
        width: 64,
        height: 64 
    };
    type: string = "tree";

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
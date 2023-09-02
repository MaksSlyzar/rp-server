class GameObject {
    posX: number;
    posY: number;
    width: number;
    height: number;
    collision: boolean;
    collider: {
        x: number,
        y: number,
        width: number,
        height: number
    };
    id = Math.round(Math.random() * 10000000);
    lastUpdateId: number;
    networkUpdateId: number;

    constructor () {
        
    }

    update () {};

    networkData () {
        return {
            id: this.id,
            type: "GameObject"
        }
    }
}

export default GameObject;
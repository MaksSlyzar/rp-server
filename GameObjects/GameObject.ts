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

    networkData (): any {
        return {
            id: this.id,
            type: "GameObject"
        }
    }

    getPosWithCollider () {
        if (this.collider == null) {
            console.error("This gameobject haven't collider.");
            return null;
        }

        return {
            x: this.posX + this.collider.x,
            y: this.posY + this.collider.y,
            width: this.collider.width,
            height: this.collider.height
        };
    }
}

export default GameObject;
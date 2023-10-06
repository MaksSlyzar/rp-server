import { nextTick } from "process";
import WorldObjectsManager from "../../managers/WorldObjectsManager";
import { CheckDistanceRect } from "../../modules/Collider/CheckDistance";
import GameObject from "../GameObject";

class Unit extends GameObject {
    eventsTurn: TurnEvent[] = [];
    eventIndex: number= 0;
    movespeed: number = 3;
    collider = { 
        x: 0,
        y: 0,
        width: 32,
        height: 32 
    };
    posX = 0;
    posY = 0;
    rotation: number = 0;
    

    constructor () {
        super();
    }

    update () {

        // console.log(this.eventsTurn)

        if (this.eventsTurn.length == 0) {
            return;
        }

        const event = this.eventsTurn[this.eventIndex];
        // console.log(event.update);
        
        const result = event.update(this);

        // if (result == 1)
        //     this.eventIndex += 1;
    }

    networkData() {
        return {
            posX: this.posX,
            posY: this.posY,
            id: this.id,
            rotation: this.rotation
        }
    }

    subcribeEvent (event: TurnEvent) {
        event.selfGameObject = this;
        this.eventsTurn.push(event);
    }
}

export default Unit;



class TurnEvent {
    id: number;
    selfGameObject: GameObject;

    update (selfGameObject: Unit) {
        // return 0;
    }
}

export class MoveToGameObjectEvent extends TurnEvent {
    onSuccess: () => void;
    onFail: () => void;
    findedPath: boolean = false;
    paths: any = [];

    start: boolean = false;
    selfGameObject: GameObject;
    gameObject: GameObject;

    constructor (gameObjectId: number) {
        super();

        this.gameObject = WorldObjectsManager.getById(gameObjectId);
    }

    update (selfGameObject: Unit) {
        if (this.start == false) {
            this.start = true;
            this.findPath(selfGameObject.posX, selfGameObject.posY, this.gameObject.posX, this.gameObject.posY);
        }

        if (this.paths.length == 0) {
            // this.onSuccess();

            return 1;
        }

        // console.log(this.paths)

        const nextTarget = this.paths[0];

        const nextTargetPosX = nextTarget[0] * 32;
        const nextTargetPosY = nextTarget[1] * 32;

        const rad = Math.atan2(nextTargetPosY - selfGameObject.posY, selfGameObject.posX - nextTargetPosX);

        // selfGameObject.rotation = rad;

        // console.log(rad * (180 / Math.PI));

        //const rad = Math.atan2(targetY - this.posY, this.posX - targetX);
        const newPosition = {
            x: selfGameObject.posX - Math.cos(rad) * selfGameObject.movespeed,
            y: selfGameObject.posY + Math.sin(rad) * selfGameObject.movespeed
        };

        // console.log(newPosition.x)
    
        selfGameObject.posX = newPosition.x;
        selfGameObject.posY = newPosition.y;

        // console.log(selfGameObject.posX)

        // console.log(selfGameObject.posX)

        const d = CheckDistanceRect(selfGameObject.getPosWithCollider(),
        {
            x: nextTargetPosX,
            y: nextTargetPosY,
            width: 32,
            height: 32
        });
    
        if (d < 2) {
            selfGameObject.posX = nextTargetPosX;
            selfGameObject.posY = nextTargetPosY;
    
            this.paths.splice(0, 1);
        }

        return 0;
    }

    findPath (selfPosX: number, selfPosY: number, targetPosX: number, targetPosY: number) {
        let startPos = { x: Math.round(selfPosX / 32), y: Math.round(selfPosY / 32) };
        let goalPos = { x: Math.round(targetPosX / 32) - 1, y: Math.round(targetPosY / 32) };
        // console.log(startPos, goalPos)
        this.paths = WorldObjectsManager.aStarInstance.findPath(startPos, goalPos);

        this.findedPath = true;
    }
}

export class GetResourceEvent extends TurnEvent {
    gameObject: GameObject;

    constructor () {
        super();
    }

    update (selfGameObject: Unit) {
        return 0;
    }
}






// update () {
//     if (this.targetX < 0)
//       return;
//     if (this.targetY < 0)
//       return;
    
//     if (this.findPath == false) {
//       // let startPos = { x: Math.round(this.posX / 32), y: Math.round(this.posY / 32) };
//       // let goalPos = { x: Math.round(this.targetX / 32), y: Math.round(this.targetY / 32) };
      
//       let startPos = { x: Math.floor(this.posX / 32), y: Math.floor(this.posY / 32) };
//       let goalPos = { x: Math.round(this.targetX / 32), y: Math.round(this.targetY / 32) };

//       this.movePath = WorldObjectsManager.aStarInstance.findPath(startPos, goalPos);
//       console.log(startPos)
//       console.log(this.movePath)
    
//       // console.log(myPathway)

//       this.findPath = true;
//     }

//     if (this.movePath.length == 0)
//       return;

//     // console.log(this.movePath);

//     const target = this.movePath[0];
//     // const rad = Math.atan2(target[0] * 32 - this.posY, this.posX - target[1] * 32);
    
//     // this.rotation = rad;

//     // const newPosition = {
//     //     x: this.posX - Math.cos(rad) * this.movespeed,
//     //     y: this.posY + Math.sin(rad) * this.movespeed
//     // };

//     // console.log(newPosition) 

//     // this.posX = newPosition.x;
//     // this.posY = newPosition.y; 

//     // this.posX = target[0] * 16;
//     // this.posY = target[1] * 16;

//     const targetX = target[0] * 32;
//     const targetY = target[1] * 32;


//     // console.log(target)
    
//     const rad = Math.atan2(targetY - this.posY, this.posX - targetX);
    
//     this.rotation = rad;

//     const newPosition = {
//         x: this.posX - Math.cos(rad) * this.movespeed,
//         y: this.posY + Math.sin(rad) * this.movespeed
//     };

//     this.posX = newPosition.x;
//     this.posY = newPosition.y;



//     // console.log(this.posX, targetX, this.posY, targetY)

//     const d = CheckDistanceRect({
//       x: this.posX,
//       y: this.posY,
//       width: 32,
//       height: 32
//     },
//     {
//       x: targetX,
//       y: targetY,
//       width: 32,
//       height: 32
//     });

//     if (d < 2) {
//       this.posX = targetX;
//       this.posY = targetY;

//       this.movePath.splice(0, 1);
//     }

//     // console.log(d)
//     // console.log(this.posX, this.posY)

//     // console.log(Math.round(this.posY / 32) - 1 - targetY)

//     // console.log(d)
//     // if (d < 50) {
//     //   this.movePath.splice(0, 1);
//     // }

//     // if (Math.round(this.posX / 32) + 1 - targetX == 0) {
//     //   if (Math.round(this.posY / 32) - 1 - targetY == 0) {
//     //     // console.log("yes123")

//     //     this.movePath.splice(0, 1);
//     //   }
//     // }
//   }
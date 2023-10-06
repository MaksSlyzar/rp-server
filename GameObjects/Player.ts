import {Socket} from "socket.io";
import WorldObjectsManager from "../managers/WorldObjectsManager";
import CheckCollision from "../modules/Collider/CheckCollision";
import GameObject from "./GameObject";
import PlayersManager from "../managers/PlayersManager";
import { CheckDistanceRect } from "../modules/Collider/CheckDistance";
import Inventory from "../modules/Inventory/Inventory";



class Player extends GameObject {
  posX: number;
  posY: number;
  socket: Socket;
  id: number;
  targetX: number;
  targetY: number;
  movespeed: number;
  globalTargetX: number;
  globalTargetY: number;
  rotation: number;
  findPath: boolean = true;
  movePath: number[][] = [];
  collider = { 
    x: 0,
    y: 0,
    width: 32,
    height: 32,
  };
  isMove: boolean = false;
  targetMovePosition: { posX: number, posY: number } | null = null;
  inventory: Inventory;

  constructor () {
    super();

    this.posX = 32;
    this.posY = 128;
    this.targetX = 0;
    this.targetY = 0;
    this.movespeed = 5;
    this.rotation = 0;
    this.id = Math.round(Math.random() * 10000000);

    this.inventory = new Inventory(5);
  }

  update () {
    //Move
    
    if (this.isMove) {
      if (this.targetMovePosition.posX == this.posX && this.targetMovePosition.posY == this.posY)
        this.isMove = false;

      const backX = this.posX;
      const backY = this.posY;

      if (this.targetMovePosition.posX < this.posX) {
        this.posX -= this.movespeed;
      }

      if (this.targetMovePosition.posY < this.posY) {
        this.posY -= this.movespeed;
      }

      if (this.targetMovePosition.posX > this.posX) {
        this.posX += this.movespeed;
      }

      if (this.targetMovePosition.posY > this.posY) {
        this.posY += this.movespeed;
      }

      let collision = false;
      WorldObjectsManager.objects.map(obj => {
        // console.log(CheckDistanceRect(obj.getPosWithCollider(), this.getPosWithCollider()))
        if (CheckDistanceRect(obj.getPosWithCollider(), this.getPosWithCollider()) < 40)  {
          collision = true;
        }
      });

      if (collision) {
        this.posX = backX;
        this.posY = backY;
        this.isMove = false;
      }
    }
  }

  networkData () {
    return {
      posX: this.posX,
      posY: this.posY,
      id: this.id,
      inventory: this.inventory.networkData()
    }
  }

  move (direction: string) {
    if (this.isMove == true)
      return;

    let newPosition = {
      posX: this.posX,
      posY: this.posY
    };

    const newDirection = direction.split(";");

    if (newDirection.includes("right")) {
      newPosition.posX += this.movespeed * 4;
    }

    if (newDirection.includes("left")) {
      newPosition.posX -= this.movespeed * 4
    }

    if (newDirection.includes("up")) {
      newPosition.posY -= this.movespeed * 4;
    }

    if (newDirection.includes("down")) {
      newPosition.posY += this.movespeed * 4;
    }

    this.targetMovePosition = newPosition;

    this.isMove = true;



    // let newPosition = {
    //   posX: this.posX,
    //   posY: this.posY
    // };

    // if (direction == "right") {
    //   newPosition.posX += this.movespeed;
    // }

    // if (direction == "left") {
    //   newPosition.posX -= this.movespeed;
    // }

    // if (direction == "up") {
    //   newPosition.posY -= this.movespeed;
    // }

    // if (direction == "down") {
    //   newPosition.posY += this.movespeed;
    // }


    // const collidedObjects = WorldObjectsManager.objects.filter(object => {
    //   if (object.collision == false)
    //     return false

    //   return !CheckCollision({
    //     x: object.posX,
    //     y: object.posY,
    //     width: object.collider.width,
    //     height: object.collider.height
    //   },
    //   {
    //     x: newPosition.posX,
    //     y: newPosition.posY,
    //     width: this.collider.width,
    //     height: this.collider.height
    //   })
    // });

    // console.log(collidedObjects)

    // if (collidedObjects.length == 0) {
    //   this.posX = newPosition.posX;
    //   this.posY = newPosition.posY;
    // }

    
  }

}

export default Player;

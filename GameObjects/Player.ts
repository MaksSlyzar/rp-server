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
    width: 64,
    height: 64,
  };
  isMove: boolean = false;
  targetMovePosition: { posX: number, posY: number } | null = null;
  inventory: Inventory;
  direction: "RIGHT"|"LEFT"|"UP"|"DOWN"|"RIGHT-UP"|"LEFT-UP"|"LEFT-DOWN"|"RIGHT-DOWN" = "LEFT";

  constructor () {
    super();

    this.posX = 32;
    this.posY = 128;
    this.targetX = 0;
    this.targetY = 0;
    this.movespeed = 2.5;
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
      inventory: this.inventory.networkData(),
      direction: this.direction
    }
  }

  move (dir: string) {
    if (this.isMove == true)
      return;

    let newPosition = {
      posX: this.posX,
      posY: this.posY
    };

    const direction = dir as "UP" | "DOWN" | "LEFT" | "RIGHT";
    // console.log(direction)
    // if (newDirection.includes("right")) {
    //   newPosition.posX += this.movespeed * 4;
    // }

    // if (newDirection.includes("left")) {
    //   newPosition.posX -= this.movespeed * 4
    // }

    // if (newDirection.includes("up")) {
    //   newPosition.posY -= this.movespeed * 4;
    // }

    // if (newDirection.includes("down")) {
    //   newPosition.posY += this.movespeed * 4;
    // }

    switch (direction) {
      case "UP":
        newPosition.posY -= this.movespeed * 4;
      break;
      case "DOWN":
        newPosition.posY += this.movespeed * 4;
      break;
      case "LEFT":
        newPosition.posX -= this.movespeed * 4;
      break;
      case "RIGHT":
        newPosition.posX += this.movespeed * 4;
      break;
    }

    this.direction = direction;

    this.targetMovePosition = newPosition;

    this.isMove = true;
  }

}

export default Player;

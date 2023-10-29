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
    x: 16,
    y: 16,
    width: 48,
    height: 48,
  };
  isMove: boolean = false;
  targetMovePosition: { posX: number, posY: number } | null = null;
  inventory: Inventory;
  direction: "RIGHT"|"LEFT"|"UP"|"DOWN"|"RIGHT-UP"|"LEFT-UP"|"LEFT-DOWN"|"RIGHT-DOWN" = "LEFT";

  lastIsMove: boolean = false;

  constructor () {
    super();

    this.posX = 32;
    this.posY = 128;
    this.targetX = 0;
    this.targetY = 0;
    this.movespeed = 12.8;
    this.rotation = 0;
    this.id = Math.round(Math.random() * 10000000);

    this.inventory = new Inventory(5);
  }

  update () {
    if (this.isMove) {
      if (Math.floor(this.targetMovePosition.posX) == Math.floor(this.posX) && Math.floor(this.targetMovePosition.posY) == Math.floor(this.posY)) {
        this.isMove = false;
      }

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
        if (CheckCollision(this.getPosWithCollider(), obj.getPosWithCollider()) == false)  {
          collision = true;
        }
      });

      if (collision) {
        this.posX = backX;
        this.posY = backY;
        this.isMove = false;
      }

      if (this.isMove != this.lastIsMove) {
        this.lastIsMove = this.isMove;
      }
    }
  }

  networkData () {
    return {
      posX: this.posX,
      posY: this.posY,
      id: this.id,
      inventory: this.inventory.networkData(),
      direction: this.direction,
      isMove: this.isMove
    }
  }

  move (dir: string) {
    let newPosition = {
      posX: this.posX,
      posY: this.posY
    };

    const direction = dir as typeof this.direction;

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
      case "RIGHT-UP":
        newPosition.posY -= this.movespeed * 4;
        newPosition.posX += this.movespeed * 4;
      break;
      case "RIGHT-DOWN":
        newPosition.posY += this.movespeed * 4;
        newPosition.posX += this.movespeed * 4;
      break;
      case "LEFT-UP":
        newPosition.posY -= this.movespeed * 4;
        newPosition.posX -= this.movespeed * 4;
      break;
      case "LEFT-DOWN":
        newPosition.posY += this.movespeed * 4;
        newPosition.posX -= this.movespeed * 4;
      break;
    }

    this.direction = direction;

    this.isMove = true;

    this.targetMovePosition = newPosition;

    this.isMove = true;
  }

}

export default Player;

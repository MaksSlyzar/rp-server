import GameObject from "../GameObjects/GameObject";
import Unit, { MoveToGameObjectEvent } from "../GameObjects/Unit/Unit";
import GoldenOre from "../GameObjects/worldResources/GoldenOre";
import Tree from "../GameObjects/worldResources/Tree";
import { AStarFinder, Grid } from "astar-typescript";
import { getRandomInt } from "../modules/Random";
import BlueCrystal from "../GameObjects/worldResources/BlueCrystal";

class WorldObjectsManager {
    objects: Array<GameObject> = [];
    unitObjects: Array<Unit> = [];
    matrix: number [][];
    aStarInstance: AStarFinder;
    
    constructor () {

        this.matrix = [];
        
        for (let i = 0; i < 320; i++) {
            this.matrix.push([]);

            for (let k = 0; k < 320; k++) {
                this.matrix[this.matrix.length - 1].push(0);
            }
        }

        this.spawnObjects();
    }

    spawnObjects () {
        // for (let i = 1; i <= 10; i+=1) {
        //     for (let k = 1; k <= 10; k+=1) {
        //         const newTree = new Tree();

        //         newTree.posX = i * 200;
        //         newTree.posY = k * 200;

        //         newTree.posX -= newTree.posX % 32;
        //         newTree.posY -= newTree.posY % 32;

        //         this.objects.push(newTree);
        //     }
        // }

        // const newTree = new Tree();

        // newTree.posX = 4 * 32;
        // newTree.posY = 4 * 32;
        // this.objects.push(newTree);


        // for (let object of this.objects) {
        //     const clitesWidth = object.collider.width / 32;
        //     const clitesHeight = object.collider.height / 32;

        //     for (let y = 0; y < clitesHeight; y++) {
        //         for (let x = 0; x < clitesWidth; x++) {

        //             try {
        //                 this.matrix[y + object.posY / 32][x + object.posX / 32] = 1;
                
        //             } catch {
        //                 console.log(y + object.posY / 32, x + object.posX / 32);
        //             }
        //         }
        //     }
        // }
    
        
        for (let i = 0; i < 150; i++) {
            const randomX = getRandomInt(0, 50);
            const randomY = getRandomInt(0, 50);

            const newCrystal = new Tree();
            newCrystal.posX = randomX * 120;
            newCrystal.posY = randomY * 120;
            
            this.objects.push(newCrystal);
        }

        for (let i = 0; i < 13; i++) {
            const randomX = getRandomInt(0, 80);
            const randomY = getRandomInt(0, 80);

            const newCrystal = new BlueCrystal();
            newCrystal.posX = randomX * 32;
            newCrystal.posY = randomY * 32;
            
            this.objects.push(newCrystal);
        }

        for (let i = 0; i < 13; i++) {
            const randomX = getRandomInt(0, 80);
            const randomY = getRandomInt(0, 80);

            const newCrystal = new GoldenOre();
            newCrystal.posX = randomX * 32;
            newCrystal.posY = randomY * 32;
            
            this.objects.push(newCrystal);
        }

        

        // console.log(this.matrix);


        // const newGoldenOre = new GoldenOre();

        // newGoldenOre.posX = 0;
        // newGoldenOre.posY = 0;

        // this.objects.push(newGoldenOre);

        

        this.aStarInstance = new AStarFinder({
            grid: {
                matrix: this.matrix
            },
            diagonalAllowed: true,
            // allowPathAsCloseAsPossible: true,
            // heuristic: 'Manhattan',
        });

        const a = this.aStarInstance.findPath({
            x: 0, y: 0
        }, {
            x: 10,
            y: 10
        });

        // console.log(a)

        this.unitObjects.push(new Unit());
    }

    update () {
        this.unitObjects.map(unit => {
            unit.update();
        });
    }

    getById (id: number) {
        for (let object of this.objects) {
            if (object.id == id)
                return object;
        }

        return null;
    }
}

export default new WorldObjectsManager();
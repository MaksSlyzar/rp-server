import Item from "./Item";

export class TreeItem extends Item {
    name = "Дерево";
    description = "";
    maxStack = 20;


    constructor () {
        super();
    }
}

export class StoneItem extends Item {
    name = "Камінь";
    description = "";
    maxStack = 20;


    constructor () {
        super();
    }
}
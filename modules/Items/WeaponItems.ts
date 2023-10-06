import Weapon from "./Weapon";

export class DefaultSword extends Weapon {
    name: "Default sword";
    description: "Description";
    maxStack = 1;
    itemID = "DEFAULT_SWORD";

    constructor () {
        super();
    }
}
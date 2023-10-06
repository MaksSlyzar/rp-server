import Item from "../Items/Item";

class Inventory {
    slotsNumber: number;
    slots: Array<Item> = [];

    constructor (slotsNumber: number) {
        this.slotsNumber = slotsNumber;
    }


    addItem (item: Item) {

    }

    removeItem () {

    }

    networkData () {
        const itemsData = this.slots.map(item => item.networkData());

        return {
            slotsNumber: this.slotsNumber,
            itemsData: itemsData
        };
    }
}

export default Inventory;
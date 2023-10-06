class Item {
    name: string;
    description: string;
    maxStack: number;
    count: number;
    id: number;
    itemID: string;
    
    onUse () {

    }

    networkData () {
        return {
            name: this.name,
            id: this.id,
            count: this.count,
            description: this.description
        }
    }

    constructor () {}
}

export default Item;
interface NewObject {
    x: number,
    y: number,
    width: number,
    height: number
}

function CheckCollision (selfObject: NewObject, otherObject: NewObject) {
    if (selfObject.x + selfObject.width <= otherObject.x || selfObject.x >= otherObject.x + otherObject.width) {
        // console.log("X");
        return true;
    }
    if (selfObject.y >= otherObject.y + otherObject.height || selfObject.y + selfObject.height <= otherObject.y) {
        return true;
    }

    return false;
}

export default CheckCollision;
interface NewObjectArc {
    x: number,
    y: number,
    radius: number
};

interface NewObjectRect {
    x: number,
    y: number,
    width: number,
    height: number,
};

export function CheckDistanceArc (selfObject: NewObjectArc, otherObject: NewObjectArc) {
    const dx = (selfObject.x + selfObject.radius) - (otherObject.x + otherObject.radius);
    const dy = (selfObject.y + selfObject.radius) - (otherObject.y + otherObject.radius);
    const distance = Math.sqrt(dx * dx + dy * dy);

    // console.log(dx, dy, distance)
    return distance < selfObject.radius + otherObject.radius;
}


export function CheckDistanceRect (selfObject: NewObjectRect, otherObject: NewObjectRect) {
    const centreSelfX = selfObject.x + selfObject.width;
    const centreSelfY = selfObject.y + selfObject.height;

    const centreOtherX = otherObject.x + otherObject.width;
    const centreOtherY = otherObject.y + otherObject.height;


    const d = Math.sqrt(
        Math.pow(centreOtherX - centreSelfX, 2) +
        Math.pow(centreOtherY - centreSelfY, 2));

    return d;
}
interface NewObjectArc {
    x: number,
    y: number,
    radius: number
};

export function CheckDistanceArc (selfObject: NewObjectArc, otherObject: NewObjectArc) {
    const dx = (selfObject.x + selfObject.radius) - (otherObject.x + otherObject.radius);
    const dy = (selfObject.y + selfObject.radius) - (otherObject.y + otherObject.radius);
    const distance = Math.sqrt(dx * dx + dy * dy);

    // console.log(dx, dy, distance)
    return distance < selfObject.radius + otherObject.radius;
}

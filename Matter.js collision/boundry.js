class Boundry {
    options = {
        isStatic: true
    }

    constructor(x, y, w, h) {
        this.body = Bodies.rectangle(x, y, w, h, this.options);
        World.add(engine.world, this.body);
    }
}
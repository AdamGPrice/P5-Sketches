class Boundry {
    options = {
        isStatic: true
    }

    constructor(x, y, w, h) {
        this.body = Bodies.rectangle(x, y, w, h, this.options);
        this.w = w;
        this.h = h;
        World.add(engine.world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        fill(0, 100, 200);
        rotate(angle);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }
}
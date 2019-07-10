class Ball {
    options = {
        isStatic: false,
        density: 1,
        friction: 0,
        restitution: 0.6
    }

    constructor(x, y, r) {
        this.body = Bodies.circle(x, y, r, this.options);
        this.r = r;
        World.add(engine.world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        fill(0, 255, 255);
        rotate(angle);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}
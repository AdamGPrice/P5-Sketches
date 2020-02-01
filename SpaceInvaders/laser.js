class Laser {
    constructor(pos, heading) {
        this.r = 2;
        this.pos = pos.copy();
        this.vel = p5.Vector.fromAngle(heading).mult(10);
    }

    update() {
        this.pos.add(this.vel);
    }

    hit(asteroid) {
        let d = p5.Vector.dist(this.pos, asteroid.pos);
        return (d < this.r + asteroid.r)
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(255);
        noStroke();
        ellipse(0, 0, this.r * 2);
        pop();
    }
}
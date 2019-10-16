class Ship {
    constructor() {
        this.r = 20;
        this.pos = createVector(width/2, height/2);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, -1);
        this.rotation = -PI/2;
        this.rotationRate = 0;
        this.thrust = false;
    }

    update() {
        this.rotation += this.rotationRate;
        if (this.thrust) {
            this.vel.add(p5.Vector.fromAngle(this.rotation).mult(0.2));
        }
        this.vel.mult(0.995);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.vel.limit(5);
    }

    edges() {
        if (this.pos.x - this.r > width) {
            this.pos.x = 0;
        } else if (this.pos.x + this.r < 0) {
            this.pos.x = width;
        }
        if (this.pos.y - this.r > height) {
            this.pos.y = 0;
        } else if (this.pos.y + this.r < 0) {
            this.pos.y = height;
        }
    }

    show() {
        push();
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);
        beginShape();
        vertex(this.r, 0);
        vertex(-this.r, this.r/1.5);
        vertex(-this.r, -this.r/1.5);
        endShape(CLOSE);
        if (this.thrust) {
            //fill(226, 88, 34);
            fill(255, 255);
            noStroke();
            beginShape();
            vertex(-this.r, -this.r/2);
            vertex(-this.r, this.r/2);
            vertex(-this.r * 1.5, this.r/3);
            vertex(-this.r * 2, 0);
            vertex(-this.r * 1.5, -this.r/3);
            endShape(CLOSE);
        }
        //ellipse(0, 0, this.r * 2);
        pop();
    }
}
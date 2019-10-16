class Asteroid {
    constructor(pos, r) {
        if (pos && r) {
            this.pos = pos.copy();
            this.r = r / 2;
        } 
        else {
            this.r = 50;
            this.pos = createVector(random(width), random(height));
        }
        this.vel = createVector(random(-1.5, 1.5), random(-1.5, 1.5));
        this.acc = createVector(0, 0);

        this.offset = [];
        for (let angle = 0; angle < TWO_PI; angle += PI/4) {
            this.offset.push(random(-this.r/3, this.r/2));
        } 
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    edges() {
        if (this.pos.x - this.r > width) {
            this.pos.x = -this.r;
        } else if (this.pos.x + this.r < 0) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y - this.r > height) {
            this.pos.y = -this.r;
        } else if (this.pos.y + this.r < 0) {
            this.pos.y = height + this.r;
        }
    }

    hit(ship) {
        let d = p5.Vector.dist(this.pos, ship.pos);
        return (d < this.r + ship.r);
    }

    break() {
        let newAsteroids = [];
        newAsteroids.push(new Asteroid(this.pos, this.r));
        newAsteroids.push(new Asteroid(this.pos, this.r));
        return newAsteroids;
    }

    show() {
        push();
        noFill();
        stroke(255);
        translate(this.pos.x, this.pos.y);
        //ellipse(0, 0, this.r * 2);
        beginShape();
        for (let angle = 0; angle < TWO_PI; angle += PI/4) {
            let x = (this.r + this.offset[angle/(PI/4)]) * cos(angle);
            let y = (this.r + this.offset[angle/(PI/4)]) * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }
}
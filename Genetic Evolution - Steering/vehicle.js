let mutationRate = 0.5;

class Vehicle {
    constructor(x, y, dna) {
        this.position = createVector(x, y);
        this.velocity = createVector(8, 2);
        this.acceleration = createVector(0, 0);
        this.r = 6;
        this.maxSpeed = 8;
        this.maxSteering = 0.6;
        this.health = 1;

        //DNA
        this.dna = [];
        if (dna === undefined) {
            this.dna[0] = random(-2, 2); // Fruit weight
            this.dna[1] = random(-2, 2); // Poison weight
            this.dna[2] = random(0, 100); // Fruit perception
            this.dna[3] = random(0, 100); // Poison perception
        } else {
            // Mutation
            this.dna[0] = dna[0];
            if (random(1) < mutationRate) {
                this.dna[0] += random(-0.1, 0.1);
            }
            this.dna[1] = dna[1];
            if (random(1) < mutationRate) {
                this.dna[1] += random(-0.1, 0.1);
            }
            this.dna[2] = dna[2];
            if (random(1) < mutationRate) {
                this.dna[2] += random(-10, 10);
            }
            this.dna[3] = dna[3];
            if (random(1) < mutationRate) {
                this.dna[3] += random(-10, 10);
            }
        }
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.health -= 0.005;

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    behaviours(good, bad) {
        let steerG = this.eat(good, 0.4, this.dna[2]);
        let steerB = this.eat(bad, -0.75, this.dna[3]);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        this.applyForce(steerG);
        this.applyForce(steerB);
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxSpeed);
        let steering = p5.Vector.sub(desired, this.velocity);
        steering.limit(this.maxSteering);
        return steering;
    }

    eat(list, nutrition, perception) {
        let record = Infinity;
        let closest = null;
        for (let i = list.length - 1; i >= 0; i--) {
            let distance = this.position.dist(list[i]);

            // eat the poison or food before checking if it something
            // we should be attracted to
            if (distance < this.maxSpeed) {
                list.splice(i, 1);
                this.health += nutrition;
            }
            // the closest thing in the list is set to record
            else if (distance < record && distance < perception) {
                record = distance;
                closest = list[i];
            }
        }

        if (closest != null) {
            return this.seek(closest);
        }

        // Nothing found return zero vector
        return createVector(0, 0);
    }

    dead() {
        return (this.health < 0);
    }

    edges() {
        let d = 0;
        let desired = null;

        if (this.position.x < d) {
            desired = createVector(this.maxSpeed, this.velocity.y);
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxSpeed, this.velocity.y);
        }

        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxSpeed);
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxSpeed);
        }

        if (desired != null) {
            desired.setMag(this.maxSpeed);
            let steering = p5.Vector.sub(desired, this.velocity);
            steering.limit(this.maxSteering);
            steering.mult(2);
            this.applyForce(steering);
        }
    }
    
    // evolution stuff
    clone() {
        if (random(1) < 0.002) {
            return new Vehicle(this.position.x, this.position.y, this.dna);
        } else {
            return null;
        }
    }

    show() {
        //health colour
        let green = color(0, 255, 0);
        let red = color(255, 0, 0);
        let col = lerpColor(red, green, this.health);

        fill(col);
        stroke(col);

        let theta = this.velocity.heading();
        push();
        translate(this.position.x, this.position.y);
        //ellipse(0, 0, this.r * 2);
        rotate(theta);
        beginShape();
        vertex(this.r * 2, 0);
        vertex(-this.r * 2, this.r);
        vertex(-this.r * 2, -this.r);
        endShape(CLOSE);

        if (debug.checked()) {
            //draw the weights
            stroke(0, 255, 0);
            noFill();
            strokeWeight(2);
            line(0, 0, this.dna[0]*20, 0);
            ellipse(0, 0, this.dna[2] * 2);
            stroke(255, 0, 0)
            strokeWeight(1);
            line(0, 0, this.dna[1]*20, 0);
            ellipse(0, 0, this.dna[3] * 2);
        }
        pop();
    }
}
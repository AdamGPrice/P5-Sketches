class Vehicle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.acceleration = createVector(0, 0);
        this.r = 8;
        this.maxSpeed = 6;
        this.maxForce = 0.8;
        this.health = 1;
        this.fitness = -1;

        //dna
        this.dna = [];
        this.dna[0] = random(-2, 2);    //foodAttraction
        this.dna[1] = random(-2, 2);    //poisonAttraction
        this.dna[2] = random(0, 200);   //foodPerception
        this.dna[3] = random(0, 200);   //poisonPerception
    }

    update() {
        this.health -= 0.01;

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxSpeed);
        let steering = p5.Vector.sub(desired, this.velocity);
        steering.limit(this.maxForce);
        return steering;
    }

    behaviours(food, poison) {
        let foodSteer = this.eat(food, 0.4, this.dna[2])
        let poisonSteer = this.eat(poison, -1, this.dna[3]);

        foodSteer.mult(this.dna[0]);
        poisonSteer.mult(this.dna[1]);

        this.applyForce(foodSteer);
        this.applyForce(poisonSteer);
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
                this.heal(nutrition);
                list.push(createVector(random(width), random(height)));
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

    heal(nutrition) {
        this.health += nutrition;
        if (this.health > 1) {
            this.health = 1;
        }
    }

    dead() {
        return this.health <= 0;
    }

    edges() {
        if (!this.dead()) {
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
                steering.mult(0.1);
                this.applyForce(steering);
            }
        }
    }
    
    draw() {
        stroke(255);
        noFill();
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

        if (true) {
            stroke(0, 255, 0, 150);
            ellipse(0, 0, this.dna[2] * 2);
            stroke(255, 0, 0, 150);
            ellipse(0, 0, this.dna[3] * 2);
        }
        pop();
    }
}
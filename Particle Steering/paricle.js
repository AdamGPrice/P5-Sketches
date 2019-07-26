class Particle {
    constructor(x, y) {
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.position = createVector(random(width), random(height));
        this.target = createVector(x, y);
        this.maxspeed = 8;
        this.maxforce = 2;
        this.radius = 8;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    behaviours(mouse) {
        let arriveForce = this.arrive(this.target);
        let fleeForce = this.flee(mouse);
        fleeForce.mult(2);
        this.applyForce(fleeForce);
        this.applyForce(arriveForce);
    }

    flee(target) {
        let desired = p5.Vector.sub(target, this.position);
        let dist = desired.mag();
        desired.setMag(this.maxspeed);
        desired.mult(-1);
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);

        if (dist < 200) {
            return steer;
        } else {
            return createVector(0,0);
        }
        
    }

    arrive(target) {
        let desired = p5.Vector.sub(target, this.position);
        let dist = desired.mag();
        let speed = this.maxspeed;
        if (dist < 50) {
            speed = map(dist, 0, 50, 0, this.maxspeed);
        }
        desired.setMag(speed);

        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);

        return steer;
    }

    show() {
        fill(255);
        noStroke();
        ellipse(this.position.x, this.position.y, this.radius, this.radius);
    }
}
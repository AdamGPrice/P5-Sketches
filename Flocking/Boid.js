class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector();
    this.acceleration = p5.Vector.random2D().mult(4);

    this.maxSpeed = 4;
    this.minSpeed = 3;
    this.maxSteering = 0.1;

    this.radius = 5;
    this.perceptionRadius = this.radius * 10;
    this.seperationRadius = this.radius * 10;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // Make sure the boid is atleast going minSpeed
  min() {
    const speed = this.velocity.mag();
    if (speed < this.minSpeed) {
      this.velocity.setMag(this.minSpeed);
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    //this.min();
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  behaviours(boids) {
    let neighbors = [];
    let count = 0;
    for (const other of boids) {
      if (other != this && this.inRange(other)) {
        neighbors.push(other);
        count++;
      }
    }
    this.alignment(neighbors, count);
    this.seperation(neighbors, count);
    this.cohesion(neighbors, count);
  }

  alignment(boids, count) {
    let desired = createVector();
    for (const other of boids) {
        desired.add(other.velocity);
    }
    if (count > 0) {
      //desired.div(count);
      desired.setMag(this.maxSpeed);
      desired.sub(this.velocity);
      desired.limit(this.maxSteering);
    }
    this.applyForce(desired);
  }

  seperation(boids, count) {
    let desired = createVector();
    for (const other of boids) {
      let diff = p5.Vector.sub(this.position, other.position);
      let distance = p5.Vector.dist(this.position, other.position);
      diff.div(distance);

      desired.add(diff);
    }
    if (count > 0) {
      desired.div(count);
      desired.setMag(this.maxSpeed);
      desired.sub(this.velocity);
      desired.limit(this.maxSteering);

      this.applyForce(desired);
    }
  }

  cohesion(boids, count) {
    let average = createVector();
    for (const other of boids) {
        average.add(other.position);
    }
    if (count > 0) {
      average.div(count);
      
      let desired = p5.Vector.sub(average, this.position);
      desired.setMag(this.maxSpeed);
      desired.sub(this.velocity);
      desired.limit(this.maxSteering);

      this.applyForce(desired);
    }
  }

  inRange(other) {
    return p5.Vector.dist(this.position, other.position) < this.perceptionRadius;
  }

  render() {
    //ellipse(this.position.x, this.position.y, this.radius * 2);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + PI/2);
    beginShape();
    vertex(0, this.radius * -2);
    vertex(this.radius * -1, this.radius * 1.5);
    vertex(this.radius * 1, this.radius * 1.5);
    endShape(CLOSE);

    noFill();
    //ellipse(0, 0, this.perceptionRadius);
    //ellipse(0, 0, this.seperationRadius);
    pop();
  }

  edges() {
    const pos = this.position;
    const r = this.radius;

    if (pos.x < 0) this.position.x = width;
    if (pos.x > width) this.position.x = 0;
    if (pos.y < 0) this.position.y = height;
    if (pos.y > height) this.position.y = 0;
  }
}
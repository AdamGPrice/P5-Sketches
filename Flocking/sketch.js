let boids = [];

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < 200; i++) {
        boids.push(new Boid());
    }
}

function draw() {
    background(51);
    for (const boid of boids) {
        boid.behaviours(boids); 

        boid.update();
        boid.edges();
        boid.render();
    }
}
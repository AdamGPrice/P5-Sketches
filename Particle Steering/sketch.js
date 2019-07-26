let font;
let particles = [];

function preload() {
    font = loadFont('Candy Beans.otf');
}

function setup() {
    createCanvas(1200, 600);

    pts = font.textToPoints('Particles', 20, 360, 286);
    for (pt of pts) {
        particles.push(new Particle(pt.x, pt.y));
    }
}

function draw() {
    background(51);
    let mouse = createVector(mouseX, mouseY);
    for (particle of particles) {
        particle.behaviours(mouse);
        particle.update();
        particle.show();
    }
}
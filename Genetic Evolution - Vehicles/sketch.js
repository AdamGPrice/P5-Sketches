let world;

function setup() {
    world = new World();
}

function draw() {
    world.update();
    world.draw();
}
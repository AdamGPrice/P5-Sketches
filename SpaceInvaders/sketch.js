let ship;
let lasers = [];

function setup() {
    createCanvas(800, 800);
    ship = new Ship();
}

function draw() {
    background(0);
    ship.update();
    ship.edges();
    ship.show();

    for (let i = 0; i < lasers.length; i++) {
        lasers[i].update();
        //lasers[i].edges();
        lasers[i].show();
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        ship.dir = 0;
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        ship.dir = -0.1;
    } else if (keyCode === RIGHT_ARROW) {
        ship.dir = 0.1;
    }

    if (keyCode == UP_ARROW) {
        lasers.push(new Laser(ship.pos, ship.rotation));
    }
}
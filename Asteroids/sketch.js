let ship;
let lasers = [];
let asteroids = [];

function setup() {
    createCanvas(800, 800);
    ship = new Ship();

    for (let i = 0; i < 5; i++) {
        asteroids.push(new Asteroid(createVector(-50, -50), 100));
    }
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

    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].update();
        asteroids[i].edges();
        asteroids[i].show();
    }

    // laser asteroids collision
    for (let i = lasers.length - 1; i >= 0; i--) {
        for (let j = asteroids.length - 1; j >= 0; j--) {
            if (lasers[i].hit(asteroids[j])) {
                lasers.splice(i, 1);
                if (asteroids[j].r > 15) {
                    asteroids = asteroids.concat(asteroids[j].break());
                }
                asteroids.splice(j, 1);
                break;
            }
        }
    }

    // asteroids ship collision
    for (let i = asteroids.length - 1; i >= 0; i--) {
        if (asteroids[i].hit(ship)) {
            noLoop();
        }
    }

    // spawn a new asteroid every 3 seconds
    if (frameCount % (60 * 3) == 0) {
        console.log("new asteroid");
        asteroids.push(new Asteroid(createVector(-50, -50), 100));
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        ship.rotationRate = 0;
    }
    if (keyCode === UP_ARROW) {
        ship.thrust = false;
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        ship.rotationRate = -0.1;
    } else if (keyCode === RIGHT_ARROW) {
        ship.rotationRate = 0.1;
    } else if (keyCode === UP_ARROW) {
        ship.thrust = true;
    }

    if (keyCode == 83) {
        lasers.push(new Laser(ship.pos, ship.rotation));
    }
}
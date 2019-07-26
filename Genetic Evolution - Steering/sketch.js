let vehicles = [];
let fruits = [];
let poisons = [];

let debug;

function setup() {
    createCanvas(800, 600);
    for (let i = 0; i < 25; i++) {
        vehicles.push(new Vehicle(random(width), random(height)));
    }
    for (let i = 0; i < 40; i++) {
        fruits.push(createVector(random(width), random(height)));
    }
    for (let i = 0; i < 20; i++) {
        poisons.push(createVector(random(width), random(height)));
    }

    debug = createCheckbox("debug");
}

function draw() {
    background(51);

    let chance = random(1);
    if (chance < 0.05) {
        fruits.push(createVector(random(width), random(height)));
    }
    if (chance < 0.02 && poisons.length < 20) {
        poisons.push(createVector(random(width), random(height)));
    }
    
    for (fruit of fruits) {
        fill(0, 255, 0);
        noStroke();
        ellipse(fruit.x, fruit.y, 8);
    }

    for (poison of poisons) {
        fill(255, 0, 0);
        noStroke();
        ellipse(poison.x, poison.y, 8);
    }

    for (let i = vehicles.length -1; i >= 0; i--) {
        vehicles[i].behaviours(fruits, poisons);
        vehicles[i].update();
        vehicles[i].edges();
        vehicles[i].show();
        
        let child = vehicles[i].clone();
        if (child != null) {
            vehicles.push(child);
        }

        if (vehicles[i].dead()) {
            let x = vehicles[i].position.x;
            let y = vehicles[i].position.y;
            fruits.push(createVector(x, y));
            vehicles.splice(i, 1);
        }
    }
}
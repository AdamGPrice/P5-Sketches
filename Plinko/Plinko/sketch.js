let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let render;

let balls = [];
let pegs = [];
let boundries = [];

function setup() {
    createCanvas(600, 900);
    engine = Engine.create();
    boundries.push(new Boundry(width/2, height + 30, width, 60));
    boundries.push(new Boundry(width + 30, height/2, 60, height));
    boundries.push(new Boundry(-30, height/2, 60, height));

    let spacing = 100;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 7; j++) {
            pegs.push(new Peg(i * spacing, j * spacing + spacing, 10));
        }
    }

    for (let i = 0; i < 8; i++) {
        boundries.push(new Boundry(i * spacing, height - 50, 20, 200));
    }

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            pegs.push(new Peg(i * spacing + spacing/2, j * spacing + spacing + spacing/2, 10));
        }
    }
}

function draw() {
    background(100);
    Engine.update(engine, 32);


    if (frameCount % 60 == 1) {
        balls.push(new Ball(width/2 + random(-1, 1), 0, 16));
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].show();
    }

    for (let i = 0; i < pegs.length; i++) {
        pegs[i].show();
    }

    for (let i = 0; i < boundries.length; i++) {
        boundries[i].show();
    }
}

function mousePressed() {
    balls.push(new Ball(mouseX, mouseY, 16));
}
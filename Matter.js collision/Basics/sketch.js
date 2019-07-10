let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let render;

let boxes = [];

function setup() {
    createCanvas(800, 800);
    engine = Engine.create();
    new Boundry(400, height + 30, width, 60);
}

function draw() {
    background(100);
    Engine.update(engine);

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
}

function mousePressed() {
    boxes.push(new Box(mouseX, mouseY, random(10, 50), random(10,50)));
}
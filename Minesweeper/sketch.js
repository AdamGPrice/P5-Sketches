let game;

function setup() {
    createCanvas(800, 800);
    game = new Grid();
}

function draw() {
    background(162, 209, 73);
    game.display();
}

function mousePressed() {
    game.clicked(mouseX, mouseY);
}
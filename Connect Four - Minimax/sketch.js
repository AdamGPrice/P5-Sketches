let game;

function setup() {
    createCanvas(700, 700);
    game = new ConnectFour();
}

function draw() {
    background(230);
    let x = floor(mouseX/(width/7));
    game.update(x);
    game.display();
}

function mousePressed() {
    if (game.turn == 'player' && mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
        let x = floor(mouseX/(width/7));
        game.playerTurn(x);
    }
}
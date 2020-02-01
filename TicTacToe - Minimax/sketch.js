let game;

function setup() {
    createCanvas(600, 600);
    game = new TicTacToe();
}

function draw() {
    background(230);
    game.update();
    game.display();
}

function mousePressed() {
    if (game.turn == 'player' && mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
        let x = floor(mouseX/(width/3));
        let y = floor(mouseY/(height/3));
        game.playerTurn(x, y);
    }
}
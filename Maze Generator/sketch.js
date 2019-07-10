let maze;

function setup() {
  createCanvas(1600, 800);
  maze = new MazeGenerator(80, 40, width, height);
  //frameRate(10);
}

function draw() {
    background(0, 120, 130);
    for (let i = 0; i < 5; i++) {
        maze.depthFirstSearch();
    }
    maze.draw();
    //noLoop();
}
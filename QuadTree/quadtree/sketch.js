let quadTree;

function setup() {
    createCanvas(800, 800);
    let center = new Point(width/2, height/2);
    let rectangle = new Rectangle(center, width/2);

    quadTree = new QuadTree(rectangle, 4);


    for (let i = 0; i < 100000; i++) {
        quadTree.insert(new Point(random(width), random(height)));
    }
}


function draw() {
    background(50);
    stroke(255);
    strokeWeight(2);
    noFill();
    rectMode(CENTER);
    //quadTree.show();
    
    range = new Rectangle(new Point(mouseX, mouseY), 40);
    
    let points = quadTree.query(range);
    console.log(points);
    strokeWeight(3);
    stroke(0, 200, 0);
    rect(range.center.x, range.center.y, range.dimension * 2, range.dimension * 2);
    for (let p of points) {
        point(p.x, p.y);
    }
    //noLoop();
}
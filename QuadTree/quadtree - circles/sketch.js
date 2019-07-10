let quadTree;

function setup() {
    createCanvas(800, 800);
    let center = new Point(width/2, height/2);
    let rectangle = new Rectangle(center, width/2);

    quadTree = new QuadTree(rectangle, 4);


    for (let i = 0; i < 4000; i++) {
        quadTree.insert(new Point(random(width), random(height)));
    }
}


function draw() {
    background(50);
    stroke(255);
    strokeWeight(2);
    noFill();

    rectMode(CENTER);
    quadTree.show();
    strokeWeight(3);
    stroke(0, 200, 0);

    circleRange();
    //rectRange();
}

function rectRange() {
    let range = new Rectangle(new Point(mouseX, mouseY), 40);
    let points = quadTree.query(range);
    rect(range.center.x, range.center.y, range.dimension * 2, range.dimension * 2);
    for (let p of points) {
        point(p.x, p.y);
    }
}

function circleRange() {
    let range = new Circle(new Point(mouseX, mouseY), 20);
    let points = quadTree.query(range);
    ellipse(range.center.x, range.center.y, range.r * 2);
    for (let p of points) {
        point(p.x, p.y);
    }
}
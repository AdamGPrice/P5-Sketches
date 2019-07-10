let quadTree;
let particles = [];

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < 3000; i++) {
        particles.push(new Particle(random(width), random(height), 4));
    }
}


function draw() {
    background(100);
    noStroke();

    // QuadTree setup 
    let center = new Point(width/2, height/2);
    let rectangle = new Rectangle(center, width/2);
    quadTree = new QuadTree(rectangle, 4);

    for (let p of particles) {
        p.update();
        p.show();
        p.highlight = 40; // reset highlight

        // insert particle positions into the tree
        let point = new Point(p.x, p.y, p);
        quadTree.insert(point);
    }

    // query QuadTree with a range at each particle
    for (let p of particles) {
        let range = new Circle(new Point(p.x, p.y), p.r * 2);
        //noFill();
        //stroke(255);
        //ellipse(range.center.x, range.center.y, range.r * 2);
        let points = quadTree.query(range);
        for (let point of points) {
            let other = point.userData;
            if (p != other && p.intersects(other)) {
                p.highlight = 255;
            }
        }
    }
}
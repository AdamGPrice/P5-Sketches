let quadTree;
let boids = [];

// Debuggin vars
let qt = true;
let checkbox;
let framerate;

function setup() {
    createCanvas(1600, 800);
    for (let i = 0; i < 1500; i++) {
        boids.push(new Boid());
    }

    checkbox = createCheckbox('Quadtree', true);
    checkbox.changed(toggleQuad);
    framerate = createP('Framerate: 0/s');
}

function toggleQuad() {
    if (this.checked()) {
        qt = true;
    } else {
        qt = false;
    }
}

function draw() {
    background(51);
    if (qt) {
        withQuadTree();
    } else {
        withoutQuadTree();
    }
    if (frameCount % 10 == 0) {
        fps = round(frameRate(), 2);
        framerate.html(`Framerate: ${fps}/s`)
    }
}

function withQuadTree() {
    // QuadTree setup
    let center = new Point(width/2, height/2);
    let rectangle = new Rectangle(center, width/2);
    quadTree = new QuadTree(rectangle, 4);
    
    // Insert all of the boids into the quadtree
    for (const boid of boids) {
        boid.update();
        stroke(255);
        fill(255);
        boid.render();
        boid.edges();
        
        // attach boid info to the point
        let point = new Point(boid.position.x, boid.position.y, boid);
        quadTree.insert(point);
    }
    stroke(0);
    noFill();
    quadTree.show();

    // Query QuadTree with range of each boid
    for (const boid of boids) {
        let point = new Point(boid.position.x, boid.position.y);
        let range = new Circle(point, boid.perceptionRadius);

        //noFill();
        //stroke(0, 255, 0);
        //ellipse(range.center.x, range.center.y, range.r);

        let points = quadTree.query(range);
        boid.behavioursNew(points);
    }
}

function withoutQuadTree() {
    for (const boid of boids) {
        boid.behaviours(boids); 

        boid.update();
        boid.edges();
        stroke(255);
        fill(255);
        boid.render();
    }
}
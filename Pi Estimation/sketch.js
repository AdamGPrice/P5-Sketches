let total = 0;
let inCirle = 0;

let center;

function setup() {
    createCanvas(800, 800);
    center = new p5.Vector(width/2, height/2);
}

function draw() {
    //background(200);
    for (let i = 0; i < 5000; i++) { 
        noStroke();
        fill(0, 0, 255);
        let vector = new p5.Vector(random(height), random(width));
        total++;
        if (p5.Vector.dist(vector, center) < width/2) {
            inCirle++;
        }
        ellipse(vector.x, vector.y, 1, 1);
    }

    noFill();
    stroke(0);
    ellipse(center.x, center.y, width, height);

    console.log((inCirle / total) * 4);
}
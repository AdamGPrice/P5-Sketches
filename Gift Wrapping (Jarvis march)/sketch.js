let points = [];
let hull = [];

let pointOnHull;
let index = 0;
let wrapped = false;

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < 20; i++) {
        let offset = 40;
        let y = random(offset, width - offset);
        let x = random(offset, height - offset);
        points.push(createVector(x, y));
    }

    let leftmost = points[0];
    for (let p of points) {
        if (p.x < leftmost.x) {
            leftmost = p;
        }
    }
    pointOnHull = leftmost;
}


function draw() {
    background(51);

    if(!wrapped) {
        hull[index] = pointOnHull;
        let endpoint = points[0];
        for (let i = 0; i < points.length; i++) {
            if (left(points[i], hull[index])) {
                endpoint = points[i];
            }
        }
        index++;
        pointOnHull = endpoint;

        if (endpoint = hull[0]) {
            wrapped = true;
        }
    }

    fill(255);
    noStroke();
    for (let p of points) {
        ellipse(p.x, p.y, 8);
    }
    fill(0, 255, 0);
    ellipse(pointOnHull.x, pointOnHull.y, 10);

    beginShape();
    for (let p of hull) {
        vertex(p.x, p.y);
    }
    endShape();
    console.log(hull);
}

function left(v1, v2) {
    return true;
}
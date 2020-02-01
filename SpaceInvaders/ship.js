class Ship {
    constructor() {
        this.w = 60;
        this.h = 30;
        this.pos = createVector(width/2, height - this.h);
    }

    update() {

    }

    edges() {

    }

    show() {
       push();
       translate(this.pos.x, this.pos.y);
       rectMode(CENTER);
       rect(0, 0, this.w, this.h)
       pop();
    }
}
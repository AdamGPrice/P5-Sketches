class Particle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.highlight = 40;
    }

    dist(other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }

    intersects(other) {
        return (this.dist(other) < (this.r + other.r));
    }

    update() {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    }

    show() {
        fill(this.highlight);
        ellipse(this.x, this.y, this.r * 2);
    }
}
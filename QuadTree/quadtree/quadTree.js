class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dist(other) {

    }
}

class Rectangle {
    constructor(center, dimension) {
        this.center = center;
        this.dimension = dimension;
    }

    contains(point) {
        return (point.x >= this.center.x - this.dimension &&
        point.x <= this.center.x + this.dimension &&
        point.y >= this.center.y - this.dimension &&
        point.y <= this.center.y + this.dimension);
    }
    

    intersects(range) {
        return !(range.x - range.w > this.center.x + this.dimension ||
        range.x + range.w < this.center.x - this.dimension ||
        range.y - range.h > this.center.y + this.dimension ||
        range.y + range.h < this.center.y - this.dimension);
    }
}

class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
        this.children = [];
    }

    insert(point) {
        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity && this.divided == false) {
            this.points.push(point);
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        if (this.children[0].insert(point)) {
            return true;
        }
        if (this.children[1].insert(point)) {
            return true;
        }
        if (this.children[2].insert(point)) {
            return true;
        }
        if (this.children[3].insert(point)) {
            return true;
        }

        return false;
    }

    query(range) {
        let pointsInRange = []

        if (!this.boundary.intersects(range)) {
            return pointsInRange;
        } 

        for (let point of this.points) {
            if (range.contains(point)) {
                pointsInRange.push(point);      
            }
        }

        if (!this.divided) {
            return pointsInRange;
        }

        pointsInRange = pointsInRange.concat(this.children[0].query(range));
        pointsInRange = pointsInRange.concat(this.children[1].query(range));
        pointsInRange = pointsInRange.concat(this.children[2].query(range));
        pointsInRange = pointsInRange.concat(this.children[3].query(range));

        return pointsInRange;
    }

    subdivide() {
        let center = this.boundary.center;
        let dimension = this.boundary.dimension;

        //northWest
        let centerNW = new Point(center.x - dimension/2, center.y - dimension/2);
        this.children.push(new QuadTree(new Rectangle(centerNW, dimension/2), this.capacity)); 

        //northWest
        let centerNE = new Point(center.x + dimension/2, center.y - dimension/2);
        this.children.push(new QuadTree(new Rectangle(centerNE, dimension/2), this.capacity)); 
        
        //northWest
        let centerSW = new Point(center.x - dimension/2, center.y + dimension/2);
        this.children.push(new QuadTree(new Rectangle(centerSW, dimension/2), this.capacity)); 

        //northWest
        let centerSE = new Point(center.x + dimension/2, center.y + dimension/2);
        this.children.push(new QuadTree(new Rectangle(centerSE, dimension/2), this.capacity)); 

        this.divided = true;
    }

    show() {
        rect(this.boundary.center.x, this.boundary.center.y, this.boundary.dimension * 2, this.boundary.dimension * 2);
        for (let p of this.points) {
            point(p.x, p.y);
        }
        
        if (this.divided) {
            for (let quadTree of this.children) {
                quadTree.show();
            }
        }
    }
}
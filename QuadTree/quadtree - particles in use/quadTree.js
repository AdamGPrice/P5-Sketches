class Point {
    constructor(x, y, userData) {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }

    dist(other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
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

class Circle {
    constructor(center, r) {
        this.center = center;
        this.r = r;
    }

    contains(point) {
        let d = this.center.dist(point);
        return d < this.r;
    }
    
    intersects(rect) {
        let xDist = abs(this.center.x - rect.center.x);
        let yDist = abs(this.center.y - rect.center.y);

        if (xDist > (rect.dimension + this.r)) { return false; }
        if (yDist > (rect.dimension + this.r)) { return false; }

        if (xDist <= (rect.dimension)) { return true; } 
        if (yDist <= (rect.dimension)) { return true; }

        let cornerDistance_sq = (Math.pow(xDist - rect.dimension, 2) + Math.pow(yDist - rect.dimension, 2));

        return (cornerDistance_sq <= Math.pow(this.r, 2));
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

    query(range, pointsInRange) {
        if (!pointsInRange) {
            pointsInRange = []
        }

        if (!range.intersects(this.boundary)) {
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

        this.children[0].query(range, pointsInRange);
        this.children[1].query(range, pointsInRange);
        this.children[2].query(range, pointsInRange);
        this.children[3].query(range, pointsInRange);

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
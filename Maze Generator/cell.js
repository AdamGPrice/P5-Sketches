class Cell {

    constructor(x, y, width, height) {
        this.pos = new createVector(x, y);
        this.width = width;
        this.height = height;
        this.walls = [true, true, true, true];
        this.visited = false;
        this.closed = false;
        this.highlight = false;
    }

    getNext(cells, rows, columns) {
        let neighbors = []

        let x = this.pos.x;
        let y = this.pos.y;

        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (this.insideGrid(i, j, rows, columns)) {
                    if (i == this.pos.x ^ j == this.pos.y) {
                        if (cells[i][j].visited == false) {
                            neighbors.push(cells[i][j]);
                        }
                    }       
                }
            }
        }

        if (neighbors.length > 0) {
            let r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    insideGrid(x, y, rows, columns) {
        let valid = true;
        if (x < 0) {
            valid = false;
        }
        else if (x >= rows) {
            valid = false;
        }
        if (y < 0) {
            valid = false;
        }
        else if (y >= columns) {
            valid = false;
        }

        return valid;
    }

    draw() {
        let x = this.pos.x * this.width;
        let y = this.pos.y * this.height;
        let w = this.width;
        let h = this.height;

        noStroke();          
        if (this.visited) {
            fill(255, 140, 0);
            rect(x, y, w, h);
        }
        if (this.closed) {
            fill(140, 200, 140);
            rect(x, y, w, h);
        }
        if (this.highlight) {
            fill(204, 255, 0);
            rect(x, y, w, h);
        }


        //noStroke();
        stroke(0);
        strokeWeight(2);    
        if (this.walls[0])
            line(x, y, x + w, y);
        if (this.walls[1])
            line(x + w, y, x + w, y + h);
        if (this.walls[2])
            line(x + w, y + h, x, y + h);
        if (this.walls[3])
            line(x, y + h, x, y);
    }
}
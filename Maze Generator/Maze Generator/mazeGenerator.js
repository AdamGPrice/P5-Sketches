class MazeGenerator {

    constructor(rows, columns, width, height) {
        this.rows = rows;
        this.columns = columns;
        this.width = width;
        this.height = height;

        this.initialiseMaze();
    }

    initialiseMaze() {
        let cellWidth = this.width/this.rows;
        let cellHeight = this.height/this.columns;

        let cells = new Array();   
        for (let x = 0; x < this.rows; x++)
        {
            cells[x] = new Array();
            for (let y = 0; y < this.columns; y++)
            {
                cells[x][y] = new Cell(x, y, cellWidth, cellHeight);
            }
        }      
        this.cells = cells;
        this.current = this.cells[0][0];
        this.current.visited = true;
        this.open = [];
        this.open.push(this.current);

    }

    depthFirstSearch() {
        if (this.open.length > 0) {

            let current = this.open[this.open.length - 1];

            let next = current.getNext(this.cells, this.rows, this.columns);
            if (next != undefined) {
                next.visited = true;
                this.removeWalls(current, next);
                this.open.push(next);
                next.highlight = true;
                current.highlight = false;
            }
            else {
                current.closed = true;
                current.highlight = false;
                this.open.pop();

                if (this.open.length > 0) {
                    this.open[this.open.length - 1].highlight = true;
                }
            }
        }   
    }

    removeWalls(current, next) {
        if (current.pos.x < next.pos.x)
        {
            current.walls[1] = false;
            next.walls[3] = false;
        }
        else if (current.pos.x > next.pos.x)
        {
            current.walls[3] = false;
            next.walls[1] = false;
        }
        if (current.pos.y < next.pos.y)
        {
            current.walls[2] = false;
            next.walls[0] = false;
        }
        else if (current.pos.y > next.pos.y)
        {
            current.walls[0] = false;
            next.walls[2] = false;
        }
    }

    draw() {
        for (let x = 0; x < this.rows; x++)
        {
            for (let y = 0; y < this.columns; y++)
            {
                this.cells[x][y].draw();
            }
        }   
    }
}

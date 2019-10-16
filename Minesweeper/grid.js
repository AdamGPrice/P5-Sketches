class Grid {
    cells = [];
    cellCount = 16;
    bombCount = 34;

    firstClick = true;

    constructor() {
        this.initGrid();
        this.initCells();
    }

    initGrid() {
        this.cells = new Array(this.cellCount);

        for (let i = 0; i < this.cellCount; i++) {
            this.cells[i] = new Array(this.cellCount);
        }
    }

    initCells() {
        let w = width / this.cellCount;

        for (let i = 0; i < this.cellCount; i++) {
            for (let j = 0; j < this.cellCount; j++) {
                this.cells[i][j] = (new Cell(i, j, w));
            }
        }
    }

    clicked(mX, mY) {
        let w = width / this.cellCount;
        let col = floor(mX / w);
        let row = floor(mY / w);

        if (mouseButton == LEFT) {
            if (this.cells[col][row].flagged) {
                return;
            }
            if (this.firstClick) {
                this.generateGrid(col, row);
                this.firstClick = false;
            }
            let action = this.cells[col][row].clicked(col, row);

            if (action == -1) {
                this.revealGame();
            }
        }

        if (mouseButton == RIGHT) {
            let cell = this.cells[col][row];
            if (cell.flagged == false) {
                cell.flagged = true;
            } else {
                cell.flagged = false;
            }
        }
    }

    generateGrid(x, y) {
        let ignorePos = [];

        for (let xoff = -1; xoff <= 1; xoff ++) {
            for (let yoff = -1; yoff <= 1; yoff ++) {
                ignorePos.push(createVector(x + xoff, y + yoff));
            }
        }

        let bombsPlaced = 0;
        let valid = true;
        while (bombsPlaced < this.bombCount) {
            valid = true;
            x = floor(random(this.cellCount));
            y = floor(random(this.cellCount));

            for (let pos of ignorePos) {
                if (x == pos.x && y == pos.y) {
                    valid = false;
                }
            }

            if (valid) {
                this.cells[x][y].bomb = true;
                bombsPlaced++;
                ignorePos.push(createVector(x, y));
            }
        }

        for (let i = 0; i < this.cellCount; i++) {
            for (let j = 0; j < this.cellCount; j++) {
                this.cells[i][j].countBombs(i, j);
            }
        }
    }

    display() {
        for (let i = 0; i < this.cellCount; i++) {
            for (let j = 0; j < this.cellCount; j++) {
                this.cells[i][j].show();
            }
        }
    }

    revealGame() {
        for (let i = 0; i < this.cellCount; i++) {
            for (let j = 0; j < this.cellCount; j++) {
                this.cells[i][j].revealed = true;
            }
        }
    }
}
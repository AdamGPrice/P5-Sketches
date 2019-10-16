class Cell {
    bomb = false;
    bombNeighbors = -1;
    flagged = false;

    constructor(i, j, w) {
        this.x = i * w;
        this.y = j * w;
        this.w = w;

        this.revealed = false;
    }

    clicked(x, y) {
        this.revealed = true;

        if (this.bomb) {
            return -1;
        }

        if (this.bombNeighbors == 0) {
            this.reveal(x, y);
        }
    }

    reveal(i, j) {
        for (let xoff = -1; xoff <= 1; xoff ++) {
            for (let yoff = -1; yoff <= 1; yoff ++) {
                let x = i + xoff;
                let y = j + yoff;
                if ((x >= 0 && x < game.cellCount) && (y >= 0 && y < game.cellCount)) {
                    let cell = game.cells[x][y];
                    if (!cell.bomb && cell.revealed == false) {
                        cell.revealed = true;
                        if (cell.bombNeighbors == 0) {
                            cell.reveal(i + xoff, j + yoff);
                        }
                    }
                }
            }
        }        
    }

    countBombs(i, j) {
        if (!this.bomb) {
            let cells = game.cells;

            let total = 0;
            for (let xoff = -1; xoff <= 1; xoff ++) {
                for (let yoff = -1; yoff <= 1; yoff ++) {
                    let x = i + xoff;
                    let y = j + yoff;
                    if ((x >= 0 && x < game.cellCount) && (y >= 0 && y < game.cellCount)) {
                        if (cells[x][y].bomb) {
                            total++;
                        }
                    }
                }
            }
            this.bombNeighbors = total;
        }
    }

    show() {
        stroke(40);
        strokeWeight(2);
        if (!this.revealed) {
            noFill();
            rect(this.x, this.y, this.w, this.w);
            if (this.flagged) {
                stroke(255, 0, 0);
                strokeWeight(4);
                
                line(this.x, this.y, this.x + this.w, this.y + this.w);
                line(this.x + this.w, this.y, this.x, this.y + this.w);
            }

        } else {
            fill(215, 184, 153);
            rect(this.x, this.y, this.w, this.w);

            if (this.bomb) {
                fill(40);
                ellipse(this.x + this.w/2, this.y + this.w/2, this.w / 1.5);
            } else if (this.bombNeighbors > 0) {
                fill(255)
                noStroke();
                textAlign(CENTER);
                textSize(48);
                text(this.bombNeighbors, this.x + this.w/2, this.y + this.w - 10);
            }
        }
    }
}
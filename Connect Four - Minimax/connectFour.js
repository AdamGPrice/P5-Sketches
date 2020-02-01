class ConnectFour {
    constructor(size, mutationRate) {
        this.grid = [];
        this.turn = 'player';
        this.winner = ' ';

        // Setup the emtpy board
        for (let i = 0; i < 6; i++) {
            this.grid.push([' ',' ',' ',' ',' ',' ',' ']);
        }
    } 

    update(x) {
        if (this.winner == ' ') {
            // Draw the player chip
            if (this.turn == 'player') {
                fill(220, 40, 40);
                ellipse(x * 100 + 50, 50, 90, 90);
                noFill();
                ellipse(x * 100 + 50, 50, 80, 80);
            } else if (this.turn == 'ai') {
                this.aiTurn();
            }
        }
    }

    playerTurn(x) {
        if (this.turn == 'player') {
            if(this.insertIntoBoard(x, 'player')) {
                this.winner = this.checkWinner(this.grid);
                this.turn = 'ai';
            }
        }
    }

    aiTurn() {
        let result = this.minimax('ai', 16, 3);
        console.log(result);
        if (this.insertIntoBoard(result.spot, 'ai')) {
            this.winner = this.checkWinner(this.grid);
            this.turn = 'player';
        }
    }

    minimax(turn, depth, move) {
        if (depth < 0) {
            return { spot: move, score: 0 };
        } else {
            // First check if there is a winner
            let winner = this.checkWinner(this.grid);
            if (winner == 'player') {
                return { spot: move, score: -1 * depth};
            } else if (winner == 'ai') {
                return { spot: move, score: 1 * depth};
            } else if (winner == '-') {
                return { spot: move, score: 0.1 * depth};
            }

            // Maximizing player
            if (turn == 'ai') {
                let highestScore = -Infinity;
                let bestMove;
                let available = [];
                for (let i = 0; i < 7; i++) {
                    if (this.grid[0][i] == ' ') {
                        available.push(i);
                    }
                }
                for (let i = 0; i < available.length; i++) {
                    this.insertIntoBoard(available[i], 'ai');
                    let move = this.minimax('player', depth = depth - 1, available[i]);
                    this.takeFromBoard(available[i]);
                    if (move.score > highestScore) {
                        highestScore = move.score;
                        bestMove = available[i];
                    }
                }
                return { spot: bestMove, score: highestScore };
            }
            // Minimizing player
            else if (turn == 'player') {
                let lowestScore = Infinity;
                let bestMove;
                let available = [];
                for (let i = 0; i < 7; i++) {
                    if (this.grid[0][i] == ' ') {
                        available.push(i);
                    }
                }
                for (let i = 0; i < available.length; i++) {
                    this.insertIntoBoard(available[i], 'player');
                    let move = this.minimax('ai', depth = depth - 1, available[i]);
                    this.takeFromBoard(available[i]);
                    if (move.score < lowestScore) {
                        lowestScore = move.score;
                        bestMove = available[i];
                    }
                }
                return { spot: bestMove, score: lowestScore };
            }
        }
    }

    insertIntoBoard(x, player) {
        let inserted = false;
        let available = [];
        for (let i = 0; i < 7; i++) {
            if (this.grid[0][i] == ' ') {
                available.push(i);
            }
        }
        if (available.includes(x)) {
            for (let i = 5; i >= 0; i--) {
                if (this.grid[i][x] == ' ') {
                    this.grid[i][x] = player;
                    inserted = true;
                    break;
                }
            }
        }
        return inserted;
    }

    // for minimax purposes
    takeFromBoard(x) {
        for (let i = 0; i < 6; i++) {
            if (this.grid[i][x] != ' ') {
                this.grid[i][x] = ' ';
                break;
            }
        }
    }

    checkLine(a,b,c,d) {
        // Check first cell non-zero and all cells match
        return ((a != 0) && (a ==b) && (a == c) && (a == d));
    }
    
    checkWinner(bd) {
        // Check down
        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 7; c++)
                if (this.checkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c]))
                    return bd[r][c];
    
        // Check right
        for (let r = 0; r < 6; r++)
            for (let c = 0; c < 4; c++)
                if (this.checkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3]))
                    return bd[r][c];
    
        // Check down-right
        for (let r = 0; r < 3; r++)
            for (let c = 0; c < 4; c++)
                if (this.checkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3]))
                    return bd[r][c];
    
        // Check down-left
        for (let r = 3; r < 6; r++)
            for (let c = 0; c < 4; c++)
                if (this.checkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3]))
                    return bd[r][c];
    
        if (this.isBoardFull()) {
            return '-'
        } else {
            return ' ';
        }
    }

    isBoardFull() {
        for(let i = 0; i < 7; i++) {
            for (let j = 0; j < 6; j++) { 
                if (this.grid[j][i] == ' ') {
                    return false;
                }
            }
        }
        return true;
    }

    display() {
        push();
        translate(0, 100);
        fill(100, 100, 255);
        noStroke();
        rect(0, 0, 700, 600);

        for(let i = 0; i < 7; i++) {
            for (let j = 0; j < 6; j++) {
                stroke(20);
                switch (this.grid[j][i]) {
                    case ' ':
                        fill(230);
                        break;
                    case 'player':
                        fill(220, 40, 40);
                        break;
                    case 'ai':
                        fill(220, 220, 40);
                        break;
                }
                ellipse(i * 100 + 50, j * 100 + 50, 90, 90);
                if (this.grid[j][i] != ' ') {
                    noFill();
                    ellipse(i * 100 + 50, j * 100 + 50, 80, 80)
                }
            }
        }
        pop();
    }
}
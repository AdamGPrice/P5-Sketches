class TicTacToe {
    constructor(size, mutationRate) {
        this.grid = [];
        this.turn = 'player'

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.grid.push(' ');
            }
        }
    }

    update() {
        if (this.turn == 'ai') {
            this.aiTurn();
            let winner = this.checkWinner();
            if (winner != ' ') {
                this.displayWinner(winner);
            }
            this.turn = 'player'
        }
    }

    playerTurn(x, y) {
        if (this.grid[x * 3 + y] == ' ') {
            this.grid[x * 3 + y] = 'x';
            let winner = this.checkWinner();
            if (winner != ' ') {
                this.displayWinner(winner);
            }
            this.turn = 'ai';
        }
    }

    aiTurn() {
       let result = this.minimax('o');
       this.grid[result.spot] = 'o';
    }

    minimax(turn, move) {
        // First check if there is a winner
        let winner = this.checkWinner();
        if (winner == 'o') {
            return { spot: move, score: 1 };
        }
        else if (winner == 'x') {
            return { spot: move, score: -1 };
        }
        else if (winner == '-') {
            return { spot: move, score: 0 };
        }

        // Maximizing player
        if (turn == 'o') {
            let highestScore = -Infinity;
            let bestMove;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.grid[i + 3 * j] == ' ') {
                        this.grid[i + 3 * j] = 'o';
                        let move = this.minimax('x', i + 3 * j);
                        this.grid[i + 3 * j] = ' ';
                        if (move.score > highestScore) {
                            highestScore = move.score;
                            bestMove = i + 3 * j;
                        }
                    }
                }
            }
            return { spot: bestMove, score: highestScore };
        }
        // Minimizing player
        else if (turn == 'x') {
            let lowestScore = Infinity;
            let bestMove;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.grid[i + 3 * j] == ' ') {
                        this.grid[i + 3 * j] = 'x';
                        let move = this.minimax('o', i + 3 * j);
                        this.grid[i + 3 * j] = ' ';
                        if (move.score < lowestScore) {
                            lowestScore = move.score;
                            bestMove = i + 3 * j;
                        }
                    }
                }
            }
            return { spot: bestMove, score: lowestScore };
        }
    }

    checkWinner() {
        let winner = ' '
        // Verticals
        for (let j = 0; j < 3; j++) {
            if (this.grid[0 + 3 * j] == this.grid[1 + 3 * j] && this.grid[1 + 3 * j] == this.grid[2 + 3 * j]) {
                if (this.grid[0 + 3 * j] != ' ') {
                    winner = this.grid[0 + 3 * j];
                }
            }
        }
        // Horizontals
        for (let i = 0; i < 3; i++) {
            if (this.grid[i + 0] == this.grid[i + 3] && this.grid[i + 3] == this.grid[i + 6]) {
                if (this.grid[i + 3] != ' ') {
                    winner = this.grid[i + 3];
                }
            }
        }
        // Diagonals
        if (this.grid[0] == this.grid[4] && this.grid[4] == this.grid[8]) {
            if (this.grid[0] != ' ') {
                winner = this.grid[0];
            }
        }
        if (this.grid[2] == this.grid[4] && this.grid[4] == this.grid[6]) {
            if (this.grid[2] != ' ') {
                winner = this.grid[2];
            }
        }

        let availableSpots = []; 
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.grid[i + 3 * j] == ' ') {
                    availableSpots.push(i + 3 * j);
                }
            }
        }
        if (availableSpots.length == 0 && winner == ' ') {
            return '-'
        }
        else {
            return winner;
        }        
    }

    display() {
        let w = width/3;
        let h = height/3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                push();
                translate(i * w + w/2, j*h + h/2);
                strokeWeight(3);
                noFill();
                rectMode(CENTER)
                rect(0, 0, w, h);
                let r = w * 0.3; // r = radius
                if (this.grid[j + 3 * i] == 'x') {
                    line(-r, -r, r, r);
                    line(-r, r, r, -r);
                } else if (this.grid[j + 3 * i] == 'o') {
                    ellipse(0, 0, r*2.2);
                }
                pop();
            }
        }
    }

    displayWinner(winner) {
        noLoop();
    }
}
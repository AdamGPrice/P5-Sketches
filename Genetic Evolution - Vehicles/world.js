class World {
    constructor() {
        createCanvas(800, 800);
        this.population = new Population(80, 0.1);
        this.generation = 0;
        this.training = true;
        this.foodCount = 100;
        this.poisonCount = 200;

        this.placeFoodPoison();
    }

    placeFoodPoison() {
        this.food = [];
        this.poison = [];

        for (let i = 0; i < this.foodCount; i++) {
            this.food.push(createVector(random(width), random(height)));
        }
        for (let i = 0; i < this.poisonCount; i++) {
            this.poison.push(createVector(random(width), random(height)));
        }
    }

    update() {
        if (this.training == true) {
            for (let vehicle of this.population.pop) {
                vehicle.behaviours(this.food, this.poison);
                vehicle.edges();
                vehicle.update();
            }
            this.population.checkDead(this.food);
            if (this.population.allDead()) {
                console.log("All dead");
                this.population.reproduce();
                this.generation++;
                //this.poisonCount += 5;
                this.placeFoodPoison();
            }
        }
    }

    draw() {
        background(51);
        if (this.training == true) {
            for (let vehicle of this.population.pop) {
                vehicle.draw();
            }
            noStroke();
            fill(0, 255, 0);
            for (let f of this.food) {
                ellipse(f.x, f.y, 8);
            }
            noStroke();
            fill(255, 0, 0);
            for (let p of this.poison) {
                ellipse(p.x, p.y, 8);
            }
            this.displayInfo();
        }
    }

    displayInfo() {
        noStroke();
        fill(255);
        textSize(40);
        text("Generation: " + this.generation, 10, 40);
    }
}
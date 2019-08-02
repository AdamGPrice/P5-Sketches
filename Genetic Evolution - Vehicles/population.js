class Population {
    constructor(size, mutationRate) {
        this.pop = [];
        this.size = size;
        this.dead = 0;
        this.mutationRate = mutationRate;
        this.createPopulation();
    }

    createPopulation() {
        for (let i = 0; i < this.size; i++) {
            this.pop.push(new Vehicle(random(width), random(height)));
        }
    }
    
    reproduce() {
        let matingPool = [];

        //calculate the fitness
        let totalFitness = 0;
        for (let i = 0; i < this.size; i++) {
            totalFitness += this.pop[i].fitness;
        }
        for (let i = 0; i < this.size; i++) {
            this.pop[i].prob = this.pop[i].fitness / totalFitness;
        }
        
        //pick two parents mix dna and make a child
        for (let i = 0; i < this.size; i++) {
            let a = this.pickOne(this.pop);
            let b = this.pickOne(this.pop);
            matingPool.push(this.crossOver(a, b));
        }
        this.pop = matingPool;
        this.dead = 0;
    }
    
    crossOver(a, b) {
        let r = random(a.dna.length);
        let dna = [];
        for (let i = 0; i < a.dna.length; i++) {
            //dna[i] = (a.dna[i] + b.dna[i]) / 2;
            if (r < i) {
                dna[i] = a.dna[i];
            }
            else {
                dna[i] = b.dna[i];
            }
        }
        let child = new Vehicle(random(width), random(height));
        child.dna = dna;
        this.mutate(child);

        return child;
    }

    mutate(vehicle) {
        if (random() < this.mutationRate) {
            vehicle.dna[0] += random(-0.5, 0.5);
            vehicle.dna[0] = constrain(vehicle.dna[0], -2, 2);
        }
        if (random() < this.mutationRate) {
            vehicle.dna[1] += random(-0.5, 0.5);
            vehicle.dna[1] = constrain(vehicle.dna[1], -2, 2);
        }
        if (random() < this.mutationRate) {
            vehicle.dna[2] += random(-50, 50);
            vehicle.dna[2] = constrain(vehicle.dna[2], 0, 200);
        }
        if (random() < this.mutationRate) {
            vehicle.dna[3] += random(-50, 50);
            vehicle.dna[3] = constrain(vehicle.dna[3], 0, 200);
        }
    }

    pickOne(list) {
        let index = 0;
        let r = random(1);
    
        while(r > 0) {
            r = r - list[index].prob;
            index++;
        }
    
        return list[index-1];
    }

    checkDead(food) {
        for (let vehicle of this.pop) {
            if (vehicle.dead() && vehicle.fitness == -1) {
                vehicle.fitness = this.dead + 1;
                vehicle.fitness = Math.pow(vehicle.fitness, 2);
                this.dead++;
                vehicle.position = createVector(2000, 2000);
                vehicle.velocity = createVector(0, 0);
                //food.push(createVector(random(width), random(height)));
            }
        }
    }

    allDead() {
        let allDead = true;
        for (let vehicle of this.pop) {
            if (!vehicle.dead()) {
                allDead = false;
            }
        }
        return allDead;
    }
}
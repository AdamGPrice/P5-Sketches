class Population {
    pop = [];

    constructor(target, size, mutationRate) {
        this.target = target;
        this.size = size;
        this.mutationRate = mutationRate;
        this.createPop();
    }

    createPop() {
        for (let i = 0; i < this.size; i++) {
            this.pop.push(new phrase(this.randomDNA()));
        }
    }

    //Evaluate the fitness of each phrase
    calcFitness() {
        for (let i = 0; i < this.size; i++) {
            this.pop[i].evaluate(this.target);
        }
    }

    reproduce() {
        let matingPool = [];

        //Their probability of being picked
        let totalfitness = 0;
        for (let i = 0; i < this.size; i++) {
            totalfitness += this.pop[i].fitness;
        }
        for (let i = 0; i < this.size; i++) {
            this.pop[i].prob = this.pop[i].fitness / totalfitness;
        }

        for (let i = 0; i < this.size; i++) {
            let a = this.pickOne(this.pop);
            let b = this.pickOne(this.pop);

            matingPool.push(this.crossover(a, b));
        }

        this.pop = matingPool;
    }

    //combines the dna of two elements
    crossover(a, b) {
        let r = random(this.target.length);
        let newDNA = '';
        for (let i = 0; i < this.target.length; i++) {
            if (r < i) {
                newDNA += a.dna[i];
            }
            else {
                newDNA += b.dna[i];
            }
        }

        let mutatedDNA = this.mutate(newDNA);

        return new phrase(mutatedDNA);
    }

    //  random chance to change the characters of the dna
    mutate(dna) {
        let mutatedDNA = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
        for (let i = 0; i < dna.length; i++) {
            let r = random();
            if (r < this.mutationRate) {
                let r2 = floor(random(characters.length))
                mutatedDNA += characters[r2];
            } 
            else {
                mutatedDNA += dna[i];
            }
        }
        return mutatedDNA;
    }

    // calculates the best and the popultaion average
    checkBest() {
        let fittest = this.pop[0];
        let fitnessSum = 0;
        for(let i = 0; i < this.size; i++) {
            if (this.pop[i].fitness > fittest.fitness) {
                fittest = this.pop[i];
            }
            fitnessSum += this.pop[i].fitness;
        }
        this.fittest = fittest;
        this.average = fitnessSum / this.size;
    }

    //picks one element from the population based on fitness
    pickOne(list) {
        let index = 0;
        let r = random(1);
    
        while(r > 0) {
            r = r - list[index].prob;
            index++;
        }
    
        return list[index-1];
    }

    //returns a random string of chatacters with specified length
    randomDNA() {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
        let charactersLength = characters.length;
        for ( let i = 0; i < this.target.length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }  
}
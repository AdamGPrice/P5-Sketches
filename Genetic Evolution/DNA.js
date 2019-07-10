class phrase {
    constructor(dna) {
        this.dna = dna;
    }

    evaluate(target) {
        let fitness = 0;
        for (let i = 0; i < target.length; i++) {
            if (this.dna[i] == target[i]) {
                fitness++;
            }
        }
        this.fitness = fitness;

    }
}
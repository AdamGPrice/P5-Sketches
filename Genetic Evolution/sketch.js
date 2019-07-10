let population;
let generation;

function setup() {
    createCanvas(1000, 800);
    population = new Population("Im very smart 200iq plays", 1000, 0.001);
    generation = 0;
    console.log(population.target);
    console.log(population.pop);

}


function draw() {

    population.calcFitness();
    population.checkBest();
    population.reproduce();
    generation++;

    //Drawing
    background(200);
    drawPop();
    drawInfo();

    if (population.fittest.dna == population.target) {
        noLoop();
    }
}

function drawPop() {
    fill(50);
    textSize(20);
    for (let i = 0; i < 40; i++) {
        text(population.pop[i].dna, 10, 20 * i + 20);
    }
}

function drawInfo() {
    textSize(32);
    let x = 500;
    text("Best phrase: ", x, 100);
    text(population.fittest.dna, x, 120, 500, 200);
    text("Generation " + generation, x, 300);
    text("Mutation Rate " + population.mutationRate * 100 + "%", x, 340);
    text("Population Size " + population.size, x, 380);
    let average = population.average / population.target.length * 100;
    text(`Average fitness ${average.toFixed(2)}%`, x, 420);
}
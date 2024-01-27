class Individual {
    public chromosomeLength: number;
    public fitness: number | null;
    public chromosome: number[];

    constructor(chromosomeLength: number) {
        this.chromosomeLength = chromosomeLength;
        this.fitness = null;
        this.chromosome = [];
    }

    initialize(): void {
        this.chromosome = [];
        for (let i = 0; i < this.chromosomeLength; i++) {
            this.chromosome.push(i);
        }
        for (let i = 0; i < this.chromosomeLength; i++) {
            const randomIndex = Math.floor(Math.random() * this.chromosomeLength);
            const tempNode = this.chromosome[randomIndex];
            this.chromosome[randomIndex] = this.chromosome[i];
            this.chromosome[i] = tempNode;
        }
    }

    setChromosome(chromosome: number[]): void {
        this.chromosome = chromosome;
    }

    mutate(): void {
        this.fitness = null;

        for (let index in this.chromosome) {
            if (ga.mutationRate > Math.random()) {
                const randomIndex = Math.floor(Math.random() * this.chromosomeLength);
                const tempNode = this.chromosome[randomIndex];
                this.chromosome[randomIndex] = this.chromosome[index];
                this.chromosome[index] = tempNode;
            }
        }
    }

    getDistance(): number {
        let totalDistance = 0;

        for (let index in this.chromosome) {
            const startNode = this.chromosome[index];
            let endNode = this.chromosome[0];

            if (parseInt(index) + 1 < this.chromosome.length) {
                endNode = this.chromosome[parseInt(index) + 1];
            }

            totalDistance += durations[startNode][endNode];
        }

        totalDistance += durations[startNode][endNode];

        return totalDistance;
    }

    calcFitness(): number {
        if (this.fitness !== null) {
            return this.fitness;
        }

        const totalDistance = this.getDistance();
        this.fitness = 1 / totalDistance;
        return this.fitness;
    }

    crossover(individual: Individual, offspringPopulation: Population): void {
        const offspringChromosome: number[] = [];
        const startPos = Math.floor(this.chromosome.length * Math.random());
        const endPos = Math.floor(this.chromosome.length * Math.random());
        let i = startPos;

        while (i !== endPos) {
            offspringChromosome[i] = individual.chromosome[i];
            i++;

            if (i >= this.chromosome.length) {
                i = 0;
            }
        }

        for (let parentIndex in individual.chromosome) {
            const node = individual.chromosome[parentIndex];
            let nodeFound = false;

            for (let offspringIndex in offspringChromosome) {
                if (offspringChromosome[offspringIndex] == node) {
                    nodeFound = true;
                    break;
                }
            }

            if (nodeFound === false) {
                for (let offspringIndex = 0; offspringIndex < individual.chromosome.length; offspringIndex++) {
                    if (offspringChromosome[offspringIndex] === undefined) {
                        offspringChromosome[offspringIndex] = node;
                        break;
                    }
                }
            }
        }

        const offspring = new Individual(this.chromosomeLength);
        offspring.setChromosome(offspringChromosome);
        offspringPopulation.addIndividual(offspring);
    }
}

class Population {
    individuals: Individual[];

    constructor() {
        this.individuals = [];
    }

    initialize(chromosomeLength: number): void {
        this.individuals = [];

        for (let i = 0; i < ga.populationSize; i++) {
            const newIndividual = new Individual(chromosomeLength);
            newIndividual.initialize();
            this.individuals.push(newIndividual);
        }
    }

    mutate(): void {
        const fittestIndex = this.getFittestIndex();

        for (let index in this.individuals) {
            // @ts-ignore
            if (ga.elitism !== true || index !== fittestIndex) {
                this.individuals[index].mutate();
            }
        }
    }

    crossover(): Population {
        const newPopulation = new Population();
        const fittestIndex = this.getFittestIndex();

        for (let index in this.individuals) {
            // @ts-ignore
            if (ga.elitism === true && index == fittestIndex) {
                const eliteIndividual = new Individual(this.individuals[index].chromosomeLength);
                eliteIndividual.setChromosome(this.individuals[index].chromosome.slice());
                newPopulation.addIndividual(eliteIndividual);
            } else {
                const parent = this.tournamentSelection();
                this.individuals[index].crossover(parent, newPopulation);
            }
        }

        return newPopulation;
    }

    addIndividual(individual: Individual): void {
        this.individuals.push(individual);
    }

    tournamentSelection(): Individual {
        for (let i = 0; i < this.individuals.length; i++) {
            const randomIndex = Math.floor(Math.random() * this.individuals.length);
            const tempIndividual = this.individuals[randomIndex];
            this.individuals[randomIndex] = this.individuals[i];
            this.individuals[i] = tempIndividual;
        }

        const tournamentPopulation = new Population();

        for (let i = 0; i < ga.tournamentSize; i++) {
            tournamentPopulation.addIndividual(this.individuals[i]);
        }

        return tournamentPopulation.getFittest();
    }

    getFittestIndex(): number {
        let fittestIndex = 0;

        for (let i = 1; i < this.individuals.length; i++) {
            if (this.individuals[i].calcFitness() > this.individuals[fittestIndex].calcFitness()) {
                fittestIndex = i;
            }
        }

        return fittestIndex;
    }

    getFittest(): Individual {
        return this.individuals[this.getFittestIndex()];
    }
}

const ga = {
    crossoverRate: 0.5,
    mutationRate: 0.1,
    populationSize: 50,
    tournamentSize: 5,
    elitism: true,
    maxGenerations: 50,
    tickerSpeed: 60,

    evolvePopulationAsync(population: Population, generationCallback: (data: any) => void): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.evolvePopulation(population, generationCallback, (result: any) => resolve(result));
            } catch (error) {
                reject({ error: error });
            }
        });
    },

    evolvePopulation(population: Population, generationCallBack: (data: any) => void, completeCallBack: (result: any) => void): void {
        let generation = 1;

        const evolveInterval = setInterval(() => {
            if (generationCallBack !== undefined) {
                generationCallBack({
                    population: population,
                    generation: generation,
                });
            }

            population = population.crossover();
            population.mutate();
            generation++;

            if (generation > ga.maxGenerations) {
                clearInterval(evolveInterval);

                if (completeCallBack !== undefined) {
                    completeCallBack({
                        population: population,
                        generation: generation,
                    });
                }
            }
        }, ga.tickerSpeed);
    },
};

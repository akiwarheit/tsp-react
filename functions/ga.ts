/**
 * https://bitbucket.org/akiwarheit/tsp-react-native/src/master/App/Lib/GeneticAlgorithm.js
 * 
 * Each chromosome represents a possible route for the salesman to traverse all the cities.
 * The genes in the chromosome represent the order in which the cities are visited.
 * The fitness can be inversely proportional to the total distance traveled. The lower the distance, the higher the fitness.
 * 
 * Repeated functions:
 * Crossover: Create offspring by combining the genetic material of two parents. One-point or two-point crossover methods are often used.
 * Mutation: Introduce small random changes in the offspring to maintain diversity in the population. Mutation can swap or change the order of genes.
 * Replace: Replace some individuals in the population with the new offspring.
 * 
 * The entire evolution keeps track of the best solution based off the fitness function. (least total distance travelled)
 * 
 * @param distances 
 */
export function evolveOnDistances(distances: number[][]) {
    class Individual {
        public chromosome: number[];
        public fitness: number;

        constructor(chromosome: number[]) {
            this.chromosome = chromosome;
            this.fitness = this.calculateFitness();
        }

        calculateFitness(): number {
            let totalDistance = 0;
            for (let i = 0; i < this.chromosome.length - 1; i++) {
                totalDistance += distances[this.chromosome[i]][this.chromosome[i + 1]];
            }
            totalDistance += distances[this.chromosome[this.chromosome.length - 1]][this.chromosome[0]]; // Complete the loop
            return 1 / totalDistance;
        }

        static crossover(parent1: Individual, parent2: Individual): Individual {
            const startPos = Math.floor(Math.random() * parent1.chromosome.length);
            const endPos = Math.floor(Math.random() * parent1.chromosome.length);
            const offspringChromosome = [];
            for (let i = 0; i < parent1.chromosome.length; i++) {
                if (startPos < endPos && i > startPos && i < endPos) {
                    offspringChromosome.push(parent1.chromosome[i]);
                } else if (startPos > endPos && (i < startPos || i > endPos)) {
                    offspringChromosome.push(parent1.chromosome[i]);
                } else if (i === startPos) {
                    offspringChromosome.push(parent1.chromosome[i]);
                }
            }
            for (let i = 0; i < parent2.chromosome.length; i++) {
                if (!offspringChromosome.includes(parent2.chromosome[i])) {
                    offspringChromosome.push(parent2.chromosome[i]);
                }
            }
            return new Individual(offspringChromosome);
        }

        mutate(): void {
            const pos1 = Math.floor(Math.random() * this.chromosome.length);
            const pos2 = Math.floor(Math.random() * this.chromosome.length);
            [this.chromosome[pos1], this.chromosome[pos2]] = [this.chromosome[pos2], this.chromosome[pos1]]; // Swap positions
            this.fitness = this.calculateFitness();
        }
    }

    class Population {
        public individuals: Individual[];

        constructor(size: number) {
            this.individuals = [];
            for (let i = 0; i < size; i++) {
                const chromosome = Array.from({ length: distances.length }, (_, index) => index);
                chromosome.sort(() => Math.random() - 0.5); // Shuffle the chromosome
                this.individuals.push(new Individual(chromosome));
            }
        }

        selectParent(): Individual {
            return this.individuals[Math.floor(Math.random() * this.individuals.length)];
        }

        evolve(): void {
            const newPopulation = [];
            // Elitism: Keep the best individual from the previous generation
            newPopulation.push(this.getFittest());
            while (newPopulation.length < this.individuals.length) {
                const parent1 = this.selectParent();
                const parent2 = this.selectParent();
                const child = Individual.crossover(parent1, parent2);
                if (Math.random() < 0.1) {
                    child.mutate();
                }
                newPopulation.push(child);
            }
            this.individuals = newPopulation;
        }

        getFittest(): Individual {
            let fittest = this.individuals[0];
            for (let i = 1; i < this.individuals.length; i++) {
                if (this.individuals[i].fitness > fittest.fitness) {
                    fittest = this.individuals[i];
                }
            }
            return fittest;
        }
    }

    const populationSize = 50;
    const generations = 100;

    const population = new Population(populationSize);
    for (let i = 0; i < generations; i++) {
        population.evolve();
    }
    const bestRoute = population.getFittest();
    console.log("Best Route:", bestRoute.chromosome);
    console.log("Total Distance:", 1 / bestRoute.fitness);

    return bestRoute.chromosome
}

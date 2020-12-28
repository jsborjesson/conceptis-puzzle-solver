<template>
  <div class="flex flex-col items-center px-4 py-12 space-y-8">
    <h1 class="text-5xl text-center">Fill-a-Pix Solver</h1>

    <div class="flex flex-col items-center space-y-4">
      <span>Input a puzzle</span>

      <div class="flex items-center space-x-4">
        <input type="number" v-model="blankPuzzleHeight" class="w-20 p-2 border border-gray-400 rounded" />
        <span>x</span>
        <input type="number" v-model="blankPuzzleWidth" class="w-20 p-2 border border-gray-400 rounded" />
        <button @click="blankPuzzle" class="p-2 bg-gray-100 border border-gray-400 rounded active:bg-gray-300">Clear puzzle</button>
      </div>

      <span>or start with an example</span>

      <div class="flex items-center space-x-4">
        <select v-model="selectedExample" class="p-2 border border-gray-400 rounded">
          <option v-for="(_, name) in examples" :key="name" :value="name">{{ name }}</option>
        </select>
        <button @click="examplePuzzle(selectedExample)" class="p-2 bg-gray-100 border border-gray-400 rounded active:bg-gray-300">Show</button>
      </div>
    </div>

    <!-- Grid -->
    <table>
      <tr v-for="(rows, row) in puzzle" :key="row">
        <td
          v-for="(square, col) in rows"
          :key="row + 'x' + col"
          class="w-12 h-12 text-center border border-gray-700"
          :class="{'bg-black text-white': square.fill === 'filled', 'bg-gray-300': square.fill === 'crossed'}"
          :style="`width: ${squareSize}px; height: ${squareSize}px; font-size: ${squareSize / 2}px`">
          <input
            type="number"
            class="w-full text-center bg-transparent focus:outline-none"
            v-model="puzzle[row][col].number" />
        </td>
      </tr>
    </table>

    <!-- Solver buttons -->
    <div class="flex w-full max-w-lg">
      <button class="flex-1 p-4 font-bold text-white bg-red-500 rounded-l active:bg-red-700" @click="stepBack">Step back</button>
      <button class="flex-1 p-4 font-bold text-white bg-green-500 rounded-r active:bg-green-700" @click="stepForward">Step forward</button>
    </div>
  </div>
</template>

<style scoped>
/* Remove arrows from number fields */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance:textfield;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { solveStep } from "../lib/solver";
import { blankPuzzle, Puzzle, examples } from "../lib/puzzles";

const MAX_SQUARE_SIZE: number = 50;

export default defineComponent({
  data() {
    return {
      selectedExample: "",
      examples,
      blankPuzzleHeight: 10,
      blankPuzzleWidth: 10,
      viewportWidth: window.innerWidth,

      solutionSteps: [] as Puzzle[],
    };
  },
  mounted(): void {
    this.blankPuzzle();

    window.addEventListener("resize", () => {
      this.viewportWidth = window.innerWidth;
    });
  },
  computed: {
    puzzle(): Puzzle {
      return this.solutionSteps[this.solutionSteps.length - 1];
    },
    squareSize(): number {
      return Math.min(this.viewportWidth / this.puzzle[0].length, MAX_SQUARE_SIZE);
    },
  },
  methods: {
    blankPuzzle(): void {
      this.solutionSteps = [blankPuzzle(this.blankPuzzleHeight, this.blankPuzzleWidth)];
    },
    examplePuzzle(name: string): void {
      const example = examples[name];
      if (example) {
        this.solutionSteps = [example];
      }
    },
    stepForward(): void {
      const step = solveStep(this.puzzle);

      if (step) {
        this.solutionSteps.push(step);
      }
    },
    stepBack(): void {
      if (this.solutionSteps.length > 1) {
        this.solutionSteps.pop();
      }
    },
  },
})
</script>

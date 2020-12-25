<template>
  <div class="flex flex-col items-center justify-center my-8 space-y-4">
    <span>Input a puzzle</span>

    <div class="flex items-center justify-center space-x-4">
      <input type="number" v-model="height" class="w-20 p-2 border border-gray-400 rounded" />
      <span>x</span>
      <input type="number" v-model="width" class="w-20 p-2 border border-gray-400 rounded" />
      <button @click="blankPuzzle" class="p-2 bg-gray-100 border border-gray-400 rounded">Clear puzzle</button>
    </div>

    <span>or start with an example</span>

    <div class="flex items-center justify-center space-x-4">
      <select v-model="example" class="p-2 border border-gray-400 rounded">
        <option v-for="(_, index) in examples" :key="index" :value="index">Example puzzle {{index + 1}}</option>
      </select>
      <button @click="examplePuzzle(example)" class="p-2 bg-gray-100 border border-gray-400 rounded">Show</button>
    </div>
  </div>

  <!-- Grid -->
  <table class="mx-auto my-8 border-t border-l border-black">
    <tr v-for="(rows, row) in puzzle" :key="row">
      <td
        v-for="(square, col) in rows"
        :key="row + 'x' + col"
        class="w-12 h-12 text-center border-b border-r border-black"
        :class="{'bg-black text-white': square.fill === 'filled', 'bg-gray-300': square.fill === 'crossed'}">
        <input
          class="w-full text-center bg-transparent"
          v-model="puzzle[row][col].number" />
      </td>
    </tr>
  </table>

  <!-- Solver buttons -->
  <div class="flex px-4 mb-12">
    <button class="flex-1 p-4 font-bold bg-red-400 rounded-l" @click="stepBack">Step back</button>
    <button class="flex-1 p-4 font-bold bg-green-400 rounded-r" @click="stepForward">Step forward</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { solveStep, blankPuzzle, Puzzle } from "../lib/solver";
import { examples } from "../lib/puzzles";

export default defineComponent({
  data() {
    return {
      editing: true,
      example: 0,
      examples,
      height: 10,
      width: 10,

      steps: [] as Puzzle[],
    };
  },
  mounted(): void {
    this.blankPuzzle();
  },
  computed: {
    puzzle(): Puzzle {
      return this.steps[this.steps.length - 1];
    },
  },
  methods: {
    blankPuzzle(): void {
      this.editing = true;
      this.steps = [blankPuzzle(this.height, this.width)];
    },
    examplePuzzle(index: number): void {
      this.editing = false;
      this.steps = [examples[index]];
    },
    stepForward(): void {
      this.editing = false;
      this.steps.push(
        solveStep(this.puzzle),
      );
    },
    stepBack(): void {
      if (this.steps.length > 1) {
        this.steps.pop();
      }
    },
  },
})
</script>

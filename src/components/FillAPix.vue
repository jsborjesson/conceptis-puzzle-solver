<template>
  <div class="wrapper">
    <div class="controls">
      <div>
        <input type="number" v-model="height" />
        x
        <input type="number" v-model="width" />
        <button @click="blankPuzzle">Clear grid</button>
      </div>

      <div>
        <button v-for="(_, index) in examples" :key="index" @click="examplePuzzle(index)">Example puzzle {{index + 1}}</button>
      </div>
    </div>

    <table class="grid">
      <tr v-for="(rows, row) in puzzle" :key="row">
        <td v-for="(square, col) in rows" :key="row + 'x' + col">
          <input v-if="editing" v-model="puzzle[row][col].number" />
          <span v-else :class="'fill' + square.fill">{{ square.number }}</span>
        </td>
      </tr>
    </table>

    <div class="step">
      <button class="back" @click="stepBack">Step back</button>
      <button class="forward" @click="stepForward">Step forward</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.controls input {
  width: 40px;
}

.grid {
  margin: 1rem auto 1rem auto;
}

td {
  padding: 0;
  margin: 0;
  border: 1px solid black;
  text-align: center;
}

.grid input,
.grid span {
  width: 40px;
  height: 40px;
  line-height: 40px;

  margin: 0;
  padding: 0;
  border: 0;

  font-size: 1rem;
  font-family: sans-serif;
}

.grid input {
  text-align: center;
}

.grid span {
  display: block;
}

.grid span.fill0 {
  color: whitesmoke;
  background-color: black;
}
.grid span.fill1 {
  color: black;
  background-color: lightgray;
}
.grid span.fill2 {
  color: black;
  background-color: white;
}

.step {
  display: flex;
}
.step button {
  flex: 1;
  padding: 1rem;
  margin: 1rem;
  font-weight: bold;
}
.step .back {
  background-color: orangered;
}
.step .forward {
  background-color: lightgreen;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { solveStep, blankPuzzle, Puzzle } from "../lib/solver";
import { examples } from "../lib/puzzles";

export default defineComponent({
  data() {
    return {
      editing: true,
      height: 10,
      width: 10,
      steps: [] as Puzzle[],
      examples,
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
      this.steps.pop();
    },
  },
})
</script>

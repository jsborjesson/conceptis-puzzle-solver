<template>
  <div class="wrapper">
    <div class="controls">
      <input type="number" v-model="height" />
      x
      <input type="number" v-model="width" />
      <button @click="resetGrid">Clear grid</button>
    </div>

    <table class="grid">
      <tr v-for="(rows, row) in puzzle" :key="row">
        <td v-for="(square, col) in rows" :key="row + 'x' + col">
          <input v-if="editing" v-model="puzzle[row][col].number" />
          <span v-else :class="'fill' + square.fill">{{ square.number }}</span>
        </td>
      </tr>
    </table>

    <button @click="solve">Solve</button>
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
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { solve, createPuzzle, blankPuzzle } from "../lib/solver";

const U = undefined;

export default defineComponent({
  data() {
    return {
      editing: true,
      height: 10,
      width: 10,
      puzzle: createPuzzle([
        [U, 2, 3, U, U, 0, U, U, U, U],
        [U, U, U, U, 3, U, 2, U, U, 6],
        [U, U, 5, U, 5, 3, U, 5, 7, 4],
        [U, 4, U, 5, U, 5, U, 6, U, 3],
        [U, U, 4, U, 5, U, 6, U, U, 3],
        [U, U, U, 2, U, 5, U, U, U, U],
        [4, U, 1, U, U, U, 1, 1, U, U],
        [4, U, 1, U, U, U, 1, U, 4, U],
        [U, U, U, U, 6, U, U, U, U, 4],
        [U, 4, 4, U, U, U, U, 4, U, U],
      ]),
    };
  },
  methods: {
    resetGrid(): void {
      this.editing = true;
      this.puzzle = blankPuzzle(this.height, this.width);
    },
    solve(): void {
      this.solution = solve(this.puzzle);
      this.editing = false;
    }
  },
})
</script>

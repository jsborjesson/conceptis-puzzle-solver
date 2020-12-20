<template>
  <div class="wrapper">
    <div class="controls">
      <input type="number" v-model="height" />
      x
      <input type="number" v-model="width" />
      <button @click="generateGrid">Clear grid</button>
    </div>

    <table class="grid">
      <tr v-for="(rowEl, row) in grid" :key="row">
        <td v-for="(_, col) in rowEl" :key="row + 'x' + col">
          <span v-if="solution" :class="[solution[row][col] ? 'black' : 'white']">{{ grid[row][col] }}</span>
          <input v-else v-model="grid[row][col]" />
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
}

.grid input,
.grid span {
  width: 20px;
  height: 20px;
}

.grid span {
  display: block;
  margin: 0;
  padding: 5px;
}

.grid span.black {
  color: whitesmoke;
  background-color: black;
}

.grid span.white {
  color: black;
  background-color: lightgray;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { solve, generateGrid, Digit } from "../lib/solver";

const U = undefined;

export default defineComponent({
  data() {
    return {
      height: 10,
      width: 10,
      grid: [
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
      ] as Digit[][],
      solution: undefined
    };
  },
  methods: {
    generateGrid(): void {
      this.solution = undefined;
      this.grid = generateGrid(this.height, this.width, () => undefined);
    },
    solve(): void {
      this.solution = solve(this.grid);
    }
  },
})
</script>

<template>
  <input type="checkbox" id="editing" v-model="editing" /><label for="editing">Edit</label>

  <button @click="plusRow">v</button>
  <button @click="minusRow">^</button>
  <button @click="plusCol">&gt;</button>
  <button @click="minusCol">&lt;</button>

  <div>
    {{ height }}x{{ width }} grid
  </div>

  <table>
    <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
      <td v-for="(cell, cellIndex) in row" :key="(rowIndex*10) + cellIndex">
        <input v-if="editing" v-model="grid[rowIndex][cellIndex].number" />
        {{ cell }}
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

enum Fill {
  Black,
  White,
}

interface Cell {
  number?: Digit;
  fill?: Fill;
}

const empty = (): Cell => ({});

export default defineComponent({
  data() {
    return {
      editing: true,
      grid: [[empty()]],
    };
  },
  computed: {
    height(): number {
      return this.grid.length;
    },
    width(): number {
      return this.grid[0].length;
    }
  },
  methods: {
    plusRow(): void {
      const row = Array.from({length: this.width}, () => empty());
      this.grid.push(row);
    },
    minusRow(): void {
      if (this.height > 1) {
        this.grid.pop();
      }
    },
    plusCol(): void {
      this.grid.forEach(row => {
        row.push(empty());
      });
    },
    minusCol(): void {
      if (this.width > 1) {
        this.grid.forEach(row => {
          row.pop();
        });
      }
    },
  },
})
</script>

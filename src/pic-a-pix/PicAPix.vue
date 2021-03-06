<template>
  <div class="flex flex-col items-center px-4 py-12 space-y-8">
    <h1 class="text-5xl text-center">Pic-a-Pix Solver</h1>

    <div>
      <input type="checkbox" id="editable" v-model="editable" class="m-2">
      <label for="editable">Show inputs</label>
    </div>

    <div class="w-full p-4 overflow-auto">
      <table>
        <!-- Vertical inputs -->
        <tr>
          <th colspan="2" rowspan="2">
            <!-- Palette -->
            <div class="space-y-2" v-if="editable">
              <div class="flex justify-center space-x-2">
                <span
                  v-for="color in palette"
                  :key="color"
                  :style="{ backgroundColor: color }"
                  class="block w-8 h-8 rounded-full opacity-50 cursor-pointer"
                  :class="{ 'opacity-100 shadow': color === paletteSelected }"
                  @click="paletteSelected = color" />
              </div>

              <div>
                <input
                  type="number"
                  class="w-8 text-xl font-bold text-center rounded"
                  :style="{ color: paletteSelected }"
                  v-model="numberSelected" />
              </div>
            </div>
          </th>

          <th></th>

          <th v-for="(_, col) in puzzle.vertical" :key="col">
            <div class="flex flex-col mb-1 space-y-1" v-if="editable">
              <button class="text-white bg-red-500 rounded" @click="removeNumber('vertical', col)">x</button>
              <button class="text-white bg-green-500 rounded" @click="addNumber('vertical', col)">v</button>
            </div>
          </th>
        </tr>

        <!-- Vertical clues -->
        <tr class="h-full">
          <!-- gap -->
          <th></th>

          <th v-for="col in puzzle.vertical" :key="col" class="h-full p-0 border border-gray-500">
            <div class="flex flex-col justify-end h-full">
              <span
                v-for="clue in col"
                :key="clue"
                :style="`color: ${clue.color}; width: ${squareSize}px; height: ${squareSize}px;`"
                class="bg-gray-300">
                {{ clue.number }}
              </span>
            </div>
          </th>
        </tr>

        <!-- gap -->
        <tr class="h-2">
          <th colspan="3"></th>
        </tr>

        <tr v-for="(clues, row) in puzzle.horizontal" :key="row">
          <!-- Horizontal inputs -->
          <th>
            <div class="flex flex-row mr-1 space-x-1" v-if="editable">
              <button class="text-white bg-red-500 rounded" :style="{ width: squareSize + 'px' }" @click="removeNumber('horizontal', row)">x</button>
              <button class="text-white bg-green-500 rounded" :style="{ width: squareSize + 'px' }" @click="addNumber('horizontal', row)">></button>
            </div>
          </th>

          <!-- Horizontal clues -->
          <th class="p-0 border border-gray-600">
            <div class="flex justify-end">
              <span
                v-for="clue in clues"
                :key="clue"
                :style="`color: ${clue.color}; width: ${squareSize}px; height: ${squareSize}px;`"
                class="p-1 bg-gray-300">
                {{ clue.number }}
              </span>
            </div>
          </th>

          <!-- Horizontal gap -->
          <td class="w-2" />

          <!-- Picture -->
          <td v-for="square in puzzle.vertical" :key="square" class="border border-gray-500"></td>
        </tr>
      </table>
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

interface Puzzle {
  vertical: Clue[][];
  horizontal: Clue[][];
}

interface Clue {
  number: number;
  color: Color;
}

type Color = string;

const example: Puzzle = {
  vertical: [
    [{ number: 4, color: "red" }],
    [{ number: 6, color: "red" }],
    [{ number: 6, color: "red" }, { number: 2, color: "black" }],
    [{ number: 6, color: "red" }, { number: 2, color: "black" }],
    [{ number: 1, color: "red" }, { number: 4, color: "blue" }, { number: 2, color: "black" }],
    [{ number: 6, color: "blue" }, { number: 2, color: "black" }],
    [{ number: 7, color: "blue" }, { number: 1, color: "black" }],
    [{ number: 5, color: "blue" }, { number: 1, color: "blue" }],
    [{ number: 3, color: "blue" }, { number: 2, color: "blue" }],
    [{ number: 5, color: "blue" }],
  ],
  horizontal: [
    [{ number: 3, color: "red" }, { number: 3, color: "blue" }],
    [{ number: 5, color: "red" }, { number: 5, color: "blue" }],
    [{ number: 4, color: "red" }, { number: 6, color: "blue" }],
    [{ number: 4, color: "red" }, { number: 4, color: "blue" }, { number: 1, color: "blue" }],
    [{ number: 4, color: "red" }, { number: 4, color: "blue" }, { number: 1, color: "blue" }],
    [{ number: 3, color: "red" }, { number: 3, color: "blue" }, { number: 2, color: "blue" }],
    [{ number: 1, color: "black" }, { number: 4, color: "blue" }],
    [{ number: 2, color: "black" }, { number: 2, color: "black" }],
    [{ number: 3, color: "black" }],
    [{ number: 1, color: "black" }],
  ],
};

export default defineComponent({
  data() {
    return {
      palette: ["red", "black", "blue"] as Color[],
      paletteSelected: "red" as Color,
      puzzle: example,
      squareSize: 30,
      editable: true,
      numberSelected: 1,
    }
  },
  methods: {
    addNumber(direction: "vertical" | "horizontal", index: number): void {
      if (!this.numberSelected) {
        return;
      }

      this.puzzle[direction][index].unshift({
        number: this.numberSelected,
        color: this.paletteSelected,
      });
    },
    removeNumber(direction: "vertical" | "horizontal", index: number): void {
      this.puzzle[direction][index].shift();
    },
  },
})
</script>

<template>
  <div class="flex flex-col items-center px-4 py-12 space-y-8">
    <h1 class="text-5xl text-center">Pic-a-Pix Solver</h1>

    <table class="box-border">
      <tr class="h-full">
        <!-- Invisible top left corner -->
        <th></th>

        <!-- Vertical gap -->
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

      <!-- Horizontal gap -->
      <tr class="h-2">
        <td></td>
        <td></td>
      </tr>

      <tr v-for="row in puzzle.horizontal" :key="row">
        <th class="p-0 border border-gray-600">
          <div class="flex justify-end">
            <span
              v-for="clue in row"
              :key="clue"
              :style="`color: ${clue.color}; width: ${squareSize}px; height: ${squareSize}px;`"
              class="p-1 bg-gray-300">
              {{ clue.number }}
            </span>
          </div>
        </th>

        <!-- Vertical gap -->
        <td class="w-2" />

        <!-- Picture -->
        <td v-for="square in puzzle.vertical" :key="square" class="border border-gray-500"></td>
      </tr>
    </table>
  </div>
</template>

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
  ],
  horizontal: [
    [{ number: 3, color: "red" }, { number: 3, color: "blue" }],
    [{ number: 5, color: "red" }, { number: 5, color: "blue" }],
    [{ number: 4, color: "red" }, { number: 6, color: "blue" }],
    [{ number: 4, color: "red" }, { number: 4, color: "blue" }, { number: 1, color: "blue" }],
  ],
};

export default defineComponent({
  data() {
    return {
      puzzle: example,
      squareSize: 30,
    }
  },
})
</script>

<template>
  <h1 class="mt-8 text-5xl text-center">fill-a-pix solver</h1>
  <FillAPix />
</template>

<script>
import { defineComponent } from "vue";
import FillAPix from "./components/FillAPix.vue";

export default defineComponent({
  name: "App",
  components: {
    FillAPix
  },
});
</script>

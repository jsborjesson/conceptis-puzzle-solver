<template>
  <FillAPix />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FillAPix from "./fill-a-pix/FillAPix.vue";

export default defineComponent({
  name: "App",
  components: {
    FillAPix
  },
});
</script>

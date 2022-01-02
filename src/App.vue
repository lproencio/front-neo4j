<template>
  <router-view />
</template>

<script>
import { ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const current_route = ref("");

    watch(
      () => route.name,
      () => {
        current_route.value = route.name;
      }
    );

    return { current_route };
  },
};
</script>

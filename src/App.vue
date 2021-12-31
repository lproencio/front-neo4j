<template>
  <div class="nav">
    <router-link :class="{ selected: current_route == 'Home' }" to="/"
      >Home</router-link
    >
    <router-link :class="{ selected: current_route == 'New' }" to="/new"
      >New user</router-link
    >
  </div>
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

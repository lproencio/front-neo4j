<template>
  <div
    class="loader"
    :style="[
      { border: `16px solid ${base}` },
      { 'border-top': `16px solid ${top}` },
    ]"
  ></div>
</template>

<script>
export default {
  props: {
    base: { type: String, default: "#f3f3f3" },
    top: { type: String, default: "#3498db" },
  },
};
</script>

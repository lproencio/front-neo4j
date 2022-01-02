<template>
  <div class="card-alert">
    <h1>{{ title }}</h1>
    <p>{{ body }}</p>
    <button @click="$emit('close')">close</button>
  </div>
</template>

<script>
export default {
  props: { title: String, body: String },
  setup() {},
};
</script>

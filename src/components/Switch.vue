<template>
  <div class="toggle">
    {{ label }}

    <label class="switch">
      <input type="checkbox" :checked="value" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
  props: { label: String, value: Boolean },
  setup() {},
};
</script>

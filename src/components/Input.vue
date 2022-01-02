<template>
  <div>
    <label for="">{{ label }}</label>
    <input
      :value="value"
      :type="type"
      :placeholder="placeholder"
      @input="change"
    />
  </div>
</template>

<script>
export default {
  emits: ["update:value"],
  props: { type: String, label: String, value: String, placeholder: String },
  setup(_, { emit }) {
    const change = (e) => {
      emit("update:value", e.target.value);
    };

    return { change };
  },
};
</script>

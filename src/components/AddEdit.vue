<template>
  <div class="bg-white">
    <h1>{{ title }}</h1>

    <div v-for="(user, i) in user_info" :key="i">
      <Input
        :type="user.type"
        :label="user.label"
        v-model:value="user.value"
        :placeholder="user.placeholder"
      />
    </div>

    <button @click="create">add</button>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import { ref } from "@vue/reactivity";

export default {
  components: { Input },
  props: { user: Object, title: { type: String, default: "create" } },
  setup() {
    const user_info = ref([
      {
        type: "text",
        label: "Name",
        value: "",
        placeholder: "Insira o nome aqui",
      },
      {
        type: "cpf",
        label: "CPF",
        value: "",
        placeholder: "Insira o CPF aqui",
      },
      {
        type: "email",
        label: "Email",
        value: "",
        placeholder: "example@example.com",
      },
      {
        type: "phone",
        label: "phone",
        value: "",
        placeholder: "ex. (99) 9 9999-9999",
      },
      { type: "is_active", label: "Active", value: true, placeholder: "" },
    ]);

    const create = () => {
      console.log(user_info.value);
    };

    return { user_info, create };
  },
};
</script>

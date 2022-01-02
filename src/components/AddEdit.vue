<template>
  <div class="add-edit">
    <div class="content">
      <h1>{{ title }}</h1>

      <div v-for="(user, i) in user_info" :key="i">
        <Switch
          :label="user.label"
          :value="user.value"
          v-if="user.type == 'is_active'"
        />

        <Input
          v-else
          :type="user.type"
          :label="user.label"
          v-model:value="user.value"
          :placeholder="user.placeholder"
        />
      </div>

      <div class="buttons">
        <button class="save" @click="create">salvar</button>
        <button class="delete" @click="create">delete</button>
        <button class="close" @click="$emit('close')">x</button>
      </div>
    </div>

    <loader v-if="is_loading" />
    <CardAlert
      :title="title_alert"
      :body="body"
      v-if="show_alert"
      @close="show_alert = !show_alert"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Users from "@/Api/Users.js";

import Input from "@/components/Input.vue";
import Switch from "./Switch.vue";
import Loader from "./Loader.vue";
import CardAlert from "./CardAlert.vue";

export default {
  components: { Input, Switch, Loader, CardAlert },
  props: { user: Object, title: { type: String, default: "create" } },
  setup(_, { emit }) {
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

    const show_alert = ref(false);
    const is_loading = ref(false);
    const title_alert = ref("");
    const body = ref("");

    const create = async () => {
      const new_user = {
        name: user_info.value[0].value,
        cpf: user_info.value[1].value,
        email: user_info.value[2].value,
        phone: user_info.value[3].value,
        is_active: user_info.value[4].value,
      };

      is_loading.value = !is_loading.value;

      await Users.post(new_user)
        .then((res) => {
          title_alert.value = "Success!!!";
          body.value = "Saved successfully";
          is_loading.value = !is_loading.value;
          show_alert.value = !show_alert.value;

          emit("update");

          setTimeout(() => {
            show_alert.value = !show_alert.value;

            emit("close");
          }, 800);

          return res;
        })
        .catch((err) => {
          title_alert.value = "Error";
          body.value = "an error occurred, check the fields and try again";
          is_loading.value = !is_loading.value;
          show_alert.value = !show_alert.value;
          return err;
        });
    };

    return { user_info, create, show_alert, is_loading, title_alert, body };
  },
};
</script>

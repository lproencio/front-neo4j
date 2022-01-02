<template>
  <div class="add-edit">
    <div class="content">
      <h1>{{ user.id ? "Edit" : "New User" }}</h1>

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
        <button class="save" @click="save">salvar</button>
        <button class="delete" @click="delete_user">delete</button>
        <button class="close" @click="$emit('close')">x</button>
      </div>
    </div>

    <div class="loading" v-if="is_loading">
      <loader />
    </div>
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
  props: { user: Object },
  setup(props, { emit }) {
    const user_info = ref([
      {
        type: "text",
        label: "Name",
        value: props.user.name,
        placeholder: "Insira o nome aqui",
      },
      {
        type: "cpf",
        label: "CPF",
        value: props.user.cpf,
        placeholder: "Insira o CPF aqui",
      },
      {
        type: "email",
        label: "Email",
        value: props.user.email,
        placeholder: "example@example.com",
      },
      {
        type: "phone",
        label: "Phone",
        value: props.user.phone,
        placeholder: "ex. (99) 9 9999-9999",
      },
      {
        type: "is_active",
        label: "Active",
        value: props.user.is_active,
        placeholder: "",
      },
    ]);

    const show_alert = ref(false);
    const is_loading = ref(false);
    const title_alert = ref("");
    const body = ref("");

    const save_user = async (new_user) => {
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

    const update_user = async (id, user) => {
      await Users.update(id, user)
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

    const save = async () => {
      const new_user = {
        name: user_info.value[0].value,
        cpf: user_info.value[1].value,
        email: user_info.value[2].value,
        phone: user_info.value[3].value,
        is_active: user_info.value[4].value,
      };

      is_loading.value = !is_loading.value;

      if (props.user.id) {
        update_user(props.user._id, new_user);
      } else {
        save_user(new_user);
      }
    };

    const delete_user = async () => {
      is_loading.value = !is_loading.value;

      await Users.delete(props.user._id)
        .then((res) => {
          title_alert.value = "Success!!!";
          body.value = "Deleted successfully";
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
          body.value = "an error occurred, try again";
          is_loading.value = !is_loading.value;
          show_alert.value = !show_alert.value;
          return err;
        });
    };

    return {
      user_info,
      save,
      show_alert,
      is_loading,
      title_alert,
      body,
      delete_user,
    };
  },
};
</script>

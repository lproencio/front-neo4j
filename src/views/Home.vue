<template>
  <div class="home">
    <button class="button-register" @click="new_register">
      <img :src="require('@/assets/add.png')" alt="" />
      New Register
    </button>
    <div v-if="user_all.length > 0">
      <ul class="table">
        <li v-for="user in user_all" :key="user.id">
          <CardUser :user="user" @edit="open_edit" />
        </li>
        <div class="updated" v-if="updated_search">
          <Loader />
        </div>
      </ul>

      <pagination
        v-model="page"
        :records="total"
        :per-page="limit"
        :options="{ chunk: 3 }"
        @paginate="change_page"
      />
    </div>
    <div class="loading" v-else>
      <loader />
    </div>

    <add-edit
      :user="user_select"
      v-if="show_add"
      @close="show_add = !show_add"
      @update="change_page(1)"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import Users from "@/Api/Users.js";
import { onMounted } from "@vue/runtime-core";

import CardUser from "@/components/CardUser.vue";
import Loader from "@/components/Loader.vue";
import Pagination from "v-pagination-3";
import AddEdit from "../components/AddEdit.vue";

export default {
  name: "Home",
  components: { CardUser, Pagination, Loader, AddEdit },

  setup() {
    const user_all = ref([]);
    const user_select = ref({});

    const updated_search = ref(false);
    const show_add = ref(false);

    const page = ref(1);
    const limit = ref(9);
    const total = ref(0);

    const get_users = async () => {
      const res = await Users.get(limit.value, page.value);

      user_all.value = res.data.users;
      total.value = res.data.size;
    };

    const change_page = async (number_page) => {
      updated_search.value = true;

      page.value = number_page;
      await get_users();

      updated_search.value = false;
    };

    onMounted(() => {
      get_users();
    });

    const new_register = () => {
      user_select.value = {};

      show_add.value = !show_add.value;
    };

    const open_edit = (user) => {
      user_select.value = user;

      show_add.value = !show_add.value;
    };

    return {
      user_all,
      change_page,
      total,
      limit,
      page,
      updated_search,
      show_add,
      open_edit,
      user_select,
      new_register,
    };
  },
};
</script>

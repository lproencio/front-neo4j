<template>
  <div class="home">
    <div v-if="user_all.length > 0">
      <ul class="table">
        <li v-for="user in user_all" :key="user.id">
          <CardUser :user="user" />
        </li>
      </ul>

      <pagination
        v-model="page"
        :records="total"
        :per-page="limit"
        :options="{ chunk: 3 }"
        @paginate="change_page"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import CardUser from "@/components/CardUser.vue";
import Pagination from "v-pagination-3";

import Users from "@/Api/Users.js";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "Home",
  components: { CardUser, Pagination },

  setup() {
    const user_all = ref([]);

    const page = ref(1);
    const limit = ref(3);
    const total = ref(0);

    const get_users = async () => {
      const res = await Users.get(limit.value, page.value);

      console.log(res.data);

      user_all.value = res.data.users;
      total.value = res.data.size;
    };

    const change_page = (number_page) => {
      page.value = number_page;

      get_users();
    };

    onMounted(() => {
      get_users();
    });

    return { user_all, change_page, total, limit, page };
  },
};
</script>

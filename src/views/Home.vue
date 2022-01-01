<template>
  <div class="home">
    <div>
      <ul class="table" v-if="user_all.length > 0">
        <li v-for="user in user_all" :key="user.id">
          <CardUser :user="user" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

import CardUser from "@/components/CardUser.vue";

import Users from "@/Api/Users.js";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "Home",
  components: { CardUser },

  setup() {
    const user_all = ref([]);

    onMounted(async () => {
      const res = await Users.get(2, 1);

      console.log(res.data);

      user_all.value = res.data.users;
    });

    return { user_all };
  },
};
</script>

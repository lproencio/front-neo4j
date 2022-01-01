<template>
  <div class="card-user">
    <div class="name">
      <avatar :name="user.name" />
      <p>{{ user.name }}</p>
    </div>
    <div class="infos">
      <div class="list">
        <ul>
          <li v-for="(item, i) in infos" :key="i">
            <p>
              <span> {{ item.title }}:</span> {{ user[item.key] }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Avatar from "./Avatar.vue";
export default {
  components: { Avatar },
  props: {
    user: Object,
  },
  setup() {
    const infos = ref([
      { title: "CPF", key: "cpf" },
      { title: "E-mail", key: "email" },
      { title: "Phone", key: "phone" },
    ]);

    return { infos };
  },
};
</script>

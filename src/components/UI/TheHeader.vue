<template>
  <div>
    <header class="flex justify-end align-middle gap-10">
      <router-link to="/" class="link-navbar rounded">Home Page</router-link>
      <router-link
        v-if="favoriteHeroes.length"
        to="/favorite"
        class="link-navbar rounded"
        >Favorite Heroes</router-link
      >
    </header>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["favoriteHeroes"]),
  },
};
</script>

<style scoped>
a {
  border-radius: 8px;
}
a.router-link-active {
  background-color: darkblue;
  color: white;
}
</style>

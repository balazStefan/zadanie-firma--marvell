<template>
  <div>
    <search-bar></search-bar>
    <hero-card></hero-card>
  </div>
</template>
<script>
import SearchBar from "../components/SearchBar.vue";
import HeroCard from "../components/HeroCard.vue";
export default {
  components: { SearchBar, HeroCard },
};
</script>

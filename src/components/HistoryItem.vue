<template>
  <div
    class="hover:bg-gray-300 cursor-pointer flex justify-between w-96 min-w-min"
  >
    <p @click="loadHeroFromHistory" class="font-bolder pr-50 max-w-sm">
      {{ query }}
    </p>
    <button @click="deleteQueryFromHistory" class="text-red-500 font-bold pr-2">
      Delete
    </button>
  </div>
</template>
<script>
export default {
  props: ["query"],
  emits: ["delete-history", "load-FromHistory"],
  methods: {
    deleteQueryFromHistory() {
      this.$emit("delete-query", this.query);
    },
    loadHeroFromHistory() {
      this.$emit("load-FromHistory", this.query);
    },
  },
};
</script>
<style scoped>
p {
  text-indent: 10px;
}
</style>

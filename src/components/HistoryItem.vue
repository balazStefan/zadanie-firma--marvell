<template>
  <div
    class="hover:bg-gray-300 cursor-pointer flex justify-between w-96 min-w-min"
  >
    <p @click="loadHeroFromHistory" class="font-bolder pr-50 max-w-sm">
      {{ queri }}
    </p>
    <button @click="deleteHistory" class="text-red-500 font-bold pr-2">
      Delete
    </button>
  </div>
</template>
<script>
export default {
  props: ["queri"],
  emits: ["delete-history", "load-fromHistory"],
  methods: {
    deleteHistory() {
      this.$emit("delete-history", this.queri);
    },
    loadHeroFromHistory() {
      this.$emit("load-fromHistory", this.queri);
    },
  },
};
</script>
<style scoped>
p {
  text-indent: 10px;
}
</style>

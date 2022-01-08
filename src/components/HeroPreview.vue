<template>
  <div class="cursor-pointer" @click="loadPreview">
    <p class="text-black text-center">
      {{ name }}
    </p>
    <img :src="photo" />
  </div>
</template>
<script>
export default {
  props: ["id", "name", "photo"],
  emits: ["show-preview"],
  methods: {
    loadPreview() {
      this.$emit("show-preview", this.id);
    },
  },
};
</script>

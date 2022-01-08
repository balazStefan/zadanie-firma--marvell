<template>
  <div class="cursor-pointer">
    <p @click="redirect" class="text-black text-center">
      {{ name }}
    </p>
    <img :src="photo" @click="redirect" />
  </div>
</template>
<script>
export default {
  props: ["id", "name", "photo"],
  emits: ["show-info"],
  methods: {
    redirect() {
      this.$emit("show-info", this.id);
    },
  },
};
</script>

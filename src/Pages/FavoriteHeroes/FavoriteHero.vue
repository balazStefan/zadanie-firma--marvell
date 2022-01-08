<template>
  <section class="flex align-middle justify-center my-28">
    <base-card>
      <aside>
        <h1 class="text-4xl font-bold p-2.5">{{ name }}</h1>
        <p class="max-w-2xl p-2.5">{{ description }}</p>
      </aside>
      <img :src="img" alt="" class="p-2.5" />
      <button
        @click="removeHeroFromFavorite"
        class="p-2.5 rounded-lg text-black border-black border-4 m-5 font-bold self-start"
      >
        Remove from Favorite
      </button>
    </base-card>
  </section>
</template>
<script>
export default {
  props: ["name", "desc", "photo", "id"],
  emits: ["remove-Fromfavorite"],
  data() {
    return {
      img: `${this.photo}/portrait_fantastic.jpg`,
    };
  },
  computed: {
    description() {
      return this.desc
        ? this.desc
        : "Daný hrdina bol tak cool, že nemá ani popis....a Ja musím písať takéto bľudy miesto toho.. 😪😪";
    },
  },
  methods: {
    removeHeroFromFavorite() {
      this.$emit("remove-Fromfavorite", this.id);
    },
  },
};
</script>
<style scoped>
img {
  max-width: 168px;
  max-height: auto;
}
</style>

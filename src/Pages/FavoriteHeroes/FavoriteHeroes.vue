<template>
  <div>
    <favorite-hero
      v-for="hero in heroesFromStorage"
      :key="hero.id"
      :id="hero.id"
      :name="hero.name"
      :desc="hero.description"
      :photo="hero.thumbnail.path"
      @remove-favorite="deleteFromArr"
    >
    </favorite-hero>
  </div>
</template>
<script>
import FavoriteHero from "./FavoriteHero.vue";

export default {
  components: { FavoriteHero },
  data() {
    return {
      heroesFromStorage: [],
    };
  },

  methods: {
    deleteFromArr(id) {
      this.$store.dispatch("removeItem", id);
      const helper = JSON.parse(localStorage.getItem("favoriteHeroes")); // zoberie všetky dáta z LocalStorage a da ich do pomocnej []
      const newLocalStorage = helper.filter((hero) => hero.id !== id); // nájdem správne id a vyfiltrované dám do pola newLocalStorage
      localStorage.setItem("favoriteHeroes", JSON.stringify(newLocalStorage)); // a pošelem aktuálny stav do LocalStorage
      this.upgradeUI();
    },
    upgradeUI() {
      this.heroesFromStorage = JSON.parse(
        localStorage.getItem("favoriteHeroes")
      );
    },
    someFavoriteHeroes() {
      // ak niesú žiadny oblubený hrdinovia tak ma presmeruje na "/"
      if (this.heroesFromStorage < 1) {
        this.$router.replace("/");
      }
    },
  },
  mounted() {
    this.upgradeUI();
  },
  updated() {
    this.someFavoriteHeroes();
  },
};
</script>

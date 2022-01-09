<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An Error occured..."
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <ul class="flex justify-evenly align-middle mt-14">
      <hero-preview
        v-for="hero in listOfHeroes"
        :key="hero.id"
        :name="hero.name"
        :id="hero.id"
        :desc="hero.description"
        :photo="hero.thumbnail?.path + `/portrait_xlarge.jpg`"
        @show-preview="loadPage"
      ></hero-preview>
    </ul>
  </div>
</template>
<script>
import HeroPreview from "./HeroPreview.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { HeroPreview },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  computed: {
    ...mapGetters(["listOfHeroes"]),
  },
  methods: {
    // da do url id konkretneho hrdinu
    async loadPage(id) {
      try {
        await this.$store.dispatch("loadHeroById", id);
        await this.$router.push("/" + id);
      } catch (err) {
        this.error = err.message || "Failed to load Data";
      }
    },
    ...mapActions(["resetUI"]),

    handleError() {
      this.error = null;
    },
  },

  watch: {
    // aby po zmene naspať na HOMEPAGE nezobrazovalo výsledky z predch.volania..
    $route(to) {
      if (to.fullPath.includes("/")) {
        this.resetUI();
      }
    },
  },
};
</script>

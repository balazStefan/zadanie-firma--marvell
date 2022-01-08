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
      <hero-item
        v-for="item in items"
        :key="item.id"
        :name="item.name"
        :id="item.id"
        :desc="item.description"
        :photo="item.thumbnail?.path + `/portrait_xlarge.jpg`"
        @show-info="loadPage"
      ></hero-item>
    </ul>
  </div>
</template>
<script>
import HeroItem from "./SearchItem.vue";

export default {
  components: { HeroItem },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  computed: {
    items() {
      return this.$store.getters.items;
    },
  },
  methods: {
    async loadPage(id) {
      try {
        await this.$store.dispatch("loadById", id);
        await this.$router.push("/" + id);
      } catch (err) {
        this.error = err.message || "Failed to load Data";
      }
      // da do url id konkretneho hrdinu
    },
    resetUI() {
      this.$store.dispatch("resetUI");
    },
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

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
        @show-preview="loadPage"
      ></hero-item>
    </ul>
  </div>
</template>
<script>
import HeroItem from "./HeroPreview.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { HeroItem },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  computed: {
    ...mapGetters(["items"]),
  },
  methods: {
    // da do url id konkretneho hrdinu
    async loadPage(id) {
      try {
        await this.$store.dispatch("loadById", id);
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

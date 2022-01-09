<template>
  <div class="flex flex-col items-center relative">
    <base-dialog
      :show="!!error"
      title="An Error occured..."
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <base-dialog
      :show="isLoading"
      fixed
      title="Loading data... "
      @close="handleError"
    >
      <base-spinner></base-spinner
    ></base-dialog>
    <div class="flex">
      <input
        type="text"
        placeholder="Search..."
        v-model.trim="inputName"
        @click="showHistory"
        @keyup="debounce(loadDataFromApi, 500)"
        @change="debounce(addToLocalStorage, 500)"
        class="relative"
      />
      <button
        class="rounded-lg p-1.5 font-bold absolute positionOfbtn"
        @click="resetUI"
      >
        Clear
      </button>
    </div>

    <section v-if="userSearching" class="bg-white absolute top-12">
      <history-item
        v-for="item in storedQuries"
        :key="item.id"
        :query="item"
        @delete-query="deleteFromLocalStorage"
        @load-FromHistory="loadDataViaHistory"
      >
      </history-item>
    </section>
  </div>
</template>
<script>
import HistoryItem from "./HistoryItem.vue";
import VueHelpers from "../debouncer";
import { mapActions } from "vuex";
export default {
  components: { HistoryItem },
  data() {
    return {
      inputName: "",
      userSearching: false,
      storedQuries: [],
      isLoading: false,
      error: null,
    };
  },
  mixins: [VueHelpers],

  methods: {
    addToLocalStorage() {
      if (!this.inputName) return;
      this.storedQuries.push(this.inputName);
      localStorage.setItem(
        "historyOfSearching",
        JSON.stringify(this.storedQuries)
      );
    },
    loadQueriesFromLocalStorage() {
      this.storedQuries =
        JSON.parse(localStorage.getItem("historyOfSearching")) || [];
    },
    async loadDataFromApi() {
      if (!this.inputName) return;
      try {
        this.isLoading = true;
        await this.$store.dispatch("loadHeroByName", this.inputName);
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        this.error = err.message || "Failed to load data...";
      }
    },
    async loadDataViaHistory(id) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("loadHeroByName", id);
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        this.error = err.message || "Something went wrong...";
      }
    },
    showHistory() {
      this.userSearching = !this.userSearching;
    },

    deleteFromLocalStorage(id) {
      // vymaže konkretnú query z LocalStorage
      const helper = JSON.parse(localStorage.getItem("historyOfSearching"));
      const newStorage = helper.filter((item) => item !== id);
      localStorage.setItem("historyOfSearching", JSON.stringify(newStorage));
      this.loadQueriesFromLocalStorage();
    },
    handleError() {
      this.error = null;
    },
    ...mapActions(["resetUI"]),
  },
  mounted() {
    this.loadQueriesFromLocalStorage();
  },
};
</script>
<style scoped>
input {
  min-width: 384px;
  padding: 10px;
}

.positionOfbtn {
  margin-top: 3px;
  margin-left: 328px;
}
</style>

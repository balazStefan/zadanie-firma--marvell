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
        @keyup="debounce(loadFromServer, 500)"
        @change="debounce(addToStorage, 500)"
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
        :queri="item"
        @delete-history="deleteFromStorage"
        @load-fromHistory="loadByHistory"
      >
      </history-item>
    </section>
  </div>
</template>
<script>
import HistoryItem from "./HistoryItem.vue";
import VueHelpers from "../debouncer";
export default {
  components: { HistoryItem },
  data() {
    return {
      inputName: "",
      userSearching: false,
      storedQuries: [],
      isLoading: false,
      error: null,
      history: false,
    };
  },
  mixins: [VueHelpers],

  methods: {
    addToStorage() {
      if (this.inputName.length > 0) {
        this.storedQuries.push(this.inputName);
        localStorage.setItem("arr", JSON.stringify(this.storedQuries));
      }
    },
    loadQueriesFromStorage() {
      this.storedQuries = JSON.parse(localStorage.getItem("arr")) || [];
    },
    async loadFromServer() {
      if (this.inputName.length > 0)
        try {
          this.isLoading = true;
          await this.$store.dispatch("loadByName", this.inputName);
          this.isLoading = false;
        } catch (err) {
          this.isLoading = false;
          this.error = err.message || "Failed to load Data";
        }
    },
    async loadByHistory(id) {
      try {
        await this.$store.dispatch("loadByName", id);
      } catch (err) {
        this.isLoading = false;
        this.error = err.message || "Something went wrong...";
      }
    },
    showHistory() {
      this.userSearching = !this.userSearching;
    },

    deleteFromStorage(id) {
      const helper = JSON.parse(localStorage.getItem("arr"));
      const newStorage = helper.filter((item) => item !== id); // nájdem správne id a vyfiltrované dám do pola newLocalStorage
      localStorage.setItem("arr", JSON.stringify(newStorage));
      this.loadQueriesFromStorage();
    },

    handleError() {
      this.error = null;
    },
    resetUI() {
      this.$store.dispatch("resetUI");
    },
  },
  mounted() {
    this.loadQueriesFromStorage();
    // console.log();
  },
};
</script>
<style scoped>
input {
  min-width: 384px;
  padding: 10px;
}

.prekrito {
  position: absolute;
  top: 100px;
  left: 10px;
  z-index: 10;
}
.positionOfbtn {
  margin-top: 3px;
  margin-left: 328px;
}
</style>

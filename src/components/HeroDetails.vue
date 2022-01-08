<template>
  <section class="flex justify-center align-middle my-28">
    <base-card>
      <main class="flex justify-center align-middle">
        <aside>
          <h1 class="p-2.5 font-bold text-3xl">{{ getHero.name }}</h1>
          <p class="max-w-2xl p-2.5">
            {{
              getHero.description.length > 1 // mohol by som dať aj getHero.description ale majú empty string a nič by nedávalo
                ? getHero.description
                : "Daný hrdina bol tak cool, že nemá ani popis....a Ja musím písať takéto bľudy miesto toho.. 😪😪"
            }}
          </p>
          <div class="p-2.5">
            <label for="isFavorite" class="cursor-pointer"
              >Is this hero your Favorite ?
            </label>
            <input
              type="checkbox"
              id="isFavorite"
              @click="changeStateofFavorite"
              class="cursor-pointer"
            />
          </div>
          <button
            @click="backHome"
            class="p-2.5 bg-red-800 font-bold self-start text-white m-3 rounded-lg border-white border-2"
          >
            Back Home
          </button>
        </aside>
        <img :src="getPhoto" alt="" />
      </main>
    </base-card>
  </section>
</template>

<script>
import BaseCard from "./UI/BaseCard.vue";
export default {
  components: { BaseCard },
  props: ["name", "photo", "desc"],
  data() {
    return {
      isFavorite: false,
    };
  },
  computed: {
    getHero() {
      // dostanem name, id, desc a photo veľa hrdinov nemá photo alebo desc
      return this.$store.getters.hero;
    },
    getPhoto() {
      return this.getHero.thumbnail.path + `/portrait_fantastic.jpg`;
    },
  },
  methods: {
    changeStateofFavorite() {
      this.isFavorite = true;
      this.$store.dispatch("addHeroToArr", this.getHero, this.getPhoto);
      this.$router.push("/favorite");
    },
    UserClickedOk() {
      this.isFavorite = false;
    },
    backHome() {
      this.$router.push("/");
    },
  },
};
</script>

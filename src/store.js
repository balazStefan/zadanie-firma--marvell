import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      items: [],
      hero: [],
      favoriteHeroes: [],
    };
  },
  getters: {
    items(state) {
      return state.items;
    },
    hero(state) {
      return state.hero;
    },
    favoriteHeroes(state) {
      return state.favoriteHeroes;
    },
  },
  mutations: {
    setItem(state, payload) {
      state.items = payload;
    },
    setHero(state, payload) {
      state.hero = payload;
    },
    addHeroToArr(state, payload) {
      // ak už  bol pridaný hero do array aby neboli duplicity
      state.favoriteHeroes.find((hero) => hero.id === payload.id)
        ? alert("nemožem pridať lebo tam už je ..") // poraď ako odtialto mam dať info na modal aby nebol ALERT
        : state.favoriteHeroes.push(payload) &&
          localStorage.setItem(
            "favoriteHeroes",
            JSON.stringify(state.favoriteHeroes)
          );
    },

    removeItem(state, payload) {
      state.favoriteHeroes = state.favoriteHeroes.filter(
        (hero) => hero.id !== payload
      );
    },
    resetUI(state) {
      // po fetchi aby premazalo UI aj po zmene routs
      state.items = [];
    },
  },
  actions: {
    async loadByName(context, payload) {
      const query = payload;
      const publicKey = process.env.VUE_APP_PUBLIC_KEY; // 2..
      const API_URL = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&limit=5&apikey=${publicKey}`;

      const response = await axios.get(API_URL);

      context.commit("setItem", response.data.data.results); //
    },
    async loadById(context, payload) {
      const idHero = payload;
      const publicKey = process.env.VUE_APP_PUBLIC_KEY;
      const API_URL = `https://gateway.marvel.com:443/v1/public/characters/${idHero}?apikey=${publicKey}`;

      const response = await axios.get(API_URL);
      context.commit("setHero", ...response.data.data.results);
    },
    addHeroToArr(context, payload) {
      context.commit("addHeroToArr", payload);
    },
    removeItem(contex, payload) {
      contex.commit("removeItem", payload);
    },
    resetUI(context) {
      context.commit("resetUI");
    },
  },
});

export default store;

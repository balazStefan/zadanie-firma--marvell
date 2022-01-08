import { createStore } from "vuex";
import axios from "axios";
import { LIMIT, API_URL } from "./constants.js";

const store = createStore({
  state() {
    return {
      items: [],
      hero: [],
      favoriteHeroes: JSON.parse(localStorage.getItem("favoriteHeroes")),
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
      const reqURL = `${API_URL}?nameStartsWith=${payload}&limit=${LIMIT}&apikey=${process.env.VUE_APP_PUBLIC_KEY}`;
      const response = await axios.get(reqURL);
      context.commit("setItem", response.data.data.results); //
    },
    async loadById(context, payload) {
      const reqURL = `${API_URL}/${payload}?apikey=${process.env.VUE_APP_PUBLIC_KEY}`;
      const response = await axios.get(reqURL);
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

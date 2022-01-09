import { createStore } from "vuex";
import axios from "axios";
import { LIMIT, API_URL } from "./constants.js";

const store = createStore({
  state() {
    return {
      listOfHeroes: [], // sú potrebné obe ?
      clickedHero: [], // sú potrebné obe ?
      favoriteHeroes: JSON.parse(localStorage.getItem("favoriteHeroes")),
    };
  },
  getters: {
    listOfHeroes(state) {
      return state.listOfHeroes;
    },
    clickedHero(state) {
      return state.clickedHero;
    },
    favoriteHeroes(state) {
      return state.favoriteHeroes;
    },
  },
  mutations: {
    setListOfHeroes(state, payload) {
      state.listOfHeroes = payload;
    },
    setClickedHero(state, payload) {
      state.clickedHero = payload;
    },
    addHeroToFavorite(state, payload) {
      // ak už  bol pridaný hero do array aby neboli duplicity
      state.favoriteHeroes.find((hero) => hero.id === payload.id)
        ? alert("nemožeš pridať lebo tam už je ..") // poraď ako odtialto mam dať info na modal aby nebol ALERT
        : state.favoriteHeroes.push(payload) &&
          localStorage.setItem(
            "favoriteHeroes",
            JSON.stringify(state.favoriteHeroes)
          );
    },

    removeFavoriteFromStorage(state, payload) {
      state.favoriteHeroes = state.favoriteHeroes.filter(
        (hero) => hero.id !== payload
      );
    },
    resetUI(state) {
      // po fetchi aby premazalo UI aj po zmene routs
      state.listOfHeroes = [];
    },
  },
  actions: {
    async loadHeroByName(context, payload) {
      const reqURL = `${API_URL}?nameStartsWith=${payload}&limit=${LIMIT}&apikey=${process.env.VUE_APP_PUBLIC_KEY}`;
      const response = await axios.get(reqURL);
      context.commit("setListOfHeroes", response.data.data.results); //
    },
    async loadHeroById(context, payload) {
      const reqURL = `${API_URL}/${payload}?apikey=${process.env.VUE_APP_PUBLIC_KEY}`;
      const response = await axios.get(reqURL);
      context.commit("setClickedHero", ...response.data.data.results);
    },
    addHeroToFavorite(context, payload) {
      context.commit("addHeroToFavorite", payload);
    },
    removeFavoriteFromStorage(contex, payload) {
      contex.commit("removeFavoriteFromStorage", payload);
    },
    resetUI(context) {
      context.commit("resetUI");
    },
  },
});

export default store;

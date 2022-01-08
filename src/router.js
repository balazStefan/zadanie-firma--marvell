import { createRouter, createWebHistory } from "vue-router";

const HeroDetails = () => import("./components/HeroDetails.vue");
const FavoriteHeroes = () =>
  import("./Pages/FavoriteHeroes/FavoriteHeroes.vue");
const HomePage = () => import("./Pages/HomePage.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/favorite",
      component: FavoriteHeroes,
    },
    {
      path: "/:id",
      component: HeroDetails,
    },
  ],
});
export default router;

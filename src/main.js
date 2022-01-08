import { createApp } from "vue";
import store from "./store.js";
import router from "./router";
import App from "./App.vue";
import TheHeader from "./components/UI/TheHeader.vue";
import BaseCard from "./components/UI/BaseCard.vue";
import BaseSpinner from "./components/UI/BaseSpinner.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";
import "./assets/tailwind.css";

const app = createApp(App);
app.component("the-header", TheHeader);
app.component("base-card", BaseCard);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);
app.use(store);
app.use(router);
app.mount("#app");

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import confiApp from "./config/app";
const app = createApp(App);
confiApp(app);
app.mount("#app");

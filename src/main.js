import { createApp } from "vue";
import App from "./App.vue";
import confiApp from "./config/app";
import "./assets/main.css";
const app = createApp(App);
confiApp(app);
app.mount("#app");

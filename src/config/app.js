import Antd from "ant-design-vue";
import router from "@/router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";

const confiApp = (app) => {
  const pinia = createPinia();
  app.use(pinia);
  app.use(Antd);
  app.use(router);
  app.component("font-awesome-icon", FontAwesomeIcon);
};
export default confiApp;

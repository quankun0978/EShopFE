import Antd from "ant-design-vue";
import router from "@/router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import { Table } from "ant-design-vue";
const { Column } = Table;
const confiApp = (app) => {
  const pinia = createPinia();
  app.use(pinia);
  app.use(Antd);
  app.use(router);
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.component("a-column", Column);
};
export default confiApp;

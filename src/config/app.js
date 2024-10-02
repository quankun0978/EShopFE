import Antd from "ant-design-vue";
import router from "@/router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import { Table } from "ant-design-vue";
import { createI18n } from "vue-i18n";
import initLang from "@/langs/init";
const { Column } = Table;
const i18n = createI18n(initLang);
const pinia = createPinia();
export const $t = i18n.global.t;

const confiApp = (app) => {
  app.use(i18n);
  app.use(pinia);
  app.use(Antd);
  app.use(router);
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.component("a-column", Column);
};

export default confiApp;

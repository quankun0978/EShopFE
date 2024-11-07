import Antd from "ant-design-vue";
import router from "@/router";
import { createPinia } from "pinia";
import { Table } from "ant-design-vue";
import { createI18n } from "vue-i18n";
import initLang from "@/langs/init";
const { Column } = Table;
const i18n = createI18n(initLang);
const pinia = createPinia();
export const $t = i18n.global.t;

// Cấu hình các dịch vụ sử dụng trong ứng dụng

const confiApp = (app) => {
  app.use(i18n);
  app.use(pinia);
  app.use(Antd);
  app.use(router);
  app.component("a-column", Column);
};

export default confiApp;

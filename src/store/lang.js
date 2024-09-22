import { lang } from "@/constants/lang";
import { defineStore } from "pinia";

export const useLangStore = defineStore("lang", {
  state: () => ({ lang: lang.vn }),
  actions: {
    // cập nhập trạng thái hiện tại của sider đang active vào đâu
    updateLanguage(lang) {
      this.lang = lang;
    },
  },
});

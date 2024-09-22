import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => ({ namePath: "", isBack: false }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    // cập nhập trạng thái hiện tại của sider đang active vào đâu
    updateHeader(data) {
      this.namePath = data.namePath;
      this.isBack = data.isBack;
    },
  },
});

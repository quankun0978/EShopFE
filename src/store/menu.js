import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => ({ namePath: "" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    updatePathName(value) {
      this.namePath = value;
    },
  },
});

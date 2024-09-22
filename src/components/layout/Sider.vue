<template>
  <a-layout-sider
    style="width: 80px; background-color: #00577b; min-height: 100vh"
    breakpoint="lg"
    collapsed-width="0"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
  >
    <div class="logo">
      <img :src="Logo" alt="" srcset="" width="100%" />
    </div>
    <Menu :items="items" :selected-keys="selectedKeys" />
  </a-layout-sider>
</template>

<script setup>
import { ref, h } from "vue";
import Logo from "@/assets/imgs/Logo_Full_White.png";
import Menu from "@/components/common/Menu/Menu.vue";
import IconBoxesStacked from "../icons/IconBoxesStacked.vue";
import { useLangStore } from "@/store/lang";
import { getText } from "@/constants/lang";

const langStore = useLangStore();
const items = [
  {
    label: getText("product", langStore.lang, "product"),
    key: "1",
    icon: () => h(IconBoxesStacked),
  },
  {
    label: "Navigation two",
    key: "2",
  },
  {
    label: "Navigation three",
    key: "3",
  },
];
const onCollapse = (collapsed, type) => {};
const onBreakpoint = (broken) => {};
const selectedKeys = ref(["1"]);
</script>

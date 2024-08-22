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
import { InboxOutlined } from "@ant-design/icons-vue";

const items = [
  {
    label: "Hàng hóa",
    key: "1",
    icon: () => h(InboxOutlined),
    // icon: <font-awesome-icon :i />,
  },
  {
    label: "Navigation two",
    key: "2",
    // icon: <MailOutlined />,
  },
  {
    label: "Navigation three",
    key: "3",
    // icon: <MailOutlined />,
  },
];

const onCollapse = (collapsed, type) => {
  console.log(collapsed, type);
};
const onBreakpoint = (broken) => {
  console.log(broken);
};
const selectedKeys = ref(["1"]);
</script>

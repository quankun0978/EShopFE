<template>
  <a-layout-sider
    breakpoint="lg"
    class="layout-sider"
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
import Sider from "./Sider.js";
const { items, Logo, Menu, onCollapse, onBreakpoint, selectedKeys } = Sider();
</script>
<style lang="scss" scoped>
@import "./Sider.scss";
</style>

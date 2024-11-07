<template>
  <a-layout-header class="layout-header">
    <div class="layout-header-container">
      <h3 style="display: flex; align-items: center">
        {{ menuStore.namePath }}
      </h3>
      <a-space class="align-center">
        <router-link
          :to="{
            name: productRoute.LIST_PRODUCT,
          }"
          v-if="menuStore.isBack"
        >
          <a-space direction="horizontal" class="align-center">
            <ArrowLeftOutlined />
            <span class="span">{{
              $t("product.ACTION.BACK_TO_START_PAGE")
            }}</span>
          </a-space>
        </router-link>
        <Select
          :options="options"
          :style="{
            width: '100px',
          }"
        />
        <a-avatar :size="24">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <Dropdown name="Hiền Nguyễn Trọng" />
        <Segment :items="segments" :default-selected-key="'user1'" />
      </a-space>
    </div>
  </a-layout-header>
</template>
<script setup>
import { productRoute } from "@/router/router";
import Header from "./Header";
const {
  options,
  segments,
  menuStore,
  Select,
  Dropdown,
  Segment,
  ArrowLeftOutlined,
  UserOutlined,
} = Header();
</script>

<style scoped lang="scss">
@import "./Header.scss";
</style>

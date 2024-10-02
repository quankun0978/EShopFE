<template>
  <a-layout-header class="layout-header">
    <div style="display: flex; justify-content: space-between">
      <h3 style="display: flex; align-items: center">
        {{ menuStore.namePath }}
      </h3>
      <a-space style="display: flex; align-items: center">
        <router-link
          :to="{
            name: 'list_product',
          }"
          v-if="menuStore.isBack"
        >
          <a-space
            direction="horizontal"
            style="display: flex; align-items: center"
          >
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

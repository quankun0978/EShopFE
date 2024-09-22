<template>
  <a-layout-header
    :style="{
      background: '#fff',
      paddingLeft: '8px',
      paddingRight: '0px',
    }"
  >
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
              getText("shared", langStore.lang, "back_to_start_page")
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
        <Dropdown name="Hien Nguyen Trong" />
        <Segment :items="segments" :default-selected-key="'user1'" />
      </a-space>
    </div>
  </a-layout-header>
</template>

<script setup>
import Select from "../common/Select/Select.vue";
import Dropdown from "../common/Dropdown/Dropdown.vue";
import Segment from "../common/Segment/Segment.vue";
import {
  ArrowLeftOutlined,
  UserOutlined,
  WhatsAppOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";
import { useMenuStore } from "@/store/menu";
import { useLangStore } from "@/store/lang";
import { getText } from "@/constants/lang";
const options = [
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "disabled",
    label: "Disabled",
    disabled: true,
  },
  {
    value: "yiminghe",
    label: "Yiminghe",
  },
];

const segments = [
  {
    value: "user1",
    payload: {
      icon: WhatsAppOutlined,
      style: {},
    },
  },
  {
    value: "user2",
    payload: {
      icon: BellOutlined,
    },
  },
  {
    value: "user3",
    payload: {
      icon: QuestionCircleOutlined,
    },
  },
];
// store lưu trữ các trạng thái của menu
const menuStore = useMenuStore();
const langStore = useLangStore();
</script>
<style>
.ant-space-item {
  display: flex;
  align-items: center;
}
</style>
